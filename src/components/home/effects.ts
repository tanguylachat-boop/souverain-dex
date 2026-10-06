import { useEffect, type RefObject } from "react";
import { trackScroll, prefersReducedMotion } from "@/lib/scroll-track";

/**
 * Les mouvements de la page d'accueil, tous pilotés depuis ici.
 *
 * Trois mécanismes, comme sur la page de référence :
 * 1. l'apparition : un IntersectionObserver pose `in` sur chaque `[data-rv]`
 *    quand il entre dans l'écran (plus un balayage de secours, parce qu'un
 *    saut d'ancre ou une position restaurée peuvent traverser l'écran entre
 *    deux images sans que l'observateur ne voie rien) ;
 * 2. les compteurs : chaque `[data-count]` monte de `data-from` à sa valeur en
 *    1150 ms, courbe en quart de sortie ;
 * 3. le défilement : un seul requestAnimationFrame par image (lib/scroll-track)
 *    met à jour la parallaxe du hero, le ton de la page (sombre vers clair),
 *    la parallaxe du paysage et le pied de page révélé.
 *
 * Avec `prefers-reduced-motion`, tout est posé dans son état final.
 */

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (v: number) => {
  const s = clamp01(v);
  return s * s * (3 - 2 * s);
};

function revealAll(root: HTMLElement) {
  root.querySelectorAll("[data-rv]").forEach((el) => el.classList.add("in"));
}

function setupReveal(root: HTMLElement): () => void {
  const now = root.querySelectorAll<HTMLElement>("[data-rv][data-now]");
  requestAnimationFrame(() => now.forEach((el) => el.classList.add("in")));

  const pending = new Set<HTMLElement>(
    Array.from(root.querySelectorAll<HTMLElement>("[data-rv]:not([data-now])")),
  );
  const show = (el: HTMLElement) => {
    el.classList.add("in");
    pending.delete(el);
    observer.unobserve(el);
  };
  const observer = new IntersectionObserver(
    (records) => {
      for (const r of records) if (r.isIntersecting) show(r.target as HTMLElement);
    },
    { threshold: 0, rootMargin: "0px 0px -12% 0px" },
  );
  pending.forEach((el) => observer.observe(el));

  // Balayage de secours, voir le commentaire d'en-tête.
  let frame = 0;
  const sweep = () => {
    frame = 0;
    const h = window.innerHeight;
    const w = window.innerWidth;
    for (const el of pending) {
      const r = el.getBoundingClientRect();
      if (r.top < h * 0.92 && r.bottom > 0 && r.left < w && r.right > 0) show(el);
    }
  };
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(sweep);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  return () => {
    observer.disconnect();
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    if (frame) cancelAnimationFrame(frame);
  };
}

function setupCounters(root: HTMLElement): () => void {
  const frames = new Map<Element, number>();
  const run = (el: HTMLElement) => {
    const out = el.querySelector<HTMLElement>("[data-count-value]");
    if (!out) return;
    const to = Number(el.dataset.count);
    const from = Number(el.dataset.from ?? 0);
    if (!Number.isFinite(to) || !Number.isFinite(from)) return;
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / 1150, 1);
      out.textContent = String(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 4))));
      if (p < 1) frames.set(el, requestAnimationFrame(step));
      else frames.delete(el);
    };
    out.textContent = String(from);
    frames.set(el, requestAnimationFrame(step));
  };
  const observer = new IntersectionObserver(
    (records) => {
      for (const r of records) {
        if (!r.isIntersecting) continue;
        observer.unobserve(r.target);
        run(r.target as HTMLElement);
      }
    },
    { threshold: 0.4 },
  );
  root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => observer.observe(el));
  return () => {
    observer.disconnect();
    frames.forEach((f) => cancelAnimationFrame(f));
  };
}

