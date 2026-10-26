# La démo en 2 minutes : script, voix off et storyboard

Vidéo en motion design, 1920 × 1080 à 30 images par seconde, 1 min 60 s (119,9 s), fabriquée en
code (`scripts/demo/demo.html`, rendue par `npm run demo`), avec une voix off de synthèse.

## La voix off

Celle des films Mentia et LX Sales Coach : Gemini TTS, voix « Achird », méthode reprise de
`~/mentia-motion/scripts/voix.py` le 24.10.2026 et portée dans `scripts/demo/voix.py`
(`npm run demo:voix`) :

1. Gemini lit le script (`scripts/demo/voix.json`), une phrase par paragraphe, en trois lectures
   de scènes consécutives (au-delà d'environ 650 caractères, le modèle a rendu une réponse sans
   audio). Modèle utilisé le 25.10.2026 : `gemini-3.8-flash-tts`, les modèles suivants de la
   liste servent de repli quand le quota gratuit du jour (10 requêtes par modèle) est atteint.
2. whisper.cpp retranscrit chaque lecture mot par mot, en local, pour vérifier que chaque mot a
   été prononcé et repérer le début de chaque phrase ; whisper-1 (OpenAI) horodate les mots.
3. Chaque phrase est coupée au milieu du silence qui la sépare de la suivante, en copie exacte de
   la lecture, puis posée sur sa scène à l'instant choisi (`at` dans `voix.json`).
