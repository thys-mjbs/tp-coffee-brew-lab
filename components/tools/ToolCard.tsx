import Link from "next/link"
import type { Tool } from "@/lib/tools"

const categoryStyles: Record<Tool["category"], { label: string; dot: string }> = {
  ratio:      { label: "Ratio",      dot: "bg-brand-500" },
  recipe:     { label: "Recipe",     dot: "bg-green-400" },
  timer:      { label: "Timer",      dot: "bg-green-600" },
  guide:      { label: "Guide",      dot: "bg-brand-700" },
  calculator: { label: "Calculator", dot: "bg-brand-400" },
}

interface ToolCardProps {
  tool: Tool
}

export function ToolCard({ tool }: ToolCardProps) {
  const style = categoryStyles[tool.category]

  return (
    <Link
      href={`/${tool.slug}`}
      className="group flex flex-col rounded-xl border border-surface-200 bg-surface-50 p-5 transition-all hover:border-brand-500 hover:shadow-md dark:border-surface-700 dark:bg-surface-900 dark:hover:border-brand-500"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${style.dot}`} aria-hidden="true" />
        <span className="text-xs font-medium uppercase tracking-widest text-surface-500 dark:text-surface-400">
          {style.label}
        </span>
      </div>

      <h3 className="text-sm font-semibold leading-snug text-surface-800 group-hover:text-brand-700 dark:text-surface-100 dark:group-hover:text-brand-400">
        {tool.shortTitle}
      </h3>

      <p className="mt-2 flex-1 text-xs leading-relaxed text-surface-500 dark:text-surface-400">
        {tool.description.split(".")[0]}.
      </p>

      <span className="mt-4 text-xs font-medium text-brand-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-brand-400">
        Open tool &rarr;
      </span>
    </Link>
  )
}
