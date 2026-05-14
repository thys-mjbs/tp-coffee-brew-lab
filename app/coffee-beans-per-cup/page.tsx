import type { Metadata } from "next"
import { CoffeeBeansPerCupCalculator } from "@/components/tools/CoffeeBeansPerCupCalculator"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"

const tool = getToolBySlug("coffee-beans-per-cup")!

export const metadata: Metadata = {
  title: "Coffee Beans per Cup Calculator â€” Whole Bean Count and Grams",
  description:
    "How many whole coffee beans do you need per cup? Enter your cup size, strength, and roast level to get the bean count, grams, and tablespoons. Works for any grinder.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/coffee-beans-per-cup` },
  openGraph: {
    title: "Coffee Beans per Cup Calculator",
    description: "How many coffee beans per cup? Get a whole bean count plus grams and tablespoons for any cup size and strength.",
    type: "website",
  },
}

const faqs = [
  {
    q: "How many coffee beans do I need per cup?",
    a: "For a standard 250ml cup at a medium 1:16 ratio, you need approximately 70 to 75 whole Arabica coffee beans, which weigh around 15.6g. At medium roast, an average Arabica bean weighs about 0.13g. Light roast beans are denser (around 0.15g each) so you need fewer of them; dark roast beans are lighter (around 0.11g) so you need more. The calculator adjusts the count for roast level automatically.",
  },
  {
    q: "How many grams of whole coffee beans per cup?",
    a: "You need the same number of grams of whole beans as ground coffee â€” grinding does not change the mass. For a 250ml cup at 1:16 ratio (medium strength), that is 15.6g of whole beans. At 1:15 (strong), you need about 16.7g. The calculator shows the gram weight alongside the bean count so you can measure by weight if you prefer.",
  },
  {
    q: "How many coffee beans are in a tablespoon?",
    a: "Whole coffee beans are not measured in tablespoons â€” the beans are too irregular in shape and size to pack consistently into a spoon. After grinding, a tablespoon of medium-ground coffee weighs approximately 6g. In bean terms, 6g of medium-roast Arabica is roughly 46 whole beans. The calculator converts the bean count to post-grind tablespoons so you can cross-check the amount.",
  },
  {
    q: "Does roast level affect how many beans I need?",
    a: "Yes. The roasting process drives out moisture and CO2, which reduces bean weight. A light roast bean retains more moisture and weighs approximately 0.15g. A dark roast bean loses more mass and weighs approximately 0.11g. This means a dark roast cup requires about 30 percent more beans by count than a light roast cup to deliver the same gram weight. The calculator accounts for this difference when you select your roast level.",
  },
  {
    q: "How many coffee beans do I need for a 12-cup coffee maker?",
    a: "A 12-cup coffee maker typically uses 12 x 148ml cups, totalling about 1,776ml of water. At a medium 1:16 ratio, that requires 111g of ground coffee â€” roughly 855 medium-roast Arabica beans. At a stronger 1:14 ratio, you need about 127g (978 beans). Select 12 cups and the Coffee Maker cup size in the calculator above to get the precise count for your strength preference.",
  },
  {
    q: "How do I measure whole coffee beans without a scale?",
    a: "The most reliable method without a scale is to count beans. For a single 250ml cup at medium strength, measure approximately 70 to 75 beans. For two cups, roughly 140 to 150 beans. Counting is more accurate than using a tablespoon or scoop for whole beans, because bean size varies by origin and roast. A scale is more practical for regular brewing â€” even an inexpensive kitchen scale gives consistent results.",
  },
  {
    q: "Are Robusta beans the same size as Arabica beans?",
    a: "No. Robusta beans are generally smaller than Arabica beans, weighing approximately 0.10g per bean compared to 0.13g for Arabica. This calculator is calibrated for Arabica coffee, which makes up the majority of specialty and commercial beans. If you are using Robusta or a blend, the bean count will be higher than shown â€” but the gram weight remains accurate regardless of bean type.",
  },
]

export default function CoffeeBeansPerCupPage() {
  const relatedTools = getRelatedTools("coffee-beans-per-cup")
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
            Coffee Beans per Cup Calculator
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Find out exactly how many whole coffee beans you need for any number of cups. Adjusts for
            roast level, cup size, and brew strength â€” with the gram weight and tablespoon equivalent
            after grinding.
          </p>
        </div>

        <CoffeeBeansPerCupCalculator />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="Grind your own beans" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            How many whole coffee beans per cup?
          </h2>
          <p>
            A medium-strength 250ml cup of drip coffee requires approximately 70 to 75 whole Arabica
            beans at medium roast. This is based on two inputs: the brew ratio (1:16, meaning 15.6g
            of coffee per 250ml of water) and the average weight of a medium-roast Arabica bean,
            which is about 0.13g.
          </p>
          <p>
            These two numbers are where most confusion about beans-per-cup arises. The ratio
            determines how many grams of coffee you need; the bean weight determines how many beans
            that corresponds to. Change either variable and the count changes. A strong cup at 1:12
            needs 21g of coffee â€” about 162 beans for the same cup size. A light roast cup needs
            fewer beans for the same gram weight, since each light roast bean is denser.
          </p>

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            Why roast level changes your bean count
          </h2>
          <p>
            Roasting drives moisture and CO2 out of the bean. A light roast stops earlier in the
            process and retains more of the original bean mass â€” roughly 0.15g per bean. A dark
            roast continues until more mass is driven off, leaving a lighter, more porous bean at
            around 0.11g. The difference sounds small, but across a full pot of coffee it is
            significant: a dark roast 12-cup batch requires about 25 percent more beans by count
            than the same recipe made with light roast beans.
          </p>
          <p>
            This is why "one scoop per cup" instructions printed on coffee bags are always
            approximations. A scoop of light roast whole beans before grinding is not the same mass
            as a scoop of dark roast whole beans. Weighing the beans before grinding removes the
            roast variable entirely.
          </p>

          <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
            Counting beans vs. weighing beans
          </h3>
          <p>
            Counting beans is a useful reference for understanding scale â€” especially when you are
            setting up a new grinder and want to know roughly how much you put in. For day-to-day
            brewing, weighing is more practical. A basic 0.1g kitchen scale costs very little and
            takes the guesswork out of every session. Grind the beans immediately before brewing;
            pre-ground coffee stales significantly faster than whole beans.
          </p>

        </article>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100 mb-6">
            Frequently asked questions
          </h2>
          <div className="space-y-5">
            {faqs.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-surface-200 bg-surface-50 p-5 dark:border-surface-700 dark:bg-surface-900">
                <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-100 mb-2">{q}</h3>
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12">
          <RelatedTools tools={relatedTools} />
        </div>
      </div>
    </>
  )
}
