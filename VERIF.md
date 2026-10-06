# VERIF.md : page d'accueil en sept écrans (branche `refonte-pme-v2`)

Date : 06.10.2026. État : build Vite OK, `wrangler deploy --dry-run` OK, rien n'est déployé, rien n'est mergé.
Captures et rapports dans `verif/captures/` (non versionnés), scripts dans `verif/` (voir `verif/README.md`).
Spécification validée : `docs/superpowers/specs/2026-10-06-accueil-structure-design.md`.

## 0. Ce qui manque toujours, à lire avant le diff

**AUDIT.md n'existe toujours pas.** Comme pour la version mergée le matin même (PR #12), le texte de la page est un provisoire écrit sous les contraintes du brief (vouvoiement, français de Suisse, aucun tiret long, aucun chiffre inventé, le travail du client comme sujet). Tout est dans `src/content/home.ts`, à remplacer chaîne par chaîne sans toucher aux composants :

| Écran | Constante dans `src/content/home.ts` |
| --- | --- |
| 1. Accueil (eyebrow, H1, lede, CTA, ligne clients) | `HERO` |
| 2. Le problème concret (cinq situations) | `PROBLEM` |
| 2 bis. Dépliant « Les trois façons de rater l'IA » | `PITFALLS` |
| 3. Ce qu'on installe (quatre cartes photo, détail déclencheur / ce qui se passe / ce que vous gardez en main) | `INSTALL_ITEMS`, `INSTALL` |
| 4. Résultats clients (trois cartes problème / installé / résultat, détail avant / après / ce qui tourne) | `RESULT_ITEMS`, `RESULTS` |
| 5. Comment on travaille (quatre étapes en accordéon) | `METHOD` |
| 6. Questions (six, dont « Où vont mes données ? » avec le schéma) | `FAQ`, `DATA_DIAGRAM` |
| 7. Réserver (photo, titre, texte, ligne à propos, deux boutons) | `CLOSING` |
| Ligne « Autres projets » | `OTHER_PROJECTS` |
| Titre, description, mots-clés | `SEO`, `SERVICE_DESCRIPTION` |

**Les photos sont toujours provisoires.** `hero-atelier.webp` (1600×900), `chantier-telephone.webp`, `bureau-soir.webp`, `pieces-compta.webp` et la nouvelle `factures-relance.webp` (1200×800) portent la mention « image provisoire, a remplacer » dans leur coin. À faire quand les vraies photos arrivent : remplacer les fichiers sous le même nom, ajuster `width` et `height` dans `IMAGES`, relire les textes alternatifs, relancer les scripts de `verif/`. `tanguy.jpg` est la vraie photo.

**Chiffres.** Aucun chiffre inventé. Les trois cartes de résultat disent « mesure en cours ». La « douzaine de minutes par devis » de Richoz, présente dans la version mergée, n'est plus affichée : elle revient quand la mesure est confirmée.

## 1. Ce qui change par rapport à la version mergée

Retour de Tanguy sur la version en ligne : trop rempli, il faut des sections qui défilent de droite à gauche, du contenu repliable, des images qui bougent, le problème concret puis le résultat client, une vraie structure.

