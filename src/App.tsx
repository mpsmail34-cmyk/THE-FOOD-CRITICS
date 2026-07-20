import React, { useState, useEffect } from "react";
import { UserProfile, HealthReport, DietPlan, WorkoutPlan, BmiRecord } from "./types";
import BmiGauge from "./components/BmiGauge";
import HealthReportView from "./components/HealthReportView";
import DietPlannerView from "./components/DietPlannerView";
import WorkoutPlannerView from "./components/WorkoutPlannerView";
import ProgressTrackerView from "./components/ProgressTrackerView";
import PdrExplorer from "./components/PdrExplorer";
import AdminConsole from "./components/AdminConsole";
import {
  Heart,
  Sliders,
  Sparkles,
  ClipboardList,
  Coffee,
  Dumbbell,
  LineChart as ChartIcon,
  BookOpen,
  Settings,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  TrendingDown,
  ChevronDown,
} from "lucide-react";

export default function App() {
  // 1. User Biometrics State
  const [weight, setWeight] = useState<number>(75); // kg
  const [height, setHeight] = useState<number>(176); // cm
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [activityLevel, setActivityLevel] = useState<UserProfile["activityLevel"]>("moderate");
  const [goal, setGoal] = useState<UserProfile["goal"]>("weight_loss");
  const [dietPreference, setDietPreference] = useState<UserProfile["dietPreference"]>("vegetarian");
  const [conditions, setConditions] = useState<string>("");

  // 2. Navigation State
  const [activeTab, setActiveTab] = useState<string>("assessment");

  // 3. AI Generated Reports State
  const [healthReport, setHealthReport] = useState<HealthReport | null>(null);
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);

  // 4. Loading States
  const [loadingAssessment, setLoadingAssessment] = useState<boolean>(false);
  const [loadingDiet, setLoadingDiet] = useState<boolean>(false);
  const [loadingWorkout, setLoadingWorkout] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // 5. Admin overrides settings
  const [adminSettings, setAdminSettings] = useState({
    underweightLimit: 18.5,
    overweightLimit: 25.0,
    activityMultiplier: 1.0,
  });

  // 6. Pre-seed biometric records logs
  const [records, setRecords] = useState<BmiRecord[]>([
    { id: "seed-1", date: "2026-07-01", weight: 79.5, bmi: 25.7, calories: 2300 },
    { id: "seed-2", date: "2026-07-08", weight: 77.8, bmi: 25.1, calories: 1950 },
    { id: "seed-3", date: "2026-07-15", weight: 76.2, bmi: 24.6, calories: 1850 },
  ]);

  // Handle setting updates from Admin Panel
  const handleAdminSettingsChange = (key: string, value: number) => {
    setAdminSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Add historical log point
  const handleAddRecord = (newRec: Omit<BmiRecord, "id">) => {
    // Recalculate BMI based on standard height
    const heightM = height / 100;
    const computedBmi = Number((newRec.weight / (heightM * heightM)).toFixed(1));

    const record: BmiRecord = {
      id: "log-" + Math.random().toString(36).substr(2, 9),
      ...newRec,
      bmi: computedBmi,
    };
    setRecords((prev) => [record, ...prev].sort((a, b) => b.date.localeCompare(a.date)));
  };

  // Delete historical log point
  const handleDeleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  // Real-time client calculations (instant UI feedback)
  const heightM = height / 100;
  const liveBmi = Number((weight / (heightM * heightM)).toFixed(1));

  // Base BMR estimate
  let liveBmr = 0;
  if (gender === "male") {
    liveBmr = Math.round(10 * weight + 6.25 * height - 5 * age + 5);
  } else if (gender === "female") {
    liveBmr = Math.round(10 * weight + 6.25 * height - 5 * age - 161);
  } else {
    liveBmr = Math.round(10 * weight + 6.25 * height - 5 * age - 80);
  }

  // TDEE estimate
  const multipliers = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };
  const liveTdee = Math.round(liveBmr * (multipliers[activityLevel] || 1.2) * adminSettings.activityMultiplier);

  // Dynamic classification based on admin rules
  let liveCategory = "Healthy weight";
  if (liveBmi < adminSettings.underweightLimit) {
    liveCategory = "Underweight";
  } else if (liveBmi >= adminSettings.underweightLimit && liveBmi < adminSettings.overweightLimit) {
    liveCategory = "Healthy weight";
  } else if (liveBmi >= adminSettings.overweightLimit && liveBmi < 30) {
    liveCategory = "Overweight";
  } else {
    liveCategory = "Obese";
  }

  // AI assessment trigger
  const generateAssessment = async () => {
    setLoadingAssessment(true);
    setApiError(null);
    try {
      const response = await fetch("/api/analyze-bmi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weight,
          height,
          age,
          gender,
          activityLevel,
          goal,
          dietPreference,
          conditions,
        }),
      });

      if (!response.ok) {
        throw new Error("Assessment service returned non-OK status.");
      }

      const data = await response.json();
      setHealthReport(data);

      // Seed current point to history tracker automatically upon successful generation
      handleAddRecord({
        date: new Date().toISOString().split("T")[0],
        weight,
        calories: data.macronutrients?.calories || liveTdee,
        bmi: liveBmi,
      });

      // Automatically switch to assessment results tab
      setActiveTab("assessment");
    } catch (err: any) {
      console.error(err);
      setApiError("Failed to communicate with AI core services. Check if GEMINI_API_KEY is configured.");
    } finally {
      setLoadingAssessment(false);
    }
  };

  // AI Diet Planner trigger
  const generateDietPlan = async () => {
    setLoadingDiet(true);
    setApiError(null);
    try {
      const targetCalories = healthReport?.macronutrients?.calories || liveTdee;
      const response = await fetch("/api/generate-diet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weight,
          height,
          age,
          gender,
          activityLevel,
          goal,
          dietPreference,
          conditions,
          targetCalories,
        }),
      });

      if (!response.ok) {
        throw new Error("Diet generation endpoint returned error.");
      }

      const data = await response.json();
      setDietPlan(data);
      setActiveTab("diet");
    } catch (err: any) {
      console.error(err);
      setApiError("Failed to formulate diet recommendations. Please try again.");
    } finally {
      setLoadingDiet(false);
    }
  };

  // AI Workout Program trigger
  const generateWorkoutPlan = async () => {
    setLoadingWorkout(true);
    setApiError(null);
    try {
      const response = await fetch("/api/generate-workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weight,
          height,
          age,
          gender,
          activityLevel,
          goal,
          conditions,
        }),
      });

      if (!response.ok) {
        throw new Error("Workout generation endpoint returned error.");
      }

      const data = await response.json();
      setWorkoutPlan(data);
      setActiveTab("workout");
    } catch (err: any) {
      console.error(err);
      setApiError("Failed to formulate progressive overloading plan. Please try again.");
    } finally {
      setLoadingWorkout(false);
    }
  };

  // Native clean printing
  const handlePrint = () => {
    window.print();
  };

  // Navigation tabs metadata
  const tabItems = [
    { key: "assessment", label: "📋 AI Assessment", component: <HealthReportView report={healthReport} loading={loadingAssessment} onPrint={handlePrint} /> },
    { key: "diet", label: "🍎 Diet Planner", component: <DietPlannerView diet={dietPlan} loading={loadingDiet} onGenerate={generateDietPlan} preference={dietPreference} /> },
    { key: "workout", label: "🏋️ workout Program", component: <WorkoutPlannerView workout={workoutPlan} loading={loadingWorkout} onGenerate={generateWorkoutPlan} /> },
    { key: "progress", label: "📈 Progress Hub", component: <ProgressTrackerView records={records} onAddRecord={handleAddRecord} onDeleteRecord={handleDeleteRecord} targetCalories={healthReport?.macronutrients?.calories || liveTdee} /> },
    { key: "pdr", label: "📄 PDR Spec Reader", component: <PdrExplorer /> },
    { key: "admin", label: "⚙️ Admin Console", component: <AdminConsole settings={adminSettings} onSettingsChange={handleAdminSettingsChange} /> },
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans antialiased pb-20 selection:bg-brand-accent/30 selection:text-brand-accent">
      
      {/* Premium Medical-Grade Sticky Banner (Hides on print) */}
      <header className="sticky top-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-brand-border/40 py-4 px-6 no-print">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-brand-accent/15 border border-brand-accent/20 flex items-center justify-center text-brand-accent shadow-inner">
              <Heart className="w-5 h-5 fill-current animate-pulse-slow" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-brand-text">
                Smart Biometrics Assessment Center
              </h1>
              <span className="text-[10px] font-mono text-brand-text-muted">
                INTELLIGENT HEALTH METRICS PROFILER
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-brand-text-muted">
            <span className="hidden sm:inline">Clinical Constants Override:</span>
            <span className="bg-brand-card px-2.5 py-1 rounded-md border border-brand-border/50 text-brand-accent">
              Fit Range: {adminSettings.underweightLimit} - {adminSettings.overweightLimit} BMI
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        
        {/* Print Only Header (Visible only when compiled to print layout) */}
        <div className="hidden print:block border-b-2 border-slate-900 pb-4 mb-6">
          <h1 className="text-3xl font-black uppercase text-slate-900">
            Biometric Health Assessment Blueprint
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Generated on {new Date().toLocaleDateString()} for Clinical Interpretation
          </p>
          <div className="grid grid-cols-4 gap-4 mt-4 font-mono text-xs">
            <div>Height: {height} cm</div>
            <div>Weight: {weight} kg</div>
            <div>Age: {age} years</div>
            <div>Biological Sex: {gender}</div>
          </div>
        </div>

        {/* Global Error Banner */}
        {apiError && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-start gap-3 no-print">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-red-300">Connection Interrupted</h4>
              <p className="text-xs text-red-200 mt-0.5 leading-relaxed">
                {apiError} Verify that your Gemini key is saved in **Settings &gt; Secrets** of the AI Studio UI.
              </p>
            </div>
          </div>
        )}

        {/* Top Segment: Real-time Sliders Panel + Live Gauge Dial */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch no-print">
          
          {/* Slider input metrics */}
          <div className="lg:col-span-8 p-6 bg-brand-card/20 rounded-3xl border border-brand-border/40 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-brand-border/20 pb-3">
                <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-brand-accent" />
                  Real-time Biometrics Capture
                </h3>
                <span className="text-[10px] font-mono text-brand-text-muted">
                  Drag sliders to calibrate baselines
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Height Slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-brand-text-muted">Physiological Height</span>
                    <span className="font-mono text-brand-text">{height} cm</span>
                  </div>
                  <input
                    type="range"
                    min="120"
                    max="220"
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value))}
                    className="w-full h-1 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-accent"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-brand-text-muted/60 mt-1">
                    <span>120 cm</span>
                    <span>170 cm</span>
                    <span>220 cm</span>
                  </div>
                </div>

                {/* Weight Slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-brand-text-muted">Physiological Weight</span>
                    <span className="font-mono text-brand-text">{weight} kg</span>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="180"
                    value={weight}
                    onChange={(e) => setWeight(parseInt(e.target.value))}
                    className="w-full h-1 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-accent"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-brand-text-muted/60 mt-1">
                    <span>35 kg</span>
                    <span>105 kg</span>
                    <span>180 kg</span>
                  </div>
                </div>

                {/* Age Input */}
                <div>
                  <label className="text-xs font-semibold text-brand-text-muted block mb-1.5">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value) || 30)}
                    className="w-full px-4 py-2.5 bg-brand-bg/60 border border-brand-border/60 rounded-xl text-sm font-mono text-brand-text focus:outline-none focus:border-brand-accent"
                  />
                </div>

                {/* Biological Sex Options */}
                <div>
                  <span className="text-xs font-semibold text-brand-text-muted block mb-1.5">Biological Sex</span>
                  <div className="grid grid-cols-3 gap-2">
                    {["male", "female", "other"].map((sex) => (
                      <button
                        key={sex}
                        onClick={() => setGender(sex as any)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold cursor-pointer capitalize transition-all ${
                          gender === sex
                            ? "bg-brand-accent border-brand-accent text-brand-bg font-bold"
                            : "bg-brand-bg/40 border-brand-border/30 text-brand-text-muted hover:border-brand-border"
                        }`}
                      >
                        {sex}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Extra lifestyle variables dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-brand-border/20">
                {/* Activity Level */}
                <div>
                  <label className="text-xs font-semibold text-brand-text-muted block mb-1">Physical Activity</label>
                  <select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value as any)}
                    className="w-full px-3 py-2 bg-brand-bg/50 border border-brand-border/60 rounded-xl text-xs text-brand-text focus:outline-none focus:border-brand-accent"
                  >
                    <option value="sedentary">Sedentary (desk job)</option>
                    <option value="light">Light Workout (1-2 days/wk)</option>
                    <option value="moderate">Moderate Training (3-4 days/wk)</option>
                    <option value="active">Active Athletics (5-6 days/wk)</option>
                    <option value="very_active">Elite / Intense Daily Training</option>
                  </select>
                </div>

                {/* Fitness Goal */}
                <div>
                  <label className="text-xs font-semibold text-brand-text-muted block mb-1">Target Wellness Goal</label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value as any)}
                    className="w-full px-3 py-2 bg-brand-bg/50 border border-brand-border/60 rounded-xl text-xs text-brand-text focus:outline-none focus:border-brand-accent"
                  >
                    <option value="weight_loss">Adipose Fat Loss</option>
                    <option value="maintenance">Equilibrium / Maintenance</option>
                    <option value="weight_gain">Bodyweight Accrual</option>
                    <option value="muscle_gain">Hypertrophy / Muscle Mass</option>
                  </select>
                </div>

                {/* Diet Preference */}
                <div>
                  <label className="text-xs font-semibold text-brand-text-muted block mb-1">Cuisine / Diet Preference</label>
                  <select
                    value={dietPreference}
                    onChange={(e) => setDietPreference(e.target.value as any)}
                    className="w-full px-3 py-2 bg-brand-bg/50 border border-brand-border/60 rounded-xl text-xs text-brand-text focus:outline-none focus:border-brand-accent"
                  >
                    <option value="anything">Balanced / Unrestricted</option>
                    <option value="vegetarian">Ovo-Lacto Vegetarian</option>
                    <option value="vegan">Plant-Based / Vegan</option>
                    <option value="keto">Ketogenic (High Fat)</option>
                    <option value="low_carb">Low Carbohydrate</option>
                    <option value="paleo">Paleolithic Archetype</option>
                  </select>
                </div>
              </div>

              {/* Conditions text input */}
              <div>
                <label className="text-xs font-semibold text-brand-text-muted block mb-1">
                  Health Conditions & Clinical Remarks (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hypertension, mild type-2 diabetes risks, low knee mobility"
                  value={conditions}
                  onChange={(e) => setConditions(e.target.value)}
                  className="w-full px-4 py-2.5 bg-brand-bg/50 border border-brand-border/60 rounded-xl text-xs text-brand-text focus:outline-none focus:border-brand-accent"
                />
              </div>
            </div>

            {/* Action CTA Trigger */}
            <div className="pt-6 mt-6 border-t border-brand-border/20 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-[11px] text-brand-text-muted leading-relaxed max-w-md">
                Equations factored: **Quetelet** BMI index, basal caloric rest requirements via **Mifflin-St Jeor**, activity TDEE scale vectors.
              </div>

              <button
                onClick={generateAssessment}
                disabled={loadingAssessment}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-bold text-sm cursor-pointer transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/25 disabled:opacity-50"
              >
                {loadingAssessment ? (
                  <>
                    <div className="w-4 h-4 border-2 border-brand-bg border-t-transparent rounded-full animate-spin" />
                    Analyzing Telemetry...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Complete AI Diagnostics
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Live circular gauge dial (Interactive feedback) */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 bg-brand-card/25 rounded-3xl border border-brand-border/40">
            <BmiGauge bmi={liveBmi} category={liveCategory} />

            <div className="space-y-2.5 pt-4 border-t border-brand-border/20 font-mono text-[11px]">
              <div className="flex justify-between items-baseline text-brand-text-muted">
                <span>Calculated BMR (Basal):</span>
                <span className="text-brand-text font-bold">{liveBmr} kcal/day</span>
              </div>
              <div className="flex justify-between items-baseline text-brand-text-muted">
                <span>Calculated TDEE (Active):</span>
                <span className="text-brand-text font-bold">{liveTdee} kcal/day</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Selection Hub (Hides on print) */}
        <section className="no-print">
          <div className="flex flex-wrap gap-2.5 p-1 bg-brand-card/40 border border-brand-border/40 rounded-2xl">
            {tabItems.map((tab) => {
              // Highlight indicator if reports exist
              const hasReport =
                (tab.key === "diet" && dietPlan) ||
                (tab.key === "workout" && workoutPlan) ||
                (tab.key === "assessment" && healthReport);

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2.5 rounded-xl font-medium text-xs tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === tab.key
                      ? "bg-brand-accent text-brand-bg font-bold shadow-lg shadow-brand-accent/15"
                      : "text-brand-text-muted hover:text-brand-text hover:bg-brand-border/20"
                  }`}
                >
                  <span>{tab.label}</span>
                  {hasReport && (
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-accent-hover ring-2 ring-brand-bg" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Main Display Panel (Renders the selected active tab viewport) */}
        <section className="bg-brand-card/10 border border-brand-border/30 rounded-3xl p-6 min-h-[400px]">
          {tabItems.find((tab) => tab.key === activeTab)?.component}
        </section>
      </main>

      {/* Aesthetic footer with disclaimers (Hides on print) */}
      <footer className="mt-20 border-t border-brand-border/30 pt-8 px-6 text-center text-brand-text-muted text-[10px] leading-relaxed max-w-7xl mx-auto no-print space-y-2">
        <p className="font-mono text-brand-text-muted/60 uppercase tracking-wider">
          Smart BMI Health Assessment Portal • Enterprise Version 1.0.0
        </p>
        <p className="max-w-3xl mx-auto">
          Clinical Reference Declarations: BMI threshold ranges correspond to World Health Organization (WHO) and National Institutes of Health (NIH) directives. Basal energy expenditure simulations use Mifflin-St Jeor models. Dietary macros and routines represent evidence-guided benchmarks configured by server-side AI processing algorithms.
        </p>
        <p className="text-amber-500/80 max-w-xl mx-auto font-semibold">
          Disclaimer: This application does not constitute professional medical advice, clinical diagnoses, or direct therapeutic prescriptions. Always seek the consultation of a certified healthcare physician or nutritionist prior to initiating dietary alterations.
        </p>
      </footer>
    </div>
  );
}
