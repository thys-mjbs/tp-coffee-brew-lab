import type { Metadata } from "next"
import { HarioSwitchRecipe } from "@/components/tools/HarioSwitchRecipe"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"
import { ShareBar } from "@/components/ShareBar"

const tool = getToolBySlug("hario-switch-recipe")!

export const metadata: Metadata = {
  title: "Hario Switch Recipe Calculator â€” Immersion and Drip Methods",
  description:
    "Recipes and water amounts for the Hario Immersion Switch. Classic immersion, James Hoffmann, light roast, and bold methods with step-by-step instructions.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/hario-switch-recipe` },
  openGraph: {
    title: "Hario Switch Recipe Calculator",
    description: "Four Hario Switch recipes with calculated water amounts for any dose. Covers classic immersion, Hoffmann, light roast, and strong methods.",
    type: "website",
  },
}

const faqs = [
  {
    q: "What is the Hario Immersion Switch?",
    a: "The Hario Immersion Switch (also called the Hario Switch or V60 Switch) is a hybrid coffee brewer that combines the immersion brewing of a French press with the paper filter clarity of a V60. A ball valve at the bottom keeps water in the brewer during the steep, then releases it into your cup when opened. The result is a cleaner cup than French press with more body and sweetness than standard pour over. It is one of the most forgiving filter coffee brewers available.",
  },
  {
    q: "What is the best Hario Switch recipe?",
    a: "The classic immersion recipe (2-minute closed steep, then open) works well for most medium roasts at a 1:15 ratio. The James Hoffmann Hario Switch recipe uses a 1:16.67 ratio (30g coffee to 500ml water), a 45-second bloom with 3x bloom water, and a 90-second steep before opening at 2:15. Both produce clean, sweet cups with very little technique variation from brew to brew. The calculator above shows step-by-step instructions for both.",
  },
  {
    q: "What grind size should I use for the Hario Switch?",
    a: "Use a medium-fine grind, similar to what you would use for V60 or pour over. Because the water steeps with the grounds before draining through the paper filter, the Hario Switch is slightly more forgiving of grind variation than a standard pour over. If your drawdown is very slow (over 3 minutes after opening the switch), grind slightly coarser. If the coffee tastes thin even with correct steep time, grind slightly finer.",
  },
  {
    q: "How long should I steep the Hario Switch?",
    a: "A 2-minute closed steep is the standard starting point for most recipes. The James Hoffmann method uses 90 seconds of closed steep (from around 45 seconds to 2:15). For light roasts, extending the closed steep to 2.5 to 3 minutes helps extract more sweetness and body. The steep time in immersion brewing directly controls extraction: a longer steep produces more extraction and more body, a shorter steep produces a lighter, more acidic cup.",
  },
  {
    q: "Does the Hario Switch make better coffee than a standard V60?",
    a: "They produce different results rather than one being better. A standard V60 pour over gives you precise control over flow rate and can produce a very bright, structured cup. The Hario Switch produces a more even extraction because the coffee steeps uniformly before draining, resulting in more body, sweetness, and consistency. Many people find the Switch easier to brew consistently because pouring technique matters less. If you find pour over timing stressful, the Switch is worth trying.",
  },
  {
    q: "Can I use the Hario Switch as a standard pour over?",
    a: "Yes. Leave the switch open the entire time and brew exactly as you would a V60. The Switch uses the same 02 Hario V60 paper filters. Brewing with the switch open is indistinguishable from a standard V60 pour over. This dual-use capability makes it a particularly flexible brewer.",
  },
]

export default function HarioSwitchRecipePage() {
  const relatedTools = getRelatedTools("hario-switch-recipe")
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
            Hario Switch Recipe Calculator
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Select a recipe and dose to get water amounts and step-by-step instructions for
            the Hario Immersion Switch. Works for the classic, Hoffmann, light roast, and bold methods.
          </p>
        </div>

        <HarioSwitchRecipe />

        <ShareBar title="Hario Switch Recipe Calculator — Coffee Brew Lab" url={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/hario-switch-recipe`} />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="Hario Switch essentials" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">How the Hario Switch works</h2>
          <p>
            The Hario Switch has a small ball valve underneath the brewing basket. When the valve
            is closed, the brewer acts like a full-immersion device: water sits with the grounds
            and steeps, similar to a French press. When the valve is opened, the coffee drains
            through the paper filter and into your cup below.
          </p>
          <p>
            This design solves a common complaint about pour over: that small variations in pouring
            speed and technique cause inconsistent results. Because the Switch lets the coffee steep
            before draining, the contact time is controlled by the timer rather than your pouring
            speed. The paper filter ensures the cup stays clean without the sediment of a French press.
          </p>
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">Comparing Switch recipes</h2>
          <p>
            The classic immersion recipe (1:15, 2-minute steep) is the easiest starting point and
            works well across medium and medium-dark roasts. The James Hoffmann method uses a
            slightly higher water-to-coffee ratio (1:16.67) and a longer, more intentional bloom,
            producing a cleaner, more delicate cup. For light roasts, extending the steep to 2.5
            to 3 minutes extracts more of the nuanced flavours that higher-grown, lighter-roasted
            coffees contain.
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
