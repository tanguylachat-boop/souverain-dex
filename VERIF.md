# VERIF.md : page d'accueil refaite sur le modèle de levupp.com (branche `refonte-levupp`)

Date : 06.10.2026. État : `npm run typecheck` 0 erreur, `npm run lint` propre, build Vite OK, servi en local avec `wrangler dev`. Rien n'est déployé, rien n'est mergé.
Audit de la page de référence : `docs/levupp-audit.md`. Scripts : `verif/` (voir `verif/README.md`). Captures et rapports dans `verif/captures/` (non versionnés).

## 0. Ce qui reste provisoire, à lire avant le diff

**Le texte.** Comme pour les deux versions précédentes, AUDIT.md n'existe pas. Le texte est celui validé pour la version en sept écrans, réparti dans la nouvelle structure, sous les mêmes contraintes : vouvoiement, français de Suisse, aucun tiret long, aucun chiffre inventé, aucun prix affiché (chaque offre a son prix, Tanguy valide tous les devis). Tout est dans `src/content/home.ts`, à remplacer chaîne par chaîne sans toucher aux composants :

| Section | Constante |
| --- | --- |
| Nav (liens, sous-liens, bouton) | `NAV` |
| Premier écran (mots qui tournent, suite du titre, intro, deux boutons) | `HERO`, `HERO_VIDEO` |
| Quatre chiffres | `STATS` |
| Résultats clients (carrousel, trois clients) | `WORKS` |
| Mur de faits (douze cartes) | `WALL` |
| Comparatif (cinq lignes, quatre colonnes) | `COMPARE` |
| Méthode (trois cartes, jalons, outils, badges) | `METHOD` |
| Ce qui est compris (douze lignes) | `INCLUDED` |
| Seuil (phrase de bascule) | `THRESHOLD` |
| Tarifs (deux cartes, sans montant) | `PRICING` |
| Questions (sept) | `FAQ` |
| Réserver (titre, bouton, paysage) | `CONTACT` |
| Pied de page | `FOOTER` |
| Titre, description, mots-clés | `SEO`, `SERVICE_DESCRIPTION` |

**Les images et la vidéo.** Aucun média de levupp.com n'a été repris. Les nôtres sont provisoires :

| Fichier | Usage | État |
| --- | --- | --- |
| `public/video/hero-desktop.mp4` (2,7 Mo, 24 s) et `hero-mobile.mp4` (1,2 Mo) | Vidéo du premier écran, en boucle | Fabriquée avec ffmpeg par un zoom lent sur la photo provisoire de l'atelier. À remplacer par une vraie séquence (même nom, même durée approximative, H.264, sans son) |
| `public/video/hero-poster.webp` (1600×900, 50 Ko) | Image affichée avant la vidéo et avec mouvement réduit | Première image de la vidéo provisoire. À refaire à partir de la vraie vidéo |
| `public/img/factures-relance.webp`, `chantier-telephone.webp`, `bureau-soir.webp` | Visuels des trois résultats clients | Provisoires, mention « image provisoire » dans le coin |
| `public/img/paysage.jpg` (1600×900, 276 Ko) | Paysage de la section Réserver, avec parallaxe | Photo de banque (picsum). À remplacer par une photo de la région ou à retirer |
| `public/img/tanguy.jpg` | Photo de l'équipe (méthode) | Vraie photo |
| `public/tools/*.svg` | Logos d'outils dans la méthode | Simple Icons (CC0) |
| `public/fonts/Geist-Variable.woff2`, `GeistMono-Variable.woff2` | Police du site | Geist (licence OFL, `LICENSE-Geist.txt`). Levupp utilise Roobert, non reprise |

**Chiffres.** Les quatre chiffres du bandeau (4 clients, 1 interlocuteur, 48 h, 15 min) viennent du texte validé. Les résultats clients disent « mesure en cours » quand la mesure manque.

## 1. Ce qui a été construit

