import React, { useState } from "react";
import { DietPlan } from "../types";
import { Coffee, CheckSquare, ListPlus, Flame, Apple, Sparkles } from "lucide-react";

interface DietPlannerViewProps {
  diet: DietPlan | null;
  loading: boolean;
  onGenerate: () => void;
  preference: string;
}

export default function DietPlannerView({ diet, loading, onGenerate, preference }: DietPlannerViewProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (item: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-brand-card/20 rounded-2xl border border-brand-border/40 min-h-[400px]">
        <div className="w-12 h-12 rounded-full border-4 border-brand-accent border-t-transparent animate-spin mb-4" />
        <p className="text-brand-text font-medium text-lg">Synthesizing Dietary Matrix...</p>
        <p className="text-brand-text-muted text-sm mt-1 max-w-md text-center px-4">
          Designing a customized, portion-controlled nutritional blueprint according to your biological constraints and culinary preferences.
        </p>
      </div>
    );
  }

  if (!diet) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-brand-card/20 rounded-2xl border border-brand-border/40 text-center px-6">
        <div className="p-4 bg-brand-border/30 rounded-full mb-4">
          <Apple className="w-10 h-10 text-brand-text-muted" />
        </div>
        <h3 className="text-xl font-bold text-brand-text">No Diet Program Generated</h3>
        <p className="text-brand-text-muted text-sm mt-2 max-w-sm">
          Once your health assessment is generated, click the button below to formulate your portion-controlled dietary guidelines.
        </p>
        <button
          onClick={onGenerate}
          className="mt-6 px-5 py-2 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-bold text-sm cursor-pointer transition-colors flex items-center gap-2 shadow-lg shadow-brand-accent/20"
        >
          <Sparkles className="w-4 h-4" />
          Generate Personalized Meal Plan
        </button>
      </div>
    );
  }

  // Helper to render macro badge
  const renderMacros = (cal: number, p: number, c: number, f: number) => (
    <div className="flex gap-2.5 mt-2 flex-wrap">
      <span className="text-[10px] font-mono font-medium text-brand-text bg-brand-border/40 px-2 py-0.5 rounded-md flex items-center gap-1">
        <Flame className="w-3 h-3 text-rose-400" /> {cal} kcal
      </span>
      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
        P: {p}g
      </span>
      <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md">
        C: {c}g
      </span>
      <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
        F: {f}g
      </span>
    </div>
  );

  const mealSections = [
    { key: "breakfast", title: "Breakfast Protocol", time: "07:30 AM", bg: "from-amber-500/10 to-transparent" },
    { key: "morningSnack", title: "Morning Hydration & Snack", time: "10:30 AM", bg: "from-teal-500/10 to-transparent" },
    { key: "lunch", title: "Lunch Protocol", time: "01:30 PM", bg: "from-emerald-500/10 to-transparent" },
    { key: "eveningSnack", title: "Mid-Afternoon Satiety Booster", time: "04:30 PM", bg: "from-sky-500/10 to-transparent" },
    { key: "dinner", title: "Dinner Protocol (Glycemic Control)", time: "07:30 PM", bg: "from-indigo-500/10 to-transparent" },
    { key: "bedtimeSnack", title: "Overnight Muscle Recovery Snack", time: "09:30 PM", bg: "from-purple-500/10 to-transparent" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-text flex items-center gap-2">
            <Coffee className="w-5 h-5 text-brand-accent" />
            Section 19: Culinary & Diet Blueprint
          </h2>
          <p className="text-xs text-brand-text-muted mt-0.5">
            Portion-controlled diet optimized for the <span className="text-brand-accent font-semibold">{preference}</span> preference.
          </p>
        </div>

        <button
          onClick={onGenerate}
          className="px-4 py-1.5 rounded-xl bg-brand-border/50 border border-brand-border/80 hover:bg-brand-border text-brand-text text-xs font-semibold cursor-pointer transition-colors"
        >
          Regenerate Meal Plan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Meals breakdown column */}
        <div className="lg:col-span-8 space-y-4">
          {mealSections.map(({ key, title, time, bg }) => {
            const meal = diet.meals[key as keyof typeof diet.meals];
            if (!meal) return null;

            return (
              <div
                key={key}
                className={`p-5 rounded-2xl bg-gradient-to-r ${bg} bg-brand-card/30 border border-brand-border/40 hover:border-brand-border transition-all flex flex-col md:flex-row justify-between gap-4`}
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-brand-accent font-semibold uppercase tracking-wide bg-brand-accent/10 border border-brand-accent/20 px-2 py-0.5 rounded-md">
                      {time}
                    </span>
                    <h4 className="text-sm font-bold text-brand-text">{title}</h4>
                  </div>
                  <h5 className="text-base font-semibold text-brand-text-muted">{meal.name}</h5>
                  <p className="text-xs text-brand-text-muted leading-relaxed">{meal.description}</p>
                </div>

                <div className="md:self-center md:text-right min-w-[150px]">
                  {renderMacros(meal.calories, meal.protein, meal.carbs, meal.fat)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Grocery list and tips column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Grocery list */}
          <div className="p-6 bg-brand-card/30 rounded-2xl border border-brand-border/50">
            <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider mb-4 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-brand-accent" />
              Dynamic Grocery list
            </h3>
            <p className="text-xs text-brand-text-muted mb-4 leading-relaxed">
              Tally of ingredients needed for this plan. Tick items off as you stock them:
            </p>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {diet.groceryList.map((item, idx) => {
                const isChecked = !!checkedItems[item];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleItem(item)}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl bg-brand-bg/40 border border-brand-border/30 text-left hover:bg-brand-border/20 transition-all cursor-pointer"
                  >
                    <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      isChecked ? "bg-brand-accent border-brand-accent text-brand-bg" : "border-brand-text-muted/50"
                    }`}>
                      {isChecked && (
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-xs leading-tight transition-all ${
                      isChecked ? "line-through text-brand-text-muted/60" : "text-brand-text"
                    }`}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cooking Tips */}
          <div className="p-6 bg-brand-card/30 rounded-2xl border border-brand-border/50 space-y-4">
            <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider flex items-center gap-2">
              <ListPlus className="w-4 h-4 text-brand-accent" />
              Dietary Instructions
            </h3>

            <div className="space-y-3">
              {diet.dietaryTips.map((tip, idx) => (
                <div key={idx} className="flex gap-2.5 text-xs text-brand-text-muted leading-relaxed">
                  <span className="text-brand-accent font-semibold">•</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
