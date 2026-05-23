import { Reveal } from "@/hooks/use-scroll-reveal";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useEffect, useState } from "react";

const TESTIMONIALS = [
  {
    quote:
      "Nos clients — avocats, medecins, holdings — exigent que rien ne sorte. Avec cet agent, je peux enfin automatiser sans trahir cette promesse.",
    name: "M. Berger",
    role: "Associe, fiduciaire — Geneve",
  },
  {
    quote:
      "Installation en une matinee. Des la deuxieme semaine, mes collaborateurs avaient recupere une journee par personne. Le ROI s'est impose seul.",
    name: "Mme Deleze",
    role: "Directrice, fiduciaire — Lausanne",
  },
  {
    quote:
      "Avant de signer, j'ai fait auditer le boitier par notre prestataire IT. Verdict : aucun trafic sortant. Exactement ce qu'on m'avait promis.",
    name: "M. Roduit",
    role: "Expert-comptable diplome — Sion",
  },
];

const STATS = [
  { value: 12, suffix: "h", label: "economisees par collaborateur / semaine" },
  { value: 0, suffix: "", label: "donnee transmise hors du cabinet" },
  { value: 100, suffix: "%", label: "heberge sur votre LAN, en Suisse" },
  { value: 1, prefix: "< ", suffix: " j", label: "d'installation sur site" },
];

const CANTONS = ["Geneve", "Vaud", "Valais", "Fribourg", "Neuchatel", "Jura", "Berne"];

function AnimatedStat({ value, prefix = "", suffix = "", visible }: { value: number; prefix?: string; suffix?: string; visible: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const duration = 1200;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible, value]);

  return <>{prefix}{display}{suffix}</>;
}

export function SocialProofSection() {
  const { ref: statsRef, visible: statsVisible } = useScrollReveal<HTMLDivElement>(0.2);

  return (
    <section id="confiance" className="py-20 md:py-28 bg-surface border-y border-border">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.15em] text-primary uppercase mb-4">
              La confiance des fiduciaires romandes
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
              Adopte par des cabinets qui ne transigent pas avec la confidentialite.
            </h2>
          </div>
        </Reveal>

        {/* Stats with animated counters */}
        <Reveal delay={0.1}>
          <div
            ref={statsRef}
            className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden border border-border"
          >
            {STATS.map((s) => (
              <div key={s.label} className="bg-background p-6 md:p-8">
                <div className="text-3xl md:text-4xl font-semibold text-foreground tabular-nums">
                  <AnimatedStat
                    value={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    visible={statsVisible}
                  />
                </div>
                <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Testimonials */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={0.15 + i * 0.1}>
              <figure
                className="rounded-lg border border-border bg-background p-6 md:p-7 flex flex-col hover-lift h-full"
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
                  &laquo; {t.quote} &raquo;
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-border">
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Cantons strip */}
        <Reveal delay={0.3}>
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase text-center mb-5">
              Present dans toute la Suisse romande
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
        </Reveal>
      </div>
    </section>
  );
}
