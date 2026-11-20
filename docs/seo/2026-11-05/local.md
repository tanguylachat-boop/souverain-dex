# Audit SEO local : LX Studio (lxstudio.ch)

Date des vérifications : 05.11.2026, 13h40 à 14h30 CET. Toutes les données ci-dessous proviennent de pages récupérées ce jour (fichiers bruts conservés dans `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/raw/`). Rien n'est extrapolé : quand une source n'a pas pu être lue, c'est écrit.

Entité auditée : LX Studio, raison individuelle Tanguy Lachat, Rue des Romains 25, 2854 Bassecourt (commune de Haute-Sorne, canton du Jura), +41 78 703 88 00, contact@lxstudio.ch, IDE CHE-325.224.095, non assujettie à la TVA. Zone de service déclarée : Jura et Suisse romande. Ambition : première en Suisse.

## 1. Score SEO local : 27 / 100

| Dimension | Poids | Note | Justification courte |
| --- | --- | --- | --- |
| Signaux Google Business Profile | 25 % | 10 | Aucune fiche GBP vérifiable (Google inaccessible par outil, voir section 3). Sur le site : aucun lien vers une fiche Google, aucune carte, aucun widget d'avis, aucune photo du lieu. |
| Avis et réputation | 20 % | 10 | 0 avis sur local.ch, 0 sur search.ch (« Es gibt noch kein Gästefeedback »), 0 avis ou témoignage cité sur le site, pas d'aggregateRating (à juste titre : il n'y a rien à agréger). |
| SEO local on-page | 20 % | 55 | NAP complet en pied de page sur toutes les pages, lien `tel:`, balises `geo.region` CH-JU et `geo.placename`, titre et description mentionnent « Jura et Suisse romande », trois pages métier dédiées (facteur organique local n°1). Mais zéro page de zone, pas de page contact, pas de carte, pas d'horaires, et les pages métier ne contiennent presque aucun signal local hors pied de page. |
| Cohérence NAP et citations | 15 % | 35 | NAP identique sur le site, les mentions légales, le schéma, local.ch et search.ch. Mais seulement 2 citations (le duo Localsearch), toutes deux non revendiquées, sans site web sur local.ch, sans horaires. Zefix, moneyhouse, Kompass, LinkedIn : absent ou non vérifiable. |
| Schéma local | 10 % | 55 | `ProfessionalService` correct, `telephone`, `email`, `areaServed` à 7 régions. Manquent `streetAddress`, `geo`, `openingHoursSpecification`, `sameAs`, `logo`, `hasMap`, identifiant IDE. |
| Liens et autorité locale | 10 % | 10 | Aucun lien local professionnel trouvé. Les seules mentions externes trouvées de « Tanguy Lachat » sont personnelles (lqj.ch, watson.ch : championnat de pêche ; digitalbum.ch). Aucune association, aucune presse économique. |

Calcul : 0,25 x 10 + 0,20 x 10 + 0,20 x 55 + 0,15 x 35 + 0,10 x 55 + 0,10 x 10 = 27,25.

Lecture : les fondations on-page sont saines (NAP propre, schéma présent, pages métier), tout le reste de la pile locale est vide. C'est un site récent (sitemap daté du 24.10.2026) qui n'a encore aucune existence dans l'écosystème local hors de l'inscription Localsearch créée automatiquement.

## 2. Type d'entreprise et vertical

