import { Eyebrow, H2, Body } from "./ui";
import { useSequence } from "@/hooks/use-scroll-progress";

/**
 * The four stages, as a pinned sequence.
 *
 * The panel sticks while the page scrolls past it, so scrolling becomes
 * stepping: one gesture, one stage, and the diagram on the right changes to
 * match. It is the move that makes a long page feel like a sequence rather
 * than a list.
 *
 * The whole sequence is present in the DOM at once and only dimmed, never
 * removed, so a crawler and a screen reader read all four stages in order
 * regardless of scroll position.
 */

const STAGES = [
  {
    step: "01",
    title: "Audit",
    duration: "une demi-journée",
    body: "On suit une tâche du début à la fin, sur place ou en visio. On chronomètre, on compte les allers-retours, les reprises, les oublis.",
    output: "Un chiffre : ce que cette tâche coûte par mois.",
  },
  {
    step: "02",
    title: "Calcul du retour",
    duration: "48 heures",
    body: "Le temps mesuré est converti en francs, puis comparé au coût de l'automatisation. Si le rapport ne tient pas, on s'arrête ici et vous n'aurez payé que l'audit.",
    output: "Un devis ferme, avec les heures estimées.",
  },
  {
    step: "03",
    title: "Infrastructure",
    duration: "deux à trois semaines",
    body: "Le système est construit et branché à vos outils existants. L'hébergement et les modèles utilisés sont décidés au départ, pas découverts à la fin.",
    output: "Une version qui traite vos vraies données.",
  },
  {
    step: "04",
    title: "Mise en service",
    duration: "une journée",
    body: "Installation, formation de l'équipe, documentation écrite. On remesure la tâche de l'étape 01 pour vérifier que le chiffre a bougé.",
    output: "Le code, la documentation, et le chiffre revérifié.",
  },
] as const;

/**
 * The diagram beside the text. Four states of the same drawing rather than
 * four different drawings, so the eye tracks one object changing instead of
 * re-reading a new picture at every step.
 */
function StageArt({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 320 320" fill="none" aria-hidden="true" className="stage-art">
      <defs>
        <linearGradient id="sa-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4b7cc9" />
          <stop offset="100%" stopColor="#e0904a" />
        </linearGradient>
      </defs>

      {/* The dial: fills a quarter more at each stage. */}
      <circle cx="160" cy="160" r="104" stroke="var(--border-subtle)" strokeWidth="2" />
      <circle
        cx="160"
        cy="160"
        r="104"
        stroke="url(#sa-fill)"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={100}
        strokeDashoffset={100 - (index + 1) * 25}
        transform="rotate(-90 160 160)"
        style={{ transition: "stroke-dashoffset 0.7s cubic-bezier(0.32,0.72,0,1)" }}
      />

      {/* Four marks around the dial, lit once passed. */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i * 90 - 90) * (Math.PI / 180);
        return (
          <circle
            key={i}
            cx={160 + Math.cos(angle) * 104}
            cy={160 + Math.sin(angle) * 104}
            r={i === index ? 7 : 4.5}
            fill={i <= index ? "url(#sa-fill)" : "var(--surface-2)"}
            stroke={i <= index ? "none" : "var(--border-strong)"}
            strokeWidth="1.5"
            style={{ transition: "all 0.5s cubic-bezier(0.32,0.72,0,1)" }}
          />
        );
      })}

      <text
        x="160"
        y="148"
        textAnchor="middle"
        fill="var(--text-faint)"
        fontSize="11"
        letterSpacing="3"
        style={{ textTransform: "uppercase" }}
      >
        Étape
      </text>
      <text
        x="160"
        y="196"
        textAnchor="middle"
        fill="var(--text-primary)"
        fontSize="54"
        fontWeight="700"
        letterSpacing="-2"
      >
        {STAGES[index].step}
      </text>
    </svg>
  );
}

export function ProcessPinned() {
  const { ref, index } = useSequence<HTMLDivElement>(STAGES.length);

  return (
    <section
      id="procede"
      aria-labelledby="procede-title"
      className="pinned-host"
      style={{ position: "relative", background: "var(--surface-1)" }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          insetInline: 0,
          top: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--border-subtle), transparent)",
        }}
      />

      {/* Height drives the sequence: one viewport of scroll per stage. */}
      <div ref={ref} className="pinned" style={{ height: `${STAGES.length * 100}svh` }}>
        <div className="pinned-stage">
          <div className="container-page process-grid">
            <div>
              <Eyebrow>Comment on procède</Eyebrow>
              <H2 id="procede-title" style={{ maxWidth: "16ch" }}>
                Quatre étapes, et ce que vous recevez à chacune.
              </H2>

              <div className="steps">
                <div className="step-rail" aria-hidden="true">
                  <div
                    className="step-rail-fill"
                    style={{
                      height: "100%",
                      transform: `scaleY(${(index + 1) / STAGES.length})`,
                    }}
                  />
                </div>

                <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {STAGES.map((stage, i) => (
                    <li
                      key={stage.step}
                      className="step-row"
                      data-active={i === index}
                      aria-current={i === index ? "step" : undefined}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "0.75rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "1.25rem",
                            fontWeight: 600,
                            color: "var(--text-primary)",
                          }}
                        >
                          {stage.title}
                        </h3>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-faint)" }}>
                          {stage.duration}
                        </span>
                      </div>
                      <Body style={{ maxWidth: "34rem" }}>{stage.body}</Body>
                      <p
                        style={{
                          fontSize: "0.8125rem",
                          fontWeight: 500,
                          color: "var(--warm-text)",
                        }}
                      >
                        Vous repartez avec : {stage.output}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="stage-art-wrap hidden lg:block">
              <StageArt index={index} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
