import type { Metadata } from "next"
import { IcedPourOverCalculator } from "@/components/tools/IcedPourOverCalculator"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"

const tool = getToolBySlug("iced-pour-over-calculator")!

export const metadata: Metadata = {
  title: "Iced Pour Over Calculator â€” Japanese Iced V60 Ratio and Recipe",
  description:
    "Calculate the ratio for Japanese-style iced pour over and iced V60. Brew hot directly over ice with the correct 60/40 split so your iced coffee stays full-flavoured.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/iced-pour-over-calculator` },
  openGraph: {
    title: "Iced Pour Over Calculator",
    description: "Japanese iced V60 ratio calculator. Get the exact hot water and ice amounts for any dose â€” no watery iced coffee.",
    type: "website",
  },
}

const faqs = [
  {
    q: "What is the Japanese iced pour over method?",
    a: "The Japanese iced pour over (also called flash brew or iced V60) brews a hot coffee concentrate directly into a glass full of ice. The ice melts as the hot coffee hits it, diluting the concentrate to drinking strength and chilling it instantly. Because the chilling happens at the moment of extraction rather than after, the coffee retains its aromatics and flavour without the staleness that comes from chilling hot coffee in the fridge.",
  },
  {
    q: "What ratio do you use for iced pour over?",
    a: "The standard ratio for iced pour over is 1:15 total â€” the same total liquid as a normal pour over, split 60 percent hot water and 40 percent ice. For 20g of coffee: 180ml of hot water and 120g of ice (totalling 300ml). The hot water brews at a higher concentration than normal, and the ice dilutes and chills it simultaneously to achieve the final drinking strength.",
  },
  {
    q: "Why do you use 60% water and 40% ice?",
    a: "The 60/40 split is designed so that when the ice fully melts it equals the normal water volume for that dose. At a 1:15 ratio with 20g of coffee: normal water volume is 300ml total. Hot portion = 180ml (60%). Ice portion = 120g (40%) which melts to 120ml. Combined: 180 + 120 = 300ml â€” exactly a 1:15 cup at drinking strength and temperature. Using more ice produces a watered-down cup; less ice means the coffee is not fully chilled.",
  },
  {
    q: "Should I grind finer for iced pour over?",
    a: "Slightly finer than your regular pour over grind is recommended. Because the brewing temperature is the same but the extraction time over the ice is effectively shorter (the concentrate chills and halts extraction faster), a finer grind compensates by increasing extraction rate during the pour. If your iced pour over tastes weak or sour, grind slightly finer before adjusting anything else.",
  },
  {
    q: "Can I use Chemex or Kalita Wave for iced pour over?",
    a: "Yes â€” the same 60/40 hot-ice split applies to any pour over brewer. Chemex works particularly well because its thicker filter and slower flow rate produce a very clean, bright cup that tastes exceptional when flash-chilled. Kalita Wave also works well. V60 is the most common choice for this method because its design produces a clear, aromatic cup that highlights the cold-brew-like sweetness that flash chilling brings out.",
  },
  {
    q: "Is iced pour over the same as cold brew?",
    a: "No â€” they are very different methods. Iced pour over uses hot water for extraction (fast, bright, aromatic) with ice for instant chilling. Cold brew uses cold water for a 12 to 24 hour steep (slow, smooth, low-acid). Iced pour over produces a cup closer to regular coffee in complexity and acidity but served cold. Cold brew is inherently smoother and sweeter. Both are excellent; which to choose depends on whether you prefer bright acidity or smooth sweetness in your iced coffee.",
  },
  {
    q: "What temperature water should I use for iced pour over?",
    a: "Use the same water temperature as your regular pour over â€” 93 to 96C (200 to 205F) for light and medium roasts, 88 to 91C (190 to 195F) for dark roasts. The ice chilling happens after extraction, so temperature recommendations during brewing remain the same. Do not use cooler water thinking the ice will compensate â€” under-temperature water under-extracts and produces a sour, thin iced coffee.",
  },
]

export default function IcedPourOverCalculatorPage() {
  const relatedTools = getRelatedTools("iced-pour-over-calculator")
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
            Iced Coffee Pour Over Calculator
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Japanese iced pour over: brew hot directly over ice using the correct 60/40 split.
            Enter your coffee dose to get the exact hot water and ice amounts.
          </p>
        </div>

        <IcedPourOverCalculator />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="Iced pour over gear" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            How the iced pour over ratio works
          </h2>
          <p>
            The key insight behind iced pour over is that the total liquid â€” hot water plus melted
            ice â€” should equal the volume you would normally use for that dose. At a 1:15 ratio
            with 20g of coffee, you would normally brew with 300ml of water. For the iced version,
            you split that 300ml into 180ml of hot water (60 percent) and 120g of ice (40 percent).
            The ice melts during the pour and becomes the remaining 120ml, bringing the total back
            to 300ml â€” but now ice cold.
          </p>
          <p>
            If you use too little ice, the concentrate does not chill fully and you end up with
            warm, over-concentrated coffee that tastes flat. If you use too much ice, the coffee
            is over-diluted and watery. The 60/40 split is the calibrated balance point that
            produces a full-strength, fully chilled cup in about three minutes.
          </p>

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            Why flash-chilling preserves flavour
          </h2>
          <p>
            Hot coffee left to cool or refrigerate after brewing undergoes a process called
            staling â€” volatile aromatic compounds degrade rapidly at high temperatures over time.
            This is why fridge-cooled drip coffee tastes flat compared to freshly brewed coffee.
          </p>
          <p>
            Flash chilling â€” dropping the temperature from 94C to near 0C in seconds â€” stops
            this process before it can occur. The aromatics are locked in at the moment of
            extraction. The result is iced coffee with the brightness and complexity of freshly
            brewed pour over, which cannot be achieved by cooling hot coffee through any slower
            method.
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