- Type détecté : hybride à dominante SAB (service area business). Adresse visible en pied de page et dans les mentions légales (Rue des Romains 25), mais aucune carte, aucun lien « itinéraire », aucun horaire, et un discours « j'installe chez vous », « Basé dans le Jura, actif dans toute la Suisse romande ». Le client n'est pas reçu sur place : c'est le prestataire qui se déplace.
- Vertical : services B2B, conseil et installation d'IA sur site. Aucun des six verticaux standard (restaurant, santé, juridique, home services, immobilier, automobile) ne s'applique. Sous-type schema.org le plus juste : `ProfessionalService` (déjà utilisé). Cible nommée sur le site : fiduciaires, polices et administrations, PME.
- Conséquence pour Google Business Profile : si aucun client n'est reçu à Bassecourt, les règles GBP imposent de masquer l'adresse et de déclarer des zones de service. La fiche reste rattachée à Bassecourt pour la proximité (55,2 % de la variance du classement local selon l'étude Search Atlas : hors de notre contrôle).

## 3. Fiche Google Business Profile : existence non vérifiable par outil

Ce qui a été tenté le 05.11.2026 :

| Tentative | Résultat |
| --- | --- |
| `https://www.google.com/search?q=LX+Studio+Bassecourt&hl=fr&gl=ch` | Redirection 302 vers `consent.google.com` (mur de consentement). |
| `https://www.google.com/maps/search/LX+Studio+Bassecourt?hl=fr` | Page JavaScript sans donnée exploitable, redirection consentement via WebFetch. |
| `https://www.google.com/search?q=...&udm=local` (onglet Lieux) | Page « Cliquez ici si vous n'avez pas été redirigé » (JavaScript obligatoire). |
| Contournement par cookies de consentement | Refusé par la politique de l'agent (classé « contournement de contrôle anti-robot »). Non retenté. |
| Bing Maps `https://www.bing.com/maps?q=LX+Studio+Bassecourt` | Page JavaScript, aucune fiche lisible. |
| Bing Search, DuckDuckGo, Mojeek, Qwant | Résultats dégradés ou bloqués pour un client automatisé (202, 403, 429). |
| Brave Search `LX Studio Bassecourt` | Fonctionne. Aucun bloc « fiche d'entreprise » ni résultat Google Maps dans les résultats. Premier résultat : lxstudio.ch. |

Conclusion : impossible de confirmer ou d'infirmer l'existence d'une fiche GBP « LX Studio » à Bassecourt avec les outils disponibles. Indices convergents vers « pas de fiche ou fiche non travaillée » : aucun lien vers Google Maps ou vers des avis Google sur le site, aucune photo, et le profil local.ch (dont la donnée est souvent réutilisée) est « Entreprise non revendiquée ».

Vérification manuelle à faire (2 minutes, navigateur connecté au compte Google de LX Studio) :
1. Ouvrir `https://www.google.com/maps` et chercher « LX Studio Bassecourt » puis « LX Studio Jura IA ». Noter : fiche présente ou non, nom exact, catégorie, adresse affichée ou masquée, nombre d'avis.
2. Ouvrir `https://business.google.com/` avec le compte : s'il propose « Revendiquer » une fiche existante, elle existe (créée automatiquement ou par un tiers) ; s'il propose « Ajouter votre établissement », elle n'existe pas.
3. Ne pas créer de doublon : une seule fiche, au nom exact « LX Studio », sans mot-clé ajouté (« LX Studio IA Jura » violerait les règles et expose à la suspension).

## 4. Audit de cohérence NAP (sources comparées le 05.11.2026)

| Source | URL | Nom | Adresse | Téléphone | Site web | Catégorie / autre | Statut |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Site, pied de page (toutes pages) | https://lxstudio.ch/ | LX Studio | Rue des Romains 25, 2854 Bassecourt, Suisse | 078 703 88 00 (lien `tel:+41787038800`) | implicite | « 2026 LX Studio, Bassecourt », « Conçu et hébergé pour la Suisse romande » | Cohérent |
| Site, mentions légales | https://lxstudio.ch/mentions-legales | LX Studio, raison individuelle, Tanguy Lachat | Rue des Romains 25, 2854 Bassecourt, Suisse | 078 703 88 00 | contact@lxstudio.ch | IDE CHE-325.224.095, non assujettie TVA, for à Bassecourt. Page en `noindex, follow`. | Cohérent |
| Site, JSON-LD `ProfessionalService` | toutes les pages, `@id` https://lxstudio.ch/#organization | LX Studio | Bassecourt, Jura, 2854, CH, **sans streetAddress** | +41 78 703 88 00 | https://lxstudio.ch | areaServed : Suisse, Jura, Berne, Neuchâtel, Vaud, Genève, Fribourg, Valais | Écart : rue absente, « Berne » au lieu de « Jura bernois » |
| Site, balises meta | toutes les pages | LX Studio (og:site_name) | geo.region CH-JU, geo.placename « Bassecourt, Jura, Suisse » | aucun | canonical https://lxstudio.ch/ | og:locale fr_CH, hreflang fr-CH et x-default seulement | Cohérent |
| search.ch (donnée Localsearch) | https://search.ch/tel/bassecourt/rue-des-romains-25/lx-studio | LX Studio, Lachat, Tanguy | Rue des Romains 25, 2854 Bassecourt JU | 078 703 88 00 (portable), JSON-LD +41787038800 | lxstudio.ch affiché | « Conseil en intelligence artificielle et automatisation », « Wünscht keine Werbung », 0 avis, pas d'horaires | Cohérent, non revendiqué |
| local.ch (donnée localsearch.ch) | https://www.local.ch/fr/d/bassecourt/2854/lx-studio-xEPs7H4uAIxvyhFpUfwSlA | LX Studio · Lachat Tanguy | Rue des Romains 25, 2854 Bassecourt | 078 703 88 00 (mobile) | **absent** | « Conseil en intelligence artificielle et automatisation », géo 47.33493 / 7.247522, `openingHoursSpecification` vide, « Entreprise non revendiquée », 0 avis | Cohérent, non revendiqué, site web manquant |
| Zefix (registre du commerce) | https://www.zefix.ch/ (API de recherche) | aucune entrée « LX Studio » (recherche exacte : NORESULT) ; 35 entrées « Lachat », aucune LX Studio | | | | Homonyme : **Studio LX GmbH**, Zürich, CHE-438.553.456, bureau d'architecture et urbanisme (moneyhouse, 05.11.2026) | Absent (normal : raison individuelle non inscrite) |
| Registre IDE (uid.admin.ch) | https://www.uid.admin.ch/Detail.aspx?uid_id=CHE-325.224.095 | | | | | Erreur serveur HTTP 500 « Runtime Error » le 05.11.2026 | Non vérifiable |
| moneyhouse | https://www.moneyhouse.ch/fr/search?q=LX%20Studio | 1 résultat : Studio LX GmbH (ZH) | | | | Aucun LX Studio Bassecourt | Absent |
| Kompass | https://ch.kompass.com/ | | | | | HTTP 403, mur JavaScript | Non vérifiable |
| LinkedIn | linkedin.com/company/lx-studio, /lxstudio, /lx-studio-ch | | | | | HTTP 403 ; Brave Search « Tanguy Lachat linkedin » ne renvoie aucune page LinkedIn dans les premiers résultats | Non vérifiable, probablement absent ou non indexé |
| Google Business Profile | voir section 3 | | | | | | Non vérifiable |
| Bing Places, Apple Business Connect | | | | | | Aucune fiche lisible par outil | Non vérifiable |

Verdict NAP : aucune divergence entre les sources lisibles. Nom, rue, NPA, localité et numéro sont identiques partout. Deux écarts internes au site à corriger : `streetAddress` absent du schéma, et « Berne » comme zone servie alors que la zone réelle est le Jura bernois. Un écart externe : le site web n'apparaît pas sur local.ch.

Point d'attention sur la marque : « LX Studio » est très ambiguë dans les index. Résultats Brave du 05.11.2026 pour « lxstudio.ch » : lxstudio.ch en premier, puis lxstudio.com (bureau de learning design, États-Unis), studiolx.ch, lux-studio.ch, lx.studio (logiciel d'éclairage, GitHub heronarts/LXStudio), une page LinkedIn « lxstudio-uco » (États-Unis), et des vidéos de figurines en résine « LX Studio ». Ajouter à cela Studio LX GmbH à Zürich au registre du commerce. Pour qu'une fiche Google et les moteurs rattachent sans erreur la marque à Bassecourt, il faut des liens `sameAs` croisés (site, GBP, LinkedIn, local.ch, search.ch) et un nom de fiche strictement identique partout.

