'use client'

import { cn } from '@/utilities/ui'
import { ChevronDown, Globe } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

const LANGUAGES = [
  { code: 'en', country: 'GB', label: 'English' },
  { code: 'fr', country: 'FR', label: 'Français' },
  { code: 'pt', country: 'PT', label: 'Português' },
  { code: 'sn', country: 'ZW', label: 'ChiShona' },
  { code: 'zh-CN', country: 'CN', label: '中文' },
  { code: 'ja', country: 'JP', label: '日本語' },
  { code: 'ru', country: 'RU', label: 'Русский' },
  { code: 'el', country: 'GR', label: 'Ελληνικά' },
] as const

type LangCode = (typeof LANGUAGES)[number]['code']

function getStoredLang(): LangCode {
  if (typeof window === 'undefined') return 'en'
  return (localStorage.getItem('chilmund-lang') as LangCode) || 'en'
}

function triggerGoogleTranslate(langCode: string) {
  const frame = document.querySelector<HTMLIFrameElement>('.goog-te-menu-frame')
  if (frame?.contentDocument) {
    const items = frame.contentDocument.querySelectorAll<HTMLAnchorElement>('.goog-te-menu2-item a')
    for (const a of items) {
      if (a.textContent?.toLowerCase().includes(langCode)) {
        a.click()
        return true
      }
    }
  }

  const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo')
  if (combo) {
    combo.value = langCode
    combo.dispatchEvent(new Event('change'))
    return true
  }

  return false
}

export function LanguageSelector({ dark }: { dark?: boolean }) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<LangCode>('en')
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrent(getStoredLang())
  }, [])

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (document.getElementById('google-translate-script')) return

    const script = document.createElement('script')
    script.id = 'google-translate-script'
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)

    ;(window as unknown as Record<string, unknown>).googleTranslateElementInit = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element',
      )
    }
  }, [])

  const selectLang = useCallback(
    (code: LangCode) => {
      setCurrent(code)
      localStorage.setItem('chilmund-lang', code)
      setOpen(false)

      if (code === 'en') {
        const frame = document.querySelector<HTMLIFrameElement>('.goog-te-menu-frame')
        if (frame?.contentDocument) {
          const first = frame.contentDocument.querySelector<HTMLAnchorElement>(
            '.goog-te-menu2-item:first-child a',
          )
          first?.click()
        }
        const banner = document.querySelector<HTMLElement>('.goog-te-banner-frame')
        if (banner) banner.style.display = 'none'
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
        window.location.reload()
        return
      }

      setTimeout(() => {
        if (!triggerGoogleTranslate(code)) {
          setTimeout(() => triggerGoogleTranslate(code), 1000)
        }
      }, 300)
    },
    [],
  )

  const activeLang = LANGUAGES.find((l) => l.code === current) || LANGUAGES[0]

  return (
    <>
      <div id="google_translate_element" className="hidden" />
      <div ref={wrapRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className={cn(
            'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
            dark
              ? 'border-white/20 text-white/85 hover:bg-white/10 hover:text-white'
              : 'border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900',
          )}
        >
          <Globe className="size-3.5" aria-hidden />
          <span className="font-bold text-blue-600">{activeLang.country}</span>
          <span className="hidden sm:inline">{activeLang.label}</span>
          <ChevronDown
            className={cn('size-3 opacity-70 transition-transform', open && 'rotate-180')}
            aria-hidden
          />
        </button>

        {open && (
          <div
            className={cn(
              'absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[12rem] overflow-hidden rounded-xl border shadow-xl',
              dark
                ? 'border-white/10 bg-slate-950/95 text-white backdrop-blur-md'
                : 'border-slate-200/90 bg-white text-slate-900 shadow-slate-200/50',
            )}
            role="listbox"
            aria-label="Select language"
          >
            {LANGUAGES.map((lang) => {
              const isActive = lang.code === current
              return (
                <button
                  key={lang.code}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => selectLang(lang.code)}
                  className={cn(
                    'flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors',
                    dark
                      ? 'hover:bg-white/10'
                      : 'hover:bg-slate-50',
                    isActive && (dark ? 'bg-white/5' : 'bg-blue-50'),
                  )}
                >
                  <span className="w-7 shrink-0 text-xs font-bold text-blue-600">
                    {lang.country}
                  </span>
                  <span className="flex-1 font-medium">{lang.label}</span>
                  {isActive && (
                    <span className="size-2 shrink-0 rounded-full bg-blue-600" />
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
