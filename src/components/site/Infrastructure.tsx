import { INFRA } from "@/content/home";
import { Section, Eyebrow, H2, Lede } from "./ui";
import { Appear } from "./Appear";

/**
 * Où vont les données, en une phrase et un schéma.
 *
 * « Vos données restent chez vous » est une phrase que n'importe qui peut
 * écrire. Un schéma qui montre la limite, ce qui la traverse et ce qui ne la
 * traverse pas, est la même promesse sous une forme que le lecteur peut
 * confronter à sa propre situation.
 */

function Node({ children }: { children: string }) {
  return (
    <li
      style={{
        padding: "0.75rem 1rem",
        borderRadius: 10,
        border: "1px solid var(--border-subtle)",
        background: "var(--surface-2)",
        fontSize: "1rem",
        lineHeight: 1.4,
        color: "var(--text-secondary)",
      }}
    >
      {children}
    </li>
  );
}

function Arrow() {
  return (
    <svg
      width="28"
      height="14"
      viewBox="0 0 28 14"
      fill="none"
      aria-hidden="true"
      className="infra-arrow"
    >
      <path
        d="M0 7h24M19 2l5 5-5 5"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Infrastructure() {
  const diagram = INFRA.diagram;

  return (
    <Section id={INFRA.id} tone="deep" labelledBy="donnees-title">
      <Appear>
        <div style={{ maxWidth: "46rem" }}>
          <Eyebrow>{INFRA.eyebrow}</Eyebrow>
          <H2 id="donnees-title" style={{ maxWidth: "20ch" }}>
            {INFRA.title}
          </H2>
          <Lede size="lg">{INFRA.sentence}</Lede>
        </div>
      </Appear>

      <Appear delay={60}>
        <div
          className="card infra-diagram"
          style={{ marginTop: "3rem", padding: "2rem 1.75rem" }}
          role="img"
          aria-label={diagram.ariaLabel}
        >
          <div className="infra-col">
            <p className="infra-label">{diagram.inLabel}</p>
            <ul className="infra-list">
              {diagram.inputs.map((item) => (
                <Node key={item}>{item}</Node>
              ))}
            </ul>
          </div>

          <Arrow />

          <div className="infra-core">
            <p className="infra-core-label">{diagram.coreLabel}</p>
            <p className="infra-core-title">{diagram.coreTitle}</p>
            <p className="infra-core-body">{diagram.coreBody}</p>
          </div>

          <Arrow />

          <div className="infra-col">
            <p className="infra-label">{diagram.outLabel}</p>
            <ul className="infra-list">
              {diagram.outputs.map((item) => (
                <Node key={item}>{item}</Node>
              ))}
            </ul>
          </div>
        </div>
      </Appear>
    </Section>
  );
}
