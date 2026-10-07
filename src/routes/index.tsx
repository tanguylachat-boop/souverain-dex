import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/home/Nav";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { Works } from "@/components/home/Works";
import { Wall } from "@/components/home/Wall";
import { Compare } from "@/components/home/Compare";
import { Approach } from "@/components/home/Approach";
import { Included } from "@/components/home/Included";
import { Threshold } from "@/components/home/Threshold";
import { Pricing } from "@/components/home/Pricing";
import { Questions } from "@/components/home/Questions";
import { Contact } from "@/components/home/Contact";
import { Footer } from "@/components/home/Footer";
import { useHomeEffects } from "@/components/home/effects";
import { SEO, SERVICE_DESCRIPTION, FAQ, IMAGES } from "@/content/home";
import { pageMeta, jsonLd, webPage, faqSchema, breadcrumbs, SITE_URL } from "@/lib/seo";

/**
 * Page d'accueil.
 *
 * Structure et mouvement relevés sur levupp.com (docs/levupp-audit.md),
 * textes de LX Studio (src/content/home.ts). Le fil : la promesse, les
 * chiffres, trois clients, ce qui tourne, le comparatif, la méthode, ce qui
 * est compris, le seuil, les tarifs, les questions, le rendez-vous.
 */

export const Route = createFileRoute("/")({
  head: () => {
    const { meta, links } = pageMeta(SEO);
    return {
      meta,
      links: [
        ...links,
        { rel: "preload", as: "image", href: IMAGES.poster.src, fetchpriority: "high" },
        {
          rel: "preload",
          as: "font",
          href: "/fonts/Geist-Variable.woff2",
          type: "font/woff2",
          crossOrigin: "anonymous",
        },
        {
          rel: "preload",
          as: "font",
          href: "/fonts/GeistMono-Variable.woff2",
          type: "font/woff2",
          crossOrigin: "anonymous",
        },
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
  const root = useRef<HTMLElement>(null);
  useHomeEffects(root);

  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="lx lx-page" ref={root} style={{ outline: "none" }}>
        <div className="lx-bg" aria-hidden="true">
          <div className="grid" />
          <div className="amb" />
          <div className="spot" />
        </div>
        <Hero />
        <Stats />
        <Works />
        <Wall />
        <Compare />
        <Approach />
        <Included />
        <Threshold />
        <Pricing />
        <Questions />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
