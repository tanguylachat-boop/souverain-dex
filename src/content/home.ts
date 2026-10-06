/**
 * Tout le texte de la page d'accueil, au même endroit.
 *
 * COPY PROVISOIRE. Le brief de la refonte renvoie à un fichier AUDIT.md
 * (diagnostic et copy réécrit section par section) qui n'existe ni dans ce
 * dépôt, ni sur une branche distante, ni ailleurs sur la machine au moment de
 * la refonte. Le texte ci-dessous a été écrit pour que la page soit complète,
 * vérifiable et déployable ; il est à remplacer par le copy d'AUDIT.md, chaîne
 * par chaîne, sans toucher aux composants.
 *
 * Règles tenues ici : français de Suisse, vouvoiement, aucun tiret long, aucun
 * chiffre inventé (quand une mesure manque, elle est annoncée « en cours »),
 * et le sujet des phrases est le travail du client, pas la technique.
 */

export const BOOKING_URL = "https://cal.com/lx-studio/15min";
export const CONTACT_EMAIL = "contact@lxstudio.ch";

/**
 * Le titre exact de la certification. Le programme d'Anthropic nomme ses
 * titres précisément ; un titre déformé vaut moins qu'aucun titre.
 */
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
 * Les fichiers de public/img/ sont, pour l'instant, des images provisoires
 * fabriquées à partir des anciens visuels du site (l'image porte la mention
 * « image provisoire » dans son coin). Les dimensions ci-dessous sont celles
 * des fichiers provisoires : à ajuster aux vraies photos quand elles arrivent,
 * et les textes alternatifs décrivent la photo attendue, pas le provisoire.
 */
