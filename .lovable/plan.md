## Landing page — Agent IA souverain pour fiduciaires suisses

Une landing page B2B SaaS, sobre et professionnelle, en français, sur une seule page avec 6 sections + footer. Style suisse rigoureux : blanc, gris anthracite, accent bleu profond. Typographie Inter. Aucun gradient flashy, aucun emoji.

### Sections

**1. Header fixe** — Logo (texte) à gauche, ancres de navigation (Problème, Solution, Différence, Démo) au centre, bouton CTA "Demander une démo" à droite. Devient discret au scroll.

**2. Hero**
- Titre H1 : "L'IA qui scanne, classe et automatise vos documents — sans jamais quitter votre cabinet."
- Sous-titre : "Conçu pour les fiduciaires suisses qui placent le secret professionnel au-dessus de tout."
- CTA primaire : "Demander une démo de 20 minutes" → ouvre cal.com
- CTA secondaire (lien texte avec flèche) : "Voir comment ça fonctionne" → scroll vers Solution
- Visuel à droite : **mockup produit** — illustration sobre d'un Mac mini stylisé avec un flux de documents (PDF, factures) entrant, et un cadenas / périmètre "LAN cabinet" englobant le tout. Réalisé en SVG sur-mesure (léger, net, scalable). Petit indicateur "Données locales" discret.
- Ligne de réassurance sous les CTA : "Conforme LPD · Hébergé dans votre cabinet · Sans cloud externe"

**3. Le Problème**
- Titre : "Vos collaborateurs perdent 10 à 15 heures par semaine sur des tâches qui devraient être automatiques."
- 3 cartes côte à côte (stack mobile), bordure fine grise, icône monochrome simple en haut :
  - Scan, renommage et classement manuel des documents reçus par mail ou courrier
  - Relances clients pour la TVA, les pièces manquantes, les paiements — tout en manuel
  - Saisie comptable répétitive depuis des PDFs de qualité variable

**4. La Solution**
- Titre : "Un agent IA qui apprend votre process, en local sur votre infra."
- Pipeline visuel à 4 étapes numérotées, reliées par un trait fin (vertical sur mobile, horizontal sur desktop) :
  1. Le document arrive (mail, scan, photo de facture)
  2. L'agent extrait, comprend, classifie automatiquement
  3. Renommage et rangement selon vos conventions
  4. Relances clients automatisées pour TVA et pièces manquantes
- Chaque étape : numéro en grand (typo légère), titre court, 1 ligne descriptive

**5. La Différence**
- Titre : "Cloud Suisse, cloud étranger — et nous."
- Tableau comparatif 2 colonnes (responsive : transformé en cartes empilées sur mobile) :
  - Colonne gauche "Solutions cloud (Sequence ERP, Pennylane, Accounto...)" — données sur serveurs partagés, même en Suisse
  - Colonne droite (mise en valeur, fond très légèrement teinté) "Notre solution" — Mac mini dédié dans votre cabinet, données qui ne sortent jamais du LAN, conformité maximale au secret professionnel
- Lignes : Localisation des données, Hébergement, Sortie réseau, Conformité secret pro
- Phrase clé en grand sous le tableau : **"Vos données restent chez vous. Votre IA aussi."**

**6. Pour qui**
- Titre : "Pensé pour les fiduciaires qui ne veulent pas de compromis sur la souveraineté."
- 3 cartes profil :
  - Cabinets de 5 à 15 collaborateurs avec 50–150 clients PME
  - Fiduciaires avec clients sensibles (avocats, médecins, successions, holdings)
  - Cabinets qui ont refusé une solution cloud parce que les serveurs étaient à l'étranger

**7. CTA final**
- Titre : "Voyez ce que l'IA peut faire pour votre cabinet — en 20 minutes."
- Sous-titre : "Démo personnalisée sur vos cas d'usage. Sans engagement, sans pitch commercial."
- Formulaire : Nom, Prénom, Cabinet, Email, Téléphone, Canton (dropdown 26 cantons, par défaut romands en haut)
- Validation Zod côté client (email, téléphone CH, champs requis, longueurs max)
- CTA "Réserver une démo" → ouvre **cal.com** dans un nouvel onglet (URL cal.com fournie par vous au moment de l'implémentation, placeholder en attendant)
- Mention discrète sous le formulaire : "Conforme LPD et secret professionnel suisse"

**8. Footer**
- Ligne unique sobre : "© 2026 LX Studio · Mentions légales · contact@lxstudio.ch"

### Design system

- Palette : `#FFFFFF` (fond), `#0F1419` (texte principal anthracite), `#5B6770` (texte secondaire), `#1E3A5F` (accent bleu profond), `#E8EAED` (bordures), `#F7F8FA` (sections alternées très subtiles)
- Typographie : Inter (chargée via Google Fonts), poids 400 / 500 / 600. Titres en 600, jamais de gras agressif.
- Espacements généreux, sections de 96–128px de padding vertical desktop, 64px mobile
- Coins légèrement arrondis (8px max), bordures 1px fines
- Pas d'animation sauf : fade-in subtil au scroll sur les sections, hover discret sur boutons/cartes (transition 150ms)

### Performance & responsive

- Mobile first, breakpoints 640 / 1024 px
- Visuel hero en SVG inline (zéro requête, zéro layout shift)
- Police Inter avec `font-display: swap` et preconnect Google Fonts
- Aucune librairie lourde ajoutée — uniquement les composants shadcn déjà présents (Button, Input, Label, Select, Card)
- Cible Lighthouse : LCP < 2s, CLS ~0

### Détails techniques

- Routes : remplacer `src/routes/index.tsx` par la landing complète. Composants extraits dans `src/components/landing/` (Hero, ProblemSection, SolutionSection, DifferenceSection, AudienceSection, DemoForm, SiteFooter, SiteHeader, ProductMockup).
- Métadonnées SEO dans `__root.tsx` (title, description, og:title, og:description, og:type=website, lang="fr-CH").
- Formulaire : validation Zod, état local React, bouton "Réserver une démo" ouvre l'URL cal.com (à fournir, placeholder `https://cal.com/your-handle/demo-fiduciaire` en attendant). Pas de backend nécessaire puisque le flow est 100% cal.com.
- Couleurs ajoutées comme variables CSS dans `src/styles.css` (oklch) pour rester cohérent avec le design system Tailwind v4.
