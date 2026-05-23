export function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "2.5rem 0",
        background: "#050507",
      }}
    >
      <div
        style={{
          maxWidth: "76rem",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          flexWrap: "wrap" as const,
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.25)",
        }}
      >
        <p>© {new Date().getFullYear()} LX Studio. Tous droits réservés.</p>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <a
            href="/mentions-legales"
            style={{
              color: "rgba(255,255,255,0.25)",
              textDecoration: "none",
              transition: "color 0.2s",
              padding: "0.5rem",
              margin: "-0.5rem",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "rgba(255,255,255,0.25)";
            }}
          >
            Mentions légales
          </a>
          <a
            href="mailto:contact@lxstudio.ch"
            style={{
              color: "rgba(255,255,255,0.25)",
              textDecoration: "none",
              transition: "color 0.2s",
              padding: "0.5rem",
              margin: "-0.5rem",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "rgba(255,255,255,0.25)";
            }}
          >
            contact@lxstudio.ch
          </a>
        </div>
      </div>
    </footer>
  );
}
