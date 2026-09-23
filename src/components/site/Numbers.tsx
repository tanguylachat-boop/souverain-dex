import { Section } from "./ui";
import { Reveal } from "./Reveal";

/**
 * The credibility band.
 *
 * Four figures, each with a unit under it, set large enough to be read
 * without looking for them. A number inside a paragraph gets scanned past; a
 * number given its own column is the thing a visitor repeats later.
 *
 * The first two carry the promise and are painted with the warm gradient;
 * the last two are context and stay white. Colour marks importance here, and
 * the wording says the same thing, so nothing depends on seeing it.
 */

const FIGURES = [
  {
    value: "50+",
    label: "personnes accompagnées dans l'IA",
    note: "formations, mises en place et conseil",
    lead: true,
  },
  {
    value: "10 h+",
    label: "rendues par mois, par processus automatisé",
    note: "mesuré avant, remesuré après",
    lead: true,
  },
  {
    value: "5",
    label: "assistants IA interrogés à chaque mesure",
    note: "ChatGPT, Claude, Perplexity, Gemini, Grok",
    lead: false,
  },
  {
    value: "100%",
    label: "développé sans sous-traitance",
    note: "un seul interlocuteur, du début à la fin",
    lead: false,
  },
] as const;

export function Numbers() {
  return (
    <Section tone="deep" style={{ paddingBlock: "5.5rem" }}>
      {/* Decorative light, kept off small screens where it only costs paint. */}
      <div
        aria-hidden="true"
        className="glow glow-warm glow-drift hidden md:block"
        style={{ top: "-30%", left: "-8%", width: "38vw", height: "38vw", maxWidth: 520, maxHeight: 520 }}
      />

      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "2.5rem 2rem",
        }}
      >
        {FIGURES.map((f, i) => (
          <Reveal key={f.label} delay={i * 0.07}>
            <div>
              <div
                className={f.lead ? "tabular gradient-warm" : "tabular"}
                style={{
                  fontSize: "clamp(2.75rem, 5.5vw, 4.25rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.045em",
                  lineHeight: 1,
                  color: f.lead ? undefined : "var(--text-primary)",
                  width: "fit-content",
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
