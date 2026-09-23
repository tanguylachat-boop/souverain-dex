import { Section } from "./ui";
import { Reveal } from "./Reveal";
import { useCountUp } from "@/hooks/use-scroll-progress";

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

/**
 * A figure that counts up when it reaches the screen.
 *
 * Only the digits animate; the prefix and suffix are static, so a unit never
 * flickers while the number climbs.
 */
function Figure({
  to,
  suffix,
  lead,
}: {
  to: number;
  suffix: string;
  lead: boolean;
}) {
  const { ref, value } = useCountUp<HTMLDivElement>(to);
  return (
    <div
      ref={ref}
      className={lead ? "tabular gradient-warm" : "tabular"}
      style={{
        fontSize: "clamp(2.75rem, 5.5vw, 4.25rem)",
        fontWeight: 700,
        letterSpacing: "-0.045em",
        lineHeight: 1,
        color: lead ? undefined : "var(--text-primary)",
        width: "fit-content",
      }}
    >
      {value}
      {suffix}
    </div>
  );
}

const FIGURES = [
  {
    to: 50,
    suffix: "+",
    label: "personnes accompagnées dans l'IA",
    note: "formations, mises en place et conseil",
    lead: true,
  },
  {
    to: 10,
    suffix: " h+",
    label: "rendues par mois, par processus automatisé",
    note: "mesuré avant, remesuré après",
    lead: true,
  },
  {
    to: 5,
    suffix: "",
    label: "assistants IA interrogés à chaque mesure",
    note: "ChatGPT, Claude, Perplexity, Gemini, Grok",
    lead: false,
  },
  {
    to: 100,
    suffix: "%",
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
              <Figure to={f.to} suffix={f.suffix} lead={f.lead} />
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
