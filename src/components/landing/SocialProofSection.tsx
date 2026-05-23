import { Reveal, useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useEffect, useState } from "react";

const TESTIMONIALS = [
  {
    quote:
      "Nos clients — avocats, médecins, holdings — exigent que rien ne sorte. Avec cet agent, je peux enfin automatiser sans trahir cette promesse.",
    name: "M. Berger",
    role: "Associé, fiduciaire — Genève",
  },
  {
    quote:
      "Installation en une matinée. Dès la deuxième semaine, mes collaborateurs avaient récupéré une journée par personne. Le ROI s'est imposé seul.",
    name: "Mme Delèze",
    role: "Directrice, fiduciaire — Lausanne",
  },
  {
    quote:
      "Avant de signer, j'ai fait auditer le boîtier par notre prestataire IT. Verdict : aucun trafic sortant. Exactement ce qu'on m'avait promis.",
    name: "M. Roduit",
    role: "Expert-comptable diplômé — Sion",
  },
];

const STATS = [
  { value: 12, suffix: "h", label: "économisées par collaborateur / semaine" },
  { value: 0, suffix: "", label: "donnée transmise hors du cabinet" },
  { value: 100, suffix: "%", label: "hébergé sur votre LAN, en Suisse" },
  { value: 1, prefix: "< ", suffix: " j", label: "d'installation sur site" },
];

const CANTONS = ["Genève", "Vaud", "Valais", "Fribourg", "Neuchâtel", "Jura", "Berne"];

function AnimatedStat({
  value,
  prefix = "",
  suffix = "",
  visible,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  visible: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const duration = 1200;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible, value]);

  return (
    <>
      {prefix}
      {display}
      {suffix}
    </>
  );
}

export function SocialProofSection() {
  const { ref: statsRef, visible: statsVisible } =
    useScrollReveal<HTMLDivElement>(0.2);

  return (
    <section
      id="confiance"
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
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
        }}
      />

      <div
        style={{
          maxWidth: "76rem",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
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
              La confiance des fiduciaires romandes
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
            >
              Adopté par des cabinets qui ne transigent pas avec la confidentialité.
            </h2>
          </div>
        </Reveal>

        {/* Stats grid */}
        <Reveal delay={0.1}>
          <div
            ref={statsRef}
            style={{
              marginTop: "3.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1px",
              borderRadius: "0.75rem",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                style={{
                  padding: "1.5rem 1.75rem",
                  background: "rgba(5,5,7,0.8)",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    fontWeight: 700,
                    color: "#ffffff",
                    fontVariantNumeric: "tabular-nums",
                    textShadow:
                      "0 0 40px rgba(75, 124, 201, 0.15)",
                  }}
                >
                  <AnimatedStat
                    value={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    visible={statsVisible}
                  />
                </div>
                <p
                  style={{
                    marginTop: "0.375rem",
                    fontSize: "0.8125rem",
                    color: "rgba(255,255,255,0.35)",
                    lineHeight: 1.5,
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Testimonials */}
        <div
          style={{
            marginTop: "3rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={0.15 + i * 0.1}>
              <figure
                style={{
                  padding: "1.75rem",
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                  display: "flex",
                  flexDirection: "column" as const,
                  height: "100%",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.06)";
                }}
              >
                {/* Quote mark */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  style={{ marginBottom: "1rem", opacity: 0.3 }}
                >
                  <path
                    d="M7 7h4v4H7c0 3 1 5 4 6v2c-5-1-7-4-7-9V7zm9 0h4v4h-4c0 3 1 5 4 6v2c-5-1-7-4-7-9V7z"
                    fill="#4b7cc9"
                  />
                </svg>
                <blockquote
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.7,
                    flex: 1,
                    fontStyle: "italic",
                  }}
                >
                  &laquo;&nbsp;{t.quote}&nbsp;&raquo;
                </blockquote>
                <figcaption
                  style={{
                    marginTop: "1.25rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#ffffff",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.35)",
                      marginTop: "0.125rem",
                    }}
                  >
                    {t.role}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Cantons */}
        <Reveal delay={0.3}>
          <div
            style={{
              marginTop: "4rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase" as const,
                color: "rgba(255,255,255,0.25)",
                marginBottom: "1.25rem",
              }}
            >
              Présent dans toute la Suisse romande
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap" as const,
                justifyContent: "center",
                gap: "1.5rem 2.5rem",
              }}
            >
              {CANTONS.map((c) => (
                <span
                  key={c}
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
