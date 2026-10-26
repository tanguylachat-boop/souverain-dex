/**
 * Page d'accueil, section par section, dans l'ordre du brief.
 * Chaque titre est une promesse de ce que le client obtient.
 */

export const HOME_SEO = {
  path: "/",
  title: "IA locale en entreprise, installée chez vous | LX Studio",
  description:
    "Une IA installée sur vos machines, dans vos locaux, qui traite vos pièces comptables, vos mails et vos rapports. Rien ne part chez OpenAI, rien ne sort du bâtiment. Jura et Suisse romande.",
  keywords:
    "IA locale Suisse, IA on-premise Suisse romande, IA souveraine entreprise, IA conforme nLPD, automatisation administrative IA, IA Jura",
} as const;

export const HERO = {
  eyebrow: "IA installée chez vous · Jura · Suisse romande",
  title: "L'IA fait le travail. Vos données ne quittent jamais vos murs.",
  sub: "J'installe chez vous une IA qui traite vos pièces comptables, vos mails et vos rapports, directement sur vos machines. Rien ne part chez OpenAI. Rien ne sort du bâtiment.",
  primary: { label: "Réserver un diagnostic gratuit de 30 minutes", to: "#diagnostic" },
  secondary: { label: "Voir la démo en 2 minutes", to: "#demo" },
  /** Texte alternatif du visuel, fabriqué en code (une photo de la machine peut le remplacer). */
  visualAlt: "Une machine posée dans un bureau, câble réseau débranché : l'IA tourne sur place",
} as const;

/** La démo en 2 minutes : vidéo rendue par `npm run demo` depuis scripts/demo/demo.html. */
export const DEMO = {
  eyebrow: "La démo",
  title: "Deux minutes pour voir une pièce traitée, du scan à l'écriture validée.",
  text: "Une facture d'exemple arrive, est lue, classée et proposée à la validation, sur une machine qui ne fait aucun appel vers l'extérieur pendant le traitement. Une voix explique chaque étape, et tout est aussi écrit à l'écran.",
  play: "Voir la démo en 2 minutes",
  poster: "/demo/demo-poster.jpg",
  mp4: "/demo/demo-lx-studio.mp4",
  webm: "/demo/demo-lx-studio.webm",
  duration: "PT2M",
  uploadDate: "2026-10-24",
  transcriptLabel: "Le texte de la vidéo",
  chapters: [
    {
      time: "0:00",
      title: "Une pièce comptable, du scan à l'écriture validée.",
      text: "Voici ce qui se passe quand une pièce comptable arrive dans un cabinet équipé par LX Studio.",
    },
    {
      time: "0:06",
      title: "La machine est chez vous.",
      text: "La machine est chez vous. Installée dans vos locaux, branchée sur votre réseau. Pendant le traitement, aucun appel ne part vers un service externe : ni vers un éditeur d'intelligence artificielle, ni vers LX Studio.",
    },
    {
      time: "0:20",
      title: "Les pièces arrivent comme aujourd'hui.",
      text: "Les pièces arrivent comme aujourd'hui. Par le scanner, par e-mail, par une photo prise au téléphone. Rien ne change pour vos clients ni pour vos collaborateurs.",
    },
    {
      time: "0:34",
      title: "Lue sur place.",
      text: "La pièce est lue sur place. Le fournisseur, la date, les montants, la TVA, la référence de la facture QR : tout est extrait sur la machine, dans vos murs.",
    },
    {
      time: "0:49",
      title: "Classée, renommée.",
      text: "Elle est ensuite classée dans le dossier du bon mandat. Et renommée selon votre convention, prête pour l'archivage.",
    },
    {
      time: "1:01",
      title: "L'écriture est proposée. Vous validez.",
      text: "L'écriture est proposée dans votre logiciel comptable, avec le compte et le code TVA déduits de vos écritures passées. Un clic pour valider. Un clic pour corriger. Si vous corrigez, le système retient la correction pour ce mandat et la propose la fois suivante.",
    },
    {
      time: "1:23",
      title: "Ce qu'il ne comprend pas, il le met de côté.",
      text: "Ce qu'il ne comprend pas, il le met de côté. Avec la raison. Rien n'est comptabilisé sans votre clic.",
    },
    {
      time: "1:37",
      title: "Chaque mois, un rapport.",
      text: "Et chaque mois, un rapport : les pièces traitées, les heures de saisie récupérées, les corrections apportées. Comparé à la mesure faite avant l'installation. Mesuré chez vous, pas promis.",
    },
    {
      time: "1:51",
      title: "Rien n'est sorti du cabinet.",
      text: "Rien n'est sorti du cabinet. Réservez un diagnostic gratuit de 30 minutes sur lxstudio.ch.",
    },
  ],
} as const;

