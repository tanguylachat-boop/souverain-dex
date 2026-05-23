import { useEffect, useRef, useState, useCallback } from "react";

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
 * Parallax scroll hook — returns a Y offset based on scroll position.
 * Attach ref to the container; offset updates on scroll.
 */
export function useParallax(speed = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  const onScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;
    setOffset((elementCenter - viewportCenter) * speed);
  }, [speed]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return { ref, offset };
}

/**
 * Wrapper component for scroll-reveal sections.
 * Applies fade-in + slide-up animation.
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
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.1);

  const transform = {
    up: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
    none: "none",
  }[direction];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transform,
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
