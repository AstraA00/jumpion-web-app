import { Link } from 'react-router-dom'

const tools = [
  {
    id: 'signals',
    title: 'Сигналы старта',
    to: '/tools/signals',
    accent: '#f59e0b',
  },
  {
    id: 'metronome',
    title: 'Метроном',
    to: '/tools/metronome',
    accent: '#3b82f6',
  },
  {
    id: 'counter',
    title: 'Счётчик',
    to: '/tools/counter',
    accent: '#8b5cf6',
  },
  {
    id: 'interval',
    title: 'Интервальный таймер',
    to: '/tools/interval',
    accent: '#10b981',
  },
] as const

export function ToolsPage() {
  return (
    <div className="page">
      <h1 className="page-title">Инструменты</h1>
      <p className="page-lead">Счётчик, метроном, сигналы и интервалы</p>
      <div className="catalog-grid">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            className="catalog-card catalog-card--title-only"
            to={tool.to}
            style={{ ['--accent' as string]: tool.accent }}
          >
            <div className="catalog-card__title">{tool.title}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
