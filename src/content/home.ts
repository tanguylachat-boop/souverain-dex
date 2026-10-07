/**
 * Tout le texte de la page d'accueil, au même endroit.
 *
 * COPY PROVISOIRE. Le brief d'origine renvoie à un fichier AUDIT.md qui
 * n'existe nulle part ; le texte ci-dessous reprend les phrases validées des
 * versions précédentes et les range dans la structure relevée sur
 * levupp.com (docs/levupp-audit.md). À remplacer chaîne par chaîne, sans
 * toucher aux composants.
 *
 * Règles tenues ici : français de Suisse, vouvoiement, aucun tiret long,
 * espace insécable avant « : » et « ? », aucun chiffre inventé (quand une
 * mesure manque, elle est annoncée « en cours »), le travail du client comme
 * sujet.
 */

export const BOOKING_URL = "https://cal.com/lx-studio/15min";
export const CONTACT_EMAIL = "contact@lxstudio.ch";
export const LINKEDIN_URL = "https://www.linkedin.com/in/tanguy-lachat/";
export const INSTAGRAM_URL = "https://www.instagram.com/_t.24._/";

/** Le titre exact de la certification, à ne pas reformuler. */
export const CREDENTIAL = "Claude Certified Developer, Anthropic";

/* -------------------------------------------------------------------------- */
/* Images et vidéo                                                            */
/* -------------------------------------------------------------------------- */

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/**
 * Les fichiers de public/img/ sont provisoires (la mention « image
 * provisoire » est dans l'image), sauf tanguy.jpg. La vidéo du hero est un
 * zoom lent fabriqué à partir de la photo provisoire de l'atelier.
 */
export const IMAGES = {
  hero: {
    src: "/img/hero-atelier.webp",
    width: 1600,
    height: 900,
    alt: "Atelier d'une PME romande : établi, outils rangés, lumière du matin",
  },
  oasis: {
    src: "/img/factures-relance.webp",
    width: 1200,
    height: 800,
    alt: "Factures et bons de livraison sur le comptoir d'un distributeur de boissons",
  },
  richoz: {
    src: "/img/chantier-telephone.webp",
    width: 1200,
    height: 800,
    alt: "Installateur sanitaire sur un chantier, téléphone à la main",
  },
  andrea: {
    src: "/img/bureau-soir.webp",
    width: 1200,
    height: 800,
    alt: "Bureau d'un chauffeur indépendant le soir, téléphone posé à côté du carnet",
  },
  paysage: {
    src: "/img/paysage.jpg",
    width: 1600,
    height: 900,
    alt: "",
  },
  tanguy: {
    src: "/img/tanguy.jpg",
    width: 600,
    height: 767,
    alt: "Tanguy Lachat, fondateur de LX Studio",
  },
} as const satisfies Record<string, SiteImage>;

/* Motion design du premier écran : les documents qui filent vers le système. */
export const HERO_SCENE = {
  cards: ["Devis", "Facture", "Relance", "Mail", "Pièces"],
} as const;

/* -------------------------------------------------------------------------- */
/* Référencement                                                              */
/* -------------------------------------------------------------------------- */

export const SEO = {
  path: "/",
  title: "Devis, factures et relances automatisés pour PME romandes | LX Studio",
  description:
    "LX Studio installe dans vos outils un système qui fait le travail de bureau de votre PME : devis, factures, relances, mails qui se répètent, pièces pour la fiduciaire. Le temps gagné est mesuré avant et après. Tanguy Lachat, Bassecourt, Jura.",
  keywords:
    "automatisation PME Suisse romande, devis automatique artisan, relance de factures automatique, agent IA PME, LX Studio, Tanguy Lachat, Jura",
} as const;

