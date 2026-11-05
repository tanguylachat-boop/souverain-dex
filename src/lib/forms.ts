import { z } from "zod";
import type { UiContent } from "@/content/ia/shape";

/**
 * Les deux formulaires du site, validés avec le même schéma côté client
 * (messages immédiats, dans la langue de la page) et côté serveur (la seule
 * validation qui compte). Le champ `website` est un piège à robots : un
 * humain ne le voit pas et ne le remplit pas.
 */

export type FormMessages = UiContent["UI"]["formErrors"];

const trimmed = (max: number) => z.string().trim().max(max);

export function diagnosticSchema(m: FormMessages, sizes: ReadonlyArray<string>) {
  return z.object({
    name: trimmed(120).min(2, m.name),
    company: trimmed(160).min(2, m.company),
    email: trimmed(200).email(m.email),
    phone: trimmed(40).min(6, m.phone),
    size: trimmed(40).refine((v) => sizes.includes(v), { message: m.size }),
    task: trimmed(2000).min(10, m.task),
    consent: z.literal(true, { errorMap: () => ({ message: m.consent }) }),
    website: z.string().max(0).optional(),
    source: trimmed(200).optional(),
  });
}
export type DiagnosticInput = z.infer<ReturnType<typeof diagnosticSchema>>;

export function dossierSchema(m: FormMessages) {
  return z.object({
    name: trimmed(120).min(2, m.name),
    company: trimmed(160).min(2, m.company),
    email: trimmed(200).email(m.email),
    consent: z.literal(true, { errorMap: () => ({ message: m.consentDossier }) }),
    website: z.string().max(0).optional(),
    source: trimmed(200).optional(),
  });
}
export type DossierInput = z.infer<ReturnType<typeof dossierSchema>>;

/** Les erreurs d'un schéma, par champ, pour l'affichage. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
