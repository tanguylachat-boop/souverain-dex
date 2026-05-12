import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
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
          "Hardware dédié installé chez vous. Vos données restent dans votre LAN. Pensé pour Genève, Vaud, Valais, Fribourg, Neuchâtel et le Jura.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_CH" },
      { property: "og:site_name", content: "LX Studio" },
      { name: "twitter:title", content: "LX Studio — Agent IA souverain pour fiduciaires suisses" },
      {
        name: "twitter:description",
        content:
          "L'agent IA local qui automatise vos documents — sans jamais quitter votre cabinet fiduciaire.",
      },
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
          "agent IA fiduciaire, IA souveraine Suisse, automatisation fiduciaire, nLPD, secret professionnel, Genève, Lausanne, Suisse romande, Mac mini local, IA locale cabinet comptable",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
      { rel: "canonical", href: "https://lxstudio.ch/" },
      { rel: "alternate", hrefLang: "fr-CH", href: "https://lxstudio.ch/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://lxstudio.ch/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "LX Studio",
          description:
            "Agent IA souverain pour fiduciaires suisses — installation locale, conforme nLPD.",
          url: "https://lxstudio.ch",
          areaServed: [
            { "@type": "Country", name: "Switzerland" },
            { "@type": "AdministrativeArea", name: "Genève" },
            { "@type": "AdministrativeArea", name: "Vaud" },
            { "@type": "AdministrativeArea", name: "Valais" },
            { "@type": "AdministrativeArea", name: "Fribourg" },
            { "@type": "AdministrativeArea", name: "Neuchâtel" },
            { "@type": "AdministrativeArea", name: "Jura" },
          ],
          inLanguage: "fr-CH",
          address: {
            "@type": "PostalAddress",
            addressCountry: "CH",
            addressRegion: "Suisse romande",
          },
          email: "contact@lxstudio.ch",
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
