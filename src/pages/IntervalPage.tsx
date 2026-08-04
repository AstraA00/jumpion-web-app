import { useEffect, useRef, useState } from 'react'
import { BackLink } from '../components/BackLink'
import { playBeep, playTick, unlockAudio } from '../lib/audio'
import { formatMmSs, pad2 } from '../lib/formatTime'
import { recordActivity } from '../lib/streak'

const PREF_KEY = 'jumpion-interval-settings'
const PREPARE_SECS = 5

type Settings = {
  sets: number
  workSecs: number
  restSecs: number
}

type Phase = 'prepare' | 'work' | 'rest' | 'done'

type RunState = {
  phase: Phase
  setIndex: number
  remaining: number
  paused: boolean
}

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(PREF_KEY)
    if (!raw) return { sets: 5, workSecs: 30, restSecs: 30 }
    const parsed = JSON.parse(raw) as Settings
    return {
      sets: parsed.sets || 5,
      workSecs: parsed.workSecs || 30,
      restSecs: parsed.restSecs || 30,
    }
  } catch {
    return { sets: 5, workSecs: 30, restSecs: 30 }
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

export function IntervalPage() {
  const [settings, setSettings] = useState(loadSettings)
  const [run, setRun] = useState<RunState | null>(null)
  const runRef = useRef(run)
  runRef.current = run
  const lastTickSec = useRef<number | null>(null)

  useEffect(() => {
    localStorage.setItem(PREF_KEY, JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    if (!run || run.paused || run.phase === 'done') return

    const id = window.setInterval(() => {
      const current = runRef.current
      if (!current || current.paused || current.phase === 'done') return

      const nextRemaining = current.remaining - 1

      if (nextRemaining <= 3 && nextRemaining >= 1) {
        if (lastTickSec.current !== nextRemaining) {
          playTick()
          lastTickSec.current = nextRemaining
        }
      }

      if (nextRemaining > 0) {
        setRun({ ...current, remaining: nextRemaining })
        return
      }

      lastTickSec.current = null

      if (current.phase === 'prepare') {
        playBeep(720, 0.3)
        setRun({
          phase: 'work',
          setIndex: 1,
          remaining: settings.workSecs,
          paused: false,
        })
        return
      }

      if (current.phase === 'work') {
        if (current.setIndex >= settings.sets) {
          playBeep(520, 0.5)
          setRun({ ...current, phase: 'done', remaining: 0 })
          return
        }
        playBeep(480, 0.25)
        setRun({
          phase: 'rest',
          setIndex: current.setIndex,
          remaining: settings.restSecs,
          paused: false,
        })
        return
      }

      if (current.phase === 'rest') {
        playBeep(720, 0.3)
        setRun({
          phase: 'work',
          setIndex: current.setIndex + 1,
          remaining: settings.workSecs,
          paused: false,
        })
      }
    }, 1000)

    return () => window.clearInterval(id)
  }, [run?.paused, run?.phase, settings.sets, settings.workSecs, settings.restSecs])

  function update(partial: Partial<Settings>) {
    setSettings((prev) => ({ ...prev, ...partial }))
  }

  async function start() {
    // Unlock Web Audio inside the tap — required on iOS Safari.
    await unlockAudio()
    recordActivity()
    lastTickSec.current = null
    setRun({
      phase: 'prepare',
      setIndex: 0,
      remaining: PREPARE_SECS,
      paused: false,
    })
  }

  function exit() {
    setRun(null)
  }

  if (run) {
    const phaseLabel =
      run.phase === 'prepare'
        ? 'Приготовьтесь'
        : run.phase === 'work'
          ? 'Прыгай!'
          : run.phase === 'rest'
            ? 'Отдых'
            : 'Готово!'

    const phaseClass =
      run.phase === 'prepare'
        ? 'phase-prepare'
        : run.phase === 'work'
          ? 'phase-work'
          : run.phase === 'rest'
            ? 'phase-rest'
            : 'phase-done'

    return (
      <div className={`page tool-page interval-run ${phaseClass}`}>
        <h1 className="page-title">{phaseLabel}</h1>
        {run.phase !== 'done' && run.phase !== 'prepare' ? (
          <p className="page-lead">
            Интервал {run.setIndex}/{settings.sets}
          </p>
        ) : null}
        <div className="interval-big">
          {run.phase === 'done'
            ? '✓'
            : `${pad2(Math.floor(run.remaining / 60))}:${pad2(run.remaining % 60)}`}
        </div>
        {run.paused ? <p className="page-lead">Пауза</p> : null}

        <div className="interval-actions">
          {run.phase !== 'done' ? (
            <button
              type="button"
              className="primary-btn"
              onClick={() => {
                void unlockAudio()
                setRun((r) => (r ? { ...r, paused: !r.paused } : r))
              }}
            >
              {run.paused ? 'Продолжить' : 'Пауза'}
            </button>
          ) : null}
          <button type="button" className="secondary-btn" onClick={exit}>
            Выход
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page tool-page">
      <BackLink to="/tools" />
      <h1 className="page-title">Интервальный таймер</h1>

      <div className="interval-setting">
        <span>Интервалы</span>
        <div className="metro-row">
          <button
            type="button"
            className="round-btn"
            onClick={() => update({ sets: clamp(settings.sets - 1, 1, 99) })}
          >
            −
          </button>
          <strong>{pad2(settings.sets)}</strong>
          <button
            type="button"
            className="round-btn"
            onClick={() => update({ sets: clamp(settings.sets + 1, 1, 99) })}
          >
            +
          </button>
        </div>
      </div>

      <div className="interval-setting">
        <span>Время работы</span>
        <div className="metro-row">
          <button
            type="button"
            className="round-btn"
            onClick={() =>
              update({ workSecs: clamp(settings.workSecs - 5, 5, 600) })
            }
          >
            −
          </button>
          <strong>{formatMmSs(settings.workSecs)}</strong>
          <button
            type="button"
            className="round-btn"
            onClick={() =>
              update({ workSecs: clamp(settings.workSecs + 5, 5, 600) })
            }
          >
            +
          </button>
        </div>
      </div>

      <div className="interval-setting">
        <span>Время отдыха</span>
        <div className="metro-row">
          <button
            type="button"
            className="round-btn"
            onClick={() =>
              update({ restSecs: clamp(settings.restSecs - 5, 5, 600) })
            }
          >
            −
          </button>
          <strong>{formatMmSs(settings.restSecs)}</strong>
          <button
            type="button"
            className="round-btn"
            onClick={() =>
              update({ restSecs: clamp(settings.restSecs + 5, 5, 600) })
            }
          >
            +
          </button>
        </div>
      </div>

      <button type="button" className="primary-btn" onClick={() => void start()}>
        Старт
      </button>
    </div>
  )
}
