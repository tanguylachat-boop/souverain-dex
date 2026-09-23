import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Page } from "@/components/site/Page";
import { CtaBand } from "@/components/site/CtaBand";
import { Section, Action } from "@/components/site/ui";
import { articleBySlug, ARTICLES_BY_DATE, type Block } from "@/content/articles";
import {
  pageMeta,
  jsonLd,
  faqSchema,
  breadcrumbs,
  SITE_URL,
} from "@/lib/seo";

const dateFormat = new Intl.DateTimeFormat("fr-CH", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * One article.
 *
 * The measure is capped near 68 characters. Longer lines make the eye lose
 * its place on the return sweep, which is felt as the text being hard rather
 * than as the line being long.
 */
function Prose({ block }: { block: Block }) {
  switch (block.kind) {
    case "h2":
      return (
        <h2
          style={{
            marginTop: "3rem",
            marginBottom: "1rem",
            fontSize: "clamp(1.375rem, 2.4vw, 1.75rem)",
            fontWeight: 600,
            letterSpacing: "-0.025em",
            lineHeight: 1.25,
            color: "var(--text-primary)",
          }}
        >
          {block.text}
        </h2>
      );

    case "p":
      return (
        <p
          style={{
            marginTop: "1.25rem",
            fontSize: "1.0625rem",
            color: "var(--text-secondary)",
            lineHeight: 1.75,
          }}
        >
          {block.text}
        </p>
      );

    case "list":
      return (
        <ul
          style={{
            marginTop: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            listStyle: "none",
            padding: 0,
          }}
        >
          {block.items.map((item) => (
            <li
              key={item}
              style={{
                display: "flex",
                gap: "0.75rem",
                fontSize: "1.0625rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  marginTop: "0.6875rem",
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "var(--accent)",
                }}
              />
              {item}
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote
          style={{
            margin: "2.25rem 0",
            paddingLeft: "1.25rem",
            borderLeft: "2px solid var(--warm)",
          }}
        >
          <p
            style={{
              fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              lineHeight: 1.5,
            }}
          >
            {block.text}
          </p>
        </blockquote>
      );

    case "example":
      return (
        <figure className="card" style={{ margin: "2rem 0", padding: "1.5rem" }}>
          <figcaption
            style={{
              fontSize: "0.625rem",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--warm-text)",
              marginBottom: "1rem",
            }}
          >
            {block.title}, chiffres illustratifs
          </figcaption>
          <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {block.lines.map((line) => {
              const [label, value] = line.split(/\s*:\s*(.*)/s);
              return (
                <div
                  key={line}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1.5rem",
                    flexWrap: "wrap",
                    fontSize: "0.9375rem",
                  }}
                >
                  <dt style={{ color: "var(--text-muted)" }}>{label}</dt>
                  <dd
                    className="tabular"
                    style={{ margin: 0, fontWeight: 600, color: "var(--text-primary)" }}
                  >
                    {value}
                  </dd>
                </div>
              );
            })}
          </dl>
        </figure>
      );
  }
}

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = articleBySlug(params.slug);
    // Without this a wrong slug renders an empty article shell and returns 200,
    // which is the worst answer for both a reader and a crawler.
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const article = loaderData;
    const path = `/blog/${article.slug}`;
    const { meta, links } = pageMeta({
      path,
      title: `${article.title} — LX Studio`,
      description: article.summary,
    });
    return {
      meta: [
        ...meta,
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: article.published },
        { property: "article:author", content: "Tanguy Lachat" },
      ],
      links,
      scripts: [
        jsonLd([
          {
            "@type": "BlogPosting",
            "@id": `${SITE_URL}${path}#article`,
            headline: article.title,
            description: article.summary,
            datePublished: article.published,
            dateModified: article.published,
            inLanguage: "fr-CH",
            url: `${SITE_URL}${path}`,
            author: { "@id": `${SITE_URL}/#founder` },
            publisher: { "@id": `${SITE_URL}/#organization` },
            isPartOf: { "@id": `${SITE_URL}/blog#blog` },
            mainEntityOfPage: `${SITE_URL}${path}`,
          },
          // The article's own question and answer, so an assistant finds a
          // quotable pair rather than having to summarise the whole page.
          faqSchema(path, [{ q: article.question, a: article.answer }]),
          breadcrumbs([
            { name: "Accueil", path: "/" },
            { name: "Le journal", path: "/blog" },
            { name: article.title, path },
          ]),
        ]),
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const article = Route.useLoaderData();
  const others = ARTICLES_BY_DATE.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <Page>
      <article>
        <Section tone="base" style={{ paddingBlock: "9rem 3rem" }}>
          <div
            aria-hidden="true"
            className="glow glow-blue glow-drift hidden md:block"
            style={{ top: "-40%", right: "-10%", width: "36vw", height: "36vw", maxWidth: 500, maxHeight: 500 }}
          />

          <div style={{ position: "relative", maxWidth: "44rem" }}>
            <Link
              to="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                minHeight: 44,
                fontSize: "0.8125rem",
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
            >
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
                <path d="M19 12H5M11 19l-7-7 7-7" />
              </svg>
              Le journal
            </Link>

            <h1
              style={{
                marginTop: "1.25rem",
                fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {article.title}
            </h1>

            <div
              style={{
                marginTop: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                flexWrap: "wrap",
                fontSize: "0.8125rem",
                color: "var(--text-faint)",
              }}
            >
              <span style={{ color: "var(--accent-text)", fontWeight: 600 }}>
                {article.tag}
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.published}>
                {dateFormat.format(new Date(article.published))}
              </time>
              <span aria-hidden="true">·</span>
              <span>{article.readingMinutes} min de lecture</span>
              <span aria-hidden="true">·</span>
              <span>Tanguy Lachat</span>
            </div>

            {/* The answer, above everything else. A reader who stops here has
                still got what he came for, and it is what gets quoted. */}
            <p
              style={{
                marginTop: "2rem",
                padding: "1.25rem 1.5rem",
                borderRadius: 14,
                borderLeft: "2px solid var(--accent)",
                background: "var(--accent-soft)",
                fontSize: "1.0625rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
              }}
            >
              {article.answer}
            </p>
          </div>
        </Section>

        <Section tone="base" style={{ paddingBlock: "0 5rem" }}>
          <div style={{ maxWidth: "44rem" }}>
            {article.blocks.map((block, i) => (
              <Prose key={i} block={block} />
            ))}
          </div>
        </Section>
      </article>

      {others.length > 0 && (
        <Section tone="raised" labelledBy="suite-title">
          <h2
            id="suite-title"
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--text-faint)",
              marginBottom: "1.75rem",
            }}
          >
            À lire ensuite
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: "1.5rem",
            }}
          >
            {others.map((other) => (
              <Link
                key={other.slug}
                to="/blog/$slug"
                params={{ slug: other.slug }}
                className="card lift"
                style={{ display: "block", padding: "1.75rem", textDecoration: "none" }}
              >
                <span
                  style={{
                    fontSize: "0.625rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--accent-text)",
                  }}
                >
                  {other.tag}
                </span>
                <h3
                  style={{
                    marginTop: "0.75rem",
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.3,
                    color: "var(--text-primary)",
                  }}
                >
                  {other.title}
                </h3>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CtaBand
        title="Le cas de votre entreprise n'est pas dans un article."
        body="Quinze minutes suffisent pour savoir si un de vos processus mérite d'être automatisé. On prend une tâche précise, on estime ce qu'elle coûte par mois, et je vous dis franchement si le jeu en vaut la chandelle."
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
