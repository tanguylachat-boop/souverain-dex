import type { ReactNode } from "react";
import { Mesh } from "./Mesh";
import { Words, Eyebrow, T, vars } from "./text";

/**
 * Premier écran des pages intérieures : la même nuit que l'accueil, plus
 * court, avec le titre révélé mot à mot et un chapeau.
 */
export function PageHero({
  eyebrow,
  title,
  sub,
  children,
  meta,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  children?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <section className="ia-page-hero ia-night" data-dark-hero="" aria-labelledby="page-title">
      <Mesh always intensity={0.85} />
      <div className="ia-hero-grad" aria-hidden="true" />
      <div className="ia-container">
        <Eyebrow now>{eyebrow}</Eyebrow>
        <Words as="h1" id="page-title" className="ia-page-title" text={title} now />
        {sub ? (
          <p className="ia-page-sub" data-rv="" data-now="" style={vars({ "--d": 450 })}>
            <T>{sub}</T>
          </p>
        ) : null}
        {meta ? (
          <div data-rv="" data-now="" style={vars({ "--d": 550 })}>
            {meta}
          </div>
        ) : null}
        {children ? (
          <div className="ia-btn-row" data-rv="" data-now="" style={vars({ "--d": 600 })}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
