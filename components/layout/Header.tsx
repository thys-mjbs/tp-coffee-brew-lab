import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"

const navLinks = [
  { href: "/", label: "All Tools" },
  { href: "/blog", label: "Guides" },
  { href: "/about", label: "About" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-surface-200 bg-surface-50/90 backdrop-blur-sm dark:border-surface-700 dark:bg-surface-900/90">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-surface-800 transition-opacity hover:opacity-80 dark:text-surface-100"
        >
          <span className="text-brand-600 dark:text-brand-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
              <line x1="6" x2="6" y1="2" y2="4" />
              <line x1="10" x2="10" y1="2" y2="4" />
              <line x1="14" x2="14" y1="2" y2="4" />
            </svg>
          </span>
          <span className="font-display text-base font-semibold tracking-tight">
            Coffee Brew Lab
          </span>
        </Link>

        <nav className="hidden items-center gap-6 sm:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-surface-600 transition-colors hover:text-brand-600 dark:text-surface-400 dark:hover:text-brand-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
