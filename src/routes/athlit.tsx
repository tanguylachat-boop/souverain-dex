import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site/Page";
import { Hero } from "@/components/site/Hero";
import { Faq, type FaqEntry } from "@/components/site/Faq";
import { CtaBand } from "@/components/site/CtaBand";
import {
  Section,
  Eyebrow,
  H2,
  Lede,
  Body,
  Card,
  Grid,
  Action,
  TrustLine,
} from "@/components/site/ui";
import {
  pageMeta,
  jsonLd,
  webPage,
  faqSchema,
  breadcrumbs,
  SITE_URL,
} from "@/lib/seo";

/**
 * Athlit.
 *
 * The product is in closed beta, so this page says so in the first line
 * rather than in a footnote. Nothing here promises a feature that is not
 * already built, and the only action offered is joining the beta, because
 * that is the only thing anyone can actually do today.
 */

const BETA_MAILTO =
  "mailto:contact@lxstudio.ch?subject=B%C3%AAta%20Athlit&body=Bonjour%2C%0A%0AJe%20souhaite%20rejoindre%20la%20b%C3%AAta%20fondateurs%20d%27Athlit.%0A%0APratique%20sportive%20%3A%0AFr%C3%A9quence%20hebdomadaire%20%3A%0AT%C3%A9l%C3%A9phone%20%28iOS%20ou%20Android%29%20%3A%0A%0AMerci.";

const SEO = {
  path: "/athlit",
  title: "Athlit — Le coach sportif IA qui s'adapte à vos données réelles",
  description:
    "Athlit est une application mobile de coaching sportif qui ajuste chaque séance aux données réelles de l'utilisateur plutôt qu'à un programme figé. Une version pour coachs permet de suivre plusieurs clients. Bêta fondateurs, 100 places.",
  keywords:
    "application coaching sportif IA, programme entraînement adaptatif, app fitness intelligence artificielle, coach sportif application Suisse, Athlit",
} as const;

const PRINCIPLES = [
  {
    title: "Le programme suit la semaine, pas l'inverse",
    body: "Une séance manquée, une nuit courte, une charge qui passe mal : le plan se réajuste à partir de ce qui s'est réellement passé, au lieu de vous demander de rattraper un retard sur une grille écrite un mois plus tôt.",
  },
  {
    title: "Vos données, pas une moyenne",
    body: "Les recommandations s'appuient sur vos propres séances enregistrées. Un programme calculé sur la moyenne d'une population ne décrit personne en particulier, et sûrement pas vous.",
  },
  {
    title: "Une décision par séance",
    body: "L'application dit quoi faire aujourd'hui, avec les charges et les répétitions. Pas un tableau de bord à interpréter avant de pouvoir commencer.",
  },
] as const;

const AUDIENCES = [
  {
    label: "Pour vous",
    title: "Application mobile",
    body: "Vous vous entraînez seul et vous voulez un programme qui tient compte de vos résultats réels. Disponible sur iOS et Android.",
  },
  {
    label: "Pour les coachs",
    title: "Suivi de plusieurs clients",
    body: "Une version destinée aux coachs, pour suivre l'ensemble de leurs clients et ajuster les programmes sans reconstruire chaque plan à la main.",
  },
] as const;

const FAQ_ENTRIES: ReadonlyArray<FaqEntry> = [
  {
    q: "Qu'est-ce qu'Athlit ?",
    a: "Athlit est une application mobile de coaching sportif éditée par LX Studio, en Suisse. Elle construit et ajuste les séances d'entraînement à partir des données réelles enregistrées par l'utilisateur, plutôt qu'à partir d'un programme fixé à l'avance. Une version distincte s'adresse aux coachs qui suivent plusieurs clients.",
  },
  {
    q: "Athlit est-elle disponible ?",
    a: "Pas encore publiquement. L'application est en bêta fermée, limitée à 100 places fondateurs. L'accès se demande par email et les places sont attribuées au fur et à mesure.",
  },
  {
    q: "Sur quels téléphones fonctionne l'application ?",
    a: "Athlit est développée pour iOS et Android à partir d'une base commune. Les participants à la bêta reçoivent les instructions d'installation correspondant à leur téléphone.",
  },
  {
    q: "Combien coûtera Athlit ?",
    a: "Le prix public n'est pas fixé. La bêta fondateurs est gratuite, et les conditions proposées aux participants à son issue leur seront communiquées avant toute facturation.",
  },
  {
    q: "Qui développe Athlit ?",
    a: "Tanguy Lachat, à travers LX Studio, à Bassecourt en Suisse. Le même studio édite Mentia et conçoit des agents IA sur mesure pour des PME suisses.",
  },
];

