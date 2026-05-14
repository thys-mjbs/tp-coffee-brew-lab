import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { getRelatedTools } from "@/lib/tools"
import { faqSchema, breadcrumbSchema } from "@/lib/schema"
import { servingVariants, getServingVariant } from "@/lib/servingVariants"

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"

export function generateStaticParams() {
  return servingVariants.map((v) => ({ serving: v.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ serving: string }> }
): Promise<Metadata> {
  const { serving } = await params
  const variant = getServingVariant(serving)
  if (!variant) return {}
  return {
    title: variant.metaTitle,
    description: variant.metaDescription,
    alternates: { canonical: `${appUrl}/coffee-ratio/${serving}` },
    openGraph: {
      title: variant.metaTitle,
      description: variant.metaDescription,
      type: "website",
    },
  }
}

export default async function ServingVariantPage(
  { params }: { params: Promise<{ serving: string }> }
) {
  const { serving } = await params
  const variant = getServingVariant(serving)
  if (!variant) notFound()

  const relatedTools = getRelatedTools("coffee-ratio-calculator")

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: variant.metaTitle,
    description: variant.metaDescription,
    url: `${appUrl}/coffee-ratio/${serving}`,
  }
  const faqSchemaData = faqSchema(variant.faqs)
  const bcSchema = breadcrumbSchema([
    { name: "Ratio Calculator", href: "/coffee-ratio-calculator" },
    { name: variant.cupLabel },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }} />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Breadcrumb
          items={[
            { label: "Ratio Calculator", href: "/coffee-ratio-calculator" },
            { label: variant.cupLabel },
          ]}
        />

        <div className="mt-6 mb-8">
          <h1 className="font-display text-3xl font-bold leading-tight text-surface-800 dark:text-surface-50 sm:text-4xl">
            {variant.h1}
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            {variant.excerpt}
          </p>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
            Serving size: <span className="font-medium">{variant.cupLabel}</span>{" "}
            <span className="text-surface-400 dark:text-surface-500">{variant.sizeNote}</span>
          </p>
        </div>

        {/* Quick-reference table */}
        <div className="rounded-2xl border border-surface-200 dark:border-surface-700 overflow-hidden mb-10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-50 dark:bg-surface-800 text-left">
                <th className="px-4 py-3 font-semibold text-surface-700 dark:text-surface-200">Strength</th>
                <th className="px-4 py-3 font-semibold text-surface-700 dark:text-surface-200">Ratio</th>
                <th className="px-4 py-3 font-semibold text-surface-700 dark:text-surface-200">Grams</th>
                <th className="px-4 py-3 font-semibold text-surface-700 dark:text-surface-200">Tablespoons</th>
                <th className="px-4 py-3 font-semibold text-surface-700 dark:text-surface-200">Scoops</th>
              </tr>
            </thead>
            <tbody>
              {variant.rows.map((row) => (
                <tr
                  key={row.label}
                  className={`border-t border-surface-200 dark:border-surface-700 ${
                    row.label === "Medium"
                      ? "bg-brand-50 dark:bg-brand-950"
                      : ""
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-surface-800 dark:text-surface-100">
                    {row.label}
                    {row.label === "Medium" && (
                      <span className="ml-2 text-xs font-normal text-brand-600 dark:text-brand-400">
                        recommended
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-surface-600 dark:text-surface-300">
                    {row.ratio}
                  </td>
                  <td className="px-4 py-3 font-mono font-semibold text-surface-800 dark:text-surface-100">
                    {row.grams}g
                  </td>
                  <td className="px-4 py-3 font-mono text-surface-800 dark:text-surface-100">
                    {row.tablespoons} tbsp
                  </td>
                  <td className="px-4 py-3 font-mono text-surface-800 dark:text-surface-100">
                    {row.scoops}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Callout to main calculator */}
        <div className="rounded-2xl bg-brand-50 dark:bg-brand-950 border border-brand-200 dark:border-brand-800 p-5 mb-10 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold text-brand-800 dark:text-brand-200">
              Need a different cup size or strength?
            </p>
            <p className="mt-0.5 text-sm text-brand-700 dark:text-brand-300">
              The full calculator lets you enter any number of cups, pick your cup size (mug, coffee
              maker, or custom), and adjust strength instantly.
            </p>
          </div>
          <Link
            href="/coffee-ratio-calculator"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
          >
            Open Calculator
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
            Frequently asked questions
          </h2>
          {variant.faqs.map((faq) => (
            <div key={faq.q} className="space-y-1.5">
              <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-100">
                {faq.q}
              </h3>
              <p className="text-sm text-surface-600 dark:text-surface-300 leading-relaxed">
                {faq.a}
              </p>
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
            href="/coffee-ratio-calculator"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-surface-500 hover:text-brand-600 dark:text-surface-400 dark:hover:text-brand-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Ratio Calculator
          </Link>
        </div>
      </div>
    </>
  )
}
