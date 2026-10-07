import type { CSSProperties } from "react";
import { IMAGES, METHOD } from "@/content/home";
import { Head } from "./text";

/**
 * Comment on travaille : trois cartes à illustration animée, puis le bento
 * (outils qui défilent, photo et badges).
 */

function Hub() {
  return (
    <div className="m-art m-art-hub" aria-hidden="true">
      <span className="mh-orbe" />
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <span key={k} className="mh-b" style={{ "--k": k } as CSSProperties}>
          <b className="mh-sat" />
          <i className="mh-pulse" />
        </span>
      ))}
      <span className="mh-c" />
    </div>
  );
}

function Ruler() {
  return (
    <div className="m-art m-art-regle" aria-hidden="true">
      <span className="mr-trame">
        {[0, 1, 2].map((g) => (
          <span key={g} className="mr-groupe">
            {METHOD.milestones.map((m, j) => (
              <span key={m} className="mr-u" style={{ "--j": j } as CSSProperties}>
                <b />
                <em>{m}</em>
                <i />
                <i />
                <i />
              </span>
            ))}
          </span>
        ))}
      </span>
      <span className="mr-viseur" />
    </div>
  );
}

function After() {
  return (
    <div className="m-art m-art-apres" aria-hidden="true">
      <span className="ma-avant" />
      <span className="ma-jalon">
        <em>{METHOD.afterLabel}</em>
      </span>
      <span className="ma-apres">
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <i key={k} style={{ "--k": k } as CSSProperties} />
        ))}
      </span>
    </div>
  );
}

const ART = { noyau: Hub, regle: Ruler, apres: After } as const;

function Tool({ tool }: { tool: (typeof METHOD.tools)[number] }) {
  return (
    <span className="bn-tool" title={tool.name}>
      {tool.file ? (
        <img src={`/tools/${tool.file}`} alt="" width={34} height={34} loading="lazy" />
      ) : (
        <span className="bn-tool-mono">{tool.text}</span>
      )}
    </span>
  );
}

export function Approach() {
  const half = Math.ceil(METHOD.tools.length / 2);
  const rows = [METHOD.tools.slice(0, half), METHOD.tools.slice(half)];
  const photo = IMAGES.tanguy;

  return (
    <section id={METHOD.id} className="sec methode" aria-labelledby="method-title">
      <Head eyebrow={METHOD.eyebrow} title={METHOD.title} lede={METHOD.lede} id="method-title" />
      <div className="wrap m-grid">
        {METHOD.cards.map((card, i) => {
          const Art = ART[card.art];
          return (
            <article
              key={card.title}
              className="m-card"
              data-rv="true"
              style={{ "--d": i * 120 } as CSSProperties}
            >
              <Art />
              <h3 className="m-t">{card.title}</h3>
              <p className="m-b">{card.body}</p>
            </article>
          );
        })}
      </div>

      <div className="wrap bn-grid" data-rv="true">
        <div className="bn-left">
          <div>
            <p className="bn-tools-l mono">{METHOD.toolsLabel}</p>
            <div className="bn-tool-rows" aria-hidden="true">
              {rows.map((row, r) => (
                <div key={r} className={`bn-tool-row${r === 1 ? " rev" : ""}`}>
                  <div className="bn-tool-lane">
                    {[0, 1].map((copy) => (
                      <span key={copy} className="bn-tool-set">
                        {row.map((t) => (
                          <Tool key={t.name} tool={t} />
                        ))}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="sr-only">{METHOD.toolsSentence}</p>
          </div>
          <p className="bn-where">{METHOD.where}</p>
        </div>
        <div className="bn-team">
          <img
            className="bn-team-img"
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
          />
          {METHOD.badges.map((b, i) => (
            <div
              key={b.label}
              className={`bn-badge b${i + 1}`}
              {...(b.count !== null ? { "data-count": b.count, "data-from": 0 } : {})}
            >
              <span className="bn-n">
                {b.count !== null ? <span data-count-value="">{b.count}</span> : b.value}
              </span>
              <span className="bn-badge-l">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
