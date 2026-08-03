import { useEffect, useRef } from 'react'

type Props = {
  src: string
  className?: string
}

/** Plays as soon as the page/trick opens. Needs a prior tap on iOS for sound. */
export function AutoVideo({ src, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    video.muted = false
    const tryPlay = () => {
      const playPromise = video.play()
      if (playPromise) {
        playPromise.catch(() => {
          // iOS may block unmuted autoplay without gesture — retry muted then unmute
          video.muted = true
          video
            .play()
            .then(() => {
              video.muted = false
            })
            .catch(() => {
              /* user can press play manually */
            })
        })
      }
    }

    if (video.readyState >= 2) {
      tryPlay()
    } else {
      video.addEventListener('loadeddata', tryPlay, { once: true })
    }

    return () => {
      video.pause()
      video.removeEventListener('loadeddata', tryPlay)
    }
  }, [src])

  return (
    <video
      ref={ref}
      key={src}
      className={className}
      src={src}
      controls
      playsInline
      autoPlay
      preload="auto"
    />
  )
}
