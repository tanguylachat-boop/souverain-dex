"""
Voix off de la démo : une lecture continue par Gemini TTS (voix « Achird », celle des films
Mentia et LX Sales Coach), découpée phrase par phrase, puis posée scène par scène.

Méthode reprise de ~/mentia-motion/scripts/voix.py le 24.10.2026 :
  1. Gemini lit le script (scripts/demo/voix.json), une phrase par paragraphe : il marque
     alors une vraie pause entre deux phrases. Le moins de requêtes possible : le palier gratuit
     de Gemini TTS plafonne à 10 requêtes par jour et par modèle, et une lecture continue garde
     une prosodie cohérente. Au-delà de « max_chars » caractères (650 par défaut), le modèle a
     rendu une réponse sans audio (24.10.2026, 1374 caractères) : le script est alors lu en
     plusieurs groupes de scènes consécutives, chacun découpé à son tour.
  2. whisper.cpp retranscrit la lecture mot par mot, en local : chaque mot du script doit avoir
     été prononcé, et le début de chaque phrase est repéré.
  3. Chaque phrase est coupée au milieu du plus long silence qui la sépare de la suivante, en
     copie exacte de la lecture (aucun filtre).
  4. Chaque phrase est posée sur sa scène à l'instant « at » (secondes depuis le début de la
     scène), jamais avant la fin de la précédente. La scène dure au moins « min_s » et se
     prolonge si la voix le demande (« tail_s » de silence après le dernier mot). Les mots sont
     horodatés (whisper-1 d'OpenAI si une clé existe dans ~/.env, sinon whisper.cpp) pour que
     la scène cale ses éléments sur eux.

Usage   : python3 scripts/demo/voix.py
Sorties : scripts/demo/voix/timing.json   début et durée de chaque scène, instant de chaque
                                          phrase et de chaque mot (secondes depuis la scène)
          scripts/demo/voix/track.flac    la piste complète, mono 24 kHz, lue par render.mjs
Cache   : scripts/demo/.voix-cache/       lecture et transcriptions (hors git)
Les clés sont lues dans ~/content-machine/.env (Gemini) et ~/.env (OpenAI), jamais affichées.
"""
import array, base64, difflib, hashlib, json, math, os, re, subprocess, sys, time, unicodedata, wave
import urllib.error, urllib.request

ICI = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(ICI, ".voix-cache")
SORTIE = os.path.join(ICI, "voix")
WHISPER_MODELE = os.path.expanduser("~/mvp_athlit_2026/models/ggml-large-v3-turbo-q5_0.bin")
TAUX = 24000  # Gemini rend du PCM 24 kHz : on n'invente pas d'échantillons
os.makedirs(CACHE, exist_ok=True)
os.makedirs(SORTIE, exist_ok=True)


class QuotaJournalier(Exception):
    """Le modèle a épuisé son quota du jour : on passe au suivant."""


def cle_dans(fichier: str, nom: str) -> str | None:
    chemin = os.path.expanduser(fichier)
    if not os.path.exists(chemin):
        return None
    for ligne in open(chemin, encoding="utf-8"):
        if ligne.startswith(nom + "="):
            return ligne.split("=", 1)[1].strip().strip("'\"") or None
    return None


def cle_gemini() -> str:
    cle = os.environ.get("GEMINI_API_KEY") or cle_dans("~/content-machine/.env", "GEMINI_API_KEY")
    if not cle:
        sys.exit("GEMINI_API_KEY introuvable (~/content-machine/.env)")
    return cle


def cle_openai() -> str | None:
    return os.environ.get("OPENAI_API_KEY") or cle_dans("~/.env", "OPENAI_API_KEY")


def ffmpeg(*args: str) -> None:
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", *args], check=True)


def duree(chemin: str) -> float:
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", chemin],
                         capture_output=True, text=True, check=True)
    return float(out.stdout.strip())


