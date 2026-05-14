"use client"

import { useState, useCallback } from "react"

type TasteId = "sour" | "balanced" | "bitter" | "weak"
type VerdictType = "good" | "warning" | "bad" | "info"

interface Diagnosis {
  verdict: string
  verdictType: VerdictType
  primary: string
  secondary: string
}

function getDiagnosis(dose: number, yieldG: number, time: number, taste: TasteId): Diagnosis {
  const timeZone =
    time < 20 ? "very_fast" :
    time < 25 ? "fast"      :
    time <= 35 ? "normal"   :
    time <= 45 ? "slow"     : "very_slow"

  const ratio = (yieldG / dose).toFixed(1)

  if (taste === "balanced") {
    if (timeZone === "normal") {
      return {
        verdict: "Dialled in",
        verdictType: "good",
        primary: "Your espresso is dialled in. No adjustment needed.",
        secondary: `Ratio 1:${ratio} at ${time}s falls in the target window. Save this recipe.`,
      }
    }
    if (timeZone === "fast" || timeZone === "very_fast") {
      return {
        verdict: "Shot slightly fast",
        verdictType: "warning",
        primary: "Grind 1 notch finer to slow the shot toward the 25-35s range.",
        secondary: "Your taste is balanced now, but a slightly longer shot will add more body and sweetness.",
      }
    }
    return {
      verdict: "Shot slightly slow",
      verdictType: "warning",
      primary: "Grind 1 notch coarser to speed the shot toward the 25-35s range.",
      secondary: "Your taste is balanced now, but a faster shot in the target window will improve clarity.",
    }
  }

  if (taste === "sour") {
    if (timeZone === "very_fast") {
      return {
        verdict: "Under-extracted",
        verdictType: "bad",
        primary: "Grind 2-3 notches finer. Your shot is running far too fast for proper extraction.",
        secondary: "Do not change dose or yield yet. Fix shot time first, then taste again.",
      }
    }
    if (timeZone === "fast") {
      return {
        verdict: "Under-extracted",
        verdictType: "bad",
        primary: "Grind 1-2 notches finer. Your shot is slightly fast.",
        secondary: "Once shot time reaches 25-35s, taste again before making further adjustments.",
      }
    }
    if (timeZone === "normal") {
      return {
        verdict: "Under-extracted (grind is correct)",
        verdictType: "bad",
        primary: `Increase yield by 5g — pull to ${yieldG + 5}g instead of ${yieldG}g. More liquid extends extraction and reduces sourness.`,
        secondary: "Alternatively, grind 1 notch finer and keep the same yield.",
      }
    }
    if (timeZone === "slow") {
      return {
        verdict: "Sour and slow — check puck prep",
        verdictType: "bad",
        primary: "Grind 1 notch coarser. Sour with a slow shot often means channeling — water bypassing the grounds unevenly.",
        secondary: "Check that your grounds are distributed evenly before tamping. An uneven puck causes channeling.",
      }
    }
    return {
      verdict: "Puck preparation issue",
      verdictType: "bad",
      primary: "Grind 2 notches coarser. A very slow shot with sour taste almost always means channeling or over-tamping.",
      secondary: "Level your grounds with a distribution tool or WDT before tamping. This is a puck prep problem, not a grind problem.",
    }
  }

  if (taste === "bitter") {
    if (timeZone === "very_fast") {
      return {
        verdict: "Bitter and fast — check water temperature",
        verdictType: "bad",
        primary: `Reduce yield by 3g — stop the shot at ${yieldG - 3}g. Bitter at under 20s may also be a water temperature issue.`,
        secondary: "Target water temperature is 90-96°C. If temperature is correct, try reducing yield first.",
      }
    }
    if (timeZone === "fast") {
      return {
        verdict: "Over-extracted",
        verdictType: "bad",
        primary: `Reduce yield by 4g — stop the shot at ${yieldG - 4}g.`,
        secondary: "You can also grind 1 notch finer to slow the shot, which may improve extraction balance.",
      }
    }
    if (timeZone === "normal") {
      return {
        verdict: "Over-extracted",
        verdictType: "bad",
        primary: `Reduce yield by 5g — stop the shot at ${yieldG - 5}g. You are extracting past the sweet spot.`,
        secondary: "If reducing yield does not help, try grinding 1 notch coarser to reduce the extraction rate slightly.",
      }
    }
    if (timeZone === "slow") {
      return {
        verdict: "Over-extracted (slow shot)",
        verdictType: "bad",
        primary: "Grind 1-2 notches coarser. Your shot is running too slow and over-extracting.",
        secondary: "Once shot time reaches 25-35s, taste again before adjusting yield or dose.",
      }
    }
    return {
      verdict: "Severely over-extracted",
      verdictType: "bad",
      primary: "Grind 2-3 notches coarser immediately. A shot over 45s will always taste harsh and bitter.",
      secondary: "Do not adjust dose or yield until shot time is in the 25-35s range.",
    }
  }

  // taste === "weak"
  const numRatio = yieldG / dose
  if (numRatio > 2.5) {
    return {
      verdict: "Over-diluted",
      verdictType: "info",
      primary: `Reduce yield to ${Math.round(dose * 2)}g (ratio 1:2). Your current 1:${ratio} is too high for espresso strength.`,
      secondary: "Stop the shot earlier. A high yield-to-dose ratio produces thin, watery espresso.",
    }
  }
  return {
    verdict: "Under-dosed or under-extracted",
    verdictType: "info",
    primary: `Increase dose by 1-2g (target: ${dose + 1}-${dose + 2}g). More coffee in the basket adds body and intensity.`,
    secondary: `Alternatively, reduce yield by 5g (target: ${Math.max(yieldG - 5, dose)}g) to increase concentration without changing dose.`,
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
      {copied ? "Copied" : "Copy adjustment"}
    </button>
  )
}

