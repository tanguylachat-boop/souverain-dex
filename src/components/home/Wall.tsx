import type { CSSProperties } from "react";
import { WALL, type Fact } from "@/content/home";
import { Btn, Head } from "./text";

/**
 * Mur de faits : trois colonnes qui défilent en continu, la colonne centrale
 * en sens inverse. Chaque colonne contient sa liste deux fois ; la seconde
 * copie est cachée aux lecteurs d'écran et sert à boucler sans à-coup.
 */

const COLUMNS = 3;

function Card({ fact }: { fact: Fact }) {
  return (
    <article className="av-c">
      <span className="av-k">
        <i aria-hidden="true" />
        {WALL.eyebrow}
      </span>
      <p className="av-t">{fact.text}</p>
      <div className="av-p">
        <span className="av-auteur">{fact.who}</span>
        <span className="av-meta">{fact.where}</span>
      </div>
    </article>
  );
}

export function Wall() {
  const columns: Fact[][] = Array.from({ length: COLUMNS }, () => []);
  WALL.facts.forEach((f, i) => columns[i % COLUMNS].push(f));

  return (
    <section className="sec avis" aria-labelledby="wall-title">
      <Head eyebrow={WALL.eyebrow} title={WALL.title} id="wall-title" />
      <div className="wrap" style={{ textAlign: "center" }} data-rv="true">
        <div className="av-note" data-count={Number(WALL.noteValue)} data-from={0}>
          <span className="av-note-n">
            <span data-count-value="">{WALL.noteValue}</span>
          </span>
          <span className="av-note-d">
            <span className="av-note-t">{WALL.noteLabel}</span>
            <span className="av-note-s">{WALL.noteNames}</span>
          </span>
        </div>
      </div>
      <div className="av-mur">
        {columns.map((col, k) => (
          <div
            key={k}
            className="av-col"
            data-sens={k === 1 ? "bas" : "haut"}
            style={{ "--av-n": col.length } as CSSProperties}
          >
            <div className="av-piste">
              <div className="av-groupe">
                {col.map((f, i) => (
                  <Card key={i} fact={f} />
                ))}
              </div>
              <div className="av-groupe" aria-hidden="true">
                {col.map((f, i) => (
                  <Card key={i} fact={f} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="wrap av-pied">
        <Btn href={WALL.footer.href} variant="secondary">
          {WALL.footer.label}
        </Btn>
      </div>
    </section>
  );
}
