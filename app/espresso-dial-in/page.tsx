import type { Metadata } from "next"
import { EspressoDialIn } from "@/components/tools/EspressoDialIn"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"
import { ShareBar } from "@/components/ShareBar"

const tool = getToolBySlug("espresso-dial-in")!

export const metadata: Metadata = {
  title: "Espresso Dial-In Calculator â€” Grind, Dose, Yield and Shot Time Adjustments",
  description:
    "Dial in your espresso shot with specific adjustments. Enter your dose, yield, shot time, and taste verdict to get a precise fix â€” grind finer, reduce yield, adjust dose. No vague advice.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/espresso-dial-in` },
  openGraph: {
    title: "Espresso Dial-In Calculator",
    description: "Enter your shot data and taste verdict to get a specific adjustment. Grind finer, pull more yield, or change dose â€” not vague advice.",
    type: "website",
  },
}

const faqs = [
  {
    q: "What does it mean to dial in espresso?",
    a: "Dialling in espresso means adjusting the three main variables â€” grind size, dose (coffee weight in the basket), and yield (liquid espresso in the cup) â€” until the shot tastes balanced. The standard target is a 1:2 ratio (18g dose to 36g yield) in 25-35 seconds. Most baristas fix shot time with grind size first, then fix taste by adjusting yield or dose. The process is iterative: pull a shot, taste it, make one change, pull again.",
  },
  {
    q: "Why does my espresso taste sour?",
    a: "Sourness in espresso means under-extraction â€” the water did not extract enough of the soluble compounds from the grounds. The most common cause is a shot that ran too fast (grind too coarse) or a yield that is too short (not enough liquid pulled through). If your shot time is under 25 seconds, grind finer. If your shot time is in the normal range (25-35s) but the taste is still sour, try pulling more yield â€” increase the liquid weight by 5g and taste again.",
  },
  {
    q: "Why does my espresso taste bitter?",
    a: "Bitterness in espresso means over-extraction â€” too many compounds were extracted from the grounds. The most common cause is a shot that ran too slow (grind too fine) or a yield that is too long (too much liquid pulled through). If your shot time is over 35 seconds, grind coarser. If shot time is normal but the taste is still bitter, try reducing yield by 5g â€” stop the shot earlier than usual and taste the result.",
  },
  {
    q: "What is the ideal espresso shot time?",
    a: "The target shot time for most espresso is 25-35 seconds, measured from the moment water first contacts the puck. A ristretto (1:1 ratio) typically runs 20-30 seconds. A lungo (1:3 ratio) typically runs 35-45 seconds. Shot time is controlled by grind size â€” finer grind slows the shot, coarser grind speeds it up. Dose weight also affects shot time slightly: more coffee in the basket slows the flow.",
  },
  {
    q: "Should I adjust grind or yield first?",
    a: "Adjust grind size first, always. Grind size controls shot time, and shot time is the foundation of a dialled-in espresso. Once shot time is in the 25-35s range, then you can fine-tune taste by adjusting yield (how much liquid you pull). Changing yield without fixing shot time first leads to inconsistent results because the underlying extraction rate is still wrong.",
  },
  {
    q: "What is the standard espresso dose?",
    a: "The standard dose for a double espresso basket is 18-20g of ground coffee. Most modern baskets are designed for this range. Some larger baskets accept 20-22g. The dose should fill the basket evenly without mounding or underfilling â€” the basket size is a physical constraint that limits your dose range. Do not try to use 15g in an 18g basket or 22g in a 20g basket: puck preparation problems will result.",
  },
  {
    q: "What does a 1:2 espresso ratio mean?",
    a: "A 1:2 ratio means the yield (liquid espresso weight) is twice the dose (ground coffee weight). For an 18g dose, the target yield is 36g. This ratio produces what most specialty coffee bars define as standard espresso: concentrated, syrupy, with a balanced extraction. A ristretto is 1:1 (yield equals dose). A lungo is 1:3 (yield is three times dose). Higher ratios produce lighter, more caffeinated shots. Lower ratios produce shorter, sweeter, more intense shots.",
  },
  {
    q: "Why does my espresso taste weak or thin?",
    a: "Weak or thin espresso usually means the ratio is too high (too much liquid for the amount of coffee used) or the dose is too low for your basket. If your yield-to-dose ratio is above 1:2.5, try pulling the shot shorter â€” stop at a lower yield weight. If the ratio is correct but the shot still tastes thin, increase your dose by 1-2g. A larger dose produces a more concentrated, full-bodied shot.",
  },
]

export default function EspressoDialInPage() {
  const relatedTools = getRelatedTools("espresso-dial-in")
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
            Espresso Dial-In Calculator
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Enter your shot data and taste verdict to get a specific adjustment. Grind finer,
            pull a different yield, or change your dose â€” with exact numbers, not vague advice.
          </p>
        </div>

        <EspressoDialIn />

        <ShareBar title="Espresso Dial-In Calculator — Coffee Brew Lab" url={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/espresso-dial-in`} />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="Espresso tools worth the investment" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            How to dial in espresso: one variable at a time
          </h2>
          <p>
            The most common mistake when dialling in espresso is changing too many things at once.
            If you adjust grind size and yield in the same session, you will not know which change
            fixed or broke the shot. The correct order is: fix shot time first using grind size,
            then fix taste using yield or dose.
          </p>
          <p>
            Shot time is the diagnostic variable. A shot that pulls in under 20 seconds tells you
            the grind is too coarse â€” regardless of taste. A shot over 45 seconds tells you the grind
            is too fine. Once your shot time is in the 25-35 second window, you can start trusting
            your taste buds to guide the next adjustment.
          </p>

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            The role of yield in espresso flavour
          </h2>
          <p>
            Yield is the weight of liquid espresso in the cup. A 1:2 ratio (18g dose, 36g yield) is
            the industry starting point for balanced espresso. Increasing yield makes the shot longer
            and lighter â€” useful for reducing bitterness or adding clarity. Reducing yield makes the
            shot shorter and more concentrated â€” useful for adding sweetness and body when the shot
            is sour or thin.
          </p>
          <p>
            Most baristas adjust yield in 3-5g increments. A 3g change in yield is usually enough
            to shift the taste noticeably. A 10g change is a significant reformulation. Keep grind
            size constant when you adjust yield so you are only changing one variable.
          </p>

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            When to adjust dose vs. yield
          </h2>
          <p>
            Dose (the weight of ground coffee in the basket) controls body and intensity. Increasing
            dose by 1-2g produces a fuller, denser shot. Decreasing dose produces a lighter shot.
            Most home baristas should not adjust dose frequently â€” the basket size constrains the
            useful range, and the dose is often set by the basket design. Yield is the more flexible
            dial for adjusting taste on a shot-by-shot basis.
          </p>
          <p>
            Change dose only when you have a consistent grind and yield and the shot still lacks
            body or tastes too intense. Use yield for day-to-day taste adjustments.
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
