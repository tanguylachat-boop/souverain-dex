import { useEffect, type RefObject } from "react";
import { trackScroll, prefersReducedMotion } from "@/lib/scroll-track";

/**
 * Les mouvements du site, tous depuis ici, comme sur la page de référence :
 * 1. l'en-tête : `is-scrolled` après 60 px, `is-over` tant qu'un premier
 *    écran de nuit est sous la barre ;
 * 2. les apparitions : chaque `[data-rv]` reçoit `in` quand son haut passe
 *    90 % de l'écran, avec un décalage par rang parmi ses frères (50 ms,
 *    cinq au plus) ; un balayage de secours couvre les sauts d'ancre ;
 * 3. la parallaxe du premier écran : `--hp` de -3,5 % à 3,5 % de la hauteur
 *    de l'écran pendant que le hero sort, et `--mx` au gré de la souris ;
 * 4. les boutons magnétiques (souris fine seulement) ;
 * 5. le bouton de retour en haut.
 * Avec `prefers-reduced-motion`, tout est posé et rien ne bouge.
 */

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

function setupHeader(): () => void {
  const header = document.querySelector<HTMLElement>(".ia-header");
  if (!header) return () => {};
  const hasDarkHero = !!document.querySelector("[data-dark-hero]");
  return trackScroll(() => {
    const scrolled = window.scrollY > 60;
    header.classList.toggle("is-scrolled", scrolled);
    header.classList.toggle("is-over", hasDarkHero && !scrolled);
  });
}

function revealAll(root: ParentNode) {
  root.querySelectorAll("[data-rv], .ia-words").forEach((el) => el.classList.add("in"));
}

function setupReveal(root: ParentNode): () => void {
  const pending = new Set<HTMLElement>(
    Array.from(
      root.querySelectorAll<HTMLElement>("[data-rv]:not([data-now]), .ia-words:not([data-now])"),
    ),
  );
  const show = (el: HTMLElement) => {
    if (!el.classList.contains("in")) {
      // Décalage par rang parmi les frères révélés : une cascade courte.
      const parent = el.parentElement;
      if (parent && !el.style.getPropertyValue("--d")) {
        const siblings = Array.from(parent.children).filter((c) => c.hasAttribute("data-rv"));
        const i = siblings.indexOf(el);
        if (i > 0) el.style.setProperty("--d", String(Math.min(i, 5) * 50));
      }
      el.classList.add("in");
    }
    pending.delete(el);
    observer.unobserve(el);
  };
  const observer = new IntersectionObserver(
    (records) => {
      for (const r of records) if (r.isIntersecting) show(r.target as HTMLElement);
    },
    { threshold: 0, rootMargin: "0px 0px -10% 0px" },
  );
  pending.forEach((el) => observer.observe(el));
  let frame = 0;
  const sweep = () => {
    frame = 0;
    const h = window.innerHeight;
    for (const el of pending) {
      const r = el.getBoundingClientRect();
      if (r.top < h * 0.9 && r.bottom > 0) show(el);
    }
  };
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(sweep);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  requestAnimationFrame(sweep);
  return () => {
    observer.disconnect();
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    if (frame) cancelAnimationFrame(frame);
  };
}

function setupHero(root: ParentNode): () => void {
  const hero = root.querySelector<HTMLElement>(".ia-hero");
  const visual = root.querySelector<HTMLElement>(".ia-hero-visual");
  if (!hero || !visual) return () => {};
  const cleanups: Array<() => void> = [];
  cleanups.push(
    trackScroll(() => {
      const h = hero.offsetHeight || 1;
      const p = clamp(window.scrollY / h, 0, 1);
      visual.style.setProperty("--hp", `${((-3.5 + 7 * p) * 0.01 * h).toFixed(1)}px`);
    }),
  );
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let frame = 0;
    let x = 0;
    const apply = () => {
      frame = 0;
      visual.style.setProperty("--mx", x.toFixed(1));
    };
    const onMove = (e: MouseEvent) => {
      x = (e.clientX / window.innerWidth - 0.5) * -16;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    hero.addEventListener("mousemove", onMove, { passive: true });
    cleanups.push(() => {
      hero.removeEventListener("mousemove", onMove);
      if (frame) cancelAnimationFrame(frame);
    });
  }
  return () => cleanups.forEach((fn) => fn());
}

function setupMagnetic(root: ParentNode): () => void {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {};
  const cleanups: Array<() => void> = [];
  root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
    el.style.transition = "transform 0.4s cubic-bezier(0.215, 0.61, 0.355, 1)";
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.18;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    cleanups.push(() => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    });
  });
  return () => cleanups.forEach((fn) => fn());
}

function setupTop(): () => void {
  const btn = document.querySelector<HTMLElement>(".ia-top");
  if (!btn) return () => {};
  return trackScroll(() => {
    btn.classList.toggle("is-on", window.scrollY > 600);
  });
}

/** Pose tous les effets d'une page ; à appeler une fois sur sa racine. */
export function useIaEffects(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = prefersReducedMotion();
    document.documentElement.classList.toggle("ia-motion-off", reduced);
    const cleanups: Array<() => void> = [setupHeader(), setupTop()];
    if (reduced) {
      revealAll(root);
    } else {
      cleanups.push(setupReveal(root), setupHero(root), setupMagnetic(root));
    }
    return () => cleanups.forEach((fn) => fn());
  }, [ref]);
}
