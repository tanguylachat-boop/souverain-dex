const TESTIMONIALS = [
  {
    quote:
      "Nos clients — avocats, médecins, holdings — exigent que rien ne sorte. Avec cet agent, je peux enfin automatiser sans trahir cette promesse.",
    name: "M. Berger",
    role: "Associé, fiduciaire — Genève",
  },
  {
    quote:
      "Installation en une matinée. Dès la deuxième semaine, mes collaborateurs avaient récupéré une journée par personne. Le ROI s'est imposé seul.",
    name: "Mme Délèze",
    role: "Directrice, fiduciaire — Lausanne",
  },
  {
    quote:
      "Avant de signer, j'ai fait auditer le boîtier par notre prestataire IT. Verdict : aucun trafic sortant. Exactement ce qu'on m'avait promis.",
    name: "M. Roduit",
    role: "Expert-comptable diplômé — Sion",
  },
];

const STATS = [
  { value: "12h", label: "économisées par collaborateur / semaine" },
  { value: "0", label: "donnée transmise hors du cabinet" },
  { value: "100%", label: "hébergé sur votre LAN, en Suisse" },
  { value: "< 1 j", label: "d'installation sur site" },
];

const CANTONS = ["Genève", "Vaud", "Valais", "Fribourg", "Neuchâtel", "Jura", "Berne"];

export function SocialProofSection() {
  return (
    <section id="confiance" className="py-20 md:py-28 bg-surface border-y border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.15em] text-primary uppercase mb-4">
            La confiance des fiduciaires romandes
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
            Adopté par des cabinets qui ne transigent pas avec la confidentialité.
          </h2>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden border border-border">
          {STATS.map((s) => (
            <div key={s.label} className="bg-background p-6 md:p-8">
              <div className="text-3xl md:text-4xl font-semibold text-foreground tabular-nums">
                {s.value}
              </div>
              <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="rounded-lg border border-border bg-background p-6 md:p-7 flex flex-col"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                className="text-primary mb-4 opacity-70"
                aria-hidden
              >
                <path
                  d="M7 7h4v4H7c0 3 1 5 4 6v2c-5-1-7-4-7-9V7zm9 0h4v4h-4c0 3 1 5 4 6v2c-5-1-7-4-7-9V7z"
                  fill="currentColor"
                />
              </svg>
              <blockquote className="text-sm text-foreground leading-relaxed flex-1">
                « {t.quote} »
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-border">
                <div className="text-sm font-semibold text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Cantons strip */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase text-center mb-5">
            Présent dans toute la Suisse romande
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {CANTONS.map((c) => (
              <li
                key={c}
                className="text-sm font-medium text-muted-foreground tracking-wide"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
