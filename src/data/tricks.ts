import { videoUrl } from './video'

export type Trick = {
  id: string
  title: string
  description?: string
  /** Public mp4 URL from Cloud.ru */
  videoUrl?: string
}

export type TrickGroup = {
  header?: string
  tricks: Trick[]
}

export type TrickList = {
  id: string
  title: string
  tricks: Trick[]
  /** Optional section headers like in Android freestyle/longrope lists */
  groups?: TrickGroup[]
}

export type Section = {
  id: string
  title: string
  subtitle?: string
  accent: string
  /** Direct trick list, or nested lists (levels / long rope subtypes) */
  lists: TrickList[]
}

function pickTricks(source: Trick[], ids: string[]): Trick[] {
  return ids.map((id) => {
    const trick = source.find((t) => t.id === id)
    if (!trick) throw new Error(`Missing trick ${id}`)
    return trick
  })
}

function listWithGroups(
  id: string,
  title: string,
  groups: TrickGroup[],
): TrickList {
  return {
    id,
    title,
    groups,
    tricks: groups.flatMap((g) => g.tricks),
  }
}

const basic: Trick[] = [
  { id: 'b1', title: 'Прыжки вперед', videoUrl: videoUrl('freestyle/base1.mp4') },
  { id: 'b2', title: 'Кресты', videoUrl: videoUrl('freestyle/base2.mp4') },
  { id: 'b3', title: 'Спринт', videoUrl: videoUrl('freestyle/base3.mp4') },
  { id: 'b4', title: 'Ножницы', videoUrl: videoUrl('freestyle/base4.mp4') },
  { id: 'b5', title: 'Лыжник (влево-вправо)', videoUrl: videoUrl('freestyle/base5.mp4') },
  { id: 'b6', title: 'Прыжки назад', videoUrl: videoUrl('freestyle/base6.mp4') },
  { id: 'b7', title: 'Вращения сбоку', videoUrl: videoUrl('freestyle/base7.mp4') },
  { id: 'b8', title: 'Канкан', videoUrl: videoUrl('freestyle/base8.mp4') },
  { id: 'b9', title: 'Колокол (вперед-назад)', videoUrl: videoUrl('freestyle/base9.mp4') },
  { id: 'b10', title: 'Колено + крест', videoUrl: videoUrl('freestyle/base10.mp4') },
  { id: 'b11', title: 'Медленные прыжки', videoUrl: videoUrl('freestyle/base11.mp4') },
  { id: 'b12', title: 'Джек', videoUrl: videoUrl('freestyle/base12.mp4') },
  { id: 'b13', title: 'Джек+крест', videoUrl: videoUrl('freestyle/base13.mp4') },
  { id: 'b14', title: 'Удар ногой', videoUrl: videoUrl('freestyle/base14.mp4') },
  { id: 'b15', title: 'Вращение сбоку+прыжок', videoUrl: videoUrl('freestyle/base15.mp4') },
  { id: 'b16', title: 'Мотодор', videoUrl: videoUrl('freestyle/base16.mp4') },
  { id: 'b17', title: 'Пятка-носок', videoUrl: videoUrl('freestyle/base17.mp4') },
  { id: 'b18', title: 'Пятка-пятка', videoUrl: videoUrl('freestyle/base18.mp4') },
  { id: 'b19', title: 'Носок-носок', videoUrl: videoUrl('freestyle/base19.mp4') },
  { id: 'b20', title: 'Скручивания', videoUrl: videoUrl('freestyle/base20.mp4') },
  { id: 'b21', title: 'Колени в сторону-вместе', videoUrl: videoUrl('freestyle/base21.mp4') },
  { id: 'b22', title: 'Поворот 360', videoUrl: videoUrl('freestyle/base22.mp4') },
  { id: 'b23', title: 'Поворот 360 сверху', videoUrl: videoUrl('freestyle/base23.mp4') },
  { id: 'b24', title: 'Поворот 180', videoUrl: videoUrl('freestyle/base24.mp4') },
  { id: 'b25', title: 'Поворот 360 перед собой', videoUrl: videoUrl('freestyle/base25.mp4') },
  { id: 'b26', title: 'Прыжки на левой ноге', videoUrl: videoUrl('freestyle/base26.mp4') },
  { id: 'b27', title: 'Прыжки на правой ноге', videoUrl: videoUrl('freestyle/base27.mp4') },
  { id: 'b28', title: 'Сапог', videoUrl: videoUrl('freestyle/base28.mp4') },
  { id: 'b29', title: 'Оборот вокруг тела', videoUrl: videoUrl('freestyle/base29.mp4') },
  { id: 'b30', title: 'Намотка', videoUrl: videoUrl('freestyle/base30.mp4') },
  { id: 'b31', title: 'Намотка в крест', videoUrl: videoUrl('freestyle/base31.mp4') },
]

