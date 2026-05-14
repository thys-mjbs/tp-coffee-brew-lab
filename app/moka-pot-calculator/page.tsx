import type { Metadata } from "next"
import { MokaPotCalculator } from "@/components/tools/MokaPotCalculator"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"
import { ShareBar } from "@/components/ShareBar"

const tool = getToolBySlug("moka-pot-calculator")!

export const metadata: Metadata = {
  title: "Moka Pot Brew Calculator – Coffee and Water for Every Size",
  description:
    "Calculate how much coffee and water to use in your moka pot. Covers 1-cup, 3-cup, 6-cup, and 9-cup sizes with grind size advice and technique tips to avoid bitter results.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/moka-pot-calculator` },
  openGraph: {
    title: "Moka Pot Brew Calculator",
    description: "Coffee and water amounts for every moka pot size. Includes grind size guidance and technique tips for a clean, non-bitter moka pot brew.",
    type: "website",
  },
}

const faqs = [
  {
    q: "How much coffee do I put in a moka pot?",
    a: "Fill the filter basket level to the top without pressing down. For a 3-cup moka pot (150ml chamber), this is about 18g of coffee. For a 6-cup (300ml chamber), use about 36g. For a 1-cup (60ml), use around 7g. The basket should always be filled completely: moka pots are designed to work with the basket full, and using less coffee can cause channelling and uneven extraction.",
  },
  {
    q: "How much water goes in a moka pot?",
    a: "Fill the lower chamber to just below the safety valve: for a standard 3-cup moka pot, this is typically 130 to 150ml of water. Do not overfill past the valve, as this prevents steam pressure from building correctly. Using pre-boiled water is recommended: it reduces the time the bottom chamber spends on heat before brewing starts, which prevents bitter, over-extracted coffee.",
  },
  {
    q: "What grind size is best for moka pot?",
    a: "Use a fine-medium grind: finer than drip but coarser than espresso. The texture should feel like fine beach sand when pinched. Espresso-fine grinds block the filter basket and cause pressure to build dangerously. Too coarse a grind produces a weak, thin result. On a Baratza Encore, try settings 8 to 14. On a Comandante C40, try 14 to 20 clicks.",
  },
  {
    q: "Why does moka pot coffee taste bitter?",
    a: "Bitter moka pot coffee usually has one of four causes: the heat is too high (causing the water to pass through too fast under excess steam pressure), the water boiled in the chamber too long before flowing through (use pre-boiled water to fix this), the grind is too fine (causing over-extraction), or the coffee was left on the heat after the chamber emptied. Remove the pot from heat immediately when you hear a hissing sound, and rinse the bottom under cold water to stop extraction.",
  },
  {
    q: "Should I tamp the coffee in a moka pot?",
    a: "No. Unlike espresso, moka pot coffee should not be tamped. Fill the basket level and gently level the surface with your finger or the back of a spoon. Tamping increases density and resistance, which forces steam to channel through narrow paths rather than distributing evenly. This causes over-extraction in some areas and under-extraction in others, and in the worst case, can create dangerous pressure.",
  },
  {
    q: "What heat setting should I use for moka pot?",
    a: "Use medium-low heat. The coffee should flow in a steady, gentle stream rather than sputtering or rushing. If the pot spits and sputters, the heat is too high. Slow, even flow produces a cleaner extraction. Many moka pot users start on medium heat to get the water moving, then reduce to low once the coffee begins flowing. Keep the lid open while brewing so you can watch the flow.",
  },
  {
    q: "Can I use pre-boiled water in a moka pot?",
    a: "Yes, and it is recommended. Starting with pre-boiled water means the lower chamber spends less time on heat before the water begins flowing through the grounds. This prevents the grounds from being exposed to a long, slow heat-up phase that can extract bitter compounds before the water even passes through at the right temperature. Fill the chamber with water that you have just boiled in a kettle, then assemble and place on heat immediately.",
  },
]

export default function MokaPotCalculatorPage() {
  const relatedTools = getRelatedTools("moka-pot-calculator")
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
            Moka Pot Brew Calculator
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Select your moka pot size to get the exact coffee and water amounts. Tap the technique
            guide for grind size advice and step-by-step brewing instructions.
          </p>
        </div>

        <MokaPotCalculator />

        <ShareBar title="Moka Pot Brew Calculator – Coffee Brew Lab" url={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/moka-pot-calculator`} />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="Moka pot essentials" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">How moka pot brewing works</h2>
          <p>
            A moka pot brews by forcing steam pressure through a bed of ground coffee using
            the pressure generated when water boils in the sealed lower chamber. As water
            heats and turns to steam, it pushes the remaining water upward through the coffee
            and into the upper chamber. The coffee collects there until the chamber is empty
            and only steam remains.
          </p>
          <p>
            The quality of a moka pot brew is primarily controlled by two things: heat level
            and grind size. Too much heat forces the water through too fast, producing a harsh,
            thin extraction. Too little heat causes the grounds to sit in near-boiling water for
            too long before flowing through, producing bitterness. Medium-low heat and a
            fine-medium grind are the two variables most worth dialing in.
          </p>
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">The pre-boiled water trick</h2>
          <p>
            The single biggest improvement most moka pot users can make is to start with
            pre-boiled water in the lower chamber rather than cold water. When you start
            with cold water, the grounds sit above warm but not-yet-brewing water for 2 to
            4 minutes while the chamber heats up. This prolonged exposure to heat before
            extraction starts pulls bitter compounds from the grounds before the actual brew
            begins. Starting with pre-boiled water skips this phase and produces a noticeably
            cleaner, less bitter cup.
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
