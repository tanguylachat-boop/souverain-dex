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

/** Animated counter that counts up from previous value */
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
      const eased = 1 - Math.pow(1 - progress, 3);
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
      // Silent fail
    }
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <section
      id="roi"
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #0a0a0f 0%, #0f1117 40%, #0a0a0f 100%)",
      }}
    >
      {/* Gradient orb top-left */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(closest-side, rgba(26, 54, 93, 0.35), transparent 70%)",
          filter: "blur(120px)",
        }}
      />
      {/* Gradient orb bottom-right */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(closest-side, rgba(26, 54, 93, 0.25), transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.15,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <p
              className="text-xs font-medium uppercase mb-4"
              style={{ letterSpacing: "0.2em", color: "var(--primary)" }}
            >
              Calculateur ROI
            </p>
            <h2
              className="text-3xl md:text-5xl font-semibold leading-tight"
              style={{ color: "#ffffff" }}
            >
              Combien votre cabinet économise{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, var(--primary) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                réellement
              </span>{" "}
              chaque année.
            </h2>
            <p
              className="mt-5 text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Ajustez les curseurs selon votre cabinet. Estimation basée sur{" "}
              {HOURLY_COST} CHF/h et {MIN_PER_DOC} minutes économisées par document.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-2 gap-8">
          {/* Inputs card — glass effect */}
          <Reveal delay={0.1}>
            <div
              className="rounded-2xl p-8"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="space-y-10">
                {/* Collaborators slider */}
                <div>
                  <div className="flex items-baseline justify-between mb-4">
                    <label
                      htmlFor="collab"
                      className="text-sm font-medium"
                      style={{ color: "rgba(255,255,255,0.8)" }}
                    >
                      Nombre de collaborateurs
                    </label>
                    <span
                      className="text-3xl font-semibold tabular-nums"
                      style={{ color: "#ffffff" }}
                    >
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
                    className="w-full accent-[var(--primary)]"
                    style={{ accentColor: "var(--primary)" }}
                  />
                  <div
                    className="flex justify-between text-xs mt-2"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    <span>3</span>
                    <span>30</span>
                  </div>
                </div>

                {/* Documents slider */}
                <div>
                  <div className="flex items-baseline justify-between mb-4">
                    <label
                      htmlFor="docs"
                      className="text-sm font-medium"
                      style={{ color: "rgba(255,255,255,0.8)" }}
                    >
                      Documents traités par semaine
                    </label>
                    <span
                      className="text-3xl font-semibold tabular-nums"
                      style={{ color: "#ffffff" }}
                    >
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
                    className="w-full"
                    style={{ accentColor: "var(--primary)" }}
                  />
                  <div
                    className="flex justify-between text-xs mt-2"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    <span>50</span>
                    <span>3 000</span>
                  </div>
                </div>

                {/* Metrics */}
                <div
                  className="pt-6 space-y-3 text-sm"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div className="flex justify-between">
                    <span style={{ color: "rgba(255,255,255,0.45)" }}>
                      Heures économisées / semaine
                    </span>
                    <span
                      className="font-medium tabular-nums"
                      style={{ color: "#ffffff" }}
                    >
                      {data.hoursSavedWeek.toFixed(1)} h
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "rgba(255,255,255,0.45)" }}>
                      Par collaborateur / semaine
                    </span>
                    <span
                      className="font-medium tabular-nums"
                      style={{ color: "#ffffff" }}
                    >
                      {data.hoursPerCollabWeek.toFixed(1)} h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Results card — glowing */}
          <Reveal delay={0.2}>
            <div
              className="rounded-2xl p-8 flex flex-col"
              style={{
                border: "1px solid rgba(26, 54, 93, 0.4)",
                background: "rgba(26, 54, 93, 0.12)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 60px -15px rgba(26, 54, 93, 0.3)",
              }}
            >
              <p
                className="text-xs font-medium uppercase mb-8"
                style={{ letterSpacing: "0.2em", color: "var(--primary)" }}
              >
                Estimation annuelle
              </p>

              <div className="space-y-8 flex-1">
                {/* Gross savings */}
                <div>
                  <p
                    className="text-sm mb-2"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    Économies brutes / an
                  </p>
                  <p
                    className="text-5xl md:text-6xl font-bold tabular-nums tracking-tight"
                    style={{ color: "#ffffff" }}
                  >
                    <AnimatedNumber value={Math.round(data.grossSavingsYear)} prefix="CHF " />
                  </p>
                </div>

                {/* Grid metrics */}
                <div
                  className="grid grid-cols-2 gap-6 pt-6"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <div>
                    <p
                      className="text-xs mb-1"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      Net année 1
                    </p>
                    <p
                      className="text-xl font-semibold tabular-nums"
                      style={{ color: "#ffffff" }}
                    >
                      {fmtCHF(data.netYear1)}
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      après setup + abonnement
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs mb-1"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      Net récurrent / an
                    </p>
                    <p
                      className="text-xl font-semibold tabular-nums"
                      style={{ color: "#ffffff" }}
                    >
                      {fmtCHF(data.netRecurring)}
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      dès l'année 2
                    </p>
                  </div>
                </div>

                {/* Payback */}
                <div
                  className="pt-6"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <p
                    className="text-xs mb-1"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    Retour sur investissement
                  </p>
                  <p
                    className="text-3xl font-bold tabular-nums"
                    style={{ color: "#ffffff" }}
                  >
                    {Number.isFinite(data.paybackMonths)
                      ? <><AnimatedNumber value={Math.round(data.paybackMonths * 10) / 10} /> mois</>
                      : "—"}
                  </p>
                </div>
              </div>

              {/* Lead capture */}
              {!submitted ? (
                <form onSubmit={handleLeadCapture} className="mt-8">
                  <p
                    className="text-xs mb-3"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    Recevez cette estimation détaillée par email
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.ch"
                      required
                      className="flex-1 h-11 px-4 rounded-md text-sm"
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#ffffff",
                        outline: "none",
                      }}
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="h-11 px-5 rounded-md text-sm font-medium whitespace-nowrap"
                      style={{
                        background: "var(--primary)",
                        color: "var(--primary-foreground)",
                        opacity: submitting ? 0.6 : 1,
                      }}
                    >
                      {submitting ? "..." : "Envoyer"}
                    </button>
                  </div>
                </form>
              ) : (
                <div
                  className="mt-8 flex items-center gap-2 text-sm"
                  style={{ color: "#34d399" }}
                >
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
          <p
            className="mt-8 text-xs max-w-3xl"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Estimation indicative basée sur les retours de cabinets comparables. Hypothèses :
            coût horaire chargé {HOURLY_COST} CHF, {MIN_PER_DOC} min économisées par document,
            investissement {fmtCHF(SETUP_COST)} (hardware + installation), abonnement{" "}
            {fmtCHF(MONTHLY_FEE)}/mois (support, mises à jour, monitoring).
          </p>
        </Reveal>
      </div>
    </section>
  );
}
