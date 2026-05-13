"use client"

import { useState, useCallback } from "react"

type Style = "concentrate" | "rtd"
type Method = "jar" | "frenchpress" | "dripper"
type Unit = "metric" | "imperial"

const STYLES: Record<Style, { label: string; ratio: number; sub: string; note: string }> = {
  concentrate: { label: "Concentrate",        ratio: 4,  sub: "1:4 — dilute 1:1 with water or milk", note: "Dilute 50/50 before drinking. Keeps in fridge up to 2 weeks." },
  rtd:         { label: "Ready to drink",     ratio: 8,  sub: "1:8 — drink straight over ice",       note: "Drink straight over ice. Keeps in fridge up to 10 days." },
}

const METHODS: Record<Method, { label: string; sub: string }> = {
  jar:         { label: "Mason jar",    sub: "Any sealed jar" },
  frenchpress: { label: "French press", sub: "Use as a strainer" },
  dripper:     { label: "Cold brew kit", sub: "Dedicated cold brew" },
}

const QUICK_ML = [500, 750, 1000, 1500, 2000]

function round1(n: number) { return Math.round(n * 10) / 10 }
function mlToOz(ml: number) { return round1(ml / 29.5735) }
function mlToCups(ml: number) { return round1(ml / 236.6) }

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

export function ColdBrewRatioCalculator() {
  const [style, setStyle]       = useState<Style>("concentrate")
  const [method, setMethod]     = useState<Method>("jar")
  const [waterMl, setWaterMl]   = useState(1000)
  const [useCustom, setUseCustom] = useState(false)
  const [customMl, setCustomMl] = useState("")
  const [unit, setUnit]         = useState<Unit>("metric")

  const activeWater  = useCustom ? (parseFloat(customMl) || 0) : waterMl
  const ratio        = STYLES[style].ratio
  const coffeeG      = activeWater / ratio
  const tbsp         = coffeeG / 7   // coarse grind ≈ 7g/tbsp
  const hasResult    = activeWater > 0

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">
      <div className="space-y-6 p-5 sm:p-6">

        {/* Style */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Cold brew style</label>
          <div className="grid grid-cols-2 gap-2">
            {(Object.entries(STYLES) as [Style, typeof STYLES[Style]][]).map(([key, val]) => (
              <button key={key} onClick={() => setStyle(key)}
                className={`min-h-[44px] rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all ${
                  style === key
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                }`}>
                <span className="block font-semibold">{val.label}</span>
                <span className="block opacity-75">{val.sub}</span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-surface-500 dark:text-surface-400">{STYLES[style].note}</p>
        </div>

        {/* Method */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Equipment</label>
          <div className="flex gap-2">
            {(Object.entries(METHODS) as [Method, typeof METHODS[Method]][]).map(([key, val]) => (
              <button key={key} onClick={() => setMethod(key)}
                className={`min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all ${
                  method === key
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                }`}>
                <span className="block font-semibold">{val.label}</span>
                <span className="block opacity-75">{val.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Water amount + unit */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-0">
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Water amount</label>
            <div className="flex flex-wrap gap-2">
              {QUICK_ML.map((ml) => (
                <button key={ml} onClick={() => { setWaterMl(ml); setUseCustom(false) }}
                  className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                    !useCustom && waterMl === ml
                      ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                      : "border-surface-200 bg-white text-surface-700 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500"
                  }`}>
                  {ml >= 1000 ? `${ml / 1000}L` : `${ml}ml`}
                </button>
              ))}
              <input type="number" min="100" max="10000" step="100" placeholder="Custom ml"
                value={useCustom ? customMl : ""}
                onChange={(e) => { setCustomMl(e.target.value); setUseCustom(true) }}
                className="min-h-[44px] w-28 rounded-lg border border-surface-200 bg-white px-3 py-2 text-sm text-surface-700 placeholder-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:focus:ring-brand-800" />
            </div>
          </div>
          <div className="shrink-0">
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Units</label>
            <div className="flex overflow-hidden rounded-lg border border-surface-200 dark:border-surface-600">
              {(["metric", "imperial"] as Unit[]).map((u) => (
                <button key={u} onClick={() => setUnit(u)}
                  className={`min-h-[44px] px-4 py-2 text-sm font-medium capitalize transition-colors ${
                    unit === u ? "bg-brand-600 text-white" : "bg-white text-surface-600 hover:bg-surface-100 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700"
                  }`}>{u}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Result ── */}
      <div className={`border-t px-5 py-5 sm:px-6 transition-all duration-200 ${
        hasResult ? "border-brand-200 bg-brand-50 dark:border-green-800 dark:bg-green-950" : "border-surface-200 bg-surface-100 dark:border-surface-700 dark:bg-surface-800"
      }`}>
        {!hasResult ? (
          <p className="text-sm text-surface-500 dark:text-surface-400">Enter a water amount to see your cold brew recipe.</p>
        ) : (
          <>
            <p className="mb-4 text-sm font-semibold text-surface-700 dark:text-surface-200">
              For {unit === "metric" ? `${Math.round(activeWater)}ml` : `${mlToOz(activeWater)} fl oz`} of water at 1:{ratio}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { label: "Ground coffee", value: unit === "metric" ? `${round1(coffeeG)} g` : `${round1(coffeeG / 28.3495)} oz`, raw: `${round1(coffeeG)}g`, highlight: true },
                { label: "Tablespoons",   value: `${round1(tbsp)} tbsp`, raw: `${round1(tbsp)} tablespoons`, highlight: false },
                { label: "Steep time",    value: "12–24 hrs", raw: "12-24 hours cold steep", highlight: false },
              ].map((item) => (
                <div key={item.label} className={`rounded-xl p-3 ${item.highlight ? "bg-brand-600 text-white" : "bg-white dark:bg-surface-800"}`}>
                  <p className={`text-xs font-medium mb-1 ${item.highlight ? "text-brand-100" : "text-surface-500 dark:text-surface-400"}`}>{item.label}</p>
                  <p className={`font-mono text-xl font-bold leading-none ${item.highlight ? "text-white" : "text-surface-800 dark:text-surface-100"}`}>{item.value}</p>
                  <div className="mt-2 flex justify-end"><CopyButton value={item.raw} /></div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-white px-3 py-2.5 dark:bg-surface-800 text-xs text-surface-500 dark:text-surface-400">
              <strong className="text-surface-700 dark:text-surface-200">Process:</strong> Combine coarsely ground coffee and cold water. Stir to saturate. Cover and refrigerate for 12 to 24 hours. Strain through a fine-mesh sieve or the French press mesh, then filter through a paper filter or cheesecloth if desired for a clearer result.
            </div>
          </>
        )}
      </div>
    </div>
  )
}
