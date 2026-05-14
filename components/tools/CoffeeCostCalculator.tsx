"use client"

import { useState, useCallback } from "react"

type UnitId = "g" | "oz"
type DosePresetId = "espresso" | "pour_over" | "french_press" | "cold_brew" | "custom"

const DOSE_PRESETS: Record<DosePresetId, { label: string; g: number }> = {
  espresso:    { label: "Espresso",    g: 18 },
  pour_over:   { label: "Pour Over",   g: 15 },
  french_press:{ label: "French Press",g: 20 },
  cold_brew:   { label: "Cold Brew",   g: 30 },
  custom:      { label: "Custom",      g: 18 },
}

const PRESET_KEYS: DosePresetId[] = ["espresso", "pour_over", "french_press", "cold_brew", "custom"]

type Tier = "Budget" | "Mid-range" | "Specialty"

function getTier(costPerCup: number): { tier: Tier; color: string; description: string } {
  if (costPerCup < 0.30) {
    return {
      tier: "Budget",
      color: "text-blue-700 dark:text-blue-400",
      description: "Under $0.30 per cup — supermarket or instant range.",
    }
  }
  if (costPerCup < 0.70) {
    return {
      tier: "Mid-range",
      color: "text-amber-700 dark:text-amber-400",
      description: "$0.30-$0.70 per cup — quality grocery or entry-level specialty.",
    }
  }
  return {
    tier: "Specialty",
    color: "text-emerald-700 dark:text-emerald-400",
    description: "Over $0.70 per cup — third-wave specialty and single-origin range.",
  }
}

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
      className="rounded px-2 py-1 text-xs text-surface-400 transition-colors hover:bg-surface-200 hover:text-surface-700 dark:hover:bg-surface-700 dark:hover:text-surface-200"
    >
      {copied ? "Copied" : "Copy summary"}
    </button>
  )
}

