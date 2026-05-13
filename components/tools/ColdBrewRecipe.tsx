"use client"

import { useState, useCallback } from "react"

type BatchId = "1cup" | "1quart" | "halfgallon" | "1gallon"
type StrengthId = "regular" | "concentrate" | "strong"
type EquipmentId = "mason_jar" | "french_press" | "toddy"

const BATCHES: Record<BatchId, { label: string; waterG: number }> = {
  "1cup":       { label: "1 cup (240ml)",       waterG: 240  },
  "1quart":     { label: "1 quart (950ml)",      waterG: 950  },
  "halfgallon": { label: "Half gallon (1.9L)",   waterG: 1900 },
  "1gallon":    { label: "1 gallon (3.8L)",      waterG: 3800 },
}

const STRENGTHS: Record<StrengthId, { label: string; ratio: number; servingNote: string; steepH: string }> = {
  regular:     { label: "Regular (1:8)",     ratio: 8, steepH: "12-16", servingNote: "Ready to drink over ice. Dilute 1:1 with milk for a latte-style drink." },
  concentrate: { label: "Concentrate (1:5)", ratio: 5, steepH: "16-20", servingNote: "Dilute 1:1 with cold water or milk before serving. Final ratio ~1:10." },
  strong:      { label: "Strong (1:4)",      ratio: 4, steepH: "18-24", servingNote: "Dilute 1:2 with cold water or milk before serving. Final ratio ~1:12." },
}

const EQUIPMENT: Record<EquipmentId, { label: string; sizeNote?: string }> = {
  mason_jar:    { label: "Mason jar" },
  french_press: { label: "French press", sizeNote: "Best for batches up to 1 quart." },
  toddy:        { label: "Toddy / cold brewer" },
}

const BATCH_KEYS: BatchId[]    = ["1cup", "1quart", "halfgallon", "1gallon"]
const STRENGTH_KEYS: StrengthId[] = ["regular", "concentrate", "strong"]
const EQUIP_KEYS: EquipmentId[] = ["mason_jar", "french_press", "toddy"]

function setupStep(equipId: EquipmentId, coffeeG: number, waterG: number): string {
  if (equipId === "french_press")
    return `Add ${coffeeG}g coarse coffee to the French press. Pour ${waterG}g cold water over the grounds. Place the lid on with the plunger up — do not press yet.`
  if (equipId === "toddy")
    return `Place the filter pad in the Toddy container. Add ${coffeeG}g coarse coffee. Slowly pour ${waterG}g cold water over the grounds. Do not stir after adding water.`
  return `Add ${coffeeG}g coarse coffee and ${waterG}g cold water to a wide-mouth mason jar. Stir briefly to wet all the grounds, then seal.`
}

function strainStep(equipId: EquipmentId): string {
  if (equipId === "french_press") return "Press the plunger slowly and pour immediately into a clean pitcher or jar. Do not let it sit — continued contact over-extracts."
  if (equipId === "toddy")        return "Open the tap and let the coffee drain fully into the carafe below. This takes 5-10 minutes."
  return "Strain through a fine-mesh sieve lined with a paper coffee filter into a clean pitcher or jar. This removes all sediment."
}

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

