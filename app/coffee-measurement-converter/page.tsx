import type { Metadata } from "next"
import Script from "next/script"
import { CoffeeMeasurementConverter } from "@/components/tools/CoffeeMeasurementConverter"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"

const tool = getToolBySlug("coffee-measurement-converter")!

export const metadata: Metadata = {
  title: "Coffee Measurement Converter — Grams to Tablespoons, Teaspoons, Scoops",
  description:
    "Convert coffee measurements instantly: grams to tablespoons, tablespoons to teaspoons, scoops to grams, and more. Essential for following any coffee recipe accurately.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/coffee-measurement-converter` },
  openGraph: {
    title: "Coffee Measurement Converter",
    description: "Convert grams to tablespoons, teaspoons to grams, scoops to oz — any coffee measurement unit instantly.",
    type: "website",
  },
}

const faqs = [
  {
    q: "How many grams are in a tablespoon of coffee?",
    a: "A level tablespoon of medium-ground coffee contains approximately 6 grams. This figure varies by grind size: finely ground coffee can weigh 7 to 8g per tablespoon, while coarsely ground coffee (for French press) weighs about 7g per tablespoon due to its looser packing. The converter uses 6g per tablespoon as its base, which is accurate for medium grind used in drip and filter brewing.",
  },
  {
    q: "How many tablespoons are in a coffee scoop?",
    a: "A standard coffee scoop equals 2 level tablespoons, which is approximately 12 grams of medium-ground coffee. Some manufacturers include a smaller 1-tablespoon scoop — check the size of your scoop before relying on it. The converter uses the standard 2-tablespoon (12g) scoop definition.",
  },
  {
    q: "How many grams are in a teaspoon of ground coffee?",
    a: "A level teaspoon of medium-ground coffee contains approximately 2 grams. Finer grinds pack more tightly and may weigh 2.5g per teaspoon. Coarser grinds weigh less at around 1.8g per teaspoon. Teaspoons are an imprecise unit for ground coffee — tablespoons or grams are more reliable for consistent brewing.",
  },
  {
    q: "How do I convert tablespoons of coffee to grams?",
    a: "Multiply the number of tablespoons by 6 to get grams (for medium-ground coffee). For example: 3 tablespoons x 6g = 18g. For a coarse grind, use 7g per tablespoon; for fine grind, use 7 to 8g. The converter on this page handles this automatically — select Tablespoons, enter your amount, and it shows the gram equivalent alongside other units.",
  },
  {
    q: "How many grams are in an ounce of coffee?",
    a: "There are approximately 28.35 grams in one ounce. For coffee, 1oz of ground coffee is roughly 4.7 tablespoons or 2.4 standard scoops at medium grind. If a recipe specifies ounces, select Ounces in the converter and enter the amount to get the gram, tablespoon, and scoop equivalents instantly.",
  },
  {
    q: "Why is it better to measure coffee by weight than by volume?",
    a: "Ground coffee density changes dramatically with grind size and roast level. A tablespoon of espresso-fine coffee can weigh twice as much as a tablespoon of coarsely ground coffee. A dark roast also weighs slightly less per tablespoon than a light roast because the roasting process drives out moisture and expands the bean structure. Weighing in grams eliminates all these variables and produces consistent results every time.",
  },
]

export default function CoffeeMeasurementConverterPage() {
  const relatedTools = getRelatedTools("coffee-measurement-converter")
  const appSchema    = webApplicationSchema({ name: tool.title, description: tool.description, slug: tool.slug })
  const faqData      = faqSchema(faqs)

  return (
    <>
      <Script id="schema-webapp" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(appSchema)}
      </Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(faqData)}
      </Script>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Breadcrumb items={[{ label: tool.shortTitle }]} />

        <div className="mt-6 mb-8">
          <h1 className="font-display text-3xl font-bold leading-tight text-surface-800 dark:text-surface-50 sm:text-4xl">
            Coffee Measurement Converter
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Convert any coffee measurement to any other unit instantly. Grams to tablespoons,
            tablespoons to teaspoons, scoops to ounces — select your starting unit and enter the
            amount.
          </p>
        </div>

        <CoffeeMeasurementConverter />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="Make measuring easier" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            How many grams in a tablespoon of ground coffee?
          </h2>
          <p>
            The standard conversion is 6 grams per level tablespoon for medium-ground coffee.
            This is the figure used in most brewing guides and by the Specialty Coffee Association
            for drip coffee references. It holds well for any brew method that uses a medium
            grind — drip machines, Chemex, Kalita Wave, Aeropress at a medium-coarse setting.
          </p>
          <p>
            For coarser grinds (French press, cold brew), expect around 7g per tablespoon because
            the larger particles are less dense when packed into a spoon. For fine grinds (moka
            pot, espresso), each tablespoon holds 7 to 8g. If you are following a recipe that
            specifies a particular grind size, this distinction matters — a tablespoon of espresso
            grind adds significantly more coffee than a tablespoon of filter grind.
          </p>

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            Standard scoop, tablespoon, and teaspoon reference
          </h2>

          <div className="overflow-x-auto rounded-xl border border-surface-200 dark:border-surface-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200 bg-surface-100 dark:border-surface-700 dark:bg-surface-800">
                  <th className="px-4 py-3 text-left font-semibold text-surface-700 dark:text-surface-200">Unit</th>
                  <th className="px-4 py-3 text-left font-semibold text-surface-700 dark:text-surface-200">Grams</th>
                  <th className="px-4 py-3 text-left font-semibold text-surface-700 dark:text-surface-200">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                {[
                  ["1 teaspoon", "≈ 2g", "3 per tablespoon"],
                  ["1 tablespoon", "≈ 6g", "Standard for medium grind"],
                  ["1 scoop (2 tbsp)", "≈ 12g", "Most included scoops"],
                  ["1 ounce", "28.35g", "About 4.7 tablespoons"],
                ].map(([unit, grams, note]) => (
                  <tr key={unit} className="bg-white dark:bg-surface-900">
                    <td className="px-4 py-3 font-mono text-surface-800 dark:text-surface-100">{unit}</td>
                    <td className="px-4 py-3 font-mono font-semibold text-brand-700 dark:text-brand-400">{grams}</td>
                    <td className="px-4 py-3 text-surface-500 dark:text-surface-400">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
            When to use grams instead of tablespoons
          </h3>
          <p>
            If you are brewing the same recipe repeatedly and want consistent results, grams are
            more reliable. A basic kitchen scale costs very little and removes all uncertainty about
            grind density, settling, and whether your spoon is level or heaped. Tablespoons and
            scoops remain useful when you are away from home, following a quick guideline, or do
            not own a scale — this converter gives you the equivalent in both so you are never
            stuck.
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
