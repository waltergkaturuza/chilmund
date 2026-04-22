'use client'

import { cn } from '@/utilities/ui'
import { Linkedin, Mail, X } from 'lucide-react'
import React, { useEffect, useRef } from 'react'

import type { MeetOurTeamMember } from './types'

type Props = {
  member: MeetOurTeamMember | null
  onClose: () => void
}

export function TeamProfileModal({ member, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (member) {
      if (!el.open) el.showModal()
    } else if (el.open) {
      el.close()
    }
  }, [member])

  useEffect(() => {
    if (!member) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [member])

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    const onCancel = (e: Event) => {
      e.preventDefault()
      onClose()
    }
    el.addEventListener('cancel', onCancel)
    return () => el.removeEventListener('cancel', onCancel)
  }, [onClose])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={cn(
        'fixed inset-0 z-[200] max-h-[min(92vh,900px)] w-[min(100vw-1.5rem,52rem)] max-w-[calc(100vw-1.5rem)] translate-x-0 translate-y-0 overflow-hidden rounded-2xl border-0 p-0 shadow-2xl backdrop:bg-slate-950/70 backdrop:backdrop-blur-sm',
        'open:flex open:flex-col',
        'dark:backdrop:bg-slate-950/85',
      )}
    >
      {member ? (
        <div className="flex max-h-[min(92vh,900px)] flex-col bg-white dark:bg-slate-900">
          <div className="relative shrink-0 border-b border-slate-200 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 px-6 pb-10 pt-6 text-white dark:border-white/10 sm:px-8 sm:pb-12 sm:pt-8">
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
              aria-label="Close profile"
            >
              <X className="size-5" />
            </button>
            <div className="mt-2 flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-8">
              <div className="mx-auto shrink-0 sm:mx-0">
                <div className="size-32 overflow-hidden rounded-2xl ring-4 ring-white/40 ring-offset-4 ring-offset-blue-900/80 sm:size-36">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="size-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-slate-800 text-2xl font-bold text-white/80">
                      {member.name
                        .split(' ')
                        .map((w) => w[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              <div className="min-w-0 flex-1 text-center sm:pb-1 sm:text-left">
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{member.name}</h2>
                <p className="mt-1 text-sm font-semibold text-blue-100 sm:text-base">{member.jobTitle}</p>
                {member.credentials ? (
                  <p className="mt-3 text-xs leading-relaxed text-white/85 sm:text-sm">{member.credentials}</p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
            <div className="prose prose-slate max-w-none dark:prose-invert prose-p:text-[0.95rem] prose-p:leading-relaxed">
              {member.fullProfile.split(/\n\n+/).map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>

            {(member.email || member.linkedIn) && (
              <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-200 pt-6 dark:border-white/10">
                {member.email ? (
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-blue-500 hover:bg-blue-50 hover:text-blue-800 dark:border-white/15 dark:bg-white/5 dark:text-white/90 dark:hover:border-blue-400 dark:hover:bg-blue-950/40"
                  >
                    <Mail className="size-4 shrink-0" />
                    Email
                  </a>
                ) : null}
                {member.linkedIn ? (
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-blue-500 hover:bg-blue-50 hover:text-blue-800 dark:border-white/15 dark:bg-white/5 dark:text-white/90 dark:hover:border-blue-400 dark:hover:bg-blue-950/40"
                  >
                    <Linkedin className="size-4 shrink-0" />
                    LinkedIn
                  </a>
                ) : null}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </dialog>
  )
}
