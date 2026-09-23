import { useEffect, useRef } from "react";

/**
 * A screenshot presented inside browser chrome.
 *
 * The frame is decoration, so it is hidden from assistive technology; the
 * image carries the description. The URL is shown because it is the thing a
 * visitor can go and check.
 */
export function BrowserFrame({
  src,
  alt,
  url,
  width,
  height,
  /** Pixels of drift relative to the page. 0 disables it. */
  parallax = 0,
  priority = false,
}: {
  src: string;
  alt: string;
  url: string;
  width: number;
  height: number;
  parallax?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parallax) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Parallax on a small screen mostly costs battery and steals height.
    if (window.matchMedia("(max-width: 768px)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // 0 when the element sits at the bottom of the viewport, 1 at the top.
      const progress = 1 - (rect.top + rect.height / 2) / window.innerHeight;
      el.style.setProperty(
        "--parallax",
        String(Math.max(-1, Math.min(1, progress)) * parallax),
      );
    };
    // Reads are batched into a frame so the scroll handler never blocks.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [parallax]);

  return (
    <div ref={ref} className={parallax ? "browser-frame hero-visual" : "browser-frame"}>
      <div className="browser-bar" aria-hidden="true">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-url">{url}</span>
      </div>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          // Reserving the ratio stops the frame collapsing before load.
          aspectRatio: `${width} / ${height}`,
          objectFit: "cover",
          objectPosition: "top center",
        }}
      />
    </div>
  );
}