| Avant (mergé) | Après (cette branche) |
| --- | --- |
| Onze blocs à la suite, 9 428 caractères visibles | Sept écrans, 3 868 caractères visibles détails repliés (0,41 du texte d'avant), 658 mots |
| Bande clients séparée | Une ligne sous le bouton du hero |
| Preuve, trois cartes empilées | Écran 4 : rail de trois cartes problème / installé / résultat, détail replié |
| Cinq situations en liste avec photo | Écran 2 : rail de cinq cartes courtes (90 caractères max) |
| Trois façons de rater l'IA, trois colonnes | Dépliant fermé sous le rail du problème |
| Méthode épinglée au défilement (bureau) | Écran 5 : accordéon natif, une étape ouverte à la fois, la première ouverte par défaut |
| Quatre exemples, deux photos fixes | Écran 3 : rail de quatre cartes avec photo qui zoome au défilement, détail replié |
| Infrastructure, phrase et schéma | Réponse « Où vont mes données ? » de la FAQ, schéma dans la réponse |
| À propos, bloc séparé | Une ligne avec la photo dans l'écran 7 |
| Photos immobiles, parallaxe du hero seule | Hero : parallaxe 40 px et zoom 1,06 ; cartes : zoom lent de 1 à 1,06 en traversant l'écran |

Composants supprimés : `ClientNames`, `Proof`, `TimeCost`, `Pitfalls`, `ProcessPinned`, `Examples`, `Infrastructure`, `About`, `use-scroll-progress`. Ajoutés : `Rail`, `Disclosure`, `ZoomPhoto`, `Problem`, `Install`, `Results`, `Method`, `DataDiagram`, `Closing`, `lib/scroll-track`. `Faq` reçoit une option `extra` (contenu sous une réponse), sans effet sur les autres pages.

## 2. Vérification anti « site fait par une IA »

Contrôles sur le texte rendu (`verif/antiai.mjs`) : 0 tiret long, aucun « Imaginez », « Dans un monde où », « Que vous soyez », « Découvrez », aucun « innovant, révolutionnaire, puissant, intelligent, sur mesure, clé en main, fluide, seamless », aucun bouton « Commencer », « En savoir plus », « Découvrir ». Titres en question : seulement les six de la FAQ. « L'IA » comme sujet : une fois, dans le titre du dépliant imposé par le brief. Aucun flou d'arrière-plan.

- Dégradés : deux usages, tous deux fonctionnels et déjà présents dans la version mergée : le voile noir derrière le texte du hero, et le filet de 1 px entre sections du composant partagé `Section` (un fondu de bordure, utilisé aussi par les autres pages, non touché).
- Icônes : 26 SVG en ligne, tous fonctionnels : 18 chevrons de dépliants, 6 flèches de rails, 2 flèches dans les boutons principaux. Aucune icône illustrative.
- Variété : rail de cinq cartes texte, rail de quatre cartes photo, rail de trois cartes client, accordéon, liste de questions, écran de clôture avec photo. Aucun triptyque de cartes.
- Lien demandé par le brief vers l'agent fiduciaire : sur la carte « Les pièces pour la fiduciaire » de l'écran 3.

## 3. Vérification design

Méthode : `npm run build` puis `npx wrangler dev --port 4173` (le build Cloudflare servi en local ; pas de `vite dev`, interdit sur cette machine), Playwright 1.63 avec Chromium 153 et WebKit 26.6, trois tailles : 390×844 à 2x (iPhone 13), 768×1024 à 2x, 1440×900. Chaque écran capturé et regardé, plus trois captures par rail (départ, après un geste, fin) et une page entière par taille.

### 3.1 Premier écran

| | iPhone 390×844 | Tablette 768×1024 | Bureau 1440×900 |
| --- | --- | --- | --- |
| Hauteur du hero | 541 px (max 70 svh = 591) | 676 px (max 717) | 594 px (max 630) |
| Haut du titre « Ce qui vous coûte du temps. » | 649 px, visible sans défiler | 824 px, visible | 743 px, visible |
| Éléments cachés dans l'écran au chargement | 0 | 0 | 0 |

### 3.2 Contraste du hero

Mesuré sur les pixels de la photo provisoire après l'ombre de 55 % et le voile de texte, contre les 5 % de pixels les plus clairs derrière chaque bloc (le pire cas) :

| Bloc | iPhone | Tablette | Bureau |
| --- | --- | --- | --- |
| Titre | 8,2:1 | 10,6:1 | 10,7:1 |
| Lede | 6,6:1 | 9,0:1 | 9,5:1 |
| Ligne clients | 6,1:1 | 8,1:1 | 8,4:1 |
| Eyebrow | 6,7:1 | 4,9:1 | 13,7:1 |

Le reste de la page utilise les jetons du site : texte secondaire 7,9:1, texte atténué 5,4:1, texte principal 15:1. Lighthouse (axe) ne signale aucun défaut de contraste. À refaire avec les vraies photos : `node verif/shots.mjs` imprime ces valeurs.

### 3.3 Rails

Défilement natif (`scroll-snap-type: x mandatory`), une carte par geste, compteur « n / N » (n = première carte entièrement visible), flèches à partir de 768 px, désactivées aux extrémités, cachées quand tout tient dans la largeur.

| | iPhone | Tablette | Bureau |
| --- | --- | --- | --- |
| Largeur des cartes | 78 % (86 % pour les clients) | 360 px, 420 px pour les clients | 360 px, 440 px pour les installations, 520 px pour les clients |
| Cinq situations : geste, flèche, fin | « 2 / 5 », pas de flèche, fin « 5 / 5 » | « 2 / 5 », flèche « 3 / 5 », fin « 4 / 5 » et flèche désactivée | « 2 / 5 », flèche « 3 / 5 », fin « 3 / 5 » et flèche désactivée |
| Quatre installations | « 2 / 4 », fin « 4 / 4 » | « 2 / 4 », flèche « 3 / 4 », fin « 3 / 4 » | « 2 / 4 », flèche « 2 / 4 », fin « 2 / 4 » |
| Trois clients | « 2 / 3 », fin « 3 / 3 » | « 2 / 3 », fin « 2 / 3 » | « 2 / 3 », fin « 2 / 3 » |
| Débordement horizontal de la page | aucun | aucun | aucun |

Sur bureau, la dernière carte visible est coupée au bord du conteneur : c'est le signal qu'il y a plus. Les cartes des rails sont des `li` dans un `ul` avec un libellé ; le rail est atteignable au clavier (flèches du clavier dans la piste, boutons « Carte précédente » et « Carte suivante »).

### 3.4 Dépliants

`details` natif, chevron qui tourne, ouverture en 200 ms. Vérifié aux trois tailles : le dépliant des trois façons s'ouvre au clic ; « Voir le détail » s'ouvre à la touche Entrée ; l'accordéon de la méthode garde une seule étape ouverte (attribut `name` des `details`, avec repli en JavaScript). Le contenu replié est dans le HTML servi, donc lisible par les moteurs.

### 3.5 Images

- Hero : `preload` et `fetchpriority="high"`, parallaxe de 0 à 40 px et zoom jusqu'à 1,06, mesurés en fin de course à `translate3d(0, -40px, 0) scale(1.06)`.
- Cartes : zoom mesuré de 1,002 à l'entrée dans l'écran à 1,045 en haut de l'écran, jamais au-delà de 1,06. Chargement différé, `width`, `height` et `alt` sur chaque image, ratio fixé par `aspect-ratio`.
- Aucune image agrandie au-delà de sa taille (hero à 0,96 de sa taille sur tablette Retina, le pire cas).

### 3.6 Typographie

- Corps de texte : 1,125 rem (18 px) et interligne 1,6 ; 1,25 rem pour les introductions d'écran.
- Exceptions sous 18 px, assumées : la ligne clients du hero (15 px, 6,1:1 au pire) et la ligne « Tanguy Lachat, Bassecourt… » de l'écran 7 (16 px, 7,9:1).
- Longueur de ligne : aucune ligne de paragraphe au-dessus de 65 caractères aux trois tailles.
- Espaces insécables avant les deux-points et les points d'interrogation ; aucun débordement horizontal.

### 3.7 Lighthouse mobile

Lighthouse 13.5.0, Chrome, émulation mobile et réseau simulé, sur le build servi en local, après la dernière modification :

| Performance | Accessibilité | Bonnes pratiques | SEO |
| --- | --- | --- | --- |
| 95 | 100 | 100 | 100 |

FCP 2,0 s, LCP 2,6 s (l'image du hero), TBT 0 ms, CLS 0, Speed Index 2,0 s. JavaScript au premier chargement : 134 Ko compressés (bundle TanStack Start et React ; `Rail`, `Disclosure` et `ZoomPhoto` ajoutent 3 Ko). CSS 16 Ko, hero provisoire 54 Ko. Rapport complet : `verif/captures/lighthouse-mobile.report.html`.

### 3.8 Mouvement réduit

Avec `prefers-reduced-motion: reduce` : 0 élément caché, hero immobile (`transform: none`), les quatre photos immobiles, rails qui sautent sans animation, dépliants sans animation.

### 3.9 Clavier et liens

Ordre de tabulation sur bureau, contour de focus visible sur chacun : « Aller au contenu » (envoie le focus sur `#main`), logo, quatre liens de navigation, « Réserver 15 min », « Réserver 15 minutes avec Tanguy », la piste du rail des situations, « Carte suivante », « Les trois façons de rater l'IA », puis les quatre « Voir le détail » des installations, « Carte suivante » du rail suivant, et ainsi de suite jusqu'aux deux boutons de l'écran 7.

Liens : `https://cal.com/lx-studio/15min` dans un nouvel onglet avec `rel="noopener noreferrer"` (deux fois : hero et écran 7) ; `mailto:contact@lxstudio.ch` ; `/fiduciaire` (carte des pièces et ligne « Autres projets »), `/mentia`, `/athlit`.

### 3.10 WebKit

WebKit 26.6 (moteur de Safari) à 390×844 : hero 541 px, titre du problème à 649 px, 0 élément caché à l'écran et après défilement, parallaxe à `translate3d(0, -40px, 0) scale(1.06)` en fin de course, FAQ fonctionnelle, aucune erreur.

### 3.11 Pages non touchées

`/fiduciaire`, `/mentia`, `/athlit`, `/blog` : statut 200, aucun débordement, aucune erreur console, aux deux tailles. Les routes n'ont pas été modifiées. Seul composant partagé touché : `Faq`, option `extra` facultative, rendu identique sans elle.

### 3.12 Build

- `npx tsc --noEmit` : aucune erreur.
- `npx eslint` et `npx prettier --check` sur les fichiers de la branche : aucune erreur.
- `npm run build` : OK, sortie Nitro pour Cloudflare dans `.output/`.
- `npx wrangler deploy --dry-run` : OK, 86 modules, 1556 Kio (304,5 Kio compressés), 31 fichiers d'assets.

## 4. Ce qui n'a PAS été testé

- Un vrai téléphone en main. Tout est en émulation (Chromium, plus WebKit pour le moteur de Safari). Le geste de glissement est simulé par un défilement, pas par un doigt.
- Une vraie connexion 3G : Lighthouse simule le réseau sur `localhost`.
- Les vraies photos et le copy d'AUDIT.md dans la mise en page : les cartes sont calées sur le texte provisoire (90 caractères par situation, trois lignes par résumé de carte). Un texte plus long allonge toutes les cartes du rail.
- Firefox : l'accordéon repose sur l'attribut `name` des `details` (Firefox 130 et plus) avec un repli JavaScript ; le repli n'a été exercé que dans Chromium et WebKit.
- Safari avant la version 15.4 : les largeurs de cartes par type de rail utilisent `:has()` ; sans lui, toutes les cartes prennent la largeur de base (78 %, puis 360 px).
- Le déploiement Cloudflare lui-même (dry-run seulement), la synchronisation Lovable et le domaine.
- Plausible : inchangé, non vérifié.

## 5. Pour finir

1. Regarder la branche sur un téléphone : la prévisualiser depuis Lovable ou la déployer sur un environnement de test, puis faire glisser les trois rails et ouvrir les dépliants.
2. Déposer les cinq vraies photos dans `public/img/` sous les mêmes noms ; ajuster `width`, `height` et `alt` dans `IMAGES` (`src/content/home.ts`).
3. Coller le copy d'AUDIT.md dans `src/content/home.ts` en suivant le tableau du point 0.
4. Relancer `npm run build`, `npx wrangler dev`, les quatre scripts de `verif/` et Lighthouse.
5. Merger la PR, puis redéployer depuis Lovable.
