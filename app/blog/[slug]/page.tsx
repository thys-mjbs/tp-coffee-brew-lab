import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import Link from "next/link"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { allPosts, getPostBySlug, formatDate } from "@/lib/blog"
import { getToolBySlug } from "@/lib/tools"
import { blogPostingSchema } from "@/lib/schema"

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
    },
  }
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const { Content } = post
  const schema = blogPostingSchema({ title: post.title, description: post.description, publishedAt: post.publishedAt, slug: post.slug })

  const relatedTools = post.relatedToolSlugs
    .map((s) => getToolBySlug(s))
    .filter((t): t is NonNullable<typeof t> => t !== undefined)

  return (
    <>
      <Script id="schema-blog" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(schema)}
      </Script>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Breadcrumb items={[{ label: "Guides", href: "/blog" }, { label: post.title }]} />

        <header className="mt-6 mb-10">
          <div className="mb-3 flex flex-wrap items-center gap-3">
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

          <h1 className="font-display text-3xl font-bold leading-tight text-surface-800 dark:text-surface-50 sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        <article className="prose-blog space-y-5 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">
          <Content />
        </article>

        {relatedTools.length > 0 && (
          <div className="mt-12">
            <RelatedTools tools={relatedTools} />
          </div>
        )}

        <div className="mt-10 pt-8 border-t border-surface-200 dark:border-surface-700">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-surface-500 hover:text-brand-600 dark:text-surface-400 dark:hover:text-brand-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
            All guides
          </Link>
        </div>
      </div>
    </>
  )
}
