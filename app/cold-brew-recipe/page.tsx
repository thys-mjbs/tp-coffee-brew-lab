import type { Metadata } from "next"
import { ColdBrewRecipe } from "@/components/tools/ColdBrewRecipe"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"

const tool = getToolBySlug("cold-brew-recipe")!

export const metadata: Metadata = {
  title: "Cold Brew Coffee Recipe â€” Batch Size, Ratio and Steep Time Calculator",
  description:
    "Calculate exact coffee and water amounts for cold brew at home. Choose your batch size, strength (regular, concentrate, or strong), and equipment to get gram weights, steep time, and step-by-step instructions.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/cold-brew-recipe` },
  openGraph: {
    title: "Cold Brew Coffee Recipe Calculator",
    description: "Cold brew batch calculator for any size and strength. Outputs exact coffee grams, water grams, steep time, and step-by-step instructions for mason jar, French press, or Toddy.",
    type: "website",
  },
}

const faqs = [
  {
    q: "How do you make cold brew coffee at home?",
    a: "Combine coarse-ground coffee with cold water at a ratio of 1:8 (regular strength) or 1:5 (concentrate). Stir to wet all the grounds, seal the container, and steep in the fridge for 12-20 hours depending on your ratio. Strain through a fine-mesh sieve lined with a paper filter, then store in the fridge. The calculator above gives you exact gram weights and step-by-step instructions for your chosen batch size and equipment.",
  },
  {
    q: "What coffee-to-water ratio is best for cold brew?",
    a: "A 1:8 ratio (1g coffee per 8g water) produces ready-to-drink cold brew that works well over ice or with a splash of milk. A 1:5 ratio produces concentrate that is diluted 1:1 with water or milk at serving, which gives you more servings per batch and a smoother flavour. A 1:4 ratio makes a strong concentrate that is diluted 1:2. Most people find 1:5 concentrate the most versatile because it is flexible at serving and stores efficiently.",
  },
  {
    q: "How long should cold brew steep?",
    a: "Ready-to-drink cold brew at 1:8 needs 12-16 hours in the fridge. Concentrate at 1:5 benefits from 16-20 hours to extract fully from the smaller volume of water relative to coffee. Strong concentrate at 1:4 works best with 18-24 hours. Steeping longer than 24 hours in the fridge rarely improves the result and can introduce harsh, over-extracted notes. Room temperature steeping cuts time in half but is less recommended for food safety reasons.",
  },
  {
    q: "What grind size should I use for cold brew?",
    a: "Use a coarse grind â€” similar to French press or slightly coarser. Coarser grinding produces a cleaner result because fine particles extract faster, and with a 12-24 hour steep, very fine grinds can over-extract and turn bitter. You do not need to measure grind size precisely: if your cold brew tastes bitter or muddy, grind coarser or steep for fewer hours. If it tastes thin and weak, grind slightly finer or steep longer.",
  },
  {
    q: "How long does cold brew last in the fridge?",
    a: "Cold brew stored in a sealed container keeps well in the fridge for up to 2 weeks. Concentrate lasts the same duration. Undiluted cold brew lasts longer than diluted cold brew, which should be consumed within a few days. If the cold brew smells off or tastes significantly more bitter than it did initially, discard it. Using filtered water and a clean container extends freshness.",
  },
  {
    q: "Can you make cold brew concentrate at home?",
    a: "Yes. Cold brew concentrate is simply cold brew made at a higher coffee-to-water ratio, typically 1:5 or 1:4 instead of the standard 1:8. The same equipment works for both. Because the ratio is more concentrated, the steep time is slightly longer (16-20 hours for 1:5) to ensure full extraction. Concentrate is more versatile than ready-to-drink cold brew because you can adjust the dilution at serving to make it stronger or lighter.",
  },
  {
    q: "What is the difference between cold brew and cold brew concentrate?",
    a: "Cold brew at a 1:8 ratio is ready to drink straight over ice with no dilution. Cold brew concentrate at 1:5 is too strong to drink undiluted and must be mixed with cold water or milk at a 1:1 ratio before serving. The concentrate approach produces more servings from the same batch, stores more efficiently, and gives you flexibility to make both straight cold brew drinks and milk-based drinks from the same batch.",
  },
  {
    q: "Does cold brew need to be kept in the fridge while steeping?",
    a: "Fridge steeping is strongly recommended. It produces a cleaner, less acidic flavour and is safer because cold temperature slows bacterial activity over the long steep period. Room temperature steeping is faster (8-12 hours instead of 12-24), but the result is often harsher and more acidic. If you steep at room temperature, keep the container in a cool, shaded spot and steep for no more than 12 hours.",
  },
]

export default function ColdBrewRecipePage() {
  const relatedTools = getRelatedTools("cold-brew-recipe")
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
            Cold Brew Coffee Recipe
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Choose your batch size, strength, and equipment to get exact coffee and water amounts with
            step-by-step instructions. Covers mason jar, French press, and dedicated cold brew systems.
          </p>
        </div>

        <ColdBrewRecipe />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="Cold brew equipment" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">Why cold brew tastes different from iced coffee</h2>
          <p>
            Cold brew and iced coffee are both cold coffee drinks, but they taste distinctly different.
            Cold brew is never exposed to heat, which means the chemical reactions that produce acidity
            and some bitterness during hot brewing never occur. The result is a naturally smoother, sweeter
            cup with lower perceived acidity. This is not about the coffee being weaker â€” well-made cold
            brew has more caffeine per volume than typical drip coffee because the long steep extracts
            more caffeine from the grounds.
          </p>
          <p>
            The trade-off is time. Cold brew requires 12-24 hours of steeping compared to 4-5 minutes
            for hot pour over. Many people batch-brew cold brew at the start of the week so it is ready
            whenever they want it. A 1 quart batch at concentrate strength yields roughly 500ml of liquid,
            enough for 4-5 drinks, and keeps for up to 2 weeks in the fridge.
          </p>
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">Choosing between regular and concentrate</h2>
          <p>
            If you drink cold brew with only a small amount of milk or straight over ice, brew at 1:8.
            If you regularly make milk-based iced drinks â€” cold brew lattes, iced cortados, or cold brew
            with oat milk â€” concentrate at 1:5 is more flexible. It dilutes at serving so you can adjust
            the strength each time. The calculator above shows the steep time and exact amounts for each
            approach across any batch size from a single cup to a full gallon.
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
