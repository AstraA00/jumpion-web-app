import { asset } from '../lib/asset'

export const signals = [
  {
    id: 'speed_1x30',
    title: 'Скорость 1х30 сек',
    src: asset('signals/speed_1x30_sec.mp3'),
  },
  {
    id: 'speed_4x30',
    title: 'Скорость 4х30 сек',
    src: asset('signals/speed_4x30_sec.mp3'),
  },
  {
    id: 'endurance_60',
    title: 'Выносливость 60 сек',
    src: asset('signals/endurance_60_sec.mp3'),
  },
  {
    id: 'endurance_90',
    title: 'Выносливость 90 сек',
    src: asset('signals/endurance_90_sec.mp3'),
  },
  {
    id: 'endurance_120',
    title: 'Выносливость 120 сек',
    src: asset('signals/endurance_120_sec.mp3'),
  },
  {
    id: 'endurance_180',
    title: 'Выносливость 180 сек',
    src: asset('signals/endurance_180_sec.mp3'),
  },
  {
    id: 'strong',
    title: 'Сила',
    src: asset('signals/strong.mp3'),
  },
  {
    id: 'double_dutch',
    title: 'Дабл Датч 4x45 сек',
    src: asset('signals/double_dutch_4x45_sec.mp3'),
  },
] as const
