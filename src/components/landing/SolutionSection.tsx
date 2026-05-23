import { Reveal } from "@/hooks/use-scroll-reveal";
import swissHardware from "@/assets/swiss-hardware.jpg";

const STEPS = [
  {
    title: "Le document arrive",
    body: "Mail, scan, photo de facture — l'agent capte chaque pièce dès son entrée dans votre système.",
  },
  {
    title: "Extraction & classification",
    body: "L'agent extrait les données, comprend le contexte et classifie automatiquement par client et par type.",
  },
  {
    title: "Renommage & rangement",
    body: "Chaque fichier est renommé et déposé selon vos conventions. Vos dossiers restent impeccables.",
  },
  {
    title: "Relances automatisées",
    body: "TVA, pièces manquantes, échéances : les relances clients partent au bon moment, signées par votre cabinet.",
  },
];

export function SolutionSection() {
  return (
    <section
      id="solution"
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
        {/* Section header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <Reveal>
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
                La solution
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
                Un agent IA qui apprend votre{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #4b7cc9 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  process.
                </span>
              </h2>
              <p
                style={{
                  marginTop: "1.25rem",
                  fontSize: "1.0625rem",
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.7,
                  maxWidth: "28rem",
                }}
              >
                Un pipeline simple, déployé sur un Mac mini dédié installé chez vous. Aucune donnée ne sort.
              </p>
            </Reveal>
          </div>

          {/* Hardware image */}
          <Reveal delay={0.2}>
            <div
              style={{
                position: "relative",
                borderRadius: "1rem",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 40px 80px -20px rgba(0,0,0,0.6), 0 0 60px -15px rgba(75, 124, 201, 0.15)",
              }}
            >
              <img
                src={swissHardware}
                alt="Boîtier d'agent IA souverain installé dans un cabinet fiduciaire en Suisse romande"
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  aspectRatio: "16/11",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              {/* Overlay gradient */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(5,5,7,0.3) 0%, transparent 40%, transparent 60%, rgba(75,124,201,0.08) 100%)",
                  pointerEvents: "none",
                }}
              />
              {/* Badge overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 0.875rem",
                  borderRadius: "9999px",
                  background: "rgba(5,5,7,0.75)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "0.75rem",
                  color: "#ffffff",
                  fontWeight: 500,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#22c55e",
                    boxShadow: "0 0 8px rgba(34,197,94,0.5)",
                  }}
                />
                100% on-premise
              </div>
            </div>
          </Reveal>
        </div>

        {/* Steps timeline */}
        <div
          style={{
            marginTop: "5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
            position: "relative",
          }}
        >
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={0.1 + i * 0.12}>
              <div style={{ position: "relative" }}>
                {/* Step number + line */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: 300,
                      color: "#4b7cc9",
                      fontVariantNumeric: "tabular-nums",
                      minWidth: "2rem",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      height: 1,
                      background: "rgba(255,255,255,0.08)",
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    marginBottom: "0.5rem",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.38)",
                    lineHeight: 1.7,
                  }}
                >
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
