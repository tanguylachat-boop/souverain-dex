import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site/Page";
import { HomeHero } from "@/components/site/HomeHero";
import { Problem } from "@/components/site/Problem";
import { Install } from "@/components/site/Install";
import { Results } from "@/components/site/Results";
import { Method } from "@/components/site/Method";
import { Faq, type FaqEntry } from "@/components/site/Faq";
import { DataDiagram } from "@/components/site/DataDiagram";
import { Closing } from "@/components/site/Closing";
import { OtherProjects } from "@/components/site/OtherProjects";
import { SEO, SERVICE_DESCRIPTION, FAQ, IMAGES } from "@/content/home";
import { pageMeta, jsonLd, webPage, faqSchema, breadcrumbs, SITE_URL } from "@/lib/seo";

/**
 * Page d'accueil, en sept écrans.
 *
 * Tout le texte vit dans src/content/home.ts ; ici, seulement l'ordre et les
 * métadonnées. Le fil : le problème concret, ce qu'on installe, le résultat
 * chez des clients, comment on travaille, les questions, le rendez-vous.
 */

/** Les questions, avec le schéma des données sous la question qui le mérite. */
const FAQ_ENTRIES: ReadonlyArray<FaqEntry> = FAQ.entries.map((entry, i) =>
  i === FAQ.dataQuestionIndex ? { ...entry, extra: <DataDiagram /> } : entry,
);

export const Route = createFileRoute("/")({
  head: () => {
    const { meta, links } = pageMeta(SEO);
    return {
      meta,
      links: [
        ...links,
        // The hero photo is the largest thing on the first screen; asking
        // for it before the stylesheet is parsed keeps the first paint
        // under budget on a slow connection.
        { rel: "preload", as: "image", href: IMAGES.hero.src, fetchpriority: "high" },
      ],
      scripts: [
        jsonLd([
          webPage(SEO),
          faqSchema("/", FAQ.entries),
          breadcrumbs([{ name: "Accueil", path: "/" }]),
          {
            "@type": "Service",
            "@id": `${SITE_URL}/#service-conseil`,
            name: "Automatisation du travail de bureau pour PME",
            serviceType: "Automatisation de tâches administratives par agents IA",
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: { "@type": "Country", name: "Switzerland" },
            description: SERVICE_DESCRIPTION,
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
      <HomeHero />
      <Problem />
      <Install />
      <Results />
      <Method />
      <Faq
        size="lg"
        entries={FAQ_ENTRIES}
        eyebrow={FAQ.eyebrow}
        title={FAQ.title}
        lede={FAQ.lede}
      />
      <Closing />
      <OtherProjects />
    </Page>
  );
}
