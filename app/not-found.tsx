import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "This page does not exist. Browse all coffee brewing tools and guides on Coffee Brew Lab.",
}

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <span className="text-5xl text-brand-600 dark:text-brand-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1="6" x2="6" y1="2" y2="4" />
          <line x1="10" x2="10" y1="2" y2="4" />
          <line x1="14" x2="14" y1="2" y2="4" />
        </svg>
      </span>

      <h1 className="font-display mt-6 text-3xl font-bold text-surface-800 dark:text-surface-50">
        Page not found
      </h1>
      <p className="mt-4 text-surface-600 dark:text-surface-400">
        This page does not exist or has moved. Try one of the tools below.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          All Tools
        </Link>
        <Link
          href="/coffee-ratio-calculator"
          className="rounded-lg border border-surface-200 bg-surface-50 px-5 py-2.5 text-sm font-semibold text-surface-700 transition-colors hover:bg-surface-100 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-200 dark:hover:bg-surface-700"
        >
          Ratio Calculator
        </Link>
        <Link
          href="/coffee-troubleshooter"
          className="rounded-lg border border-surface-200 bg-surface-50 px-5 py-2.5 text-sm font-semibold text-surface-700 transition-colors hover:bg-surface-100 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-200 dark:hover:bg-surface-700"
        >
          Troubleshooter
        </Link>
      </div>
    </div>
  )
}
