# Audit SEO, mots-clés et GEO de lxstudio.ch : rapport unifié

Date : 05.11.2026. Site audité : https://lxstudio.ch (15 URL du sitemap, 2 pages légales, robots.txt, sitemap.xml, llms.txt, PDF du dossier sécurité). Objectif donné : être premier sur toute la Suisse sur l'IA installée dans les locaux du client (fiduciaires, administrations, PME), être cité par les assistants IA, et proposer le site en français et en anglais.

Huit audits spécialisés ont tourné en parallèle le 05.11.2026 (technique, contenu et E-E-A-T, données structurées, sitemap, performance, visuel et mobile, GEO, SEO local). Chaque rapport détaillé est dans ce dossier avec ses preuves. Ce document est la synthèse, le score, la recherche de mots-clés, l'audit GEO et le plan.

| Rapport détaillé | Fichier | Score |
| --- | --- | --- |
| SEO technique (crawl, index, sécurité, URL, mobile, rendu JS) | `technical.md` | 70 / 100 |
| Contenu et E-E-A-T (face à timekraft, idealcom, mont3, counteo, local-ia, Infomaniak) | `content.md` | 56 / 100 |
| Données structurées JSON-LD | `schema.md` | 72 / 100 |
| Sitemap et robots.txt | `sitemap.md` | 84 / 100 |
| Performance (Lighthouse 13.5, 32 audits, 3G lente, INP) | `performance.md` | 85 / 100 |
| Visuel et mobile (Playwright, 128 captures) | `visual.md` | 68 / 100 |
| GEO, citation par les assistants IA (sonde Gemini comprise) | `geo.md` | 66 / 100 |
| SEO local (fiche Google, annuaires, NAP, pages de zone) | `local.md` | 27 / 100 |

Données brutes : `suggest-fr-ch.json` (suggestions Google Suisse romande), `geo-probe.json` (sonde Gemini, 5 questions), `sitemap-propose-fr-en.xml` (sitemap bilingue validé). Les captures d'écran, les rapports Lighthouse JSON et les HTML téléchargés sont restés dans le dossier de travail de la session (`scratchpad/seo/`), ils ne sont pas versionnés.

## 1. Verdict

**Score de santé SEO : 65 / 100.** Le socle technique est sain (rendu serveur complet, canonical, sitemap valide, JSON-LD riche, Lighthouse mobile 93 à 100, CLS 0, robots IA tous autorisés). Ce qui empêche la première place n'est pas technique, c'est le contenu et l'entité :

