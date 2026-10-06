import { useState, type CSSProperties } from "react";
import { FAQ } from "@/content/home";
import { Chars, Pastille } from "./text";

/** Questions : colonne gauche collante, accordéon à droite, une ouverte. */
export function Questions() {
  const [open, setOpen] = useState(0);

  return (
    <section className="sec faq" data-ink="true" aria-labelledby="faq-title">
      <div className="wrap fq-grid">
        <div className="fq-left" data-rv="true">
          <div className="head">
            <Pastille>{FAQ.eyebrow}</Pastille>
            <h2 className="h2 left" id="faq-title">
              <Chars text={FAQ.title} />
            </h2>
            <p className="lead">{FAQ.lede}</p>
          </div>
        </div>
        <div className="fq-right">
          {FAQ.entries.map((entry, i) => {
            const isOpen = open === i;
            return (
              <div
                key={entry.q}
                className="fq-item"
                data-rv="true"
                style={{ "--d": i * 60 } as CSSProperties}
                {...(isOpen ? { "data-open": "" } : {})}
              >
                <h3 style={{ margin: 0, font: "inherit" }}>
                  <button
                    type="button"
                    className="fq-q"
                    id={`fq-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`fq-a${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    {entry.q}
                    <i aria-hidden="true" />
                  </button>
                </h3>
                <div className="fq-a" id={`fq-a${i}`} role="region" aria-labelledby={`fq-q${i}`}>
                  <div className="fq-a-in" {...(isOpen ? {} : { inert: true })}>
                    <p>{entry.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
