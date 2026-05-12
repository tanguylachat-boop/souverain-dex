import { ProductMockup } from "./ProductMockup";
import swissHardware from "@/assets/swiss-hardware.jpg";

export function Hero() {
  return (
    <section
      id="top"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 mesh-bg overflow-hidden"
    >
      {/* 3D ambient blobs */}
      <div
        className="blob animate-float-slow"
        style={{
          top: "-6rem",
          left: "-6rem",
          width: "28rem",
          height: "28rem",
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.55 0.12 250 / 0.55), transparent 60%)",
        }}
      />
      <div
        className="blob animate-float-slow"
        style={{
          top: "10rem",
          right: "-8rem",
          width: "32rem",
          height: "32rem",
          animationDelay: "2s",
          background:
            "radial-gradient(circle at 70% 30%, oklch(0.7 0.08 250 / 0.45), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 grid-pattern opacity-60 pointer-events-none"
      />

      <div className="relative mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground mb-6">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
            Pour les fiduciaires suisses
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-semibold leading-[1.1] text-gradient">
            L'IA qui scanne, classe et automatise vos documents — sans jamais quitter votre cabinet.
          </h1>

          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
            Conçu pour les fiduciaires suisses qui placent le secret professionnel au-dessus de tout.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-depth hover:translate-y-[-1px] hover:bg-primary/90 transition-all duration-200"
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
            Conforme nLPD · Hébergé dans votre cabinet · Sans cloud externe
          </p>
        </div>

        <div className="lg:pl-8 space-y-4 [perspective:1200px]">
          <div
            className="aspect-[4/3] overflow-hidden rounded-2xl glass shadow-depth"
            style={{
              transform: "rotateX(6deg) rotateY(-8deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <img
              src={swissHardware}
              alt="Boîtier d'agent IA souverain installé dans un cabinet fiduciaire en Suisse romande"
              width={1280}
              height={896}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            style={{
              transform: "rotateX(4deg) rotateY(6deg)",
              transformStyle: "preserve-3d",
            }}
            className="rounded-2xl glass shadow-depth p-2"
          >
            <ProductMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
