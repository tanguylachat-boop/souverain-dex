import { createFileRoute } from "@tanstack/react-router";
import { IaPage } from "@/components/ia/Shell";
import { PageHero } from "@/components/ia/PageHero";
import { Posts } from "@/components/ia/sections";
import { CtaPanel } from "@/components/ia/forms";
import { ALL_RESOURCES } from "@/content/ia/ressources";
import { pageMeta, jsonLd, webPage, breadcrumbs, ogImage, SITE_URL } from "@/lib/seo";

const SEO = {
  path: "/ressources",
  title: "Ressources : IA locale, nLPD, secret professionnel | LX Studio",
  description:
    "Ce qu'il faut savoir avant d'installer une IA dans votre entreprise : IA locale, ChatGPT et nLPD, secret professionnel, saisie des pièces en fiduciaire. Articles signés Tanguy Lachat, sources citées.",
  keywords:
    "IA locale Suisse, ChatGPT nLPD entreprise, IA secret professionnel, IA fiduciaire, automatisation administrative IA",
  image: ogImage("ressources"),
} as const;

export const Route = createFileRoute("/ressources/")({
  head: () => {
    const { meta, links } = pageMeta(SEO);
    return {
      meta,
      links,
      scripts: [
        jsonLd([
          { ...webPage(SEO), "@type": "CollectionPage" },
          breadcrumbs([
            { name: "Accueil", path: "/" },
            { name: "Ressources", path: "/ressources" },
          ]),
          {
            "@type": "ItemList",
            "@id": `${SITE_URL}/ressources#list`,
            itemListElement: ALL_RESOURCES.map((r, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: r.title,
              url: `${SITE_URL}/ressources/${r.slug}`,
            })),
          },
        ]),
      ],
    };
  },
  component: RessourcesPage,
});

function RessourcesPage() {
  return (
    <IaPage>
      <PageHero
        eyebrow="Ressources"
        title="Ce qu'il faut savoir avant d'installer une IA chez vous."
        sub="Des réponses directes, écrites pour les patrons et les responsables qui doivent décider. Chaque article cite ses sources et répond à sa question dès la première phrase."
      />
      <Posts
        id="articles"
        eyebrow="Tous les articles"
        title="Une question par article, la réponse en tête."
        items={ALL_RESOURCES}
      />
      <CtaPanel />
    </IaPage>
  );
}
