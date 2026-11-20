# Audit GEO de lxstudio.ch : être cité par ChatGPT, Gemini, Perplexity, Claude et les AI Overviews

Date de l'audit : 05.11.2026. Périmètre : https://lxstudio.ch (15 URL du sitemap), robots.txt, llms.txt, signaux hors site, comparaison avec timekraft.ch et idealcom.ch/idealgpt, sonde Gemini (recherche ancrée) sur 5 questions.

## 0. Résumé

**Score GEO : 66 / 100.** Le site est techniquement prêt à être lu par les IA (robots explicitement autorisés, HTML complet côté serveur, llms.txt, JSON-LD, articles datés et signés). Il n'est pourtant cité par aucune des 4 questions de décideur posées à Gemini en recherche ancrée. Deux causes, toutes deux corrigeables :

1. **Le vocabulaire des requêtes n'est pas sur le site.** Les mots « souverain », « on-premise », « commune », « Cloud Act », « LLM » n'apparaissent dans aucune page (comptage sur le texte visible : 0 occurrence chacun). Or les requêtes d'expansion de Gemini sont « IA souveraine on-premise Suisse fiduciaire », « solutions IA on-premise fiduciaires Romandie », « IA sur site communes administrations Suisse romande », « solutions LLM on-premise Suisse ». Le site dit « IA locale », « installée chez vous », « dans vos murs » : excellent pour un humain, invisible pour la requête.
2. **La marque n'existe presque pas hors du site.** Aucune page LinkedIn liée, aucun `sameAs`, pas d'inscription Zefix, fiche local.ch non revendiquée, aucune vidéo YouTube, aucun article de presse, et « Bassecourt » comme « Tanguy Lachat » sont absents du texte visible des pages de service. Les IA citent des entités corroborées par plusieurs sources ; LX Studio n'a qu'une source : lui-même.

| Dimension | Poids | Note | Justification courte |
| --- | --- | --- | --- |
| Citabilité | 25 % | 72 | Réponses en tête d'article (47 à 104 mots), FAQ sur chaque page, sources fedlex/PFPDT ; mais vocabulaire de requête absent, prix et délais vagues, communes et police sans passage dédié |
| Lisibilité structurelle | 20 % | 78 | H1 unique, H2/H3 propres, listes, `dl` pour les calculs, FAQPage ; mais tableau comparatif en `div`, titres animés mot par mot, signature collée dans le texte extrait |
| Contenu multimodal | 15 % | 55 | Vidéo de démo avec transcription horodatée dans le HTML et VideoObject ; mais 0 image dans les 9 articles, aucun tableau, favicon en 404 |
| Autorité et marque | 20 % | 35 | Person + ProfessionalService en JSON-LD, clients nommés ; mais aucun signal tiers (voir section 6), nom « LX Studio » partagé avec au moins 5 autres entités |
| Accessibilité technique | 20 % | 85 | robots.txt explicite, SSR complet, même HTML servi à GPTBot, ClaudeBot et PerplexityBot, sitemap daté, canonical, lang fr-CH ; à vérifier : réglage Cloudflare « AI bots » |

## 1. Méthode

- Téléchargement de robots.txt, llms.txt, sitemap.xml et des 15 pages avec un navigateur simulé, puis avec les User-Agents GPTBot/1.2, ClaudeBot/1.0 et PerplexityBot/1.0 : 200 partout, tailles identiques (60 229 octets pour la page d'accueil quel que soit l'agent), donc pas de cloaking et pas de blocage par UA.
- Extraction du texte visible, des titres, des JSON-LD, des dates, des liens sortants ; comptage de mots par passage.
- Recherches de marque : Brave Search, Bing, DuckDuckGo, Mojeek (les trois derniers ont servi un captcha ou des résultats hors sujet), local.ch, search.ch, Zefix (API), moneyhouse, Wikidata, Wikipédia FR, YouTube, GitHub.
- Concurrents : timekraft.ch (robots, llms.txt, sitemap de 229 URL, 6 pages lues) et idealcom.ch/idealgpt (robots, sitemap, page lue avec ses 38 questions de FAQ).
- Sonde Gemini fournie par le coordinateur (`geo-probe.json`, 5 questions, ChatGPT non interrogé).

Aucun chiffre ci-dessous n'est estimé « de tête » : chaque passage cité est copié du HTML servi le 05.11.2026.

## 2. Accès des robots IA

Fichier : https://lxstudio.ch/robots.txt (691 octets, `text/plain; charset=utf-8`, servi par Cloudflare). Groupe `User-agent: *` avec `Allow: /`, puis 12 groupes nommés, chacun `Allow: /`, et `Sitemap: https://lxstudio.ch/sitemap.xml`. Aucun `Disallow`, aucune ligne `Content-Signal`, aucune ligne `License` (RSL).

