"use client"

import { useState, useCallback } from "react"

type RecipeId = "classic" | "hoffmann" | "light" | "strong"

interface Pour {
  label: string
  waterMl: number
  cumMl: number
  note: string
}

interface Recipe {
  label: string
  ratio: number
  bloomSec: number
  bloomMl: (dose: number) => number
  closedSteepSec: number
  openDrawdownNote: string
  description: string
  pours: (dose: number, totalWater: number, bloom: number) => Pour[]
}

const RECIPES: Record<RecipeId, Recipe> = {
  classic: {
    label: "Classic Immersion",
    ratio: 15,
    bloomSec: 30,
    bloomMl: (d) => d * 2,
    closedSteepSec: 120,
    openDrawdownNote: "Open the switch and let it draw down completely (about 2 to 3 minutes).",
    description: "Brew with the switch closed (immersion) for the steep, then open to drain. Clean, sweet, and forgiving.",
    pours: (dose, total, bloom) => {
      const remain = total - bloom
      return [
        { label: "Bloom pour", waterMl: Math.round(bloom), cumMl: Math.round(bloom), note: `Pour ${Math.round(bloom)}ml. Switch stays closed.` },
        { label: "Main pour", waterMl: Math.round(remain), cumMl: Math.round(total), note: `Pour remaining ${Math.round(remain)}ml. Switch stays closed. Steep for 2 minutes.` },
        { label: "Drawdown", waterMl: 0, cumMl: Math.round(total), note: "Open the switch. Let the coffee drain fully into your cup." },
      ]
    },
  },
  hoffmann: {
    label: "Hoffmann Method",
    ratio: 16.67,
    bloomSec: 45,
    bloomMl: (d) => d * 3,
    closedSteepSec: 90,
    openDrawdownNote: "Open the switch at 2:15 and let it draw down (about 90 seconds).",
    description: "James Hoffmann's Hario Switch method. Longer bloom, single pour, consistent results.",
    pours: (dose, total, bloom) => {
      const remain = total - bloom
      return [
        { label: "Bloom", waterMl: Math.round(bloom), cumMl: Math.round(bloom), note: `Pour ${Math.round(bloom)}ml. Switch closed. Swirl gently.` },
        { label: "Main pour", waterMl: Math.round(remain), cumMl: Math.round(total), note: `Pour remaining ${Math.round(remain)}ml. Switch stays closed. Steep 90 seconds.` },
        { label: "Open and drain", waterMl: 0, cumMl: Math.round(total), note: "Open switch at 2:15 from start. Drain fully." },
      ]
    },
  },
  light: {
    label: "Light Roast",
    ratio: 16,
    bloomSec: 45,
    bloomMl: (d) => d * 3,
    closedSteepSec: 150,
    openDrawdownNote: "Open the switch at 3:30 and draw down slowly.",
    description: "Longer steep for light roasts that need more time and heat to open up. Brings out more sweetness and body.",
    pours: (dose, total, bloom) => {
      const p1 = Math.round((total - bloom) * 0.5)
      const p2 = Math.round(total - bloom - p1)
      return [
        { label: "Bloom", waterMl: Math.round(bloom), cumMl: Math.round(bloom), note: `Pour ${Math.round(bloom)}ml. Switch closed. Wait 45 seconds.` },
        { label: "Pour 1", waterMl: p1, cumMl: Math.round(bloom + p1), note: `Pour ${p1}ml. Switch closed.` },
        { label: "Pour 2", waterMl: p2, cumMl: Math.round(total), note: `Pour remaining ${p2}ml. Switch closed. Steep 2.5 minutes total.` },
        { label: "Open", waterMl: 0, cumMl: Math.round(total), note: "Open switch at 3:30. Let it draw down slowly." },
      ]
    },
  },
  strong: {
    label: "Strong and Bold",
    ratio: 13,
    bloomSec: 30,
    bloomMl: (d) => d * 2,
    closedSteepSec: 180,
    openDrawdownNote: "Open the switch at 3:30 and drain fully.",
    description: "Higher dose ratio (1:13) and longer immersion for a bold, full-bodied cup. Ideal for dark or medium-dark roasts.",
    pours: (dose, total, bloom) => {
      const remain = total - bloom
      return [
        { label: "Bloom", waterMl: Math.round(bloom), cumMl: Math.round(bloom), note: `Pour ${Math.round(bloom)}ml. Switch closed. Wait 30 seconds.` },
        { label: "Main pour", waterMl: Math.round(remain), cumMl: Math.round(total), note: `Pour remaining ${Math.round(remain)}ml. Switch stays closed. Steep 3 minutes.` },
        { label: "Open and drain", waterMl: 0, cumMl: Math.round(total), note: "Open switch and drain fully into your cup." },
      ]
    },
  },
}

const DOSE_PRESETS = [15, 20, 25, 30]

