import Link from "next/link"

const toolLinks = [
  { href: "/coffee-ratio-calculator", label: "Ratio Calculator" },
  { href: "/french-press-ratio-calculator", label: "French Press" },
  { href: "/pour-over-calculator", label: "Pour Over" },
  { href: "/aeropress-recipe", label: "AeroPress" },
  { href: "/espresso-ratio-calculator", label: "Espresso" },
  { href: "/cold-brew-ratio-calculator", label: "Cold Brew" },
]

const siteLinks = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-green-700 bg-green-800 text-green-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                  <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                  <line x1="6" x2="6" y1="2" y2="4" />
                  <line x1="10" x2="10" y1="2" y2="4" />
                  <line x1="14" x2="14" y1="2" y2="4" />
                </svg>
              </span>
              <span className="font-display font-semibold text-green-50">Coffee Brew Lab</span>
            </div>
            <p className="text-sm leading-relaxed text-green-200">
              Ratio calculators and brew guides for every coffee method. Free, no sign-up required.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-green-400">
              Popular Tools
            </h3>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-green-200 transition-colors hover:text-green-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-green-400">
              Site
            </h3>
            <ul className="space-y-2">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-green-200 transition-colors hover:text-green-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-green-700 pt-6 text-xs text-green-400">
          <p>
            &copy; {new Date().getFullYear()} Coffee Brew Lab. All processing is done in your browser. No data is stored or sent to any server.
          </p>
        </div>
      </div>
    </footer>
  )
}
