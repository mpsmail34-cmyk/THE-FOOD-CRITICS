import React from "react";

interface BmiGaugeProps {
  bmi: number;
  category: string;
}

export default function BmiGauge({ bmi, category }: BmiGaugeProps) {
  // Clamp BMI for display on a scale of 10 to 40
  const minBmi = 10;
  const maxBmi = 40;
  const clampedBmi = Math.max(minBmi, Math.min(maxBmi, bmi));

  // Calculate percentage along the gauge (0 to 100)
  const percentage = ((clampedBmi - minBmi) / (maxBmi - minBmi)) * 100;

  // Map percentage to angle in a 180-degree semi-circle (-90 to +90 deg or 180 to 360 deg)
  // For rotation of pointer: -90 degrees (at BMI 10) to +90 degrees (at BMI 40)
  const needleRotation = -90 + (percentage / 100) * 180;

  // Determine standard colors
  let colorClass = "text-blue-400";
  let bgClass = "bg-blue-500/20 border-blue-500/30";
  if (bmi >= 18.5 && bmi < 25) {
    colorClass = "text-emerald-400";
    bgClass = "bg-emerald-500/20 border-emerald-500/30";
  } else if (bmi >= 25 && bmi < 30) {
    colorClass = "text-amber-400";
    bgClass = "bg-amber-500/20 border-amber-500/30";
  } else if (bmi >= 30) {
    colorClass = "text-red-400";
    bgClass = "bg-red-500/20 border-red-500/30";
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-brand-card/40 rounded-2xl border border-brand-border/50">
      <h3 className="text-sm font-medium text-brand-text-muted mb-4 tracking-wider uppercase">
        Live Biometric Gauge
      </h3>

      {/* SVG Semi-Circle Gauge */}
      <div className="relative w-64 h-32 flex items-end justify-center overflow-hidden">
        <svg className="w-60 h-30" viewBox="0 0 200 100">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" /> {/* Underweight */}
              <stop offset="35%" stopColor="#10b981" /> {/* Healthy */}
              <stop offset="70%" stopColor="#f59e0b" /> {/* Overweight */}
              <stop offset="100%" stopColor="#ef4444" /> {/* Obese */}
            </linearGradient>
          </defs>

          {/* Outer Gauge Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#1e293b"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Colored Gauge Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Core Center Pivot */}
          <circle cx="100" cy="100" r="10" fill="#f8fafc" />
          <circle cx="100" cy="100" r="4" fill="#0b111e" />

          {/* Gauge Needle Pointer */}
          <g transform={`translate(100, 100) rotate(${needleRotation})`}>
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-75"
              stroke="#f8fafc"
              strokeWidth="4"
              strokeLinecap="round"
              className="transition-transform duration-500 ease-out"
            />
            <polygon points="-6,0 0,-12 6,0" fill="#f8fafc" />
          </g>
        </svg>

        {/* Floating BMI Readout */}
        <div className="absolute bottom-2 text-center">
          <div className="font-mono text-3xl font-bold text-brand-text tracking-tight">
            {bmi || "0.0"}
          </div>
          <div className="text-xs font-medium text-brand-text-muted">
            BMI score
          </div>
        </div>
      </div>

      {/* Threshold Labels */}
      <div className="w-full flex justify-between text-[10px] font-mono text-brand-text-muted px-4 mt-2 mb-4">
        <span>10 (Min)</span>
        <span>18.5 (Fit)</span>
        <span>25 (Over)</span>
        <span>30+ (Obese)</span>
      </div>

      {/* Dynamic Classification Card */}
      <div className={`w-full px-4 py-2.5 rounded-xl border ${bgClass} text-center`}>
        <span className="text-xs text-brand-text-muted font-medium">Status: </span>
        <span className={`text-sm font-bold uppercase tracking-wide ${colorClass}`}>
          {category || "Awaiting Biometrics"}
        </span>
      </div>
    </div>
  );
}