def synthese(texte: str, voix: str, modele: str, cle: str) -> tuple[bytes, str]:
    """Un appel Gemini TTS. Renvoie l'audio et son type MIME."""
    corps = {"contents": [{"parts": [{"text": texte}]}],
             "generationConfig": {"responseModalities": ["AUDIO"],
                                  "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voix}}}}}
    req = urllib.request.Request(
        f"https://generativelanguage.googleapis.com/v1beta/models/{modele}:generateContent",
        data=json.dumps(corps).encode(),
        headers={"Content-Type": "application/json", "x-goog-api-key": cle})
    for essai in range(4):
        try:
            rep = json.load(urllib.request.urlopen(req, timeout=300))
            break
        except urllib.error.HTTPError as e:
            corps_erreur = e.read().decode("utf-8", "replace")
            if e.code == 429 and "PerDay" in corps_erreur:
                raise QuotaJournalier(modele) from None
            if e.code == 429 and essai < 3:  # limite par minute : on attend
                print("  429 par minute, reprise dans 70 s…", flush=True)
                time.sleep(70)
                continue
            raise SystemExit(f"Gemini {e.code} ({modele}) : {corps_erreur[:300]}")
    try:
        donnees = rep["candidates"][0]["content"]["parts"][0]["inlineData"]
    except (KeyError, IndexError):
        raise SystemExit(f"Gemini ({modele}) : réponse sans audio ({json.dumps(rep)[:400]})")
    return base64.b64decode(donnees["data"]), donnees.get("mimeType", "")


def lecture(texte: str, voix: str, modeles: list[str], cle: str) -> tuple[str, str]:
    """La lecture complète, normalisée en WAV mono 24 kHz, -16 LUFS. Renvoie (chemin, modèle)."""
    for modele in modeles:
        h = hashlib.sha1(f"{voix}|{modele}|{texte}".encode()).hexdigest()[:12]
        final = os.path.join(CACHE, f"lecture-{h}.wav")
        if os.path.exists(final):
            return final, modele
    for modele in modeles:
        h = hashlib.sha1(f"{voix}|{modele}|{texte}".encode()).hexdigest()[:12]
        final = os.path.join(CACHE, f"lecture-{h}.wav")
        try:
            print(f"  lecture par {modele}, voix {voix}…", flush=True)
            audio, mime = synthese(texte, voix, modele, cle)
        except QuotaJournalier:
            print(f"  {modele} : quota du jour épuisé, modèle suivant", flush=True)
            continue
        brut = os.path.join(CACHE, f"lecture-{h}.brut")
        open(brut, "wb").write(audio)
        entree = ["-i", brut]
        if "l16" in mime.lower() or "pcm" in mime.lower():
            taux = re.search(r"rate=(\d+)", mime)
            entree = ["-f", "s16le", "-ar", taux.group(1) if taux else "24000", "-ac", "1", "-i", brut]
        ffmpeg(*entree, "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", str(TAUX), "-ac", "1", final)
        os.remove(brut)
        return final, modele
    raise SystemExit("Aucun modèle TTS disponible aujourd'hui (quotas du jour épuisés).")


def normaliser(texte: str) -> list[str]:
    """Mots comparables : minuscules, sans accents, apostrophes et traits d'union comme séparateurs."""
    t = unicodedata.normalize("NFKD", texte.lower().replace("’", "'"))
    t = "".join(c for c in t if not unicodedata.combining(c))
    return re.findall(r"[a-z0-9]+", t)


def mots_prononces(wav: str) -> list[tuple[str, float, float]]:
    """Transcription locale mot par mot de la lecture : [(mot normalisé, début s, fin s)]."""
    base = wav[:-4] + ".mots"
    if not os.path.exists(base + ".json"):
        if not os.path.exists(WHISPER_MODELE):
            raise SystemExit(f"Modèle whisper introuvable : {WHISPER_MODELE}")
        seize = wav[:-4] + ".16k.wav"
        # Deux secondes de silence en queue : sans elles, whisper.cpp a lâché la dernière phrase
        # d'une lecture qui finissait juste après la voix (24.10.2026).
        ffmpeg("-i", wav, "-af", "apad=pad_dur=2", "-ar", "16000", "-ac", "1", seize)
        print("  transcription whisper.cpp (quelques minutes)…", flush=True)
        subprocess.run(["whisper-cli", "-m", WHISPER_MODELE, "-l", "fr", "-f", seize,
                        "-ml", "1", "-sow", "-oj", "-of", base, "-np", "-t", "8"],
                       check=True, capture_output=True)
        os.remove(seize)
    segments = json.load(open(base + ".json", encoding="utf-8"))["transcription"]
    mots = []
    for s in segments:
        for m in normaliser(s["text"]):
            mots.append((m, s["offsets"]["from"] / 1000, s["offsets"]["to"] / 1000))
    return mots


def mots_whisper1(ech: array.array, taux: int) -> list[tuple[str, float, float]] | None:
    """Mots d'un morceau horodatés par whisper-1 (meilleurs horodatages que whisper.cpp,
    mesuré sur les Reels Mentia le 02.10.2026). None si aucune clé OpenAI."""
    empreinte = hashlib.sha1(ech.tobytes()).hexdigest()[:12]
    cache = os.path.join(CACHE, f"w1-{empreinte}.json")
    if not os.path.exists(cache):
        cle = cle_openai()
        if not cle:
            return None
        tmp = os.path.join(CACHE, f"w1-{empreinte}.wav")
        ecrire_pcm(tmp, ech, taux)
        r = subprocess.run(["curl", "-s", "--max-time", "90", "https://api.openai.com/v1/audio/transcriptions",
                            "-H", f"Authorization: Bearer {cle}", "-F", f"file=@{tmp}", "-F", "model=whisper-1",
                            "-F", "language=fr", "-F", "response_format=verbose_json",
                            "-F", "timestamp_granularities[]=word"], capture_output=True, text=True)
        os.remove(tmp)
        try:
            mots = json.loads(r.stdout)["words"]
        except (ValueError, KeyError):
            print(f"  whisper-1 indisponible ({r.stdout[:100]!r}) : horodatage par whisper.cpp")
            return None
        json.dump(mots, open(cache, "w", encoding="utf-8"), ensure_ascii=False)
    return [(m, w["start"], w["end"]) for w in json.load(open(cache, encoding="utf-8")) for m in normaliser(w["word"])]


def silences(wav: str) -> list[tuple[float, float]]:
    out = subprocess.run(["ffmpeg", "-hide_banner", "-i", wav, "-af", "silencedetect=noise=-35dB:d=0.06",
                          "-f", "null", "-"], capture_output=True, text=True).stderr
    debuts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", out)]
    fins = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", out)]
    return list(zip(debuts, fins))


def lire_pcm(chemin: str) -> tuple[array.array, int]:
    with wave.open(chemin) as w:
        if w.getsampwidth() != 2 or w.getnchannels() != 1:
            raise SystemExit(f"{chemin} : PCM 16 bits mono attendu")
        return array.array("h", w.readframes(w.getnframes())), w.getframerate()


def ecrire_pcm(chemin: str, echantillons: array.array, taux: int) -> None:
    with wave.open(chemin, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(taux)
        w.writeframes(echantillons.tobytes())


def zone_voix(ech: array.array, taux: int, seuil_db: float = -45.0) -> tuple[int, int]:
    """Début et fin de la voix dans un morceau : fenêtres de 10 ms au-dessus du seuil."""
    n = taux // 100
    seuil = (32768 * 10 ** (seuil_db / 20)) ** 2 * n
    fortes = [i for i in range(0, len(ech) - n + 1, n) if sum(x * x for x in ech[i:i + n]) > seuil]
    if not fortes:
        raise SystemExit("Morceau sans voix au-dessus de -45 dBFS")
    return fortes[0], fortes[-1] + n


def aligner(attendus: list[str], entendus: list[tuple[str, float, float]]) -> tuple[dict[int, float], dict[int, float], list[str]]:
    """Temps des mots attendus d'après les mots entendus. Un passage écrit autrement (« 30 » pour
    « trente ») garde ses bornes. Renvoie (débuts, fins, écarts)."""
    debut: dict[int, float] = {}
    fin: dict[int, float] = {}
    ecarts = []
    mots = [m for m, _, _ in entendus]
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, attendus, mots, autojunk=False).get_opcodes():
        if tag == "equal":
            for d in range(i2 - i1):
                debut[i1 + d] = entendus[j1 + d][1]
                fin[i1 + d] = entendus[j1 + d][2]
        elif tag == "replace":
            t0, t1 = entendus[j1][1], entendus[j2 - 1][2]
            poids = [len(x) + 1 for x in attendus[i1:i2]]
            cumul = 0
            for d, pds in enumerate(poids):
                debut[i1 + d] = t0 + (t1 - t0) * cumul / sum(poids)
                cumul += pds
                fin[i1 + d] = t0 + (t1 - t0) * cumul / sum(poids)
            ecarts.append(f"« {' '.join(attendus[i1:i2])} » entendu « {' '.join(mots[j1:j2])} »")
        elif tag == "delete":
            ecarts.append(f"NON PRONONCÉ : « {' '.join(attendus[i1:i2])} »")
        else:
            ecarts.append(f"AJOUTÉ : « {' '.join(mots[j1:j2])} »")
    return debut, fin, ecarts


def decouper(groupe: list[dict], voix: str, modeles: list[str], cle: str, sep: str) -> tuple[list[array.array], list[list[tuple[str, float]]], str]:
    """Lit un groupe de scènes en une requête, aligne, coupe. Renvoie (morceaux, mots par morceau, modèle)."""
    phrases = [(sc["id"], p) for sc in groupe for p in sc["phrases"]]
    texte = "\n\n".join(sep.join(p["t"] for p in sc["phrases"]) for sc in groupe)
    wav, modele = lecture(texte, voix, modeles, cle)
    total = duree(wav)
    print(f"  lecture {'+'.join(sc['id'] for sc in groupe)} : {total:.1f} s ({modele})")

    # 2. Alignement du script sur ce qui a été prononcé (whisper.cpp sur la lecture).
    prononces = mots_prononces(wav)
    attendus, phrase_de = [], []
    for k, (_, p) in enumerate(phrases):
        for m in normaliser(p["t"]):
            attendus.append(m)
            phrase_de.append(k)
    debut_mot, _, ecarts = aligner(attendus, prononces)
    print("  écarts script / lecture :" + ("".join(f"\n    - {e}" for e in ecarts) if ecarts else " aucun"))

    def premiers_mots() -> list[float] | None:
        out = []
        for k in range(len(phrases)):
            debuts = [debut_mot[i] for i in range(len(attendus)) if phrase_de[i] == k and i in debut_mot]
            if not debuts:
                print(f"  phrase introuvable dans la transcription : {phrases[k][1]['t']}")
                return None
            out.append(min(debuts))
        return out

    premiers = premiers_mots()
    if premiers is None:  # whisper.cpp a manqué une phrase : whisper-1 sur toute la lecture, si une clé existe
        api = mots_whisper1(*lire_pcm(wav))
        if api:
            prononces = api
            debut_mot, _, ecarts = aligner(attendus, prononces)
            print("  whisper-1 sur la lecture, écarts :" + ("".join(f"\n    - {e}" for e in ecarts) if ecarts else " aucun"))
            premiers = premiers_mots()
    if premiers is None:
        raise SystemExit("Une phrase manque dans la lecture : vérifier l'audio du cache, ou relire avec un autre modèle.")

    # 3. Une coupe par frontière de phrase, au milieu d'un silence : on choisit, dans l'ordre,
    #    les silences qui maximisent « durée - 0,4 x écart au début de la phrase suivante ».
    blancs = [(a, b) for a, b in silences(wav) if a > 0.05 and b < total - 0.05]
    reperes = premiers[1:]
    n, m = len(reperes), len(blancs)
    if m < n:
        raise SystemExit(f"{m} silences pour {n} frontières de phrase : découpe impossible")

    def note(j: int, k: int) -> float:
        a, b = blancs[j]
        r = reperes[k]
        ecart = 0.0 if a - 0.15 <= r <= b else min(abs(r - a), abs(r - b))
        return (b - a) - 0.4 * ecart

    moins_inf = float("-inf")
    meilleur = [[moins_inf] * m for _ in range(n)]
    origine = [[-1] * m for _ in range(n)]
    for j in range(m):
        meilleur[0][j] = note(j, 0)
    for k in range(1, n):
        cumul, cumul_j = moins_inf, -1
        for j in range(1, m):
            if meilleur[k - 1][j - 1] > cumul:
                cumul, cumul_j = meilleur[k - 1][j - 1], j - 1
            if cumul_j >= 0:
                meilleur[k][j] = cumul + note(j, k)
                origine[k][j] = cumul_j
    coupes = [0.0, total]
    if n:
        j = max(range(m), key=lambda x: meilleur[n - 1][x])
        choix = []
        for k in range(n - 1, -1, -1):
            choix.append(j)
            j = origine[k][j]
        choix.reverse()
        coupes = [0.0] + [(blancs[j][0] + blancs[j][1]) / 2 for j in choix] + [total]
        for k, j in enumerate(choix):
            a, b = blancs[j]
            alerte = "  <- pause courte, à vérifier" if b - a < 0.2 else ""
            print(f"  coupe {k + 1:2} : silence {a:6.2f}-{b:6.2f} ({b - a:.2f} s), repère {reperes[k]:6.2f}{alerte}")

    # Rognage en copie exacte : 20 ms avant la voix, 60 ms après, aucun filtre.
    pcm, taux = lire_pcm(wav)
    morceaux: list[array.array] = []
    debut_morceau: list[float] = []
    for k, (sid, p) in enumerate(phrases):
        a, b = int(round(coupes[k] * taux)), int(round(coupes[k + 1] * taux))
        brut = pcm[a:b]
        v0, v1 = zone_voix(brut, taux)
        d, f = max(0, v0 - int(0.02 * taux)), min(len(brut), v1 + int(0.06 * taux))
        morceaux.append(brut[d:f])
        debut_morceau.append((a + d) / taux)
        entendu = " ".join(mm for mm, t0, _ in prononces if coupes[k] <= t0 < coupes[k + 1])
        print(f"  {sid:3} {len(morceaux[-1]) / taux:5.2f} s  {p['t']}\n{'':12}entendu : {entendu}")

    # Mots horodatés dans chaque morceau (secondes depuis le début du morceau).
    mots_morceau: list[list[tuple[str, float]]] = []
    for k, (_, p) in enumerate(phrases):
        jetons = normaliser(p["t"])
        api = mots_whisper1(morceaux[k], taux)
        if api:
            deb, _, _ = aligner(jetons, api)
            mots_morceau.append([(jetons[i], deb[i]) for i in range(len(jetons)) if i in deb])
        else:
            ids = [i for i in range(len(attendus)) if phrase_de[i] == k and i in debut_mot]
            mots_morceau.append([(attendus[i], max(0.0, debut_mot[i] - debut_morceau[k])) for i in ids])
    return morceaux, mots_morceau, modele


def main() -> None:
    script = json.load(open(os.path.join(ICI, "voix.json"), encoding="utf-8"))
    voix, modeles, cle = script["voix"], script["modeles"], cle_gemini()
    sep = script.get("separateur_phrases", "\n\n")
    maxi = script.get("max_chars", 650)

    # 1. Le moins de lectures possible : des scènes consécutives tant que le texte tient dans max_chars.
    groupes: list[list[dict]] = [[]]
    for sc in script["scenes"]:
        taille = lambda g: sum(len(p["t"]) + 2 for s2 in g for p in s2["phrases"])
        if groupes[-1] and taille(groupes[-1] + [sc]) > maxi:
            groupes.append([])
        groupes[-1].append(sc)
    print(f"  {len(groupes)} lecture(s) : " + ", ".join("+".join(sc["id"] for sc in g) for g in groupes))
    morceaux, mots_morceau, modele = [], [], ""
    for g in groupes:
        mo, mm, modele = decouper(g, voix, modeles, cle, sep)
        morceaux += mo
        mots_morceau += mm
    taux = TAUX

    # 4. Pose : chaque phrase à son instant « at », jamais avant la fin de la précédente.
    timing = {"fps": 30, "voix": voix, "modele": modele, "scenes": {}}
    pos, k = 0.0, 0
    placements: list[tuple[int, float]] = []  # (morceau, début absolu)
    for sc in script["scenes"]:
        t, lignes = 0.0, []
        for j, p in enumerate(sc["phrases"]):
            debut = p["at"] if j == 0 else max(p["at"], t + script["pause_s"])
            if j > 0 and debut > p["at"] + 0.01:
                print(f"  {sc['id']} : « {p['t'][:40]}… » repoussé de {debut - p['at']:.2f} s (phrase précédente trop longue)")
            dur_p = len(morceaux[k]) / taux
            lignes.append({"t": p.get("c", p["t"]), "at_s": round(debut, 3), "fin_s": round(debut + dur_p, 3),
                           "mots": [{"w": w, "s": round(debut + s, 3)} for w, s in mots_morceau[k]]})
            placements.append((k, pos + debut))
            t = debut + dur_p
            k += 1
        dur = max(sc["min_s"], t + sc["tail_s"])
        if dur > sc["min_s"] + 0.01:
            print(f"  {sc['id']} : scène prolongée de {dur - sc['min_s']:.2f} s pour la voix")
        timing["scenes"][sc["id"]] = {"start_s": round(pos, 3), "dur_s": round(dur, 3), "phrases": lignes}
        pos += dur
    timing["total_s"] = round(pos, 3)

    piste = array.array("h", bytes(2 * (int(round(pos * taux)) + 1)))
    for kk, debut in placements:
        s0 = int(round(debut * taux))
        piste[s0:s0 + len(morceaux[kk])] = morceaux[kk]
    wav_final = os.path.join(SORTIE, "track.wav")
    ecrire_pcm(wav_final, piste, taux)
    ffmpeg("-i", wav_final, "-c:a", "flac", "-compression_level", "8", os.path.join(SORTIE, "track.flac"))
    os.remove(wav_final)
    json.dump(timing, open(os.path.join(SORTIE, "timing.json"), "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    print(f"\nDurée totale : {pos:.2f} s  ->  {os.path.join(SORTIE, 'timing.json')} et track.flac")


if __name__ == "__main__":
    main()
