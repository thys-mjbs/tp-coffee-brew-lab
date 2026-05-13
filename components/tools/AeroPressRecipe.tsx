"use client"

import { useState } from "react"

// ─── Constants ────────────────────────────────────────────────────────────────

type Method = "standard" | "inverted" | "hoffmann" | "iced"

const METHODS: Record<Method, {
  label: string
  coffeeG: number
  waterMl: number
  waterTempC: number
  totalSec: number
  steps: { time: string; action: string; detail: string }[]
  note: string
}> = {
  standard: {
    label: "Standard",
    coffeeG: 17,
    waterMl: 240,
    waterTempC: 94,
    totalSec: 120,
    note: "Classic method — easy, clean cup, good for any roast",
    steps: [
      { time: "0:00", action: "Rinse & prep", detail: "Rinse paper filter with hot water. Place AeroPress on cup with filter cap on." },
      { time: "0:00", action: "Add coffee", detail: "Add 17g of medium-fine ground coffee." },
      { time: "0:00", action: "Bloom", detail: "Pour 34ml (2x coffee weight) of water. Stir gently. Wait 30 seconds." },
      { time: "0:30", action: "Fill", detail: "Pour remaining water to 240ml total. Stir once." },
      { time: "1:00", action: "Insert plunger", detail: "Insert plunger and press slowly over 30 seconds. Stop at hiss." },
      { time: "1:30", action: "Done", detail: "Total brew time ~1:30. Dilute with hot water if desired." },
    ],
  },
  inverted: {
    label: "Inverted",
    coffeeG: 18,
    waterMl: 250,
    waterTempC: 96,
    totalSec: 150,
    note: "Inverted prevents drip-through — longer steep, richer body",
    steps: [
      { time: "0:00", action: "Set up inverted", detail: "Place AeroPress upside down with plunger inserted to the 4 mark." },
      { time: "0:00", action: "Add coffee", detail: "Add 18g of medium-fine ground coffee." },
      { time: "0:00", action: "Bloom", detail: "Pour 36ml water. Stir to saturate all grounds. Wait 30 seconds." },
      { time: "0:30", action: "Fill", detail: "Pour to 250ml total. Stir 3 times. Place filter cap with rinsed filter." },
      { time: "1:00", action: "Steep", detail: "Let steep for 1 additional minute." },
      { time: "2:00", action: "Flip & press", detail: "Flip onto your cup carefully. Press slowly over 30 seconds." },
      { time: "2:30", action: "Done", detail: "Total brew time ~2:30. Stronger and fuller-bodied than standard method." },
    ],
  },
  hoffmann: {
    label: "James Hoffmann",
    coffeeG: 11,
    waterMl: 200,
    waterTempC: 100,
    totalSec: 240,
    note: "Hoffmann's ultimate AeroPress recipe — no stir, gentle press, boiling water",
    steps: [
      { time: "0:00", action: "Set up inverted", detail: "AeroPress inverted, plunger at 4. Use boiling water (100C)." },
      { time: "0:00", action: "Add coffee", detail: "Add 11g of medium ground coffee." },
      { time: "0:00", action: "Fill immediately", detail: "Pour all 200ml of boiling water. Do not stir." },
      { time: "0:00", action: "Cap", detail: "Attach filter cap with rinsed filter. Do not press yet." },
      { time: "2:00", action: "Flip", detail: "At 2 minutes flip onto cup. Let rest for 30 seconds before pressing." },
      { time: "2:30", action: "Press gently", detail: "Press very slowly over 30 seconds. Stop the moment you hear hissing." },
      { time: "3:00", action: "Done", detail: "Total brew time ~3 minutes. Boiling water + no stir = uniform extraction." },
    ],
  },
  iced: {
    label: "Iced AeroPress",
    coffeeG: 20,
    waterMl: 150,
    waterTempC: 96,
    totalSec: 90,
    note: "Brew hot concentrate directly over ice — fast and full-flavoured",
    steps: [
      { time: "0:00", action: "Prep glass", detail: "Fill a glass with 150g of ice cubes." },
      { time: "0:00", action: "Set up standard", detail: "AeroPress in standard position on top of the ice-filled glass." },
      { time: "0:00", action: "Add coffee", detail: "Add 20g of medium-fine ground coffee." },
      { time: "0:00", action: "Bloom", detail: "Pour 40ml of water. Stir. Wait 30 seconds." },
      { time: "0:30", action: "Fill", detail: "Pour remaining water to 150ml total concentrate." },
      { time: "1:00", action: "Press", detail: "Press firmly over 20 seconds directly onto the ice." },
      { time: "1:30", action: "Done", detail: "The hot concentrate chills instantly over the ice. Stir and serve." },
    ],
  },
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AeroPressRecipe() {
  const [method, setMethod] = useState<Method>("hoffmann")
  const active = METHODS[method]

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">

      {/* ── Method selector ── */}
      <div className="p-5 sm:p-6">
        <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Method</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(Object.entries(METHODS) as [Method, typeof METHODS[Method]][]).map(([key, val]) => (
            <button key={key} onClick={() => setMethod(key)}
              className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                method === key
                  ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                  : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
              }`}>
              {val.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-surface-500 dark:text-surface-400">{active.note}</p>
      </div>

      {/* ── Recipe summary ── */}
      <div className="border-t border-brand-200 bg-brand-50 px-5 py-5 sm:px-6 dark:border-green-800 dark:bg-green-950">

        {/* Stats */}
        <div className="mb-5 grid grid-cols-4 gap-3">
          {[
            { label: "Coffee",    value: `${active.coffeeG}g` },
            { label: "Water",     value: `${active.waterMl}ml` },
            { label: "Temp",      value: `${active.waterTempC}C` },
            { label: "Ratio",     value: `1:${Math.round(active.waterMl / active.coffeeG)}` },
          ].map((s, i) => (
            <div key={s.label} className={`rounded-xl p-3 ${i === 0 ? "bg-brand-600 text-white" : "bg-white dark:bg-surface-800"}`}>
              <p className={`text-xs font-medium mb-1 ${i === 0 ? "text-brand-100" : "text-surface-500 dark:text-surface-400"}`}>{s.label}</p>
              <p className={`font-mono text-lg font-bold leading-none ${i === 0 ? "text-white" : "text-surface-800 dark:text-surface-100"}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Steps */}
        <p className="mb-3 text-sm font-semibold text-surface-700 dark:text-surface-200">Step-by-step</p>
        <div className="space-y-2">
          {active.steps.map((step, i) => (
            <div key={i} className="flex gap-3 rounded-lg bg-white px-3 py-2.5 dark:bg-surface-800">
              <span className="w-12 shrink-0 font-mono text-xs font-semibold text-brand-600 dark:text-brand-400 pt-0.5">{step.time}</span>
              <div>
                <p className="text-sm font-semibold text-surface-700 dark:text-surface-200">{step.action}</p>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-surface-500 dark:text-surface-400">
          Grind: medium-fine for standard and inverted; medium for Hoffmann method. Always rinse paper filter before brewing.
        </p>
      </div>
    </div>
  )
}
