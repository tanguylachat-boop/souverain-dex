# VERIF.md : refonte PME de la page d'accueil (branche `refonte-pme`)

Date : 06.10.2026. État : build Vite OK, `wrangler deploy --dry-run` OK, rien n'est déployé.
Captures et rapports dans `verif/captures/` (non versionnés), scripts dans `verif/` (voir `verif/README.md`).

## 0. Ce qui manquait au départ, à lire avant le diff

**AUDIT.md n'existe pas.** Le brief dit de l'appliquer tel quel ; il n'est ni à la racine du dépôt, ni dans l'historique git, ni sur une branche distante, ni ailleurs sur cette machine (recherche sur tout le disque). Le texte de la page a donc été écrit pour que la page soit complète et vérifiable, dans un seul fichier : `src/content/home.ts`. Il respecte les contraintes du brief (vouvoiement, français de Suisse, aucun tiret long, aucun chiffre inventé, le travail du client comme sujet). Il est à remplacer par le copy d'AUDIT.md, chaîne par chaîne, sans toucher aux composants. Correspondance :

| Section du brief | Constante dans `src/content/home.ts` |
| --- | --- |
| Hero (eyebrow, H1, lede, CTA, trust line) | `HERO` |
| Bande clients | `CLIENT_ROW` |
| Preuve, trois cartes client | `PROOF` (`PROOF_CARDS`) |
| Ce qui vous coûte du temps aujourd'hui | `TIME_COST` |
| Les trois façons de rater l'IA | `PITFALLS` |
| Méthode, quatre étapes | `PROCESS` |
| Exemples, quatre cartes | `EXAMPLES` (`EXAMPLE_ITEMS`) |
| Infrastructure, une phrase et le schéma | `INFRA` |
| FAQ, cinq questions | `FAQ` |
| À propos | `ABOUT` |
| CTA final | `CTA` |
| Ligne « Autres projets » | `OTHER_PROJECTS` |
| Titre, description, mots-clés | `SEO`, `SERVICE_DESCRIPTION` |

**Les quatre photos n'existent pas non plus.** `public/img/` ne contenait rien. Les fichiers `hero-atelier.webp`, `bureau-soir.webp`, `chantier-telephone.webp` et `pieces-compta.webp` sont des images provisoires fabriquées à partir des anciens visuels du site ; chacune porte la mention « image provisoire, a remplacer » dans son coin. Dimensions provisoires : 1600×900 pour le hero, 1200×800 pour les trois autres. À faire quand les vraies photos arrivent : remplacer les fichiers sous le même nom, ajuster `width` et `height` dans `IMAGES`, relire les textes alternatifs (ils décrivent la photo attendue, pas le provisoire), puis relancer les scripts de `verif/`. `tanguy.jpg` est la vraie photo (reprise de `t24-personal/public/premier-client/tanguy.jpg`, réduite à 600 px de large).

**Chiffres.** Aucun chiffre inventé. Les trois cartes de preuve disent « mesure en cours » là où il n'y a pas de mesure. Deux points à confirmer avant déploiement :
- Richoz Sanitaire, « un devis part en une douzaine de minutes » : vient de la note client du vault (`clients/richoz-sanitaire.md`, 11.04.2026, « devis manuels 4h/jour à 12 minutes »). Si ce n'est pas tenu, remplacer par « mesure en cours ».
- Oasis Drink : les faits (WhatsApp et Excel avant, commande en ligne, facture QR à la livraison, relances en trois paliers) viennent de la proposition signée du 16.04.2026 et de la note du 30.08.2026. Aucun montant client n'est publié.

## 1. Vérification anti « site fait par une IA », section par section

Contrôles automatiques sur le texte rendu (`verif/antiai.mjs`) : 0 tiret long, aucun « Imaginez », « Dans un monde où », « Que vous soyez », « Découvrez » en tête de phrase, aucun « innovant, révolutionnaire, puissant, intelligent, sur mesure, clé en main, fluide, seamless », aucun bouton « Commencer », « En savoir plus », « Découvrir », aucun titre de section en question (les seules questions sont les cinq de la FAQ, qui sont des questions par nature), aucun flou d'arrière-plan, « l'IA » comme sujet une seule fois, dans le titre imposé par le brief.

