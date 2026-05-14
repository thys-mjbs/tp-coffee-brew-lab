# Build Plan: Spanish (Español) — es

> Audit date: 2026-05-14. Items marked [x] were verified present in the codebase before any new work began.

## Phase 1 — Register the locale
- [x] 1.0 Create this build plan file
- [x] 1.1 `es` in `supportedLangs` — `lib/i18nVariants.ts` line 1: `["es", "pt", "fr"]`
- [x] 1.2 `es` in `langLabels` — `app/[lang]/[slug]/page.tsx`: `es: "Español"`
- [x] 1.3 FAQ heading ternary — `app/[lang]/[slug]/page.tsx`: `lang === "es" ? "Preguntas frecuentes"`

## Phase 2 — Create i18n variant entries
- [x] 2.1 es variants for tools 1–5 — all present in `lib/i18nVariants.ts`
  - [x] coffee-ratio-calculator
  - [x] french-press-ratio-calculator
  - [x] instant-coffee-calculator
  - [x] coffee-beans-per-cup
  - [x] coffee-measurement-converter
- [x] 2.2 es variants for tools 6–10 — all present in `lib/i18nVariants.ts`
  - [x] pour-over-calculator
  - [x] aeropress-recipe
  - [x] cold-brew-ratio-calculator
  - [x] caffeine-calculator
  - [x] espresso-ratio-calculator

## Phase 3 — Content files scope audit
- [x] 3.1 Blog posts stay English-only — confirmed, no action needed
- [x] 3.2 Serving variants stay English-only — confirmed, no action needed

## Phase 4 — Wire up and fix hardcoded-English gaps
- [x] 4.1 `generateStaticParams` auto-includes es — confirmed via `getAllI18nParams()`
- [x] 4.2 Fix "English version" back-link label — `backLinkLabels` record added to `app/[lang]/[slug]/page.tsx`
- [x] 4.3 Fix ShareBar label strings — `labels` prop added to ShareBar; es/pt/fr strings wired in locale page

## Phase 5 — Sitemap and hreflang
- [x] 5.1 es pages in sitemap — confirmed via `getAllI18nParams()` in `app/sitemap.ts`
- [ ] 5.2 Hreflang — currently only cross-references `en` + current locale; does not link to pt/fr variants

## Phase 6 — TypeScript compile and manual verification
- [ ] 6.1 Run `npx tsc --noEmit` — not yet verified
- [ ] 6.2 Manual verification checklist — not yet done

## Phase 7 — Language switcher (required gap, not in guide)
- [ ] 7.1 Create `components/layout/LanguageSwitcher.tsx` — client component, reads pathname, shows dropdown for pages with locale variants
- [ ] 7.2 Add `LanguageSwitcher` to `components/layout/Header.tsx` — left of ThemeToggle
- [ ] 7.3 Verify switcher on English tool page (shows es/pt/fr options)
- [ ] 7.4 Verify switcher on locale page (shows EN + other locales)
- [ ] 7.5 Verify switcher hidden on blog, about, contact, home (no locale variants)
