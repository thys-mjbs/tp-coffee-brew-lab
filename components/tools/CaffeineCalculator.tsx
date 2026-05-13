"use client"

import { useState } from "react"

type Method = "drip" | "frenchpress" | "espresso" | "coldbrew" | "instant" | "pourover"
type Roast  = "light" | "medium" | "dark"

// Caffeine mg per gram of coffee (approximate, method-specific extraction efficiency)
const METHOD_DATA: Record<Method, {
  label: string
  mgPerG: number         // caffeine extracted per gram of coffee
  typicalG: number       // typical dose in grams
  note: string
}> = {
  drip:        { label: "Drip / filter",     mgPerG: 7.5,  typicalG: 15,  note: "Standard 250ml cup" },
  pourover:    { label: "Pour over",         mgPerG: 7.8,  typicalG: 15,  note: "V60, Chemex, Kalita" },
  frenchpress: { label: "French press",      mgPerG: 7.2,  typicalG: 17,  note: "8-cup press (1L)" },
  espresso:    { label: "Espresso",          mgPerG: 6.8,  typicalG: 18,  note: "Double shot (~36ml yield)" },
  coldbrew:    { label: "Cold brew",         mgPerG: 6.5,  typicalG: 100, note: "Per 250ml concentrate serving" },
  instant:     { label: "Instant coffee",    mgPerG: 4.2,  typicalG: 3,   note: "Per level teaspoon (1.8g)" },
}

// Roast affects caffeine: lighter roasts have slightly more caffeine by weight
const ROAST_FACTOR: Record<Roast, { label: string; factor: number }> = {
  light:  { label: "Light roast",  factor: 1.05 },
  medium: { label: "Medium roast", factor: 1.0  },
  dark:   { label: "Dark roast",   factor: 0.95 },
}

const FDA_DAILY_MG = 400  // FDA recommended daily limit for healthy adults

function round0(n: number) { return Math.round(n) }

export function CaffeineCalculator() {
  const [method, setMethod] = useState<Method>("drip")
  const [roast, setRoast]   = useState<Roast>("medium")
  const [cups, setCups]     = useState(1)

  const data      = METHOD_DATA[method]
  const caffPerCup = round0(data.mgPerG * data.typicalG * ROAST_FACTOR[roast].factor)
  const totalCaff  = caffPerCup * cups
  const pctDaily   = Math.min(Math.round((totalCaff / FDA_DAILY_MG) * 100), 999)
  const barWidth   = Math.min(pctDaily, 100)
  const barColor   = pctDaily < 50 ? "bg-green-500" : pctDaily < 85 ? "bg-brand-500" : "bg-red-400"

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">
      <div className="space-y-6 p-5 sm:p-6">

        {/* Method */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Brew method</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {(Object.entries(METHOD_DATA) as [Method, typeof METHOD_DATA[Method]][]).map(([key, val]) => (
              <button key={key} onClick={() => setMethod(key)}
                className={`min-h-[44px] rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all ${
                  method === key
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                }`}>
                <span className="block font-semibold">{val.label}</span>
                <span className="block opacity-75">{val.note}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Roast + cups */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[150px]">
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Roast level</label>
            <div className="flex gap-2">
              {(Object.entries(ROAST_FACTOR) as [Roast, typeof ROAST_FACTOR[Roast]][]).map(([key, val]) => (
                <button key={key} onClick={() => setRoast(key)}
                  className={`min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                    roast === key
                      ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                      : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                  }`}>{val.label.split(" ")[0]}</button>
              ))}
            </div>
          </div>
          <div className="shrink-0">
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Cups / servings</label>
            <div className="flex gap-2">
              {[1,2,3,4,5].map((n) => (
                <button key={n} onClick={() => setCups(n)}
                  className={`min-h-[44px] min-w-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                    cups === n
                      ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                      : "border-surface-200 bg-white text-surface-700 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500"
                  }`}>{n}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Result ── */}
      <div className="border-t border-brand-200 bg-brand-50 px-5 py-5 sm:px-6 dark:border-green-800 dark:bg-green-950">
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Per serving",  value: `${caffPerCup} mg`, highlight: true },
            { label: `${cups} ${cups === 1 ? "serving" : "servings"}`, value: `${totalCaff} mg`, highlight: false },
            { label: "Daily limit",  value: `${pctDaily}%`,     highlight: false },
          ].map((item) => (
            <div key={item.label} className={`rounded-xl p-3 ${item.highlight ? "bg-brand-600 text-white" : "bg-white dark:bg-surface-800"}`}>
              <p className={`text-xs font-medium mb-1 ${item.highlight ? "text-brand-100" : "text-surface-500 dark:text-surface-400"}`}>{item.label}</p>
              <p className={`font-mono text-xl font-bold leading-none ${item.highlight ? "text-white" : "text-surface-800 dark:text-surface-100"}`}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Daily limit bar */}
        <div>
          <div className="mb-1.5 flex justify-between text-xs text-surface-500 dark:text-surface-400">
            <span>0 mg</span>
            <span>FDA daily limit: 400 mg</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-200 dark:bg-surface-700">
            <div className={`h-full rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${barWidth}%` }} />
          </div>
          <p className="mt-2 text-xs text-surface-500 dark:text-surface-400">
            {pctDaily < 50
              ? "Well within the FDA recommended daily limit of 400mg for healthy adults."
              : pctDaily < 100
              ? "Approaching the FDA recommended daily limit. Consider your other caffeine sources."
              : "Exceeds the FDA recommended daily limit. This estimate is for reference only."}
          </p>
        </div>

        <p className="mt-3 text-xs text-surface-400 dark:text-surface-500">
          Caffeine estimates are approximate. Actual content varies by bean origin, roast batch, and brewing variables. Consult a healthcare provider if you have caffeine sensitivity.
        </p>
      </div>
    </div>
  )
}
