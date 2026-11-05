# Audit SEO technique : https://lxstudio.ch

Date : 05.11.2026, 12h40 à 14h00 (Europe/Zurich). Site vitrine LX Studio, TanStack Start 1.167 (React 19, Vite 7) rendu côté serveur, hébergé par Lovable sur Cloudflare (`server: cloudflare`, IP 185.158.133.1, `cf-ray ...-ZRH`). Périmètre : les 15 URL du sitemap, `/mentions-legales`, `/politique-de-confidentialite`, la 404 (`/page-inexistante`), `/robots.txt`, `/llms.txt`, `/sitemap.xml`, `/dossier-securite-lx-studio.pdf`, `/_redirects`, `/_headers`, les anciens chemins `/mentia`, `/athlit`, `/fiduciaire`, `/blog/*`, et les variantes d'hôte et d'URL.

Méthode : environ 150 requêtes `curl` (agent mobile Chrome Android, puis Googlebot, bingbot, GPTBot, ClaudeBot, PerplexityBot, curl, python-requests), analyse Python du HTML des 18 pages, lecture des CSS et JS livrés, lecture seule du dépôt `~/souverain-dex` (branche `seo-i18n`) pour situer les correctifs. Toutes les réponses brutes sont dans `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/raw/` (en-têtes `pages/*.headers`, HTML `pages/*.html`, `analysis.json`, `styles.css`, `assets/`).

Échelle de gravité : Critique / Élevée / Moyenne / Faible. Aucune valeur n'est inventée : chaque constat cite l'URL testée et la valeur observée. Ce qui n'a pas pu être mesuré est listé en section 12.

## 1. Score technique : 70 / 100

| Catégorie | Poids | Note | Statut | Justification courte |
| --- | --- | --- | --- | --- |
| Crawlabilité | 15 | 14 | Passe | robots.txt, sitemap et llms.txt corrects, 15/15 URL en 200, aucun robot bloqué, liens internes tous en 200. Pas d'IPv6 ni de HTTP/3 (hébergeur) |
| Indexabilité | 15 | 10 | Passe avec réserves | canonical et noindex corrects partout ; PDF sans `X-Robots-Tag` alors que c'est exigé ; 404 sans `<title>` et avec une image OG Lovable ; titres et descriptions trop longs |
| Sécurité | 15 | 7 | Échoue | HTTPS, TLS et HSTS corrects ; `X-Frame-Options`, `Permissions-Policy` et CSP absents ; `_headers` et `_redirects` publics ; deux traceurs Lovable non déclarés dans la politique de confidentialité |
| Structure d'URL et redirections | 10 | 8 | Passe avec réserves | URL propres, anciens chemins en 301 ; `www` en 302, slash final en 307 (chaînes à 2 sauts) |
| Mobile | 10 | 8 | Passe (statique) | viewport correct, zoom autorisé, CSS responsive, police de repli calibrée ; cibles tactiles non mesurables sans rendu |
| Core Web Vitals | 15 | 9 | Non mesuré en labo | TTFB 0,15 à 0,48 s, HTML 13,6 Ko gzip, images dimensionnées ; mais 142 Ko gzip de JS principal + 22 Ko de traceurs, animations d'entrée qui retardent la peinture du H1, pas de Brotli |
| Données structurées | 8 | 7 | Passe | Graphe JSON-LD valide et riche sur toutes les pages ; `sameAs` et `logo` absents, `VideoObject` sans élément `<video>` |
| Rendu JavaScript | 7 | 7 | Passe | Contenu complet dans le HTML serveur (729 à 1665 mots), identique pour les robots, lisible sans JS |
| IndexNow | 5 | 0 | Échoue | Aucune clé détectable, aucune trace de mise en place |

Total : 70 / 100. Le socle (SSR, canonical, sitemap, schema, redirections) est solide. Les points perdus se concentrent sur trois chantiers courts : les en-têtes HTTP que le fichier `_headers` était censé poser et qui ne sont pas appliqués (PDF, X-Frame-Options, Permissions-Policy, HSTS preload), la cohérence entre les traceurs chargés et la politique de confidentialité, et IndexNow.

## 2. Tableau des constats

