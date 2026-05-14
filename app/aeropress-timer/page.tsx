import type { Metadata } from "next"
import { AeroPressTimer } from "@/components/tools/AeroPressTimer"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"

const tool = getToolBySlug("aeropress-timer")!

export const metadata: Metadata = {
  title: "AeroPress Brew Timer â€” Step-by-Step Countdown for Every Method",
  description:
    "A multi-stage AeroPress timer with step-by-step instructions for the standard, inverted, and James Hoffmann methods. Guides you through every stage with on-screen prompts.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/aeropress-timer` },
  openGraph: {
    title: "AeroPress Brew Timer",
    description: "AeroPress step-by-step timer for standard, inverted, and Hoffmann methods. Stage-by-stage prompts so you never lose track.",
    type: "website",
  },
}

const faqs = [
  {
    q: "How long does AeroPress take to brew?",
    a: "Total AeroPress brew time depends on the method. The standard method takes approximately 1.5 to 2 minutes from first pour to pressing. The inverted method takes 2 to 2.5 minutes due to a longer steep. The James Hoffmann method takes about 3 minutes total â€” 2 minutes of hands-off wait time followed by a flip and a slow press.",
  },
  {
    q: "How long should AeroPress steep?",
    a: "For the standard method, 60 to 90 seconds of steep after the bloom is standard, with pressing over the final 30 seconds. The inverted method steeps for approximately 1.5 to 2 minutes. The Hoffmann method waits 2 minutes before flipping. These are starting points â€” steeping slightly longer extracts more body; steeping shorter keeps the cup brighter and more acidic.",
  },
  {
    q: "How long does the AeroPress press take?",
    a: "Press the AeroPress plunger slowly over 20 to 30 seconds. Pressing too fast builds excess pressure and can cause the puck to spit through the filter, producing a gritty cup. Pressing too slowly extends extraction during the press stage. A steady, consistent press over 30 seconds is the standard technique. Stop pressing the moment you hear a hissing sound â€” that is air, and continuing past it pushes bitter compounds through.",
  },
  {
    q: "Can I use this timer for the James Hoffmann AeroPress recipe?",
    a: "Yes â€” select the J. Hoffmann method in the timer above. It handles all four stages: fill (no stir), 2-minute wait, flip and rest, then press. The Hoffmann method uses 11g of coffee, 200ml of boiling water, and produces a remarkably clean and balanced cup with no stirring at any stage.",
  },
  {
    q: "What is the correct AeroPress bloom time?",
    a: "The bloom phase in the standard and inverted methods is typically 30 seconds. Add water equal to twice the coffee weight (34ml for 17g of coffee), stir gently to saturate all grounds, and wait 30 seconds. This releases CO2 from fresh beans and prepares the grounds for even extraction. The Hoffmann method skips the bloom entirely â€” all water is added at once without stirring.",
  },
  {
    q: "Does AeroPress brew time affect strength?",
    a: "Yes, significantly. Longer steep times extract more compounds from the grounds, producing a stronger, more full-bodied cup. If your AeroPress tastes weak, try adding 15 to 30 seconds to the steep before changing the dose or grind. If it tastes harsh or bitter, reduce steep time. Steep time is the quickest variable to adjust and should be the first thing you change when dialling in.",
  },
]

export default function AeroPressTimerPage() {
  const relatedTools = getRelatedTools("aeropress-timer")
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
            AeroPress Brew Timer
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Select your method â€” standard, inverted, or James Hoffmann â€” and let the timer guide
            you through every stage with step-by-step prompts.
          </p>
        </div>

        <AeroPressTimer />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="AeroPress essentials" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">How long to brew AeroPress</h2>
          <p>
            AeroPress is forgiving compared to pour over or espresso, but timing still matters.
            The total brew time â€” from first pour to pressing â€” controls how much is extracted
            from the grounds. The standard method completes in about 2 minutes; the Hoffmann
            method takes 3 minutes but requires almost no active technique beyond a careful flip.
          </p>
          <p>
            Each stage in this timer shows a specific instruction so you know exactly what to do
            at each moment. The stage transitions happen automatically â€” you do not need to watch
            a clock or count seconds manually.
          </p>
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">Adjusting steep time to taste</h2>
          <p>
            If your AeroPress consistently tastes under-extracted (sour, thin, watery), the most
            likely fix is a longer steep. Add 20 seconds to the steep stage and taste the result.
            If it is over-extracted (bitter, harsh, dry), reduce by 15 to 20 seconds. Grind size
            is the second variable to adjust â€” finer for more extraction, coarser for less â€” but
            time is easier to change without any equipment.
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
