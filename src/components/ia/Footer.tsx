import { Link } from "@tanstack/react-router";
import { FOOTER, SITE } from "@/content/ia/site";
import { Mesh } from "./Mesh";
import { T } from "./text";

/** Pied de page de nuit : la nappe, un filet dégradé en haut, quatre colonnes. */
export function Footer() {
  return (
    <footer className="ia-footer ia-night">
      <Mesh intensity={0.7} />
      <div className="ia-container">
        <div className="ia-footer-grid">
          <div>
            <Link to="/" className="ia-brand" aria-label="LX Studio, accueil">
              <i aria-hidden="true" />
              <span>{FOOTER.brand}</span>
            </Link>
            <p className="ia-footer-claim">{FOOTER.claim}</p>
            <address className="ia-footer-contact" style={{ fontStyle: "normal" }}>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <span>
                <T>{SITE.address.street}</T>
                <br />
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
                    {"hash" in l ? (
                      <Link to={l.to} hash={l.hash}>
                        {l.label}
                      </Link>
                    ) : (
                      <Link to={l.to}>{l.label}</Link>
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
          <span>{FOOTER.madeIn}</span>
        </div>
      </div>
    </footer>
  );
}
