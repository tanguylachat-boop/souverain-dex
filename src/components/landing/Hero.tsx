import { ProductMockup } from "./ProductMockup";
import swissHardware from "@/assets/swiss-hardware.jpg";

export function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground mb-6">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
            Pour les fiduciaires suisses
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-semibold leading-[1.1] text-foreground">
            L'IA qui scanne, classe et automatise vos documents — sans jamais quitter votre cabinet.
          </h1>

          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
            Conçu pour les fiduciaires suisses qui placent le secret professionnel au-dessus de tout.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Demander une démo de 20 minutes
            </a>
            <a
              href="#solution"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Voir comment ça fonctionne
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            Conforme LPD · Hébergé dans votre cabinet · Sans cloud externe
          </p>
        </div>

        <div className="lg:pl-8 space-y-4">
          <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border shadow-md">
            <img
              src={swissHardware}
              alt="Boîtier dédié installé dans un cabinet fiduciaire suisse, vue sur le lac et les Alpes"
              width={1280}
              height={896}
              className="w-full h-full object-cover"
            />
          </div>
          <ProductMockup />
        </div>
      </div>
    </section>
  );
}
