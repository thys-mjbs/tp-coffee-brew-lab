import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { allPosts, formatDate } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Brew Guides — Coffee Ratios, Methods, and Techniques",
  description:
    "In-depth guides on coffee ratios, brew methods, and technique. Learn the golden ratio, how to dial in espresso, the best V60 recipe, French press tips, and more.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/blog` },
  openGraph: {
    title: "Brew Guides — Coffee Brew Lab",
    description: "In-depth guides on coffee ratios, brew methods, and technique.",
    type: "website",
  },
}

export default function BlogIndexPage() {
  const sorted = [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: "Guides" }]} />

      <div className="mt-6 mb-10">
        <h1 className="font-display text-3xl font-bold leading-tight text-surface-800 dark:text-surface-50 sm:text-4xl">
          Brew Guides
        </h1>
        <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
          In-depth guides on coffee ratios, brew methods, and technique. Each guide links
          directly to the relevant calculator so you can put the theory to work immediately.
        </p>
      </div>

      <div className="space-y-4">
        {sorted.map((post) => (
          <article
            key={post.slug}
            className="group rounded-2xl border border-surface-200 bg-surface-50 p-5 transition-colors hover:border-brand-300 dark:border-surface-700 dark:bg-surface-900 dark:hover:border-brand-600 sm:p-6"
          >
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                {post.category}
              </span>
              <span className="text-xs text-surface-400 dark:text-surface-500">
                {formatDate(post.publishedAt)}
              </span>
              <span className="text-xs text-surface-400 dark:text-surface-500">
                {post.readingTime} min read
              </span>
            </div>

            <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              <Link href={`/blog/${post.slug}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">
                {post.title}
              </Link>
            </h2>
            <p className="mt-1.5 text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
              {post.excerpt}
            </p>

            <Link
              href={`/blog/${post.slug}`}
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors"
              aria-label={`Read ${post.title}`}
            >
              Read guide
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
