import { useEffect, useRef, useState } from 'react'
import { BackLink } from '../components/BackLink'
import { signals } from '../data/signals'
import { recordActivity } from '../lib/streak'

export function SignalsPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  function ensureAudio() {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.addEventListener('ended', () => {
        setPlaying(false)
        setActiveId(null)
      })
      audioRef.current.addEventListener('pause', () => setPlaying(false))
      audioRef.current.addEventListener('play', () => setPlaying(true))
    }
    return audioRef.current
  }

  async function playSignal(id: string, src: string) {
    const audio = ensureAudio()
    if (activeId === id && !audio.paused) {
      audio.pause()
      return
    }
    if (activeId !== id) {
      audio.src = src
      setActiveId(id)
    }
    try {
      await audio.play()
      recordActivity()
    } catch {
      setPlaying(false)
    }
  }

  function stop() {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
    setPlaying(false)
    setActiveId(null)
  }

  return (
    <div className="page">
      <BackLink to="/tools" />
      <h1 className="page-title">Сигналы старта</h1>
      <p className="page-lead">Выбери сигнал и нажми play</p>

      <div className="stack">
        {signals.map((signal) => {
          const isActive = activeId === signal.id
          const isPlaying = isActive && playing
          return (
            <div key={signal.id} className="signal-row">
              <span className="signal-row__title">{signal.title}</span>
              <button
                type="button"
                className="chip-btn"
                onClick={() => playSignal(signal.id, signal.src)}
              >
                {isPlaying ? 'Пауза' : 'Play'}
              </button>
            </div>
          )
        })}
      </div>

      <button type="button" className="secondary-btn" onClick={stop}>
        Стоп
      </button>
    </div>
  )
}
