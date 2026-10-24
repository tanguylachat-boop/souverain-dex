import type { Metier } from "@/content/ia/metiers";
import { DIFFERENCE, METHOD, FAQ, HERO } from "@/content/ia/home";
import { bookingHref } from "@/content/ia/site";
import { IaPage } from "./Shell";
import { PageHero } from "./PageHero";
import { Problem, Rows, Difference } from "./sections";
import { CtaPanel, DossierCard, DossierButton } from "./forms";
import { Faq } from "./Faq";
import { IconArrow } from "./icons";
import { pageMeta, jsonLd, webPage, faqSchema, breadcrumbs, ogImage, SITE_URL } from "@/lib/seo";

/** Les balises d'une page métier : titre, description, image, graphe. */
export function metierHead(metier: Metier) {
  const seo = { path: metier.path, ...metier.seo, image: ogImage(metier.slug) };
  const { meta, links } = pageMeta(seo);
  const name = metier.seo.title.split(" | ")[0];
  return {
    meta,
    links,
    scripts: [
      jsonLd([
        webPage(seo),
        faqSchema(metier.path, metier.faq),
        breadcrumbs([
          { name: "Accueil", path: "/" },
          { name, path: metier.path },
        ]),
        {
          "@type": "Service",
          "@id": `${SITE_URL}${metier.path}#service`,
          name,
          serviceType: "Intelligence artificielle installée sur site",
          description: metier.seo.description,
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: { "@type": "Country", name: "Switzerland" },
          url: `${SITE_URL}${metier.path}`,
        },
      ]),
    ],
  };
}

/** Le gabarit commun aux trois pages métier, du premier écran au formulaire. */
export function MetierPage({ metier }: { metier: Metier }) {
  return (
    <IaPage>
      <PageHero eyebrow={metier.hero.eyebrow} title={metier.hero.title} sub={metier.hero.sub}>
        <a className="ia-btn is-primary" href={bookingHref()} data-magnetic="">
          {HERO.primary.label}
          <IconArrow />
        </a>
        {metier.dossier ? <DossierButton local /> : null}
      </PageHero>
      <Rows
        id="taches"
        eyebrow={metier.tasks.eyebrow}
        title={metier.tasks.title}
        items={metier.tasks.items}
      />
      <Problem title={metier.problem.title} blocks={metier.problem.blocks} />
      <Difference
        eyebrow={DIFFERENCE.eyebrow}
        title={metier.difference.title}
        columns={DIFFERENCE.columns}
        rows={metier.difference.rows}
      />
      <Rows
        id="methode"
        eyebrow={METHOD.eyebrow}
        title={metier.method.title}
        items={metier.method.steps}
        note={METHOD.guarantee}
      />
      {metier.dossier ? <DossierCard /> : null}
      <Faq
        eyebrow={FAQ.eyebrow}
        title={FAQ.title}
        entries={metier.faq}
        dossierOnPage={metier.dossier}
      />
      <CtaPanel title={metier.form.title} text={metier.form.text} />
    </IaPage>
  );
}
