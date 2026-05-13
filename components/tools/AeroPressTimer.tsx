"use client"

import { useState, useEffect, useRef, useCallback } from "react"

type Method = "standard" | "inverted" | "hoffmann"

interface Stage {
  label: string
  durationSec: number
  instruction: string
  actionNeeded: string   // what user does NOW at this stage
}

const METHOD_STAGES: Record<Method, { label: string; stages: Stage[] }> = {
  standard: {
    label: "Standard",
    stages: [
      { label: "Bloom",   durationSec: 30,  actionNeeded: "Pour 34ml water over 17g coffee. Stir gently.", instruction: "Letting bloom release CO2" },
      { label: "Fill",    durationSec: 5,   actionNeeded: "Pour remaining water to 240ml. Stir once.",       instruction: "Filling the chamber" },
      { label: "Steep",   durationSec: 55,  actionNeeded: "Insert plunger slightly to create seal.",          instruction: "Steeping — do not press yet" },
      { label: "Press",   durationSec: 30,  actionNeeded: "Press slowly and steadily. Stop at hiss.",         instruction: "Pressing — keep steady pressure" },
    ],
  },
  inverted: {
    label: "Inverted",
    stages: [
      { label: "Bloom",   durationSec: 30,  actionNeeded: "Pour 36ml water over 18g coffee. Stir to saturate.", instruction: "Blooming inverted" },
      { label: "Fill",    durationSec: 5,   actionNeeded: "Pour remaining water to 250ml. Place filter cap.",    instruction: "Filling and capping" },
      { label: "Steep",   durationSec: 85,  actionNeeded: "Let steep undisturbed.",                               instruction: "Steeping — keep inverted" },
      { label: "Flip",    durationSec: 5,   actionNeeded: "Flip onto your cup carefully.",                        instruction: "Flipping — steady hands" },
      { label: "Press",   durationSec: 30,  actionNeeded: "Press slowly over 30 seconds. Stop at hiss.",         instruction: "Pressing" },
    ],
  },
  hoffmann: {
    label: "J. Hoffmann",
    stages: [
      { label: "Fill",    durationSec: 10,  actionNeeded: "Pour all 200ml boiling water over 11g coffee. Do not stir. Cap immediately.", instruction: "Filling — no stir" },
      { label: "Wait",    durationSec: 110, actionNeeded: "Set it down. Do not touch.",                           instruction: "Waiting — hands off" },
      { label: "Rest",    durationSec: 30,  actionNeeded: "Flip onto cup. Let it rest before pressing.",          instruction: "Resting after flip" },
      { label: "Press",   durationSec: 30,  actionNeeded: "Press very slowly. Stop the moment you hear hissing.", instruction: "Pressing — very gentle" },
    ],
  },
}

function pad(n: number) { return n.toString().padStart(2, "0") }
function fmt(sec: number) { return `${Math.floor(sec / 60)}:${pad(sec % 60)}` }

