# Performance web de lxstudio.ch : mesures du 05.11.2026

Toutes les valeurs de ce rapport proviennent de mesures faites le 05.11.2026 (heures en Europe/Zurich) depuis un Mac (Darwin 24.6.0, Node 22.22.0) avec Lighthouse 13.5.0 et Google Chrome 156.0.8078.80 en mode headless. Aucune valeur n'est estimée de tête. Les fichiers bruts (JSON Lighthouse, vignettes, HTML, CSS, bundles) sont listés en section 9.

## 1. Protocole

| Mesure | Détail | Heures |
| --- | --- | --- |
| Lighthouse mobile (préréglage par défaut : Moto G Power émulé, 4G lente simulée RTT 150 ms, 1,6 Mbit/s, CPU x4) et bureau (préréglage `desktop`, RTT 40 ms, 10 Mbit/s, CPU x1), catégories performance, accessibilité, bonnes pratiques, SEO | 4 séries complètes, soit 32 audits (4 pages x 2 formats x 4 séries) | série 1 : 13:41 à 13:45 ; série 2 : 13:48 à 13:51 ; série 3 : 16:19 à 16:20 ; série 4 : 16:20 à 16:22 |
| 3G lente simulée (modèle Lantern : RTT 400 ms, 400 kbit/s, CPU x4), mobile | 2 séries de 4 pages | 13:51 et 16:22 |
| 3G lente en bridage réel (méthode `devtools` de Lighthouse : latence 1 500 ms par requête, 360 kbit/s, CPU x4, soit la convention Lighthouse pour RTT 400 ms et 400 kbit/s), mobile | 2 passages sur l'accueil, /fiduciaires et l'article | 16:30 à 16:34 |
| INP en laboratoire : flux utilisateur Lighthouse (navigation, puis `timespan` avec interactions réelles envoyées par CDP), mobile, CPU x4, bridage réseau réel 4G lente | 3 passages par page, interactions différentes (section 5) | 16:23 à 16:25, 16:28 à 16:30, 16:36 à 16:39 |
| Expérience contrôlée sur l'accueil mobile (CPU x4) : même page avec une feuille de style injectée avant tout chargement (sans `filter`/`backdrop-filter`, sans animations, les deux, CPU x1), 9 audits | section 6.2 | 16:26 à 16:27 |
| En-têtes HTTP, compression, cache, dimensions réelles des images, taille Brotli potentielle (`curl`, `sips`, `brotli -q 11`, `gzip -9`) | chaque ressource du premier chargement | 13:41, 13:47, 16:18, 16:19 |
| Données terrain CrUX via l'API PageSpeed Insights | refusées : HTTP 429 « Quota exceeded » sans clé API. Aucune donnée terrain dans ce rapport | 13:47 |

Article mesuré : `https://lxstudio.ch/ressources/ia-locale-entreprise-suisse` (premier article du sitemap, `lastmod` 2026-10-24).

Règle de lecture : pour chaque page et chaque format, je donne la **médiane des séries propres** et l'étendue (min à max). Deux audits ont été exclus car contaminés par un incident réseau pendant la série 2 (coupure DNS passagère) : /fiduciaires mobile à 13:49 (premier rendu observé 1 051 ms contre 280 à 498 ms sur les autres passages) et article bureau à 13:50 (TTFB observé 18,5 s). D'autres agents utilisaient la même machine et la même connexion pendant une partie des mesures : c'est l'explication la plus probable des étendues larges sur l'accueil mobile (section 6.2).

