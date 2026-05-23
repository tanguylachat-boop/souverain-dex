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
import { Reveal } from "@/hooks/use-scroll-reveal";

const CAL_URL = "https://cal.com/lx-studio/15min";
const LEADS_API = "https://command-center-iota-wheat.vercel.app/api/leads";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    // Persist lead to command-center BEFORE opening cal.com
    try {
      await fetch(LEADS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: result.data.email,
          name: `${result.data.prenom} ${result.data.nom}`,
          cabinet: result.data.cabinet,
          telephone: result.data.telephone,
          canton: result.data.canton,
          source: "demo_form",
        }),
      });
    } catch {
      // Non-blocking: persist best-effort, always open cal.com
    }

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
    <section
      id="demo"
      style={{
        position: "relative",
        padding: "8rem 0",
        background: "linear-gradient(180deg, #0a0a10 0%, #060608 50%, #0a0a10 100%)",
        overflow: "hidden",
      }}
    >
      {/* Accent line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
        }}
      />

      {/* Gradient orb */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "50vw",
          height: "50vw",
          maxWidth: "600px",
          maxHeight: "600px",
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(75, 124, 201, 0.06), transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "48rem",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: "36rem", margin: "0 auto" }}>
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "#4b7cc9",
                marginBottom: "1.25rem",
              }}
            >
              Réserver
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
            >
              Voyez ce que l'IA peut faire pour votre cabinet —{" "}
              <span style={{ color: "#4b7cc9" }}>en 20 minutes.</span>
            </h2>
            <p
              style={{
                marginTop: "1rem",
                fontSize: "1.0625rem",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.7,
              }}
            >
              Démo personnalisée sur vos cas d'usage. Sans engagement, sans pitch commercial.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{
              marginTop: "3rem",
              padding: "2rem",
              borderRadius: "1rem",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field id="prenom" label="Prénom" error={errors.prenom}>
                <Input
                  id="prenom"
                  name="prenom"
                  autoComplete="given-name"
                  maxLength={60}
                  required
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#ffffff",
                  }}
                />
              </Field>
              <Field id="nom" label="Nom" error={errors.nom}>
                <Input
                  id="nom"
                  name="nom"
                  autoComplete="family-name"
                  maxLength={60}
                  required
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#ffffff",
                  }}
                />
              </Field>
              <Field
                id="cabinet"
                label="Cabinet"
                error={errors.cabinet}
                className="sm:col-span-2"
              >
                <Input
                  id="cabinet"
                  name="cabinet"
                  autoComplete="organization"
                  maxLength={120}
                  required
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#ffffff",
                  }}
                />
              </Field>
              <Field id="email" label="Email professionnel" error={errors.email}>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={160}
                  required
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#ffffff",
                  }}
                />
              </Field>
              <Field id="telephone" label="Téléphone" error={errors.telephone}>
                <Input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={25}
                  placeholder="+41 ..."
                  required
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#ffffff",
                  }}
                />
              </Field>
              <Field
                id="canton"
                label="Canton"
                error={errors.canton}
                className="sm:col-span-2"
              >
                <Select name="canton">
                  <SelectTrigger
                    id="canton"
                    className="w-full"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#ffffff",
                    }}
                  >
                    <SelectValue placeholder="Sélectionnez un canton" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Suisse romande</SelectLabel>
                      {ROMANDS.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Autres cantons</SelectLabel>
                      {AUTRES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                marginTop: "2rem",
                width: "100%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.875rem 1.5rem",
                borderRadius: "0.375rem",
                background: "#ffffff",
                color: "#050507",
                fontSize: "0.875rem",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                transition: "opacity 0.2s",
                opacity: submitting ? 0.6 : 1,
              }}
            >
              {submitting ? "Ouverture du calendrier…" : "Réserver une démo"}
            </button>

            <p
              style={{
                marginTop: "1.25rem",
                textAlign: "center",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              Conforme LPD et secret professionnel suisse
            </p>
          </form>
        </Reveal>
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
      <Label
        htmlFor={id}
        style={{
          display: "block",
          fontSize: "0.8125rem",
          fontWeight: 500,
          color: "rgba(255,255,255,0.6)",
          marginBottom: "0.375rem",
        }}
      >
        {label}
      </Label>
      {children}
      {error && (
        <p style={{ marginTop: "0.375rem", fontSize: "0.75rem", color: "#ef4444" }}>
          {error}
        </p>
      )}
    </div>
  );
}
