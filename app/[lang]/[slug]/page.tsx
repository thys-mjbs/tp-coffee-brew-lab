import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { ToolRenderer } from "@/components/tools/ToolRenderer"
import { getRelatedTools } from "@/lib/tools"
import { faqSchema, breadcrumbSchema } from "@/lib/schema"
import { getAllI18nParams, getI18nVariant } from "@/lib/i18nVariants"
import { ShareBar } from "@/components/ShareBar"

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"

const langLabels: Record<string, string> = {
  es: "Español",
  pt: "Português",
  fr: "Français",
}

export function generateStaticParams() {
  return getAllI18nParams()
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string; slug: string }> }
): Promise<Metadata> {
  const { lang, slug } = await params
  const variant = getI18nVariant(lang, slug)
  if (!variant) return {}

  const enUrl = `${appUrl}/${slug}`
  const thisUrl = `${appUrl}/${lang}/${slug}`

  return {
    title: variant.metaTitle,
    description: variant.metaDescription,
    alternates: {
      canonical: thisUrl,
      languages: { en: enUrl, [lang]: thisUrl },
    },
    openGraph: {
      title: variant.metaTitle,
      description: variant.metaDescription,
      type: "website",
    },
  }
}

export default async function LangToolPage(
  { params }: { params: Promise<{ lang: string; slug: string }> }
) {
  const { lang, slug } = await params
  const variant = getI18nVariant(lang, slug)
  if (!variant) notFound()

  const relatedTools = getRelatedTools(slug)
  const faqSchemaData = faqSchema(variant.faqs)
  const bcSchema = breadcrumbSchema([{ name: variant.h1 }])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Breadcrumb items={[{ label: variant.h1 }]} />

        <div className="mt-6 mb-8">
          <div className="mb-3">
            <span className="rounded-full bg-surface-100 dark:bg-surface-800 px-2.5 py-0.5 text-xs font-medium text-surface-600 dark:text-surface-300">
              {langLabels[lang] ?? lang.toUpperCase()}
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold leading-tight text-surface-800 dark:text-surface-50 sm:text-4xl">
            {variant.h1}
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            {variant.excerpt}
          </p>
        </div>

        <ToolRenderer slug={slug} />

        <ShareBar title={`${variant.h1} – Coffee Brew Lab`} url={`${appUrl}/${lang}/${slug}`} />

        <section className="mt-12 space-y-6">
          <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
            {lang === "es" ? "Preguntas frecuentes" : lang === "pt" ? "Perguntas frequentes" : "Questions fréquentes"}
          </h2>
          {variant.faqs.map((faq) => (
            <div key={faq.q} className="space-y-1.5">
              <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-100">{faq.q}</h3>
              <p className="text-sm text-surface-600 dark:text-surface-300 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </section>

        {relatedTools.length > 0 && (
          <div className="mt-12">
            <RelatedTools tools={relatedTools} />
          </div>
        )}

        <div className="mt-10 pt-8 border-t border-surface-200 dark:border-surface-700">
          <Link
            href={`/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-surface-500 hover:text-brand-600 dark:text-surface-400 dark:hover:text-brand-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
            English version
          </Link>
        </div>
      </div>
    </>
  )
}
