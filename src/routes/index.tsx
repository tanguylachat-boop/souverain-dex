import { createFileRoute } from "@tanstack/react-router";
import { IaPage } from "@/components/ia/Shell";
import { Hero } from "@/components/ia/Hero";
import {
  LogoBand,
  Demo,
  Problem,
  Rows,
  Difference,
  Sectors,
  Posts,
} from "@/components/ia/sections";
import { CtaPanel } from "@/components/ia/forms";
import { Faq } from "@/components/ia/Faq";
import { HOME_SEO, DIFFERENCE, METHOD, ARTICLES_TEASER, FAQ } from "@/content/ia/home";
import { resourceBySlug, type Resource } from "@/content/ia/ressources";
import { pageMeta, jsonLd, webPage, faqSchema, breadcrumbs, ogImage, SITE_URL } from "@/lib/seo";

/**
 * Page d'accueil, dans l'ordre du brief : la promesse, la démo, les
 * références, le problème, la différence, la méthode, les métiers, les
 * ressources, le formulaire, les questions.
 */

const SEO = { ...HOME_SEO, image: ogImage("accueil") };
const TEASER: Resource[] = ARTICLES_TEASER.slugs
  .map(resourceBySlug)
  .filter((r): r is Resource => !!r);

export const Route = createFileRoute("/")({
  head: () => {
    const { meta, links } = pageMeta(SEO);
    return {
      meta,
      links,
      scripts: [
        jsonLd([
          webPage(SEO),
          faqSchema("/", FAQ.entries),
          breadcrumbs([{ name: "Accueil", path: "/" }]),
          {
            "@type": "Service",
            "@id": `${SITE_URL}/#service`,
            name: "IA installée sur site pour les entreprises de Suisse romande",
            serviceType: "Intelligence artificielle installée sur site",
            description: HOME_SEO.description,
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: { "@type": "Country", name: "Switzerland" },
            url: `${SITE_URL}/`,
          },
        ]),
      ],
    };
  },
  component: HomePage,
});

function HomePage() {
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
        items={TEASER}
        cta={ARTICLES_TEASER.cta}
      />
      <CtaPanel />
      <Faq eyebrow={FAQ.eyebrow} title={FAQ.title} entries={FAQ.entries} />
    </IaPage>
  );
}