| # | Constat (preuve) | Page(s) | Gravité | Correction concrète |
| --- | --- | --- | --- | --- |
| 1 | Le PDF est servi sans `X-Robots-Tag` : `curl -I https://lxstudio.ch/dossier-securite-lx-studio.pdf` renvoie `200`, `content-type: application/pdf`, 357 161 octets, aucun en-tête `x-robots-tag`. Le fichier `public/_headers` déclare pourtant `X-Robots-Tag: noindex, nofollow` sur ce chemin. Le PDF n'est lié depuis aucune des 18 pages ni depuis `llms.txt` ou le sitemap (vérifié), mais il est téléchargeable par quiconque devine le nom, ce qui contourne le formulaire « sur demande » | `/dossier-securite-lx-studio.pdf` | Élevée | Sortir le PDF de `public/` et le servir par une route serveur TanStack Start (`src/routes/dossier-securite-lx-studio[.]pdf.ts`) qui pose `X-Robots-Tag: noindex, nofollow` et `Cache-Control: private`. Mieux : ne le délivrer que par le mail de réponse au formulaire (lien signé ou pièce jointe). Vérifier ensuite avec `curl -I` que l'en-tête apparaît |
| 2 | `X-Frame-Options`, `Content-Security-Policy` et `Permissions-Policy` absents sur 18/18 réponses HTML (`pages/*.headers`). `public/_headers` prévoit `X-Frame-Options: DENY`, `Permissions-Policy: camera=(), microphone=(), geolocation=()` et `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, mais la valeur observée est `max-age=31536000; includeSubDomains` sans preload : le fichier est ignoré par l'hébergeur. Les trois en-têtes présents (HSTS 1 an, `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin`) sont ceux de la plateforme, pas ceux du projet | Toutes | Élevée | Poser les en-têtes dans l'application, pas dans `_headers` : un middleware serveur global TanStack Start (`createMiddleware().server(...)` enregistré via `registerGlobalMiddleware`) ou l'option `headers` de chaque route. Valeurs : `X-Frame-Options: DENY` (ou CSP `frame-ancestors 'none'`), `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, puis soumettre le domaine sur hstspreload.org (statut actuel : `unknown`). CSP en mode `Content-Security-Policy-Report-Only` d'abord, car la page contient 4 scripts inline (dont l'hydratation TanStack) et 3 scripts tiers |
| 3 | Deux traceurs Lovable sont chargés sur chaque page en plus de Plausible : `/~flock.js` (21 296 octets, envoie vers `https://api.tinybird.co/v0/events` via le proxy `/~api/analytics`, utilise `localStorage` x8, `sessionStorage` x6, `document.cookie` x2, `navigator.userAgent` x3) et `/__l5e/events.270c78a44fc53e7b.js` (29 187 octets, `data-autocapture="1"`, `data-consent="1"`, `sendBeacon` x2, `canvas` x2). La politique de confidentialité affirme : « La fréquentation du site est mesurée sans cookie et sans identifiant personnel (Plausible Analytics...). Aucun pixel publicitaire, aucun traçage entre sites. » Lovable, Tinybird et le cookie Cloudflare `__cf_bm` (posé sur chaque réponse, 30 min) n'y figurent pas | Toutes, `/politique-de-confidentialite` | Élevée | Désactiver l'analytics Lovable dans les réglages du projet Lovable (ou retirer l'injection au build) : le site vend « rien ne sort du bâtiment », il ne peut pas charger un autocapture tiers non déclaré. Si impossible, déclarer Lovable, Tinybird et le cookie technique Cloudflare dans la politique (vérification juridique par un conseil, pas par moi). Gain annexe : 20 Ko gzip de JS en moins par page |
| 4 | `/_redirects` et `/_headers` sont publics : `200`, `application/octet-stream`, 302 et 565 octets. Ils révèlent la configuration voulue (et non appliquée) et les anciens chemins | `/_redirects`, `/_headers` | Moyenne | Supprimer les deux fichiers de `public/` : les redirections sont déjà faites par `src/routes/{fiduciaire,mentia,athlit,blog.*}.tsx` (le commentaire du fichier le dit), et les en-têtes passent par le correctif 2 |
| 5 | `www` redirige en 302 : `https://www.lxstudio.ch/` et `http://www.lxstudio.ch/` renvoient `302` vers `https://lxstudio.ch/` (idem `/fiduciaires`). `http://lxstudio.ch/` renvoie bien `301` | Hôte `www` | Moyenne | Passer la règle de redirection `www` en 301 (réglage domaine Lovable ou règle Cloudflare « Redirect Rules », statut 301). Un seul saut, déjà le cas |
| 6 | Slash final redirigé en 307 (temporaire) : `/fiduciaires/`, `/ressources/`, `/securite/`, `/ressources/ia-locale-entreprise-suisse/` renvoient `307` vers l'URL sans slash. Conséquence : `/blog/` et `/mentia/` font 2 sauts (`307` puis `301`), vérifié avec `curl -L` (`hops=2`) | Toutes | Moyenne | Normaliser le slash final en 308 dans un middleware serveur (si `pathname !== "/"` et finit par `/`, répondre 308 vers l'URL sans slash). Pour les anciens chemins, rediriger directement en 301 vers la cible finale, slash ou pas |
| 7 | Page 404 sans `<title>`, sans `meta description`, et avec une image OG résiduelle Lovable : `og:image` et `twitter:image` pointent vers `https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/.../id-preview-...lovable.app-1777447095773.png`. Statut `404` correct, H1 « Cette page n'existe pas. », 170 mots, liens vers les sections | `/page-inexistante` (toute URL inconnue) | Moyenne | Dans le composant `notFoundComponent` de `src/routes/__root.tsx`, fournir `title` (« Page introuvable | LX Studio »), description, et retirer les balises OG héritées de Lovable (ou les faire pointer sur `/og/accueil.jpg`) |
| 8 | JavaScript lourd pour un site vitrine : `/assets/main-DJnEFFSr.js` = 452 268 octets bruts, 142 393 octets gzip, chargé sur toutes les pages, plus 8,3 Ko + 11,8 Ko gzip de traceurs Lovable et 1,3 Ko Plausible. Chunks de route de 0,2 à 2 Ko seulement. `package.json` embarque 27 paquets Radix UI, TanStack Query, embla-carousel, react-hook-form, lucide-react | Toutes | Moyenne | Mesurer d'abord (Lighthouse mobile, voir section 12). Puis : supprimer les dépendances non utilisées du bundle principal (vérifier avec `vite build` + `rollup-plugin-visualizer`), charger le formulaire et la démo vidéo en import dynamique, retirer les traceurs Lovable (constat 3). Objectif : moins de 100 Ko gzip au premier chargement |
| 9 | Animations d'entrée qui retardent la peinture du contenu : `.js .ia-main{animation:.6s ease-out .1s both iaFade}` (opacité 0 à 1 sur toute la page), H1 en `.ia-words[data-now]` animé par `iaWordUp 1.15s` avec délai `--i * 70ms + .2s` (11 mots : dernier mot à 0,9 s), sous-titre `iaRise` avec délai 0,8 s. Ces animations sont en CSS pur (pas d'attente de l'hydratation, bon choix), mais Chrome ignore les éléments à opacité 0 pour le LCP : le H1 ne compte qu'à partir de 0,2 à 0,9 s après le CSS. Les 47 autres blocs `[data-rv]` sans `data-now` restent à `opacity:0` jusqu'à l'hydratation (142 Ko de JS) | `/` surtout, toutes les pages pour `[data-rv]` | Moyenne | Limiter `iaFade` aux éléments hors héros, démarrer l'animation du H1 sans délai (`.2s` à 0), et plafonner l'effet mot à mot à 0,3 s au total. Garder `prefers-reduced-motion` (déjà présent). Mesurer le LCP avant et après |
| 10 | IndexNow absent : aucune clé détectable (`/indexnow.txt`, `/.well-known/indexnow`, `/BingSiteAuth.xml` en 404). Non vérifiable à 100 % car la clé est un nom arbitraire, mais rien n'indique une mise en place | Site | Moyenne | Générer une clé (32 caractères hexadécimaux), la publier dans `public/<clé>.txt`, puis soumettre les 15 URL du sitemap à `https://api.indexnow.org/indexnow` (relayé à Bing, Yandex, Naver, Seznam). Ajouter l'appel au script de publication pour chaque nouvel article. Créer aussi la propriété Bing Webmaster Tools (import depuis Search Console) |
| 11 | Titres trop longs sur 6 articles (75 à 92 caractères, coupés vers 60 à 65 dans les résultats) et descriptions trop longues sur 14 pages (166 à 272 caractères, coupées vers 155 à 160). Exemple : `/ressources/ou-vivent-vos-donnees-quand-vous-utilisez-lia` titre 92 car., `/ressources/secret-professionnel-ia` description 272 car. | 14 pages (liste en section 4) | Faible | Ramener les titres d'article sous 65 caractères (le suffixe « | LX Studio » peut être retiré sur les articles) et les descriptions sous 160, en gardant la réponse directe dans les 120 premiers caractères |
| 12 | Pas de `Cache-Control` sur les polices, les images OG, les logos et l'affiche de la démo (`/fonts/manrope-latin-wght-normal.woff2`, `/og/accueil.jpg`, `/logos/facchinetti.png`, `/demo/demo-poster.jpg` : aucun en-tête de cache, pas de `last-modified`, donc pas de fraîcheur heuristique). `public/_headers` prévoyait `immutable` sur `/fonts/*` et 1 jour sur `/og/*`. Les `/assets/*` sont bien en `public, max-age=31536000, immutable` | Toutes | Faible | Poser `Cache-Control: public, max-age=31536000, immutable` sur `/fonts/*` et `/logos/*` (noms versionnés ou stables), 1 jour sur `/og/*` et `/demo/*`, via le même middleware que le constat 2 |
| 13 | Pas de compression Brotli : `Accept-Encoding: br` renvoie 60 229 octets non compressés pour `/`, `gzip` renvoie 13 620 octets. Pas d'en-tête `vary`, pas d'`alt-svc` (HTTP/3 non annoncé), pas d'enregistrement AAAA (IPv6) | Toutes | Faible | Réglages hébergeur (Lovable / Cloudflare) : activer Brotli et HTTP/3 si l'offre le permet. Sans levier côté projet, documenter la limite |
| 14 | Pas de `preconnect` vers `https://plausible.io` alors que le script est chargé sur chaque page (`preconnect: []` dans `analysis.json`) | Toutes | Faible | Ajouter `<link rel="preconnect" href="https://plausible.io" crossorigin>` dans `src/lib/seo.ts`, ou passer par le proxy Plausible en première partie |
| 15 | 5 à 9 octets NUL (`\x00`) dans le script d'hydratation TanStack de chaque page (`i:"__root__\x00"` dans `$R[11]`). Un NUL dans du HTML est une erreur d'analyse, remplacé par U+FFFD par le navigateur. Effet sur l'hydratation non vérifié (voir section 12) | Toutes | Faible | Ouvrir la console sur la page déployée : si un avertissement d'hydratation ou de correspondance de route apparaît, remonter le cas à TanStack Start 1.167 / `@lovable.dev/vite-tanstack-config` 2.13.1 |
| 16 | `VideoObject` déclaré sur l'accueil (`contentUrl` `/demo/demo-lx-studio.mp4` en 200, `video/mp4`, `thumbnailUrl` en 200) mais aucun élément `<video>` dans le HTML serveur, seulement l'affiche `<img loading="lazy">` | `/` | Faible | Rendre côté serveur un `<video preload="none" poster="/demo/demo-poster.jpg">` avec `<source src="/demo/demo-lx-studio.mp4" type="video/mp4">` dans la section `#demo` : Google exige que la vidéo soit présente sur la page pour la retenir |
| 17 | URL en majuscules servies en 200 : `/Fiduciaires`, `/FIDUCIAIRES`, `/Securite` renvoient `200` avec le contenu de la page et un canonical en minuscules (`https://lxstudio.ch/fiduciaires`). Les slugs d'article sont eux sensibles à la casse (`/ressources/IA-locale-entreprise-suisse` en 404). Les paramètres (`?utm_source=test`, `?x=1&y=2`) donnent 200 avec le canonical propre | Pages de premier niveau | Faible | Le canonical règle la question pour Google. Pour la propreté : 301 vers la forme en minuscules dans le middleware (constat 6) |
| 18 | `favicon.ico` en 404, `apple-touch-icon` pointant vers un SVG (non pris en charge par iOS), `/.well-known/security.txt` absent pour une entreprise qui vend de la sécurité | Site | Faible | Ajouter `public/favicon.ico` (32 px) et `apple-touch-icon.png` 180 px ; publier `/.well-known/security.txt` (RFC 9116) avec `Contact: mailto:contact@lxstudio.ch` et `Expires` |
| 19 | `meta name="keywords"` et `meta name="language"` présents (sans effet, ignorés par Google) ; attributs `charSet` et `hrefLang` en camelCase dans la sortie HTML (valide car HTML est insensible à la casse, mais inhabituel pour les validateurs) | Toutes | Faible | Retirer `keywords` et `language` de `src/lib/seo.ts`. Pour `hrefLang`, la sortie est générée par React : sans conséquence, à laisser |
| 20 | `ProfessionalService` et `Person` sans `sameAs` ni `logo` ; `WebPage` sans `breadcrumb` ni `primaryImageOfPage` ; `article:modified_time` absent des balises OG alors que `dateModified` existe en JSON-LD ; `FAQPage` sur chaque article avec une seule question (Google ne montre plus les FAQ enrichies hors sites gouvernementaux ou de santé depuis août 2023, donc inerte mais inoffensif) | Toutes | Faible | Ajouter `sameAs` (LinkedIn de Tanguy Lachat et de LX Studio), `logo` (PNG 512 px), `breadcrumb: {"@id": ...}` dans `WebPage`, et `article:modified_time` en OG |

