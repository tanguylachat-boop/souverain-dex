import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { alternate } from "@/content/ia/lang";
import { IconArrow, IconChevron, IconClose, IconMenu } from "./icons";
import { vars } from "./text";
import { L, useContent } from "./lang";

/**
 * L'en-tête : marque à gauche, « Métiers » avec son panneau, Sécurité,
 * Ressources, le sélecteur de langue, le bouton. En verre quand la page
 * défile (classe `is-scrolled` posée par effects.ts), en clair quand il
 * surplombe un premier écran de nuit (`is-over`). Sous 1024 px, un bouton
 * ouvre le menu plein écran.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const { site, ui, lang } = useContent();
  const { NAV } = site;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // La même page dans l'autre langue, ou l'accueil de l'autre langue si elle n'existe pas.
  const switchTo = alternate(pathname) ?? (lang === "fr" ? "/en" : "/");
  const switchLang = lang === "fr" ? "en" : "fr";

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
          <L to={ui.paths.home} className="ia-brand" aria-label={ui.brandHome}>
            <i aria-hidden="true" />
            <span>{NAV.brand}</span>
          </L>

          <nav className="ia-nav" aria-label={ui.mainNav}>
            <div className="ia-nav-drop">
              <button type="button" className="ia-nav-item" aria-haspopup="true">
                {NAV.metiersLabel}
                <IconChevron size={12} />
              </button>
              <div className="ia-nav-panel">
                {NAV.metiers.map((m) => (
                  <L key={m.to} to={m.to} className="ia-mega">
                    <small>{m.label}</small>
                    <strong>{m.label}</strong>
                    <span>{m.text}</span>
                  </L>
                ))}
              </div>
            </div>
            {NAV.links.map((l) => (
              <L key={l.to} to={l.to} className="ia-nav-item">
                {l.label}
              </L>
            ))}
          </nav>

          <div className="ia-header-tools">
            <L
              to={switchTo}
              className="ia-lang"
              hrefLang={switchLang}
              lang={switchLang}
              title={ui.switchTitle}
              aria-label={ui.switchLabel}
            >
              {ui.switchShort}
            </L>
            <L to={NAV.cta.to} hash={NAV.cta.hash} className="ia-btn is-cta" data-magnetic="">
              {NAV.cta.label}
              <IconArrow />
            </L>
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
          <L
            key={m.to}
            to={m.to}
            style={vars({ "--i": i })}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            {m.label}
            <small>{m.text}</small>
          </L>
        ))}
        {NAV.links.map((l, i) => (
          <L
            key={l.to}
            to={l.to}
            style={vars({ "--i": NAV.metiers.length + i })}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            {l.label}
          </L>
        ))}
        <L
          to={switchTo}
          hrefLang={switchLang}
          lang={switchLang}
          style={vars({ "--i": NAV.metiers.length + NAV.links.length })}
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
        >
          {ui.switchLabel}
          <small>{ui.switchTitle}</small>
        </L>
        <L
          to={NAV.cta.to}
          hash={NAV.cta.hash}
          className="ia-btn is-primary"
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
        >
          {NAV.cta.label}
          <IconArrow />
        </L>
      </div>
    </>
  );
}
