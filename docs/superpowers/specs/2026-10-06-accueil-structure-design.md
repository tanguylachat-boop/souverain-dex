# Accueil lxstudio.ch : structure en sept écrans

Date : 06.10.2026. Statut : validé par Tanguy le 06.10.2026 (ordre, mouvement des images, défilement horizontal partout, sections repliées).
Remplace la page d'accueil mergée le même jour (PR #12), jugée trop dense et sans fil.

## 1. Objectif

Une page d'accueil que l'on parcourt plutôt qu'on ne la lit : un écran par idée, des rangées de cartes que l'on fait défiler de droite à gauche, des détails repliés, des photos qui bougent doucement. Le fil est celui d'un patron de PME : le problème concret, ce qu'on installe, le résultat chez des clients, comment on travaille, les questions, le rendez-vous.

Cible inchangée : patrons de PME romandes de 40 à 60 ans qui lisent sur téléphone et se méfient de ce qui ressemble à une startup. Le site ne doit pas avoir l'air généré par une IA : pas de tiret long, pas de mot creux, pas de titre en question, pas de dégradé coloré, pas de flou, pas d'icône générique.

## 2. Non-objectifs

- Les routes `/fiduciaire`, `/mentia`, `/athlit`, `/blog` et les pages légales ne changent pas.
- Pas de nouvelle librairie JavaScript : les rangées et les blocs repliables sont natifs.
- Pas de vidéo (choix de Tanguy : zoom lent et parallaxe, sans fichier à fournir).
- Pas de copy définitif : AUDIT.md n'existe toujours pas. Le texte est écrit par Claude, raccourci de moitié, centralisé dans `src/content/home.ts`, à remplacer plus tard chaîne par chaîne.

## 3. Le fil : sept écrans

Chaque écran tient en un titre (une affirmation, jamais une question), une phrase d'introduction au plus, puis son contenu. Les budgets de texte sont des maximums.

