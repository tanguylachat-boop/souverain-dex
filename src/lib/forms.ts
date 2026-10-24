import { z } from "zod";
import { FORM } from "@/content/ia/home";

/**
 * Les deux formulaires du site, validés avec le même schéma côté client
 * (messages immédiats) et côté serveur (la seule validation qui compte).
 * Le champ `website` est un piège à robots : un humain ne le voit pas et ne
 * le remplit pas.
 */

const trimmed = (max: number) => z.string().trim().max(max);

export const diagnosticSchema = z.object({
  name: trimmed(120).min(2, "Indiquez votre nom."),
  company: trimmed(160).min(2, "Indiquez le nom de votre entreprise."),
  email: trimmed(200).email("Indiquez une adresse e-mail valide."),
  phone: trimmed(40).min(6, "Indiquez un numéro de téléphone."),
  size: z.enum(FORM.sizes, { errorMap: () => ({ message: "Choisissez une taille d'équipe." }) }),
  task: trimmed(2000).min(10, "Décrivez la tâche en quelques mots."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Votre accord est nécessaire pour traiter la demande." }),
  }),
  website: z.string().max(0).optional(),
  source: trimmed(200).optional(),
});
export type DiagnosticInput = z.infer<typeof diagnosticSchema>;

export const dossierSchema = z.object({
  name: trimmed(120).min(2, "Indiquez votre nom."),
  company: trimmed(160).min(2, "Indiquez le nom de votre entreprise."),
  email: trimmed(200).email("Indiquez une adresse e-mail valide."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Votre accord est nécessaire pour recevoir le dossier." }),
  }),
  website: z.string().max(0).optional(),
  source: trimmed(200).optional(),
});
export type DossierInput = z.infer<typeof dossierSchema>;

/** Les erreurs d'un schéma, par champ, pour l'affichage. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