export const IMAGES = {
  hero: {
    src: "/img/hero-atelier.webp",
    width: 1600,
    height: 900,
    alt: "Atelier d'une PME romande : établi, outils rangés, lumière du matin",
  },
  bureau: {
    src: "/img/bureau-soir.webp",
    width: 1200,
    height: 800,
    alt: "Bureau d'une petite entreprise le soir, lampe allumée, devis et factures à côté de l'ordinateur",
  },
  chantier: {
    src: "/img/chantier-telephone.webp",
    width: 1200,
    height: 800,
    alt: "Artisan sur un chantier, téléphone à la main, qui dicte un devis",
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
    "LX Studio installe dans vos outils un système qui fait le travail de bureau de votre PME : devis, factures, relances, mails qui se répètent, pièces pour la fiduciaire. Le temps gagné est mesuré avant et après. Tanguy Lachat, Bassecourt, Jura.",
  keywords:
    "automatisation PME Suisse romande, devis automatique artisan, relance de factures automatique, agent IA PME, LX Studio, Tanguy Lachat, Jura",
} as const;

export const SERVICE_DESCRIPTION =
  "Une demi-journée d'observation d'une tâche sur place, un devis sur heures estimées, une installation dans les outils existants de l'entreprise, une formation, puis une nouvelle mesure un mois après.";

/* -------------------------------------------------------------------------- */
/* 1. Accueil                                                                 */
/* -------------------------------------------------------------------------- */

export const HERO = {
  eyebrow: "Automatisation pour PME · Jura et Suisse romande",
  title: "Le travail de bureau se fait sans vous. Vous gardez la main.",
  lede: "Devis, factures, relances, mails qui reviennent chaque semaine : un système installé dans vos outils s'en charge. Vous validez ce qui compte. Le temps gagné est mesuré, pas promis.",
  primary: { label: "Réserver 15 minutes avec Tanguy", href: BOOKING_URL },
  secondary: { label: "Voir les trois cas clients", href: "#preuve" },
  trust: [
    "Trois PME romandes équipées",
    "Basé à Bassecourt, dans le Jura",
    "Aucune sous-traitance",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 2. Preuve                                                                  */
/* -------------------------------------------------------------------------- */

export const CLIENT_ROW = {
  label: "Ils travaillent chaque jour avec des systèmes que j'ai installés",
  names: ["Oasis Drink Distribution", "Richoz Sanitaire", "Taxi Elsa", "Taxi d'Andrea"],
} as const;

export type ProofCard = {
  client: string;
  place: string;
  sector: string;
  before: string;
  after: string;
  running: string;
  measure: { label: string; value: string };
};

const PROOF_CARDS: ReadonlyArray<ProofCard> = [
  {
    client: "Oasis Drink Distribution",
    place: "Genève",
    sector: "Boissons et produits alimentaires livrés aux restaurants",
    before:
      "Les commandes arrivaient par WhatsApp, étaient ressaisies dans Excel, puis facturées à la main. Personne n'avait le temps de relancer les factures en retard.",
    after:
      "Les restaurants commandent en ligne. La facture avec QR part à la livraison. Les retards de paiement sont relancés automatiquement, en trois paliers, avec la facture jointe.",
    running:
      "Prise de commande, tournées des livreurs avec signature, facturation, relances, relevés de compte.",
    measure: { label: "Heures de bureau récupérées par semaine", value: "mesure en cours" },
  },
  {
    client: "Richoz Sanitaire",
    place: "Petit-Lancy, Genève",
    sector: "Installation sanitaire",
    before:
      "Les mails des régies et des clients étaient triés à la main. Les devis se rédigeaient le soir, après les chantiers.",
    after:
      "Chaque mail entrant est classé (intervention, devis, information) et rattaché à la bonne régie. Le devis se prépare depuis le rapport d'intervention et part en une douzaine de minutes. La facture se fait dans Bexio, avec un rappel automatique à 40 jours.",
    running:
      "Tri des mails, devis, planning des techniciens, rapports d'intervention, facturation, rappels.",
    measure: { label: "Heures de bureau récupérées par semaine", value: "mesure en cours" },
  },
  {
    client: "Taxi d'Andrea",
    place: "Delémont",
    sector: "Chauffeur indépendant : aéroport, transport médical et scolaire",
    before:
      "Un chauffeur seul, sans secrétariat. Pour être appelé, il fallait être trouvé sur la bonne recherche, au bon moment, par des clients pressés.",
    after:
      "Un site qui ne propose qu'une action : appeler. Le numéro est visible à chaque hauteur de page, et chaque prestation a sa page pour sortir sur la recherche qui lui correspond.",
    running: "Le site, son référencement local, et le numéro qui sonne.",
    measure: { label: "Appels reçus par le site", value: "mesure en cours" },
  },
];

export const PROOF = {
  id: "preuve",
  eyebrow: "Trois clients, trois systèmes en service",
  title: "Ce qui tourne aujourd'hui chez trois entreprises romandes.",
  lede: "Pas de démonstration : des outils utilisés tous les jours par des gens qui ne sont pas informaticiens. Quand une mesure n'est pas encore faite, c'est écrit.",
  labels: { before: "Avant", after: "Après", running: "Ce qui tourne" },
  cards: PROOF_CARDS,
} as const;

/* -------------------------------------------------------------------------- */
/* 3. Ce qui vous coûte du temps aujourd'hui                                  */
/* -------------------------------------------------------------------------- */

export const TIME_COST = {
  id: "temps",
  eyebrow: "Là où partent vos heures",
  title: "Ce qui vous coûte du temps aujourd'hui.",
  lede: "Cinq situations que je retrouve dans presque chaque PME. Si vous en reconnaissez deux, il y a des heures à récupérer chaque semaine.",
  items: [
    {
      title: "Le devis s'écrit le soir",
      body: "La visite est faite, le client attend, et le devis se rédige à 21 heures sur un coin de table. Trois jours plus tard, le client a signé ailleurs.",
    },
    {
      title: "Les factures en retard ne sont pas relancées",
      body: "Vous savez qu'il y a des impayés. Relancer demande de sortir la liste, de vérifier qui a payé, d'écrire un mail poli. Ça attend. L'argent aussi.",
    },
    {
      title: "Les mêmes mails, trente fois par semaine",
      body: "Confirmer un rendez-vous, renvoyer une facture, dire que le devis arrive. Deux minutes chacun, et il y en a trente.",
    },
    {
      title: "La fiduciaire attend ses pièces",
      body: "En fin de mois, il faut retrouver les tickets, les factures des fournisseurs, les justificatifs. Une demi-journée à chercher des papiers qui existent déjà quelque part.",
    },
    {
      title: "Tout passe par vous",
      body: "Quand vous n'êtes pas là, rien n'avance : le planning, les réponses aux clients, les validations. Les vacances se prennent avec le téléphone dans la poche.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 4. Les trois façons de rater l'IA                                          */
/* -------------------------------------------------------------------------- */

export const PITFALLS = {
  id: "erreurs",
  eyebrow: "Avant de signer quoi que ce soit",
  title: "Les trois façons de rater l'IA.",
  lede: "Je les vois chez des entreprises qui ont déjà essayé une fois. Elles ne tiennent pas à la technique, mais à la façon de commencer.",
  items: [
    {
      title: "Acheter un abonnement et attendre",
      body: "Un assistant grand public ne connaît ni vos clients, ni vos prix, ni votre façon d'écrire. Il répond bien aux questions générales et mal aux vôtres. Au bout d'un mois, plus personne ne l'ouvre.",
    },
    {
      title: "Suivre une formation sans rien installer",
      body: "Une journée d'atelier, une liste d'idées, un compte rendu. Six mois plus tard, le devis s'écrit toujours à la main, le soir.",
    },
    {
      title: "Confier vos données sans savoir où elles vont",
      body: "Dès qu'un dossier client part sur un serveur dont personne ne connaît l'adresse, la question devient juridique. Beaucoup de projets s'arrêtent là, parce que personne ne l'a posée au départ.",
    },
  ],
  answer:
    "La bonne façon tient en une phrase : partir d'une tâche précise, l'installer dans vos outils, mesurer le temps gagné, et savoir dès le premier jour où sont vos données.",
} as const;

/* -------------------------------------------------------------------------- */
/* 5. Méthode                                                                 */
/* -------------------------------------------------------------------------- */

export const PROCESS = {
  id: "methode",
  eyebrow: "Comment on travaille",
  title: "Quatre étapes, et ce que vous recevez à chacune.",
  outputLabel: "Vous repartez avec",
  steps: [
    {
      title: "On regarde une tâche, chez vous",
      duration: "une demi-journée",
      body: "On suit une tâche précise du début à la fin, sur place. On chronomètre, on note les allers-retours, les reprises, les oublis.",
      output: "un chiffre : ce que cette tâche vous coûte par mois.",
    },
    {
      title: "On décide si ça vaut le coup",
      duration: "48 heures",
      body: "Le temps mesuré est converti en francs et comparé au prix du système. Si le compte n'y est pas, on s'arrête là et vous n'avez payé que la demi-journée.",
      output: "un devis ferme, avec les heures estimées.",
    },
    {
      title: "On installe dans vos outils",
      duration: "deux à trois semaines",
      body: "Le système est construit et branché à ce que vous utilisez déjà : la boîte mail, le logiciel de facturation, l'agenda. Il est testé sur vos vrais dossiers, pas sur des exemples.",
      output: "une version qui traite vos vraies données.",
    },
    {
      title: "On forme, puis on remesure",
      duration: "une journée, puis un mois plus tard",
      body: "Votre équipe apprend à s'en servir et tout est écrit noir sur blanc. Un mois après, on remesure la tâche de la première étape pour vérifier que le chiffre a bougé.",
      output: "le chiffre revérifié, et un système qui vous appartient.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 6. Exemples                                                                */
/* -------------------------------------------------------------------------- */

export type ExampleCard = {
  key: string;
  title: string;
  image?: keyof typeof IMAGES;
  trigger: string;
  happens: string;
  keep: string;
  aside?: { text: string; linkLabel: string; to: "/fiduciaire" };
};

const EXAMPLE_ITEMS: ReadonlyArray<ExampleCard> = [
  {
    key: "devis",
    title: "Le devis dicté",
    image: "chantier",
    trigger:
      "Vous sortez de chez le client et vous dictez le devis à votre téléphone, en vrac, dans la voiture.",
    happens:
      "Le devis est rédigé proprement, avec vos prix et votre mise en page, et vous arrive prêt à envoyer avant que vous soyez rentré.",
    keep: "Vous relisez, vous corrigez une ligne si besoin, vous envoyez. Rien ne part sans vous.",
  },
  {
    key: "factures",
    title: "Les factures à relancer",
    trigger: "Une facture dépasse son échéance.",
    happens:
      "Un rappel part au nom de votre entreprise, avec la facture jointe. Puis un deuxième et un troisième si rien ne bouge. Les réponses arrivent dans votre boîte habituelle.",
    keep: "Vous fixez le ton et les délais une fois pour toutes. Un client fragile se met en pause en un clic.",
  },
  {
    key: "mails",
    title: "Les mails qui se répètent",
    trigger: "Un client demande un rendez-vous, une copie de facture ou l'état de sa commande.",
    happens:
      "La réponse est préparée à partir de vos dossiers et de votre agenda, dans votre façon d'écrire.",
    keep: "Vous décidez quelles réponses partent seules et lesquelles attendent votre accord.",
  },
  {
    key: "pieces",
    title: "Les pièces pour la fiduciaire",
    image: "pieces",
    trigger:
      "Un ticket, une facture de fournisseur ou un justificatif arrive par mail ou en photo.",
    happens:
      "La pièce est lue, renommée avec la date et le fournisseur, puis classée dans le bon dossier. En fin de mois, tout est prêt pour la fiduciaire.",
    keep: "Vous validez les pièces dont la lecture est incertaine. Le reste se classe seul.",
    aside: {
      text: "Vous êtes vous-même une fiduciaire ? Il existe une version pensée pour les cabinets.",
      linkLabel: "Voir l'agent pour fiduciaires",
      to: "/fiduciaire",
    },
  },
];

export const EXAMPLES = {
  id: "exemples",
  eyebrow: "Ce qu'on installe le plus souvent",
  title: "Quatre tâches, et ce que vous gardez en main dans chacune.",
  lede: "Aucune n'est une idée en l'air : ce sont les quatre demandes qui reviennent le plus dans une PME de cinq à cinquante personnes.",
  labels: {
    trigger: "Déclencheur",
    happens: "Ce qui se passe",
    keep: "Ce que vous gardez en main",
  },
  items: EXAMPLE_ITEMS,
} as const;

/* -------------------------------------------------------------------------- */
/* 7. Infrastructure                                                          */
/* -------------------------------------------------------------------------- */

export const INFRA = {
  id: "donnees",
  eyebrow: "Vos données",
  title: "Où vont vos données, décidé avant de commencer.",
  sentence:
    "Le système tourne soit sur une machine dans vos locaux, soit chez un hébergeur suisse nommé dans le devis, et rien d'autre n'y est branché sans votre accord écrit.",
  diagram: {
    inLabel: "Ce qui entre",
    inputs: ["Votre boîte mail", "Photos et scans", "Votre logiciel de facturation"],
    coreLabel: "Votre périmètre",
    coreTitle: "Le système",
    coreBody:
      "Lit, rédige, classe, relance. Chez vous, ou chez un hébergeur suisse nommé dans le devis.",
    outLabel: "Ce qui sort",
    outputs: ["Devis prêts à envoyer", "Relances parties", "Pièces classées pour la fiduciaire"],
    ariaLabel:
      "Schéma : vos mails, vos photos et scans et votre logiciel de facturation entrent dans le système, installé chez vous ou chez un hébergeur suisse nommé dans le devis. Il en sort des devis prêts à envoyer, des relances parties et des pièces classées pour la fiduciaire.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* 8. Questions fréquentes                                                    */
/* -------------------------------------------------------------------------- */

export const FAQ = {
  eyebrow: "Questions fréquentes",
  title: "Ce qu'on me demande avant de travailler ensemble.",
  lede: "Les réponses sont celles que je donne au téléphone, limites comprises.",
  entries: [
    {
      q: "Combien ça coûte ?",
      a: "Il n'y a pas de tarif unique. Chaque projet est chiffré sur une tâche précise : les heures nécessaires pour construire le système, comparées à ce que la tâche vous coûte aujourd'hui. La demi-journée de départ est facturée à part et son prix est annoncé avant de venir. Si le rapport ne tient pas, on s'arrête là.",
    },
    {
      q: "Je ne connais rien à l'informatique. Est-ce que c'est pour moi ?",
      a: "Oui, c'est le cas le plus fréquent. Il n'y a pas de nouveau logiciel à apprendre : le système se branche sur ce que vous utilisez déjà, votre boîte mail, votre téléphone, votre logiciel de facturation. La formation tient en une journée et tout est écrit.",
    },
    {
      q: "Mes données partent-elles à l'étranger ?",
      a: "Non, sauf si vous le décidez. Le système tourne sur une machine dans vos locaux ou chez un hébergeur suisse, nommé dans le devis. Ce qui y est branché est écrit avant de commencer, et un informaticien de votre choix peut le vérifier.",
    },
    {
      q: "Et si ça ne marche pas ?",
      a: "La première version est testée sur vos vrais dossiers, pas sur des exemples. Si elle ne tient pas ses promesses, le projet s'arrête et vous n'avez payé que la demi-journée de départ. Un mois après la mise en service, on remesure la tâche ensemble.",
    },
    {
      q: "Qui s'en occupe, et qui s'en occupera dans deux ans ?",
      a: "Tanguy Lachat, fondateur de LX Studio, du premier rendez-vous à la mise en service. Rien n'est sous-traité. Le code et la documentation vous appartiennent : un autre informaticien peut reprendre le système si vous le souhaitez.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 9. À propos                                                                */
/* -------------------------------------------------------------------------- */

export const ABOUT = {
  id: "a-propos",
  eyebrow: "Qui s'en occupe",
  title: "Tanguy Lachat, 24 ans, Bassecourt.",
  body: "Je construis des systèmes qui font le travail de bureau des PME, et je les installe moi-même, sur place, en Suisse romande. J'ai commencé par les métiers où la confidentialité ne se négocie pas, parce que c'est le cas le plus exigeant et que le reste en découle.",
  credential: CREDENTIAL,
  trust: [
    "Sur place en Suisse romande",
    "Un seul interlocuteur du début à la fin",
    "Aucune sous-traitance",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 10. Dernier appel                                                          */
/* -------------------------------------------------------------------------- */

export const CTA = {
  title: "Commencez par une tâche, pas par un outil.",
  body: "Quinze minutes au téléphone suffisent pour savoir si une tâche de votre entreprise mérite d'être automatisée. Vous décrivez la tâche, on estime ce qu'elle vous coûte par mois, et je vous dis franchement si ça vaut le coup.",
  primary: { label: "Réserver 15 minutes avec Tanguy", href: BOOKING_URL },
  secondary: { label: "Écrire à contact@lxstudio.ch", href: `mailto:${CONTACT_EMAIL}` },
  note: "Sans engagement. Si l'automatisation n'a pas de sens dans votre cas, je vous le dirai pendant l'appel.",
} as const;

export const OTHER_PROJECTS = {
  label: "Autres projets",
  links: [
    { label: "Agent pour fiduciaires", to: "/fiduciaire" },
    { label: "Mentia, visibilité dans les assistants IA", to: "/mentia" },
    { label: "Athlit, coaching sportif", to: "/athlit" },
  ],
} as const;
