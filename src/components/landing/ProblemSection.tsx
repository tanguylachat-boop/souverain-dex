import { Reveal, useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useEffect, useState } from "react";

const PAINS = [
  {
    title: "Tri manuel des documents",
    body: "Scan, renommage et classement des pièces reçues par mail ou par courrier — un travail à faible valeur ajoutée que vos collaborateurs subissent chaque jour.",
    icon: (
      <path d="M7 4h7l5 5v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z M14 4v5h5" />
    ),
  },
  {
    title: "Relances clients en boucle",
    body: "TVA, pièces manquantes, paiements en retard : les relances se font à la main, dans Outlook, sans suivi consolidé.",
    icon: (
      <path d="M4 6h16v10H7l-3 3V6z M8 10h8 M8 13h5" />
    ),
  },
  {
    title: "Saisie comptable répétitive",
    body: "Recopier des PDFs de qualité variable dans le logiciel comptable. Une perte de temps qui pèse sur la rentabilité de chaque mandat.",
    icon: (
      <path d="M5 4h14v16H5z M9 8h6 M9 12h6 M9 16h4" />
    ),
  },
];

function AnimatedHours({ visible }: { visible: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const duration = 1500;
    const target = 15;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible]);

  return <>{display}</>;
}

export function ProblemSection() {
  const { ref: numRef, visible: numVisible } = useScrollReveal<HTMLDivElement>(0.3);

  return (
    <section
      id="probleme"
      style={{
        position: "relative",
        padding: "8rem 0",
        background: "#0a0a10",
        overflow: "hidden",
      }}
    >
      {/* Subtle gradient top transition */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
        }}
      />

      <div style={{ maxWidth: "76rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Big number hero */}
        <Reveal>
          <div
            ref={numRef}
            style={{ textAlign: "center", marginBottom: "5rem" }}
          >
            <div
              style={{
                fontSize: "clamp(5rem, 15vw, 12rem)",
                fontWeight: 900,
                lineHeight: 0.85,
                letterSpacing: "-0.05em",
                color: "#ffffff",
                textShadow: "0 0 80px rgba(75, 124, 201, 0.15)",
              }}
            >
              <AnimatedHours visible={numVisible} />
              <span
                style={{
                  fontSize: "0.4em",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.25)",
                  marginLeft: "0.1em",
                }}
              >
                h
              </span>
            </div>
            <h2
              style={{
                marginTop: "1rem",
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.4)",
                maxWidth: "28rem",
                margin: "1rem auto 0",
                lineHeight: 1.6,
              }}
            >
              perdues chaque semaine par cabinet sur des tâches qui devraient être automatiques.
            </h2>
          </div>
        </Reveal>

        {/* Pain point cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {PAINS.map((p, i) => (
            <Reveal key={p.title} delay={0.1 + i * 0.12}>
              <article
                style={{
                  padding: "2rem",
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 40px -15px rgba(0,0,0,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.transform = "none";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {p.icon}
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    marginBottom: "0.625rem",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.4)",
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
