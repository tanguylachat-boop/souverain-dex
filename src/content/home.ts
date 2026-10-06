/**
 * Tout le texte de la page d'accueil, au même endroit.
 *
 * COPY PROVISOIRE. Le brief de la refonte renvoie à un fichier AUDIT.md qui
 * n'existe nulle part. Le texte ci-dessous est écrit sous les contraintes du
 * brief, raccourci de moitié pour la version en sept écrans, et reste à
 * remplacer chaîne par chaîne, sans toucher aux composants.
 *
 * Règles tenues ici : français de Suisse, vouvoiement, aucun tiret long,
 * espace insécable avant « : » et « ? », aucun chiffre inventé (quand une
 * mesure manque, elle est annoncée « en cours »), le travail du client comme
 * sujet.
 */

export const BOOKING_URL = "https://cal.com/lx-studio/15min";
export const CONTACT_EMAIL = "contact@lxstudio.ch";

/** Le titre exact de la certification, à ne pas reformuler. */
export const CREDENTIAL = "Claude Certified Developer, Anthropic";

/* -------------------------------------------------------------------------- */
/* Images                                                                     */
/* -------------------------------------------------------------------------- */

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/**
 * Les fichiers de public/img/ sont provisoires (la mention « image
 * provisoire » est dans l'image), sauf tanguy.jpg. Dimensions et textes
 * alternatifs à ajuster quand les vraies photos arrivent.
 */
export const IMAGES = {
  hero: {
    src: "/img/hero-atelier.webp",
    width: 1600,
    height: 900,
    alt: "Atelier d'une PME romande : établi, outils rangés, lumière du matin",
  },
  chantier: {
    src: "/img/chantier-telephone.webp",
    width: 1200,
    height: 800,
    alt: "Artisan sur un chantier, téléphone à la main, qui dicte un devis",
  },
  factures: {
    src: "/img/factures-relance.webp",
    width: 1200,
    height: 800,
    alt: "Pile de factures sur un bureau, avec un rappel de paiement posé dessus",
  },
  mails: {
    src: "/img/bureau-soir.webp",
    width: 1200,
    height: 800,
    alt: "Bureau d'une petite entreprise le soir, lampe allumée, boîte mail ouverte",
  },
  pieces: {
    src: "/img/pieces-compta.webp",
    width: 1200,
    height: 800,
    alt: "Tickets, factures de fournisseurs et justificatifs étalés sur une table, prêts pour la fiduciaire",
  },
  tanguy: {
    src: "/img/tanguy.jpg",
    width: 600,
    height: 767,
    alt: "Tanguy Lachat, fondateur de LX Studio",
  },
} as const satisfies Record<string, SiteImage>;

/* -------------------------------------------------------------------------- */
/* Référencement                                                              */
/* -------------------------------------------------------------------------- */

export const SEO = {
  path: "/",
  title: "Devis, factures et relances automatisés pour PME romandes | LX Studio",
  description:
    "LX Studio installe dans vos outils un système qui fait le travail de bureau de votre PME : devis, factures, relances, mails qui se répètent, pièces pour la fiduciaire. Le temps gagné est mesuré avant et après. Tanguy Lachat, Bassecourt, Jura.",
  keywords:
    "automatisation PME Suisse romande, devis automatique artisan, relance de factures automatique, agent IA PME, LX Studio, Tanguy Lachat, Jura",
} as const;

export const SERVICE_DESCRIPTION =
  "Une demi-journée d'observation d'une tâche sur place, un devis sur heures estimées, une installation dans les outils existants de l'entreprise, une formation, puis une nouvelle mesure un mois après.";

/* -------------------------------------------------------------------------- */
/* 1. Accueil                                                                 */
/* -------------------------------------------------------------------------- */

export const HERO = {
  eyebrow: "Automatisation pour PME romandes",
  title: "Le travail de bureau se fait sans vous. Vous gardez la main.",
  lede: "Devis, factures, relances, mails qui se répètent : un système installé dans vos outils s'en charge, et vous validez ce qui compte.",
  primary: { label: "Réserver 15 minutes avec Tanguy", href: BOOKING_URL },
  clientsLabel: "Ils l'utilisent chaque jour :",
  clients: ["Oasis Drink Distribution", "Richoz Sanitaire", "Taxi Elsa", "Taxi d'Andrea"],
} as const;

/* -------------------------------------------------------------------------- */
/* 2. Le problème concret                                                     */
/* -------------------------------------------------------------------------- */

