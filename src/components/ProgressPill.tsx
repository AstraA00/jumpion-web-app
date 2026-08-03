type Props = {
  studied: number
  total: number
}

export function ProgressPill({ studied, total }: Props) {
  return (
    <span className="progress-pill">
      {studied}/{total}
    </span>
  )
}
