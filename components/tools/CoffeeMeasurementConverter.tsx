"use client"

import { useState, useCallback } from "react"

// ─── Constants ────────────────────────────────────────────────────────────────

// Conversion base: 1g of medium-ground coffee
// 1 tbsp ≈ 6g, 1 tsp ≈ 2g, 1 scoop (2 tbsp) ≈ 12g
// 1 oz = 28.3495g, 1 fl oz water = 29.5735ml

const G_PER_TBSP  = 6
const G_PER_TSP   = 2
const G_PER_SCOOP = 12
const G_PER_OZ    = 28.3495

type FromUnit = "grams" | "tablespoons" | "teaspoons" | "scoops" | "oz"

const FROM_UNITS: Record<FromUnit, { label: string; toGrams: (v: number) => number; placeholder: string }> = {
  grams:       { label: "Grams (g)",         toGrams: (v) => v,                  placeholder: "e.g. 30" },
  tablespoons: { label: "Tablespoons (tbsp)", toGrams: (v) => v * G_PER_TBSP,    placeholder: "e.g. 5" },
  teaspoons:   { label: "Teaspoons (tsp)",    toGrams: (v) => v * G_PER_TSP,     placeholder: "e.g. 15" },
  scoops:      { label: "Scoops (2 tbsp)",    toGrams: (v) => v * G_PER_SCOOP,   placeholder: "e.g. 2.5" },
  oz:          { label: "Ounces (oz)",         toGrams: (v) => v * G_PER_OZ,     placeholder: "e.g. 1" },
}

function round2(n: number) { return Math.round(n * 100) / 100 }
function round1(n: number) { return Math.round(n * 10) / 10 }

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

export function CoffeeMeasurementConverter() {
  const [fromUnit, setFromUnit] = useState<FromUnit>("tablespoons")
  const [value, setValue]       = useState("")

  const numVal  = parseFloat(value) || 0
  const grams   = numVal > 0 ? FROM_UNITS[fromUnit].toGrams(numVal) : 0
  const hasResult = grams > 0

  const results = [
    { label: "Grams",       value: round2(grams),                   unit: "g",    raw: `${round2(grams)}g` },
    { label: "Tablespoons", value: round2(grams / G_PER_TBSP),      unit: "tbsp", raw: `${round2(grams / G_PER_TBSP)} tablespoons` },
    { label: "Teaspoons",   value: round1(grams / G_PER_TSP),       unit: "tsp",  raw: `${round1(grams / G_PER_TSP)} teaspoons` },
    { label: "Scoops",      value: round2(grams / G_PER_SCOOP),     unit: "",     raw: `${round2(grams / G_PER_SCOOP)} scoops` },
    { label: "Ounces",      value: round2(grams / G_PER_OZ),        unit: "oz",   raw: `${round2(grams / G_PER_OZ)}oz` },
  ].filter((r) => r.label !== FROM_UNITS[fromUnit].label.split(" ")[0])

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">

      {/* ── Input ── */}
      <div className="space-y-5 p-5 sm:p-6">

        {/* From unit */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
            Convert from
          </label>
          <div className="flex flex-wrap gap-2">
            {(Object.entries(FROM_UNITS) as [FromUnit, typeof FROM_UNITS[FromUnit]][]).map(([key, val]) => (
              <button
                key={key}
                onClick={() => { setFromUnit(key); setValue("") }}
                className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  fromUnit === key
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                }`}
              >
                {val.label}
              </button>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="converter-input" className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
            Amount
          </label>
          <input
            id="converter-input"
            type="number"
            min="0"
            step="0.5"
            placeholder={FROM_UNITS[fromUnit].placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="min-h-[44px] w-40 rounded-lg border border-surface-200 bg-white px-3 py-2 text-sm text-surface-700 placeholder-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:focus:ring-brand-800"
          />
        </div>
      </div>

      {/* ── Results ── */}
      <div className={`border-t px-5 py-5 sm:px-6 transition-all duration-200 ${
        hasResult
          ? "border-brand-200 bg-brand-50 dark:border-green-800 dark:bg-green-950"
          : "border-surface-200 bg-surface-100 dark:border-surface-700 dark:bg-surface-800"
      }`}>
        {!hasResult ? (
          <p className="text-sm text-surface-500 dark:text-surface-400">
            Enter an amount above to see the conversions.
          </p>
        ) : (
          <>
            <p className="mb-4 text-sm font-semibold text-surface-700 dark:text-surface-200">
              {numVal} {FROM_UNITS[fromUnit].label.split(" ")[0].toLowerCase()} equals
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {results.map((r, i) => (
                <div
                  key={r.label}
                  className={`rounded-xl p-3 ${
                    i === 0
                      ? "bg-brand-600 text-white"
                      : "bg-white dark:bg-surface-800"
                  }`}
                >
                  <p className={`text-xs font-medium mb-1 ${i === 0 ? "text-brand-100" : "text-surface-500 dark:text-surface-400"}`}>
                    {r.label}
                  </p>
                  <p className={`font-mono text-xl font-bold leading-none ${i === 0 ? "text-white" : "text-surface-800 dark:text-surface-100"}`}>
                    {r.value}{r.unit && ` ${r.unit}`}
                  </p>
                  <div className="mt-2 flex justify-end">
                    <CopyButton value={r.raw} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-surface-500 dark:text-surface-400">
              Based on medium-ground coffee: 6g/tbsp, 2g/tsp, 12g/scoop. Coarse grinds weigh less per spoon; fine grinds weigh more.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
