import { PITFALLS } from "@/content/home";
import { Section, Eyebrow, H2, Lede } from "./ui";
import { Appear } from "./Appear";

/**
 * Les trois façons de rater l'IA, puis la phrase qui répond aux trois.
 *
 * Trois colonnes sans cadre, séparées par un filet, parce que ce sont trois
 * erreurs à éviter et non trois produits à choisir. La réponse vient après,
 * seule, en plus grand : c'est elle que le lecteur doit retenir.
 */
export function Pitfalls() {
  return (
    <Section id={PITFALLS.id} tone="deep" labelledBy="erreurs-title">
      <Appear>
        <div style={{ maxWidth: "46rem" }}>
          <Eyebrow>{PITFALLS.eyebrow}</Eyebrow>
          <H2 id="erreurs-title" style={{ maxWidth: "18ch" }}>
            {PITFALLS.title}
          </H2>
          <Lede size="lg">{PITFALLS.lede}</Lede>
        </div>
      </Appear>

      <ol className="pitfalls">
        {PITFALLS.items.map((item, i) => (
          <Appear as="li" key={item.title} delay={i * 60} className="pitfall">
            <span className="pitfall-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="pitfall-title">{item.title}</h3>
            <p className="pitfall-body">{item.body}</p>
          </Appear>
        ))}
      </ol>

      <Appear delay={180}>
        <p className="pitfalls-answer">{PITFALLS.answer}</p>
      </Appear>
    </Section>
  );
}
