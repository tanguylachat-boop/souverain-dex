# Audit contenu et E-E-A-T : lxstudio.ch

Date : 05.11.2026. Cadre : Quality Rater Guidelines Google de septembre 2025 (E-E-A-T, contenu mince, marqueurs de contenu généré, Helpful Content intégré au cœur de l'algorithme depuis mars 2024).

Périmètre : les 15 URL du sitemap (accueil, 4 pages métier et sécurité, hub Ressources, 9 articles), lues en entier à partir du HTML rendu côté serveur (curl, 200 sur les 15). Pages concurrentes lues en entier ou en grande partie : timekraft.ch (accueil, ia-souveraine-suisse, ia-fiduciaires-suisse, automatisation-saisie-factures-fiduciaire-suisse, ia-administrations-communales, ia-pour-pme-suisse, confidentialite, assistant-ia-souverain, page auteur, 2 articles de blog), idealcom.ch (idealgpt, ia/ia-souveraine-suisse, ia/idealgpt, ia/idealgpt/communes), infomaniak.com/fr/euria, counteo.ch (accueil, à propos, blog, automatisation-releves-pdf), local-ia.ch (page unique), mont3.ch (accueil, fr/local-ai, article fiduciario ticinese).

Méthode de comptage : « mots total » = tout le texte de la page ; « mots utiles » = corps de page sans en-tête, pied de page, formulaires, bloc « À lire ensuite » et formulaire du dossier sécurité. Lisibilité : Flesch adapté au français (Kandel et Moles), longueur moyenne de phrase, phrases de plus de 25 mots. Aucun chiffre de ce rapport n'est estimé : tout vient des pages lues, et chaque constat cite le passage.

Fichiers de travail : `/private/tmp/claude-502/-Users-tanguylachat-lx-salon/72ffbeaf-2196-4cb9-b41b-3ecad87c1f99/scratchpad/seo/` (HTML bruts dans `raw/`, texte lisible dans `txt/`, extractions dans `main_extract.json` et `articles_extract.json`).

---

## 1. Score contenu : 56 / 100

| Composante | Poids | Note | Contribution | Justification courte |
|---|---|---|---|---|
| E-E-A-T | 40 % | 54 | 21,6 | Confiance forte (identité, IDE, sécurité honnête), expérience et autorité faibles (aucun chiffre, aucun témoignage, aucun avis, pas de page auteur) |
| Profondeur et couverture face aux concurrents | 25 % | 45 | 11,3 | 3 pages métier sur 4 sous le seuil (478 à 648 mots utiles), 9 articles sur 9 sous 1 500 mots ; timekraft 2 779 mots sur fiduciaires, idealcom 4 701 sur IA souveraine |
| Lisibilité et structure | 15 % | 80 | 12,0 | Flesch 62 à 78, phrases de 13 à 21 mots, réponse en tête, résumés, FAQ, sources fedlex sur 4 articles |
| Mots-clés et intention | 10 % | 45 | 4,5 | « IA souveraine » et « on-premise » : 0 occurrence sur 15 pages ; H1 sans mot-clé sur 5 pages sur 6 ; accueil et article pilier sur le même titre |
| Citabilité par les IA | 10 % | 62 | 6,2 | llms.txt, robots ouverts aux crawlers IA, définitions en tête, JSON-LD complet ; mais questions FAQ invisibles, 0 tableau HTML, aucun chiffre à citer |
| **Total** | | | **55,6** | **arrondi à 56** |

Lecture : le site est propre, honnête et bien écrit, mais il est trop court et sans preuve sur l'offre qu'il vend. Pour la première place sur « IA locale », « IA souveraine », « IA pour fiduciaire » et « IA on-premise entreprise suisse », il manque deux des quatre requêtes dans le vocabulaire du site, des pages métier deux à quatre fois plus profondes, et des preuves chiffrées d'installations réelles.

---

## 2. Tableau par page

| URL | Mots total / utiles | H1 | Intention | Verdict | Manque principal |
|---|---|---|---|---|---|
| `/` | 1 644 / 756 | « L'IA fait le travail. Vos données ne quittent jamais vos murs. » | Commerciale, marque + « IA locale entreprise » | OK (seuil 500) | Aucun chiffre ni témoignage ; les 3 références (Facchinetti, Richoz, Oasis Drink) décrivent des projets logiciels, pas des installations d'IA locale ; « souveraine » et « on-premise » absents |
| `/fiduciaires` | 980 / 648 | « Vos pièces comptables saisies toutes seules. Pas un dossier client ne quitte le cabinet. » | Commerciale, « IA pour fiduciaire » | Mince (seuil 800) | « Le produit tourne déjà en pilote dans un cabinet romand » sans nom ni chiffre ; cadre légal absent (LSR, LBA, CO 398, EXPERTsuisse) ; Abacus, Crésus, WinBIZ « précisé lors du diagnostic » |
| `/administrations` | 846 / 513 | « Rapports rédigés et documents anonymisés, sur vos serveurs. » | Commerciale, « IA administration communale », « IA police » | Mince | Aucune référence ; aucun texte cantonal (LPrD, LIPAD) ; art. 320 CP cité seulement sur /securite ; rien sur les marchés publics |
| `/pme` | 731 / 478 | « Mails triés, factures relancées, sans abonnement cloud. » | Commerciale, « IA pour PME suisse » | Mince (page la plus courte) | « IA locale » uniquement dans le title ; aucun exemple chiffré ; prix « sur devis » sans repère |
| `/securite` | 1 436 / 1 113 | « Vos données restent chez vous. Voici comment, point par point. » | Informationnelle, responsable informatique | OK, meilleure page du site | Dossier PDF derrière formulaire (non crawlable, `/securite/dossier-securite.pdf` répond 404) ; 0 tableau HTML ; « Cloud Act » et « souveraine » absents |
| `/ressources` | 792 / 530 | « Ce qu'il faut savoir avant d'installer une IA chez vous. » | Hub | OK pour un hub | Pas de bio auteur, pas de catégories ; `/blog` sert le même hub (canonical vers /ressources, donc sans risque) |
| `/ressources/ia-locale-entreprise-suisse` | 1 567 / 1 071 | « IA locale en entreprise : utiliser l'IA sans que vos données quittent la Suisse » | Informationnelle, « IA locale entreprise » | À renforcer (seuil 1 500) | Title en concurrence directe avec l'accueil ; synonymes « on-premise », « souveraine » absents ; pas de tableau matériel / modèles |
| `/ressources/chatgpt-nlpd-entreprise` | 1 528 / 1 044 | « ChatGPT et la nLPD : ce que votre entreprise risque vraiment » | Informationnelle, « ChatGPT nLPD » | À renforcer | Cloud Act absent (tous les concurrents l'utilisent) ; pas de tableau « risqué / pas risqué » |
| `/ressources/secret-professionnel-ia` | 1 300 / 820 | « Secret professionnel et IA : ce que les fiduciaires, avocats et médecins doivent savoir » | Informationnelle, « secret professionnel IA » | À renforcer | Ouverture « Oui, à condition que... » répond à une question qui n'est pas affichée ; le cas des fiduciaires (hors art. 321) n'est pas développé ; meta description de 272 caractères |
| `/ressources/fiduciaire-automatiser-saisie-pieces-ia` | 1 399 / 912 | « Fiduciaire : automatiser la saisie des pièces avec une IA installée au cabinet » | Informationnelle, « automatiser saisie pièces fiduciaire » | À renforcer | Reprend les mêmes étapes que /fiduciaires au même niveau de détail ; « le pilote en cours dans un cabinet romand » sans chiffre |
| `/ressources/mesurer-le-temps-qu-une-tache-coute-vraiment` | 1 101 / 587 | « Mesurer ce qu'une tâche coûte vraiment avant d'automatiser quoi que ce soit » | Informationnelle, « mesurer coût d'une tâche » | Mince | Pas de sources ; l'exemple chiffré est annoncé fictif (« Ces chiffres sont une illustration, pas un résultat ») ; ouverture sans question visible |
| `/ressources/ou-vivent-vos-donnees-quand-vous-utilisez-lia` | 1 128 / 610 | « Où vivent vos données quand vous utilisez l'IA, et pourquoi la question se tranche au départ » | Informationnelle, « où vont les données IA » | Doublon partiel | Recouvre ia-locale + chatgpt-nlpd ; pas de source ; affirme que l'option hébergée « convient à la grande majorité des entreprises » sans relier au positionnement sur site |
| `/ressources/combien-coute-une-automatisation-ia-pme-suisse` | 1 239 / 730 | « Combien coûte une automatisation IA pour une PME suisse ? » | Informationnelle, « prix automatisation IA PME » | À renforcer | Fourchettes « relevées en septembre 2026 sur les sites publics du marché » sans nommer les sites ; contredit le diagnostic gratuit (voir P0-5) |
| `/ressources/chatgpt-copilot-ou-agent-sur-mesure` | 1 087 / 571 | « ChatGPT, Copilot ou un agent sur mesure : lequel pour votre PME ? » | Informationnelle, « ChatGPT ou Copilot PME » | Mince | Pas de sources ; ne relie pas la décision à l'option locale |
| `/ressources/plateforme-automatisation-ou-code` | 1 219 / 707 | « Zapier, Make, n8n ou du code : sur quoi construire une automatisation qui dure ? » | Informationnelle, « n8n ou code » | Mince | Hors cible IA locale ; pas de sources ; timekraft a déjà deux comparatifs dédiés (n8n-vs-make-comparatif, n8n-make-zapier-comparatif-suisse-2026) |

Seuils appliqués : accueil 500, page service 800, article 1 500 (planchers de couverture thématique, pas des cibles).

---

## 3. Constats E-E-A-T (cadre de septembre 2025)

### Expérience : 9 / 20

Ce qui existe :
- Signaux de première main dans les articles : « Dans mes installations, c'est un Mac mini Apple avec 64 Go de mémoire unifiée » (ia-locale) ; « Presque tous les projets d'automatisation que je reprends ont démarré de la même façon » (mesurer) ; « Trois raisons reviennent chez les entreprises romandes qui me contactent » (ia-locale).
- Une démo vidéo de 2 minutes avec transcription complète et horodatée sur l'accueil (« 0:34 Lue sur place. La pièce est lue sur place. Le fournisseur, la date, les montants, la TVA, la référence de la facture QR ») ; le fichier `/demo/demo-lx-studio.mp4` existe (200, video/mp4) et un `VideoObject` est déclaré.

Ce qui manque :
- Aucune preuve chiffrée sur l'offre vendue. La seule mention est « Le produit tourne déjà en pilote dans un cabinet romand » (/fiduciaires) et « le pilote en cours dans un cabinet romand » (article saisie). Pas de nom, pas de volume, pas de temps avant / après, alors que la méthode du site promet justement « un rapport mensuel des heures réellement gagnées ».
- Les trois références de l'accueil (« Ils m'ont confié leurs process ») ne sont pas des installations d'IA locale : « Capture des contacts et fiches véhicules par QR code au Comptoir du Jura », « Gestion des interventions et des techniciens, connectée à Bexio », « Système de commande pour un distributeur de boissons ». La FAQ accueil s'appuie dessus : « Bexio : oui, un système connecté à Bexio tourne déjà chez un client ». Un lecteur fiduciaire peut comprendre que la saisie des pièces tourne en production, ce que le site ne dit pas.
- Zéro témoignage, zéro citation client, zéro photo d'installation, zéro capture d'écran de l'interface de validation.
- Comparaison : timekraft publie un cas « Une fiduciaire genevoise, 25 clients à tenir », « 126 pièces, 119 brouillons (68 fournisseurs + 51 clients), 2 non-factures écartées », avec une citation du dirigeant ; local-ia.ch affiche trois témoignages signés d'un prénom et d'une fonction ; counteo.ch six citations clients et trois mentions presse.

### Expertise : 15 / 25

Ce qui existe :
- Auteur nommé sur chaque article (« Par Tanguy Lachat », date, temps de lecture) et déclaré en JSON-LD : `Person`, `jobTitle` « Fondateur et ingénieur IA », `knowsAbout` sur quatre sujets.
- Exactitude technique et juridique soignée : articles 5, 6, 8, 16, 17, 19, 60 et 61 LPD cités ; liste de l'art. 321 CP reproduite ; nuance correcte « Les fiduciaires ne sont pas toutes visées par cet article en tant que telles » ; réserves explicites « Cet article n'est pas un avis juridique », « Il ne s'agit pas d'une certification ». Aucune erreur factuelle relevée.
- Page sécurité qui nomme la pile : « modèles d'IA ouverts (familles Llama et Qwen), exécutés localement sur la machine par Ollama, avec une reconnaissance de texte locale (Tesseract) et un lecteur de factures QR ».

Ce qui manque :
- Aucune biographie, aucune photo, aucun parcours, aucune formation, aucun lien LinkedIn ; `/a-propos` et `/about` répondent 404 ; le `Person` n'a ni `sameAs` ni `image`.
- Comparaison : timekraft a une page auteur de 1 192 mots (« 43 ans. 15 ans de marketing digital et stratégie », « Brevet fédéral de Spécialiste en IA Business, CEFCO, en cours (septembre 2026) ») ; mont3 signe ses articles avec une page auteur (Paolo Montemurro) ; idealcom s'appuie sur « 18 ans d'expertise digitale en Suisse romande ».

### Autorité : 7 / 25

- Aucune reconnaissance externe visible : pas d'avis Google, pas de presse, pas de badge partenaire (Bexio, Apple, association professionnelle), pas de conférence, pas de citation par un tiers.
- Comparaison : timekraft affiche « 5,0 ★★★★★ 17 avis Google » sur ses pages piliers ; counteo cite Bilan, PME Magazine et Léman Bleu ; idealcom « accompagne les organisations et entreprises suisses depuis 2008 ».
- Taille du corpus indexable : 15 URL chez LX Studio contre 229 chez timekraft (dont 112 articles de blog) et 65 chez mont3 (4 langues).

### Confiance : 23 / 30

Ce qui existe, et c'est le point fort du site :
- Identité complète dans les mentions légales : « Raison individuelle, Tanguy Lachat », « Rue des Romains 25, 2854 Bassecourt », « Numéro IDE : CHE-325.224.095 », téléphone et e-mail ; adresse postale et téléphone repris dans le `ProfessionalService`.
- Politique de confidentialité datée du 24.10.2026, mesure d'audience « sans cookie et sans identifiant personnel (Plausible Analytics) ».
- Page sécurité qui dit ce qui n'est pas fait : « Aucun test d'intrusion indépendant n'a encore été réalisé ; il sera documenté ici quand il aura lieu » ; dossier sécurité versionné « Version 1.1 · 26.10.2026 · 4 pages » ; engagements contractuels listés ; sources fedlex et PFPDT.

Ce qui affaiblit :
- Contradiction gratuit / facturé entre les pages (détail en P0-5).
- Le dossier sécurité n'est accessible que par formulaire ; un robot ou un assistant IA ne peut pas le lire.
- « Ce site est hébergé par Cloudflare, Inc., 101 Townsend St, San Francisco » (mentions légales) face au message « Rien ne sort du bâtiment » et au pied de page « Conçu et hébergé pour la Suisse romande » : ce n'est pas un problème de classement, mais une objection prévisible du responsable informatique qui lit tout.

Total E-E-A-T : 54 / 100.

### Marqueurs de contenu généré (QRG septembre 2025)

- Phrasé générique : non. Voix à la première personne, références suisses précises (factures QR, Bexio, Comptoir du Jura, PFPDT).
- Structure répétée entre pages : oui. Le bloc « Vous voulez l'IA. Vous ne pouvez pas y mettre [vos dossiers / les dossiers de vos clients / un dossier / vos clients] » apparaît sur 4 pages, « Les autres vous vendent un [serveur / abonnement]. Moi, je vous livre... » sur 4 pages, « On mesure avant d'installer, et on contrôle après. » sur 3 pages, « Les questions qu'on me pose avant d'installer. » sur 4 pages, et le CTA « Dites-moi quelle tâche vous coûte le plus. » sur 12 pages. Les trois pages métier partagent la même grille (4 fonctions, 3 problèmes, tableau générique / LX Studio, 4 étapes, FAQ) avec des substitutions de mots.
- Manque de spécificité : oui sur les pages métier (aucun chiffre, aucun nom), non sur les articles.
- Exactitude : aucune erreur relevée.
- Signal d'assemblage automatique : sur les 4 articles du 24.10.2026, le paragraphe d'ouverture est suivi d'un second paragraphe qui le reformule presque mot pour mot (exemple ia-locale : « Une IA locale est un modèle d'intelligence artificielle qui tourne sur une machine installée dans l'entreprise, sans envoyer les données à un service externe. » puis « Une IA locale est un modèle d'intelligence artificielle qui tourne sur une machine installée dans vos locaux, et qui traite vos documents sans les envoyer à un service externe. »).

