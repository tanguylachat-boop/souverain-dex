import { Section } from "./ui";
import { Reveal } from "./Reveal";

/**
 * The credibility band.
 *
 * Four figures, each with a unit under it, set large enough to be read
 * without looking for them. A number sitting inside a paragraph is scanned
 * past; a number given its own column is the thing a visitor repeats later.
 */

const FIGURES = [
  {
    value: "50+",
    label: "personnes accompagnées dans l'IA",
    note: "formations, mises en place et conseil",
  },
  {
    value: "4",
    label: "entreprises suisses équipées",
    note: "sites et logiciels en service",
  },
  {
    value: "2",
    label: "produits édités en propre",
    note: "Mentia et Athlit",
  },
  {
    value: "100%",
    label: "développé sans sous-traitance",
    note: "un seul interlocuteur",
  },
] as const;

export function Numbers() {
  return (
    <Section tone="deep" style={{ paddingBlock: "5.5rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "2.5rem 2rem",
        }}
      >
        {FIGURES.map((f, i) => (
          <Reveal key={f.label} delay={i * 0.07}>
            <div>
              <div
                className="tabular"
                style={{
                  fontSize: "clamp(2.75rem, 5.5vw, 4.25rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.045em",
                  lineHeight: 1,
                  color: "var(--text-primary)",
                }}
              >
                {f.value}
              </div>
              <p
                style={{
                  marginTop: "0.875rem",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  lineHeight: 1.45,
                  maxWidth: "15rem",
                }}
              >
                {f.label}
              </p>
              <p
                style={{
                  marginTop: "0.375rem",
                  fontSize: "0.8125rem",
                  color: "var(--text-faint)",
                  lineHeight: 1.5,
                  maxWidth: "15rem",
                }}
              >
                {f.note}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
