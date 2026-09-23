import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Page hero.
 *
 * The headline carries the promise and nothing else: a visitor decides in a
 * few seconds whether the page is about their problem, and a clever line that
 * has to be decoded costs more than it earns.
 *
 * When a visual is supplied the hero splits into two columns on wide screens
 * and stacks below 1024px, where a side-by-side would leave the headline too
 * narrow to read. The gradient work stays behind `aria-hidden` and disappears
 * on small screens, where it only costs paint.
 */
export function Hero({
  eyebrow,
  title,
  lede,
  actions,
  trust,
  visual,
  compact = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  actions?: ReactNode;
  trust?: ReactNode;
  /** Optional proof beside the headline. Stacks under it on narrow screens. */
  visual?: ReactNode;
  /** Inner pages do not need a full viewport of headline. */
  compact?: boolean;
}) {
  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: compact ? "auto" : "92svh",
        display: "flex",
        alignItems: "center",
        background:
          "linear-gradient(180deg, #030305 0%, #070710 42%, var(--surface-1) 100%)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "-22%",
          right: "-6%",
          width: "48vw",
          height: "48vw",
          maxWidth: 760,
          maxHeight: 760,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(75,124,201,0.10), transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className={visual ? "container-page hero-split" : "container-page"}
        style={{
          position: "relative",
          paddingBlock: compact ? "9rem 4.5rem" : "9rem 6rem",
        }}
      >
        <div>
          <Reveal direction="up">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                borderRadius: 999,
                border: "1px solid var(--border-subtle)",
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(8px)",
                padding: "0.375rem 1rem",
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              <span style={{ position: "relative", display: "inline-flex" }}>
                <span
                  className="animate-pulse-ring"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "rgba(75,124,201,0.4)",
                  }}
                />
                <span
                  aria-hidden="true"
                  style={{
                    position: "relative",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--accent)",
                  }}
                />
              </span>
              {eyebrow}
            </span>
          </Reveal>

          <Reveal direction="up" delay={0.08}>
            <h1
              style={{
                marginTop: "2rem",
                fontSize: visual
                  ? "clamp(2.25rem, 4.6vw, 4.25rem)"
                  : compact
                    ? "clamp(2.25rem, 5.5vw, 4.5rem)"
                    : "clamp(2.5rem, 6.5vw, 6rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
                maxWidth: visual ? "14ch" : "17ch",
              }}
            >
              {title}
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.16}>
            <p
              style={{
                marginTop: "1.625rem",
                fontSize: "clamp(1.0625rem, 1.5vw, 1.3125rem)",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                maxWidth: "36rem",
              }}
            >
              {lede}
            </p>
          </Reveal>

          {actions && (
            <Reveal direction="up" delay={0.24}>
              <div
                style={{
                  marginTop: "2.25rem",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  alignItems: "center",
                }}
              >
                {actions}
              </div>
            </Reveal>
          )}

          {trust && (
            <Reveal direction="up" delay={0.32}>
              <div style={{ marginTop: "2.75rem" }}>{trust}</div>
            </Reveal>
          )}
        </div>

        {visual && (
          <Reveal direction="scale" delay={0.2}>
            {visual}
          </Reveal>
        )}
      </div>
    </section>
  );
}
