import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Scroll reveal.
 *
 * The previous version used `animation-timeline: view()`, which Safari does
 * not support: on every iPhone the entrance simply never happened.
 *
 * An IntersectionObserver alone is not enough either. It reports when the
 * intersection *changes*, so an element that crosses the whole viewport
 * between two frames — an anchor jump, a trackpad flick, a restored scroll
 * position — can produce no record at all and stay hidden permanently. That
 * is a worse failure than no animation, because the content is simply gone.
 *
 * So the observer handles the common case cheaply, and one shared sweep,
 * throttled to a frame and running only over elements still waiting, catches
 * anything it skipped.
 *
 * Content is hidden only once the `js` class confirms scripting is live, so
 * crawlers, assistants and readers without JavaScript get the whole page.
 */

type Pending = { el: Element; show: () => void };

const pending = new Set<Pending>();
let frame = 0;
let listening = false;

/** Reveals anything whose top has reached the viewport, then forgets it. */
function sweep() {
  frame = 0;
  const limit = window.innerHeight;
  for (const item of pending) {
    if (item.el.getBoundingClientRect().top < limit) {
      item.show();
      pending.delete(item);
    }
  }
  if (pending.size === 0) stopListening();
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(sweep);
}

function startListening() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
}

function stopListening() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
}

export function Reveal({
  children,
  /** Seconds of delay, for staggering a row or a grid. */
  delay = 0,
  direction = "up",
  style,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade" | "scale";
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

    let done = false;
    const entry: Pending = {
      el,
      show: () => {
        if (done) return;
        done = true;
        setShown(true);
      },
    };

    // Zero threshold: the first visible pixel counts. A fractional threshold
    // fails silently on any element taller than the viewport.
    const observer = new IntersectionObserver(
      ([record]) => {
        if (!record.isIntersecting) return;
        entry.show();
        pending.delete(entry);
        observer.disconnect();
        if (pending.size === 0) stopListening();
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);

    pending.add(entry);
    startListening();

    return () => {
      observer.disconnect();
      pending.delete(entry);
      if (pending.size === 0) stopListening();
    };
  }, []);

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
