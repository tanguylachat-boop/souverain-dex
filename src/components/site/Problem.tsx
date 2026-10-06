import { PROBLEM, PITFALLS } from "@/content/home";
import { Section, Eyebrow, H2, Lede } from "./ui";
import { Appear } from "./Appear";
import { Rail } from "./Rail";
import { Disclosure } from "./Disclosure";

/**
 * Écran 2 : le problème concret.
 *
 * Cinq situations en cartes que l'on fait défiler, une phrase chacune : le
 * lecteur doit se reconnaître, pas tout lire. Les trois façons de rater
 * l'IA sont là pour qui veut les ouvrir, repliées par défaut.
 */
export function Problem() {
  return (
    <Section id={PROBLEM.id} tone="base" labelledBy="probleme-title">
      <Appear>
        <div style={{ maxWidth: "46rem" }}>
          <Eyebrow>{PROBLEM.eyebrow}</Eyebrow>
          <H2 id="probleme-title" style={{ maxWidth: "18ch" }}>
            {PROBLEM.title}
          </H2>
          <Lede size="lg">{PROBLEM.lede}</Lede>
        </div>
      </Appear>

      <Appear delay={60}>
        <Rail label={PROBLEM.railLabel} count={PROBLEM.items.length}>
          {PROBLEM.items.map((item, i) => (
            <div key={item.title} className="card problem-card">
              <span className="card-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-body">{item.body}</p>
            </div>
          ))}
        </Rail>
      </Appear>

      <Appear delay={120}>
        <Disclosure summary={PITFALLS.title} className="pitfalls">
          <ol className="pitfalls-list">
            {PITFALLS.items.map((item, i) => (
              <li key={item.title}>
                <span className="card-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
          <p className="pitfalls-answer">{PITFALLS.answer}</p>
        </Disclosure>
      </Appear>
    </Section>
  );
}
