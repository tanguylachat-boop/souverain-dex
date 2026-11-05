import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { WEBSITE, ORGANIZATION, FOUNDER, jsonLd } from "@/lib/seo";
import { IaPage } from "@/components/ia/Shell";
import { IconArrow } from "@/components/ia/icons";
import { L, useContent } from "@/components/ia/lang";
import { langOf } from "@/content/ia/lang";
import { CONTENT } from "@/content/ia/bundle";

/**
 * La coque racine. Seul ce qui vaut pour tout le site vit ici : la feuille
 * de style, la police, la mesure d'audience et le graphe de l'éditeur. Les
 * titres, descriptions et canoniques appartiennent à chaque route. La langue
 * de `<html>` suit le chemin : /en et ses pages sont en anglais.
 */

function NotFoundComponent() {
  const { ui, site } = useContent();
  return (
    <IaPage>
      <section className="ia-plain">
        <div className="ia-container">
          <div className="ia-article">
            <p className="ia-eyebrow">
              <span className="ia-eyebrow-line" aria-hidden="true" />
              {ui.notFound.eyebrow}
            </p>
            <h1 style={{ marginTop: 18 }}>{ui.notFound.title}</h1>
            <p>{ui.notFound.text}</p>
            <div className="ia-btn-row" style={{ marginTop: 28 }}>
              <L to={ui.paths.home} className="ia-btn is-primary">
                {ui.breadcrumbHome}
                <IconArrow />
              </L>
              {site.NAV.metiers.slice(0, 1).map((m) => (
                <L key={m.to} to={m.to} className="ia-btn is-outline">
                  {m.label}
                </L>
              ))}
              {site.NAV.links.map((l) => (
                <L key={l.to} to={l.to} className="ia-btn is-outline">
                  {l.label}
                </L>
              ))}
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
      // Valeurs par défaut (page 404, erreur) : chaque route les remplace.
      { title: CONTENT.fr.ui.UI.notFound.seoTitle },
      { name: "description", content: CONTENT.fr.site.FOOTER.claim },
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lang = langOf(pathname);
  return (
    <html lang={CONTENT[lang].ui.UI.htmlLang}>
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
