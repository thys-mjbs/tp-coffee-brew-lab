import type { Metadata } from "next"
import Script from "next/script"
import { FrenchPressTimer } from "@/components/tools/FrenchPressTimer"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"

const tool = getToolBySlug("french-press-timer")!

export const metadata: Metadata = {
  title: "French Press Brew Timer — How Long to Steep French Press Coffee",
  description:
    "A step-by-step French press timer with bloom and steep countdown. Select your steep time, press Start, and get prompted through each stage of the brew.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/french-press-timer` },
  openGraph: {
    title: "French Press Brew Timer",
    description: "How long should you steep French press coffee? Use the timer — bloom + steep with step-by-step prompts.",
    type: "website",
  },
}

const faqs = [
  {
    q: "How long should I steep French press coffee?",
    a: "Four minutes is the standard steep time for French press and works reliably for most coarse grinds and medium roasts. Three minutes produces a lighter, slightly under-extracted cup that suits finer grinds. Four and a half minutes gives a fuller, heavier body and works better with coarser grinds or darker roasts. Start at four minutes and adjust by thirty seconds in either direction based on taste.",
  },
  {
    q: "What is the bloom phase in French press brewing?",
    a: "The bloom is a 30-second pre-infusion where you pour a small amount of water — typically two times the weight of your coffee — over the grounds before adding the rest. The hot water releases trapped CO2 from the grounds (visible as bubbling or rising), which improves even extraction during the full steep. Fresher beans produce a more visible bloom. This timer handles the bloom automatically before starting the steep countdown.",
  },
  {
    q: "Should I stir French press coffee during steeping?",
    a: "A gentle stir immediately after the bloom pour helps ensure all grounds are saturated. After that, do not stir during the steep — disturbing the grounds increases fine particle migration into the cup and can cause over-extraction. Let the grounds sit undisturbed until the steep timer completes, then press slowly.",
  },
  {
    q: "Why should you pour French press coffee immediately after pressing?",
    a: "Even after pressing, the coffee grounds are still in contact with the hot liquid. Leaving the pressed coffee in the French press continues extraction — within a few minutes the cup becomes more bitter and astringent. Pour into cups or a separate carafe immediately after plunging. If you are not serving all the coffee at once, decant it into a thermos or carafe to stop extraction.",
  },
  {
    q: "What happens if I steep French press too long?",
    a: "Over-steeping causes over-extraction — the coffee pulls more of the bitter, astringent compounds that extract last. The cup becomes harsh and tannic, similar to tea that has been steeped too long. If you regularly find your French press bitter, try reducing steep time to three and a half minutes before adjusting grind size or ratio.",
  },
  {
    q: "Does French press need a bloom?",
    a: "Technically no — French press will brew without a separate bloom step. But adding a 30-second bloom with a small amount of water before filling produces a more even extraction because it pre-saturates the grounds and releases CO2. The improvement is most noticeable with fresh specialty beans. For older or commercial coffee, the difference is less pronounced but still worth the extra 30 seconds.",
  },
  {
    q: "What water temperature is best for French press?",
    a: "94 to 96C (202 to 205F) is the optimal temperature for most French press brewing. Boiling water at 100C can over-extract dark roast compounds and produce bitterness. Let boiling water rest for 30 seconds in the kettle or decant into the French press and wait briefly before adding the coffee. If you have a temperature-controlled kettle, set it to 94C.",
  },
]

export default function FrenchPressTimerPage() {
  const relatedTools = getRelatedTools("french-press-timer")
  const appSchema    = webApplicationSchema({ name: tool.title, description: tool.description, slug: tool.slug })
  const faqData      = faqSchema(faqs)

  return (
    <>
      <Script id="schema-webapp" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(appSchema)}</Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(faqData)}</Script>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Breadcrumb items={[{ label: tool.shortTitle }]} />

        <div className="mt-6 mb-8">
          <h1 className="font-display text-3xl font-bold leading-tight text-surface-800 dark:text-surface-50 sm:text-4xl">
            French Press Brew Timer
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Select your steep time, press Start, and let the timer guide you through the bloom and
            steep stages. Step-by-step prompts at every stage of the brew.
          </p>
        </div>

        <FrenchPressTimer />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="French press gear" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            How long to steep French press coffee
          </h2>
          <p>
            The most common question about French press is how long to let it steep. Four minutes
            is the widely recommended answer, and it is a reliable starting point. But steep time
            is not fixed — it interacts with grind size, water temperature, and dose. A coarser
            grind at the same steep time produces a weaker cup than a standard grind; a longer
            steep compensates. A finer grind (unusual for French press but sometimes used) extracts
            faster and may need only three to three and a half minutes.
          </p>
          <p>
            If your French press consistently tastes weak, try four and a half minutes before
            changing anything else. If it consistently tastes bitter, drop to three and a half
            minutes. Steep time is the easiest variable to adjust and should be the first thing
            you change.
          </p>

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            The two-stage brew: bloom then steep
          </h2>
          <p>
            This timer uses a two-stage process: a 30-second bloom followed by the main steep.
            During the bloom, a small amount of water saturates the grounds and releases CO2 gas —
            the fizzing or rising you see on the surface. This degassing is important because CO2
            interferes with extraction; releasing it early means the main steep extracts more
            evenly and completely.
          </p>
          <p>
            After the bloom, pour the remaining water to your target amount and leave it
            undisturbed for the full steep. The timer handles the transition automatically — you
            will see the phase change from Bloom to Steeping at the 30-second mark.
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
