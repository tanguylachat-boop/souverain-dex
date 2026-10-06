import { useEffect, useRef, type CSSProperties } from "react";
import type { SiteImage } from "@/content/home";
import { prefersReducedMotion, trackScroll } from "@/lib/scroll-track";

/** Agrandissement maximal, atteint quand le cadre sort par le haut. */
const ZOOM = 0.06;

/**
 * Une photo qui zoome doucement pendant que son cadre traverse l'écran.
 *
 * Le cadre coupe, l'image passe de l'échelle 1 à 1,06 sur `transform`
 * seulement, calculée dans le registre de défilement partagé. Avec le
 * mouvement réduit, l'image ne bouge pas.
 */
export function ZoomPhoto({
  image,
  ratio,
  eager = false,
  className,
}: {
  image: SiteImage;
  /** Par exemple « 2 / 1 ». Sans ratio, le cadre prend la hauteur de l'image. */
  ratio?: string;
  /** Pour la seule image du premier écran. */
  eager?: boolean;
  className?: string;
}) {
  const frame = useRef<HTMLElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const box = frame.current;
    const el = img.current;
    if (!box || !el || prefersReducedMotion()) return;
    return trackScroll(() => {
      const rect = box.getBoundingClientRect();
      const span = window.innerHeight + rect.height;
      const t = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / span));
      el.style.transform = `scale(${(1 + ZOOM * t).toFixed(4)})`;
    });
  }, []);

  const style: CSSProperties | undefined = ratio ? { aspectRatio: ratio } : undefined;

  return (
    <figure
      ref={frame}
      className={["zoom-photo", className].filter(Boolean).join(" ")}
      style={style}
    >
      <img
        ref={img}
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : undefined}
      />
    </figure>
  );
}
