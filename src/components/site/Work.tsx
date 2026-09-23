import { Section, Eyebrow, H2, Lede, Body, Dot } from "./ui";
import { Reveal } from "./Reveal";
import { BrowserFrame } from "./BrowserFrame";
import taxiElsaShot from "@/assets/work/taxi-elsa.webp";
import taxiDandreaShot from "@/assets/work/taxi-dandrea.webp";
import mentiaShot from "@/assets/work/mentia.webp";

/**
 * Selected work, as alternating full-width rows.
 *
 * A grid of small cards turns work into a catalogue and gives every project
 * the same weight. Two columns at full width let one screenshot be read at a
 * glance and leave room to say what the thing actually does, which is what a
 * prospect is weighing.
 *
 * Every row names its client, and public sites carry a link, so the claim can
 * be checked rather than taken on faith.
 */

type Project = {
  client: string;
  place: string;
  kind: string;
  headline: string;
  body: string;
  points: readonly string[];
  shot: string;
  url: string;
  href: string;
};

const PROJECTS: ReadonlyArray<Project> = [
  {
    client: "Taxi Elsa",
    place: "Canton du Jura",
    kind: "Site et réservation",
    headline: "Un site dont chaque écran mène à une course réservée.",
    body: "Une entreprise de taxi ne se choisit pas en comparant des pages. Elle se choisit en trente secondes, souvent depuis un téléphone, parfois en pleine nuit. Le site est construit autour de cette contrainte.",
    points: [
      "Réservation WhatsApp en un geste, sans formulaire",
      "Tarifs annoncés avant l'appel",
      "Une page par ville desservie, pour les recherches locales",
    ],
    shot: taxiElsaShot,
    url: "taxi-elsa.ch",
    href: "https://taxi-elsa.ch",
  },
  {
    client: "Taxi d'Andrea",
    place: "Delémont",
    kind: "Site et référencement local",
    headline: "Une seule action possible, répétée partout.",
    body: "Un chauffeur indépendant n'a pas de standard. Le site ne propose donc rien d'autre que d'appeler, avec le numéro visible à chaque hauteur de page, et une page par prestation pour être trouvé sur la bonne recherche.",
    points: [
      "Numéro visible en permanence, appel direct",
      "Transferts aéroport, transport médical et scolaire",
      "Une page par prestation",
    ],
    shot: taxiDandreaShot,
    url: "taxi-dandrea.vercel.app",
    href: "https://taxi-dandrea.vercel.app",
  },
  {
    client: "Mentia",
    place: "Produit édité par LX Studio",
    kind: "Logiciel en abonnement",
    headline: "Savoir ce que les assistants IA disent de vous.",
    body: "Mentia pose aux cinq assistants les questions que posent vos clients, relève qui est cité à votre place, et publie sur votre site les réponses qui manquaient. La mesure est refaite tous les mois.",
    points: [
      "ChatGPT, Claude, Perplexity, Gemini et Grok",
      "Scan gratuit, sans compte ni carte bancaire",
      "155 entreprises suisses déjà mesurées",
    ],
    shot: mentiaShot,
    url: "mentia.ch",
    href: "https://mentia.ch",
  },
];

function Row({ project, flipped }: { project: Project; flipped: boolean }) {
  return (
    <div className={flipped ? "work-row work-row-flipped" : "work-row"}>
      <Reveal direction={flipped ? "right" : "left"}>
        <BrowserFrame
          src={project.shot}
          alt={`Page d'accueil de ${project.client}, réalisée par LX Studio`}
          url={project.url}
          width={1200}
          height={750}
        />
      </Reveal>

      <Reveal direction={flipped ? "left" : "right"} delay={0.08}>
        <div>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent-text)",
            }}
          >
            {project.kind}
            <span aria-hidden="true" style={{ color: "var(--text-faint)" }}>
              ·
            </span>
            <span style={{ color: "var(--text-faint)", letterSpacing: "0.1em" }}>
              {project.place}
            </span>
          </p>

          <h3
            style={{
              marginTop: "1rem",
              fontSize: "clamp(1.5rem, 2.6vw, 2.125rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "var(--text-primary)",
              maxWidth: "20ch",
            }}
          >
            {project.headline}
          </h3>

          <Body style={{ marginTop: "1.125rem", maxWidth: "34rem" }}>{project.body}</Body>

          <ul
            style={{
              marginTop: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.625rem",
              listStyle: "none",
              padding: 0,
            }}
          >
            {project.points.map((p) => (
              <li
                key={p}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.625rem",
                  fontSize: "0.9375rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.55,
                }}
              >
                <span style={{ marginTop: "0.5rem" }}>
                  <Dot />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary pressable"
            style={{ marginTop: "1.75rem" }}
          >
            Ouvrir {project.url}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
        </div>
      </Reveal>
    </div>
  );
}

export function Work() {
  return (
    <Section id="realisations" tone="base" labelledBy="realisations-title">
      <div style={{ maxWidth: "44rem" }}>
        <Eyebrow>Réalisations</Eyebrow>
        <H2 id="realisations-title" style={{ maxWidth: "20ch" }}>
          Trois projets, ouvrables maintenant.
        </H2>
        <Lede>
          Pas de maquettes ni de concepts. Trois adresses en service, que vous
          pouvez ouvrir dans l'onglet d'à côté pendant que vous lisez.
        </Lede>
      </div>

      <div
        style={{
          marginTop: "4.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "6rem",
        }}
      >
        {PROJECTS.map((project, i) => (
          <Row key={project.client} project={project} flipped={i % 2 === 1} />
        ))}
      </div>
    </Section>
  );
}
