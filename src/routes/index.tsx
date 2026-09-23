import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/site/Page";
import { Hero } from "@/components/site/Hero";
import { Faq, type FaqEntry } from "@/components/site/Faq";
import { CtaBand } from "@/components/site/CtaBand";
import { Work } from "@/components/site/Work";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { Numbers } from "@/components/site/Numbers";
import { Reveal } from "@/components/site/Reveal";
import { BrowserFrame } from "@/components/site/BrowserFrame";
import taxiElsaShot from "@/assets/work/taxi-elsa.webp";
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
  Dot,
} from "@/components/site/ui";
import tanguyPhoto from "@/assets/tanguy.webp";
import {
  pageMeta,
  jsonLd,
  webPage,
  faqSchema,
  breadcrumbs,
  SITE_URL,
} from "@/lib/seo";

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

const SEO = {
  path: "/",
  title: "LX Studio — Agents IA et automatisation sur mesure pour PME suisses",
  description:
    "LX Studio construit les sites et les logiciels qui font tourner les PME suisses : un site qui remplit votre agenda, une automatisation qui vide votre administratif. Quatre entreprises tournent déjà dessus. Basé à Bassecourt, dans le Jura.",
  keywords:
    "agence IA Suisse, agent IA sur mesure, automatisation PME suisse, consultant intelligence artificielle Suisse romande, développement IA Jura, LX Studio, Tanguy Lachat",
} as const;

/**
 * Why AI projects stall in a small company. Written as observations rather
 * than as a pitch, because the reader recognises the situation before he
 * accepts a diagnosis of it.
 */
const BLOCKERS = [
  {
    title: "L'atelier n'a rien changé",
    body: "Une journée de formation, une liste de cas d'usage, un compte rendu. Six mois plus tard, le même travail se fait toujours à la main. Rien n'a été installé.",
  },
  {
    title: "L'outil générique ne connaît pas votre métier",
    body: "Un abonnement à un assistant grand public ne sait rien de vos clients, de vos conventions de nommage ni de vos échéances. Il répond bien à des questions générales et mal aux vôtres.",
  },
  {
    title: "Personne n'assume les données",
    body: "Dès qu'un dossier client sort du pays, la question devient juridique. Beaucoup de projets s'arrêtent exactement là, parce que personne n'a voulu la traiter au départ.",
  },
] as const;

const METHOD = [
  {
    step: "01",
    title: "On regarde le travail réel",
    body: "Une demi-journée sur place ou en visio, à suivre une tâche du début à la fin. On chronomètre, on compte les allers-retours. C'est ce chiffre qui décide de la suite, pas une intuition.",
  },
  {
    step: "02",
    title: "Un prototype qui tourne",
    body: "En deux à trois semaines, une première version traite vos vrais documents, dans votre vrai environnement. Vous la jugez sur son résultat, pas sur une démonstration préparée.",
  },
  {
    step: "03",
    title: "Mise en production et transfert",
    body: "Installation, formation de l'équipe, documentation. Le code vous appartient. Rien ne vous oblige à rester, ce qui est la seule raison valable de rester.",
  },
] as const;

/**
 * The offer pages. These cards are the main internal link path to them, so
 * each one states what the thing is before it states what it costs.
 */
const OFFERS = [
  {
    to: "/fiduciaire",
    eyebrow: "Sur mesure",
    title: "Agent fiduciaire souverain",
    body: "Un agent installé sur du matériel dédié dans votre cabinet. Il capte, extrait, classe et renomme les pièces comptables, et relance vos clients. Aucune donnée ne sort de vos murs.",
    meta: "Pour les fiduciaires et les métiers sous secret professionnel",
  },
  {
    to: "/mentia",
    eyebrow: "Produit en ligne",
    title: "Mentia",
    body: "Mesure ce que ChatGPT, Claude, Perplexity, Gemini et Grok répondent quand vos clients cherchent votre métier, nomme les concurrents cités à votre place, et publie les réponses qui manquent sur votre site.",
    meta: "99 CHF par mois et par site · scan gratuit sans inscription",
  },
  {
    to: "/athlit",
    eyebrow: "Produit en ligne",
    title: "Athlit",
    body: "Un coach sportif qui adapte chaque séance aux données réelles de l'utilisateur plutôt qu'à un programme figé. Application mobile, et une version destinée aux coachs pour suivre leurs clients.",
    meta: "Application iOS et Android · bêta fondateurs",
  },
] as const;

