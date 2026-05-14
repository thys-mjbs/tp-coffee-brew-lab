import type { Metadata } from "next"
import { PourOverTimer } from "@/components/tools/PourOverTimer"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"

const tool = getToolBySlug("pour-over-timer")!

export const metadata: Metadata = {
  title: "Pour Over Brew Timer â€” V60 Stage-by-Stage Countdown with Pour Alerts",
  description:
    "A step-by-step pour over timer for V60, Chemex, and Kalita Wave. Guides you through bloom, each pour, and drawdown with on-screen instructions. Supports 4-stage, Hoffmann, and Kasuya 4:6 methods.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/pour-over-timer` },
  openGraph: {
    title: "Pour Over Brew Timer",
    description: "Stage-by-stage pour over timer for V60, Chemex, and Kalita. Supports 4-stage, Hoffmann, and Kasuya 4:6 methods.",
    type: "website",
  },
}

const faqs = [
  {
    q: "How long should a V60 pour over take?",
    a: "A standard V60 pour over should complete in 3 to 3.5 minutes total including the bloom. This covers a 30 to 45 second bloom and 2.5 to 3 minutes of pouring and drawdown. If your brew finishes faster (under 2.5 minutes), grind slightly finer. If it stalls or takes longer than 4 minutes, grind slightly coarser.",
  },
  {
    q: "How many pours does V60 need?",
    a: "The number of pours depends on the method. The 4-stage method uses a bloom plus three equal pours, totalling four stages. The James Hoffmann method uses one bloom pour and one continuous main pour â€” two stages total. The Tetsu Kasuya 4:6 method uses five pours with no separate bloom. All methods are supported in the timer above.",
  },
  {
    q: "What is the 4-stage V60 method?",
    a: "The 4-stage method is the most widely taught pour over technique. Start with a bloom pour (twice the coffee weight) and wait 30 to 45 seconds. Then add the remaining water in three equal pours, waiting for partial drawdown between each. The total brew time is approximately 3 to 3.5 minutes. It is more forgiving than a single continuous pour because each stage gives you a moment to correct flow rate.",
  },
  {
    q: "How do I know when to pour in pour over?",
    a: "In the 4-stage method, pour when the water level drops to just above the coffee bed â€” typically 30 to 45 seconds between pours. This timer handles the timing automatically: each stage countdown tells you exactly when to pour and how much water to add. For the Hoffmann method, the main pour is continuous and slow â€” the timer countdown prompts you to pour and then waits for natural drawdown.",
  },
  {
    q: "What grind size is best for pour over timing?",
    a: "Grind size directly controls pour over brew time. A medium-fine grind (finer than drip, coarser than espresso) produces a 3 to 3.5 minute V60 brew at a standard dose. If your brew consistently finishes in under 2.5 minutes, grind finer by 1 to 2 steps. If it takes longer than 4 minutes or stalls, grind 1 to 2 steps coarser. Adjust grind size before adjusting dose or pour technique.",
  },
  {
    q: "Does water flow rate matter in pour over?",
    a: "Yes â€” pour rate affects how much agitation the coffee bed experiences during extraction. Pouring too fast creates turbulence that can dislodge grounds and cause channelling. Pouring too slowly allows the water level to drop too low between pours, which can expose grounds to air and cause uneven extraction. A gooseneck kettle gives you precise control over flow rate; the timer handles the timing so you can focus on keeping a steady, controlled pour.",
  },
]

export default function PourOverTimerPage() {
  const relatedTools = getRelatedTools("pour-over-timer")
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
            Pour Over Brew Timer
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Select your pour method and dose, then let the timer guide you through every stage â€”
            bloom, each pour, and drawdown â€” with exact water amounts and timing.
          </p>
        </div>

        <PourOverTimer />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="Pour over gear" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">Pour over timing explained</h2>
          <p>
            Pour over timing controls two things simultaneously: how long the water contacts the
            grounds (affecting extraction) and how evenly the water distributes through the coffee
            bed (affecting uniformity). The timer above divides the brew into discrete stages so
            you can focus on each pour without watching a clock.
          </p>
          <p>
            Each stage shows the exact amount of water to add and a brief instruction. When the
            countdown ends, the timer moves to the next stage automatically. If you need a moment
            between stages, the Pause button holds your place without losing track of the current
            stage timing.
          </p>
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">Choosing the right pour method</h2>
          <p>
            The 4-stage method is the best starting point â€” it is widely used, well-documented,
            and produces consistent results across different grind sizes and doses. The Hoffmann
            method simplifies the technique to one main pour and is excellent for beginners who
            want to minimise the number of variables. The Kasuya 4:6 method gives you independent
            control over sweetness and strength and is worth trying once you are comfortable with
            the basics.
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
