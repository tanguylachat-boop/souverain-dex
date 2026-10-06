import type { CSSProperties, ReactNode } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

/**
 * Apparition au défilement, page d'accueil.
 *
 * Fondu et montée de 16 px, 500 ms, courbe sortante, décalage de 60 ms entre
 * les éléments d'une même grille (passé en `delay`). Rien d'autre.
 *
 * Le texte n'est jamais caché avant que le script tourne, et jamais s'il est
 * déjà à l'écran quand le script arrive : voir `useScrollReveal`. Avec le
 * mouvement réduit activé, tout est statique.
 */
export function Appear({
  children,
  delay = 0,
  as: Tag = "div",
  className,
  style,
}: {
  children: ReactNode;
  /** Millisecondes. Multiple de 60 dans une grille, jamais plus. */
  delay?: number;
  as?: "div" | "li" | "article" | "section";
  className?: string;
  style?: CSSProperties;
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.12, { deferHide: true });
  const classes = ["appear", visible ? "is-in" : "", className ?? ""].filter(Boolean).join(" ");

  return (
    <Tag
      ref={ref as never}
      className={classes}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </Tag>
  );
}
