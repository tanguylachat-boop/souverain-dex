import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Scroll reveal, driven by IntersectionObserver.
 *
 * The previous approach used `animation-timeline: view()`, which Safari does
 * not support: on every iPhone the entrance simply never happened. An
 * observer costs a few lines and works everywhere.
 *
 * Content is hidden only once the `js` class confirms scripting is live, so a
 * crawler, a reader with JavaScript off, and the server-rendered HTML all get
 * the full page rather than an empty one.
 */
export function Reveal({
  children,
  /** Seconds of delay, for staggering a row or a grid. */
  delay = 0,
  direction = "up",
  /** How much of the element must be in view before it plays. */
  amount = 0.15,
  style,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade" | "scale";
  amount?: number;
  style?: CSSProperties;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Someone who asked the system for less motion gets the end state at once.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    // Anything already on screen at mount must not wait for a scroll that may
    // never come.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: amount, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [amount]);

  return (
    <Tag
      ref={ref as never}
      className={`reveal reveal-${direction}${shown ? " is-visible" : ""}`}
      style={{ transitionDelay: delay ? `${delay}s` : undefined, ...style }}
    >
      {children}
    </Tag>
  );
}

/**
 * Wraps each child in its own Reveal, staggered.
 *
 * Items landing 60ms apart read as one movement; landing together reads as a
 * flash, and landing much further apart reads as a slow list.
 */
export function RevealGroup({
  children,
  step = 0.06,
  direction = "up",
  style,
}: {
  children: ReactNode[];
  step?: number;
  direction?: "up" | "left" | "right" | "fade" | "scale";
  style?: CSSProperties;
}) {
  return (
    <>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * step} direction={direction} style={style}>
          {child}
        </Reveal>
      ))}
    </>
  );
}
