/**
 * The small interface strings that are not page content: skip link, labels,
 * dates, form messages. English version of ../ui.ts, same shape, guaranteed
 * by ../shape.ts.
 */
import type { UiContent } from "../shape.ts";

export const UI: UiContent["UI"] = {
  lang: "en",
  htmlLang: "en",
  ogLocale: "en_GB",
  dateLocale: "en-GB",
  langName: "English",
  skipLink: "Skip to content",
  backToTop: "Back to top",
  mainNav: "Main navigation",
  brandHome: "LX Studio, home",
  /** The language switch: it points to the other language. */
  switchLabel: "Français",
  switchShort: "FR",
  switchTitle: "Cette page en français",
  breadcrumbHome: "Home",
  readingMinutes: "min read",
  by: "By",
  updatedOn: "Updated on",
  sources: "Sources",
  summaryBox: "In short",
  questionLabel: "The question",
  readNext: { eyebrow: "Read next", title: "More answers before you install." },
  seeFiduciaires: "See it for fiduciaries",
  byPhone: "By phone:",
  byEmail: "By email:",
  inCalendar: "Directly in the calendar:",
  choose: "Choose",
  honeypot: "Your website",
  /** Exact ending of the consent texts: these words become the link. */
  privacyLink: "privacy policy",
  formErrors: {
    name: "Enter your name.",
    company: "Enter your company name.",
    email: "Enter a valid email address.",
    phone: "Enter a phone number.",
    size: "Choose a team size.",
    task: "Describe the task in a few words.",
    consent: "Your consent is required to process the request.",
    consentDossier: "Your consent is required to receive the dossier.",
  },
  dossierVersion: (version: string, date: string) => `Version ${version} · ${date} · 4 pages`,
  securite: {
    tocLabel: "Contents",
    measuresTitle: "The measures, point by point",
    sourceLabel: "Source:",
    engagementsTitle: "Contractual commitments",
    engagementsSummary: "What the contract states, and what the dossier repeats on page 4.",
    versionLine: (version: string, date: string) =>
      `Security dossier version ${version} dated ${date}. Each new version is dated and numbered.`,
    ctaTitle: "Does your IT manager have a question this page does not cover?",
    ctaText:
      "Ask it here or call me. I answer point by point, in writing if you wish, so that the answer can be attached to the dossier.",
  },
  resources: {
    eyebrow: "Resources",
    title: "What you need to know before installing an AI on your premises.",
    sub: "Straight answers, written for the owners and managers who have to decide. Each article cites its sources and answers its question from the very first sentence.",
    listEyebrow: "All articles",
    listTitle: "One question per article, the answer first.",
    seo: {
      title: "Resources: local AI, Swiss FADP, professional secrecy | LX Studio",
      description:
        "What to know before installing an AI: local and sovereign AI, ChatGPT and the Swiss FADP, professional secrecy, document entry in fiduciaries. Sources cited.",
      keywords:
        "local AI Switzerland, ChatGPT Swiss data protection act, AI professional secrecy, AI for fiduciaries Switzerland, AI without cloud",
    },
  },
  notFound: {
    eyebrow: "Error 404",
    title: "This page does not exist.",
    text: "The link may be out of date. Here are the main pages of the site.",
    seoTitle: "Page not found | LX Studio",
  },
  paths: {
    home: "/en",
    fiduciaires: "/en/fiduciaries",
    administrations: "/en/public-administrations",
    pme: "/en/smes",
    securite: "/en/security",
    ressources: "/en/resources",
    mentions: "/en/legal-notice",
    politique: "/en/privacy-policy",
  },
  /** Path of an article, from its slug. */
  resourcePath: (slug: string) => `/en/resources/${slug}`,
};
