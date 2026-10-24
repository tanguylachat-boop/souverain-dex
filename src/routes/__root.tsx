import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { WEBSITE, ORGANIZATION, FOUNDER, jsonLd } from "@/lib/seo";
import { IaPage } from "@/components/ia/Shell";
import { IconArrow } from "@/components/ia/icons";

/**
 * La coque racine. Seul ce qui vaut pour tout le site vit ici : la feuille
 * de style, la police, la mesure d'audience et le graphe de l'éditeur. Les
 * titres, descriptions et canoniques appartiennent à chaque route.
 */

function NotFoundComponent() {
  return (
    <IaPage>
      <section className="ia-plain">
        <div className="ia-container">
          <div className="ia-article">
            <p className="ia-eyebrow">
              <span className="ia-eyebrow-line" aria-hidden="true" />
              Erreur 404
            </p>
            <h1 style={{ marginTop: 18 }}>Cette page n'existe pas.</h1>
            <p>Le lien est peut-être ancien. Voici les pages principales du site.</p>
            <div className="ia-btn-row" style={{ marginTop: 28 }}>
              <Link to="/" className="ia-btn is-primary">
                Accueil
                <IconArrow />
              </Link>
              <Link to="/fiduciaires" className="ia-btn is-outline">
                Fiduciaires
              </Link>
              <Link to="/securite" className="ia-btn is-outline">
                Sécurité
              </Link>
              <Link to="/ressources" className="ia-btn is-outline">
                Ressources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </IaPage>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#050a24" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
      {
        rel: "preload",
        as: "font",
        href: "/fonts/manrope-latin-wght-normal.woff2",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
    scripts: [
      // Dans <head>, avant le corps : les blocs révélés partent cachés sans
      // éclair de l'état final. Sans script (robots, scripting coupé), tout
      // reste visible.
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