## 3. Crawlabilité : Passe

- `https://lxstudio.ch/robots.txt` : `200`, `text/plain; charset=utf-8`, 691 octets. `User-agent: *` + `Allow: /`, puis autorisation explicite de GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, meta-externalagent, Bytespider. `Sitemap: https://lxstudio.ch/sitemap.xml`. Rien de bloqué par erreur (ni `/assets`, ni `/og`, ni `/fonts`).
- `https://lxstudio.ch/sitemap.xml` : `200`, `application/xml`, 2 864 octets, 15 URL, toutes en `https://lxstudio.ch/...` sans slash final, `lastmod` au format W3C (2026-10-24 pour 10 pages, 2026-09-23 pour 5 articles), cohérent avec `datePublished` du JSON-LD. `/mentions-legales` et `/politique-de-confidentialite` en sont absents, ce qui est correct puisqu'elles sont en noindex. Les 15 URL répondent `200` avec un canonical identique à l'entrée du sitemap.
- `https://lxstudio.ch/llms.txt` : `200`, 4 607 octets, 74 lignes, description, pages, questions traitées, zone desservie. Conforme à la convention llms.txt.
- Robots non bloqués : `/` renvoie `200` et 60 229 octets identiques pour Googlebot (desktop et smartphone), GPTBot, ClaudeBot, PerplexityBot, curl, python-requests. bingbot a échoué une fois pendant la coupure DNS locale, sans lien avec le site. Aucune page de défi Cloudflare rencontrée (`cf-mitigated` absent).
- HTML servi à Googlebot sur `/fiduciaires` identique au HTML navigateur, au seul horodatage d'hydratation près (`u:1793882482197` contre `u:1793882704161`). Pas de cloaking.
- Liens internes : 19 liens uniques sur l'ensemble du site, 17 cibles hors ancres, toutes en `200` sans redirection. Aucun lien interne vers `/blog`, `/mentia`, `/athlit`, `/fiduciaire`, une forme avec slash final, `http://` ou `www`.
- Pas de `<link rel="alternate" type="application/rss+xml">` et pas de flux (`/feed.xml`, `/rss.xml` en 404) : optionnel pour 9 articles, utile pour les agrégateurs et certains assistants.
- Note : une coupure DNS passagère sur ma connexion (résolveur 172.20.10.1) a produit des `Couldn't connect to server` sur 6 requêtes ; retests par IP directe 5/5 réussis, et le coordinateur a confirmé la cause. Non imputable au site.

