"use client"

import { useState, useEffect, useRef, useCallback } from "react"

const PRESETS = [
  { sec: 30,  label: "30 sec", note: "Minimum bloom — most brews" },
  { sec: 45,  label: "45 sec", note: "Recommended for fresh specialty beans" },
  { sec: 60,  label: "60 sec", note: "Extended bloom — very fresh or light roast" },
]

function pad(n: number) { return n.toString().padStart(2, "0") }
function fmt(sec: number) { return `${Math.floor(sec / 60)}:${pad(sec % 60)}` }

export function CoffeeBloomTimer() {
  const [targetSec, setTargetSec]   = useState(45)
  const [remaining, setRemaining]   = useState(45)
  const [running, setRunning]       = useState(false)
  const [done, setDone]             = useState(false)
  const intervalRef                 = useRef<ReturnType<typeof setInterval> | null>(null)
  const remainingRef                = useRef(45)

  remainingRef.current = remaining

  const clearTimer = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
  }, [])

  const tick = useCallback(() => {
    const cur = remainingRef.current - 1
    if (cur <= 0) {
      setRemaining(0)
      setDone(true)
      setRunning(false)
      clearTimer()
    } else {
      setRemaining(cur)
    }
  }, [clearTimer])

  useEffect(() => {
    if (running) { intervalRef.current = setInterval(tick, 1000) } else { clearTimer() }
    return clearTimer
  }, [running, tick, clearTimer])

  function handlePreset(sec: number) {
    setTargetSec(sec)
    setRemaining(sec)
    setRunning(false)
    setDone(false)
    clearTimer()
  }

  function start() { setRunning(true) }
  function pause() { setRunning(false) }
  function reset() {
    clearTimer()
    setRunning(false)
    setDone(false)
    setRemaining(targetSec)
  }

  const progress = ((targetSec - remaining) / targetSec) * 100

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900">
      <div className="p-5 sm:p-6">
        <label className="mb-2 block text-sm font-semibold text-surface-700 dark:text-surface-200">Bloom duration</label>
        <div className="flex gap-2">
          {PRESETS.map((p) => (
            <button key={p.sec} onClick={() => handlePreset(p.sec)} disabled={running}
              className={`min-h-[44px] flex-1 rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all disabled:opacity-60 ${
                targetSec === p.sec
                  ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                  : "border-surface-200 bg-white text-surface-600 hover:border-brand-400 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300 dark:hover:border-brand-500"
              }`}>
              <span className="block font-semibold">{p.label}</span>
              <span className="block opacity-75 text-[10px]">{p.note}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`border-t px-5 py-10 sm:px-6 text-center transition-colors duration-300 ${
        done ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
             : running ? "bg-brand-50 border-brand-200 dark:bg-green-950 dark:border-green-800"
             : "bg-surface-100 border-surface-200 dark:bg-surface-800 dark:border-surface-700"
      }`}>
        <p className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
          done ? "text-green-600 dark:text-green-400" : "text-brand-600 dark:text-brand-400"
        }`}>
          {done ? "Bloom complete — pour your water" : running ? "Blooming" : "Ready"}
        </p>

        <span className="font-mono text-8xl font-bold tabular-nums leading-none text-brand-600 dark:text-brand-400">
          {fmt(remaining)}
        </span>

        <div className="mx-auto mt-6 max-w-xs">
          <div className="h-3 w-full overflow-hidden rounded-full bg-surface-200 dark:bg-surface-700">
            <div className="h-full rounded-full bg-brand-500 transition-all duration-1000"
              style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          {!running && !done && (
            <button onClick={start}
              className="min-h-[44px] rounded-xl bg-brand-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 active:scale-95 transition-all">
              Start
            </button>
          )}
          {running && (
            <button onClick={pause}
              className="min-h-[44px] rounded-xl border border-surface-300 bg-white px-10 py-2.5 text-sm font-semibold text-surface-700 shadow-sm hover:bg-surface-100 active:scale-95 transition-all dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200">
              Pause
            </button>
          )}
          {(done || (!running && remaining < targetSec)) && (
            <button onClick={reset}
              className="min-h-[44px] rounded-xl border border-surface-300 bg-white px-6 py-2.5 text-sm font-medium text-surface-600 hover:bg-surface-100 active:scale-95 transition-all dark:border-surface-600 dark:bg-surface-800 dark:text-surface-300">
              Reset
            </button>
          )}
        </div>

        <p className="mt-5 text-xs text-surface-500 dark:text-surface-400 max-w-xs mx-auto">
          Pour {targetSec === 30 ? "2x" : "2 to 3x"} your coffee weight in water. Watch for bubbling — that is CO2 being released. When the timer ends, continue your pour.
        </p>
      </div>
    </div>
  )
}
