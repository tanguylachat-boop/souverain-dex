import { useMemo, useState } from "react";

// Hypothèses (modifiables) :
// - Coût horaire chargé d'un collaborateur fiduciaire en Suisse romande : 85 CHF/h
// - Temps moyen économisé par document automatisé : 4 minutes
// - 46 semaines travaillées par an
// - Investissement initial (hardware + setup) : 12'000 CHF
// - Abonnement mensuel (support + mises à jour) : 490 CHF
const HOURLY_COST = 85;
const MIN_PER_DOC = 4;
const WEEKS_PER_YEAR = 46;
const SETUP_COST = 12000;
const MONTHLY_FEE = 490;

// Formatter stable (évite les écarts SSR vs client sur Intl.NumberFormat)
const fmtCHF = (n: number) => {
  const v = Math.round(n);
  const sign = v < 0 ? "-" : "";
  const abs = Math.abs(v).toString();
  // séparateur de milliers : apostrophe suisse
  const withSep = abs.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  return `CHF ${sign}${withSep}`;
};

const fmtNum = (n: number) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");


export function RoiSection() {
  const [collaborators, setCollaborators] = useState(8);
  const [docsPerWeek, setDocsPerWeek] = useState(400);

  const data = useMemo(() => {
    const totalDocsYear = docsPerWeek * WEEKS_PER_YEAR;
    const hoursSavedYear = (totalDocsYear * MIN_PER_DOC) / 60;
    const hoursSavedWeek = hoursSavedYear / WEEKS_PER_YEAR;
    const hoursPerCollabWeek = hoursSavedWeek / Math.max(collaborators, 1);
    const grossSavingsYear = hoursSavedYear * HOURLY_COST;
    const annualCost = SETUP_COST + MONTHLY_FEE * 12; // année 1
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

  return (
    <section id="roi" className="py-20 md:py-28 bg-surface border-y border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.15em] text-primary uppercase mb-4">
            Calculateur ROI
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
            Combien votre cabinet économise réellement chaque année.
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Ajustez le nombre de collaborateurs et le volume de documents traités. L'estimation
            se base sur un coût chargé de {HOURLY_COST} CHF/h et {MIN_PER_DOC} minutes économisées
            par document.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="rounded-lg border border-border bg-background p-8">
            <div className="space-y-8">
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <label htmlFor="collab" className="text-sm font-medium text-foreground">
                    Nombre de collaborateurs
                  </label>
                  <span className="text-2xl font-semibold text-foreground tabular-nums">
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
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>3</span>
                  <span>30</span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <label htmlFor="docs" className="text-sm font-medium text-foreground">
                    Documents traités par semaine
                  </label>
                  <span className="text-2xl font-semibold text-foreground tabular-nums">
                    {docsPerWeek.toLocaleString("fr-CH")}
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
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>50</span>
                  <span>3 000</span>
                </div>
              </div>

              <div className="pt-6 border-t border-border space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Heures économisées / semaine</span>
                  <span className="font-medium text-foreground tabular-nums">
                    {data.hoursSavedWeek.toFixed(1)} h
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Par collaborateur / semaine</span>
                  <span className="font-medium text-foreground tabular-nums">
                    {data.hoursPerCollabWeek.toFixed(1)} h
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="rounded-lg border border-border bg-foreground text-background p-8 flex flex-col">
            <p className="text-xs font-medium tracking-[0.15em] uppercase opacity-70 mb-6">
              Estimation annuelle
            </p>

            <div className="space-y-6 flex-1">
              <div>
                <p className="text-sm opacity-70 mb-1">Économies brutes / an</p>
                <p className="text-4xl md:text-5xl font-semibold tabular-nums">
                  {fmtCHF(data.grossSavingsYear)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-background/15">
                <div>
                  <p className="text-xs opacity-70 mb-1">Net année 1</p>
                  <p className="text-xl font-semibold tabular-nums">
                    {fmtCHF(data.netYear1)}
                  </p>
                  <p className="text-xs opacity-60 mt-1">après setup + abonnement</p>
                </div>
                <div>
                  <p className="text-xs opacity-70 mb-1">Net récurrent / an</p>
                  <p className="text-xl font-semibold tabular-nums">
                    {fmtCHF(data.netRecurring)}
                  </p>
                  <p className="text-xs opacity-60 mt-1">dès l'année 2</p>
                </div>
              </div>

              <div className="pt-6 border-t border-background/15">
                <p className="text-xs opacity-70 mb-1">Retour sur investissement</p>
                <p className="text-2xl font-semibold tabular-nums">
                  {Number.isFinite(data.paybackMonths)
                    ? `${data.paybackMonths.toFixed(1)} mois`
                    : "—"}
                </p>
              </div>
            </div>

            <a
              href="#demo"
              className="mt-8 inline-flex items-center justify-center h-11 px-6 rounded-md bg-background text-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Réserver une démo
            </a>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground max-w-3xl">
          Estimation indicative basée sur les retours de cabinets comparables. Hypothèses :
          coût horaire chargé {HOURLY_COST} CHF, {MIN_PER_DOC} min économisées par document,
          investissement {fmtCHF(SETUP_COST)} (hardware + installation), abonnement{" "}
          {fmtCHF(MONTHLY_FEE)}/mois (support, mises à jour, monitoring).
        </p>
      </div>
    </section>
  );
}