Seuils appliqués (75e centile, Google) : LCP bon ≤ 2,5 s, à améliorer 2,5 à 4,0 s, mauvais > 4,0 s. INP bon ≤ 200 ms, à améliorer 200 à 500 ms, mauvais > 500 ms. CLS bon ≤ 0,1. TBT (laboratoire, substitut de l'INP pendant le chargement) : bon ≤ 200 ms. INP est la seule métrique d'interactivité ; FID n'existe plus dans aucun outil Chrome depuis le 09.09.2024.

## 2. Tableau de synthèse (médianes des séries propres, millisecondes sauf CLS)

| Page | Mobile perf | Mobile LCP | Mobile INP labo | Mobile TBT | Mobile CLS | Bureau perf | Bureau LCP | Bureau TBT | Bureau CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` (accueil) | 93 (93 à 97) | 2 426 (1 933 à 2 626) : bon, 74 ms de marge | 39 à 48 (menu, formulaire) ; bouton de démo 320 puis 48 | 101 (1 à 130) | 0,000 | 100 | 449 (319 à 574) | 0 | 0,000 |
| `/fiduciaires` | 98 (97 à 98) | 2 437 (2 369 à 2 509) : bon, 63 ms de marge | 30 à 49 | 0 (0 à 41) | 0,000 | 100 | 320 (313 à 549) | 0 | 0,000 |
| `/securite` | 96,5 (95 à 98) | 2 457 (1 902 à 2 470) : bon, 43 ms de marge | 30 à 50 | 0 (0 à 2) | 0,000 | 100 | 463 (320 à 601) | 0 | 0,000 |
| `/ressources/ia-locale-entreprise-suisse` | 99,5 (97 à 100) | 1 761 (1 096 à 2 324) : bon | 35 à 45 | 0 | 0,000 | 100 (un audit à 90 : TBT 229 ms à 13:45, non reproduit sur 3 autres passages) | 441 (316 à 592) | 0 | 0,000 |

Accessibilité, bonnes pratiques et SEO Lighthouse : 100/100 sur les 32 audits, aucune règle en échec.

Autres métriques mobiles (médianes) : FCP accueil 1 821 ms, /fiduciaires 997 ms, /securite 1 507 ms, article 1 354 ms. Speed Index accueil 4 492 ms (2 228 à 5 269), /fiduciaires 1 863 ms, /securite 3 577 ms, article 1 844 ms. TTFB (audit `server-response-time`) : 165, 98, 177 et 85 ms. TTFB mesuré par `curl` à 13:41 (HTTP/2, Cloudflare devant l'hébergement Lovable) : 239, 222, 229 et 138 ms.

Statut Core Web Vitals en laboratoire, mobile : LCP passe sur les 4 pages mais avec 43 à 74 ms de marge sur 3 d'entre elles ; CLS passe partout (0,000 pendant le chargement) ; TBT et INP labo passent partout sauf un passage du bouton de démo (320 ms). Verdict terrain impossible sans CrUX.

## 3. Score de performance global : 85/100 (justification)

Point de départ : moyenne des scores Lighthouse mobiles médians, 96,75 (les scores bureau sont à 100 partout et ne discriminent rien). Retraits appliqués sur des faits mesurés :

| Retrait | Motif mesuré |
| --- | --- |
| moins 6 | Critère maison « premier affichage en moins de 3 s en 3G lente » non tenu : en bridage réel, premier rendu à 4,0 s sur les 3 pages testées (section 4.3). En simulation Lantern, 2,44 s sur 3 pages mais 5,3 s sur l'accueil (section 4.2) |
| moins 3 | Sur /fiduciaires et /securite, l'élément LCP des audits standard est un texte révélé par JavaScript (classe `.in` posée après hydratation) : délai de rendu de l'élément 733 à 897 ms en 4G lente, LCP 7,65 s en 3G lente simulée. En 3G réelle, le bundle qui déclenche ces révélations finit de se télécharger à 7,6 s (9,9 s sur l'accueil) |
| moins 2 | Aucun en-tête de cache sur la police (24,9 ko) et les images (134 ko sur l'accueil) ; gzip au lieu de Brotli (23 ko évitables sur l'accueil) ; affiche de démo servie en 1920 x 1080 pour 637 x 358 affichés (95 ko évitables) et qui retarde le JS de 2,3 s en 3G réelle |
| moins 1 | INP laboratoire : le bouton de démo de l'accueil a donné 320 ms sur un passage (délai de présentation 298 ms, tâche longue de 276 ms), 48 ms sur le suivant |

Le score Lighthouse flatte le site : dans les audits standard, le titre du hero (découpé mot par mot dans des conteneurs masqués, section 6.1) n'est jamais candidat LCP, et Chrome retient le mot « LX Studio » de l'en-tête (84 x 30 px). Le vrai contenu principal apparaît plus tard que ce que la métrique raconte ; le bridage réel 3G le montre (section 4.3).

## 4. Critères maison : plafond JavaScript de 170 Ko et premier affichage en 3G lente

### 4.1 Plafond de 170 Ko de JavaScript compressé : tenu, de justesse

Scripts transférés (compressés) au premier chargement, accueil mobile, série 1 (identique à quelques octets près sur les 4 séries) :

| Script | Transféré | Brut | Rôle |
| --- | --- | --- | --- |
| `/assets/main-DJnEFFSr.js` | 142 601 o | 452 268 o | bundle applicatif unique (React 19.2.4, TanStack Start et Router, rendu de toutes les routes, `marked`) ; 45 984 à 48 217 o inutilisés au chargement selon la page (32 à 34 %) |
| `/assets/index-CIdRv_sW.js` (route `/`) | 2 160 o | 7 779 o | morceau de route (sur les autres pages : 208 à 1 185 o) |
| `/__l5e/events.270c78a44fc53e7b.js` (injecté par Lovable) | 11 888 o | 29 187 o | capture automatique d'événements, contient du code rrweb (enregistrement de session), balise `/__l5e/trackevents` au chargement puis toutes les 10 s |
| `/~flock.js` (injecté par Lovable) | 8 402 o | 21 296 o | web-vitals et analytics Lovable, cache de 25 minutes seulement |
| `https://plausible.io/js/script.js` | 1 914 o | 2 841 o | Plausible, seul domaine tiers, 1 ms de fil principal |
| **Total scripts** | **166 965 o = 167,0 ko = 163,1 Kio** | 513 371 o | |

Verdict : 167,0 ko pour un plafond de 170 Ko, soit 3,0 ko de marge en kilo-octets décimaux (6,9 Kio si le plafond est en kibioctets). Le JavaScript propre au site pèse 144 761 o ; les 22 204 o restants sont trois scripts de mesure d'audience, dont deux posés par l'hébergeur. Sur les autres pages : 165 041 à 166 015 o.

### 4.2 3G lente simulée (modèle Lantern, RTT 400 ms, 400 kbit/s, CPU x4), mobile, deux séries (13:51 et 16:22)

| Page | FCP | LCP | Speed Index | Élément LCP | Score perf |
| --- | --- | --- | --- | --- | --- |
| `/` | 5 319 puis 5 284 ms | 6 450 puis 6 284 ms | 5 319 puis 5 284 ms | « LX Studio » (en-tête) | 64 |
| `/fiduciaires` | 2 442 puis 2 451 ms | 7 664 puis 7 651 ms | 3 673 puis 3 193 ms | `p.ia-eyebrow.in` « CE QUE LE SYSTÈME FAIT » (révélé par JS) | 71 |
| `/securite` | 2 455 puis 2 445 ms | 7 655 puis 7 645 ms | 3 380 puis 3 478 ms | `ul.ia-toc > li.in > a` « Où tournent les données » (révélé par JS) | 72 |
| article | 2 444 puis 2 457 ms | 2 847 puis 2 857 ms | 3 227 puis 3 047 ms | « LX Studio » (en-tête) | 92 |

Lecture : en simulation, trois pages affichent l'en-tête sous 3 s (2,44 à 2,46 s) et l'accueil non (5,3 s). Le 5,3 s de l'accueil est un artefact du modèle : dans la trace observée de l'accueil, le bundle JavaScript s'exécute avant le premier rendu (section 6.2), donc Lantern place le FCP après les 142 ko de JS. Le bridage réel ci-dessous tranche. Sur /fiduciaires et /securite, le LCP tombe à 7,65 s parce que l'élément retenu attend l'hydratation. Dans cette simulation, la feuille de style bloquante coûte 400 ms par page et le JavaScript inutilisé 800 ms de FCP sur l'accueil et 1 200 ms de LCP sur /fiduciaires et /securite (estimations Lighthouse).

### 4.3 3G lente en bridage réel (`devtools` : latence 1 500 ms par requête, 360 kbit/s, CPU x4), mobile, deux passages par page

| Page | Passages | FCP (observé) | LCP (observé) | Élément LCP | Speed Index | Fin du téléchargement de `main-DJnEFFSr.js` | Événement `load` | Score perf |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 16:30:57 et 16:32:33 | **4 015 et 4 078 ms** | 4 599 et 4 627 ms | `h1#hero-title` (titre du hero) | 7 966 et 7 952 ms | 9 917 et 9 849 ms | 10 635 et 10 630 ms | 68 et 68 |
| `/fiduciaires` | 16:31:37 et 16:33:13 | **4 004 et 3 969 ms** | 4 531 et 4 524 ms | `h1#page-title` (titre du hero) | 6 455 et 6 451 ms | 7 579 et 7 573 ms | 6 225 et 6 186 ms | 70 et 70 |
| article | 16:32:05 et 16:33:41 | **4 013 et 3 954 ms** | 4 590 et 4 512 ms | premier paragraphe de l'article | 5 866 et 5 731 ms | 7 628 et 7 569 ms | 6 239 et 6 181 ms | 71 et 72 |

/securite n'a pas été mesuré dans ce mode (même chemin critique, mêmes préchargements : rien ne laisse attendre un résultat différent, mais ce n'est pas mesuré).