## 4. Indexabilité : Passe avec réserves

- `<html lang="fr-CH">` sur 18/18 pages, un seul `<title>` par page (le second sur l'accueil est le `<title>` interne d'un SVG illustratif, légitime), un seul H1 par page, 5 à 16 H2.
- Canonical absolu et auto-référent sur 17/17 pages HTML indexables ou noindex ; absent sur la 404 (correct).
- `meta robots` : `noindex, follow` sur `/mentions-legales` et `/politique-de-confidentialite`, absent (donc `index, follow`) sur les 15 pages du sitemap. Aucun `X-Robots-Tag` HTTP sur les pages (correct) ni sur le PDF (constat 1).
- Volume : 729 (`/pme`) à 1 665 mots (`/`), 1 084 à 1 570 mots par article. Pas de contenu mince.
- 404 réelles : `/page-inexistante`, `/ressources/article-inexistant`, `/fiduciaires/sous-page`, `/en`, `/fr`, `/index.html` renvoient `404` HTTP avec la page d'erreur. Pas de soft 404. `/.env` renvoie `403` (règle WAF).
- Longueurs (constat 11) :
  - Titres > 65 car. : `/ressources/fiduciaire-automatiser-saisie-pieces-ia` (78), `/ressources/ia-locale-entreprise-suisse` (79), `/ressources/mesurer-le-temps-qu-une-tache-coute-vraiment` (75), `/ressources/ou-vivent-vos-donnees-quand-vous-utilisez-lia` (92), `/ressources/plateforme-automatisation-ou-code` (80), `/ressources/secret-professionnel-ia` (87).
  - Descriptions > 160 car. : `/` (188), `/fiduciaires` (208), `/administrations` (177), `/pme` (177), `/securite` (206), `/ressources` (199), `/ressources/chatgpt-nlpd-entreprise` (226), `/ressources/combien-coute-une-automatisation-ia-pme-suisse` (166), `/ressources/fiduciaire-automatiser-saisie-pieces-ia` (220), `/ressources/ia-locale-entreprise-suisse` (197), `/ressources/mesurer-le-temps-qu-une-tache-coute-vraiment` (176), `/ressources/ou-vivent-vos-donnees-quand-vous-utilisez-lia` (175), `/ressources/plateforme-automatisation-ou-code` (169), `/ressources/secret-professionnel-ia` (272).
