import { ProductMockup } from "./ProductMockup";
import swissHardware from "@/assets/swiss-hardware.jpg";

export function Hero() {
  return (
    <section
      id="top"
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 mesh-bg overflow-hidden"
    >
      {/* Ambient 3D blobs */}
      <div
        aria-hidden
        className="blob animate-float-slow"
        style={{
          top: "-8rem",
          left: "-10rem",
          width: "32rem",
          height: "32rem",
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.55 0.12 250 / 0.45), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="blob animate-float-slow"
        style={{
          bottom: "-10rem",
          right: "-10rem",
          width: "36rem",
          height: "36rem",
          animationDelay: "3s",
          background:
            "radial-gradient(circle at 70% 30%, oklch(0.7 0.08 250 / 0.4), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 grid-pattern opacity-40 pointer-events-none"
      />

      <div className="relative mx-auto max-w-6xl px-6 grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        <div className="lg:col-span-6">
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

        {/* 3D stage — single composition, layered, no awkward dual rotations */}
        <div className="lg:col-span-6 relative">
          <div className="relative mx-auto w-full max-w-xl [perspective:1400px]">
            {/* Soft glow under the stage */}
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2rem] opacity-70 blur-2xl"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, color-mix(in oklab, var(--primary) 30%, transparent), transparent 70%)",
              }}
            />

            {/* Main hardware card */}
            <div
              className="relative rounded-2xl glass shadow-depth overflow-hidden"
              style={{
                transform: "rotateX(8deg) rotateY(-10deg) rotateZ(-1deg)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="aspect-[4/3]">
                <img
                  src={swissHardware}
                  alt="Boîtier d'agent IA souverain installé dans un cabinet fiduciaire en Suisse romande"
                  width={1280}
                  height={960}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating mockup card — overlaps bottom-right */}
            <div
              className="hidden sm:block absolute -bottom-10 -right-4 w-[62%] rounded-xl glass shadow-depth p-2"
              style={{
                transform: "translateZ(40px) rotateX(6deg) rotateY(-6deg)",
                transformStyle: "preserve-3d",
              }}
            >
              <ProductMockup />
            </div>

            {/* Floating badge — top-left */}
            <div
              className="absolute -top-4 -left-4 rounded-full glass px-3 py-2 text-xs font-medium flex items-center gap-2"
              style={{
                transform: "translateZ(60px) rotateX(6deg) rotateY(-8deg)",
              }}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
              100% on-premise
            </div>
          </div>

          {/* Mobile: show mockup below stacked, since absolute version is hidden */}
          <div className="sm:hidden mt-6 rounded-xl glass shadow-depth p-2">
            <ProductMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
