'use client'

import React, { useEffect, useRef } from 'react'

type Props = {
  src: string
  className?: string
  'aria-label'?: string
}

/**
 * Muted, looping inline video with reliable autoplay: retries `play()` after load,
 * resumes when the tab becomes visible again, and respects `prefers-reduced-motion`.
 */
export function MutedAutoplayLoopVideo({ src, className, 'aria-label': ariaLabel }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const userPausedRef = useRef(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const reducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      video.pause()
      video.removeAttribute('autoplay')
      return
    }

    const tryPlay = () => {
      if (userPausedRef.current) return
      void video.play().catch(() => {
        /* Autoplay blocked or not ready; a later canplay / visibility event may succeed. */
      })
    }

    tryPlay()
    video.addEventListener('canplay', tryPlay, { once: true })
    video.addEventListener('loadeddata', tryPlay, { once: true })

    const onVisible = () => {
      if (document.visibilityState === 'visible') tryPlay()
    }
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      video.removeEventListener('canplay', tryPlay)
      video.removeEventListener('loadeddata', tryPlay)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [src])

  const onVideoClick = () => {
    const video = ref.current
    if (!video) return

    if (video.paused) {
      userPausedRef.current = false
      void video.play().catch(() => {
        /* Ignore blocked play attempts; user can click again. */
      })
      return
    }

    userPausedRef.current = true
    video.pause()
  }

  return (
    <video
      ref={ref}
      className={`cursor-pointer ${className ?? ''}`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label={ariaLabel}
      onClick={onVideoClick}
      title="Click to pause or play"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
