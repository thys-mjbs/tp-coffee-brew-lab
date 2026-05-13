import { buildAmazonSearchUrl } from "@/lib/affiliate/config"

interface AmazonLinksProps {
  searchTerms: string[]
  heading?: string
}

export function AmazonLinks({
  searchTerms,
  heading = "Recommended on Amazon",
}: AmazonLinksProps) {
  if (!searchTerms.length) return null
  return (
    <aside className="rounded-xl border border-brand-200 bg-brand-50 p-4 dark:border-brand-900 dark:bg-brand-950">
      <h3 className="mb-3 text-sm font-semibold text-brand-800 dark:text-brand-300">
        {heading}
      </h3>
      <ul className="space-y-2">
        {searchTerms.map((term) => (
          <li key={term}>
            <a
              href={buildAmazonSearchUrl(term)}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-sm text-brand-700 underline hover:text-brand-900 dark:text-brand-400 dark:hover:text-brand-200"
            >
              Shop: {term} &rarr;
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-surface-400 dark:text-surface-500">
        As an Amazon Associate we earn from qualifying purchases.
      </p>
    </aside>
  )
}
