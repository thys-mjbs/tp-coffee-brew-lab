"use client"

import { useState, useCallback } from "react"

// ─── Constants ────────────────────────────────────────────────────────────────

// Average whole bean weight: 0.13g per bean (Arabica, medium roast)
// Range: light roast ~0.15g (denser), dark roast ~0.11g (lighter cell walls)
const BEAN_WEIGHT_G = 0.13

type CupSize = "espresso" | "small" | "standard" | "large" | "mug"
type Strength = "weak" | "medium" | "strong" | "verystrong"
type Roast = "light" | "medium" | "dark"
type Unit = "metric" | "imperial"

const CUP_SIZES: Record<CupSize, { ml: number; label: string; sub: string }> = {
  espresso: { ml: 30,  label: "Espresso", sub: "30 ml / 1 oz" },
  small:    { ml: 180, label: "Small",    sub: "180 ml / 6 oz" },
  standard: { ml: 250, label: "Standard", sub: "250 ml / 8.5 oz" },
  large:    { ml: 355, label: "Large",    sub: "355 ml / 12 oz" },
  mug:      { ml: 480, label: "Big mug",  sub: "480 ml / 16 oz" },
}

const STRENGTHS: Record<Strength, { ratio: number; label: string }> = {
  weak:       { ratio: 18, label: "Weak"        },
  medium:     { ratio: 16, label: "Medium"       },
  strong:     { ratio: 14, label: "Strong"       },
  verystrong: { ratio: 12, label: "Very strong"  },
}

// Roast affects average bean weight
const ROAST_FACTOR: Record<Roast, { label: string; factor: number; note: string }> = {
  light:  { label: "Light roast",  factor: 1.15, note: "Denser beans, ~0.15g each" },
  medium: { label: "Medium roast", factor: 1.0,  note: "Average bean weight ~0.13g" },
  dark:   { label: "Dark roast",   factor: 0.85, note: "Lighter beans, ~0.11g each" },
}

const QUICK_CUPS = [1, 2, 4, 6]

function round1(n: number) { return Math.round(n * 10) / 10 }
function round0(n: number) { return Math.round(n) }

function calc(waterMl: number, ratio: number, roastFactor: number) {
  const grams      = waterMl / ratio
  const beanWeight = BEAN_WEIGHT_G * roastFactor
  const beanCount  = grams / beanWeight
  const tbsp       = grams / 6   // post-grind tablespoons at medium grind
  const oz         = grams / 28.3495
  return { grams, beanCount, tbsp, oz }
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

export function CoffeeBeansPerCupCalculator() {
  const [cups, setCups]           = useState(2)
  const [cupSize, setCupSize]     = useState<CupSize>("standard")
  const [strength, setStrength]   = useState<Strength>("medium")
  const [roast, setRoast]         = useState<Roast>("medium")
  const [unit, setUnit]           = useState<Unit>("metric")
  const [customCups, setCustomCups] = useState("")
  const [useCustom, setUseCustom] = useState(false)

  const activeCups = useCustom ? (parseFloat(customCups) || 0) : cups
  const waterMl    = activeCups * CUP_SIZES[cupSize].ml
  const ratio      = STRENGTHS[strength].ratio
  const result     = calc(waterMl, ratio, ROAST_FACTOR[roast].factor)
  const hasResult  = activeCups > 0

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">

      <div className="space-y-6 p-5 sm:p-6">

        {/* Cups */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
            How many cups?
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {QUICK_CUPS.map((n) => (
              <button
                key={n}
                onClick={() => { setCups(n); setUseCustom(false) }}
                className={`min-h-[44px] min-w-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  !useCustom && cups === n
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-700 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500"
                }`}
              >
                {n}
              </button>
            ))}
            <input
              type="number"
              min="0.5"
              max="48"
              step="0.5"
              placeholder="Custom"
              value={useCustom ? customCups : ""}
              onChange={(e) => { setCustomCups(e.target.value); setUseCustom(true) }}
              className="min-h-[44px] w-24 rounded-lg border border-surface-200 bg-white px-3 py-2 text-sm text-surface-700 placeholder-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:focus:ring-brand-800"
            />
          </div>
        </div>

        {/* Cup size */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
            Cup size
          </label>
          <div className="flex flex-wrap gap-2">
            {(Object.entries(CUP_SIZES) as [CupSize, typeof CUP_SIZES[CupSize]][]).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setCupSize(key)}
                className={`min-h-[44px] rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all ${
                  cupSize === key
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                }`}
              >
                <span className="block font-semibold">{val.label}</span>
                <span className="block opacity-75">{val.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Roast, strength, unit row */}
        <div className="flex flex-wrap gap-4">

          <div className="flex-1 min-w-[150px]">
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
              Roast level
            </label>
            <div className="flex flex-col gap-2">
              {(Object.entries(ROAST_FACTOR) as [Roast, typeof ROAST_FACTOR[Roast]][]).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setRoast(key)}
                  className={`min-h-[44px] rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all ${
                    roast === key
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                  }`}
                >
                  <span className="block font-semibold">{val.label}</span>
                  <span className="block opacity-75">{val.note}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 min-w-[130px]">
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
              Strength
            </label>
            <div className="flex flex-col gap-2">
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
          </div>

          <div className="shrink-0">
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
              Units
            </label>
            <div className="flex flex-col overflow-hidden rounded-lg border border-surface-200 dark:border-surface-600">
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
          <p className="text-sm text-surface-500 dark:text-surface-400">Enter a number of cups to see your bean count.</p>
        ) : (
          <>
            <p className="mb-4 text-sm font-semibold text-surface-700 dark:text-surface-200">
              For {activeCups} {activeCups === 1 ? "cup" : "cups"} at 1:{ratio} ({ROAST_FACTOR[roast].label.toLowerCase()})
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  label: "Whole beans",
                  value: `~${round0(result.beanCount)}`,
                  unit: "beans",
                  raw: `~${round0(result.beanCount)} beans`,
                  sub: `≈ ${round0(result.beanCount / activeCups)} per cup`,
                  highlight: true,
                },
                {
                  label: "By weight",
                  value: unit === "metric"
                    ? `${round1(result.grams)} g`
                    : `${round1(result.oz)} oz`,
                  unit: "",
                  raw: unit === "metric" ? `${round1(result.grams)}g` : `${round1(result.oz)}oz`,
                  sub: "after grinding",
                  highlight: false,
                },
                {
                  label: "Tablespoons",
                  value: `${round1(result.tbsp)} tbsp`,
                  unit: "",
                  raw: `${round1(result.tbsp)} tablespoons`,
                  sub: "ground, medium",
                  highlight: false,
                },
                {
                  label: "Bean weight",
                  value: `${round1(BEAN_WEIGHT_G * ROAST_FACTOR[roast].factor * 1000) / 1000}`,
                  unit: "g/bean",
                  raw: `${round1(BEAN_WEIGHT_G * ROAST_FACTOR[roast].factor * 1000) / 1000}g per bean`,
                  sub: ROAST_FACTOR[roast].note,
                  highlight: false,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`rounded-xl p-3 ${item.highlight ? "bg-brand-600 text-white" : "bg-white dark:bg-surface-800"}`}
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

            <p className="mt-4 text-xs text-surface-500 dark:text-surface-400">
              Bean count is an estimate based on average Arabica bean weight. Robusta beans are smaller (approx 0.10g); specialty large-screen beans may weigh 0.17g or more. Weigh your beans for a precise measurement.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
