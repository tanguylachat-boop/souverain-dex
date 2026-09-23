import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/site/Page";
import { Hero } from "@/components/site/Hero";
import { CtaBand } from "@/components/site/CtaBand";
import { Section, Action } from "@/components/site/ui";
import { Reveal } from "@/components/site/Reveal";
import { ARTICLES_BY_DATE } from "@/content/articles";
import {
  pageMeta,
  jsonLd,
  webPage,
  breadcrumbs,
  SITE_URL,
} from "@/lib/seo";

const SEO = {
  path: "/blog",
  title: "Le journal — notes sur l'IA appliquée aux PME suisses",
  description:
    "Notes de terrain sur l'intelligence artificielle en entreprise : mesurer ce qu'une tâche coûte, décider où vivent vos données, et comprendre pourquoi les assistants citent un concurrent plutôt que vous.",
  keywords:
    "blog IA entreprise suisse, automatisation processus PME, souveraineté des données IA, visibilité assistants IA, conseil intelligence artificielle",
} as const;

const dateFormat = new Intl.DateTimeFormat("fr-CH", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const Route = createFileRoute("/blog/")({
  head: () => {
    const { meta, links } = pageMeta(SEO);
    return {
      meta,
      links,
      scripts: [
        jsonLd([
          webPage(SEO),
          breadcrumbs([
            { name: "Accueil", path: "/" },
            { name: "Le journal", path: "/blog" },
          ]),
          {
            "@type": "Blog",
            "@id": `${SITE_URL}/blog#blog`,
            name: "Le journal de LX Studio",
            inLanguage: "fr-CH",
            publisher: { "@id": `${SITE_URL}/#organization` },
            blogPost: ARTICLES_BY_DATE.map((a) => ({
              "@type": "BlogPosting",
              "@id": `${SITE_URL}/blog/${a.slug}#article`,
              headline: a.title,
              description: a.summary,
              datePublished: a.published,
              url: `${SITE_URL}/blog/${a.slug}`,
              author: { "@id": `${SITE_URL}/#founder` },
            })),
          },
        ]),
      ],
    };
  },
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <Page>
      <Hero
        compact
        eyebrow="Le journal"
        title={
          <>
            Ce que j'apprends
            <br />
            <span className="gradient-text">en le faisant.</span>
          </>
        }
        lede={
          <>
            Des notes de terrain, pas des tribunes. Chaque article répond à une
            question qu'on me pose réellement, et donne la méthode plutôt que
            la conclusion.
          </>
        }
      />

      <Section tone="base">
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {ARTICLES_BY_DATE.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.07}>
              <Link
                to="/blog/$slug"
                params={{ slug: article.slug }}
                className="card lift"
                style={{
                  display: "block",
                  padding: "2rem",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    flexWrap: "wrap",
                    fontSize: "0.75rem",
                    color: "var(--text-faint)",
                  }}
                >
                  <span
                    style={{
                      padding: "0.1875rem 0.625rem",
                      borderRadius: 999,
                      border: "1px solid var(--border-subtle)",
                      color: "var(--accent-text)",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      fontSize: "0.625rem",
                    }}
                  >
                    {article.tag}
                  </span>
                  <time dateTime={article.published}>
                    {dateFormat.format(new Date(article.published))}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>{article.readingMinutes} min de lecture</span>
                </div>

                <h2
                  style={{
                    marginTop: "1rem",
                    fontSize: "clamp(1.375rem, 2.4vw, 1.875rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.2,
                    color: "var(--text-primary)",
                    maxWidth: "28ch",
                  }}
                >
                  {article.title}
                </h2>

                <p
                  style={{
                    marginTop: "0.875rem",
                    fontSize: "0.9375rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    maxWidth: "48rem",
                  }}
                >
                  {article.summary}
                </p>

                <span
                  style={{
                    marginTop: "1.5rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    minHeight: 44,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  Lire l'article
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
        </div>
      </Section>

      <CtaBand
        title="Une question qui n'a pas sa réponse ici ?"
        body="Les articles viennent des questions qu'on me pose. Si la vôtre manque, écrivez-la moi : elle finira probablement en article, et vous aurez la réponse avant tout le monde."
        primaryLabel="Réserver 15 minutes"
        primaryHref="https://cal.com/lx-studio/15min"
        secondary={
          <Action variant="secondary" href="mailto:contact@lxstudio.ch">
            contact@lxstudio.ch
          </Action>
        }
      />
    </Page>
  );
}
