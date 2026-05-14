'use client'
import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { supportedLangs, topToolSlugs } from '@/lib/i18nVariants'

const langNames: Record<string, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
  fr: 'Français',
}

const allLangs = ['en', ...supportedLangs]

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const segments = pathname.split('/').filter(Boolean)

  let currentLang = 'en'
  let slug = ''

  if (segments.length === 2 && (supportedLangs as readonly string[]).includes(segments[0])) {
    currentLang = segments[0]
    slug = segments[1]
  } else if (segments.length === 1) {
    slug = segments[0]
  }

  const hasLocaleVariant = (topToolSlugs as readonly string[]).includes(slug)

  function getHref(lang: string) {
    if (!hasLocaleVariant) return pathname
    return lang === 'en' ? `/${slug}` : `/${lang}/${slug}`
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-surface-600 transition-colors hover:bg-surface-100 hover:text-brand-600 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-brand-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
        <span>{langNames[currentLang]}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1.5 w-36 overflow-hidden rounded-lg border border-surface-200 bg-white shadow-md dark:border-surface-700 dark:bg-surface-900"
        >
          {allLangs.map((lang) => (
            <button
              key={lang}
              role="option"
              aria-selected={lang === currentLang}
              onClick={() => { router.push(getHref(lang)); setOpen(false) }}
              className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-surface-50 dark:hover:bg-surface-800 ${
                lang === currentLang
                  ? 'font-semibold text-brand-600 dark:text-brand-400'
                  : 'text-surface-700 dark:text-surface-300'
              }`}
            >
              {langNames[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
