import { recordActivity } from './streak'

const STORAGE_KEY = 'jumpion-studied-tricks'

function readSet(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw) as string[]
    return new Set(parsed)
  } catch {
    return new Set()
  }
}

function writeSet(set: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]))
}

export function trickKey(sectionId: string, listId: string, trickId: string) {
  return `${sectionId}:${listId}:${trickId}`
}

export function isStudied(sectionId: string, listId: string, trickId: string) {
  return readSet().has(trickKey(sectionId, listId, trickId))
}

export function setStudied(
  sectionId: string,
  listId: string,
  trickId: string,
  studied: boolean,
) {
  const set = readSet()
  const key = trickKey(sectionId, listId, trickId)
  if (studied) {
    set.add(key)
    recordActivity()
  } else {
    set.delete(key)
  }
  writeSet(set)
}

export function countStudiedTotal() {
  return readSet().size
}

export function countStudiedInList(
  sectionId: string,
  listId: string,
  trickIds: string[],
) {
  const set = readSet()
  return trickIds.filter((id) => set.has(trickKey(sectionId, listId, id))).length
}

export function countStudiedInSection(
  sectionId: string,
  lists: { id: string; trickIds: string[] }[],
) {
  return lists.reduce(
    (sum, list) => sum + countStudiedInList(sectionId, list.id, list.trickIds),
    0,
  )
}