| # | Écran | Contenu visible sans cliquer | Replié derrière un clic |
| --- | --- | --- | --- |
| 1 | Accueil, 70 svh max | Photo plein cadre qui zoome (1 à 1,06) et glisse (0 à -40 px) au défilement ; eyebrow ; titre d'une ligne d'idée ; une phrase ; un bouton « Réserver 15 minutes avec Tanguy » ; ligne de confiance = les quatre clients « Oasis Drink Distribution · Richoz Sanitaire · Taxi Elsa · Taxi d'Andrea » | rien |
| 2 | Le problème concret | Titre « Ce qui vous coûte du temps » ; une phrase ; rangée de cinq cartes (numéro, titre d'une ligne, une phrase de 90 caractères max) | bloc « Les trois façons de rater l'IA » : trois titres, une phrase chacun, puis la phrase de réponse |
| 3 | Ce qu'on installe | Titre « Quatre choses qu'on installe le plus souvent » ; une phrase ; rangée de quatre cartes (photo 2:1 qui zoome doucement, titre, une phrase) | par carte, « Voir le détail » : déclencheur, ce qui se passe, ce que vous gardez en main (une phrase chacun) ; la carte fiduciaire garde le lien vers `/fiduciaire` dans son détail |
| 4 | Résultats clients | Titre « Ce que ça a changé chez trois clients » ; une phrase ; rangée de trois cartes (client, lieu et secteur, puis trois lignes : Problème, Installé, Résultat ; le résultat est un chiffre vérifié ou « mesure en cours ») | par carte, « Voir le détail » : avant, après, ce qui tourne |
| 5 | Comment on travaille | Titre « Quatre étapes » ; accordéon de quatre étapes (numéro, titre, durée dans le résumé), la première ouverte, une seule ouverte à la fois | le corps de chaque étape : une phrase et « Vous repartez avec » |
| 6 | Questions | Titre « Ce qu'on me demande avant de travailler ensemble » ; accordéon de six questions, toutes fermées | les réponses ; « Où vont mes données ? » contient la phrase sur l'hébergement et le schéma entre / système / sort |
| 7 | Réserver | Photo de Tanguy, « Commencez par une tâche, pas par un outil », une phrase, la ligne « Tanguy Lachat, Bassecourt. Un seul interlocuteur, aucune sous-traitance. », bouton cal.com, lien e-mail | rien |

Sous l'écran 7 : la ligne « Autres projets » (agent pour fiduciaires, Mentia, Athlit) puis le pied de page partagé, inchangés.

Sections de la version actuelle qui disparaissent : la bande clients (dans l'accueil), « Les trois façons de rater l'IA » (repliée sous le problème), la séquence épinglée (remplacée par l'accordéon), l'infrastructure (dans la FAQ), « À propos » (dans l'écran 7).

## 4. Interactions

**Rangées (`Rail`).** Défilement horizontal natif : `overflow-x: auto`, `scroll-snap-type: x mandatory`, une carte alignée à gauche à chaque cran, inertie native. Largeur de carte : 78 % du conteneur sous 640 px (la suivante dépasse pour inviter au geste), 360 px au-delà. À partir de 768 px, deux boutons « précédent » et « suivant » (flèches, `aria-label`) qui font défiler d'une carte ; ils se désactivent en bout de rangée. Le clavier fonctionne par Tab sur les cartes et Maj+Tab, la molette et le pavé tactile par défilement horizontal natif. Sans JavaScript, la rangée défile quand même. Pas de boucle infinie, pas de défilement automatique, pas de points de pagination : un indicateur discret « 1 / 5 » suffit.

**Blocs repliables (`Disclosure`).** `details` et `summary` natifs, stylés comme la FAQ actuelle : chevron qui tourne, cible de 44 px, ouverture animée en 200 ms via `grid-template-rows` (statique en mouvement réduit). L'accordéon de la méthode utilise l'attribut `name` de `details` pour n'avoir qu'une étape ouverte à la fois, avec repli JavaScript pour les navigateurs qui l'ignorent (fermer les autres à l'événement `toggle`). Tout le contenu replié est dans le HTML servi : indexable, lisible sans script.

**Images (`ZoomPhoto`).** Chaque photo est dans un cadre qui coupe ; l'image passe de l'échelle 1 à 1,06 pendant que son cadre traverse l'écran, sur `transform` uniquement, calculé au plus une fois par image avec `requestAnimationFrame` (même mécanique que la parallaxe actuelle). L'accueil combine zoom et glissement vertical de 40 px. Sous `prefers-reduced-motion: reduce`, aucune image ne bouge.

**Apparition.** `Appear` reste tel quel (fondu 500 ms, 16 px, 60 ms entre cartes, jamais caché avant le script). Rien d'autre ne bouge.

## 5. Contenu

- Source unique : `src/content/home.ts`, réécrit. Le texte visible sans cliquer doit peser au plus la moitié de la version actuelle (mesure : `innerText` de `main` avec tous les `details` fermés, avant et après ; la valeur actuelle est relevée au début du chantier).
- Chaque chaîne respecte les règles : vouvoiement, français de Suisse, espaces insécables avant « : » et « ? », aucun tiret long, le travail du client comme sujet, aucun chiffre inventé.
- Les faits clients restent ceux vérifiés dans le vault (Oasis Drink : proposition du 16.04.2026 et note du 30.08.2026 ; Richoz : note client du 11.04.2026 ; Taxi d'Andrea : site et référencement local). Aucun montant client. Résultats : « mesure en cours » sauf chiffre confirmé par Tanguy.
- Images : `hero-atelier.webp`, `chantier-telephone.webp`, `pieces-compta.webp`, `bureau-soir.webp` (réaffectée à la carte « Les mails qui se répètent »), plus une nouvelle `factures-relance.webp` (carte « Les factures à relancer »). Toutes provisoires et marquées « image provisoire » tant que les vraies photos manquent ; `tanguy.jpg` reste la vraie photo. Dimensions et textes alternatifs dans `IMAGES`.

## 6. Composants

Nouveaux, dans `src/components/site/` :
- `Rail.tsx` : la rangée à défilement horizontal, générique (enfants = cartes), avec flèches dès 768 px et indicateur de position.
- `Disclosure.tsx` : le bloc repliable natif stylé, avec `name` optionnel pour l'accordéon.
- `ZoomPhoto.tsx` : l'image dans son cadre, zoom au défilement, `loading`, `width`, `height`, `alt` obligatoires.
- `Problem.tsx` (écran 2, inclut le bloc replié des trois façons), `Install.tsx` (écran 3), `Results.tsx` (écran 4), `Method.tsx` (écran 5, accordéon), `Closing.tsx` (écran 7).

Modifiés : `HomeHero.tsx` (zoom en plus de la parallaxe, quatre clients en ligne de confiance, plus de bouton secondaire), `Faq.tsx` (une entrée peut porter un contenu supplémentaire `extra` rendu sous la réponse, pour le schéma ; le schéma FAQ reste texte pour le balisage), `index.tsx` (nouvel ordre), `styles.css` (règles des rangées, des repliables, des photos ; suppression des règles de la séquence épinglée, de la bande clients, des sections retirées).

Supprimés : `ClientNames.tsx`, `Proof.tsx`, `TimeCost.tsx`, `Pitfalls.tsx`, `ProcessPinned.tsx`, `Examples.tsx`, `Infrastructure.tsx`, `About.tsx`, et `useSequence` dans `use-scroll-progress.ts` s'il n'a plus d'appelant.

Partagé et inchangé : `Page`, `SiteNav`, `SiteFooter`, `CtaBand` (plus utilisé par l'accueil mais utilisé ailleurs), `OtherProjects`, `Appear`, les primitives de `ui.tsx`.

## 7. Budgets

- Lighthouse mobile : performance 85 au moins, accessibilité 95 au moins (objectif : rester à 95 et 100).
- JavaScript au premier chargement : pas plus lourd qu'aujourd'hui (131 Ko compressés), aucune librairie ajoutée.
- Premier écran sur iPhone 13 (390×844) : accueil sous 70 svh, titre de l'écran 2 visible sans défiler.
- Corps de texte 18 px, interligne 1,6, 65 caractères par ligne au plus ; contraste 4,5:1 au moins partout, pied de page compris.
- Aucun débordement horizontal de la page (les rangées débordent dans leur propre cadre, pas la page).

## 8. Vérification

Les scripts de `verif/` sont adaptés : `shots.mjs` capture les sept écrans et chaque rangée à trois positions, mesure la masse de texte visible, teste le geste (défilement programmé d'une rangée, flèches, position de l'indicateur), les repliables (ouverture au clic et au clavier, une seule étape ouverte), le zoom des photos (échelle à l'entrée et à la sortie de l'écran, immobile en mouvement réduit). `inner.mjs`, `antiai.mjs`, `webkit.mjs` et Lighthouse rejouent tels quels. Résultats dans `VERIF.md`, réécrit pour cette version.

## 9. Livraison

Branche `refonte-pme-v2` depuis `main`, commits par écran, PR vers `main`, pas de merge sans accord de Tanguy, qui redéploie depuis Lovable.
