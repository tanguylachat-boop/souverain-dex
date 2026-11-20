import type { Lang } from "@/content/ia/lang";
import { content } from "@/content/ia/bundle";
import type { Resource, ResourceBlock } from "@/content/ia/ressources";
import { IaPage } from "./Shell";
import { Hero } from "./Hero";
import { PageHero } from "./PageHero";
import { LogoBand, Demo, Problem, Rows, Difference, Sectors, Posts } from "./sections";
import { CtaPanel, DossierCard, DossierButton } from "./forms";
import { Faq } from "./Faq";
import { IconArrow, IconCheck } from "./icons";
import { T, vars } from "./text";
import { L, fmtDate, useContent } from "./lang";
import {
  pageMeta,
  jsonLd,
  webPage,
  faqSchema,
  breadcrumbs,
  articleSchema,
  ogImage,
  SITE_URL,
} from "@/lib/seo";

/**
 * Les pages partagées par les deux langues : l'accueil, la sécurité, la
 * liste des ressources et un article. Chaque route (française ou anglaise)
 * se réduit à un appel de `xxxHead(lang)` et au composant. Le contenu vient
 * de la langue du chemin.
 */

/** Le nom de l'image de partage : les français à la racine de /og, les anglais sous /og/en. */
const og = (lang: Lang, fr: string, en: string) => ogImage(lang === "en" ? `en/${en}` : fr);

/* --------------------------------------------------------------------------
 * Accueil
 * ------------------------------------------------------------------------ */
export function homeHead(lang: Lang) {
  const { home } = content(lang);
  const SEO = { ...home.HOME_SEO, image: og(lang, "accueil", "home") };
  const { meta, links } = pageMeta(SEO);
  const transcript = [home.DEMO.chapters[0]?.title ?? "", ...home.DEMO.chapters.map((c) => c.text)]
    .join(" ")
    .trim();
  return {
    meta,
    links,
    scripts: [
      jsonLd([
        webPage(SEO),
        faqSchema(SEO.path, home.FAQ.entries),
        {
          "@type": "VideoObject",
          "@id": `${SITE_URL}${SEO.path === "/" ? "/" : SEO.path}#demo-video`,
          name: home.DEMO.title,
          description: home.DEMO.text,
          thumbnailUrl: [`${SITE_URL}${home.DEMO.poster}`],
          contentUrl: `${SITE_URL}${home.DEMO.mp4}`,
          uploadDate: home.DEMO.uploadDate,
          duration: home.DEMO.duration,
          width: 1280,
          height: 720,
          // La voix est en français dans les deux langues ; le texte écrit suit la page.
          inLanguage: "fr-CH",
          transcript,
          isFamilyFriendly: true,
          publisher: { "@id": `${SITE_URL}/#organization` },
        },
        {
          "@type": "Service",
          "@id": `${SITE_URL}${SEO.path === "/" ? "/" : SEO.path}#service`,
          name:
            lang === "en"
              ? "On-premise AI for companies in Switzerland"
              : "IA installée sur site pour les entreprises de Suisse romande",
          serviceType:
            lang === "en"
              ? "On-premise artificial intelligence, installed on site"
              : "Intelligence artificielle installée sur site",
          description: home.HOME_SEO.description,
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: { "@type": "Country", name: "Switzerland" },
          url: `${SITE_URL}${SEO.path === "/" ? "/" : SEO.path}`,
        },
      ]),
    ],
  };
}

export function HomePage() {
  const { home, ressources } = useContent();
  const { DIFFERENCE, METHOD, ARTICLES_TEASER, FAQ } = home;
  const teaser: Resource[] = ARTICLES_TEASER.slugs
    .map((slug) => ressources.resourceBySlug(slug))
    .filter((r): r is Resource => !!r);
  return (
    <IaPage>
      <Hero />
      <Demo />
      <LogoBand />
      <Problem />
      <Difference
        eyebrow={DIFFERENCE.eyebrow}
        title={DIFFERENCE.title}
        columns={DIFFERENCE.columns}
        rows={DIFFERENCE.rows}
      />
      <Rows
        id="methode"
        eyebrow={METHOD.eyebrow}
        title={METHOD.title}
        items={METHOD.steps}
        note={METHOD.guarantee}
      />
      <Sectors />
      <Posts
        eyebrow={ARTICLES_TEASER.eyebrow}
        title={ARTICLES_TEASER.title}
        items={teaser}
        cta={ARTICLES_TEASER.cta}
      />
      <CtaPanel />
      <Faq eyebrow={FAQ.eyebrow} title={FAQ.title} entries={FAQ.entries} />
    </IaPage>
  );
}