export const PROBLEM = {
  id: "probleme",
  eyebrow: "Le problème concret",
  title: "Ce qui vous coûte du temps.",
  lede: "Cinq situations que je retrouve dans presque chaque PME.",
  railLabel: "Cinq situations",
  items: [
    {
      title: "Le devis s'écrit le soir",
      body: "La visite est faite, le client attend, et le devis se rédige à 21 heures.",
    },
    {
      title: "Les impayés ne sont pas relancés",
      body: "Vous savez qu'il y a des retards. Relancer attend, et l'argent aussi.",
    },
    {
      title: "Les mêmes mails, trente fois par semaine",
      body: "Confirmer un rendez-vous, renvoyer une facture : deux minutes chacun, trente fois.",
    },
    {
      title: "La fiduciaire attend ses pièces",
      body: "En fin de mois, une demi-journée à chercher des tickets qui existent déjà quelque part.",
    },
    {
      title: "Tout passe par vous",
      body: "Quand vous n'êtes pas là, rien n'avance. Les vacances se prennent avec le téléphone.",
    },
  ],
} as const;

export const PITFALLS = {
  title: "Les trois façons de rater l'IA",
  items: [
    {
      title: "Acheter un abonnement et attendre",
      body: "Un assistant grand public ne connaît ni vos clients ni vos prix. Au bout d'un mois, plus personne ne l'ouvre.",
    },
    {
      title: "Suivre une formation sans rien installer",
      body: "Une journée d'atelier, une liste d'idées. Six mois plus tard, le devis s'écrit toujours à la main.",
    },
    {
      title: "Confier vos données sans savoir où elles vont",
      body: "Dès qu'un dossier client part on ne sait où, la question devient juridique et le projet s'arrête là.",
    },
  ],
  answer:
    "La bonne façon : partir d'une tâche précise, l'installer dans vos outils, mesurer le temps gagné, et savoir dès le premier jour où sont vos données.",
} as const;

/* -------------------------------------------------------------------------- */
/* 3. Ce qu'on installe                                                       */
/* -------------------------------------------------------------------------- */

export type InstallCard = {
  key: string;
  title: string;
  image: keyof typeof IMAGES;
  summary: string;
  trigger: string;
  happens: string;
  keep: string;
  aside?: { text: string; linkLabel: string; to: "/fiduciaire" };
};

const INSTALL_ITEMS: ReadonlyArray<InstallCard> = [
  {
    key: "devis",
    title: "Le devis dicté",
    image: "chantier",
    summary: "Vous le dictez dans la voiture, il arrive prêt à envoyer avant votre retour.",
    trigger: "Vous sortez de chez le client et vous dictez le devis à votre téléphone, en vrac.",
    happens: "Il est rédigé proprement, avec vos prix et votre mise en page.",
    keep: "Vous relisez, vous corrigez une ligne si besoin, vous envoyez. Rien ne part sans vous.",
  },
  {
    key: "factures",
    title: "Les factures à relancer",
    image: "factures",
    summary: "Un rappel part à l'échéance, puis deux autres si rien ne bouge.",
    trigger: "Une facture dépasse son échéance.",
    happens:
      "Un rappel part au nom de votre entreprise avec la facture jointe, puis un deuxième et un troisième. Les réponses arrivent dans votre boîte habituelle.",
    keep: "Vous fixez le ton et les délais une fois pour toutes. Un client fragile se met en pause en un clic.",
  },
  {
    key: "mails",
    title: "Les mails qui se répètent",
    image: "mails",
    summary:
      "Rendez-vous, copie de facture, suivi de commande : la réponse est préparée dans votre façon d'écrire.",
    trigger: "Un client demande un rendez-vous, une copie de facture ou l'état de sa commande.",
    happens: "La réponse est préparée à partir de vos dossiers et de votre agenda.",
    keep: "Vous décidez quelles réponses partent seules et lesquelles attendent votre accord.",
  },
  {
    key: "pieces",
    title: "Les pièces pour la fiduciaire",
    image: "pieces",
    summary: "Chaque ticket est lu, renommé et classé. En fin de mois, tout est prêt.",
    trigger:
      "Un ticket, une facture de fournisseur ou un justificatif arrive par mail ou en photo.",
    happens:
      "La pièce est lue, renommée avec la date et le fournisseur, puis classée dans le bon dossier.",
    keep: "Vous validez les pièces dont la lecture est incertaine. Le reste se classe seul.",
    aside: {
      text: "Vous êtes vous-même une fiduciaire ?",
      linkLabel: "Voir l'agent pour fiduciaires",
      to: "/fiduciaire",
    },
  },
];

export const INSTALL = {
  id: "installe",
  eyebrow: "Ce qu'on installe",
  title: "Quatre choses qu'on installe le plus souvent.",
  lede: "Les quatre demandes qui reviennent le plus dans une PME de cinq à cinquante personnes.",
  railLabel: "Quatre choses qu'on installe",
  detailLabel: "Voir le détail",
  labels: {
    trigger: "Déclencheur",
    happens: "Ce qui se passe",
    keep: "Ce que vous gardez en main",
  },
  items: INSTALL_ITEMS,
} as const;

