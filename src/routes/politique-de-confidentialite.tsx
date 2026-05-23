import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";

export const Route = createFileRoute("/politique-de-confidentialite")({
  component: PolitiqueConfidentialite,
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — LX Studio" },
      {
        name: "description",
        content:
          "Politique de confidentialité de LX Studio, conforme à la nLPD suisse. Traitement des données personnelles et droits des utilisateurs.",
      },
    ],
  }),
});

function PolitiqueConfidentialite() {
  return (
    <main style={{ minHeight: "100vh", background: "#050507", color: "#f0f0f2" }}>
      <SiteHeader />
      <article
        style={{
          maxWidth: "48rem",
          margin: "0 auto",
          padding: "8rem 1.5rem 4rem",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            marginBottom: "1rem",
          }}
        >
          Politique de confidentialité
        </h1>
        <p
          style={{
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "3rem",
          }}
        >
          Conforme à la Loi fédérale sur la protection des données (nLPD) — Dernière mise à jour : mai 2026
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          <Section title="1. Responsable du traitement">
            <P>
              <strong style={{ color: "#ffffff" }}>LX Studio</strong>
              <br />
              Genève, Suisse
              <br />
              Email :{" "}
              <a
                href="mailto:contact@lxstudio.ch"
                style={{ color: "#4b7cc9", textDecoration: "none" }}
              >
                contact@lxstudio.ch
              </a>
            </P>
          </Section>

          <Section title="2. Données collectées">
            <P>
              LX Studio collecte les données personnelles suivantes via les formulaires
              présents sur ce site :
            </P>
            <Ul>
              <Li>
                <strong style={{ color: "#ffffff" }}>Formulaire de démonstration :</strong>{" "}
                prénom, nom, nom du cabinet, email professionnel, téléphone, canton
              </Li>
              <Li>
                <strong style={{ color: "#ffffff" }}>Calculateur ROI :</strong>{" "}
                adresse email, nombre de collaborateurs, volume de documents estimé
              </Li>
            </Ul>
            <P>
              Aucune donnée n'est collectée automatiquement (pas de cookies de tracking,
              pas de fingerprinting, pas de pixel de suivi).
            </P>
          </Section>

          <Section title="3. Finalité du traitement">
            <P>Les données collectées sont utilisées exclusivement pour :</P>
            <Ul>
              <Li>Vous recontacter suite à une demande de démonstration</Li>
              <Li>Vous envoyer l'estimation ROI personnalisée que vous avez demandée</Li>
              <Li>Vous proposer nos services d'agent IA pour fiduciaires</Li>
            </Ul>
            <P>
              Vos données ne sont <strong style={{ color: "#ffffff" }}>jamais</strong>{" "}
              vendues, louées ou partagées avec des tiers à des fins marketing.
            </P>
          </Section>

          <Section title="4. Base juridique">
            <P>
              Le traitement de vos données repose sur votre{" "}
              <strong style={{ color: "#ffffff" }}>consentement</strong>, donné lors de la
              soumission d'un formulaire sur ce site. Vous pouvez retirer ce consentement
              à tout moment en nous contactant.
            </P>
          </Section>

          <Section title="5. Durée de conservation">
            <P>
              Les données personnelles collectées sont conservées pendant une durée
              maximale de <strong style={{ color: "#ffffff" }}>24 mois</strong> à compter
              de leur collecte, sauf obligation légale contraire. Les données liées à une
              relation contractuelle sont conservées conformément aux obligations légales
              suisses (10 ans pour les documents comptables).
            </P>
          </Section>

          <Section title="6. Transfert de données">
            <P>
              Les formulaires de ce site transmettent vos données à un serveur hébergé
              sur Vercel (infrastructure cloud). Les données de rendez-vous transitent via
              Cal.com.
            </P>
            <P>
              <strong style={{ color: "#ffffff" }}>
                Notre produit (agent IA) est 100% local :
              </strong>{" "}
              les données de nos clients fiduciaires ne quittent jamais leur cabinet. Le
              traitement s'effectue sur du hardware dédié installé dans vos locaux, sans
              connexion à un cloud externe.
            </P>
          </Section>

          <Section title="7. Vos droits">
            <P>Conformément à la nLPD, vous disposez des droits suivants :</P>
            <Ul>
              <Li>
                <strong style={{ color: "#ffffff" }}>Droit d'accès :</strong> obtenir
                confirmation du traitement de vos données et en recevoir une copie
              </Li>
              <Li>
                <strong style={{ color: "#ffffff" }}>Droit de rectification :</strong>{" "}
                corriger des données inexactes ou incomplètes
              </Li>
              <Li>
                <strong style={{ color: "#ffffff" }}>Droit à l'effacement :</strong>{" "}
                demander la suppression de vos données personnelles
              </Li>
              <Li>
                <strong style={{ color: "#ffffff" }}>Droit à la portabilité :</strong>{" "}
                recevoir vos données dans un format structuré et lisible
              </Li>
              <Li>
                <strong style={{ color: "#ffffff" }}>Droit d'opposition :</strong>{" "}
                vous opposer au traitement de vos données à tout moment
              </Li>
            </Ul>
            <P>
              Pour exercer ces droits, contactez-nous à{" "}
              <a
                href="mailto:contact@lxstudio.ch"
                style={{ color: "#4b7cc9", textDecoration: "none" }}
              >
                contact@lxstudio.ch
              </a>
              . Nous traiterons votre demande dans un délai de 30 jours.
            </P>
          </Section>

          <Section title="8. Sécurité">
            <P>
              LX Studio met en œuvre des mesures techniques et organisationnelles
              appropriées pour protéger vos données personnelles contre tout accès non
              autorisé, modification, divulgation ou destruction. Le site utilise le
              protocole HTTPS et des en-têtes de sécurité renforcés (HSTS, CSP,
              X-Frame-Options).
            </P>
          </Section>

          <Section title="9. Cookies">
            <P>
              Ce site <strong style={{ color: "#ffffff" }}>n'utilise aucun cookie</strong>{" "}
              de tracking, publicitaire ou analytique. Aucune bannière de consentement aux
              cookies n'est nécessaire car aucun cookie non essentiel n'est déposé.
            </P>
          </Section>

          <Section title="10. Autorité de surveillance">
            <P>
              En cas de litige concernant le traitement de vos données personnelles, vous
              pouvez déposer une plainte auprès du Préposé fédéral à la protection des
              données et à la transparence (PFPDT) :
            </P>
            <P>
              Préposé fédéral à la protection des données et à la transparence
              <br />
              Feldeggweg 1, 3003 Berne
              <br />
              Site web : edoeb.admin.ch
            </P>
          </Section>

          <Section title="11. Modifications">
            <P>
              LX Studio se réserve le droit de modifier cette politique de
              confidentialité à tout moment. La date de dernière mise à jour figure en
              haut de cette page. Nous vous encourageons à la consulter régulièrement.
            </P>
          </Section>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2
        style={{
          fontSize: "1.125rem",
          fontWeight: 600,
          color: "#ffffff",
          marginBottom: "0.75rem",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function P({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <p
      style={{
        fontSize: "0.9375rem",
        color: "rgba(255,255,255,0.5)",
        lineHeight: 1.75,
        marginBottom: "0.625rem",
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul
      style={{
        paddingLeft: "1.25rem",
        marginBottom: "0.625rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {children}
    </ul>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li
      style={{
        fontSize: "0.9375rem",
        color: "rgba(255,255,255,0.5)",
        lineHeight: 1.75,
      }}
    >
      {children}
    </li>
  );
}
