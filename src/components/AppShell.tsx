import { NavLink, Outlet } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { asset } from '../lib/asset'

function NavIcon({ src, label }: { src: string; label: string }) {
  return (
    <span
      className="nav-icon-mask"
      style={{ ['--nav-icon' as string]: `url("${src}")` }}
      role="img"
      aria-label={label}
    />
  )
}

export function AppShell() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <img
            className="brand-logo"
            src={asset('jumpion-logo.png')}
            alt=""
            width={28}
            height={28}
          />
          <span>Jumpion</span>
        </div>
        <ThemeToggle />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <nav className="bottom-nav" aria-label="Основная навигация">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : undefined)}>
          <NavIcon src={asset('nav/user.png')} label="Профиль" />
          Профиль
        </NavLink>
        <NavLink
          to="/tricks"
          className={({ isActive }) => (isActive ? 'active' : undefined)}
        >
          <NavIcon src={asset('nav/rope.png')} label="Трюки" />
          Трюки
        </NavLink>
        <NavLink
          to="/tools"
          className={({ isActive }) => (isActive ? 'active' : undefined)}
        >
          <NavIcon src={asset('nav/timer.png')} label="Инструменты" />
          Инструменты
        </NavLink>
      </nav>
    </div>
  )
}
