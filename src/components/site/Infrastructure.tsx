import { Section, Eyebrow, H2, Lede, Body } from "./ui";
import { Reveal } from "./Reveal";

/**
 * Where the data goes, drawn as a diagram.
 *
 * "Vos données restent chez vous" is a sentence anyone can write. A diagram
 * showing the boundary, what crosses it and what does not, is the same claim
 * in a form the reader can check against his own situation.
 *
 * The SVG is labelled and described for screen readers, and every colour is
 * paired with a text label so nothing is carried by colour alone.
 */

const SOURCES = ["Boîte mail", "Scanner", "Logiciel comptable"] as const;
const OUTPUTS = ["Dossiers classés", "Relances envoyées", "Écritures préparées"] as const;

const MODES = [
  {
    title: "Sur votre matériel",
    tag: "Secret professionnel",
    body: "Le système tourne sur une machine installée dans vos locaux. Aucune donnée ne sort du réseau local, et un prestataire informatique peut le vérifier en regardant le trafic sortant.",
  },
  {
    title: "Hébergé, documenté",
    tag: "Le cas courant",
    body: "Pour les métiers non soumis au secret, l'hébergement se fait en Suisse ou dans l'Union européenne. Les serveurs et les modèles utilisés sont écrits dans le devis, avant signature.",
  },
] as const;

function Node({ children }: { children: string }) {
  return (
    <li
      style={{
        padding: "0.625rem 0.875rem",
        borderRadius: 10,
        border: "1px solid var(--border-subtle)",
        background: "var(--surface-2)",
        fontSize: "0.8125rem",
        color: "var(--text-secondary)",
        whiteSpace: "nowrap",
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
  return (
    <Section id="infrastructure" tone="raised" labelledBy="infra-title">
      <div style={{ maxWidth: "46rem" }}>
        <Eyebrow>L'infrastructure</Eyebrow>
        <H2 id="infra-title" style={{ maxWidth: "22ch" }}>
          Où vivent vos données, décidé au départ.
        </H2>
        <Lede>
          C'est la question qui arrête la moitié des projets, et elle arrive
          presque toujours trop tard. Elle se tranche à l'audit, avant le
          premier franc dépensé.
        </Lede>
      </div>

      <Reveal>
        <div
          className="card infra-diagram"
          style={{ marginTop: "3rem", padding: "2rem 1.75rem" }}
          role="img"
          aria-label="Schéma : les documents arrivent de votre boîte mail, de votre scanner et de votre logiciel comptable, passent par l'agent installé dans votre périmètre, et ressortent en dossiers classés, relances envoyées et écritures préparées. Rien ne traverse ce périmètre sans être écrit dans le devis."
        >
          <div className="infra-col">
            <p className="infra-label">Ce qui entre</p>
            <ul className="infra-list">
              {SOURCES.map((s) => (
                <Node key={s}>{s}</Node>
              ))}
            </ul>
          </div>

          <Arrow />

          <div className="infra-core">
            <p
              style={{
                fontSize: "0.625rem",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent-text)",
                marginBottom: "0.75rem",
              }}
            >
              Votre périmètre
            </p>
            <p
              style={{
                fontSize: "1.0625rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
              }}
            >
              L'agent
            </p>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-muted)",
                lineHeight: 1.6,
              }}
            >
              Lit, extrait, classe, relance. Sur votre machine ou sur un
              hébergement nommé dans le devis.
            </p>
          </div>

          <Arrow />

          <div className="infra-col">
            <p className="infra-label">Ce qui sort</p>
            <ul className="infra-list">
              {OUTPUTS.map((o) => (
                <Node key={o}>{o}</Node>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <div
        style={{
          marginTop: "2.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {MODES.map((mode, i) => (
          <Reveal key={mode.title} delay={i * 0.08}>
            <div className="card" style={{ padding: "1.75rem", height: "100%" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "0.25rem 0.625rem",
                  borderRadius: 999,
                  border: "1px solid var(--border-subtle)",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-faint)",
                }}
              >
                {mode.tag}
              </span>
              <h3
                style={{
                  marginTop: "1rem",
                  marginBottom: "0.625rem",
                  fontSize: "1.0625rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                {mode.title}
              </h3>
              <Body>{mode.body}</Body>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