export const SERVICE_DESCRIPTION =
  "Une demi-journée d'observation d'une tâche sur place, un devis sur heures estimées, une installation dans les outils existants de l'entreprise, une formation, puis une nouvelle mesure un mois après.";

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export const NAV = {
  brand: "LX Studio",
  menuLabel: "Menu",
  closeLabel: "Fermer",
  links: [
    { label: "Résultats", href: "/#resultats" },
    { label: "Méthode", href: "/#methode" },
    { label: "Offre", href: "/#offre" },
    { label: "Tarifs", href: "/#tarifs" },
    { label: "Journal", to: "/blog" },
  ],
  sub: [
    { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { label: "LinkedIn", href: LINKEDIN_URL },
    { label: "Instagram", href: INSTAGRAM_URL },
    { label: "Agent fiduciaire", to: "/fiduciaire" },
  ],
  cta: { label: "Réserver 15 minutes", href: BOOKING_URL },
} as const;

/* -------------------------------------------------------------------------- */
/* 1. Hero                                                                    */
/* -------------------------------------------------------------------------- */

export const HERO = {
  /** Première ligne : un mot qui tourne, puis la ligne fixe. */
  rotating: ["Les devis", "Les relances", "Les mails", "Les factures"],
  fixed: "se font sans vous.",
  /** Phrase d'intro à droite ; `underline` est le segment souligné. */
  introBefore: "Un système installé ",
  underline: "dans vos outils",
  introAfter: " fait le travail de bureau. Vous validez ce qui compte.",
  primary: { label: "Réserver 15 minutes", href: BOOKING_URL },
  secondary: { label: "Voir les résultats", href: "#resultats" },
  /** Titre lu par les lecteurs d'écran et les moteurs, sans la rotation. */
  plainTitle: "Les devis, les relances, les mails et les factures se font sans vous.",
} as const;

/* -------------------------------------------------------------------------- */
/* 2. Chiffres                                                                */
/* -------------------------------------------------------------------------- */

export type Stat = {
  /** Valeur numérique pour le compteur, ou null pour un texte fixe. */
  count: number | null;
  value: string;
  label: string;
  icon: "tuiles" | "noyau" | "calendrier" | "jauge";
};

export const STATS: ReadonlyArray<Stat> = [
  { count: 4, value: "4", label: "Clients au quotidien", icon: "tuiles" },
  { count: 1, value: "1", label: "Seul interlocuteur", icon: "noyau" },
  { count: 48, value: "48 h", label: "Pour un devis ferme", icon: "calendrier" },
  { count: 15, value: "15 min", label: "Le premier appel", icon: "jauge" },
];

/* -------------------------------------------------------------------------- */
/* 3. Résultats clients (carrousel)                                           */
/* -------------------------------------------------------------------------- */

export type Work = {
  key: string;
  client: string;
  meta: string;
  kind: string;
  body: string;
  facts: ReadonlyArray<{ label: string; value: string }>;
  image: keyof typeof IMAGES;
};

export const WORKS = {
  id: "resultats",
  eyebrow: "Résultats clients",
  title: "Ce que ça a changé chez trois clients.",
  lede: "Des outils utilisés tous les jours par des gens qui ne sont pas informaticiens. Quand la mesure n'est pas faite, c'est écrit.",
  tabPrefix: ["01", "02", "03"],
  prev: "Client précédent",
  next: "Client suivant",
  items: [
    {
      key: "oasis",
      client: "Oasis Drink Distribution",
      meta: "Genève",
      kind: "Boissons pour restaurants",
      body: "Les commandes arrivaient par WhatsApp, étaient ressaisies dans Excel, puis facturées à la main. Personne n'avait le temps de relancer. Les restaurants commandent maintenant en ligne, la facture part à la livraison et les retards sont relancés automatiquement.",
      facts: [
        {
          label: "Installé",
          value: "Commande en ligne, facture avec QR, relances en trois paliers",
        },
        { label: "Heures de bureau par semaine", value: "mesure en cours" },
      ],
      image: "oasis",
    },
    {
      key: "richoz",
      client: "Richoz Sanitaire",
      meta: "Petit-Lancy, Genève",
      kind: "Installation sanitaire",
      body: "Les mails des régies et des clients étaient triés à la main. Les devis se rédigeaient le soir. Chaque mail entrant est maintenant classé et rattaché à la bonne régie, le devis se prépare depuis le rapport d'intervention et la facture se fait dans Bexio.",
      facts: [
        { label: "Installé", value: "Tri des mails, devis, planning, rappel à 40 jours" },
        { label: "Heures de bureau par semaine", value: "mesure en cours" },
      ],
      image: "richoz",
    },
    {
      key: "andrea",
      client: "Taxi d'Andrea",
      meta: "Delémont",
      kind: "Chauffeur indépendant",
      body: "Un chauffeur seul, sans secrétariat, difficile à trouver au bon moment. Le numéro est maintenant visible à chaque hauteur de page, et chaque prestation (aéroport, médical, scolaire) a sa page pour sortir sur la recherche qui lui correspond.",
      facts: [
        {
          label: "Installé",
          value: "Un site d'une seule action, appeler, et une page par prestation",
        },
        { label: "Appels reçus par le site", value: "mesure en cours" },
      ],
      image: "andrea",
    },
  ] as ReadonlyArray<Work>,
} as const;

/* -------------------------------------------------------------------------- */
/* 4. Ce qui tourne (mur)                                                     */
/* -------------------------------------------------------------------------- */

export type Fact = { text: string; who: string; where: string };

export const WALL = {
  eyebrow: "Ce qui tourne",
  title: "Des systèmes qui tournent chaque jour, chez de vrais clients.",
  noteValue: "4",
  noteLabel: "Clients au quotidien",
  noteNames: "Oasis Drink, Richoz, Taxi Elsa, Taxi d'Andrea",
  footer: { label: "Voir les trois cas en détail", href: "#resultats" },
  /** Trois colonnes, remplies en tournant. Aucun avis inventé : des faits. */
  facts: [
    {
      text: "Les restaurants commandent en ligne. Plus de commandes par WhatsApp à ressaisir dans Excel.",
      who: "Oasis Drink Distribution",
      where: "Genève",
    },
    {
      text: "Chaque mail entrant est classé et rattaché à la bonne régie, avant même d'être ouvert.",
      who: "Richoz Sanitaire",
      where: "Petit-Lancy",
    },
    {
      text: "Le numéro est visible à chaque hauteur de page. Un site d'une seule action : appeler.",
      who: "Taxi d'Andrea",
      where: "Delémont",
    },
    {
      text: "La facture part à la livraison, avec le QR. Les retards sont relancés en trois paliers, facture jointe.",
      who: "Oasis Drink Distribution",
      where: "Genève",
    },
    {
      text: "Le devis se prépare depuis le rapport d'intervention, plus le soir après les chantiers.",
      who: "Richoz Sanitaire",
      where: "Petit-Lancy",
    },
    {
      text: "Une page par prestation, aéroport, médical, scolaire, pour sortir sur la recherche qui correspond.",
      who: "Taxi d'Andrea",
      where: "Delémont",
    },
    {
      text: "Tournées des livreurs avec signature, relevés de compte : tout tourne dans les mêmes outils.",
      who: "Oasis Drink Distribution",
      where: "Genève",
    },
    {
      text: "La facture se fait dans Bexio, avec un rappel automatique à 40 jours.",
      who: "Richoz Sanitaire",
      where: "Petit-Lancy",
    },
    {
      text: "Le temps de bureau gagné est mesuré avant et après. Quand la mesure n'est pas faite, c'est écrit.",
      who: "La règle de la maison",
      where: "Bassecourt",
    },
    {
      text: "Planning des techniciens et rapports d'intervention au même endroit que les devis et les factures.",
      who: "Richoz Sanitaire",
      where: "Petit-Lancy",
    },
    {
      text: "Rien ne part sans validation quand c'est sensible : un client fragile se met en pause en un clic.",
      who: "La règle de la maison",
      where: "Bassecourt",
    },
    {
      text: "Le référencement local et le numéro qui sonne : ce qui tourne, et ce qu'on mesure.",
      who: "Taxi d'Andrea",
      where: "Delémont",
    },
  ] as ReadonlyArray<Fact>,
} as const;

/* -------------------------------------------------------------------------- */
/* 5. Ce qui change d'un prestataire à l'autre                                */
/* -------------------------------------------------------------------------- */

export type Mark = "oui" | "non" | "variable";

export const COMPARE = {
  eyebrow: "Pourquoi LX Studio",
  title: "Ce qui change d'un prestataire à l'autre.",
  lede: "Cinq points qui décident du résultat, et la manière dont chaque type de prestataire les traite. Pour un besoin simple, un logiciel en abonnement fera très bien l'affaire.",
  columns: ["LX Studio", "Agence classique", "Freelance", "Logiciel en abonnement"],
  rows: [
    {
      label: "Installé dans vos outils, sans logiciel de plus",
      marks: ["oui", "variable", "variable", "non"],
    },
    {
      label: "Un seul interlocuteur du premier appel au suivi",
      marks: ["oui", "non", "oui", "non"],
    },
    {
      label: "Devis ferme sur des heures mesurées chez vous",
      marks: ["oui", "variable", "variable", "non"],
    },
    {
      label: "Vos données chez vous ou chez un hébergeur suisse nommé",
      marks: ["oui", "variable", "variable", "variable"],
    },
    { label: "Le temps gagné remesuré un mois après", marks: ["oui", "non", "variable", "non"] },
  ] as ReadonlyArray<{ label: string; marks: ReadonlyArray<Mark> }>,
  legend: "Le trait signifie variable selon le prestataire ou le projet.",
} as const;

/* -------------------------------------------------------------------------- */
/* 6. Comment on travaille                                                    */
/* -------------------------------------------------------------------------- */

export const METHOD = {
  id: "methode",
  eyebrow: "Comment on travaille",
  title: "Toujours la même personne en face.",
  lede: "Ce qui rate dans un projet d'automatisation est rarement technique. C'est la façon dont on travaille ensemble qui décide du résultat.",
  cards: [
    {
      art: "noyau",
      title: "Un interlocuteur unique",
      body: "La personne qui mesure la tâche chez vous est celle qui installe le système et qui vous répond. Rien n'est sous-traité.",
    },
    {
      art: "regle",
      title: "Des points réguliers",
      body: "Vous voyez le système se construire pendant qu'il se construit. Une demi-journée pour mesurer, 48 heures pour le devis, deux à trois semaines pour installer.",
    },
    {
      art: "apres",
      title: "On reste après la mise en service",
      body: "Une journée de formation, tout est écrit. Un mois après, on remesure la tâche du premier jour et le chiffre est revérifié.",
    },
  ],
  /** Jalons de la règle animée. */
  milestones: ["Mesure", "Devis", "Installation", "En service"],
  afterLabel: "En service",
  toolsLabel: "Les outils",
  tools: [
    { name: "WhatsApp", file: "whatsapp.svg" },
    { name: "Gmail", file: "gmail.svg" },
    { name: "Google Agenda", file: "googlecalendar.svg" },
    { name: "Google Sheets", file: "googlesheets.svg" },
    { name: "Bexio", text: "bexio" },
    { name: "Claude", file: "claude.svg" },
    { name: "Anthropic", file: "anthropic.svg" },
    { name: "Supabase", file: "supabase.svg" },
    { name: "Vercel", file: "vercel.svg" },
    { name: "Next.js", file: "nextdotjs.svg" },
    { name: "cal.com", file: "caldotcom.svg" },
    { name: "WinBIZ", text: "winbiz" },
  ] as ReadonlyArray<{ name: string; file?: string; text?: string }>,
  toolsSentence:
    "Outils : WhatsApp, Gmail, Google Agenda, Google Sheets, Bexio, Claude, Anthropic, Supabase, Vercel, Next.js, cal.com, WinBIZ.",
  where:
    "Bassecourt, Jura. La demi-journée d'observation se fait chez vous, partout en Suisse romande.",
  badges: [
    { count: 4, value: "4", label: "Clients au quotidien" },
    { count: null, value: "Certifié", label: CREDENTIAL },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 7. Ce qui est compris                                                      */
/* -------------------------------------------------------------------------- */

export const INCLUDED = {
  id: "offre",
  eyebrow: "Ce qui est compris",
  title: "Tout est compris.",
  lede: "Il n'y a pas d'options à cocher ni de ligne en supplément. La mesure, l'installation, la formation et le suivi forment une seule prestation, parce qu'ils ne se séparent pas.",
  cta: { label: "Voir les tarifs", href: "#tarifs" },
  sheetLabel: "Inventaire",
  sheetCount: "12 lignes",
  items: [
    "Demi-journée d'observation chez vous",
    "Chronométrage de la tâche, avant",
    "Devis ferme avec les heures estimées",
    "Installation dans vos outils : mail, facturation, agenda",
    "Règles écrites avec vous : ce qui part seul, ce qui attend",
    "Validation avant chaque envoi sensible",
    "Tests sur vos vrais dossiers, pas sur des exemples",
    "Vos données chez vous ou chez un hébergeur suisse nommé",
    "Formation de l'équipe, une journée",
    "Tout est écrit, le code vous appartient",
    "Correctifs pendant le premier mois",
    "Remesure un mois après la mise en service",
  ],
  sheetFooter: "Un seul devis.",
} as const;

/* -------------------------------------------------------------------------- */
/* 8. Seuil                                                                   */
/* -------------------------------------------------------------------------- */

export const THRESHOLD = {
  recap: "Vous savez ce qu'on installe, comment on travaille, et ce qu'il y a dedans.",
  pivot: "Reste le prix.",
} as const;

/* -------------------------------------------------------------------------- */
/* 9. Tarifs                                                                  */
/* -------------------------------------------------------------------------- */

export const PRICING = {
  id: "tarifs",
  eyebrow: "Tarifs",
  title: "Le budget, après une demi-journée chez vous.",
  lede: "Il n'y a pas de tarif unique. Chaque projet est chiffré sur une tâche précise : les heures pour construire le système, comparées à ce que la tâche vous coûte aujourd'hui. Le devis est ferme, ce qui est chiffré au départ est ce que vous payez à l'arrivée.",
  cards: [
    {
      label: "Une tâche",
      price: "Devis ferme en 48 h",
      priceNote: "après la demi-journée",
      body: "Un devis dicté, une relance d'impayés, un tri de mails : une tâche précise, mesurée chez vous, puis installée dans vos outils.",
      items: [
        "Demi-journée d'observation sur place",
        "Devis sur heures estimées, sous 48 heures",
        "Installation en deux à trois semaines",
        "Formation d'une journée",
        "Remesure un mois après",
        "Le code et la documentation vous appartiennent",
      ],
      cta: { label: "Réserver 15 minutes", href: BOOKING_URL },
      featured: true,
    },
    {
      label: "Un système complet",
      price: "Sur devis",
      priceNote: "",
      body: "Plusieurs tâches reliées : commandes, facturation, relances, pièces pour la fiduciaire, planning. Le périmètre est défini ensemble avant tout chiffrage.",
      items: [
        "Cadrage sur place, tâche par tâche",
        "Un lot par tâche, livré dans l'ordre",
        "Vos données chez vous ou chez un hébergeur suisse",
        "Comptes et accès par personne",
        "Journal de ce qui a été fait",
        "Suivi après la mise en service",
      ],
      cta: { label: "Décrire votre situation", href: `mailto:${CONTACT_EMAIL}` },
      featured: false,
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 10. Questions                                                              */
/* -------------------------------------------------------------------------- */

export const FAQ = {
  eyebrow: "Questions fréquentes",
  title: "Ce qu'on me demande avant de travailler ensemble.",
  lede: "S'il manque une réponse, elle tient en un message. Je réponds moi-même, dans la journée.",
  entries: [
    {
      q: "Combien ça coûte ?",
      a: "Il n'y a pas de tarif unique. Chaque projet est chiffré sur une tâche précise : les heures pour construire le système, comparées à ce que la tâche vous coûte aujourd'hui. La demi-journée de départ est facturée à part, son prix est annoncé avant de venir. Si le rapport ne tient pas, on s'arrête là.",
    },
    {
      q: "Je ne connais rien à l'informatique. Est-ce que c'est pour moi ?",
      a: "Oui, c'est le cas le plus fréquent. Il n'y a pas de nouveau logiciel à apprendre : le système se branche sur ce que vous utilisez déjà, votre boîte mail, votre téléphone, votre logiciel de facturation. La formation tient en une journée et tout est écrit.",
    },
    {
      q: "Combien de temps ça prend ?",
      a: "Une demi-journée pour mesurer la tâche, 48 heures pour le devis, deux à trois semaines pour installer, une journée pour former. Un mois après la mise en service, on remesure ensemble.",
    },
    {
      q: "Où vont mes données ?",
      a: "Sur une machine dans vos locaux ou chez un hébergeur suisse nommé dans le devis, et rien d'autre n'y est branché sans votre accord écrit. Un informaticien de votre choix peut le vérifier.",
    },
    {
      q: "Et si ça ne marche pas ?",
      a: "La première version est testée sur vos vrais dossiers, pas sur des exemples. Si elle ne tient pas ses promesses, le projet s'arrête et vous n'avez payé que la demi-journée de départ.",
    },
    {
      q: "Qui s'en occupe, et qui s'en occupera dans deux ans ?",
      a: "Tanguy Lachat, fondateur de LX Studio, du premier rendez-vous à la mise en service. Rien n'est sous-traité. Le code et la documentation vous appartiennent : un autre informaticien peut reprendre le système si vous le souhaitez.",
    },
    {
      q: "Faut-il être dans le Jura pour travailler avec vous ?",
      a: "Non. La demi-journée d'observation se fait chez vous, partout en Suisse romande. Le reste, le devis, les points d'avancement et la formation, se fait en visio ou sur place, selon ce qui vous arrange.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 11. Parlons-en                                                             */
/* -------------------------------------------------------------------------- */

export const CONTACT = {
  id: "contact",
  eyebrow: "Parlons-en",
  title: "Commencez par une tâche, pas par un outil.",
  lede: "Quinze minutes au téléphone pour savoir si une tâche de votre entreprise mérite d'être automatisée. Je vous le dirai franchement, même si la réponse est non.",
  cta: { label: "Réserver 15 minutes avec Tanguy", href: BOOKING_URL },
} as const;

/* -------------------------------------------------------------------------- */
/* 12. Pied de page                                                           */
/* -------------------------------------------------------------------------- */

export const FOOTER = {
  contactLabel: "Contact",
  email: CONTACT_EMAIL,
  note: CREDENTIAL,
  brand: "LX Studio",
  claim: "Le travail de bureau, sans vous.",
  socials: [
    { label: "LinkedIn", href: LINKEDIN_URL },
    { label: "Instagram", href: INSTAGRAM_URL },
  ],
  projectLabel: "Un projet ?",
  cta: { label: "Réserver 15 minutes", href: BOOKING_URL },
  alt: { label: "Ou écrire un mail", href: `mailto:${CONTACT_EMAIL}` },
  journalTitle: "Le journal, de temps en temps.",
  journalBody: "Ce qu'on installe chez les clients et ce qu'on y apprend.",
  journalCta: { label: "Lire le journal", to: "/blog" },
  copyright: "2026 LX Studio",
  links: [
    { label: "Accueil", to: "/" },
    { label: "Agent fiduciaire", to: "/fiduciaire" },
    { label: "Mentia", to: "/mentia" },
    { label: "Athlit", to: "/athlit" },
    { label: "Journal", to: "/blog" },
    { label: "Mentions légales", to: "/mentions-legales" },
    { label: "Confidentialité", to: "/politique-de-confidentialite" },
  ],
} as const;
