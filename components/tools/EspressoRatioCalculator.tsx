"use client"

import { useState, useCallback } from "react"

type Preset = "ristretto" | "espresso" | "lungo" | "custom"

const PRESETS: Record<Preset, { label: string; ratio: number; sub: string; note: string }> = {
  ristretto: { label: "Ristretto", ratio: 1,   sub: "1:1",   note: "Short, intense — stops at equal dose weight" },
  espresso:  { label: "Espresso",  ratio: 2,   sub: "1:2",   note: "Standard double shot target" },
  lungo:     { label: "Lungo",     ratio: 3,   sub: "1:3",   note: "Long shot — more bitter, higher caffeine extraction" },
  custom:    { label: "Custom",    ratio: 2.5, sub: "1:x",   note: "Enter your preferred ratio below" },
}

const QUICK_DOSES = [7, 9, 14, 18, 20, 22]

function round1(n: number) { return Math.round(n * 10) / 10 }

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

export function EspressoRatioCalculator() {
  const [preset, setPreset]         = useState<Preset>("espresso")
  const [dose, setDose]             = useState(18)
  const [useCustomDose, setUseCustomDose] = useState(false)
  const [customDose, setCustomDose] = useState("")
  const [customRatio, setCustomRatio] = useState("2.5")

  const activeDose  = useCustomDose ? (parseFloat(customDose) || 0) : dose
  const activeRatio = preset === "custom" ? (parseFloat(customRatio) || 2.5) : PRESETS[preset].ratio
  const yieldG      = activeDose * activeRatio
  const hasResult   = activeDose > 0

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">
      <div className="space-y-6 p-5 sm:p-6">

        {/* Preset */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Shot type</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(Object.entries(PRESETS) as [Preset, typeof PRESETS[Preset]][]).map(([key, val]) => (
              <button key={key} onClick={() => setPreset(key)}
                className={`min-h-[44px] rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all ${
                  preset === key
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                }`}>
                <span className="block font-semibold">{val.label}</span>
                <span className="block opacity-75">{val.sub}</span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-surface-500 dark:text-surface-400">{PRESETS[preset].note}</p>
        </div>

        {/* Dose + custom ratio */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-0">
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Dose (g)</label>
            <div className="flex flex-wrap gap-2">
              {QUICK_DOSES.map((n) => (
                <button key={n} onClick={() => { setDose(n); setUseCustomDose(false) }}
                  className={`min-h-[44px] min-w-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                    !useCustomDose && dose === n
                      ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                      : "border-surface-200 bg-white text-surface-700 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500"
                  }`}>{n}g</button>
              ))}
              <input type="number" min="5" max="40" step="0.5" placeholder="Custom g"
                value={useCustomDose ? customDose : ""}
                onChange={(e) => { setCustomDose(e.target.value); setUseCustomDose(true) }}
                className="min-h-[44px] w-24 rounded-lg border border-surface-200 bg-white px-3 py-2 text-sm text-surface-700 placeholder-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:focus:ring-brand-800" />
            </div>
          </div>
          {preset === "custom" && (
            <div className="shrink-0">
              <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Ratio (1:x)</label>
              <input type="number" min="0.5" max="6" step="0.1"
                value={customRatio}
                onChange={(e) => setCustomRatio(e.target.value)}
                className="min-h-[44px] w-20 rounded-lg border border-surface-200 bg-white px-3 py-2 text-sm text-surface-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:focus:ring-brand-800" />
            </div>
          )}
        </div>
      </div>

      {/* ── Result ── */}
      <div className={`border-t px-5 py-5 sm:px-6 transition-all duration-200 ${
        hasResult ? "border-brand-200 bg-brand-50 dark:border-green-800 dark:bg-green-950" : "border-surface-200 bg-surface-100 dark:border-surface-700 dark:bg-surface-800"
      }`}>
        {!hasResult ? (
          <p className="text-sm text-surface-500 dark:text-surface-400">Enter a dose to see your espresso yield target.</p>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Dose (in)",  value: `${activeDose} g`,        raw: `${activeDose}g dose`, highlight: true },
                { label: "Yield (out)", value: `${round1(yieldG)} g`,   raw: `${round1(yieldG)}g yield`, highlight: false },
                { label: "Ratio",      value: `1:${activeRatio}`,       raw: `1:${activeRatio} ratio`, highlight: false },
              ].map((item) => (
                <div key={item.label} className={`rounded-xl p-3 ${item.highlight ? "bg-brand-600 text-white" : "bg-white dark:bg-surface-800"}`}>
                  <p className={`text-xs font-medium mb-1 ${item.highlight ? "text-brand-100" : "text-surface-500 dark:text-surface-400"}`}>{item.label}</p>
                  <p className={`font-mono text-xl font-bold leading-none ${item.highlight ? "text-white" : "text-surface-800 dark:text-surface-100"}`}>{item.value}</p>
                  <div className="mt-2 flex justify-end"><CopyButton value={item.raw} /></div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-white px-3 py-2.5 dark:bg-surface-800 text-xs text-surface-500 dark:text-surface-400">
              <strong className="text-surface-700 dark:text-surface-200">Target shot time:</strong> 25 to 35 seconds for espresso and ristretto. Lungo runs 35 to 45 seconds. Weigh the yield in the cup, not the basket — crema is included in the target weight.
            </div>
            <p className="mt-3 text-xs text-surface-400 dark:text-surface-500">
              Yield is measured in grams on a scale under the portafilter. 1ml of espresso weighs approximately 1g, so grams and millilitres are interchangeable at this scale.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
