import type { Metadata } from "next"
import { InstantCoffeeCalculator } from "@/components/tools/InstantCoffeeCalculator"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"
import { ShareBar } from "@/components/ShareBar"

const tool = getToolBySlug("instant-coffee-calculator")!

export const metadata: Metadata = {
  title: "Instant Coffee Calculator – Teaspoons and Grams per Cup",
  description:
    "How many teaspoons or grams of instant coffee per cup? Enter your cup size, strength, and brand to get the exact measurement. Covers Nescafe, Cafe Bustelo, and Folgers.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/instant-coffee-calculator` },
  openGraph: {
    title: "Instant Coffee Calculator",
    description: "How many teaspoons of instant coffee per cup? Get the exact amount for any brand, cup size, and strength.",
    type: "website",
  },
}

const faqs = [
  {
    q: "How many teaspoons of instant coffee do I use per cup?",
    a: "For a standard 250ml cup at medium strength, use 1.5 to 2 level teaspoons of instant coffee. At mild strength, 1 to 1.5 teaspoons is enough. For a strong cup, use 2.5 to 3 teaspoons. Always use level spoonfuls, not heaped – a heaped teaspoon can hold up to twice as much coffee as a level one, making results inconsistent.",
  },
  {
    q: "How much instant coffee do I use for a large 480ml mug?",
    a: "For a large 480ml mug at medium strength, you need about 3 to 4 teaspoons (5.8g) of instant coffee. For a mild mug, use 2 to 2.5 teaspoons (3.8g). Use the calculator above and select the Big Mug size to get the exact amount for your preferred strength and brand.",
  },
  {
    q: "Is Cafe Bustelo different from regular instant coffee?",
    a: "Yes. Cafe Bustelo is an espresso-style instant coffee with a denser grind than regular granule-style instant coffee. A level teaspoon of Cafe Bustelo weighs approximately 2.2g, compared to 1.8g for standard instant coffee. The calculator accounts for this difference so your measurement is accurate for the brand you use.",
  },
  {
    q: "What is the ratio for instant coffee to water?",
    a: "Instant coffee dissolves completely in water rather than being filtered, so ratios work differently than ground coffee. A medium-strength instant coffee uses approximately 1.2g of instant powder per 100ml of water. For 250ml, that is 3g – about 1.7 level teaspoons of standard instant coffee. This is equivalent to a roughly 1:83 ratio by weight, much weaker than brewed coffee by mass because instant coffee is highly concentrated before drying.",
  },
  {
    q: "Should I use boiling water for instant coffee?",
    a: "Just off the boil is ideal – around 90 to 96C (194 to 205F). Boiling water directly from the kettle (100C) can make instant coffee taste slightly bitter. Let it rest for 30 seconds after boiling. Cold water will not dissolve instant coffee granules properly, producing a gritty or uneven cup.",
  },
  {
    q: "How many grams of instant coffee are in a teaspoon?",
    a: "A level teaspoon of standard instant coffee granules (Nescafe Classic, generic brands) contains approximately 1.8g. Cafe Bustelo contains about 2.2g per level teaspoon due to its denser espresso-ground powder. Folgers instant crystals contain approximately 1.7g per level teaspoon. These are averages – actual density can vary between batches and how settled the container is.",
  },
  {
    q: "Can I make iced instant coffee?",
    a: "Yes. Brew your instant coffee at double strength (double the amount of coffee, same water volume), then pour over ice. The ice dilutes the brew back to a regular strength as it melts. For a 250ml iced drink, brew with 150ml of hot water at double strength, then add 100ml of ice. The calculator is designed for hot coffee – double the result and halve the water volume for an iced version.",
  },
]

export default function InstantCoffeeCalculatorPage() {
  const relatedTools = getRelatedTools("instant-coffee-calculator")
  const appSchema    = webApplicationSchema({ name: tool.title, description: tool.description, slug: tool.slug })
  const faqData      = faqSchema(faqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Breadcrumb items={[{ label: tool.shortTitle }]} />

        <div className="mt-6 mb-8">
          <h1 className="font-display text-3xl font-bold leading-tight text-surface-800 dark:text-surface-50 sm:text-4xl">
            Instant Coffee Calculator
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Select your cup size, strength, and brand to get the exact teaspoon and gram measurement
            for your instant coffee. Covers Nescafe, Cafe Bustelo, Folgers, and generic brands.
          </p>
        </div>

        <InstantCoffeeCalculator />

        <ShareBar title="Instant Coffee Calculator – Coffee Brew Lab" url={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/instant-coffee-calculator`} />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="Instant coffee and accessories" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            How many teaspoons of instant coffee per cup?
          </h2>
          <p>
            Most instant coffee packaging says "1 to 2 teaspoons per cup," which is too vague to be
            useful – that range covers the difference between mild and very strong. The exact amount
            depends on three things: the size of your cup, how strong you want it, and the density
            of the brand you use. A standard 250ml cup of medium-strength Nescafe takes 1.7 level
            teaspoons (3g). That same cup with Cafe Bustelo needs slightly less volume (1.4 teaspoons)
            because Bustelo's espresso-ground powder is denser.
          </p>
          <p>
            The most important word in "one teaspoon" is <em>level</em>. A heaped teaspoon holds
            roughly twice as much as a level one. If your instant coffee consistently tastes too
            strong or too weak even when you follow instructions, the likely cause is heaped versus
            level measuring rather than the amount itself.
          </p>

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            Does brand affect how much you use?
          </h2>
          <p>
            Yes, meaningfully. Instant coffee comes in two main forms: granules (freeze-dried
            crystals like Nescafe Classic or Folgers) and fine powder (like Cafe Bustelo, which is
            ground espresso then dried). Fine powder packs more tightly into a teaspoon, so the
            same volume delivers more coffee. This is why Bustelo tastes stronger than Nescafe at
            the same number of teaspoons. The calculator adjusts the gram measurement based on the
            brand you select so you always get an accurate dose.
          </p>

          <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
            Water temperature matters more than it seems
          </h3>
          <p>
            Instant coffee is pre-extracted and dried, so it dissolves readily. But extremely hot
            water (a full rolling boil at 100C) can over-extract residual compounds and produce
            a sharp, slightly bitter edge. Water at 90 to 96C gives a cleaner, more rounded cup.
            If your kettle has a temperature setting, use the 90C or 95C option. If not, let
            boiling water sit for 30 to 45 seconds before pouring.
          </p>

        </article>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100 mb-6">
            Frequently asked questions
          </h2>
          <div className="space-y-5">
            {faqs.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-surface-200 bg-surface-50 p-5 dark:border-surface-700 dark:bg-surface-900">
                <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-100 mb-2">{q}</h3>
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12">
          <RelatedTools tools={relatedTools} />
        </div>
      </div>
    </>
  )
}
