"use client"

import { useState, useCallback } from "react"

type MethodId =
  | "espresso"
  | "pourover"
  | "aeropress"
  | "frenchpress"
  | "coldbrew"
  | "mokapot"
  | "drip"
  | "chemex"

type GrinderId =
  | "baratza_encore"
  | "baratza_virtuoso"
  | "breville_barista"
  | "breville_smart"
  | "comandante"
  | "timemore_c2"
  | "timemore_c3s"
  | "1zpresso_jx"
  | "1zpresso_jmax"

interface MethodInfo {
  label: string
  grind: string
  description: string
  targetTime: string
  waterTemp: string
}

interface GrinderInfo {
  label: string
  type: "electric" | "hand"
  settings: Partial<Record<MethodId, string>>
}

const METHODS: Record<MethodId, MethodInfo> = {
  espresso: {
    label: "Espresso",
    grind: "Fine",
    description: "Finely powdered, slightly coarser than flour. Should clump slightly when pinched but not feel completely smooth. Resistance is key: the puck must create 9 bars of pressure.",
    targetTime: "20 to 30 seconds",
    waterTemp: "88 to 96C",
  },
  pourover: {
    label: "Pour Over / V60",
    grind: "Medium-Fine",
    description: "Similar to table salt or slightly finer. Grinds should be uniform with no visible large chunks. If you pinch it, you feel individual particles but they do not flow freely.",
    targetTime: "3:00 to 3:30 total",
    waterTemp: "92 to 96C",
  },
  chemex: {
    label: "Chemex",
    grind: "Medium-Coarse",
    description: "Slightly coarser than pour over because the Chemex paper filter is thicker and restricts flow more. Closer to coarse sea salt. If you use a V60 grind in a Chemex, it often stalls.",
    targetTime: "4:00 to 5:00 total",
    waterTemp: "92 to 96C",
  },
  aeropress: {
    label: "AeroPress",
    grind: "Medium (adjustable)",
    description: "AeroPress is flexible: a medium grind works well for most recipes. Use finer for shorter steeps, coarser for longer steeps. The Hoffmann method uses a medium-coarse grind with a 2-minute wait.",
    targetTime: "1:30 to 3:00",
    waterTemp: "85 to 100C",
  },
  frenchpress: {
    label: "French Press",
    grind: "Coarse",
    description: "Coarse sea salt texture. Individual particles should be clearly visible and distinct. Too fine and the metal filter cannot catch them, producing a muddy, over-extracted cup.",
    targetTime: "4:00 steep",
    waterTemp: "93 to 96C",
  },
  coldbrew: {
    label: "Cold Brew",
    grind: "Extra Coarse",
    description: "The coarsest grind of any method. Slightly coarser than French press. The very long steep time (12 to 24 hours) compensates for the large particle size and cold water.",
    targetTime: "12 to 24 hours",
    waterTemp: "Cold / room temp",
  },
  mokapot: {
    label: "Moka Pot",
    grind: "Fine-Medium",
    description: "Finer than drip but not as fine as espresso. Should resemble fine beach sand. Espresso-fine grinds clog the filter and build excess pressure; too coarse produces weak, sour results.",
    targetTime: "4 to 5 minutes",
    waterTemp: "Pre-boiled water",
  },
  drip: {
    label: "Drip Machine",
    grind: "Medium",
    description: "Medium grind resembling regular sand. The standard for most drip machines. Pre-ground supermarket coffee is typically ground at this level. A 6-minute brew cycle is the target.",
    targetTime: "5 to 6 minutes",
    waterTemp: "90 to 96C (machine-controlled)",
  },
}