const level1: Trick[] = [
  { id: 'l1-1', title: 'Двойные', videoUrl: videoUrl('freestyle/lvl11.mp4') },
  { id: 'l1-2', title: 'Двойной крест - открыто', videoUrl: videoUrl('freestyle/lvl12.mp4') },
  { id: 'l1-3', title: 'Двойной открыто-крест', videoUrl: videoUrl('freestyle/lvl13.mp4') },
  { id: 'l1-4', title: 'Смена в кресте', videoUrl: videoUrl('freestyle/lvl14.mp4') },
  { id: 'l1-5', title: 'Крест под ногой', videoUrl: videoUrl('freestyle/lvl15.mp4') },
  { id: 'l1-6', title: 'Открытый под ногой, выход в крест', videoUrl: videoUrl('freestyle/lvl16.mp4') },
  { id: 'l1-7', title: 'Двойной крест', videoUrl: videoUrl('freestyle/lvl21.mp4') },
  { id: 'l1-8', title: 'Двойной мотодор', videoUrl: videoUrl('freestyle/lvl22.mp4') },
  { id: 'l1-9', title: 'Инверсия', videoUrl: videoUrl('freestyle/lvl19.mp4') },
  { id: 'l1-10', title: 'Двойной назад', videoUrl: videoUrl('freestyle/lvl110.mp4') },
  { id: 'l1-11', title: 'Внешний крест под ногой', videoUrl: videoUrl('freestyle/lvl111.mp4') },
  { id: 'l1-12', title: 'Крест под одной ногой', videoUrl: videoUrl('freestyle/lvl112.mp4') },
  { id: 'l1-13', title: 'Бросок-ловля ручки', videoUrl: videoUrl('freestyle/lvl113.mp4') },
  { id: 'l1-14', title: 'Бросок-ловля ручки в кресте', videoUrl: videoUrl('freestyle/lvl28.mp4') },
  { id: 'l1-15', title: 'Намотка на ногу', videoUrl: videoUrl('freestyle/lvl115.mp4') },
  { id: 'l1-16', title: 'Планка (простой вариант)', videoUrl: videoUrl('freestyle/lvl116.mp4') },
  { id: 'l1-17', title: 'Змейка', videoUrl: videoUrl('freestyle/lvl29.mp4') },
  { id: 'l1-18', title: 'Бросок из намотки', videoUrl: videoUrl('freestyle/lvl118.mp4') },
]

const level2: Trick[] = [
  { id: 'l2-1', title: 'Крест за спиной', videoUrl: videoUrl('freestyle/lvl17.mp4') },
  { id: 'l2-2', title: 'Крест под коленями', videoUrl: videoUrl('freestyle/lvl18.mp4') },
  { id: 'l2-3', title: 'Открытый под ногой, выход в открытый', videoUrl: videoUrl('freestyle/lvl23.mp4') },
  { id: 'l2-4', title: 'Обратный крест под ногой, выход в крест', videoUrl: videoUrl('freestyle/lvl24.mp4') },
  { id: 'l2-5', title: 'Крест между ног', videoUrl: videoUrl('freestyle/lvl25.mp4') },
  { id: 'l2-6', title: 'Обратный крюк', videoUrl: videoUrl('freestyle/lvl26.mp4') },
  { id: 'l2-7', title: 'Крест за головой, под ногой', videoUrl: videoUrl('freestyle/lvl27.mp4') },
  { id: 'l2-8', title: 'Чередование', videoUrl: videoUrl('freestyle/lvl114.mp4') },
  { id: 'l2-9', title: 'Двойная инверсия', videoUrl: videoUrl('freestyle/lvl210.mp4') },
  { id: 'l2-10', title: 'Бросок-ловля ручки в кресте под ногой', videoUrl: videoUrl('freestyle/lvl211.mp4') },
  { id: 'l2-11', title: 'Обратный внешний крест под ногой, выход в крест', videoUrl: videoUrl('freestyle/lvl212.mp4') },
  { id: 'l2-12', title: 'Крест под ногой, выход в двойной прыжок', videoUrl: videoUrl('freestyle/lvl213.mp4') },
  { id: 'l2-13', title: 'Мик', videoUrl: videoUrl('freestyle/lvl214.mp4') },
  { id: 'l2-14', title: 'Бросок ручки из-за спины', videoUrl: videoUrl('freestyle/lvl215.mp4') },
  { id: 'l2-15', title: 'Открытый под ногой с намоткой', videoUrl: videoUrl('freestyle/lvl216.mp4') },
  { id: 'l2-16', title: 'Инверсия под ногой', videoUrl: videoUrl('freestyle/lvl217.mp4') },
  { id: 'l2-17', title: 'Крест под ногой в крест под коленями', videoUrl: videoUrl('freestyle/lvl218.mp4') },
  { id: 'l2-18', title: 'Двойной со сменой в кресте', videoUrl: videoUrl('freestyle/lvl219.mp4') },
]

