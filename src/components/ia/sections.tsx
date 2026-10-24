import { Link } from "@tanstack/react-router";
import { CREDIBILITY, PROBLEM, SECTORS, HERO } from "@/content/ia/home";
import { SITE } from "@/content/ia/site";
import type { Resource } from "@/content/ia/ressources";
import { Mesh } from "./Mesh";
import { IconArrow, IconPlay } from "./icons";
import { SectionHead, T, Eyebrow, vars } from "./text";

/* --------------------------------------------------------------------------
 * Références : un logo en gris, une ligne vraie sous chacun.
 * ------------------------------------------------------------------------ */
export function LogoBand() {
  const showCchbc = SITE.showCchbc || import.meta.env.VITE_SHOW_CCHBC === "true";
  const clients = CREDIBILITY.clients.filter((c) => !("gated" in c && c.gated) || showCchbc);
  return (
    <section className="ia-refs" aria-labelledby="refs-title">
      <div className="ia-container">
        <p className="ia-refs-label" data-rv="">
          {CREDIBILITY.eyebrow}
        </p>
        <h2 id="refs-title" className="ia-refs-title" data-rv="">
          {CREDIBILITY.title}
        </h2>
        <ul className="ia-refs-grid" style={{ listStyle: "none", padding: 0, margin: "44px 0 0" }}>
          {clients.map((c) => (
            <li key={c.name} className="ia-ref" data-rv="">
              <div className="ia-ref-logo">
                {c.logo ? (
                  <img
                    src={c.logo}
                    width={c.width}
                    height={c.height}
                    alt={`Logo ${c.name}`}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="ia-ref-name">{c.name}</span>
                )}
              </div>
              {"placeholder" in c && c.placeholder ? (
                <mark className="ia-placeholder">{c.placeholder}</mark>
              ) : null}
              <p className="ia-ref-line">
                <small>
                  {c.name}
                  {c.note ? ` · ${c.note}` : ""}
                </small>
                {c.line}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
 * La démo : le cadre attend la vidéo, le trou se voit.
 * ------------------------------------------------------------------------ */
export function Demo() {
  return (
    <section className="ia-demo" id="demo" aria-labelledby="demo-title">
      <div className="ia-container">
        <div className="ia-demo-in">
          <div className="ia-demo-text">
            <Eyebrow>La démo</Eyebrow>
            <h2 id="demo-title" data-rv="">
              Deux minutes pour voir le système traiter de vraies pièces.
            </h2>
            <p data-rv="">
              <T>{`La vidéo montre une pièce qui arrive, est lue, classée et proposée à la validation, sur une machine qui n'est reliée à rien. ${SITE.demoVideo}`}</T>
            </p>
          </div>
          <div
            className="ia-demo-frame"
            data-rv="scale"
            role="img"
            aria-label="Emplacement de la vidéo de démonstration"
          >
            <div className="ia-mesh-css" aria-hidden="true" />
            <div className="ia-demo-play">
              <i aria-hidden="true">
                <IconPlay />
              </i>
              <span>{HERO.secondary.label}</span>
              <mark className="ia-placeholder">{SITE.demoVideo}</mark>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
 * Le problème : trois cartes numérotées.
 * ------------------------------------------------------------------------ */
export function Problem({
  title = PROBLEM.title,
  blocks = PROBLEM.blocks,
}: {
  title?: string;
  blocks?: readonly string[];
}) {
  return (
    <section className="ia-section" aria-labelledby="problem-title">
      <div className="ia-container">
        <SectionHead id="problem-title" eyebrow={PROBLEM.eyebrow} title={title} />
        <div className="ia-cards">
          {blocks.map((text, i) => (
            <div key={text} className="ia-card" data-rv="">
              <span className="ia-num">{String(i + 1).padStart(2, "0")}</span>
              <p className="is-big">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
 * Lignes numérotées : la méthode, ce que le système fait.
 * ------------------------------------------------------------------------ */
export function Rows({
  id,
  eyebrow,
  title,
  lede,
  items,
  note,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede?: string;
  items: ReadonlyArray<{ title: string; meta?: string; text: string }>;
  note?: string;
}) {
  return (
    <section className="ia-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="ia-container">
        <SectionHead id={`${id}-title`} eyebrow={eyebrow} title={title} lede={lede} />
        <div className="ia-rows">
          {items.map((item, i) => (
            <div key={item.title} className="ia-row" data-rv="">
              <span className="ia-num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="ia-row-name">{item.title}</h3>
                {item.meta ? (
                  <div className="ia-row-tags">
                    <span className="ia-tag">{item.meta}</span>
                  </div>
                ) : null}
              </div>
              <p className="ia-row-desc">
                <T>{item.text}</T>
              </p>
            </div>
          ))}
        </div>
        {note ? (
          <p className="ia-rows-note" data-rv="">
            <T>{note}</T>
          </p>
        ) : null}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
 * La différence : bande de nuit et tableau.
 * ------------------------------------------------------------------------ */
export function Difference({
  eyebrow,
  title,
  columns,
  rows,
}: {
  eyebrow: string;
  title: string;
  columns: readonly [string, string];
  rows: ReadonlyArray<{ label: string; generic: string; lx: string }>;
}) {
  return (
    <section className="ia-night ia-night-sec" aria-labelledby="diff-title">
      <Mesh intensity={0.8} />
      <div className="ia-container">
        <SectionHead id="diff-title" eyebrow={eyebrow} title={title} />
        <div className="ia-cmp" role="table" aria-label={`${columns[0]} comparée à ${columns[1]}`}>
          <div className="ia-cmp-row is-head" role="row">
            <div className="ia-cmp-cell" role="columnheader" />
            <div className="ia-cmp-cell" role="columnheader">
              {columns[0]}
            </div>
            <div
              className="ia-cmp-cell ia-cmp-lx"
              role="columnheader"
              style={{ background: "transparent", border: 0, boxShadow: "none" }}
            >
              {columns[1]}
            </div>
          </div>
          {rows.map((r) => (
            <div key={r.label} className="ia-cmp-row" role="row" data-rv="">
              <div className="ia-cmp-cell ia-cmp-label" role="rowheader">
                {r.label}
              </div>
              <div className="ia-cmp-cell ia-cmp-generic" role="cell" data-col={columns[0]}>
                {r.generic}
              </div>
              <div className="ia-cmp-cell ia-cmp-lx" role="cell" data-col={columns[1]}>
                {r.lx}
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className="ia-night-edge" aria-hidden="true" />
    </section>
  );
}

/* --------------------------------------------------------------------------
 * Par métier : trois cartes qui dézooment.
 * ------------------------------------------------------------------------ */
function SectorGlyph({ to }: { to: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (to === "/fiduciaires") {
    return (
      <svg viewBox="0 0 120 120" className="ia-sector-glyph" aria-hidden="true" {...common}>
        <rect x="30" y="22" width="54" height="70" rx="8" />
        <rect x="40" y="32" width="54" height="70" rx="8" fill="#050a24" fillOpacity="0.6" />
        <path d="M52 50h30M52 62h30M52 74h18" />
        <path d="M80 86l6 6 10-12" strokeWidth="2.4" />
      </svg>
    );
  }
  if (to === "/administrations") {
    return (
      <svg viewBox="0 0 120 120" className="ia-sector-glyph" aria-hidden="true" {...common}>
        <path d="M60 18l34 12v26c0 22-14 38-34 46-20-8-34-24-34-46V30z" />
        <path d="M44 54h32M44 64h32M44 74h20" />
        <rect
          x="66"
          y="70"
          width="14"
          height="8"
          rx="2"
          fill="currentColor"
          stroke="none"
          opacity="0.8"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 120" className="ia-sector-glyph" aria-hidden="true" {...common}>
      <rect x="22" y="34" width="76" height="52" rx="8" />
      <path d="M22 42l38 26 38-26" />
      <path d="M84 20l10 10-10 10M94 30H70" strokeWidth="2.2" />
    </svg>
  );
}

export function Sectors() {
  return (
    <section className="ia-section" aria-labelledby="sectors-title">
      <div className="ia-container">
        <SectionHead id="sectors-title" eyebrow={SECTORS.eyebrow} title={SECTORS.title} />
        <div className="ia-sectors">
          {SECTORS.cards.map((card) => (
            <Link key={card.to} to={card.to} className="ia-sector" data-rv="">
              <div className="ia-sector-art">
                <div className="ia-mesh-css" aria-hidden="true" />
                <span className="ia-sector-kicker">{card.kicker}</span>
                <SectorGlyph to={card.to} />
              </div>
              <div className="ia-sector-meta">
                <h3 className="ia-sector-title">{card.title}</h3>
                <span className="ia-sector-cta">
                  {card.cta}
                  <IconArrow size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
 * Articles : cartes de lecture.
 * ------------------------------------------------------------------------ */
const dateFormat = new Intl.DateTimeFormat("fr-CH", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export function Posts({
  id = "posts",
  eyebrow,
  title,
  items,
  cta,
  limit,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  items: ReadonlyArray<Resource>;
  cta?: { label: string; to: "/ressources" };
  limit?: number;
}) {
  const list = limit ? items.slice(0, limit) : items;
  return (
    <section className="ia-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="ia-container">
        <SectionHead
          id={`${id}-title`}
          eyebrow={eyebrow}
          title={title}
          aside={
            cta ? (
              <Link to={cta.to} className="ia-btn is-outline">
                {cta.label}
                <IconArrow />
              </Link>
            ) : undefined
          }
        />
        <div className="ia-posts">
          {list.map((r, i) => (
            <Link
              key={r.slug}
              to="/ressources/$slug"
              params={{ slug: r.slug }}
              className="ia-post"
              data-rv=""
              style={vars({ "--d": Math.min(i, 5) * 50 })}
            >
              <span className="ia-post-tag">{r.tag}</span>
              <h3>{r.title}</h3>
              <p>{r.summary}</p>
              <span className="ia-post-meta">
                {dateFormat.format(new Date(r.published))} · {r.readingMinutes} min de lecture
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
