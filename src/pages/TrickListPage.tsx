import { Link, Navigate, useParams } from 'react-router-dom'
import { getList, getSection, supportsCompound } from '../data/tricks'
import { BackLink } from '../components/BackLink'
import { ProgressPill } from '../components/ProgressPill'
import { isStudied } from '../lib/progress'
import { useListProgress } from '../lib/useProgress'
import { useEffect, useState } from 'react'

export function TrickListPage() {
  const { sectionId = '', listId = '' } = useParams()
  const section = getSection(sectionId)
  const list = getList(sectionId, listId)
  const trickIds = list?.tricks.map((t) => t.id) ?? []
  const progress = useListProgress(sectionId, listId, trickIds)
  const [, tick] = useState(0)
  const showCompound = supportsCompound(sectionId, listId)

  useEffect(() => {
    const sync = () => tick((n) => n + 1)
    window.addEventListener('jumpion-progress', sync)
    return () => window.removeEventListener('jumpion-progress', sync)
  }, [])

  if (!section || !list) return <Navigate to="/tricks" replace />

  const backTo =
    section.lists.length === 1 ? '/tricks' : `/section/${section.id}`

  const groups = list.groups ?? [{ tricks: list.tricks }]

  return (
    <div className="page">
      <BackLink to={backTo} />
      <div className="page-heading">
        <h1 className="page-title">{list.title}</h1>
        <ProgressPill studied={progress.studied} total={progress.total} />
      </div>

      {showCompound ? (
        <Link
          className="compound-entry"
          to={`/section/${sectionId}/${listId}/compound`}
          style={{ ['--accent' as string]: section.accent }}
        >
          <span>Связка</span>
          <span className="compound-entry__hint">5 случайных элементов</span>
        </Link>
      ) : null}

      <div className="stack">
        {groups.map((group, groupIndex) => (
          <div key={group.header ?? `group-${groupIndex}`} className="trick-group">
            {group.header ? (
              <h2 className="trick-group__header">{group.header}</h2>
            ) : null}
            <div className="stack">
              {group.tricks.map((trick) => {
                const studied = isStudied(sectionId, listId, trick.id)
                return (
                  <Link
                    key={trick.id}
                    className={`trick-row${studied ? ' trick-row--studied' : ''}`}
                    to={`/section/${sectionId}/${listId}/${trick.id}`}
                  >
                    <span>{trick.title}</span>
                    {studied ? <span className="check">✓</span> : null}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
