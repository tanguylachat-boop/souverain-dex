import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#050507",
        padding: "1rem",
      }}
    >
      <div style={{ maxWidth: "28rem", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "5rem",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          404
        </h1>
        <h2
          style={{
            marginTop: "1rem",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          Page introuvable
        </h2>
        <p
          style={{
            marginTop: "0.5rem",
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.6,
          }}
        >
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div style={{ marginTop: "1.5rem" }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.625rem 1.25rem",
              borderRadius: "0.375rem",
              background: "#ffffff",
              color: "#050507",
              fontSize: "0.875rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "LX Studio — Agent IA souverain pour fiduciaires suisses" },
      {
        name: "description",
        content:
          "Agent IA local pour fiduciaires en Suisse romande. Scan, classement et automatisation de vos documents — vos données ne quittent jamais votre cabinet. Conforme nLPD et secret professionnel.",
      },
      { property: "og:title", content: "LX Studio — Agent IA souverain pour fiduciaires suisses" },
      {
        property: "og:description",
        content:
          "Hardware dédié installé chez vous. Vos données restent dans votre cabinet. Pensé pour Genève, Vaud, Valais, Fribourg, Neuchâtel et le Jura.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_CH" },
      { property: "og:site_name", content: "LX Studio" },
      { property: "og:url", content: "https://lxstudio.ch/" },
      { property: "og:image", content: "https://lxstudio.ch/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "LX Studio — Agent IA souverain pour fiduciaires suisses" },
      { name: "twitter:title", content: "LX Studio — Agent IA souverain pour fiduciaires suisses" },
      {
        name: "twitter:description",
        content:
          "L'agent IA local qui automatise vos documents — sans jamais quitter votre cabinet fiduciaire.",
      },
      { name: "twitter:image", content: "https://lxstudio.ch/og-image.png" },
      { name: "twitter:image:alt", content: "LX Studio — Agent IA souverain pour fiduciaires suisses" },
      // SEO Suisse
      { name: "geo.region", content: "CH" },
      { name: "geo.placename", content: "Genève, Lausanne, Suisse romande" },
      { name: "geo.position", content: "46.5197;6.6323" },
      { name: "ICBM", content: "46.5197, 6.6323" },
      { name: "language", content: "fr-CH" },
      { name: "author", content: "LX Studio" },
      {
        name: "keywords",
        content:
          "agent IA fiduciaire, IA souveraine Suisse, automatisation fiduciaire, nLPD, secret professionnel, Genève, Lausanne, Suisse romande, IA locale cabinet comptable, hardware dédié",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
      { rel: "canonical", href: "https://lxstudio.ch/" },
      { rel: "alternate", hrefLang: "fr-CH", href: "https://lxstudio.ch/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://lxstudio.ch/" },
    ],
    scripts: [
      {
        src: "https://plausible.io/js/script.js",
        defer: true,
        "data-domain": "lxstudio.ch",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://lxstudio.ch/#website",
              url: "https://lxstudio.ch/",
              name: "LX Studio",
              description: "Agent IA souverain pour fiduciaires suisses",
              inLanguage: "fr-CH",
              publisher: { "@id": "https://lxstudio.ch/#organization" },
            },
            {
              "@type": "WebPage",
              "@id": "https://lxstudio.ch/#webpage",
              url: "https://lxstudio.ch/",
              name: "LX Studio — Agent IA souverain pour fiduciaires suisses",
              description:
                "Agent IA local pour fiduciaires en Suisse romande. Scan, classement et automatisation de vos documents — vos données ne quittent jamais votre cabinet.",
              isPartOf: { "@id": "https://lxstudio.ch/#website" },
              about: { "@id": "https://lxstudio.ch/#product" },
              inLanguage: "fr-CH",
            },
            {
              "@type": "ProfessionalService",
              "@id": "https://lxstudio.ch/#organization",
              name: "LX Studio",
              url: "https://lxstudio.ch",
              description:
                "Agent IA souverain pour fiduciaires suisses — installation locale, conforme nLPD.",
              email: "contact@lxstudio.ch",
              image: "https://lxstudio.ch/og-image.png",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Genève",
                addressRegion: "Genève",
                addressCountry: "CH",
              },
              areaServed: [
                { "@type": "Country", name: "Switzerland" },
                { "@type": "AdministrativeArea", name: "Genève" },
                { "@type": "AdministrativeArea", name: "Vaud" },
                { "@type": "AdministrativeArea", name: "Valais" },
                { "@type": "AdministrativeArea", name: "Fribourg" },
                { "@type": "AdministrativeArea", name: "Neuchâtel" },
                { "@type": "AdministrativeArea", name: "Jura" },
              ],
              knowsLanguage: "fr",
              inLanguage: "fr-CH",
              priceRange: "$$$$",
              makesOffer: { "@id": "https://lxstudio.ch/#offer" },
            },
            {
              "@type": "Product",
              "@id": "https://lxstudio.ch/#product",
              name: "Agent IA souverain pour fiduciaires",
              description:
                "Agent IA local installé sur hardware dédié dans votre cabinet. Scan, classement et automatisation de vos documents comptables. Aucune donnée ne quitte votre réseau local. Conforme nLPD et secret professionnel suisse.",
              brand: { "@id": "https://lxstudio.ch/#organization" },
              category: "Logiciel IA pour fiduciaires",
              offers: { "@id": "https://lxstudio.ch/#offer" },
            },
            {
              "@type": "Offer",
              "@id": "https://lxstudio.ch/#offer",
              priceCurrency: "CHF",
              url: "https://lxstudio.ch/#demo",
              availability: "https://schema.org/InStock",
              seller: { "@id": "https://lxstudio.ch/#organization" },
              areaServed: { "@type": "Country", name: "Switzerland" },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CH">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}


function RootComponent() {
  return <Outlet />;
}