const pair: Trick[] = [
  { id: 'p1', title: 'Прыжки в колонне вперед', videoUrl: videoUrl('two_rope/parn1.mp4') },
  { id: 'p2', title: 'Заход в скакалку сбоку спереди', videoUrl: videoUrl('two_rope/parn2.mp4') },
  { id: 'p3', title: 'Заход в скакалку сбоку спереди и сзади', videoUrl: videoUrl('two_rope/parn3.mp4') },
  { id: 'p4', title: 'Путешественник впереди', videoUrl: videoUrl('two_rope/parn4.mp4') },
  { id: 'p5', title: 'Путешественник сзади', videoUrl: videoUrl('two_rope/parn5.mp4') },
  { id: 'p6', title: 'Прыжки с чередованием', videoUrl: videoUrl('two_rope/parn6.mp4') },
  { id: 'p7', title: 'Черпак (прыжки назад)', videoUrl: videoUrl('two_rope/parn7.mp4') },
  { id: 'p8', title: 'Прыжок вперед с чередованием', videoUrl: videoUrl('two_rope/parn8.mp4') },
  { id: 'p9', title: 'Парное взаимодействие', videoUrl: videoUrl('two_rope/parn9.mp4') },
  { id: 'p10', title: 'Парное взаимодействие поворот влево 1', videoUrl: videoUrl('two_rope/parn10.mp4') },
  { id: 'p11', title: 'Парное взаимодействие поворот влево 2', videoUrl: videoUrl('two_rope/parn11.mp4') },
  { id: 'p12', title: 'Парное взаимодействие поворот влево 3', videoUrl: videoUrl('two_rope/parn12.mp4') },
  { id: 'p13', title: 'Парное взаимодействие поворот вправо 1', videoUrl: videoUrl('two_rope/parn13.mp4') },
  { id: 'p14', title: 'Парное взаимодействие поворот вправо 2', videoUrl: videoUrl('two_rope/parn14.mp4') },
  { id: 'p15', title: 'Парное взаимодействие поворот вправо 3', videoUrl: videoUrl('two_rope/parn15.mp4') },
  { id: 'p16', title: 'Парное взаимодействие смена местами', videoUrl: videoUrl('two_rope/parn16.mp4') },
  { id: 'p17', title: 'Парное взаимодействие под левой ногой', videoUrl: videoUrl('two_rope/parn17.mp4') },
  { id: 'p18', title: 'Парное взаимодействие под правой ногой', videoUrl: videoUrl('two_rope/parn18.mp4') },
  { id: 'p19', title: 'Забегание в скакалку', videoUrl: videoUrl('two_rope/parn19.mp4') },
  { id: 'p20', title: 'Смена места внутри скакалки', videoUrl: videoUrl('two_rope/parn20.mp4') },
]

