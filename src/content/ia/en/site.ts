/**
 * Shared by every page: contact details, navigation, footer, trust line.
 * English version of ../site.ts, same shape, guaranteed by ../shape.ts.
 *
 * Rules: neutral "you", international English with British spelling, no
 * dashes, no invented statistics. Translated from the French, nothing added.
 */
import type { SiteContent } from "../shape.ts";

export const SITE: SiteContent["SITE"] = {
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
    country: "Switzerland",
  },
  /** Booking link for the diagnostic: the "30 min meeting" event on cal.com/lx-studio (checked on 26.10.2026). */
  bookingHref: "https://cal.com/lx-studio/30min",
  /** IDE number and VAT status, as printed on LX Studio invoices. */
  ide: "CHE-325.224.095",
  vat: "Not subject to VAT (Art. 10 para. 2 let. a of the Swiss VAT Act)",
  /** Show Coca-Cola HBC among the references only with written consent. */
  showCchbc: false,
};

/** A booking link, or the page form when the link is missing: same function as the French module. */
export { bookingHref } from "../site.ts";

export const NAV: SiteContent["NAV"] = {
  brand: "LX Studio",
  menuLabel: "Menu",
  closeLabel: "Close",
  /** Main entries. "Sectors" opens a panel with the three pages. */
  metiersLabel: "Sectors",
  metiers: [
    {
      to: "/en/fiduciaries",
      label: "Fiduciaries",
      text: "Your accounting documents entered on their own, without a client file ever leaving the firm.",
    },
    {
      to: "/en/public-administrations",
      label: "Police and public administrations",
      text: "Reports drafted and documents anonymised, on your servers.",
    },
    {
      to: "/en/smes",
      label: "SMEs",
      text: "Emails sorted, invoices chased, with no cloud subscription.",
    },
  ],
  links: [
    { to: "/en/security", label: "Security" },
    { to: "/en/resources", label: "Resources" },
  ],
  cta: { label: "Book a diagnostic", to: "/en", hash: "diagnostic" },
};

/** Trust line under the buttons of the first screen. */
export const TRUST: SiteContent["TRUST"] = [
  "Installed on site",
  "Designed for the Swiss FADP",
  "Based in the Jura, active across French-speaking Switzerland",
];

export const FOOTER: SiteContent["FOOTER"] = {
  brand: "LX Studio",
  claim: "An AI installed on your premises that does the work. Your data never leaves your walls.",
  contactLabel: "Contact",
  columns: [
    {
      title: "Sectors",
      links: [
        { to: "/en/fiduciaries", label: "Fiduciaries" },
        { to: "/en/public-administrations", label: "Police and public administrations" },
        { to: "/en/smes", label: "SMEs" },
      ],
    },
    {
      title: "Security and resources",
      links: [
        { to: "/en/security", label: "Security and compliance" },
        { to: "/en/security", hash: "dossier", label: "Security dossier (PDF)" },
        { to: "/en/resources", label: "Resources" },
      ],
    },
    {
      title: "Information",
      links: [
        { to: "/en/legal-notice", label: "Legal notice" },
        { to: "/en/privacy-policy", label: "Privacy policy" },
      ],
    },
  ],
  // The year is added at render time (Footer.tsx): at module scope, the Cloudflare Worker
  // clock is 0 before the first request, and the site displayed "1970 LX Studio".
  copyright: "LX Studio, Bassecourt",
  madeIn: "Designed and hosted for French-speaking Switzerland",
};

export const SEO_BASE: SiteContent["SEO_BASE"] = {
  siteName: "LX Studio",
  locale: "en_GB",
  keywords:
    "on-premise AI Switzerland, sovereign AI Switzerland, local AI for businesses, AI without cloud, Swiss data protection act AI, AI for fiduciaries Switzerland, AI Jura, AI Neuchâtel, AI Lausanne, AI Geneva",
};
