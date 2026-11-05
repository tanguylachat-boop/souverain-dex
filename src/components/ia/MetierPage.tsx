import type { Metier } from "@/content/ia/metiers";
import { content } from "@/content/ia/bundle";
import { langOf } from "@/content/ia/lang";
import { IaPage } from "./Shell";
import { PageHero } from "./PageHero";
import { Problem, Rows, Difference } from "./sections";
import { CtaPanel, DossierCard, DossierButton } from "./forms";
import { Faq } from "./Faq";
import { IconArrow } from "./icons";
import { useContent } from "./lang";
import { pageMeta, jsonLd, webPage, faqSchema, breadcrumbs, ogImage, SITE_URL } from "@/lib/seo";

const SERVICE_TYPE = {
  fr: "Intelligence artificielle installée sur site",
  en: "On-premise artificial intelligence, installed on site",
} as const;

/** Les balises d'une page métier : titre, description, image, graphe. La langue vient du chemin. */
export function metierHead(metier: Metier) {
  const lang = langOf(metier.path);
  const { ui } = content(lang);
  const seo = {
    path: metier.path,
    ...metier.seo,
    image: ogImage(lang === "en" ? `en/${metier.slug}` : metier.slug),
  };
  const { meta, links } = pageMeta(seo);
  const name = metier.seo.title.split(" | ")[0];
  return {
    meta,
    links,
    scripts: [
      jsonLd([
        { ...webPage(seo), mainEntity: { "@id": `${SITE_URL}${metier.path}#service` } },
        faqSchema(metier.path, metier.faq),
        breadcrumbs(
          [
            { name: ui.breadcrumbHome, path: ui.paths.home },
            { name: metier.hero.eyebrow.split(" · ")[0], path: metier.path },
          ],
          metier.path,
        ),
        {
          "@type": "Service",
          "@id": `${SITE_URL}${metier.path}#service`,
          name,
          serviceType: SERVICE_TYPE[lang],
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
  const { home, site } = useContent();
  const { HERO, DIFFERENCE, METHOD, FAQ } = home;
  return (
    <IaPage>
      <PageHero eyebrow={metier.hero.eyebrow} title={metier.hero.title} sub={metier.hero.sub}>
        <a className="ia-btn is-primary" href={site.bookingHref()} data-magnetic="">
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
