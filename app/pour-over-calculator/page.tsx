import type { Metadata } from "next"
import { PourOverCalculator } from "@/components/tools/PourOverCalculator"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"

const tool = getToolBySlug("pour-over-calculator")!

export const metadata: Metadata = {
  title: "Pour Over & V60 Recipe Calculator â€” Hoffmann, Kasuya 4:6, and Custom Ratios",
  description:
    "Calculate your pour over ratio and get step-by-step recipes for V60, Chemex, and Kalita Wave. Includes James Hoffmann and Tetsu Kasuya 4:6 method presets.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/pour-over-calculator` },
  openGraph: {
    title: "Pour Over & V60 Recipe Calculator",
    description: "V60 recipes with pour sequences for James Hoffmann, Tetsu Kasuya 4:6, and custom ratios. Works for Chemex and Kalita Wave too.",
    type: "website",
  },
}

const faqs = [
  {
    q: "What is the James Hoffmann V60 recipe?",
    a: "James Hoffmann's V60 recipe uses 30g of coffee to 500ml of water (a 1:16.67 ratio). Pour 60ml of water for a 45-second bloom, then pour the remaining 440ml in a single slow continuous pour finishing around 3 to 3.5 minutes total. The key technique is a gentle swirl at the end to flatten the coffee bed and improve extraction evenness. Grind medium-fine â€” finer than filter grind but not espresso.",
  },
  {
    q: "What is the Tetsu Kasuya 4:6 V60 method?",
    a: "The 4:6 method divides the total water into two stages: the first 40 percent controls flavour balance (sweetness and acidity), and the last 60 percent controls strength. The first 40 percent is split into two equal pours spaced 45 seconds apart. The last 60 percent is split into three equal pours. Pouring in two smaller first pours increases sweetness; one larger first pour increases acidity. Adding more pours in the second stage produces a lighter cup. The ratio is typically 1:15.",
  },
  {
    q: "What is the best ratio for pour over coffee?",
    a: "Most pour over recipes use a ratio between 1:15 and 1:17. James Hoffmann uses 1:16.67 (30g to 500ml). The Tetsu Kasuya 4:6 method uses 1:15. The SCA Golden Cup standard is closer to 1:17 to 1:18. A 1:15 ratio gives a fuller, more intense cup; 1:17 gives a cleaner, lighter result. Start at 1:16 and adjust to taste.",
  },
  {
    q: "How fine should I grind for a V60?",
    a: "V60 requires a medium-fine grind â€” finer than French press or cold brew, but coarser than espresso. A useful reference: the grounds should feel like table salt or slightly finer. On a Baratza Encore, setting 14 to 18 is a common starting range. On a Comandante C40, 20 to 26 clicks. Total brew time of 3 to 3.5 minutes is a good calibration target â€” if your brew runs faster, grind finer; if it runs slower, grind coarser.",
  },
  {
    q: "What is the difference between V60, Chemex, and Kalita Wave?",
    a: "All three are pour over brewers but they produce different cup characteristics. The V60 has a single large hole and spiral ribs â€” fast flow, high clarity, brighter acidity. The Chemex uses a thick proprietary filter that removes more oils, producing the cleanest and lightest cup of the three. The Kalita Wave has three small holes and a flat bottom â€” more forgiving extraction, fuller body than V60, more consistent than Chemex for beginners. The ratios and pour sequences are similar across all three; this calculator supports all.",
  },
  {
    q: "How long should a pour over take?",
    a: "A standard V60 brew should finish in 3 to 3.5 minutes including bloom. Chemex typically runs 4 to 4.5 minutes due to its thicker filter. Kalita Wave sits between the two at 3.5 to 4 minutes. If your brew finishes much faster, grind finer. If it stalls or drips slowly past 5 minutes, grind coarser. A consistent brew time means consistent extraction.",
  },
  {
    q: "What water temperature is best for pour over?",
    a: "93 to 96 C (200 to 205 F) works well for most light and medium roasts, which require higher temperatures to fully extract. For dark roasts, 88 to 91 C (190 to 195 F) reduces bitterness from over-extraction of the more soluble dark-roast compounds. If you do not have a temperature-controlled kettle, boiling water left to rest for 30 seconds reaches roughly 94 C.",
  },
  {
    q: "Do I need a gooseneck kettle for pour over?",
    a: "A gooseneck kettle is strongly recommended for V60 and Chemex because the thin spout lets you pour slowly and precisely onto the coffee bed without disturbing it. A standard kettle can work for Kalita Wave (the flat bed is more forgiving), but the bloom pour and spiral technique used in V60 recipes are very difficult without a gooseneck. An electric gooseneck kettle with temperature control combines both requirements in one tool.",
  },
]

export default function PourOverCalculatorPage() {
  const relatedTools = getRelatedTools("pour-over-calculator")
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
            Pour Over & V60 Recipe Calculator
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Choose your brewer, pick a recipe â€” James Hoffmann, Tetsu Kasuya 4:6, or your own ratio
            â€” enter your coffee dose, and get the water amount and full pour sequence.
          </p>
        </div>

        <PourOverCalculator />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="Pour over gear worth having" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            V60 ratio and recipe basics
          </h2>
          <p>
            Pour over coffee works by passing hot water through a bed of grounds in a single
            direction â€” gravity pulls the water down, and the filter holds the grounds back. The
            ratio of coffee to water determines strength; the pour technique determines how evenly
            the grounds are extracted. Both variables matter, and both are adjustable.
          </p>
          <p>
            A 1:15 to 1:17 ratio covers the full range from a full-bodied cup to a clean, delicate
            one. Most recipes for home brewing land around 1:16. James Hoffmann's widely used V60
            method uses 1:16.67 (30g to 500ml), which sits near the lighter end of that range and
            emphasises clarity and sweetness over body.
          </p>

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            Hoffmann vs. Kasuya â€” which recipe should you use?
          </h2>
          <p>
            The Hoffmann method is the easier starting point. One bloom pour, one main pour, a
            gentle swirl, and you are done. The whole technique takes about three minutes and
            produces a consistently good cup with minimal variables to control.
          </p>
          <p>
            The Kasuya 4:6 method requires more attention but gives you a way to independently
            adjust flavour balance and strength. If your cup is too acidic, pour more in the first
            of the two "40 percent" pours. If it is too sweet, pour more in the second. If it is
            too strong, add a fifth pour to the "60 percent" stage. The method rewards
            experimentation and is particularly useful for dialling in a new bag of beans.
          </p>

          <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
            Does the brewer change the ratio?
          </h3>
          <p>
            The ratio stays the same across V60, Chemex, and Kalita Wave. What changes is brew
            time and filter thickness. Chemex filters are significantly thicker than V60 filters,
            which slows the flow rate and extends contact time â€” you may need a slightly coarser
            grind to compensate and avoid over-extraction. Kalita Wave's flat bed produces a more
            even extraction than the V60's cone, so it is more forgiving if your pour technique
            is inconsistent.
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
