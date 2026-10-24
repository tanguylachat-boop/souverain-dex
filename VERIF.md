# Vérification : refonte « IA locale » (branche `refonte-ia-locale`, 24.10.2026)

Build servi en local par `npx wrangler dev --port 4173` (aucun serveur de dev sur cette machine),
passé au crible par `verif/shots.mjs`, `verif/webkit.mjs`, `verif/dashes.mjs` et Lighthouse 13.5
(mobile). Captures dans `verif/captures/` (non versionnées) ; planches de l'accueil dans
`docs/captures/`, rapports Lighthouse dans `docs/lighthouse/`.

## 1. Ce qui passe

| Contrôle | Résultat |
| --- | --- |
| `npm run typecheck` | 0 erreur |
| `npm run lint` | 0 erreur, 3 avertissements react-refresh (fichiers qui exportent un composant et une fonction : `text.tsx`, `MetierPage.tsx`, `router.tsx`) |
| `npm run build` | passe ; arbre des routes régénéré |
| Tirets longs et demi-cadratins | 0 dans 42 fichiers sources, 0 dans le texte rendu et les balises des 17 pages |
| Erreurs console / pageerror | 0 sur l'accueil (3 écrans) et sur les 8 pages intérieures (2 écrans) |
| Débordement horizontal | aucun, 390 / 768 / 1440 |
| Images sans `alt` ou sans `width` | 0 |
| Un seul `h1` par page | oui, sur chaque page |
| Police rendue | Manrope (auto-hébergée, preload du latin) |
| Redirections | `/fiduciaire` → `/fiduciaires`, `/mentia` → `/`, `/athlit` → `/`, `/blog` → `/ressources`, `/blog/<slug>` → `/ressources/<slug>`, `/blog/pourquoi-chatgpt-cite-votre-concurrent` → `/` : toutes en 301, côté serveur (routes) et dans `public/_redirects` |
| 404 | `/ressources/inconnu` répond 404 avec la page « Cette page n'existe pas » |
| Fichiers publics | sitemap.xml, robots.txt, llms.txt, polices, images OG en 200 ; le PDF du dossier en 200 avec `X-Robots-Tag: noindex, nofollow` |
| Mouvement réduit | classe `ia-motion-off`, 0 bloc caché, 0 mot masqué, nappe CSS immobile |
| WebKit (390×844) | premier écran 726 px, nappe WebGL active, 11/11 mots révélés, 3 lignes de titre, parallaxe `--hp` qui bouge, pied de page avec sa nappe, 0 erreur |

### Lighthouse mobile (Chrome headless, 4× de ralentissement CPU)

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 97 | 100 | 100 | 100 | 1,7 s | 2,3 s | 40 ms | 0 |
| `/fiduciaires` | 98 | 100 | 100 | 100 | 1,8 s | 2,1 s | 0 ms | 0 |

Avant correction, l'accueil était à 67 (TBT 1 460 ms) : le `filter: drop-shadow` sur le SVG de la
machine et ses animations internes forçaient un repeint complet à chaque image. Le flottement anime
désormais l'enveloppe, l'ombre est dessinée dans le SVG, et les animations internes ne tournent que
sur écran large avec une souris (`@media (hover: hover) and (min-width: 761px)`).

### Poids au premier chargement (gzip)

| Fichier | Poids |
| --- | --- |
| JS principal (React 19, TanStack Router et Start, effets, nappe WebGL) | 141 Ko |
| JS de la page d'accueil | 2 Ko |
| Validation et envoi des formulaires (zod + appel serveur), chargés au premier envoi seulement | 12,5 Ko + 2 Ko |
| CSS (remise à zéro Tailwind + `styles/ia.css`) | 10 Ko |
| Police Manrope (latin, preload) | 25 Ko |

Le JS principal est le plancher du cadre (TanStack Start) : aucune bibliothèque d'animation, aucun
composant tiers, pas de zod avant l'envoi d'un formulaire.

## 2. Ce qui a été vérifié à l'écran

Accueil, 390×844 (tactile), 768×1024, 1440×900 :

