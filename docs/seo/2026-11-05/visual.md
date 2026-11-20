# Analyse visuelle de lxstudio.ch

Date : 05.11.2026. Outil : Playwright 1.64 (Chromium headless), script maison dans `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/audit_visual.py` plus quatre sondes ciblées (`probe_visual.py`, `probe_mobile_home.py`, `probe_extra.py`, `probe_anchor.py`, `probe_video.py` dans le même dossier).

Tailles testées : mobile 390 x 844 (DPR 2, user agent iPhone, tactile) et bureau 1440 x 900 (DPR 1). Pages : `/`, `/fiduciaires`, `/securite`, `/ressources` et l'article `/ressources/fiduciaire-automatiser-saisie-pieces-ia` (pris dans le sitemap). Toutes les captures sont dans `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/` (premier écran `_fold`, premier rendu `_t0`, pleine page `_full`, deuxième écran `_screen2`, plus les captures de sonde). Les mesures DOM sont dans `measures.json`, `probe.json`, `probe_extra.json`, `probe_anchor.json` et la feuille de style téléchargée dans `css/styles.css`, même dossier parent.

## 1. Score : 68 / 100

Le site est propre, cohérent et sans défaut de mise en page structurel : aucun débordement horizontal, aucun décalage de mise en page (CLS mesuré à 0 sur les dix captures), menu mobile complet, formulaires bien étiquetés, respect de `prefers-reduced-motion`. Trois sujets coûtent les points :

1. Les animations retardent la lecture du message : le premier écran mobile n'est lisible que 2 secondes après le premier rendu, et un titre de section reste vide jusqu'à 1,3 seconde puis se termine à 3 secondes après un saut d'ancre (bouton « Réserver un diagnostic »).
2. La vidéo démo : le bouton lecture et son libellé sont posés sur le titre incrusté dans l'affiche (mobile et bureau), le cercle de lecture est presque invisible, et à 342 px de large le texte de la vidéo est illisible sur mobile.
3. Les petites tailles sur mobile : boutons d'action principaux à 13 px et 42 px de haut, libellés à 10 et 11 px, champs à 15 px (zoom automatique sur iPhone), bouton « retour en haut » qui recouvre la fin des lignes de texte.

Détail du score en section 6.

## 2. Premier écran, page par page

### Mobile 390 x 844

| Page | Message principal (H1) | Appel à l'action visible sans défiler | Constat | Capture |
| --- | --- | --- | --- | --- |
| `/` | H1 32,8 px sur 3 lignes, y 230 à 338 | Oui : « Réserver un diagnostic gratuit de 30 minutes » (pleine largeur, y 468) et « Voir la démo en 2 minutes » (y 520) | Bon ordre eyebrow, titre, paragraphe, deux boutons, ligne de confiance. Illustration de la machine à 32 % d'opacité derrière le paragraphe (étiquette « LX Studio » lisible entre « pièces » et « rapports »). Boutons 13 px, 42 px de haut. | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_fold.png` |
| `/fiduciaires` | H1 31,2 px sur 4 lignes, y 166 à 301 | Oui : bouton principal (y 467) mais le libellé passe sur deux lignes avec la flèche isolée à droite (seul cas du site), puis « Télécharger le dossier sécurité (PDF) » (y 534) | Hero complet avant la ligne de flottaison, début de la section suivante visible. | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/fiduciaires_mobile_fold.png` |
| `/securite` | H1 31,2 px sur 4 lignes | Partiel : seul « Télécharger le dossier sécurité (PDF) » (y 467). Aucun bouton de prise de rendez-vous au premier écran, le CTA de l'en-tête est caché derrière le menu hamburger | Sous le hero, les pastilles d'ancre (« Où tournent les données », « Architecture »…) à 13,5 px. | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/securite_mobile_fold.png` |
| `/ressources` | H1 31,2 px sur 3 lignes | Aucun bouton (page de liste, acceptable). Le H2 « Une question par article » et la première carte apparaissent dès le premier écran | Hiérarchie claire. | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/ressources_mobile_fold.png` |
| Article | H1 31,2 px sur 4 lignes, auteur, date, durée | Aucun (article). Le chapeau 19 px commence à mi-écran | Bon : la réponse est lisible dès le premier écran. | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/article_mobile_fold.png` |

