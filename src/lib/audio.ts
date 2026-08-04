type WebkitWindow = Window & {
  webkitAudioContext?: typeof AudioContext
}

let sharedCtx: AudioContext | null = null
let unlocked = false

function createAudioContext() {
  const AC =
    window.AudioContext ||
    (window as WebkitWindow).webkitAudioContext
  if (!AC) {
    throw new Error('Web Audio API is not supported')
  }
  return new AC()
}

export function getAudioContext() {
  if (!sharedCtx) {
    sharedCtx = createAudioContext()
  }
  return sharedCtx
}

/**
 * Call from a tap/click handler. iOS Safari blocks Web Audio until
 * AudioContext is resumed (and briefly used) inside a user gesture.
 */
export async function unlockAudio(): Promise<AudioContext> {
  const ctx = getAudioContext()

  if (ctx.state === 'suspended') {
    try {
      await ctx.resume()
    } catch {
      // ignore — may still work after silent buffer below
    }
  }

  if (!unlocked || ctx.state !== 'running') {
    const buffer = ctx.createBuffer(1, 1, ctx.sampleRate)
    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.connect(ctx.destination)
    source.start(0)
    unlocked = true
  }

  if (ctx.state === 'suspended') {
    try {
      await ctx.resume()
    } catch {
      // ignore
    }
  }

  return ctx
}

function playTone(
  frequency: number,
  duration: number,
  volume: number,
  type: OscillatorType,
) {
  const ctx = getAudioContext()
  if (ctx.state === 'suspended') {
    void ctx.resume()
  }

  const t = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  const startVol = Math.max(volume, 0.0001)

  osc.type = type
  osc.frequency.value = frequency
  gain.gain.setValueAtTime(startVol, t)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(t)
  osc.stop(t + duration + 0.02)
}

/** Short metronome click */
export function playClick(volume = 0.45) {
  playTone(1200, 0.05, volume, 'square')
}

/** Soft countdown tick */
export function playTick(volume = 0.35) {
  playTone(880, 0.12, volume, 'sine')
}

/** Phase change / end beep */
export function playBeep(
  frequency = 660,
  duration = 0.25,
  volume = 0.4,
) {
  playTone(frequency, duration, volume, 'sine')
}