1. **Les mots que les gens et les IA cherchent ne sont pas sur le site.** « IA souveraine », « on-premise », « Cloud Act », « commune », « LLM » : 0 occurrence sur les 15 pages. Le site dit « IA locale », « dans vos murs », « installée chez vous ». Excellent pour un humain, invisible pour les requêtes. Gemini, interrogé sur 4 questions de décideur, cite Wiven AI, Sinabe, Idealcom, Infomaniak, Apertus et une vingtaine d'autres, jamais LX Studio.
2. **Les pages métier sont trois à quatre fois trop courtes** (478 à 648 mots utiles) face aux pages qui occupent déjà les requêtes (timekraft 2 779 mots sur les fiduciaires, idealcom 4 701 mots sur l'IA souveraine).
3. **Aucune preuve chiffrée, aucun témoignage, aucun avis, aucune page À propos.** « Le produit tourne déjà en pilote dans un cabinet romand » est la seule trace de l'offre réelle. Les trois références de l'accueil sont des projets logiciels, pas des installations d'IA locale.
4. **L'entité LX Studio n'existe presque pas hors du site** : fiche local.ch non revendiquée, fiche Google non vérifiable (probablement absente), aucun lien LinkedIn, aucun `sameAs`, aucune inscription au registre, et au moins cinq homonymes « LX Studio » dans les index.
5. **Le site se contredit sur le prix** : diagnostic gratuit partout, mais l'article sur les coûts dit qu'un diagnostic gratuit « a intérêt à conclure qu'un projet est nécessaire » et que la demi-journée de mesure est facturée.

| Catégorie (pondération du score) | Note | Ce qui pèse |
| --- | --- | --- |
| Technique (22 %) | 70 | En-têtes de sécurité et `noindex` du PDF non appliqués (`public/_headers` ignoré par l'hébergeur), deux traceurs Lovable non déclarés dans la politique de confidentialité, www en 302, slash final en 307, 404 sans titre, pas d'IndexNow |
| Contenu (23 %) | 56 | Vocabulaire manquant, pages minces, zéro preuve, pas d'auteur, contradiction prix, FAQ des articles invisible |
| On-page (20 %) | 58 | 14 meta descriptions sur 15 trop longues (166 à 272 caractères), 6 titres d'article trop longs, H1 sans mot-clé sur 5 pages sur 6, accueil et article pilier sur le même titre, 19 liens internes en tout, aucun tableau HTML |
| Données structurées (10 %) | 72 | Graphe propre et relié ; manquent `streetAddress`, `geo`, `sameAs`, `logo`, IDE, `VideoObject` sans élément `<video>` |
| Performance (10 %) | 85 | LCP mobile 1,8 à 2,5 s (bon, mais 43 à 74 ms de marge), critère maison « premier affichage sous 3 s en 3G lente » non tenu (4,0 s), 167 Ko de JS pour un plafond de 170 Ko |
| Recherche IA, GEO (10 %) | 66 | Accès total aux robots IA et llms.txt présent, mais 0 citation sur 4 questions et vocabulaire absent |
| Images (5 %) | 60 | Affiche vidéo servie en 1920 px pour 637 px affichés, logo PNG non redimensionné, aucune image dans les 9 articles, `favicon.ico` en 404, aucun fichier logo |

**SEO local : 27 / 100**, compté à part parce qu'il est le levier le plus rapide. Tout est à créer : fiche Google, revendication local.ch et search.ch, LinkedIn, avis, pages de zone.

## 2. Les correctifs par priorité

### Critique (bloque la première place, cette semaine)

| # | Constat | Preuve | Correctif | Qui |
| --- | --- | --- | --- | --- |
| C1 | Vocabulaire des requêtes absent | `content.md` P0-1, `geo.md` section 4 : « souveraine » 0, « on-premise » 0, « Cloud Act » 0, « commune » 0 | Première phrase de l'accueil, de `/securite` et de l'article IA locale : « appelée aussi IA souveraine ou IA on-premise ». Page pilier `/ia-souveraine-suisse`. Section « Et le Cloud Act ? » dans l'article nLPD et sur `/securite` | Code (synonymes faits dans la PR) + Tanguy (page pilier) |
| C2 | Fiche Google Business Profile absente ou non revendiquée | `local.md` section 3 | Vérifier sur business.google.com, créer une seule fiche « LX Studio », catégorie principale la plus proche de « consultant informatique », adresse masquée si aucun client reçu sur place, 7 cantons romands en zones de service | Tanguy, 30 min |
| C3 | Fiches local.ch et search.ch non revendiquées, sans site ni horaires | `local.md` section 10, URL de la fiche dans le rapport | Revendiquer (vérification Swisscom Directories), ajouter site, horaires, description, logo | Tanguy, 20 min |
| C4 | Aucun avis nulle part | `local.md` section 8 | Demander un avis Google à Facchinetti, Richoz et Oasis Drink dans les 18 jours suivant la création de la fiche, puis 1 toutes les 2 à 3 semaines | Tanguy |
| C5 | Contradiction diagnostic gratuit / mesure facturée | `content.md` P0-5 | Une seule règle écrite au même endroit sur l'accueil, `/fiduciaires` et l'article coûts : diagnostic de 30 minutes gratuit, puis ce qui est facturé et comment | Tanguy décide, code applique |
| C6 | Aucune preuve chiffrée de l'offre vendue | `content.md` P0-3 | Étude de cas du pilote (anonymisée si besoin) : pièces par semaine, heures avant et après, taux de corrections, période, citation signée, photo de la machine | Tanguy (chiffres du rapport mensuel que la méthode promet déjà) |
| C7 | Entité sans profil externe | `geo.md` section 6, `schema.md` P1-7 | Créer la page LinkedIn LX Studio, lier le profil de Tanguy, ajouter les deux URL dans `sameAs` et dans le pied de page | Tanguy (URL), code (`sameAs`) |

### Élevé (dans la semaine qui suit)

| # | Constat | Correctif |
| --- | --- | --- |
| E1 | `public/_headers` ignoré : PDF du dossier sans `X-Robots-Tag`, pas de `X-Frame-Options` ni `Permissions-Policy`, HSTS sans preload (`technical.md` constats 1 et 2) | Poser les en-têtes dans l'application (middleware serveur TanStack Start) et servir le PDF par une route serveur, ou ne l'envoyer que par mail |
| E2 | Deux traceurs Lovable (`/~flock.js`, `/__l5e/events.*.js`, code rrweb, balise toutes les 10 s) non déclarés dans la politique de confidentialité, sur un site qui vend « rien ne sort du bâtiment » (`technical.md` constat 3, `performance.md` 6.8) | Désactiver l'analytics Lovable dans le projet Lovable ; sinon déclarer Lovable, Tinybird et le cookie Cloudflare `__cf_bm` dans la politique (avis juridique) |
| E3 | Pages métier minces (`content.md` P0-2) | Refonte à 1 500 mots utiles : cadre légal du métier (CO 398, LSR, LBA, EXPERTsuisse pour les fiduciaires ; art. 320 CP et lois cantonales LIPAD, LPrD, CPDT-JUNE pour les administrations), matrice Bexio, Abacus, Crésus, WinBIZ avec l'état réel de chaque connecteur, scénario chiffré, FAQ de 8 à 10 questions |
| E4 | Pas de page À propos ni d'encart auteur (`content.md` P0-4) | Page `/a-propos` : parcours daté, Bassecourt, clients, méthode, photo, LinkedIn ; encart auteur sous chaque article ; `Person` avec `sameAs` et `image` |
| E5 | FAQ des articles balisée mais invisible, premier paragraphe qui répond à une question absente (`content.md` P1-1, `schema.md`) | Afficher la question au-dessus du chapeau (fait dans la PR) et supprimer le second paragraphe redondant des 4 articles du 24.10 |
| E6 | Schéma incomplet (`schema.md` P1) | `streetAddress`, `geo`, IDE en `identifier`, `logo`, `url` avec barre finale, suppression de `inLanguage` sur `ProfessionalService`, `breadcrumb` relié, `VideoObject` avec `width`, `height`, `transcript` (fait dans la PR) ; `sameAs` dès que les URL existent ; horaires seulement s'ils sont vrais |
| E7 | Premier écran mobile lisible 2 s après le rendu, titre du formulaire masqué 3 s après un saut d'ancre, affiche vidéo recouverte par le bouton de lecture (`visual.md` section 4, `performance.md` 6.1) | Raccourcir la chorégraphie du titre (délai 0, 25 ms par mot, 0,6 s), supprimer le fondu de `main`, révéler la section cible d'une ancre, refaire l'affiche sans texte au centre |

### Moyen (ce mois)

- Meta descriptions à 150 à 160 caractères sur les 14 pages concernées et titres d'article sous 65 caractères (`technical.md` constat 11, `content.md` P1-5) : fait dans la PR pour les pages principales et les articles.
- Sitemap : 9 `lastmod` en retard (contenu modifié le 26.10, daté du 24.10), `priority` et `changefreq` inutiles (`sitemap.md`) : fait dans la PR, et le fichier est désormais généré depuis le contenu.
- `www` en 302 à passer en 301 (réglage domaine Lovable ou règle Cloudflare), slash final en 307 à passer en 308, redirections 301 pour `/about` et `/seo-geo` encore dans les index (`local.md` section 5).
- Page 404 sans `<title>` et avec une image OG Lovable (`technical.md` constat 7) : fait dans la PR.
- IndexNow (clé, fichier, soumission des URL) et propriété Bing Webmaster Tools : index de ChatGPT Search et Copilot.
- Images : affiche vidéo en 640 et 1280 px via `srcset`, logo Facchinetti en WebP 340 px, `favicon.ico`, `apple-touch-icon.png`, `public/logo.png` 512 px.
- Cache HTTP sur `/fonts`, `/logos`, `/og`, `/demo` ; Brotli (réglage Cloudflare).
- Cannibalisation accueil / article IA locale (titres distincts, fait dans la PR) et `/fiduciaires` / article saisie (la page porte l'offre et le cadre légal, l'article le détail technique et les chiffres).
- Tableaux HTML réels pour le comparatif « Une IA générique / LX Studio » et les mesures de sécurité.
- Version courte du dossier sécurité en accès libre (HTML), la complète derrière le formulaire.

### Faible (trimestre)

- `preconnect` Plausible, suppression de `meta keywords` et `meta language` (fait dans la PR), `security.txt`, jetons `Claude-User`, `Claude-SearchBot`, `MistralAI-User` dans robots.txt (fait dans la PR), `llms-full.txt`.
- Contrastes : eyebrows à 10 px, métadonnées à 2,9:1, pied de page à 3,6:1, champs de formulaire à 15 px sur mobile (zoom iOS) : police 16 px faite dans la PR.
- Bouton « retour en haut » qui recouvre le texte sur mobile, moitié droite des heros vide sur bureau, carte Oasis Drink sans logo.
- `backdrop-filter` non préfixé absent (le flou de l'en-tête n'existe que sous Safari) : fait dans la PR.

## 3. Recherche de mots-clés

### 3.1 Méthode et limites

Sources utilisées le 05.11.2026 : suggestions Google pour la Suisse (`hl=fr`, `gl=ch`, 33 racines ; `hl=en` et `hl=de`, 14 racines chacune), requêtes d'expansion générées par Gemini en recherche ancrée (ce sont les mots que l'IA ajoute elle-même pour chercher), titres et H1 des pages concurrentes lues en entier (timekraft.ch, idealcom.ch, mont3.ch, local-ia.ch, counteo.ch, infomaniak.com), vocabulaire des FAQ concurrentes.

Ce qui manque : **aucun volume de recherche ni position réelle.** Les outils payants n'étaient pas disponibles (le crédit gratuit Apify était épuisé, DataForSEO non connecté, aucun accès Search Console). Les volumes s'obtiennent gratuitement dans Google Keyword Planner avec un compte Google Ads sans campagne, ou dans Search Console une fois le site suivi. Les positions se lisent dans Search Console (rapport Performances) ou avec une recherche manuelle en navigation privée depuis la Suisse. Jusque-là, les mots-clés ci-dessous sont classés par signal observé (suggestion Google présente, requête d'expansion Gemini, concurrent positionné), pas par volume.

### 3.2 Ce que les suggestions Google disent du marché romand

- « ia souveraine suisse » est la première suggestion de « IA souveraine » en Suisse : la demande existe et aucune page du site ne porte ces mots.
- « ia fiduciaire », « ia fiduciaire suisse », « formation ia fiduciaire » : le métier est cherché avec le mot « fiduciaire ».
- « ia pme suisse », « automatisation ia pme suisse », « formation ia pme suisse romande » : la formation est une intention récurrente (hors périmètre de l'offre, mais un article « ce qu'il faut savoir avant » capte cette recherche).
- « ia locale » est un sujet grand public : « ia locale pc », « ia locale mac », « ia locale gratuite », « comment installer une ia locale », « quelle machine pour ia locale », « quelle configuration pour ia locale », « serveur ia local prix », « mini serveur ia local », « meilleur ia local ollama ». Le site est le seul du panel à installer sur Mac mini : l'angle « IA locale sur Mac, quel matériel pour une entreprise » est libre.
- « automatisation saisie comptable », « automatisation comptable », « logiciel automatisation comptable », « comment saisir les pièces comptables » : la tâche vendue est cherchée.
- « agence ia suisse romande », « entreprise ia suisse romande », « ia genève », « ia lausanne », « ia jura » : requêtes de prestataire, faibles mais précises.
- « ia on premise » existe en français ; « ia administration publique » aussi. « IA commune » renvoie à la Commune de Paris : le mot « commune » doit toujours être accompagné (« commune suisse », « administration communale »).

### 3.3 Ce que Gemini cherche quand on lui pose la question d'un décideur

Les requêtes d'expansion observées dans `geo-probe.json` : « entreprise installation IA locale fiduciaire Suisse romande », « solutions IA on-premise fiduciaires Romandie », « intelligence artificielle sur site fiduciaire Suisse romande », « IA souveraine on-premise Suisse fiduciaire », « IA on-premise conforme LPD Suisse », « IA sur site communes administrations Suisse romande », « fournisseur solutions IA locales Suisse romande », « solutions LLM on-premise Suisse », « alternative ChatGPT données entreprise Suisse ». Les mots « on-premise », « sur site », « souveraine », « LLM », « Romandie », « communes », « fournisseur », « prestataires » doivent apparaître dans les textes, pas seulement dans les balises.

### 3.4 Carte des mots-clés par page (français)

| Page | Requête principale | Requêtes secondaires | État | Changement |
| --- | --- | --- | --- | --- |
| `/` | IA locale entreprise Suisse | agence IA Suisse romande, IA installée chez vous, IA souveraine, IA on-premise, entreprise IA Suisse romande | Title et description seulement ; synonymes absents | Synonymes dans le premier paragraphe et la FAQ, title distinct de l'article pilier (PR) |
| `/fiduciaires` | IA fiduciaire Suisse | IA pour fiduciaire, automatisation saisie comptable fiduciaire, saisie pièces comptables Bexio, facture QR IA | 648 mots utiles, cadre légal absent | H1 avec « IA pour fiduciaires » (PR), refonte à 1 500 mots (E3) |
| `/administrations` | IA administration communale Suisse | IA commune suisse, IA administration publique, IA police anonymisation, secret de fonction IA | « commune » et « police » absents du corps | Chapeau réécrit avec « commune », « police », art. 320 CP (PR), refonte (E3) |
| `/pme` | IA PME Suisse | IA locale PME, automatisation IA PME suisse, tri des mails IA, relance factures | 478 mots, page la plus courte | H1 avec « IA locale pour PME » (PR), refonte (E3) |
| `/securite` | sécurité IA sur site | IA conforme nLPD, IA secret professionnel, Cloud Act Suisse, chiffrement IA locale | Meilleure page, sans « Cloud Act » ni « souveraine » | Intro avec les synonymes et une section Cloud Act |
| Article IA locale | qu'est-ce qu'une IA locale | IA locale Suisse, IA locale mac, quelle machine pour IA locale, IA on-premise définition | Définition dupliquée, synonymes absents | Définition unique avec synonymes (PR) |
| Article ChatGPT nLPD | ChatGPT nLPD entreprise | ChatGPT données personnelles Suisse, Cloud Act Suisse, ChatGPT LPD | « Cloud Act » absent | H2 « Et le Cloud Act ? » |
| Article secret professionnel | IA et secret professionnel | IA avocat secret professionnel, art. 321 CP IA, IA médecin | Bon | Développer le cas des fiduciaires (CO 730b, LBA, LSR) |
| Article saisie des pièces | automatiser saisie pièces comptables fiduciaire | OCR facture QR, écriture proposée Bexio, IA saisie comptable | Bon, sans chiffres du pilote | Chiffres réels dès qu'ils existent |
| Article coûts | combien coûte une IA locale PME Suisse | prix serveur IA local, coût automatisation IA PME | Fourchettes sans sources nommées, contradiction prix | Sources nommées (mont3 CHF 3'500, 5'000, 7'500 ; local-ia dès CHF 3'500), règle du diagnostic |

Pages à créer, avec leur requête (dans cet ordre) :

1. `/ia-souveraine-suisse` : « IA souveraine Suisse », « IA souveraine entreprise », « IA on-premise Suisse », « alternative ChatGPT Suisse ». Tableau cloud américain / hébergé en Suisse (Infomaniak Euria, Apertus) / machine dans vos locaux, Cloud Act, art. 16 et 17 LPD, art. 321 CP, 6 à 9 FAQ. C'est la page que les listes compilées par Gemini citent chez les concurrents.
2. `/communes` (ou refonte profonde de `/administrations`) : « IA commune suisse », « IA administration communale », secret de fonction, LIPAD, LPrD, CPDT-JUNE, marchés publics, PV de séance, guichet, anonymisation.
3. `/a-propos` : « Tanguy Lachat », « LX Studio Bassecourt ».
4. Étude de cas du pilote : « automatisation saisie comptable cas réel », « IA fiduciaire témoignage ».
5. Article « IA locale sur Mac mini M4 Pro : quel matériel, quels modèles » : « ia locale mac », « quelle machine pour ia locale », « serveur ia local prix », « mini serveur ia local ».
6. Article « Facture QR suisse lue par une IA locale » : « lecture facture QR automatique », « QR-facture Bexio IA » (aucune page concurrente ne le traite).
7. Glossaire (IA locale, IA souveraine, on-premise, LLM ouvert, Ollama, nLPD, art. 321 CP, art. 320 CP, Cloud Act, facture QR) : définitions de 40 à 60 mots avec ancres, pour les assistants IA.
8. Page « Connecteurs » : « IA Abacus », « IA Crésus », « IA WinBIZ », « IA Bexio », avec l'état réel et daté de chaque connecteur.

Garde-fou : ne jamais publier une page sans matière propre. Une page vide par canton ou par logiciel nuit plus qu'une absence.

### 3.5 Anglais : un marché étroit en Suisse, utile pour les assistants IA et les sociétés internationales

Suggestions Google observées (`hl=en`, `gl=ch`) : « ai agency switzerland », « ai automation agency switzerland », « ai consulting switzerland », « ai companies in switzerland », « sovereign ai switzerland », « on-premise llm » (avec « solution », « server », « hardware », « deployment »), « self hosted llm for business », « local ai company ». Aucune suggestion pour « on-premise AI Switzerland », « AI for SMEs Switzerland », « AI for fiduciary Switzerland », « AI data protection Switzerland » : ces requêtes sont trop rares en Suisse pour que Google les propose. « ChatGPT alternative Switzerland » renvoie même « alternative chatgpt suisse » : la demande est francophone.

Lecture honnête : la version anglaise ne fera pas de LX Studio le premier sur des requêtes anglaises à fort volume, parce qu'elles n'existent pas pour cette offre en Suisse. Elle sert trois choses : les sociétés internationales de Genève, Zurich et Bâle dont la direction ne lit pas le français (fiduciaires anglophones, cabinets d'avocats, ONG), les assistants IA interrogés en anglais (« on-premise AI provider in Switzerland », où la page anglaise devient citable), et la crédibilité face à un responsable informatique. Mots-clés retenus pour la version anglaise : « on-premise AI Switzerland », « sovereign AI Switzerland », « local AI for accounting and fiduciary firms », « AI without cloud Switzerland », « Swiss data protection act AI », « ChatGPT alternative Switzerland data stays in-house ». Slugs anglais choisis : `/en`, `/en/fiduciaries`, `/en/public-administrations`, `/en/smes`, `/en/security`, `/en/resources`, `/en/resources/local-ai-switzerland`, `/en/resources/chatgpt-swiss-data-protection-act`, `/en/resources/professional-secrecy-ai`, `/en/resources/accounting-firm-automate-bookkeeping-ai`, `/en/legal-notice`, `/en/privacy-policy`.

### 3.6 Allemand : le vrai levier pour « toute la Suisse »

Suggestions Google observées (`hl=de`, `gl=ch`) : « ki treuhand », « ki treuhand suisse », « ki für treuhand », « ki für treuhänder », « ki treuhänder », « lokale ki für unternehmen », « lokale ki modelle für unternehmen », « lokal installierte ki », « ki ohne cloud », « ki chatbots lokal ohne cloud anbindung nutzen », « chatgpt alternative schweiz », « ki agentur schweiz », « ki kmu schweiz », « ki beratung kmu schweiz », « buchhaltung automatisieren ki », « ki datenschutz schweiz ».

Il y a plus de signaux de demande en allemand qu'en anglais sur chaque thème de l'offre (Treuhand, KMU, lokal, ohne Cloud, Datenschutz). Les deux tiers des entreprises suisses sont alémaniques. « Premier sur toute la Suisse » se jouera sur Google.ch en allemand et sur les assistants IA interrogés en allemand, pas sur le pack local de Zurich, où une fiche à Bassecourt n'apparaîtra jamais (proximité : 55 % de la variance du classement local). Décision proposée : après la version anglaise, une version allemande des 5 pages principales avec `hreflang="de-CH"`, vocabulaire à valider avec un relecteur alémanique (« KI lokal installiert », « On-Premise-KI für Treuhänder », « nDSG-konforme KI », « KI ohne Cloud »), puis des avis Google rédigés en allemand dès le premier client alémanique. L'architecture bilingue livrée dans cette PR accepte une troisième langue sans refonte.

## 4. Audit GEO : être cité par ChatGPT, Gemini, Perplexity et les AI Overviews

### 4.1 Mesure du 05.11.2026

Sonde faite avec Gemini 2.5 Flash en recherche ancrée (Google Search), cinq questions en français. ChatGPT n'a pas pu être sondé (la requête API est revenue sans texte, cause non investiguée) ; Perplexity et Claude n'ont pas été interrogés (pas d'outil disponible). Les acteurs cités par Gemini sont ceux que Google lui a remontés ce jour-là.

| Question | LX Studio cité | Acteurs cités par Gemini |
| --- | --- | --- |
| Quelle entreprise installe une IA locale, directement dans les locaux des fiduciaires, en Suisse romande ? | Non | Wiven AI (« tourner entièrement sur les machines du cabinet »), i-fixit.ch, All-in Solution, GeniusCount, Agence iA, Mivelaz Consulting |
| Quels prestataires proposent une IA souveraine on-premise pour une fiduciaire en Suisse ? | Non | HelvAI, AlpineAI (SwissGPT), MTF Swiss Cloud, Suisse AI Group, Jonlabs, Ask It AI |
| Qui propose une IA installée sur site pour les communes et administrations en Suisse romande ? | Non | Sinabe, Neurokai, Idealcom, Deeplink.ai, Innovatim, Palambur, AlpineAI, Souverain IA, Qubitech, MAIjin, Infomaniak (Euria), Apertus, Lumind, Présence IA, Novatix |
| Quelle alternative à ChatGPT garde les données dans l'entreprise, en Suisse ? | Non | Infomaniak AI Tools, onprem.ai, VSHN, Swiss-SDI, MCDev Sàrl, Apertus |
| Que fait LX Studio, à Bassecourt dans le Jura ? | Oui, description exacte, 4 sources, toutes lxstudio.ch | aucun |

Lecture : Gemini comprend parfaitement le site quand on le nomme. Il ne le trouve jamais quand on décrit le besoin, parce que les requêtes qu'il génère contiennent « on-premise », « souveraine », « sur site », « communes », « prestataires », « LLM », et que le site ne contient pas ces mots. Les acteurs cités ont en commun d'apparaître dans des pages de liste (annuaires, comparatifs, presse) ou dans plusieurs sources : LX Studio n'a qu'une source, lui-même.

### 4.2 Ce qui est déjà bon (à garder)

Robots IA tous autorisés dans robots.txt et vérifiés par requête réelle (GPTBot, ClaudeBot, PerplexityBot reçoivent le même HTML que Chrome, 60 229 octets) ; HTML complet côté serveur ; llms.txt présent et bien écrit ; chaque article ouvre par la réponse en 47 à 104 mots ; FAQ sur l'accueil et les pages métier ; sources fedlex et PFPDT datées ; transcription de la démo dans la page ; `Person`, `ProfessionalService`, `Article`, `FAQPage`, `VideoObject` en JSON-LD ; clients nommés ; dates ISO.

### 4.3 Plan GEO

Cette semaine (fait dans la PR quand c'est du code) :

1. Définition unique en tête de l'article IA locale, avec les synonymes et l'entité : « Une IA locale, aussi appelée IA souveraine, IA on-premise ou IA sur site, est un modèle de langage ouvert qui tourne sur une machine installée dans les locaux de l'entreprise... LX Studio, à Bassecourt (Jura), installe ce type de système. » Même phrase de synonymes dans la FAQ de l'accueil et le blockquote de llms.txt.
2. Faire exister l'entité dans le texte visible : « LX Studio est dirigé par Tanguy Lachat, ingénieur IA, à Bassecourt (Jura) » sur l'accueil, adresse complète dans le pied de page.
3. `sameAs` (LinkedIn page et profil, local.ch, search.ch) dans le JSON-LD, dès que Tanguy fournit les URL.
4. Revendiquer local.ch, créer la fiche Google et Bing Places avec les mêmes données.
5. Publier la démo sur YouTube (titre « IA locale pour fiduciaire : une pièce comptable traitée au cabinet, sans sortir des murs (LX Studio, Jura) », description = définition du point 1), ajouter `embedUrl` dans le `VideoObject`.
6. Vérifier dans Cloudflare que « AI Scrapers and Crawlers » et « Block AI bots » sont désactivés (sinon robots.txt ne sert à rien).

Ce mois : page pilier IA souveraine, page communes, page À propos, étude de cas, comparatif alternative ChatGPT, glossaire, prix et délais en une phrase citable (après validation de Tanguy), modèles nommés avec versions sous un titre en forme de question sur `/securite`, tableau comparatif en vrai `<table>`.

Ce trimestre : presse régionale (Le Quotidien Jurassien, arcinfo) avec un client, demander l'ajout de LX Studio dans les pages de liste qui citent Wiven AI, Neurokai, Sinabe ou Idealcom, une publication LinkedIn par semaine reprenant un passage citable, inscription au registre du commerce (lève l'homonymie avec Studio LX GmbH à Zurich), Wikidata dès qu'une source tierce existe.

Mesure : reposer les 5 questions chaque mois à Gemini, ChatGPT, Perplexity et Claude, consigner le résultat dans `~/Downloads/business-brain/2-areas/marketing/PERFORMANCE-LOG.md`. Le script de sonde est `geo-probe.py` dans le dossier de travail de la session ; il lit les clés dans l'environnement et coûte quelques centimes par passage.

## 5. Le plan pour être premier en Suisse

Ce que « premier » veut dire ici, et sur quoi : première position Google.ch et première citation par les assistants IA sur les requêtes de la carte 3.4 et des pages 3.4 à créer, en français d'abord, puis en allemand. Sur le pack local Google Maps, la première place n'est atteignable que dans le Jura et le Jura bernois ; partout ailleurs, c'est l'organique et les IA qui comptent.

Les concurrents à dépasser, tels qu'observés le 05.11.2026 : timekraft.ch (229 URL, pages piliers de 2 000 à 3 500 mots, 17 avis Google, page auteur, llms.txt de 25 Ko avec cas chiffrés ; hébergé chez Infomaniak, donc pas réellement sur site), idealcom.ch (4 701 mots sur l'IA souveraine, 38 FAQ, « 18 ans », délai « 15 à 20 jours ouvrés », serveur chez le client mais chat généraliste), mont3.ch (4 langues, prix fixes CHF 3'500, 5'000, 7'500, tableau de modèles). Ce que LX Studio a et qu'aucun d'eux n'a : une vraie machine dans les murs avec une tâche livrée et mesurée, une démo transcrite, une page sécurité qui dit ce qui n'est pas fait, des clients nommés. Il faut le dire avec les mots cherchés et le prouver.

| Phase | Quand | Actions | Résultat attendu |
| --- | --- | --- | --- |
| 0. Fondations | Semaine du 09.11 | Critiques C1 à C7, élevés E1, E2, E5, E6, E7 ; PR bilingue en ligne ; Search Console et Bing Webmaster Tools créés et sitemap soumis ; IndexNow | Entité reconnue, en-têtes conformes, requêtes « souveraine » et « on-premise » couvertes par les textes existants |
| 1. Contenu qui gagne | Novembre et décembre | Page pilier IA souveraine, page communes, À propos, étude de cas, refonte des 3 pages métier, article Mac mini, article facture QR, glossaire ; 3 avis Google ; LinkedIn hebdomadaire | Premières positions sur « IA souveraine Suisse », « IA fiduciaire Suisse », « IA locale » romand ; premières citations IA sur les questions fiduciaires |
| 2. Toute la Suisse | Janvier à mars 2027 | Version allemande des 5 pages principales (`de-CH`), relecteur alémanique, pages canton en vague 1 (`/jura`, `/geneve`) puis seulement avec un client, annuaires (CCIJ, Sortlist, swiss made software), registre du commerce, presse, YouTube | Visibilité alémanique, citations IA en allemand, pack local Jura |
| 3. Mesure et itération | Chaque mois | Search Console (positions, impressions), sonde GEO (5 questions, 4 assistants), avis, log de performance, revue des pages sous 1 500 mots | Décision continuer, doubler ou arrêter par page |

Ce que personne ne peut promettre : une date pour la première place. Ce qui est vérifiable chaque mois : la position sur chaque requête de la carte et le nombre de questions où un assistant cite LX Studio.

## 6. Ce qui est livré dans la PR, et ce qui attend Tanguy

Dans la PR (branche `seo-i18n`) : site en français et en anglais (12 pages anglaises, sélecteur de langue, `hreflang` réciproques, `x-default` sur le français, `lang` et `og:locale` par langue, formulaires et mails en anglais, PDF du dossier sécurité en anglais, images Open Graph anglaises, sitemap bilingue généré depuis le contenu avec les `lastmod` corrigés, llms.txt bilingue), plus les correctifs de code listés « fait dans la PR » ci-dessus.

Ce qui attend Tanguy, dans l'ordre :

1. Fiche Google Business Profile (vérifier, créer ou revendiquer), fiche local.ch, Bing Places, Apple Business Connect. Horaires réels à décider (ils iront aussi dans le schéma).
2. Page LinkedIn LX Studio et profil : envoyer les deux URL pour `sameAs` et le pied de page.
3. Trois demandes d'avis Google (Facchinetti, Richoz, Oasis Drink).
4. La règle du diagnostic et de la mesure (gratuit, facturé, déduit du devis ou non) et une fourchette de prix et de délai publiable, validées par lui.
5. Les chiffres du pilote (pièces par semaine, heures avant et après, taux de corrections) et l'accord du cabinet pour une étude de cas, même anonymisée.
6. Désactiver l'analytics Lovable dans le projet Lovable, vérifier les réglages Cloudflare (robots IA, www en 301, Brotli, HTTP/3).
7. Publier la démo sur YouTube.
8. Rédiger ou faire rédiger les pages de la phase 1 (le code les accueille sans changement d'architecture).

### Mesures faites sur la construction de la PR (05.11.2026, `npx wrangler dev`, Lighthouse 13.5 mobile)

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 95 | 100 | 100 | 100 | 2,6 s | 30 ms | 0 |
| `/en` | 94 | 100 | 100 | 100 | 2,8 s | 0 ms | 0 |
| `/fiduciaires` | 97 | 100 | 100 | 100 | 2,2 s | 0 ms | 0 |
| `/en/fiduciaries` | 96 | 100 | 100 | 100 | 2,3 s | 10 ms | 0 |

Point à surveiller : le bundle principal passe de 142,6 à 166,8 ko gzip, parce que le contenu des deux langues y est. Avec les 20 ko des traceurs Lovable en production, le JavaScript du premier chargement dépasse 185 ko. La suite logique (non faite) est décrite dans `docs/i18n.md` : une route de mise en page par langue qui fournit le contenu par contexte, pour ne charger qu'une langue. Précision sur le constat « `backdrop-filter` absent » de l'audit visuel : la propriété non préfixée est bien dans la source et dans la feuille construite (13 occurrences) ; l'écart constaté en production n'a pas été reproduit et reste à vérifier sur le site publié.

## 7. Ce qui n'a pas été vérifié

- Positions réelles, impressions, trafic, backlinks, statut d'indexation : aucun accès à Search Console, Bing Webmaster ni à un outil de données de recherche. Volumes de recherche absents (section 3.1).
- Existence de la fiche Google Business Profile (mur de consentement Google) et présence LinkedIn (blocage 403).
- Données terrain Core Web Vitals (CrUX) : site trop récent, API PageSpeed en quota dépassé ; les mesures sont de laboratoire.
- ChatGPT, Perplexity et Claude non sondés ; seul Gemini l'a été.
- Rendu sur un vrai iPhone (flou de l'en-tête, zoom au focus, démarrage sonore de la vidéo) : Chromium headless seulement.
- Réglages Lovable et Cloudflare (traceurs, Brotli, HTTP/3, robots IA, règle www) : non accessibles.
- Contenu du PDF du dossier sécurité (derrière formulaire) et pages `/administrations` et `/pme` non capturées par l'audit visuel.
