import React from "react";
import { HealthReport } from "../types";
import {
  ShieldAlert,
  Flame,
  Droplet,
  Moon,
  TrendingDown,
  CheckCircle,
  Activity,
  Award,
} from "lucide-react";

interface HealthReportViewProps {
  report: HealthReport | null;
  loading: boolean;
  onPrint: () => void;
}

export default function HealthReportView({ report, loading, onPrint }: HealthReportViewProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-brand-card/20 rounded-2xl border border-brand-border/40 min-h-[400px]">
        <div className="w-12 h-12 rounded-full border-4 border-brand-accent border-t-transparent animate-spin mb-4" />
        <p className="text-brand-text font-medium text-lg">Analyzing Biometric Telemetry...</p>
        <p className="text-brand-text-muted text-sm mt-1 max-w-md text-center px-4">
          Consulting clinical guidelines and mobilizing Gemini AI to construct your medical-grade assessment.
        </p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-brand-card/20 rounded-2xl border border-brand-border/40 text-center px-6">
        <div className="p-4 bg-brand-border/30 rounded-full mb-4">
          <Activity className="w-10 h-10 text-brand-text-muted" />
        </div>
        <h3 className="text-xl font-bold text-brand-text">No Assessment Generated</h3>
        <p className="text-brand-text-muted text-sm mt-2 max-w-sm">
          Please adjust the biometric parameters in the calculator panel above and click **Generate Assessment** to create your reports.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Summary & Print button */}
      <div className="flex justify-between items-center no-print">
        <h2 className="text-xl font-bold text-brand-text flex items-center gap-2">
          <Award className="w-5 h-5 text-brand-accent" />
          Section 18: AI Health Assessment & Diagnostics
        </h2>
        <button
          onClick={onPrint}
          className="px-4 py-1.5 rounded-xl border border-brand-border hover:bg-brand-border/40 text-brand-text text-xs font-medium cursor-pointer transition-colors"
        >
          Print Report (PDF)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Core Clinical Risk and Classification Card */}
        <div className="md:col-span-8 p-6 bg-brand-card/30 rounded-2xl border border-brand-border/50 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase bg-brand-border/60 text-brand-text px-2 py-0.5 rounded-md tracking-wider">
                  Biometric Classification
                </span>
                <h3 className="text-2xl font-bold text-brand-text mt-1.5">
                  {report.bmiCategory} Range
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-brand-text-muted block font-medium">Risk Exposure Rating</span>
                <span className={`text-lg font-bold tracking-wide uppercase ${
                  report.riskLevel.toLowerCase() === "low"
                    ? "text-emerald-400"
                    : report.riskLevel.toLowerCase() === "moderate"
                    ? "text-amber-400"
                    : "text-red-400"
                }`}>
                  {report.riskLevel}
                </span>
              </div>
            </div>

            <p className="text-sm text-brand-text-muted mt-4 leading-relaxed">
              Based on your clinical Body Mass Index of <strong className="text-brand-text">{report.bmi}</strong>, the system has identified the following physiological risk factors requiring conscious optimization:
            </p>

            <ul className="mt-4 space-y-2.5">
              {report.healthRisks.map((risk, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-brand-text-muted">
                  <ShieldAlert className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-brand-border/30 text-xs text-brand-text-muted italic flex items-center gap-2">
            <Activity className="w-4 h-4 text-brand-accent-hover flex-shrink-0" />
            <span>Note: This is an AI-enhanced screening report. Consult with a qualified physician for clinical decisions.</span>
          </div>
        </div>

        {/* Ideal Target & Timeline Column */}
        <div className="md:col-span-4 p-6 bg-brand-card/30 rounded-2xl border border-brand-border/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="w-5 h-5 text-brand-accent" />
              <h4 className="text-sm font-bold text-brand-text uppercase tracking-wider">Target Biometrics</h4>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-brand-text-muted">Clinical Safe Weight Bounds</span>
                <div className="font-mono text-xl font-bold text-brand-text mt-0.5">
                  {report.idealWeightRange.min} kg – {report.idealWeightRange.max} kg
                </div>
              </div>

              <div>
                <span className="text-xs text-brand-text-muted">Recommended Pivot Target</span>
                <div className="font-mono text-2xl font-bold text-brand-accent mt-0.5">
                  {report.idealWeightRange.target} kg
                </div>
              </div>

              <div>
                <span className="text-xs text-brand-text-muted">Pacing Strategy</span>
                <p className="text-xs text-brand-text-muted mt-1 leading-relaxed">
                  {report.timelineEstimate}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-brand-border/30">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] text-brand-text-muted uppercase block">Est. Body Fat</span>
                <span className="font-mono text-sm font-semibold text-brand-text">
                  {report.bodyFatEstimate ? `${report.bodyFatEstimate}%` : "Calculate"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-brand-text-muted uppercase block">Lean Mass</span>
                <span className="font-mono text-sm font-semibold text-brand-text">
                  {report.leanMassEstimate ? `${report.leanMassEstimate} kg` : "Calculate"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metabolism & Energy Demands */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-5 p-6 bg-brand-card/30 rounded-2xl border border-brand-border/50">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-rose-500" />
            <h4 className="text-sm font-bold text-brand-text uppercase tracking-wider">Metabolic Profile</h4>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-brand-text-muted font-medium">Basal Metabolic Rate (BMR)</span>
                <span className="font-mono text-lg font-bold text-brand-text">{report.bmr} kcal/day</span>
              </div>
              <p className="text-xs text-brand-text-muted mt-1">
                Your body's absolute energy demands at rest to preserve vital organ functions.
              </p>
            </div>

            <div className="pt-3 border-t border-brand-border/20">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-brand-text-muted font-medium">Total Daily Energy Expenditure (TDEE)</span>
                <span className="font-mono text-lg font-bold text-brand-text">{report.tdee} kcal/day</span>
              </div>
              <p className="text-xs text-brand-text-muted mt-1">
                Your estimated active caloric burning rate, factoring in current lifestyle activity.
              </p>
            </div>

            <div className="pt-3 border-t border-brand-border/20">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-brand-text-muted font-medium">Target Diet Allowance</span>
                <span className="font-mono text-xl font-bold text-brand-accent">{report.macronutrients.calories} kcal/day</span>
              </div>
              <p className="text-xs text-brand-text-muted mt-1">
                Target calories configured for your goals.
              </p>
            </div>
          </div>
        </div>

        {/* Nutritional Macronutrients Breakdown */}
        <div className="md:col-span-7 p-6 bg-brand-card/30 rounded-2xl border border-brand-border/50">
          <h4 className="text-sm font-bold text-brand-text uppercase tracking-wider mb-4">
            Target Macronutrient Profiles
          </h4>

          <div className="space-y-5">
            {/* Protein */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-brand-text">Protein (Tissue Synthesis & Satiety)</span>
                <span className="font-mono text-brand-text">
                  {report.macronutrients.protein.grams}g ({report.macronutrients.protein.percentage}%)
                </span>
              </div>
              <div className="h-2 w-full bg-brand-border/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${report.macronutrients.protein.percentage}%` }}
                />
              </div>
            </div>

            {/* Carbs */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-brand-text">Carbohydrates (Aerobic Energy & Reserves)</span>
                <span className="font-mono text-brand-text">
                  {report.macronutrients.carbs.grams}g ({report.macronutrients.carbs.percentage}%)
                </span>
              </div>
              <div className="h-2 w-full bg-brand-border/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-500 rounded-full"
                  style={{ width: `${report.macronutrients.carbs.percentage}%` }}
                />
              </div>
            </div>

            {/* Fat */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-brand-text">Lipids / Fats (Hormonal Balance & Absorption)</span>
                <span className="font-mono text-brand-text">
                  {report.macronutrients.fat.grams}g ({report.macronutrients.fat.percentage}%)
                </span>
              </div>
              <div className="h-2 w-full bg-brand-border/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${report.macronutrients.fat.percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hydration & Sleep */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hydration */}
        <div className="p-6 bg-brand-card/30 rounded-2xl border border-brand-border/50 space-y-4">
          <div className="flex items-center gap-2">
            <Droplet className="w-5 h-5 text-sky-400" />
            <h4 className="text-sm font-bold text-brand-text uppercase tracking-wider">Hydration Protocols</h4>
          </div>

          <div className="flex items-baseline gap-4">
            <div>
              <span className="text-xs text-brand-text-muted block">Liters/Day</span>
              <span className="font-mono text-2xl font-bold text-brand-text">{report.waterIntake.liters} L</span>
            </div>
            <div>
              <span className="text-xs text-brand-text-muted block">Standard Cups</span>
              <span className="font-mono text-2xl font-bold text-brand-text">~{report.waterIntake.cups} cups</span>
            </div>
          </div>

          <ul className="space-y-2 text-xs text-brand-text-muted pt-2 border-t border-brand-border/20">
            {report.waterIntake.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-sky-400 font-semibold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sleep Advice */}
        <div className="p-6 bg-brand-card/30 rounded-2xl border border-brand-border/50 space-y-4">
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-indigo-400" />
            <h4 className="text-sm font-bold text-brand-text uppercase tracking-wider">Circadian & Sleep Hygiene</h4>
          </div>

          <div>
            <span className="text-xs text-brand-text-muted block">Recommended Daily Rest</span>
            <span className="font-mono text-2xl font-bold text-brand-text">{report.sleepAdvice.hours}</span>
          </div>

          <ul className="space-y-2 text-xs text-brand-text-muted pt-2 border-t border-brand-border/20">
            {report.sleepAdvice.hygiene.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-400 font-semibold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Practical recommendations checklist */}
      <div className="p-6 bg-brand-card/30 rounded-2xl border border-brand-border/50">
        <h4 className="text-sm font-bold text-brand-text uppercase tracking-wider mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-brand-accent" />
          Primary High-Impact Actions
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {report.keyRecommendations.map((rec, idx) => (
            <div key={idx} className="flex gap-3 p-3 bg-brand-bg/50 rounded-xl border border-brand-border/30">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent font-mono text-xs flex-shrink-0">
                {idx + 1}
              </span>
              <p className="text-xs text-brand-text-muted leading-relaxed self-center">
                {rec}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
