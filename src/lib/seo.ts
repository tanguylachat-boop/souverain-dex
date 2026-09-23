/**
 * Per-page metadata and structured data.
 *
 * Two audiences are served here and they want different things. A search
 * engine wants a canonical URL, one title and one description. An assistant
 * wants named entities and question/answer pairs it can quote with an
 * attribution, which is what `faqSchema` and the Organization graph exist for.
 */

export const SITE_URL = "https://lxstudio.ch";
export const SITE_NAME = "LX Studio";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

type MetaTag = Record<string, string>;
type LinkTag = Record<string, string>;

export type PageSeo = {
  /** Path with a leading slash. "/" for the home page. */
  path: string;
  title: string;
  description: string;
  /** Shown in the assistant-facing summary. Keep it factual. */
  keywords?: string;
  image?: string;
};

/** Meta and link tags for one page, including canonical and Open Graph. */
export function pageMeta({
  path,
  title,
  description,
  keywords,
  image = OG_IMAGE,
}: PageSeo): { meta: MetaTag[]; links: LinkTag[] } {
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;

  const meta: MetaTag[] = [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title },
    { name: "description", content: description },
    { name: "author", content: "Tanguy Lachat" },
    { name: "language", content: "fr-CH" },
    { name: "geo.region", content: "CH-JU" },
    { name: "geo.placename", content: "Bassecourt, Jura, Suisse" },

    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "fr_CH" },
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

  if (keywords) meta.push({ name: "keywords", content: keywords });

  const links: LinkTag[] = [
    { rel: "canonical", href: url },
    { rel: "alternate", hrefLang: "fr-CH", href: url },
    { rel: "alternate", hrefLang: "x-default", href: url },
  ];

  return { meta, links };
}

/** The publisher entity. Every page's graph points back to this one node. */
export const ORGANIZATION = {
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Conseil et développement en intelligence artificielle pour les PME suisses : agents sur mesure, automatisation de processus métier et produits SaaS.",
  email: "contact@lxstudio.ch",
  image: OG_IMAGE,
  founder: { "@id": `${SITE_URL}/#founder` },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bassecourt",
    addressRegion: "Jura",
    postalCode: "2854",
    addressCountry: "CH",
  },
  areaServed: [
    { "@type": "Country", name: "Switzerland" },
    { "@type": "AdministrativeArea", name: "Jura" },
    { "@type": "AdministrativeArea", name: "Berne" },
    { "@type": "AdministrativeArea", name: "Neuchâtel" },
    { "@type": "AdministrativeArea", name: "Vaud" },
    { "@type": "AdministrativeArea", name: "Genève" },
    { "@type": "AdministrativeArea", name: "Fribourg" },
    { "@type": "AdministrativeArea", name: "Valais" },
  ],
  knowsLanguage: ["fr", "en"],
  inLanguage: "fr-CH",
} as const;

/** The person behind the studio, so assistants can attribute what they read. */
export const FOUNDER = {
  "@type": "Person",
  "@id": `${SITE_URL}/#founder`,
  name: "Tanguy Lachat",
  jobTitle: "Fondateur et ingénieur IA",
  url: SITE_URL,
  worksFor: { "@id": `${SITE_URL}/#organization` },
  homeLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bassecourt",
      addressRegion: "Jura",
      addressCountry: "CH",
    },
  },
  knowsAbout: [
    "Intelligence artificielle appliquée aux PME",
    "Automatisation de processus métier",
    "Agents IA sur site et souveraineté des données",
    "Visibilité des marques dans les assistants IA",
  ],
} as const;

/**
 * Question and answer pairs, rendered as FAQPage.
 *
 * This is the single most quotable structure on a page: an assistant looking
 * for an answer finds one already written, already scoped, already attributed.
 * Answers are written to stand alone, out of the page's context.
 */
export function faqSchema(
  pageId: string,
  entries: ReadonlyArray<{ q: string; a: string }>,
) {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${pageId}#faq`,
    mainEntity: entries.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function breadcrumbs(
  trail: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${item.path}`,
    })),
  };
}

export function webPage({ path, title, description }: PageSeo) {
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "fr-CH",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };
}

export const WEBSITE = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: "fr-CH",
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