- premier écran : nappe WebGL en place (`canvas.is-on`), titre révélé mot par mot (11/11 à 2,6 s),
  3 lignes à 70,56 px sur bureau et 32,76 px sur téléphone, boutons dans le premier écran, en-tête
  en clair sur la nuit (`is-over`) puis en verre après 60 px (`is-scrolled`, fond à 74 %) ;
- chaque section capturée après son apparition : démo (cadre en attente), références, problème,
  différence (bande de nuit, nappe WebGL sur bureau et tablette, dégradés CSS sur téléphone),
  méthode, métiers, ressources, formulaire, questions, pied de page ;
- survol d'une ligne de la méthode : fond blanc, décalage de 24 px ; panneau « Métiers » visible au
  survol ;
- questions : une seule ouverte à la fois (ouvrir la 2e puis la 4e ferme la 2e) ;
- formulaire envoyé vide : 7 messages sous les champs, 0 appel serveur ;
- menu mobile : ouvert, 6 entrées, corps verrouillé, fermé à la touche Échap ;
- bouton de retour en haut visible après 600 px.

Pages intérieures (390 et 1440) : `/fiduciaires`, `/administrations`, `/pme`, `/securite`,
`/ressources`, un article, mentions légales, politique de confidentialité : 200, un `h1`, titre et
canonique propres, image OG dédiée, 2 blocs JSON-LD, 0 erreur.

## 3. SEO et GEO

- `lang="fr-CH"`, titre et description uniques par page, canonique, hreflang fr-CH / x-default,
  Open Graph et Twitter avec une image par page (`public/og/*.jpg`, générées par `npm run og`).
- JSON-LD : Organization (ProfessionalService avec adresse, téléphone, cantons), Person (fondateur),
  WebSite ; par page : WebPage ou CollectionPage, BreadcrumbList, Service (accueil et métiers),
  FAQPage (accueil, métiers, chaque article avec sa question), Article (chaque ressource), ItemList
  (liste des ressources).
