import { RESULTS } from "@/content/home";
import { Section, Eyebrow, H2, Lede } from "./ui";
import { Appear } from "./Appear";
import { Rail } from "./Rail";
import { Disclosure } from "./Disclosure";

/**
 * Écran 4 : résultats clients.
 *
 * Trois cartes, trois lignes chacune : problème, installé, résultat. Le
 * résultat est un chiffre vérifié ou « mesure en cours », jamais un chiffre
 * inventé. L'avant / après complet attend derrière « Voir le détail ».
 */
export function Results() {
  const { labels } = RESULTS;

  return (
    <Section id={RESULTS.id} tone="base" labelledBy="resultats-title">
      <Appear>
        <div style={{ maxWidth: "46rem" }}>
          <Eyebrow>{RESULTS.eyebrow}</Eyebrow>
          <H2 id="resultats-title" style={{ maxWidth: "20ch" }}>
            {RESULTS.title}
          </H2>
          <Lede size="lg">{RESULTS.lede}</Lede>
        </div>
      </Appear>

      <Appear delay={60}>
        <Rail label={RESULTS.railLabel} count={RESULTS.items.length}>
          {RESULTS.items.map((item) => (
            <article key={item.client} className="card result-card">
              <h3 className="card-title">{item.client}</h3>
              <p className="result-meta">
                {item.place} · {item.sector}
              </p>
              <dl className="card-rows">
                <div>
                  <dt>{labels.problem}</dt>
                  <dd>{item.problem}</dd>
                </div>
                <div>
                  <dt>{labels.installed}</dt>
                  <dd>{item.installed}</dd>
                </div>
                <div>
                  <dt>{labels.result}</dt>
                  <dd>
                    <span className="result-label">
                      {item.resultLabel}
                      {" : "}
                    </span>
                    <strong className="result-value">{item.result}</strong>
                  </dd>
                </div>
              </dl>
              <Disclosure summary={RESULTS.detailLabel} className="card-detail">
                <dl className="card-rows">
                  <div>
                    <dt>{labels.before}</dt>
                    <dd>{item.before}</dd>
                  </div>
                  <div>
                    <dt>{labels.after}</dt>
                    <dd>{item.after}</dd>
                  </div>
                  <div>
                    <dt>{labels.running}</dt>
                    <dd>{item.running}</dd>
                  </div>
                </dl>
              </Disclosure>
            </article>
          ))}
        </Rail>
      </Appear>
    </Section>
  );
}
