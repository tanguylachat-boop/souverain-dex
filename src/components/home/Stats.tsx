import type { CSSProperties } from "react";
import { STATS, type Stat } from "@/content/home";

/**
 * Quatre chiffres sous le hero, chacun avec une icône animée en CSS et un
 * compteur qui monte à l'apparition (effects.ts lit `data-count`).
 */

const CAL_PAGES = ["08", "16", "24", "32", "40", "48"];

function Icon({ kind }: { kind: Stat["icon"] }) {
  if (kind === "tuiles") {
    return (
      <span className="ch-ic ch-mur" aria-hidden="true">
        {[0, 1, 2].map((c) => (
          <span key={c} className="ch-mur-c" data-sens={c === 1 ? "bas" : "haut"}>
            <span className="ch-mur-p" style={{ "--i": c } as CSSProperties}>
              {[0, 1].map((g) => (
                <span key={g} className="ch-mur-g">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    );
  }
  if (kind === "noyau") {
    return (
      <span className="ch-ic ch-noyau m-art-hub" aria-hidden="true">
        <span className="mh-orbe" />
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <span key={k} className="mh-b" style={{ "--k": k, "--R": "17px" } as CSSProperties}>
            <b className="mh-sat" />
            <i className="mh-pulse" />
          </span>
        ))}
        <span className="mh-c" style={{ width: 7, height: 7, margin: "-3.5px 0 0 -3.5px" }} />
      </span>
    );
  }
  if (kind === "calendrier") {
    return (
      <span className="ch-ic ch-cal" aria-hidden="true">
        <span className="ch-cal-anneaux" />
        <span className="ch-cal-b" style={{ "--n": CAL_PAGES.length } as CSSProperties}>
          <span className="ch-cal-h" />
          {CAL_PAGES.map((p, i) => (
            <span key={p} className="ch-cal-p" style={{ "--i": i } as CSSProperties}>
              {p}
            </span>
          ))}
        </span>
      </span>
    );
  }
  return (
    <span className="ch-ic ch-jauge" aria-hidden="true">
      <svg viewBox="0 0 44 44">
        <circle className="ch-j-p" cx="22" cy="22" r="17" />
        <circle className="ch-j-v" cx="22" cy="22" r="17" transform="rotate(-90 22 22)" />
      </svg>
    </span>
  );
}

export function Stats() {
  return (
    <section className="sec chiffres" aria-label="En quelques chiffres">
      <div className="wrap ch-rang" data-rv="true">
        {STATS.map((s, i) => {
          const unit = s.count === null ? "" : s.value.replace(String(s.count), "").trim();
          return (
            <div
              key={s.label}
              className="ch-i"
              style={{ "--d": 90 * i } as CSSProperties}
              {...(s.count !== null ? { "data-count": s.count, "data-from": 0 } : {})}
            >
              <Icon kind={s.icon} />
              <div className="ch-t">
                <p className="ch-v">
                  {s.count !== null ? <span data-count-value="">{s.count}</span> : s.value}
                  {unit ? <small>{unit}</small> : null}
                </p>
                <p className="ch-l mono">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