function pad(n: number) { return n.toString().padStart(2, "0") }
function fmt(s: number) { return `${Math.floor(s / 60)}:${pad(s % 60)}` }

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(() => {
    navigator.clipboard.writeText(value).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800) })
  }, [value])
  return (
    <button onClick={copy}
      className="rounded px-2 py-1 text-xs text-surface-400 transition-colors hover:bg-surface-200 hover:text-surface-700 dark:hover:bg-surface-700 dark:hover:text-surface-200">
      {copied ? "Copied" : "Copy recipe"}
    </button>
  )
}

export function HarioSwitchRecipe() {
  const [recipe, setRecipe]  = useState<RecipeId>("classic")
  const [doseG, setDoseG]    = useState(20)

  const r         = RECIPES[recipe]
  const totalWater = Math.round(doseG * r.ratio)
  const bloomMl   = Math.round(r.bloomMl(doseG))
  const pours     = r.pours(doseG, totalWater, bloomMl)

  const copyText = [
    `Hario Switch ${r.label}: ${doseG}g coffee / ${totalWater}ml water / 1:${r.ratio}`,
    `Bloom: ${bloomMl}ml for ${fmt(r.bloomSec)} | Steep (closed): ${fmt(r.closedSteepSec)}`,
    "",
    ...pours.map((p, i) => `${i + 1}. ${p.label}${p.waterMl > 0 ? ` (+${p.waterMl}ml, ${p.cumMl}ml total)` : ""}: ${p.note}`),
  ].join("\n")

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">
      <div className="space-y-4 p-5 sm:p-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Recipe</label>
          <div className="grid grid-cols-2 gap-2">
            {(Object.entries(RECIPES) as [RecipeId, Recipe][]).map(([key, rec]) => (
              <button key={key} onClick={() => setRecipe(key)}
                className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all text-left ${
                  recipe === key
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                }`}>{rec.label}</button>
            ))}
          </div>
          <p className="mt-2 text-xs text-surface-500 dark:text-surface-400">{r.description}</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Coffee dose</label>
          <div className="flex gap-2">
            {DOSE_PRESETS.map((d) => (
              <button key={d} onClick={() => setDoseG(d)}
                className={`min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  doseG === d
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-700 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500"
                }`}>{d}g</button>
            ))}
          </div>
          <p className="mt-1.5 text-xs text-surface-400 dark:text-surface-500">
            {doseG}g coffee / {totalWater}ml water / 1:{r.ratio}
          </p>
        </div>
      </div>

      <div className="border-t border-surface-200 dark:border-surface-700 px-5 pb-5 pt-4 sm:px-6">
        <div className="mb-3 grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-white dark:bg-surface-800 border border-surface-100 dark:border-surface-700 px-3 py-2 text-center">
            <p className="text-xs text-surface-400 dark:text-surface-500">Bloom</p>
            <p className="font-semibold text-surface-800 dark:text-surface-100">{bloomMl}ml</p>
            <p className="text-xs text-brand-600 dark:text-brand-400">{fmt(r.bloomSec)}</p>
          </div>
          <div className="rounded-lg bg-white dark:bg-surface-800 border border-surface-100 dark:border-surface-700 px-3 py-2 text-center">
            <p className="text-xs text-surface-400 dark:text-surface-500">Steep (closed)</p>
            <p className="font-semibold text-surface-800 dark:text-surface-100">{fmt(r.closedSteepSec)}</p>
            <p className="text-xs text-brand-600 dark:text-brand-400">switch closed</p>
          </div>
          <div className="rounded-lg bg-white dark:bg-surface-800 border border-surface-100 dark:border-surface-700 px-3 py-2 text-center">
            <p className="text-xs text-surface-400 dark:text-surface-500">Total water</p>
            <p className="font-semibold text-surface-800 dark:text-surface-100">{totalWater}ml</p>
            <p className="text-xs text-brand-600 dark:text-brand-400">1:{r.ratio}</p>
          </div>
        </div>

        <p className="mb-3 text-sm font-semibold text-surface-700 dark:text-surface-200">Step-by-step</p>
        <ol className="space-y-2">
          {pours.map((pour, i) => (
            <li key={i} className="flex gap-3 rounded-xl border border-surface-100 bg-white px-4 py-3 dark:border-surface-700 dark:bg-surface-800">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                {i + 1}
              </span>
              <div>
                <span className="text-sm font-semibold text-surface-800 dark:text-surface-100">{pour.label}</span>
                {pour.waterMl > 0 && (
                  <span className="ml-2 text-xs font-mono text-brand-600 dark:text-brand-400">+{pour.waterMl}ml ({pour.cumMl}ml total)</span>
                )}
                <p className="mt-0.5 text-xs text-surface-500 dark:text-surface-400">{pour.note}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-xs text-surface-400 dark:text-surface-500 flex-1">
            Grind: medium-fine. Water: 93 to 96C. Rinse filter before brewing.
          </p>
          <CopyButton value={copyText} />
        </div>
      </div>
    </div>
  )
}
