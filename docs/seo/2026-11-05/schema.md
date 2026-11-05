# Audit des données structurées (JSON-LD) de lxstudio.ch

Date : 05.11.2026. Pages contrôlées : `/`, `/fiduciaires`, `/administrations`, `/pme`, `/securite`, `/ressources`, `/ressources/ia-locale-entreprise-suisse`, `/ressources/combien-coute-une-automatisation-ia-pme-suisse`, plus `/mentions-legales` pour la cohérence.

Méthode : HTML téléchargé tel que servi (rendu serveur, pas d'exécution JavaScript), extraction de tous les blocs `application/ld+json`, validation manuelle contre schema.org et la documentation Google (champs obligatoires et recommandés par type), contrôle HTTP de chaque fichier référencé (images, vidéo, PDF), lecture du générateur `~/souverain-dex/src/lib/seo.ts` et des contenus `src/content/ia/*.ts`. Aucun passage par l'outil Google de test des résultats enrichis (pas d'API) : à faire après correction, sur les 8 URL.

## 1. Score : 72 / 100

| Critère | Points | Justification |
| --- | --- | --- |
| Conformité technique (JSON-LD, `@context` https, types valides, URL absolues, dates ISO, pas de texte de remplissage, `@id` cohérents) | 23 / 25 | Tout est propre. Deux accrocs : `inLanguage` n'est pas une propriété valide sur `ProfessionalService`, et `url` de l'organisation (`https://lxstudio.ch`) diffère de l'URL canonique (`https://lxstudio.ch/`). |
| Champs obligatoires Google par type (LocalBusiness, Article, VideoObject, BreadcrumbList, FAQPage) | 23 / 25 | Aucun champ obligatoire manquant. Perte : les questions FAQ des articles ne sont pas affichées telles quelles (la réponse l'est), et le fil d'Ariane de l'accueil n'a qu'un élément (Google en exige deux). |
| Champs recommandés et complétude de l'entité locale | 10 / 25 | `streetAddress`, `geo`, `openingHoursSpecification`, `sameAs`, `logo`, `priceRange`, numéro IDE : tous absents. C'est le gros manque. |
| Cohérence avec les mentions légales et entre pages | 11 / 15 | Nom, téléphone, e-mail, localité, NPA, pays, fondateur : identiques. La rue (Rue des Romains 25) figure dans les mentions légales et dans `site.ts` mais pas dans le schéma. Le bloc global est strictement identique sur les 9 pages (bien). |
| Opportunités GEO, vidéo, articles | 5 / 10 | VideoObject correct mais aucune balise `<video>` dans le HTML servi, pas de `transcript` alors que le texte est sur la page, images d'article en un seul format 1200x630, aucun profil externe pour l'auteur. |

Lecture : le squelette est au dessus de la moyenne des sites de services (graphe d'entités relié par `@id`, un bloc global identique partout, FAQ réellement visibles sur les pages métiers, vidéo décrite avec les trois champs obligatoires). Ce qui manque est concentré sur un seul nœud, `ProfessionalService`, et se corrige en une demi-heure dans `src/lib/seo.ts`.

## 2. Détection

- Format : JSON-LD uniquement, deux balises `<script type="application/ld+json">` par page. Aucun Microdata, aucun RDFa. Aucun type déprécié (pas de HowTo, pas de SpecialAnnouncement, pas de CourseInfo).
- Bloc 1 (global, identique octet pour octet sur les 9 pages) : `WebSite` (#website), `ProfessionalService` (#organization), `Person` (#founder).
- Bloc 2 (propre à la page) : voir le tableau.
- `<html lang="fr-CH">`, canonique, `hreflang fr-CH` et `x-default`, `og:locale fr_CH` sur toutes les pages. `inLanguage: fr-CH` sur chaque nœud de contenu.
- Fichiers référencés : `og/accueil.jpg`, `og/fiduciaires.jpg`, `og/ia-locale-entreprise-suisse.jpg` (1200x630), `demo/demo-poster.jpg` (1920x1080), `demo/demo-lx-studio.mp4` (4,0 Mo, 1280x720, 119,9 s, donc `PT2M` exact), `favicon.svg` : tous en HTTP 200. `logo.png` et `logo.svg` : 404 (aucun logo n'existe dans `public/`).

### Tableau par page

| Page | Types présents | Erreurs | Manques | Priorité |
| --- | --- | --- | --- | --- |
| `/` | WebSite, ProfessionalService, Person, WebPage, FAQPage (9 Q/R), BreadcrumbList (1 élément), VideoObject, Service | `streetAddress` absent alors que les mentions légales le publient ; `inLanguage` invalide sur ProfessionalService ; `url` sans barre finale ; fil d'Ariane à un seul élément (inéligible) ; aucune balise `<video>` dans le HTML servi (affiche + bouton, la vidéo est créée au clic) | `geo`, `openingHoursSpecification`, `sameAs`, `logo`, IDE, `priceRange` ; VideoObject sans `width`, `height`, `transcript`, `uploadDate` sans fuseau ; WebPage sans `breadcrumb` ni `primaryImageOfPage` | P1 |
| `/fiduciaires` | WebSite, ProfessionalService, Person, WebPage, FAQPage (5), BreadcrumbList (2), Service | Erreurs du bloc global ; nom du fil d'Ariane = titre complet de la page (« IA pour fiduciaires : pièces saisies au cabinet ») | BreadcrumbList sans `@id`, WebPage sans `breadcrumb` ni `mainEntity` vers le Service ; Service sans `audience`, `areaServed` réduit au pays | P2 |
| `/administrations` | Idem, FAQPage (4) | Idem | Idem | P2 |
| `/pme` | Idem, FAQPage (4) | Idem | Idem | P2 |
| `/securite` | WebSite, ProfessionalService, Person, WebPage, BreadcrumbList (2) | Erreurs du bloc global | Pas de Service ni de FAQ (page de preuve, acceptable). Le PDF est derrière un formulaire nom/entreprise/e-mail : pas de `DigitalDocument` public à déclarer | P3 |
| `/ressources` | WebSite, ProfessionalService, Person, CollectionPage, BreadcrumbList (2), ItemList (9 éléments, titres identiques aux titres visibles) | Erreurs du bloc global | `CollectionPage.mainEntity` vers l'ItemList, `numberOfItems` | P3 |
| `/ressources/ia-locale-entreprise-suisse` | WebSite, ProfessionalService, Person, Article, FAQPage (1), BreadcrumbList (3) | La question FAQ n'apparaît nulle part dans le HTML visible (la réponse est dans l'encadré « En résumé ») | `image` en un seul format 1200x630 (Google recommande 16:9, 4:3 et 1:1, largeur 1200 min.), `author.url` absent au niveau de l'article, `dateModified` codée égale à `datePublished`, `articleSection` | P2 |
| `/ressources/combien-coute-une-automatisation-ia-pme-suisse` | Idem (FAQPage 1, BreadcrumbList 3) | Idem ; `keywords: "Budget"` trop maigre | Idem | P2 |

`/mentions-legales` (hors périmètre, contrôlée pour la cohérence) : WebPage + BreadcrumbList à 2 éléments, rien à signaler.

## 3. Validation par type

| Type | Verdict | Détail |
| --- | --- | --- |
| WebSite | PASSE | `@id`, `url`, `name`, `inLanguage`, `publisher` liés. Pas de `potentialAction` et c'est juste : le site n'a pas de recherche interne et Google a retiré la boîte de recherche des sitelinks en novembre 2024. |
| ProfessionalService | PASSE sur les obligatoires, ÉCHOUE sur la complétude | Obligatoires Google (`name`, `address`) présents. `PostalAddress` incomplète (pas de `streetAddress`), `inLanguage` non défini pour ce type (propriété de CreativeWork), `url` sans barre finale. Absents : `geo`, `openingHoursSpecification`, `sameAs`, `logo`, `priceRange`, identifiant IDE, `contactPoint`. |
| Person | PASSE | `name`, `jobTitle`, `worksFor`, `knowsAbout` ; référencé comme `author` par chaque article (bon pour l'attribution). Manque : `sameAs` (aucun profil externe nulle part sur le site), `image`. `url` pointe sur l'accueil, pas sur une page auteur. |
| WebPage / CollectionPage | PASSE | `@id` unique par page, `isPartOf` et `about` liés. Manque : `breadcrumb`, `primaryImageOfPage`, `mainEntity`. |
| Service | PASSE | `provider` lié, `serviceType`, `url`. `areaServed` limité au pays alors que l'organisation liste 7 cantons : incohérence mineure. |
| FAQPage | PASSE (Info) | Site commercial : aucun résultat enrichi Google depuis août 2023, utilité réelle pour les assistants IA (les réponses sont écrites pour tenir seules, c'est le bon usage). Questions et réponses vérifiées visibles sur `/`, `/fiduciaires`, `/administrations`, `/pme`. Sur les deux articles, la réponse est visible dans « En résumé » mais la question ne l'est pas : à afficher pour respecter la règle « ne balisez pas un contenu invisible ». `@id` distincts par page, aucune collision. |
| BreadcrumbList | PASSE sur les pages intérieures | 2 ou 3 éléments, `position` et `item` absolus. Accueil : 1 seul élément, Google en exige au moins deux, donc inutile. Aucun `@id`, donc non reliable depuis WebPage. |
| ItemList | PASSE | 9 `ListItem` avec `position`, `name`, `url` ; les 9 titres correspondent aux titres visibles. |
| VideoObject | PASSE, avec un risque | Obligatoires Google (`name`, `thumbnailUrl`, `uploadDate`) présents, plus `contentUrl`, `duration` (vérifiée : 119,9 s), `description`, `publisher`. Le HTML servi ne contient que l'affiche et un bouton, l'élément `<video>` n'existe qu'après le clic (`src/components/ia/sections.tsx`, composant `Demo`). Search Console peut remonter « aucune vidéo détectée ». Manque : `width`/`height` (1280x720), `transcript` (le texte est déjà dans la page, replié), fuseau horaire sur `uploadDate`. |
| Article | PASSE | `headline`, `image`, `datePublished`, `dateModified`, `author` (Person lié), `publisher`, `mainEntityOfPage`, `inLanguage`. Dates identiques à la balise `<time>` visible, auteur affiché. Manque : `image` en plusieurs formats, `author.url`, `articleSection`. `dateModified` est codée en dur égale à `datePublished` dans `articleSchema()` : toute mise à jour d'article restera invisible. |

## 4. Cohérence avec les mentions légales

| Donnée | Mentions légales (24.10.2026) | JSON-LD actuel | Verdict |
| --- | --- | --- | --- |
| Nom | LX Studio | LX Studio | OK |
| Forme | Raison individuelle, Tanguy Lachat | `founder` Person Tanguy Lachat | OK (`legalName` absent, à ajouter une fois le libellé du registre IDE vérifié) |
| Rue | Rue des Romains 25 | absente | ERREUR |
| NPA et localité | 2854 Bassecourt | 2854 Bassecourt | OK |
| Canton, pays | Jura, Suisse | Jura, CH | OK |
| Téléphone | 078 703 88 00 | +41 78 703 88 00 | OK |
| E-mail | contact@lxstudio.ch | contact@lxstudio.ch | OK |
| IDE | CHE-325.224.095 | absent | Manque |
| TVA | Non assujettie (art. 10 al. 2 let. a LTVA) | rien | OK (ne pas mettre `vatID`) |
| Hébergeur | Cloudflare | sans objet | OK |

## 5. Erreurs et manques par priorité

### P1 : à corriger maintenant (bloc global, `src/lib/seo.ts`)

1. Ajouter `streetAddress: "Rue des Romains 25"` (la valeur existe déjà dans `SITE.address.street`).
2. Ajouter `geo` : 47.334926, 7.247493 (géocodage OpenStreetMap au niveau du bâtiment pour « 25 Rue des Romains, 2854 Bassecourt » ; confirmer d'un clic droit sur Google Maps avant publication).
3. Supprimer `inLanguage` du nœud ProfessionalService (garder `knowsLanguage`).
4. Normaliser `url` sur `https://lxstudio.ch/` (organisation et fondateur), comme la canonique et le WebSite.
5. Ajouter `logo`. Aucun fichier logo n'existe : `favicon.svg` (monogramme LX, SVG accepté par Google pour le logo d'organisation) sert de valeur immédiate ; créer ensuite `public/logo.png` en 512x512 sur fond uni et remplacer l'URL.
6. Ajouter l'IDE en `identifier` (PropertyValue) et `openingHoursSpecification` (aucun horaire n'est publié sur le site : le créneau lundi à vendredi 08:00 à 18:00 proposé ci-dessous est à confirmer, sinon supprimer la clé).
7. `sameAs` : aucun profil externe n'est publié sur le site, donc rien n'est inventé ici. Ajouter les URL exactes du profil LinkedIn de Tanguy Lachat et de la page LinkedIn LX Studio sur l'organisation et sur la personne : c'est le signal le plus utile pour l'attribution par les assistants IA.

### P2 : recommandé (pages métiers, vidéo, articles)

1. Vidéo : rendre l'élément `<video preload="none" poster=...>` avec ses deux `<source>` côté serveur et garder le bouton en superposition (clic = `play()`). `preload="none"` ne télécharge rien avant le clic, la performance reste identique, et Googlebot voit une vidéo. Ajouter `width`, `height`, `transcript`, et `uploadDate` avec fuseau (le fichier en ligne date du commit 6b19550 du 25.10.2026 à 09:21 heure suisse).
2. Articles : afficher la question FAQ (par exemple comme titre de l'encadré « En résumé » ou dans un bloc « Question fréquente » en fin d'article). Produire les variantes 4:3 et 1:1 de l'image dans `npm run og` et passer `image` en tableau. Ajouter `author.url` et `articleSection`. Donner à `articleSchema()` un vrai champ `updated` pour `dateModified`.
3. Fil d'Ariane : noms courts identiques à la navigation (« Fiduciaires », « Polices et administrations », « PME », « Sécurité », « Ressources »), `@id` sur chaque BreadcrumbList et `breadcrumb` sur chaque WebPage. Retirer le fil d'Ariane à un élément de l'accueil.
4. Pages métiers : `WebPage.mainEntity` vers le Service, `audience` (BusinessAudience) et `areaServed` aligné sur les cantons de l'organisation. Relier les trois services à l'organisation par `hasOfferCatalog`.

### P3 : optionnel

1. `/ressources` : `CollectionPage.mainEntity` vers l'ItemList, `numberOfItems: 9`.
2. Page auteur `/tanguy-lachat` en `ProfilePage` (gabarit dans le skill) si le site doit porter l'expertise du fondateur ; sinon `sameAs` suffit.
3. Chapitres de la démo en `Clip` (9 chapitres déjà minutés dans `DEMO.chapters`) : utile seulement si la page sait lire un paramètre `?t=` et positionner la vidéo, sinon ne rien ajouter.
4. Ne pas ajouter de `Review` ou d'`AggregateRating` sur l'organisation : Google exclut les avis publiés par l'entité notée elle-même. Les références (Facchinetti, Richoz) restent du contenu visible, pas du balisage.
5. `/securite` : laisser sans `DigitalDocument` tant que le PDF est distribué par formulaire (le déclarer publierait l'URL directe).

## 6. JSON-LD corrigé, prêt à coller

### 6.1 Bloc global (toutes les pages, remplace `WEBSITE`, `ORGANIZATION` et `FOUNDER` dans `src/lib/seo.ts`)

Seules valeurs à confirmer avant mise en ligne : les coordonnées `geo` (vérifier sur Google Maps) et le créneau d'`openingHoursSpecification` (ajuster ou supprimer). Ajouter `sameAs` dès que les URL de profils sont connues.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://lxstudio.ch/#website",
      "url": "https://lxstudio.ch/",
      "name": "LX Studio",
      "description": "Installation d'intelligence artificielle sur site pour les fiduciaires, les administrations et les PME de Suisse romande.",
      "inLanguage": "fr-CH",
      "publisher": { "@id": "https://lxstudio.ch/#organization" }
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://lxstudio.ch/#organization",
      "name": "LX Studio",
      "url": "https://lxstudio.ch/",
      "description": "Installation d'intelligence artificielle sur site pour les fiduciaires, les administrations et les PME de Suisse romande : une machine dans vos locaux, une tâche précise qui tourne seule, aucune donnée qui quitte vos murs.",
      "email": "contact@lxstudio.ch",
      "telephone": "+41 78 703 88 00",
      "image": "https://lxstudio.ch/og/accueil.jpg",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lxstudio.ch/favicon.svg"
      },
      "founder": { "@id": "https://lxstudio.ch/#founder" },
      "identifier": {
        "@type": "PropertyValue",
        "propertyID": "UID",
        "name": "Numéro IDE",
        "value": "CHE-325.224.095"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rue des Romains 25",
        "addressLocality": "Bassecourt",
        "addressRegion": "Jura",
        "postalCode": "2854",
        "addressCountry": "CH"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 47.334926,
        "longitude": 7.247493
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00"
        }
      ],
      "priceRange": "Sur devis",
      "currenciesAccepted": "CHF",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "telephone": "+41 78 703 88 00",
        "email": "contact@lxstudio.ch",
        "availableLanguage": ["fr", "en"],
        "areaServed": "CH"
      },
      "areaServed": [
        { "@type": "Country", "name": "Switzerland" },
        { "@type": "AdministrativeArea", "name": "Jura" },
        { "@type": "AdministrativeArea", "name": "Berne" },
        { "@type": "AdministrativeArea", "name": "Neuchâtel" },
        { "@type": "AdministrativeArea", "name": "Vaud" },
        { "@type": "AdministrativeArea", "name": "Genève" },
        { "@type": "AdministrativeArea", "name": "Fribourg" },
        { "@type": "AdministrativeArea", "name": "Valais" }
      ],
      "knowsLanguage": ["fr", "en"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "IA installée sur site",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "@id": "https://lxstudio.ch/fiduciaires#service",
              "name": "IA pour fiduciaires : pièces saisies au cabinet",
              "url": "https://lxstudio.ch/fiduciaires"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "@id": "https://lxstudio.ch/administrations#service",
              "name": "IA pour polices et administrations, sur vos serveurs",
              "url": "https://lxstudio.ch/administrations"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "@id": "https://lxstudio.ch/pme#service",
              "name": "IA locale pour PME : mails triés, factures relancées",
              "url": "https://lxstudio.ch/pme"
            }
          }
        ]
      }
    },
    {
      "@type": "Person",
      "@id": "https://lxstudio.ch/#founder",
      "name": "Tanguy Lachat",
      "jobTitle": "Fondateur et ingénieur IA",
      "url": "https://lxstudio.ch/",
      "email": "contact@lxstudio.ch",
      "worksFor": { "@id": "https://lxstudio.ch/#organization" },
      "workLocation": { "@id": "https://lxstudio.ch/#organization" },
      "knowsAbout": [
        "Intelligence artificielle installée sur site",
        "Automatisation administrative des fiduciaires et des PME",
        "Souveraineté des données et nLPD",
        "Intégration Bexio"
      ]
    }
  ]
}
```

### 6.2 VideoObject corrigé (accueil, `src/routes/index.tsx`)

```json
{
  "@type": "VideoObject",
  "@id": "https://lxstudio.ch/#demo-video",
  "name": "Deux minutes pour voir une pièce traitée, du scan à l'écriture validée.",
  "description": "Une facture d'exemple arrive, est lue, classée et proposée à la validation, sur une machine qui ne fait aucun appel vers l'extérieur pendant le traitement. Une voix explique chaque étape, et tout est aussi écrit à l'écran.",
  "thumbnailUrl": ["https://lxstudio.ch/demo/demo-poster.jpg"],
  "contentUrl": "https://lxstudio.ch/demo/demo-lx-studio.mp4",
  "uploadDate": "2026-10-25T09:21:51+01:00",
  "duration": "PT2M",
  "width": 1280,
  "height": 720,
  "inLanguage": "fr-CH",
  "isFamilyFriendly": true,
  "publisher": { "@id": "https://lxstudio.ch/#organization" },
  "transcript": "Une pièce comptable, du scan à l'écriture validée. Voici ce qui se passe quand une pièce comptable arrive dans un cabinet équipé par LX Studio. La machine est chez vous. Installée dans vos locaux, branchée sur votre réseau. Pendant le traitement, aucun appel ne part vers un service externe : ni vers un éditeur d'intelligence artificielle, ni vers LX Studio. Les pièces arrivent comme aujourd'hui. Par le scanner, par e-mail, par une photo prise au téléphone. Rien ne change pour vos clients ni pour vos collaborateurs. La pièce est lue sur place. Le fournisseur, la date, les montants, la TVA, la référence de la facture QR : tout est extrait sur la machine, dans vos murs. Elle est ensuite classée dans le dossier du bon mandat. Et renommée selon votre convention, prête pour l'archivage. L'écriture est proposée dans votre logiciel comptable, avec le compte et le code TVA déduits de vos écritures passées. Un clic pour valider. Un clic pour corriger. Si vous corrigez, le système retient la correction pour ce mandat et la propose la fois suivante. Ce qu'il ne comprend pas, il le met de côté. Avec la raison. Rien n'est comptabilisé sans votre clic. Et chaque mois, un rapport : les pièces traitées, les heures de saisie récupérées, les corrections apportées. Comparé à la mesure faite avant l'installation. Mesuré chez vous, pas promis. Rien n'est sorti du cabinet. Réservez un diagnostic gratuit de 30 minutes sur lxstudio.ch."
}
```

Dans le code, `transcript` se construit sans recopier le texte : `[DEMO.chapters[0].title, ...DEMO.chapters.map((c) => c.text)].join(" ")`. Et dans `Demo()`, remplacer le `button` seul par un `<video preload="none" poster={DEMO.poster} controls playsInline>` toujours rendu, avec le bouton de lecture en superposition tant que `playing` est faux.

### 6.3 Page métier corrigée (exemple `/fiduciaires`, même modèle pour `/administrations` et `/pme`)

Le FAQPage existant reste tel quel (il n'est pas recopié ici).

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://lxstudio.ch/fiduciaires#webpage",
      "url": "https://lxstudio.ch/fiduciaires",
      "name": "IA pour fiduciaires : pièces saisies au cabinet | LX Studio",
      "description": "Une IA installée dans votre cabinet qui saisit les pièces comptables, lit les factures QR suisses et écrit dans Bexio. Aucun dossier client ne quitte le cabinet. Conçu pour la nLPD et le secret professionnel.",
      "inLanguage": "fr-CH",
      "isPartOf": { "@id": "https://lxstudio.ch/#website" },
      "about": { "@id": "https://lxstudio.ch/#organization" },
      "mainEntity": { "@id": "https://lxstudio.ch/fiduciaires#service" },
      "breadcrumb": { "@id": "https://lxstudio.ch/fiduciaires#breadcrumb" },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://lxstudio.ch/og/fiduciaires.jpg",
        "width": 1200,
        "height": 630
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://lxstudio.ch/fiduciaires#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://lxstudio.ch/" },
        { "@type": "ListItem", "position": 2, "name": "Fiduciaires", "item": "https://lxstudio.ch/fiduciaires" }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://lxstudio.ch/fiduciaires#service",
      "name": "IA pour fiduciaires : pièces saisies au cabinet",
      "serviceType": "Intelligence artificielle installée sur site",
      "description": "Une IA installée dans votre cabinet qui saisit les pièces comptables, lit les factures QR suisses et écrit dans Bexio. Aucun dossier client ne quitte le cabinet. Conçu pour la nLPD et le secret professionnel.",
      "provider": { "@id": "https://lxstudio.ch/#organization" },
      "audience": {
        "@type": "BusinessAudience",
        "name": "Fiduciaires et cabinets comptables de Suisse romande"
      },
      "areaServed": [
        { "@type": "Country", "name": "Switzerland" },
        { "@type": "AdministrativeArea", "name": "Jura" },
        { "@type": "AdministrativeArea", "name": "Berne" },
        { "@type": "AdministrativeArea", "name": "Neuchâtel" },
        { "@type": "AdministrativeArea", "name": "Vaud" },
        { "@type": "AdministrativeArea", "name": "Genève" },
        { "@type": "AdministrativeArea", "name": "Fribourg" },
        { "@type": "AdministrativeArea", "name": "Valais" }
      ],
      "url": "https://lxstudio.ch/fiduciaires"
    }
  ]
}
```

