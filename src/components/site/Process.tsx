import { Section, Eyebrow, H2, Lede, Body } from "./ui";
import { Reveal } from "./Reveal";

/**
 * How a mandate runs, drawn rather than listed.
 *
 * Four stages on one spine. Each carries the thing that is produced at the
 * end of it, because a stage with no deliverable is a meeting, and a client
 * who cannot name what he receives cannot tell whether he received it.
 *
 * The spine is a single gradient rule behind the row, hidden from assistive
 * technology; the numbers and headings carry the sequence for a screen reader.
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
    body: "Le temps mesuré est converti en francs, puis comparé au coût de l'automatisation. Si le rapport ne tient pas, on s'arrête ici et vous n'avez rien payé d'autre que l'audit.",
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

export function Process() {
  return (
    <Section id="procede" tone="base" labelledBy="procede-title">
      <div style={{ maxWidth: "46rem" }}>
        <Eyebrow>Comment on procède</Eyebrow>
        <H2 id="procede-title" style={{ maxWidth: "22ch" }}>
          Quatre étapes, et ce que vous recevez à chacune.
        </H2>
        <Lede>
          Une étape sans livrable est une réunion. Chaque étape se termine donc
          par quelque chose que vous gardez, y compris si vous arrêtez là.
        </Lede>
      </div>

      <div style={{ position: "relative", marginTop: "4rem" }}>
        {/* The spine. Brightest at the start, fading out at the end, so the
            eye is pulled along the row in reading order. */}
        <div
          aria-hidden="true"
          className="hidden lg:block"
          style={{
            position: "absolute",
            top: 21,
            left: "6%",
            right: "6%",
            height: 1,
            background:
              "linear-gradient(90deg, var(--accent), var(--border-strong) 55%, transparent)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "2.5rem 2rem",
          }}
        >
          {STAGES.map((stage, i) => (
            <Reveal key={stage.step} delay={i * 0.09}>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <span
                    className="tabular"
                    aria-hidden="true"
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: 42,
                      height: 42,
                      flexShrink: 0,
                      borderRadius: "50%",
                      border: "1px solid var(--border-strong)",
                      // Opaque, so the spine passes behind rather than through.
                      background: "var(--surface-2)",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      color: "var(--accent-text)",
                    }}
                  >
                    {stage.step}
                  </span>
                  {/* Opaque and padded: the spine runs at this exact height,
                      and without a background it strikes through the text. */}
                  <span
                    style={{
                      paddingInline: "0.5rem",
                      background: "var(--surface-1)",
                      fontSize: "0.75rem",
                      color: "var(--text-faint)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {stage.duration}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    letterSpacing: "-0.025em",
                    color: "var(--text-primary)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {stage.title}
                </h3>

                <Body>{stage.body}</Body>

                <p
                  style={{
                    marginTop: "1.125rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid var(--border-subtle)",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    lineHeight: 1.55,
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      marginBottom: "0.25rem",
                      fontSize: "0.625rem",
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--text-faint)",
                    }}
                  >
                    Vous repartez avec
                  </span>
                  {stage.output}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
