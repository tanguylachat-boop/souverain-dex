import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { IMAGES, WORKS } from "@/content/home";
import { Btn, Head } from "./text";

/**
 * Trois clients dans un carrousel : texte à gauche, photo à droite.
 *
 * La barre sous l'onglet actif est une animation CSS de 7 secondes ; sa fin
 * (événement animationend) fait avancer le carrousel, ce qui garde la barre
 * et le changement de client exactement en phase, pause au survol comprise.
 * Hors de l'écran, `data-pause` gèle la barre. Un glissement de 50 px change
 * de client au doigt.
 */

const SWIPE = 50;

export function Works() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const car = useRef<HTMLDivElement>(null);
  const press = useRef<{ x: number; y: number } | null>(null);
  const count = WORKS.items.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    const el = car.current;
    if (!el) return;
    const io = new IntersectionObserver(([r]) => setPaused(!r.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id={WORKS.id} className="sec works" aria-labelledby="works-title">
      <Head eyebrow={WORKS.eyebrow} title={WORKS.title} lede={WORKS.lede} id="works-title" />
      <div
        className="wrap wk-car"
        ref={car}
        style={{ "--wk-ms": "7000ms" } as CSSProperties}
        {...(paused ? { "data-pause": "" } : {})}
      >
        <div
          className="wk-vue"
          onPointerDown={(e) => {
            press.current = { x: e.clientX, y: e.clientY };
          }}
          onPointerUp={(e) => {
            const start = press.current;
            press.current = null;
            if (!start) return;
            const dx = e.clientX - start.x;
            const dy = e.clientY - start.y;
            if (Math.abs(dx) < SWIPE || Math.abs(dx) < Math.abs(dy)) return;
            go(index + (dx < 0 ? 1 : -1));
          }}
        >
          <div className="wk-piste" style={{ "--i": index } as CSSProperties}>
            {WORKS.items.map((w, i) => {
              const img = IMAGES[w.image];
              const active = i === index;
              return (
                <article
                  key={w.key}
                  id={`wk-p${i}`}
                  className="wf"
                  role="tabpanel"
                  aria-labelledby={`wk-t${i}`}
                  aria-hidden={!active}
                  {...(active ? {} : { inert: true })}
                >
                  <div className="wf-txt" data-rv="true">
                    <p className="wf-meta mono">
                      {w.meta}
                      <span className="wf-sep" aria-hidden="true" />
                      {w.kind}
                    </p>
                    <h3 className="wf-t">{w.client}</h3>
                    <p className="wf-b">{w.body}</p>
                    <dl className="wf-rep">
                      {w.facts.map((f) => (
                        <div className="wf-rep-i" key={f.label}>
                          <dt className="mono">{f.label}</dt>
                          <dd>{f.value === "mesure en cours" ? <em>{f.value}</em> : f.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="wf-media" data-rv="true">
                    <span className="wf-cadre">
                      <span className="wf-cover">
                        <img
                          src={img.src}
                          width={img.width}
                          height={img.height}
                          alt={img.alt}
                          loading={i === 0 ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </span>
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="wk-nav">
          <div className="wk-rail" role="tablist" aria-label="Clients">
            {WORKS.items.map((w, i) => (
              <button
                key={w.key}
                type="button"
                role="tab"
                id={`wk-t${i}`}
                className="wk-onglet"
                aria-selected={i === index}
                aria-controls={`wk-p${i}`}
                tabIndex={i === index ? 0 : -1}
                onClick={() => go(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") go(index + 1);
                  if (e.key === "ArrowLeft") go(index - 1);
                }}
                onAnimationEnd={(e) => {
                  if (e.animationName === "lxBarre" && i === index) go(index + 1);
                }}
              >
                <span className="wk-o-n">{WORKS.tabPrefix[i]}</span>
                <span className="wk-o-t">{w.client}</span>
              </button>
            ))}
          </div>
          <div className="wk-fls">
            <button
              type="button"
              className="wk-fl"
              aria-label={WORKS.prev}
              onClick={() => go(index - 1)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5M11 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              className="wk-fl"
              aria-label={WORKS.next}
              onClick={() => go(index + 1)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="wk-more">
          <Btn href="#methode" variant="secondary">
            Voir comment on travaille
          </Btn>
        </div>
      </div>
    </section>
  );
}
