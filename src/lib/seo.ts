/**
 * Per-page metadata and structured data, in both languages.
 *
 * Two audiences are served here and they want different things. A search
 * engine wants a canonical URL, one title, one description and reciprocal
 * hreflang links. An assistant wants named entities and question/answer
 * pairs it can quote with an attribution, which is what `faqSchema` and the
 * Organization graph exist for. The language of a page is read from its path
 * (`/en` and below are English), so every helper takes a path, not a flag.
 */
import { SITE } from "@/content/ia/site";
import { METIERS } from "@/content/ia/metiers";
import { langOf, alternates, type Lang } from "@/content/ia/lang";

export const SITE_URL = "https://lxstudio.ch";
export const SITE_NAME = "LX Studio";
/** L'image de partage d'une page, générée par `npm run og` dans public/og/ (public/og/en/ pour l'anglais). */
export const ogImage = (name: string) => `${SITE_URL}/og/${name}.jpg`;
export const OG_IMAGE = ogImage("accueil");
/** URL absolue d'un chemin du site. La racine garde sa barre finale, les autres non. */
export const absolute = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);
/** Le code de langue des balises et du JSON-LD. */
export const inLanguage = (lang: Lang) => (lang === "en" ? "en" : "fr-CH");

const OG_LOCALE: Record<Lang, string> = { fr: "fr_CH", en: "en_GB" };
const HREFLANG: Record<Lang, string> = { fr: "fr-CH", en: "en" };
const PLACE: Record<Lang, string> = {
  fr: "Bassecourt, Jura, Suisse",
  en: "Bassecourt, Jura, Switzerland",
};
const PHONE_E164 = "+41 78 703 88 00";

type MetaTag = Record<string, string>;
type LinkTag = Record<string, string>;

export type PageSeo = {
  /** Path with a leading slash. "/" for the home page, "/en" for its English version. */
  path: string;
  title: string;
  description: string;
  /** Kept for the Article graph; no longer emitted as a meta tag (ignored by engines). */
  keywords?: string;
  image?: string;
};

/** Meta and link tags for one page: canonical, hreflang, Open Graph, Twitter. */
export function pageMeta({ path, title, description, image = OG_IMAGE }: PageSeo): {
  meta: MetaTag[];
  links: LinkTag[];
} {
  const lang = langOf(path);
  const other: Lang = lang === "fr" ? "en" : "fr";
  const url = absolute(path);
  const alt = alternates(path);

  const meta: MetaTag[] = [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title },
    { name: "description", content: description },
    { name: "author", content: SITE.founder },
    { name: "geo.region", content: "CH-JU" },
    { name: "geo.placename", content: PLACE[lang] },

    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: OG_LOCALE[lang] },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: title },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: title },
  ];
  if (alt[other]) meta.push({ property: "og:locale:alternate", content: OG_LOCALE[other] });

  // hreflang : une entrée par langue où la page existe, réciproques, et la
  // version française en x-default. Jamais de lien vers une page absente.
  const links: LinkTag[] = [
    { rel: "canonical", href: url },
    { rel: "preconnect", href: "https://plausible.io" },
  ];
  if (alt.fr) links.push({ rel: "alternate", hrefLang: HREFLANG.fr, href: absolute(alt.fr) });
  if (alt.en) links.push({ rel: "alternate", hrefLang: HREFLANG.en, href: absolute(alt.en) });
  links.push({ rel: "alternate", hrefLang: "x-default", href: absolute(alt.fr ?? path) });

  return { meta, links };
}