const FAQ_ENTRIES: ReadonlyArray<FaqEntry> = [
  {
    q: "Que fait exactement LX Studio ?",
    a: "LX Studio est un studio suisse de conseil et de développement en intelligence artificielle, basé à Bassecourt dans le Jura. Il conçoit et installe des agents IA et des automatisations sur mesure pour des PME : traitement automatique de documents, relances clients, suivi de dossiers. Le studio édite également deux produits en ligne, Mentia et Athlit.",
  },
  {
    q: "Combien coûte un projet d'automatisation IA pour une PME suisse ?",
    a: "Il n'y a pas de tarif unique. Chaque projet est chiffré sur son périmètre réel : nombre d'heures estimées, complexité de l'intégration, volume traité. Le diagnostic initial, qui produit le chiffre de temps perdu sur lequel tout repose, se fait en une demi-journée. Les produits en ligne, eux, ont un prix fixe : Mentia est à 99 CHF par mois et par site.",
  },
  {
    q: "Mes données partent-elles à l'étranger ?",
    a: "Cela dépend du projet et c'est décidé au départ, pas à la fin. Pour les métiers soumis au secret professionnel, LX Studio installe l'agent sur du matériel dédié dans les locaux du client : aucune donnée ne quitte le réseau local. Pour les autres projets, l'hébergement et les modèles utilisés sont documentés avant la signature.",
  },
  {
    q: "En combien de temps voit-on un résultat ?",
    a: "Un prototype qui traite de vrais documents dans le vrai environnement du client est livré en deux à trois semaines après le diagnostic. Ce prototype sert de décision : s'il ne tient pas ses promesses sur les données réelles, le projet s'arrête là.",
  },
  {
    q: "LX Studio travaille-t-il en dehors de la Suisse romande ?",
    a: "Le studio est basé dans le Jura et intervient sur place dans toute la Suisse romande, ainsi qu'à Berne. Les projets qui ne nécessitent pas d'installation physique se conduisent à distance, sans limite géographique.",
  },
  {
    q: "Qui écrit le code ?",
    a: "Tanguy Lachat, fondateur de LX Studio. Les projets sont conduits et développés par lui, sans sous-traitance à l'étranger. Le code livré appartient au client.",
  },
];

/* -------------------------------------------------------------------------- */
/* Route                                                                      */
/* -------------------------------------------------------------------------- */

export const Route = createFileRoute("/")({
  head: () => {
    const { meta, links } = pageMeta(SEO);
    return {
      meta,
      links,
      scripts: [
        jsonLd([
          webPage(SEO),
          faqSchema("/", FAQ_ENTRIES),
          breadcrumbs([{ name: "Accueil", path: "/" }]),
          {
            "@type": "Service",
            "@id": `${SITE_URL}/#service-conseil`,
            name: "Conseil et développement en intelligence artificielle",
            serviceType: "Automatisation de processus métier par agents IA",
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: { "@type": "Country", name: "Switzerland" },
            description:
              "Diagnostic du travail réel, prototype sur données réelles en deux à trois semaines, puis mise en production et transfert du code au client.",
          },
        ]),
      ],
    };
  },
  component: HomePage,
});