function NumberStepper({
  label,
  unit,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  unit: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  const dec = () => onChange(Math.max(min, parseFloat((value - step).toFixed(1))))
  const inc = () => onChange(Math.min(max, parseFloat((value + step).toFixed(1))))

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          onClick={dec}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-surface-200 bg-white text-lg font-bold text-surface-600 transition-colors hover:bg-surface-100 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700"
          aria-label={`Decrease ${label}`}
        >
          -
        </button>
        <div className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-surface-200 bg-white px-4 py-2.5 dark:border-surface-600 dark:bg-surface-800">
          <span className="font-mono text-xl font-bold text-brand-600 dark:text-brand-400">{value}</span>
          <span className="text-sm text-surface-400 dark:text-surface-500">{unit}</span>
        </div>
        <button
          onClick={inc}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-surface-200 bg-white text-lg font-bold text-surface-600 transition-colors hover:bg-surface-100 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  )
}

const TASTE_OPTIONS: { id: TasteId; label: string }[] = [
  { id: "sour",     label: "Sour / Sharp"   },
  { id: "balanced", label: "Balanced"        },
  { id: "bitter",   label: "Bitter / Harsh"  },
  { id: "weak",     label: "Weak / Thin"     },
]

const VERDICT_BORDER: Record<VerdictType, string> = {
  good:    "border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950",
  warning: "border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950",
  bad:     "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950",
  info:    "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950",
}

const VERDICT_TEXT: Record<VerdictType, string> = {
  good:    "text-emerald-700 dark:text-emerald-400",
  warning: "text-amber-700 dark:text-amber-400",
  bad:     "text-red-700 dark:text-red-400",
  info:    "text-blue-700 dark:text-blue-400",
}

export function EspressoDialIn() {
  const [dose,   setDose]   = useState(18)
  const [yieldG, setYieldG] = useState(36)
  const [time,   setTime]   = useState(28)
  const [taste,  setTaste]  = useState<TasteId>("bitter")

  const diag  = getDiagnosis(dose, yieldG, time, taste)
  const ratio = (yieldG / dose).toFixed(1)

  const timeLabel =
    time < 20 ? "Very fast" :
    time < 25 ? "Fast"      :
    time <= 35 ? "On target":
    time <= 45 ? "Slow"     : "Very slow"

  const timeColor =
    time >= 25 && time <= 35
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-amber-600 dark:text-amber-400"

  const copyText = [
    `Espresso dial-in: ${dose}g dose / ${yieldG}g yield / ${time}s / taste: ${taste}`,
    `Current ratio: 1:${ratio}`,
    `Verdict: ${diag.verdict}`,
    `Adjustment: ${diag.primary}`,
    `Note: ${diag.secondary}`,
  ].join("\n")

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">
      <div className="space-y-5 p-5 sm:p-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">
            How does the shot taste?
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TASTE_OPTIONS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTaste(id)}
                className={`min-h-[44px] rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  taste === id
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-700 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <NumberStepper
          label="Dose"
          unit="g"
          value={dose}
          min={12}
          max={24}
          step={0.5}
          onChange={setDose}
        />

        <NumberStepper
          label="Yield (liquid in cup)"
          unit="g"
          value={yieldG}
          min={10}
          max={80}
          step={1}
          onChange={setYieldG}
        />

        <NumberStepper
          label="Shot time"
          unit="s"
          value={time}
          min={8}
          max={70}
          step={1}
          onChange={setTime}
        />
      </div>

      <div className="border-t border-surface-200 dark:border-surface-700 px-5 py-5 sm:px-6">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="rounded-xl border border-surface-100 bg-white dark:border-surface-700 dark:bg-surface-800 p-3 text-center">
            <p className="text-xs text-surface-400 dark:text-surface-500 mb-1">Ratio</p>
            <p className="text-xl font-bold font-mono text-brand-600 dark:text-brand-400">1:{ratio}</p>
          </div>
          <div className="rounded-xl border border-surface-100 bg-white dark:border-surface-700 dark:bg-surface-800 p-3 text-center">
            <p className="text-xs text-surface-400 dark:text-surface-500 mb-1">Shot time</p>
            <p className={`text-sm font-semibold mt-1 leading-tight ${timeColor}`}>{timeLabel}</p>
          </div>
          <div className="rounded-xl border border-surface-100 bg-white dark:border-surface-700 dark:bg-surface-800 p-3 text-center">
            <p className="text-xs text-surface-400 dark:text-surface-500 mb-1">Taste</p>
            <p className="text-sm font-semibold mt-1 text-surface-700 dark:text-surface-200 capitalize leading-tight">{taste}</p>
          </div>
        </div>

        <div className={`rounded-xl border p-4 ${VERDICT_BORDER[diag.verdictType]}`}>
          <p className={`text-xs font-bold uppercase tracking-wide mb-1.5 ${VERDICT_TEXT[diag.verdictType]}`}>
            {diag.verdict}
          </p>
          <p className="text-sm font-semibold text-surface-800 dark:text-surface-100 leading-relaxed mb-2">
            {diag.primary}
          </p>
          <p className="text-xs text-surface-600 dark:text-surface-400 leading-relaxed">
            {diag.secondary}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-xs text-surface-400 dark:text-surface-500">
            Target: 1:2 ratio / 25-35s shot time. Adjust one variable at a time.
          </p>
          <CopyButton value={copyText} />
        </div>
      </div>
    </div>
  )
}
