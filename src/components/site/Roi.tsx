import { Section, Eyebrow, H2, Lede } from "./ui";
import { Reveal } from "./Reveal";

/**
 * The return calculation, shown as it is actually done.
 *
 * Every figure here is a worked example, and the page says so twice: once in
 * the label above the block and once under it. Presenting an illustration as
 * a measured result would be the easiest lie on the whole site, and the one
 * a prospect would discover fastest.
 *
 * The bars compare hours before and after on the same scale, so the gap is
 * read rather than calculated.
 */

const BEFORE_HOURS = 15;
const AFTER_HOURS = 3;
const HOURLY = 55;
const WEEKS = 4.3;

const monthlyBefore = Math.round(BEFORE_HOURS * HOURLY * WEEKS);
const monthlyAfter = Math.round(AFTER_HOURS * HOURLY * WEEKS);
const saved = monthlyBefore - monthlyAfter;

function Bar({
  label,
  hours,
  amount,
  ratio,
  tone,
}: {
  label: string;
  hours: number;
  amount: number;
  ratio: number;
  tone: "before" | "after";
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "0.625rem",
        }}
      >
        <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
          {label}
        </span>
        <span
          className="tabular"
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          {hours} h / semaine
        </span>
      </div>

      <div
        style={{
          height: 12,
          borderRadius: 999,
          background: "rgba(255,255,255,0.05)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${ratio * 100}%`,
            height: "100%",
            borderRadius: 999,
            background:
              tone === "before"
                ? "linear-gradient(90deg, rgba(255,255,255,0.28), rgba(255,255,255,0.14))"
                : "linear-gradient(90deg, var(--accent), #6fa0e0)",
            // Grows with the reveal rather than appearing at full length.
            transition: "width 1.1s var(--ease-out) 0.15s",
          }}
        />
      </div>

      <p
        className="tabular"
        style={{
          marginTop: "0.5rem",
          fontSize: "0.8125rem",
          color: "var(--text-faint)",
        }}
      >
        {amount.toLocaleString("fr-CH").replace(/ |\s/g, "'")} CHF par mois
      </p>
    </div>
  );
}

export function Roi() {
  return (
    <Section id="roi" tone="raised" labelledBy="roi-title">
      <div className="roi-split">
        <div>
          <Eyebrow>Le calcul du retour</Eyebrow>
          <H2 id="roi-title" style={{ maxWidth: "18ch" }}>
            Un chiffre décide, pas une intuition.
          </H2>
          <Lede>
            L'audit produit une seule donnée : le temps que coûte réellement une
            tâche. Elle se convertit en francs, et ce montant se compare au coût
            de l'automatisation. Si le rapport ne tient pas, le projet s'arrête
            et vous le savez en 48 heures.
          </Lede>

          <ul
            style={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              listStyle: "none",
              padding: 0,
              fontSize: "0.9375rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}
          >
            <li>Le temps est chronométré, pas estimé de mémoire.</li>
            <li>Le taux horaire est le vôtre, charges comprises.</li>
            <li>La même tâche est remesurée après la mise en service.</li>
          </ul>
        </div>

        <Reveal direction="scale">
          <figure
            className="card"
            style={{ margin: 0, padding: "1.75rem" }}
            aria-label="Exemple chiffré de calcul du retour sur investissement"
          >
            <figcaption
              style={{
                fontSize: "0.625rem",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--warning)",
                marginBottom: "1.5rem",
              }}
            >
              Exemple illustratif, pas un résultat mesuré
            </figcaption>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              <Bar
                label="Saisie et classement, aujourd'hui"
                hours={BEFORE_HOURS}
                amount={monthlyBefore}
                ratio={1}
                tone="before"
              />
              <Bar
                label="Après automatisation, contrôle inclus"
                hours={AFTER_HOURS}
                amount={monthlyAfter}
                ratio={AFTER_HOURS / BEFORE_HOURS}
                tone="after"
              />
            </div>

            <div
              style={{
                marginTop: "1.75rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--border-subtle)",
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                Écart mensuel
              </span>
              <span
                className="tabular"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.035em",
                  color: "var(--text-primary)",
                }}
              >
                {saved.toLocaleString("fr-CH").replace(/ |\s/g, "'")} CHF
              </span>
            </div>

            <p
              style={{
                marginTop: "1rem",
                fontSize: "0.75rem",
                color: "var(--text-faint)",
                lineHeight: 1.6,
              }}
            >
              Base retenue pour cet exemple : {HOURLY} CHF de l'heure,{" "}
              {WEEKS.toString().replace(".", ",")} semaines par mois. Vos
              chiffres remplacent ceux-ci pendant l'audit.
            </p>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
