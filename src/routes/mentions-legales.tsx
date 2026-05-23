import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";

export const Route = createFileRoute("/mentions-legales")({
  component: MentionsLegales,
  head: () => ({
    meta: [
      { title: "Mentions légales — LX Studio" },
      {
        name: "description",
        content:
          "Mentions légales de LX Studio, agent IA souverain pour fiduciaires suisses. Informations éditeur, hébergement et protection des données.",
      },
    ],
  }),
});

function MentionsLegales() {
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
            marginBottom: "3rem",
          }}
        >
          Mentions légales
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          <Section title="Éditeur du site">
            <P>
              <strong style={{ color: "#ffffff" }}>LX Studio</strong>
              <br />
              Entreprise individuelle
              <br />
              Genève, Suisse
            </P>
            <P>
              Email :{" "}
              <a
                href="mailto:contact@lxstudio.ch"
                style={{ color: "#4b7cc9", textDecoration: "none" }}
              >
                contact@lxstudio.ch
              </a>
            </P>
            <P>
              Site web :{" "}
              <a
                href="https://lxstudio.ch"
                style={{ color: "#4b7cc9", textDecoration: "none" }}
              >
                lxstudio.ch
              </a>
            </P>
          </Section>

          <Section title="Hébergement">
            <P>
              Ce site est hébergé par Cloudflare, Inc.
              <br />
              101 Townsend St, San Francisco, CA 94107, États-Unis
              <br />
              Site web : cloudflare.com
            </P>
          </Section>

          <Section title="Propriété intellectuelle">
            <P>
              L'ensemble du contenu de ce site (textes, images, logos, graphismes,
              structure) est la propriété exclusive de LX Studio ou de ses
              partenaires. Toute reproduction, représentation ou diffusion, même
              partielle, sans autorisation écrite préalable est interdite.
            </P>
          </Section>

          <Section title="Responsabilité">
            <P>
              LX Studio s'efforce d'assurer l'exactitude des informations publiées
              sur ce site. Toutefois, LX Studio ne saurait être tenu responsable des
              erreurs, omissions ou résultats obtenus suite à l'utilisation de ces
              informations.
            </P>
            <P>
              Les liens hypertextes présents sur ce site peuvent renvoyer vers
              d'autres sites internet. LX Studio décline toute responsabilité quant
              au contenu de ces sites tiers.
            </P>
          </Section>

          <Section title="Protection des données personnelles">
            <P>
              Conformément à la Loi fédérale sur la protection des données (nLPD,
              entrée en vigueur le 1er septembre 2023), LX Studio s'engage à
              protéger les données personnelles de ses utilisateurs.
            </P>
            <P>
              Pour plus de détails sur le traitement de vos données, consultez
              notre{" "}
              <a
                href="/politique-de-confidentialite"
                style={{ color: "#4b7cc9", textDecoration: "none" }}
              >
                Politique de confidentialité
              </a>
              .
            </P>
          </Section>

          <Section title="Cookies">
            <P>
              Ce site n'utilise aucun cookie de tracking ni cookie publicitaire. Seuls
              des cookies strictement nécessaires au fonctionnement technique du site
              peuvent être utilisés.
            </P>
          </Section>

          <Section title="Droit applicable et juridiction">
            <P>
              Le présent site et ses mentions légales sont soumis au droit suisse.
              En cas de litige, les tribunaux de Genève seront seuls compétents.
            </P>
          </Section>

          <P style={{ marginTop: "1rem", fontSize: "0.75rem" }}>
            Dernière mise à jour : mai 2026
          </P>
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