Même architecture que levupp.com, section par section, avec les mécaniques de mouvement refaites en CSS et dans un petit script maison (aucune librairie d'animation, aucun code, texte, image, vidéo ou police repris de la page de référence). Détail de la transposition dans `docs/levupp-audit.md`, section 3.

| Écran | Composant | Mouvement |
| --- | --- | --- |
| Nav | `Nav.tsx` | Pastille centrée de 340 px, classe `solid` après 24 px de défilement, menu qui s'ouvre dans la pastille (liens lettre par lettre, sous-liens, bouton), voile flouté, Échap ferme |
| Premier écran | `Hero.tsx` | Vidéo plein écran (source téléphone sous 760 px), image d'arrêt sous la vidéo, parallaxe 0,13 × défilement, mot qui tourne toutes les 3,4 s lettre par lettre, apparition dès le premier rendu (animation CSS, sans attendre le script) |
| Chiffres | `Stats.tsx` | Compteurs 1150 ms, quatre icônes animées (tuiles, noyau, calendrier, jauge) |
| Résultats | `Works.tsx` | Carrousel trois clients, barre de progression 7 s, flèches, glisser au doigt, pause hors écran, photo révélée par `clip-path` |
| Mur de faits | `Wall.tsx` | Trois colonnes qui défilent en continu, colonne centrale en sens inverse, statique sous 760 px |
| Comparatif | `Compare.tsx` | Tableau cinq lignes, première colonne surlignée |
| Méthode | `Approach.tsx` | Trois cartes décalées à l'apparition avec illustrations animées (noyau et satellites, règle à jalons, points après la mise en service), bento outils en deux rangées opposées, photo et badges à compteur |
| Compris | `Included.tsx` | Feuille inclinée en perspective, douze lignes qui entrent une à une, à plat au survol |
| Seuil | `Threshold.tsx` | Phrase de bascule ; le ton de la page passe du sombre au clair ici |
| Tarifs | `Pricing.tsx` | Deux cartes en perspective, à plat au survol, sans montant |
| Questions | `Questions.tsx` | Colonne gauche collante, accordéon `grid-template-rows` |
| Réserver | `Contact.tsx` | Paysage avec parallaxe, dégradés vers le pied de page |
| Pied de page | `Footer.tsx` | Collé en bas de l'écran et découvert par le contenu (sticky), en flux normal quand il est plus haut que l'écran |

Fichiers : `src/styles/home.css` (3180 lignes, tous les styles de la page sous `.lx`), `src/components/home/` (treize composants, `effects.ts`, `text.tsx`), `src/content/home.ts`, `src/routes/index.tsx`. Les pages intérieures (`/fiduciaire`, `/mentia`, `/athlit`, `/blog`) reçoivent la nouvelle nav et le nouveau pied de page via `src/components/site/Page.tsx`. Quatorze composants de l'ancienne page d'accueil supprimés.

## 2. Vérifications faites (Chromium, `verif/shots.mjs`)

Trois écrans : 390×844 (téléphone), 768×1024 (tablette), 1440×900 (bureau). Rapport complet dans `verif/captures/report.json`.

| Contrôle | Téléphone | Tablette | Bureau |
| --- | --- | --- | --- |
| Vidéo en lecture au premier écran | oui, `hero-mobile.mp4` | oui, `hero-desktop.mp4` | oui, `hero-desktop.mp4` |
| Titre sur deux lignes, police Geist | oui | oui | oui |
| Mot qui tourne (« Les devis » puis « Les relances » après 3,4 s) | oui | oui | oui |
| Compteurs arrivés à 4, 1, 48, 15 (et 4, 4 dans la méthode) | oui | oui | oui |
| Carrousel : panneau 1 après 7 s, flèche vers le 3, onglets `aria-selected`, photo révélée | oui | oui | oui |
| Glisser au doigt change de panneau | oui | oui | sans objet |
| Mur de faits en mouvement | non, statique (voulu) | oui | oui |
| Ton 0 jusqu'à « Compris », 1 avec encre sombre dès « Seuil » | oui | oui | oui |
| Accordéon des questions | oui | oui | oui |
| Pied de page collé et découvert (sticky) | non, en flux (882 px pour 844 d'écran) | oui | oui |
| Menu : ouverture, fermeture | oui | oui | oui |
| Débordement horizontal | aucun | aucun | aucun |
| Tirets longs dans le texte rendu | 0 | 0 | 0 |
| Erreurs console | 0 | 0 | 0 |
| Images sans texte alternatif | 0 | 0 | 0 |

Mouvement réduit (`prefers-reduced-motion`) : tout est posé (0 élément caché), l'image d'arrêt remplace la vidéo, le mur est statique, un seul mot du titre est affiché.

Pages intérieures : `/fiduciaire`, `/mentia`, `/athlit`, `/blog` répondent 200, avec la nav et le pied de page, sans débordement ni erreur console.

WebKit (moteur de Safari, 390×844, `verif/webkit.mjs`) : vidéo en lecture, titre sur deux lignes, mot qui tourne, parallaxe de 52 px à 400 px de défilement, bascule du ton au niveau des tarifs, pied de page en flux, aucun débordement, 0 erreur.

## 3. Performance et accessibilité (Lighthouse 13.5, Chrome headless, build servi par wrangler)

| | Performance | Accessibilité | Bonnes pratiques | SEO | FCP | LCP | TBT | CLS | Speed Index |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile (4G lente simulée, CPU ralenti 4×) | 92 | 100 | 100 | 100 | 1,8 s | 3,2 s | 0 ms | 0 | 1,8 s |
| Bureau | 100 | 100 | 100 | 100 | 0,4 s | 0,7 s | 0 ms | 0 | 0,4 s |

Poids transféré sur mobile : 1 609 Kio, dont 1 206 Kio pour la vidéo (chargée seulement après l'événement `load`, elle ne retarde ni le texte ni l'image d'arrêt), 139 Kio de polices, 134 Kio de script, 26 Kio de CSS, 91 Kio d'images.

La première passe donnait 39 en performance (LCP 3,1 s, TBT 1 570 ms, CLS 1) et 94 en accessibilité. Corrigé depuis :

- Pied de page collé en CSS (`position: sticky`) au lieu d'un passage en `fixed` par le script après le rendu : le décalage de mise en page disparaît (CLS 1 → 0).
- Vidéo sans préchargement, source posée 400 ms après `load` ; halo du premier écran sans mode de fusion : le fil principal est libre (TBT 1 570 → 0 ms).
- Premier écran visible dès le premier rendu : l'apparition du titre, de l'intro et des boutons est une animation CSS, plus une transition déclenchée par le script. Avant, le premier écran restait vide jusqu'à l'hydratation, environ trois secondes sur un téléphone lent.
- Contraste : texte estompé à 52 % d'encre (au moins 4,5:1 sur fond sombre et sur fond clair), libellés du pied de page à 52 %.
- Cibles tactiles : liens du bas du pied de page, lien mail et lien « Ou écrire un mail » à 32 px de haut au moins.
- Police de secours « Geist Fallback » (Arial ou Helvetica ajustées aux métriques de Geist, largeur mesurée dans le navigateur) pour que le texte ne bouge pas si Geist arrive après le premier rendu.

Le LCP mobile de 3,2 s est celui du paragraphe d'intro du premier écran, compté quand son animation d'entrée le rend visible. Le titre lui-même entre lettre par lettre depuis l'invisible et Chrome ne le compte pas. C'est le prix de l'apparition copiée de la référence ; sur une vraie 4G, le premier écran apparaît bien avant.

## 4. Ce qui n'a PAS été testé

- Aucun vrai téléphone ni vrai Safari iOS : WebKit via Playwright seulement. La vidéo en lecture automatique, le pied de page et la bascule de ton sont à revoir sur un iPhone avant tout déploiement.
- Aucune vraie connexion lente : les chiffres mobiles sont une simulation Lighthouse.
- Windows et Android : la police de secours est calibrée sur l'Arial de macOS. Sur Android, sans Arial, le navigateur retombe sur Roboto sans ajustement.
- Clavier seul et lecteur d'écran : seuls les contrôles automatiques (Lighthouse, attributs ARIA du carrousel, de l'accordéon et du menu) ont tourné.
- Les liens sortants (cal.com, mailto, LinkedIn, Instagram) n'ont pas été suivis.
- Le déploiement : Tanguy redéploie depuis Lovable. Ce qui est vérifié ici est le build local, pas la version en ligne.

## 5. Pour finir

1. Remplacer les chaînes de `src/content/home.ts` par le texte validé, section par section (tableau en 0).
2. Remplacer les médias sous les mêmes noms (vidéo, image d'arrêt, trois visuels clients, paysage), ajuster `width` et `height` dans `IMAGES` si les formats changent, relire les textes alternatifs.
3. `npm run build`, `npx wrangler dev --port 4173`, puis `node verif/shots.mjs`, `node verif/webkit.mjs` et les deux commandes Lighthouse de `verif/README.md`. Comparer avec le tableau en 2 et 3.
4. Ouvrir la version déployée sur un vrai téléphone : première image, vidéo, mot qui tourne, carrousel au doigt, bascule de ton, pied de page.