- Open Graph et Twitter complets sur 17 pages (`og:type` `website` ou `article`, `og:locale` `fr_CH`, image 1200 x 630 dédiée par page, `article:published_time` sur les 9 articles). Les 14 images `/og/*.jpg` testées répondent `200` (59 à 69 Ko). La 404 porte une image OG Lovable (constat 7).

## 5. Sécurité : Échoue

Valeurs observées sur `https://lxstudio.ch/` (identiques sur les 18 pages, `robots.txt`, `sitemap.xml`, `llms.txt` et le PDF) :

| En-tête | Observé | Attendu (`public/_headers`) | Verdict |
| --- | --- | --- | --- |
| `strict-transport-security` | `max-age=31536000; includeSubDomains` | `max-age=63072000; includeSubDomains; preload` | Présent, sans preload ; hstspreload.org : `status: unknown` |
| `x-content-type-options` | `nosniff` | `nosniff` | OK |
| `referrer-policy` | `strict-origin-when-cross-origin` | idem | OK |
| `x-frame-options` | absent | `DENY` | Manque |
| `permissions-policy` | absent | `camera=(), microphone=(), geolocation=()` | Manque |
| `content-security-policy` | absent | non prévu | Manque |
| `cross-origin-opener-policy` | absent | non prévu | Optionnel |
| `x-robots-tag` (PDF) | absent | `noindex, nofollow` | Manque |

