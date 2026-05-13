"use client"

import { useState, useCallback } from "react"

type Drink = "latte" | "flatwhite" | "cortado" | "cappuccino" | "cafeau" | "macchiato"
type CupSize = "small" | "medium" | "large"

const DRINKS: Record<Drink, {
  label: string
  espressoMl: number
  milkRatio: number    // milk ml per ml of espresso
  note: string
}> = {
  macchiato:  { label: "Macchiato",     espressoMl: 30,  milkRatio: 0.5,  note: "Espresso 'marked' with a small amount of foam" },
  cortado:    { label: "Cortado",       espressoMl: 30,  milkRatio: 1,    note: "Equal parts espresso and warm milk — no foam" },
  flatwhite:  { label: "Flat white",    espressoMl: 60,  milkRatio: 1.5,  note: "Double ristretto base, velvety microfoam" },
  cappuccino: { label: "Cappuccino",    espressoMl: 30,  milkRatio: 2,    note: "Equal thirds: espresso, steamed milk, foam" },
  latte:      { label: "Latte",         espressoMl: 60,  milkRatio: 4,    note: "Double shot with generous steamed milk" },
  cafeau:     { label: "Café au lait",  espressoMl: 0,   milkRatio: 1,    note: "Equal parts drip/filter coffee and warm milk" },
}

const CUP_SIZES: Record<CupSize, { label: string; multiplier: number }> = {
  small:  { label: "Small",  multiplier: 0.75 },
  medium: { label: "Medium", multiplier: 1 },
  large:  { label: "Large",  multiplier: 1.5 },
}

function round0(n: number) { return Math.round(n) }

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(() => {
    navigator.clipboard.writeText(value).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800) })
  }, [value])
  return (
    <button onClick={copy} aria-label={`Copy ${value}`}
      className="ml-1 rounded px-1.5 py-0.5 text-xs text-surface-400 transition-colors hover:bg-surface-200 hover:text-surface-700 dark:hover:bg-surface-700 dark:hover:text-surface-200">
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

export function MilkCoffeeRatioCalculator() {
  const [drink, setDrink]     = useState<Drink>("latte")
  const [size, setSize]       = useState<CupSize>("medium")

  const data       = DRINKS[drink]
  const mult       = CUP_SIZES[size].multiplier
  const espressoMl = data.espressoMl > 0 ? round0(data.espressoMl * mult) : 0
  const coffeeMl   = drink === "cafeau" ? round0(150 * mult) : 0
  const milkMl     = data.espressoMl > 0
    ? round0(data.espressoMl * data.milkRatio * mult)
    : round0(150 * data.milkRatio * mult)
  const totalMl    = (espressoMl || coffeeMl) + milkMl

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">
      <div className="space-y-6 p-5 sm:p-6">

        {/* Drink */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Drink</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {(Object.entries(DRINKS) as [Drink, typeof DRINKS[Drink]][]).map(([key, val]) => (
              <button key={key} onClick={() => setDrink(key)}
                className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  drink === key
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                }`}>{val.label}</button>
            ))}
          </div>
          <p className="mt-2 text-xs text-surface-500 dark:text-surface-400">{data.note}</p>
        </div>

        {/* Cup size */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Cup size</label>
          <div className="flex gap-2">
            {(Object.entries(CUP_SIZES) as [CupSize, typeof CUP_SIZES[CupSize]][]).map(([key, val]) => (
              <button key={key} onClick={() => setSize(key)}
                className={`min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  size === key
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                }`}>{val.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Result ── */}
      <div className="border-t border-brand-200 bg-brand-50 px-5 py-5 sm:px-6 dark:border-green-800 dark:bg-green-950">
        <p className="mb-4 text-sm font-semibold text-surface-700 dark:text-surface-200">
          {CUP_SIZES[size].label} {DRINKS[drink].label} — {totalMl}ml total
        </p>

        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: drink === "cafeau" ? "Filter coffee" : "Espresso",
              value: `${espressoMl || coffeeMl} ml`,
              raw: drink === "cafeau" ? `${coffeeMl}ml filter coffee` : `${espressoMl}ml espresso`,
              highlight: true,
            },
            {
              label: "Steamed milk",
              value: `${milkMl} ml`,
              raw: `${milkMl}ml milk`,
              highlight: false,
            },
            {
              label: "Ratio",
              value: `1:${data.milkRatio}`,
              raw: `1:${data.milkRatio} coffee to milk`,
              highlight: false,
            },
          ].map((item) => (
            <div key={item.label} className={`rounded-xl p-3 ${item.highlight ? "bg-brand-600 text-white" : "bg-white dark:bg-surface-800"}`}>
              <p className={`text-xs font-medium mb-1 ${item.highlight ? "text-brand-100" : "text-surface-500 dark:text-surface-400"}`}>{item.label}</p>
              <p className={`font-mono text-xl font-bold leading-none ${item.highlight ? "text-white" : "text-surface-800 dark:text-surface-100"}`}>{item.value}</p>
              <div className="mt-2 flex justify-end"><CopyButton value={item.raw} /></div>
            </div>
          ))}
        </div>

        {/* Visual ratio bar */}
        <div className="mt-4">
          <p className="mb-1.5 text-xs text-surface-500 dark:text-surface-400">Drink composition</p>
          <div className="flex h-3 w-full overflow-hidden rounded-full">
            <div className="bg-brand-600 transition-all duration-500"
              style={{ width: `${(((espressoMl || coffeeMl) / totalMl) * 100).toFixed(1)}%` }} />
            <div className="bg-surface-300 dark:bg-surface-600 flex-1" />
          </div>
          <div className="mt-1 flex justify-between text-xs text-surface-400 dark:text-surface-500">
            <span>{drink === "cafeau" ? "Coffee" : "Espresso"} ({((( espressoMl || coffeeMl) / totalMl) * 100).toFixed(0)}%)</span>
            <span>Milk ({((milkMl / totalMl) * 100).toFixed(0)}%)</span>
          </div>
        </div>

        <p className="mt-3 text-xs text-surface-400 dark:text-surface-500">
          Milk temperature: 60 to 65C (140 to 150F) for steamed milk. Foam ratio varies by technique — this calculator shows liquid milk volume only.
        </p>
      </div>
    </div>
  )
}
