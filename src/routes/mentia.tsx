import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site/Page";
import { Reveal } from "@/components/site/Reveal";
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
  StatBand,
  StatTile,
} from "@/components/site/ui";
import {
  pageMeta,
  jsonLd,
  webPage,
  faqSchema,
  breadcrumbs,
  SITE_URL,
} from "@/lib/seo";

const MENTIA_URL = "https://mentia.ch";

const SEO = {
  path: "/mentia",
  title: "Mentia — Savoir si ChatGPT recommande votre entreprise",
  description:
    "Mentia mesure ce que ChatGPT, Claude, Perplexity, Gemini et Grok répondent quand vos clients cherchent votre métier, nomme les concurrents cités à votre place et publie les réponses qui manquent sur votre site. Scan gratuit, 99 CHF par mois et par site.",
  keywords:
    "visibilité ChatGPT entreprise, être cité par une IA, GEO référencement IA, AI search optimization Suisse, Perplexity Gemini Claude citation marque, Mentia",
} as const;

const ASSISTANTS = ["ChatGPT", "Claude", "Perplexity", "Gemini", "Grok"] as const;

/**
 * How the product works, in the order a user experiences it. Each step names
 * the thing that happens, not the technology that makes it happen.
 */
const STEPS = [
  {
    step: "01",
    title: "On pose vos questions aux cinq",
    body: "Mentia formule les questions que vos clients posent réellement pour trouver un prestataire comme vous, dans votre région, puis les pose aux cinq assistants et à Google.",
  },
  {
    step: "02",
    title: "On relève qui sort à votre place",
    body: "Pour chaque réponse, Mentia note si vous êtes cité, à quelle position, et quels concurrents sont nommés. Les réponses sont conservées mot pour mot : vous lisez ce qu'entend votre client.",
  },
  {
    step: "03",
    title: "On écrit les réponses qui manquent",
    body: "Un assistant ne classe pas des sites, il cherche une réponse écrite noir sur blanc et attribuable. Mentia publie ces réponses sur votre site, et vous validez chaque article avant qu'il parte.",
  },
  {
    step: "04",
    title: "On remesure tous les mois",
    body: "La même question, reposée au même endroit, pour voir si le chiffre bouge. Sans cette remesure, personne ne peut dire si quoi que ce soit a servi.",
  },
] as const;

const STATS = [
  { value: "155", label: "entreprises suisses déjà mesurées" },
  { value: "68", label: "secteurs d'activité dans le baromètre public" },
  { value: "5", label: "assistants interrogés, plus Google" },
  { value: "99", label: "CHF par mois et par site" },
] as const;

/**
 * What the product does not do.
 *
 * Stated plainly and early, because the promise it refuses to make is the
 * one every competitor makes, and refusing it is the reason to be believed
 * about the rest.
 */
const LIMITS = [
  {
    title: "Aucune garantie d'être cité",
    body: "Personne ne contrôle ce que répond un modèle, et quiconque vous garantit une citation vous vend quelque chose qu'il ne possède pas. Mentia garantit la mesure, pas le résultat.",
  },
  {
    title: "Aucune campagne publicitaire",
    body: "Mentia ne place pas d'annonces et n'achète pas de trafic. Le seul levier utilisé est le contenu publié sur votre propre site.",
  },
  {
    title: "Aucune refonte de site",
    body: "Votre site reste le vôtre, tel qu'il est. Mentia y ajoute des pages qui répondent à des questions précises, et signale les défauts techniques sans y toucher.",
  },
] as const;

