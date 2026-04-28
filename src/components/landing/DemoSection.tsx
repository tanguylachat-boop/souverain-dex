import { useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// TODO: remplacer par votre vraie URL cal.com
const CAL_URL = "https://cal.com/your-handle/demo-fiduciaire";

const ROMANDS = [
  { value: "GE", label: "Genève" },
  { value: "VD", label: "Vaud" },
  { value: "VS", label: "Valais" },
  { value: "FR", label: "Fribourg" },
  { value: "NE", label: "Neuchâtel" },
  { value: "JU", label: "Jura" },
  { value: "BE", label: "Berne" },
];

const AUTRES = [
  ["ZH", "Zurich"], ["LU", "Lucerne"], ["UR", "Uri"], ["SZ", "Schwytz"],
  ["OW", "Obwald"], ["NW", "Nidwald"], ["GL", "Glaris"], ["ZG", "Zoug"],
  ["SO", "Soleure"], ["BS", "Bâle-Ville"], ["BL", "Bâle-Campagne"],
  ["SH", "Schaffhouse"], ["AR", "Appenzell Rh.-Ext."], ["AI", "Appenzell Rh.-Int."],
  ["SG", "Saint-Gall"], ["GR", "Grisons"], ["AG", "Argovie"], ["TG", "Thurgovie"],
  ["TI", "Tessin"],
].map(([value, label]) => ({ value, label }));

const schema = z.object({
  prenom: z.string().trim().min(1, "Prénom requis").max(60),
  nom: z.string().trim().min(1, "Nom requis").max(60),
  cabinet: z.string().trim().min(1, "Cabinet requis").max(120),
  email: z.string().trim().email("Email invalide").max(160),
  telephone: z
    .string()
    .trim()
    .min(7, "Téléphone trop court")
    .max(25)
    .regex(/^[+0-9 ()./-]+$/, "Caractères invalides"),
  canton: z.string().min(2, "Canton requis"),
});

export function DemoSection() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values = {
      prenom: String(fd.get("prenom") ?? ""),
      nom: String(fd.get("nom") ?? ""),
      cabinet: String(fd.get("cabinet") ?? ""),
      email: String(fd.get("email") ?? ""),
      telephone: String(fd.get("telephone") ?? ""),
      canton: String(fd.get("canton") ?? ""),
    };
    const result = schema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const params = new URLSearchParams({
      name: `${result.data.prenom} ${result.data.nom}`,
      email: result.data.email,
      "metadata[cabinet]": result.data.cabinet,
      "metadata[telephone]": result.data.telephone,
      "metadata[canton]": result.data.canton,
    });
    window.open(`${CAL_URL}?${params.toString()}`, "_blank", "noopener,noreferrer");
    setSubmitting(false);
  };

  return (
    <section id="demo" className="py-20 md:py-28 bg-surface border-t border-border">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-medium tracking-[0.15em] text-primary uppercase mb-4">Réserver</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
            Voyez ce que l'IA peut faire pour votre cabinet — en 20 minutes.
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            Démo personnalisée sur vos cas d'usage. Sans engagement, sans pitch commercial.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-12 rounded-xl border border-border bg-background p-6 md:p-8 shadow-sm"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field id="prenom" label="Prénom" error={errors.prenom}>
              <Input id="prenom" name="prenom" autoComplete="given-name" maxLength={60} required />
            </Field>
            <Field id="nom" label="Nom" error={errors.nom}>
              <Input id="nom" name="nom" autoComplete="family-name" maxLength={60} required />
            </Field>
            <Field id="cabinet" label="Cabinet" error={errors.cabinet} className="sm:col-span-2">
              <Input id="cabinet" name="cabinet" autoComplete="organization" maxLength={120} required />
            </Field>
            <Field id="email" label="Email professionnel" error={errors.email}>
              <Input id="email" name="email" type="email" autoComplete="email" maxLength={160} required />
            </Field>
            <Field id="telephone" label="Téléphone" error={errors.telephone}>
              <Input id="telephone" name="telephone" type="tel" autoComplete="tel" maxLength={25} placeholder="+41 ..." required />
            </Field>
            <Field id="canton" label="Canton" error={errors.canton} className="sm:col-span-2">
              <Select name="canton">
                <SelectTrigger id="canton" className="w-full">
                  <SelectValue placeholder="Sélectionnez un canton" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Suisse romande</SelectLabel>
                    {ROMANDS.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Autres cantons</SelectLabel>
                    {AUTRES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-8 w-full inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {submitting ? "Ouverture du calendrier…" : "Réserver une démo"}
          </button>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Conforme LPD et secret professionnel suisse
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  children,
  error,
  className = "",
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="text-sm font-medium text-foreground mb-1.5 block">
        {label}
      </Label>
      {children}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
