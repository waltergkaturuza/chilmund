'use client'

import React, { useEffect, useRef } from 'react'

type Props = {
  src: string
  className?: string
  'aria-label'?: string
  /** Native controls (pause, fullscreen, timeline). Autoplay stays muted for browser policy. */
  controls?: boolean
  preload?: 'auto' | 'metadata' | 'none'
}

/**
 * Muted, looping inline video with reliable autoplay: retries `play()` after load,
 * resumes when the tab becomes visible again, and respects `prefers-reduced-motion`.
 * Stays paused after the user pauses (via controls or click).
 */
export function MutedAutoplayLoopVideo({
  src,
  className,
  controls = false,
  preload = 'auto',
  'aria-label': ariaLabel,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const userPausedRef = useRef(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const reducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      userPausedRef.current = true
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

    const onPlay = () => {
      userPausedRef.current = false
    }
    const onPause = () => {
      userPausedRef.current = true
    }

    if (controls) {
      video.addEventListener('play', onPlay)
      video.addEventListener('pause', onPause)
    }

    tryPlay()
    video.addEventListener('canplay', tryPlay, { once: true })
    video.addEventListener('loadeddata', tryPlay, { once: true })

    const onVisible = () => {
      if (document.visibilityState === 'visible') tryPlay()
    }
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      if (controls) {
        video.removeEventListener('play', onPlay)
        video.removeEventListener('pause', onPause)
      }
      video.removeEventListener('canplay', tryPlay)
      video.removeEventListener('loadeddata', tryPlay)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [src, controls])

  const onVideoClick = () => {
    if (controls) return

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
      className={controls ? (className ?? '') : `cursor-pointer ${className ?? ''}`}
      autoPlay
      muted
      loop
      playsInline
      controls={controls || undefined}
      preload={preload}
      aria-label={ariaLabel}
      onClick={onVideoClick}
      title={controls ? undefined : 'Click to pause or play'}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
