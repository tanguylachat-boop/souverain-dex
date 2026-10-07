import { COMPARE, type Mark } from "@/content/home";
import { CHECK, Head } from "./text";

/** Tableau comparatif, colonne LX Studio surlignée. */

function Cell({ mark }: { mark: Mark }) {
  if (mark === "oui") {
    return (
      <span className="m-oui" role="img" aria-label="oui">
        {CHECK}
      </span>
    );
  }
  if (mark === "variable") {
    return (
      <span className="m-var" role="img" aria-label="variable">
        <i
          aria-hidden="true"
          style={{ display: "inline-block", width: 12, height: 1.5, background: "currentColor" }}
        />
      </span>
    );
  }
  return (
    <span className="m-non" role="img" aria-label="non">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M6 6l12 12M6 18L18 6" />
      </svg>
    </span>
  );
}

export function Compare() {
  return (
    <section className="sec pourquoi" aria-labelledby="compare-title">
      <Head
        eyebrow={COMPARE.eyebrow}
        title={COMPARE.title}
        lede={COMPARE.lede}
        id="compare-title"
      />
      <div className="wrap" data-rv="true">
        <div className="cp-wrap">
          <table className="cp">
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Critère</span>
                </th>
                {COMPARE.columns.map((c, i) => (
                  <th key={c} scope="col" className={i === 0 ? "cp-hl" : undefined}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" style={{ fontWeight: 400 }}>
                    {row.label}
                  </th>
                  {row.marks.map((m, i) => (
                    <td key={i} className={i === 0 ? "cp-hl" : undefined}>
                      <Cell mark={m} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="cp-legende">{COMPARE.legend}</p>
      </div>
    </section>
  );
}