export const Route = createFileRoute("/athlit")({
  head: () => {
    const { meta, links } = pageMeta(SEO);
    return {
      meta,
      links,
      scripts: [
        jsonLd([
          webPage(SEO),
          faqSchema("/athlit", FAQ_ENTRIES),
          breadcrumbs([
            { name: "Accueil", path: "/" },
            { name: "Athlit", path: "/athlit" },
          ]),
          {
            "@type": "SoftwareApplication",
            "@id": `${SITE_URL}/athlit#software`,
            name: "Athlit",
            applicationCategory: "HealthApplication",
            operatingSystem: "iOS, Android",
            inLanguage: "fr-CH",
            publisher: { "@id": `${SITE_URL}/#organization` },
            description:
              "Application mobile de coaching sportif qui ajuste chaque séance aux données réelles enregistrées par l'utilisateur plutôt qu'à un programme figé. Une version destinée aux coachs permet le suivi de plusieurs clients. En bêta fermée.",
            // No offer node: the product is not on sale and no price is set.
          },
        ]),
      ],
    };
  },
  component: AthlitPage,
});

function AthlitPage() {
  return (
    <Page>
      <Hero
        compact
        eyebrow="Bêta fermée · 100 places"
        title={
          <>
            Un programme qui s'adapte
            <br />
            <span style={{ color: "var(--text-muted)" }}>
              à la semaine que vous avez eue.
            </span>
          </>
        }
        lede={
          <>
            Athlit ajuste chaque séance à partir de vos données réelles plutôt
            que d'une grille écrite un mois plus tôt. L'application est en bêta
            fermée : cent places, attribuées au fur et à mesure des demandes.
          </>
        }
        actions={
          <>
            <Action variant="primary" arrow href={BETA_MAILTO}>
              Demander une place
            </Action>
            <Action variant="ghost" href="#principes">
              Comment ça fonctionne
            </Action>
          </>
        }
        trust={
          <TrustLine
            items={["iOS et Android", "Bêta gratuite", "Développée en Suisse"]}
          />
        }
      />

      {/* ------------------------------------------------------------------ */}
      <Section id="principes" tone="base" labelledBy="principes-title">
        <div style={{ maxWidth: "44rem" }}>
          <Eyebrow>Le principe</Eyebrow>
          <H2 id="principes-title" style={{ maxWidth: "24ch" }}>
            La plupart des programmes échouent à la première semaine imprévue.
          </H2>
          <Lede>
            Un plan d'entraînement suppose une régularité que personne n'a. Dès
            qu'une séance saute, la grille se désynchronise et il faut choisir
            entre rattraper, décaler ou abandonner. C'est presque toujours la
            troisième option qui l'emporte.
          </Lede>
        </div>

        <Grid style={{ marginTop: "3.5rem" }}>
          {PRINCIPLES.map((item, i) => (
            <div key={item.title} data-reveal="up" style={{ transitionDelay: `${i * 0.08}s` }}>
              <Card>
                <span
                  aria-hidden="true"
                  className="tabular"
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    color: "var(--accent-text)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
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
                  {item.title}
                </h3>
                <Body>{item.body}</Body>
              </Card>
            </div>
          ))}
        </Grid>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section id="pour-qui" tone="raised" labelledBy="pour-qui-title">
        <Eyebrow>Deux versions</Eyebrow>
        <H2 id="pour-qui-title">Pour s'entraîner, ou pour entraîner.</H2>

        <Grid min="300px" gap="1.5rem" style={{ marginTop: "3rem" }}>
          {AUDIENCES.map((item, i) => (
            <div key={item.title} data-reveal="up" style={{ transitionDelay: `${i * 0.08}s` }}>
              <Card>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--accent-text)",
                  }}
                >
                  {item.label}
                </span>
                <h3
                  style={{
                    marginTop: "0.875rem",
                    marginBottom: "0.75rem",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {item.title}
                </h3>
                <Body>{item.body}</Body>
              </Card>
            </div>
          ))}
        </Grid>

        <p
          style={{
            marginTop: "2rem",
            fontSize: "0.8125rem",
            color: "var(--text-faint)",
            maxWidth: "38rem",
            lineHeight: 1.7,
          }}
        >
          Athlit n'est pas un dispositif médical et ne remplace pas un avis de
          santé. En cas de blessure, de pathologie ou de reprise après un arrêt
          prolongé, consultez un professionnel avant de suivre un programme.
        </p>
      </Section>

      <Faq
        entries={FAQ_ENTRIES}
        title="Ce qu'on demande sur Athlit."
        lede="L'application est en cours de construction, et ces réponses décrivent son état réel aujourd'hui."
      />

      <CtaBand
        title="Cent places, et rien à payer."
        body="La bêta fondateurs sert à corriger l'application sur de vrais entraînements. En échange d'un accès gratuit, on vous demandera de dire ce qui ne va pas, régulièrement et sans ménagement."
        primaryLabel="Demander une place"
        primaryHref={BETA_MAILTO}
        note="Réponse sous quelques jours. Les places sont attribuées dans l'ordre des demandes."
      />
    </Page>
  );
}
