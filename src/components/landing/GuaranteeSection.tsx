import { Reveal } from "@/hooks/use-scroll-reveal";

/**
 * What the installation actually includes.
 *
 * Deliverables only, with no per-line price: the studio prices each mandate
 * on its own scope and estimated hours, so a fixed grid here would be a
 * commitment nobody has made. The figure comes from the quote, after the
 * cabinet has been looked at.
 */
const INCLUDED = [
  "Mac mini M4 Pro 64 Go dédié à votre cabinet",
  "Scanner haute vitesse Fujitsu ScanSnap, 50 pages par minute",
  "Installation sur site et configuration réseau",
  "Calibrage de l'IA sur votre plan de comptes et vos mandants",
  "Formation de l'équipe, deux heures sur site",
  "Migration de vos règles de classement existantes",
  "Support prioritaire et mises à jour du modèle",
  "Sauvegardes chiffrées automatiques, quotidiennes",
  "Intervention sur site sous 48 heures en Suisse romande",
];

export function GuaranteeSection() {
  return (
    <section
      id="offre"
      style={{
        position: "relative",
        padding: "6rem 0 4rem",
        background: "#0a0a10",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "52rem",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <Reveal>
          <div
            style={{
              padding: "3rem",
              borderRadius: "1rem",
              border: "1px solid rgba(75, 124, 201, 0.2)",
              background: "linear-gradient(135deg, rgba(75, 124, 201, 0.05) 0%, rgba(75, 124, 201, 0.01) 100%)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Corner glow */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "50%",
                height: "50%",
                background: "radial-gradient(circle at top right, rgba(75, 124, 201, 0.1), transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative" }}>
              {/* Offer name badge */}
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase" as const,
                    color: "#4b7cc9",
                    padding: "0.375rem 1rem",
                    borderRadius: "9999px",
                    border: "1px solid rgba(75, 124, 201, 0.25)",
                    background: "rgba(75, 124, 201, 0.08)",
                  }}
                >
                  L'Offre Pilote Souverain
                </span>
              </div>

              {/* Dream outcome headline */}
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  maxWidth: "36rem",
                  margin: "0 auto",
                }}
              >
                Tout ce qu'il faut pour automatiser votre cabinet{" "}
                <span style={{ color: "#4b7cc9" }}>en une matinée.</span>
              </h2>

              {/* Bonus stack */}
              <div
                style={{
                  marginTop: "2.5rem",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {INCLUDED.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                      padding: "0.875rem 0",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4b7cc9"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0 }}
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span
                        style={{
                          fontSize: "0.9375rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Value anchor */}
              <div
                style={{
                  marginTop: "2rem",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(1.125rem, 2.2vw, 1.5rem)",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                    maxWidth: "30rem",
                    margin: "0 auto",
                  }}
                >
                  Le prix se calcule sur votre cabinet, pas sur un barème.
                </p>
                <p
                  style={{
                    marginTop: "0.75rem",
                    fontSize: "0.875rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    maxWidth: "32rem",
                    margin: "0.75rem auto 0",
                  }}
                >
                  Le volume de pièces, le nombre de mandants et votre logiciel
                  comptable changent la charge de travail du simple au triple.
                  Le devis arrive après avoir regardé ces trois chiffres, avec
                  le détail des heures estimées. Il est ferme.
                </p>
              </div>

              {/* Guarantee box */}
              <div
                style={{
                  marginTop: "2rem",
                  padding: "1.25rem",
                  borderRadius: "0.625rem",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.875rem",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(75, 124, 201, 0.1)",
                    border: "1px solid rgba(75, 124, 201, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4b7cc9"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "#ffffff",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Garantie Pilote 30 jours
                  </p>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "rgba(255,255,255,0.4)",
                      lineHeight: 1.7,
                    }}
                  >
                    Testez sur vos vrais documents pendant 30 jours. Pas convaincu ?
                    On reprend le matériel, vous ne payez que l'installation.
                    Zéro risque, zéro engagement long terme.
                  </p>
                </div>
              </div>

              {/* Urgency */}
              <div
                style={{
                  marginTop: "2rem",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.8125rem",
                    color: "rgba(255,255,255,0.5)",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#f59e0b",
                      boxShadow: "0 0 8px rgba(245,158,11,0.4)",
                    }}
                  />
                  3 installations disponibles par mois — capacité limitée
                </p>
              </div>

              {/* CTA */}
              <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <a
                  href="#demo"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.9375rem 2.5rem",
                    borderRadius: "0.375rem",
                    background: "#ffffff",
                    color: "#050507",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.3s",
                  }}
                >
                  Réserver ma démo gratuite
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ marginLeft: "0.5rem" }}
                  >
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