| Section | Trouvé | Corrigé |
| --- | --- | --- |
| Hero | Titre animé mot par mot (0,85 s), titre en dégradé, deux halos flous animés, grille en fond, pastille « pulse », badge de certification avec icône bouclier, CTA « Voir ce que je construis », trust line sur la technique | Photo pleine largeur assombrie à 55 % plus un voile derrière la colonne de texte, parallaxe de 0 à 40 px seulement, titre en une affirmation, CTA « Réserver 15 minutes avec Tanguy » et « Voir les trois cas clients », trois faits concrets. Aucune animation d'entrée. Le badge part dans « À propos », en texte. |
| Bande clients | Coca-Cola et Migros ; bande défilante en boucle | Les deux noms retirés ; quatre noms immobiles, sur une ligne (une phrase sur téléphone) |
| Preuve | Quatre compteurs qui montent (« 50+ », « 10 h+ », « 100 % ») avec dégradé chaud, halo animé ; aucun client nommé | Trois cartes client en avant / après / ce qui tourne, posées l'une sous l'autre ; « mesure en cours » quand la mesure manque |
| Le constat | « Trois raisons pour lesquelles l'IA n'a encore rien changé chez vous » : l'IA comme sujet, triptyque de cartes | Section retirée. Remplacée par « Ce qui vous coûte du temps aujourd'hui » (cinq situations, liste numérotée, photo) et « Les trois façons de rater l'IA » (trois colonnes sans cadre, puis la phrase de réponse) |
| Méthode | Cadran en dégradé bleu-orange, rail en dégradé, étapes inactives à 32 % d'opacité, épinglage dès 1024 px sans tenir compte de la hauteur d'écran | Quatre étapes du nouveau texte, cadran et rail d'une seule couleur, inactives à 45 %, épinglage dès 768 px et seulement si l'écran fait au moins 860 px de haut, empilé sinon |
| Retour sur investissement | Section « Un chiffre décide » avec barres et montants d'exemple (« exemple illustratif ») | Retirée : pas dans l'ordre demandé, et un chiffre d'exemple ressemble à un chiffre inventé |
| Exemples | Quatre cas génériques pour fiduciaires, icônes en ligne (document, bulle, courbe, loupe) | Devis dicté, factures à relancer, mails répétitifs, pièces pour la fiduciaire ; icônes retirées, deux photos, lien vers l'agent fiduciaire sur la carte concernée |
| Infrastructure | Intro, schéma, puis deux cartes « Sur votre matériel » / « Hébergé, documenté » | Une phrase et le schéma, vocabulaire PME (boîte mail, photos et scans, logiciel de facturation) |
| Offres | Trois cartes (agent fiduciaire, Mentia à 99 CHF, Athlit), boutons « En savoir plus » | Section retirée. Une ligne discrète « Autres projets » tout en bas avec les trois liens |
| FAQ | Six questions, dont « Que fait exactement LX Studio ? » | Cinq questions du point de vue du patron, réponses à 18 px |
| À propos | Long, deux paragraphes, citation, liens Mentia dans le texte | Court : photo réelle, un paragraphe, la certification en texte, trois faits |
| CTA final | « Commencez par le chiffre, pas par l'outil », « Écrire un message » | « Commencez par une tâche, pas par un outil », boutons « Réserver 15 minutes avec Tanguy » et « Écrire à contact@lxstudio.ch » |
| Chrome partagé | Barre de navigation translucide floutée (glassmorphism), pied de page avec textes à 3,4:1, point de liste avec halo | Barre opaque, pied de page à 5,4:1 minimum, point sans halo. Ces trois changements touchent aussi les autres pages (vérifiées, section 2.7) |

Ce qui reste volontairement : les filets de 1 px entre sections (un fondu de bordure, pas un fond en dégradé), le voile du hero (noir, sans couleur), les flèches dans les deux boutons principaux, les chevrons de la FAQ, les flèches et le cadran des schémas.

Variété des grilles : 3 cartes client en lignes, 5 situations en liste, 3 erreurs en colonnes, 4 étapes épinglées, 4 exemples dont 2 avec photo. Aucun triptyque de cartes.

## 2. Vérification design

