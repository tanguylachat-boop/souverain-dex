import { useRouterState } from "@tanstack/react-router";
import { alternate } from "@/content/ia/lang";
import { Mesh } from "./Mesh";
import { L, useContent } from "./lang";

/** Pied de page de nuit : la nappe, un filet dégradé en haut, quatre colonnes, la langue. */
export function Footer() {
  const { site, ui, lang } = useContent();
  const { FOOTER, SITE } = site;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const switchTo = alternate(pathname) ?? (lang === "fr" ? "/en" : "/");
  const switchLang = lang === "fr" ? "en" : "fr";
  return (
    <footer className="ia-footer ia-night">
      <Mesh intensity={0.7} />
      <div className="ia-container">
        <div className="ia-footer-grid">
          <div>
            <L to={ui.paths.home} className="ia-brand" aria-label={ui.brandHome}>
              <i aria-hidden="true" />
              <span>{FOOTER.brand}</span>
            </L>
            <p className="ia-footer-claim">{FOOTER.claim}</p>
            <address className="ia-footer-contact" style={{ fontStyle: "normal" }}>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <span>
                {SITE.address.street ? (
                  <>
                    {SITE.address.street}
                    <br />
                  </>
                ) : null}
                {SITE.address.zip} {SITE.address.city}, {SITE.address.country}
              </span>
            </address>
          </div>
          {FOOTER.columns.map((col) => (
            <div key={col.title}>
              <h2 className="ia-footer-h">{col.title}</h2>
              <ul className="ia-footer-list">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {"hash" in l && l.hash ? (
                      <L to={l.to} hash={l.hash}>
                        {l.label}
                      </L>
                    ) : (
                      <L to={l.to}>{l.label}</L>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="ia-footer-bottom">
          <span>
            {new Date().getFullYear()} {FOOTER.copyright}
          </span>
          <span>
            {FOOTER.madeIn}
            {" · "}
            <L to={switchTo} hrefLang={switchLang} lang={switchLang} title={ui.switchTitle}>
              {ui.switchLabel}
            </L>
          </span>
        </div>
      </div>
    </footer>
  );
}
