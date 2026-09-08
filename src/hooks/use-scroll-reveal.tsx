import { useEffect, useRef, useState } from "react";

/**
 * Intersection-observer-based scroll reveal.
 * Returns a ref to attach and a boolean `visible`.
 * Once visible, stays visible (no re-hide).
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/**
 * Wrapper for scroll-reveal sections.
 * Reveal is driven by CSS + a tiny inline script in the document head, so the
 * content appears as soon as the HTML is painted — it never waits for the
 * React bundle to hydrate.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}) {
  return (
    <div
      className={className || undefined}
      data-reveal={direction}
      style={{ transitionDelay: delay ? `${delay}s` : undefined }}
    >
      {children}
    </div>
  );
}
