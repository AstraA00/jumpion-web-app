import fs from 'fs'

const path = 'src/data/tricks.ts'
let s = fs.readFileSync(path, 'utf8')

if (!s.includes("from './video'")) {
  s = s.replace(
    'export type Trick = {',
    "import { videoUrl } from './video'\n\nexport type Trick = {",
  )
}

const level1Files = {
  'l1-1': 'freestyle/lvl11.mp4',
  'l1-2': 'freestyle/lvl12.mp4',
  'l1-3': 'freestyle/lvl13.mp4',
  'l1-4': 'freestyle/lvl14.mp4',
  'l1-5': 'freestyle/lvl15.mp4',
  'l1-6': 'freestyle/lvl16.mp4',
  'l1-7': 'freestyle/lvl21.mp4',
  'l1-8': 'freestyle/lvl22.mp4',
  'l1-9': 'freestyle/lvl19.mp4',
  'l1-10': 'freestyle/lvl110.mp4',
  'l1-11': 'freestyle/lvl111.mp4',
  'l1-12': 'freestyle/lvl112.mp4',
  'l1-13': 'freestyle/lvl113.mp4',
  'l1-14': 'freestyle/lvl28.mp4',
  'l1-15': 'freestyle/lvl115.mp4',
  'l1-16': 'freestyle/lvl116.mp4',
  'l1-17': 'freestyle/lvl29.mp4',
  'l1-18': 'freestyle/lvl118.mp4',
}

const level2Files = {
  'l2-1': 'freestyle/lvl17.mp4',
  'l2-2': 'freestyle/lvl18.mp4',
  'l2-3': 'freestyle/lvl23.mp4',
  'l2-4': 'freestyle/lvl24.mp4',
  'l2-5': 'freestyle/lvl25.mp4',
  'l2-6': 'freestyle/lvl26.mp4',
  'l2-7': 'freestyle/lvl27.mp4',
  'l2-8': 'freestyle/lvl114.mp4',
  'l2-9': 'freestyle/lvl210.mp4',
  'l2-10': 'freestyle/lvl211.mp4',
  'l2-11': 'freestyle/lvl212.mp4',
  'l2-12': 'freestyle/lvl213.mp4',
  'l2-13': 'freestyle/lvl214.mp4',
  'l2-14': 'freestyle/lvl215.mp4',
  'l2-15': 'freestyle/lvl216.mp4',
  'l2-16': 'freestyle/lvl217.mp4',
  'l2-17': 'freestyle/lvl218.mp4',
  'l2-18': 'freestyle/lvl219.mp4',
}

const longropeFiles = {
  'lr1-1': 'longrope/longrope_one_1.mp4',
  'lr1-2': 'longrope/longrope_one_2.mp4',
  'lr2-1': 'longrope/longrope_two_1.mp4',
  'lr2-2': 'longrope/longrope_two_2.mp4',
  'lr2-3': 'longrope/longrope_two_3.mp4',
  'lr2-4': 'longrope/longrope_two_4.mp4',
  'lr2-5': 'longrope/longrope_two_5.mp4',
  'lr2-6': 'longrope/longrope_two_6.mp4',
  'lr2-7': 'longrope/longrope_two_7.mp4',
  'lr2-8': 'longrope/longrope_two_8.mp4',
  'lr3-1': 'longrope/longrope_three_1.mp4',
  'lr3-2': 'longrope/longrope_three_2.mp4',
  'lr3-3': 'longrope/longrope_three_3.mp4',
  'lr3-4': 'longrope/longrope_three_4.mp4',
  'lr3-5': 'longrope/longrope_three_5.mp4',
  'lr8-1': 'longrope/longrope_eight_1.mp4',
  'lr8-2': 'longrope/longrope_eight_2.mp4',
  'lr8-3': 'longrope/longrope_eight_3.mp4',
  dd1: 'longrope/longrope_dd_1.mp4',
  dd2: 'longrope/longrope_dd_2.mp4',
  dd3: 'longrope/longrope_dd_3.mp4',
  dd4: 'longrope/longrope_dd_4.mp4',
  dd5: 'longrope/longrope_dd_5.mp4',
  dd6: 'longrope/longrope_dd_6.mp4',
  dd7: 'longrope/longrope_dd_7.mp4',
  dd8: 'longrope/longrope_dd_8.mp4',
}

function fileForId(id) {
  const basic = id.match(/^b(\d+)$/)
  if (basic) return `freestyle/base${basic[1]}.mp4`
  const pair = id.match(/^p(\d+)$/)
  if (pair) return `two_rope/parn${pair[1]}.mp4`
  const china = id.match(/^c(\d+)$/)
  if (china) return `two_rope/china${china[1]}.mp4`
  if (level1Files[id]) return level1Files[id]
  if (level2Files[id]) return level2Files[id]
  if (longropeFiles[id]) return longropeFiles[id]
  return null
}

// Clear previous injections
s = s.replace(/\n\s*videoUrl: videoUrl\('[^']+'\),?/g, '')
s = s.replace(/, videoUrl: videoUrl\('[^']+'\)/g, '')

// Single-line: { id: 'b1', title: '...' },
s = s.replace(
  /\{ id: '([^']+)', title: '([^']*)' \}/g,
  (full, id, title) => {
    const file = fileForId(id)
    if (!file) return full
    return `{ id: '${id}', title: '${title}', videoUrl: videoUrl('${file}') }`
  },
)

// Multi-line blocks starting with id + title
s = s.replace(
  /(\{\s*\n\s*id: ')([^']+)(',\s*\n\s*title: '[^']*')/g,
  (full, a, id, c) => {
    const file = fileForId(id)
    if (!file) return full
    return `${a}${id}${c},\n    videoUrl: videoUrl('${file}')`
  },
)

fs.writeFileSync(path, s)
console.log('videoUrl count', (s.match(/videoUrl: videoUrl/g) || []).length)