Méthode : `npm run build` puis `npx wrangler dev` (le build Cloudflare servi en local ; pas de `vite dev`, interdit sur cette machine), Playwright 1.63 avec Chromium 153 (et WebKit 26.6 pour un contrôle sur téléphone), trois tailles : 390×844 à 2x (iPhone 13), 768×1024 à 2x, 1440×900. Chaque section a été capturée et regardée, plus quatre captures de la séquence épinglée et une page entière par taille.

### 2.1 Premier écran

| | iPhone 390×844 | Tablette 768×1024 | Bureau 1440×900 |
| --- | --- | --- | --- |
| Hauteur du hero | 569 px (max 70 svh = 591) | 676 px (max 717) | 594 px (max 630) |
| Haut du titre « Ce qui tourne aujourd'hui… » | 797 px, visible sans défiler | 881 px, visible | 772 px, visible |
| Éléments cachés dans l'écran au chargement | 0 | 0 | 0 |

Sur bureau et tablette le hero est à 66 svh pour que le titre de la preuve tienne dans l'écran ; sous 768 px il prend la hauteur de son contenu.

### 2.2 Contraste

Mesuré sur les pixels de la photo provisoire après le voile de 55 % et le voile de texte, contre les 5 % de pixels les plus clairs derrière chaque bloc (le pire cas) :

| Bloc | iPhone | Tablette | Bureau |
| --- | --- | --- | --- |
| Titre | 8,2:1 | 10,5:1 | 10,6:1 |
| Lede | 6,6:1 | 9,5:1 | 9,7:1 |
| Trust line | 6,2:1 | 6,4:1 | 8,5:1 |
| Eyebrow | 6,6:1 | 4,8:1 | 15,2:1 |

Le reste de la page utilise les jetons du site : texte secondaire 7,9:1, texte atténué 5,4:1, texte principal 15:1 sur `--surface-1`. Lighthouse (axe) ne signale plus aucun défaut de contraste, pied de page compris. À refaire avec les vraies photos : `node verif/shots.mjs` imprime ces valeurs.

### 2.3 Typographie

- Corps de texte : 1,125 rem (18 px) et interligne 1,6 sur tous les paragraphes, définitions et réponses de la FAQ ; 1,25 rem pour les introductions de section et la phrase de réponse.
- Exceptions sous 18 px, assumées : la ligne lieu et secteur sous chaque nom de client (16 px), le texte du cœur du schéma (17 px), la note sous le CTA final (16 px), les libellés en capitales (12 px). Tous à 5,4:1 au moins.
- Longueur de ligne : mesurée sur la largeur réelle des glyphes, aucune ligne de paragraphe au-dessus de 65 caractères aux trois tailles (largeurs plafonnées à 30 ou 31 rem pour le 18 px, 33 rem pour le 20 px).
- Espaces insécables avant les deux-points et les points d'interrogation, trait d'union insécable dans « partent‑elles » : aucun signe orphelin en début de ligne.
- Aucun débordement horizontal, aucune image étirée (ratio fixé par `aspect-ratio`), aucune image agrandie au-delà de sa taille sauf `bureau-soir.webp` à 1,2x sur tablette Retina (provisoire de 1200 px ; une vraie photo de 1600 px règle le point).

### 2.4 Lighthouse mobile

Lighthouse 13.5.0, Chrome, émulation mobile et réseau simulé, sur le build servi en local :

| Performance | Accessibilité | Bonnes pratiques | SEO |
| --- | --- | --- | --- |
| 96 | 100 | 100 | 100 |

FCP 2,0 s, LCP 2,4 s, TBT 0 ms, CLS 0, Speed Index 2,0 s. JavaScript au premier chargement : environ 131 Ko compressés (bundle TanStack Start et React, inchangé par la refonte). Le hero provisoire pèse 55 Ko ; une vraie photo plus lourde fera monter le LCP, d'où le `preload` et `fetchpriority="high"` sur cette image. Rapport complet : `verif/captures/lighthouse-mobile.report.html`.

### 2.5 Animations

