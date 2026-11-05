import { useRef, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useIaEffects } from "./effects";
import { IconArrowUp } from "./icons";
import { useContent } from "./lang";

/**
 * La coque de chaque page : lien d'évitement, en-tête, contenu, pied de
 * page, retour en haut. Les effets (apparitions, en-tête, parallaxe) sont
 * posés une fois ici, sur la racine du contenu.
 */
export function IaPage({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const { ui } = useContent();
  useIaEffects(root);
  return (
    <>
      <a className="ia-skip" href="#main">
        {ui.skipLink}
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="ia-main" ref={root}>
        {children}
      </main>
      <Footer />
      <button
        type="button"
        className="ia-top"
        aria-label={ui.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <IconArrowUp />
      </button>
    </>
  );
}
