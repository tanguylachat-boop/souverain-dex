"""
Contrôle de la voix off posée : retranscrit chaque phrase, seule, depuis la piste finale
(scripts/demo/voix/track.flac aux instants de scripts/demo/voix/timing.json) et la compare au
script. Le défaut à attraper est la fuite aux bords : une phrase qui commence par le dernier mot
de la précédente, ou qui perd son premier mot. Les écarts internes homophones (« comparez » pour
« comparé ») sont signalés sans faire échouer. Repris de ~/mentia-motion/scripts/verifier_voix.py.

Usage : python3 scripts/demo/verifier_voix.py        (whisper-1 si une clé OpenAI existe, sinon whisper.cpp)
"""
import array, difflib, json, os, subprocess, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from voix import CACHE, ICI, WHISPER_MODELE, ffmpeg, lire_pcm, mots_whisper1, normaliser  # noqa: E402

# Ce que whisper écrit autrement que le script, pour ce texte-ci.
EQUIVALENTS = {
    "30": ["trente"], "lxstudio": ["l", "x", "studio", "point"], "lx": ["l", "x"], "ch": ["c", "h"],
    "comparez": ["compare"], "mesurez": ["mesure"], "installez": ["installee"], "branchez": ["branchee"],
}


def main() -> None:
    timing = json.load(open(os.path.join(ICI, "voix", "timing.json"), encoding="utf-8"))
    script = json.load(open(os.path.join(ICI, "voix.json"), encoding="utf-8"))
    lus = {sc["id"]: [p["t"] for p in sc["phrases"]] for sc in script["scenes"]}
    wav = os.path.join(CACHE, "track-verif.wav")
    ffmpeg("-i", os.path.join(ICI, "voix", "track.flac"), wav)
    pcm, taux = lire_pcm(wav)
    fuites, total = 0, 0
    for sid, sc in timing["scenes"].items():
        for j, p in enumerate(sc["phrases"]):
            total += 1
            a, b = int((sc["start_s"] + p["at_s"] - 0.05) * taux), int((sc["start_s"] + p["fin_s"] + 0.05) * taux)
            morceau = array.array("h", pcm[max(0, a):b])
            mots = mots_whisper1(morceau, taux)
            if mots is None:
                tmp = os.path.join(CACHE, "verif-piece.wav")
                from voix import ecrire_pcm
                ecrire_pcm(tmp, morceau, taux)
                subprocess.run(["whisper-cli", "-m", WHISPER_MODELE, "-l", "fr", "-otxt", "-np", "-t", "8", "-f", tmp],
                               check=True, capture_output=True)
                mots = [(m, 0, 0) for m in normaliser(open(tmp + ".txt", encoding="utf-8").read())]
            entendu = []
            for m, _, _ in mots:
                entendu += EQUIVALENTS.get(m, [m])
            voulu = []
            for m in normaliser(lus[sid][j]):
                voulu += EQUIVALENTS.get(m, [m])
            if entendu == voulu:
                print(f"  OK   {sid} {lus[sid][j]}")
                continue
            bords = bool(entendu) and entendu[0] == voulu[0] and entendu[-1] == voulu[-1]
            ratio = difflib.SequenceMatcher(None, voulu, entendu).ratio()
            if bords and ratio >= 0.75:
                print(f"  ~OK  {sid} {lus[sid][j]}\n         entendu : {' '.join(entendu)}  (bords justes, écart interne)")
            else:
                fuites += 1
                print(f"  KO   {sid} {lus[sid][j]}\n         entendu : {' '.join(entendu)}")
    os.remove(wav)
    print(f"\n{total - fuites}/{total} phrases sans fuite aux bords")
    sys.exit(1 if fuites else 0)


if __name__ == "__main__":
    main()
