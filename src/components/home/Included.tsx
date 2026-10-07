import type { CSSProperties } from "react";
import { INCLUDED } from "@/content/home";
import { Btn, CHECK, Chars, Pastille } from "./text";

/** Ce qui est compris : texte à gauche, feuille inclinée à droite. */
export function Included() {
  return (
    <section id={INCLUDED.id} className="sec inclus" aria-labelledby="included-title">
      <div className="wrap in-grid">
        <div className="in-left" data-rv="true">
          <Pastille>{INCLUDED.eyebrow}</Pastille>
          <h2 className="h2 left" id="included-title">
            <Chars text={INCLUDED.title} />
          </h2>
          <p className="lead">{INCLUDED.lede}</p>
          <div className="in-cta">
            <Btn href={INCLUDED.cta.href} variant="secondary">
              {INCLUDED.cta.label}
            </Btn>
          </div>
        </div>
        <div className="in-scene" data-rv="true">
          <div className="in-sheet">
            <div className="in-sheet-h mono">
              <span>{INCLUDED.sheetLabel}</span>
              <b>{INCLUDED.sheetCount}</b>
            </div>
            <ul className="in-inv">
              {INCLUDED.items.map((item, i) => (
                <li key={item} className="in-inv-i" style={{ "--i": i } as CSSProperties}>
                  <span className="in-inv-c" aria-hidden="true">
                    {CHECK}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="in-pied mono">{INCLUDED.sheetFooter}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