4. La scène lit ce minutage (`scripts/demo/voix/timing.json`) : chaque scène commence et dure
   selon la voix, et les éléments qui doivent tomber sur un mot le lisent dans le minutage (le
   document qui part du scanner sur « scanner », chaque champ de la facture sur son nom, le clic
   sur « valider », l'étiquette sur « Avec la raison », le tampon sur « Mesuré chez vous »).
5. `python3 scripts/demo/verifier_voix.py` retranscrit chaque phrase depuis la piste finale et
   la compare au script : 23/23 phrases sans fuite aux bords le 25.10.2026.

Piste : `scripts/demo/voix/track.flac`, mono 24 kHz, -16,6 LUFS intégrés, crête -1,4 dBFS ;
AAC 96 kb/s dans les mp4, Opus 48 kb/s dans le webm. Sans musique.

Règles tenues : vouvoiement, phrases courtes, aucun tiret long, aucun chiffre présenté comme un
résultat client (la facture est marquée « EXEMPLE », le rapport mensuel n'affiche aucune valeur),
aucune marque de logiciel montrée comme logo (« votre logiciel comptable » ; Bexio nommé en texte
dans le schéma du réseau, comme sur le site), TVA à 8,1 %, montants au format suisse.

## Scène par scène

| Temps | Scène | Voix off (mot pour mot) | À l'écran | Visuel |
| --- | --- | --- | --- | --- |
| 0:00 à 0:06 | Titre | Voici ce qui se passe quand une pièce comptable arrive dans un cabinet équipé par LX Studio. | LA DÉMO EN 2 MINUTES. **Une pièce comptable, du scan à l'écriture validée.** Sans qu'elle quitte le cabinet. | Nappe de nuit, marque LX Studio en haut à gauche. |
| 0:06 à 0:20 | 01 · Où ça tourne | La machine est chez vous. Installée dans vos locaux, branchée sur votre réseau. Pendant le traitement, aucun appel ne part vers un service externe : ni vers un éditeur d'intelligence artificielle, ni vers LX Studio. | **La machine est chez vous.** Installée dans vos locaux, branchée sur votre réseau. Pendant le traitement, aucun appel vers un service externe. | Schéma qui se dessine : le cadre « VOS LOCAUX », la machine, vos postes, vos dossiers et Bexio, le réseau interne ; à droite, hors du cadre, « Internet, cloud, éditeurs d'IA », le lien barré en rouge sur « aucun appel » : AUCUN APPEL PENDANT LE TRAITEMENT. |
| 0:20 à 0:34 | 02 · L'arrivée | Les pièces arrivent comme aujourd'hui. Par le scanner, par e-mail, par une photo prise au téléphone. Rien ne change pour vos clients ni pour vos collaborateurs. | **Les pièces arrivent comme aujourd'hui.** Scanner, e-mail, photo. Rien ne change pour vos clients ni pour vos collaborateurs. | Trois sources à gauche ; un document part de chaque source quand la voix la nomme, puis deux autres suivent, dans la fente de la machine dont l'anneau tourne. |
| 0:34 à 0:49 | 03 · La lecture | La pièce est lue sur place. Le fournisseur, la date, les montants, la TVA, la référence de la facture QR : tout est extrait sur la machine, dans vos murs. | **Lue sur place.** Fournisseur, date, montants, TVA, référence QR : extraits sur la machine, dans vos murs. | La facture d'exemple (Fournisseur Exemple SA, F-2026-0418, 14.10.2026, CHF 1'250.00 HT, TVA 8,1 % CHF 101.25, total CHF 1'351.25, facture QR) ; une ligne de lecture descend, chaque champ est encadré en bleu quand la voix le nomme, sa valeur apparaît à gauche (fournisseur, date, HT, total, TVA, référence QR). |
| 0:49 à 1:01 | 04 · Le classement | Elle est ensuite classée dans le dossier du bon mandat. Et renommée selon votre convention, prête pour l'archivage. | **Classée, renommée.** Dans le dossier du bon mandat, nommée selon votre convention, prête pour l'archivage. | La facture se réduit en fichier et file dans l'arborescence Mandats › Boulangerie Exemple SA › 2026 › Fournisseurs ; « scan_0418.pdf » devient « 2026-10-14_Fournisseur-Exemple-SA_F-2026-0418.pdf » sur « renommée ». |
| 1:01 à 1:23 | 05 · La validation | L'écriture est proposée dans votre logiciel comptable, avec le compte et le code TVA déduits de vos écritures passées. Un clic pour valider. Un clic pour corriger. Si vous corrigez, le système retient la correction pour ce mandat et la propose la fois suivante. | **L'écriture est proposée. Vous validez.** Compte et code TVA proposés d'après vos écritures passées. Un clic pour valider, un clic pour corriger. Puis : Vous corrigez ? Le système retient la correction pour ce mandat et la propose la fois suivante. | Écran « Écriture proposée », badge « Confiance : élevée », les huit lignes, boutons Corriger / Valider ; le curseur clique Valider sur le mot « valider », « Écriture validée, envoyée dans votre logiciel comptable » ; la note apparaît sur « Si vous corrigez ». |
| 1:23 à 1:37 | 06 · Le doute | Ce qu'il ne comprend pas, il le met de côté. Avec la raison. Rien n'est comptabilisé sans votre clic. | **Ce qu'il ne comprend pas, il le met de côté.** Avec la raison. Rien n'est comptabilisé sans votre clic. | Un ticket flou passe devant la machine, un « ? » apparaît, le ticket part dans le bac « À traiter à la main » ; l'étiquette « Montant illisible » tombe sur « Avec la raison ». |
| 1:37 à 1:51 | 07 · Le contrôle | Et chaque mois, un rapport : les pièces traitées, les heures de saisie récupérées, les corrections apportées. Comparé à la mesure faite avant l'installation. Mesuré chez vous, pas promis. | **Chaque mois, un rapport.** Pièces traitées, heures récupérées, corrections. Mesuré chez vous, pas promis. | Carte « Rapport mensuel, comparé à la mesure faite avant l'installation », trois barres qui se remplissent sans chiffre ; le tampon « Mesuré chez vous » tombe sur les mêmes mots. |
| 1:51 à 2:00 | Fin | Rien n'est sorti du cabinet. Réservez un diagnostic gratuit de 30 minutes sur lxstudio.ch. | **Rien n'est sorti du cabinet.** Réserver un diagnostic gratuit de 30 minutes · lxstudio.ch · Jura · Suisse romande | Pastille et adresse, qui apparaissent avec la seconde phrase. |

Dans `voix.json`, la dernière phrase est écrite « trente minutes sur L X Studio point C H » pour
que la voix la lise comme on la dit ; le texte affiché sur le site reste « 30 minutes sur
lxstudio.ch ».

## Ce qui reste ouvert

- La voix de Tanguy à la place de la synthèse (meilleure preuve) : enregistrer les 23 phrases
  ci-dessus, une par fichier, les déposer à la place des morceaux et relancer la pose ; le texte
  ne change pas.
- Musique : aucune. Une nappe discrète peut être ajoutée au mixage dans `scripts/demo/render.mjs`
  si le site la lance avec le son coupé par défaut.
- La facture, le mandat et les comptes sont des exemples. Si Tanguy préfère un cas réel
  anonymisé, remplacer les valeurs dans `scripts/demo/demo.html` (scène 3 et scène 5) et relancer
  `npm run demo`.
