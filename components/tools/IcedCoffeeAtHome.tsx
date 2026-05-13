"use client"

import { useState, useCallback } from "react"

type MethodId = "flash" | "cold_brew" | "shaken" | "ice_cubes"
type CupOz = 8 | 12 | 16 | 20

interface ResultLine { label: string; value: string }
interface Result { lines: ResultLine[]; steps: string[]; copyText: string }

interface MethodData {
  label: string
  description: string
  grind: string
  temp: string
  compute: (oz: CupOz) => Result
}

const CUP_SIZES: CupOz[] = [8, 12, 16, 20]
const METHOD_KEYS: MethodId[] = ["flash", "cold_brew", "shaken", "ice_cubes"]

const METHODS: Record<MethodId, MethodData> = {
  flash: {
    label: "Flash Brew",
    description: "Brew hot coffee directly over ice. The ice melts to the correct dilution instantly — no waiting, no watery coffee.",
    grind: "Medium-fine",
    temp: "93-96C water",
    compute: (oz) => {
      const cupMl   = Math.round(oz * 29.57)
      const iceMl   = Math.round(cupMl * 0.4)
      const waterMl = cupMl - iceMl
      const coffeeG = Math.round(waterMl / 15)
      return {
        lines: [
          { label: "Coffee",    value: `${coffeeG}g` },
          { label: "Hot water", value: `${waterMl}ml at 93-96C` },
          { label: "Ice",       value: `${iceMl}g` },
        ],
        steps: [
          `Place ${iceMl}g of ice in your carafe or serving glass.`,
          `Grind ${coffeeG}g of coffee to medium-fine.`,
          `Brew ${waterMl}ml of water at 93-96C directly over the ice using a pour-over dripper or drip machine.`,
          "Serve immediately. The melting ice dilutes the brew to the correct drinking ratio.",
        ],
        copyText: `Flash Brew iced coffee (${oz}oz): ${coffeeG}g coffee / ${waterMl}ml hot water (93-96C) / ${iceMl}g ice. Brew directly over ice.`,
      }
    },
  },
  cold_brew: {
    label: "Cold Brew Dilution",
    description: "Dilute cold brew concentrate 1:1 with water or milk over ice for a smooth, low-acid iced coffee with no bitterness.",
    grind: "Coarse (French press)",
    temp: "Cold water (no heat)",
    compute: (oz) => {
      const concentrateMl = Math.round(oz * 10)
      const diluentMl     = concentrateMl
      return {
        lines: [
          { label: "Cold brew concentrate", value: `${concentrateMl}ml` },
          { label: "Water or milk",         value: `${diluentMl}ml` },
          { label: "Ice",                   value: "fill glass to top" },
        ],
        steps: [
          "Fill your glass with ice.",
          `Pour ${concentrateMl}ml cold brew concentrate over the ice.`,
          `Add ${diluentMl}ml cold water or milk. Stir gently.`,
          "Batch tip: to make 500ml concentrate, steep 85g coarse coffee in 500ml cold water for 12-18 hours in the fridge, then strain.",
        ],
        copyText: `Cold Brew Dilution (${oz}oz): ${concentrateMl}ml concentrate + ${diluentMl}ml water/milk over ice. Batch: 85g coarse coffee + 500ml cold water, steep 12-18h.`,
      }
    },
  },
  shaken: {
    label: "Shaken Espresso",
    description: "Espresso shaken hard over ice until frothy, then topped with oat milk. Light, airy texture with less bitterness than poured espresso.",
    grind: "Fine (espresso)",
    temp: "Hot espresso",
    compute: (oz) => {
      const shots      = oz <= 12 ? 2 : 3
      const coffeeG    = shots * 18
      const espressoMl = shots * 36
      const milkMl     = Math.round(oz * 7.5)
      return {
        lines: [
          { label: `Espresso (${shots} double shot${shots > 1 ? "s" : ""})`, value: `${coffeeG}g coffee` },
          { label: "Espresso yield",                                          value: `${espressoMl}ml` },
          { label: "Oat milk",                                                value: `${milkMl}ml` },
          { label: "Ice",                                                     value: "shaker + glass" },
        ],
        steps: [
          `Pull ${shots} double shot${shots > 1 ? "s" : ""} of espresso (${coffeeG}g coffee, 1:2 ratio, ${espressoMl}ml yield).`,
          "Fill a cocktail shaker or sealed mason jar with ice. Pour the espresso over the ice.",
          "Seal and shake hard for 15-20 seconds until the shaker is very cold and the espresso is frothy.",
          `Strain into a glass over fresh ice. Top with ${milkMl}ml cold oat milk.`,
        ],
        copyText: `Shaken Espresso (${oz}oz): ${shots} double shot${shots > 1 ? "s" : ""} (${coffeeG}g coffee, ${espressoMl}ml) + ${milkMl}ml oat milk over ice.`,
      }
    },
  },
  ice_cubes: {
    label: "Coffee Ice Cubes",
    description: "Freeze strong coffee into cubes and pour milk over them. As the cubes melt they release more coffee flavour, not just water.",
    grind: "Medium (drip/filter)",
    temp: "Brew hot, freeze cold",
    compute: (oz) => {
      const cubes   = oz <= 8 ? 5 : oz <= 12 ? 7 : oz <= 16 ? 9 : 12
      const brewMl  = cubes * 30
      const coffeeG = Math.round(brewMl / 10)
      const milkMl  = Math.round(oz * 10)
      return {
        lines: [
          { label: "Coffee for cubes", value: `${coffeeG}g + ${brewMl}ml water (1:10)` },
          { label: "Coffee ice cubes", value: `${cubes} cubes` },
          { label: "Milk or cream",    value: `${milkMl}ml` },
        ],
        steps: [
          `Brew ${coffeeG}g ground coffee with ${brewMl}ml water at 1:10 ratio (stronger than usual — it dilutes as the cubes melt).`,
          "Let cool, then pour into an ice cube tray. Freeze for at least 4 hours.",
          `Place ${cubes} coffee ice cubes in a glass.`,
          `Pour ${milkMl}ml cold milk or cream over the cubes. Let sit 1-2 minutes before drinking.`,
        ],
        copyText: `Coffee Ice Cubes (${oz}oz): brew ${coffeeG}g coffee + ${brewMl}ml water (1:10). Freeze ${cubes} cubes. Pour ${milkMl}ml milk over frozen cubes.`,
      }
    },
  },
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

export function IcedCoffeeAtHome() {
  const [methodId, setMethodId] = useState<MethodId>("flash")
  const [cupOz, setCupOz]       = useState<CupOz>(12)

  const method = METHODS[methodId]
  const result = method.compute(cupOz)

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">
      <div className="space-y-4 p-5 sm:p-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Method</label>
          <div className="grid grid-cols-2 gap-2">
            {METHOD_KEYS.map((key) => (
              <button key={key} onClick={() => setMethodId(key)}
                className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all text-left ${
                  methodId === key
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                }`}>{METHODS[key].label}</button>
            ))}
          </div>
          <p className="mt-2 text-xs text-surface-500 dark:text-surface-400">{method.description}</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Cup size</label>
          <div className="flex gap-2">
            {CUP_SIZES.map((oz) => (
              <button key={oz} onClick={() => setCupOz(oz)}
                className={`min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  cupOz === oz
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-700 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500"
                }`}>{oz}oz</button>
            ))}
          </div>
          <p className="mt-1 text-xs text-surface-400 dark:text-surface-500">
            Grind: {method.grind} &nbsp;/&nbsp; Temp: {method.temp}
          </p>
        </div>
      </div>

      <div className="border-t border-surface-200 dark:border-surface-700 px-5 py-5 sm:px-6">
        <div className="mb-4 grid gap-2">
          {result.lines.map((line) => (
            <div key={line.label} className="flex items-center justify-between rounded-lg border border-surface-100 bg-white px-4 py-2.5 dark:border-surface-700 dark:bg-surface-800">
              <span className="text-xs text-surface-500 dark:text-surface-400">{line.label}</span>
              <span className="font-mono text-sm font-semibold text-brand-600 dark:text-brand-400">{line.value}</span>
            </div>
          ))}
        </div>

        <p className="mb-3 text-sm font-semibold text-surface-700 dark:text-surface-200">Step by step</p>
        <ol className="space-y-2">
          {result.steps.map((step, i) => (
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
            Amounts calculated for a {cupOz}oz serving.
          </p>
          <CopyButton value={result.copyText} />
        </div>
      </div>
    </div>
  )
}
