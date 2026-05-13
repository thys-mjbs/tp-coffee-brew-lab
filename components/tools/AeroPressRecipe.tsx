"use client"

import { useState, useCallback } from "react"

type Method = "standard" | "inverted" | "hoffmann" | "iced"

interface Step {
  time: string
  action: string
  detail: string
}

interface MethodConfig {
  label: string
  note: string
  defaultDose: number
  waterRatio: number
  bloomRatio: number
  iceRatio: number
  tempC: number
  grindNote: string
  buildSteps: (dose: number, waterMl: number, bloomMl: number, iceMl: number) => Step[]
}

const METHODS: Record<Method, MethodConfig> = {
  standard: {
    label: "Standard",
    note: "Classic method — easy, clean cup, good for any roast",
    defaultDose: 17,
    waterRatio: 240 / 17,
    bloomRatio: 2,
    iceRatio: 0,
    tempC: 94,
    grindNote: "Grind: medium-fine",
    buildSteps: (dose, waterMl, bloomMl) => [
      { time: "0:00", action: "Rinse and prep",    detail: "Rinse paper filter with hot water. Place AeroPress on cup with filter cap on." },
      { time: "0:00", action: "Add coffee",         detail: `Add ${dose}g of medium-fine ground coffee.` },
      { time: "0:00", action: "Bloom",              detail: `Pour ${bloomMl}ml (2x coffee weight) of water. Stir gently. Wait 30 seconds.` },
      { time: "0:30", action: "Fill",               detail: `Pour remaining water to ${waterMl}ml total. Stir once.` },
      { time: "1:00", action: "Insert plunger",     detail: "Insert plunger and press slowly over 30 seconds. Stop at hiss." },
      { time: "1:30", action: "Done",               detail: "Total brew time ~1:30. Dilute with hot water if desired." },
    ],
  },
  inverted: {
    label: "Inverted",
    note: "Inverted prevents drip-through — longer steep, richer body",
    defaultDose: 18,
    waterRatio: 250 / 18,
    bloomRatio: 2,
    iceRatio: 0,
    tempC: 96,
    grindNote: "Grind: medium-fine",
    buildSteps: (dose, waterMl, bloomMl) => [
      { time: "0:00", action: "Set up inverted",  detail: "Place AeroPress upside down with plunger inserted to the 4 mark." },
      { time: "0:00", action: "Add coffee",        detail: `Add ${dose}g of medium-fine ground coffee.` },
      { time: "0:00", action: "Bloom",             detail: `Pour ${bloomMl}ml water. Stir to saturate all grounds. Wait 30 seconds.` },
      { time: "0:30", action: "Fill",              detail: `Pour to ${waterMl}ml total. Stir 3 times. Place filter cap with rinsed filter.` },
      { time: "1:00", action: "Steep",             detail: "Let steep for 1 additional minute." },
      { time: "2:00", action: "Flip and press",    detail: "Flip onto your cup carefully. Press slowly over 30 seconds." },
      { time: "2:30", action: "Done",              detail: "Total brew time ~2:30. Stronger and fuller-bodied than standard method." },
    ],
  },
  hoffmann: {
    label: "James Hoffmann",
    note: "Hoffmann's ultimate AeroPress recipe — no stir, gentle press, boiling water",
    defaultDose: 11,
    waterRatio: 200 / 11,
    bloomRatio: 0,
    iceRatio: 0,
    tempC: 100,
    grindNote: "Grind: medium",
    buildSteps: (dose, waterMl) => [
      { time: "0:00", action: "Set up inverted",   detail: "AeroPress inverted, plunger at 4. Use boiling water (100C)." },
      { time: "0:00", action: "Add coffee",         detail: `Add ${dose}g of medium ground coffee.` },
      { time: "0:00", action: "Fill immediately",   detail: `Pour all ${waterMl}ml of boiling water. Do not stir.` },
      { time: "0:00", action: "Cap",               detail: "Attach filter cap with rinsed filter. Do not press yet." },
      { time: "2:00", action: "Flip",              detail: "At 2 minutes flip onto cup. Let rest for 30 seconds before pressing." },
      { time: "2:30", action: "Press gently",      detail: "Press very slowly over 30 seconds. Stop the moment you hear hissing." },
      { time: "3:00", action: "Done",              detail: "Total brew time ~3 minutes. Boiling water and no stir = uniform extraction." },
    ],
  },
  iced: {
    label: "Iced AeroPress",
    note: "Brew hot concentrate directly over ice — fast and full-flavoured",
    defaultDose: 20,
    waterRatio: 150 / 20,
    bloomRatio: 2,
    iceRatio: 150 / 20,
    tempC: 96,
    grindNote: "Grind: medium-fine",
    buildSteps: (dose, waterMl, bloomMl, iceMl) => [
      { time: "0:00", action: "Prep glass",       detail: `Fill a glass with ${iceMl}g of ice cubes.` },
      { time: "0:00", action: "Set up standard",  detail: "AeroPress in standard position on top of the ice-filled glass." },
      { time: "0:00", action: "Add coffee",       detail: `Add ${dose}g of medium-fine ground coffee.` },
      { time: "0:00", action: "Bloom",            detail: `Pour ${bloomMl}ml of water. Stir. Wait 30 seconds.` },
      { time: "0:30", action: "Fill",             detail: `Pour remaining water to ${waterMl}ml total concentrate.` },
      { time: "1:00", action: "Press",            detail: "Press firmly over 20 seconds directly onto the ice." },
      { time: "1:30", action: "Done",             detail: "The hot concentrate chills instantly over the ice. Stir and serve." },
    ],
  },
}

