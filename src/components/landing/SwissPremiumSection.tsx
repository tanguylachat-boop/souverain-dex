import { Reveal } from "@/hooks/use-scroll-reveal";
import swissOffice from "@/assets/swiss-office.jpg";

const PILLARS = [
  {
    title: "Concu en Suisse",
    body: "Pense, developpe et deploye depuis la Suisse romande, par une equipe qui connait la realite d'un cabinet fiduciaire.",
  },
  {
    title: "Donnees hebergees chez vous",
    body: "Le boitier est physiquement installe dans votre cabinet. Aucun cloud, aucun transit, aucune juridiction etrangere.",
  },
  {
    title: "Conforme LPD & secret professionnel",
    body: "Architecture validee pour respecter la nLPD, le secret professionnel et les exigences deontologiques suisses.",
  },
  {
    title: "Support local",
    body: "Un interlocuteur unique en Suisse romande. Intervention sur site sous 48 heures, en francais.",
  },
];

export function SwissPremiumSection() {
  return (
    <section id="premium-suisse" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal direction="left">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-xl border border-border shadow-depth">
              <img
                src={swissOffice}
                alt="Cabinet de fiduciaire suisse"
                loading="lazy"
                width={1024}
                height={1280}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 hidden md:flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 shadow-md animate-float-slow">
              <div className="w-8 h-8 rounded bg-[oklch(0.55_0.22_27)] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden>
                  <rect x="10" y="4" width="4" height="16" />
                  <rect x="4" y="10" width="16" height="4" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground leading-tight">Swiss Made</div>
                <div className="text-xs text-muted-foreground">Concu & opere en Suisse</div>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal direction="right">
            <p className="text-xs font-medium tracking-[0.15em] text-primary uppercase mb-4">
              Premium suisse
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
              La rigueur suisse, appliquee a l'intelligence artificielle.
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Une solution pensee pour les standards que vos clients attendent d'un cabinet
              fiduciaire suisse : precision, discretion, durabilite.
            </p>
          </Reveal>

          <dl className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-7">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={0.15 + i * 0.08} direction="right">
                <div>
                  <dt className="flex items-center gap-2 text-sm font-semibold text-foreground mb-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {p.title}
                  </dt>
                  <dd className="text-sm text-muted-foreground leading-relaxed">{p.body}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
