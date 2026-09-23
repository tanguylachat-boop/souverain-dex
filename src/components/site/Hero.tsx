import type { ReactNode } from "react";

/**
 * Page hero.
 *
 * The headline carries the promise and nothing else: a visitor decides in a
 * few seconds whether the page is about their problem, and a clever line that
 * has to be decoded costs more than it earns. The gradient work stays behind
 * `aria-hidden` and disappears on small screens, where it only costs paint.
 */
export function Hero({
  eyebrow,
  title,
  lede,
  actions,
  trust,
  compact = false,
}: {
  eyebrow: string;
  /** The promise. Written as a sentence, not a slogan. */
  title: ReactNode;
  lede: ReactNode;
  actions?: ReactNode;
  trust?: ReactNode;
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
        className="container-page"
        style={{
          position: "relative",
          paddingBlock: compact ? "9rem 4.5rem" : "9rem 6rem",
        }}
      >
        <div data-reveal="up">
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
        </div>

        <h1
          data-reveal="up"
          style={{
            marginTop: "2.25rem",
            fontSize: compact
              ? "clamp(2.25rem, 5.5vw, 4.5rem)"
              : "clamp(2.5rem, 6.5vw, 6rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            maxWidth: "17ch",
          }}
        >
          {title}
        </h1>

        <p
          data-reveal="up"
          style={{
            marginTop: "1.75rem",
            fontSize: "clamp(1.0625rem, 1.5vw, 1.375rem)",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            maxWidth: "40rem",
          }}
        >
          {lede}
        </p>

        {actions && (
          <div
            data-reveal="up"
            style={{
              marginTop: "2.5rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              alignItems: "center",
            }}
          >
            {actions}
          </div>
        )}

        {trust && (
          <div data-reveal="up" style={{ marginTop: "3rem" }}>
            {trust}
          </div>
        )}
      </div>
    </section>
  );
}
