'use client'
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

  const segments = pathname.split('/').filter(Boolean)

  let currentLang = 'en'
  let slug = ''

  if (segments.length === 2 && (supportedLangs as readonly string[]).includes(segments[0])) {
    currentLang = segments[0]
    slug = segments[1]
  } else if (segments.length === 1) {
    slug = segments[0]
  } else {
    return null
  }

  if (!(topToolSlugs as readonly string[]).includes(slug)) return null

  function getHref(lang: string) {
    return lang === 'en' ? `/${slug}` : `/${lang}/${slug}`
  }

  return (
    <div className="flex items-center gap-1.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-surface-500 dark:text-surface-400"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
      <select
        value={currentLang}
        onChange={(e) => router.push(getHref(e.target.value))}
        aria-label="Select language"
        className="cursor-pointer appearance-none rounded-md bg-transparent py-0.5 pl-0.5 pr-4 text-sm font-medium text-surface-600 hover:text-brand-600 dark:text-surface-400 dark:hover:text-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%236b7280\' stroke-width=\'2.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0px center' }}
      >
        {allLangs.map((lang) => (
          <option key={lang} value={lang}>
            {langNames[lang]}
          </option>
        ))}
      </select>
    </div>
  )
}
