import { Reveal } from "@/hooks/use-scroll-reveal";

const PROFILES = [
  {
    label: "Cabinets structures",
    body: "Cabinets de 5 a 15 collaborateurs avec un portefeuille de 50 a 150 clients PME.",
  },
  {
    label: "Clientele sensible",
    body: "Fiduciaires accompagnant avocats, medecins, successions, holdings — ou la confidentialite est non-negociable.",
  },
  {
    label: "Cloud refuse",
    body: "Cabinets qui ont deja etudie les solutions cloud puis renonce parce que les serveurs etaient a l'etranger.",
  },
];

export function AudienceSection() {
  return (
    <section id="pour-qui" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.15em] text-primary uppercase mb-4">Pour qui</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
              Pense pour les fiduciaires qui ne veulent pas de compromis sur la souverainete.
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {PROFILES.map((p, i) => (
            <Reveal key={p.label} delay={0.1 + i * 0.1}>
              <article
                className="rounded-lg border border-border bg-surface p-6 hover-lift h-full"
              >
                <p className="text-sm font-mono text-primary mb-3">0{i + 1}</p>
                <h3 className="text-base font-semibold text-foreground mb-2">{p.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
