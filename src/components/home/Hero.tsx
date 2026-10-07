import { useEffect, useState, type CSSProperties } from "react";
import { HERO } from "@/content/home";
import { prefersReducedMotion } from "@/lib/scroll-track";
import { Btn } from "./text";
import { HeroScene } from "./HeroScene";

/**
 * Premier écran : motion design en SVG avec parallaxe (voir HeroScene), titre
 * dont le premier groupe de mots tourne toutes les 3,4 secondes, deux boutons,
 * phrase d'intro. Avec mouvement réduit, la scène est figée et le titre ne
 * tourne pas.
 */

function Word({ text, state }: { text: string; state: "on" | "out" | "" }) {
  return (
    <span className={`rw${state ? ` ${state}` : ""}`} aria-hidden="true">
      {Array.from(text).map((ch, i) => (
        <span className="c" key={i} style={{ "--i": i } as CSSProperties}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const [rot, setRot] = useState({ cur: 0, prv: -1 });
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setStill(true);
      return;
    }
    const id = window.setInterval(
      () => setRot((r) => ({ cur: (r.cur + 1) % HERO.rotating.length, prv: r.cur })),
      3400,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="accueil" className="sec hero" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <HeroScene reduced={still} />
        <div className="hero-arc" />
        <div className="hero-fade" />
      </div>
      <div className="wrap hero-bottom">
        <div className="hero-claim" data-rv="true" data-now="true">
          <h1 className="hero-h1" id="hero-title">
            <span className="sr-only">{HERO.plainTitle}</span>
            <span className="h1-l1" aria-hidden="true">
              <span className="h1-rot">
                {HERO.rotating.map((word, i) => (
                  <Word
                    key={word}
                    text={word}
                    state={i === rot.cur ? "on" : i === rot.prv ? "out" : ""}
                  />
                ))}
              </span>
            </span>
            <span className="h1-l2" aria-hidden="true">
              {HERO.fixed}
            </span>
          </h1>
        </div>
        <p
          className="hero-intro"
          data-rv="true"
          data-now="true"
          style={{ "--d": 100 } as CSSProperties}
        >
          {HERO.introBefore}
          <span className="hero-sm">{HERO.underline}</span>
          {HERO.introAfter}
        </p>
        <div
          className="hero-ctas"
          data-rv="true"
          data-now="true"
          style={{ "--d": 180 } as CSSProperties}
        >
          <Btn href={HERO.primary.href}>{HERO.primary.label}</Btn>
          <Btn href={HERO.secondary.href} variant="secondary">
            {HERO.secondary.label}
          </Btn>
        </div>
      </div>
    </section>
  );
}
