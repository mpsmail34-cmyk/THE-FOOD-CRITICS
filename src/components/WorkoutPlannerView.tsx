import React, { useState } from "react";
import { WorkoutPlan } from "../types";
import { Dumbbell, ShieldAlert, Award, Calendar, ChevronRight, Activity, Sparkles } from "lucide-react";

interface WorkoutPlannerViewProps {
  workout: WorkoutPlan | null;
  loading: boolean;
  onGenerate: () => void;
}

export default function WorkoutPlannerView({ workout, loading, onGenerate }: WorkoutPlannerViewProps) {
  const [selectedDay, setSelectedDay] = useState<string>("all");

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-brand-card/20 rounded-2xl border border-brand-border/40 min-h-[400px]">
        <div className="w-12 h-12 rounded-full border-4 border-brand-accent border-t-transparent animate-spin mb-4" />
        <p className="text-brand-text font-medium text-lg">Assembling Athletic Blueprints...</p>
        <p className="text-brand-text-muted text-sm mt-1 max-w-md text-center px-4">
          Drafting a tailored, scientific training calendar with progressive overload targets based on your biometric goals and constraints.
        </p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-brand-card/20 rounded-2xl border border-brand-border/40 text-center px-6">
        <div className="p-4 bg-brand-border/30 rounded-full mb-4">
          <Dumbbell className="w-10 h-10 text-brand-text-muted" />
        </div>
        <h3 className="text-xl font-bold text-brand-text">No Workout Routine Compiled</h3>
        <p className="text-brand-text-muted text-sm mt-2 max-w-sm">
          Formulate your biometrically-sound physical activity plan to enhance cardiovascular endurance and skeletal strength.
        </p>
        <button
          onClick={onGenerate}
          className="mt-6 px-5 py-2 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-bold text-sm cursor-pointer transition-colors flex items-center gap-2 shadow-lg shadow-brand-accent/20"
        >
          <Sparkles className="w-4 h-4" />
          Generate Training Routine
        </button>
      </div>
    );
  }

  // Filter routines based on selectedDay state
  const filteredRoutine = selectedDay === "all"
    ? workout.routine
    : workout.routine.filter((r) => r.day.toLowerCase() === selectedDay.toLowerCase());

  const getIntensityBadge = (intensity: string) => {
    const val = intensity.toLowerCase();
    if (val.includes("high") || val.includes("heavy")) {
      return "text-red-400 bg-red-500/10 border-red-500/20";
    }
    if (val.includes("moderate") || val.includes("medium")) {
      return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    }
    return "text-sky-400 bg-sky-500/10 border-sky-500/20";
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-text flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-brand-accent" />
            Section 20: Progressive Overload Workout Program
          </h2>
          <p className="text-xs text-brand-text-muted mt-0.5">
            A 7-day science-based split routine engineered for optimal athletic outcomes and metabolic conditioning.
          </p>
        </div>

        <button
          onClick={onGenerate}
          className="px-4 py-1.5 rounded-xl bg-brand-border/50 border border-brand-border/80 hover:bg-brand-border text-brand-text text-xs font-semibold cursor-pointer transition-colors"
        >
          Regenerate Routine
        </button>
      </div>

      {/* Day Filter Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-brand-bg/60 border border-brand-border/30 rounded-xl">
        <button
          onClick={() => setSelectedDay("all")}
          className={`px-3 py-1.5 rounded-lg font-mono text-xs cursor-pointer transition-all ${
            selectedDay === "all"
              ? "bg-brand-accent text-brand-bg font-bold"
              : "text-brand-text-muted hover:text-brand-text hover:bg-brand-border/30"
          }`}
        >
          Full Schedule (All Days)
        </button>
        {workout.routine.map((r, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedDay(r.day)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs cursor-pointer transition-all ${
              selectedDay === r.day
                ? "bg-brand-accent text-brand-bg font-bold"
                : "text-brand-text-muted hover:text-brand-text hover:bg-brand-border/30"
            }`}
          >
            {r.day}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Routines Split */}
        <div className="lg:col-span-8 space-y-6">
          {filteredRoutine.map((dayPlan, dIdx) => (
            <div
              key={dIdx}
              className="p-6 bg-brand-card/30 rounded-2xl border border-brand-border/40 space-y-4"
            >
              {/* Day title & focus */}
              <div className="flex justify-between items-start border-b border-brand-border/30 pb-3 flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-accent" />
                    <span className="font-mono text-xs text-brand-accent font-bold uppercase tracking-wider">
                      {dayPlan.day}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-brand-text mt-1">{dayPlan.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-brand-text-muted uppercase block">Training Focus</span>
                  <span className="text-xs font-semibold text-brand-text-muted">{dayPlan.focus}</span>
                </div>
              </div>

              {/* Day's exercises list */}
              <div className="space-y-4">
                {dayPlan.exercises.length === 0 || (dayPlan.exercises.length === 1 && dayPlan.exercises[0].name.toLowerCase().includes("rest")) ? (
                  <div className="py-6 text-center bg-brand-bg/20 rounded-xl border border-dashed border-brand-border/30">
                    <Activity className="w-8 h-8 text-brand-text-muted mx-auto mb-2 opacity-55" />
                    <p className="text-sm text-brand-text-muted font-medium">Rest & Physiological Regeneration</p>
                    <p className="text-xs text-brand-text-muted/70 mt-1 max-w-xs mx-auto">
                      Crucial period for muscle protein synthesis, glycogen replenishment, and central nervous system recovery.
                    </p>
                  </div>
                ) : (
                  dayPlan.exercises.map((ex, exIdx) => (
                    <div
                      key={exIdx}
                      className="p-4 rounded-xl bg-brand-bg/40 border border-brand-border/30 flex flex-col md:flex-row justify-between gap-4 hover:border-brand-border/70 transition-all"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-brand-accent" />
                          <h4 className="text-sm font-bold text-brand-text">{ex.name}</h4>
                          <span className={`text-[9px] font-mono font-medium px-2 py-0.5 rounded-full border ${getIntensityBadge(ex.intensity)}`}>
                            {ex.intensity}
                          </span>
                        </div>
                        <p className="text-xs text-brand-text-muted leading-relaxed pl-6">{ex.description}</p>
                      </div>

                      <div className="flex md:flex-col md:items-end md:justify-center justify-between pl-6 md:pl-0 border-t border-brand-border/20 md:border-none pt-2.5 md:pt-0 text-xs min-w-[140px] gap-1">
                        {ex.setsReps !== "N/A" && (
                          <div>
                            <span className="text-brand-text-muted">Sets/Reps: </span>
                            <span className="font-mono font-semibold text-brand-text">{ex.setsReps}</span>
                          </div>
                        )}
                        {ex.duration !== "N/A" && (
                          <div>
                            <span className="text-brand-text-muted">Duration: </span>
                            <span className="font-mono font-semibold text-brand-text">{ex.duration}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Safety & Progressive Overload details */}
        <div className="lg:col-span-4 space-y-6">
          {/* Progression Guidelines */}
          <div className="p-6 bg-brand-card/30 rounded-2xl border border-brand-border/50 space-y-4">
            <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-accent" />
              Progression Rules
            </h3>

            <div className="space-y-3">
              {workout.progressionTips.map((tip, idx) => (
                <div key={idx} className="flex gap-2 text-xs text-brand-text-muted leading-relaxed">
                  <span className="text-brand-accent font-semibold">•</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Alerts */}
          <div className="p-6 bg-brand-card/30 rounded-2xl border border-brand-border/50 border-amber-500/30 bg-amber-500/5 space-y-4">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 animate-pulse" />
              Safe Practice protocols
            </h3>

            <div className="space-y-3">
              {workout.safetyPrecautions.map((caution, idx) => (
                <div key={idx} className="flex gap-2 text-xs text-brand-text-muted leading-relaxed">
                  <span className="text-amber-400 font-semibold">•</span>
                  <span>{caution}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
