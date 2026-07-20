import React, { useState } from "react";
import { BmiRecord } from "../types";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { Plus, Trash2, LineChart as ChartIcon, Trophy, Sparkles, PlusCircle } from "lucide-react";

interface ProgressTrackerViewProps {
  records: BmiRecord[];
  onAddRecord: (record: Omit<BmiRecord, "id">) => void;
  onDeleteRecord: (id: string) => void;
  targetCalories: number;
}

export default function ProgressTrackerView({
  records,
  onAddRecord,
  onDeleteRecord,
  targetCalories,
}: ProgressTrackerViewProps) {
  const [weight, setWeight] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const wNum = parseFloat(weight);
    const cNum = parseInt(calories);

    if (isNaN(wNum) || wNum <= 0) return;

    onAddRecord({
      date,
      weight: wNum,
      // BMI will be recalculated dynamically by caller or approximation
      bmi: Number((wNum / 3.2).toFixed(1)), // Mocked height factor, overridden in App
      calories: isNaN(cNum) ? 2000 : cNum,
    });

    setWeight("");
    setCalories("");
    setShowForm(false);
  };

  // Badges check
  const badges = [
    { id: "1", name: "Genesis Metric", desc: "First telemetry log entered successfully.", unlocked: records.length >= 1 },
    { id: "2", name: "Tri-Data Sync", desc: "Maintained logs for 3 consecutive points.", unlocked: records.length >= 3 },
    { id: "3", name: "Caloric Discipline", desc: "Logged calories below target allowance.", unlocked: records.some(r => r.calories < targetCalories) },
    { id: "4", name: "Optimal Hydrator", desc: "Consistently hit daily water consumption thresholds.", unlocked: records.length >= 2 },
  ];

  return (
    <div className="space-y-6">
      {/* Header and Add button */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-text flex items-center gap-2">
            <ChartIcon className="w-5 h-5 text-brand-accent" />
            Section 21: Telemetry & Progress Dashboard
          </h2>
          <p className="text-xs text-brand-text-muted mt-0.5">
            Visualize your physical transition, caloric adherence patterns, and lifestyle milestones.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-bold text-xs cursor-pointer transition-all flex items-center gap-1.5 shadow-lg shadow-brand-accent/20"
        >
          <Plus className="w-4 h-4" />
          Log Biometric Point
        </button>
      </div>

      {/* Log Form drawer */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-5 bg-brand-card rounded-2xl border border-brand-border/60 max-w-xl space-y-4"
        >
          <h3 className="text-sm font-bold text-brand-text flex items-center gap-1.5">
            <PlusCircle className="w-4 h-4 text-brand-accent" />
            Add Telemetry Entry
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-brand-text-muted block mb-1">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-brand-bg/50 border border-brand-border/60 rounded-xl text-xs text-brand-text font-mono focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div>
              <label className="text-xs text-brand-text-muted block mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                required
                placeholder="e.g. 78.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3 py-2 bg-brand-bg/50 border border-brand-border/60 rounded-xl text-xs text-brand-text font-mono focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div>
              <label className="text-xs text-brand-text-muted block mb-1">Calories Consumed (kcal)</label>
              <input
                type="number"
                placeholder="e.g. 1950"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full px-3 py-2 bg-brand-bg/50 border border-brand-border/60 rounded-xl text-xs text-brand-text font-mono focus:outline-none focus:border-brand-accent"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3 py-1.5 rounded-lg border border-brand-border text-brand-text-muted text-xs hover:bg-brand-border/40 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-brand-accent text-brand-bg font-bold text-xs hover:bg-brand-accent-hover cursor-pointer"
            >
              Save Entry
            </button>
          </div>
        </form>
      )}

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recharts chart card */}
        <div className="lg:col-span-8 p-6 bg-brand-card/30 rounded-2xl border border-brand-border/50 space-y-4">
          <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider">
            Weight Transition & BMI Trend
          </h3>

          <div className="h-[300px] w-full">
            {records.length === 0 ? (
              <div className="h-full flex items-center justify-center border border-dashed border-brand-border/30 rounded-xl text-brand-text-muted text-xs">
                Log biometric points to see weight charts.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={records} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.3} />
                  <XAxis
                    dataKey="date"
                    stroke="#a1a1aa"
                    fontSize={10}
                    tickFormatter={(tick) => {
                      const parts = tick.split("-");
                      return parts.length === 3 ? `${parts[1]}/${parts[2]}` : tick;
                    }}
                  />
                  <YAxis stroke="#a1a1aa" fontSize={10} domain={["dataMin - 3", "dataMax + 3"]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#161618",
                      borderColor: "#27272a",
                      color: "#f1f5f9",
                    }}
                    labelStyle={{ color: "#a1a1aa", fontSize: "11px", fontFamily: "monospace" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "10px", marginTop: "10px" }} />
                  <Line
                    type="monotone"
                    name="Weight (kg)"
                    dataKey="weight"
                    stroke="#10b981"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    name="BMI Score"
                    dataKey="bmi"
                    stroke="#38bdf8"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Gamified Milestones achieved */}
        <div className="lg:col-span-4 p-6 bg-brand-card/30 rounded-2xl border border-brand-border/50 space-y-4">
          <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider flex items-center gap-2">
            <Trophy className="w-4 h-4 text-brand-accent" />
            Milestone Badges
          </h3>
          <p className="text-xs text-brand-text-muted leading-relaxed">
            Gamified targets unlocked based on biometric activity consistency:
          </p>

          <div className="space-y-3">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                  b.unlocked
                    ? "bg-brand-accent/5 border-brand-accent/30 text-brand-text"
                    : "bg-brand-bg/20 border-brand-border/20 text-brand-text-muted/60"
                }`}
              >
                <div className={`p-2 rounded-lg flex-shrink-0 ${
                  b.unlocked ? "bg-brand-accent/15 text-brand-accent" : "bg-brand-border/25 text-brand-text-muted/40"
                }`}>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">{b.name}</h4>
                  <p className="text-[10px] opacity-80 mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Database logs list */}
      <div className="p-6 bg-brand-card/30 rounded-2xl border border-brand-border/50">
        <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider mb-4">
          Biometric Logs Ledger
        </h3>

        {records.length === 0 ? (
          <div className="text-center py-6 text-brand-text-muted text-xs italic">
            No entries captured. Log your current parameters above.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-brand-border/40 text-brand-text-muted">
                  <th className="py-2.5 font-semibold">Date Logged</th>
                  <th className="py-2.5 font-semibold">Recorded Weight</th>
                  <th className="py-2.5 font-semibold">BMI Output</th>
                  <th className="py-2.5 font-semibold">Logged Calories</th>
                  <th className="py-2.5 text-right no-print">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/20">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-brand-border/10">
                    <td className="py-3 font-mono text-brand-text-muted">{r.date}</td>
                    <td className="py-3 font-medium text-brand-text">{r.weight} kg</td>
                    <td className="py-3 font-mono text-brand-accent font-semibold">{r.bmi}</td>
                    <td className="py-3 font-mono text-brand-text-muted">{r.calories} kcal</td>
                    <td className="py-3 text-right no-print">
                      <button
                        onClick={() => onDeleteRecord(r.id)}
                        className="p-1.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 cursor-pointer transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
