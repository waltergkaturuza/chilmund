'use client'

import React from 'react'

import { MutedAutoplayLoopVideo } from '@/heros/LowImpact/MutedAutoplayLoopVideo'

const WATER_TREAT_VIDEO_SRC = `/${encodeURIComponent('Water treat video.mp4')}`

export function HomeWaterTreatmentVideo() {
  return (
    <div className="mt-10 md:mt-12">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-lg dark:border-white/10">
        <MutedAutoplayLoopVideo
          src={WATER_TREAT_VIDEO_SRC}
          className="size-full object-contain"
          controls
          preload="auto"
          aria-label="Chilmund water treatment chemicals"
        />
      </div>
    </div>
  )
}