/** The publisher entity. Every page's graph points back to this one node. */
export const ORGANIZATION = {
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  description:
    "Installation d'intelligence artificielle sur site (IA locale, souveraine, on-premise) pour les fiduciaires, les administrations et les PME de Suisse romande : une machine dans vos locaux, une tâche précise qui tourne seule, aucune donnée qui quitte vos murs.",
  email: SITE.email,
  telephone: PHONE_E164,
  image: OG_IMAGE,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` },
  founder: { "@id": `${SITE_URL}/#founder` },
  identifier: {
    "@type": "PropertyValue",
    propertyID: "UID",
    name: "Numéro IDE",
    value: SITE.ide,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: "JU",
    postalCode: SITE.address.zip,
    addressCountry: "CH",
  },
  // Coordonnées de l'adresse telles que publiées par local.ch (relevées le 05.11.2026).
  geo: { "@type": "GeoCoordinates", latitude: 47.33493, longitude: 7.247522 },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: PHONE_E164,
    email: SITE.email,
    availableLanguage: ["fr", "en"],
    areaServed: "CH",
  },
  areaServed: [
    { "@type": "Country", name: "Switzerland" },
    { "@type": "AdministrativeArea", name: "Jura" },
    { "@type": "AdministrativeArea", name: "Jura bernois" },
    { "@type": "AdministrativeArea", name: "Neuchâtel" },
    { "@type": "AdministrativeArea", name: "Vaud" },
    { "@type": "AdministrativeArea", name: "Genève" },
    { "@type": "AdministrativeArea", name: "Fribourg" },
    { "@type": "AdministrativeArea", name: "Valais" },
  ],
  knowsLanguage: ["fr", "en"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "IA installée sur site",
    itemListElement: METIERS.map((m) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": `${SITE_URL}${m.path}#service`,
        name: m.seo.title.split(" | ")[0],
        url: `${SITE_URL}${m.path}`,
      },
    })),
  },
} as const;

/** The person behind the studio, so assistants can attribute what they read. */
export const FOUNDER = {
  "@type": "Person",
  "@id": `${SITE_URL}/#founder`,
  name: SITE.founder,
  jobTitle: "Fondateur et ingénieur IA",
  url: `${SITE_URL}/`,
  email: SITE.email,
  worksFor: { "@id": `${SITE_URL}/#organization` },
  workLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.city,
      addressRegion: "JU",
      addressCountry: "CH",
    },
  },
  knowsAbout: [
    "Intelligence artificielle installée sur site",
    "Automatisation administrative des fiduciaires et des PME",
    "Souveraineté des données et nLPD",
    "Intégration Bexio",
  ],
} as const;

/**
 * Question and answer pairs, rendered as FAQPage.
 *
 * This is the single most quotable structure on a page: an assistant looking
 * for an answer finds one already written, already scoped, already attributed.
 * Answers are written to stand alone, out of the page's context.
 */
export function faqSchema(pageId: string, entries: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@type": "FAQPage",
    "@id": `${absolute(pageId)}#faq`,
    mainEntity: entries.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** Le fil d'Ariane d'une page. Avec `path`, il reçoit un @id que la WebPage référence. */
export function breadcrumbs(trail: ReadonlyArray<{ name: string; path: string }>, path?: string) {
  return {
    "@type": "BreadcrumbList",
    ...(path ? { "@id": `${absolute(path)}#breadcrumb` } : {}),
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function webPage({ path, title, description, image }: PageSeo) {
  const url = absolute(path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: inLanguage(langOf(path)),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    ...(image
      ? { primaryImageOfPage: { "@type": "ImageObject", url: image, width: 1200, height: 630 } }
      : {}),
  };
}

/** Un article signé, rattaché au fondateur et au studio. */
export function articleSchema(
  r: {
    slug: string;
    title: string;
    summary: string;
    published: string;
    updated?: string;
    author: string;
    keyword?: string;
  },
  path: string,
  image: string,
) {
  const lang = langOf(path);
  const url = absolute(path);
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: r.title,
    description: r.summary,
    keywords: r.keyword,
    articleSection: lang === "en" ? "Resources" : "Ressources",
    datePublished: r.published,
    dateModified: r.updated ?? r.published,
    inLanguage: inLanguage(lang),
    url,
    image,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#founder`,
      name: r.author,
      url: `${SITE_URL}/`,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isAccessibleForFree: true,
  };
}

export const WEBSITE = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: ["fr-CH", "en"],
  publisher: { "@id": `${SITE_URL}/#organization` },
} as const;

/** Wraps a graph into the script tag shape TanStack Router's head() expects. */
export function jsonLd(nodes: ReadonlyArray<unknown>) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": nodes,
    }),
  };
}
