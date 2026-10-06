import type { ReactNode } from "react";
import { Section, Action } from "./ui";

/**
 * Closing call to action.
 *
 * One primary action per page, with the secondary one visually subordinate:
 * two buttons of equal weight force a decision the visitor has no basis to
 * make, and the usual result is that neither is pressed.
 */
export function CtaBand({
  title,
  body,
  primaryLabel,
  primaryHref,
  primaryTo,
  secondary,
  note,
  size = "base",
}: {
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref?: string;
  primaryTo?: string;
  secondary?: ReactNode;
  /** One line under the buttons: what happens next, or what it costs. */
  note?: string;
  /** "lg" for pages read on a phone by people who do not zoom. */
  size?: "base" | "lg";
}) {
  const large = size === "lg";

  return (
    <Section tone="deep" labelledBy="cta-title" style={{ padding: "6rem 0" }}>
      <div style={{ maxWidth: "44rem" }}>
        <h2
          id="cta-title"
          style={{
            fontSize: "clamp(1.875rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            maxWidth: "18ch",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            marginTop: "1.25rem",
            fontSize: large ? "1.125rem" : "1.0625rem",
            color: "var(--text-secondary)",
            lineHeight: large ? 1.6 : 1.7,
            maxWidth: large ? "35rem" : undefined,
          }}
        >
          {body}
        </p>
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            alignItems: "center",
          }}
        >
          <Action variant="primary" arrow href={primaryHref} to={primaryTo}>
            {primaryLabel}
          </Action>
          {secondary}
        </div>
        {note && (
          <p
            style={{
              marginTop: "1.25rem",
              fontSize: large ? "0.9375rem" : "0.8125rem",
              lineHeight: 1.5,
              color: "var(--text-muted)",
            }}
          >
            {note}
          </p>
        )}
      </div>
    </Section>
  );
}
