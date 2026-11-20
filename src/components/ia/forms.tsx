import { useState, type FormEvent, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Mesh } from "./Mesh";
import { IconArrow, IconDownload } from "./icons";
import { Eyebrow, Words } from "./text";
import { L, useContent } from "./lang";

/**
 * Les deux formulaires du site. La validation (zod) et l'appel serveur ne
 * sont chargés qu'au premier envoi : rien de tout cela ne pèse sur le
 * premier affichage de la page. Les libellés et messages viennent du contenu
 * de la langue affichée.
 */

type Status = "idle" | "sending" | "ok" | "error";

function readForm(form: HTMLFormElement): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of new FormData(form).entries()) {
    out[key] = typeof value === "string" ? value : "";
  }
  out.consent = (form.elements.namedItem("consent") as HTMLInputElement | null)?.checked === true;
  return out;
}

function Field({
  name,
  label,
  error,
  children,
  full,
}: {
  name: string;
  label: string;
  error?: string;
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <div className={`ia-field${full ? " is-full" : ""}`}>
      <label htmlFor={`f-${name}`}>{label}</label>
      {children}
      {error ? (
        <span id={`f-${name}-err`} role="alert" className="ia-field-err">
          {error}
        </span>
      ) : null}
    </div>
  );
}

/** La case de consentement : la fin du texte (« politique de confidentialité. ») devient le lien. */
function Consent({ text, error, id = "consent" }: { text: string; error?: string; id?: string }) {
  const { ui } = useContent();
  const tail = `${ui.privacyLink}.`;
  const body = text.endsWith(tail) ? text.slice(0, -tail.length) : `${text} `;
  return (
    <div className="ia-field is-full">
      <label className="ia-consent">
        <input
          type="checkbox"
          name="consent"
          id={`f-${id}`}
          aria-describedby={error ? `f-${id}-err` : undefined}
        />
        <span>
          {body}
          <L to={ui.paths.politique}>{ui.privacyLink}</L>.
        </span>
      </label>
      {error ? (
        <span id={`f-${id}-err`} role="alert" className="ia-field-err">
          {error}
        </span>
      ) : null}
    </div>
  );
}