Chronologie réseau réelle de l'accueil (passage de 16:30:57, millisecondes depuis la navigation) : document 0 à 1 905 ; à 1 652 démarrent en parallèle la feuille de style (10 649 o, fin à 3 925), la police (24 937 o, fin à 4 544), le morceau de route (fin à 3 308) et le bundle (142 610 o, fin à 9 917) ; premier rendu à 4 015, juste après la feuille de style ; titre du hero peint à 4 599 ; à 3 996 démarrent les trois images de l'accueil, dont l'affiche de démo (107 156 o, fin à 10 632) qui partage la bande passante avec le bundle ; balises `/__l5e/trackevents` à 6 952 puis 16 952. Sur /fiduciaires, sans image, le bundle finit à 7 579 ms, soit 2,3 s plus tôt.

Verdict du critère maison : **non tenu**, premier affichage à 4,0 s sur les trois pages testées. Le chemin critique est document (1,9 s) puis feuille de style (2,3 s de transfert pour 10,6 ko, parce que les 142 ko de JS et les 25 ko de police préchargés dans `<head>` lui disputent les 400 kbit/s) puis rendu (0,1 s). L'écart entre 2,44 s (simulation) et 4,0 s (bridage réel) tient à la convention Lighthouse du bridage réel (latence par requête 1 500 ms contre un RTT de 400 ms dans le modèle). Dans les deux conventions, le levier est le même : supprimer la requête CSS du chemin critique et ne pas faire concurrencer la feuille de style par le bundle (section 7, action 1).