## 5. Anciennes URL encore dans les index

Brave Search (05.11.2026) affiche encore deux anciennes pages du site avec leurs anciens titres :
- `https://www.lxstudio.ch/seo-geo` et `https://www.lxstudio.ch/about` : « LX Studio : Agence Web & Automatisations IA en Suisse (Jura, Romandie) … Basé à Bassecourt : Projets partout en Suisse ».
- Page d'accueil avec l'ancien extrait « Agent IA souverain pour fiduciaires suisses … Pensé pour Genève, Vaud, Valais, Fribourg, Neuchâtel et le Jura ».

État réel vérifié le 05.11.2026 : `www.lxstudio.ch` redirige en **302** (temporaire) vers `https://lxstudio.ch/` ; `/about` et `/seo-geo` répondent **404** après redirection ; `/contact` et `/a-propos` n'existent pas (404). `/mentia` et `/athlit` renvoient la page d'accueil, `/fiduciaire` renvoie `/fiduciaires`, `/blog` renvoie `/ressources`.

À corriger : passer www en 301, rediriger `/about` vers `/` (ou une future page « À propos ») et `/seo-geo` vers `/ressources` en 301. Trois positionnements successifs (agence web, agent IA fiduciaires, IA installée sur site) coexistent dans les index : la catégorie GBP et les descriptions d'annuaires doivent toutes dire la même chose que le site actuel.

## 6. Signaux locaux dans le contenu (comptage par page, 05.11.2026)

| Page | Mots | Jura | Suisse romande | Bassecourt | Delémont | Genève | Autres cantons ou villes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| / (accueil) | 1 658 | 3 | 3 | 2 | 1 | 1 | aucun |
| /fiduciaires | 994 | 1 | 2 | 2 | 0 | 0 | aucun |
| /pme | 741 | 1 | 2 | 2 | 0 | 0 | aucun |
| /administrations | 857 | 0 | 2 | 2 | 0 | 0 | aucun |
| /securite | 1 462 | 0 | 1 | 2 | 0 | 0 | aucun |
| /ressources et articles | 795 à 1 584 | 0 | 1 | 2 | 0 | 0 | aucun |

