import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { FORM } from "@/content/ia/home";
import { SITE, bookingHref } from "@/content/ia/site";
import { SECURITE_DOSSIER, SECURITE_VERSION } from "@/content/ia/securite";
import { Mesh } from "./Mesh";
import { IconArrow, IconDownload } from "./icons";
import { Eyebrow, T, Words } from "./text";

/**
 * Les deux formulaires du site. La validation (zod) et l'appel serveur ne
 * sont chargés qu'au premier envoi : rien de tout cela ne pèse sur le
 * premier affichage de la page.
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

function Consent({ text, error, id = "consent" }: { text: string; error?: string; id?: string }) {
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
          {text.replace("politique de confidentialité.", "")}
          <Link to="/politique-de-confidentialite">politique de confidentialité</Link>.
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
  return (
    <div className="ia-hp" aria-hidden="true">
      <label htmlFor={id}>Votre site</label>
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

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = { ...readForm(e.currentTarget), source: pathname };
    setStatus("sending");
    try {
      const [{ diagnosticSchema, fieldErrors }, { submitDiagnostic }] = await Promise.all([
        import("@/lib/forms"),
        import("@/lib/contact"),
      ]);
      const parsed = diagnosticSchema.safeParse(input);
      if (!parsed.success) {
        setErrors(fieldErrors(parsed.error));
        setStatus("idle");
        return;
      }
      setErrors({});
      await submitDiagnostic({ data: parsed.data });
      setStatus("ok");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "ok") {
    const href = bookingHref("");
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
          ) : (
            <div style={{ marginTop: 12 }}>
              <mark className="ia-placeholder">{SITE.booking}</mark>
            </div>
          )}
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
              Choisir
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
export function CtaPanel({
  title = FORM.title,
  text = FORM.text,
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="ia-cta-wrap" id={FORM.id} aria-labelledby="cta-title">
      <div className="ia-container">
        <div className="ia-cta ia-night" data-rv="">
          <Mesh intensity={0.9} />
          <div className="ia-cta-overlay" aria-hidden="true" />
          <div className="ia-cta-in">
            <div>
              <Eyebrow>{FORM.eyebrow}</Eyebrow>
              <Words as="h2" id="cta-title" className="ia-cta-title" text={title} />
              <p className="ia-cta-text" data-rv="">
                {text}
              </p>
              <div className="ia-cta-side" data-rv="">
                <span>
                  Par téléphone : <a href={SITE.phoneHref}>{SITE.phone}</a>
                </span>
                <span>
                  Par e-mail : <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </span>
                <span>
                  En direct dans l'agenda : <T>{SITE.booking}</T>
                </span>
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = { ...readForm(e.currentTarget), source: pathname };
    setStatus("sending");
    try {
      const [{ dossierSchema, fieldErrors }, { requestDossier }] = await Promise.all([
        import("@/lib/forms"),
        import("@/lib/contact"),
      ]);
      const parsed = dossierSchema.safeParse(input);
      if (!parsed.success) {
        setErrors(fieldErrors(parsed.error));
        setStatus("idle");
        return;
      }
      setErrors({});
      const result = await requestDossier({ data: parsed.data });
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
              Version {SECURITE_VERSION.version} · {SECURITE_VERSION.date} · 4 pages
            </p>
          </div>
          {status === "ok" ? (
            <div className="ia-form-ok" role="status">
              <strong>{SECURITE_DOSSIER.success.title}</strong>
              {SECURITE_DOSSIER.success.text}
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
                {status === "sending" ? FORM.sending : SECURITE_DOSSIER.submit}
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
  return local ? (
    <a className="ia-btn is-glass" href="#dossier" data-magnetic="">
      <IconDownload />
      {SECURITE_DOSSIER.button}
    </a>
  ) : (
    <Link to="/securite" hash="dossier" className="ia-btn is-glass" data-magnetic="">
      <IconDownload />
      {SECURITE_DOSSIER.button}
    </Link>
  );
}
