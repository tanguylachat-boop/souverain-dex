import { PROOF } from "@/content/home";
import { Section, Eyebrow, H2, Lede } from "./ui";
import { Appear } from "./Appear";

/**
 * La preuve : trois clients, chacun en avant / après / ce qui tourne.
 *
 * Trois cartes posées l'une sous l'autre, pleine largeur, plutôt que trois
 * colonnes : le texte est long, et trois colonnes étroites en feraient des
 * tours de texte illisibles sur un téléphone. Quand une mesure n'est pas
 * encore faite, la carte le dit en toutes lettres plutôt que d'inventer.
 */
export function Proof() {
  const { labels } = PROOF;

  return (
    <Section id={PROOF.id} tone="deep" labelledBy="preuve-title" className="tight-top">
      <Appear>
        <div style={{ maxWidth: "46rem" }}>
          <Eyebrow>{PROOF.eyebrow}</Eyebrow>
          <H2 id="preuve-title" style={{ maxWidth: "24ch" }}>
            {PROOF.title}
          </H2>
          <Lede size="lg">{PROOF.lede}</Lede>
        </div>
      </Appear>

      <ol className="proof-list">
        {PROOF.cards.map((card, i) => (
          <Appear as="li" key={card.client} delay={i * 60}>
            <article className="card proof-card" aria-labelledby={`preuve-client-${i}`}>
              <header className="proof-head">
                <h3 id={`preuve-client-${i}`} className="proof-client">
                  {card.client}
                </h3>
                <p className="proof-meta">
                  {card.place} · {card.sector}
                </p>
              </header>

              <dl className="proof-grid">
                <div>
                  <dt>{labels.before}</dt>
                  <dd>{card.before}</dd>
                </div>
                <div>
                  <dt>{labels.after}</dt>
                  <dd>{card.after}</dd>
                </div>
                <div>
                  <dt>{labels.running}</dt>
                  <dd>{card.running}</dd>
                </div>
              </dl>

              <p className="proof-measure">
                <span>{card.measure.label}</span>
                <strong>{card.measure.value}</strong>
              </p>
            </article>
          </Appear>
        ))}
      </ol>
    </Section>
  );
}
