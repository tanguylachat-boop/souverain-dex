import { createServerFn } from "@tanstack/react-start";
import { diagnosticSchema, dossierSchema } from "@/lib/forms";
import { SECURITE_VERSION } from "@/content/ia/securite";

/**
 * Les envois du site. Chaque demande part par e-mail à contact@lxstudio.ch
 * via l'API de Resend quand `RESEND_API_KEY` et `MAIL_FROM` sont définis.
 * Sans ces variables (aperçu, build local), l'envoi est simulé et journalisé,
 * et l'appelant reçoit `delivered: false` pour le dire honnêtement.
 *
 * Rien n'est stocké : pas de base, pas de fichier. Le mail est la trace.
 */

const SITE_URL = "https://lxstudio.ch";
const TO = "contact@lxstudio.ch";

type Mail = { to: string; subject: string; text: string; replyTo?: string };

function env(name: string): string | undefined {
  const value = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
    ?.env?.[name];
  return value && value.length > 0 ? value : undefined;
}

async function send(mail: Mail): Promise<{ delivered: boolean }> {
  const key = env("RESEND_API_KEY");
  const from = env("MAIL_FROM");
  if (!key || !from) {
    console.info("[mail simulé]", mail.subject, "→", mail.to);
    return { delivered: false };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [mail.to],
      subject: mail.subject,
      text: mail.text,
      reply_to: mail.replyTo,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${detail.slice(0, 200)}`);
  }
  return { delivered: true };
}

const stamp = () =>
  new Intl.DateTimeFormat("fr-CH", {
    timeZone: "Europe/Zurich",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

export const submitDiagnostic = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => diagnosticSchema.parse(input))
  .handler(async ({ data }) => {
    // Le piège à robots est rempli : on répond comme si tout allait bien,
    // sans rien envoyer.
    if (data.website) return { ok: true as const, delivered: false };
    const text = [
      `Demande de diagnostic reçue le ${stamp()} depuis ${SITE_URL}${data.source ?? "/"}`,
      "",
      `Nom : ${data.name}`,
      `Entreprise : ${data.company}`,
      `E-mail : ${data.email}`,
      `Téléphone : ${data.phone}`,
      `Collaborateurs : ${data.size}`,
      "",
      "Tâche qui prend le plus de temps :",
      data.task,
    ].join("\n");
    const { delivered } = await send({
      to: TO,
      subject: `Diagnostic : ${data.company} (${data.size})`,
      text,
      replyTo: data.email,
    });
    return { ok: true as const, delivered };
  });

export const requestDossier = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => dossierSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const, delivered: false, file: SECURITE_VERSION.file };
    const link = `${SITE_URL}${SECURITE_VERSION.file}`;
    const [notice, copy] = await Promise.all([
      send({
        to: TO,
        subject: `Dossier sécurité demandé : ${data.company}`,
        text: [
          `Demande du dossier sécurité (version ${SECURITE_VERSION.version} du ${SECURITE_VERSION.date}) reçue le ${stamp()} depuis ${SITE_URL}${data.source ?? "/securite"}`,
          "",
          `Nom : ${data.name}`,
          `Entreprise : ${data.company}`,
          `E-mail : ${data.email}`,
        ].join("\n"),
        replyTo: data.email,
      }),
      send({
        to: data.email,
        subject: "Votre dossier sécurité LX Studio",
        text: [
          `Bonjour ${data.name},`,
          "",
          `Voici le dossier sécurité de LX Studio, version ${SECURITE_VERSION.version} du ${SECURITE_VERSION.date} :`,
          link,
          "",
          "Il décrit où tournent les données, l'architecture, le chiffrement, les accès, les sauvegardes, les mises à jour, la fin de contrat et le cadre légal. Pour toute question, répondez simplement à ce message.",
          "",
          "Tanguy Lachat",
          "LX Studio, Bassecourt",
          "078 703 88 00",
        ].join("\n"),
        replyTo: TO,
      }),
    ]);
    return {
      ok: true as const,
      delivered: notice.delivered && copy.delivered,
      file: SECURITE_VERSION.file,
    };
  });
