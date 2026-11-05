import { createFileRoute } from "@tanstack/react-router";
import { IaPage } from "@/components/ia/Shell";
import { SITE } from "@/content/ia/en/site";
import { pageMeta, jsonLd, webPage, breadcrumbs } from "@/lib/seo";

const SEO = {
  path: "/en/privacy-policy",
  title: "Privacy policy | LX Studio",
  description:
    "What data this site collects, why, for how long, and your rights. Designed to comply with the Swiss Federal Act on Data Protection.",
} as const;

export const Route = createFileRoute("/en/privacy-policy")({
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
            { name: "Privacy policy", path: "/en/privacy-policy" },
          ]),
        ]),
      ],
    };
  },
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <IaPage>
      <section className="ia-plain">
        <div className="ia-container">
          <article className="ia-article">
            <h1>Privacy policy</h1>
            <p className="is-meta">
              Designed to comply with the Swiss Federal Act on Data Protection (FADP, revised in
              2023). Last updated: 05.11.2026
            </p>

            <h2>1. Data controller</h2>
            <p>
              <strong>LX Studio</strong>, {SITE.founder}
              <br />
              {SITE.address.street ? `${SITE.address.street}, ` : ""}
              {SITE.address.zip} {SITE.address.city}, {SITE.address.country}
              <br />
              Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>

            <h2>2. Data collected</h2>
            <p>
              This site collects personal data through two forms, and only when you fill them in:
            </p>
            <ul>
              <li>
                <strong>Diagnostic request:</strong> name, company, email, telephone, number of
                employees, description of the task, originating page.
              </li>
              <li>
                <strong>Security dossier:</strong> name, company, email, originating page.
              </li>
            </ul>
            <p>
              Site traffic is measured without cookies and without any personal identifier
              (Plausible Analytics, data aggregated per page). No advertising pixel, no cross-site
              tracking.
            </p>

            <h2>3. Purposes</h2>
            <ul>
              <li>To respond to your diagnostic request and prepare the conversation.</li>
              <li>To send you the security dossier and answer your questions about it.</li>
              <li>
                To contact you again about installing an AI in your company, if you have asked for
                it.
              </li>
            </ul>
            <p>
              Your data is neither sold, nor rented, nor passed on to third parties for prospecting
              purposes.
            </p>

            <h2>4. Basis for processing</h2>
            <p>
              Processing is based on your consent, given by ticking the box on the form, and on the
              performance of the pre-contractual steps you request. You can withdraw your consent at
              any time by writing to {SITE.email}.
            </p>

            <h2>5. Where the form data goes</h2>
            <p>
              Each form is sent to the site's server, which forwards it by email to {SITE.email}{" "}
              through an email delivery provider. The site keeps no database: the message received
              is the only record. The delivery provider is Resend (Resend, Inc.), which only
              receives the content of the message in order to deliver it.
            </p>
            <p>
              <strong>The system installed at clients' premises is separate from this site:</strong>{" "}
              the documents processed by the AI stay on the machine installed in their offices and
              do not pass through this site or LX Studio. The Security page describes how this
              works.
            </p>

            <h2>6. Retention period</h2>
            <p>
              Requests are kept for no more than 24 months after the last exchange, unless a
              contractual relationship exists, in which case the documents are kept in accordance
              with Swiss legal obligations (10 years for accounting records).
            </p>

            <h2>7. Your rights</h2>
            <ul>
              <li>
                <strong>Access:</strong> to know whether data concerning you is being processed and
                to receive a copy of it.
              </li>
              <li>
                <strong>Rectification:</strong> to correct inaccurate or incomplete data.
              </li>
              <li>
                <strong>Erasure:</strong> to request the deletion of your data.
              </li>
              <li>
                <strong>Data portability:</strong> to receive your data in a commonly used format.
              </li>
              <li>
                <strong>Objection:</strong> to object to the processing.
              </li>
            </ul>
            <p>
              To exercise these rights, write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              Reply within 30 days.
            </p>

            <h2>8. Security</h2>
            <p>
              The site is served over HTTPS with security headers (HSTS, protection against framing,
              referrer policy). Forms are validated server-side and protected against automated
              submissions.
            </p>

            <h2>9. Cookies</h2>
            <p>
              This site sets no tracking, advertising or analytics cookies. No banner is therefore
              required.
            </p>

            <h2>10. Supervisory authority</h2>
            <p>
              In the event of a dispute, you can contact the Federal Data Protection and Information
              Commissioner (FDPIC), Feldeggweg 1, 3003 Bern,{" "}
              <a href="https://www.edoeb.admin.ch/" target="_blank" rel="noopener noreferrer">
                edoeb.admin.ch
              </a>
              .
            </p>

            <h2>11. Changes</h2>
            <p>
              This policy may be updated. The date of the latest version is shown at the top of the
              page.
            </p>
          </article>
        </div>
      </section>
    </IaPage>
  );
}
