import { useEffect, useState } from "react";
import { ProductMockup } from "./ProductMockup";
import swissHardware from "@/assets/swiss-hardware.jpg";

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="top"
      className="relative pt-28 pb-24 md:pt-40 md:pb-36 overflow-hidden bg-background"
    >
      {/* Animated mesh background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60rem 38rem at 85% 0%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 60%), radial-gradient(50rem 32rem at 0% 100%, color-mix(in oklab, var(--primary) 8%, transparent), transparent 65%)",
        }}
      />

      {/* Animated grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 grid-pattern opacity-40 pointer-events-none"
      />

      {/* Top line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Copy — with staggered entrance */}
        <div className="lg:col-span-6">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur px-3 py-1 text-xs text-muted-foreground mb-6"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(20px)",
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
          >
            <span className="relative inline-flex">
              <span className="absolute inset-0 rounded-full bg-primary/40 animate-pulse-ring" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-primary" />
            </span>
            Pour les fiduciaires suisses
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.06] tracking-tight text-foreground max-w-[18ch]"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            L'IA qui scanne, classe et automatise vos documents —
            <span className="text-muted-foreground"> sans jamais quitter votre cabinet.</span>
          </h1>

          <p
            className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(24px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s",
            }}
          >
            Concu pour les fiduciaires suisses qui placent le secret professionnel au-dessus de tout.
          </p>

          <div
            className="mt-8 flex flex-wrap items-center gap-4"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
            }}
          >
            <a
              href="#demo"
              className="group inline-flex items-center justify-center rounded-md bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-depth hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300"
            >
              Demander une demo de 20 minutes
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="ml-2 group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#solution"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Voir comment ca fonctionne
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
            style={{
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.65s",
            }}
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-primary" /> Conforme nLPD
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-primary" /> Heberge dans votre cabinet
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-primary" /> Sans cloud externe
            </span>
          </div>
        </div>

        {/* Premium 3D product stage */}
        <div
          className="lg:col-span-6"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(40px) scale(0.95)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
          }}
        >
          <div className="relative mx-auto w-full max-w-[34rem] aspect-[5/6] [perspective:1600px] hidden lg:block">
            {/* Pedestal halo */}
            <div
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[85%] h-24 rounded-[100%] blur-2xl opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 35%, transparent), transparent 70%)",
              }}
            />
            {/* Soft top spotlight */}
            <div
              aria-hidden
              className="absolute -top-10 left-1/2 -translate-x-1/2 w-[120%] h-40 blur-3xl opacity-50"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 28%, transparent), transparent 70%)",
              }}
            />

            {/* The 3D scene */}
            <div
              className="absolute inset-0"
              style={{
                transformStyle: "preserve-3d",
                transform: "rotateX(14deg) rotateY(-18deg)",
              }}
            >
              {/* Back panel — hardware photo */}
              <div
                className="absolute inset-x-6 top-2 bottom-20 rounded-2xl overflow-hidden border border-border bg-card"
                style={{
                  transform: "translateZ(0px)",
                  boxShadow:
                    "0 40px 80px -30px color-mix(in oklab, var(--primary) 45%, transparent), 0 20px 40px -20px color-mix(in oklab, var(--foreground) 25%, transparent)",
                }}
              >
                <img
                  src={swissHardware}
                  alt="Boitier d'agent IA souverain installe dans un cabinet fiduciaire en Suisse romande"
                  width={1280}
                  height={960}
                  className="w-full h-full object-cover"
                />
                {/* Glass sheen */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, color-mix(in oklab, white 14%, transparent) 0%, transparent 35%, transparent 70%, color-mix(in oklab, var(--primary) 18%, transparent) 100%)",
                  }}
                />
              </div>

              {/* Front panel — product mockup */}
              <div
                className="absolute left-0 right-10 bottom-0 rounded-2xl overflow-hidden border border-border bg-card"
                style={{
                  transform: "translateZ(80px) translateY(8%)",
                  boxShadow:
                    "0 50px 90px -30px color-mix(in oklab, var(--primary) 50%, transparent), 0 25px 50px -25px color-mix(in oklab, var(--foreground) 30%, transparent)",
                }}
              >
                <div className="p-2.5">
                  <ProductMockup />
                </div>
              </div>

              {/* Floating badge — top right */}
              <div
                className="absolute top-6 right-0 rounded-full border border-border bg-background/90 backdrop-blur px-3 py-1.5 text-xs font-medium flex items-center gap-2 shadow-depth animate-float-slow"
                style={{ transform: "translateZ(120px)" }}
              >
                <span className="relative inline-flex">
                  <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
                  <span className="relative w-2 h-2 rounded-full bg-primary" />
                </span>
                100% on-premise
              </div>

              {/* Floating chip — left */}
              <div
                className="absolute top-1/3 -left-2 rounded-lg border border-border bg-background/90 backdrop-blur px-3 py-2 text-[11px] shadow-depth animate-float-slow"
                style={{ transform: "translateZ(140px)", animationDelay: "2s" }}
              >
                <div className="text-muted-foreground">Conformite</div>
                <div className="font-semibold text-foreground">nLPD - Suisse</div>
              </div>

              {/* Floating chip — bottom right */}
              <div
                className="absolute bottom-10 -right-2 rounded-lg border border-border bg-background/90 backdrop-blur px-3 py-2 text-[11px] shadow-depth animate-float-slow"
                style={{ transform: "translateZ(140px)", animationDelay: "4s" }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-foreground">Agent actif</span>
                </div>
                <div className="text-muted-foreground mt-0.5">142 docs traites aujourd'hui</div>
              </div>
            </div>
          </div>

          {/* Mobile fallback */}
          <div className="lg:hidden mt-10 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-border shadow-depth">
              <img
                src={swissHardware}
                alt=""
                aria-hidden
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        style={{
          opacity: loaded ? 0.5 : 0,
          transition: "opacity 1s ease 1.2s",
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-foreground/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-foreground/40 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