Verdict : risque modéré sur les pages métier, faible sur les articles.

---

## 4. Constats classés par priorité (preuve, correctif)

### P0 : bloque la première place

**P0-1. Deux requêtes cibles sur quatre sont absentes du site.**
Preuve : « IA souveraine » et « souverain » = 0 occurrence sur les 15 pages ; « on-premise » = 0 occurrence (le site dit « sur site », « installée chez vous », « dans vos locaux »). « Cloud Act » = 0 occurrence alors que timekraft, idealcom et mont3 l'utilisent tous comme argument central. En face : idealcom.ch/ia/ia-souveraine-suisse fait 4 701 mots avec H1 « IA souveraine en Suisse : votre serveur IA local, vos données protégées » ; timekraft.ch/ia-souveraine-suisse 2 984 mots, « Page pilier, avril 2026 », avec une définition en quatre critères ; mont3.ch/fr/local-ai a pour title « IA locale & on-premise en Suisse · Installation à prix fixe ».
Correctif : créer la page pilier `/ia-souveraine-suisse` (voir section 10, n° 1) et introduire les synonymes sur l'accueil, /securite et l'article ia-locale (« appelée aussi IA souveraine ou IA on-premise »).

**P0-2. Les trois pages métier sont minces.**
Preuve : /fiduciaires 648 mots utiles, /administrations 513, /pme 478, pour un seuil de 800 ; timekraft.ch/ia-fiduciaires-suisse 2 779 mots, ia-administrations-communales 2 151, ia-pour-pme-suisse 2 334 ; idealcom communes 1 961.
Correctif : refondre chaque page métier à 1 500 mots utiles minimum avec cadre légal propre au métier, matrice des logiciels, scénario chiffré, FAQ de 8 à 10 questions (détail section 10, n° 2, 7, 8).

