import { useEffect, useMemo, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import {
  compoundPool,
  getList,
  getSection,
  supportsCompound,
  type Trick,
} from '../data/tricks'
import { BackLink } from '../components/BackLink'
import { AutoVideo } from '../components/AutoVideo'
import { useStudied } from '../lib/useProgress'

function pickRandom(items: Trick[], count: number): Trick[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, Math.min(count, copy.length))
}

export function CompoundPage() {
  const { sectionId = '', listId = '' } = useParams()
  const section = getSection(sectionId)
  const list = getList(sectionId, listId)
  const allowed = supportsCompound(sectionId, listId)

  const pool = useMemo(
    () => compoundPool(sectionId, listId),
    [sectionId, listId],
  )
  const [combo, setCombo] = useState<Trick[]>([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setCombo(pickRandom(pool, 5))
    setIndex(0)
  }, [pool])

  const trick = combo[index] ?? null
  const [studied, setStudiedFlag] = useStudied(
    sectionId,
    listId,
    trick?.id ?? '',
  )

  if (!section || !list || !allowed || pool.length === 0) {
    return <Navigate to="/tricks" replace />
  }

  if (!trick) {
    return (
      <div className="page">
        <BackLink to={`/section/${sectionId}/${listId}`} />
        <h1 className="page-title">Связка</h1>
        <p className="page-lead">Готовим связку…</p>
      </div>
    )
  }

  const prev = index > 0 ? combo[index - 1] : null
  const next = index < combo.length - 1 ? combo[index + 1] : null

  function newCombo() {
    setCombo(pickRandom(pool, 5))
    setIndex(0)
  }

  return (
    <div className="page">
      <BackLink to={`/section/${sectionId}/${listId}`} />
      <h1 className="page-title">{trick.title}</h1>
      <p className="page-lead">
        Связка · {list.title} · {index + 1}/{combo.length}
      </p>

      <div className="video-frame">
        {trick.videoUrl ? (
          <AutoVideo className="video-player" src={trick.videoUrl} />
        ) : (
          <div className="video-placeholder">
            <div className="video-placeholder__icon">▶</div>
            <p>Видео появится после загрузки в облако</p>
          </div>
        )}
      </div>

      <div className="trick-nav">
        {prev ? (
          <button
            type="button"
            className="trick-nav-btn"
            onClick={() => setIndex((i) => i - 1)}
          >
            ← Назад
            <span className="trick-nav-btn__title">{prev.title}</span>
          </button>
        ) : (
          <span className="trick-nav-btn is-disabled">← Назад</span>
        )}
        {next ? (
          <button
            type="button"
            className="trick-nav-btn trick-nav-btn--next"
            onClick={() => setIndex((i) => i + 1)}
          >
            Вперёд →
            <span className="trick-nav-btn__title">{next.title}</span>
          </button>
        ) : (
          <span className="trick-nav-btn trick-nav-btn--next is-disabled">
            Вперёд →
          </span>
        )}
      </div>

      <label className={`studied-toggle${studied ? ' is-on' : ''}`}>
        <input
          type="checkbox"
          checked={studied}
          onChange={(e) => setStudiedFlag(e.target.checked)}
        />
        <span>{studied ? 'Изучено' : 'Отметить изученным'}</span>
      </label>

      <div className="compound-summary">
        <div className="compound-summary__title">Связка из {combo.length} элементов</div>
        <ol className="compound-list">
          {combo.map((item, i) => (
            <li key={`${item.id}-${i}`}>
              <button
                type="button"
                className={`compound-item compound-item--btn${i === index ? ' is-current' : ''}`}
                onClick={() => setIndex(i)}
              >
                <span className="compound-index">{i + 1}</span>
                <span>{item.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <button type="button" className="primary-btn" onClick={newCombo}>
        Новая связка
      </button>
    </div>
  )
}
