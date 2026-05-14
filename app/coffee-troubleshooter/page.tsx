import type { Metadata } from "next"
import { CoffeeTroubleshooter } from "@/components/tools/CoffeeTroubleshooter"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"
import { ShareBar } from "@/components/ShareBar"

const tool = getToolBySlug("coffee-troubleshooter")!

export const metadata: Metadata = {
  title: "Coffee Troubleshooter â€” Fix Bitter, Sour, or Weak Coffee",
  description:
    "Answer a few questions about your brew and get a specific fix for bitter, sour, weak, or strong coffee. Covers espresso, pour over, French press, and AeroPress.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/coffee-troubleshooter` },
  openGraph: {
    title: "Coffee Troubleshooter",
    description: "Diagnose bitter, sour, weak, or strong coffee. Step-by-step questions give you a specific fix for espresso, pour over, French press, and AeroPress.",
    type: "website",
  },
}

const faqs = [
  {
    q: "Why does my coffee taste bitter?",
    a: "Bitter coffee is almost always over-extracted: the water pulled out too many compounds from the grounds. The three most common causes are a grind that is too fine (slow drawdown, long contact time), brew time or steep time that is too long, and water that is too hot. The fix depends on your brew method. For pour over, check that your total brew time is 3 to 3.5 minutes and your water is 92 to 94C. For French press, steep for exactly 4 minutes and use off-boil water rather than boiling. For espresso, the shot should complete in 20 to 30 seconds. Use the troubleshooter above for a specific diagnosis.",
  },
  {
    q: "Why does my coffee taste sour or acidic?",
    a: "Sour coffee is under-extracted: the water did not pull enough from the grounds. Acidic compounds extract early in the brew, and without enough extraction time or heat, they dominate the final cup. The fix is usually one or more of: grind finer to slow the flow and increase surface area, extend steep time, or raise water temperature. For pour over, a fast brew (under 2.5 minutes) means grind finer. For French press or AeroPress, sour coffee usually means the steep time is too short or the water cooled too much.",
  },
  {
    q: "How do I know if my coffee is over-extracted or under-extracted?",
    a: "Over-extracted coffee tastes bitter, harsh, dry, and sometimes astringent. Under-extracted coffee tastes sour, sharp, thin, and sometimes salty. A well-extracted cup should taste sweet, balanced, and full. A useful mental model: imagine squeezing a lemon (sour, sharp) versus chewing on a burnt piece of toast (bitter, dry). If your coffee reminds you more of one of those than a balanced cup, you have your direction. Under-extraction is fixed by extracting more (finer grind, longer time, higher temperature). Over-extraction is fixed by extracting less.",
  },
  {
    q: "Why is my espresso bitter?",
    a: "Bitter espresso is almost always over-extracted. Check the shot time first: a shot that takes more than 35 seconds is extracting too slowly, which pulls out the bitter compounds last. The primary fix is to grind coarser by 1 to 2 clicks. If shot time is normal (20 to 30 seconds) but the taste is still bitter, check water temperature: anything above 96C can over-extract certain roast profiles, especially darker roasts. Lower your brew temperature to 92 to 94C.",
  },
  {
    q: "Why is my pour over sour even though the time seems right?",
    a: "When brew time is in the right range (3 to 3.5 minutes) but the pour over still tastes sour, the most common causes are skipping or shortening the bloom, water temperature that is too low, or channelling. Skipping the bloom traps CO2 in the grounds and causes uneven extraction. Water below 90C extracts significantly less efficiently. Channelling means water found a path through one section of the bed rather than flowing through evenly, leaving most grounds under-extracted even though the brew time looked normal.",
  },
  {
    q: "Why is my French press coffee bitter?",
    a: "The two most common causes of bitter French press coffee are steeping too long and using water that is too hot. For steep time, 4 minutes is the standard target: anything longer continues to extract bitter compounds from the grounds sitting in the water. For water temperature, boiling (100C) is too hot for French press: let your kettle cool for 30 to 45 seconds after boiling before pouring, targeting around 93 to 96C. After plunging, pour the entire batch out of the press immediately rather than leaving it on the grounds.",
  },
  {
    q: "What is the most common coffee mistake?",
    a: "Using too little coffee is the single most common mistake across all brew methods. Most people brew at well below the golden ratio of 60g per litre (6g per 100ml), which produces thin, weak, watery coffee regardless of grind, temperature, or technique. The second most common mistake is using stale beans or pre-ground coffee that has been open for more than a week. Fresh beans ground immediately before brewing makes a larger difference than any equipment upgrade.",
  },
  {
    q: "Does grind size affect bitterness more than steep time?",
    a: "Grind size and time interact: a finer grind extracts faster, so the same steep time produces more extraction with a finer grind. For pour over, grind size controls drawdown speed and is usually the primary variable to adjust. For immersion methods like French press and AeroPress, steep time and grind size are roughly equal in their impact, which is why both can be used to dial in the strength and flavour. In practice, adjusting grind size first is recommended because it affects both the speed and the quality of extraction, while time only affects the duration.",
  },
]

export default function CoffeeTroubleshooterPage() {
  const relatedTools = getRelatedTools("coffee-troubleshooter")
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
            Coffee Troubleshooter
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Select your problem, answer a few questions about your brew, and get a specific fix.
            Covers bitter, sour, weak, and strong coffee across every common brew method.
          </p>
        </div>

        <CoffeeTroubleshooter />

        <ShareBar title="Coffee Troubleshooter — Coffee Brew Lab" url={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/coffee-troubleshooter`} />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="Gear that helps dial in your brew" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">What causes bitter or sour coffee</h2>
          <p>
            Almost every flavour problem in coffee comes down to extraction: how much of the
            coffee's soluble compounds ended up in your cup. Over-extraction pulls out too many
            compounds, including the harsh, bitter ones that come last. Under-extraction stops
            short, leaving the early-extracting acidic and sour compounds dominant.
          </p>
          <p>
            Three variables control extraction in every brew method: grind size (smaller surface
            area extracts more slowly), temperature (hotter water extracts more aggressively), and
            time (longer contact extracts more). Adjusting any of these can shift a bad cup toward
            a good one. The troubleshooter above helps identify which variable to change first for
            your specific method.
          </p>
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">The one-variable rule</h2>
          <p>
            When troubleshooting, change only one variable per brew. If you adjust the grind,
            keep the same dose, water temperature, and brew time. If you adjust the time, keep
            the grind the same. Changing multiple things at once makes it impossible to identify
            what fixed the problem and what had no effect. The exception is when the diagnosis
            is clear: if you steeped your French press for 7 minutes, fix the time first and
            worry about the grind only if the problem persists.
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
