import { Link, Navigate, useParams } from 'react-router-dom'
import { getSection } from '../data/tricks'
import { BackLink } from '../components/BackLink'
import { ProgressPill } from '../components/ProgressPill'
import { useListProgress, useSectionProgress } from '../lib/useProgress'
import { useMemo } from 'react'

function ListRow({
  sectionId,
  listId,
  title,
  trickIds,
  accent,
}: {
  sectionId: string
  listId: string
  title: string
  trickIds: string[]
  accent: string
}) {
  const progress = useListProgress(sectionId, listId, trickIds)
  return (
    <Link
      className="list-row"
      to={`/section/${sectionId}/${listId}`}
      style={{ ['--accent' as string]: accent }}
    >
      <span>{title}</span>
      <ProgressPill studied={progress.studied} total={progress.total} />
    </Link>
  )
}

export function SectionPage() {
  const { sectionId = '' } = useParams()
  const section = getSection(sectionId)

  const listsMeta = useMemo(
    () =>
      section?.lists.map((l) => ({
        id: l.id,
        trickIds: l.tricks.map((t) => t.id),
      })) ?? [],
    [section],
  )
  const sectionProgress = useSectionProgress(sectionId, listsMeta)

  if (!section) return <Navigate to="/" replace />

  // Single-list sections go straight to the list
  if (section.lists.length === 1) {
    return <Navigate to={`/section/${section.id}/${section.lists[0].id}`} replace />
  }

  return (
    <div className="page">
      <BackLink to="/tricks" />
      <div className="page-heading">
        <h1 className="page-title">{section.title}</h1>
        <ProgressPill
          studied={sectionProgress.studied}
          total={sectionProgress.total}
        />
      </div>
      {section.subtitle ? <p className="page-lead">{section.subtitle}</p> : null}
      <div className="stack">
        {section.lists.map((list) => (
          <ListRow
            key={list.id}
            sectionId={section.id}
            listId={list.id}
            title={list.title}
            trickIds={list.tricks.map((t) => t.id)}
            accent={section.accent}
          />
        ))}
      </div>
    </div>
  )
}
