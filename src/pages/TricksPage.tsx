import { Link } from 'react-router-dom'
import { homeCards, sections } from '../data/tricks'
import { useSectionProgress } from '../lib/useProgress'
import { ProgressPill } from '../components/ProgressPill'

function SectionCard({
  id,
  title,
  to,
  accent,
}: {
  id: string
  title: string
  to: string
  accent: string
}) {
  const section = sections.find((s) => s.id === id)
  const lists =
    section?.lists.map((l) => ({
      id: l.id,
      trickIds: l.tricks.map((t) => t.id),
    })) ?? []
  const progress = useSectionProgress(id, lists)

  return (
    <Link className="catalog-card" to={to} style={{ ['--accent' as string]: accent }}>
      <div className="catalog-card__title">{title}</div>
      <ProgressPill studied={progress.studied} total={progress.total} />
    </Link>
  )
}

export function TricksPage() {
  return (
    <div className="page">
      <h1 className="page-title">Трюки</h1>
      <p className="page-lead">Выбери раздел и отмечай изученные элементы</p>
      <div className="catalog-grid">
        {homeCards.map((card) => (
          <SectionCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  )
}
