"use client"

import { useState, useCallback } from "react"

// Japanese iced pour over: brew hot concentrate directly over ice.
// Total liquid = hot water + ice (ice melts and becomes the dilution water).
// Common split: 60% hot water, 40% ice by weight.
// Ratio adjusted: standard 1:15 becomes 1:15 total (water+ice combined).

type Brewer = "v60" | "chemex" | "kalita"
type Unit = "metric" | "imperial"

const BREWERS: Record<Brewer, { label: string; sub: string }> = {
  v60:    { label: "V60",    sub: "Hario V60" },
  chemex: { label: "Chemex", sub: "All sizes" },
  kalita: { label: "Kalita", sub: "Wave 185" },
}

const QUICK_DOSES = [15, 20, 25, 30]
const RATIO = 15        // 1:15 total (hot water + ice)
const HOT_SPLIT = 0.6  // 60% of total water brewed hot

function round1(n: number) { return Math.round(n * 10) / 10 }
function mlToOz(ml: number) { return round1(ml / 29.5735) }

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

export function IcedPourOverCalculator() {
  const [brewer, setBrewer]         = useState<Brewer>("v60")
  const [dose, setDose]             = useState(20)
  const [useCustom, setUseCustom]   = useState(false)
  const [customDose, setCustomDose] = useState("")
  const [unit, setUnit]             = useState<Unit>("metric")

  const activeDose = useCustom ? (parseFloat(customDose) || 0) : dose
  const totalWater = activeDose * RATIO
  const hotWater   = totalWater * HOT_SPLIT
  const iceG       = totalWater * (1 - HOT_SPLIT)
  const hasResult  = activeDose > 0

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">
      <div className="space-y-6 p-5 sm:p-6">

        {/* Brewer */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Brewer</label>
          <div className="flex gap-2">
            {(Object.entries(BREWERS) as [Brewer, typeof BREWERS[Brewer]][]).map(([key, val]) => (
              <button key={key} onClick={() => setBrewer(key)}
                className={`min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all ${
                  brewer === key
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                }`}>
                <span className="block font-semibold">{val.label}</span>
                <span className="block opacity-75">{val.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dose + unit */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-0">
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Coffee dose (g)</label>
            <div className="flex flex-wrap gap-2">
              {QUICK_DOSES.map((n) => (
                <button key={n} onClick={() => { setDose(n); setUseCustom(false) }}
                  className={`min-h-[44px] min-w-[48px] rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                    !useCustom && dose === n
                      ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                      : "border-surface-200 bg-white text-surface-700 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500"
                  }`}>
                  {n}g
                </button>
              ))}
              <input type="number" min="10" max="60" step="1" placeholder="Custom"
                value={useCustom ? customDose : ""}
                onChange={(e) => { setCustomDose(e.target.value); setUseCustom(true) }}
                className="min-h-[44px] w-24 rounded-lg border border-surface-200 bg-white px-3 py-2 text-sm text-surface-700 placeholder-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:focus:ring-brand-800" />
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
          <p className="text-sm text-surface-500 dark:text-surface-400">Enter your coffee dose to see the iced pour over recipe.</p>
        ) : (
          <>
            <p className="mb-4 text-sm font-semibold text-surface-700 dark:text-surface-200">
              {activeDose}g coffee / 1:{RATIO} ratio / 60-40 hot-ice split
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Coffee",     value: unit === "metric" ? `${activeDose} g` : `${round1(activeDose / 28.3495)} oz`, raw: `${activeDose}g coffee`, highlight: true },
                { label: "Hot water",  value: unit === "metric" ? `${round1(hotWater)} ml` : `${mlToOz(hotWater)} fl oz`,   raw: unit === "metric" ? `${round1(hotWater)}ml hot water` : `${mlToOz(hotWater)}fl oz hot water`, highlight: false },
                { label: "Ice",        value: unit === "metric" ? `${round1(iceG)} g` : `${round1(iceG / 28.3495)} oz`,     raw: unit === "metric" ? `${round1(iceG)}g ice` : `${round1(iceG / 28.3495)}oz ice`, highlight: false },
              ].map((item) => (
                <div key={item.label} className={`rounded-xl p-3 ${item.highlight ? "bg-brand-600 text-white" : "bg-white dark:bg-surface-800"}`}>
                  <p className={`text-xs font-medium mb-1 ${item.highlight ? "text-brand-100" : "text-surface-500 dark:text-surface-400"}`}>{item.label}</p>
                  <p className={`font-mono text-xl font-bold leading-none ${item.highlight ? "text-white" : "text-surface-800 dark:text-surface-100"}`}>{item.value}</p>
                  <div className="mt-2 flex justify-end"><CopyButton value={item.raw} /></div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              {[
                { time: "0:00", step: "Place glass on scale", detail: `Add ${unit === "metric" ? `${round1(iceG)}g` : `${round1(iceG / 28.3495)}oz`} of ice to your serving glass.` },
                { time: "0:00", step: "Set up brewer", detail: `Place ${BREWERS[brewer].label} on top of the ice-filled glass. Rinse filter with hot water.` },
                { time: "0:00", step: "Add coffee", detail: `Add ${activeDose}g of medium-fine ground coffee.` },
                { time: "0:00", step: "Bloom", detail: `Pour ${round1(activeDose * 2)}ml of hot water (94C). Wait 30 seconds.` },
                { time: "0:30", step: "Pour in stages", detail: `Pour remaining ${unit === "metric" ? `${round1(hotWater - activeDose * 2)}ml` : `${mlToOz(hotWater - activeDose * 2)}fl oz`} in 2 to 3 pours, allowing drawdown between each.` },
                { time: "~3:00", step: "Stir and serve", detail: "Remove brewer. Stir the diluted concentrate over the ice and serve immediately." },
              ].map((s, i) => (
                <div key={i} className="flex gap-3 rounded-lg bg-white px-3 py-2 dark:bg-surface-800">
                  <span className="w-14 shrink-0 font-mono text-xs font-semibold text-brand-600 dark:text-brand-400 pt-0.5">{s.time}</span>
                  <div>
                    <p className="text-sm font-semibold text-surface-700 dark:text-surface-200">{s.step}</p>
                    <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-surface-500 dark:text-surface-400">
              Use a medium-fine grind — the same as your regular V60 grind. Grind slightly finer than normal to compensate for the shorter effective steep time over ice.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
