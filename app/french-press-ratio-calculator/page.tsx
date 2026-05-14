import type { Metadata } from "next"
import { FrenchPressRatioCalculator } from "@/components/tools/FrenchPressRatioCalculator"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"
import { ShareBar } from "@/components/ShareBar"

const tool = getToolBySlug("french-press-ratio-calculator")!

export const metadata: Metadata = {
  title: "French Press Ratio Calculator â€” Grams and Tablespoons for Any Press Size",
  description:
    "Get the exact coffee-to-water ratio for your French press. Choose your press size and strength, and get your dose in grams, tablespoons, and scoops instantly.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/french-press-ratio-calculator` },
  openGraph: {
    title: "French Press Ratio Calculator",
    description: "How much coffee do you put in a French press? Enter your press size and strength and get the exact dose.",
    type: "website",
  },
}

const faqs = [
  {
    q: "What is the best coffee-to-water ratio for French press?",
    a: "A ratio of 1:15 (1g of coffee per 15ml of water) is the most popular starting point for French press and gives a balanced, full-bodied cup. For a richer result, move to 1:13. For something lighter and cleaner, try 1:17. The standard 8-cup (1 litre) press needs about 67g of coffee at 1:15 â€” roughly 9.5 tablespoons of coarsely ground coffee.",
  },
  {
    q: "How many tablespoons of coffee do I use for a French press?",
    a: "For a 500ml (4-cup) press at a medium 1:15 ratio, you need about 4.8 tablespoons of coarsely ground coffee. For a full 1 litre press, that is about 9.5 tablespoons. These figures use 7g per tablespoon, which is accurate for a coarse, French press grind. A medium or fine grind weighs more per tablespoon and will produce a stronger, muddier result.",
  },
  {
    q: "How long should I steep French press coffee?",
    a: "Four minutes is the standard steep time for French press and works well for most grind sizes and roast levels. If your coffee tastes bitter, try 3 minutes or a coarser grind. If it tastes weak or sour, try 4.5 minutes or a slightly finer grind. Do not leave the plunger down after pressing â€” once pressed, pour the coffee into cups or a carafe to stop extraction.",
  },
  {
    q: "What grind size should I use for French press?",
    a: "French press requires a coarse grind, roughly the texture of coarse sea salt or raw sugar. A finer grind passes through the metal mesh filter, making the coffee muddy and over-extracted. If you notice a thick layer of sludge at the bottom of your cup, your grind is too fine. Most burr grinders have a dedicated French press setting â€” for Baratza Encore users, setting 28 to 32 is a reliable starting point.",
  },
  {
    q: "Does the French press ratio differ from drip coffee?",
    a: "Yes. French press is an immersion method where grounds are in contact with water for the full steep time, so it extracts more efficiently than drip. Most drip ratios sit around 1:16 to 1:18. French press typically works best between 1:13 and 1:17, with 1:15 as the sweet spot. Using a drip ratio in a French press will produce a noticeably weaker cup.",
  },
  {
    q: "How much coffee do I need for a 1 litre French press?",
    a: "A 1 litre (8-cup) French press needs approximately 67g of coffee at a 1:15 ratio â€” about 9.5 tablespoons or 4.8 standard scoops of coarsely ground coffee. At a stronger 1:13 ratio, that rises to about 77g (11 tablespoons). Use the calculator above to get the exact amount for your preferred strength.",
  },
  {
    q: "Why does my French press coffee taste bitter?",
    a: "Bitterness in French press almost always comes from over-extraction â€” the grind is too fine, the steep time is too long, or both. Try a coarser grind first (this is the most common fix), then reduce steep time to 3.5 minutes if bitterness persists. Water that is too hot (above 96C / 205F) can also cause bitterness â€” let boiling water rest for 30 seconds before pouring.",
  },
  {
    q: "Can I use the same ratio for cold brew in a French press?",
    a: "No. Cold brew uses a much higher ratio â€” typically 1:4 (concentrate) to 1:8 (ready-to-drink) â€” because cold water extracts coffee very slowly over 12 to 24 hours. Using a standard 1:15 French press ratio for cold brew will produce an extremely weak result. Use the Cold Brew Ratio Calculator for cold brew-specific measurements.",
  },
]