Vignettes réelles (`film3gdev/home-run1-*.jpg`) : page blanche à 3 059 ms ; en-tête, fond du hero et premiers mots du titre à 4 588 ms ; hero complet avec les deux boutons à 6 117 ms.

## 5. INP en laboratoire (flux utilisateur Lighthouse, mobile, CPU x4, réseau 4G lente bridé)

Aucune donnée terrain (CrUX inaccessible, section 1). L'INP ne se mesure qu'avec des interactions : j'ai scripté des interactions réelles (événements de pointeur et de clavier envoyés par CDP, pas des `click()` JavaScript) et lu l'audit `interaction-to-next-paint` du pas `timespan`.

| Passage | Page | Interactions effectivement mesurées | INP | Décomposition de l'interaction la plus lente (entrée / traitement / présentation) |
| --- | --- | --- | --- | --- |
| 1 (16:23) | `/` | clic sur le bouton de démo `button.ia-demo-start`, saisie dans le champ Nom | **320 ms** (à améliorer) | 2 / 23 / **298 ms** ; tâche longue de 276 ms (non attribuée) pendant le pas ; TBT du pas 226 ms |
| 1 (16:24) | `/fiduciaires` | saisie dans le champ Nom, clic sur le bouton d'envoi | 30 ms | 3 / 4 / 26 ms (`input#f-d-name`) |
| 1 (16:24) | `/securite` | idem | 30 ms | 3 / 4 / 24 ms |
| 1 (16:25) | article | idem | 40 ms | 3 / 5 / 30 ms ; CLS du pas 0,19 (décalage plus de 500 ms après le clic sur le bouton d'envoi : messages de validation du formulaire) |
| 2 (16:28) | `/` | clic sur le bouton de démo, saisie | 48 ms | 4 / 12 / 32 ms |
| 2 (16:28 à 16:30) | 3 autres pages | clic hors cible (le script a cliqué sous la zone visible), saisie | 45 à 50 ms | présentation 44 à 48 ms |
| 3 (16:36 à 16:39) | les 4 pages | ouverture du menu (`button.ia-burger`), clic sur le premier lien du menu (navigation côté client vers /fiduciaires), Échap, nouvelle ouverture du menu, envoi du formulaire vide, saisie | accueil 39, /fiduciaires 49, /securite 46, article 35 ms | lien du menu : 2 / 19 à 23 / 10 à 26 ms ; tâches longues de 58 à 174 ms dans `main-DJnEFFSr.js` pendant la navigation client ; CLS du pas 0,081 sur les 4 flux, dû à la navigation client (le contenu de /fiduciaires remplace la page sous le menu) |

Lecture : menu, navigation côté client, formulaire et saisie restent sous 50 ms avec un CPU 4 fois plus lent qu'un Mac. Le seul point faible mesuré est le bouton de démo vidéo de l'accueil : 320 ms sur un passage, 48 ms sur l'autre (non remesuré au passage 3 : le flux avait quitté l'accueil par le menu). L'écart vient du délai de présentation (298 ms) et d'une tâche longue de 276 ms juste après le clic : au clic, le site remplace l'affiche par l'élément vidéo et lance la lecture, ce qui déclenche une mise en page et un rendu lourds dans une section qui contient déjà des calques flous animés (section 6.2). Le décalage de 0,19 sur l'article après l'envoi du formulaire vide (messages d'erreur insérés sans espace réservé) est à corriger aussi, même s'il n'entre pas dans le CLS de chargement.

## 6. Causes identifiées, avec les preuves

### 6.1 Le hero est découpé mot par mot et révélé par animation : le LCP standard ne mesure pas le contenu principal

Mécanisme (lu dans `/assets/styles-C2qi9lw-.css` et dans le HTML servi) :

- Un script inline ajoute la classe `js` sur `<html>` avant tout rendu. Ensuite `html.js [data-rv]{opacity:0; transform:translateY(34px)}` masque 54 éléments sur l'accueil (34 sur /fiduciaires, 28 sur /securite, 11 sur l'article) jusqu'à ce que le bundle, une fois hydraté, pose la classe `.in` (IntersectionObserver). Ces éléments n'existent visuellement qu'après téléchargement, analyse et exécution de `main-DJnEFFSr.js` (142,6 ko) : 7,6 à 9,9 s en 3G réelle.
- Les titres portent `.ia-words` : chaque mot est un `<span class="ia-w-in">` translaté de 115 % dans un conteneur masqué (85 spans de mots sur l'accueil, 87 sur /fiduciaires). Le titre du hero porte `data-now` : il s'anime en CSS pur, sans attendre le JS, mais avec 0,2 s de délai, 70 ms par mot et 1,15 s de durée ; la phrase complète est lisible 1,2 à 2 s après le premier rendu.
- Conséquence sur la métrique : dans les 32 audits standard, Chrome n'a jamais retenu le `<h1>` (texte hors du clip au premier rendu) ; le LCP est le mot « LX Studio » de l'en-tête (84 x 30 px) sur l'accueil et l'article, ou le premier élément `data-rv` révélé par JS sur /fiduciaires (`p.ia-eyebrow`, délai de rendu de l'élément 897 ms en 4G lente) et /securite (`li.in > a`, 733 ms). En bridage réel 3G, Chrome a retenu le `<h1>` lui-même, peint 0,5 à 0,6 s après le premier rendu (4,5 à 4,6 s), ce qui correspond à la chorégraphie CSS.
- Vignettes (série 1, /fiduciaires mobile, `film/fiduciaires-mobile-f0-375ms.jpg`) : à 375 ms seul l'en-tête est peint, le hero est vide ; à 1 125 ms les mots du titre sont à mi-course ; à 2 989 ms la page est stable.

### 6.2 L'accueil a le premier cadre le plus coûteux et le plus instable

Faits mesurés sur l'accueil mobile (CPU x4) :

- Premier rendu observé avant simulation réseau : 500 ms à 13:41, 2 533 ms à 13:48, 1 514 ms à 16:19, 2 541 ms à 16:20. Sur le passage de 16:20, tout était chargé à 926 ms (document 265 ms, CSS 419 ms, JS 475 ms, police 923 ms), le fil principal n'a totalisé que 109 ms de tâches, et les vignettes montrent une page entièrement blanche à 1 825 ms et à 2 434 ms, les premiers pixels apparaissant entre 2 434 et 3 042 ms (`film4/home-mobile-f3-2434ms.jpg`, `film4/home-mobile-f4-3042ms.jpg`). Sur les 3 autres pages, le premier rendu observé est resté entre 243 et 527 ms sur tous les passages propres. Les 9 audits de l'expérience contrôlée (16:26 à 16:27) n'ont pas reproduit les valeurs au-dessus de 1,5 s (maximum 579 ms) : la cause de ces trois premiers rendus tardifs n'est pas établie ; la contention avec les autres agents sur la machine est l'explication la plus probable, et l'accueil y est le plus sensible parce que c'est la page la plus lourde à rendre.
- Coût de rendu du premier cadre, décomposition Lighthouse du fil principal (CPU x4) : accueil « Other » 806 à 968 ms, style et mise en page 306 à 322 ms, rendu 188 à 236 ms ; /fiduciaires 417, 128 et 73 ms. L'accueil coûte 2,5 fois plus de style et de rendu.
- Ce qui pèse dans le CSS et le HTML de l'accueil : 7 calques `.ia-mesh-css` (quatre dégradés radiaux chacun, `inset:-10%`, animation `iaDrift` 18 s infinie en `transform`), un `.ia-hero-glow` de 380 x 380 px en `filter:blur(46px)` animé 9 s en boucle, des pseudo-éléments `.ia-night-sec:before/:after` en `filter:blur(72px)`, des `backdrop-filter: blur(20 à 26px) saturate()` sur l'en-tête défilé, le panneau de navigation, le formulaire et le bloc dossier, plus une illustration SVG inline (68 éléments, 6 dégradés, animée `iaFloatBig` 8 s en boucle avec `will-change:transform`). Les autres pages ont 3 à 4 calques mesh et ni glow ni illustration. DOM : 836 éléments sur l'accueil contre 630, 463 et 356.
- Expérience contrôlée (même page, CPU x4, 4G lente simulée, feuille injectée avant chargement) : sans `filter` ni `backdrop-filter`, le premier rendu observé passe de 568 et 442 ms (deux passages de référence) à 297 et 269 ms, et le FCP simulé de 1 748 et 1 697 ms à 933 et 932 ms (score 97 vers 100). Sans animations seulement : 386 ms observé, 1 621 ms simulé. Explication de l'écart simulé : quand le premier rendu précède l'exécution du JS, Lighthouse retire les 142 ko de JS du chemin critique du FCP. À CPU x1, premier rendu observé 555 ms avec 229 ms de fil principal : sur un ordinateur le coût est masqué ; sur un téléphone à CPU lent, il ne l'est pas. En 3G réelle, le réseau domine et l'accueil peint au même moment que les autres pages (4,0 s), mais son bundle finit 2,3 s plus tard à cause des images (section 6.3).

### 6.3 Images de l'accueil

Les 4 pages ne chargent aucune image au-dessus de la ligne de flottaison (hero en CSS et SVG). L'accueil charge 3 images, toutes en `loading="lazy"`, `decoding="async"`, avec `width` et `height` (d'où CLS 0) :

| Image | Format | Fichier | Poids | Affichée (mobile) | Constat Lighthouse |
| --- | --- | --- | --- | --- | --- |
| `/demo/demo-poster.jpg` (affiche de la vidéo de démo) | JPEG | 1920 x 1080 | 106 894 o | 637 x 358 | 95 128 o évitables avec une version adaptée (`srcset`) |
| `/logos/facchinetti.png` | PNG | 640 x 158 | 23 128 o | 338 x 83 | 18 426 o évitables : 16 675 o par redimensionnement, 6 275 o par passage en WebP/AVIF |
| `/logos/richoz.webp` | WebP | 350 x 131 | 3 936 o | 193 x 48 | rien à signaler |

Les trois sont chargées malgré `lazy` car elles sont dans la marge de préchargement de Chrome (1 118 px et 1 593 px sous le haut de page). En 3G réelle, elles démarrent à 4,0 s et l'affiche occupe la connexion jusqu'à 10,6 s : le bundle finit à 9,9 s sur l'accueil contre 7,6 s sur /fiduciaires. La vidéo de démo elle-même n'est pas chargée au premier affichage (démarrage au clic) : bon point. L'image Open Graph `/og/accueil.jpg` fait 60 705 o (1200 x 630), hors chemin critique.

### 6.4 Polices

Une seule police : Manrope variable (graisses 200 à 800), `woff2` latin de 24 836 o, préchargée (`<link rel="preload" as="font">`), `font-display: swap`, découpée par `unicode-range` (le fichier latin étendu n'est jamais demandé sur ces pages). Police de secours `Manrope Fallback` basée sur Arial avec `size-adjust: 108 %`, `ascent-override: 98,7 %`, `descent-override: 27,8 %` : c'est ce qui donne un CLS de 0,000 partout. Deux défauts : aucun en-tête `Cache-Control` sur `/fonts/*.woff2` (rechargement possible à chaque visite, audit `cache-insight`), et un préchargement qui, en 3G, prend 2,9 s de bande passante en parallèle de la feuille de style.

### 6.5 CSS

Une feuille `/assets/styles-C2qi9lw-.css` : 10 649 o transférés (47 144 o bruts), bloquante pour le rendu : 110 à 150 ms de FCP et LCP en 4G lente, 400 ms en 3G simulée, et en 3G réelle c'est elle qui fixe le premier rendu (fin de transfert 3 925 ms, premier rendu 4 015 ms). Aucun CSS inutilisé signalé au-delà du seuil Lighthouse, aucun `@import`, aucune police externe, aucun `<style>` critique inline.

### 6.6 Cache HTTP

| Ressource | `Cache-Control` | Constat |
| --- | --- | --- |
| `/assets/*.js`, `/assets/*.css` | `public, max-age=31536000, immutable` | correct (empreinte dans le nom) |
| HTML des 4 pages | `no-cache, must-revalidate, max-age=0` | correct pour du contenu éditorial |
| `/fonts/manrope-latin-wght-normal.woff2` | aucun en-tête | 24 937 o soumis à la logique heuristique du navigateur |
| `/demo/demo-poster.jpg`, `/logos/facchinetti.png`, `/logos/richoz.webp` | aucun en-tête | 134 407 o concernés sur l'accueil |
| `/~flock.js` (Lovable) | `max-age=1500` | rechargé toutes les 25 minutes |
| `/__l5e/events.*.js` (Lovable) | `public, max-age=31536000, immutable` | correct |

Estimation Lighthouse des octets re-téléchargeables faute de cache : 163 Kio sur l'accueil, 32 Kio sur chaque autre page.

### 6.7 Compression et protocole

Tout est servi en HTTP/2 via Cloudflare (`server: cloudflare`), HSTS actif. HTML, JS et CSS sont compressés en **gzip** uniquement, même quand le client annonce `br` (vérifié avec `Accept-Encoding: br, gzip`). Brotli de qualité 11 mesuré localement : `main-DJnEFFSr.js` 142 326 o en gzip -9 contre 123 155 o en Brotli (19,2 ko de moins, 13 %), CSS 10 578 contre 9 372 o, HTML de l'accueil 13 596 contre 10 977 o. Total : environ 23 ko de moins au premier chargement de l'accueil, soit 0,46 s à 400 kbit/s. La police et les images ne sont pas recompressées, ce qui est normal.

### 6.8 Scripts tiers et scripts de l'hébergeur

Un seul domaine tiers : `plausible.io` (1 914 o, 1 ms de fil principal, `defer`). Mais Lovable injecte sur chaque page deux scripts servis depuis `lxstudio.ch` : `/~flock.js` et `/__l5e/events.*.js`, 20 290 o compressés, 50 483 o bruts, avec `data-autocapture="1"` et `data-consent="1"`, du code rrweb (enregistrement de session) et une balise `/__l5e/trackevents` au chargement puis toutes les 10 s. Au-delà des 12 % du budget JS qu'ils consomment, un script d'enregistrement de session posé par l'hébergeur sur un site qui vend « rien ne sort du bâtiment » mérite un contrôle juridique (nLPD, consentement) : hors périmètre de ce rapport, signalé au coordinateur.

### 6.9 Fil principal et DOM

Démarrage JavaScript (`bootup-time`, accueil mobile, CPU x4) : 890 ms au total dont 355 ms d'évaluation pour `main-DJnEFFSr.js`. Tâches longues pendant le chargement : 3 sur l'accueil (120, 78 et 59 ms), 2 sur /fiduciaires, aucune sur /securite et l'article. Décomposition accueil : Other 545 ms, évaluation de script 401 ms, style et mise en page 286 ms, rendu 110 ms. DOM : 836 éléments (accueil), 630, 463, 356 ; profondeur 12 ; aucun élément avec plus de 30 enfants. Une seule animation non composée (transition de `color` sur l'en-tête, CLS 0). Aucun JavaScript hérité ni dupliqué (audits `legacy-javascript-insight` et `duplicated-javascript-insight` à 0 octet).

## 7. Opportunités, triées par impact mesuré

| # | Action | Gain mesuré ou estimé | Effort |
| --- | --- | --- | --- |
| 1 | **Sortir la feuille de style du chemin critique et ne plus la faire concurrencer par le bundle** : CSS critique inline pour l'en-tête et le hero (la feuille entière ne fait que 10,6 ko compressés : l'inliner en entier est défendable), reste en chargement non bloquant ; retirer les `<link rel="modulepreload">` du `<head>` ou leur donner `fetchpriority="low"` pour que les 142 ko de JS ne partagent plus les 400 kbit/s avec la feuille et la police pendant les 2 premières secondes | 3G réelle : la feuille a mis 2,3 s à arriver (requête à 1 652 ms, fin à 3 925 ms) et le premier rendu a suivi à 4 015 ms. Sans cette requête, le premier rendu attendu se situe juste après la fin du document (1 905 ms) plus le rendu : de l'ordre de 2,2 s, sous le critère de 3 s. 4G lente simulée : 110 à 150 ms de FCP et LCP | moyen |
| 2 | **Supprimer la dépendance au JS pour l'affichage** : rendre les éléments `data-rv` et les listes `li.in` visibles par défaut ; n'appliquer `opacity:0` qu'une fois le bundle chargé (classe posée par le bundle, pas par le script inline), ou réserver la révélation aux éléments sous la ligne de flottaison | /fiduciaires et /securite : délai de rendu de l'élément LCP 733 à 897 ms en 4G lente ; LCP 3G simulée de 7,65 s vers l'ordre de 2,5 à 3 s (l'élément serait peint avec le CSS). En 3G réelle, tout le contenu sous le hero attend aujourd'hui la fin du bundle à 7,6 s (9,9 s sur l'accueil) | faible : CSS et une classe |
| 3 | **Alléger le premier cadre de l'accueil** : retirer `filter:blur(46px)` du glow et `blur(72px)` des pseudo-éléments de section (remplacer par un dégradé radial pré-flouté), ramener les 7 calques mesh animés à un calque statique, ne poser `backdrop-filter` sur l'en-tête qu'en `.is-scrolled` | Expérience contrôlée : premier rendu observé 442 à 568 ms vers 269 à 297 ms (CPU x4), FCP simulé 4G lente 1,7 s vers 0,93 s, score 97 vers 100 ; coût de style et rendu de l'accueil divisé par 2 (vers le niveau de /fiduciaires) | moyen : design à préserver |
| 4 | **Réduire le bundle** : 32 à 34 % de `main-DJnEFFSr.js` est inutilisé au chargement (45 984 à 48 217 o compressés) ; les morceaux de route ne pèsent que 208 à 2 160 o, donc tout le site est dans le bundle principal. Découper par route, charger `marked` et le code du formulaire à la demande | Lighthouse : FCP moins 300 ms et LCP moins 150 ms en 4G lente sur l'accueil ; LCP moins 1 200 ms en 3G simulée sur /fiduciaires et /securite. En 3G réelle, chaque 50 ko de JS en moins avance la fin du bundle de 1 s. Et 46 ko de marge sur le plafond de 170 Ko au lieu de 3 ko | moyen |
| 5 | **Servir des images adaptées** : `demo-poster.jpg` en 640 et 1280 px de large via `srcset` et en WebP ; `facchinetti.png` en WebP 340 px | 113 554 o de moins sur l'accueil (estimation `image-delivery-insight`) ; en 3G réelle, fin du bundle 2,3 s plus tôt sur l'accueil (7,6 s au lieu de 9,9 s), comme sur /fiduciaires | faible |
| 6 | **Retirer ou remplacer les deux scripts Lovable** (`/~flock.js`, `/__l5e/events.*.js`) : Plausible suffit pour l'audience ; si Lovable ne permet pas de les désactiver, c'est un argument de plus pour héberger ailleurs | 20 290 o de JS en moins (12 % du budget), deux requêtes et une balise périodique de moins par page, plus de code rrweb sur le site | faible à moyen (dépend de l'hébergeur) |
| 7 | **Ajouter `Cache-Control: public, max-age=31536000, immutable`** sur `/fonts/*`, `/logos/*`, `/demo/*` (avec empreinte dans le nom) | 163 Kio non re-téléchargés à chaque visite sur l'accueil, 32 Kio ailleurs ; Lighthouse estime 150 ms de LCP en 4G lente sur une visite répétée | faible (configuration d'hébergement) |
| 8 | **Activer Brotli** (Cloudflare le fait si le proxy est activé, sinon côté hébergeur) | 23 ko de moins sur l'accueil (JS 19,2 ko, HTML 2,6 ko, CSS 1,2 ko), 0,46 s à 400 kbit/s | faible |
| 9 | **Bouton de démo** : insérer l'élément `<video>` dès le rendu (sans `src`, affiche en `poster`) et ne changer que `src` au clic ; vérifier qu'aucune animation de calque flou ne tourne derrière la vidéo | INP de 320 ms (passage 1) vers l'ordre de 50 ms (passage 2) | faible |
| 10 | **Raccourcir la chorégraphie du titre** (`data-now` : 0,2 s de délai, 70 ms par mot, 1,15 s) ou la réserver au second écran ; réserver l'espace des messages de validation du formulaire | titre lisible 1,2 à 2 s plus tôt (LCP réel 3G 4,5 s vers 4,0 s à chemin critique égal) ; CLS après envoi du formulaire 0,19 vers 0 | faible |

