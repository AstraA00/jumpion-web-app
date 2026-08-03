import { useEffect, useRef, useState } from 'react'
import { BackLink } from '../components/BackLink'
import { getAudioContext, playClick } from '../lib/audio'
import { formatElapsed } from '../lib/formatTime'
import { recordActivity } from '../lib/streak'

const PREF_KEY = 'jumpion-metronome-tempo'
const PRESETS = [120, 180, 240, 300, 360, 400]
const MIN = 40
const MAX = 400

export function MetronomePage() {
  const [tempo, setTempo] = useState(() => {
    const raw = Number(localStorage.getItem(PREF_KEY) || 120)
    return Number.isFinite(raw) ? Math.min(MAX, Math.max(MIN, raw)) : 120
  })
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const timerRef = useRef<number | null>(null)
  const nextTickRef = useRef(0)
  const startedAt = useRef<number | null>(null)

  useEffect(() => {
    localStorage.setItem(PREF_KEY, String(tempo))
  }, [tempo])

  useEffect(() => {
    if (!running) {
      if (timerRef.current != null) window.clearInterval(timerRef.current)
      timerRef.current = null
      return
    }

    getAudioContext()
    const intervalMs = 60000 / tempo
    nextTickRef.current = performance.now()
    startedAt.current = Date.now()

    const tick = () => {
      const now = performance.now()
      while (now >= nextTickRef.current) {
        playClick()
        nextTickRef.current += intervalMs
      }
      if (startedAt.current != null) {
        setElapsed(Date.now() - startedAt.current)
      }
    }

    playClick()
    nextTickRef.current = performance.now() + intervalMs
    timerRef.current = window.setInterval(tick, 25)

    return () => {
      if (timerRef.current != null) window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [running, tempo])

  function changeTempo(next: number) {
    setTempo(Math.min(MAX, Math.max(MIN, Math.round(next))))
  }

  function toggle() {
    if (!running) {
      recordActivity()
      setElapsed(0)
    }
    setRunning((v) => !v)
  }

  return (
    <div className="page tool-page">
      <BackLink to="/tools" />
      <h1 className="page-title">Метроном</h1>
      <p className="tool-timer">{formatElapsed(elapsed)}</p>
      <div className="metro-tempo">{tempo}</div>
      <p className="page-lead">ударов в минуту</p>

      <div className="metro-presets">
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            className={`chip-btn${tempo === p ? ' is-active' : ''}`}
            onClick={() => changeTempo(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="metro-row">
        <button
          type="button"
          className="round-btn"
          onClick={() => changeTempo(tempo - 1)}
        >
          −
        </button>
        <input
          className="metro-slider"
          type="range"
          min={MIN}
          max={MAX}
          value={tempo}
          onChange={(e) => changeTempo(Number(e.target.value))}
        />
        <button
          type="button"
          className="round-btn"
          onClick={() => changeTempo(tempo + 1)}
        >
          +
        </button>
      </div>

      <button type="button" className="primary-btn" onClick={toggle}>
        {running ? 'Стоп' : 'Старт'}
      </button>
    </div>
  )
}
