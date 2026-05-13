"use client"

import { useState, useEffect, useRef, useCallback } from "react"

// Standard 4-pour V60 method: bloom + 3 equal pours
// Total brew time target: ~3:00 to 3:30

type Method = "fourstage" | "hoffmann" | "kasuya"

interface Stage {
  label: string
  durationSec: number
  instruction: string
}

// Parameterised by dose (g) — default 20g
function buildStages(method: Method, doseG: number): Stage[] {
  const water = doseG * 15   // 1:15 ratio
  const bloom = doseG * 2

  if (method === "hoffmann") {
    return [
      { label: "Bloom",   durationSec: 45,  instruction: `Pour ${Math.round(bloom)}ml. Swirl gently.` },
      { label: "Pour",    durationSec: 135, instruction: `Pour remaining ${Math.round(water - bloom)}ml in a slow, continuous pour.` },
      { label: "Drawdown", durationSec: 60,  instruction: "Let the coffee draw down completely." },
    ]
  }
  if (method === "kasuya") {
    const p1 = Math.round(water * 0.2)
    const p2 = Math.round(water * 0.2)
    const p3 = Math.round(water * 0.2)
    return [
      { label: "Pour 1",  durationSec: 45,  instruction: `Pour ${p1}ml — controls sweetness.` },
      { label: "Pour 2",  durationSec: 45,  instruction: `Pour ${p2}ml — controls acidity.` },
      { label: "Pour 3",  durationSec: 40,  instruction: `Pour ${p3}ml.` },
      { label: "Pour 4",  durationSec: 40,  instruction: `Pour ${p3}ml.` },
      { label: "Pour 5",  durationSec: 40,  instruction: `Pour ${p3}ml.` },
      { label: "Drawdown", durationSec: 45, instruction: "Let it draw down completely." },
    ]
  }
  // Four-stage
  const perPour = Math.round((water - bloom) / 3)
  return [
    { label: "Bloom",   durationSec: 35,  instruction: `Pour ${Math.round(bloom)}ml. Wait for bloom.` },
    { label: "Pour 1",  durationSec: 35,  instruction: `Pour ${perPour}ml to ${Math.round(bloom + perPour)}ml total.` },
    { label: "Pour 2",  durationSec: 35,  instruction: `Pour ${perPour}ml to ${Math.round(bloom + perPour * 2)}ml total.` },
    { label: "Pour 3",  durationSec: 35,  instruction: `Pour ${perPour}ml to ${Math.round(water)}ml total.` },
    { label: "Drawdown", durationSec: 50, instruction: "Let the bed draw down. Total time ~3:10." },
  ]
}

const METHODS: Record<Method, string> = {
  fourstage: "4-Stage",
  hoffmann:  "Hoffmann",
  kasuya:    "4:6 Method",
}

const DOSE_PRESETS = [15, 20, 25, 30]

function pad(n: number) { return n.toString().padStart(2, "0") }
function fmt(sec: number) { return `${Math.floor(sec / 60)}:${pad(sec % 60)}` }