const GRINDERS: Record<GrinderId, GrinderInfo> = {
  baratza_encore: {
    label: "Baratza Encore",
    type: "electric",
    settings: {
      espresso: "Not recommended (not burr-precise enough)",
      mokapot: "5 to 10",
      pourover: "12 to 18",
      chemex: "18 to 24",
      aeropress: "10 to 20",
      drip: "20 to 28",
      frenchpress: "28 to 35",
      coldbrew: "35 to 40",
    },
  },
  baratza_virtuoso: {
    label: "Baratza Virtuoso+",
    type: "electric",
    settings: {
      espresso: "Not recommended",
      mokapot: "6 to 12",
      pourover: "14 to 20",
      chemex: "20 to 26",
      aeropress: "12 to 22",
      drip: "22 to 30",
      frenchpress: "30 to 36",
      coldbrew: "36 to 40",
    },
  },
  breville_barista: {
    label: "Breville Barista Express",
    type: "electric",
    settings: {
      espresso: "1 to 5 (inner) + 5 to 8 (outer)",
      mokapot: "6 to 8",
      pourover: "Not ideal (burrs are espresso-focused)",
      drip: "Not ideal",
      frenchpress: "Not ideal",
      aeropress: "6 to 10",
      coldbrew: "Not ideal",
      chemex: "Not ideal",
    },
  },
  breville_smart: {
    label: "Breville Smart Grinder Pro",
    type: "electric",
    settings: {
      espresso: "5 to 15 (portafilter mode)",
      mokapot: "12 to 20",
      pourover: "20 to 28",
      chemex: "26 to 32",
      aeropress: "18 to 28",
      drip: "25 to 32",
      frenchpress: "32 to 40",
      coldbrew: "40 to 50",
    },
  },
  comandante: {
    label: "Comandante C40",
    type: "hand",
    settings: {
      espresso: "8 to 15 clicks",
      mokapot: "12 to 18 clicks",
      pourover: "25 to 32 clicks",
      chemex: "32 to 38 clicks",
      aeropress: "20 to 30 clicks",
      drip: "28 to 35 clicks",
      frenchpress: "35 to 42 clicks",
      coldbrew: "40 to 50 clicks",
    },
  },
  timemore_c2: {
    label: "Timemore C2",
    type: "hand",
    settings: {
      espresso: "5 to 12 clicks",
      mokapot: "10 to 16 clicks",
      pourover: "18 to 24 clicks",
      chemex: "22 to 28 clicks",
      aeropress: "15 to 22 clicks",
      drip: "22 to 28 clicks",
      frenchpress: "28 to 34 clicks",
      coldbrew: "34 to 40 clicks",
    },
  },
  timemore_c3s: {
    label: "Timemore C3s Pro",
    type: "hand",
    settings: {
      espresso: "5 to 14 clicks",
      mokapot: "10 to 18 clicks",
      pourover: "20 to 26 clicks",
      chemex: "24 to 30 clicks",
      aeropress: "16 to 24 clicks",
      drip: "24 to 30 clicks",
      frenchpress: "30 to 36 clicks",
      coldbrew: "36 to 42 clicks",
    },
  },
  "1zpresso_jx": {
    label: "1Zpresso JX",
    type: "hand",
    settings: {
      espresso: "2.0 to 3.0 (rotation)",
      mokapot: "2.5 to 3.5",
      pourover: "4.0 to 5.0",
      chemex: "4.5 to 5.5",
      aeropress: "3.5 to 5.0",
      drip: "4.5 to 5.5",
      frenchpress: "5.0 to 6.0",
      coldbrew: "6.0 to 7.0",
    },
  },
  "1zpresso_jmax": {
    label: "1Zpresso J-Max",
    type: "hand",
    settings: {
      espresso: "3.0 to 5.5 (clicks)",
      mokapot: "5 to 8",
      pourover: "7 to 10",
      chemex: "9 to 12",
      aeropress: "6 to 10",
      drip: "9 to 12",
      frenchpress: "12 to 16",
      coldbrew: "16 to 20",
    },
  },
}

const METHOD_ORDER: MethodId[] = ["espresso", "mokapot", "pourover", "chemex", "aeropress", "drip", "frenchpress", "coldbrew"]
const GRINDER_ORDER: GrinderId[] = ["baratza_encore", "baratza_virtuoso", "breville_barista", "breville_smart", "comandante", "timemore_c2", "timemore_c3s", "1zpresso_jx", "1zpresso_jmax"]

const GRIND_COLOUR: Record<string, string> = {
  "Extra Coarse": "bg-stone-200 text-stone-800 dark:bg-stone-700 dark:text-stone-100",
  "Coarse":       "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
  "Medium-Coarse":"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  "Medium (adjustable)": "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-100",
  "Medium":       "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-100",
  "Fine-Medium":  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  "Medium-Fine":  "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100",
  "Fine":         "bg-brand-100 text-brand-800 dark:bg-brand-900 dark:text-brand-100",
}

