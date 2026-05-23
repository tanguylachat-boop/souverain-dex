import { useMemo, useState, useEffect, useRef } from "react";
import { Reveal } from "@/hooks/use-scroll-reveal";

const HOURLY_COST = 85;
const MIN_PER_DOC = 4;
const WEEKS_PER_YEAR = 46;
const SETUP_COST = 12000;
const MONTHLY_FEE = 490;

const LEADS_API = "https://command-center-iota-wheat.vercel.app/api/leads";

const fmtCHF = (n: number) => {
  const v = Math.round(n);
  const sign = v < 0 ? "-" : "";
  const abs = Math.abs(v).toString();
  const withSep = abs.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  return `CHF ${sign}${withSep}`;
};

const fmtNum = (n: number) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");

/** Animated counter that counts up from 0 */
function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const prevValue = useRef(0);

  useEffect(() => {
    const start = prevValue.current;
    const end = value;
    const duration = 600;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
    prevValue.current = end;
  }, [value]);

  const formatted = Math.abs(display).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  return <>{prefix}{display < 0 ? "-" : ""}{formatted}{suffix}</>;
}

export function RoiSection() {
  const [collaborators, setCollaborators] = useState(8);
  const [docsPerWeek, setDocsPerWeek] = useState(400);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const data = useMemo(() => {
    const totalDocsYear = docsPerWeek * WEEKS_PER_YEAR;
    const hoursSavedYear = (totalDocsYear * MIN_PER_DOC) / 60;
    const hoursSavedWeek = hoursSavedYear / WEEKS_PER_YEAR;
    const hoursPerCollabWeek = hoursSavedWeek / Math.max(collaborators, 1);
    const grossSavingsYear = hoursSavedYear * HOURLY_COST;
    const annualCost = SETUP_COST + MONTHLY_FEE * 12;
    const netYear1 = grossSavingsYear - annualCost;
    const netRecurring = grossSavingsYear - MONTHLY_FEE * 12;
    const monthlySavings = grossSavingsYear / 12;
    const paybackMonths =
      monthlySavings - MONTHLY_FEE > 0
        ? SETUP_COST / (monthlySavings - MONTHLY_FEE)
        : Infinity;

    return {
      hoursSavedWeek,
      hoursPerCollabWeek,
      grossSavingsYear,
      netYear1,
      netRecurring,
      paybackMonths,
    };
  }, [collaborators, docsPerWeek]);

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    try {
      await fetch(LEADS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          employees: collaborators,
          hours_per_week: data.hoursSavedWeek,
          hourly_cost: HOURLY_COST,
          tier: collaborators <= 5 ? "Essentiel" : collaborators <= 10 ? "Standard" : "Premium",
          annual_saving: Math.max(0, data.grossSavingsYear),
          roi: data.grossSavingsYear > 0 ? data.netYear1 / (SETUP_COST + MONTHLY_FEE * 12) : 0,
        }),
      });
    } catch {
      // Silent fail — don't block UX
    }
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <section id="roi" className="relative py-24 md:py-36 overflow-hidden">
      {/* Dark immersive background */}
      <div className="absolute inset-0 mesh-dark" />

      {/* Animated gradient orbs */}
      <div
        aria-hidden
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 animate-float-slow"
        style={{ background: "var(--primary)" }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 animate-float-slow"
        style={{ background: "var(--primary)", animationDelay: "4s" }}
      />

      {/* Grid overlay */}
      <div aria-hidden className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase mb-4">
              Calculateur ROI
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
              Combien votre cabinet economise{" "}
              <span className="text-gradient" style={{ background: "linear-gradient(135deg, white 0%, var(--primary) 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                reellement
              </span>{" "}
              chaque annee.
            </h2>
            <p className="mt-5 text-base text-white/60 leading-relaxed">
              Ajustez les curseurs selon votre cabinet. Estimation basee sur{" "}
              {HOURLY_COST} CHF/h et {MIN_PER_DOC} minutes economisees par document.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-2 gap-8">
          {/* Inputs — glass card */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-8">
              <div className="space-y-10">
                {/* Collaborators slider */}
                <div>
                  <div className="flex items-baseline justify-between mb-4">
                    <label htmlFor="collab" className="text-sm font-medium text-white/80">
                      Nombre de collaborateurs
                    </label>
                    <span className="text-3xl font-semibold text-white tabular-nums glow-primary">
                      {collaborators}
                    </span>
                  </div>
                  <input
                    id="collab"
                    type="range"
                    min={3}
                    max={30}
                    value={collaborators}
                    onChange={(e) => setCollaborators(Number(e.target.value))}
                    className="w-full slider-immersive"
                  />
                  <div className="flex justify-between text-xs text-white/40 mt-2">
                    <span>3</span>
                    <span>30</span>
                  </div>
                </div>

                {/* Documents slider */}
                <div>
                  <div className="flex items-baseline justify-between mb-4">
                    <label htmlFor="docs" className="text-sm font-medium text-white/80">
                      Documents traites par semaine
                    </label>
                    <span className="text-3xl font-semibold text-white tabular-nums glow-primary">
                      {fmtNum(docsPerWeek)}
                    </span>
                  </div>
                  <input
                    id="docs"
                    type="range"
                    min={50}
                    max={3000}
                    step={50}
                    value={docsPerWeek}
                    onChange={(e) => setDocsPerWeek(Number(e.target.value))}
                    className="w-full slider-immersive"
                  />
                  <div className="flex justify-between text-xs text-white/40 mt-2">
                    <span>50</span>
                    <span>3 000</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="pt-6 border-t border-white/10 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/50">Heures economisees / semaine</span>
                    <span className="font-medium text-white tabular-nums">
                      {data.hoursSavedWeek.toFixed(1)} h
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Par collaborateur / semaine</span>
                    <span className="font-medium text-white tabular-nums">
                      {data.hoursPerCollabWeek.toFixed(1)} h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Results — glowing card */}
          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-primary/30 bg-primary/[0.08] backdrop-blur-sm p-8 flex flex-col glow-box">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-8">
                Estimation annuelle
              </p>

              <div className="space-y-8 flex-1">
                {/* Gross savings — hero number */}
                <div>
                  <p className="text-sm text-white/60 mb-2">Economies brutes / an</p>
                  <p className="text-5xl md:text-6xl font-bold text-white tabular-nums tracking-tight">
                    <AnimatedNumber value={Math.round(data.grossSavingsYear)} prefix="CHF " />
                  </p>
                </div>

                {/* Grid metrics */}
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                  <div>
                    <p className="text-xs text-white/50 mb-1">Net annee 1</p>
                    <p className="text-xl font-semibold text-white tabular-nums">
                      {fmtCHF(data.netYear1)}
                    </p>
                    <p className="text-xs text-white/40 mt-1">apres setup + abonnement</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1">Net recurrent / an</p>
                    <p className="text-xl font-semibold text-white tabular-nums">
                      {fmtCHF(data.netRecurring)}
                    </p>
                    <p className="text-xs text-white/40 mt-1">des l'annee 2</p>
                  </div>
                </div>

                {/* Payback */}
                <div className="pt-6 border-t border-white/10">
                  <p className="text-xs text-white/50 mb-1">Retour sur investissement</p>
                  <p className="text-3xl font-bold text-white tabular-nums">
                    {Number.isFinite(data.paybackMonths)
                      ? <><AnimatedNumber value={Math.round(data.paybackMonths * 10) / 10} /> mois</>
                      : "—"}
                  </p>
                </div>
              </div>

              {/* Lead capture or CTA */}
              {!submitted ? (
                <form onSubmit={handleLeadCapture} className="mt-8">
                  <p className="text-xs text-white/50 mb-3">
                    Recevez cette estimation detaillee par email
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.ch"
                      required
                      className="flex-1 h-11 px-4 rounded-md bg-white/10 border border-white/15 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="h-11 px-5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 whitespace-nowrap"
                    >
                      {submitting ? "..." : "Envoyer"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mt-8 flex items-center gap-2 text-sm text-emerald-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  Merci ! Vous recevrez votre estimation sous 24h.
                </div>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <p className="mt-8 text-xs text-white/30 max-w-3xl">
            Estimation indicative basee sur les retours de cabinets comparables. Hypotheses :
            cout horaire charge {HOURLY_COST} CHF, {MIN_PER_DOC} min economisees par document,
            investissement {fmtCHF(SETUP_COST)} (hardware + installation), abonnement{" "}
            {fmtCHF(MONTHLY_FEE)}/mois (support, mises a jour, monitoring).
          </p>
        </Reveal>
      </div>
    </section>
  );
}
