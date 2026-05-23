import { Reveal } from "@/hooks/use-scroll-reveal";
import swissOffice from "@/assets/swiss-office.jpg";

const PILLARS = [
  {
    title: "Conçu en Suisse",
    body: "Pensé, développé et déployé depuis la Suisse romande, par une équipe qui connaît la réalité d'un cabinet fiduciaire.",
  },
  {
    title: "Données hébergées chez vous",
    body: "Le boîtier est physiquement installé dans votre cabinet. Aucun cloud, aucun transit, aucune juridiction étrangère.",
  },
  {
    title: "Conforme LPD & secret professionnel",
    body: "Architecture validée pour respecter la nLPD, le secret professionnel et les exigences déontologiques suisses.",
  },
  {
    title: "Support local",
    body: "Un interlocuteur unique en Suisse romande. Intervention sur site sous 48 heures, en français.",
  },
];

export function SwissPremiumSection() {
  return (
    <section
      id="premium-suisse"
      style={{
        position: "relative",
        padding: "10rem 0 8rem",
        background: "linear-gradient(180deg, #0a0a10 0%, #060608 40%, #0a0a10 100%)",
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

      {/* Gradient orb behind text */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80vw",
          height: "40vw",
          maxWidth: "1200px",
          maxHeight: "500px",
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(75, 124, 201, 0.06), transparent 70%)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: "76rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Massive text-clip heading */}
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "#4b7cc9",
                marginBottom: "1.5rem",
              }}
            >
              Premium suisse
            </p>
            <h2
              style={{
                fontSize: "clamp(2.5rem, 8vw, 7rem)",
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                color: "#ffffff",
              }}
            >
              La rigueur
              <br />
              <span
                style={{
                  backgroundImage: `url(${swissOffice})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center 40%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextStroke: "0.5px rgba(255,255,255,0.1)",
                }}
              >
                suisse.
              </span>
            </h2>
            <p
              style={{
                marginTop: "1.5rem",
                fontSize: "clamp(1rem, 1.3vw, 1.25rem)",
                color: "rgba(255,255,255,0.4)",
                maxWidth: "32rem",
                margin: "1.5rem auto 0",
                lineHeight: 1.7,
              }}
            >
              Une solution pensée pour les standards que vos clients attendent d'un cabinet fiduciaire suisse : précision, discrétion, durabilité.
            </p>
          </div>
        </Reveal>

        {/* Pillars grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={0.1 + i * 0.1}>
              <div
                style={{
                  padding: "1.75rem",
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.875rem",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4b7cc9"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <h3
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "#ffffff",
                    }}
                  >
                    {p.title}
                  </h3>
                </div>
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "rgba(255,255,255,0.38)",
                    lineHeight: 1.7,
                  }}
                >
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
