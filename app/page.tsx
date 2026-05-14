import type { Metadata } from "next"
import { ToolCard } from "@/components/tools/ToolCard"
import { tools, getToolsByCategory } from "@/lib/tools"

export const metadata: Metadata = {
  title: "Coffee Brew Lab — Ratio Calculators and Guides for Every Method",
  description:
    "Free coffee brewing calculators and ratio guides for home baristas. French press, V60, AeroPress, espresso, cold brew, and more. No sign-up required.",
  alternates: { canonical: process.env.NEXT_PUBLIC_APP_URL },
}

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Coffee Brew Lab",
  url: appUrl,
  logo: `${appUrl}/apple-icon`,
  description: "Free coffee brewing calculators and ratio guides for every brew method.",
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", url: `${appUrl}/contact` },
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Coffee Brew Lab",
  url: appUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${appUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
}

const sections = [
  {
    heading: "Ratio Calculators",
    description: "Precise coffee-to-water ratios for every method and serving size.",
    category: "ratio" as const,
  },
  {
    heading: "Recipe Guides",
    description: "Step-by-step recipes with exact measurements for each brew method.",
    category: "recipe" as const,
  },
  {
    heading: "Brew Timers",
    description: "Guided timers that walk you through each stage of the brew.",
    category: "timer" as const,
  },
  {
    heading: "Guides and Reference",
    description: "Troubleshoot your brew and find the right grind for your equipment.",
    category: "guide" as const,
  },
  {
    heading: "Specialty Calculators",
    description: "Measurement converters, cost calculators, caffeine estimates, and more.",
    category: "calculator" as const,
  },
]

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">

        {/* Hero */}
        <div className="mb-14 max-w-2xl">
          <h1 className="font-display text-4xl font-bold leading-tight text-surface-800 dark:text-surface-50 sm:text-5xl">
            Brew better coffee.
          </h1>
          <p className="mt-4 text-lg text-surface-600 dark:text-surface-300">
            Ratio calculators and guides for every method. Free, no sign-up, runs in your browser.
          </p>
          <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">
            {tools.length} tools covering French press, V60, AeroPress, espresso, cold brew, and more.
          </p>
        </div>

        {/* Tool grid by category */}
        <div className="space-y-14">
          {sections.map((section) => {
            const sectionTools = getToolsByCategory(section.category)
            return (
              <section key={section.category} aria-labelledby={`section-${section.category}`}>
                <div className="mb-6 border-b border-surface-200 pb-4 dark:border-surface-700">
                  <h2
                    id={`section-${section.category}`}
                    className="text-lg font-semibold text-surface-800 dark:text-surface-100"
                  >
                    {section.heading}
                  </h2>
                  <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
                    {section.description}
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {sectionTools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {/* SEO body copy */}
        <div className="mt-20 border-t border-surface-200 pt-12 dark:border-surface-700">
          <div className="max-w-3xl space-y-6 text-sm leading-relaxed text-surface-600 dark:text-surface-400">
            <h2 className="text-base font-semibold text-surface-800 dark:text-surface-200">
              What is Coffee Brew Lab?
            </h2>
            <p>
              Coffee Brew Lab is a free collection of brewing calculators and method guides for home
              coffee enthusiasts. Every tool runs in your browser with no account or sign-up
              required. Enter your dose, cup size, or brewing method and get a precise ratio or
              recipe in seconds.
            </p>

            <h2 className="text-base font-semibold text-surface-800 dark:text-surface-200">
              Which brew methods are covered?
            </h2>
            <p>
              The tools cover drip and filter coffee, French press, V60 and other pour over methods,
              AeroPress, espresso, moka pot, cold brew, and instant coffee. There are also grind
              size references, a coffee troubleshooter for bitter or sour brews, and calculators for
              caffeine content and cost per cup.
            </p>

            <h2 className="text-base font-semibold text-surface-800 dark:text-surface-200">
              Are the ratios correct?
            </h2>
            <p>
              The calculators use the ratios recommended by the Specialty Coffee Association and
              widely used in the home barista community. They are starting points: brew, taste, and
              adjust. The troubleshooter helps you work out which variable to change if your first
              brew misses the mark.
            </p>
          </div>
        </div>

      </div>
    </>
  )
}
