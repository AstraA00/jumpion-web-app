import { asset } from '../lib/asset'
import { useProfileStats } from '../lib/useProgress'

export function ProfilePage() {
  const stats = useProfileStats()

  return (
    <div className="page profile-page">
      <p className="quote">{stats.quote}</p>

      <div className="profile-logo-wrap">
        <img
          className="profile-logo"
          src={asset('jumpion-logo.png')}
          alt="Jumpion"
          width={180}
          height={180}
        />
        <div className="profile-logo-title">Jumpion</div>
      </div>

      <div className="stats-stack">
        <div className="stat-card">
          Изучено элементов: {stats.studied}
        </div>
        <div className="stat-card">
          Дней подряд: {stats.streakCurrent}
          <br />
          Рекорд дней подряд: {stats.streakRecord}
        </div>
      </div>

      <div className="beta-note">
        <div className="beta-note__badge">Бета</div>
        <p>
          Приложение работает в бета-режиме. Могут быть ошибки и неточности.
          Если найдёте ошибку — напишите на почту:
        </p>
        <a className="beta-note__email" href="mailto:jumpionapp@gmail.com">
          jumpionapp@gmail.com
        </a>
      </div>
    </div>
  )
}
