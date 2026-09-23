import { Link } from "@tanstack/react-router";

/**
 * Global footer.
 *
 * It carries the full internal link graph on purpose: every page linking to
 * every other page is what lets a crawler reach the offer pages from
 * anywhere, and it is the cheapest internal linking there is.
 */

const COLUMNS: ReadonlyArray<{
  title: string;
  links: ReadonlyArray<{ label: string; to?: string; href?: string }>;
}> = [
  {
    title: "Offres",
    links: [
      { label: "Conseil et automatisation IA", to: "/" },
      { label: "Agent fiduciaire souverain", to: "/fiduciaire" },
    ],
  },
  {
    title: "Produits",
    links: [
      { label: "Mentia, visibilité dans l'IA", to: "/mentia" },
      { label: "Athlit, coaching sportif IA", to: "/athlit" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Réserver 15 minutes", href: "https://cal.com/lx-studio/15min" },
      { label: "contact@lxstudio.ch", href: "mailto:contact@lxstudio.ch" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/tanguy-lachat/" },
    ],
  },
];

/** 44px is the smallest target a thumb hits reliably, footers included. */
const linkStyle = {
  fontSize: "0.8125rem",
  color: "var(--text-muted)",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  minHeight: 44,
} as const;

export function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        background: "var(--bg)",
        paddingBlock: "4rem 2.5rem",
      }}
    >
      <div className="container-page">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2.5rem",
          }}
        >
          <div>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontWeight: 600,
                fontSize: "0.9375rem",
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
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
              LX Studio
            </p>
            <p
              style={{
                marginTop: "0.75rem",
                fontSize: "0.8125rem",
                color: "var(--text-muted)",
                lineHeight: 1.7,
                maxWidth: "22rem",
              }}
            >
              Conseil et développement en intelligence artificielle pour les
              PME suisses. Basé à Bassecourt, dans le Jura.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-faint)",
                  marginBottom: "0.75rem",
                }}
              >
                {col.title}
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link to={link.to} style={linkStyle}>
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        style={linkStyle}
                        {...(link.href?.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div
          style={{
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            fontSize: "0.75rem",
            color: "var(--text-faint)",
          }}
        >
          <p>© {new Date().getFullYear()} LX Studio. Tous droits réservés.</p>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <Link
              to="/mentions-legales"
              style={{ ...linkStyle, fontSize: "0.75rem", color: "var(--text-faint)" }}
            >
              Mentions légales
            </Link>
            <Link
              to="/politique-de-confidentialite"
              style={{ ...linkStyle, fontSize: "0.75rem", color: "var(--text-faint)" }}
            >
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