export function AeroPressTimer() {
  const [method, setMethod]         = useState<Method>("standard")
  const [stageIdx, setStageIdx]     = useState(0)
  const [remaining, setRemaining]   = useState(0)
  const [running, setRunning]       = useState(false)
  const [started, setStarted]       = useState(false)
  const [done, setDone]             = useState(false)

  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const remainingRef = useRef(0)
  const stageIdxRef  = useRef(0)
  const methodRef    = useRef<Method>("standard")

  methodRef.current   = method
  stageIdxRef.current = stageIdx
  remainingRef.current = remaining

  const stages = METHOD_STAGES[method].stages

  const clearTimer = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
  }, [])

  const tick = useCallback(() => {
    const cur    = remainingRef.current - 1
    const idx    = stageIdxRef.current
    const stgs   = METHOD_STAGES[methodRef.current].stages
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

  function start() {
    const s = METHOD_STAGES[method].stages
    setStageIdx(0)
    setRemaining(s[0].durationSec)
    setStarted(true)
    setDone(false)
    setRunning(true)
  }

  function pause() { setRunning(false) }
  function resume() { setRunning(true) }

  function reset() {
    clearTimer()
    setRunning(false)
    setStarted(false)
    setDone(false)
    setStageIdx(0)
    setRemaining(0)
  }

  function handleMethod(m: Method) {
    setMethod(m)
    reset()
  }

  const currentStage  = stages[stageIdx]
  const progress      = started && !done && currentStage
    ? ((currentStage.durationSec - remaining) / currentStage.durationSec) * 100
    : done ? 100 : 0

  const totalSec    = stages.reduce((a, s) => a + s.durationSec, 0)
  const elapsedSec  = stages.slice(0, stageIdx).reduce((a, s) => a + s.durationSec, 0) +
    (currentStage ? currentStage.durationSec - remaining : 0)
  const overallPct  = started ? Math.round((elapsedSec / totalSec) * 100) : 0

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">

      {/* ── Method ── */}
      <div className="p-5 sm:p-6">
        <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Method</label>
        <div className="flex gap-2">
          {(Object.entries(METHOD_STAGES) as [Method, typeof METHOD_STAGES[Method]][]).map(([key, val]) => (
            <button key={key} onClick={() => handleMethod(key)} disabled={running}
              className={`min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all disabled:opacity-60 ${
                method === key
                  ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                  : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
              }`}>{val.label}</button>
          ))}
        </div>
      </div>

      {/* ── Timer display ── */}
      <div className={`border-t px-5 py-8 sm:px-6 transition-colors duration-300 ${
        done ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
             : started ? "bg-brand-50 dark:bg-green-950 border-brand-200 dark:border-green-800"
             : "bg-surface-100 dark:bg-surface-800 border-surface-200 dark:border-surface-700"
      }`}>

        {/* Stage label */}
        <p className="text-center text-sm font-semibold uppercase tracking-wider mb-3 text-brand-600 dark:text-brand-400">
          {done ? "Done!" : started ? currentStage?.label : "Ready"}
        </p>

        {/* Countdown */}
        <div className="text-center">
          <span className="font-mono text-7xl font-bold tabular-nums leading-none text-brand-600 dark:text-brand-400">
            {done ? "0:00" : started ? fmt(remaining) : fmt(stages[0]?.durationSec ?? 0)}
          </span>
        </div>

        {/* Stage progress bar */}
        <div className="mx-auto mt-5 max-w-sm">
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-200 dark:bg-surface-700">
            <div className="h-full rounded-full bg-brand-500 transition-all duration-1000"
              style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Instruction */}
        {started && !done && currentStage && (
          <div className="mt-5 mx-auto max-w-sm rounded-lg bg-white px-4 py-3 dark:bg-surface-800">
            <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 mb-1">{currentStage.instruction}</p>
            <p className="text-sm text-surface-700 dark:text-surface-200">{currentStage.actionNeeded}</p>
          </div>
        )}

        {done && (
          <p className="mt-5 text-center text-sm font-semibold text-green-700 dark:text-green-300">
            Your AeroPress coffee is ready. Enjoy!
          </p>
        )}

        {/* Controls */}
        <div className="mt-6 flex justify-center gap-3">
          {!started && !done && (
            <button onClick={start}
              className="min-h-[44px] rounded-xl bg-brand-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 active:scale-95 transition-all">
              Start
            </button>
          )}
          {started && !done && running && (
            <button onClick={pause}
              className="min-h-[44px] rounded-xl border border-surface-300 bg-white px-8 py-2.5 text-sm font-semibold text-surface-700 shadow-sm hover:bg-surface-100 active:scale-95 transition-all dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200">
              Pause
            </button>
          )}
          {started && !done && !running && (
            <button onClick={resume}
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

        {/* Overall progress */}
        {started && (
          <div className="mt-5 mx-auto max-w-sm">
            <div className="mb-1 flex justify-between text-xs text-surface-400 dark:text-surface-500">
              <span>Overall progress</span>
              <span>{overallPct}% — {fmt(totalSec - elapsedSec)} remaining</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-200 dark:bg-surface-700">
              <div className="h-full rounded-full bg-green-500 transition-all duration-1000"
                style={{ width: `${overallPct}%` }} />
            </div>
            {/* Stage dots */}
            <div className="mt-2 flex justify-between">
              {stages.map((s, i) => (
                <span key={i} className={`text-[10px] font-medium ${
                  i < stageIdx ? "text-green-600 dark:text-green-400"
                  : i === stageIdx && started ? "text-brand-600 dark:text-brand-400"
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
