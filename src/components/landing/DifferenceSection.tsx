import { Reveal } from "@/hooks/use-scroll-reveal";

const ROWS = [
  { label: "Localisation des donnees", cloud: "Datacenter externe (meme en Suisse)", us: "Disque dur de votre Mac mini, dans votre cabinet" },
  { label: "Hebergement", cloud: "Serveurs partages multi-clients", us: "Hardware dedie, mono-cabinet" },
  { label: "Sortie reseau", cloud: "Permanente vers le cloud du fournisseur", us: "Aucune — l'IA tourne sur votre LAN" },
  { label: "Conformite secret professionnel", cloud: "Sous conditions contractuelles", us: "Maximale — vous gardez le controle physique" },
];

export function DifferenceSection() {
  return (
    <section id="difference" className="py-20 md:py-28 bg-surface border-y border-border">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.15em] text-primary uppercase mb-4">Ce qui change</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
              Cloud Suisse, cloud etranger — et nous.
            </h2>
          </div>
        </Reveal>

        {/* Desktop table */}
        <Reveal delay={0.15}>
          <div className="mt-12 hidden md:block rounded-lg border border-border bg-background overflow-hidden">
            <div className="grid grid-cols-3 text-xs font-medium tracking-[0.1em] uppercase text-muted-foreground border-b border-border">
              <div className="px-6 py-4">Critere</div>
              <div className="px-6 py-4 border-l border-border">Sequence ERP, Pennylane, Accounto...</div>
              <div className="px-6 py-4 border-l border-border bg-primary/[0.04] text-primary">Notre solution</div>
            </div>
            {ROWS.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-3 text-sm ${i !== ROWS.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="px-6 py-5 font-medium text-foreground">{row.label}</div>
                <div className="px-6 py-5 border-l border-border text-muted-foreground">{row.cloud}</div>
                <div className="px-6 py-5 border-l border-border bg-primary/[0.04] text-foreground">{row.us}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Mobile cards */}
        <div className="mt-10 md:hidden space-y-4">
          {ROWS.map((row, i) => (
            <Reveal key={row.label} delay={0.1 + i * 0.08}>
              <div className="rounded-lg border border-border bg-background p-5">
                <p className="text-xs font-medium tracking-[0.1em] uppercase text-muted-foreground mb-3">{row.label}</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Solutions cloud</p>
                    <p className="text-foreground">{row.cloud}</p>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-primary mb-1 font-medium">Notre solution</p>
                    <p className="text-foreground">{row.us}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-12 text-2xl md:text-3xl font-semibold text-foreground text-center max-w-3xl mx-auto leading-snug">
            Vos donnees restent chez vous.{" "}
            <span className="text-primary">Votre IA aussi.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