export function ColdBrewRecipe() {
  const [batchId, setBatchId]       = useState<BatchId>("1quart")
  const [strengthId, setStrengthId] = useState<StrengthId>("concentrate")
  const [equipId, setEquipId]       = useState<EquipmentId>("mason_jar")

  const batch    = BATCHES[batchId]
  const strength = STRENGTHS[strengthId]
  const equip    = EQUIPMENT[equipId]

  const coffeeG  = Math.round(batch.waterG / strength.ratio)
  const yieldMl  = Math.max(0, Math.round(batch.waterG - coffeeG * 2))

  const steps = [
    `Grind ${coffeeG}g of coffee coarse — similar to French press, or slightly coarser. Coarse grind prevents over-extraction during the long steep.`,
    setupStep(equipId, coffeeG, batch.waterG),
    `Steep in the fridge for ${strength.steepH} hours. Room temperature is faster but fridge steeping produces a cleaner, less bitter result.`,
    strainStep(equipId),
    `Store in a sealed jar or pitcher in the fridge. Keeps well for up to 2 weeks.`,
    strength.servingNote,
  ]

  const copyText = [
    `Cold Brew (1:${strength.ratio} ${strengthId}, ${batch.label}):`,
    `Coffee: ${coffeeG}g coarse / Water: ${batch.waterG}g cold`,
    `Equipment: ${equip.label}`,
    `Steep: ${strength.steepH} hours in fridge`,
    `Estimated yield: ~${yieldMl}ml`,
    `Serving: ${strength.servingNote}`,
  ].join("\n")

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">
      <div className="space-y-5 p-5 sm:p-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Batch size</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {BATCH_KEYS.map((key) => (
              <button key={key} onClick={() => setBatchId(key)}
                className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  batchId === key
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-700 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500"
                }`}>{BATCHES[key].label}</button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Strength</label>
          <div className="grid grid-cols-3 gap-2">
            {STRENGTH_KEYS.map((key) => (
              <button key={key} onClick={() => setStrengthId(key)}
                className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  strengthId === key
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-700 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500"
                }`}>{STRENGTHS[key].label}</button>
            ))}
          </div>
          <p className="mt-1.5 text-xs text-surface-400 dark:text-surface-500">{strength.servingNote}</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Equipment</label>
          <div className="grid grid-cols-3 gap-2">
            {EQUIP_KEYS.map((key) => (
              <button key={key} onClick={() => setEquipId(key)}
                className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  equipId === key
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-700 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500"
                }`}>{EQUIPMENT[key].label}</button>
            ))}
          </div>
          {equip.sizeNote && (
            <p className="mt-1.5 text-xs text-amber-600 dark:text-amber-400">{equip.sizeNote}</p>
          )}
        </div>
      </div>

      <div className="border-t border-surface-200 dark:border-surface-700 px-5 py-5 sm:px-6">
        <div className="grid grid-cols-2 gap-3 mb-5 sm:grid-cols-4">
          <div className="rounded-xl border border-surface-100 bg-white dark:border-surface-700 dark:bg-surface-800 p-4 text-center">
            <p className="text-xs text-surface-400 dark:text-surface-500 mb-1">Coffee</p>
            <p className="text-2xl font-bold font-mono text-brand-600 dark:text-brand-400">{coffeeG}</p>
            <p className="text-xs text-surface-400 dark:text-surface-500">grams</p>
          </div>
          <div className="rounded-xl border border-surface-100 bg-white dark:border-surface-700 dark:bg-surface-800 p-4 text-center">
            <p className="text-xs text-surface-400 dark:text-surface-500 mb-1">Water</p>
            <p className="text-2xl font-bold font-mono text-brand-600 dark:text-brand-400">{batch.waterG}</p>
            <p className="text-xs text-surface-400 dark:text-surface-500">grams</p>
          </div>
          <div className="rounded-xl border border-surface-100 bg-white dark:border-surface-700 dark:bg-surface-800 p-4 text-center">
            <p className="text-xs text-surface-400 dark:text-surface-500 mb-1">Steep time</p>
            <p className="text-lg font-bold font-mono text-brand-600 dark:text-brand-400 leading-tight mt-1">{strength.steepH}h</p>
          </div>
          <div className="rounded-xl border border-surface-100 bg-white dark:border-surface-700 dark:bg-surface-800 p-4 text-center">
            <p className="text-xs text-surface-400 dark:text-surface-500 mb-1">Est. yield</p>
            <p className="text-2xl font-bold font-mono text-brand-600 dark:text-brand-400">{yieldMl}</p>
            <p className="text-xs text-surface-400 dark:text-surface-500">ml</p>
          </div>
        </div>

        <p className="mb-3 text-sm font-semibold text-surface-700 dark:text-surface-200">How to make it</p>
        <ol className="space-y-2">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-surface-600 dark:text-surface-300 leading-relaxed">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-700 dark:bg-brand-900 dark:text-brand-300 mt-0.5">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="flex-1 text-xs text-surface-400 dark:text-surface-500">
            Grind: coarse (French press or coarser). Use cold filtered water for best results.
          </p>
          <CopyButton value={copyText} />
        </div>
      </div>
    </div>
  )
}
