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
}: {
  entries: ReadonlyArray<FaqEntry>;
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <Section id="faq" tone="base" labelledBy="faq-title">
      <Eyebrow>{eyebrow}</Eyebrow>
      <H2 id="faq-title">{title}</H2>
      {lede && <Lede>{lede}</Lede>}

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
                fontSize: "1.0625rem",
                fontWeight: 600,
                letterSpacing: "-0.015em",
                color: "var(--text-primary)",
                minHeight: 44,
              }}
            >
              {/* h3 inside summary keeps the document outline intact. */}
              <h3 style={{ fontSize: "inherit", fontWeight: "inherit", margin: 0 }}>
                {entry.q}
              </h3>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-faint)"
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
                fontSize: "0.9375rem",
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                maxWidth: "42rem",
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
