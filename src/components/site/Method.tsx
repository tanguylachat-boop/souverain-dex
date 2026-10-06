import { METHOD } from "@/content/home";
import { Section, Eyebrow, H2, Lede } from "./ui";
import { Appear } from "./Appear";
import { Disclosure } from "./Disclosure";

/**
 * Écran 5 : comment on travaille, en accordéon.
 *
 * Quatre étapes, la première ouverte, une seule ouverte à la fois. Le
 * navigateur fait l'accordéon (attribut `name` de `details`), le composant
 * le refait pour ceux qui ne le connaissent pas encore.
 */
export function Method() {
  return (
    <Section id={METHOD.id} tone="deep" labelledBy="methode-title">
      <Appear>
        <div style={{ maxWidth: "46rem" }}>
          <Eyebrow>{METHOD.eyebrow}</Eyebrow>
          <H2 id="methode-title" style={{ maxWidth: "18ch" }}>
            {METHOD.title}
          </H2>
          <Lede size="lg">{METHOD.lede}</Lede>
        </div>
      </Appear>

      <Appear delay={60}>
        <div className="method">
          {METHOD.steps.map((step, i) => (
            <Disclosure
              key={step.title}
              name="methode"
              open={i === 0}
              className="method-step"
              summary={
                <span className="method-head">
                  <span className="card-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="method-title">{step.title}</span>
                  <span className="method-duration">{step.duration}</span>
                </span>
              }
            >
              <p className="card-body">{step.body}</p>
              <p className="method-output">
                <span>
                  {METHOD.outputLabel}
                  {" : "}
                </span>
                {step.output}
              </p>
            </Disclosure>
          ))}
        </div>
      </Appear>
    </Section>
  );
}
