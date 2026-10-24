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
  /** Texte alternatif du visuel, fabriqué en code tant qu'une photo manque. */
  visualAlt: "Une machine posée dans un bureau, câble réseau débranché : l'IA tourne sur place",
  visualNote:
    "[À COMPLÉTER : photo ou rendu de la machine dans un bureau suisse, câble réseau débranché]",
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
      placeholder: "[À COMPLÉTER : logo Oasis Drink]",
    },
    {
      name: "Coca-Cola HBC",
      note: "Suisse",
      line: "Rapports automatisés",
      logo: "",
      logoNight: "",
      width: 0,
      height: 0,
      placeholder: "[À COMPLÉTER : logo Coca-Cola HBC]",
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
  guarantee: "[À COMPLÉTER : garantie, si Tanguy en valide une]",
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
      a: "Sur une machine installée dans vos locaux, branchée sur votre réseau. Pendant le traitement, aucun appel ne part vers un service externe. Les documents que vous confiez au système restent sur ce disque, chez vous. [À CONFIRMER PAR TANGUY : la machine peut aussi être un serveur déjà présent chez le client]",
    },
    {
      q: "De quel matériel ai-je besoin ?",
      a: "D'une prise, d'un accès à votre réseau et d'un emplacement de la taille d'un petit ordinateur de bureau. La machine est fournie et installée avec le système. [À COMPLÉTER : modèle, mémoire, prix du matériel]",
    },
    {
      q: "Combien ça coûte ?",
      a: "Sur devis après le diagnostic, selon la tâche et le volume. Le devis détaille les heures et ce qui est compris. Rien n'est facturé avant que vous l'ayez validé.",
    },
    {
      q: "Combien de temps prend l'installation ?",
      a: "[À COMPLÉTER : délai] à compter de la validation du devis, mesure comprise. Vous suivez chaque étape et validez le résultat sur vos vrais dossiers avant la mise en service.",
    },
    {
      q: "Faut-il une connexion internet ?",
      a: "Pas pour traiter vos documents. Une connexion sert aux mises à jour, planifiées avec vous, et au suivi à distance si vous l'autorisez. [À CONFIRMER PAR TANGUY]",
    },
    {
      q: "Quelle différence avec ChatGPT Entreprise ou Copilot ?",
      a: "Ces outils tournent sur les serveurs de leur éditeur et demandent à vos équipes de dialoguer avec un chat. Ici, l'IA tourne chez vous et fait une tâche précise toute seule, avec un rapport des heures gagnées chaque mois.",
    },
    {
      q: "Ça fonctionne avec Bexio, Abacus ou ma messagerie ?",
      a: "Bexio : oui, un système connecté à Bexio tourne déjà chez un client. Abacus et les messageries courantes (Microsoft 365, Google Workspace, Infomaniak) : [À COMPLÉTER : état de chaque connecteur].",
    },
    {
      q: "Que se passe-t-il si LX Studio disparaît ?",
      a: "La machine et le système restent chez vous. Le code et la documentation vous sont remis à l'installation, et un autre prestataire peut reprendre la maintenance.",
    },
    {
      q: "Est-ce compatible avec le secret professionnel et la nLPD ?",
      a: "Le système est conçu pour respecter la nLPD : les données restent dans vos murs et ne sont transmises à aucun tiers. Pour le secret professionnel, c'est précisément parce que rien ne sort du cabinet que l'usage devient possible. Le dossier sécurité détaille chaque mesure. [À VÉRIFIER PAR TANGUY : relecture juridique]",
      dossier: true,
    },
  ],
} as const;
