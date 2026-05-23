import { Reveal } from "@/hooks/use-scroll-reveal";

const PROFILES = [
  {
    label: "Cabinets structurés",
    body: "Cabinets de 5 à 15 collaborateurs avec un portefeuille de 50 à 150 clients PME.",
  },
  {
    label: "Clientèle sensible",
    body: "Fiduciaires accompagnant avocats, médecins, successions, holdings — où la confidentialité est non négociable.",
  },
  {
    label: "Cloud refusé",
    body: "Cabinets qui ont déjà étudié les solutions cloud puis renoncé parce que les serveurs étaient à l'étranger.",
  },
];

export function AudienceSection() {
  return (
    <section
      id="pour-qui"
      style={{
        position: "relative",
        padding: "8rem 0",
        background: "linear-gradient(180deg, #0a0a10 0%, #070710 50%, #0a0a10 100%)",
        overflow: "hidden",
      }}
    >
      {/* Accent line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
        }}
      />

      <div style={{ maxWidth: "76rem", margin: "0 auto", padding: "0 1.5rem" }}>
        <Reveal>
          <div style={{ maxWidth: "42rem" }}>
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "#4b7cc9",
                marginBottom: "1.25rem",
              }}
            >
              Pour qui
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
            >
              Pensé pour les fiduciaires qui ne veulent{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #4b7cc9 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                aucun compromis.
              </span>
            </h2>
          </div>
        </Reveal>

        <div
          style={{
            marginTop: "3.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {PROFILES.map((p, i) => (
            <Reveal key={p.label} delay={0.1 + i * 0.12}>
              <article
                style={{
                  padding: "2rem",
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  height: "100%",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(75, 124, 201, 0.2)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.transform = "none";
                }}
              >
                <span
                  style={{
                    fontSize: "0.8125rem",
                    fontFamily: "monospace",
                    color: "#4b7cc9",
                    fontWeight: 500,
                  }}
                >
                  0{i + 1}
                </span>
                <h3
                  style={{
                    marginTop: "0.75rem",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    marginBottom: "0.5rem",
                  }}
                >
                  {p.label}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.38)",
                    lineHeight: 1.7,
                  }}
                >
                  {p.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