| Robot | Rôle | Règle dans robots.txt | Test HTTP avec cet UA | Verdict |
| --- | --- | --- | --- | --- |
| GPTBot | OpenAI, entraînement | Groupe nommé, `Allow: /` | 200, HTML identique | Autorisé |
| OAI-SearchBot | OpenAI, index ChatGPT Search | Groupe nommé, `Allow: /` | non testé (même règle) | Autorisé |
| ChatGPT-User | OpenAI, navigation à la demande | Groupe nommé, `Allow: /` | non testé | Autorisé |
| ClaudeBot | Anthropic, exploration | Groupe nommé, `Allow: /` | 200, HTML identique | Autorisé |
| Claude-User, Claude-SearchBot | Anthropic, agents récents | Non nommés, couverts par `*` | non testé | Autorisé par défaut ; à nommer |
| anthropic-ai, Claude-Web | Anciens noms Anthropic | Groupes nommés | non testé | Autorisé (noms obsolètes, sans effet) |
| PerplexityBot | Perplexity, index | Groupe nommé, `Allow: /` | 200, HTML identique | Autorisé |
| Perplexity-User | Perplexity, à la demande | Groupe nommé | non testé | Autorisé |
| Google-Extended | Google, Gemini et grounding | Groupe nommé, `Allow: /` | sans objet | Autorisé (Gemini peut utiliser le site) |
| Googlebot | Google Search et AI Overviews | Couvert par `*` | sans objet | Autorisé |
| Bingbot | Bing, Copilot, ChatGPT Search (index Bing) | Couvert par `*` | sans objet | Autorisé |
| CCBot | Common Crawl (jeux d'entraînement) | Couvert par `*` | sans objet | Autorisé |
| Applebot-Extended | Apple Intelligence | Groupe nommé, `Allow: /` | sans objet | Autorisé |
| meta-externalagent | Meta AI | Groupe nommé | sans objet | Autorisé |
| Bytespider | ByteDance | Groupe nommé | sans objet | Autorisé |
| Amazonbot, DuckAssistBot, MistralAI-User, cohere-ai | Autres assistants | Non nommés, couverts par `*` | sans objet | Autorisés par défaut |

Points à corriger ou vérifier :

- Le commentaire du fichier (« Several of these read a site only when they find their own name here ») est inexact : selon la norme robots (RFC 9309), un robot non nommé applique le groupe `*`. Les groupes nommés sont utiles comme déclaration d'intention, pas comme condition d'accès. Aucun effet négatif.
- Ajouter explicitement `Claude-User`, `Claude-SearchBot`, `MistralAI-User`, `DuckAssistBot`, `Amazonbot`, `Googlebot`, `Bingbot` pour que la liste soit lisible d'un coup d'œil par un humain ou une IA qui l'inspecte.
- Le site est derrière Cloudflare (`server: cloudflare`, cookie `__cf_bm`). Depuis 2025 Cloudflare propose un blocage des robots IA au niveau du réseau, indépendant de robots.txt, et vérifie les robots par plage d'IP. Le test par User-Agent passe, mais seul le tableau de bord Cloudflare (Security, Bots, « AI Scrapers and Crawlers ») prouve que GPTBot ou ClaudeBot arrivant depuis leurs vraies IP ne sont pas bloqués. Non vérifiable depuis l'extérieur.
- RSL 1.0 : absent (`/.well-known/rsl.xml`, `/rsl.xml`, `/license.xml` en 404, pas de `License:` dans robots.txt, pas de `<link rel="license">`). Non bloquant ; utile seulement si LX Studio veut conditionner l'entraînement.
- Autres fichiers : `/llms-full.txt` 404, `/ai.txt` 404, `/humans.txt` 404, `/.well-known/security.txt` 404, `/favicon.ico` 404 et aucune balise `<link rel="icon">` dans le `<head>`.

## 3. llms.txt : verdict

Fichier : https://lxstudio.ch/llms.txt (4 607 octets, UTF-8, 200). Source dans le dépôt : `/Users/tanguylachat/souverain-dex/public/llms.txt`.

**Verdict : présent, bien écrit, conforme sur l'essentiel, trois écarts de forme et quatre manques de fond.**

Conformité au format llmstxt.org :

| Exigence | État | Détail |
| --- | --- | --- |
| H1 = nom du projet | Oui | `# LX Studio` |
| Blockquote de résumé | Oui | 6 lignes, dit le quoi (IA sur site), le où (Bassecourt, Suisse romande), le qui (Tanguy Lachat) |
| Texte libre avant les sections | Oui | Contact, langue, devise |
| Sections H2 contenant des listes de liens `[nom](url): notes` | Partiel | `## Pages` et `## Questions traitées dans les ressources` sont conformes (15 liens). `## Ce que fait LX Studio`, `## Ce que LX Studio ne fait pas` et `## Zone desservie` sont des listes sans lien : tolérées par les lecteurs courants, mais hors spécification stricte |
| Séparateur `: ` après le lien | Partiel | Le fichier écrit ` : ` (espace avant les deux-points, usage français). Les analyseurs stricts attendent `](url): ` |
| Section `## Optional` | Absente | Non obligatoire |
| `llms-full.txt` | Absent (404) | Recommandé pour donner le texte intégral des 15 pages en un fichier |

Qualité du contenu (ce qui aide une IA à citer) :

- Bon : promesse en une phrase, périmètre négatif (« Aucune création de site web, aucun référencement, aucun ERP sur mesure »), clients nommés (« Facchinetti Automobiles (BMW Delémont), Richoz Sanitaire (Genève), Oasis Drink »), 9 questions-titres des articles, zone desservie canton par canton.
- Manque 1 : aucune définition courte réutilisable (ce qu'est une « IA locale », en 2 lignes). C'est le passage qu'une IA copie le plus volontiers.
- Manque 2 : aucun des synonymes de requête (souveraine, on-premise, sur site, LLM, modèle ouvert).
- Manque 3 : aucun lien hors site (LinkedIn, local.ch, GitHub) ni date de mise à jour du fichier.
- Manque 4 : le dossier sécurité PDF est annoncé « sur demande » : non crawlable, donc non citable. Prévoir une version HTML ou un PDF public.

## 4. Citabilité passage par passage

Critères : réponse directe dans les 40 à 60 premiers mots, passage autonome (compréhensible sans contexte), longueur 100 à 170 mots pour le passage principal, entités nommées, chiffres sourcés, date visible.

| Page | Mots visibles | Passages citables (extraits, longueur) | Manques | Note /10 |
| --- | --- | --- | --- | --- |
| https://lxstudio.ch/ | 1 658 | FAQ de 9 questions avec réponses de 23 à 50 mots, reprises en FAQPage JSON-LD. Ex. « Où tournent mes données, exactement ? » : « Sur une machine installée dans vos locaux, branchée sur votre réseau. Pendant le traitement, aucun appel ne part vers un service externe. Les documents que vous confiez au système restent sur ce disque, chez vous. » (35 mots). « De quel matériel ai-je besoin ? » : « un Mac mini Apple (puce M4 Pro, 64 Go de mémoire unifiée), dont le prix figure dans le devis » (44 mots). Transcription vidéo horodatée en 8 blocs de 19 à 49 mots (« 0:34 Lue sur place. … la TVA, la référence de la facture QR : tout est extrait sur la machine, dans vos murs. »). Références : 3 clients en 12 à 17 mots. | H1 slogan sans définition. « Combien ça coûte ? » : « Sur devis après le diagnostic » ; « Combien de temps prend l'installation ? » : « Le délai est fixé dans le devis ». Ni « Bassecourt », ni « Tanguy Lachat », ni « souverain », ni « on-premise » dans le texte visible. Tableau « Une IA générique / LX Studio » rendu en `div`, pas en `<table>`. Titres H1/H2 découpés mot par mot pour l'animation (`aria-label` présent, `textContent` correct, donc lisible, mais fragile). 1 image sur 3 sans `alt`. | 7 |
| https://lxstudio.ch/fiduciaires | 994 | Chapeau de 39 mots : « Une IA installée sur une machine dans votre cabinet lit les pièces, les classe, les saisit dans Bexio et vous laisse valider. Rien ne part sur un serveur externe. Le produit tourne déjà en pilote dans un cabinet romand. » 4 blocs fonctionnels de 17 à 35 mots (lecture, classement, saisie Bexio, relances). FAQ de 5 questions, 19 à 36 mots. Mention datée : « Version 1.1 · 26.10.2026 · 4 pages ». | Aucun chiffre (pièces par semaine, taux de corrections, heures gagnées) alors que la méthode promet une mesure. Prix : « Sur devis ». Secret professionnel renvoyé au PDF non public. Pilote anonyme et non daté. Aucune référence à EXPERTsuisse, à la LSR ou à l'art. 321 CP sur cette page (ils sont ailleurs). H2 « Les autres vous vendent un serveur. Moi, je vous livre les pièces saisies. » sans paragraphe. | 6,5 |
| https://lxstudio.ch/administrations | 857 | Chapeau de 30 mots : « Une IA installée dans vos locaux rédige les premières versions de vos rapports à partir de vos notes et anonymise les documents avant transmission. Aucune donnée ne quitte votre réseau. » « Anonymisation » (28 mots : « Noms, adresses, plaques, numéros : les données personnelles sont repérées et remplacées… »). FAQ « Le système prend-il des décisions ? » : « Non. Il rédige des premières versions et propose des anonymisations. La décision et la signature restent humaines. » (17 mots). | Le mot « commune » n'apparaît pas ; « police » n'apparaît que dans l'intitulé « Polices et administrations ». Aucune base légale sur la page (secret de fonction art. 320 CP est sur /securite ; aucune loi cantonale). Aucun cas d'usage daté, aucune référence. « Combien ça coûte ? » en 13 mots. | 5 |
| https://lxstudio.ch/pme | 741 | Chapeau de 30 mots. FAQ « Pas d'abonnement, vraiment ? » : « Le système est acheté et installé chez vous. Le suivi mensuel des premiers mois est compris dans le devis. Ensuite, la maintenance fait l'objet d'un accord séparé, sans abonnement à un service cloud. » (33 mots). « Et si je change d'outil ? » (19 mots, bonne réponse autonome). | Aucun chiffre, aucun client cité sur la page (Richoz et Oasis Drink ne sont que sur l'accueil). Prix en 11 mots. | 5,5 |
| https://lxstudio.ch/securite | 1 462 | Meilleure page du site pour une IA. Chaque H2 ouvre par une phrase-réponse de 10 à 20 mots puis 3 à 4 puces de 9 à 84 mots. Architecture : « des modèles d'IA ouverts (familles Llama et Qwen), exécutés localement sur la machine par Ollama, avec une reconnaissance de texte locale (Tesseract) et un lecteur de factures QR » (43 mots). nLPD : « en vigueur depuis le 1er septembre 2023 … mesures de sécurité adaptées au risque (art. 8 LPD). Il ne s'agit pas d'une certification. » (58 mots). Secret professionnel : 84 mots citant l'art. 321 et l'art. 320 CP. Honnêteté citable : « Aucun test d'intrusion indépendant n'a encore été réalisé ; il sera documenté ici quand il aura lieu. » Ligne de sources (LPD RS 235.1, CP RS 311.0, PFPDT), lien fedlex. | Aucun `<table>`. Pas de « Cloud Act », pas de « souverain ». Versions des modèles « consignées dans le dossier » (non public). Le titre H2 « Architecture » n'est pas une question : une IA cherche « Quels modèles tournent sur la machine ? ». | 8 |
| https://lxstudio.ch/ressources | 795 | 9 résumés de 26 à 49 mots, dates visibles sur les cartes (23.09.2026, 24.10.2026). | Page hub, peu de valeur propre ; pas de définition, pas de regroupement par public (fiduciaire, commune, PME). | 6 |
| https://lxstudio.ch/ressources/ia-locale-entreprise-suisse | 1 584 | Définition en tête (47 mots, aussi en FAQPage) : « Une IA locale est un modèle d'intelligence artificielle qui tourne sur une machine installée dans l'entreprise, sans envoyer les données à un service externe. Une entreprise suisse la choisit quand ses dossiers ne peuvent pas quitter ses murs : secret professionnel, nLPD, contrats clients, ou simple prudence. » 4 points clés en puces. « Quel matériel il faut vraiment » (68 mots, Mac mini 64 Go). 3 raisons suisses (juridique art. 16 et 17 LPD, professionnelle, contractuelle). Sources : LPD du 25 septembre 2020, état au 1er septembre 2023 ; PFPDT. Auteur et date : « Par Tanguy Lachat, 24.10.2026, 7 min ». | La définition est répétée presque mot pour mot au paragraphe suivant (54 mots) : redondance inutile. Aucun des synonymes (souveraine, on-premise, LLM, modèle ouvert) : c'est pourtant l'article qui devrait les porter. Aucun tableau comparatif local / hébergé / cloud. Aucune image. | 8 |
| https://lxstudio.ch/ressources/chatgpt-nlpd-entreprise | 1 548 | Réponse en tête (54 mots). « Ce que la nLPD demande, en quatre points » avec articles 5, 6, 8, 16, 17, 19 LPD. Amendes : « jusqu'à 250 000 francs … (art. 60 LPD) ou … (art. 61 LPD) » (59 mots). Liste des données sensibles de l'art. 5 (77 mots) qui cite explicitement « un dossier de police ». Liens edoeb.admin.ch et fedlex. | Pas de « Cloud Act » (le mot que les concurrents et Gemini utilisent). Réponse répétée deux fois en tête. | 8,5 |
| https://lxstudio.ch/ressources/secret-professionnel-ia | 1 306 | Réponse en tête (47 mots) : « Oui, à condition que les dossiers ne soient révélés à personne… ». Énumération de l'art. 321 CP (71 mots). Nuance fiduciaires (68 mots : « Les fiduciaires ne sont pas toutes visées par cet article en tant que telles… »). Citation : « Le secret ne tient pas à la qualité de l'outil. Il tient à qui a vu le dossier. » | Aucune référence de jurisprudence ni d'association (EXPERTsuisse, FIDUCIAIRE|SUISSE) ; timekraft cite le Tribunal fédéral et EXPERTsuisse sur le même sujet. | 8 |
| https://lxstudio.ch/ressources/fiduciaire-automatiser-saisie-pieces-ia | 1 403 | Réponse en tête (48 mots). 5 étapes de 38 à 71 mots (« Pour les factures QR suisses, il lit directement le code QR, ce qui élimine les erreurs de saisie sur les montants et les références de paiement »). Liste `dl` « Ce que contient la mesure » (pièces par semaine, temps par pièce, part des factures QR…). Sources : LPD, art. 321 CP, SIX (facture QR). | Aucun chiffre du pilote (volume, taux de corrections). « Pour Abacus, Crésus ou WinBIZ, l'état du connecteur est précisé lors du diagnostic » : non citable. | 7,5 |
| https://lxstudio.ch/ressources/combien-coute-une-automatisation-ia-pme-suisse | 1 251 | Réponse en tête (104 mots) avec chiffres datés : « entre 2'000 et 10'000 CHF pour la mise en place d'un projet … (fourchettes relevées en septembre 2026 sur les sites publics du marché) ». Exemple de calcul (66 mots : 3'000 CHF par mois, 9'000 CHF, 500 CHF, « un peu plus de trois mois »). Liste `dl` des 3 lignes d'un devis. | Aucune fourchette LX Studio. « Chez moi, la demi-journée de mesure est facturée » alors que l'accueil affiche « Diagnostic, 30 minutes, gratuit » : cohérent (diagnostic gratuit, mesure payante) mais jamais dit en une phrase ; une IA peut lire une contradiction. | 7,5 |
| https://lxstudio.ch/ressources/ou-vivent-vos-donnees-quand-vous-utilisez-lia | 1 140 | Réponse en tête (82 mots) : trois options nommées. Option 1 (38 mots) : « Aucune donnée ne quitte votre réseau, et c'est vérifiable : un prestataire informatique peut observer le trafic sortant et constater qu'il n'y en a pas. » | « Cloud Act » absent ; aucun hébergeur suisse nommé en option 2 ; aucun tableau. | 7 |
| https://lxstudio.ch/ressources/chatgpt-copilot-ou-agent-sur-mesure | 1 097 | Réponse en tête (104 mots) avec « de l'ordre de 20 à 30 CHF par personne et par mois ». Règle de décision en `dl` (4 cas). | La règle de décision ignore la question des données (aucune ligne « dossiers qui ne peuvent pas sortir : IA locale »), surprenant pour le positionnement du site. | 7,5 |
| https://lxstudio.ch/ressources/mesurer-le-temps-qu-une-tache-coute-vraiment | 1 111 | Réponse en tête (77 mots). Exemple chiffré en `dl` : « 15 h par semaine », « 55 CHF », « 15 × 55 × 4,3 ≈ 3'550 CHF », « environ 2'840 CHF ». | Hors cible GEO directe (méthode), mais bon passage de soutien. | 7,5 |
| https://lxstudio.ch/ressources/plateforme-automatisation-ou-code | 1 235 | Réponse en tête (104 mots). 5 puces de 22 à 38 mots. Frontière plateforme / code en `dl`. | Hors cible (Zapier, Make, n8n) ; n'attire pas les requêtes « IA locale ». | 7 |

Observations transversales :

- **Signature collée.** Le texte extrait des articles donne « Par Tanguy Lachat24.10.20267 min de lecture » : les séparateurs sont en CSS. Un extracteur texte (c'est ce que lisent les IA) lit « 20267 min ». Mettre des séparateurs textuels (« Par Tanguy Lachat · 24.10.2026 · 7 min de lecture ») et un libellé « Mis à jour le ».
- **Réponse en tête dupliquée.** Dans 4 articles, le paragraphe de réponse (47 à 54 mots) est suivi d'un paragraphe quasi identique. Garder une seule version, de 60 à 90 mots, avec les synonymes.
- **FAQ répétées.** « Combien ça coûte ? » figure sur 4 pages avec la même réponse « Sur devis ». Une IA en déduit que le site ne répond pas à la question. Les concurrents, eux, donnent un ordre de grandeur ou un modèle (voir section 8).
- **Entités absentes du texte visible.** Comptage sur les 5 pages de service : « Bassecourt » 0, « Tanguy Lachat » 0 (présent uniquement en JSON-LD et dans les signatures d'articles), « souverain » 0, « on-premise » 0, « commune » 0, « Cloud Act » 0, « LLM » 0, « Apertus » 0, « CHF » 0.
- **Ce qui est bien et doit rester** : une question par article avec la réponse dès la première phrase ; FAQPage, Article, Person, ProfessionalService, BreadcrumbList, VideoObject en JSON-LD ; dates ISO en `datePublished` et `dateModified` ; sources en bas de page avec liens fedlex et edoeb ; vouvoiement, français de Suisse, montants `2'000 CHF`.

## 5. Les 15 questions des décideurs et la réponse du site

| # | Question probable (fiduciaire, commune, police, PME) | Page | Passage citable | Verdict |
| --- | --- | --- | --- | --- |
| 1 | Qu'est-ce qu'une IA locale, souveraine ou on-premise pour une entreprise ? | /ressources/ia-locale-entreprise-suisse | Définition de 47 mots en tête (citée en section 4) | Partiel : répond pour « IA locale », pas pour « souveraine » ni « on-premise » (mots absents) |
| 2 | Quelle entreprise installe une IA directement dans les locaux des fiduciaires en Suisse romande ? | /fiduciaires | « Une IA installée sur une machine dans votre cabinet… Le produit tourne déjà en pilote dans un cabinet romand. » (39 mots) | Partiel : aucune phrase ne dit « LX Studio, à Bassecourt, installe… en Suisse romande » dans le texte visible ; Gemini cite Wiven AI, i-fixit, All-in Solution, GeniusCount, Agence iA, Mivelaz |
| 3 | Une fiduciaire peut-elle utiliser l'IA sur ses dossiers sans violer le secret professionnel ? | /ressources/secret-professionnel-ia | « Oui, à condition que les dossiers ne soient révélés à personne… » (47 mots) + art. 321 CP | Oui |
| 4 | Utiliser ChatGPT avec des données clients est-il conforme à la nLPD ? | /ressources/chatgpt-nlpd-entreprise | Réponse de 54 mots + art. 5, 6, 8, 16, 17, 19, 60, 61 LPD | Oui |
| 5 | Combien coûte une IA locale pour une fiduciaire ou une PME ? | /ressources/combien-coute… et FAQ | « entre 2'000 et 10'000 CHF … relevées en septembre 2026 » (marché) ; LX : « Sur devis » | Partiel : fourchette du marché, pas celle de LX Studio |
| 6 | Combien de temps prend l'installation ? | / (FAQ) | « Le délai est fixé dans le devis et court à compter de sa validation » (33 mots) | Partiel : aucune durée ; IdealGPT dit « entre 10 et 20 jours ouvrés », TimeKraft « 2 à 3 semaines » |
| 7 | Quel matériel faut-il ? | / (FAQ), article IA locale | « un Mac mini Apple (puce M4 Pro, 64 Go de mémoire unifiée) » (44 mots) | Oui |
| 8 | Quels modèles d'IA tournent en local ? | /securite | « modèles d'IA ouverts (familles Llama et Qwen), exécutés localement… par Ollama » (43 mots) | Partiel : dans une puce sous « Architecture », pas sous une question ; pas de version, pas d'Apertus, Mistral ou Gemma |
| 9 | Compatible avec Bexio, Abacus, Crésus, WinBIZ ? | /fiduciaires (FAQ) | « Bexio : oui. Abacus, Crésus et WinBIZ : l'état du connecteur est précisé lors du diagnostic » (19 mots) | Oui pour Bexio ; vague pour les trois autres |
| 10 | Une commune peut-elle traiter les données des citoyens avec une IA sur site (secret de fonction, loi cantonale) ? | aucune | Seul passage : art. 320 CP dans une puce de /securite | Non : ni « commune », ni loi cantonale (LIPAD GE, LPrD VD, CPDT-JUNE JU/NE), ni cas d'usage. IdealGPT et TimeKraft ont chacun une réponse dédiée |
| 11 | Une police peut-elle rédiger ses rapports et anonymiser ses documents avec une IA sans que rien ne sorte ? | /administrations | Chapeau 30 mots + « Anonymisation » 28 mots | Partiel : « police » absent du corps de page ; aucune base légale ; aucun exemple |
| 12 | Mes données partent-elles aux États-Unis ? Et le Cloud Act ? | /ressources/ou-vivent-vos-donnees… | 82 mots, 3 options | Partiel : « Cloud Act » jamais nommé (timekraft : 24 occurrences sur sa page IA souveraine) |
| 13 | Quelle différence avec ChatGPT Entreprise ou Copilot ? | / (FAQ), article ChatGPT/Copilot/agent | « Ces outils tournent sur les serveurs de leur éditeur… Ici, l'IA tourne chez vous et fait une tâche précise toute seule » (39 mots) | Oui |
| 14 | Que se passe-t-il si le prestataire disparaît ou en fin de contrat ? | / (FAQ), /securite | « La machine et le système restent chez vous. Le code et la documentation vous sont remis à l'installation » (26 mots) | Oui |
| 15 | Qui est LX Studio, où est l'entreprise, quelles références ? | / (références), JSON-LD | 3 références de 12 à 17 mots ; Person et adresse en JSON-LD seulement | Partiel : pas de page À propos, Bassecourt et Tanguy Lachat absents du texte visible des pages de service |

Bilan : 6 Oui, 8 Partiel, 1 Non. La question « Faut-il une connexion internet ? » (FAQ accueil, 23 mots) est aussi couverte, et bien.

## 6. Signaux de marque hors site

| Source | Trouvé ? | Détail observé le 05.11.2026 | Action |
| --- | --- | --- | --- |
| local.ch | Oui | https://www.local.ch/fr/d/bassecourt/2854/lx-studio-xEPs7H4uAIxvyhFpUfwSlA : « LX Studio, Conseil en intelligence artificielle et automatisation · Lachat Tanguy, Rue des Romains 25, 2854 Bassecourt, 078 703 88 00 ». Mention « Entreprise non revendiquée ». JSON-LD LocalBusiness présent sur la fiche | Revendiquer la fiche, ajouter site, description, catégorie, horaires |
| search.ch | Oui | https://search.ch/tel/?was=LX+Studio&wo=Bassecourt : même entrée (source Localsearch), site lxstudio.ch lié, « Es gibt noch kein Gästefeedback » | Compléter via Localsearch |
| Zefix (registre du commerce) | Non | Recherche « LX Studio » : seul résultat « Studio LX GmbH », Zurich, CHE-438.553.456 (sans rapport). « Lachat » : 20 entreprises, aucune LX Studio ni Tanguy Lachat | Inscription au RC dès que le chiffre d'affaires le justifie : donne un IDE et une entité officielle que les IA peuvent recouper |
| moneyhouse | Non | Même homonyme zurichois | Suit Zefix |
| LinkedIn | Non vérifiable | linkedin.com répond 403/999 aux requêtes automatiques. Aucun lien LinkedIn sur le site, aucun `sameAs` dans le JSON-LD, aucun résultat LinkedIn dans Brave pour « Tanguy Lachat » | Créer ou relier la page entreprise et le profil, les déclarer en `sameAs` |
| Google Business Profile | Non vérifiable | Google exige JavaScript ; non testé par outil | Vérifier à la main ; créer si absent (adresse Rue des Romains 25, catégorie « Consultant en informatique » ou équivalent) |
| Bing Places / index Bing | Non vérifiable | Bing a servi des résultats hors sujet aux requêtes automatisées | Vérifier `site:lxstudio.ch` sur Bing à la main : c'est l'index de ChatGPT Search et de Copilot |
| Brave Search (index de Claude) | Oui | lxstudio.ch en tête pour « LX Studio » Bassecourt et pour « Tanguy Lachat » | Rien à faire |
| Wikipédia / Wikidata | Non | 0 résultat pour « LX Studio » Bassecourt et « Tanguy Lachat » | Créer un élément Wikidata (organisation, siège, fondateur, site) une fois les sources tierces disponibles |
| YouTube | Non | 0 résultat pour « LX Studio » Bassecourt IA. La vidéo de démo existe pourtant (https://lxstudio.ch/demo/demo-lx-studio.mp4, 2 min, transcription écrite) | Publier la démo sur une chaîne LX Studio avec la transcription ; corrélation la plus forte avec les citations IA |
| Reddit | Non vérifiable | API bloquée ; aucune mention via Brave | Pas prioritaire pour cette cible |
| Presse | Non (business) | Brave renvoie pour « Tanguy Lachat » des articles sportifs (lqj.ch, watson.ch, athle.ch 2018 « médaille de bronze au 4 x 100 m pour Bassecourt ») sans lien établi avec LX Studio ; aucun article sur l'entreprise | Un article dans Le Quotidien Jurassien ou arcinfo sur « la première IA installée au cabinet dans le Jura » vaudrait plus que dix pages de blog |
| GitHub | Oui | Dépôt public tanguylachat-boop/souverain-dex (PR #16 « refonte IA locale », PR #17) indexé par Brave. Confirmé `private: false` via l'API GitHub | Décider si le code du site doit être public ; si oui, remplir description et site dans le dépôt |
| Collision de nom | Problème | « LX Studio » désigne aussi lxstudio.com (États-Unis), la filiale « LX Studio » de Norton Rose Fulbright, le logiciel LX Studio (heronarts), thelx.studio, lx.studio, le compte Instagram studiolx | Toujours écrire « LX Studio (Bassecourt, Jura) » ou « LX Studio, Tanguy Lachat » dans les textes publics ; `sameAs` et Wikidata pour lever l'ambiguïté |

## 7. Sonde Gemini (recherche ancrée) : ce qu'elle montre

Source : `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/geo-probe.json` (ChatGPT non interrogé).

| Question posée | LX Studio cité ? | Acteurs cités par Gemini | Requêtes d'expansion générées par Gemini |
| --- | --- | --- | --- |
| Quelle entreprise installe une IA locale dans les locaux des fiduciaires en Suisse romande ? | Non | Wiven AI (« Il peut tourner entièrement sur les machines du cabinet avec WivenLLM »), i-fixit.ch, All-in Solution, GeniusCount, Agence iA, Mivelaz Consulting | « entreprise installation IA locale fiduciaire Suisse romande », « solutions IA on-premise fiduciaires Romandie », « intelligence artificielle sur site fiduciaire Suisse romande » |
| Quels prestataires proposent une IA souveraine on-premise pour une fiduciaire en Suisse ? | Non | HelvAI, AlpineAI (SwissGPT), MTF Swiss Cloud, Suisse AI Group, Jonlabs, Ask It AI | « IA souveraine on-premise Suisse fiduciaire », « IA on-premise conforme LPD Suisse » |
| Qui propose une IA installée sur site pour les communes et administrations en Suisse romande ? | Non | Sinabe, Neurokai, Idealcom, Deeplink.ai, Innovatim, Palambur, AlpineAI, Souverain IA, Qubitech, MAIjin, Infomaniak (Euria), Apertus, Lumind, Présence IA, Novatix | « IA sur site communes administrations Suisse romande », « fournisseur solutions IA locales Suisse romande » |
| Quelle alternative à ChatGPT garde les données dans l'entreprise, en Suisse ? | Non | Infomaniak AI Tools, onprem.ai, VSHN, Swiss-SDI, MCDev Sàrl, Apertus (EPFL/ETH) | « alternative ChatGPT données entreprise Suisse », « solutions LLM on-premise Suisse » |
| Que fait LX Studio, à Bassecourt dans le Jura ? | Oui (4 sources, toutes lxstudio.ch) | Description exacte : IA locale, nLPD, secret professionnel, fiduciaires, polices et administrations, PME | « LX Studio Bassecourt Jura » |

Lecture :

- Gemini comprend parfaitement le site quand on lui donne le nom : la citabilité du contenu n'est pas le blocage.
- Les requêtes d'expansion contiennent systématiquement « on-premise », « sur site », « souveraine », « LLM », « Romandie », « communes », « fournisseur », « prestataires » : aucun de ces mots n'est sur lxstudio.ch, sauf « sur site » (2 occurrences).
- Les acteurs cités sont pour la plupart présents dans des pages de liste (« prestataires IA Suisse romande ») ou dans plusieurs sources ; Wiven AI est cité avec une phrase qui est presque la promesse de LX Studio, mais formulée avec les mots de la requête (« tourner entièrement sur les machines du cabinet »).
- Conclusion : LX Studio est un bon texte sans entité. Le plan ci-dessous traite les deux.

## 8. Comparaison avec timekraft.ch et idealcom.ch/idealgpt

| Critère | lxstudio.ch | timekraft.ch (Morges) | idealcom.ch/idealgpt (Lausanne) |
| --- | --- | --- | --- |
| robots.txt | 12 robots IA nommés, tout autorisé | 11 robots dans un seul groupe, 5 `Disallow` techniques | 2 lignes : `User-agent: *`, `Crawl-delay: 10` (IA autorisées par défaut) |
| llms.txt | 4,6 Ko, 15 liens | 24,9 Ko : à propos, services, cas en production avec chiffres (« ~20% du temps du dirigeant rendu »), 6 univers de contenu, LinkedIn, blog | Absent (404) |
| Pages indexables | 15 | 229 URL dans le sitemap | Sitemap Yoast (pages, posts, portfolio, FAQ) |
| Page « IA souveraine » | Aucune (mot absent) | https://timekraft.ch/ia-souveraine-suisse/ : 3 514 mots, « souverain » 74 fois, « Cloud Act » 24 fois, « nLPD » 53 fois, FAQ et Article en JSON-LD | Page IdealGPT : 4 560 mots, « souverain » 88 fois, définition en tête de FAQ : « L'IA souveraine est une infrastructure d'intelligence artificielle dont l'ensemble de la chaîne : données, modèles, calcul et stockage reste sous le contrôle exclusif de l'organisation qui l'utilise. » |
| Page communes | Aucune | https://timekraft.ch/ia-administrations-communales/ : 2 600 mots, « commune » 36 fois, LIPAD, Apertus 17 fois | FAQ dédiée : « L'IA souveraine est-elle adaptée aux communes et aux institutions publiques ? Oui. Les communes, les cantons et les institutions publiques traitent des données citoyennes soumises à la LIPAD et à la nLPD… » |
| Page police | Aucune (intitulé seulement) | Aucune (« police » 0) | Aucune (« police » 0) |
| Page fiduciaires | 994 mots, 5 FAQ | https://timekraft.ch/ia-fiduciaires-suisse/ : 3 273 mots, 10 FAQ (ChatGPT en fiduciaire, art. 321 et Tribunal fédéral, modèles conformes, délai « entre quatre et huit semaines », LSR, EXPERTsuisse), schémas Service, Offer, LocalBusiness | 2 mentions |
| Prix | « Sur devis » partout ; article marché 2'000 à 10'000 CHF | FAQ : « abonnement mensuel tout compris … engagement 12 mois », « 2 à 3 semaines » pour la première automatisation | FAQ : « forfait tout inclus couvrant le serveur physique, les logiciels, la configuration, la formation et la maintenance. Il n'y a pas d'abonnement mensuel » ; ROI : « rentabilisée en moins de 6 mois » ; délai « entre 10 et 20 jours ouvrés » |
| Modèles nommés | Llama, Qwen, Ollama, Tesseract (sur /securite) | Gemma 4, Mistral, Llama 3, Apertus, Infomaniak Genève | Llama, Mistral, Qwen, DeepSeek, Apertus ; matériel NVIDIA GB10 |
| Nombre de FAQ IdealGPT / TimeKraft / LX | 9 + 5 + 4 + 4 (+ 1 par article) | 11 sur la FAQ, 10 sur fiduciaires, 6 sur IA agentique | 38 sur une seule page, toutes en FAQPage JSON-LD |
| Auteur visible | Articles signés, Person en JSON-LD, pas de page À propos | Page À propos, LinkedIn dans llms.txt, « Brevet fédéral IA Business en cours » | Agence, équipe, atelier à Lausanne, numéro de téléphone |
| Définitions | 1 (IA locale) | Pages « Qu'est-ce qu'un agent IA », « IA agentique : expliquée en trois phrases », « Souverain, ce que ça veut dire vraiment » | Définition IA souveraine, différence IA souveraine / cloud public |
| Différenciation réelle de LX | Machine physiquement chez le client, tâche livrée, mesure avant/après, Mac mini, honnêteté sur le test d'intrusion | Hébergé chez Infomaniak (pas on-premise), abonnement | Serveur chez le client, mais chat généraliste (« copier-coller un dossier médical complet »), pas de tâche automatisée mesurée |

Ce que les deux concurrents offrent aux IA et que LX Studio n'offre pas : le mot « souveraine » et le mot « commune » en titre de page, une FAQ de 10 à 38 questions sur une seule URL, un délai et un modèle de prix en une phrase, des modèles d'IA nommés avec leur hébergeur, des lois cantonales nommées, une page auteur, et pour TimeKraft un llms.txt avec des cas en production chiffrés et un lien LinkedIn.

Ce que LX Studio a de plus et doit exploiter : la seule vraie machine « dans les murs » du marché romand avec une tâche livrée (IdealGPT vend un chat, TimeKraft héberge chez Infomaniak), une vidéo de démo transcrite, une page sécurité qui dit ce qui n'est pas fait, des clients nommés (Facchinetti Automobiles, Richoz Sanitaire, Oasis Drink).

## 9. Plan GEO priorisé

Règle de pricing rappelée : toute fourchette publiée est validée par Tanguy avant mise en ligne.

### P0 : cette semaine (moins d'une journée au total, effet immédiat sur les requêtes d'expansion)

| # | Action | Où | Effort |
| --- | --- | --- | --- |
| 1 | **Réécrire la définition en tête de l'article IA locale** avec les synonymes, une seule fois (supprimer le doublon) : « Une IA locale, aussi appelée IA souveraine, IA on-premise ou IA sur site, est un modèle de langage (LLM) ouvert qui tourne sur une machine installée dans les locaux de l'entreprise, sans envoyer les documents à un service externe. En Suisse romande, une fiduciaire, une commune, une police ou une PME la choisit quand ses dossiers ne peuvent pas quitter ses murs : secret professionnel (art. 321 CP), secret de fonction (art. 320 CP), nLPD, contrats clients. LX Studio, à Bassecourt (Jura), installe ce type de système chez ses clients. » (environ 95 mots). Reporter la même phrase de synonymes dans la FAQ « Où tournent mes données » de l'accueil et dans le blockquote du llms.txt | `src/routes/ressources.$slug.tsx` (contenu), `public/llms.txt` | 1 h |
| 2 | **Faire exister l'entité dans le texte visible** : bloc « LX Studio est dirigé par Tanguy Lachat, ingénieur IA, à Bassecourt (Jura). Clients équipés : … » sur l'accueil (au-dessus du pied de page) et dans le pied de page de toutes les pages (adresse postale complète, comme sur local.ch) | `__root.tsx` (pied de page), `index.tsx` | 1 h |
| 3 | **`sameAs` dans le JSON-LD** de l'organisation et de la personne : LinkedIn (page et profil), local.ch, search.ch, GitHub si le dépôt reste public ; et un lien LinkedIn visible dans le pied de page | `src/lib/seo.ts` | 30 min |
| 4 | **Revendiquer la fiche local.ch** (« Entreprise non revendiquée ») et créer ou vérifier Google Business Profile et Bing Places avec la même adresse, le même numéro et le même descriptif que le site | Localsearch, Google, Bing | 1 h |
| 5 | **Publier la démo sur YouTube** (fichier `demo-lx-studio.mp4` existant, transcription déjà écrite) avec titre « IA locale pour fiduciaire : une pièce comptable traitée au cabinet, sans sortir des murs (LX Studio, Jura) », description reprenant la définition du point 1, et ajouter `embedUrl` au VideoObject | YouTube, `seo.ts` | 1 h |
| 6 | **Hygiène technique** : favicon (`<link rel="icon">` + fichier), redirection www vers apex en 301 au lieu de 302, nommer `Claude-User`, `Claude-SearchBot`, `MistralAI-User`, `DuckAssistBot`, `Amazonbot`, `Googlebot`, `Bingbot` dans robots.txt, générer `llms-full.txt` (concaténation des 15 pages en Markdown), séparateurs textuels dans la signature des articles | `public/`, Cloudflare ou Lovable | 1 h |
| 7 | **Vérifier Cloudflare** : Security, Bots, « AI Scrapers and Crawlers » et « Block AI bots » désactivés, pas de robots.txt géré injecté | Tableau de bord Cloudflare | 10 min |

### P1 : ce mois (pages à créer, passages à réécrire)

Pages à créer (chaque page : question en H1, réponse en 60 à 90 mots dès le premier paragraphe, FAQ de 6 à 10 questions en FAQPage, entités nommées, date de mise à jour visible, sources) :

1. **/ia-souveraine-suisse** : « Qu'est-ce qu'une IA souveraine et quelle différence avec une IA locale ou hébergée en Suisse ? ». Tableau HTML à trois colonnes (sur votre machine / hébergée chez un prestataire suisse / cloud américain) avec les critères : où sont lues les données, Cloud Act, nLPD art. 16 et 17, secret professionnel, coût, performance. Nommer les options réelles du marché (Infomaniak, Apertus, ChatGPT Entreprise, Copilot) : la co-citation avec des entités connues est ce qui fait entrer LX Studio dans les listes que Gemini compile.
2. **/communes** : « Une commune peut-elle utiliser une IA sur site pour ses procès-verbaux, ses courriers et ses demandes de citoyens ? ». Secret de fonction (art. 320 CP), loi cantonale applicable (LIPAD à Genève, LPrD dans le canton de Vaud, CPDT-JUNE pour le Jura et Neuchâtel ; à faire vérifier par un conseil), marchés publics, exemples de tâches (PV de séance, réponses au guichet, anonymisation avant publication).
3. **/police** : « Une police peut-elle rédiger ses rapports et anonymiser ses documents avec une IA sans qu'une donnée ne sorte ? ». Données sensibles de l'art. 5 LPD (poursuites et sanctions pénales), secret de fonction, journalisation, validation et signature humaines, exemple de flux (notes, PV, rapport, caviardage).
4. **/a-propos** : Tanguy Lachat (parcours daté, Bassecourt, ce qu'il fait lui-même, ce qu'il ne fait pas), LX Studio (date de création, clients, zone), photo, liens LinkedIn. C'est la page que les IA lisent pour répondre « qui est… ».
5. **/alternative-chatgpt-suisse** : « Quelle alternative à ChatGPT garde les données dans l'entreprise, en Suisse ? ». Comparatif honnête : ChatGPT Entreprise, Copilot, Infomaniak Euria, Apertus auto-hébergé, IA locale installée par LX Studio ; quand chacun convient.
6. **/glossaire** : 10 définitions de 40 à 60 mots chacune, une ancre par terme : IA locale, IA souveraine, on-premise, LLM ouvert, Ollama, nLPD, secret professionnel (art. 321), secret de fonction (art. 320), Cloud Act, facture QR.
7. **Étude de cas datée** (fiduciaire pilote ou Facchinetti, avec accord écrit du client) : volume traité, heures mesurées avant et après, taux de corrections, date de mise en service. Un seul chiffre mesuré vaut plus qu'une page d'arguments.

Passages à réécrire :

- `/administrations`, chapeau : « Une IA installée sur les serveurs d'une commune, d'un service cantonal ou d'un corps de police rédige les premières versions des rapports et anonymise les documents avant transmission. Aucune donnée ne quitte le réseau de l'administration ; le secret de fonction (art. 320 CP) et la loi cantonale sur la protection des données sont respectés par construction. » Ajouter deux FAQ : « Et le secret de fonction ? », « Quelle loi cantonale s'applique ? ».
- FAQ « Combien ça coûte ? » (4 pages) : remplacer « Sur devis » par le modèle de prix en une phrase (machine achetée, installation facturée en heures, suivi des premiers mois compris, maintenance séparée) et, après validation par Tanguy, une fourchette indicative ; une réponse différente par page (fiduciaire : par volume de pièces ; administration : par type de document ; PME : par tâche).
- FAQ « Combien de temps prend l'installation ? » : donner une durée réelle observée sur le pilote (« X semaines entre la mesure et la mise en service, validation sur vos vrais dossiers comprise »).
- `/securite`, section « Architecture » : ajouter un H3 question « Quels modèles d'IA tournent sur la machine ? » avec les noms et versions utilisés (Llama, Qwen, Ollama, Tesseract) et la politique de mise à jour ; ajouter une section « Cloud Act » de 60 mots.
- `/fiduciaires` : nommer le logiciel et le cabinet pilote (ou au moins le canton et la taille), citer EXPERTsuisse ou FIDUCIAIRE|SUISSE comme cadre déontologique, ajouter une ligne chiffrée.
- Article « ChatGPT, Copilot ou un agent sur mesure » : ajouter dans la règle de décision la ligne « Les dossiers ne peuvent pas sortir : IA locale installée chez vous ».
- Tableau « Une IA générique / LX Studio » de l'accueil : passer en `<table>` avec `<th>`.

### P2 : ce trimestre (corroboration hors site et mesure)

- Presse régionale : proposer au Quotidien Jurassien et à arcinfo un sujet daté et vérifiable (première installation d'une IA au cabinet dans le Jura, avec le client). Un article de presse est la source tierce la plus pondérée par Gemini et les AI Overviews.
- Listes de prestataires : les sources de Gemini sont des pages « prestataires IA Suisse romande ». Identifier celles qui citent Wiven AI, Neurokai, Sinabe ou Idealcom et demander l'ajout de LX Studio avec le descriptif du point P0-1.
- LinkedIn : une publication par semaine signée Tanguy Lachat, reprenant chaque fois un passage citable du site (définition, chiffre mesuré, FAQ) avec le lien de la page.
- Registre du commerce : inscription dès que le seuil est atteint, pour obtenir un IDE et une fiche Zefix ; lever l'homonymie avec Studio LX GmbH.
- Wikidata : créer l'élément « LX Studio (Bassecourt) » avec site officiel, fondateur, siège, dès qu'une source tierce existe.
- Mesure mensuelle : reposer les 5 questions de la sonde à Gemini, ChatGPT (recherche), Perplexity et Claude ; noter qui est cité et avec quelle phrase ; consigner dans le vault (`2-areas/marketing/PERFORMANCE-LOG.md`).

## 10. Score IA sur 100 et scores par plateforme

Calcul : 72 × 0,25 + 78 × 0,20 + 55 × 0,15 + 35 × 0,20 + 85 × 0,20 = 65,85, arrondi à **66 / 100**.

Pourquoi pas plus : 0 citation sur 4 questions de décideur dans la sonde Gemini ; vocabulaire de requête absent ; aucune source tierce ; communes et police sans passage ; prix et délais non citables.
Pourquoi pas moins : accès total des robots, HTML complet, llms.txt, JSON-LD complet (Article, FAQPage, Person, VideoObject), réponses en tête d'article, sources légales liées, dates, clients nommés, honnêteté sur ce qui n'est pas fait. Le site est reconnu correctement dès qu'on le nomme.

Scores par plateforme (estimations à partir de l'accès, de l'index utilisé par chaque moteur et de la sonde ; aucune mesure ChatGPT ou Perplexity en direct n'a pu être faite) :

| Plateforme | Score estimé | Ce qui compte | État observé |
| --- | --- | --- | --- |
| Gemini et Google AI Overviews | 45 | Index Google, Google-Extended, entité (Business Profile, Wikidata, sources tierces), vocabulaire des requêtes d'expansion | Google-Extended autorisé ; sonde ancrée : 0 citation sur 4 ; entité non corroborée ; Business Profile non vérifié |
| ChatGPT (recherche) | 55 | OAI-SearchBot, index Bing, pages avec réponse directe | OAI-SearchBot autorisé ; présence dans l'index Bing non vérifiable par outil ; contenu adapté |
| Perplexity | 60 | PerplexityBot, fraîcheur, structure question / réponse, sources citées | Autorisé, articles datés et sourcés, FAQ ; vocabulaire manquant |
| Claude (recherche web via l'index Brave) | 60 | ClaudeBot, index Brave, passages autonomes | Autorisé ; lxstudio.ch bien positionné dans Brave sur le nom ; entité faible sur les requêtes génériques |
| Microsoft Copilot | 50 | Index Bing, Bingbot, Bing Places | Bingbot autorisé par `*` ; index et Bing Places non vérifiés |

## 11. Ce qui n'a pas pu être vérifié

- ChatGPT, Perplexity et Claude n'ont pas été interrogés en direct (champ `chatgpt: null` dans la sonde ; aucun outil DataForSEO disponible). Seul Gemini a été sondé.
- Index Bing et Google de lxstudio.ch : les moteurs ont servi des captchas ou des résultats hors sujet aux requêtes automatisées.
- Google Business Profile, page LinkedIn, Reddit : inaccessibles aux outils.
- Réglage Cloudflare pour les robots IA (vérifiable uniquement dans le tableau de bord).
- Contenu du dossier sécurité PDF (formulaire obligatoire).

## Fichiers de travail

- Rapport : `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/geo.md`
- Pages téléchargées et textes extraits : `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/raw/` et `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/text/`
- Analyse structurée : `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/pages_analysis.json`
- Sonde Gemini : `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/geo-probe.json`
- Sources du site : `/Users/tanguylachat/souverain-dex/public/robots.txt`, `/Users/tanguylachat/souverain-dex/public/llms.txt`, `/Users/tanguylachat/souverain-dex/src/lib/seo.ts`