const FAQ_ENTRIES: ReadonlyArray<FaqEntry> = [
  {
    q: "Qu'est-ce que Mentia ?",
    a: "Mentia est un outil suisse qui mesure si une entreprise est citée par les assistants IA. Il pose à ChatGPT, Claude, Perplexity, Gemini et Grok les questions que les clients de cette entreprise posent réellement, relève qui est nommé dans chaque réponse, puis publie sur le site de l'entreprise les réponses qui manquaient. Il est édité par LX Studio, à Bassecourt en Suisse.",
  },
  {
    q: "Le scan est-il vraiment gratuit ?",
    a: "Oui. Le scan se lance sur mentia.ch sans compte, sans carte bancaire et sans inscription : il suffit d'un nom de domaine. Le résultat affiche le score sur 100, les concurrents cités à la place de l'entreprise et la réponse mot pour mot de chaque assistant.",
  },
  {
    q: "Combien coûte Mentia ?",
    a: "99 CHF par mois et par site, avec sept jours d'essai sans carte bancaire. Ce prix couvre la mesure mensuelle sur les cinq assistants et la publication des articles, que le client valide un par un avant parution.",
  },
  {
    q: "Pourquoi mon concurrent est-il cité et pas moi ?",
    a: "Dans la très grande majorité des cas, ce n'est pas une question de qualité de travail, de taille ni d'ancienneté. Un assistant doit répondre en quelques lignes et cite ce qu'il a pu lire, écrit noir sur blanc et attribuable à quelqu'un, sur la question exacte qu'on lui pose. Un site qui présente une entreprise ne répond à aucune question. Un site qui répond aux questions devient la source.",
  },
  {
    q: "Mentia fonctionne-t-il pour tous les secteurs ?",
    a: "Mentia fonctionne pour toute entreprise disposant d'un site et de concurrents identifiables, quel que soit le secteur. Le baromètre public couvre aujourd'hui 68 métiers. Il est en revanche peu utile aux entreprises sans site, et aux structures disposant déjà d'une équipe marketing interne qui fait ce travail.",
  },
  {
    q: "Combien de temps avant de voir un changement ?",
    a: "Les assistants réindexent le web à des rythmes qui leur sont propres et que personne ne maîtrise de l'extérieur. Les premiers mouvements se constatent généralement sur plusieurs semaines, jamais en quelques jours. C'est précisément pour cela que la mesure est mensuelle et conservée : c'est la comparaison entre deux relevés qui dit quelque chose, pas un relevé isolé.",
  },
];

export const Route = createFileRoute("/mentia")({
  head: () => {
    const { meta, links } = pageMeta(SEO);
    return {
      meta,
      links,
      scripts: [
        jsonLd([
          webPage(SEO),
          faqSchema("/mentia", FAQ_ENTRIES),
          breadcrumbs([
            { name: "Accueil", path: "/" },
            { name: "Mentia", path: "/mentia" },
          ]),
          {
            "@type": "SoftwareApplication",
            "@id": `${SITE_URL}/mentia#software`,
            name: "Mentia",
            url: MENTIA_URL,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            inLanguage: "fr-CH",
            publisher: { "@id": `${SITE_URL}/#organization` },
            description:
              "Mentia mesure ce que ChatGPT, Claude, Perplexity, Gemini et Grok répondent quand les clients d'une entreprise cherchent son métier, nomme les concurrents cités à sa place, et publie sur son site les réponses qui manquent. La mesure est répétée chaque mois.",
            offers: {
              "@type": "Offer",
              price: "99",
              priceCurrency: "CHF",
              url: MENTIA_URL,
              availability: "https://schema.org/InStock",
              seller: { "@id": `${SITE_URL}/#organization` },
              eligibleDuration: {
                "@type": "QuantitativeValue",
                value: 1,
                unitCode: "MON",
              },
            },
          },
        ]),
      ],
    };
  },
  component: MentiaPage,
});