**P0-3. Aucune preuve chiffrée d'une installation d'IA locale.**
Preuve : « Le produit tourne déjà en pilote dans un cabinet romand » (/fiduciaires), sans nom, sans volume, sans date, alors que la méthode promet « Un rapport mensuel des heures réellement gagnées ». Les logos de l'accueil renvoient à des projets non IA (voir section 3). Zéro témoignage. timekraft publie « 126 pièces comptables traitées, 119 écritures préparées en brouillon » et une citation du dirigeant.
Correctif : une page étude de cas du pilote, anonymisée si nécessaire (« fiduciaire jurassienne de N collaborateurs »), avec les chiffres de la mesure avant / après que le process impose déjà ; une citation signée ; une photo de la machine installée.

**P0-4. Pas de page À propos, pas de page auteur, pas de biographie.**
Preuve : `/a-propos`, `/about`, `/contact` répondent 404 ; aucun lien LinkedIn sur le site ; `Person` sans `sameAs` ni `image` ; les articles affichent seulement « Par Tanguy Lachat ».
Correctif : page `/a-propos` (parcours, clients, méthode, photo, lieu), encart auteur en fin d'article, `sameAs` (LinkedIn) et `image` dans le JSON-LD, lien depuis chaque signature.

**P0-5. Le site se contredit sur le diagnostic gratuit et la mesure.**
Preuve : l'accueil et toutes les pages métier proposent « Réserver un diagnostic gratuit de 30 minutes », l'étape « Mesure : Avant de signer » et la FAQ « Rien n'est facturé avant que vous l'ayez validé ». L'article combien-coute écrit : « un diagnostic gratuit est financé par le projet qui suit, donc il a intérêt à conclure qu'un projet est nécessaire » et « Chez moi, la demi-journée de mesure est facturée, et si le rapport entre le coût de la tâche et celui de l'automatisation ne tient pas, on s'arrête là ».
Correctif : une seule règle, écrite au même endroit sur l'accueil, /fiduciaires et l'article : diagnostic de 30 minutes gratuit, demi-journée de mesure facturée (montant ou méthode), déduite ou non du devis.

