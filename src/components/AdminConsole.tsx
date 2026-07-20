import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Settings, Shield, Sliders, Database, Activity, RefreshCw } from "lucide-react";

interface AdminConsoleProps {
  onSettingsChange: (key: string, value: number) => void;
  settings: {
    underweightLimit: number;
    overweightLimit: number;
    activityMultiplier: number;
  };
}

export default function AdminConsole({ onSettingsChange, settings }: AdminConsoleProps) {
  const [selectedTable, setSelectedTable] = useState<string>("users");
  const [telemetry, setTelemetry] = useState<Array<{ time: string; cpu: number; memory: number; latency: number }>>([]);

  // Generate dynamic telemetry points to make it live and interesting
  useEffect(() => {
    const generateInitialData = () => {
      const data = [];
      const now = new Date();
      for (let i = 10; i >= 0; i--) {
        const timeStr = new Date(now.getTime() - i * 5000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        data.push({
          time: timeStr,
          cpu: Math.floor(Math.random() * 25) + 15, // 15-40%
          memory: Math.floor(Math.random() * 10) + 55, // 55-65%
          latency: Math.floor(Math.random() * 45) + 85, // 85-130ms
        });
      }
      return data;
    };

    setTelemetry(generateInitialData());

    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const nextData = [...prev.slice(1)];
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        nextData.push({
          time: timeStr,
          cpu: Math.floor(Math.random() * 30) + 15,
          memory: Math.floor(Math.random() * 5) + 58,
          latency: Math.floor(Math.random() * 50) + 80,
        });
        return nextData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const tables = {
    users: {
      description: "Primary user identities and authentication timestamps.",
      schema: `CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);`,
      relations: "1-to-many with bmi_records, goals, subscriptions, and progress_logs"
    },
    bmi_records: {
      description: "Biometric calculations, BMR, TDEE targets and generated reports.",
      schema: `CREATE TABLE bmi_records (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
  weight_kg DECIMAL(5,2) NOT NULL,
  height_cm DECIMAL(5,2) NOT NULL,
  age INT NOT NULL,
  gender VARCHAR(10) NOT NULL,
  bmi DECIMAL(4,1) NOT NULL,
  bmr INT NOT NULL,
  tdee INT NOT NULL,
  target_calories INT NOT NULL,
  report_json JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);`,
      relations: "Many-to-1 with users. 1-to-1 with diet_plans, exercises"
    },
    diet_plans: {
      description: "Personalized diet templates and dynamic grocery items.",
      schema: `CREATE TABLE diet_plans (
  id VARCHAR(36) PRIMARY KEY,
  bmi_record_id VARCHAR(36) REFERENCES bmi_records(id) ON DELETE CASCADE,
  diet_preference VARCHAR(30) NOT NULL,
  meals_json JSONB NOT NULL,
  grocery_list TEXT[] NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);`,
      relations: "1-to-1 with bmi_records"
    },
    progress_logs: {
      description: "Aggregated weigh-ins and calorie tallies representing history.",
      schema: `CREATE TABLE progress_logs (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  weight_kg DECIMAL(5,2) NOT NULL,
  calories_logged INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);`,
      relations: "Many-to-1 with users"
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-brand-text flex items-center gap-2">
          <Shield className="w-5 h-5 text-brand-accent animate-pulse" />
          Section 22: Live Admin Control & Infrastructure
        </h2>
        <p className="text-xs text-brand-text-muted mt-0.5">
          Modify physiological thresholds, explore relational database schemas, and monitor virtual server performance indicators.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Resource Telemetry Monitoring */}
        <div className="lg:col-span-8 p-6 bg-brand-card/30 rounded-2xl border border-brand-border/50 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Platform Telemetry Monitors
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin" /> Live Syncing
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-brand-bg/50 border border-brand-border/30 rounded-xl">
              <span className="text-[10px] text-brand-text-muted block">CPU Load</span>
              <span className="font-mono text-base font-bold text-brand-accent">
                {telemetry[telemetry.length - 1]?.cpu || 0}%
              </span>
            </div>
            <div className="p-3 bg-brand-bg/50 border border-brand-border/30 rounded-xl">
              <span className="text-[10px] text-brand-text-muted block">RAM Occupancy</span>
              <span className="font-mono text-base font-bold text-sky-400">
                {telemetry[telemetry.length - 1]?.memory || 0}%
              </span>
            </div>
            <div className="p-3 bg-brand-bg/50 border border-brand-border/30 rounded-xl">
              <span className="text-[10px] text-brand-text-muted block">API Latency</span>
              <span className="font-mono text-base font-bold text-amber-400">
                {telemetry[telemetry.length - 1]?.latency || 0} ms
              </span>
            </div>
          </div>

          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetry} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="latencyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.2} />
                <XAxis dataKey="time" stroke="#a1a1aa" fontSize={9} />
                <YAxis stroke="#a1a1aa" fontSize={9} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#161618", borderColor: "#27272a", color: "#f1f5f9" }}
                />
                <Area type="monotone" name="CPU Usage (%)" dataKey="cpu" stroke="#10b981" fillOpacity={1} fill="url(#cpuGrad)" />
                <Area type="monotone" name="Latency (ms)" dataKey="latency" stroke="#f59e0b" fillOpacity={1} fill="url(#latencyGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Global Variables Adjuster Sliders */}
        <div className="lg:col-span-4 p-6 bg-brand-card/30 rounded-2xl border border-brand-border/50 space-y-4">
          <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-brand-accent" />
            Core Constants Control
          </h3>
          <p className="text-xs text-brand-text-muted leading-relaxed">
            Tune medical threshold triggers. Changes override classifications dynamically on this tab:
          </p>

          <div className="space-y-4 pt-2">
            {/* Underweight Limit Slider */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-brand-text">Underweight Threshold</span>
                <span className="font-mono text-brand-accent">{settings.underweightLimit}</span>
              </div>
              <input
                type="range"
                min="16"
                max="20"
                step="0.1"
                value={settings.underweightLimit}
                onChange={(e) => onSettingsChange("underweightLimit", parseFloat(e.target.value))}
                className="w-full accent-brand-accent cursor-pointer bg-brand-border h-1 rounded-lg"
              />
            </div>

            {/* Overweight Limit Slider */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-brand-text">Overweight Threshold</span>
                <span className="font-mono text-brand-accent">{settings.overweightLimit}</span>
              </div>
              <input
                type="range"
                min="23"
                max="28"
                step="0.1"
                value={settings.overweightLimit}
                onChange={(e) => onSettingsChange("overweightLimit", parseFloat(e.target.value))}
                className="w-full accent-brand-accent cursor-pointer bg-brand-border h-1 rounded-lg"
              />
            </div>

            {/* Activity multiplier slider */}
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-brand-text">Calorie Offset (multiplier)</span>
                <span className="font-mono text-brand-accent">{settings.activityMultiplier}x</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="1.5"
                step="0.05"
                value={settings.activityMultiplier}
                onChange={(e) => onSettingsChange("activityMultiplier", parseFloat(e.target.value))}
                className="w-full accent-brand-accent cursor-pointer bg-brand-border h-1 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SQL Relational Database visual schema mapping */}
      <div className="p-6 bg-brand-card/30 rounded-2xl border border-brand-border/50 space-y-4">
        <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider flex items-center gap-2">
          <Database className="w-4 h-4 text-brand-accent" />
          Interactive PostgreSQL Relational Database Schema Mapping
        </h3>
        <p className="text-xs text-brand-text-muted leading-relaxed">
          Select individual SQL relational schemas to verify constraints, keys, variables, and join attributes:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
          {/* Tables select */}
          <div className="md:col-span-3 space-y-2">
            {Object.keys(tables).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTable(t)}
                className={`w-full p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  selectedTable === t
                    ? "bg-brand-accent/5 border-brand-accent text-brand-text"
                    : "bg-brand-bg/40 border-brand-border/30 text-brand-text-muted hover:border-brand-border/80"
                }`}
              >
                <span className="font-mono text-xs font-bold font-semibold">{t}</span>
              </button>
            ))}
          </div>

          {/* Schema output */}
          <div className="md:col-span-9 p-4 bg-brand-bg/80 border border-brand-border/40 rounded-xl space-y-3 font-mono">
            <div>
              <span className="text-[10px] text-brand-text-muted uppercase">Entity Description</span>
              <p className="text-xs text-brand-text mt-0.5">
                {tables[selectedTable as keyof typeof tables].description}
              </p>
            </div>

            <div>
              <span className="text-[10px] text-brand-text-muted uppercase">Relation Mappings</span>
              <p className="text-xs text-brand-accent mt-0.5">
                {tables[selectedTable as keyof typeof tables].relations}
              </p>
            </div>

            <div className="pt-2 border-t border-brand-border/20">
              <span className="text-[10px] text-brand-text-muted uppercase block mb-1">SQL Definition</span>
              <pre className="text-[11px] text-emerald-400 overflow-x-auto leading-relaxed bg-brand-bg/50 p-3 rounded-lg">
                {tables[selectedTable as keyof typeof tables].schema}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