export const CREDIBILITY = {
  eyebrow: "Références",
  title: "Ils m'ont confié leurs process",
  clients: [
    {
      name: "Facchinetti Automobiles",
      note: "BMW Delémont",
      line: "Capture des contacts et fiches véhicules par QR code au Comptoir du Jura",
      logo: "/logos/facchinetti.png",
      logoNight: "/logos/facchinetti-blanc.png",
      width: 640,
      height: 158,
    },
    {
      name: "Richoz Sanitaire",
      note: "Genève",
      line: "Gestion des interventions et des techniciens, connectée à Bexio",
      logo: "/logos/richoz.webp",
      logoNight: "/logos/richoz.webp",
      width: 350,
      height: 131,
    },
    {
      name: "Oasis Drink",
      note: "Distribution de boissons",
      line: "Système de commande pour un distributeur de boissons",
      logo: "",
      logoNight: "",
      width: 0,
      height: 0,
    },
    {
      name: "Coca-Cola HBC",
      note: "Suisse",
      line: "Rapports automatisés",
      logo: "",
      logoNight: "",
      width: 0,
      height: 0,
      /** Seulement avec l'accord écrit (variable SHOW_CCHBC). */
      gated: true,
    },
  ],
} as const;

export const PROBLEM = {
  eyebrow: "Le problème",
  title: "Vous voulez l'IA. Vous ne pouvez pas y mettre vos dossiers.",
  blocks: [
    "Vos équipes passent des heures sur de la saisie, du tri et des relances.",
    "ChatGPT ou Copilot les aideraient, mais vos données partiraient sur des serveurs américains.",
    "Alors vous attendez, pendant que l'administratif continue de manger des journées.",
  ],
} as const;

export const DIFFERENCE = {
  eyebrow: "La différence",
  title: "Les autres vous vendent un serveur. Moi, je vous livre le travail fait.",
  columns: ["Une IA générique", "LX Studio"],
  rows: [
    { label: "Ce qu'on installe", generic: "Un chat", lx: "Une tâche précise qui tourne seule" },
    {
      label: "Qui doit l'utiliser",
      generic: "Vos équipes doivent apprendre",
      lx: "Ça tourne en arrière-plan",
    },
    { label: "Comment on mesure", generic: "Rien", lx: "Les heures récupérées chaque mois" },
    { label: "Où sont les données", generic: "Souvent dans le cloud", lx: "Chez vous" },
  ],
} as const;

export const METHOD = {
  eyebrow: "La méthode",
  title: "On mesure avant d'installer, et on contrôle après.",
  steps: [
    {
      title: "Diagnostic",
      meta: "30 minutes, gratuit",
      text: "On identifie les tâches qui vous coûtent le plus d'heures.",
    },
    {
      title: "Mesure",
      meta: "Avant de signer",
      text: "On chronomètre ces tâches et on chiffre les heures récupérables, avant que vous signiez quoi que ce soit.",
    },
    {
      title: "Solution",
      meta: "Chez vous",
      text: "L'IA est installée sur votre machine, chez vous, et branchée sur vos outils : Bexio, messagerie, dossiers.",
    },
    {
      title: "Contrôle",
      meta: "Chaque mois",
      text: "Un suivi chaque mois, pendant plusieurs mois, avec un rapport des heures réellement gagnées. Si l'écart avec la mesure est trop grand, on ajuste.",
    },
  ],
  /** Garantie : aucune publiée tant que Tanguy n'en valide pas le texte (question 10). */
  guarantee: "",
} as const;

export const SECTORS = {
  eyebrow: "Par métier",
  title: "Une tâche précise, pour votre métier.",
  cards: [
    {
      to: "/fiduciaires",
      kicker: "Fiduciaires",
      title: "Vos pièces saisies toutes seules, sans qu'un dossier client quitte le cabinet.",
      cta: "Voir pour les fiduciaires",
    },
    {
      to: "/administrations",
      kicker: "Polices et administrations",
      title: "Rapports rédigés et documents anonymisés, sur vos serveurs.",
      cta: "Voir pour les administrations",
    },
    {
      to: "/pme",
      kicker: "PME",
      title: "Mails triés, factures relancées, sans abonnement cloud.",
      cta: "Voir pour les PME",
    },
  ],
} as const;

