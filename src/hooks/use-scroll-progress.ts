import { useEffect, useRef, useState } from "react";

/**
 * How far an element has travelled through the viewport, from 0 to 1.
 *
 * 0 when its top edge reaches the bottom of the viewport, 1 when its bottom
 * edge reaches the top. Everything scroll-driven on the site reads this one
 * number, so the whole page shares a single rhythm.
 *
 * Reads are batched into a frame. A scroll handler that measures layout on
 * every event forces a reflow per event, which is the usual reason a page
 * scrolls at 30fps on a laptop and worse on a phone.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const span = window.innerHeight + rect.height;
      const travelled = window.innerHeight - rect.top;
      setProgress(Math.min(1, Math.max(0, travelled / span)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { ref, progress };
}

/**
 * Which step of a pinned sequence is active, given how far the container has
 * been scrolled through.
 *
 * The first and last steps get extra dwell so the sequence does not start
 * mid-step or flick past its conclusion.
 */
export function useSequence<T extends HTMLElement>(steps: number) {
  const ref = useRef<T>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // Distance scrolled inside the container, ignoring the sticky viewport
      // height that the last step occupies.
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const ratio = Math.min(1, Math.max(0, -rect.top / scrollable));
      setIndex(Math.min(steps - 1, Math.floor(ratio * steps)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps]);

  return { ref, index };
}

/**
 * Counts up to a target once the element is on screen.
 *
 * Eased with the same curve as the rest of the site's motion, and skipped
 * entirely for anyone who asked for reduced motion: a number sprinting
 * upward is exactly the kind of movement that setting exists to stop.
 */
export function useCountUp<T extends HTMLElement>(
  target: number,
  durationMs = 1400,
) {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / durationMs);
      // Cubic ease-out: fast arrival, gentle settle, no overshoot on a figure.
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target, durationMs]);

  return { ref, value };
}
