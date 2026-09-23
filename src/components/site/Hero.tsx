import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Splits a line into words that rise in sequence.
 *
 * Each word is its own inline-block so only transforms animate. The text
 * stays a single readable string in the DOM, so a screen reader and a
 * crawler get the sentence, not a pile of fragments.
 */
export function Words({
  text,
  delay = 0,
  className,
  split = true,
}: {
  text: string;
  delay?: number;
  className?: string;
  /**
   * Set false for gradient text. `-webkit-text-fill-color: transparent`
   * inherits to child spans but the background does not, so split words paint
   * transparent over nothing and the line vanishes. Gradient lines rise as a
   * single block instead.
   */
  split?: boolean;
}) {
  if (!split) {
    return (
      <span
        className={`word ${className ?? ""}`}
        style={{ animationDelay: `${delay}s` }}
      >
        {text}
      </span>
    );
  }
  return (
    <span className={className}>
      {text.split(" ").map((word, i, all) => (
        <span
          key={`${word}-${i}`}
          className="word"
          style={{ animationDelay: `${delay + i * 0.06}s` }}
        >
          {word}
          {i < all.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

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
        className="glow glow-blue glow-drift hidden md:block"
        style={{
          top: "-26%",
          right: "-8%",
          width: "46vw",
          height: "46vw",
          maxWidth: 720,
          maxHeight: 720,
        }}
      />
      <div
        aria-hidden="true"
        className="glow glow-warm glow-drift hidden md:block"
        style={{
          bottom: "-22%",
          left: "-6%",
          width: "34vw",
          height: "34vw",
          maxWidth: 520,
          maxHeight: 520,
          animationDelay: "-7s",
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
