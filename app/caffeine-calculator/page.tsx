import type { Metadata } from "next"
import { CaffeineCalculator } from "@/components/tools/CaffeineCalculator"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"
import { ShareBar } from "@/components/ShareBar"

const tool = getToolBySlug("caffeine-calculator")!

export const metadata: Metadata = {
  title: "Coffee Caffeine Calculator – mg per Cup by Brew Method and Roast",
  description:
    "Estimate the caffeine in your coffee by brew method, roast level, and number of cups. Compare espresso, drip, cold brew, French press, pour over, and instant coffee.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/caffeine-calculator` },
  openGraph: {
    title: "Coffee Caffeine Calculator",
    description: "How much caffeine is in your coffee? Estimate by brew method, roast, and number of cups – with daily limit tracking.",
    type: "website",
  },
}

const faqs = [
  {
    q: "How much caffeine is in a cup of coffee?",
    a: "A standard 250ml cup of drip coffee contains approximately 95 to 120mg of caffeine on average, though this varies significantly by brew method, dose, grind size, and roast. Espresso contains around 60 to 70mg per single shot (30ml), which is less per serving than drip coffee but more per millilitre. The calculator estimates caffeine based on typical dose and extraction efficiency for each method.",
  },
  {
    q: "Does espresso have more caffeine than drip coffee?",
    a: "Per serving, no – a standard double espresso (60ml) contains roughly 120 to 130mg of caffeine, comparable to a drip coffee cup. Per millilitre, espresso has far more caffeine (around 2.5mg/ml vs 0.4mg/ml for drip). The confusion arises because espresso is consumed in much smaller volumes. If you drink a large latte with a double shot, the caffeine content is similar to one cup of drip coffee.",
  },
  {
    q: "Does roast level affect caffeine content?",
    a: "Yes, slightly. Light roast coffee contains marginally more caffeine by weight than dark roast because roasting drives out a small amount of caffeine along with moisture and CO2. However, the difference is small – approximately 5 percent more caffeine in light roast versus dark roast. The bigger variable is dose: using more coffee has a far greater effect on caffeine than roast level.",
  },
  {
    q: "Is cold brew high in caffeine?",
    a: "Cold brew concentrate is very high in caffeine per volume – roughly 200 to 250mg per 250ml of concentrate, because the high coffee-to-water ratio extracts a large total amount of caffeine over the long steep. However, concentrate is diluted 1:1 before drinking, which brings a serving to around 100 to 125mg – comparable to drip coffee. Ready-to-drink cold brew at 1:8 ratio contains about 85 to 95mg per 250ml serving.",
  },
  {
    q: "What is the FDA recommended daily caffeine limit?",
    a: "The FDA recommends no more than 400mg of caffeine per day for healthy adults, which is equivalent to approximately 3 to 4 standard cups of drip coffee. Pregnant individuals are advised to limit intake to 200mg per day. Caffeine sensitivity varies significantly between individuals – some people experience anxiety, disrupted sleep, or palpitations at much lower doses than 400mg.",
  },
  {
    q: "How much caffeine is in instant coffee?",
    a: "Instant coffee contains less caffeine than brewed coffee because it uses robusta or lower-grade beans processed differently. A standard teaspoon (1.8g) of instant coffee dissolved in 250ml of water contains approximately 60 to 80mg of caffeine, compared to 95 to 120mg for drip coffee made with 15g of ground coffee. Cafe Bustelo instant, which uses espresso-ground powder, sits toward the higher end of the instant range.",
  },
]

export default function CaffeineCalculatorPage() {
  const relatedTools = getRelatedTools("caffeine-calculator")
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
            Coffee Caffeine Calculator
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Estimate the caffeine in your coffee by brew method, roast level, and number of servings.
            Includes a daily limit tracker against the FDA recommended 400mg maximum.
          </p>
        </div>

        <CaffeineCalculator />

        <ShareBar title="Coffee Caffeine Calculator – Coffee Brew Lab" url={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/caffeine-calculator`} />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="Coffee for any caffeine need" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            How much caffeine is in your cup?
          </h2>
          <p>
            The caffeine content of coffee depends on four variables: brew method, dose, grind
            size, and roast level. Of these, dose has the largest effect – more coffee always
            means more caffeine. Brew method comes second: immersion methods like French press
            and cold brew extract a high percentage of the total caffeine from the grounds, while
            espresso's short contact time extracts less per gram but uses a dense dose in a small
            volume.
          </p>
          <p>
            Grind size affects extraction speed but not total caffeine ceiling – a finer grind
            extracts faster and may pull slightly more caffeine in the same brew time. Roast level
            has a small but real effect: light roasts retain marginally more caffeine by weight
            than dark roasts because roasting drives off some caffeine along with moisture.
          </p>

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            Why caffeine estimates are approximate
          </h2>
          <p>
            Caffeine content in coffee beans varies significantly by species (Arabica has less
            than Robusta), growing altitude, processing method, and even which part of the plant
            the bean came from. A single-origin light roast specialty Arabica may contain 25
            percent less caffeine than a supermarket dark blend that uses some Robusta. The
            estimates in this calculator use average Arabica figures – treat them as a useful
            guide rather than a precise measurement.
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