function Honeypot({ id }: { id: string }) {
  const { ui } = useContent();
  return (
    <div className="ia-hp" aria-hidden="true">
      <label htmlFor={id}>{ui.honeypot}</label>
      <input id={id} name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Le formulaire de diagnostic.
 * ------------------------------------------------------------------------ */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { home, site, ui } = useContent();
  const { FORM } = home;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = { ...readForm(e.currentTarget), source: pathname };
    setStatus("sending");
    try {
      const [{ diagnosticSchema, fieldErrors }, { submitDiagnostic }] = await Promise.all([
        import("@/lib/forms"),
        import("@/lib/contact"),
      ]);
      const parsed = diagnosticSchema(ui.formErrors, FORM.sizes).safeParse(input);
      if (!parsed.success) {
        setErrors(fieldErrors(parsed.error));
        setStatus("idle");
        return;
      }
      setErrors({});
      const result = await submitDiagnostic({ data: parsed.data });
      // Sans prestataire d'envoi configuré, rien n'est parti : on le dit, avec le téléphone et l'e-mail.
      if (!result.delivered) throw new Error("message non remis");
      setStatus("ok");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "ok") {
    const href = site.bookingHref("");
    return (
      <div className="ia-form" role="status">
        <div className="ia-form-ok">
          <strong>{FORM.success.title}</strong>
          {FORM.success.text}
          {href ? (
            <div>
              <a className="ia-btn is-primary" href={href}>
                {FORM.success.cta}
                <IconArrow />
              </a>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <form
      className="ia-form"
      onSubmit={onSubmit}
      noValidate
      aria-describedby={status === "error" ? "form-error" : undefined}
    >
      <div className="ia-form-grid">
        <Field name="name" label={FORM.fields.name} error={errors.name}>
          <input
            id="f-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field name="company" label={FORM.fields.company} error={errors.company}>
          <input
            id="f-company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            aria-invalid={!!errors.company}
          />
        </Field>
        <Field name="email" label={FORM.fields.email} error={errors.email}>
          <input
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            aria-invalid={!!errors.email}
          />
        </Field>
        <Field name="phone" label={FORM.fields.phone} error={errors.phone}>
          <input
            id="f-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            aria-invalid={!!errors.phone}
          />
        </Field>
        <Field name="size" label={FORM.fields.size} error={errors.size} full>
          <select id="f-size" name="size" defaultValue="" required aria-invalid={!!errors.size}>
            <option value="" disabled>
              {ui.choose}
            </option>
            {FORM.sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field name="task" label={FORM.fields.task} error={errors.task} full>
          <textarea
            id="f-task"
            name="task"
            placeholder={FORM.fields.taskPlaceholder}
            required
            aria-invalid={!!errors.task}
          />
        </Field>
        <Consent text={FORM.consent} error={errors.consent} />
      </div>
      <Honeypot id="f-website" />
      {status === "error" ? (
        <p id="form-error" className="ia-form-err" role="alert">
          {FORM.error}
        </p>
      ) : null}
      <button type="submit" className="ia-btn is-primary" disabled={status === "sending"}>
        {status === "sending" ? FORM.sending : FORM.submit}
        <IconArrow />
      </button>
    </form>
  );
}

/* --------------------------------------------------------------------------
 * Le panneau d'appel, avec le formulaire dedans.
 * ------------------------------------------------------------------------ */
export function CtaPanel({ title, text }: { title?: string; text?: string }) {
  const { home, site, ui } = useContent();
  const { FORM } = home;
  const { SITE } = site;
  const booking = site.bookingHref("");
  return (
    <section className="ia-cta-wrap" id={FORM.id} aria-labelledby="cta-title">
      <div className="ia-container">
        <div className="ia-cta ia-night" data-rv="">
          <Mesh intensity={0.9} />
          <div className="ia-cta-overlay" aria-hidden="true" />
          <div className="ia-cta-in">
            <div>
              <Eyebrow>{FORM.eyebrow}</Eyebrow>
              <Words as="h2" id="cta-title" className="ia-cta-title" text={title ?? FORM.title} />
              <p className="ia-cta-text" data-rv="">
                {text ?? FORM.text}
              </p>
              <div className="ia-cta-side" data-rv="">
                <span>
                  {ui.byPhone} <a href={SITE.phoneHref}>{SITE.phone}</a>
                </span>
                <span>
                  {ui.byEmail} <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </span>
                {booking ? (
                  <span>
                    {ui.inCalendar} <a href={booking}>{FORM.success.cta}</a>
                  </span>
                ) : null}
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
 * Le dossier sécurité : trois champs, puis le PDF s'ouvre et part par mail.
 * ------------------------------------------------------------------------ */
export function DossierCard() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mailed, setMailed] = useState(true);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { home, securite, ui } = useContent();
  const { SECURITE_DOSSIER, SECURITE_VERSION } = securite;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = { ...readForm(e.currentTarget), source: pathname };
    setStatus("sending");
    try {
      const [{ dossierSchema, fieldErrors }, { requestDossier }] = await Promise.all([
        import("@/lib/forms"),
        import("@/lib/contact"),
      ]);
      const parsed = dossierSchema(ui.formErrors).safeParse(input);
      if (!parsed.success) {
        setErrors(fieldErrors(parsed.error));
        setStatus("idle");
        return;
      }
      setErrors({});
      const result = await requestDossier({ data: parsed.data });
      setMailed(result.delivered);
      setStatus("ok");
      window.open(result.file, "_blank", "noopener");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <section className="ia-dossier-wrap" id="dossier" aria-labelledby="dossier-title">
      <div className="ia-container">
        <div className="ia-dossier" data-rv="">
          <div>
            <Eyebrow>{SECURITE_DOSSIER.eyebrow}</Eyebrow>
            <h2 id="dossier-title" style={{ marginTop: 16 }}>
              {SECURITE_DOSSIER.title}
            </h2>
            <p>{SECURITE_DOSSIER.text}</p>
            <p className="ia-dossier-meta">
              {ui.dossierVersion(SECURITE_VERSION.version, SECURITE_VERSION.date)}
            </p>
          </div>
          {status === "ok" ? (
            <div className="ia-form-ok" role="status">
              <strong>{SECURITE_DOSSIER.success.title}</strong>
              {mailed ? SECURITE_DOSSIER.success.text : SECURITE_DOSSIER.success.textNoMail}
              <div>
                <a
                  className="ia-btn is-primary"
                  href={SECURITE_VERSION.file}
                  target="_blank"
                  rel="noopener"
                >
                  <IconDownload />
                  {SECURITE_DOSSIER.success.link}
                </a>
              </div>
            </div>
          ) : (
            <form className="ia-form" onSubmit={onSubmit} noValidate>
              <div className="ia-form-grid">
                <Field name="d-name" label={SECURITE_DOSSIER.fields.name} error={errors.name}>
                  <input
                    id="f-d-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={!!errors.name}
                  />
                </Field>
                <Field
                  name="d-company"
                  label={SECURITE_DOSSIER.fields.company}
                  error={errors.company}
                >
                  <input
                    id="f-d-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    required
                    aria-invalid={!!errors.company}
                  />
                </Field>
                <Field
                  name="d-email"
                  label={SECURITE_DOSSIER.fields.email}
                  error={errors.email}
                  full
                >
                  <input
                    id="f-d-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    aria-invalid={!!errors.email}
                  />
                </Field>
                <Consent text={SECURITE_DOSSIER.consent} error={errors.consent} id="d-consent" />
              </div>
              <Honeypot id="f-d-website" />
              {status === "error" ? (
                <p className="ia-form-err" role="alert">
                  {SECURITE_DOSSIER.error}
                </p>
              ) : null}
              <button type="submit" className="ia-btn is-primary" disabled={status === "sending"}>
                <IconDownload />
                {status === "sending" ? home.FORM.sending : SECURITE_DOSSIER.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/** Le bouton vers le dossier, pour les pages et les réponses de la FAQ. */
export function DossierButton({ local = false }: { local?: boolean }) {
  const { securite, ui } = useContent();
  const label = securite.SECURITE_DOSSIER.button;
  return local ? (
    <a className="ia-btn is-glass" href="#dossier" data-magnetic="">
      <IconDownload />
      {label}
    </a>
  ) : (
    <L to={ui.paths.securite} hash="dossier" className="ia-btn is-glass" data-magnetic="">
      <IconDownload />
      {label}
    </L>
  );
}
