import type { Metadata } from "next"
import { ColdBrewRatioCalculator } from "@/components/tools/ColdBrewRatioCalculator"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"
import { ShareBar } from "@/components/ShareBar"

const tool = getToolBySlug("cold-brew-ratio-calculator")!

export const metadata: Metadata = {
  title: "Cold Brew Ratio Calculator â€” Concentrate and Ready-to-Drink",
  description:
    "Calculate the right coffee-to-water ratio for cold brew. Choose concentrate (1:4) or ready-to-drink (1:8), enter your water amount, and get the exact coffee dose.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/cold-brew-ratio-calculator` },
  openGraph: {
    title: "Cold Brew Ratio Calculator",
    description: "Cold brew concentrate or ready-to-drink ratio calculator. Get grams and tablespoons for any batch size.",
    type: "website",
  },
}

const faqs = [
  {
    q: "What is the best ratio for cold brew coffee?",
    a: "There are two standard cold brew ratios depending on how you plan to drink it. For a concentrate (to be diluted before drinking): 1:4 â€” 1g of coffee per 4ml of water, or 250g per litre. For ready-to-drink cold brew: 1:8 â€” 1g of coffee per 8ml of water, or 125g per litre. The concentrate is stronger and keeps longer; it is diluted 50/50 with water, milk, or oat milk before serving.",
  },
  {
    q: "How long should cold brew steep?",
    a: "Twelve to twenty-four hours in the refrigerator is the standard range. Twelve hours produces a lighter, slightly brighter cup. Twenty to twenty-four hours gives a richer, heavier body. Do not steep at room temperature for more than twelve hours â€” the warmer environment accelerates extraction and can produce sour or fermented off-notes. Always steep cold brew in the refrigerator.",
  },
  {
    q: "What grind size is best for cold brew?",
    a: "Coarse grind â€” similar to coarse sea salt or raw sugar â€” is ideal for cold brew. Cold water extracts coffee much more slowly than hot water, so the extended steep time compensates for the coarser grind. A finer grind increases surface area and can lead to over-extraction after 12 to 24 hours, producing a bitter or astringent result. It also makes the final strain much harder.",
  },
  {
    q: "Can I make cold brew in a French press?",
    a: "Yes â€” a French press works very well for cold brew. Add your coarsely ground coffee and cold water, stir to combine, and place the lid on top without pressing the plunger down. Refrigerate for 12 to 24 hours, then slowly press and pour. For the clearest result, pour through a paper filter after pressing to catch any fine particles that passed through the metal mesh.",
  },
  {
    q: "How long does cold brew last in the fridge?",
    a: "Cold brew concentrate keeps for up to two weeks in a sealed container in the refrigerator. Ready-to-drink cold brew (already diluted) is best within 10 days. The lower acidity of cold brew compared to hot coffee gives it a naturally longer shelf life. If the flavour turns flat or sour before then, the batch was likely over-extracted or the container was not fully sealed.",
  },
  {
    q: "How do you dilute cold brew concentrate?",
    a: "Dilute cold brew concentrate in a 1:1 ratio with water, milk, oat milk, or any preferred liquid. For a 250ml glass, use 125ml of concentrate and 125ml of your chosen diluent. Adjust to taste â€” some prefer a stronger 2:1 concentrate-to-water ratio, others a lighter 1:2. Diluting with milk rather than water adds sweetness and body without sugar.",
  },
  {
    q: "Is cold brew stronger than regular coffee?",
    a: "Cold brew concentrate is significantly stronger than regular drip coffee by caffeine content per volume â€” roughly 2 to 2.5 times more concentrated. However, once diluted 1:1 before drinking, a standard serving of cold brew has a similar caffeine content to drip coffee. Ready-to-drink cold brew at 1:8 is slightly weaker than standard drip. The flavour profile is smoother and less acidic regardless of caffeine level.",
  },
]

export default function ColdBrewRatioCalculatorPage() {
  const relatedTools = getRelatedTools("cold-brew-ratio-calculator")
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
            Cold Brew Ratio Calculator
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Choose concentrate or ready-to-drink, select your equipment, enter your water amount,
            and get the exact coffee dose in grams and tablespoons.
          </p>
        </div>

        <ColdBrewRatioCalculator />

        <ShareBar title="Cold Brew Ratio Calculator — Coffee Brew Lab" url={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/cold-brew-ratio-calculator`} />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="Cold brew equipment" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            Concentrate vs. ready-to-drink cold brew
          </h2>
          <p>
            The main choice in cold brew is how strong to make the initial batch. A 1:4
            concentrate uses four times more coffee per litre than ready-to-drink cold brew, but
            it is diluted before drinking â€” typically 50/50 with water or milk. This approach
            takes up less space in the fridge, keeps longer, and gives you flexibility at serving
            time. A 1:8 ready-to-drink batch is brewed at drinking strength and poured straight
            over ice.
          </p>
          <p>
            Most home cold brew enthusiasts prefer the concentrate method because a single batch
            lasts longer and the flavour stays fresher over a two-week window compared to diluted
            cold brew, which degrades faster once water is added.
          </p>

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            Why cold brew tastes different from iced hot coffee
          </h2>
          <p>
            Cold water extracts different chemical compounds than hot water at the same contact
            time. Hot extraction pulls out acids and volatile aromatics quickly â€” which gives
            regular coffee its brightness and complexity but also its acidity. Cold water
            extracts far fewer of these acidic compounds even over 24 hours, producing a cup that
            is noticeably smoother, lower in acidity, and often described as chocolatey or
            sweet even without sugar.
          </p>
          <p>
            This also means cold brew is not simply "iced coffee." Pouring hot drip coffee over
            ice dilutes and cools but retains the acid profile of hot extraction. For a genuinely
            smooth, low-acid cold coffee, cold steeping is the only method.
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
