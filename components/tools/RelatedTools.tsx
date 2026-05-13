import Link from "next/link"
import type { Tool } from "@/lib/tools"

interface RelatedToolsProps {
  tools: Tool[]
}

export function RelatedTools({ tools }: RelatedToolsProps) {
  if (!tools.length) return null
  return (
    <section aria-label="Related tools">
      <h2 className="mb-4 text-lg font-semibold text-surface-800 dark:text-surface-100">
        Related Tools
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="group flex items-center gap-3 rounded-lg border border-surface-200 bg-surface-50 px-4 py-3 transition-all hover:border-brand-500 hover:shadow-sm dark:border-surface-700 dark:bg-surface-900 dark:hover:border-brand-500"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-surface-800 group-hover:text-brand-700 dark:text-surface-100 dark:group-hover:text-brand-400 truncate">
                {tool.shortTitle}
              </p>
              <p className="mt-0.5 text-xs text-surface-500 dark:text-surface-400 truncate">
                {tool.description.split(".")[0]}.
              </p>
            </div>
            <span className="text-surface-400 group-hover:text-brand-500 dark:text-surface-500 dark:group-hover:text-brand-400 shrink-0">
              &rarr;
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
