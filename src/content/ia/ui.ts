/**
 * Les petits textes d'interface qui ne sont pas du contenu de page : lien
 * d'évitement, libellés, dates, messages des formulaires. Une version par
 * langue (en/ui.ts pour l'anglais), même forme.
 */
export const UI = {
  lang: "fr",
  htmlLang: "fr-CH",
  ogLocale: "fr_CH",
  dateLocale: "fr-CH",
  langName: "Français",
  skipLink: "Aller au contenu",
  backToTop: "Retour en haut de la page",
  mainNav: "Navigation principale",
  brandHome: "LX Studio, accueil",
  /** Le sélecteur de langue : il pointe vers l'autre langue. */
  switchLabel: "English",
  switchShort: "EN",
  switchTitle: "This page in English",
  breadcrumbHome: "Accueil",
  readingMinutes: "min de lecture",
  by: "Par",
  updatedOn: "Mis à jour le",
  sources: "Sources",
  summaryBox: "En résumé",
  questionLabel: "La question",
  readNext: { eyebrow: "À lire ensuite", title: "D'autres réponses avant d'installer." },
  seeFiduciaires: "Voir pour les fiduciaires",
  byPhone: "Par téléphone :",
  byEmail: "Par e-mail :",
  inCalendar: "En direct dans l'agenda :",
  choose: "Choisir",
  honeypot: "Votre site",
  /** Fin exacte des textes de consentement : ce mot devient le lien. */
  privacyLink: "politique de confidentialité",
  formErrors: {
    name: "Indiquez votre nom.",
    company: "Indiquez le nom de votre entreprise.",
    email: "Indiquez une adresse e-mail valide.",
    phone: "Indiquez un numéro de téléphone.",
    size: "Choisissez une taille d'équipe.",
    task: "Décrivez la tâche en quelques mots.",
    consent: "Votre accord est nécessaire pour traiter la demande.",
    consentDossier: "Votre accord est nécessaire pour recevoir le dossier.",
  },
  dossierVersion: (version: string, date: string) => `Version ${version} · ${date} · 4 pages`,
  securite: {
    tocLabel: "Sommaire",
    measuresTitle: "Les mesures, point par point",
    sourceLabel: "Source :",
    engagementsTitle: "Engagements contractuels",
    engagementsSummary: "Ce que le contrat écrit, et que le dossier reprend en page 4.",
    versionLine: (version: string, date: string) =>
      `Dossier sécurité version ${version} du ${date}. Chaque nouvelle version est datée et numérotée.`,
    ctaTitle: "Votre responsable informatique a une question que cette page ne couvre pas ?",
    ctaText:
      "Posez-la ici ou appelez-moi. Je réponds point par point, par écrit si vous le souhaitez, pour que la réponse puisse être jointe au dossier.",
  },
  resources: {
    eyebrow: "Ressources",
    title: "Ce qu'il faut savoir avant d'installer une IA chez vous.",
    sub: "Des réponses directes, écrites pour les patrons et les responsables qui doivent décider. Chaque article cite ses sources et répond à sa question dès la première phrase.",
    listEyebrow: "Tous les articles",
    listTitle: "Une question par article, la réponse en tête.",
    seo: {
      title: "Ressources : IA locale, nLPD, secret professionnel | LX Studio",
      description:
        "Ce qu'il faut savoir avant d'installer une IA : IA locale et souveraine, ChatGPT et nLPD, secret professionnel, saisie des pièces en fiduciaire.",
      keywords:
        "IA locale Suisse, ChatGPT nLPD entreprise, IA secret professionnel, IA fiduciaire, automatisation administrative IA",
    },
  },
  notFound: {
    eyebrow: "Erreur 404",
    title: "Cette page n'existe pas.",
    text: "Le lien est peut-être ancien. Voici les pages principales du site.",
    seoTitle: "Page introuvable | LX Studio",
  },
  paths: {
    home: "/",
    fiduciaires: "/fiduciaires",
    administrations: "/administrations",
    pme: "/pme",
    securite: "/securite",
    ressources: "/ressources",
    mentions: "/mentions-legales",
    politique: "/politique-de-confidentialite",
  },
  /** Chemin d'un article, à partir de son slug. */
  resourcePath: (slug: string) => `/ressources/${slug}`,
} as const;
