import type { Metadata } from "next"
import { EspressoRatioCalculator } from "@/components/tools/EspressoRatioCalculator"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"

const tool = getToolBySlug("espresso-ratio-calculator")!

export const metadata: Metadata = {
  title: "Espresso Ratio Calculator â€” Dose and Yield for Espresso, Ristretto, and Lungo",
  description:
    "Calculate espresso dose and yield for espresso (1:2), ristretto (1:1), lungo (1:3), and custom ratios. Enter your dose to get your target yield in grams.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/espresso-ratio-calculator` },
  openGraph: {
    title: "Espresso Ratio Calculator",
    description: "Espresso dose to yield calculator. Get your target weight for ristretto, espresso, lungo, or any custom ratio.",
    type: "website",
  },
}

const faqs = [
  {
    q: "What is the standard espresso ratio?",
    a: "The standard espresso ratio is 1:2 â€” 1g of ground coffee in (dose) to 2g of liquid espresso out (yield). For an 18g dose, the target yield is 36g. This ratio produces the balanced extraction that defines classic espresso: concentrated, syrupy, with a thin layer of crema. The 1:2 ratio is the starting point for most specialty espresso bars worldwide.",
  },
  {
    q: "What is the difference between a ristretto and an espresso?",
    a: "A ristretto uses a 1:1 ratio â€” the yield equals the dose weight. An 18g dose produces 18g of yield (approximately 18ml). Because less water passes through the grounds, a ristretto extracts the most soluble, sweetest compounds first and stops before the more bitter, astringent compounds extract. The result is a shorter, sweeter, more intense shot. Flat whites are often made with a double ristretto base.",
  },
  {
    q: "What is a lungo and how does its ratio differ?",
    a: "A lungo uses a 1:3 ratio â€” three times the dose weight in yield. An 18g dose produces 54g of yield. More water passes through the puck, extracting more compounds including some that contribute bitterness and higher caffeine. A lungo is not simply a diluted espresso â€” it is a distinct extraction with a different flavour profile: lighter, more bitter, and higher caffeine per serving than a standard shot.",
  },
  {
    q: "How do I measure espresso yield?",
    a: "Place a small scale under your portafilter or cup before pulling the shot. Zero the scale, start the shot, and watch the weight climb. Stop the pump when the scale reads your target yield â€” for an 18g dose at 1:2, that is 36g. This is more accurate than measuring by volume because crema density varies and distorts volume readings. Most espresso scales have a timer built in so you can track shot time simultaneously.",
  },
  {
    q: "What dose should I use for a double espresso?",
    a: "Most double basket portafilters hold 18 to 20g of ground coffee, which is the standard range for a double shot. Some larger baskets support up to 22g for a more concentrated result. Single shot baskets typically hold 7 to 9g. The dose you use should fill the basket evenly without mounding or underfilling â€” the basket size is your physical constraint, and the ratio determines your yield target from that dose.",
  },
  {
    q: "Should espresso yield be measured in grams or millilitres?",
    a: "Grams is the correct unit for espresso yield. Espresso has varying crema density â€” 1ml of espresso does not consistently equal 1g because crema is mostly air. Measuring in grams on a scale gives consistent, repeatable results. For practical purposes, 1g of liquid espresso is approximately 1ml of the liquid portion, so conversions are close but not exact.",
  },
  {
    q: "How long should an espresso shot take?",
    a: "A standard espresso shot at 1:2 ratio should take 25 to 35 seconds from the moment water first contacts the puck. A ristretto may take 20 to 30 seconds; a lungo typically runs 35 to 45 seconds. Shot time is a calibration signal â€” if your shot runs too fast (under 20 seconds), grind finer. Too slow (over 45 seconds), grind coarser. Adjust grind before changing dose or yield.",
  },
]

export default function EspressoRatioCalculatorPage() {
  const relatedTools = getRelatedTools("espresso-ratio-calculator")
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
            Espresso Ratio Calculator
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Calculate your espresso yield target for ristretto (1:1), espresso (1:2), lungo (1:3),
            or any custom ratio. Enter your dose to get the exact weight to stop your shot.
          </p>
        </div>

        <EspressoRatioCalculator />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="Espresso gear worth the investment" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            Understanding espresso dose and yield
          </h2>
          <p>
            Every espresso shot has two weights: the dose (ground coffee in the portafilter) and
            the yield (liquid espresso in the cup). The ratio between them determines the character
            of the shot. A 1:2 ratio is the industry standard for balanced espresso. Dropping to
            1:1 produces a shorter, sweeter, more intense ristretto. Stretching to 1:3 produces a
            longer, more caffeinated, slightly bitter lungo.
          </p>
          <p>
            The ratio does not tell you how long the shot takes â€” that is controlled by grind
            size. Two shots with the same 18g dose and 36g yield can have very different shot
            times and flavour profiles depending on how finely the coffee is ground. Ratio and
            grind size are separate dials that work together: ratio sets the target, grind size
            calibrates the speed to hit that target in the right time window.
          </p>

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            Why grams beat millilitres for espresso
          </h2>
          <p>
            Espresso yield is almost always measured in grams rather than millilitres. The reason
            is crema: the foam layer on top of a fresh espresso is mostly CO2 and has a very low
            density. The same shot pulled on different days with slightly different freshness
            levels produces different crema volumes, so a volume measurement is inconsistent.
            A scale under the cup gives the same reliable number regardless of how much crema
            forms, making weight the only way to reliably hit your target ratio.
          </p>

        </article>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100 mb-6">Frequently asked questions</h2>
          <div className="space-y-5">
            {faqs.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-surface-200 bg-surface-50 p-5 dark:border-surface-700 dark:bg-surface-900">
                <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-100 mb-2">{q}</h3>
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12"><RelatedTools tools={relatedTools} /></div>
      </div>
    </>
  )
}
