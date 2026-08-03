import { Link } from 'react-router-dom'

type Props = {
  to: string
  label?: string
}

export function BackLink({ to, label = 'Назад' }: Props) {
  return (
    <Link className="back-link" to={to}>
      ← {label}
    </Link>
  )
}