Point commun à toutes les pages mobiles : ce que montre la capture `_fold` n'existe qu'après la fin des animations d'entrée. Sur un chargement rapide, 150 ms après le DOM, l'écran est un voile gris sans titre ni bouton : `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/fiduciaires_mobile_t0.png`. Le film de la page d'accueil (sonde performance du même dossier) date la séquence : 391 ms écran blanc, 783 ms voile et ligne de confiance seule, 1 174 ms première ligne du titre, 1 565 ms titre complet et boutons à demi, 1 956 ms premier écran lisible (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/film/home-mobile-f1-783ms.jpg` à `home-mobile-f4-1956ms.jpg`).

### Bureau 1440 x 900

| Page | H1 | CTA visible sans défiler | Constat | Capture |
| --- | --- | --- | --- | --- |
| `/` | 70,6 px, 3 lignes | Oui : deux boutons à y 652 (52 px de haut, 15 px) plus le CTA d'en-tête | Hero complet avec illustration de la machine « HORS LIGNE » à droite, trois pastilles de confiance. Le plus abouti des cinq. | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_bureau_fold.png` |
| `/fiduciaires` | 70,6 px, 4 lignes | Oui, deux boutons | Toute la moitié droite du hero est vide (halo bleu seul). | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/fiduciaires_bureau_fold.png` |
| `/securite` | 70,6 px, 3 lignes | Oui : PDF seulement (plus le CTA d'en-tête) | Même moitié droite vide. | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/securite_bureau_fold.png` |
| `/ressources` | 70,6 px, 2 lignes | CTA d'en-tête seulement | Hero court, le H2 de la liste est visible. | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/ressources_bureau_fold.png` |
| Article | 70,6 px, 3 lignes | CTA d'en-tête seulement | Chapeau 22 px dans une colonne de 664 px. | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/article_bureau_fold.png` |

## 3. Constats par thème

### 3.1 Hiérarchie visuelle

Le système est homogène d'une page à l'autre : eyebrow en capitales espacées, titre gras, texte gris, cartes blanches ou bleu nuit, numéros 01 à 03. Les sections se reconnaissent au premier regard, sur mobile comme sur bureau (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_bureau_s3.png`, `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/fiduciaires_mobile_y1700.png`).

Trois faiblesses :

- Le bouton « Retour en haut de la page » (46 x 46 px, fixé en bas à droite) recouvre la fin des lignes de texte sur mobile : « permet pas. » dans une carte de `/fiduciaires`, « le type de » dans l'article (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/fiduciaires_mobile_y1700.png`, `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/article_mobile_y2000.png`).
- L'en-tête fixe devient translucide (fond à 74 %) et le texte qui défile derrière reste lisible, ce qui brouille le logo et les liens de navigation (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/article_bureau_y1500.png`, `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_screen2.png`). Cause vérifiée dans `css/styles.css` : le flou est déclaré uniquement en `-webkit-backdrop-filter` (11 occurrences, 0 en `backdrop-filter`). Chromium répond `CSS.supports('-webkit-backdrop-filter', ...) = false` et la valeur calculée est `none`. Le rendu des captures est donc celui de Chrome, Edge et Android ; seul Safari applique le flou. Même cause pour le cercle de lecture de la vidéo, les boutons « verre » et le bouton retour en haut.
- Sur bureau, les heros de `/fiduciaires`, `/securite`, `/ressources` et de l'article laissent 50 % de la largeur vide, là où l'accueil place son illustration.

### 3.2 Lisibilité : tailles et contrastes

Corps de texte correct : 15 px (hero mobile), 17 px (cartes, listes), 19 px (chapeau article mobile), 17 px avec interligne 29,75 px et 75 caractères par ligne dans l'article bureau (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/article_bureau_y1500.png`). Le corps de l'article est en bleu nuit à 60 % d'opacité, soit environ 5,2:1 sur le fond : conforme mais léger pour une lecture de 8 minutes.

