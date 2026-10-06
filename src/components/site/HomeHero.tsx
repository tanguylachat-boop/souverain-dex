import { useEffect, useRef } from "react";
import { HERO, IMAGES } from "@/content/home";
import { prefersReducedMotion, trackScroll } from "@/lib/scroll-track";
import { Action } from "./ui";

/** Glissement maximal de la photo, en pixels, et agrandissement maximal. */
const SLIDE = 40;
const ZOOM = 0.06;

/**
 * Accueil de la page d'accueil.
 *
 * Une photo pleine largeur, assombrie de 55 %, un second voile derrière la
 * colonne de texte, et la promesse par-dessus. La photo glisse de 40 px et
 * s'agrandit de 6 % pendant que l'accueil sort de l'écran, sur `transform`
 * seulement ; rien ne bouge avec le mouvement réduit. Un seul bouton : la
 * preuve est juste en dessous, pas derrière un second lien.
 */
export function HomeHero() {
  const photo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = photo.current;
    if (!el || prefersReducedMotion()) return;
    return trackScroll(() => {
      const height = el.parentElement?.offsetHeight || window.innerHeight;
      const ratio = Math.min(1, Math.max(0, window.scrollY / height));
      el.style.transform = `translate3d(0, ${(-ratio * SLIDE).toFixed(1)}px, 0) scale(${(1 + ZOOM * ratio).toFixed(4)})`;
    });
  }, []);

  const image = IMAGES.hero;

  return (
    <section id="accueil" className="home-hero" aria-labelledby="accueil-title">
      <div ref={photo} className="home-hero-photo">
        <img
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className="home-hero-shade" aria-hidden="true" />
      <div className="home-hero-scrim" aria-hidden="true" />

      <div className="container-page home-hero-content">
        <p className="home-hero-eyebrow">{HERO.eyebrow}</p>
        <h1 id="accueil-title" className="home-hero-title">
          {HERO.title}
        </h1>
        <p className="home-hero-lede">{HERO.lede}</p>
        <div className="home-hero-actions">
          <Action variant="primary" arrow href={HERO.primary.href}>
            {HERO.primary.label}
          </Action>
        </div>
        <p className="home-hero-clients">
          <span>{HERO.clientsLabel}</span> {HERO.clients.join(" · ")}
        </p>
      </div>
    </section>
  );
}
