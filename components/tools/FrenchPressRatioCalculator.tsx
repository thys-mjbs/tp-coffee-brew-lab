"use client"

import { useState, useCallback } from "react"

// ─── Constants ────────────────────────────────────────────────────────────────

const GRAMS_PER_TBSP_COARSE = 7   // coarse-ground coffee ≈ 7g per tablespoon
const GRAMS_PER_SCOOP       = 14  // 1 scoop coarse = 2 tbsp = ~14g

type Strength = "light" | "medium" | "strong" | "verystrong"
type Unit = "metric" | "imperial"

const STRENGTHS: Record<Strength, { ratio: number; label: string; note: string }> = {
  light:      { ratio: 17, label: "Light",       note: "Clean and delicate — lets the beans shine" },
  medium:     { ratio: 15, label: "Medium",       note: "Balanced body — most popular starting point" },
  strong:     { ratio: 13, label: "Strong",       note: "Bold and full-bodied" },
  verystrong: { ratio: 11, label: "Very strong",  note: "Thick and intensely flavoured" },
}

// Standard French press sizes in ml
const PRESS_SIZES = [
  { ml: 350,  label: "3-cup",   sub: "350 ml" },
  { ml: 500,  label: "4-cup",   sub: "500 ml" },
  { ml: 750,  label: "6-cup",   sub: "750 ml" },
  { ml: 1000, label: "8-cup",   sub: "1 litre" },
  { ml: 1500, label: "12-cup",  sub: "1.5 litre" },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function round1(n: number) { return Math.round(n * 10) / 10 }
function round2(n: number) { return Math.round(n * 100) / 100 }
function mlToOz(ml: number) { return ml / 29.5735 }
function mlToFlOz(ml: number) { return round1(ml / 29.5735) }

function calc(waterMl: number, ratio: number) {
  const grams  = waterMl / ratio
  const tbsp   = grams / GRAMS_PER_TBSP_COARSE
  const scoops = grams / GRAMS_PER_SCOOP
  return { grams, tbsp, scoops }
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
    <button
      onClick={copy}
      aria-label={`Copy ${value}`}
      className="ml-1 rounded px-1.5 py-0.5 text-xs text-surface-400 transition-colors hover:bg-surface-200 hover:text-surface-700 dark:hover:bg-surface-700 dark:hover:text-surface-200"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function FrenchPressRatioCalculator() {
  const [pressIndex, setPressIndex]     = useState(1)         // default 500ml (4-cup)
  const [useCustom, setUseCustom]       = useState(false)
  const [customMl, setCustomMl]         = useState("")
  const [strength, setStrength]         = useState<Strength>("medium")
  const [unit, setUnit]                 = useState<Unit>("metric")

  const activeMl   = useCustom ? (parseFloat(customMl) || 0) : PRESS_SIZES[pressIndex].ml
  const ratio      = STRENGTHS[strength].ratio
  const result     = calc(activeMl, ratio)
  const hasResult  = activeMl > 0

  function handlePressSelect(i: number) {
    setPressIndex(i)
    setUseCustom(false)
  }

  function handleCustomChange(val: string) {
    setCustomMl(val)
    setUseCustom(true)
  }

  const waterDisplay = unit === "metric"
    ? `${Math.round(activeMl)} ml`
    : `${mlToFlOz(activeMl)} fl oz`

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">

      {/* ── Inputs ── */}
      <div className="space-y-6 p-5 sm:p-6">

        {/* Press size row */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
            French press size
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESS_SIZES.map((ps, i) => (
              <button
                key={ps.ml}
                onClick={() => handlePressSelect(i)}
                className={`min-h-[44px] rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all ${
                  !useCustom && pressIndex === i
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-700 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500"
                }`}
              >
                <span className="block font-semibold">{ps.label}</span>
                <span className="block opacity-75">{ps.sub}</span>
              </button>
            ))}
            <div className="flex flex-col justify-center">
              <input
                type="number"
                min="50"
                max="5000"
                step="50"
                placeholder="Custom ml"
                value={useCustom ? customMl : ""}
                onChange={(e) => handleCustomChange(e.target.value)}
                className="min-h-[44px] w-28 rounded-lg border border-surface-200 bg-white px-3 py-2 text-sm text-surface-700 placeholder-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:focus:ring-brand-800"
              />
              <span className="mt-1 text-center text-[10px] text-surface-400">millilitres</span>
            </div>
          </div>
        </div>

        {/* Strength + unit row */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-0">
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
              Strength
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(Object.entries(STRENGTHS) as [Strength, typeof STRENGTHS[Strength]][]).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setStrength(key)}
                  className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                    strength === key
                      ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                      : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                  }`}
                >
                  {val.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-surface-500 dark:text-surface-400">
              {STRENGTHS[strength].note} &middot; ratio 1:{ratio}
            </p>
          </div>

          <div className="shrink-0">
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
              Units
            </label>
            <div className="flex overflow-hidden rounded-lg border border-surface-200 dark:border-surface-600">
              {(["metric", "imperial"] as Unit[]).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className={`min-h-[44px] px-4 py-2 text-sm font-medium capitalize transition-colors ${
                    unit === u
                      ? "bg-brand-600 text-white"
                      : "bg-white text-surface-600 hover:bg-surface-100 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700"
                  }`}
                >
                  {u}
                </button>
              ))}
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
          <p className="text-sm text-surface-500 dark:text-surface-400">
            Select a press size above to see your coffee dose.
          </p>
        ) : (
          <>
            <p className="mb-4 text-sm font-semibold text-surface-700 dark:text-surface-200">
              For {waterDisplay} of water at 1:{ratio}
            </p>

            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  label: "Ground coffee",
                  value: unit === "metric"
                    ? `${round1(result.grams)} g`
                    : `${round1(result.grams / 28.3495)} oz`,
                  raw: unit === "metric"
                    ? `${round1(result.grams)}g`
                    : `${round1(result.grams / 28.3495)}oz`,
                  sub: "by weight (most accurate)",
                  highlight: true,
                },
                {
                  label: "Tablespoons",
                  value: `${round1(result.tbsp)} tbsp`,
                  raw: `${round1(result.tbsp)} tablespoons`,
                  sub: "≈ 7g per tbsp (coarse)",
                  highlight: false,
                },
                {
                  label: "Scoops",
                  value: `${round2(result.scoops)} scoops`,
                  raw: `${round2(result.scoops)} scoops`,
                  sub: "standard 2-tbsp scoop",
                  highlight: false,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`rounded-xl p-3 ${
                    item.highlight
                      ? "bg-brand-600 text-white"
                      : "bg-white dark:bg-surface-800"
                  }`}
                >
                  <p className={`text-xs font-medium mb-1 ${item.highlight ? "text-brand-100" : "text-surface-500 dark:text-surface-400"}`}>
                    {item.label}
                  </p>
                  <p className={`font-mono text-xl font-bold leading-none ${item.highlight ? "text-white" : "text-surface-800 dark:text-surface-100"}`}>
                    {item.value}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className={`text-xs ${item.highlight ? "text-brand-200" : "text-surface-400 dark:text-surface-500"}`}>
                      {item.sub}
                    </p>
                    <CopyButton value={item.raw} />
                  </div>
                </div>
              ))}
            </div>

            {/* Steep reminder */}
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-white px-3 py-2.5 dark:bg-surface-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-brand-500" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Steep for <strong className="text-surface-700 dark:text-surface-200">4 minutes</strong> before plunging. Use coarse-ground coffee (similar to sea salt) for best clarity.
              </p>
            </div>

            <p className="mt-3 text-xs text-surface-500 dark:text-surface-400">
              Tablespoon values assume coarsely ground coffee (≈7g/tbsp). Measure by weight for the most consistent results.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