export const ARTICLES_TEASER = {
  eyebrow: "Ressources",
  title: "Ce qu'il faut savoir avant d'installer une IA chez vous.",
  cta: { label: "Toutes les ressources", to: "/ressources" },
  /** Les quatre articles du brief, par slug. */
  slugs: [
    "ia-locale-entreprise-suisse",
    "chatgpt-nlpd-entreprise",
    "secret-professionnel-ia",
    "fiduciaire-automatiser-saisie-pieces-ia",
  ],
} as const;

export const FORM = {
  id: "diagnostic",
  eyebrow: "Diagnostic gratuit",
  title:
    "Dites-moi quelle tâche vous coûte le plus. Je vous dis en 30 minutes ce que l'IA peut en faire.",
  text: "Réponse sous un jour ouvré. Le diagnostic est gratuit et n'engage à rien.",
  fields: {
    name: "Votre nom",
    company: "Entreprise",
    email: "E-mail",
    phone: "Téléphone",
    size: "Nombre de collaborateurs",
    task: "La tâche qui vous prend le plus de temps",
    taskPlaceholder:
      "Par exemple : la saisie des pièces du lundi, les relances de fin de mois, le tri de la boîte info@",
  },
  sizes: ["1 à 5", "6 à 20", "21 à 50", "51 à 200", "Plus de 200"],
  consent:
    "J'accepte que mes données soient utilisées pour traiter ma demande, conformément à la politique de confidentialité.",
  submit: "Demander mon diagnostic",
  sending: "Envoi en cours",
  success: {
    title: "Merci, votre demande est bien partie.",
    text: "Je vous réponds sous un jour ouvré. Pour aller plus vite, vous pouvez réserver directement un créneau de 30 minutes.",
    cta: "Réserver le diagnostic",
  },
  error:
    "L'envoi n'a pas abouti. Écrivez-moi directement à contact@lxstudio.ch ou appelez le 078 703 88 00.",
} as const;

export const FAQ = {
  eyebrow: "Questions fréquentes",
  title: "Les questions qu'on me pose avant d'installer.",
  entries: [
    {
      q: "Où tournent mes données, exactement ?",
      a: "Sur une machine installée dans vos locaux, branchée sur votre réseau. Pendant le traitement, aucun appel ne part vers un service externe. Les documents que vous confiez au système restent sur ce disque, chez vous.",
    },
    {
      q: "De quel matériel ai-je besoin ?",
      a: "D'une prise, d'un accès à votre réseau et d'un emplacement de la taille d'un petit ordinateur de bureau. La machine est fournie et installée avec le système ; son modèle et son prix figurent dans le devis, dimensionnés pour votre volume.",
    },
    {
      q: "Combien ça coûte ?",
      a: "Sur devis après le diagnostic, selon la tâche et le volume. Le devis détaille les heures et ce qui est compris. Rien n'est facturé avant que vous l'ayez validé.",
    },
    {
      q: "Combien de temps prend l'installation ?",
      a: "Le délai est fixé dans le devis et court à compter de sa validation, mesure comprise. Vous suivez chaque étape et validez le résultat sur vos vrais dossiers avant la mise en service.",
    },
    {
      q: "Faut-il une connexion internet ?",
      a: "Pas pour traiter vos documents. Une connexion sert aux mises à jour, planifiées avec vous, et au suivi à distance si vous l'autorisez.",
    },
    {
      q: "Quelle différence avec ChatGPT Entreprise ou Copilot ?",
      a: "Ces outils tournent sur les serveurs de leur éditeur et demandent à vos équipes de dialoguer avec un chat. Ici, l'IA tourne chez vous et fait une tâche précise toute seule, avec un rapport des heures gagnées chaque mois.",
    },
    {
      q: "Ça fonctionne avec Bexio, Abacus ou ma messagerie ?",
      a: "Bexio : oui, un système connecté à Bexio tourne déjà chez un client. Abacus et les messageries courantes (Microsoft 365, Google Workspace, Infomaniak) : l'état du connecteur est précisé lors du diagnostic, selon votre outil et sa version.",
    },
    {
      q: "Que se passe-t-il si LX Studio disparaît ?",
      a: "La machine et le système restent chez vous. Le code et la documentation vous sont remis à l'installation, et un autre prestataire peut reprendre la maintenance.",
    },
    {
      q: "Est-ce compatible avec le secret professionnel et la nLPD ?",
      a: "Le système est conçu pour respecter la nLPD : les données restent dans vos murs et ne sont transmises à aucun tiers. Pour le secret professionnel, c'est précisément parce que rien ne sort du cabinet que l'usage devient possible. Le dossier sécurité détaille chaque mesure.",
      dossier: true,
    },
  ],
} as const;
