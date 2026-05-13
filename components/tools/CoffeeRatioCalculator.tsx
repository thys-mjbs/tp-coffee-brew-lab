"use client"

import { useState, useCallback } from "react"

// ─── Constants ────────────────────────────────────────────────────────────────

const GRAMS_PER_TBSP = 6      // 1 tablespoon ground coffee ≈ 6g (medium grind)
const GRAMS_PER_SCOOP = 12    // 1 standard coffee scoop = 2 tablespoons = 12g

type Strength = "weak" | "medium" | "strong" | "verystrong"
type CupSize = "standard" | "maker"
type Unit = "metric" | "imperial"

const STRENGTHS: Record<Strength, { ratio: number; label: string; note: string }> = {
  weak:       { ratio: 18, label: "Weak",        note: "Light, delicate — SCA drip standard" },
  medium:     { ratio: 16, label: "Medium",       note: "Balanced, most popular ratio" },
  strong:     { ratio: 14, label: "Strong",       note: "Bold, full-bodied cup" },
  verystrong: { ratio: 12, label: "Very strong",  note: "Intense and concentrated" },
}

const CUP_SIZES: Record<CupSize, { ml: number; label: string; sub: string }> = {
  standard: { ml: 250,  label: "Standard mug",   sub: "250 ml / 8.5 oz" },
  maker:    { ml: 148,  label: "Coffee maker cup", sub: "148 ml / 5 oz" },
}

const QUICK_CUPS = [1, 2, 4, 6, 8, 12]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function round1(n: number) { return Math.round(n * 10) / 10 }
function round2(n: number) { return Math.round(n * 100) / 100 }

function calc(waterMl: number, ratio: number) {
  const grams    = waterMl / ratio
  const tbsp     = grams / GRAMS_PER_TBSP
  const tsp      = tbsp * 3
  const scoops   = grams / GRAMS_PER_SCOOP
  return { grams, tbsp, tsp, scoops }
}

function mlToOz(ml: number) { return ml / 29.5735 }

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

export function CoffeeRatioCalculator() {
  const [cups, setCups]           = useState(2)
  const [cupSize, setCupSize]     = useState<CupSize>("standard")
  const [strength, setStrength]   = useState<Strength>("medium")
  const [unit, setUnit]           = useState<Unit>("metric")
  const [customCups, setCustomCups] = useState("")
  const [useCustom, setUseCustom] = useState(false)

  const activeCups   = useCustom ? (parseFloat(customCups) || 0) : cups
  const waterMl      = activeCups * CUP_SIZES[cupSize].ml
  const ratio        = STRENGTHS[strength].ratio
  const result       = calc(waterMl, ratio)
  const hasResult    = activeCups > 0

  function handleQuickCup(n: number) {
    setCups(n)
    setUseCustom(false)
  }

  function handleCustomChange(val: string) {
    setCustomCups(val)
    setUseCustom(true)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">

      {/* ── Inputs ── */}
      <div className="space-y-6 p-5 sm:p-6">

        {/* Cups row */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
            How many cups?
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {QUICK_CUPS.map((n) => (
              <button
                key={n}
                onClick={() => handleQuickCup(n)}
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
              onChange={(e) => handleCustomChange(e.target.value)}
              className="min-h-[44px] w-24 rounded-lg border border-surface-200 bg-white px-3 py-2 text-sm text-surface-700 placeholder-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:focus:ring-brand-800"
            />
          </div>
        </div>

        {/* Cup size + unit row */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-48">
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
              Cup size
            </label>
            <div className="flex gap-2">
              {(Object.entries(CUP_SIZES) as [CupSize, typeof CUP_SIZES[CupSize]][]).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setCupSize(key)}
                  className={`flex-1 min-h-[44px] rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all ${
                    cupSize === key
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                  }`}
                >
                  <span className="block font-semibold">{val.label}</span>
                  <span className="block opacity-80">{val.sub}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
              Output units
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

        {/* Strength */}
        <div>
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
      </div>

      {/* ── Result ── */}
      <div className={`border-t px-5 py-5 sm:px-6 transition-all duration-200 ${
        hasResult
          ? "border-brand-200 bg-brand-50 dark:border-green-800 dark:bg-green-950"
          : "border-surface-200 bg-surface-100 dark:border-surface-700 dark:bg-surface-800"
      }`}>
        {!hasResult ? (
          <p className="text-sm text-surface-500 dark:text-surface-400">
            Enter a number of cups above to see your coffee measurement.
          </p>
        ) : (
          <>
            <p className="mb-4 text-sm font-semibold text-surface-700 dark:text-surface-200">
              For {activeCups} {activeCups === 1 ? "cup" : "cups"} ({unit === "metric" ? `${Math.round(waterMl)} ml` : `${round1(mlToOz(waterMl))} fl oz`} water)
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  label: "Ground coffee",
                  value: unit === "metric" ? `${round1(result.grams)} g` : `${round1(result.grams / 28.3495)} oz`,
                  raw: unit === "metric" ? `${round1(result.grams)}g` : `${round1(result.grams / 28.3495)}oz`,
                  sub: "by weight (most accurate)",
                  highlight: true,
                },
                {
                  label: "Tablespoons",
                  value: `${round1(result.tbsp)} tbsp`,
                  raw: `${round1(result.tbsp)} tablespoons`,
                  sub: "≈ 6g per tablespoon",
                  highlight: false,
                },
                {
                  label: "Teaspoons",
                  value: `${Math.round(result.tsp)} tsp`,
                  raw: `${Math.round(result.tsp)} teaspoons`,
                  sub: "≈ 2g per teaspoon",
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

            <p className="mt-4 text-xs text-surface-500 dark:text-surface-400">
              Tablespoon and teaspoon values assume medium-ground coffee (≈6g/tbsp). Coarser grinds weigh less; measure by weight for the most accurate result.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
