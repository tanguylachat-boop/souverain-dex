import { useEffect, useRef } from "react";
import { HERO, IMAGES } from "@/content/home";
import { Action, Dot } from "./ui";

/** Déplacement maximal de la photo, en pixels, sur toute la hauteur de l'accueil. */
const PARALLAX_MAX = 40;

/**
 * Accueil de la page d'accueil.
 *
 * Une photo pleine largeur, assombrie, et la promesse par-dessus. Pas de
 * visuel animé : la preuve, ce sont les trois clients juste en dessous, et
 * l'accueil ne dépasse pas 70 % de l'écran pour qu'ils restent visibles sans
 * défiler.
 *
 * La photo glisse de 0 à 40 px vers le haut pendant que l'accueil sort de
 * l'écran. Le calcul est fait au plus une fois par image, sur `transform`
 * seulement, et débranché quand le système demande moins de mouvement.
 */
export function HomeHero() {
  const photo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = photo.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const height = el.parentElement?.offsetHeight || window.innerHeight;
      const ratio = Math.min(1, Math.max(0, window.scrollY / height));
      el.style.transform = `translate3d(0, ${(-ratio * PARALLAX_MAX).toFixed(1)}px, 0)`;
    };
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
          <Action variant="secondary" href={HERO.secondary.href} className="hidden sm:inline-flex">
            {HERO.secondary.label}
          </Action>
        </div>
        <ul className="home-hero-trust">
          {HERO.trust.map((item) => (
            <li key={item}>
              <Dot />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