/* -------------------------------------------------------------------------- */
/* 4. Résultats clients                                                       */
/* -------------------------------------------------------------------------- */

export type ResultCard = {
  client: string;
  place: string;
  sector: string;
  problem: string;
  installed: string;
  resultLabel: string;
  result: string;
  before: string;
  after: string;
  running: string;
};

const RESULT_ITEMS: ReadonlyArray<ResultCard> = [
  {
    client: "Oasis Drink Distribution",
    place: "Genève",
    sector: "boissons et produits alimentaires pour restaurants",
    problem: "Commandes par WhatsApp, ressaisies dans Excel, impayés jamais relancés.",
    installed: "Commande en ligne, facture avec QR à la livraison, relances en trois paliers.",
    resultLabel: "Heures de bureau par semaine",
    result: "mesure en cours",
    before:
      "Les commandes arrivaient par WhatsApp, étaient ressaisies dans Excel, puis facturées à la main. Personne n'avait le temps de relancer.",
    after:
      "Les restaurants commandent en ligne. La facture part à la livraison. Les retards sont relancés automatiquement, avec la facture jointe.",
    running:
      "Prise de commande, tournées des livreurs avec signature, facturation, relances, relevés de compte.",
  },
  {
    client: "Richoz Sanitaire",
    place: "Petit-Lancy, Genève",
    sector: "installation sanitaire",
    problem: "Mails triés à la main, devis rédigés le soir après les chantiers.",
    installed:
      "Tri des mails, devis depuis le rapport d'intervention, planning, rappel à 40 jours.",
    resultLabel: "Heures de bureau par semaine",
    result: "mesure en cours",
    before:
      "Les mails des régies et des clients étaient triés à la main. Les devis se rédigeaient le soir.",
    after:
      "Chaque mail entrant est classé et rattaché à la bonne régie. Le devis se prépare depuis le rapport d'intervention. La facture se fait dans Bexio, avec un rappel automatique à 40 jours.",
    running:
      "Tri des mails, devis, planning des techniciens, rapports d'intervention, facturation, rappels.",
  },
  {
    client: "Taxi d'Andrea",
    place: "Delémont",
    sector: "chauffeur indépendant",
    problem: "Un chauffeur seul, sans secrétariat, difficile à trouver au bon moment.",
    installed: "Un site d'une seule action, appeler, et une page par prestation.",
    resultLabel: "Appels reçus par le site",
    result: "mesure en cours",
    before:
      "Pour être appelé, il fallait être trouvé sur la bonne recherche, au bon moment, par des clients pressés.",
    after:
      "Le numéro est visible à chaque hauteur de page, et chaque prestation (aéroport, médical, scolaire) a sa page pour sortir sur la recherche qui lui correspond.",
    running: "Le site, son référencement local, et le numéro qui sonne.",
  },
];

export const RESULTS = {
  id: "resultats",
  eyebrow: "Résultats clients",
  title: "Ce que ça a changé chez trois clients.",
  lede: "Des outils utilisés tous les jours par des gens qui ne sont pas informaticiens. Quand la mesure n'est pas faite, c'est écrit.",
  railLabel: "Trois clients",
  detailLabel: "Voir le détail",
  labels: {
    problem: "Problème",
    installed: "Installé",
    result: "Résultat",
    before: "Avant",
    after: "Après",
    running: "Ce qui tourne",
  },
  items: RESULT_ITEMS,
} as const;

/* -------------------------------------------------------------------------- */
/* 5. Comment on travaille                                                    */
/* -------------------------------------------------------------------------- */

