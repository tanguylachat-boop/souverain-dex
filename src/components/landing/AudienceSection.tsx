const PROFILES = [
  {
    label: "Cabinets structurés",
    body: "Cabinets de 5 à 15 collaborateurs avec un portefeuille de 50 à 150 clients PME.",
  },
  {
    label: "Clientèle sensible",
    body: "Fiduciaires accompagnant avocats, médecins, successions, holdings — où la confidentialité est non-négociable.",
  },
  {
    label: "Cloud refusé",
    body: "Cabinets qui ont déjà étudié les solutions cloud puis renoncé parce que les serveurs étaient à l'étranger.",
  },
];

export function AudienceSection() {
  return (
    <section id="pour-qui" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.15em] text-primary uppercase mb-4">Pour qui</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
            Pensé pour les fiduciaires qui ne veulent pas de compromis sur la souveraineté.
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {PROFILES.map((p, i) => (
            <article
              key={p.label}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <p className="text-sm font-mono text-muted-foreground mb-3">0{i + 1}</p>
              <h3 className="text-base font-semibold text-foreground mb-2">{p.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