const china: Trick[] = [
  { id: 'c1', title: 'Прыжки вперед', videoUrl: videoUrl('two_rope/china1.mp4') },
  { id: 'c2', title: 'Прыжки с крестом', videoUrl: videoUrl('two_rope/china2.mp4') },
  { id: 'c3', title: 'Повороты поочередно', videoUrl: videoUrl('two_rope/china3.mp4') },
  { id: 'c4', title: 'Изменение вращения', videoUrl: videoUrl('two_rope/china4.mp4') },
  { id: 'c5', title: 'Прыжки поочередно', videoUrl: videoUrl('two_rope/china5.mp4') },
]

const longRopeOne: Trick[] = [
  {
    id: 'lr1-1',
    title: 'Прыжки втроем',
    videoUrl: videoUrl('longrope/longrope_one_1.mp4'),
    description:
      'Два вращающих стоят напротив и вращают одну длинную скакалку, скипер — строго по центру.\nСледите за синхроном вращающих: скакалка должна мягко касаться пола в середине.\nПрыгайте вертикально, небольшими прыжками; смотрите на скакалку, а не вниз под ноги.\nТемп держите ровным — сначала медленно, если нужно ускоряйте плавно.',
  },
  {
    id: 'lr1-2',
    title: '2 петли',
    videoUrl: videoUrl('longrope/longrope_one_2.mp4'),
    description:
      'Одну длинную скакалку вращают создав 2 петли.\nПетли скакалки не должны ударять пол одновременно.\nСначала отработайте ровное вращение без скипера.\nДистанция между вращающими — такая, чтобы петли были высокими, но касались пола.',
  },
]

const longRopeTwo: Trick[] = [
  {
    id: 'lr2-1',
    title: 'Вращение',
    videoUrl: videoUrl('longrope/longrope_two_1.mp4'),
    description:
      'Четыре вращающих вращают две длинные скакалки скрестив их по центру.\nГлавное — ровный ритм и одинаковая высота петель у обоих скакалок.\nНе сближайтесь: при короткой дистанции скакалки путаются.',
  },
  {
    id: 'lr2-2',
    title: 'С прыжками',
    videoUrl: videoUrl('longrope/longrope_two_2.mp4'),
    description:
      'Те же две скакалки, но в центре уже есть скипер.\nВходите, когда обе скакалки поднялись вверх.\nПрыгайте точно посередине между вращающими.\nПрыжки короткие и частые; руки держите близко к телу.',
  },
  {
    id: 'lr2-3',
    title: 'Поочередное вращение',
    videoUrl: videoUrl('longrope/longrope_two_3.mp4'),
    description:
      'Вращающие со скакалками стоят в одну линию и вращают со сдвигом по фазе.\nВнутренние вращающие держат ритм обеих зон — смотрите на партнёров, а не только на свою руку.\nСкорость у всех одинаковая — иначе средние сегменты «ломаются».',
  },
  {
    id: 'lr2-4',
    title: 'Одновременное вращение',
    videoUrl: videoUrl('longrope/longrope_two_4.mp4'),
    description:
      'Две длинные скакалки вращаются одновременно в цепочку.\nКрайние вращающие держат амплитуду, средние — стабильную высоту рук на уровне пояса/груди.\nДистанция между людьми одинаковая, без провиса и без натяжения «струной».\nСчитайте общий ритм вслух, пока не поймаете синхрон.',
  },
  {
    id: 'lr2-5',
    title: 'Одновременное вращение с прыжками',
    videoUrl: videoUrl('longrope/longrope_two_5.mp4'),
    description:
      'К одновременному вращению добавляются прыжки в рабочей зоне.\nСкипер выбирает один сегмент и выполняет прыжки в нем.\nВход — после касания скакалки пола; выход — в сторону, не навстречу скакалке.\nВращающие не ускоряются ради скипер: сначала ритм, потом скорость.',
  },
  {
    id: 'lr2-6',
    title: 'Вращение (внутри)',
    videoUrl: videoUrl('longrope/longrope_two_6.mp4'),
    description:
      'Две длинные скакалки вращают так, что одна оказывается внутри другой.\nСначала стабилизируйте внешнюю пару, затем добавьте внутреннюю.\nВнутренние вращающие следят, чтобы их петля не задевала внешнюю.\nТемп медленный, круги ровные, без рывков плечами.',
  },
  {
    id: 'lr2-7',
    title: 'С прыжками (внутри)',
    videoUrl: videoUrl('longrope/longrope_two_7.mp4'),
    description:
      'К схеме «скакалка внутри другой» добавляются скиперы.\nСкипер работает в центре, где обе петли предсказуемы.\nСлушайте касания пола — это ваш метроном.\nЕсли ритм сбился, сначала остановите прыжки и выровняйте вращение.',
  },
  {
    id: 'lr2-8',
    title: 'Добавление одиночной скакалки',
    videoUrl: videoUrl('longrope/longrope_two_8.mp4'),
    description:
      'Внутри длинной скакалки скипер добавляет свою одиночную.\nСначала поймайте ритм длинной скакалки, потом включите свою.\nДержите дистанцию от соседей: одиночная скакалка требует места по бокам.\nНе прыгайте высоко — достаточно лёгкого отрыва, синхронного с длинной петлёй.',
  },
]