type Tab = "method" | "grinder"

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(() => {
    navigator.clipboard.writeText(value).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800) })
  }, [value])
  return (
    <button onClick={copy}
      className="rounded px-2 py-1 text-xs text-surface-400 transition-colors hover:bg-surface-200 hover:text-surface-700 dark:hover:bg-surface-700 dark:hover:text-surface-200">
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

export function GrindSizeGuide() {
  const [tab, setTab]               = useState<Tab>("method")
  const [selectedMethod, setMethod] = useState<MethodId>("pourover")
  const [selectedGrinder, setGrinder] = useState<GrinderId>("baratza_encore")

  const method  = METHODS[selectedMethod]
  const grinder = GRINDERS[selectedGrinder]
  const grindColour = GRIND_COLOUR[method.grind] ?? "bg-surface-100 text-surface-700"

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">

      {/* Tab switcher */}
      <div className="border-b border-surface-200 dark:border-surface-700 p-4 sm:p-5">
        <div className="flex gap-2">
          {(["method", "grinder"] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                tab === t
                  ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                  : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
              }`}>
              {t === "method" ? "By brew method" : "By grinder model"}
            </button>
          ))}
        </div>
      </div>

      {tab === "method" ? (
        <div className="p-5 sm:p-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Brew method</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {METHOD_ORDER.map((id) => (
                <button key={id} onClick={() => setMethod(id)}
                  className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                    selectedMethod === id
                      ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                      : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                  }`}>{METHODS[id].label}</button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-surface-200 bg-white dark:border-surface-700 dark:bg-surface-800 overflow-hidden">
            <div className="px-4 py-3 border-b border-surface-100 dark:border-surface-700 flex items-center justify-between">
              <span className="font-semibold text-surface-800 dark:text-surface-100">{method.label}</span>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${grindColour}`}>{method.grind}</span>
            </div>
            <div className="px-4 py-4 space-y-3">
              <p className="text-sm text-surface-600 dark:text-surface-300 leading-relaxed">{method.description}</p>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="rounded-lg bg-surface-50 dark:bg-surface-900 px-3 py-2">
                  <p className="text-xs text-surface-400 dark:text-surface-500 mb-0.5">Target brew time</p>
                  <p className="text-sm font-medium text-surface-700 dark:text-surface-200">{method.targetTime}</p>
                </div>
                <div className="rounded-lg bg-surface-50 dark:bg-surface-900 px-3 py-2">
                  <p className="text-xs text-surface-400 dark:text-surface-500 mb-0.5">Water temperature</p>
                  <p className="text-sm font-medium text-surface-700 dark:text-surface-200">{method.waterTemp}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-surface-400 dark:text-surface-500 flex-1">
              Starting point. Adjust finer if sour or too fast; coarser if bitter or slow.
            </p>
            <CopyButton value={`${method.label}: ${method.grind} grind | Brew time: ${method.targetTime} | Temp: ${method.waterTemp}\n${method.description}`} />
          </div>
        </div>
      ) : (
        <div className="p-5 sm:p-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Grinder model</label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {GRINDER_ORDER.map((id) => {
                const g = GRINDERS[id]
                return (
                  <button key={id} onClick={() => setGrinder(id)}
                    className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all text-left ${
                      selectedGrinder === id
                        ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                        : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                    }`}>
                    <span className="block">{g.label}</span>
                    <span className={`text-[10px] font-normal ${selectedGrinder === id ? "opacity-80" : "text-surface-400 dark:text-surface-500"}`}>
                      {g.type === "electric" ? "Electric burr" : "Hand grinder"}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="rounded-xl border border-surface-200 bg-white dark:border-surface-700 dark:bg-surface-800 overflow-hidden">
            <div className="px-4 py-3 border-b border-surface-100 dark:border-surface-700">
              <span className="font-semibold text-surface-800 dark:text-surface-100">{grinder.label}</span>
              <span className="ml-2 text-xs text-surface-400 dark:text-surface-500">
                {grinder.type === "electric" ? "Electric burr grinder" : "Hand grinder"}
              </span>
            </div>
            <div className="divide-y divide-surface-100 dark:divide-surface-700">
              {METHOD_ORDER.map((mid) => {
                const setting = grinder.settings[mid]
                const m = METHODS[mid]
                return (
                  <div key={mid} className="flex items-center justify-between px-4 py-3">
                    <div>
                      <span className="text-sm font-medium text-surface-700 dark:text-surface-200">{m.label}</span>
                      <span className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${GRIND_COLOUR[m.grind] ?? "bg-surface-100 text-surface-600"}`}>{m.grind}</span>
                    </div>
                    <span className="text-sm font-mono text-brand-600 dark:text-brand-400 text-right max-w-[45%]">
                      {setting ?? "No data"}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-surface-400 dark:text-surface-500 flex-1">
              Starting points from community testing. Always dial in from these ranges.
            </p>
            <CopyButton value={`${grinder.label} grind settings:\n${METHOD_ORDER.map(mid => `${METHODS[mid].label}: ${grinder.settings[mid] ?? "No data"}`).join("\n")}`} />
          </div>
        </div>
      )}
    </div>
  )
}
