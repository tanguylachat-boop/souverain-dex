import { useEffect, useRef, useState } from "react";

type RevealOptions = {
  /**
   * Laisse l'élément visible au rendu serveur et au premier rendu client, et
   * ne le cache qu'après l'hydratation, seulement s'il est encore sous le pli.
   *
   * Un lecteur sur une connexion lente lit donc le texte dès que le HTML est
   * peint : rien n'attend le script. Seuls les blocs qu'il n'a pas encore
   * atteints apparaissent en fondu quand il y arrive. Sans cette option, le
   * comportement historique est conservé : caché jusqu'à l'intersection.
   */
  deferHide?: boolean;
};

/**
 * Intersection-observer-based scroll reveal.
 * Returns a ref to attach and a boolean `visible`.
 * Once visible, stays visible (no re-hide).
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
  { deferHide = false }: RevealOptions = {},
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(deferHide);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (deferHide) {
      // Mouvement réduit demandé : l'état final tout de suite, rien à cacher.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // Déjà à l'écran, ou au-dessus : on ne cache pas ce que le lecteur a pu voir.
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      setVisible(false);
    }

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
  }, [threshold, deferHide]);

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
