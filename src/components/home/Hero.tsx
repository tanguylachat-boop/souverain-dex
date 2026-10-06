import { useEffect, useRef, useState, type CSSProperties } from "react";
import { HERO, HERO_VIDEO, IMAGES } from "@/content/home";
import { prefersReducedMotion } from "@/lib/scroll-track";
import { Btn } from "./text";

/**
 * Premier écran : vidéo plein écran avec parallaxe, titre dont le premier
 * groupe de mots tourne toutes les 3,4 secondes, deux boutons, phrase d'intro.
 *
 * La vidéo change de source selon la largeur (paysage ou portrait) et ne
 * tourne pas quand la personne demande moins de mouvement : l'image d'arrêt
 * reste seule.
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
  const video = useRef<HTMLVideoElement>(null);

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

  // Une seule source à la fois : charger les deux vidéos coûterait le double
  // sur une connexion mobile.
  useEffect(() => {
    const el = video.current;
    if (!el || still) return;
    const mq = window.matchMedia(`(max-width: ${HERO_VIDEO.mobileMaxWidth}px)`);
    const pick = () => {
      const src = mq.matches ? HERO_VIDEO.mobile : HERO_VIDEO.desktop;
      if (el.getAttribute("src") !== src) {
        el.setAttribute("src", src);
        el.load();
        el.play().catch(() => {});
      }
    };
    // La vidéo attend que la page soit chargée : elle ne doit pas disputer
    // la connexion à l'image d'arrêt, aux polices et au script.
    let timer = 0;
    const start = () => {
      timer = window.setTimeout(pick, 400);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    mq.addEventListener("change", pick);
    return () => {
      window.removeEventListener("load", start);
      window.clearTimeout(timer);
      mq.removeEventListener("change", pick);
    };
  }, [still]);

  return (
    <section id="accueil" className="sec hero" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        {/* L'image d'arrêt est toujours là, sous la vidéo : premier rendu
            immédiat, et la vidéo la recouvre quand elle démarre. */}
        <img
          className="hero-poster"
          src={IMAGES.poster.src}
          width={IMAGES.poster.width}
          height={IMAGES.poster.height}
          alt=""
          fetchPriority="high"
          decoding="async"
        />
        {still ? null : (
          <video
            ref={video}
            className="hero-video"
            poster={IMAGES.poster.src}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          />
        )}
        <div className="hero-scrim" />
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