const longRopeThree: Trick[] = [
  {
    id: 'lr3-1',
    title: 'Вращение назад',
    videoUrl: videoUrl('longrope/longrope_three_1.mp4'),
    description:
      'Треугольник: трое вращающих держат по две скакалки и вращают назад.\nКаждый вращающий повторяет темп и направление соседа.\nСкакалки должны одинаково касаться пола в своих зонах.\nСначала вращайте без скипер, чтобы привыкнуть к вращению и определить оптимальное расстояние.',
  },
  {
    id: 'lr3-2',
    title: 'Вращение вперед',
    videoUrl: videoUrl('longrope/longrope_three_2.mp4'),
    description:
      'Та же схема треугольника, но вращение вперёд.\nВращающие задают ритм обеими руками одновременно.\nСледите за одинаковой высотой петель слева и справа.',
  },
  {
    id: 'lr3-3',
    title: 'Переходы между скакалками 1 прыгающий',
    videoUrl: videoUrl('longrope/longrope_three_3.mp4'),
    description:
      'Один скипер переходит из одной скакалки треугольника в другую.\nПереход делайте в момент, когда целевая петля вверху.\nНе останавливайтесь в «стыке» между зонами — проходите уверенно.\nВращающие не меняют темп во время перехода скипера.',
  },
  {
    id: 'lr3-4',
    title: '3 прыгающих',
    videoUrl: videoUrl('longrope/longrope_three_4.mp4'),
    description:
      'В зонах треугольника работают сразу трое скиперов.\nКаждый занимает свою зону и не смещается к соседу.\nПрыжки короткие; смотрите вперёд, а не друг на друга.\nЕсли кто-то сбился — выходите в сторону, не останавливая всю конструкцию.',
  },
  {
    id: 'lr3-5',
    title: 'Переходы между скакалками 3 прыгающих',
    videoUrl: videoUrl('longrope/longrope_three_5.mp4'),
    description:
      'Трое скиперов по очереди переходят между скакалками треугольника.\nДержите поток: вход — прыжок — выход, без скопления в центре.\nВыходите по диагонали, освобождая место следующему.\nОбщий ритм важнее скорости переходов.',
  },
]

const longRopeEight: Trick[] = [
  {
    id: 'lr8-1',
    title: 'Подготовка',
    videoUrl: videoUrl('longrope/longrope_eight_1.mp4'),
    description:
      'Восьмёрка: двое вращают длинную скакалку, группа из 6 человек тренирует вход/выход.\nОчередь стоит сбоку от вращающего — не в траектории скакалки.\nОтработайте движение восьмеркой всей командой с прыжком в центре.',
  },
  {
    id: 'lr8-2',
    title: 'Прыжок с пропуском петли',
    videoUrl: videoUrl('longrope/longrope_eight_2.mp4'),
    description:
      'Скипер входит, делает прыжок, следующий скипер пропускает одну петлю (не прыгает через каждый оборот).\nСчитайте обороты: прыжок — пропуск — прыжок.\nВход после касания пола скакалки, выход сразу после своего прыжка.\nНе задерживайтесь в центре — иначе собьёте очередь.',
  },
  {
    id: 'lr8-3',
    title: 'Прыжок на каждое вращение',
    videoUrl: videoUrl('longrope/longrope_eight_3.mp4'),
    description:
      'Прыжок на каждый оборот скакалки в потоке восьмёрки.\nРитм плотнее: маленькие прыжки, быстрый вход и выход.\nСмотрите на скакалку на уровне пояса/груди, не под ноги.\nВращающие сохраняют один темп на всю очередь.',
  },
]

