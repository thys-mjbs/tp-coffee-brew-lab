"use client"

import { useState, useCallback } from "react"

// ─── Constants ────────────────────────────────────────────────────────────────

type CupSize = "small" | "standard" | "large" | "mug"
type Strength = "mild" | "medium" | "strong"
type Brand = "generic" | "nescafe" | "bustelo" | "folgers"
type Unit = "metric" | "imperial"

const CUP_SIZES: Record<CupSize, { ml: number; label: string; sub: string }> = {
  small:    { ml: 180, label: "Small",    sub: "180 ml / 6 oz" },
  standard: { ml: 250, label: "Standard", sub: "250 ml / 8.5 oz" },
  large:    { ml: 355, label: "Large",    sub: "355 ml / 12 oz" },
  mug:      { ml: 480, label: "Big mug",  sub: "480 ml / 16 oz" },
}

// grams per teaspoon varies by brand (density and grind)
const BRANDS: Record<Brand, { label: string; gPerTsp: number; note: string }> = {
  generic: { label: "Generic instant",  gPerTsp: 1.8, note: "Standard instant coffee granules" },
  nescafe: { label: "Nescafe",          gPerTsp: 1.8, note: "Nescafe Classic / Gold granules" },
  bustelo: { label: "Cafe Bustelo",     gPerTsp: 2.2, note: "Denser espresso-style powder" },
  folgers: { label: "Folgers",          gPerTsp: 1.7, note: "Folgers Classic / Crystals" },
}

// g of instant coffee per 100ml of water at each strength
const STRENGTHS: Record<Strength, { gPer100ml: number; label: string }> = {
  mild:   { gPer100ml: 0.8, label: "Mild"   },
  medium: { gPer100ml: 1.2, label: "Medium" },
  strong: { gPer100ml: 1.8, label: "Strong" },
}

function round2(n: number) { return Math.round(n * 100) / 100 }
function round1(n: number) { return Math.round(n * 10) / 10 }

function calc(waterMl: number, gPer100ml: number, gPerTsp: number) {
  const grams = (waterMl / 100) * gPer100ml
  const tsp   = grams / gPerTsp
  const tbsp  = tsp / 3
  return { grams, tsp, tbsp }
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

export function InstantCoffeeCalculator() {
  const [cupSize, setCupSize]   = useState<CupSize>("standard")
  const [strength, setStrength] = useState<Strength>("medium")
  const [brand, setBrand]       = useState<Brand>("generic")
  const [cups, setCups]         = useState(1)
  const [unit, setUnit]         = useState<Unit>("metric")

  const waterMl  = CUP_SIZES[cupSize].ml * cups
  const result   = calc(waterMl, STRENGTHS[strength].gPer100ml, BRANDS[brand].gPerTsp)

  const waterDisplay = unit === "metric"
    ? `${Math.round(waterMl)} ml`
    : `${round1(waterMl / 29.5735)} fl oz`

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">

      {/* ── Inputs ── */}
      <div className="space-y-6 p-5 sm:p-6">

        {/* Cups */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
            Number of cups
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => setCups(n)}
                className={`min-h-[44px] min-w-[44px] rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                  cups === n
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-700 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Cup size */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
            Cup size
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
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
                <span className="block opacity-80">{val.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Brand + strength row */}
        <div className="flex flex-wrap gap-4">

          <div className="flex-1 min-w-[180px]">
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
              Brand
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.entries(BRANDS) as [Brand, typeof BRANDS[Brand]][]).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setBrand(key)}
                  className={`min-h-[44px] rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all ${
                    brand === key
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                  }`}
                >
                  {val.label}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-xs text-surface-400 dark:text-surface-500">
              {BRANDS[brand].note}
            </p>
          </div>

          <div className="shrink-0">
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
              Strength
            </label>
            <div className="flex flex-col gap-2">
              {(Object.entries(STRENGTHS) as [Strength, typeof STRENGTHS[Strength]][]).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setStrength(key)}
                  className={`min-h-[44px] rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
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
      <div className="border-t border-brand-200 bg-brand-50 px-5 py-5 sm:px-6 dark:border-green-800 dark:bg-green-950">
        <p className="mb-4 text-sm font-semibold text-surface-700 dark:text-surface-200">
          For {cups} {cups === 1 ? "cup" : "cups"} ({waterDisplay} water)
        </p>

        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Instant coffee",
              value: unit === "metric"
                ? `${round2(result.grams)} g`
                : `${round2(result.grams / 28.3495)} oz`,
              raw: unit === "metric"
                ? `${round2(result.grams)}g`
                : `${round2(result.grams / 28.3495)}oz`,
              sub: "by weight",
              highlight: true,
            },
            {
              label: "Teaspoons",
              value: `${round2(result.tsp)} tsp`,
              raw: `${round2(result.tsp)} teaspoons`,
              sub: "level, not heaped",
              highlight: false,
            },
            {
              label: "Tablespoons",
              value: `${round2(result.tbsp)} tbsp`,
              raw: `${round2(result.tbsp)} tablespoons`,
              sub: "level, not heaped",
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
          Teaspoon density varies by brand. Measure level spoonfuls for consistent results. Water temperature: 90–96 C (194–205 F).
        </p>
      </div>
    </div>
  )
}
