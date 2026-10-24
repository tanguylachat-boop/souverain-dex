import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { NAV } from "@/content/ia/site";
import { IconArrow, IconChevron, IconClose, IconMenu } from "./icons";
import { vars } from "./text";

/**
 * L'en-tête : marque à gauche, « Métiers » avec son panneau, Sécurité,
 * Ressources, le bouton. En verre quand la page défile (classe `is-scrolled`
 * posée par effects.ts), en clair quand il surplombe un premier écran de
 * nuit (`is-over`). Sous 1024 px, un bouton ouvre le menu plein écran.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("ia-menu-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("ia-menu-open");
    };
  }, [open]);

  return (
    <>
      <header className="ia-header">
        <div className="ia-header-in">
          <Link to="/" className="ia-brand" aria-label="LX Studio, accueil">
            <i aria-hidden="true" />
            <span>{NAV.brand}</span>
          </Link>

          <nav className="ia-nav" aria-label="Navigation principale">
            <div className="ia-nav-drop">
              <button type="button" className="ia-nav-item" aria-haspopup="true">
                {NAV.metiersLabel}
                <IconChevron size={12} />
              </button>
              <div className="ia-nav-panel">
                {NAV.metiers.map((m) => (
                  <Link key={m.to} to={m.to} className="ia-mega">
                    <small>{m.label}</small>
                    <strong>{m.label}</strong>
                    <span>{m.text}</span>
                  </Link>
                ))}
              </div>
            </div>
            {NAV.links.map((l) => (
              <Link key={l.to} to={l.to} className="ia-nav-item">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ia-header-tools">
            <Link to={NAV.cta.to} hash={NAV.cta.hash} className="ia-btn is-cta" data-magnetic="">
              {NAV.cta.label}
              <IconArrow />
            </Link>
            <button
              type="button"
              className="ia-burger"
              aria-expanded={open}
              aria-controls="ia-menu"
              aria-label={open ? NAV.closeLabel : NAV.menuLabel}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>

      <div id="ia-menu" className={`ia-menu${open ? " is-open" : ""}`} aria-hidden={!open}>
        {NAV.metiers.map((m, i) => (
          <Link
            key={m.to}
            to={m.to}
            style={vars({ "--i": i })}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            {m.label}
            <small>{m.text}</small>
          </Link>
        ))}
        {NAV.links.map((l, i) => (
          <Link
            key={l.to}
            to={l.to}
            style={vars({ "--i": NAV.metiers.length + i })}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            {l.label}
          </Link>
        ))}
        <Link
          to={NAV.cta.to}
          hash={NAV.cta.hash}
          className="ia-btn is-primary"
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
        >
          {NAV.cta.label}
          <IconArrow />
        </Link>
      </div>
    </>
  );
}
