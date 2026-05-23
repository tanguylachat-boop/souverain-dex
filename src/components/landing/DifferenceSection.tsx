import { Reveal } from "@/hooks/use-scroll-reveal";

const ROWS = [
  {
    label: "Localisation des données",
    cloud: "Datacenter externe (même en Suisse)",
    us: "Disque dur de votre Mac mini, dans votre cabinet",
  },
  {
    label: "Hébergement",
    cloud: "Serveurs partagés multi-clients",
    us: "Hardware dédié, mono-cabinet",
  },
  {
    label: "Sortie réseau",
    cloud: "Permanente vers le cloud du fournisseur",
    us: "Aucune — l'IA tourne sur votre LAN",
  },
  {
    label: "Conformité secret professionnel",
    cloud: "Sous conditions contractuelles",
    us: "Maximale — vous gardez le contrôle physique",
  },
];

export function DifferenceSection() {
  return (
    <section
      id="difference"
      style={{
        position: "relative",
        padding: "8rem 0",
        background: "#0a0a10",
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

      {/* Gradient orb */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60vw",
          height: "30vw",
          maxWidth: "800px",
          maxHeight: "400px",
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(75, 124, 201, 0.04), transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: "76rem", margin: "0 auto", padding: "0 1.5rem" }}>
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
              Ce qui change
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
              Cloud Suisse, cloud étranger —{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #4b7cc9 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                et nous.
              </span>
            </h2>
          </div>
        </Reveal>

        {/* Desktop comparison table */}
        <Reveal delay={0.15}>
          <div
            className="hidden md:block"
            style={{
              marginTop: "3.5rem",
              borderRadius: "0.75rem",
              border: "1px solid rgba(255,255,255,0.06)",
              overflow: "hidden",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                color: "rgba(255,255,255,0.35)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ padding: "1rem 1.5rem" }}>Critère</div>
              <div
                style={{
                  padding: "1rem 1.5rem",
                  borderLeft: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                Solutions cloud
              </div>
              <div
                style={{
                  padding: "1rem 1.5rem",
                  borderLeft: "1px solid rgba(255,255,255,0.06)",
                  color: "#4b7cc9",
                  background: "rgba(75, 124, 201, 0.04)",
                }}
              >
                Notre solution
              </div>
            </div>

            {/* Rows */}
            {ROWS.map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  fontSize: "0.875rem",
                  borderBottom:
                    i !== ROWS.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                }}
              >
                <div
                  style={{
                    padding: "1.25rem 1.5rem",
                    fontWeight: 500,
                    color: "#ffffff",
                  }}
                >
                  {row.label}
                </div>
                <div
                  style={{
                    padding: "1.25rem 1.5rem",
                    borderLeft: "1px solid rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {row.cloud}
                </div>
                <div
                  style={{
                    padding: "1.25rem 1.5rem",
                    borderLeft: "1px solid rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.8)",
                    background: "rgba(75, 124, 201, 0.04)",
                  }}
                >
                  {row.us}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Mobile cards */}
        <div className="md:hidden" style={{ marginTop: "2.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {ROWS.map((row, i) => (
              <Reveal key={row.label} delay={0.1 + i * 0.08}>
                <div
                  style={{
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.02)",
                    padding: "1.25rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase" as const,
                      color: "rgba(255,255,255,0.35)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {row.label}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.875rem" }}>
                    <div>
                      <p style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.3)", marginBottom: "0.25rem" }}>
                        Solutions cloud
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.5)" }}>{row.cloud}</p>
                    </div>
                    <div
                      style={{
                        paddingTop: "0.75rem",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.6875rem",
                          color: "#4b7cc9",
                          fontWeight: 500,
                          marginBottom: "0.25rem",
                        }}
                      >
                        Notre solution
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.8)" }}>{row.us}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <Reveal delay={0.3}>
          <p
            style={{
              marginTop: "5rem",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 600,
              color: "#ffffff",
              textAlign: "center",
              maxWidth: "42rem",
              margin: "5rem auto 0",
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
            }}
          >
            Vos données restent chez vous.{" "}
            <span style={{ color: "#4b7cc9" }}>Votre IA aussi.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