### P1 : coûte des positions et de la citabilité

**P1-1. FAQ schema invisible et paragraphe d'ouverture rédigé pour une question absente.**
Preuve : chaque article déclare un `FAQPage` dont la question n'apparaît nulle part dans le HTML visible (vérifié pour « Qu'est-ce qu'une IA locale en entreprise et pourquoi la choisir en Suisse ? » et « Un professionnel tenu au secret peut-il utiliser l'IA sur ses dossiers ? »). Le premier paragraphe visible (`<p class="is-lead">`) est la réponse : « Oui, à condition que les dossiers ne soient révélés à personne... » (secret-professionnel), « En la chronométrant sur une semaine réelle plutôt qu'en l'estimant de mémoire. » (mesurer), « En installant une IA sur une machine dans le cabinet... » (fiduciaire-automatiser), « Cela dépend entièrement du montage choisi... » (ou-vivent). Un lecteur humain commence l'article par un « Oui » sans question. Les consignes Google sur les données structurées exigent que le contenu balisé soit visible.
Correctif : afficher la question comme sous-titre au-dessus du paragraphe d'ouverture (ou la fondre dans le H1), supprimer le doublon de paragraphe sur les 4 articles du 24.10, ou retirer le `FAQPage` des articles (les résultats enrichis FAQ sont de toute façon limités depuis 2023 aux sites gouvernementaux et de santé).

**P1-2. Cannibalisation entre pages.** Détail en section 6. Les deux cas les plus coûteux : accueil et article ia-locale sur « IA locale en entreprise » ; /fiduciaires et article saisie qui décrivent les mêmes étapes au même niveau de détail.

**P1-3. Structure répétée sur l'accueil et les trois pages métier.** Preuve en section 3. Correctif : garder la grille commune mais remplacer un bloc sur deux par du contenu propre au métier (cadre légal, logiciels, exemple, objections spécifiques).

**P1-4. Articles sous le seuil et sans sources pour cinq d'entre eux.**
Preuve : mots utiles de 571 à 1 071 pour un seuil de 1 500 ; les 5 articles du 23.09.2026 (mesurer, ou-vivent, combien-coute, chatgpt-copilot, plateforme) n'ont ni section « Sources » ni lien externe autre que cal.com ; les 4 articles du 24.10.2026 citent fedlex et le PFPDT. timekraft : article « saisie comptable automatisée » de 2 331 mots, « 15 min de lecture », avec « En 30 secondes » et sources.
Correctif : passer les 4 articles du 24.10 à 1 500 mots utiles avec un tableau chacun ; ajouter des sources datées aux 5 autres ; fusionner ou réorienter ou-vivent (section 6).

**P1-5. H1 sans mot-clé et meta descriptions trop longues.**
Preuve : sur les 6 pages principales, seul /securite a un H1 qui contient une requête cible (« Vos données restent chez vous » ne contient ni « IA » ni « locale ») ; le H1 de l'accueil, de /fiduciaires, /administrations et /pme ne contient pas le mot « IA ». 14 meta descriptions sur 15 dépassent 160 caractères (de 166 à 272 ; secret-professionnel 272, chatgpt-nlpd 226, fiduciaire-automatiser 220, fiduciaires 208, securite 206).
Correctif : H1 avec la requête (propositions en section 5) ; meta descriptions ramenées à 150 à 160 caractères en gardant la promesse.

**P1-6. Le dossier sécurité, principal actif de confiance, n'est pas lisible par les robots.**
Preuve : « Télécharger le dossier sécurité (PDF) » ouvre un formulaire (nom, entreprise, e-mail) ; aucun lien direct vers un PDF ; `/securite/dossier-securite.pdf` répond 404 ; le llms.txt dit « dossier sécurité (PDF, sur demande) ».
Correctif : publier une version courte crawlable (HTML ou PDF ouvert, 1 page : architecture, flux, engagements) et garder la version complète derrière le formulaire.

### P2 : finitions