Les actions 1, 2, 4 et 5 décident du critère 3G lente ; les actions 6 à 8 relèvent de la configuration et se font en moins d'une heure ; l'action 3 décide du ressenti sur téléphone milieu de gamme en 4G.

## 8. Ce qui n'a pas été mesuré, et limites

- Pas de données terrain : l'API PageSpeed Insights a répondu 429 sans clé. Le verdict Core Web Vitals (75e centile des visites réelles) reste inconnu. À refaire avec une clé API CrUX ou via CrUX Vis.
- INP mesuré en laboratoire sur des interactions scriptées, CPU x4. Au passage 3, le clic sur le premier lien du menu a déclenché une navigation côté client vers /fiduciaires : l'envoi du formulaire et la saisie de ce passage ont donc été mesurés sur /fiduciaires pour les 4 flux, et le bouton de démo n'a pas été remesuré. Défilement et vidéo après clic non mesurés.
- /securite non mesuré en 3G lente à bridage réel (section 4.3).
- Deux conventions de « 3G lente » donnent deux chiffres (2,44 s simulé, 4,0 s bridé) ; le critère maison ne précise pas la sienne. Le bridage réel est le plus proche d'un vrai téléphone sur un vrai réseau lent.
- Mesures faites depuis une connexion partagée avec d'autres agents sur la même machine : les étendues larges de l'accueil mobile (premier rendu observé de 0,5 à 2,5 s) en sont probablement la conséquence ; d'où 4 séries et des médianes.
- Pas de test sur un vrai téléphone. Le projet exige de juger la page visiteur sur un vrai appareil : à faire pour valider le ressenti du hero.
- Pas de mesure des pages `/administrations`, `/pme`, `/ressources` ni des autres articles ; pas d'analyse de la vidéo de démo après clic ni du formulaire après envoi réel.

