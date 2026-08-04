import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const METRIKA_ID = 111309690

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void
  }
}

/** Track SPA navigations as page views in Yandex Metrika. */
export function MetrikaHit() {
  const location = useLocation()

  useEffect(() => {
    window.ym?.(METRIKA_ID, 'hit', window.location.href)
  }, [location.pathname, location.search, location.hash])

  return null
}
