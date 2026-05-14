import type { Metadata } from "next"
import { MilkCoffeeRatioCalculator } from "@/components/tools/MilkCoffeeRatioCalculator"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"

const tool = getToolBySlug("milk-coffee-ratio-calculator")!

export const metadata: Metadata = {
  title: "Milk Coffee Ratio Calculator â€” Latte, Flat White, Cortado, Cappuccino",
  description:
    "Find the right coffee-to-milk ratio for latte, flat white, cortado, cappuccino, cafÃ© au lait, and macchiato. Get exact ml amounts for any cup size.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/milk-coffee-ratio-calculator` },
  openGraph: {
    title: "Milk Coffee Ratio Calculator",
    description: "Coffee to milk ratios for latte, flat white, cortado, cappuccino, cafÃ© au lait, and macchiato â€” with exact ml amounts.",
    type: "website",
  },
}

const faqs = [
  {
    q: "What is the ratio of coffee to milk in a latte?",
    a: "A latte uses a 1:4 ratio of espresso to milk â€” approximately 60ml of espresso (double shot) and 240ml of steamed milk, totalling 300ml. The milk is mostly steamed liquid with a thin layer of microfoam on top, unlike a cappuccino which has a thick layer of foam. A latte is the most milk-forward of the standard espresso drinks.",
  },
  {
    q: "What makes a flat white different from a latte?",
    a: "A flat white uses a higher coffee-to-milk ratio than a latte (1:1.5 vs 1:4) and is served in a smaller cup (approximately 150ml total). It uses a double ristretto base rather than a double espresso, which contributes more sweetness and less bitterness. The milk texture is velvety microfoam throughout the drink rather than distinct foam on top â€” a flat white should have the consistency of warm cream from the first sip to the last.",
  },
  {
    q: "What is a cortado?",
    a: "A cortado is equal parts espresso and warm milk â€” a 1:1 ratio. A single shot (30ml) with 30ml of milk, or a double shot (60ml) with 60ml of milk. The word cortado comes from the Spanish for 'cut' â€” the milk cuts the acidity of the espresso without dominating the flavour. No foam is added. It is served in a small glass and consumed while the milk is still warm.",
  },
  {
    q: "What is the difference between a cappuccino and a latte?",
    a: "A cappuccino uses equal thirds: espresso, steamed milk, and foam â€” producing a drink that is approximately 150 to 180ml total with a thick, dry foam layer on top. A latte uses far more milk (1:4 ratio) and has only a thin foam layer, producing a drink of 250 to 350ml. Cappuccinos have a more intense espresso flavour because of the lower milk ratio. Lattes are creamier and more approachable for people who find espresso too strong.",
  },
  {
    q: "What is a cafÃ© au lait ratio?",
    a: "CafÃ© au lait uses equal parts filter or drip coffee and warm (not steamed) milk â€” a 1:1 ratio. Unlike espresso-based drinks, cafÃ© au lait does not use espresso. A 300ml serving would be 150ml of strong drip coffee and 150ml of warm milk. The milk is heated rather than steamed, so there is no foam. It is a French breakfast drink and the base for New Orleans-style cafÃ© au lait, which uses chicory coffee.",
  },
  {
    q: "What milk is best for lattes and flat whites?",
    a: "Whole milk produces the best microfoam for lattes and flat whites because its fat content allows the milk proteins to create a stable, silky texture when steamed. For plant-based alternatives, oat milk barista editions (specifically designed for steaming) come closest to whole milk in texture and sweetness. Almond milk and standard oat milk can work but produce less stable foam. Soy milk froths well but can split if the espresso is very acidic.",
  },
]

export default function MilkCoffeeRatioCalculatorPage() {
  const relatedTools = getRelatedTools("milk-coffee-ratio-calculator")
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
            Milk Coffee Ratio Calculator
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Select your drink and cup size to get the exact coffee and milk amounts in millilitres.
            Covers latte, flat white, cortado, cappuccino, cafÃ© au lait, and macchiato.
          </p>
        </div>

        <MilkCoffeeRatioCalculator />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="For better milk-based coffee at home" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            Coffee-to-milk ratios explained
          </h2>
          <p>
            Every milk-based espresso drink is defined primarily by its coffee-to-milk ratio. A
            macchiato is nearly all espresso with a small amount of foam. A cortado is 1:1. A
            flat white is 1:1.5. A cappuccino is roughly 1:2. A latte is 1:4. Moving along that
            spectrum from left to right, the drink becomes progressively less intense, more creamy,
            and more milk-forward.
          </p>
          <p>
            Understanding the ratio is more useful than memorising drink names, because cafÃ©
            naming conventions vary by country and even by individual coffee shop. What one cafe
            calls a flat white, another calls a cortado. The ratio tells you exactly what you are
            getting regardless of what it is called.
          </p>

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            How espresso base affects the drink
          </h2>
          <p>
            Most milk drinks use either a single or double espresso shot as the base. Flat whites
            traditionally use a double ristretto (1:1 ratio, 18g dose to 18g yield) rather than
            a standard double espresso, which adds sweetness and reduces the astringency that
            can come through in a milk drink. For home brewing, using a double shot at 1:2 is
            a reliable starting point for any of these drinks â€” use the Espresso Ratio Calculator
            to set your shot target first, then use the milk amounts from this calculator to
            finish the drink.
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