const DOSE_PRESETS = [11, 15, 17, 18, 20, 25]

function r1(n: number) { return Math.round(n * 10) / 10 }

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(() => {
    navigator.clipboard.writeText(value).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800) })
  }, [value])
  return (
    <button onClick={copy}
      className="min-h-[36px] rounded-lg border border-surface-200 bg-white px-3 py-1.5 text-xs font-medium text-surface-600 transition-all hover:bg-surface-100 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700">
      {copied ? "Copied!" : "Copy recipe"}
    </button>
  )
}

export function AeroPressRecipe() {
  const [method, setMethod]     = useState<Method>("hoffmann")
  const [dose, setDose]         = useState(11)
  const [useCustom, setUseCustom] = useState(false)
  const [customDose, setCustomDose] = useState("")

  const config     = METHODS[method]
  const activeDose = useCustom ? (parseFloat(customDose) || config.defaultDose) : dose
  const waterMl    = Math.round(activeDose * config.waterRatio)
  const bloomMl    = Math.round(activeDose * config.bloomRatio)
  const iceMl      = Math.round(activeDose * config.iceRatio)
  const steps      = config.buildSteps(activeDose, waterMl, bloomMl, iceMl)

  function handleMethodChange(m: Method) {
    setMethod(m)
    setDose(METHODS[m].defaultDose)
    setUseCustom(false)
    setCustomDose("")
  }

  const copyText = [
    `AeroPress ${config.label}: ${activeDose}g coffee / ${waterMl}ml water / ${config.tempC}C`,
    config.iceRatio > 0 ? `Ice: ${iceMl}g` : null,
    `Ratio: 1:${r1(waterMl / activeDose)}`,
    "",
    ...steps.map((s, i) => `${i + 1}. [${s.time}] ${s.action}: ${s.detail}`),
  ].filter(Boolean).join("\n")

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">

      <div className="space-y-4 p-5 sm:p-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Method</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(Object.entries(METHODS) as [Method, MethodConfig][]).map(([key, val]) => (
              <button key={key} onClick={() => handleMethodChange(key)}
                className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  method === key
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                }`}>
                {val.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-surface-500 dark:text-surface-400">{config.note}</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Coffee dose</label>
          <div className="flex flex-wrap gap-2">
            {DOSE_PRESETS.map((d) => (
              <button key={d} onClick={() => { setDose(d); setUseCustom(false) }}
                className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  !useCustom && dose === d
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-700 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500"
                }`}>{d}g</button>
            ))}
            <input type="number" min="5" max="40" step="1" placeholder="Custom"
              value={useCustom ? customDose : ""}
              onChange={(e) => { setCustomDose(e.target.value); setUseCustom(true) }}
              className="min-h-[44px] w-24 rounded-lg border border-surface-200 bg-white px-3 py-2 text-sm text-surface-700 placeholder-surface-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:focus:ring-brand-800" />
          </div>
          <p className="mt-1.5 text-xs text-surface-400 dark:text-surface-500">
            {activeDose}g coffee / {waterMl}ml water / 1:{r1(waterMl / activeDose)}
            {iceMl > 0 ? ` / ${iceMl}g ice` : ""}
          </p>
        </div>
      </div>

      <div className="border-t border-brand-200 bg-brand-50 px-5 py-5 sm:px-6 dark:border-green-800 dark:bg-green-950">
        <div className="mb-5 grid grid-cols-4 gap-3">
          {[
            { label: "Coffee",  value: `${activeDose}g`,                highlight: true },
            { label: "Water",   value: `${waterMl}ml`,                  highlight: false },
            { label: "Temp",    value: `${config.tempC}C`,              highlight: false },
            { label: "Ratio",   value: `1:${r1(waterMl / activeDose)}`, highlight: false },
          ].map((s, i) => (
            <div key={s.label} className={`rounded-xl p-3 ${i === 0 ? "bg-brand-600 text-white" : "bg-white dark:bg-surface-800"}`}>
              <p className={`text-xs font-medium mb-1 ${i === 0 ? "text-brand-100" : "text-surface-500 dark:text-surface-400"}`}>{s.label}</p>
              <p className={`font-mono text-lg font-bold leading-none ${i === 0 ? "text-white" : "text-surface-800 dark:text-surface-100"}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <p className="mb-3 text-sm font-semibold text-surface-700 dark:text-surface-200">Step-by-step</p>
        <div className="space-y-2">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-3 rounded-lg bg-white px-3 py-2.5 dark:bg-surface-800">
              <span className="w-12 shrink-0 font-mono text-xs font-semibold text-brand-600 dark:text-brand-400 pt-0.5">{step.time}</span>
              <div>
                <p className="text-sm font-semibold text-surface-700 dark:text-surface-200">{step.action}</p>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xs text-surface-500 dark:text-surface-400 flex-1">{config.grindNote}. Always rinse the paper filter before brewing.</p>
          <CopyButton value={copyText} />
        </div>
      </div>
    </div>
  )
}