## 9. Fichiers de preuve

Dossier : `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/`

- `lh/`, `lh2/`, `lh3/`, `lh4/` : 32 rapports Lighthouse JSON (séries 1 à 4) et journaux `run.log` horodatés ; `aggregate.json` : médianes et drapeaux d'anomalie.
- `lh3g/`, `lh3g2/` : 3G lente simulée (8 rapports) ; `lh3gdev/` : 3G lente en bridage réel (6 rapports).
- `inp/`, `inp2/`, `inp3/` : flux INP (JSON par page : actions effectuées, INP, décomposition, tâches longues).
- `exp/` : expérience contrôlée (9 rapports) et `exp/run.log`.
- `film/`, `film3g/`, `film4/`, `film3gdev/` : vignettes extraites des rapports.
- `html/` : HTML servi des 4 pages et `styles.css` ; `js/` : `main.js`, `flock.js`, `l5e-events.js` ; `img/` : les 3 images de l'accueil ; `psi/home-mobile.json` : réponse 429 de l'API PageSpeed.
- Scripts : `run-lh.sh`, `run-lh2.sh`, `run-lh3.sh`, `run-3g-devtools.sh`, `run-inp.sh`, `extract.mjs`, `table.mjs`, `lcp.mjs`, `aggregate.mjs`, `filmstrip.mjs`, `experiment.mjs`, `inp-flow.mjs`, `inp-flow2.mjs`, `inp-flow3.mjs`.
