import { Section, Eyebrow, H2, Lede } from "./ui";

/**
 * Questions and answers, rendered as native <details>.
 *
 * Native disclosure gives keyboard operation, screen reader state and
 * in-page find for free, and it works before any JavaScript arrives. The
 * same entries feed the FAQPage schema on the route, so what a person reads
 * and what an assistant quotes are the same text.
 */
export type FaqEntry = { q: string; a: string };

export function Faq({
  entries,
  eyebrow = "Questions fréquentes",
  title,
  lede,
  size = "base",
}: {
  entries: ReadonlyArray<FaqEntry>;
  eyebrow?: string;
  title: string;
  lede?: string;
  /** "lg" for pages read on a phone by people who do not zoom. */
  size?: "base" | "lg";
}) {
  const large = size === "lg";

  return (
    <Section id="faq" tone="base" labelledBy="faq-title">
      <Eyebrow>{eyebrow}</Eyebrow>
      <H2 id="faq-title">{title}</H2>
      {lede && <Lede size={size}>{lede}</Lede>}

      <div style={{ marginTop: "3rem", maxWidth: "48rem" }}>
        {entries.map((entry) => (
          <details
            key={entry.q}
            style={{
              borderTop: "1px solid var(--border-subtle)",
              padding: "1.25rem 0",
            }}
          >
            <summary
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "1.5rem",
                cursor: "pointer",
                listStyle: "none",
                fontSize: large ? "1.1875rem" : "1.0625rem",
                fontWeight: 600,
                letterSpacing: "-0.015em",
                lineHeight: 1.35,
                color: "var(--text-primary)",
                minHeight: 44,
              }}
            >
              {/* h3 inside summary keeps the document outline intact. */}
              <h3 style={{ fontSize: "inherit", fontWeight: "inherit", margin: 0 }}>{entry.q}</h3>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
                style={{ flexShrink: 0, marginTop: 4 }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <p
              style={{
                marginTop: "0.875rem",
                paddingRight: "2.5rem",
                fontSize: large ? "1.125rem" : "0.9375rem",
                color: "var(--text-secondary)",
                lineHeight: large ? 1.65 : 1.75,
                maxWidth: large ? "31rem" : "42rem",
              }}
            >
              {entry.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
