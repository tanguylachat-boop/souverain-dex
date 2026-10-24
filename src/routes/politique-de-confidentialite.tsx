import { createFileRoute } from "@tanstack/react-router";
import { IaPage } from "@/components/ia/Shell";
import { T } from "@/components/ia/text";
import { SITE } from "@/content/ia/site";
import { pageMeta, jsonLd, webPage, breadcrumbs } from "@/lib/seo";

const SEO = {
  path: "/politique-de-confidentialite",
  title: "Politique de confidentialité | LX Studio",
  description:
    "Quelles données ce site collecte, pourquoi, combien de temps, et vos droits. Conçu pour respecter la loi fédérale sur la protection des données.",
} as const;

export const Route = createFileRoute("/politique-de-confidentialite")({
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
            { name: "Politique de confidentialité", path: "/politique-de-confidentialite" },
          ]),
        ]),
      ],
    };
  },
  component: PolitiqueConfidentialite,
});

function PolitiqueConfidentialite() {
  return (
    <IaPage>
      <section className="ia-plain">
        <div className="ia-container">
          <article className="ia-article">
            <h1>Politique de confidentialité</h1>
            <p className="is-meta">
              Conçue pour respecter la loi fédérale sur la protection des données (LPD). Dernière
              mise à jour : 24.10.2026
            </p>

            <h2>1. Responsable du traitement</h2>
            <p>
              <strong>LX Studio</strong>, {SITE.founder}
              <br />
              <T>{SITE.address.street}</T>, {SITE.address.zip} {SITE.address.city},{" "}
              {SITE.address.country}
              <br />
              E-mail : <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>

            <h2>2. Données collectées</h2>
            <p>
              Ce site collecte des données personnelles par deux formulaires, et seulement quand
              vous les remplissez :
            </p>
            <ul>
              <li>
                <strong>Demande de diagnostic :</strong> nom, entreprise, e-mail, téléphone, nombre
                de collaborateurs, description de la tâche, page d'origine.
              </li>
              <li>
                <strong>Dossier sécurité :</strong> nom, entreprise, e-mail, page d'origine.
              </li>
            </ul>
            <p>
              La fréquentation du site est mesurée sans cookie et sans identifiant personnel
              (Plausible Analytics, données agrégées par page). Aucun pixel publicitaire, aucun
              traçage entre sites.{" "}
              <T>{"[À CONFIRMER PAR TANGUY : maintien de la mesure d'audience]"}</T>
            </p>

            <h2>3. Finalités</h2>
            <ul>
              <li>Répondre à votre demande de diagnostic et préparer l'échange.</li>
              <li>Vous envoyer le dossier sécurité et répondre à vos questions sur celui-ci.</li>
              <li>
                Vous recontacter au sujet de l'installation d'une IA dans votre entreprise, si vous
                l'avez demandé.
              </li>
            </ul>
            <p>
              Vos données ne sont ni vendues, ni louées, ni transmises à des tiers à des fins de
              prospection.
            </p>

            <h2>4. Base du traitement</h2>
            <p>
              Le traitement repose sur votre consentement, donné en cochant la case du formulaire,
              et sur l'exécution des mesures précontractuelles que vous demandez. Vous pouvez
              retirer votre consentement à tout moment en écrivant à {SITE.email}.
            </p>

            <h2>5. Où vont les données des formulaires</h2>
            <p>
              Chaque formulaire est transmis au serveur du site, qui l'envoie par e-mail à{" "}
              {SITE.email} via un prestataire d'envoi d'e-mails. Aucune base de données n'est tenue
              par le site : le message reçu est la seule trace.{" "}
              <T>
                {
                  "[À CONFIRMER PAR TANGUY : prestataire d'envoi (Resend) et lieu d'hébergement des serveurs]"
                }
              </T>
            </p>
            <p>
              <strong>Le système installé chez les clients est distinct de ce site :</strong> les
              documents traités par l'IA restent sur la machine installée dans leurs locaux et ne
              transitent pas par ce site ni par LX Studio. La page Sécurité décrit ce
              fonctionnement.
            </p>

            <h2>6. Durée de conservation</h2>
            <p>
              Les demandes sont conservées au plus 24 mois après le dernier échange, sauf relation
              contractuelle, auquel cas les documents sont conservés selon les obligations légales
              suisses (10 ans pour les pièces comptables).{" "}
              <T>{"[À CONFIRMER PAR TANGUY : durée]"}</T>
            </p>

            <h2>7. Vos droits</h2>
            <ul>
              <li>
                <strong>Accès :</strong> savoir si des données vous concernant sont traitées et en
                recevoir une copie.
              </li>
              <li>
                <strong>Rectification :</strong> corriger des données inexactes ou incomplètes.
              </li>
              <li>
                <strong>Effacement :</strong> demander la suppression de vos données.
              </li>
              <li>
                <strong>Remise :</strong> recevoir vos données dans un format courant.
              </li>
              <li>
                <strong>Opposition :</strong> vous opposer au traitement.
              </li>
            </ul>
            <p>
              Pour exercer ces droits, écrivez à <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              Réponse sous 30 jours.
            </p>

            <h2>8. Sécurité</h2>
            <p>
              Le site est servi en HTTPS avec des en-têtes de sécurité (HSTS, protection contre
              l'inclusion dans un cadre, politique de référent). Les formulaires sont validés côté
              serveur et protégés contre les envois automatisés.
            </p>

            <h2>9. Cookies</h2>
            <p>
              Ce site ne dépose aucun cookie de traçage, publicitaire ou analytique. Aucune bannière
              n'est donc nécessaire.
            </p>

            <h2>10. Autorité de surveillance</h2>
            <p>
              En cas de litige, vous pouvez vous adresser au Préposé fédéral à la protection des
              données et à la transparence (PFPDT), Feldeggweg 1, 3003 Berne,{" "}
              <a href="https://www.edoeb.admin.ch/" target="_blank" rel="noopener noreferrer">
                edoeb.admin.ch
              </a>
              .
            </p>

            <h2>11. Modifications</h2>
            <p>
              Cette politique peut être mise à jour. La date de la dernière version figure en haut
              de la page.
            </p>
          </article>
        </div>
      </section>
    </IaPage>
  );
}
