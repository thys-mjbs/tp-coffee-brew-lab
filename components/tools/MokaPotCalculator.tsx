"use client"

import { useState } from "react"

type SizeId = "1cup" | "3cup" | "6cup" | "9cup" | "custom"

interface MokaSize {
  label: string
  chamberMl: number
  coffeeG: number
}

const SIZES: Record<SizeId, MokaSize> = {
  "1cup":   { label: "1-cup (60ml)",  chamberMl: 60,  coffeeG: 7  },
  "3cup":   { label: "3-cup (150ml)", chamberMl: 150, coffeeG: 18 },
  "6cup":   { label: "6-cup (300ml)", chamberMl: 300, coffeeG: 36 },
  "9cup":   { label: "9-cup (450ml)", chamberMl: 450, coffeeG: 54 },
  "custom": { label: "Custom",        chamberMl: 0,   coffeeG: 0  },
}

const GRIND_NOTES = [
  "Use a fine-medium grind: finer than drip but not as fine as espresso.",
  "The texture should feel like fine beach sand when rubbed between your fingers.",
  "If the coffee takes over 5 minutes to come through, grind slightly coarser.",
  "If it sputters and comes through unevenly, grind very slightly coarser and check for even tamping.",
]

const TECHNIQUE_STEPS = [
  "Fill the lower chamber with pre-boiled water to just below the safety valve.",
  "Fill the filter basket with coffee. Level the surface without compressing — do not tamp like espresso.",
  "Screw the upper chamber on firmly but do not overtighten.",
  "Place on medium-low heat with the lid open so you can watch the flow.",
  "When coffee starts flowing, reduce heat slightly. You want a steady, gentle stream — not a sputter.",
  "Remove from heat when you hear a hissing sound. This means the chamber is nearly empty.",
  "Run the bottom under cold water for 10 seconds to stop extraction.",
]

export function MokaPotCalculator() {
  const [sizeId, setSizeId]       = useState<SizeId>("3cup")
  const [customMl, setCustomMl]   = useState(200)
  const [showTips, setShowTips]   = useState(false)

  const isCustom   = sizeId === "custom"
  const chamberMl  = isCustom ? customMl : SIZES[sizeId].chamberMl
  const coffeeG    = isCustom
    ? Math.round((customMl / 150) * 18)
    : SIZES[sizeId].coffeeG
  const tablespoons = (coffeeG / 6).toFixed(1)
  const waterMl    = Math.round(chamberMl * 0.85)

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">
      <div className="space-y-4 p-5 sm:p-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Moka pot size</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {(Object.entries(SIZES) as [SizeId, MokaSize][]).map(([key, size]) => (
              <button key={key} onClick={() => setSizeId(key)}
                className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  sizeId === key
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-700 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500"
                }`}>{size.label}</button>
            ))}
          </div>
        </div>

        {isCustom && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
              Chamber capacity (ml)
            </label>
            <input
              type="number"
              min={30}
              max={1000}
              step={10}
              value={customMl}
              onChange={(e) => setCustomMl(Math.max(30, parseInt(e.target.value) || 30))}
              className="w-full rounded-lg border border-surface-200 bg-white px-4 py-2.5 text-sm text-surface-800 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <p className="mt-1 text-xs text-surface-400 dark:text-surface-500">
              This is the water chamber capacity, not the final cup volume.
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-surface-200 dark:border-surface-700 px-5 py-5 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-surface-100 bg-white dark:border-surface-700 dark:bg-surface-800 p-4 text-center">
            <p className="text-xs text-surface-400 dark:text-surface-500 mb-1">Water</p>
            <p className="text-2xl font-bold font-mono text-brand-600 dark:text-brand-400">{waterMl}</p>
            <p className="text-xs text-surface-400 dark:text-surface-500">ml</p>
          </div>
          <div className="rounded-xl border border-surface-100 bg-white dark:border-surface-700 dark:bg-surface-800 p-4 text-center">
            <p className="text-xs text-surface-400 dark:text-surface-500 mb-1">Coffee</p>
            <p className="text-2xl font-bold font-mono text-brand-600 dark:text-brand-400">{coffeeG}</p>
            <p className="text-xs text-surface-400 dark:text-surface-500">grams</p>
          </div>
          <div className="rounded-xl border border-surface-100 bg-white dark:border-surface-700 dark:bg-surface-800 p-4 text-center">
            <p className="text-xs text-surface-400 dark:text-surface-500 mb-1">Tablespoons</p>
            <p className="text-2xl font-bold font-mono text-brand-600 dark:text-brand-400">{tablespoons}</p>
            <p className="text-xs text-surface-400 dark:text-surface-500">tbsp</p>
          </div>
          <div className="rounded-xl border border-surface-100 bg-white dark:border-surface-700 dark:bg-surface-800 p-4 text-center">
            <p className="text-xs text-surface-400 dark:text-surface-500 mb-1">Grind</p>
            <p className="text-lg font-semibold text-brand-600 dark:text-brand-400 leading-tight mt-1">Fine-<br />Medium</p>
          </div>
        </div>

        <p className="mt-3 text-xs text-surface-400 dark:text-surface-500">
          Fill water to just below the safety valve. Fill the basket level — do not tamp. Use pre-boiled water for a cleaner cup.
        </p>

        <button
          onClick={() => setShowTips(!showTips)}
          className="mt-4 w-full min-h-[44px] rounded-xl border border-surface-200 bg-white px-4 py-2.5 text-sm font-medium text-surface-600 transition-all hover:bg-surface-100 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700"
        >
          {showTips ? "Hide technique guide" : "Show technique guide"}
        </button>

        {showTips && (
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950">
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1.5">Grind size notes</p>
              <ul className="space-y-1">
                {GRIND_NOTES.map((note, i) => (
                  <li key={i} className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">{note}</li>
                ))}
              </ul>
            </div>
            <p className="text-sm font-semibold text-surface-700 dark:text-surface-200">Brew technique</p>
            <ol className="space-y-2">
              {TECHNIQUE_STEPS.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-surface-600 dark:text-surface-300 leading-relaxed">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-700 dark:bg-brand-900 dark:text-brand-300 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}
