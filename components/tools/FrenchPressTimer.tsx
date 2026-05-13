"use client"

import { useState, useEffect, useRef, useCallback } from "react"

// ─── Types & constants ────────────────────────────────────────────────────────

type Phase = "idle" | "bloom" | "steep" | "done"
type SteepPreset = 180 | 240 | 270   // seconds

const STEEP_PRESETS: { sec: SteepPreset; label: string; note: string }[] = [
  { sec: 180, label: "3 min",   note: "Lighter extraction — good for finer grinds" },
  { sec: 240, label: "4 min",   note: "Standard — best starting point" },
  { sec: 270, label: "4.5 min", note: "Fuller body — coarser grind or darker roast" },
]

const BLOOM_SEC = 30

function pad(n: number) { return n.toString().padStart(2, "0") }
function fmt(sec: number) { return `${Math.floor(sec / 60)}:${pad(sec % 60)}` }

// ─── Main component ───────────────────────────────────────────────────────────

export function FrenchPressTimer() {
  const [steepSec, setSteepSec]       = useState<SteepPreset>(240)
  const [phase, setPhase]             = useState<Phase>("idle")
  const [remaining, setRemaining]     = useState(BLOOM_SEC)
  const [totalRemaining, setTotal]    = useState(BLOOM_SEC + 240)
  const [running, setRunning]         = useState(false)
  const intervalRef                   = useRef<ReturnType<typeof setInterval> | null>(null)
  const phaseRef                      = useRef<Phase>("idle")
  const remainingRef                  = useRef(BLOOM_SEC)

  phaseRef.current    = phase
  remainingRef.current = remaining

  const clearTimer = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
  }, [])

  const tick = useCallback(() => {
    const cur = remainingRef.current - 1
    const p   = phaseRef.current
    if (cur <= 0) {
      if (p === "bloom") {
        // Transition to steep
        setPhase("steep")
        setRemaining(steepSec)
        setTotal(steepSec)
      } else if (p === "steep") {
        setPhase("done")
        setRunning(false)
        clearTimer()
      }
    } else {
      setRemaining(cur)
      if (p === "steep") setTotal(cur)
    }
  }, [steepSec, clearTimer])

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, 1000)
    } else {
      clearTimer()
    }
    return clearTimer
  }, [running, tick, clearTimer])

  function start() {
    if (phase === "idle" || phase === "done") {
      setPhase("bloom")
      setRemaining(BLOOM_SEC)
      setTotal(steepSec + BLOOM_SEC)
    }
    setRunning(true)
  }

  function pause() { setRunning(false) }

  function reset() {
    setRunning(false)
    clearTimer()
    setPhase("idle")
    setRemaining(BLOOM_SEC)
    setTotal(BLOOM_SEC + steepSec)
  }

  function handlePreset(sec: SteepPreset) {
    setSteepSec(sec)
    reset()
    setTotal(BLOOM_SEC + sec)
  }

  const phaseMeta = {
    idle:  { label: "Ready",     color: "text-surface-500 dark:text-surface-400", bg: "bg-surface-100 dark:bg-surface-800",   instruction: "Select steep time and press Start" },
    bloom: { label: "Blooming",  color: "text-brand-600 dark:text-brand-400",     bg: "bg-brand-50 dark:bg-green-950",        instruction: "Pour 2x coffee weight in water. Wait for bloom to finish." },
    steep: { label: "Steeping",  color: "text-green-600 dark:text-green-400",     bg: "bg-green-50 dark:bg-green-950",        instruction: "All water added. Do not disturb. Let it steep." },
    done:  { label: "Press now", color: "text-brand-700 dark:text-brand-300",     bg: "bg-brand-50 dark:bg-green-950",        instruction: "Plunge slowly and steadily over 20-30 seconds. Serve immediately." },
  }[phase]

  const progress = phase === "bloom"
    ? ((BLOOM_SEC - remaining) / BLOOM_SEC) * 100
    : phase === "steep"
    ? ((steepSec - remaining) / steepSec) * 100
    : phase === "done" ? 100 : 0

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">

      {/* ── Preset selector ── */}
      <div className="p-5 sm:p-6">
        <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Steep time</label>
        <div className="flex gap-2">
          {STEEP_PRESETS.map((p) => (
            <button key={p.sec} onClick={() => handlePreset(p.sec)} disabled={running}
              className={`min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all disabled:opacity-60 ${
                steepSec === p.sec
                  ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                  : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
              }`}>
              <span className="block font-semibold">{p.label}</span>
              <span className="block opacity-75 text-[10px]">{p.note}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Timer display ── */}
      <div className={`border-t px-5 py-8 sm:px-6 transition-colors duration-500 ${phaseMeta.bg}`}>

        {/* Phase label */}
        <p className={`text-center text-sm font-semibold uppercase tracking-wider mb-3 ${phaseMeta.color}`}>
          {phaseMeta.label}
        </p>

        {/* Countdown */}
        <div className="text-center">
          <span className={`font-mono text-7xl font-bold tabular-nums leading-none ${phaseMeta.color}`}>
            {phase === "done" ? "0:00" : fmt(remaining)}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mx-auto mt-5 max-w-sm">
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-200 dark:bg-surface-700">
            <div className="h-full rounded-full bg-brand-500 transition-all duration-1000"
              style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-1 flex justify-between text-xs text-surface-400 dark:text-surface-500">
            <span>{phase === "bloom" ? "Bloom" : "Steep"}</span>
            <span>{phase === "bloom" ? fmt(BLOOM_SEC) : fmt(steepSec)}</span>
          </div>
        </div>

        {/* Instruction */}
        <p className="mt-5 text-center text-sm text-surface-600 dark:text-surface-300 max-w-sm mx-auto">
          {phaseMeta.instruction}
        </p>

        {/* Controls */}
        <div className="mt-6 flex justify-center gap-3">
          {phase !== "done" && !running && (
            <button onClick={start}
              className="min-h-[44px] rounded-xl bg-brand-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 active:scale-95 transition-all">
              {phase === "idle" ? "Start" : "Resume"}
            </button>
          )}
          {running && (
            <button onClick={pause}
              className="min-h-[44px] rounded-xl border border-surface-300 bg-white px-8 py-2.5 text-sm font-semibold text-surface-700 shadow-sm hover:bg-surface-100 active:scale-95 transition-all dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200">
              Pause
            </button>
          )}
          {phase !== "idle" && (
            <button onClick={reset}
              className="min-h-[44px] rounded-xl border border-surface-300 bg-white px-6 py-2.5 text-sm font-medium text-surface-600 hover:bg-surface-100 active:scale-95 transition-all dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300">
              Reset
            </button>
          )}
        </div>
      </div>

      {/* ── Step guide ── */}
      <div className="border-t border-surface-200 px-5 py-5 sm:px-6 dark:border-surface-700">
        <p className="mb-3 text-sm font-semibold text-surface-700 dark:text-surface-200">Step guide</p>
        <div className="space-y-2">
          {[
            { step: "Boil water", detail: "Let boiling water rest 30s to reach ~94C (200F)." },
            { step: "Add coffee",  detail: "Add coarsely ground coffee to the press." },
            { step: "Bloom (0:30)", detail: "Pour 2x coffee weight in water. Start timer." },
            { step: "Fill",        detail: "Pour remaining water immediately after bloom." },
            { step: `Steep (${fmt(steepSec)})`, detail: "Do not stir or press. Let the timer count down." },
            { step: "Plunge",      detail: "Press slowly over 20-30 seconds. Pour immediately." },
          ].map((s, i) => (
            <div key={i} className="flex gap-3 rounded-lg bg-white px-3 py-2 dark:bg-surface-800">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-700 dark:bg-brand-900 dark:text-brand-300">{i + 1}</span>
              <div>
                <p className="text-sm font-semibold text-surface-700 dark:text-surface-200">{s.step}</p>
                <p className="text-xs text-surface-500 dark:text-surface-400">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
