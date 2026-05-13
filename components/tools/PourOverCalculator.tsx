"use client"

import { useState, useCallback } from "react"

// ─── Constants ────────────────────────────────────────────────────────────────

type Method = "v60" | "chemex" | "kalita"
type Recipe = "custom" | "hoffmann" | "kasuya"
type Unit = "metric" | "imperial"

const METHODS: Record<Method, { label: string; sub: string }> = {
  v60:    { label: "V60",    sub: "Hario V60" },
  chemex: { label: "Chemex", sub: "All sizes" },
  kalita: { label: "Kalita", sub: "Wave 185" },
}

// Preset recipes — all use 1:15 ratio except noted
const RECIPES: Record<Recipe, {
  label: string
  ratio: number
  bloomRatio: number   // bloom water = this x coffee grams
  bloomSec: number
  pours: number        // number of pours after bloom
  note: string
}> = {
  custom: {
    label: "Custom ratio",
    ratio: 16,
    bloomRatio: 2,
    bloomSec: 30,
    pours: 3,
    note: "Adjust the ratio below to your preference",
  },
  hoffmann: {
    label: "James Hoffmann",
    ratio: 16.67,   // 500ml / 30g
    bloomRatio: 2,
    bloomSec: 45,
    pours: 1,       // single continuous pour after bloom
    note: "30g coffee, 500ml water — one slow continuous pour after bloom",
  },
  kasuya: {
    label: "Tetsu Kasuya 4:6",
    ratio: 15,
    bloomRatio: 0,  // no bloom — first pour IS the bloom
    bloomSec: 0,
    pours: 5,       // 5 equal pours (40% then 4x15%)
    note: "4:6 method — first two pours control sweetness/acidity, last three control strength",
  },
}

const QUICK_DOSES = [15, 20, 25, 30, 40]

function round1(n: number) { return Math.round(n * 10) / 10 }
function mlToOz(ml: number) { return round1(ml / 29.5735) }

function buildPours(coffeeG: number, recipe: typeof RECIPES[Recipe], method: Method) {
  const waterMl = coffeeG * recipe.ratio
  const bloomMl = recipe.bloomRatio > 0 ? coffeeG * recipe.bloomRatio : 0

  if (recipe.label === RECIPES.hoffmann.label) {
    return [
      { label: "Bloom", ml: bloomMl, time: "0:00", note: `Pour ${round1(bloomMl)}ml, swirl, wait ${recipe.bloomSec}s` },
      { label: "Pour 1", ml: waterMl - bloomMl, time: `0:${recipe.bloomSec}`, note: "Single slow continuous pour to total" },
    ]
  }

  if (recipe.label === RECIPES.kasuya.label) {
    const first40  = waterMl * 0.4
    const pour1    = first40 * 0.5   // two equal pours make up the 40%
    const pour2    = first40 * 0.5
    const last60   = waterMl * 0.6
    const pourLast = last60 / 3      // three equal pours make up the 60%
    return [
      { label: "Pour 1", ml: pour1,    time: "0:00",  note: "First 20% — controls sweetness" },
      { label: "Pour 2", ml: pour2,    time: "0:45",  note: "Second 20% — controls acidity" },
      { label: "Pour 3", ml: pourLast, time: "1:30",  note: "Third pour — controls strength" },
      { label: "Pour 4", ml: pourLast, time: "2:10",  note: "Fourth pour" },
      { label: "Pour 5", ml: pourLast, time: "2:50",  note: "Fifth pour" },
    ]
  }

  // Custom / default: bloom + equal pours
  const remainingMl = waterMl - bloomMl
  const pourMl      = remainingMl / recipe.pours
  const pours = bloomMl > 0 ? [
    { label: "Bloom", ml: bloomMl, time: "0:00", note: `Pour ${round1(bloomMl)}ml, wait ${recipe.bloomSec}s` },
  ] : []
  for (let i = 1; i <= recipe.pours; i++) {
    const sec = bloomMl > 0 ? recipe.bloomSec + (i - 1) * 40 : (i - 1) * 40
    const min = Math.floor(sec / 60)
    const s   = sec % 60
    pours.push({
      label: `Pour ${i}`,
      ml: pourMl,
      time: `${min}:${s.toString().padStart(2, "0")}`,
      note: `Pour to ${round1(bloomMl + pourMl * i)}ml total`,
    })
  }
  return pours
}

