import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

/**
 * Primary navigation, shared by every page.
 *
 * The bar is translucent from the first pixel rather than fading in on
 * scroll: a transparent header over scrolling content leaves the links
 * unreadable for the few hundred pixels before the scroll handler fires.
 */

const ROUTES = [
  { to: "/fiduciaire", label: "Agent fiduciaire" },
  { to: "/mentia", label: "Mentia" },
  { to: "/athlit", label: "Athlit" },
  { to: "/blog", label: "Journal" },
] as const;

const BOOKING = "https://cal.com/lx-studio/15min";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A menu left open behind a route change would cover the new page.
  const close = () => setOpen(false);

  return (
    <header
      className="material"
      style={{
        position: "fixed",
        insetInline: 0,
        top: 0,
        zIndex: 50,
        borderBottomColor: scrolled ? "var(--border-subtle)" : "transparent",
        transition: "border-color var(--dur-base) var(--ease-spring)",
      }}
    >
      <a
        href="#main"
        className="btn btn-secondary"
        style={{
          position: "absolute",
          left: "1rem",
          top: "0.5rem",
          transform: "translateY(-200%)",
          transition: "transform var(--dur-fast) var(--ease-spring)",
          zIndex: 1,
        }}
        onFocus={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.transform = "translateY(-200%)";
        }}
      >
        Aller au contenu
      </a>

      <div
        className="container-page"
        style={{
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <Link
          to="/"
          onClick={close}
          style={{
            display: "flex",
            alignItems: "center",
            minHeight: 44,
            gap: "0.5rem",
            fontWeight: 600,
            fontSize: "0.9375rem",
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            textDecoration: "none",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 8,
              height: 8,
              borderRadius: 2,
              background: "var(--accent)",
            }}
          />
          LX<span style={{ fontWeight: 400, color: "var(--text-muted)" }}>&nbsp;Studio</span>
        </Link>

        <nav
          className="hidden md:flex"
          aria-label="Navigation principale"
          style={{ alignItems: "center", gap: "0.25rem" }}
        >
          {ROUTES.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="navlink"
              activeProps={{ "aria-current": "page" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <a
            href={BOOKING}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary pressable hidden sm:inline-flex"
            style={{ minHeight: 40, fontSize: "0.8125rem", paddingInline: "1.125rem" }}
          >
            Réserver 15 min
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            // The display utilities must stay in the class list: an inline
            // `display` would outrank `md:hidden` and leave the button on
            // desktop next to the links it duplicates.
            className="md:hidden inline-flex items-center justify-center pressable"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            style={{
              width: 44,
              height: 44,
              marginRight: "-0.625rem",
              color: "var(--text-primary)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          style={{
            borderTop: "1px solid var(--border-subtle)",
            background: "var(--surface-1)",
          }}
        >
          <nav
            aria-label="Navigation principale, mobile"
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "0.5rem var(--gutter) 1rem",
            }}
          >
            {ROUTES.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={close}
                className="navlink"
                activeProps={{ "aria-current": "page" }}
                style={{ fontSize: "0.9375rem", paddingInline: 0 }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={BOOKING}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="btn btn-secondary pressable"
              style={{ marginTop: "0.75rem" }}
            >
              Réserver 15 min
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
