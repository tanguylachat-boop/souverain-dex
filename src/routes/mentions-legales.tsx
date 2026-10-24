import { createFileRoute, Link } from "@tanstack/react-router";
import { IaPage } from "@/components/ia/Shell";
import { T } from "@/components/ia/text";
import { SITE } from "@/content/ia/site";
import { pageMeta, jsonLd, webPage, breadcrumbs } from "@/lib/seo";

const SEO = {
  path: "/mentions-legales",
  title: "Mentions légales | LX Studio",
  description:
    "Mentions légales de LX Studio, installation d'intelligence artificielle sur site à Bassecourt, Jura. Éditeur, hébergement, protection des données.",
} as const;

export const Route = createFileRoute("/mentions-legales")({
  head: () => {
    const { meta, links } = pageMeta(SEO);
    return {
      meta: [...meta, { name: "robots", content: "noindex, follow" }],
      links,
      scripts: [
        jsonLd([
          webPage(SEO),
          breadcrumbs([
            { name: "Accueil", path: "/" },
            { name: "Mentions légales", path: "/mentions-legales" },
          ]),
        ]),
      ],
    };
  },
  component: MentionsLegales,
});

function MentionsLegales() {
  return (
    <IaPage>
      <section className="ia-plain">
        <div className="ia-container">
          <article className="ia-article">
            <h1>Mentions légales</h1>
            <p className="is-meta">Dernière mise à jour : 24.10.2026</p>

            <h2>Éditeur du site</h2>
            <p>
              <strong>LX Studio</strong>
              <br />
              Entreprise individuelle, {SITE.founder}
              <br />
              <T>{SITE.address.street}</T>, {SITE.address.zip} {SITE.address.city},{" "}
              {SITE.address.country}
              <br />
              Téléphone : <a href={SITE.phoneHref}>{SITE.phone}</a>
              <br />
              E-mail : <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
            <p>
              <T>{"Numéro IDE : [À COMPLÉTER : numéro IDE]"}</T>
            </p>

            <h2>Hébergement</h2>
            <p>
              Ce site est hébergé par Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107,
              États-Unis. <T>{"[À CONFIRMER PAR TANGUY : hébergeur du site publié]"}</T>
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu de ce site (textes, illustrations, structure) est la propriété
              de LX Studio. Les logos des clients cités restent la propriété de leurs titulaires et
              sont affichés avec leur accord. Toute reproduction, même partielle, sans autorisation
              écrite préalable est interdite.
            </p>

            <h2>Responsabilité</h2>
            <p>
              LX Studio s'efforce d'assurer l'exactitude des informations publiées sur ce site. Les
              points marqués « à compléter », « à confirmer » ou « à vérifier » sont en cours de
              validation et ne constituent pas un engagement. Les informations juridiques publiées
              ne sont pas un avis juridique.
            </p>
            <p>
              Les liens vers d'autres sites sont fournis à titre d'information. LX Studio n'est pas
              responsable de leur contenu.
            </p>

            <h2>Protection des données</h2>
            <p>
              Le traitement des données personnelles collectées par ce site est décrit dans la{" "}
              <Link to="/politique-de-confidentialite">politique de confidentialité</Link>. Il est
              conçu pour respecter la loi fédérale sur la protection des données (LPD), en vigueur
              depuis le 1er septembre 2023.
            </p>

            <h2>Droit applicable</h2>
            <p>
              Ce site et ses mentions légales sont soumis au droit suisse. For : {SITE.address.city}
              , canton du {SITE.address.region}. <T>{"[À VÉRIFIER PAR TANGUY : for juridique]"}</T>
            </p>
          </article>
        </div>
      </section>
    </IaPage>
  );
}