// ─── Copy button ──────────────────────────────────────────────────────────────

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(() => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }, [value])
  return (
    <button onClick={copy} aria-label={`Copy ${value}`}
      className="ml-1 rounded px-1.5 py-0.5 text-xs text-surface-400 transition-colors hover:bg-surface-200 hover:text-surface-700 dark:hover:bg-surface-700 dark:hover:text-surface-200">
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function PourOverCalculator() {
  const [method, setMethod]       = useState<Method>("v60")
  const [recipe, setRecipe]       = useState<Recipe>("hoffmann")
  const [dose, setDose]           = useState(30)
  const [customDose, setCustomDose] = useState("")
  const [useCustomDose, setUseCustomDose] = useState(false)
  const [customRatio, setCustomRatio] = useState("16")
  const [unit, setUnit]           = useState<Unit>("metric")

  const activeRecipe  = RECIPES[recipe]
  const activeDose    = useCustomDose ? (parseFloat(customDose) || 0) : dose
  const activeRatio   = recipe === "custom" ? (parseFloat(customRatio) || 16) : activeRecipe.ratio
  const waterMl       = activeDose * activeRatio
  const hasResult     = activeDose > 0

  const pours = hasResult ? buildPours(activeDose, { ...activeRecipe, ratio: activeRatio }, method) : []

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">

      <div className="space-y-6 p-5 sm:p-6">

        {/* Method */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Brewer</label>
          <div className="flex gap-2">
            {(Object.entries(METHODS) as [Method, typeof METHODS[Method]][]).map(([key, val]) => (
              <button key={key} onClick={() => setMethod(key)}
                className={`min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all ${
                  method === key
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                }`}>
                <span className="block font-semibold">{val.label}</span>
                <span className="block opacity-75">{val.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recipe */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Recipe</label>
          <div className="flex flex-wrap gap-2">
            {(Object.entries(RECIPES) as [Recipe, typeof RECIPES[Recipe]][]).map(([key, val]) => (
              <button key={key} onClick={() => setRecipe(key)}
                className={`min-h-[44px] rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                  recipe === key
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                }`}>
                {val.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-surface-500 dark:text-surface-400">{activeRecipe.note}</p>
        </div>

        {/* Dose + ratio row */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-0">
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Coffee dose (g)</label>
            <div className="flex flex-wrap gap-2">
              {QUICK_DOSES.map((n) => (
                <button key={n} onClick={() => { setDose(n); setUseCustomDose(false) }}
                  className={`min-h-[44px] min-w-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                    !useCustomDose && dose === n
                      ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                      : "border-surface-200 bg-white text-surface-700 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500"
                  }`}>
                  {n}g
                </button>
              ))}
              <input type="number" min="5" max="100" step="1" placeholder="Custom"
                value={useCustomDose ? customDose : ""}
                onChange={(e) => { setCustomDose(e.target.value); setUseCustomDose(true) }}
                className="min-h-[44px] w-24 rounded-lg border border-surface-200 bg-white px-3 py-2 text-sm text-surface-700 placeholder-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:focus:ring-brand-800" />
            </div>
          </div>

          <div className="flex gap-4">
            {recipe === "custom" && (
              <div>
                <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Ratio (1:x)</label>
                <input type="number" min="10" max="25" step="0.5"
                  value={customRatio}
                  onChange={(e) => setCustomRatio(e.target.value)}
                  className="min-h-[44px] w-20 rounded-lg border border-surface-200 bg-white px-3 py-2 text-sm text-surface-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:focus:ring-brand-800" />
              </div>
            )}
            <div>
              <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Units</label>
              <div className="flex overflow-hidden rounded-lg border border-surface-200 dark:border-surface-600">
                {(["metric", "imperial"] as Unit[]).map((u) => (
                  <button key={u} onClick={() => setUnit(u)}
                    className={`min-h-[44px] px-4 py-2 text-sm font-medium capitalize transition-colors ${
                      unit === u
                        ? "bg-brand-600 text-white"
                        : "bg-white text-surface-600 hover:bg-surface-100 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700"
                    }`}>
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Result ── */}
      <div className={`border-t px-5 py-5 sm:px-6 transition-all duration-200 ${
        hasResult
          ? "border-brand-200 bg-brand-50 dark:border-green-800 dark:bg-green-950"
          : "border-surface-200 bg-surface-100 dark:border-surface-700 dark:bg-surface-800"
      }`}>
        {!hasResult ? (
          <p className="text-sm text-surface-500 dark:text-surface-400">Enter a coffee dose above to see your recipe.</p>
        ) : (
          <>
            {/* Summary cards */}
            <div className="mb-4 grid grid-cols-3 gap-3">
              {[
                {
                  label: "Coffee",
                  value: unit === "metric" ? `${activeDose} g` : `${round1(activeDose / 28.3495)} oz`,
                  raw: `${activeDose}g coffee`,
                  highlight: true,
                },
                {
                  label: "Water",
                  value: unit === "metric" ? `${round1(waterMl)} ml` : `${mlToOz(waterMl)} fl oz`,
                  raw: unit === "metric" ? `${round1(waterMl)}ml water` : `${mlToOz(waterMl)}fl oz water`,
                  highlight: false,
                },
                {
                  label: "Ratio",
                  value: `1:${round1(activeRatio)}`,
                  raw: `1:${round1(activeRatio)} ratio`,
                  highlight: false,
                },
              ].map((item) => (
                <div key={item.label} className={`rounded-xl p-3 ${item.highlight ? "bg-brand-600 text-white" : "bg-white dark:bg-surface-800"}`}>
                  <p className={`text-xs font-medium mb-1 ${item.highlight ? "text-brand-100" : "text-surface-500 dark:text-surface-400"}`}>{item.label}</p>
                  <p className={`font-mono text-xl font-bold leading-none ${item.highlight ? "text-white" : "text-surface-800 dark:text-surface-100"}`}>{item.value}</p>
                  <div className="mt-2 flex justify-end"><CopyButton value={item.raw} /></div>
                </div>
              ))}
            </div>

            {/* Pour sequence */}
            <p className="mb-3 text-sm font-semibold text-surface-700 dark:text-surface-200">Pour sequence</p>
            <div className="space-y-2">
              {pours.map((pour, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg bg-white px-3 py-2.5 dark:bg-surface-800">
                  <span className="w-16 shrink-0 font-mono text-xs font-semibold text-brand-600 dark:text-brand-400">{pour.time}</span>
                  <span className="w-20 shrink-0 text-sm font-semibold text-surface-700 dark:text-surface-200">{pour.label}</span>
                  <span className="font-mono text-sm font-bold text-surface-800 dark:text-surface-100">
                    {unit === "metric" ? `${round1(pour.ml)} ml` : `${mlToOz(pour.ml)} fl oz`}
                  </span>
                  <span className="ml-auto text-xs text-surface-400 dark:text-surface-500 hidden sm:block">{pour.note}</span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-surface-500 dark:text-surface-400">
              Water temperature: 93–96 C (200–205 F). Grind: medium-fine for V60 and Kalita; medium for Chemex.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