Lecture : les mentions « Bassecourt » (2 par page) et « Suisse romande » (1 par page) viennent du pied de page. Hors accueil, le contenu éditorial ne nomme ni le Jura, ni Delémont, ni Genève, ni Lausanne, ni Neuchâtel. Les seules ancres locales éditoriales sont sur l'accueil : « IA installée chez vous · Jura · Suisse romande », « Basé dans le Jura, actif dans toute la Suisse romande », et les références « Facchinetti Automobiles · BMW Delémont », « Richoz Sanitaire · Genève ». La balise `keywords` liste « IA Jura, IA Neuchâtel, IA Lausanne, IA Genève » : sans effet sur le classement.

Ce qui manque sur la page : carte, lien itinéraire, horaires, page contact, liens vers LinkedIn ou tout profil externe (aucun lien sortant social sur le site), bloc « Zones d'intervention » reliant des pages de zone.

## 7. Validation du schéma local

Fichier source : `/Users/tanguylachat/souverain-dex/src/lib/seo.ts` (lignes 77 à 104, objet `ProfessionalService`) et `/Users/tanguylachat/souverain-dex/src/content/ia/site.ts` (lignes 14 à 28 : rue, NPA, ville, IDE déjà présents mais non injectés dans le schéma).

| Propriété | État | Action |
| --- | --- | --- |
| `@type` | `ProfessionalService` | Correct (sous-type de LocalBusiness). Ne pas passer à `Organization` seul. |
| `name`, `url`, `description`, `email`, `telephone` | présents | OK. Format `+41 78 703 88 00` accepté. |
| `address.streetAddress` | **absent** | Ajouter « Rue des Romains 25 » depuis `site.ts`. |
| `address.addressRegion` | « Jura » | Préférer le code « JU » (cohérent avec local.ch et search.ch). |
| `geo` | **absent** | Ajouter `GeoCoordinates` à 5 décimales. Valeur publiée par local.ch : 47.33493 / 7.247522 ; vérifier le point exact dans Google Maps avant de l'écrire. |
| `openingHoursSpecification` | **absent** | Ajouter les horaires réels (par exemple lundi à vendredi 08:00 à 18:00 si c'est vrai). Ne rien inventer : les mêmes horaires iront sur GBP et local.ch. |
| `areaServed` | 8 entrées, dont « Berne » | Remplacer « Berne » par « Jura bernois » (ou `AdministrativeArea` « Canton de Berne » seulement si c'est la zone réellement couverte). Garder `Country` Suisse. |
| `sameAs` | **absent** | Ajouter, une fois créés : fiche Google (URL Maps), page LinkedIn entreprise, profil LinkedIn de Tanguy Lachat, local.ch, search.ch. |
| `logo` | absent (`image` pointe sur l'image OG) | Ajouter un logo carré PNG ou SVG en URL absolue, distinct de l'image OG. |
| `identifier` ou `taxID` | absent | Ajouter `identifier: { "@type": "PropertyValue", "propertyID": "IDE", "value": "CHE-325.224.095" }`. Pas de `vatID` (non assujettie). |
| `hasMap` | absent | Ajouter l'URL Google Maps de la fiche une fois créée. |
| `priceRange` | absent | Facultatif. Omettre plutôt que d'écrire « sur devis ». |
| `aggregateRating`, `review` | absents | Correct tant qu'il n'y a aucun avis réel. Ne jamais en ajouter sans avis publics vérifiables. |
| `Service` (`#service`) | `areaServed` Suisse | OK. Pourra être décliné par canton sur les pages de zone. |
| `Person` fondateur | présent, `homeLocation` Bassecourt | OK. Ajouter `sameAs` LinkedIn. |

Les autres blocs (WebSite, WebPage, FAQPage, BreadcrumbList, VideoObject, Article, CollectionPage) sont corrects et n'ont pas d'impact local.

## 8. Avis et réputation

| Source | Avis | Note | Dernier avis | Réponses |
| --- | --- | --- | --- | --- |
| Google | non vérifiable (section 3) | | | |
| local.ch | 0 | | | |
| search.ch | 0 (« Es gibt noch kein Gästefeedback zu LX Studio ») | | | |
| Site | 0 témoignage cité ; 3 références nommées (Facchinetti Automobiles BMW Delémont, Richoz Sanitaire Genève, Oasis Drink) sans citation ni note | | | |

Vélocité : nulle. Règle des 18 jours (Sterling Sky) : sans avis pendant 3 semaines, la fiche décroche. Avec trois clients livrés, l'objectif réaliste est 3 avis Google dans les 18 jours suivant la création de la fiche, puis 1 avis toutes les 2 à 3 semaines (chaque diagnostic ou installation terminée = une demande d'avis avec le lien court de la fiche). Répondre à chaque avis sous 48 h, en nommant le canton et la tâche automatisée.

## 9. Concurrents locaux

Le pack local Google Maps n'a pas pu être lu (section 3). La comparaison ci-dessous repose sur la donnée Localsearch (search.ch, requête « intelligence artificielle » par région, 05.11.2026), c'est-à-dire sur les acteurs qui ont déjà une inscription locale avec cette activité.

| Région | Entrées « intelligence artificielle » | Acteurs comparables | Constat |
| --- | --- | --- | --- |
| Jura | 2 | **Ianovas**, Courgenay (« digital marketing et intelligence artificielle »), et LX Studio | Seul concurrent jurassien inscrit. Aucun acteur « IA installée sur site » : LX Studio peut occuper seul cette catégorie dans le Jura. |
| Neuchâtel | 2 | **IA Swiss**, Rue du Seyon 5a, Neuchâtel (« formation et conseil en intelligence artificielle pour PME ») ; **Alpify Services Sàrl**, Rue de l'Hôpital 16 | Deux acteurs orientés conseil et formation, pas installation. |
| Lausanne | 6 | **NeurokAI**, 1018 Lausanne (« agence d'automatisation IA ») ; **DJTAL Sàrl**, 1010 Lausanne (« L'IA opérationnelle pour les entreprises suisses. Greffée sur vos données et votre ERP actuel ») ; **TELDAR Sàrl**, 1003 Lausanne | DJTAL porte le discours le plus proche de LX Studio (IA branchée sur l'ERP). Les 3 autres entrées ne sont pas des concurrents (avocate, logiciel de physiothérapie, recrutement). |
| Genève | 4 | **Digistylze** (agence web, SEO, « référencement IA ») ; **Publikey Sàrl** (consulting IT, IA, blockchain) | Les 2 autres entrées ne sont pas des concurrents (fiduciaire, recrutement). |
| Fribourg | 1 | aucun (audioprothésiste) | Catégorie vide. |
| Valais | 0 (search.ch renvoie 404 pour « Sion ») | | Catégorie vide. |

Annuaire d'agences : Sortlist a une page « Les 10 meilleurs spécialistes en intelligence artificielle à Genève - Comparatif 2026 » (`https://www.sortlist.ch/s/intelligence-artificielle/geneve-ge`) et l'équivalent pour Lausanne, Montreux et Sion. LX Studio n'y figure pas (recherche « LX Studio » : 0 occurrence).

Ce que cela dit : dans les annuaires suisses, le créneau « IA installée dans les locaux du client » est vide dans tous les cantons romands. Le seul concurrent qui approche ce discours (DJTAL) est à Lausanne. La bataille de la carte Google se jouera canton par canton sur la proximité ; la bataille organique et IA (ChatGPT, Perplexity) se jouera sur les pages de service dédiées et les citations, où personne n'est encore installé sur ce positionnement.

## 10. Citations : état et ordre de création

Ordre imposé : local.ch, search.ch, Google, Bing Places, Apple, LinkedIn, Zefix et registres, associations romandes. Toutes les URL ci-dessous ont répondu HTTP 200 le 05.11.2026, sauf mention contraire. Données à saisir partout à l'identique : « LX Studio », Rue des Romains 25, 2854 Bassecourt, +41 78 703 88 00, contact@lxstudio.ch, https://lxstudio.ch/, catégorie « Conseil en intelligence artificielle et automatisation » (déjà celle de Localsearch), horaires réels, description reprenant la première phrase de l'accueil.

| # | Annuaire | État au 05.11.2026 | URL d'inscription ou de revendication | Priorité |
| --- | --- | --- | --- | --- |
| 1 | local.ch | Fiche existante, non revendiquée, sans site web, sans horaires, 0 avis | https://www.local.ch/fr/d/bassecourt/2854/lx-studio-xEPs7H4uAIxvyhFpUfwSlA (bouton « Revendiquer », vérification par Swisscom Directories) | Critique |
| 2 | search.ch | Fiche existante (même donnée Localsearch), site web affiché, 0 avis | https://search.ch/tel/bassecourt/rue-des-romains-25/lx-studio (lien « Bearbeiten ») ; la revendication local.ch se propage | Critique |
| 3 | Google Business Profile | Non vérifiable ; vraisemblablement inexistante ou non revendiquée | https://business.google.com/ (vérifié : redirige vers la page Google Unternehmensprofil) | Critique |
| 4 | Bing Places | Aucune fiche lisible | https://www.bingplaces.com/ (redirige vers https://www.bing.com/forbusiness/) ; importer la fiche Google une fois créée | Haute |
| 5 | Apple Business Connect | Aucune fiche lisible | https://businessconnect.apple.com/ (redirige vers https://business.apple.com/) | Haute |
| 6 | LinkedIn page entreprise | Non vérifiable (403) ; aucun résultat LinkedIn trouvé pour « LX Studio » ou « Tanguy Lachat » sur Brave | https://www.linkedin.com/company/setup/new/ (URL standard, 403 pour un robot) ; lier depuis le pied de page et `sameAs` | Haute |
| 7 | Zefix et registre du commerce | Absent (raison individuelle : inscription obligatoire seulement dès CHF 100 000 de chiffre d'affaires annuel, art. 931 CO ; volontaire en dessous) | Inscription auprès du registre du commerce du canton du Jura (Delémont) ; consultation https://www.zefix.ch/fr/search/entity/welcome | Moyenne (déclenche moneyhouse, Kompass et les agrégateurs de registre) |
| 8 | Registre IDE | IDE CHE-325.224.095 déclaré sur le site ; page de détail en erreur 500 le 05.11.2026 | https://www.uid.admin.ch/Search.aspx?lang=fr : vérifier que l'entrée est publique et au bon nom | Moyenne |
| 9 | CCIJ, Chambre de commerce et d'industrie du Jura | Non membre (aucune mention trouvée) | https://www.ccij.ch/ (portail membres « MyCCI », « Nuit des entreprises jurassiennes ») | Haute (lien local le plus fort disponible dans le Jura) |
| 10 | Promotion économique Jura | Aucune mention | https://eco.jura.ch/ | Moyenne |
| 11 | Creapole (incubateur jurassien) | Aucune mention | https://www.creapole.ch/ | Moyenne |
| 12 | CEP, Chambre d'économie publique Grand Chasseral (Jura bernois) | Aucune mention | https://www.cep.ch/ | Moyenne |
| 13 | CNCI (Neuchâtel) | Aucune mention | https://www.cnci.ch/ | Basse, à activer avec un client neuchâtelois |
| 14 | CVCI (Vaud) | Aucune mention | https://cvci.ch/ | Basse, idem |
| 15 | FER Genève | Aucune mention | https://www.fer-ge.ch/ | Basse, à activer avec Richoz Sanitaire comme référence |
| 16 | CCIF (Fribourg), CCI Valais | Aucune mention | https://www.ccif.ch/ et https://www.cci-valais.ch/ | Basse |
| 17 | Sortlist | Absent | https://www.sortlist.ch/ (catégories IA par ville déjà existantes) | Moyenne (visibilité agence, Suisse romande) |
| 18 | swiss made software (label national) | Absent (0 occurrence dans la liste des sociétés) | https://www.swissmadesoftware.org/ | Moyenne, utile pour la Suisse alémanique |
| 19 | help.ch | Non trouvé (formulaire de recherche, non testé) | https://www.help.ch/ | Basse |
| 20 | startupticker.ch, digitalswitzerland, SwissCognitive | Aucune mention | https://www.startupticker.ch/, https://www.digitalswitzerland.com/, https://swisscognitive.com/ | Basse (presse et réseau plutôt qu'annuaire) |

Non vérifiables par outil (blocage 403 ou JavaScript) : Kompass, gryps.ch, cylex-swiss.ch, yelp.ch, Trustpilot, moneyhouse hors registre. Aucune présence LX Studio n'y est attendue aujourd'hui.

## 11. Pages de zone : stratégie recommandée

Situation : aucune page par ville ni par canton. Garde-fous : moins de 30 pages, au moins 60 % de contenu unique par page, test d'échange (si on remplace le nom du canton par un autre et que la page reste valable, elle est un doorway et ne se publie pas).

Recommandation : des pages par **canton**, pas par ville, et seulement là où il existe de la matière unique. Une raison individuelle avec trois références ne peut pas alimenter 30 pages honnêtes.

Vague 1 (4 pages, dès qu'une référence ou un contenu propre existe) :
- `/jura` : canton d'origine, référence Facchinetti Automobiles BMW Delémont, Comptoir du Jura, déplacement sans frais, CCIJ.
- `/geneve` : référence Richoz Sanitaire (gestion des interventions connectée à Bexio).
- `/vaud` et `/neuchatel` : à publier seulement après un premier client ou une étude de cas locale.

Vague 2 (3 pages, conditionnées à une référence) : `/fribourg`, `/valais`, `/jura-bernois`.

Vague 3 (au plus 5 pages ville) : uniquement les villes où un client installé peut être cité (Delémont, Genève, puis Lausanne, Neuchâtel, Fribourg). Total maximal : 12 pages, soit bien sous la limite de 30.

Contenu unique exigé par page (objectif 60 % hors gabarit) :
1. Un cas client du canton avec la mesure réelle (heures chronométrées avant, heures récupérées après), tel que la méthode du site le promet.
2. Le contexte cantonal réel : autorité cantonale de protection des données compétente pour les administrations, logiciels dominants chez les fiduciaires du canton, réalités linguistiques (bilinguisme à Fribourg et dans le Jura bernois).
3. La logistique d'installation sur site depuis Bassecourt (délai de déplacement, modalités du diagnostic en présentiel ou en visio).
4. Une FAQ de 3 à 5 questions propres au canton, en JSON-LD `FAQPage`.
5. Un bloc `Service` en JSON-LD avec `areaServed` limité au canton et `provider` pointant sur `#organization`, plus un `BreadcrumbList`.
6. Un appel à l'action local (diagnostic gratuit de 30 minutes, avec le prénom du contact).

Maillage : bloc « Zones d'intervention » dans le pied de page vers les pages canton ; chaque page canton renvoie vers les trois pages métier et vers l'article de ressources le plus proche ; chaque page métier renvoie vers les pages canton publiées. Profondeur maximale : 2 clics depuis l'accueil. Les pages sans matière ne sont pas publiées « en attendant » : une page vide par canton fait plus de mal qu'une absence.

## 12. Viser toute la Suisse, Suisse alémanique comprise

Ce que la carte Google ne fera jamais : une fiche à Bassecourt n'apparaîtra pas dans le pack local de Zürich, Berne ou Bâle (proximité, 55,2 % de la variance). Être « premier en Suisse » se joue donc sur l'organique et les réponses des assistants IA, pas sur Maps hors Jura.

1. Version allemande du cœur du site (5 pages : accueil, fiduciaires, administrations, PME, sécurité) avec `hreflang="de-CH"` en plus de `fr-CH`, et `inLanguage` adapté. Aujourd'hui, seul `fr-CH` existe. Vocabulaire à valider avec le marché : « KI lokal installiert », « On-Premise-KI für Treuhänder », « nDSG-konforme KI », « KI ohne Cloud ».
2. Fiche Google avec zones de service élargies progressivement (limite GBP : 20 zones). Commencer par les 7 cantons romands ; ajouter Berne, Bâle, Soleure, Zürich quand une référence alémanique existe.
3. Les annuaires déjà utilisés sont nationaux et bilingues : local.ch et search.ch servent déjà la fiche en allemand (interface « Telefonbuch »). Une fois revendiquée, compléter la description dans les deux langues.
4. Label et réseaux nationaux : swiss made software (vitrine orientée Suisse alémanique), SwissCognitive, digitalswitzerland, startupticker pour les annonces de clients.
5. Inscription au registre du commerce : en Suisse alémanique, l'absence d'une entrée Zefix pèse sur la confiance B2B (moneyhouse, Kompass sont consultés avant un premier contact). Même volontaire, elle crée automatiquement une douzaine de citations de registre.
6. Pages de zone alémaniques : jamais avant la version allemande des pages métier et un premier client germanophone. Même garde-fous (moins de 30 pages au total, 60 % unique).
7. Avis : viser des avis rédigés en allemand par des clients alémaniques dès le premier ; Google affiche la langue des avis dans les résultats locaux.

## 13. Check-list Google Business Profile (une fois l'existence vérifiée)

| Élément | Détecté sur le site ou les annuaires | À faire |
| --- | --- | --- |
| Fiche existante et revendiquée | Non vérifiable | Vérifier (section 3), créer ou revendiquer, une seule fiche |
| Nom | « LX Studio » partout | Garder exactement « LX Studio » |
| Catégorie principale | « Conseil en intelligence artificielle et automatisation » sur Localsearch | Choisir dans la liste GBP la catégorie la plus proche disponible (vérifier dans l'interface s'il existe une catégorie IA ; sinon « Consultant informatique » en principale et « Société de logiciels » ou « Consultant en gestion d'entreprise » en secondaire). Catégorie principale = facteur n°1 (Whitespark 2026) ; mauvaise catégorie = facteur négatif n°1. |
| Adresse | Rue des Romains 25 visible sur le site | Si aucun client n'est reçu sur place : masquer l'adresse, déclarer les zones de service (Jura, Jura bernois, Neuchâtel, Vaud, Genève, Fribourg, Valais) |
| Téléphone | +41 78 703 88 00 | Identique |
| Site web | https://lxstudio.ch/ | Ajouter `?utm_source=google&utm_medium=organic&utm_campaign=gbp` |
| Horaires | Aucun nulle part | Définir des horaires réels et les répliquer sur le site (schéma) et local.ch |
| Description | Aucune | 750 caractères maximum, reprendre la promesse du site, citer Bassecourt, Jura, Suisse romande, fiduciaires, administrations, PME |
| Services | 3 métiers sur le site | Créer 3 services avec description |
| Photos | Aucune | Photo de Tanguy Lachat, de la machine installée (Mac mini) chez un client avec son accord, du stand au Comptoir du Jura, du logo |
| Avis | 0 | 3 demandes aux clients existants dans les 18 jours |
| Posts | Aucun | 1 post toutes les 2 semaines (article de ressources, cas client) |
| Questions et réponses | Aucune | Reprendre les 9 questions de la FAQ du site |
| Lien retour depuis le site | Aucun | Ajouter « Avis Google » et la carte sur une page contact, `hasMap` et `sameAs` dans le schéma |

## 14. Plan local priorisé (10 actions)

| Priorité | Action | Preuve ou fichier | Effet attendu |
| --- | --- | --- | --- |
| Critique | 1. Vérifier manuellement l'existence de la fiche Google (section 3), puis créer ou revendiquer, catégorie principale choisie avec soin, adresse masquée si aucun accueil sur place, zones de service déclarées | https://business.google.com/ | Entrée dans le pack local Jura, premier levier (25 % du score) |
| Critique | 2. Revendiquer local.ch (et donc search.ch) : ajouter le site web, les horaires, la description, le logo | https://www.local.ch/fr/d/bassecourt/2854/lx-studio-xEPs7H4uAIxvyhFpUfwSlA | Citations n°1 et n°2 en Suisse complètes et cohérentes |
| Critique | 3. Obtenir 3 avis Google de Facchinetti, Richoz, Oasis Drink dans les 18 jours, puis 1 toutes les 2 à 3 semaines ; répondre à chacun | Lien court de la fiche | Vélocité d'avis, 20 % du score |
| Haute | 4. Compléter le schéma : `streetAddress`, `geo` 5 décimales, `openingHoursSpecification`, `sameAs`, `logo`, `identifier` IDE, `hasMap`, « Jura bernois » à la place de « Berne » | `/Users/tanguylachat/souverain-dex/src/lib/seo.ts` lignes 77 à 104 ; valeurs dans `src/content/ia/site.ts` | Entité sans ambiguïté face aux homonymes |
| Haute | 5. Créer la page LinkedIn entreprise et lier LinkedIn (entreprise et fondateur) depuis le pied de page | https://www.linkedin.com/company/setup/new/ | Citation B2B la plus consultée, lien `sameAs` |
| Haute | 6. Ajouter une page contact ou « Où nous trouver » : NAP, carte (image statique ou intégration chargée à la demande), horaires, lien itinéraire, lien avis Google | nouvelle route dans `src/routes/` | Signaux locaux on-page, destination pour la fiche |
| Haute | 7. Bing Places (import de la fiche Google) puis Apple Business Connect | https://www.bingplaces.com/, https://businessconnect.apple.com/ | Couverture des cartes hors Google (Copilot, Siri, Apple Plans) |
| Haute | 8. Adhérer à la CCIJ et demander la fiche membre avec lien ; se signaler à eco.jura.ch et Creapole | https://www.ccij.ch/ | Premiers liens locaux d'autorité (10 % du score) |
| Moyenne | 9. Redirections 301 : www vers apex, `/about` vers `/`, `/seo-geo` vers `/ressources` | configuration d'hébergement du site | Nettoyage des anciens positionnements encore indexés |
| Moyenne | 10. Lancer les pages de zone en vague 1 (`/jura`, `/geneve`) avec les garde-fous de la section 11, puis bloc « Zones d'intervention » en pied de page | `src/routes/`, `src/lib/seo.ts` (bloc `Service` par canton) | Visibilité organique et IA par canton sans doorway |

Ensuite, dans l'ordre : inscription volontaire au registre du commerce (Zefix, moneyhouse, Kompass automatiques), Sortlist, swiss made software, version allemande du cœur du site.

## 15. Limites de cet audit

- Google Search et Google Maps : mur de consentement pour un client automatisé ; le contournement par cookies a été refusé par la politique de l'agent et n'a pas été retenté. L'existence de la fiche, sa catégorie, ses avis et le pack local pour « IA entreprise Jura » et « agence IA Suisse romande » doivent être vérifiés manuellement.
- Bing, DuckDuckGo, Mojeek, Qwant : résultats dégradés ou bloqués (202, 403, 429) pour un robot. Brave Search a fonctionné pour 4 requêtes avant blocage (429).
- LinkedIn, Kompass, gryps.ch, cylex, yelp.ch, Trustpilot : blocage 403 ou JavaScript obligatoire. Registre IDE : erreur serveur 500 au moment du test.
- Aucune donnée DataForSEO (pas d'outil disponible) : pas de position réelle dans le pack local, pas de volume de recherche, pas de vélocité d'avis.
- La proximité (55,2 % de la variance du classement local) ne se corrige pas : une fiche à Bassecourt ne sera jamais dans le pack local de Genève ou de Zürich. Les pages de zone et les citations visent l'organique et les assistants IA, pas la carte hors Jura.
- Le code source consulté est celui du dépôt `/Users/tanguylachat/souverain-dex` (dernier commit daf6a9a du 26.10.2026) ; le site en production correspond (schéma et pied de page identiques au 05.11.2026).