function MentiaPage() {
  return (
    <Page>
      <Hero
        eyebrow="Produit en ligne"
        title={
          <>
            <span style={{ color: "var(--text-muted)" }}>Soyez l'entreprise</span>
            <br />
            que ChatGPT recommande.
          </>
        }
        lede={
          <>
            Vos clients ne tapent plus dans Google, ils demandent à un
            assistant. Mentia mesure ce que les cinq assistants répondent quand
            on cherche votre métier, nomme ceux qui sortent à votre place, et
            publie les réponses qui manquent sur votre site.
          </>
        }
        actions={
          <>
            <Action variant="primary" arrow href={MENTIA_URL}>
              Lancer un scan gratuit
            </Action>
            <Action variant="ghost" href={`${MENTIA_URL}/classement-ia`}>
              Voir le baromètre public
            </Action>
          </>
        }
        trust={
          <TrustLine
            items={[
              "Sans inscription ni carte bancaire",
              "99 CHF par mois et par site",
              "Sept jours d'essai",
            ]}
          />
        }
      />

      {/* ------------------------------------------------------------------ */}
      <Section id="probleme" tone="base" labelledBy="probleme-title">
        <div style={{ maxWidth: "44rem" }}>
          <Eyebrow>Le problème</Eyebrow>
          <H2 id="probleme-title" style={{ maxWidth: "24ch" }}>
            Le client que vous perdez ne laisse aucune trace.
          </H2>
          <Lede>
            Quelqu'un dans votre région a exactement le besoin que vous savez
            traiter. Il demande à ChatGPT, obtient trois noms, appelle le
            premier. Il n'a pas visité votre site, pas rempli de formulaire,
            pas raccroché au téléphone.
          </Lede>
          <Body style={{ marginTop: "1.25rem", maxWidth: "38rem" }}>
            Vos statistiques ne bougeront pas. C'est ce qui rend cette perte
            particulière : vous pouvez compter les clients que vous avez,
            jamais ceux qui ne sont jamais arrivés. La seule façon de la voir
            est d'aller poser la question à leur place.
          </Body>
        </div>

        <Reveal style={{ marginTop: "3rem" }}>
          <p
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text-faint)",
              marginBottom: "1rem",
            }}
          >
            Assistants interrogés à chaque mesure
          </p>
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {ASSISTANTS.map((name) => (
              <li
                key={name}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: 999,
                  border: "1px solid var(--border-subtle)",
                  background: "var(--surface-raised)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                }}
              >
                {name}
              </li>
            ))}
            <li
              style={{
                padding: "0.5rem 1rem",
                borderRadius: 999,
                border: "1px dashed var(--border-subtle)",
                fontSize: "0.875rem",
                color: "var(--text-faint)",
              }}
            >
              et Google
            </li>
          </ul>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section id="fonctionnement" tone="raised" labelledBy="fonctionnement-title">
        <Eyebrow>Comment ça marche</Eyebrow>
        <H2 id="fonctionnement-title">Mesurer, comprendre, écrire, remesurer.</H2>
        <Lede>
          Le cycle est mensuel et il ne change pas. C'est la répétition qui
          produit le chiffre, pas la première mesure.
        </Lede>

        <Grid min="240px" gap="2rem" style={{ marginTop: "3.5rem" }}>
          {STEPS.map((item, i) => (
            <Reveal key={item.step} delay={i * 0.08}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1.25rem",
                }}
              >
                <span
                  className="tabular"
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 300,
                    color: "var(--accent-text)",
                    minWidth: "2.25rem",
                  }}
                >
                  {item.step}
                </span>
                <span
                  aria-hidden="true"
                  style={{ flex: 1, height: 1, background: "var(--border-subtle)" }}
                />
              </div>
              <h3
                style={{
                  fontSize: "1.0625rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "0.625rem",
                }}
              >
                {item.title}
              </h3>
              <Body>{item.body}</Body>
            </Reveal>
          ))}
        </Grid>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section id="chiffres" tone="base" labelledBy="chiffres-title">
        <div style={{ maxWidth: "42rem" }}>
          <Eyebrow>Le baromètre</Eyebrow>
          <H2 id="chiffres-title">Une base que personne d'autre ne possède.</H2>
          <Lede>
            Chaque scan alimente un classement public par secteur. Il est
            consultable sans compte, y compris par vos concurrents, ce qui est
            précisément ce qui le rend crédible.
          </Lede>
        </div>

        <Reveal style={{ marginTop: "3rem" }}>
          <StatBand>
            {STATS.map((stat) => (
              <StatTile key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </StatBand>
        </Reveal>

        <p style={{ marginTop: "1.25rem", fontSize: "0.8125rem", color: "var(--text-faint)" }}>
          Consultable sur{" "}
          <a
            href={`${MENTIA_URL}/classement-ia`}
            target="_blank"
            rel="noopener noreferrer"
            className="prose-link"
          >
            mentia.ch/classement-ia
          </a>
        </p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section id="limites" tone="raised" labelledBy="limites-title">
        <div style={{ maxWidth: "44rem" }}>
          <Eyebrow>Ce que Mentia ne fait pas</Eyebrow>
          <H2 id="limites-title">Les trois promesses qu'on ne vous fera pas.</H2>
          <Lede>
            Elles sont écrites ici plutôt que découvertes après la signature.
            Si l'une d'elles est ce que vous cherchez, Mentia n'est pas le bon
            outil et autant le savoir maintenant.
          </Lede>
        </div>

        <Grid style={{ marginTop: "3.5rem" }}>
          {LIMITS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <Card>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--text-faint)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8 12h8" />
                </svg>
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
            </Reveal>
          ))}
        </Grid>
      </Section>

      <Faq
        entries={FAQ_ENTRIES}
        title="Ce qu'on demande le plus souvent sur Mentia."
        lede="Les réponses incluent les limites de l'outil, parce qu'elles font partie de ce que vous achetez."
      />

      <CtaBand
        title="Commencez par savoir où vous en êtes."
        body="Le scan prend moins d'une minute, ne demande ni compte ni carte bancaire, et vous montre la réponse exacte de chaque assistant à la question que vos clients posent. Le reste se décide après."
        primaryLabel="Lancer un scan gratuit"
        primaryHref={MENTIA_URL}
        secondary={
          <Action variant="secondary" href={`${MENTIA_URL}/classement-ia`}>
            Voir le baromètre
          </Action>
        }
        note="Mentia est un produit édité par LX Studio, à Bassecourt."
      />
    </Page>
  );
}
