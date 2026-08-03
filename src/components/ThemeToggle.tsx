import { useEffect, useState } from 'react'
import { getStoredTheme, toggleTheme, type Theme } from '../lib/theme'

export function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme())

  useEffect(() => {
    setThemeState(getStoredTheme())
  }, [])

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
      onClick={() => setThemeState(toggleTheme())}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
