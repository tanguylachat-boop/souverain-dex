import type { CSSProperties, ReactNode } from "react";
import { Link } from "@tanstack/react-router";

/**
 * The shared vocabulary every page is built from.
 *
 * Each primitive reads its colours, spacing and motion from the tokens in
 * styles.css rather than carrying its own values. That is the whole point:
 * one change to a token moves the entire site, and no page can quietly drift
 * to a slightly different grey.
 */

/* -------------------------------------------------------------------------- */
/* Layout                                                                     */
/* -------------------------------------------------------------------------- */

type SectionTone = "base" | "raised" | "deep";

const TONE_BACKGROUND: Record<SectionTone, string> = {
  base: "var(--surface-1)",
  raised: "linear-gradient(180deg, var(--surface-1) 0%, var(--surface-2) 50%, var(--surface-1) 100%)",
  deep: "var(--bg)",
};

export function Section({
  id,
  tone = "base",
  children,
  style,
  labelledBy,
}: {
  id?: string;
  tone?: SectionTone;
  children: ReactNode;
  style?: CSSProperties;
  /** id of the heading that names this section, for screen readers. */
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      style={{
        position: "relative",
        padding: "7rem 0",
        background: TONE_BACKGROUND[tone],
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Hairline seam between sections, brightest at the centre. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          insetInline: 0,
          top: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--border-subtle), transparent)",
        }}
      />
      <div className="container-page">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontSize: "0.6875rem",
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--accent-text)",
        marginBottom: "1.25rem",
      }}
    >
      {children}
    </p>
  );
}

export function H2({
  children,
  id,
  style,
}: {
  children: ReactNode;
  id?: string;
  style?: CSSProperties;
}) {
  return (
    <h2
      id={id}
      style={{
        fontSize: "clamp(2rem, 4vw, 3.25rem)",
        fontWeight: 700,
        color: "var(--text-primary)",
        maxWidth: "20ch",
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

/** Intro paragraph under a heading. Capped near 65 characters per line. */
export function Lede({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <p
      style={{
        marginTop: "1.25rem",
        fontSize: "clamp(1rem, 1.4vw, 1.1875rem)",
        color: "var(--text-secondary)",
        lineHeight: 1.65,
        maxWidth: "38rem",
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export function Body({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <p
      style={{
        fontSize: "0.9375rem",
        color: "var(--text-muted)",
        lineHeight: 1.7,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* Actions                                                                    */
/* -------------------------------------------------------------------------- */

const ARROW = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

type ActionProps = {
  children: ReactNode;
  /** Internal route. Mutually exclusive with `href`. */
  to?: string;
  /** External URL or in-page anchor. */
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  arrow?: boolean;
  style?: CSSProperties;
};

/**
 * One action component for routes, external links and anchors alike, so that
 * an internal destination can never be written as a full page reload by
 * accident.
 */
export function Action({
  children,
  to,
  href,
  variant = "primary",
  arrow = false,
  style,
}: ActionProps) {
  const className = `btn btn-${variant} pressable`;
  const content = (
    <>
      {children}
      {arrow ? ARROW : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={className} style={style}>
        {content}
      </Link>
    );
  }

  const external = href?.startsWith("http");
  return (
    <a
      href={href}
      className={className}
      style={style}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/* Surfaces                                                                   */
/* -------------------------------------------------------------------------- */

export function Card({
  children,
  style,
  interactive = false,
}: {
  children: ReactNode;
  style?: CSSProperties;
  /** Adds the hover rise. Only for cards that actually lead somewhere. */
  interactive?: boolean;
}) {
  return (
    <div
      className={interactive ? "card lift" : "card"}
      style={{ padding: "1.75rem", height: "100%", ...style }}
    >
      {children}
    </div>
  );
}

export function Grid({
  children,
  min = "280px",
  gap = "1.5rem",
  style,
}: {
  children: ReactNode;
  min?: string;
  gap?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(${min}, 1fr))`,
        gap,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Small marker dot used in trust lines and list bullets. */
export function Dot() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 5,
        height: 5,
        flexShrink: 0,
        borderRadius: "50%",
        background: "var(--accent)",
        boxShadow: "0 0 8px rgba(75,124,201,0.5)",
      }}
    />
  );
}

export function TrustLine({ items }: { items: string[] }) {
  return (
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1.5rem",
        listStyle: "none",
        padding: 0,
        margin: 0,
      }}
    >
      {items.map((item) => (
        <li
          key={item}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
          }}
        >
          <Dot />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function StatTile({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div style={{ padding: "1.5rem 1.75rem", background: "var(--bg)" }}>
      <div
        className="tabular"
        style={{
          fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "var(--text-primary)",
        }}
      >
        {value}
      </div>
      <p
        style={{
          marginTop: "0.375rem",
          fontSize: "0.8125rem",
          color: "var(--text-muted)",
          lineHeight: 1.5,
        }}
      >
        {label}
      </p>
    </div>
  );
}

/** Stats laid out as a single hairline-separated slab. */
export function StatBand({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 1,
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid var(--border-subtle)",
        background: "var(--border-subtle)",
      }}
    >
      {children}
    </div>
  );
}