Noms de fil d'Ariane pour les autres pages : « Polices et administrations », « PME », « Sécurité », « Ressources ».

### 6.4 Article corrigé (exemple `/ressources/ia-locale-entreprise-suisse`, généré par `articleSchema()`)

Valide tel quel avec l'image existante. Quand `npm run og` produira aussi `ia-locale-entreprise-suisse-4x3.jpg` (1200x900) et `ia-locale-entreprise-suisse-1x1.jpg` (1200x1200), passer `image` en tableau des trois URL.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://lxstudio.ch/ressources/ia-locale-entreprise-suisse#article",
      "headline": "IA locale en entreprise : utiliser l'IA sans que vos données quittent la Suisse",
      "description": "Ce qu'est une IA locale, ce qu'elle change pour une entreprise suisse qui ne peut pas envoyer ses dossiers à l'étranger, ce qu'il faut comme matériel, et comment la mettre en place sans se tromper.",
      "keywords": "IA locale Suisse",
      "articleSection": "Ressources",
      "datePublished": "2026-10-24",
      "dateModified": "2026-10-24",
      "inLanguage": "fr-CH",
      "url": "https://lxstudio.ch/ressources/ia-locale-entreprise-suisse",
      "image": "https://lxstudio.ch/og/ia-locale-entreprise-suisse.jpg",
      "author": {
        "@type": "Person",
        "@id": "https://lxstudio.ch/#founder",
        "name": "Tanguy Lachat",
        "url": "https://lxstudio.ch/"
      },
      "publisher": { "@id": "https://lxstudio.ch/#organization" },
      "isPartOf": { "@id": "https://lxstudio.ch/#website" },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://lxstudio.ch/ressources/ia-locale-entreprise-suisse"
      },
      "isAccessibleForFree": true
    },
    {
      "@type": "FAQPage",
      "@id": "https://lxstudio.ch/ressources/ia-locale-entreprise-suisse#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Qu'est-ce qu'une IA locale en entreprise et pourquoi la choisir en Suisse ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Une IA locale est un modèle d'intelligence artificielle qui tourne sur une machine installée dans l'entreprise, sans envoyer les données à un service externe. Une entreprise suisse la choisit quand ses dossiers ne peuvent pas quitter ses murs : secret professionnel, nLPD, contrats clients, ou simple prudence."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://lxstudio.ch/ressources/ia-locale-entreprise-suisse#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://lxstudio.ch/" },
        { "@type": "ListItem", "position": 2, "name": "Ressources", "item": "https://lxstudio.ch/ressources" },
        { "@type": "ListItem", "position": 3, "name": "IA locale en entreprise : utiliser l'IA sans que vos données quittent la Suisse", "item": "https://lxstudio.ch/ressources/ia-locale-entreprise-suisse" }
      ]
    }
  ]
}
```

Condition pour garder le FAQPage : afficher la question dans la page (titre de l'encadré « En résumé » ou bloc « Question fréquente » en fin d'article, rendu dans `src/routes/ressources.$slug.tsx`).

### 6.5 Page `/ressources` : deux propriétés à ajouter

Dans le nœud `CollectionPage` : `"mainEntity": { "@id": "https://lxstudio.ch/ressources#list" }`. Dans le nœud `ItemList` : `"numberOfItems": 9`. Le reste est correct.

## 7. Où intervenir dans le code (`~/souverain-dex`)

| Fichier | Modification |
| --- | --- |
| `src/lib/seo.ts` : `ORGANIZATION` | `streetAddress` depuis `SITE.address.street`, `geo`, `openingHoursSpecification`, `identifier` depuis `SITE.ide`, `logo`, `priceRange`, `contactPoint`, `hasOfferCatalog`, `url` avec barre finale, suppression de `inLanguage` |
| `src/lib/seo.ts` : `FOUNDER` | `url` avec barre finale, `email`, `workLocation` à la place de `homeLocation`, `sameAs` dès que les URL existent |
| `src/lib/seo.ts` : `breadcrumbs()` | Accepter l'URL de la page pour poser `@id: <url>#breadcrumb` ; noms courts côté appelants |
| `src/lib/seo.ts` : `webPage()` | `breadcrumb`, `primaryImageOfPage` (image de la page), `mainEntity` optionnel |
| `src/lib/seo.ts` : `articleSchema()` | `author.url`, `articleSection`, `mainEntityOfPage` en objet, champ `updated` pour `dateModified`, `image` en tableau quand les variantes existent |
| `src/routes/index.tsx` | VideoObject : `width`, `height`, `transcript`, `uploadDate` avec fuseau ; retirer `breadcrumbs([{ Accueil }])` |
| `src/components/ia/sections.tsx` : `Demo()` | Rendre `<video preload="none" poster>` côté serveur avec les deux `<source>`, bouton en superposition |
| `src/routes/ressources.$slug.tsx` | Afficher `r.question` dans la page |
| `src/content/ia/site.ts` | Ajouter les URL de profils (LinkedIn) et, si souhaité, les horaires, pour alimenter `sameAs` et `openingHoursSpecification` |
| `public/` | Créer `logo.png` 512x512, puis remplacer `favicon.svg` dans `logo` |

Après mise en ligne : passer les 8 URL dans l'outil de test des résultats enrichis de Google et dans validator.schema.org, puis demander l'indexation de l'accueil dans Search Console (rapport Vidéos à surveiller à J+7).

## 8. Ce qui n'a pas été testé

- Aucun passage par l'outil Google de test des résultats enrichis ni par validator.schema.org (pas d'API) : la validation est manuelle, à confirmer après correction.
- 2 articles sur 9 contrôlés ; les 7 autres sortent du même `articleSchema()`, les constats s'y appliquent mais leurs dates et images n'ont pas été vérifiées une à une.
- Coordonnées `geo` issues d'OpenStreetMap, non confirmées sur Google Maps.
- Horaires et profils sociaux : inconnus, aucune donnée sur le site. Les valeurs d'horaires proposées sont un créneau par défaut.
- Rendu JavaScript par Googlebot non simulé : l'absence de `<video>` est constatée sur le HTML servi, pas sur le DOM après hydratation (après hydratation l'élément n'existe toujours qu'après un clic, d'après le composant).
- Aucune donnée Search Console consultée (impressions, statut vidéo, erreurs de balisage).