- **P2-1. 0 tableau HTML sur les 15 pages.** Le comparatif « Une IA générique / LX Studio » et les mesures de sécurité sont des grilles en `div`. Un vrai `<table>` est extrait tel quel par Google et par les assistants.
- **P2-2. Aucune mention « mis à jour le ».** `dateModified` = `datePublished` sur les 9 articles ; le sitemap donne 24.10.2026 pour /securite alors que la page affiche « Dossier sécurité version 1.1 du 26.10.2026 ».
- **P2-3. Version anglaise absente.** hreflang limité à `fr-CH` et `x-default` ; `/en` répond 404 ; mont3 est en EN, DE, FR, IT. Pour « on-premise AI Switzerland », il n'y a aujourd'hui rien à indexer.
- **P2-4. Sources non nommées dans combien-coute.** « fourchettes relevées en septembre 2026 sur les sites publics du marché » : nommer les sites (mont3 affiche CHF 3'500, 5'000 et 7'500 ; local-ia « à partir de 3500 CHF environ » ; timekraft et idealcom ne publient pas de montant).
- **P2-5. Article ou-vivent en tension avec l'offre.** « Option 2 : hébergé, et documenté [...] C'est le cas courant, et il convient à la grande majorité des entreprises. » Honnête, mais sans phrase qui relie cette option au choix de LX Studio (quand l'option 1 s'impose, pourquoi, pour qui).
- **P2-6. Objection Cloudflare non traitée.** Une ligne dans la FAQ sécurité suffit : le site vitrine est hébergé chez Cloudflare, aucun document client n'y transite, le système installé chez le client ne dépend pas du site.
- **Note technique à transmettre à l'audit technique** : le HTML de chaque page contient des octets NUL (5 sur l'accueil, 9 sur l'article ia-locale) dans le script d'hydratation TanStack (`i:"__root__\x00"`). Sans effet sur le contenu visible, mais à signaler.

---

## 5. Mots-clés visés par page

Légende de l'état actuel : T = présent dans le title ou la meta description, H = présent dans un H1 ou H2, tiret = absent.

| Page | Requête principale | Requêtes secondaires | « IA locale » | « IA souveraine » | « fiduciaire » | « sur site / on-premise » | « nLPD » | H1 proposé |
|---|---|---|---|---|---|---|---|---|
| `/` | IA locale entreprise Suisse | IA installée chez vous, IA Jura, LX Studio | T | - | - | H T | - | « L'IA fait le travail, dans vos locaux. Vos données ne quittent jamais vos murs. » + H2 « IA locale installée chez vous, Jura et Suisse romande » |
| `/fiduciaires` | IA pour fiduciaire | IA fiduciaire Suisse, automatisation saisie comptable fiduciaire, saisie pièces Bexio IA, facture QR | - | - | T | - | T | « IA pour fiduciaires : vos pièces comptables saisies au cabinet, sans qu'un dossier client ne sorte » |
| `/administrations` | IA administration communale | IA commune suisse, IA police anonymisation, IA secret de fonction, IA LPrD | - | - | - | - | T | « IA pour polices et administrations : rapports rédigés et documents anonymisés sur vos serveurs » |
| `/pme` | IA pour PME suisse | IA locale PME, automatisation administrative PME, tri des mails IA, relance factures Bexio | T | - | - | T | - | « IA locale pour PME : mails triés, factures relancées, sans abonnement cloud » |
| `/securite` | sécurité IA sur site | IA conforme nLPD, IA secret professionnel, IA souveraine sécurité, chiffrement IA locale | - | - | - | H T | H T | garder le H1, ajouter une phrase d'intro avec « IA souveraine » et « on-premise » |
| `/ressources` | hub | | T | - | T | H | T | garder |
| ia-locale | IA locale entreprise (définition) | qu'est-ce qu'une IA locale, IA locale Suisse, IA on-premise, modèle ouvert local | H T | - | - | - | - | garder, ajouter les synonymes dans le premier paragraphe |
| chatgpt-nlpd | ChatGPT nLPD | ChatGPT données personnelles Suisse, ChatGPT LPD entreprise, Cloud Act Suisse | - | - | - | - | H T | garder, ajouter un H2 « Et le Cloud Act ? » |
| secret-professionnel | secret professionnel IA | IA avocat secret professionnel, art. 321 CP IA, IA médecin secret médical | - | - | H T | H | - | garder |
| fiduciaire-automatiser | automatiser saisie pièces comptables | IA saisie comptable fiduciaire, OCR facture QR, écriture proposée Bexio | - | - | H T | - | H | garder |
| mesurer | mesurer le temps d'une tâche | calcul ROI automatisation, coût d'une tâche administrative | - | - | - | - | - | garder |
| ou-vivent | hébergement IA Suisse | IA hébergée en Suisse vs locale, où vont mes données IA | - | - | - | - | - | à réorienter (section 6) |
| combien-coute | prix automatisation IA PME Suisse | coût projet IA PME, devis automatisation | - | - | - | - | - | garder |
| chatgpt-copilot | ChatGPT ou Copilot PME | Copilot ou agent IA sur mesure | - | - | - | - | - | garder |
| plateforme | n8n ou code | Zapier Make n8n comparatif | - | - | - | - | - | garder, faible priorité |

Pages qui n'existent pas encore et requêtes orphelines : « IA souveraine Suisse », « IA on-premise entreprise suisse », « serveur IA local prix », « alternative ChatGPT Suisse », « IA commune vaudoise / jurassienne », « IA Abacus / Crésus / WinBIZ » (section 10).

---

## 6. Cannibalisation

1. **Accueil et article ia-locale sur « IA locale en entreprise ».** Title accueil : « IA locale en entreprise, installée chez vous | LX Studio ». Title article : « IA locale en entreprise : utiliser l'IA sans que vos données quittent la Suisse ». Les deux visent la même tête de requête ; Google n'en montrera qu'une. Correctif : l'accueil garde l'intention commerciale (« IA locale installée dans vos locaux, Jura et Suisse romande | LX Studio »), l'article garde la définition (« Qu'est-ce qu'une IA locale en entreprise ? Définition, matériel, limites »), et l'accueil fait un lien explicite vers l'article comme référence.
2. **/fiduciaires et article fiduciaire-automatiser.** Les deux décrivent lecture, classement, écriture proposée dans Bexio, apprentissage des corrections, pièces mises de côté, avec les mêmes phrases (« Chaque pièce est rangée dans le dossier du bon client, renommée selon votre convention, prête pour l'archivage » sur la page ; « La pièce est rangée dans le dossier du bon mandat, renommée selon la convention du cabinet, et prête pour l'archivage » dans l'article). Correctif : la page porte l'offre, le cadre légal du métier et les logiciels ; l'article porte le détail technique, les chiffres du pilote, les cas limites.
3. **ou-vivent, ia-locale, chatgpt-nlpd et /securite sur « où vont les données ».** ou-vivent (610 mots utiles) est un sous-ensemble des deux autres articles. Correctif : le transformer en comparatif « IA installée chez vous, IA hébergée en Suisse, IA cloud américaine » avec un tableau (section 10, n° 6), ce qui lui donne une intention propre.
4. **mesurer et combien-coute.** Les deux contiennent « Le calcul » et le même raisonnement coût de la tâche contre coût de l'automatisation. Acceptable si mesurer devient le guide de méthode (modèle de relevé téléchargeable) et combien-coute le guide de prix avec sources nommées.

---

## 7. Lisibilité

| Page | Flesch (fr) | Mots / phrase | Phrases > 25 mots |
|---|---|---|---|
| `/` | 71,9 | 16,0 | 5 |
| `/fiduciaires` | 72,8 | 14,5 | 4 |
| `/administrations` | 62,5 | 13,2 | 1 |
| `/pme` | 72,3 | 12,7 | 1 |
| `/securite` | 71,8 | 15,0 | 1 |
| `/ressources` | 75,3 | 14,9 | 1 |
| ia-locale | 75,8 | 18,4 | 11 |
| chatgpt-nlpd | 67,9 | 18,3 | 11 |
| secret-professionnel | 64,2 | 20,6 | 10 |
| fiduciaire-automatiser | 71,3 | 19,2 | 9 |
| mesurer | 77,7 | 16,2 | 5 |
| ou-vivent | 73,5 | 19,1 | 7 |
| combien-coute | 76,6 | 18,2 | 9 |
| chatgpt-copilot | 71,4 | 19,3 | 4 |
| plateforme | 72,1 | 18,6 | 7 |

Lecture : niveau « assez facile » à « standard » pour des décideurs non techniques, phrases courtes, vouvoiement, français de Suisse respecté (deux écritures des montants coexistent, « 2'000 et 10'000 CHF » et « 250 000 francs » : harmoniser sur l'apostrophe). Les articles juridiques (secret-professionnel, chatgpt-nlpd) ont 10 à 11 phrases de plus de 25 mots : découper les énumérations légales en listes. Aucun problème de lisibilité bloquant.

---

## 8. Citabilité par les IA : 62 / 100

Points forts :
- `robots.txt` autorise explicitement GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User.
- `llms.txt` de bonne facture (résumé, ce que fait et ne fait pas LX Studio, liste des pages avec la question traitée par chaque article, zone desservie).
- Définitions autonomes en première phrase (« Une IA locale est un modèle d'intelligence artificielle qui tourne sur une machine installée dans l'entreprise, sans envoyer les données à un service externe. »), encart « En résumé » en 4 puces, FAQ visibles sur l'accueil et les pages métier, transcription de la démo.
- JSON-LD cohérent : `WebSite`, `ProfessionalService` avec adresse et zone, `Person`, `Article`, `BreadcrumbList`, `VideoObject`, `Service`.

Points faibles :
- Questions du `FAQPage` des articles absentes du visible (P1-1) : un assistant qui cite le paragraphe d'ouverture cite un « Oui, à condition que... » sans question.
- Aucun chiffre propre à citer : pas de volume de pièces, pas d'heures gagnées, pas de prix, pas de délai (seulement « Le délai est fixé dans le devis »). Les concurrents donnent des nombres : mont3 « CHF 3'500 », idealcom « Délai total : 15 à 20 jours ouvrés », timekraft « Entre quatre et huit semaines ».
- 0 tableau HTML ; comparatifs en `div`.
- Aucune date de mise à jour, aucune version sur les articles.
- Pas de page de définitions (glossaire) ni de page auteur à laquelle rattacher l'entité « Tanguy Lachat ».

---

## 9. Face aux concurrents : profondeur comparée

| Site et page | Mots | Ce qu'ils ont et que lxstudio.ch n'a pas | Ce que lxstudio.ch a et qu'ils n'ont pas |
|---|---|---|---|
| timekraft.ch/ia-souveraine-suisse | 2 984 | Définition de « souverain » en 4 critères cumulatifs, tableau API propriétaire / open-weight, 6 textes légaux dont FINMA et Cloud Act, 6 secteurs, FAQ de 9 questions, 17 avis Google, « Page pilier, avril 2026 » | L'exécution dans les locaux du client (timekraft héberge chez Infomaniak à Genève, « Chez vous » n'est qu'une option de sa page confidentialité) |
| timekraft.ch/ia-fiduciaires-suisse | 2 779 | « Six textes qui balisent l'usage de l'IA en fiduciaire » (nLPD, LSR, EXPERTsuisse, LBA, CO 398, Cloud Act), 7 logiciels nommés (Bexio, Abacus, Winbiz, Banana, Crésus, Dr. Tax, Topal), « Ce que l'IA ne fera pas », preuve « 126 pièces, 119 écritures », FAQ de 10 questions, « Métier : Fiduciaires, juillet 2026 » | Le traitement au cabinet sans hébergeur tiers ; la lecture de la facture QR nommée |
| timekraft.ch/automatisation-saisie-factures-fiduciaire-suisse | 566 | Étude de cas datée « Mai à octobre 2026 », « 25 clients », « près de 20 % de son temps, plus de 40 heures par mois » (estimation du dirigeant), empreinte SHA256 anti-doublon, citation signée « Le dirigeant, Fiduciaire genevoise » ; le cas est marqué « Arrêté, Mandat terminé » | Rien d'équivalent : c'est le trou le plus visible |
| timekraft.ch/ia-administrations-communales | 2 151 | Apertus (EPFL, ETHZ), Stratégie Suisse numérique 2025, directives IA Genève 2024, guide UCV, LPrD / LIPAD / LInfo, LMP et marchés publics, 8 cas d'usage | Anonymisation et journalisation sur les serveurs de l'administration, secret de fonction art. 320 CP (sur /securite) |
| timekraft.ch/ia-pour-pme-suisse | 2 334 | Réponse directe encadrée « En bref », statistiques sourcées (Bpifrance, « 99,7% des plus de 600'000 entreprises »), 4 usages détaillés, FAQ | Absence d'abonnement et machine qui appartient au client |
| idealcom.ch/ia/ia-souveraine-suisse | 4 701 | Comparatif IA souveraine / cloud public, 3 secteurs, méthode en 4 étapes « 15 à 20 jours ouvrés », « 18 ans d'expertise », une trentaine de questions dans la FAQ, matériel NVIDIA GB10, « Garantie 2 ans », pages datées 2026-07 à 2026-10, revendication « Le seul partenaire suisse à proposer un serveur IA on-premise clé en main » | Une tâche qui tourne seule avec mesure avant / après (idealcom vend un chat RAG multi-modèles, y compris « Claude, ChatGPT, Gemini [...] (Local ou API) ») ; page sécurité qui dit ce qui n'est pas fait |
| idealcom.ch/ia/idealgpt/communes | 1 961 | Chiffres d'usage (« Une commune de 5 000 habitants traite 200 demandes par mois », « −30 à 40 % », « ROI 12 à 18 mois », « 4 à 6 semaines »), « machine de démo configurée pour 30 utilisateurs » | Rien d'équivalent pour les communes |
| mont3.ch/fr/local-ai | 969 | Prix fixes « CHF 3'500 / 5'000 / 7'500 », tableau de modèles avec mémoire (« Qwen 3.6 235B-A22B · 4-bit · 120 Go », « Gemma 3 27B · 14 Go »), tableau local / cloud en 6 dimensions, « révisé en juillet 2026 », 4 langues, auteur identifié | Mesure et rapport mensuel, cadre nLPD détaillé, français de Suisse romande |
| mont3.ch (blog, article fiduciario ticinese) | 2 178 | Analyse juridique fine pour fiduciaires (art. 321 CP, CO 730b, LFid tessinoise art. 16, LPD art. 62), sources, auteur daté | Version française de ce raisonnement pour la Romandie |
| local-ia.ch | 629 | 3 témoignages avec prénom et fonction, « à partir de 3500 CHF environ » | Tout le reste : 3 URL dans son sitemap, pas d'auteur, pas d'article |
| infomaniak.com/fr/euria | 1 302 | Autorité de domaine, « Exclusivement hébergée en Suisse », intégration kSuite | Euria est un assistant hébergé : lxstudio.ch est le seul à pouvoir dire « aucun hébergeur », ce qu'il ne dit jamais en comparant |
| counteo.ch | 711 | « Conçue par des experts-comptables », presse (Bilan, PME Magazine, Léman Bleu), 6 témoignages, « données stockées en Suisse » | Counteo est une plateforme SaaS, pas une IA locale ; concurrence seulement sur l'intention « fiduciaire » |

Conclusion : l'argument « dans vos locaux, sans hébergeur » est unique dans ce panel (seuls idealcom, mont3 et local-ia installent sur site, et aucun ne vend une tâche mesurée), mais il n'est ni nommé avec les mots que les gens cherchent, ni prouvé, ni développé à la profondeur des pages qui occupent déjà les requêtes.

---

## 10. Contenus à créer ou renforcer, par priorité

| # | Titre proposé | Requête visée | Raison, avec preuve |
|---|---|---|---|
| 1 | **Page pilier `/ia-souveraine-suisse` : « IA souveraine en Suisse : les trois niveaux, et pourquoi le plus strict est une machine dans vos locaux »** (2 000 mots, tableau cloud américain / hébergé en Suisse / sur site, Cloud Act, art. 16 et 17 LPD, art. 321 CP, 6 FAQ) | IA souveraine Suisse, IA souveraine entreprise, IA souveraine PME | 0 occurrence du mot sur le site ; idealcom 4 701 mots, timekraft 2 984 mots occupent la requête ; LX Studio est le seul du panel à pouvoir dire « aucun hébergeur » |
| 2 | **Refonte `/fiduciaires` (1 500 mots utiles)** : cadre légal fiduciaire (mandat CO 398, LSR / ASR pour la révision, LBA, règles EXPERTsuisse et fiduciaire suisse), matrice Bexio / Abacus / Crésus / WinBIZ, exemple chiffré du pilote, « ce que le système ne fait pas », FAQ de 10 questions | IA pour fiduciaire, IA fiduciaire Suisse, automatisation saisie comptable fiduciaire | 648 mots utiles contre 2 779 chez timekraft, qui liste 6 textes et 7 logiciels ; la page actuelle renvoie Abacus, Crésus et WinBIZ au diagnostic |
| 3 | **Étude de cas : « Pilote dans une fiduciaire romande : N pièces par semaine, N heures de saisie avant, N après »** (chiffres réels de la mesure, période, corrections, citation signée, photo de la machine) | automatisation saisie pièces comptables cas réel, IA fiduciaire témoignage | Seule mention actuelle : « Le produit tourne déjà en pilote dans un cabinet romand » ; timekraft publie « 126 pièces, 119 brouillons » et une citation |
| 4 | **Page `/a-propos` et encart auteur** : parcours de Tanguy Lachat, pourquoi le Jura, clients, méthode, photo, LinkedIn ; `sameAs` et `image` dans le `Person` | Tanguy Lachat, LX Studio Bassecourt | `/a-propos` répond 404 ; timekraft a une page auteur de 1 192 mots avec diplôme et brevet en cours ; condition de base de l'Expertise selon le QRG |
| 5 | **Article : « IA on-premise en Suisse : ce que ça veut dire, quel matériel, quels modèles tournent sur un Mac mini M4 Pro 64 Go »** (tableau modèles / mémoire / tâche, uniquement avec les chiffres mesurés sur vos machines) | IA on-premise entreprise suisse, serveur IA local, matériel IA locale | « on-premise » = 0 occurrence ; mont3 détient le title « IA locale & on-premise en Suisse » et publie un tableau de modèles avec mémoire ; idealcom pousse le NVIDIA GB10 ; l'angle Mac mini est unique |
| 6 | **Réorienter ou-vivent en comparatif : « Qui voit vos dossiers ? IA installée chez vous, IA hébergée en Suisse (Euria, GPU Infomaniak), ChatGPT Entreprise »** avec tableau et critères vérifiables (trafic sortant observable) | alternative ChatGPT Suisse, IA hébergée en Suisse, Euria entreprise avis | ou-vivent recouvre ia-locale et chatgpt-nlpd (section 6) ; timekraft et Infomaniak vendent l'hébergement à Genève, personne ne compare les deux montages du point de vue du client |
| 7 | **Refonte `/administrations` (1 500 mots)** : secret de fonction art. 320 CP, LPrD / LIPAD / LInfo et loi jurassienne, marchés publics, journalisation, cas police (anonymisation de PV, plaques, noms), cas commune (PV, courriers, réponses aux administrés) | IA administration communale, IA commune suisse, IA police anonymisation | 513 mots utiles ; timekraft 2 151 mots avec Apertus et directives cantonales, idealcom 1 961 mots avec chiffres d'usage |
| 8 | **Refonte `/pme` (1 200 mots)** : 3 scénarios (boîte info@, relances Bexio, devis) avec le relevé de mesure, FAQ messagerie (Microsoft 365, Google Workspace, Infomaniak), ce qui reste manuel | IA pour PME suisse, IA locale PME, automatisation administrative PME | 478 mots utiles, page la plus courte ; timekraft 2 334 mots |
| 9 | **Article : « Combien coûte une IA locale installée dans vos locaux : matériel, installation, mesure, suivi »** (ordre de grandeur du matériel, prix de la demi-journée de mesure, ce qui est compris dans le devis) | prix serveur IA local, coût IA on-premise, prix IA locale PME | Toutes les pages disent « sur devis » ; mont3 affiche CHF 3'500, 5'000 et 7'500 ; local-ia « à partir de 3500 CHF environ » ; résout aussi P0-5 |
| 10 | **Article : « Facture QR suisse : comment une IA locale la lit sans erreur de montant ni de référence »** | lecture facture QR automatique, QR-facture IA, saisie facture QR Bexio | Seule page du panel à nommer « un lecteur de factures QR » ; aucune page concurrente lue ne traite le sujet ; très suisse, peu concurrentiel |
| 11 | **Article : « Fiduciaires et secret : art. 321 CP, mandat, révision (CO 730b), LBA, et ce que ça change pour l'IA »** | secret professionnel fiduciaire IA, fiduciaire ChatGPT | secret-professionnel dit « Les fiduciaires ne sont pas toutes visées » sans développer ; mont3 le fait en italien (2 178 mots), timekraft dans sa FAQ ; pas d'équivalent romand |
| 12 | **Page « Connecteurs : Bexio, Abacus, Crésus, WinBIZ, messageries » avec l'état réel de chaque connecteur et sa date** | IA Abacus, IA Crésus, IA WinBIZ, IA Bexio | « l'état du connecteur est précisé lors du diagnostic » sur 3 pages ; timekraft nomme 7 logiciels |
| 13 | **Glossaire : IA locale, IA souveraine, on-premise, open-weight, Ollama, RAG, validation humaine** (une définition de 2 phrases par terme) | définition IA souveraine, définition IA locale | Citabilité : fournit les phrases que les assistants reprennent ; rattache les synonymes à l'entité LX Studio |
| 14 | **Version anglaise des 6 pages principales + hreflang en** | on-premise AI Switzerland, sovereign AI Switzerland | `/en` répond 404 ; mont3 est en 4 langues ; prévue, à ne pas lancer avant les points 1 à 4 |
| 15 | **Page `/demo` autonome** avec la vidéo, la transcription, les captures d'écran de l'interface de validation | démo IA locale saisie comptable | La transcription existe déjà sur l'accueil ; une page dédiée se partage et se cite |

---

## 11. Correctifs rapides (moins d'une journée au total)

1. Afficher la question de chaque article au-dessus du paragraphe d'ouverture (ou retirer le `FAQPage` des articles) et supprimer le second paragraphe redondant sur ia-locale, chatgpt-nlpd, secret-professionnel et fiduciaire-automatiser.
2. Différencier les titles de l'accueil et de l'article ia-locale (section 6, point 1).
3. Ajouter « appelée aussi IA souveraine ou IA on-premise » dans le premier paragraphe de l'accueil, de /securite et de l'article ia-locale ; ajouter un paragraphe Cloud Act dans chatgpt-nlpd et /securite.
4. Ramener les 14 meta descriptions à 150 à 160 caractères.
5. Mettre « IA » et le métier dans les H1 des pages métier (propositions en section 5).
6. Écrire la règle gratuit / facturé une fois pour toutes (P0-5) sur l'accueil, /fiduciaires et combien-coute.
7. Nommer les sites derrière « fourchettes relevées en septembre 2026 » dans combien-coute.
8. Convertir le comparatif « Une IA générique / LX Studio » et les mesures de sécurité en vrais `<table>`.
9. Encart auteur de 3 lignes avec photo et lien LinkedIn sous chaque article ; `sameAs` et `image` dans le JSON-LD `Person`.
10. Ajouter « Mis à jour le » et aligner `dateModified` et le `lastmod` du sitemap (dossier v1.1 du 26.10.2026).
11. Publier une version courte du dossier sécurité en accès libre, garder la complète derrière le formulaire.
12. Harmoniser l'écriture des montants (« 250 000 francs » et « 2'000 CHF » coexistent).
13. Une ligne dans la FAQ sécurité sur l'hébergement du site vitrine chez Cloudflare.

---

## 12. Ce qui n'a pas été vérifié

- Positions réelles dans Google, données Search Console, trafic, backlinks : hors de portée de cet audit (aucun accès).
- Le contenu du dossier sécurité PDF (derrière formulaire) et la vidéo elle-même (seule la transcription a été lue).
- Le rendu sur téléphone, la performance et l'accessibilité : pour l'audit technique.
- La fiche Google Business Profile et les avis éventuels hors site.
- Les pages concurrentes non lues en entier : idealcom.ch/idealgpt (4 126 mots, lu partiellement), les 112 articles de blog timekraft (seuls 2 lus), les pages DE / IT de mont3.
- La version anglaise annoncée : aucune URL n'existe aujourd'hui, rien à évaluer.