export function CoffeeCostCalculator() {
  const [bagPrice,    setBagPrice]    = useState(18)
  const [bagWeight,   setBagWeight]   = useState(250)
  const [weightUnit,  setWeightUnit]  = useState<UnitId>("g")
  const [dosePreset,  setDosePreset]  = useState<DosePresetId>("pour_over")
  const [customDose,  setCustomDose]  = useState(18)

  const doseG = dosePreset === "custom" ? customDose : DOSE_PRESETS[dosePreset].g
  const bagWeightG = weightUnit === "g" ? bagWeight : Math.round(bagWeight * 28.35)

  const cupsPerBag  = bagWeightG > 0 && doseG > 0 ? Math.floor(bagWeightG / doseG) : 0
  const costPerCup  = cupsPerBag > 0 ? bagPrice / cupsPerBag : 0
  const dailyCost   = costPerCup
  const monthlyCost = costPerCup * 30
  const yearlyCost  = costPerCup * 365

  const tierInfo = getTier(costPerCup)

  const copyText = cupsPerBag > 0
    ? [
        `Coffee cost summary:`,
        `Bag: $${bagPrice.toFixed(2)} / ${bagWeightG}g`,
        `Dose: ${doseG}g per cup (${DOSE_PRESETS[dosePreset].label})`,
        `Cups per bag: ${cupsPerBag}`,
        `Cost per cup: $${costPerCup.toFixed(2)}`,
        `Monthly cost (1 cup/day): $${monthlyCost.toFixed(2)}`,
        `Yearly cost (1 cup/day): $${yearlyCost.toFixed(2)}`,
        `Tier: ${tierInfo.tier}`,
      ].join("\n")
    : "Enter bag price and weight to calculate."

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">
      <div className="space-y-5 p-5 sm:p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
              Bag price (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-surface-400 dark:text-surface-500">$</span>
              <input
                type="number"
                min={0.01}
                step={0.01}
                value={bagPrice}
                onChange={(e) => setBagPrice(Math.max(0.01, parseFloat(e.target.value) || 0))}
                className="w-full rounded-lg border border-surface-200 bg-white py-2.5 pl-7 pr-4 text-sm text-surface-800 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
              Bag weight
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min={1}
                step={1}
                value={bagWeight}
                onChange={(e) => setBagWeight(Math.max(1, parseInt(e.target.value) || 1))}
                className="min-w-0 flex-1 rounded-lg border border-surface-200 bg-white px-3 py-2.5 text-sm text-surface-800 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <div className="flex overflow-hidden rounded-lg border border-surface-200 dark:border-surface-600">
                {(["g", "oz"] as UnitId[]).map((u) => (
                  <button
                    key={u}
                    onClick={() => {
                      if (u === weightUnit) return
                      if (u === "oz") setBagWeight(Math.round(bagWeight / 28.35))
                      else setBagWeight(Math.round(bagWeight * 28.35))
                      setWeightUnit(u)
                    }}
                    className={`min-h-[44px] px-3 text-sm font-medium transition-colors ${
                      weightUnit === u
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

        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
            Brew method (dose per cup)
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {PRESET_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => setDosePreset(key)}
                className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  dosePreset === key
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-700 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500"
                }`}
              >
                {DOSE_PRESETS[key].label}
                {key !== "custom" && (
                  <span className="ml-1 text-xs opacity-70">({DOSE_PRESETS[key].g}g)</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {dosePreset === "custom" && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
              Custom dose (g per cup)
            </label>
            <input
              type="number"
              min={1}
              max={100}
              step={0.5}
              value={customDose}
              onChange={(e) => setCustomDose(Math.max(1, parseFloat(e.target.value) || 1))}
              className="w-full rounded-lg border border-surface-200 bg-white px-4 py-2.5 text-sm text-surface-800 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        )}
      </div>

      <div className="border-t border-surface-200 dark:border-surface-700 px-5 py-5 sm:px-6">
        {cupsPerBag > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-4">
              <div className="rounded-xl border border-surface-100 bg-white dark:border-surface-700 dark:bg-surface-800 p-4 text-center">
                <p className="text-xs text-surface-400 dark:text-surface-500 mb-1">Cups per bag</p>
                <p className="text-2xl font-bold font-mono text-brand-600 dark:text-brand-400">{cupsPerBag}</p>
              </div>
              <div className="rounded-xl border border-surface-100 bg-white dark:border-surface-700 dark:bg-surface-800 p-4 text-center">
                <p className="text-xs text-surface-400 dark:text-surface-500 mb-1">Cost per cup</p>
                <p className="text-2xl font-bold font-mono text-brand-600 dark:text-brand-400">${costPerCup.toFixed(2)}</p>
              </div>
              <div className="rounded-xl border border-surface-100 bg-white dark:border-surface-700 dark:bg-surface-800 p-4 text-center">
                <p className="text-xs text-surface-400 dark:text-surface-500 mb-1">Monthly</p>
                <p className="text-2xl font-bold font-mono text-brand-600 dark:text-brand-400">${monthlyCost.toFixed(2)}</p>
                <p className="text-xs text-surface-400 dark:text-surface-500">1 cup/day</p>
              </div>
              <div className="rounded-xl border border-surface-100 bg-white dark:border-surface-700 dark:bg-surface-800 p-4 text-center">
                <p className="text-xs text-surface-400 dark:text-surface-500 mb-1">Yearly</p>
                <p className="text-2xl font-bold font-mono text-brand-600 dark:text-brand-400">${yearlyCost.toFixed(0)}</p>
                <p className="text-xs text-surface-400 dark:text-surface-500">1 cup/day</p>
              </div>
            </div>

            <div className="rounded-xl border border-surface-100 bg-white dark:border-surface-700 dark:bg-surface-800 px-4 py-3 flex items-center justify-between gap-3">
              <div>
                <span className={`text-sm font-bold ${tierInfo.color}`}>{tierInfo.tier}</span>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{tierInfo.description}</p>
              </div>
              <p className="text-xs text-surface-400 dark:text-surface-500 shrink-0">
                {doseG}g / cup
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2">
              <p className="text-xs text-surface-400 dark:text-surface-500">
                {bagWeightG}g bag at {doseG}g per {DOSE_PRESETS[dosePreset].label.toLowerCase()} serving.
              </p>
              <CopyButton value={copyText} />
            </div>
          </>
        ) : (
          <p className="text-sm text-surface-400 dark:text-surface-500 text-center py-4">
            Enter a bag price and weight to see your cost per cup.
          </p>
        )}
      </div>
    </div>
  )
}
