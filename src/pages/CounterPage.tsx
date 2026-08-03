import { useEffect, useRef, useState } from 'react'
import { BackLink } from '../components/BackLink'
import { formatElapsed } from '../lib/formatTime'
import { recordActivity } from '../lib/streak'

const PREF_KEY = 'jumpion-counter-value'

export function CounterPage() {
  const [count, setCount] = useState(() => {
    const raw = Number(localStorage.getItem(PREF_KEY) || 0)
    return Number.isFinite(raw) ? raw : 0
  })
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const startedAt = useRef<number | null>(null)
  const accumulated = useRef(0)

  useEffect(() => {
    localStorage.setItem(PREF_KEY, String(count))
  }, [count])

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      if (startedAt.current == null) return
      setElapsed(accumulated.current + (Date.now() - startedAt.current))
    }, 200)
    return () => window.clearInterval(id)
  }, [running])

  function bump() {
    if (!running) {
      startedAt.current = Date.now()
      setRunning(true)
      recordActivity()
    }
    setCount((c) => c + 1)
    if (navigator.vibrate) navigator.vibrate(30)
  }

  function reset() {
    setCount(0)
    setRunning(false)
    startedAt.current = null
    accumulated.current = 0
    setElapsed(0)
  }

  return (
    <div className="page tool-page">
      <BackLink to="/tools" />
      <h1 className="page-title">Счётчик</h1>
      <p className="tool-timer">{formatElapsed(elapsed)}</p>
      <div className="counter-value">{count}</div>
      <button type="button" className="counter-plus" onClick={bump}>
        {count === 0 && !running ? 'Старт' : '+'}
      </button>
      <button type="button" className="secondary-btn" onClick={reset}>
        Сброс
      </button>
    </div>
  )
}
