import { createFileRoute } from "@tanstack/react-router";
import { IaPage } from "@/components/ia/Shell";
import { PageHero } from "@/components/ia/PageHero";
import { CtaPanel, DossierCard, DossierButton } from "@/components/ia/forms";
import { IconCheck } from "@/components/ia/icons";
import { T, vars } from "@/components/ia/text";
import {
  SECURITE_SEO,
  SECURITE_HERO,
  SECURITE_SECTIONS,
  SECURITE_ENGAGEMENTS,
  SECURITE_VERSION,
} from "@/content/ia/securite";
import { pageMeta, jsonLd, webPage, breadcrumbs, ogImage } from "@/lib/seo";

/**
 * La page que lit le responsable informatique : un sommaire, puis chaque
 * point en une carte, la source quand il y en a une, et le dossier en PDF.
 * Même source de contenu que le PDF (content/ia/securite.ts).
 */

const SEO = { ...SECURITE_SEO, image: ogImage("securite") };

export const Route = createFileRoute("/securite")({
  head: () => {
    const { meta, links } = pageMeta(SEO);
    return {
      meta,
      links,
      scripts: [
        jsonLd([
          webPage(SEO),
          breadcrumbs([
            { name: "Accueil", path: "/" },
            { name: "Sécurité et conformité", path: "/securite" },
          ]),
        ]),
      ],
    };
  },
  component: SecuritePage,
});

function SecuritePage() {
  return (
    <IaPage>
      <PageHero eyebrow={SECURITE_HERO.eyebrow} title={SECURITE_HERO.title} sub={SECURITE_HERO.sub}>
        <DossierButton local />
      </PageHero>

      <section className="ia-section is-tight" aria-labelledby="secs-title">
        <div className="ia-container">
          <h2 id="secs-title" className="ia-sr">
            Les mesures, point par point
          </h2>
          <nav aria-label="Sommaire">
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
                    Source :{" "}
                    <a href={s.source.url} target="_blank" rel="noopener noreferrer">
                      {s.source.label}
                    </a>
                  </p>
                ) : null}
              </article>
            ))}
            <article id="engagements" className="ia-sec" data-rv="">
              <h2>Engagements contractuels</h2>
              <p className="ia-sec-summary">
                Ce que le contrat écrit, et que le dossier reprend en page 4.
              </p>
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
                Dossier sécurité version {SECURITE_VERSION.version} du {SECURITE_VERSION.date}.
                Chaque nouvelle version est datée et numérotée.
              </p>
            </article>
          </div>
        </div>
      </section>

      <DossierCard />
      <CtaPanel
        title="Votre responsable informatique a une question que cette page ne couvre pas ?"
        text="Posez-la ici ou appelez-moi. Je réponds point par point, par écrit si vous le souhaitez, pour que la réponse puisse être jointe au dossier."
      />
    </IaPage>
  );
}
