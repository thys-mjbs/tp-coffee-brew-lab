import type { Metadata } from "next"
import { CoffeeBloomTimer } from "@/components/tools/CoffeeBloomTimer"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"

const tool = getToolBySlug("coffee-bloom-timer")!

export const metadata: Metadata = {
  title: "Coffee Bloom Timer â€” Pre-Infusion Countdown for Pour Over and AeroPress",
  description:
    "A dedicated bloom timer for coffee pre-infusion. Set 30, 45, or 60 seconds, press Start, and get an alert when your bloom is done. Works for V60, Chemex, Kalita, and AeroPress.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/coffee-bloom-timer` },
  openGraph: {
    title: "Coffee Bloom Timer",
    description: "Pre-infusion bloom countdown for V60, Chemex, Kalita, and AeroPress. 30, 45, or 60 second presets.",
    type: "website",
  },
}

const faqs = [
  {
    q: "What is a coffee bloom and why does it matter?",
    a: "The bloom (also called pre-infusion) is a short pour of hot water over freshly ground coffee before the main brew begins. The water triggers a release of CO2 gas trapped in the grounds from the roasting process â€” visible as bubbling or a rising crust on the coffee surface. Releasing this CO2 before the main pour improves extraction consistency, because CO2 repels water and causes uneven saturation if not released first.",
  },
  {
    q: "How long should the bloom be?",
    a: "Thirty seconds is the standard minimum bloom time for most pour over methods. Forty-five seconds is recommended for fresh specialty beans, which release more CO2. Sixty seconds is useful for very fresh light roasts where the bloom is particularly active. For supermarket coffee or beans roasted more than three weeks ago, thirty seconds is usually sufficient because less CO2 remains in the grounds.",
  },
  {
    q: "How much water do I use for the bloom?",
    a: "Use two to three times the weight of your coffee in water for the bloom pour. For 20g of coffee: 40 to 60ml of water. The goal is to saturate all the grounds without causing water to drain through immediately. Pour in a steady spiral from the centre outward, covering all the grounds evenly. If your bloom drains straight through before the 30 seconds is up, your grind may be too coarse.",
  },
  {
    q: "Does AeroPress need a bloom?",
    a: "A bloom is optional for AeroPress but does improve extraction consistency, especially with fresh beans. Add water equal to twice the coffee weight, stir gently, and wait 30 seconds before filling the chamber. The James Hoffmann AeroPress method skips the bloom intentionally â€” all water is added at once without stirring, which produces very uniform saturation through a different mechanism.",
  },
  {
    q: "What does a good bloom look like?",
    a: "A good bloom shows visible bubbling or a gentle rising of the coffee bed as CO2 escapes. Very fresh beans (within two weeks of roast) may bubble vigorously â€” this is normal and desirable. Older beans bloom less noticeably. If you see almost no bloom activity with beans less than four weeks old, the grind may be too fine (preventing gas escape) or the water may not be hot enough.",
  },
  {
    q: "Can I skip the bloom?",
    a: "You can brew without a bloom and the coffee will still be drinkable, but you may notice uneven extraction â€” some grounds are under-extracted while others are over-extracted, producing a cup that is simultaneously weak and bitter. The 30 to 45 seconds the bloom takes is small relative to the total brew time and consistently improves the result for most pour over methods.",
  },
]

export default function CoffeeBloomTimerPage() {
  const relatedTools = getRelatedTools("coffee-bloom-timer")
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
            Coffee Bloom Timer
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Select your bloom duration, press Start, and continue your pour when the timer ends.
            Works for V60, Chemex, Kalita Wave, and AeroPress.
          </p>
        </div>

        <CoffeeBloomTimer />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="Pour over essentials" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">Why the bloom improves your pour over</h2>
          <p>
            CO2 is produced during coffee roasting and stays trapped in the bean's cellular
            structure. When you grind and brew, hot water releases this gas. If it escapes during
            the main brew pour, it creates bubbles that push water away from some grounds and cause
            channelling â€” water finds the path of least resistance rather than flowing evenly
            through the entire coffee bed.
          </p>
          <p>
            The bloom gives the CO2 a controlled exit before the main pour begins. After 30 to
            45 seconds, most of the gas has escaped and the grounds are evenly saturated, ready
            to extract consistently when you add the remaining water.
          </p>
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">Fresh beans bloom more</h2>
          <p>
            Freshly roasted beans â€” within one to two weeks of the roast date â€” contain the most
            CO2 and produce the most visible bloom. If your beans are more than a month old, the
            bloom may be barely noticeable. This is one of the visible indicators of freshness:
            a vigorous bloom means you are working with fresh coffee that will extract its
            flavour more completely.
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
