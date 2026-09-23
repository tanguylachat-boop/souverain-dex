import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site/Page";
import { Hero } from "@/components/site/Hero";
import { CtaBand } from "@/components/site/CtaBand";
import { Action, TrustLine } from "@/components/site/ui";

import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { DifferenceSection } from "@/components/landing/DifferenceSection";
import { RoiSection } from "@/components/landing/RoiSection";
import { SwissPremiumSection } from "@/components/landing/SwissPremiumSection";
import { AudienceSection } from "@/components/landing/AudienceSection";
import { GuaranteeSection } from "@/components/landing/GuaranteeSection";
import { FaqSection, FAQ_ITEMS } from "@/components/landing/FaqSection";
import { DemoSection } from "@/components/landing/DemoSection";

import {
  pageMeta,
  jsonLd,
  webPage,
  faqSchema,
  breadcrumbs,
  SITE_URL,
} from "@/lib/seo";

/**
 * The sovereign fiduciary agent.
 *
 * This was the whole site until now. It keeps its sales structure, because
 * that structure works, and loses the two things that were not defensible:
 * invented client testimonials, and a fixed price that the studio no longer
 * honours.
 */

const SEO = {
  path: "/fiduciaire",
  title: "Agent IA souverain pour fiduciaires suisses — installé dans votre cabinet",
  description:
    "Agent IA installé sur matériel dédié dans votre cabinet fiduciaire : scan, extraction, classement et relances automatiques. Aucune donnée ne quitte votre réseau local. Conforme nLPD et secret professionnel. Suisse romande.",
  keywords:
    "agent IA fiduciaire, IA locale cabinet comptable, automatisation fiduciaire Suisse, nLPD, secret professionnel, on-premise, Bexio Abacus Crésus WinBIZ, Suisse romande",
} as const;

const FAQ_ENTRIES = FAQ_ITEMS.map((item) => ({ q: item.question, a: item.answer }));

export const Route = createFileRoute("/fiduciaire")({
  head: () => {
    const { meta, links } = pageMeta(SEO);
    return {
      meta,
      links,
      scripts: [
        jsonLd([
          webPage(SEO),
          faqSchema("/fiduciaire", FAQ_ENTRIES),
          breadcrumbs([
            { name: "Accueil", path: "/" },
            { name: "Agent fiduciaire souverain", path: "/fiduciaire" },
          ]),
          {
            "@type": "Product",
            "@id": `${SITE_URL}/fiduciaire#product`,
            name: "Agent IA souverain pour fiduciaires",
            category: "Logiciel d'automatisation pour cabinets fiduciaires",
            brand: { "@id": `${SITE_URL}/#organization` },
            description:
              "Agent IA installé sur du matériel dédié dans les locaux du cabinet. Il capte les pièces comptables à leur arrivée, en extrait les données, les classe et les renomme selon les conventions du cabinet, et déclenche les relances clients. Aucune donnée ne quitte le réseau local, ce qui le rend compatible avec le secret professionnel suisse.",
            audience: {
              "@type": "Audience",
              audienceType:
                "Cabinets fiduciaires et professions soumises au secret professionnel en Suisse romande",
            },
            offers: {
              "@type": "Offer",
              "@id": `${SITE_URL}/fiduciaire#offer`,
              priceCurrency: "CHF",
              // Priced per mandate on scope and estimated hours, so no price
              // is published. Advertising a figure the studio does not hold to
              // would be worse than publishing none.
              availability: "https://schema.org/InStock",
              seller: { "@id": `${SITE_URL}/#organization` },
              areaServed: { "@type": "Country", name: "Switzerland" },
            },
          },
        ]),
      ],
    };
  },
  component: FiduciairePage,
});

function FiduciairePage() {
  return (
    <Page>
      <Hero
        eyebrow="Pour les fiduciaires suisses"
        title={
          <>
            Automatisez votre cabinet
            <br />
            <span style={{ color: "var(--text-muted)" }}>
              sans qu'un seul dossier ne sorte.
            </span>
          </>
        }
        lede={
          <>
            Un agent IA installé sur du matériel dédié, dans vos locaux. Il
            scanne, extrait, classe et relance. Vos données ne quittent jamais
            votre réseau local, ce qui règle la question du secret
            professionnel avant même qu'elle se pose.
          </>
        }
        actions={
          <>
            <Action variant="primary" arrow href="#demo">
              Réserver une démonstration
            </Action>
            <Action variant="ghost" href="#roi">
              Calculer ce que ça vous coûte aujourd'hui
            </Action>
          </>
        }
        trust={
          <TrustLine
            items={[
              "Conforme nLPD",
              "Hébergé dans votre cabinet",
              "Aucun trafic sortant",
            ]}
          />
        }
      />

      <ProblemSection />
      <SolutionSection />
      <DifferenceSection />
      <RoiSection />
      <SwissPremiumSection />
      <AudienceSection />
      <GuaranteeSection />
      <FaqSection />
      <DemoSection />

      <CtaBand
        title="Commencez par vérifier que ça tient sur vos vrais documents."
        body="La démonstration se fait sur des pièces que vous fournissez, pas sur un jeu d'essai préparé à l'avance. C'est le seul test qui vous apprenne quelque chose."
        primaryLabel="Réserver une démonstration"
        primaryHref="https://cal.com/lx-studio/15min"
        secondary={
          <Action variant="secondary" href="mailto:contact@lxstudio.ch">
            contact@lxstudio.ch
          </Action>
        }
        note="Trente minutes, en visio ou dans vos locaux. Aucune installation n'est nécessaire pour la démonstration."
      />
    </Page>
  );
}
