import { HERO } from "@/content/ia/home";
import { TRUST, bookingHref } from "@/content/ia/site";
import { Mesh } from "./Mesh";
import { HeroMachine } from "./HeroMachine";
import { IconArrow, IconPlay } from "./icons";
import { Words, Eyebrow, vars } from "./text";

/**
 * Premier écran : la nappe animée, le visuel en parallaxe, le titre révélé
 * mot à mot, deux boutons, la ligne de confiance. Tout part au premier
 * rendu (data-now), sans attendre le script.
 */
export function Hero() {
  return (
    <section className="ia-hero" data-dark-hero="" aria-labelledby="hero-title">
      <div className="ia-hero-bg" aria-hidden="true">
        <Mesh always />
        <div className="ia-hero-grad" />
        <div className="ia-hero-glow" />
      </div>
      <div className="ia-hero-visual" aria-hidden="true">
        <div className="ia-hero-visual-in">
          <HeroMachine />
        </div>
      </div>
      <div className="ia-hero-in">
        <div className="ia-hero-row">
          <div className="ia-hero-main">
            <Eyebrow now>{HERO.eyebrow}</Eyebrow>
            <Words as="h1" id="hero-title" className="ia-hero-title" text={HERO.title} now />
            <p className="ia-hero-sub" data-rv="" data-now="" style={vars({ "--d": 500 })}>
              {HERO.sub}
            </p>
            <div className="ia-btn-row" data-rv="" data-now="" style={vars({ "--d": 650 })}>
              <a className="ia-btn is-primary" href={bookingHref()} data-magnetic="">
                {HERO.primary.label}
                <IconArrow />
              </a>
              <a className="ia-btn is-glass" href={HERO.secondary.to} data-magnetic="">
                <IconPlay />
                {HERO.secondary.label}
              </a>
            </div>
            <ul className="ia-hero-trust" aria-label="Ce qui est garanti">
              {TRUST.map((item, i) => (
                <li
                  key={item}
                  className="ia-chip in"
                  data-rv=""
                  data-now=""
                  style={vars({ "--d": 800 + i * 200, "--i": i })}
                >
                  <i aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="ia-hero-cue-wrap" aria-hidden="true">
          <span className="ia-hero-cue" />
        </div>
      </div>
    </section>
  );
}
