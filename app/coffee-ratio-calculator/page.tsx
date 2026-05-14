import type { Metadata } from "next"
import { CoffeeRatioCalculator } from "@/components/tools/CoffeeRatioCalculator"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"
import { ShareBar } from "@/components/ShareBar"

const tool = getToolBySlug("coffee-ratio-calculator")!

export const metadata: Metadata = {
  title: "Coffee-to-Water Ratio Calculator â€” How Many Grams or Tablespoons per Cup",
  description:
    "Calculate exactly how much ground coffee to use per cup â€” in grams, tablespoons, teaspoons, or scoops. Adjustable for cup size and strength. Free, instant, no sign-up.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/coffee-ratio-calculator` },
  openGraph: {
    title: "Coffee-to-Water Ratio Calculator",
    description: "How many tablespoons or grams of coffee per cup? Enter your cups and get the exact measurement instantly.",
    type: "website",
  },
}

const faqs = [
  {
    q: "What is the ideal coffee-to-water ratio for drip coffee?",
    a: "The Specialty Coffee Association (SCA) recommends a ratio of 1:18 (1g of coffee per 18ml of water) as its Golden Cup standard, which produces a lighter, more delicate cup. Most home brewers prefer 1:15 to 1:17. A ratio of 1:16 â€” roughly 2 tablespoons per 6 oz of water â€” is the most popular starting point and what this calculator uses as its Medium setting.",
  },
  {
    q: "How many tablespoons of coffee do I need per cup?",
    a: "For a standard 250ml (8.5 oz) mug at a medium 1:16 ratio, you need about 2.6 tablespoons of ground coffee. For a smaller 148ml (5 oz) coffee maker cup, that drops to about 1.5 tablespoons. Use the calculator above to get the exact amount for your cup size and preferred strength.",
  },
  {
    q: "What does a 1:16 coffee ratio mean?",
    a: "A 1:16 ratio means you use 1 gram of ground coffee for every 16ml of water. For 250ml of water, that is 15.6g of coffee â€” or about 2.6 tablespoons. The lower the second number, the stronger the coffee: 1:12 is very strong, 1:18 is light.",
  },
  {
    q: "How much coffee do I need for a full 12-cup coffee maker?",
    a: "A 12-cup coffee maker typically holds 12 x 148ml cups, which equals about 1,776ml of water. At a medium 1:16 ratio, that requires 111g of coffee â€” roughly 18.5 tablespoons or 9.3 standard scoops. Use the Quick Cups selector and choose the Coffee Maker cup size in the calculator above to get the precise amount.",
  },
  {
    q: "Should I measure coffee by weight or volume?",
    a: "Weight (grams) is always more accurate. Ground coffee density varies significantly depending on grind size, roast level, and how settled the grounds are â€” a tablespoon of espresso-fine coffee weighs nearly twice what a tablespoon of coarsely ground coffee weighs. A basic kitchen scale removes all that guesswork. That said, tablespoon and scoop measurements in this calculator use a medium-grind average of 6g per tablespoon, which is a reliable starting point for most drip coffee.",
  },
  {
    q: "What is the SCA Golden Cup standard for coffee?",
    a: "The Specialty Coffee Association Golden Cup standard targets a brew strength of 1.15 to 1.35 percent total dissolved solids (TDS) in the final cup. For most home drip setups, this translates to a brew ratio between 1:17 and 1:18. The SCA's formal dose recommendation is 55g per litre of water (approximately 1:18). Most specialty coffee drinkers find this on the lighter side and prefer something closer to 1:15 or 1:16.",
  },
  {
    q: "Why does my coffee taste weak even when I follow the ratio?",
    a: "Ratio is only one variable. Weak coffee at the correct ratio usually means one of three things: the grind is too coarse (water passes through too quickly and under-extracts), the water is not hot enough (below 88C / 190F), or the coffee is stale (degassed beans extract less flavour). Adjust grind size first â€” a slightly finer grind often solves the problem without changing the amount of coffee.",
  },
  {
    q: "How do I measure coffee without a scale?",
    a: "The most reliable volume measurement is a standard coffee scoop, which equals 2 level tablespoons or approximately 12g at medium grind. For a 250ml cup at 1:16 strength, use 1.3 scoops (about 1 heaped scoop). For 2 cups, use 2.5 scoops. This calculator shows scoop, tablespoon, and teaspoon equivalents alongside the gram weight so you always have a volume fallback.",
  },
]

