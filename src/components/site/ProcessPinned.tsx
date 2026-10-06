import { PROCESS } from "@/content/home";
import { Eyebrow, H2 } from "./ui";
import { useSequence } from "@/hooks/use-scroll-progress";

/**
 * Les quatre étapes, en séquence épinglée sur grand écran.
 *
 * Le panneau reste en place pendant que la page défile, et chaque cran de
 * défilement passe à l'étape suivante. En dessous de 768 px, ou sur un écran
 * trop bas pour contenir les quatre étapes, la séquence redevient une simple
 * liste empilée (voir styles.css, `.pinned`).
 *
 * Les quatre étapes sont dans le document en même temps, seulement atténuées,
 * jamais retirées : un lecteur d'écran et un robot les lisent dans l'ordre
 * quel que soit le défilement.
 */

/**
 * Le cadran à côté du texte : un seul dessin qui se remplit d'un quart par
 * étape, en une couleur. L'œil suit un objet qui change au lieu de relire un
 * nouveau dessin à chaque fois.
 */
function StageArt({ index, total }: { index: number; total: number }) {
  return (
    <svg viewBox="0 0 320 320" fill="none" aria-hidden="true" className="stage-art">
      <circle cx="160" cy="160" r="104" stroke="var(--border-subtle)" strokeWidth="2" />
      <circle
        cx="160"
        cy="160"
        r="104"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={100}
        strokeDashoffset={100 - ((index + 1) * 100) / total}
        transform="rotate(-90 160 160)"
        style={{ transition: "stroke-dashoffset 0.5s var(--ease-out)" }}
      />

      {Array.from({ length: total }, (_, i) => {
        const angle = ((i * 360) / total - 90) * (Math.PI / 180);
        return (
          <circle
            key={i}
            cx={160 + Math.cos(angle) * 104}
            cy={160 + Math.sin(angle) * 104}
            r={i === index ? 7 : 4.5}
            fill={i <= index ? "var(--accent)" : "var(--surface-2)"}
            stroke={i <= index ? "none" : "var(--border-strong)"}
            strokeWidth="1.5"
            style={{ transition: "all 0.4s var(--ease-out)" }}
          />
        );
      })}

      <text
        x="160"
        y="148"
        textAnchor="middle"
        fill="var(--text-muted)"
        fontSize="11"
        letterSpacing="3"
      >
        ÉTAPE
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
        {String(index + 1).padStart(2, "0")}
      </text>
    </svg>
  );
}

export function ProcessPinned() {
  const steps = PROCESS.steps;
  const { ref, index } = useSequence<HTMLDivElement>(steps.length);

  return (
    <section
      id={PROCESS.id}
      aria-labelledby="methode-title"
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
          background: "linear-gradient(90deg, transparent, var(--border-subtle), transparent)",
        }}
      />

      {/* La hauteur commande la séquence : un écran de défilement par étape. */}
      <div ref={ref} className="pinned" style={{ height: `${steps.length * 100}svh` }}>
        <div className="pinned-stage">
          <div className="container-page process-grid">
            <div>
              <Eyebrow>{PROCESS.eyebrow}</Eyebrow>
              <H2 id="methode-title" style={{ maxWidth: "18ch" }}>
                {PROCESS.title}
              </H2>

              <div className="steps">
                <div className="step-rail" aria-hidden="true">
                  <div
                    className="step-rail-fill"
                    style={{ height: "100%", transform: `scaleY(${(index + 1) / steps.length})` }}
                  />
                </div>

                <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {steps.map((stage, i) => (
                    <li
                      key={stage.title}
                      className="step-row"
                      data-active={i === index}
                      aria-current={i === index ? "step" : undefined}
                    >
                      <div className="step-head">
                        <span className="step-num" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="step-title">{stage.title}</h3>
                        <span className="step-duration">{stage.duration}</span>
                      </div>
                      <p className="step-body">{stage.body}</p>
                      <p className="step-output">
                        <span>{PROCESS.outputLabel} : </span>
                        {stage.output}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="stage-art-wrap hidden lg:block">
              <StageArt index={index} total={steps.length} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
