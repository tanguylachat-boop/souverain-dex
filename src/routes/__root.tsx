import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { WEBSITE, ORGANIZATION, FOUNDER, jsonLd } from "@/lib/seo";

/**
 * Root shell.
 *
 * Only site-wide concerns live here: the stylesheet, analytics, and the
 * publisher graph that every page's structured data refers back to. Titles,
 * descriptions and canonical URLs belong to each route, because a single
 * shared title is what makes a multi-page site look like one page to a
 * crawler.
 */

function NotFoundComponent() {
  return (
    <div
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        background: "var(--bg)",
        padding: "1.5rem",
      }}
    >
      <div style={{ maxWidth: "30rem", textAlign: "center" }}>
        <p
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--accent-text)",
          }}
        >
          Erreur 404
        </p>
        <h1
          style={{
            marginTop: "1rem",
            fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          Cette page n'existe pas.
        </h1>
        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "0.9375rem",
            color: "var(--text-muted)",
            lineHeight: 1.7,
          }}
        >
          Le lien est peut-être ancien. Voici les pages principales du site.
        </p>
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            justifyContent: "center",
          }}
        >
          <Link to="/" className="btn btn-primary pressable">
            Accueil
          </Link>
          <Link to="/fiduciaire" className="btn btn-secondary pressable">
            Agent fiduciaire
          </Link>
          <Link to="/mentia" className="btn btn-secondary pressable">
            Mentia
          </Link>
          <Link to="/athlit" className="btn btn-secondary pressable">
            Athlit
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
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
    ],
    scripts: [
      // Runs in <head>, before the body is parsed, so revealed blocks start
      // hidden without a flash of the final state. Everything stays visible
      // when this never runs, which is the case for crawlers and for anyone
      // with scripting off.
      { children: "document.documentElement.classList.add('js')" },
      {
        src: "https://plausible.io/js/script.js",
        defer: true,
        "data-domain": "lxstudio.ch",
      },
      jsonLd([WEBSITE, ORGANIZATION, FOUNDER]),
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