const doubleDutch: Trick[] = [
  {
    id: 'dd1',
    title: 'Вращение',
    videoUrl: videoUrl('longrope/longrope_dd_1.mp4'),
    description:
      'Классический дабл датч: два вращающих, две скакалки.\nВращение скакалок поочерёдно, не одновременно.\nНачните с медленного вращения и одинаковых кругов руками.\nЛокти ближе к корпусу, движение в основном предплечьями.',
  },
  {
    id: 'dd2',
    title: 'С прыжками',
    videoUrl: videoUrl('longrope/longrope_dd_2.mp4'),
    description:
      'К стабильному вращению добавляется скипер в центре.\nВход — когда дальняя скакалка касается пола.\nПрыжки частые и низкие; держитесь в середине петли.\nЕсли сбились — выйдите и заново поймайте ритм с края.',
  },
  {
    id: 'dd3',
    title: 'Смена вращающих',
    videoUrl: videoUrl('longrope/longrope_dd_3.mp4'),
    description:
      'Во время вращения вращающие меняются ролями/местами со скипером без остановки ритма.\nСмена готовится заранее: новый вращающий встаёт рядом и перехватывает ручки скакалки.\nНе бросайте скакалки резко — передача мягкая, в том же темпе.\nСкипер продолжает прыгать или выходит на время смены, если темп нестабилен.',
  },
  {
    id: 'dd4',
    title: 'Переход по кругу',
    videoUrl: videoUrl('longrope/longrope_dd_4.mp4'),
    description:
      'Вращающие движутся по кругу, в центре скипер совершает прыжки и остается на одном месте.\nДержите ровные петли скакалок, чтобы не сталкиваться.',
  },
  {
    id: 'dd5',
    title: 'Начало вращения с прыгающим',
    videoUrl: videoUrl('longrope/longrope_dd_5.mp4'),
    description:
      'Вращение начинают, когда скипер уже стоит в центре.\nСначала скакалки лежат, затем плавный разгон.\nСкипер готовится и начинает прыжки с первых оборотов.\nНе стартуйте резко: плавный набор скорости важнее силы.',
  },
  {
    id: 'dd6',
    title: 'Прыжки с одиночной скакалкой',
    videoUrl: videoUrl('longrope/longrope_dd_6.mp4'),
    description:
      'В дабл датче скипер дополнительно вращает свою одиночную скакалку.\nСначала войдите и поймайте ритм двух длинных, потом включите свою.\nАмплитуда одиночной — минимальная, без широких махов руками.\nЕсли запутались — сначала отпустите одиночную, прыгайте через длинные.',
  },
  {
    id: 'dd7',
    title: 'Повороты вращающих',
    videoUrl: videoUrl('longrope/longrope_dd_7.mp4'),
    description:
      'Вращающие во время дабл датча делают поворот корпуса, не теряя ритм вращения.\nПоворот 360, контролируемый; руки продолжают круги.\nСмотрите друг на друга, чтобы скорость оставалась общей.\nСначала учите поворот без скипера.',
  },
  {
    id: 'dd8',
    title: 'Поворот, 1 рука за спину',
    videoUrl: videoUrl('longrope/longrope_dd_8.mp4'),
    description:
      'При повороте одна рука уходит за спину, вторая продолжает вращение.\nСохраняйте ритм второй скакалки — она «держит» темп.\nНе наклоняйтесь сильно вперёд: баланс через ноги и корпус.\nОсвойте элемент медленно, затем верните рабочую скорость.',
  },
]

