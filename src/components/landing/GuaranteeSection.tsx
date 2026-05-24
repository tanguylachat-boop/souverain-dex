import { Reveal } from "@/hooks/use-scroll-reveal";

const GUARANTEES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4b7cc9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "30 jours pour juger",
    body: "Pilote complet sur vos vrais documents. Si le système ne vous convainc pas, on retire le matériel et vous ne payez que l'installation.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4b7cc9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: "Matériel récupéré",
    body: "En cas de résiliation, nous récupérons le Mac mini. Vos données vous sont restituées intégralement avant la désinstallation.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4b7cc9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Support inclus",
    body: "Maintenance, mises à jour des modèles et support technique inclus dans l'abonnement. Intervention sur site sous 48h.",
  },
];

export function GuaranteeSection() {
  return (
    <section
      id="garantie"
      style={{
        position: "relative",
        padding: "6rem 0",
        background: "#0a0a10",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "76rem",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <Reveal>
          <div
            style={{
              padding: "3rem",
              borderRadius: "1rem",
              border: "1px solid rgba(75, 124, 201, 0.15)",
              background: "linear-gradient(135deg, rgba(75, 124, 201, 0.04) 0%, rgba(75, 124, 201, 0.01) 100%)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle corner glow */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "40%",
                height: "40%",
                background: "radial-gradient(circle at top right, rgba(75, 124, 201, 0.08), transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                textAlign: "center",
                marginBottom: "2.5rem",
              }}
            >
              {/* Shield icon */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(75, 124, 201, 0.1)",
                  border: "1px solid rgba(75, 124, 201, 0.2)",
                  marginBottom: "1.25rem",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4b7cc9"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>

              <h2
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
              >
                Pilote 30 jours.{" "}
                <span style={{ color: "#4b7cc9" }}>Sans risque.</span>
              </h2>
              <p
                style={{
                  marginTop: "0.75rem",
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.4)",
                  maxWidth: "32rem",
                  margin: "0.75rem auto 0",
                  lineHeight: 1.7,
                }}
              >
                Pas convaincu après 30 jours ? On reprend le matériel.
                Vous ne payez que les frais d'installation.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {GUARANTEES.map((g, i) => (
                <Reveal key={g.title} delay={0.1 + i * 0.08}>
                  <div
                    style={{
                      padding: "1.25rem",
                      borderRadius: "0.625rem",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      height: "100%",
                    }}
                  >
                    <div style={{ marginBottom: "0.75rem" }}>{g.icon}</div>
                    <h3
                      style={{
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        color: "#ffffff",
                        marginBottom: "0.375rem",
                      }}
                    >
                      {g.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.8125rem",
                        color: "rgba(255,255,255,0.38)",
                        lineHeight: 1.7,
                      }}
                    >
                      {g.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
