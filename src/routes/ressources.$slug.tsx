import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { IaPage } from "@/components/ia/Shell";
import { PageHero } from "@/components/ia/PageHero";
import { Posts } from "@/components/ia/sections";
import { CtaPanel } from "@/components/ia/forms";
import { IconArrow } from "@/components/ia/icons";
import { T } from "@/components/ia/text";
import { HERO } from "@/content/ia/home";
import { bookingHref } from "@/content/ia/site";
import { ALL_RESOURCES, resourceBySlug, type ResourceBlock } from "@/content/ia/ressources";
import { pageMeta, jsonLd, faqSchema, breadcrumbs, articleSchema, ogImage } from "@/lib/seo";

const dateFormat = new Intl.DateTimeFormat("fr-CH", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function Prose({ block }: { block: ResourceBlock }) {
  switch (block.kind) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "p":
      return (
        <p>
          <T>{block.text}</T>
        </p>
      );
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>
              <T>{item}</T>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote>
          <p style={{ margin: 0, color: "inherit", fontSize: "inherit", lineHeight: "inherit" }}>
            {block.text}
          </p>
        </blockquote>
      );
    case "resume":
      return (
        <aside className="ia-resume" aria-label="En résumé">
          <strong>En résumé</strong>
          <ul>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      );
    case "example":
      return (
        <figure className="ia-example">
          <figcaption>{block.title}</figcaption>
          <dl>
            {block.lines.map((line) => {
              const [label, value = ""] = line.split(/\s*:\s*(.*)/s);
              return (
                <div key={line}>
                  <dt>{label}</dt>
                  <dd>
                    <T>{value}</T>
                  </dd>
                </div>
              );
            })}
          </dl>
        </figure>
      );
  }
}

export const Route = createFileRoute("/ressources/$slug")({
  loader: ({ params }) => {
    const resource = resourceBySlug(params.slug);
    // Un mauvais slug doit répondre 404, pas une page vide en 200.
    if (!resource) throw notFound();
    return resource;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const r = loaderData;
    const path = `/ressources/${r.slug}`;
    const { meta, links } = pageMeta({
      path,
      title: r.title,
      description: r.summary,
      keywords: r.keyword,
      image: ogImage(r.slug),
    });
    return {
      meta: [
        ...meta,
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: r.published },
        { property: "article:author", content: r.author },
      ],
      links,
      scripts: [
        jsonLd([
          articleSchema(r),
          faqSchema(path, [{ q: r.question, a: r.answer }]),
          breadcrumbs([
            { name: "Accueil", path: "/" },
            { name: "Ressources", path: "/ressources" },
            { name: r.title, path },
          ]),
        ]),
      ],
    };
  },
  component: ResourcePage,
});

function ResourcePage() {
  const r = Route.useLoaderData();
  const others = ALL_RESOURCES.filter((o) => o.slug !== r.slug).slice(0, 4);
  return (
    <IaPage>
      <PageHero
        eyebrow={r.tag}
        title={r.title}
        meta={
          <p className="ia-article-meta" style={{ color: "rgba(246,249,255,0.7)" }}>
            <span>
              Par <strong style={{ color: "#f6f9ff" }}>{r.author}</strong>
            </span>
            <time dateTime={r.published}>{dateFormat.format(new Date(r.published))}</time>
            <span>{r.readingMinutes} min de lecture</span>
          </p>
        }
      />
      <section className="ia-section is-tight">
        <div className="ia-container">
          <article className="ia-article">
            <p className="is-lead">{r.answer}</p>
            {r.blocks.map((block, i) => (
              <Prose key={i} block={block} />
            ))}
            {r.sources.length > 0 ? (
              <section className="ia-sources" aria-labelledby="sources-title">
                <h2 id="sources-title">Sources</h2>
                <ol>
                  {r.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}
            <div className="ia-article-links">
              <Link to="/fiduciaires" className="ia-btn is-outline">
                Voir pour les fiduciaires
                <IconArrow />
              </Link>
              <a href={bookingHref()} className="ia-btn is-ink">
                {HERO.primary.label}
                <IconArrow />
              </a>
            </div>
          </article>
        </div>
      </section>
      <Posts
        id="suite"
        eyebrow="À lire ensuite"
        title="D'autres réponses avant d'installer."
        items={others}
      />
      <CtaPanel />
    </IaPage>
  );
}