- Apparition au défilement (`Appear`, hook `useScrollReveal` avec l'option `deferHide`) : fondu et 16 px, 500 ms, courbe sortante, 60 ms entre les éléments d'une grille. Le texte est visible dans le HTML servi et n'est caché qu'après l'hydratation, seulement s'il est encore sous le pli : rien n'attend le script, rien n'est retardé.
- Mouvement réduit : 0 élément caché, opacité 1 partout, photo immobile (`transform: none`), vérifié avec `prefers-reduced-motion: reduce`.
- Parallaxe du hero, mesurée à 0, 200, 400, 630 et 1200 px de défilement : 0, -13,5, -26,9, -40, -40 px. Jamais plus de 40 px.
- Séquence épinglée : active à partir de 768 px de large et 860 px de haut ; en dessous, quatre étapes empilées, toutes à pleine opacité.
- Rien d'autre ne bouge : plus de compteurs, plus de mots qui se posent, plus de halos qui dérivent, plus de bande défilante.

### 2.6 Clavier et liens

Ordre de tabulation sur bureau : « Aller au contenu » (le lien d'évitement apparaît et envoie le focus sur `#main`), logo, quatre liens de navigation, « Réserver 15 min », « Réserver 15 minutes avec Tanguy », « Voir les trois cas clients », « Voir l'agent pour fiduciaires », puis les cinq questions de la FAQ (Entrée les ouvre). Contour de focus visible (2 px) sur chaque élément.

Liens : `https://cal.com/lx-studio/15min` répond 200 (page « Découverte LX Studio, 15 min »), ouvert dans un nouvel onglet avec `rel="noopener noreferrer"` ; `mailto:contact@lxstudio.ch` ; `/fiduciaire`, `/mentia`, `/athlit` répondent 200.

### 2.7 Pages non touchées

`/fiduciaire`, `/mentia`, `/athlit`, `/blog` : statut 200, aucun débordement, aucune erreur console, marges du hero intactes (112 px en haut sur téléphone), aux deux tailles. Les routes n'ont pas été modifiées ; elles héritent de trois changements partagés : barre de navigation opaque, pied de page plus contrasté, point de liste sans halo. `Faq`, `CtaBand`, `Lede`, `TrustLine`, `Section` et `Action` ont reçu des options facultatives (`size`, `className`) dont la valeur par défaut reproduit l'ancien rendu.

### 2.8 Build

- `npx tsc --noEmit` : aucune erreur.
- `npm run lint` : aucune erreur sur les fichiers de la branche (les 240 erreurs Prettier restantes sont dans des fichiers non touchés, déjà présentes sur `main`).
- `npm run build` : OK, sortie Nitro pour Cloudflare dans `.output/`.
- `npx wrangler deploy --dry-run` : OK, 85 modules, 1556 Kio (304 Kio compressés), 29 fichiers d'assets.

## 3. Ce qui n'a PAS été testé

- Un vrai téléphone. Tout est en émulation : Chromium pour les captures, plus un passage en WebKit 26.6 (le moteur de Safari) à 390×844 via `verif/webkit.mjs` : mêmes hauteurs (hero 569 px, titre de la preuve à 797 px), aucune erreur, parallaxe et FAQ fonctionnelles. Le critère de qualité visuelle du brief se juge tout de même sur un iPhone en main.
- Une vraie connexion 3G : Lighthouse simule le réseau sur `localhost`.
- Les vraies photos : contraste, poids, cadrage, textes alternatifs sont à revérifier avec les fichiers définitifs.
- Le copy d'AUDIT.md dans la mise en page : les largeurs sont calées sur le texte provisoire. Si un texte plus long ne rentre pas, c'est la mise en page qu'on raccourcit.
- Le déploiement Cloudflare lui-même (dry-run seulement) et le domaine.
- Plausible : inchangé, non vérifié.

## 4. Pour finir

1. Déposer les quatre vraies photos dans `public/img/` sous les mêmes noms ; ajuster `width`, `height` et `alt` dans `IMAGES` (`src/content/home.ts`).
2. Coller le copy d'AUDIT.md dans `src/content/home.ts` en suivant le tableau du point 0.
3. Confirmer ou retirer la « douzaine de minutes » de Richoz.
4. Relancer `npm run build`, `npx wrangler dev`, puis les trois scripts de `verif/` et Lighthouse ; relire les captures sur un téléphone.
5. Ouvrir la PR depuis `refonte-pme`, puis déployer.