export const sections: Section[] = [
  {
    id: 'freestyle',
    title: 'Фристайл',
    subtitle: 'База и уровни',
    accent: '#3b82f6',
    lists: [
      { id: 'basic', title: 'Базовые элементы', tricks: basic },
      listWithGroups('level1', 'Уровень 1', [
        {
          header: 'Манипуляции',
          tricks: pickTricks(level1, [
            'l1-4',
            'l1-5',
            'l1-9',
            'l1-6',
            'l1-11',
            'l1-12',
            'l1-15',
            'l1-16',
          ]),
        },
        {
          header: 'Мультипрыжки',
          tricks: pickTricks(level1, [
            'l1-1',
            'l1-2',
            'l1-3',
            'l1-10',
            'l1-7',
            'l1-8',
          ]),
        },
        {
          header: 'Броски',
          tricks: pickTricks(level1, ['l1-13', 'l1-14', 'l1-17', 'l1-18']),
        },
      ]),
      listWithGroups('level2', 'Уровень 2', [
        {
          header: 'Манипуляции',
          tricks: pickTricks(level2, [
            'l2-3',
            'l2-4',
            'l2-5',
            'l2-6',
            'l2-7',
            'l2-11',
            'l2-1',
            'l2-2',
            'l2-8',
            'l2-15',
            'l2-16',
            'l2-17',
          ]),
        },
        {
          header: 'Мультипрыжки',
          tricks: pickTricks(level2, ['l2-9', 'l2-12', 'l2-18']),
        },
        {
          header: 'Броски',
          tricks: pickTricks(level2, ['l2-10', 'l2-13', 'l2-14']),
        },
      ]),
    ],
  },
  {
    id: 'pair',
    title: 'Парное взаимодействие',
    subtitle: 'Вдвоём в одной скакалке',
    accent: '#8b5cf6',
    lists: [{ id: 'main', title: 'Парные элементы', tricks: pair }],
  },
  {
    id: 'china',
    title: 'Китайское колесо',
    subtitle: 'Сдвоенная скакалка',
    accent: '#f59e0b',
    lists: [{ id: 'main', title: 'Элементы', tricks: china }],
  },
  {
    id: 'longrope',
    title: 'Длинная скакалка',
    subtitle: 'Групповые форматы',
    accent: '#10b981',
    lists: [
      { id: 'one', title: '1 длинная скакалка', tricks: longRopeOne },
      listWithGroups('two', '2 длинные скакалки', [
        {
          header: 'Паук',
          tricks: pickTricks(longRopeTwo, ['lr2-1', 'lr2-2']),
        },
        {
          header: 'Скакалки в одну линию',
          tricks: pickTricks(longRopeTwo, ['lr2-3', 'lr2-4', 'lr2-5']),
        },
        {
          header: 'Скакалка внутри другой',
          tricks: pickTricks(longRopeTwo, ['lr2-6', 'lr2-7', 'lr2-8']),
        },
      ]),
      listWithGroups('three', '3 длинные скакалки', [
        {
          header: 'Треугольник',
          tricks: longRopeThree,
        },
      ]),
      { id: 'eight', title: 'Восьмёрка', tricks: longRopeEight },
      { id: 'double-dutch', title: 'Дабл датч', tricks: doubleDutch },
    ],
  },
]

export const homeCards = [
  {
    id: 'freestyle',
    title: 'Фристайл',
    to: '/section/freestyle',
    accent: '#3b82f6',
  },
  {
    id: 'pair',
    title: 'Парное взаимодействие',
    to: '/section/pair',
    accent: '#8b5cf6',
  },
  {
    id: 'china',
    title: 'Китайское колесо',
    to: '/section/china',
    accent: '#f59e0b',
  },
  {
    id: 'longrope',
    title: 'Длинная скакалка',
    to: '/section/longrope',
    accent: '#10b981',
  },
] as const

export function getSection(sectionId: string) {
  return sections.find((s) => s.id === sectionId)
}

export function getList(sectionId: string, listId: string) {
  return getSection(sectionId)?.lists.find((l) => l.id === listId)
}

export function getTrick(sectionId: string, listId: string, trickId: string) {
  return getList(sectionId, listId)?.tricks.find((t) => t.id === trickId)
}

export function allTricksFlat() {
  return sections.flatMap((section) =>
    section.lists.flatMap((list) =>
      list.tricks.map((trick) => ({
        sectionId: section.id,
        listId: list.id,
        trick,
      })),
    ),
  )
}

/** Lists that have a compound generator (Android: freestyle levels + pair). */
export function supportsCompound(sectionId: string, listId: string) {
  if (sectionId === 'freestyle') {
    return listId === 'basic' || listId === 'level1' || listId === 'level2'
  }
  if (sectionId === 'pair') {
    return listId === 'main'
  }
  return false
}

/** Random compound pool — only tricks from the current list. */
export function compoundPool(sectionId: string, listId: string): Trick[] {
  return getList(sectionId, listId)?.tricks ?? []
}