export function PourOverTimer() {
  const [method, setMethod]         = useState<Method>("fourstage")
  const [doseG, setDoseG]           = useState(20)
  const [stageIdx, setStageIdx]     = useState(0)
  const [remaining, setRemaining]   = useState(0)
  const [running, setRunning]       = useState(false)
  const [started, setStarted]       = useState(false)
  const [done, setDone]             = useState(false)

  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const remainingRef = useRef(0)
  const stageIdxRef  = useRef(0)
  const stagesRef    = useRef<Stage[]>([])

  const stages = buildStages(method, doseG)
  stagesRef.current   = stages
  remainingRef.current = remaining
  stageIdxRef.current = stageIdx

  const clearTimer = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
  }, [])

  const tick = useCallback(() => {
    const cur  = remainingRef.current - 1
    const idx  = stageIdxRef.current
    const stgs = stagesRef.current
    if (cur <= 0) {
      if (idx + 1 < stgs.length) {
        const next = idx + 1
        setStageIdx(next)
        setRemaining(stgs[next].durationSec)
      } else {
        setDone(true)
        setRunning(false)
        clearTimer()
      }
    } else {
      setRemaining(cur)
    }
  }, [clearTimer])

  useEffect(() => {
    if (running) { intervalRef.current = setInterval(tick, 1000) } else { clearTimer() }
    return clearTimer
  }, [running, tick, clearTimer])

  function reset() {
    clearTimer()
    setRunning(false)
    setStarted(false)
    setDone(false)
    setStageIdx(0)
    setRemaining(0)
  }

  function handleMethodChange(m: Method) { setMethod(m); reset() }
  function handleDoseChange(d: number)   { setDoseG(d);  reset() }

  function start() {
    const stgs = buildStages(method, doseG)
    setStageIdx(0)
    setRemaining(stgs[0].durationSec)
    setStarted(true)
    setDone(false)
    setRunning(true)
  }

  const currentStage = stages[stageIdx]
  const progress     = started && !done && currentStage
    ? ((currentStage.durationSec - remaining) / currentStage.durationSec) * 100
    : done ? 100 : 0

  const totalSec   = stages.reduce((a, s) => a + s.durationSec, 0)
  const elapsedSec = stages.slice(0, stageIdx).reduce((a, s) => a + s.durationSec, 0) +
    (currentStage ? currentStage.durationSec - remaining : 0)
  const overallPct = started ? Math.min(Math.round((elapsedSec / totalSec) * 100), 100) : 0

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">
      <div className="space-y-4 p-5 sm:p-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Pour method</label>
          <div className="flex gap-2">
            {(Object.entries(METHODS) as [Method, string][]).map(([key, label]) => (
              <button key={key} onClick={() => handleMethodChange(key)} disabled={running}
                className={`min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all disabled:opacity-60 ${
                  method === key
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
                }`}>{label}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Dose</label>
          <div className="flex gap-2">
            {DOSE_PRESETS.map((d) => (
              <button key={d} onClick={() => handleDoseChange(d)} disabled={running}
                className={`min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all disabled:opacity-60 ${
                  doseG === d
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-surface-200 bg-white text-surface-700 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200 dark:hover:border-brand-500"
                }`}>{d}g</button>
            ))}
          </div>
          <p className="mt-1.5 text-xs text-surface-400 dark:text-surface-500">{doseG}g coffee / {doseG * 15}ml water / 1:15</p>
        </div>
      </div>

      <div className={`border-t px-5 py-8 sm:px-6 text-center transition-colors duration-300 ${
        done ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
             : started ? "bg-brand-50 border-brand-200 dark:bg-green-950 dark:border-green-800"
             : "bg-surface-100 border-surface-200 dark:bg-surface-800 dark:border-surface-700"
      }`}>
        <p className="text-sm font-semibold uppercase tracking-wider mb-3 text-brand-600 dark:text-brand-400">
          {done ? "Brew complete" : started ? currentStage?.label : "Ready"}
        </p>

        <span className="font-mono text-7xl font-bold tabular-nums leading-none text-brand-600 dark:text-brand-400">
          {done ? "0:00" : started ? fmt(remaining) : fmt(stages[0]?.durationSec ?? 0)}
        </span>

        <div className="mx-auto mt-5 max-w-xs">
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-200 dark:bg-surface-700">
            <div className="h-full rounded-full bg-brand-500 transition-all duration-1000" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {started && !done && currentStage && (
          <div className="mt-4 mx-auto max-w-sm rounded-lg bg-white px-4 py-3 dark:bg-surface-800">
            <p className="text-sm text-surface-700 dark:text-surface-200">{currentStage.instruction}</p>
          </div>
        )}
        {done && <p className="mt-4 text-sm font-semibold text-green-700 dark:text-green-300">Pour over complete — enjoy!</p>}

        <div className="mt-6 flex justify-center gap-3">
          {!started && !done && (
            <button onClick={start}
              className="min-h-[44px] rounded-xl bg-brand-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 active:scale-95 transition-all">
              Start
            </button>
          )}
          {started && !done && running && (
            <button onClick={() => setRunning(false)}
              className="min-h-[44px] rounded-xl border border-surface-300 bg-white px-8 py-2.5 text-sm font-semibold text-surface-700 hover:bg-surface-100 active:scale-95 transition-all dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200">
              Pause
            </button>
          )}
          {started && !done && !running && (
            <button onClick={() => setRunning(true)}
              className="min-h-[44px] rounded-xl bg-brand-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 active:scale-95 transition-all">
              Resume
            </button>
          )}
          {(started || done) && (
            <button onClick={reset}
              className="min-h-[44px] rounded-xl border border-surface-300 bg-white px-6 py-2.5 text-sm font-medium text-surface-600 hover:bg-surface-100 active:scale-95 transition-all dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300">
              Reset
            </button>
          )}
        </div>

        {started && (
          <div className="mt-5 mx-auto max-w-sm">
            <div className="mb-1 flex justify-between text-xs text-surface-400 dark:text-surface-500">
              <span>Overall</span><span>{overallPct}% — {fmt(totalSec - elapsedSec)}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-200 dark:bg-surface-700">
              <div className="h-full rounded-full bg-green-500 transition-all duration-1000" style={{ width: `${overallPct}%` }} />
            </div>
            <div className="mt-2 flex justify-between">
              {stages.map((s, i) => (
                <span key={i} className={`text-[10px] font-medium ${
                  i < stageIdx ? "text-green-600 dark:text-green-400"
                  : i === stageIdx ? "text-brand-600 dark:text-brand-400"
                  : "text-surface-300 dark:text-surface-600"
                }`}>{s.label}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