Ce qui est trop petit ou trop pâle (mesures `measures.json`) :

- Eyebrows à 10 px sur mobile (« IA INSTALLÉE CHEZ VOUS · JURA · SUISSE ROMANDE », « FIDUCIAIRES », « RESSOURCES »), ligne de confiance à 11 px, catégories des cartes à 11 px, « RÉFÉRENCES » et mentions clients à 11 px, libellés « CE QU'ON INSTALLE » à 12 px. Sur l'accueil mobile, 40 blocs de texte sont sous 14 px.
- Boutons principaux du hero mobile à 13 px dans une pilule de 42 px (bureau : 15 px, 52 px).
- Dates et durées de lecture des cartes (« 24.10.2026 · 7 min de lecture ») à 13 px et 2,87:1 ; pied de page « 2026 LX Studio, Bassecourt » à 13 px et 3,62:1 ; sous le seuil de 4,5:1 (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/ressources_mobile_y1700.png`, `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_footer.png`).
- Hero mobile mesuré sur les pixels de la capture : le paragraphe (blanc à 78 %) donne 4,15:1 en médiane sur le dégradé et tombe à 1,6:1 là où l'illustration passe derrière ; le H1 blanc sur le halo bleu clair en haut à droite (« Vos », « quittent ») est à 3,0:1, limite basse pour un gros titre (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_fold.png`). Sur bureau le paragraphe reste dans la zone sombre (8,9:1).

### 3.3 Les éléments qui bougent et leur effet sur la compréhension

Inventaire (`measures.json`, `css/styles.css`) : 25 animations CSS actives sur l'accueil mobile, 34 sur bureau. En boucle infinie : nappe de fond `iaDrift` 18 s, halo `iaGlow` 9 s, machine `iaFloatBig` 8 s, documents 6 s, anneaux 3,6 s et 14 s, LED 2,4 s, repère de défilement 1,4 s, pastilles 6 s (bureau). À l'entrée : fondu de `main` 0,6 s, titre mot par mot `iaWordUp` 1,15 s avec 70 ms de décalage par mot et 0,2 s de départ, eyebrow et rangée de boutons `iaRise` 1 s. Au défilement : 54 éléments `[data-rv]` à opacité 0 et décalés de 34 px, transition 0,55 s plus délai ; chaque H2 est découpé en mots masqués (`translateY(115 %)`) révélés avec le même décalage de 70 ms.

Effets mesurés :

- Premier écran mobile lisible environ 2 s après le premier rendu (séquence du film en section 2). Un titre de 10 mots met 0,2 + 9 x 0,07 + 1,15 = 2 s à s'assembler ; les boutons arrivent ensuite.
- Après un saut d'ancre (menu mobile puis « Réserver un diagnostic », ou CTA d'en-tête sur bureau, cible `#diagnostic`) : `scroll-behavior: smooth` fait durer le défilement 1,2 s pendant lequel les sections traversées sont blanches (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_anchor_diag_800ms.png`) ; à 1,3 s le formulaire est visible mais les 19 mots du titre sont encore masqués ; à 2 s il en manque 14 ; le titre est complet à 3 s (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_anchor_diag_1300ms.png`, `.../accueil_mobile_anchor_diag_2000ms.png`, `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_bureau_anchor_diag_800ms.png`).
- Un défilement rapide montre des écrans vides puis des titres qui s'assemblent : `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_h2_reveal_t100ms.png` (section « Le problème » 100 ms après son arrivée : eyebrow pâle, titre absent, carte à 15 %). Même phénomène sur bureau, dernier mot « clients. » encore en mouvement 700 ms après le défilement (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/fiduciaires_bureau_y2000.png`).
- Points positifs : aucun décalage de mise en page (CLS 0), et avec `prefers-reduced-motion: reduce` tout est affiché d'emblée, une seule animation subsiste (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_reduced_motion_y2400.png`). Le lien « Voir la démo » sur bureau atteint une section déjà révélée en 400 ms.

### 3.4 Cohérence mobile et bureau