/* --------------------------------------------------------------------------
 * Sécurité : la page que lit le responsable informatique. Même source de
 * contenu que le PDF (content/ia/securite.ts et en/securite.ts).
 * ------------------------------------------------------------------------ */
export function securiteHead(lang: Lang) {
  const { securite, ui } = content(lang);
  const SEO = { ...securite.SECURITE_SEO, image: og(lang, "securite", "security") };
  const { meta, links } = pageMeta(SEO);
  return {
    meta,
    links,
    scripts: [
      jsonLd([
        webPage(SEO),
        breadcrumbs(
          [
            { name: ui.breadcrumbHome, path: ui.paths.home },
            { name: securite.SECURITE_HERO.eyebrow, path: SEO.path },
          ],
          SEO.path,
        ),
      ]),
    ],
  };
}

export function SecuritePage() {
  const { securite, ui } = useContent();
  const { SECURITE_HERO, SECURITE_SECTIONS, SECURITE_ENGAGEMENTS, SECURITE_VERSION } = securite;
  return (
    <IaPage>
      <PageHero eyebrow={SECURITE_HERO.eyebrow} title={SECURITE_HERO.title} sub={SECURITE_HERO.sub}>
        <DossierButton local />
      </PageHero>

      <section className="ia-section is-tight" aria-labelledby="secs-title">
        <div className="ia-container">
          <h2 id="secs-title" className="ia-sr">
            {ui.securite.measuresTitle}
          </h2>
          <nav aria-label={ui.securite.tocLabel}>
            <ul className="ia-toc" style={{ marginTop: 0 }}>
              {SECURITE_SECTIONS.map((s, i) => (
                <li key={s.id} data-rv="" style={vars({ "--d": Math.min(i, 5) * 40 })}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ia-secs">
            {SECURITE_SECTIONS.map((s) => (
              <article key={s.id} id={s.id} className="ia-sec" data-rv="">
                <h2>{s.title}</h2>
                <p className="ia-sec-summary">
                  <T>{s.summary}</T>
                </p>
                <ul>
                  {s.points.map((point) => (
                    <li key={point}>
                      <IconCheck />
                      <span>
                        <T>{point}</T>
                      </span>
                    </li>
                  ))}
                </ul>
                {s.source ? (
                  <p className="ia-sec-source">
                    {ui.securite.sourceLabel}{" "}
                    <a href={s.source.url} target="_blank" rel="noopener noreferrer">
                      {s.source.label}
                    </a>
                  </p>
                ) : null}
              </article>
            ))}
            <article id="engagements" className="ia-sec" data-rv="">
              <h2>{ui.securite.engagementsTitle}</h2>
              <p className="ia-sec-summary">{ui.securite.engagementsSummary}</p>
              <ul>
                {SECURITE_ENGAGEMENTS.map((e) => (
                  <li key={e}>
                    <IconCheck />
                    <span>
                      <T>{e}</T>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="ia-sec-source">
                {ui.securite.versionLine(SECURITE_VERSION.version, SECURITE_VERSION.date)}
              </p>
            </article>
          </div>
        </div>
      </section>

      <DossierCard />
      <CtaPanel title={ui.securite.ctaTitle} text={ui.securite.ctaText} />
    </IaPage>
  );
}

/* --------------------------------------------------------------------------
 * Ressources : la liste.
 * ------------------------------------------------------------------------ */
export function resourcesHead(lang: Lang) {
  const { ressources, ui } = content(lang);
  const SEO = {
    path: ui.paths.ressources,
    ...ui.resources.seo,
    image: og(lang, "ressources", "resources"),
  };
  const { meta, links } = pageMeta(SEO);
  return {
    meta,
    links,
    scripts: [
      jsonLd([
        {
          ...webPage(SEO),
          "@type": "CollectionPage",
          mainEntity: { "@id": `${SITE_URL}${SEO.path}#list` },
        },
        breadcrumbs(
          [
            { name: ui.breadcrumbHome, path: ui.paths.home },
            { name: ui.resources.eyebrow, path: SEO.path },
          ],
          SEO.path,
        ),
        {
          "@type": "ItemList",
          "@id": `${SITE_URL}${SEO.path}#list`,
          numberOfItems: ressources.ALL_RESOURCES.length,
          itemListElement: ressources.ALL_RESOURCES.map((r, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: r.title,
            url: `${SITE_URL}${ui.resourcePath(r.slug)}`,
          })),
        },
      ]),
    ],
  };
}

export function ResourcesPage() {
  const { ressources, ui } = useContent();
  return (
    <IaPage>
      <PageHero eyebrow={ui.resources.eyebrow} title={ui.resources.title} sub={ui.resources.sub} />
      <Posts
        id="articles"
        eyebrow={ui.resources.listEyebrow}
        title={ui.resources.listTitle}
        items={ressources.ALL_RESOURCES}
      />
      <CtaPanel />
    </IaPage>
  );
}

/* --------------------------------------------------------------------------
 * Un article.
 * ------------------------------------------------------------------------ */
export function resourceHead(lang: Lang, r: Resource) {
  const { ui } = content(lang);
  const path = ui.resourcePath(r.slug);
  const image = og(lang, r.slug, r.slug);
  const { meta, links } = pageMeta({ path, title: r.title, description: r.summary, image });
  return {
    meta: [
      ...meta,
      { property: "og:type", content: "article" },
      { property: "article:published_time", content: r.published },
      ...(r.updated ? [{ property: "article:modified_time", content: r.updated }] : []),
      { property: "article:author", content: r.author },
    ],
    links,
    scripts: [
      jsonLd([
        articleSchema(r, path, image),
        faqSchema(path, [{ q: r.question, a: r.answer }]),
        breadcrumbs(
          [
            { name: ui.breadcrumbHome, path: ui.paths.home },
            { name: ui.resources.eyebrow, path: ui.paths.ressources },
            { name: r.title, path },
          ],
          path,
        ),
      ]),
    ],
  };
}

function Prose({ block, summaryLabel }: { block: ResourceBlock; summaryLabel: string }) {
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
        <aside className="ia-resume" aria-label={summaryLabel}>
          <strong>{summaryLabel}</strong>
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

export function ResourcePage({ r }: { r: Resource }) {
  const { home, site, ressources, ui } = useContent();
  const others = ressources.ALL_RESOURCES.filter((o) => o.slug !== r.slug).slice(0, 4);
  return (
    <IaPage>
      <PageHero
        eyebrow={r.tag}
        title={r.title}
        meta={
          <p className="ia-article-meta" style={{ color: "rgba(246,249,255,0.7)" }}>
            <span>
              {ui.by} <strong style={{ color: "#f6f9ff" }}>{r.author}</strong>
            </span>
            <time dateTime={r.published}>{fmtDate(r.published)}</time>
            {r.updated && r.updated !== r.published ? (
              <time dateTime={r.updated}>
                {ui.updatedOn} {fmtDate(r.updated)}
              </time>
            ) : null}
            <span>
              {r.readingMinutes} {ui.readingMinutes}
            </span>
          </p>
        }
      />
      <section className="ia-section is-tight">
        <div className="ia-container">
          <article className="ia-article">
            {/* La question que l'article traite, visible, comme dans le balisage FAQPage. */}
            <p className="ia-article-question">{r.question}</p>
            <p className="is-lead">{r.answer}</p>
            {r.blocks.map((block, i) => (
              <Prose key={i} block={block} summaryLabel={ui.summaryBox} />
            ))}
            {r.sources.length > 0 ? (
              <section className="ia-sources" aria-labelledby="sources-title">
                <h2 id="sources-title">{ui.sources}</h2>
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
              <L to={ui.paths.fiduciaires} className="ia-btn is-outline">
                {ui.seeFiduciaires}
                <IconArrow />
              </L>
              <a href={site.bookingHref()} className="ia-btn is-ink">
                {home.HERO.primary.label}
                <IconArrow />
              </a>
            </div>
          </article>
        </div>
      </section>
      <Posts id="suite" eyebrow={ui.readNext.eyebrow} title={ui.readNext.title} items={others} />
      <CtaPanel />
    </IaPage>
  );
}
