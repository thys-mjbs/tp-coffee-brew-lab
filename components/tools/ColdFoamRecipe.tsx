"use client"

import { useState, useCallback } from "react"

type MilkType = "whole" | "two_pct" | "oat" | "coconut" | "heavy_cream"
type ServingOz = 4 | 6 | 8 | 12
type Flavor = "plain" | "vanilla" | "sweet_cream" | "brown_sugar" | "caramel"

const MILKS: Record<MilkType, { label: string; badge: string; badgeColor: string; tip: string }> = {
  whole:       { label: "Whole milk",    badge: "Best",  badgeColor: "text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900",       tip: "Froths into thick, velvety foam. The classic cold foam texture — creamy and stable." },
  two_pct:     { label: "2% milk",      badge: "Great", badgeColor: "text-brand-700 bg-brand-100 dark:text-brand-300 dark:bg-brand-900",         tip: "Slightly lighter than whole milk but still produces good foam. Works well for any flavor." },
  oat:         { label: "Oat milk",     badge: "Good",  badgeColor: "text-surface-600 bg-surface-100 dark:text-surface-300 dark:bg-surface-800", tip: "Use barista-edition oat milk for best results. Froths lighter than dairy but still works." },
  coconut:     { label: "Coconut milk", badge: "Good",  badgeColor: "text-surface-600 bg-surface-100 dark:text-surface-300 dark:bg-surface-800", tip: "Use full-fat canned coconut milk. Chill it before frothing for best results." },
  heavy_cream: { label: "Heavy cream",  badge: "Rich",  badgeColor: "text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-900",         tip: "Produces the thickest, richest foam. Use less — it goes a very long way. 10-15 seconds of frothing is plenty." },
}

const SERVING_SIZES: ServingOz[] = [4, 6, 8, 12]

const FLAVORS: Record<Flavor, { label: string; addNote: (oz: ServingOz) => string | null }> = {
  plain:       { label: "Plain",                 addNote: () => null },
  vanilla:     { label: "Vanilla",               addNote: (oz) => `${Math.max(1, Math.round(oz / 3))} pump${Math.max(1, Math.round(oz / 3)) > 1 ? "s" : ""} vanilla syrup (${Math.max(1, Math.round(oz / 3)) * 5}ml)` },
  sweet_cream: { label: "Sweet cream",           addNote: (oz) => `${Math.max(1, Math.round(oz / 4))} pump${Math.max(1, Math.round(oz / 4)) > 1 ? "s" : ""} vanilla syrup + replace half the milk with heavy cream` },
  brown_sugar: { label: "Brown sugar cinnamon",  addNote: (oz) => `${Math.max(1, Math.round(oz / 3))} pump${Math.max(1, Math.round(oz / 3)) > 1 ? "s" : ""} brown sugar syrup + pinch of cinnamon` },
  caramel:     { label: "Caramel",               addNote: (oz) => `${Math.max(1, Math.round(oz / 3))} pump${Math.max(1, Math.round(oz / 3)) > 1 ? "s" : ""} caramel sauce or caramel syrup` },
}

function milkMl(type: MilkType, oz: ServingOz): number {
  return oz * (type === "heavy_cream" ? 12 : 30)
}

