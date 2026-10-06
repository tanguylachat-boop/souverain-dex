import { DATA_DIAGRAM } from "@/content/home";

/**
 * Le schéma des données, sous la réponse « Où vont mes données ? ».
 *
 * La même promesse que la phrase, sous une forme que le lecteur peut
 * confronter à sa situation : ce qui entre, ce qui tourne chez lui, ce qui
 * sort. Lu par les lecteurs d'écran comme une image décrite.
 */

function Node({ children }: { children: string }) {
  return <li className="infra-node">{children}</li>;
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

export function DataDiagram() {
  const d = DATA_DIAGRAM;
  return (
    <div className="card infra-diagram" role="img" aria-label={d.ariaLabel}>
      <div className="infra-col">
        <p className="infra-label">{d.inLabel}</p>
        <ul className="infra-list">
          {d.inputs.map((item) => (
            <Node key={item}>{item}</Node>
          ))}
        </ul>
      </div>

      <Arrow />

      <div className="infra-core">
        <p className="infra-core-label">{d.coreLabel}</p>
        <p className="infra-core-title">{d.coreTitle}</p>
        <p className="infra-core-body">{d.coreBody}</p>
      </div>

      <Arrow />

      <div className="infra-col">
        <p className="infra-label">{d.outLabel}</p>
        <ul className="infra-list">
          {d.outputs.map((item) => (
            <Node key={item}>{item}</Node>
          ))}
        </ul>
      </div>
    </div>
  );
}
