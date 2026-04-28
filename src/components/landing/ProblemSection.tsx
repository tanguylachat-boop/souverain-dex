const PAINS = [
  {
    title: "Tri manuel des documents",
    body: "Scan, renommage et classement des pièces reçues par mail ou par courrier — un travail à faible valeur ajoutée que vos collaborateurs subissent chaque jour.",
    icon: (
      <path d="M7 4h7l5 5v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z M14 4v5h5" />
    ),
  },
  {
    title: "Relances clients en boucle",
    body: "TVA, pièces manquantes, paiements en retard : les relances se font à la main, dans Outlook, sans suivi consolidé.",
    icon: (
      <path d="M4 6h16v10H7l-3 3V6z M8 10h8 M8 13h5" />
    ),
  },
  {
    title: "Saisie comptable répétitive",
    body: "Recopier des PDFs de qualité variable dans le logiciel comptable. Une perte de temps qui pèse sur la rentabilité de chaque mandat.",
    icon: (
      <path d="M5 4h14v16H5z M9 8h6 M9 12h6 M9 16h4" />
    ),
  },
];

export function ProblemSection() {
  return (
    <section id="probleme" className="py-20 md:py-28 bg-surface border-y border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.15em] text-primary uppercase mb-4">Le constat</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
            Vos collaborateurs perdent 10 à 15 heures par semaine sur des tâches qui devraient être automatiques.
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {PAINS.map((p) => (
            <article
              key={p.title}
              className="rounded-lg border border-border bg-background p-6 transition-colors hover:border-foreground/20"
            >
              <div className="w-10 h-10 rounded-md bg-surface border border-border flex items-center justify-center mb-5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                  {p.icon}
                </svg>
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
