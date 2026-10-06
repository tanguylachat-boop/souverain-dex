import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { NAV } from "@/content/home";
import { trackScroll, prefersReducedMotion } from "@/lib/scroll-track";

/**
 * Barre de navigation : une pastille centrée qui s'ouvre en panneau clair.
 *
 * Les liens d'ancre pointent sur `/#section` pour fonctionner depuis les
 * pages internes ; les routes internes passent par <Link>.
 */

function LinkChars({ label, line }: { label: string; line: number }) {
  return (
    <>
      {Array.from(label).map((ch, i) => (
        <span className="nc" key={i} style={{ "--i": i, "--l": line } as CSSProperties}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [anim, setAnim] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => trackScroll(() => setSolid(window.scrollY > 24)), []);

  // L'animation des lettres ne joue qu'à l'ouverture, puis l'attribut tombe
  // pour qu'un survol ou un redimensionnement ne la relance pas.
  useEffect(() => {
    if (!open || prefersReducedMotion()) return;
    setAnim(true);
    const t = window.setTimeout(() => setAnim(false), 900);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lx lx-site-nav">
      <a href="#main" className="skip b-secondary">
        Aller au contenu
      </a>
      <header className={`nav${solid ? " solid" : ""}${open ? " open" : ""}`}>
        <div className="nav-veil" aria-hidden="true" onClick={close} />
        <div className="nav-wrap">
          <div className="nav-shell">
            <div className="nav-head">
              <Link to="/" className="nav-logo" onClick={close} aria-label="LX Studio, accueil">
                <i aria-hidden="true" />
                LX&nbsp;<em>Studio</em>
              </Link>
              <button
                type="button"
                className="nav-key"
                aria-expanded={open}
                aria-controls="lx-nav-panel"
                onClick={() => setOpen((v) => !v)}
              >
                <span className="nav-key-label">{open ? NAV.closeLabel : NAV.menuLabel}</span>
                <span className="nav-ico" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </button>
            </div>
            <div id="lx-nav-panel" className="nav-body" ref={panel}>
              <div className="nav-body-in" {...(open ? {} : { inert: true })}>
                <nav className="nav-links" aria-label="Navigation principale">
                  {NAV.links.map((item, line) =>
                    "to" in item ? (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={close}
                        {...(anim ? { "data-anim": "" } : {})}
                        style={{ "--l": line } as CSSProperties}
                      >
                        <LinkChars label={item.label} line={line} />
                      </Link>
                    ) : (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={close}
                        {...(anim ? { "data-anim": "" } : {})}
                        style={{ "--l": line } as CSSProperties}
                      >
                        <LinkChars label={item.label} line={line} />
                      </a>
                    ),
                  )}
                </nav>
                <div className="nav-sub">
                  {NAV.sub.map((item) =>
                    "to" in item ? (
                      <Link key={item.label} to={item.to} onClick={close}>
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={close}
                        {...(item.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {item.label}
                      </a>
                    ),
                  )}
                </div>
                <a
                  className="nav-cta"
                  href={NAV.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                >
                  {NAV.cta.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