export default function CoffeeRatioCalculatorPage() {
  const relatedTools = getRelatedTools("coffee-ratio-calculator")
  const appSchema = webApplicationSchema({
    name: tool.title,
    description: tool.description,
    slug: tool.slug,
  })
  const faqSchemaData = faqSchema(faqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }} />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Breadcrumb items={[{ label: tool.shortTitle }]} />

        {/* â”€â”€ Hero â”€â”€ */}
        <div className="mt-6 mb-8">
          <h1 className="font-display text-3xl font-bold leading-tight text-surface-800 dark:text-surface-50 sm:text-4xl">
            Coffee-to-Water Ratio Calculator
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Enter your number of cups, pick a cup size and strength, and get the exact amount of
            ground coffee you need in grams, tablespoons, teaspoons, and scoops.
          </p>
        </div>

        {/* â”€â”€ Calculator â”€â”€ */}
        <CoffeeRatioCalculator />

        {/* â”€â”€ Affiliate â”€â”€ */}
        <ShareBar title="Coffee-to-Water Ratio Calculator — Coffee Brew Lab" url={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/coffee-ratio-calculator`} />

        <div className="mt-8">
          <AmazonLinks
            searchTerms={tool.amazonTerms}
            heading="Tools that make ratios easier"
          />
        </div>

        {/* â”€â”€ Body copy â”€â”€ */}
        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            How many grams of coffee per cup?
          </h2>
          <p>
            For a standard 250ml mug at a medium 1:16 ratio, you need 15.6g of ground coffee.
            Round that up to 16g if you prefer a slightly bolder result. For a smaller 148ml coffee
            maker cup, the same ratio calls for 9.25g â€” just under one standard scoop.
          </p>
          <p>
            Grams is the most reliable unit to work with because ground coffee density varies
            enormously by grind size and roast. A tablespoon of finely ground coffee can weigh up to
            8g, while a tablespoon of coarsely ground coffee may weigh only 4g. Weight removes that
            variable entirely. If you do not own a scale, the tablespoon and scoop values in the
            calculator above use a medium-grind average of 6g per tablespoon, which is accurate
            enough for most drip brewers and filter machines.
          </p>

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            What ratio should you use?
          </h2>
          <p>
            The Specialty Coffee Association recommends 55g of coffee per litre of water as its
            Golden Cup standard â€” approximately a 1:18 ratio â€” which produces a clean, light cup
            with high clarity. Most home brewers find this on the mild side and settle somewhere
            between 1:14 and 1:16 for a more balanced, full-flavoured result.
          </p>
          <p>
            Think of the ratio as a dial, not a rule. A 1:12 ratio gives you a very concentrated
            cup close to a lungo. A 1:18 ratio gives you a delicate, tea-like brew. Move the dial
            toward the lower number for more body and intensity; move it toward the higher number
            for more clarity and sweetness. Start at 1:16, taste the result, and adjust one step at
            a time until the cup suits you.
          </p>

          <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
            Does cup size affect how much coffee you use?
          </h3>
          <p>
            Yes. The coffee-to-water ratio is calculated from the volume of water, so a larger cup
            always means more coffee. A standard mug holds 250ml; a coffee maker cup is typically
            148ml, which is why a "12-cup" machine only makes about 1.75 litres of coffee, not 3
            litres. The calculator includes both cup sizes so the measurements stay accurate for
            whichever machine you use.
          </p>

          <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
            Why tablespoons are not always consistent
          </h3>
          <p>
            Many coffee packaging instructions say "1 to 2 tablespoons per 6oz cup," but that range
            spans the difference between a weak and a strong brew. The calculator gives you a
            specific tablespoon amount based on your exact cup count and strength preference, rather
            than a range that covers nearly every possible taste. For the most consistent results
            day to day, weigh your coffee once to see what your usual tablespoon actually delivers,
            then adjust your scooping accordingly.
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
