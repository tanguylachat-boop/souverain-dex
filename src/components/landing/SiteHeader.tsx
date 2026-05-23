import { useEffect, useState } from "react";

const NAV = [
  { href: "#probleme", label: "Problème" },
  { href: "#solution", label: "Solution" },
  { href: "#difference", label: "Différence" },
  { href: "#roi", label: "Calculateur" },
  { href: "#demo", label: "Démo" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(5, 5, 7, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: "76rem",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#top"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            textDecoration: "none",
            fontSize: "0.9375rem",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: 2,
              background: "#4b7cc9",
            }}
          />
          LX
          <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.45)" }}>
            {" "}Studio
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex"
          style={{
            alignItems: "center",
            gap: "2rem",
            fontSize: "0.8125rem",
          }}
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                color: "rgba(255,255,255,0.45)",
                textDecoration: "none",
                transition: "color 0.2s",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)";
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA + mobile menu */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <a
            href="#demo"
            className="hidden sm:inline-flex"
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: "0.5rem 1.125rem",
              borderRadius: "0.375rem",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#ffffff",
              fontSize: "0.8125rem",
              fontWeight: 500,
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            Demander une démo
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden"
            style={{
              padding: "0.5rem",
              marginRight: "-0.5rem",
              color: "#ffffff",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(5, 5, 7, 0.95)",
            backdropFilter: "blur(16px)",
          }}
        >
          <nav
            style={{
              display: "flex",
              flexDirection: "column" as const,
              padding: "1rem 1.5rem",
              gap: "1rem",
              fontSize: "0.875rem",
            }}
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#demo"
              onClick={() => setOpen(false)}
              style={{
                marginTop: "0.5rem",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.625rem 1rem",
                borderRadius: "0.375rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#ffffff",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Demander une démo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
