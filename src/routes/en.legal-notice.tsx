import { createFileRoute } from "@tanstack/react-router";
import { IaPage } from "@/components/ia/Shell";
import { L } from "@/components/ia/lang";
import { SITE } from "@/content/ia/en/site";
import { pageMeta, jsonLd, webPage, breadcrumbs } from "@/lib/seo";

const SEO = {
  path: "/en/legal-notice",
  title: "Legal notice | LX Studio",
  description:
    "Legal notice of LX Studio, on-premise artificial intelligence installation based in Bassecourt, Jura. Publisher, hosting, data protection.",
} as const;

export const Route = createFileRoute("/en/legal-notice")({
  head: () => {
    const { meta, links } = pageMeta(SEO);
    return {
      meta: [...meta, { name: "robots", content: "noindex, follow" }],
      links,
      scripts: [
        jsonLd([
          webPage(SEO),
          breadcrumbs([
            { name: "Home", path: "/en" },
            { name: "Legal notice", path: "/en/legal-notice" },
          ]),
        ]),
      ],
    };
  },
  component: LegalNotice,
});

function LegalNotice() {
  return (
    <IaPage>
      <section className="ia-plain">
        <div className="ia-container">
          <article className="ia-article">
            <h1>Legal notice</h1>
            <p className="is-meta">Last updated: 05.11.2026</p>

            <h2>Site publisher</h2>
            <p>
              <strong>LX Studio</strong>
              <br />
              Sole proprietorship, {SITE.founder}
              <br />
              {SITE.address.street ? `${SITE.address.street}, ` : ""}
              {SITE.address.zip} {SITE.address.city}, {SITE.address.country}
              <br />
              Telephone: <a href={SITE.phoneHref}>{SITE.phone}</a>
              <br />
              Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
            <p>
              UID number (Swiss business identification number): {SITE.ide}
              <br />
              {SITE.vat}
            </p>

            <h2>Hosting</h2>
            <p>
              This site is hosted by Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107,
              United States.
            </p>

            <h2>Intellectual property</h2>
            <p>
              All the content of this site (texts, illustrations, structure) is the property of LX
              Studio. The logos of the clients mentioned remain the property of their owners and are
              displayed with their consent. Any reproduction, even partial, without prior written
              authorisation is prohibited.
            </p>

            <h2>Liability</h2>
            <p>
              LX Studio endeavours to ensure the accuracy of the information published on this site.
              What is set on a case-by-case basis (quote, installation) is presented as such and
              does not constitute a commitment before signature. The legal information published is
              not legal advice.
            </p>
            <p>
              Links to other sites are provided for information purposes. LX Studio is not
              responsible for their content.
            </p>

            <h2>Data protection</h2>
            <p>
              The processing of personal data collected by this site is described in the{" "}
              <L to="/en/privacy-policy">privacy policy</L>. It is designed to comply with the Swiss
              Federal Act on Data Protection (FADP, revised in 2023), in force since 1 September
              2023.
            </p>

            <h2>Applicable law</h2>
            <p>
              This site and its legal notice are governed by Swiss law. Place of jurisdiction:{" "}
              {SITE.address.city}, canton of {SITE.address.region}.
            </p>
          </article>
        </div>
      </section>
    </IaPage>
  );
}
