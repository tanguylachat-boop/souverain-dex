import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site/Page";
import { HomeHero } from "@/components/site/HomeHero";
import { ClientNames } from "@/components/site/ClientNames";
import { Proof } from "@/components/site/Proof";
import { TimeCost } from "@/components/site/TimeCost";
import { Pitfalls } from "@/components/site/Pitfalls";
import { ProcessPinned } from "@/components/site/ProcessPinned";
import { Examples } from "@/components/site/Examples";
import { Infrastructure } from "@/components/site/Infrastructure";
import { Faq } from "@/components/site/Faq";
import { About } from "@/components/site/About";
import { CtaBand } from "@/components/site/CtaBand";
import { OtherProjects } from "@/components/site/OtherProjects";
import { Action } from "@/components/site/ui";
import { SEO, SERVICE_DESCRIPTION, FAQ, CTA, IMAGES } from "@/content/home";
import { pageMeta, jsonLd, webPage, faqSchema, breadcrumbs, SITE_URL } from "@/lib/seo";

/**
 * Page d'accueil.
 *
 * Tout le texte vit dans src/content/home.ts ; ici, seulement l'ordre des
 * sections et les métadonnées. L'ordre est celui dans lequel un patron de
 * PME accorde sa confiance : la promesse, la preuve, la reconnaissance de sa
 * propre situation, ce qu'il faut éviter, puis seulement la méthode et les
 * exemples.
 */

export const Route = createFileRoute("/")({
  head: () => {
    const { meta, links } = pageMeta(SEO);
    return {
      meta,
      links: [
        ...links,
        // The hero photo is the largest thing on the first screen; asking
        // for it before the stylesheet is parsed is what keeps the first
        // paint under budget on a slow connection.
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
      <ClientNames />
      <Proof />
      <TimeCost />
      <Pitfalls />
      <ProcessPinned />
      <Examples />
      <Infrastructure />
      <Faq
        size="lg"
        entries={FAQ.entries}
        eyebrow={FAQ.eyebrow}
        title={FAQ.title}
        lede={FAQ.lede}
      />
      <About />
      <CtaBand
        size="lg"
        title={CTA.title}
        body={CTA.body}
        primaryLabel={CTA.primary.label}
        primaryHref={CTA.primary.href}
        secondary={
          <Action variant="secondary" href={CTA.secondary.href}>
            {CTA.secondary.label}
          </Action>
        }
        note={CTA.note}
      />
      <OtherProjects />
    </Page>
  );
}