function setupSpotlight(root: HTMLElement): () => void {
  const bg = root.querySelector<HTMLElement>(".lx-bg");
  if (!bg || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {};
  let frame = 0;
  let x = 0;
  let y = 0;
  const apply = () => {
    frame = 0;
    bg.style.setProperty("--mx", `${x}px`);
    bg.style.setProperty("--my", `${y}px`);
  };
  const onMove = (e: PointerEvent) => {
    x = e.clientX;
    y = e.clientY;
    if (!frame) frame = requestAnimationFrame(apply);
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  return () => {
    window.removeEventListener("pointermove", onMove);
    if (frame) cancelAnimationFrame(frame);
  };
}

/**
 * Ton de la page : 0 sombre, 1 clair. Chaque section `[data-ink]` tire le ton
 * vers 1 à mesure que son haut approche du haut de l'écran. `ink-on` bascule
 * avec une hystérésis (0,5 à la montée, 0,4 à la descente) pour que les
 * couleurs d'encre ne clignotent pas autour du seuil.
 */
function setupScroll(root: HTMLElement, reduced: boolean): () => void {
  const heroMedia = root.querySelector<HTMLElement>(".hero-media");
  const inkSections = Array.from(root.querySelectorAll<HTMLElement>("section[data-ink]"));
  const scene = root.querySelector<HTMLElement>(".pf-plan");
  const sceneBox = root.querySelector<HTMLElement>(".pf-scene");

  let lastTone = -1;
  let inkOn = false;

  return trackScroll(() => {
    const vh = window.innerHeight || 1;
    const y = window.scrollY;

    if (heroMedia && !reduced) {
      heroMedia.style.setProperty("--hp", `${(0.13 * Math.min(y, vh)).toFixed(1)}px`);
    }

    let tone = 0;
    for (const sec of inkSections) {
      tone += smooth((1.15 * vh - sec.getBoundingClientRect().top) / (1.3 * vh));
    }
    tone = clamp01(tone);
    if (Math.abs(tone - lastTone) > 0.002) {
      lastTone = tone;
      root.style.setProperty("--tone", tone.toFixed(3));
    }
    if (!inkOn && tone > 0.5) {
      inkOn = true;
      root.classList.add("ink-on");
    } else if (inkOn && tone < 0.4) {
      inkOn = false;
      root.classList.remove("ink-on");
    }

    if (scene && sceneBox && !reduced) {
      const r = sceneBox.getBoundingClientRect();
      const p = clamp01((vh - r.top) / (vh + r.height));
      scene.style.setProperty("--cp", `${((p - 0.5) * 14).toFixed(2)}%`);
    }
  });
}

/** Pose les effets sur la page d'accueil ; à appeler une fois, sur la racine. */
export function useHomeEffects(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = prefersReducedMotion();
    const cleanups: Array<() => void> = [];
    if (reduced) {
      revealAll(root);
    } else {
      cleanups.push(setupReveal(root), setupCounters(root), setupSpotlight(root));
    }
    cleanups.push(setupScroll(root, reduced));
    return () => cleanups.forEach((fn) => fn());
  }, [ref]);
}

/**
 * Parallaxe du pied de page. Le pied de page est collé au bas de l'écran en
 * CSS ; ici, seulement la progression de sa découverte (0 caché, 1 visible),
 * calculée depuis le bas du contenu qui le recouvre.
 */
export function useFooterReveal(
  rootRef: RefObject<HTMLElement | null>,
  footerRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const root = rootRef.current;
    const footer = footerRef.current;
    if (!root || !footer) return;
    if (prefersReducedMotion()) return;
    const main = document.querySelector("main");
    if (!main) return;
    // Un pied de page plus haut que l'écran ne peut pas être collé en bas :
    // son haut ne serait jamais visible. Il repasse alors dans le flux.
    const guard = () => {
      root.classList.toggle("ft-flow", footer.offsetHeight > window.innerHeight + 1);
    };
    guard();
    const sizes = new ResizeObserver(guard);
    sizes.observe(footer);
    const stop = trackScroll(() => {
      const vh = window.innerHeight || 1;
      const height = footer.offsetHeight || 1;
      const p = clamp01((vh - main.getBoundingClientRect().bottom) / height);
      root.style.setProperty("--ftp", p.toFixed(4));
    });
    return () => {
      sizes.disconnect();
      stop();
    };
  }, [rootRef, footerRef]);
}