Même ordre de sections, mêmes textes, mêmes composants. Le tableau comparatif « Une IA générique / LX Studio » se réorganise en paires de cartes sur mobile et reste lisible (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/fiduciaires_mobile_y3400.png` contre `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/fiduciaires_bureau_y3200.png`). Le menu mobile plein écran reprend les trois métiers avec leur promesse, Sécurité, Ressources et le CTA ; bouton « Menu » 44 x 44 px avec `aria-expanded` et `aria-controls`, défilement verrouillé, fermeture par Échap vérifiée (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_menu.png`). Le menu « Métiers » bureau est un panneau à trois colonnes lisible (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_bureau_menu_metiers.png`).

Écarts : CTA sur deux lignes sur `/fiduciaires` mobile ; deux destinations pour un même libellé (« Réserver un diagnostic » de l'en-tête et du menu va au formulaire `/#diagnostic`, le bouton du hero va directement sur cal.com) ; carte « Oasis Drink » sans logo au milieu de deux logos.

### 3.5 Débordements horizontaux

Aucun sur les dix captures : `scrollWidth` égal à la largeur du viewport, `overflow-x: clip` sur `body`. Les éléments qui dépassent sont décoratifs et volontairement rognés (nappes `ia-mesh-css`, illustration de la machine rognée à droite sur mobile, champ anti-robot « Votre site » à -9999 px).

### 3.6 Vidéo démo (affiche, bouton)

Implémentation (`src/components/ia/sections.tsx` du dépôt, confirmée en ligne) : affiche JPG 1920 x 1080 de 107 Ko chargée en différé dans un `<button>` plein cadre ; au clic, remplacement par `<video controls autoplay playsinline poster>` avec sources webm 3,6 Mo et mp4 4,0 Mo, durée 1 min 59. Pas de piste de sous-titres (`textTracks` vide) mais le texte complet est dans un `<details>` « Le texte de la vidéo » : bon.

Problèmes :

- L'affiche contient déjà un titre incrusté (« Une pièce comptable, du scan à l'écriture validée. », « Sans qu'elle quitte le cabinet. ») et la couche HTML centre par-dessus un cercle de 72 px et le libellé « VOIR LA DÉMO EN 2 MINUTES » : le cercle est posé sur le mot « comptable », le libellé sur la deuxième ligne du titre ou collé à « Sans qu'elle quitte le cabinet. » (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_bureau_demo_card.png`, `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_demo_card.png`).
- Le cercle de lecture est blanc à 12 % avec bordure à 30 % et sans flou hors Safari : il se devine à peine, le libellé est à 13 px espacé de 0,18 em.
- Sur mobile le lecteur fait 342 x 192 px en ligne (`playsinline`). Le titre de scène reste lisible mais les champs extraits (fournisseur, date, montants, TVA) et la facture, qui sont la preuve que la vidéo veut montrer, sont illisibles ; les commandes natives couvrent le tiers bas en pause (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_video_frame_40s.png` contre `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_bureau_video_frame_40s.png`, image à 40 s).
- Depuis le hero, « Voir la démo en 2 minutes » amène sur mobile au texte de la section, avec la vidéo tout en bas de l'écran (y 620 à 812) et 170 px de fin de hero en haut (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_demo_landing.png`).
- La lecture démarre au clic avec le son dans Chromium (`paused: false`, `muted: false`, 2,9 s lus à 3,5 s) : `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_demo_after_click.png`. Comme l'élément `<video>` est monté après le clic et compte sur `autoplay`, Safari iOS peut refuser le démarrage sonore et exiger un second toucher : à vérifier sur un vrai iPhone.

### 3.7 Formulaires sur mobile

Formulaire « Demander mon diagnostic » (toutes les pages) : 6 champs plus consentement, étiquettes visibles au-dessus des champs, champs de 52 px, `autocomplete` (name, organization, email, tel) et `inputmode` (email, tel) présents, `required` posé, case de consentement décochée par défaut avec lien vers la politique, champ anti-robot hors écran, anneau de focus bleu net, bouton 52 px (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_form1_focus.png`, `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_form1_bottom.png`). Formulaire « Recevoir le dossier » sur `/fiduciaires` et `/securite` : 3 champs plus consentement, même qualité (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/fiduciaires_mobile_form1_focus.png`, `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/securite_mobile_form1.png`).

À corriger : police des champs à 15 px (Safari iOS zoome la page au focus sous 16 px), case à cocher de 38 x 28 px, texte du consentement à 13 px, bordure des champs à 14 % d'opacité (1,36:1) qui ne se distingue que grâce au fond gris de la carte. Le bouton « Télécharger le dossier sécurité (PDF) » du hero mène au formulaire et non à un fichier : le verbe promet plus que l'action.

### 3.8 Images

Affiche vidéo 1920 x 1080 en JPG de 107 Ko, `loading="lazy"`, `alt=""` (décorative dans un bouton qui porte le texte) : correct. Logos clients en niveaux de gris avec `alt` : `facchinetti.png` 640 x 158 affiché 193 x 48, `richoz.webp` 350 x 131 affiché 192 x 72, pas de logo Oasis Drink (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_y1500.png`). Illustration du hero et pictos des cartes métiers en SVG en ligne avec description, nets à toute densité (`/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_y6200.png`). Aucune image cassée. Poids au premier chargement de l'accueil mobile : JS 513 Ko (dont `main` 452 Ko), CSS 47 Ko, police 25 Ko, images 134 Ko (sujet de la sonde performance, cité ici parce que le JS porte les révélations au défilement).

## 4. Tableau des constats

Gravité : Haute (nuit directement à la compréhension ou à l'action), Moyenne (gêne mesurable), Faible (finition).

| Page | Taille | Constat | Gravité | Correction | Preuve |
| --- | --- | --- | --- | --- | --- |
| Toutes | Mobile | Premier écran lisible 2 s après le premier rendu : voile gris, titre mot par mot (1,15 s + 70 ms par mot + 0,2 s), boutons ensuite | Haute | Supprimer le fondu de `main` ; ramener le titre à 0,5 s total (décalage 20 ms par mot, pas de délai) ou n'animer que le hero bureau ; faire apparaître les boutons avec le titre | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/fiduciaires_mobile_t0.png`, `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/film/home-mobile-f2-1174ms.jpg` |
| `/` | Mobile et bureau | Après « Réserver un diagnostic » (menu ou en-tête), défilement doux de 1,2 s sur des sections blanches, titre du formulaire masqué jusqu'à 1,3 s et complet à 3 s | Haute | Révéler d'emblée la section cible d'une ancre (classe `in` posée au clic ou `IntersectionObserver` avec marge de 100 %) ; limiter `scroll-behavior: smooth` aux ancres internes courtes ou le retirer sur mobile ; pas de découpage en mots pour les H2 | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_anchor_diag_800ms.png`, `.../accueil_mobile_anchor_diag_1300ms.png`, `.../accueil_bureau_anchor_diag_800ms.png` |
| `/` | Mobile et bureau | Cercle de lecture et libellé « VOIR LA DÉMO EN 2 MINUTES » posés sur le titre incrusté de l'affiche ; cercle blanc à 12 % quasi invisible | Haute | Refaire l'affiche sans texte au centre (titre en haut, zone libre au milieu) ou déplacer la couche HTML en bas à gauche ; cercle plein (accent ou blanc) de 64 px, libellé 15 px | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_bureau_demo_card.png`, `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_demo_card.png` |
| `/` | Mobile | Lecteur de 342 x 192 px : champs extraits et facture illisibles, commandes natives sur le tiers bas | Haute | Sous 760 px, passer en plein écran au toucher (`requestFullscreen` ou `webkitEnterFullscreen`) ou produire une version mobile de la vidéo avec typographie doublée ; au minimum un bouton « Plein écran » explicite | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_video_frame_40s.png` |
| Toutes | Mobile | Boutons principaux du hero à 13 px dans 42 px de haut (bureau 15 px, 52 px) | Moyenne | 15 px minimum, hauteur 48 px, `white-space: normal` avec flèche alignée sur la première ligne | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_fold.png` |
| Toutes | Mobile et bureau | En-tête fixe translucide sans flou hors Safari (`-webkit-backdrop-filter` seul, `backdrop-filter` absent) : texte qui défile lisible derrière le logo et la navigation | Moyenne | Ajouter la propriété `backdrop-filter` non préfixée (en-tête, boutons verre, cercle de lecture, retour en haut) et monter le fond de l'en-tête à 90 % | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/article_bureau_y1500.png`, `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_screen2.png`, `css/styles.css` |
| Toutes | Mobile | Bouton « Retour en haut » 46 x 46 px fixé en bas à droite qui recouvre la fin des lignes de texte | Moyenne | Le retirer sous 760 px, ou l'afficher seulement après 3 écrans et le réduire à 36 px avec 90 % d'opacité, ou le placer dans le pied de page | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/fiduciaires_mobile_y1700.png`, `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/article_mobile_y2000.png` |
| Toutes | Mobile | Champs de formulaire à 15 px : zoom automatique au focus sur Safari iOS (déduit de la mesure, non reproduit dans Chromium) | Moyenne | `font-size: 16px` sur `input`, `select`, `textarea` sous 760 px | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_form1_focus.png`, `measures.json` |
| `/` | Mobile | Paragraphe du hero (blanc 78 %) à 4,15:1 en médiane et 1,6:1 derrière l'illustration ; H1 à 3,0:1 sur le halo clair | Moyenne | Illustration sous le texte (après les boutons) ou opacité 15 % ; paragraphe à 92 % ; assombrir le halo derrière la colonne de texte | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_fold.png` |
| Toutes | Mobile | Eyebrows à 10 px, ligne de confiance et catégories à 11 px, libellés de tableau à 12 px (40 blocs sous 14 px sur l'accueil) | Moyenne | 12 px minimum pour tout texte en capitales espacées, 13 px pour les catégories | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_fold.png`, `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/ressources_mobile_y1700.png` |
| `/ressources`, article, `/` | Mobile et bureau | Dates et durées de lecture à 13 px et 2,87:1 ; pied de page à 3,62:1 | Faible | Passer le gris des métadonnées à 60 % d'opacité (environ 5:1) et le pied de page à 55 % | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/ressources_mobile_y1700.png`, `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_footer.png` |
| `/securite` | Mobile | Aucun bouton de rendez-vous au premier écran, CTA d'en-tête caché par le hamburger | Moyenne | Ajouter « Réserver un diagnostic » en second bouton du hero, ou une barre d'action fixe en bas sur mobile | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/securite_mobile_fold.png` |
| `/` | Mobile | « Voir la démo » du hero atterrit sur le texte de la section, vidéo en bas de l'écran, 170 px de fin de hero en haut | Faible | Pointer l'ancre sur le cadre vidéo (`#demo-video`) ou placer la vidéo avant le texte sous 760 px | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_demo_landing.png` |
| `/fiduciaires`, `/securite`, `/ressources`, article | Bureau | Moitié droite du hero vide | Faible | Réutiliser une illustration SVG dédiée par page (dossier, bouclier, enveloppe du menu Métiers) ou réduire la hauteur du hero | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/fiduciaires_bureau_fold.png` |
| `/fiduciaires` | Mobile | Bouton principal sur deux lignes, flèche isolée à droite | Faible | Libellé plus court (« Réserver un diagnostic gratuit ») ou flèche sous le texte | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/fiduciaires_mobile_fold.png` |
| Toutes | Mobile | Case de consentement 38 x 28 px, texte 13 px | Faible | Case 24 x 24 px dans une zone tactile de 44 px, texte 14 px | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_form1_bottom.png` |
| `/fiduciaires`, `/securite` | Mobile et bureau | « Télécharger le dossier sécurité (PDF) » ouvre un formulaire, pas un fichier | Faible | Libellé « Recevoir le dossier sécurité (PDF) » partout | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/fiduciaires_mobile_dossier.png` |
| `/` | Mobile et bureau | Même libellé, deux destinations : en-tête et menu vers le formulaire, hero vers cal.com | Faible | Une seule destination, ou libellés distincts (« Réserver un créneau » pour cal.com) | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_menu.png`, `measures.json` |
| `/` | Mobile et bureau | Carte Oasis Drink sans logo entre deux logos | Faible | Logo en niveaux de gris ou traitement typographique assumé pour les trois | `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/accueil_mobile_y1500.png` |

## 5. Ce qui va bien (à conserver)

- H1 et appel à l'action dans le premier écran sur toutes les pages qui en ont un, mobile et bureau.
- Zéro débordement horizontal, zéro décalage de mise en page.
- Menu mobile complet et accessible, menu Métiers bureau clair.
- Formulaires courts, étiquetés, avec focus visible et consentement non coché.
- Transcription de la vidéo dans la page.
- `prefers-reduced-motion` respecté.
- Tableau comparatif correctement reconstruit sur mobile.
- Corps de texte à 17 et 19 px sur mobile, 75 caractères par ligne dans l'article bureau.

## 6. Détail du score

| Critère | Poids | Note | Justification |
| --- | --- | --- | --- |
| Premier écran mobile | 25 | 17 | Message et CTA présents partout, mais lisibles après 2 s ; CTA 13 px ; paragraphe sous 4,5:1 ; `/securite` sans rendez-vous |
| Premier écran bureau | 10 | 8 | Complet ; moitié droite vide sur quatre pages |
| Hiérarchie visuelle | 10 | 7 | Système homogène ; bouton flottant sur le texte ; en-tête translucide sans flou hors Safari |
| Lisibilité (tailles, contrastes) | 15 | 10 | Corps de texte bon ; eyebrows 10 et 11 px ; métadonnées et pied de page sous 4,5:1 |
| Animations et compréhension | 10 | 4 | Hero à 2 s, titres à 3 s après ancre, écrans vides au défilement rapide ; reduced motion et CLS 0 sauvent des points |
| Cohérence mobile et bureau | 10 | 9 | Même structure, bonne adaptation ; CTA sur deux lignes, double destination |
| Débordements horizontaux | 5 | 5 | Aucun |
| Vidéo démo | 10 | 4 | Chevauchement affiche et bouton, cercle invisible, illisible en ligne sur mobile ; transcription présente |
| Formulaires mobile | 5 | 4 | Bien construits ; 15 px et case trop petite |
| Total | 100 | 68 | |

## 7. Limites et points non testés

- Chromium headless uniquement. Non testé sur un vrai iPhone et Safari : flou de l'en-tête (présent sous Safari grâce au préfixe), zoom au focus des champs à 15 px, démarrage sonore de la vidéo après le toucher.
- Pas de tablette (768 px), pas de mode paysage, pas de navigation clavier ni lecteur d'écran, pas d'envoi de formulaire (aucune donnée soumise).
- `/administrations` et `/pme` non capturés ; un seul article sur neuf.
- Le serveur a répondu lentement par moments pendant la session (13,8 s et 8,5 s jusqu'au DOM sur deux chargements, deux connexions expirées puis reprises) ; les temps cités pour les animations sont mesurés à partir du rendu, indépendamment du réseau.
- Le contraste sur dégradé est calculé sur les pixels des captures (médiane et 95e centile des pixels de fond), les autres contrastes sur les couleurs CSS calculées.

## 8. Fichiers

- Rapport : `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/visual.md`
- Captures (128 fichiers) : `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/captures/`, dont les dix premiers écrans `accueil|fiduciaires|securite|ressources|article` x `mobile|bureau` en `_fold.png`, `_t0.png`, `_full.png`, `_screen2.png`
- Mesures : `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/measures.json`, `probe.json`, `probe_extra.json`, `probe_anchor.json` (les images de la sonde vidéo sont dans captures/, son JSON n'a pas été écrit)
- Feuille de style analysée : `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/css/styles.css`
- Source du composant vidéo : `/Users/tanguylachat/souverain-dex/src/components/ia/sections.tsx` (fonction `Demo`) et `/Users/tanguylachat/souverain-dex/src/content/ia/home.ts` (objet `DEMO`)
