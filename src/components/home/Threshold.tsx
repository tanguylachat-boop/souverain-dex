import { THRESHOLD } from "@/content/home";
import { Chars } from "./text";

/** Le seuil : la page passe du sombre au clair ici (voir effects.ts). */
export function Threshold() {
  return (
    <section className="sec seuil" data-ink="true" aria-label={THRESHOLD.pivot}>
      <div className="wrap sl-in" data-rv="true">
        <p className="sl-recap">{THRESHOLD.recap}</p>
        <p className="sl-pivot">
          <Chars text={THRESHOLD.pivot} />
        </p>
      </div>
    </section>
  );
}