export const METHOD = {
  id: "methode",
  eyebrow: "Comment on travaille",
  title: "Quatre étapes.",
  lede: "Et ce que vous recevez à chacune.",
  outputLabel: "Vous repartez avec",
  steps: [
    {
      title: "On regarde une tâche, chez vous",
      duration: "une demi-journée",
      body: "On suit une tâche précise du début à la fin, sur place. On chronomètre, on note les allers-retours et les oublis.",
      output: "un chiffre : ce que cette tâche vous coûte par mois.",
    },
    {
      title: "On décide si ça vaut le coup",
      duration: "48 heures",
      body: "Le temps mesuré est converti en francs et comparé au prix du système. Si le compte n'y est pas, on s'arrête là.",
      output: "un devis ferme, avec les heures estimées.",
    },
    {
      title: "On installe dans vos outils",
      duration: "deux à trois semaines",
      body: "Le système est branché à ce que vous utilisez déjà et testé sur vos vrais dossiers, pas sur des exemples.",
      output: "une version qui traite vos vraies données.",
    },
    {
      title: "On forme, puis on remesure",
      duration: "une journée, puis un mois après",
      body: "Votre équipe apprend à s'en servir, tout est écrit. Un mois après, on remesure la tâche de la première étape.",
      output: "le chiffre revérifié, et un système qui vous appartient.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 6. Questions                                                               */
/* -------------------------------------------------------------------------- */

export const FAQ = {
  eyebrow: "Questions",
  title: "Ce qu'on me demande avant de travailler ensemble.",
  lede: "Les réponses que je donne au téléphone, limites comprises.",
  /** Position de la question qui reçoit le schéma des données. */
  dataQuestionIndex: 3,
  entries: [
    {
      q: "Combien ça coûte ?",
      a: "Il n'y a pas de tarif unique. Chaque projet est chiffré sur une tâche précise : les heures pour construire le système, comparées à ce que la tâche vous coûte aujourd'hui. La demi-journée de départ est facturée à part, son prix est annoncé avant de venir. Si le rapport ne tient pas, on s'arrête là.",
    },
    {
      q: "Je ne connais rien à l'informatique. Est-ce que c'est pour moi ?",
      a: "Oui, c'est le cas le plus fréquent. Il n'y a pas de nouveau logiciel à apprendre : le système se branche sur ce que vous utilisez déjà, votre boîte mail, votre téléphone, votre logiciel de facturation. La formation tient en une journée et tout est écrit.",
    },
    {
      q: "Combien de temps ça prend ?",
      a: "Une demi-journée pour mesurer la tâche, 48 heures pour le devis, deux à trois semaines pour installer, une journée pour former. Un mois après la mise en service, on remesure ensemble.",
    },
    {
      q: "Où vont mes données ?",
      a: "Sur une machine dans vos locaux ou chez un hébergeur suisse nommé dans le devis, et rien d'autre n'y est branché sans votre accord écrit. Un informaticien de votre choix peut le vérifier.",
    },
    {
      q: "Et si ça ne marche pas ?",
      a: "La première version est testée sur vos vrais dossiers, pas sur des exemples. Si elle ne tient pas ses promesses, le projet s'arrête et vous n'avez payé que la demi-journée de départ.",
    },
    {
      q: "Qui s'en occupe, et qui s'en occupera dans deux ans ?",
      a: "Tanguy Lachat, fondateur de LX Studio, du premier rendez-vous à la mise en service. Rien n'est sous-traité. Le code et la documentation vous appartiennent : un autre informaticien peut reprendre le système si vous le souhaitez.",
    },
  ],
} as const;

export const DATA_DIAGRAM = {
  inLabel: "Ce qui entre",
  inputs: ["Votre boîte mail", "Photos et scans", "Votre logiciel de facturation"],
  coreLabel: "Votre périmètre",
  coreTitle: "Le système",
  coreBody:
    "Lit, rédige, classe, relance. Chez vous, ou chez un hébergeur suisse nommé dans le devis.",
  outLabel: "Ce qui sort",
  outputs: ["Devis prêts à envoyer", "Relances parties", "Pièces classées pour la fiduciaire"],
  ariaLabel:
    "Schéma : vos mails, vos photos et scans et votre logiciel de facturation entrent dans le système, installé chez vous ou chez un hébergeur suisse nommé dans le devis. Il en sort des devis prêts à envoyer, des relances parties et des pièces classées pour la fiduciaire.",
} as const;

/* -------------------------------------------------------------------------- */
/* 7. Réserver                                                                */
/* -------------------------------------------------------------------------- */

export const CLOSING = {
  id: "reserver",
  title: "Commencez par une tâche, pas par un outil.",
  body: "Quinze minutes au téléphone pour savoir si une tâche de votre entreprise mérite d'être automatisée. Je vous le dirai franchement, même si la réponse est non.",
  person: "Tanguy Lachat, Bassecourt. Un seul interlocuteur, aucune sous-traitance.",
  credential: CREDENTIAL,
  primary: { label: "Réserver 15 minutes avec Tanguy", href: BOOKING_URL },
  secondary: { label: "Écrire à contact@lxstudio.ch", href: `mailto:${CONTACT_EMAIL}` },
} as const;

export const OTHER_PROJECTS = {
  label: "Autres projets",
  links: [
    { label: "Agent pour fiduciaires", to: "/fiduciaire" },
    { label: "Mentia, visibilité dans les assistants IA", to: "/mentia" },
    { label: "Athlit, coaching sportif", to: "/athlit" },
  ],
} as const;