- HTTPS : `http://lxstudio.ch/` et `http://lxstudio.ch/fiduciaires` en `301` vers HTTPS. Certificat `CN=lxstudio.ch`, émis par Google Trust Services WE1, valable du 07.09.2026 au 07.12.2026 (renouvellement automatique à surveiller). TLS 1.1 refusé (`--tls-max 1.1` échoue), HTTP/2 actif. Aucun contenu mixte : les 5 liens externes sont en HTTPS (cal.com, edoeb.admin.ch, fedlex.admin.ch x2, six-group.com).
- Cookie `__cf_bm` (Cloudflare Bot Management, `HttpOnly; Secure; SameSite=None`, 30 min) posé sur chaque réponse, y compris `robots.txt`.
- `x-deployment-id` et `data-context-token` (JWT exposant l'identifiant de projet Lovable `lovp_03dkmm89zq937be8ax3myjky27`) dans chaque page : sans risque direct, mais trahit la plateforme.
- Traceurs : voir constat 3. Plausible (`https://plausible.io/js/script.js`, 1,3 Ko gzip, `defer`) est conforme à ce que dit la politique ; les deux scripts Lovable ne le sont pas.

## 6. Structure d'URL et redirections : Passe avec réserves

- URL en minuscules, mots séparés par des tirets, sans extension, sans paramètre, sans slash final, profondeur maximale 2 (`/ressources/<slug>`). `/index.html` et `/fiduciaires.html` en 404 (pas de doublon).
- Anciens chemins (tous testés après retour du réseau) :

| URL testée | Statut | Location | Sauts jusqu'au 200 |
| --- | --- | --- | --- |
| `/mentia` | 301 | `https://lxstudio.ch/` | 1 |
| `/athlit` | 301 | `https://lxstudio.ch/` | 1 |
| `/fiduciaire` | 301 | `https://lxstudio.ch/fiduciaires` | 1 |
| `/blog` | 301 | `https://lxstudio.ch/ressources` | 1 |
| `/blog/ia-locale-entreprise-suisse` | 301 | `https://lxstudio.ch/ressources/ia-locale-entreprise-suisse` | 1 |
| `/blog/secret-professionnel-ia` | 301 | `https://lxstudio.ch/ressources/secret-professionnel-ia` | 1 |
| `/blog/pourquoi-chatgpt-cite-votre-concurrent` | 301 | `https://lxstudio.ch/` | 1 |
| `/blog/inconnu-xyz` | 301 | `https://lxstudio.ch/ressources/inconnu-xyz` | 1 puis 404 (acceptable) |
| `/blog/`, `/mentia/`, `/athlit/`, `/fiduciaire/` | 307 | forme sans slash | 2 (constat 6) |
| `/fiduciaires/`, `/ressources/`, `/securite/`, `/ressources/ia-locale-entreprise-suisse/` | 307 | forme sans slash | 1 |
| `//fiduciaires` | 308 | `https://lxstudio.ch/fiduciaires` | 1 |
| `http://lxstudio.ch/` | 301 | `https://lxstudio.ch/` | 1 |
| `https://www.lxstudio.ch/`, `http://www.lxstudio.ch/` | 302 | `https://lxstudio.ch/` | 1 (constat 5) |

- Le fichier `public/_redirects` est redondant avec les routes serveur et n'est pas traité par la plateforme (constat 4).

## 7. Mobile : Passe (analyse statique)

- `<meta name="viewport" content="width=device-width, initial-scale=1">` sur 18/18 pages, sans `user-scalable=no` ni `maximum-scale=1`.
- CSS : points de rupture à 560, 640, 760, 920, 1023, 1100 px, `@media (hover:hover)` pour les effets souris, `prefers-reduced-motion` géré, `@media print` présent.
- Typographie : Manrope variable (24,8 Ko latin + 15,1 Ko latin étendu, `font-display: swap`) avec police de repli `Manrope Fallback` calibrée (`size-adjust: 108%`, `ascent-override: 98.7%`, `descent-override: 27.8%`), ce qui limite le décalage au chargement. 28 règles en 10 à 13 px, toutes sur des libellés secondaires (`.ia-eyebrow`, `.ia-hero-trust`, `.ia-post-tag`, `.ia-refs-label`, `figcaption`) ; à vérifier sur appareil que rien d'essentiel ne passe sous 12 px.
- Images : les 3 `<img>` de l'accueil ont `width`, `height`, `alt`, `loading="lazy"`, `decoding="async"`. Les autres pages n'ont aucune `<img>` (illustrations en SVG inline).
- Non mesuré : taille réelle des cibles tactiles, débordement horizontal, rendu sur appareil (section 12).

## 8. Core Web Vitals : non mesuré en labo, risques identifiés

Rappel des seuils : LCP bon < 2,5 s ; INP bon < 200 ms ; CLS bon < 0,1.

Mesuré :
- TTFB depuis le point de présence de Zurich, agent mobile, 3 passes : `/` 0,22 / 0,36 / 0,48 s ; `/fiduciaires` 0,20 / 0,23 / 0,30 s ; `/ressources/chatgpt-copilot-ou-agent-sur-mesure` 0,16 / 0,23 / 0,26 s ; 404 0,21 / 0,24 / 0,27 s. Deux valeurs isolées à 2,2 s et 1,2 s lors de la première passe (démarrage à froid probable). `cache-control: no-cache, must-revalidate, max-age=0` sur le HTML, cohérent avec un rendu serveur.
- Poids au premier chargement de `/` (gzip) : HTML 13,6 Ko, CSS 10,6 Ko (une feuille, bloquante, `/assets/styles-C2qi9lw-.css`), police 24,8 Ko (préchargée), JS principal 142,4 Ko + chunk de route 2,1 Ko, traceurs 8,3 + 11,8 + 1,3 Ko. Total JS : environ 166 Ko gzip. Les scripts sont `defer` ou `module async`, donc non bloquants pour le premier rendu.
- CLS : facteurs favorables (images dimensionnées, police de repli calibrée, pas d'iframe, pas de bannière injectée). Risque faible.
- LCP : candidat probable sur `/` = le H1 (texte, 11 mots), sinon le sous-titre. Pas d'image héros. Retard d'animation CSS de 0,1 à 0,9 s (constat 9). Pas de dépendance à l'hydratation pour le héros grâce à `data-now`.
- INP : risque lié aux 166 Ko de JS sur appareil mobile d'entrée de gamme (hydratation React 19 + Radix + traceurs avec autocapture des événements). Non mesurable sans terrain.
- Compression : gzip présent, Brotli absent (constat 13).

Non mesuré : l'API PageSpeed Insights a répondu `429 Quota exceeded` à deux reprises (quota journalier du projet anonyme épuisé) ; aucune donnée CrUX possible pour un site publié le jour même. Voir section 12 pour la procédure.

## 9. Données structurées : Passe

JSON-LD valide (parsing OK) sur 18/18 pages, en deux blocs : un graphe global (`WebSite` `#website`, `ProfessionalService` `#organization` avec adresse Bassecourt 2854 CH, téléphone `+41 78 703 88 00`, e-mail, `areaServed` Suisse + 7 cantons, `founder` `#founder`, `Person` Tanguy Lachat `jobTitle` « Fondateur et ingénieur IA », `knowsAbout`, `homeLocation`) et un graphe de page :

| Page | Types supplémentaires | Remarques |
| --- | --- | --- |
| `/` | `WebPage`, `FAQPage` (9 questions), `BreadcrumbList` (1 niveau), `VideoObject` (`contentUrl`, `thumbnailUrl`, `uploadDate` 2026-10-24, `duration` PT2M), `Service` | `VideoObject` sans `<video>` (constat 16) |
| `/fiduciaires`, `/administrations`, `/pme` | `WebPage`, `FAQPage` (5 questions), `BreadcrumbList` (2 niveaux), `Service` | OK |
| `/securite` | `WebPage`, `BreadcrumbList` | OK |
| `/ressources` | `CollectionPage`, `BreadcrumbList`, `ItemList` | OK |
| 9 articles | `Article` (`headline`, `author` `#founder`, `datePublished`, `dateModified`, `image` `/og/<slug>.jpg`, `keywords`, `mainEntityOfPage`, `publisher`), `FAQPage` (1 question), `BreadcrumbList` (3 niveaux) | OK |
| `/mentions-legales`, `/politique-de-confidentialite` | `WebPage`, `BreadcrumbList` | OK (noindex) |
| 404 | graphe global seulement | acceptable |

Manques (constat 20) : `sameAs`, `logo`, `WebPage.breadcrumb`, `primaryImageOfPage`. Validation Google Rich Results non exécutée (nécessite un navigateur ou l'API Search Console).

## 10. Rendu JavaScript : Passe

- Le HTML serveur contient la totalité du contenu (titres, paragraphes, FAQ, formulaire, pied de page) : 729 à 1 665 mots par page sans exécuter JS. `<nav>`, `<main>`, `<footer>` et lien d'évitement « Aller au contenu » présents.
- Amélioration progressive : `document.documentElement.classList.add('js')` en tête ; sans JS, tout est visible ; avec JS, les 54 blocs `[data-rv]` de l'accueil (7 avec `data-now`) sont masqués (`opacity:0; translateY(34px)`) jusqu'à ce que l'hydratation ajoute `.in`. Google exécute le JS, et le texte est de toute façon dans le HTML : pas de risque d'indexation. Risque de perception sur mobile lent (contenu sous le pli invisible jusqu'à l'arrivée des 142 Ko de JS).
- Hydratation TanStack : `$tsr-stream-barrier` 737 octets sur l'accueil, 8 308 octets sur un article (données de route sérialisées, contenu de l'article dupliqué dans le JSON : coût mineur). Octets NUL dans ce script (constat 15).
- `<noscript>` absent (non nécessaire ici).

## 11. Hreflang et préparation de /en/

État actuel : `src/lib/seo.ts:68-69` émet sur chaque page `<link rel="alternate" hreflang="fr-CH" href="<url>">` et `<link rel="alternate" hreflang="x-default" href="<url>">`, auto-référents, absolus, cohérents avec le canonical (vérifié sur 17/17 pages). Pour un site monolingue c'est inutile mais sans effet négatif, et cela prépare la suite. `/en` et `/en/` répondent 404 aujourd'hui : correct, il ne faut surtout pas émettre de hreflang `en` avant que les pages existent.

À faire pour `/en/` (branche `seo-i18n`) :
1. Une URL par langue, canonical auto-référent dans chaque langue, jamais de canonical croisé FR vers EN.
2. Sur chaque page FR traduite : `hreflang="fr-CH"` vers elle-même, `hreflang="en"` vers `/en/<slug-en>`, `x-default` vers la version FR (public principal). Sur chaque page EN : `hreflang="en"` vers elle-même, `hreflang="fr-CH"` vers la FR, `x-default` vers la FR. Réciprocité obligatoire, sinon Google ignore la paire.
3. Ne générer la paire que pour les pages réellement traduites (table de correspondance slug FR vers slug EN dans `src/lib/seo.ts`), jamais vers une 404.
4. `<html lang="en">`, `og:locale` `en_GB` ou `en_US` + `og:locale:alternate` `fr_CH`, `inLanguage: "en"` dans `WebPage` et `Article`, même `#organization`, `WebPage.@id` distinct par URL.
5. Sitemap : ajouter les URL EN et, pour chaque URL, les `<xhtml:link rel="alternate" hreflang="...">` (namespace `xmlns:xhtml="http://www.w3.org/1999/xhtml"`), ou un sitemap par langue listé dans un index.
6. Pas de redirection automatique selon `Accept-Language` pour les robots ; au plus une suggestion de langue dans l'interface.
7. Slash final : garder la convention sans slash (`/en`, `/en/fiduciaries`), le 307 actuel de `/en/` vers `/en` le confirme.
8. `llms.txt` : section EN ou `/en/llms.txt`. `robots.txt` : rien à changer.
9. Après mise en ligne : validation complète par le sous-skill `seo-hreflang` (réciprocité, codes de langue, canonical).

## 12. Ce qui n'a pas pu être mesuré

- Lighthouse / Core Web Vitals en laboratoire : API PageSpeed Insights en `429` (quota journalier du projet anonyme). À refaire avec une clé API Google (`&key=`) ou depuis Chrome DevTools sur `https://lxstudio.ch/` en mode mobile, et à consigner LCP, CLS, TBT et le poids total.
- Données terrain (CrUX, INP) : impossibles pour un site publié le 05.11.2026 ; revoir dans 28 jours dans Search Console (rapport Core Web Vitals).
- Cibles tactiles, débordement horizontal, rendu réel des animations, avertissement éventuel d'hydratation lié aux octets NUL : nécessitent un navigateur sur appareil.
- Présence d'une clé IndexNow (nom arbitraire, non devinable) et état de la propriété Search Console / Bing Webmaster.
- Réglages de la plateforme Lovable et de la zone Cloudflare (Brotli, HTTP/3, règles de redirection `www`, désactivation de l'analytics Lovable) : non accessibles depuis ici.
- Les `.headers` et `.html` bruts de chaque test sont conservés dans le scratchpad pour contre-vérification.

## 13. Plan d'action priorisé

1. Élevée, 1 h : en-têtes de sécurité dans un middleware serveur TanStack Start (`X-Frame-Options`, `Permissions-Policy`, HSTS 2 ans + preload, `Cache-Control` sur `/fonts`, `/logos`, `/og`, `/demo`) ; route serveur pour le PDF avec `X-Robots-Tag: noindex, nofollow` ; suppression de `public/_headers` et `public/_redirects`. Preuve attendue : `curl -I` sur `/`, sur le PDF et sur une police.
2. Élevée, 30 min + validation juridique : désactiver l'analytics Lovable ou mettre la politique de confidentialité en conformité (Lovable, Tinybird, cookie `__cf_bm`).
3. Moyenne, 30 min : `www` en 301 (réglage domaine), slash final en 308 dans le middleware, 301 direct pour les anciens chemins avec slash.
4. Moyenne, 20 min : titre, description et OG propres sur la 404.
5. Moyenne, 30 min : IndexNow (clé, fichier, soumission des 15 URL, appel dans le script de publication) + Bing Webmaster Tools.
6. Moyenne, 2 à 4 h après mesure Lighthouse : alléger le JS principal (dépendances Radix inutilisées, imports dynamiques), raccourcir les animations d'entrée du héros, Brotli si l'hébergeur le permet.
7. Faible, 1 h : titres et descriptions, `preconnect` Plausible, `sameAs` et `logo`, `<video>` serveur, `favicon.ico`, `security.txt`, suppression de `meta keywords`.
8. Avant `/en/` : appliquer la section 11, puis audit `seo-hreflang`.

Action de vente permise : une fois les points 1 et 2 réglés, la page `/securite` et le dossier PDF deviennent cohérents avec ce que le site promet, ce qui enlève une objection facile pour une fiduciaire qui vérifie les en-têtes avant de signer.
