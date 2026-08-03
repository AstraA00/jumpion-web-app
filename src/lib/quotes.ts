const quotes: { max: number; text: string }[] = [
  { max: 0, text: 'Добро пожаловать!\nНачинай тренировки!' },
  { max: 20, text: 'Отличное начало!\nНе останавливайся!' },
  { max: 40, text: 'Продолжай в том же духе!' },
  { max: 60, text: 'Тебя не остановить!' },
  { max: 80, text: 'Сейчас самое время\nтренироваться!' },
  { max: 100, text: 'Побеждай себя\nкаждый день!' },
  { max: 110, text: 'Отличная работа!' },
  { max: 130, text: 'Или оправдание,\nили прогресс!' },
]

/** Motivational text by studied tricks count. */
export function getMotivationalQuote(totalProgress: number) {
  if (totalProgress <= 0) return quotes[0].text
  const match = quotes.find((q) => totalProgress <= q.max)
  return match?.text ?? quotes[quotes.length - 1].text
}
