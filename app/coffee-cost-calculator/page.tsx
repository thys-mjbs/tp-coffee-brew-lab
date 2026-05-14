import type { Metadata } from "next"
import { CoffeeCostCalculator } from "@/components/tools/CoffeeCostCalculator"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"
import { ShareBar } from "@/components/ShareBar"

const tool = getToolBySlug("coffee-cost-calculator")!

export const metadata: Metadata = {
  title: "Coffee Cost Calculator â€” Cost per Cup from Bag Price, Weight, and Dose",
  description:
    "Calculate your coffee cost per cup from the bag price, bag weight, and your dose. Compare budget, mid-range, and specialty coffee. See monthly and yearly cost at a glance.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/coffee-cost-calculator` },
  openGraph: {
    title: "Coffee Cost Calculator",
    description: "How much does your daily coffee actually cost? Enter bag price, weight, and dose to calculate cost per cup, monthly spend, and yearly spend.",
    type: "website",
  },
}

const faqs = [
  {
    q: "How do you calculate the cost per cup of coffee?",
    a: "Divide the bag price by the number of cups you can brew from the bag. To find the cups per bag, divide the bag weight in grams by your dose per cup in grams. For example: a 250g bag at $18 with a 15g dose per cup gives you 16 cups (250 / 15 = 16.6, rounded down). Cost per cup = $18 / 16 = $1.13. The calculator above does this instantly from any bag size and dose.",
  },
  {
    q: "How much coffee do I use per cup?",
    a: "It depends on your brew method. Pour over (V60, Chemex) typically uses 14-17g per cup at a 1:15 to 1:17 ratio. French press uses 15-20g per cup. Espresso uses 17-20g per double shot. Cold brew uses 25-35g per serving because the ratio is much higher (1:8 or 1:5 for concentrate). The calculator includes preset doses for each method so you can compare across brewing styles.",
  },
  {
    q: "Is specialty coffee worth the higher cost per cup?",
    a: "Specialty coffee typically costs $0.70-$1.50 per cup brewed at home, compared to $0.10-$0.30 for supermarket coffee. That gap is significant at scale â€” over a year, specialty coffee at $1.00/cup costs around $365 versus $45 for budget coffee. However, specialty coffee contains traceable single-origin beans roasted for flavour, while budget coffee optimises for cost. If you enjoy the flavour difference, specialty coffee at home is still far cheaper than a cafe at $3-$6 per cup.",
  },
  {
    q: "How many cups of coffee are in a 250g bag?",
    a: "A 250g bag brewed at 15g per cup (standard pour over dose) gives you 16 cups. At 18g per cup (espresso), it gives you 13 double shots. At 20g per cup (French press), it gives you 12 cups. At 30g per cup (cold brew), it gives you 8 servings. The yield depends almost entirely on your dose per cup â€” higher dose means fewer cups per bag.",
  },
  {
    q: "How many cups are in a 1lb (454g) bag of coffee?",
    a: "A 454g bag (1 pound) at 15g per cup gives you 30 cups. At 18g per espresso double shot, it gives you 25 shots. At 20g per French press cup, it gives you 22 cups. At 30g per cold brew serving, it gives you 15 servings. A 1-pound bag is a common retail size in the US â€” use the calculator to see the exact cup count and cost per serving for any price point.",
  },
  {
    q: "What is the budget, mid-range, and specialty coffee cost threshold?",
    a: "At typical home brew doses, budget coffee costs under $0.30 per cup, mid-range coffee costs $0.30-$0.70 per cup, and specialty coffee costs over $0.70 per cup. These are home brew costs â€” not cafe prices. The tier thresholds used in this calculator reflect what you would pay for a bag from a supermarket (budget), a local roaster's everyday blend (mid), or a premium single-origin from a specialty roaster (specialty).",
  },
  {
    q: "How does dose size affect cost per cup?",
    a: "Dose has a direct effect on cost per cup: higher dose means fewer cups per bag and therefore a higher cost per serving. Using 20g per cup instead of 15g per cup raises your cost per cup by 33% from the same bag. Cold brew has the highest dose (25-35g per serving) and therefore the highest cost per serving. Espresso's high dose (18g) is partially offset by its small serving size. Pour over and drip coffee typically offer the best value per cup because the dose is lower relative to the cup size.",
  },
]

export default function CoffeeCostCalculatorPage() {
  const relatedTools = getRelatedTools("coffee-cost-calculator")
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
            Coffee Cost Calculator
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Calculate your real cost per cup from the bag price, bag weight, and your dose.
            Compare methods and see what your daily coffee habit actually costs per month and per year.
          </p>
        </div>

        <CoffeeCostCalculator />

        <ShareBar title="Coffee Cost Calculator — Coffee Brew Lab" url={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/coffee-cost-calculator`} />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="Coffee worth buying" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            Why dose matters more than bag price
          </h2>
          <p>
            Most people compare coffee by bag price, but cost per cup depends equally on how much
            coffee you use per brew. A $20 bag that brews 30 cups at 15g per cup costs $0.67 per
            cup. The same $20 bag brewed at 25g per cup (cold brew dose) gives only 18 servings
            and costs $1.11 per cup. The bag price is identical â€” the dose determines the real value.
          </p>
          <p>
            The cheapest cost per cup comes from efficient brewing: pour over and drip methods use
            the least coffee per millilitre of brewed liquid. Cold brew and French press use
            significantly more coffee for the same volume. If cost efficiency matters, pour over
            at a 1:15 ratio is the most economical method for a quality result.
          </p>

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            Home coffee vs. cafe coffee: the real comparison
          </h2>
          <p>
            Even premium specialty coffee brewed at home is dramatically cheaper than a cafe drink.
            A bag of high-quality single-origin coffee at $25 for 250g brews about 16 cups at
            15g per cup â€” $1.56 per cup. A comparable pour over at a specialty cafe costs $5-$7.
            For daily drinkers, the annual savings from home brewing are significant regardless
            of the coffee tier.
          </p>
          <p>
            The calculation changes for milk-based drinks. A home latte requires espresso equipment
            and milk â€” the total cost including equipment amortisation is higher than a simple pour
            over setup. For espresso drinks at home, factor in the machine cost spread over its
            useful life to get a true cost comparison against cafe prices.
          </p>

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            How to reduce cost per cup without sacrificing quality
          </h2>
          <p>
            Buying whole beans and grinding fresh at home gives the most cost-efficient quality.
            Pre-ground coffee is convenient but degrades faster â€” you may end up using more to
            compensate for stale flavour. A burr grinder is a one-time investment that pays for
            itself quickly in quality improvement per dollar spent on beans.
          </p>
          <p>
            Subscriptions from specialty roasters often reduce per-bag cost by 10-20% versus retail.
            Buying in larger bags (500g or 1kg from a roaster you trust) reduces cost per gram,
            as long as you can use the coffee before it goes stale â€” typically within 4-6 weeks
            of roast for filter coffee.
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
