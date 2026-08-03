import { Link, Navigate, useParams } from 'react-router-dom'
import { getList, getSection, getTrick } from '../data/tricks'
import { BackLink } from '../components/BackLink'
import { AutoVideo } from '../components/AutoVideo'
import { useStudied } from '../lib/useProgress'

export function TrickDetailPage() {
  const { sectionId = '', listId = '', trickId = '' } = useParams()
  const section = getSection(sectionId)
  const list = getList(sectionId, listId)
  const trick = getTrick(sectionId, listId, trickId)
  const [studied, setStudied] = useStudied(sectionId, listId, trickId)

  if (!section || !list || !trick) return <Navigate to="/tricks" replace />

  const index = list.tricks.findIndex((t) => t.id === trickId)
  const prev = index > 0 ? list.tricks[index - 1] : null
  const next =
    index >= 0 && index < list.tricks.length - 1 ? list.tricks[index + 1] : null
  const trickPath = (id: string) => `/section/${sectionId}/${listId}/${id}`

  return (
    <div className="page">
      <BackLink to={`/section/${sectionId}/${listId}`} />
      <h1 className="page-title">{trick.title}</h1>
      <p className="page-lead">
        {section.title} · {list.title}
        {index >= 0 ? ` · ${index + 1}/${list.tricks.length}` : null}
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
          <Link className="trick-nav-btn" to={trickPath(prev.id)}>
            ← Назад
            <span className="trick-nav-btn__title">{prev.title}</span>
          </Link>
        ) : (
          <span className="trick-nav-btn is-disabled">← Назад</span>
        )}
        {next ? (
          <Link className="trick-nav-btn trick-nav-btn--next" to={trickPath(next.id)}>
            Вперёд →
            <span className="trick-nav-btn__title">{next.title}</span>
          </Link>
        ) : (
          <span className="trick-nav-btn trick-nav-btn--next is-disabled">
            Вперёд →
          </span>
        )}
      </div>

      {trick.description ? (
        <div className="description">
          {trick.description.split('\n').map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : (
        <p className="description muted">Описание скоро будет добавлено.</p>
      )}

      <label className={`studied-toggle${studied ? ' is-on' : ''}`}>
        <input
          type="checkbox"
          checked={studied}
          onChange={(e) => setStudied(e.target.checked)}
        />
        <span>{studied ? 'Изучено' : 'Отметить изученным'}</span>
      </label>
    </div>
  )
}
