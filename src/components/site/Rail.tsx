import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/scroll-track";

/**
 * Une rangée de cartes que l'on fait défiler de droite à gauche.
 *
 * Défilement natif : `scroll-snap` cale une carte à chaque cran, l'inertie
 * est celle du système, et tout marche sans script. Le script n'ajoute que
 * l'indicateur « n / N » et, à partir de 768 px, deux boutons qui avancent
 * d'une carte. Rien ne tourne en boucle, rien ne défile tout seul.
 */

type State = {
  index: number;
  atStart: boolean;
  atEnd: boolean;
  scrollable: boolean;
};

const INITIAL: State = { index: 0, atStart: true, atEnd: true, scrollable: false };

/** Largeur d'un cran : la première carte plus l'écart entre les cartes. */
function stepOf(track: HTMLElement): number {
  const first = track.firstElementChild as HTMLElement | null;
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
  return first ? first.offsetWidth + gap : track.clientWidth;
}

export function Rail({
  children,
  label,
  count,
}: {
  children: ReactNode;
  /** Nom de la liste pour les lecteurs d'écran, par exemple « Cinq situations ». */
  label: string;
  count: number;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [state, setState] = useState<State>(INITIAL);

  useEffect(() => {
    const el = track.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = el.scrollWidth - el.clientWidth;
      const next: State = {
        index: Math.max(0, Math.min(count - 1, Math.round(el.scrollLeft / stepOf(el)))),
        atStart: el.scrollLeft <= 2,
        atEnd: el.scrollLeft >= max - 2,
        scrollable: max > 2,
      };
      setState((prev) =>
        prev.index === next.index &&
        prev.atStart === next.atStart &&
        prev.atEnd === next.atEnd &&
        prev.scrollable === next.scrollable
          ? prev
          : next,
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  const go = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({
      left: direction * stepOf(el),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <div className="rail">
      <ul ref={track} className="rail-track" aria-label={label}>
        {Children.map(children, (child) => (
          <li className="rail-card">{child}</li>
        ))}
      </ul>

      {state.scrollable && (
        <div className="rail-nav">
          <span className="rail-index" aria-live="polite">
            {state.index + 1} / {count}
          </span>
          <button
            type="button"
            className="rail-btn pressable"
            onClick={() => go(-1)}
            disabled={state.atStart}
            aria-label="Carte précédente"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M11 5l-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="rail-btn pressable"
            onClick={() => go(1)}
            disabled={state.atEnd}
            aria-label="Carte suivante"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
