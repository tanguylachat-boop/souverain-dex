import { Section, Eyebrow, H2, Lede, Body } from "./ui";
import { Reveal } from "./Reveal";

/**
 * What actually gets installed, described generically.
 *
 * No client is named and no screenshot is shown: these are the shapes of work
 * that recur, not case studies. Each one states the trigger, what the system
 * does, and what a person still decides, because the last point is the one
 * every prospect asks about and the one most vendors leave out.
 */

const EXAMPLES = [
  {
    icon: (
      <>
        <path d="M7 4h7l5 5v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
        <path d="M14 4v5h5" />
        <path d="M9 14h6M9 17h4" />
      </>
    ),
    title: "Traitement des pièces entrantes",
    trigger: "Un document arrive par mail, par scan ou par photo.",
    does: "Il est lu, les montants et les dates en sont extraits, il est renommé selon vos conventions et déposé dans le bon dossier client.",
    human: "Vous validez les pièces dont la lecture est incertaine. Le reste passe seul.",
  },
  {
    icon: (
      <>
        <path d="M4 6h16v10H7l-3 3V6z" />
        <path d="M8 10h8M8 13h5" />
      </>
    ),
    title: "Relances automatiques",
    trigger: "Une échéance approche ou une pièce manque depuis trop longtemps.",
    does: "Le message part au bon moment, au nom de votre entreprise, avec la liste exacte de ce qui manque. Les réponses reviennent dans votre boîte habituelle.",
    human: "Vous fixez le ton et les délais une fois. Vous pouvez suspendre un client en un clic.",
  },
  {
    icon: (
      <>
        <path d="M3 12h4l3 8 4-16 3 8h4" />
      </>
    ),
    title: "Tableau de bord d'activité",
    trigger: "Vous voulez savoir où en est réellement le travail.",
    does: "Les dossiers en cours, les retards, les volumes traités et le temps gagné sont rassemblés sur un seul écran, alimenté par vos outils existants.",
    human: "Rien n'est décidé à votre place. L'écran montre, il n'agit pas.",
  },
  {
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </>
    ),
    title: "Recherche dans vos propres documents",
    trigger: "Une question porte sur un dossier d'il y a trois ans.",
    does: "La réponse est trouvée dans vos archives et citée avec le document et la page d'où elle vient, pour que vous puissiez la vérifier.",
    human: "Aucune réponse n'est donnée sans sa source. Une question sans réponse dans vos documents reste sans réponse.",
  },
] as const;

export function Examples() {
  return (
    <Section id="exemples" tone="base" labelledBy="exemples-title">
      <div style={{ maxWidth: "46rem" }}>
        <Eyebrow>Ce qu'on met en place</Eyebrow>
        <H2 id="exemples-title" style={{ maxWidth: "22ch" }}>
          Quatre automatisations qui reviennent presque partout.
        </H2>
        <Lede>
          Ce ne sont pas des études de cas : aucun client n'est nommé ici. Ce
          sont les formes de travail qui se répètent d'une entreprise à l'autre,
          et ce qu'une personne continue de décider dans chacune.
        </Lede>
      </div>

      <div
        style={{
          marginTop: "3.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
          gap: "1.5rem",
        }}
      >
        {EXAMPLES.map((ex, i) => (
          <Reveal key={ex.title} delay={(i % 2) * 0.08}>
            <article className="card lift" style={{ height: "100%", padding: "1.75rem" }}>
              <div
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 42,
                  height: 42,
                  borderRadius: 11,
                  border: "1px solid var(--border-subtle)",
                  background: "var(--accent-soft)",
                  marginBottom: "1.25rem",
                }}
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent-text)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {ex.icon}
                </svg>
              </div>

              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                  marginBottom: "1.125rem",
                }}
              >
                {ex.title}
              </h3>

              <dl style={{ margin: 0 }}>
                {[
                  ["Déclencheur", ex.trigger],
                  ["Ce qui se passe", ex.does],
                  ["Ce que vous gardez en main", ex.human],
                ].map(([label, value], j, arr) => (
                  <div
                    key={label}
                    style={{
                      paddingBlock: "0.75rem",
                      borderTop: j === 0 ? "1px solid var(--border-subtle)" : undefined,
                      borderBottom:
                        j < arr.length - 1 ? "1px solid var(--border-subtle)" : undefined,
                    }}
                  >
                    <dt
                      style={{
                        fontSize: "0.625rem",
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--text-faint)",
                        marginBottom: "0.3125rem",
                      }}
                    >
                      {label}
                    </dt>
                    <dd style={{ margin: 0 }}>
                      <Body style={{ fontSize: "0.875rem" }}>{value}</Body>
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