function aerationNote(type: MilkType): string {
  if (type === "heavy_cream") return "Shake in a sealed jar for 15-20 seconds — it thickens very quickly. Froth for 10 seconds max."
  if (type === "coconut")     return "Froth with a handheld frother for 30-40 seconds. Chill coconut milk first for best results."
  return "Froth with a handheld frother for 20-30 seconds until thick and pourable. Keep milk cold before frothing."
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

export function ColdFoamRecipe() {
  const [milkType, setMilkType] = useState<MilkType>("whole")
  const [serving, setServing]   = useState<ServingOz>(6)
  const [flavor, setFlavor]     = useState<Flavor>("vanilla")

  const milk    = MILKS[milkType]
  const flav    = FLAVORS[flavor]
  const amount  = milkMl(milkType, serving)
  const addNote = flav.addNote(serving)
  const aerate  = aerationNote(milkType)

  const copyText = [
    `Cold foam — ${flav.label}, ${milk.label}, ${serving}oz`,
    `Milk: ${amount}ml cold ${milk.label.toLowerCase()}`,
    addNote ? `Flavoring: ${addNote}` : null,
    `Method: ${aerate}`,
    `Tip: ${milk.tip}`,
  ].filter(Boolean).join("\n")

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">
      <div className="space-y-5 p-5 sm:p-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Milk type</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {(Object.entries(MILKS) as [MilkType, typeof MILKS[MilkType]][]).map(([key, m]) => (
              <button key={key} onClick={() => setMilkType(key)}
                className={`min-h-[44px] rounded-lg border px-3 py-2 text-left text-sm font-medium transition-all ${
                  milkType === key
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                }`}>
                <span className="block font-semibold">{m.label}</span>
                <span className={`mt-0.5 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold leading-none ${milkType === key ? "bg-white/20 text-white" : m.badgeColor}`}>{m.badge}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Serving size</label>
          <div className="flex gap-2">
            {SERVING_SIZES.map((oz) => (
              <button key={oz} onClick={() => setServing(oz)}
                className={`min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  serving === oz
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-700 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500"
                }`}>{oz}oz</button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Flavor</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {(Object.entries(FLAVORS) as [Flavor, typeof FLAVORS[Flavor]][]).map(([key, f]) => (
              <button key={key} onClick={() => setFlavor(key)}
                className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  flavor === key
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-700 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500"
                }`}>{f.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-surface-200 dark:border-surface-700 px-5 py-5 sm:px-6">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="rounded-xl border border-surface-100 bg-white dark:border-surface-700 dark:bg-surface-800 p-4 text-center">
            <p className="text-xs text-surface-400 dark:text-surface-500 mb-1">Milk</p>
            <p className="text-2xl font-bold font-mono text-brand-600 dark:text-brand-400">{amount}</p>
            <p className="text-xs text-surface-400 dark:text-surface-500">ml</p>
          </div>
          <div className="rounded-xl border border-surface-100 bg-white dark:border-surface-700 dark:bg-surface-800 p-4 text-center">
            <p className="text-xs text-surface-400 dark:text-surface-500 mb-1">Serving</p>
            <p className="text-2xl font-bold font-mono text-brand-600 dark:text-brand-400">{serving}</p>
            <p className="text-xs text-surface-400 dark:text-surface-500">oz</p>
          </div>
          <div className="rounded-xl border border-surface-100 bg-white dark:border-surface-700 dark:bg-surface-800 p-4 text-center">
            <p className="text-xs text-surface-400 dark:text-surface-500 mb-1">Foam quality</p>
            <p className={`text-base font-bold leading-tight mt-1 ${milkType === "whole" ? "text-green-600 dark:text-green-400" : milkType === "heavy_cream" ? "text-amber-600 dark:text-amber-400" : "text-brand-600 dark:text-brand-400"}`}>
              {milk.badge}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {addNote && (
            <div className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 dark:border-brand-800 dark:bg-brand-950">
              <p className="text-xs font-semibold text-brand-700 dark:text-brand-400 mb-1">Flavoring</p>
              <p className="text-sm text-brand-800 dark:text-brand-200">{addNote}</p>
            </div>
          )}
          <div className="rounded-xl border border-surface-100 bg-white px-4 py-3 dark:border-surface-700 dark:bg-surface-800">
            <p className="text-xs font-semibold text-surface-600 dark:text-surface-300 mb-1">How to froth</p>
            <p className="text-sm text-surface-700 dark:text-surface-200">{aerate}</p>
          </div>
          <div className="rounded-xl border border-surface-100 bg-white px-4 py-3 dark:border-surface-700 dark:bg-surface-800">
            <p className="text-xs font-semibold text-surface-600 dark:text-surface-300 mb-1">Tip for {milk.label.toLowerCase()}</p>
            <p className="text-sm text-surface-700 dark:text-surface-200">{milk.tip}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="flex-1 text-xs text-surface-400 dark:text-surface-500">
            Start with cold milk. Cold milk froths thicker and stays stable longer on top of your drink.
          </p>
          <CopyButton value={copyText} />
        </div>
      </div>
    </div>
  )
}
