/**
 * Ce qui est commun à toutes les pages : coordonnées, navigation, pied de
 * page, ligne de confiance. Tout texte visible vit ici ou dans les autres
 * fichiers de `content/ia/`, jamais dans un composant.
 *
 * Règles : vouvoiement, français de Suisse, aucun tiret long, aucune
 * statistique inventée. Ce qui manque n'est pas inventé : il est listé dans
 * docs/a-completer.md et la phrase est écrite pour tenir sans la donnée.
 */

export const SITE = {
  name: "LX Studio",
  url: "https://lxstudio.ch",
  email: "contact@lxstudio.ch",
  phone: "078 703 88 00",
  phoneHref: "tel:+41787038800",
  founder: "Tanguy Lachat",
  address: {
    street: "Rue des Romains 25",
    zip: "2854",
    city: "Bassecourt",
    region: "Jura",
    country: "Suisse",
  },
  /** Lien de réservation du diagnostic : l'événement « Rendez-vous de 30 min » de cal.com/lx-studio (vérifié le 26.10.2026). */
  bookingHref: "https://cal.com/lx-studio/30min",
  /** Numéro IDE et statut TVA, tels qu'ils figurent sur les factures LX Studio. */
  ide: "CHE-325.224.095",
  vat: "Non assujettie à la TVA (art. 10 al. 2 let. a LTVA)",
  /** Affiche Coca-Cola HBC dans les références seulement avec l'accord écrit. */
  showCchbc: false,
} as const;

/** Un lien de réservation, ou le formulaire de la page si le lien manque. */
export function bookingHref(fallback = "#diagnostic"): string {
  return SITE.bookingHref || fallback;
}

export const NAV = {
  brand: "LX Studio",
  menuLabel: "Menu",
  closeLabel: "Fermer",
  /** Entrées principales. « Métiers » ouvre un panneau avec les trois pages. */
  metiersLabel: "Métiers",
  metiers: [
    {
      to: "/fiduciaires",
      label: "Fiduciaires",
      text: "Vos pièces saisies toutes seules, sans qu'un dossier client quitte le cabinet.",
    },
    {
      to: "/administrations",
      label: "Polices et administrations",
      text: "Rapports rédigés et documents anonymisés, sur vos serveurs.",
    },
    {
      to: "/pme",
      label: "PME",
      text: "Mails triés, factures relancées, sans abonnement cloud.",
    },
  ],
  links: [
    { to: "/securite", label: "Sécurité" },
    { to: "/ressources", label: "Ressources" },
  ],
  cta: { label: "Réserver un diagnostic", to: "/", hash: "diagnostic" },
} as const;

/** Ligne de confiance sous les boutons du premier écran. */
export const TRUST = [
  "Installé sur site",
  "Conçu pour la nLPD",
  "Basé dans le Jura, actif dans toute la Suisse romande",
] as const;

export const FOOTER = {
  brand: "LX Studio",
  claim:
    "Une IA installée chez vous, qui fait le travail. Vos données ne quittent jamais vos murs.",
  contactLabel: "Contact",
  columns: [
    {
      title: "Métiers",
      links: [
        { to: "/fiduciaires", label: "Fiduciaires" },
        { to: "/administrations", label: "Polices et administrations" },
        { to: "/pme", label: "PME" },
      ],
    },
    {
      title: "Sécurité et ressources",
      links: [
        { to: "/securite", label: "Sécurité et conformité" },
        { to: "/securite", hash: "dossier", label: "Dossier sécurité (PDF)" },
        { to: "/ressources", label: "Ressources" },
      ],
    },
    {
      title: "Informations",
      links: [
        { to: "/mentions-legales", label: "Mentions légales" },
        { to: "/politique-de-confidentialite", label: "Politique de confidentialité" },
      ],
    },
  ],
  // L'année est ajoutée au rendu (Footer.tsx) : à la portée du module, l'horloge du Worker
  // Cloudflare vaut 0 avant la première requête, le site affichait « 1970 LX Studio ».
  copyright: "LX Studio, Bassecourt",
  madeIn: "Conçu et hébergé pour la Suisse romande",
} as const;

export const SEO_BASE = {
  siteName: "LX Studio",
  locale: "fr_CH",
  keywords:
    "IA locale Suisse, IA on-premise Suisse romande, IA souveraine entreprise, intelligence artificielle fiduciaire, IA conforme nLPD, automatisation administrative IA, IA Jura, IA Neuchâtel, IA Lausanne, IA Genève",
} as const;
