/**
 * Un seul écouteur de défilement pour toute la page.
 *
 * Chaque élément qui bouge avec le défilement (la photo de l'accueil, les
 * photos qui zooment) s'inscrit ici au lieu de poser son propre écouteur. Un
 * seul `requestAnimationFrame` par image appelle toutes les fonctions
 * inscrites, dans l'ordre : une lecture de layout chacune, jamais plus.
 */

const subscribers = new Set<() => void>();
let frame = 0;
let listening = false;

function run() {
  frame = 0;
  for (const update of subscribers) update();
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(run);
}

/** Inscrit `update`, l'appelle tout de suite, et renvoie la désinscription. */
export function trackScroll(update: () => void): () => void {
  subscribers.add(update);
  if (!listening) {
    listening = true;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }
  update();
  return () => {
    subscribers.delete(update);
    if (subscribers.size === 0 && listening) {
      listening = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }
  };
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