export default function FrenchPressRatioCalculatorPage() {
  const relatedTools = getRelatedTools("french-press-ratio-calculator")
  const appSchema    = webApplicationSchema({ name: tool.title, description: tool.description, slug: tool.slug })
  const faqData      = faqSchema(faqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Breadcrumb items={[{ label: tool.shortTitle }]} />

        {/* â”€â”€ Hero â”€â”€ */}
        <div className="mt-6 mb-8">
          <h1 className="font-display text-3xl font-bold leading-tight text-surface-800 dark:text-surface-50 sm:text-4xl">
            French Press Ratio Calculator
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Select your press size and strength preference to get the exact amount of coarsely ground
            coffee you need â€” in grams, tablespoons, and scoops.
          </p>
        </div>

        {/* â”€â”€ Calculator â”€â”€ */}
        <FrenchPressRatioCalculator />

        {/* â”€â”€ Affiliate â”€â”€ */}
        <ShareBar title="French Press Ratio Calculator — Coffee Brew Lab" url={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/french-press-ratio-calculator`} />

        <div className="mt-8">
          <AmazonLinks
            searchTerms={tool.amazonTerms}
            heading="Gear for a better French press"
          />
        </div>

        {/* â”€â”€ Body copy â”€â”€ */}
        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            How much coffee do you put in a French press?
          </h2>
          <p>
            The short answer: 1g of coffee per 15ml of water (a 1:15 ratio) is the most common and
            reliable starting point. For a standard 500ml press, that works out to about 33g of
            coarsely ground coffee â€” roughly 4.7 tablespoons or 2.4 standard scoops. For a full
            1 litre press, you need about 67g (9.5 tablespoons). These are the numbers the
            calculator uses for its Medium setting.
          </p>
          <p>
            French press uses immersion brewing â€” the grounds sit in the water for the entire steep
            â€” which makes it more forgiving than drip but also more sensitive to grind size. Too
            fine a grind and coffee passes through the mesh filter into your cup; too coarse and the
            coffee under-extracts and tastes thin. A coarse, even grind (burr grinders deliver this
            much better than blade grinders) lets you dial in the ratio with precision.
          </p>

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            Why the French press ratio is different from drip coffee
          </h2>
          <p>
            Drip coffee typically uses a ratio between 1:16 and 1:18. The slower contact time and
            paper filter produce a cleaner, lighter cup, so you need a little less coffee per
            millilitre of water to avoid over-extraction. French press does not filter out the oils
            and fine particles that a paper filter removes, resulting in a naturally heavier body
            and more intense flavour at the same ratio. That is why the same amount of coffee
            feels stronger from a French press than from a drip machine.
          </p>
          <p>
            If you normally make drip coffee and find French press too intense at 1:15, start
            at 1:17 and adjust from there. If you drink espresso and find French press weak,
            go to 1:12 or 1:13 and use a slightly longer steep.
          </p>

          <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
            How grind size affects your dose
          </h3>
          <p>
            Tablespoon measurements for French press use 7g per tablespoon rather than the 6g used
            for medium-ground drip coffee. Coarse coffee grounds have more air gaps between
            particles, so they pack less tightly into a measuring spoon. If you are using a finer
            grind (not recommended for French press, but some people prefer it), each tablespoon
            will weigh more and your results will be stronger than the calculator shows. Weighing
            your coffee is always more accurate than measuring by spoon.
          </p>

          <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
            The four-minute rule
          </h3>
          <p>
            Steep time and ratio work together. At a 1:15 ratio, 4 minutes of steeping gives you a
            well-extracted, full-bodied cup. Steep for 3 minutes and the same ratio will taste
            slightly weak; steep for 5 minutes and it will turn bitter. If you prefer a stronger
            cup but want to keep steep time at 4 minutes, increase the dose (move toward 1:13).
            If you want a longer, more relaxed brew without bitterness, reduce the dose (move
            toward 1:17) and keep the 4-minute rule.
          </p>

        </article>

        {/* â”€â”€ FAQ â”€â”€ */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100 mb-6">
            Frequently asked questions
          </h2>
          <div className="space-y-5">
            {faqs.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-surface-200 bg-surface-50 p-5 dark:border-surface-700 dark:bg-surface-900">
                <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-100 mb-2">
                  {q}
                </h3>
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                  {a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* â”€â”€ Related tools â”€â”€ */}
        <div className="mt-12">
          <RelatedTools tools={relatedTools} />
        </div>
      </div>
    </>
  )
}