function HomePage() {
  return (
    <Page>
      <Hero
        eyebrow="Studio IA suisse"
        title={
          <>
            Plus de clients.
            <br />
            <span style={{ color: "var(--text-muted)" }}>Moins de travail manuel.</span>
          </>
        }
        lede={
          <>
            Je construis les sites et les logiciels qui font tourner les PME
            suisses : un site qui remplit votre agenda, une automatisation qui
            vide votre administratif. Quatre entreprises tournent déjà dessus.
          </>
        }
        visual={
          <BrowserFrame
            src={taxiElsaShot}
            alt="Site de réservation Taxi Elsa, réalisé par LX Studio"
            url="taxi-elsa.ch"
            width={1200}
            height={750}
            parallax={26}
            priority
          />
        }
        actions={
          <>
            <Action variant="primary" arrow href="https://cal.com/lx-studio/15min">
              Réserver 15 minutes
            </Action>
            <Action variant="ghost" href="#offres">
              Voir ce que je construis
            </Action>
          </>
        }
        trust={
          <TrustLine
            items={[
              "Basé à Bassecourt, Jura",
              "Développement sans sous-traitance",
              "Le code vous appartient",
            ]}
          />
        }
      />

      {/* Trust first, in the order a visitor grants it: who already works
          with him, then the figures, then the work itself. Argument comes
          after, because nobody weighs a diagnosis from a stranger. */}
      <LogoMarquee />
      <Numbers />
      <Work />

      {/* ------------------------------------------------------------------ */}
      <Section id="constat" tone="raised" labelledBy="constat-title">
        <Eyebrow>Le constat</Eyebrow>
        <H2 id="constat-title">
          Trois raisons pour lesquelles l'IA n'a encore rien changé chez vous.
        </H2>
        <Lede>
          Ce ne sont pas des hypothèses. Ce sont les trois situations que je
          retrouve dans presque chaque entreprise qui m'appelle après une
          première tentative.
        </Lede>

        <Grid style={{ marginTop: "3.5rem" }}>
          {BLOCKERS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
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
            </Reveal>
          ))}
        </Grid>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section id="methode" tone="base" labelledBy="methode-title">
        <Eyebrow>La méthode</Eyebrow>
        <H2 id="methode-title">Trois étapes, et une porte de sortie à chacune.</H2>
        <Lede>
          Un projet d'automatisation se juge sur un chiffre mesuré au début et
          revérifié à la fin. Tout le reste est de la conversation.
        </Lede>

        <Grid min="240px" gap="2rem" style={{ marginTop: "3.5rem" }}>
          {METHOD.map((item, i) => (
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
      <Section id="offres" tone="raised" labelledBy="offres-title">
        <Eyebrow>Ce que je construis</Eyebrow>
        <H2 id="offres-title">Un service sur mesure, deux produits en ligne.</H2>
        <Lede>
          Les produits ne sont pas des démonstrations. Ils tournent, ils ont des
          utilisateurs, et ils sont la meilleure preuve de ce que je sais livrer.
        </Lede>

        <Grid min="300px" style={{ marginTop: "3.5rem" }}>
          {OFFERS.map((offer, i) => (
            <Reveal key={offer.to} delay={i * 0.08}>
              <Link
                to={offer.to}
                className="card lift"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  padding: "1.75rem",
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--accent-text)",
                  }}
                >
                  {offer.eyebrow}
                </span>
                <h3
                  style={{
                    marginTop: "0.875rem",
                    fontSize: "1.375rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {offer.title}
                </h3>
                <p
                  style={{
                    marginTop: "0.75rem",
                    fontSize: "0.9375rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    flex: 1,
                  }}
                >
                  {offer.body}
                </p>
                <span
                  style={{
                    marginTop: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.75rem",
                    color: "var(--text-faint)",
                  }}
                >
                  <Dot />
                  {offer.meta}
                </span>
                <span
                  style={{
                    marginTop: "1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  En savoir plus
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </Grid>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* ------------------------------------------------------------------ */}
      <Section id="fondateur" tone="deep" labelledBy="fondateur-title">
        <div
          className="grid lg:grid-cols-[auto_1fr]"
          style={{ gap: "3rem", alignItems: "start" }}
        >
          <img
            src={tanguyPhoto}
            alt="Tanguy Lachat, fondateur de LX Studio"
            width={140}
            height={140}
            loading="lazy"
            decoding="async"
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "center 15%",
              border: "1px solid var(--border-strong)",
            }}
          />
          <div>
            <Eyebrow>Qui construit</Eyebrow>
            <H2 id="fondateur-title" style={{ maxWidth: "24ch" }}>
              Tanguy Lachat, 24 ans, basé dans le Jura.
            </H2>
            <Lede>
              Je construis des systèmes d'automatisation pour des entreprises qui
              n'ont pas de service informatique et qui ne veulent pas en créer un.
              J'ai commencé par les métiers réglementés, là où la confidentialité
              n'est pas négociable, parce que c'est le cas le plus exigeant et
              que le reste en découle.
            </Lede>
            <Body style={{ marginTop: "1.25rem", maxWidth: "38rem" }}>
              En parallèle des mandats, j'édite mes propres produits. C'est la
              seule manière honnête de savoir ce qu'un logiciel coûte vraiment à
              maintenir, et cela évite de vendre aux autres ce que je n'utilise
              pas moi-même.
            </Body>

            <div style={{ marginTop: "2rem" }}>
              <TrustLine
                items={[
                  "Intervention sur place en Suisse romande",
                  "Un seul interlocuteur du début à la fin",
                  "Aucune sous-traitance",
                ]}
              />
            </div>

            <blockquote
              style={{
                marginTop: "2.5rem",
                paddingLeft: "1.25rem",
                borderLeft: "2px solid var(--accent)",
                maxWidth: "34rem",
              }}
            >
              <p
                style={{
                  fontSize: "1.0625rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                Une entreprise ne devrait pas avoir à choisir entre automatiser
                son travail et garder le contrôle de ses données. Quand ce choix
                se présente, c'est que le projet a été mal posé au départ.
              </p>
            </blockquote>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Faq
        entries={FAQ_ENTRIES}
        title="Ce qu'on me demande avant de travailler ensemble."
        lede="Les réponses sont données telles qu'elles seraient données au téléphone, avec les limites incluses."
      />

      <CtaBand
        title="Commencez par le chiffre, pas par l'outil."
        body="Quinze minutes suffisent pour savoir si une tâche de votre entreprise mérite d'être automatisée. On prend une tâche précise, on estime le temps qu'elle coûte par mois, et je vous dis franchement si le jeu en vaut la chandelle."
        primaryLabel="Réserver 15 minutes"
        primaryHref="https://cal.com/lx-studio/15min"
        secondary={
          <Action variant="secondary" href="mailto:contact@lxstudio.ch">
            Écrire un message
          </Action>
        }
        note="Sans engagement. Si l'automatisation n'a pas de sens dans votre cas, je vous le dirai pendant l'appel."
      />
    </Page>
  );
}
