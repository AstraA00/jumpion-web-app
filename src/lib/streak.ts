const STORAGE_KEY = 'jumpion-streak'

type StreakData = {
  current: number
  record: number
  lastDate: string
}

function today(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function parseDate(value: string) {
  const [y, m, d] = value.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function isYesterday(lastDate: string, current: string) {
  if (!lastDate) return false
  const last = parseDate(lastDate)
  const now = parseDate(current)
  const diff = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
  return diff === 1
}

function read(): StreakData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { current: 0, record: 0, lastDate: '' }
    const parsed = JSON.parse(raw) as StreakData
    return {
      current: parsed.current ?? 0,
      record: parsed.record ?? 0,
      lastDate: parsed.lastDate ?? '',
    }
  } catch {
    return { current: 0, record: 0, lastDate: '' }
  }
}

function write(data: StreakData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function getStreak() {
  const data = read()
  const currentDay = today()
  if (!data.lastDate) {
    return { current: 0, record: data.record }
  }
  if (data.lastDate === currentDay || isYesterday(data.lastDate, currentDay)) {
    return { current: data.current, record: data.record }
  }
  if (data.current !== 0) {
    write({ ...data, current: 0 })
  }
  return { current: 0, record: data.record }
}

/** Idempotent for the same calendar day. */
export function recordActivity() {
  const data = read()
  const currentDay = today()
  if (data.lastDate === currentDay) return getStreak()

  const current = isYesterday(data.lastDate, currentDay) ? data.current + 1 : 1
  const record = Math.max(data.record, current)
  write({ current, record, lastDate: currentDay })
  window.dispatchEvent(new Event('jumpion-progress'))
  return { current, record }
}
