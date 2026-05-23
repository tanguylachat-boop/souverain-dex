import { Reveal } from "@/hooks/use-scroll-reveal";

const STEPS = [
  {
    title: "Le document arrive",
    body: "Mail, scan, photo de facture — l'agent capte chaque pièce dès son entrée dans votre système.",
  },
  {
    title: "Extraction & classification",
    body: "L'agent extrait les données, comprend le contexte et classifie automatiquement par client et par type.",
  },
  {
    title: "Renommage & rangement",
    body: "Chaque fichier est renommé et déposé selon vos conventions. Vos dossiers restent impeccables.",
  },
  {
    title: "Relances automatisées",
    body: "TVA, pièces manquantes, échéances : les relances clients partent au bon moment, signées par votre cabinet.",
  },
];

export function SolutionSection() {
  return (
    <section id="solution" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.15em] text-primary uppercase mb-4">La solution</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
              Un agent IA qui apprend votre process, en local sur votre infra.
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Un pipeline simple, déployé sur un Mac mini dédié installé chez vous. Aucune donnée ne sort.
            </p>
          </div>
        </Reveal>

        <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={0.1 + i * 0.12}>
              <li className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-light text-primary tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 h-px bg-border" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
