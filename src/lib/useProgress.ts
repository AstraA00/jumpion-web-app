import { useCallback, useEffect, useState } from 'react'
import {
  countStudiedInList,
  countStudiedInSection,
  countStudiedTotal,
  isStudied,
  setStudied,
} from './progress'
import { getStreak } from './streak'
import { getMotivationalQuote } from './quotes'

const EVENT = 'jumpion-progress'

function emit() {
  window.dispatchEvent(new Event(EVENT))
}

export function useStudied(
  sectionId: string,
  listId: string,
  trickId: string,
) {
  const [studied, setLocal] = useState(() =>
    isStudied(sectionId, listId, trickId),
  )

  useEffect(() => {
    const sync = () => setLocal(isStudied(sectionId, listId, trickId))
    sync()
    window.addEventListener(EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [sectionId, listId, trickId])

  const toggle = useCallback(
    (value: boolean) => {
      setStudied(sectionId, listId, trickId, value)
      setLocal(value)
      emit()
    },
    [sectionId, listId, trickId],
  )

  return [studied, toggle] as const
}

export function useListProgress(
  sectionId: string,
  listId: string,
  trickIds: string[],
) {
  const idsKey = trickIds.join('|')
  const [studied, setCount] = useState(() =>
    countStudiedInList(sectionId, listId, trickIds),
  )

  useEffect(() => {
    const ids = idsKey ? idsKey.split('|') : []
    const sync = () => setCount(countStudiedInList(sectionId, listId, ids))
    sync()
    window.addEventListener(EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [sectionId, listId, idsKey])

  return { studied, total: trickIds.length }
}

export function useSectionProgress(
  sectionId: string,
  lists: { id: string; trickIds: string[] }[],
) {
  const listsKey = lists
    .map((l) => `${l.id}:${l.trickIds.join(',')}`)
    .join(';')
  const [studied, setCount] = useState(() =>
    countStudiedInSection(sectionId, lists),
  )
  const total = lists.reduce((n, l) => n + l.trickIds.length, 0)

  useEffect(() => {
    const parsed = listsKey
      ? listsKey.split(';').map((chunk) => {
          const [id, ids = ''] = chunk.split(':')
          return { id, trickIds: ids ? ids.split(',') : [] }
        })
      : []
    const sync = () => setCount(countStudiedInSection(sectionId, parsed))
    sync()
    window.addEventListener(EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [sectionId, listsKey])

  return { studied, total }
}

export function useProfileStats() {
  const read = () => {
    const studied = countStudiedTotal()
    const streak = getStreak()
    return {
      studied,
      streakCurrent: streak.current,
      streakRecord: streak.record,
      quote: getMotivationalQuote(studied),
    }
  }

  const [stats, setStats] = useState(read)

  useEffect(() => {
    const sync = () => setStats(read())
    sync()
    window.addEventListener(EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  return stats
}