- `sitemap.xml` (15 URL), `robots.txt` (crawlers d'assistants autorisés), `llms.txt` réécrit pour le
  nouveau positionnement.
- Mentions légales et politique de confidentialité en `noindex, follow`.

## 4. Ce qui n'a PAS été testé

- **L'envoi réel des mails.** Sans `RESEND_API_KEY` et `MAIL_FROM`, `lib/contact.ts` simule l'envoi
  et répond `delivered: false` : le formulaire affiche le succès mais rien ne part. À tester sur
  l'aperçu publié une fois les deux variables posées (secrets du projet, jamais dans le code).
- **La page publiée par Lovable.** Vérifié sur wrangler en local, pas sur l'URL de prévisualisation ;
  `_redirects` et `_headers` dépendent de l'hébergeur (les redirections sont aussi faites par les
  routes, donc sûres ; l'en-tête `noindex` du PDF ne l'est que si l'hébergeur lit `_headers`).
- **Un vrai téléphone.** WebKit et Chromium émulés seulement ; rendu de la nappe WebGL et du
  `backdrop-filter` à vérifier sur un iPhone réel.
- **Lighthouse bureau** et les pages autres que `/` et `/fiduciaires`.
- **Le PDF ouvert depuis le formulaire** : `window.open` après l'appel serveur peut être bloqué par
  un bloqueur de fenêtres ; le lien de secours est affiché dans le message de succès.
- **`VITE_SHOW_CCHBC=true`** : la référence Coca-Cola HBC n'a pas été affichée (variable absente),
  son logo manque de toute façon.

## 5. Les trous à combler (tous visibles en jaune sur le site)

Accueil et commun

- `[À COMPLÉTER : lien cal.com]` : `SITE.bookingHref` dans `src/content/ia/site.ts` ; tant qu'il est
  vide, les boutons mènent au formulaire.
- `[À COMPLÉTER : vidéo démo]` : section `#demo`, `SITE.demoVideo`.
- `[À COMPLÉTER : photo ou rendu de la machine ...]` : le visuel du premier écran est fait en code
  (`HeroMachine.tsx`), remplaçable par une photo.
- `[À COMPLÉTER : rue et numéro]`, `[À COMPLÉTER : numéro IDE]` : pied de page et mentions légales.
- `[À COMPLÉTER : logo Oasis Drink]`, `[À COMPLÉTER : logo Coca-Cola HBC]` (affiché seulement avec
  `VITE_SHOW_CCHBC=true`).
- `[À COMPLÉTER : garantie, si Tanguy en valide une]` : sous la méthode.
- FAQ : `[À COMPLÉTER : modèle, mémoire, prix du matériel]`, `[À COMPLÉTER : délai]`,
  `[À COMPLÉTER : état de chaque connecteur]`, `[À CONFIRMER PAR TANGUY]` (machine = serveur
  existant ; connexion internet), `[À VÉRIFIER PAR TANGUY : relecture juridique]`.

Métiers

- `/fiduciaires` : `[À COMPLÉTER : nom du cabinet pilote, avec son accord]`, `[À COMPLÉTER : état
  des connecteurs Abacus, Crésus, WinBIZ]`, relecture juridique.
- `/administrations` : `[À COMPLÉTER : catégories de données traitées]`, `[À CONFIRMER PAR TANGUY :
  format et durée de conservation des journaux]`, `[... annuaire pris en charge]`.
- `/pme` : `[À CONFIRMER PAR TANGUY : modèle de maintenance]`, connecteurs messagerie.

Sécurité (page et PDF, même source `src/content/ia/securite.ts`)

- `[À COMPLÉTER : date et prestataire]` du test d'intrusion (jamais présenté comme fait).
- `[À CONFIRMER PAR TANGUY]` : les deux options machine dédiée / serveur existant, liste des
  connecteurs et flux sortants, modèles et versions, méthode de chiffrement et gestion de la clé,
  certificats, intégration à un annuaire, durée de conservation des journaux, procédure de
  restauration testée, qui applique les mises à jour, conditions d'achat ou de location, registre
  des traitements.
- `[À COMPLÉTER : engagements supplémentaires validés par Tanguy]`.
- `[À VÉRIFIER PAR TANGUY]` sur les deux passages nLPD et art. 321 CP.

Ressources

- 14 passages juridiques marqués `[À VÉRIFIER PAR TANGUY]` (LPD art. 5, 6, 8, 16, 17, 19, 60 ;
  art. 321 CP), un `[À VÉRIFIER : conditions contractuelles des éditeurs]`, un `[À COMPLÉTER :
  configuration type et ordre de prix]`, les cinq lignes de la mesure dans l'article fiduciaire,
  `[À CONFIRMER PAR TANGUY : formats pris en charge]`.

Pages légales

- Hébergeur du site publié, for juridique, prestataire d'envoi des mails, maintien de la mesure
  d'audience (Plausible), durée de conservation.

## 6. Décisions à confirmer

- Le logo Facchinetti fourni par e-mail est le « Multimarkenlogo » du groupe : il contient les
  roundels BMW et MINI. Il est affiché en gris sur l'accueil ; l'accord écrit du client pour cet
  usage doit être au dossier.
- Un logo « OD » pour Oasis Drink existait dans l'ancien dépôt (`src/assets/clients/oasis-drink.png`,
  256×256) : un monogramme improvisé, pas le logo officiel. Il n'a pas été repris ; le placeholder
  reste.
- Les cinq anciens articles du journal sont conservés sous `/ressources` avec leur slug ; celui sur
  la visibilité dans les assistants IA (Mentia) a été retiré et redirige vers l'accueil.
- La variable d'affichage de Coca-Cola HBC s'appelle `VITE_SHOW_CCHBC` (préfixe obligatoire pour
  qu'une variable Vite soit lue côté client).

## 7. Refaire la passe

Voir `verif/README.md`. Générateurs : `npm run og` (images de partage), `npm run dossier:pdf`
(dossier sécurité). Audit de la référence : `docs/emedias-audit.md`.
