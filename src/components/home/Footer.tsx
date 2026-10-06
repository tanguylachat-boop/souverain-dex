import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { FOOTER } from "@/content/home";
import { useFooterReveal } from "./effects";

/**
 * Pied de page révélé : fixé en bas quand il tient dans l'écran, découvert
 * par le contenu qui glisse par-dessus (voir useFooterReveal).
 */
export function Footer() {
  const root = useRef<HTMLDivElement>(null);
  const footer = useRef<HTMLElement>(null);
  useFooterReveal(root, footer);

  return (
    <div className="lx lx-site-footer" ref={root}>
      <footer className="ft" ref={footer}>
        <div className="ft-grave" aria-hidden="true">
          <span className="ft-grave-a">{FOOTER.brand}</span>
          <span className="ft-grave-c">{FOOTER.brand}</span>
        </div>
        <div className="ft-in">
          <div className="wrap">
            <div className="ft-bloc">
              <div className="ft-ile">
                <div className="ft-cote">
                  <p className="ft-eti">{FOOTER.contactLabel}</p>
                  <a className="ft-mail" href={`mailto:${FOOTER.email}`}>
                    {FOOTER.email}
                  </a>
                  <span className="ft-note">
                    <span className="ft-note-pt" aria-hidden="true" />
                    {FOOTER.note}
                  </span>
                </div>
                <div className="ft-centre">
                  <Link to="/" className="ft-mark" aria-label="LX Studio, accueil">
                    <i aria-hidden="true" />
                    LX&nbsp;<em>Studio</em>
                  </Link>
                  <p className="ft-claim">{FOOTER.claim}</p>
                  <div className="ft-ico-row">
                    {FOOTER.socials.map((s) => (
                      <a
                        key={s.label}
                        className="ft-ico"
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="ft-cote ft-fin">
                  <p className="ft-eti">{FOOTER.projectLabel}</p>
                  <a
                    className="b-primary ft-btn"
                    href={FOOTER.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{FOOTER.cta.label}</span>
                  </a>
                  <a className="ft-sous" href={FOOTER.alt.href}>
                    {FOOTER.alt.label}
                  </a>
                </div>
              </div>
              <div className="ft-news">
                <p>
                  <strong>{FOOTER.journalTitle}</strong>
                  <span>{FOOTER.journalBody}</span>
                </p>
                <Link className="ft-news-f" to={FOOTER.journalCta.to}>
                  {FOOTER.journalCta.label}
                </Link>
              </div>
              <div className="ft-pied">
                <span className="ft-pied-c">&copy; {FOOTER.copyright}</span>
                <nav className="ft-pied-nav" aria-label="Pied de page">
                  {FOOTER.links.map((l) => (
                    <Link key={l.to} to={l.to}>
                      {l.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
