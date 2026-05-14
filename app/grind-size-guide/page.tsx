import type { Metadata } from "next"
import { GrindSizeGuide } from "@/components/tools/GrindSizeGuide"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"

const tool = getToolBySlug("grind-size-guide")!

export const metadata: Metadata = {
  title: "Coffee Grind Size Guide â€” Settings for Every Method and Grinder",
  description:
    "Find the right grind size for espresso, V60, French press, AeroPress, cold brew, and moka pot. Includes reference settings for Baratza, Breville, Comandante, 1Zpresso, and Timemore grinders.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/grind-size-guide` },
  openGraph: {
    title: "Coffee Grind Size Guide",
    description: "Grind size settings for every brew method and major grinder model. Espresso, pour over, French press, AeroPress, cold brew, and moka pot.",
    type: "website",
  },
}

const faqs = [
  {
    q: "What grind size is best for pour over?",
    a: "Pour over and V60 use a medium-fine grind, similar in texture to table salt. The grind should feel slightly resistant when you rub it between your fingers but not completely smooth. The target is a total brew time of 3 to 3.5 minutes for a standard 20g dose. If your pour over finishes in under 2.5 minutes, grind finer. If it takes more than 4 minutes or stalls, grind coarser. On a Baratza Encore, start at setting 14 to 18. On a Comandante C40, start at 25 to 32 clicks.",
  },
  {
    q: "What grind size should I use for French press?",
    a: "French press uses a coarse grind, roughly the texture of coarse sea salt. Individual particles should be clearly visible and distinct. If the grind is too fine, particles pass through the metal mesh filter and the coffee becomes muddy and over-extracted. If the grind is too coarse, the 4-minute steep produces a thin, under-extracted cup. On a Baratza Encore, try settings 28 to 35. On a Comandante C40, try 35 to 42 clicks.",
  },
  {
    q: "What is the correct grind size for espresso?",
    a: "Espresso requires a fine grind, finer than table salt but coarser than flour. The key indicator is shot time: the espresso should complete (from first drip to full yield) in 20 to 30 seconds. If the shot runs fast and tastes sour, grind finer. If the shot runs slow and tastes bitter, grind coarser. Espresso burrs and espresso-focused grinders (Baratza Sette, Breville Barista Express) handle this range well. Standard drip grinders like the Baratza Encore can produce a serviceable espresso grind at their finest settings but were not designed for this use.",
  },
  {
    q: "Does grind size affect coffee strength?",
    a: "Yes, indirectly. A finer grind has more surface area, which extracts faster and produces more dissolved solids in the same time. A coarser grind extracts more slowly. So with the same dose and brew time, finer = stronger. However, grind size also changes brew time in methods where water flow is controlled by the grind (like pour over), which changes how much actually ends up extracted. For immersion methods like French press, grind size is a more direct dial for strength.",
  },
  {
    q: "What is the best grind for AeroPress?",
    a: "AeroPress is the most flexible method for grind size because steep time, pressure, and water temperature can all be adjusted to compensate. A medium grind works well as a starting point for most recipes. For shorter steeps (60 to 90 seconds), grind slightly finer. For longer steeps (2 to 3 minutes) like the James Hoffmann method, grind medium-coarse. Because AeroPress uses pressure during the press, it can extract from a wider range of grind sizes than pour over can.",
  },
  {
    q: "How does grind size affect cold brew?",
    a: "Cold brew uses an extra-coarse grind because the very long steep time (12 to 24 hours) compensates for both the large particle size and the cold water temperature (which extracts much more slowly than hot). Using a medium or drip grind in cold brew produces over-extracted, astringent concentrate even after 12 hours because the finer particles add up to too much total extraction. The extra-coarse grind also makes filtering much easier.",
  },
  {
    q: "What grind size does a Baratza Encore use for V60?",
    a: "Start at setting 14 to 18 on the Baratza Encore for V60 and pour over. Setting 16 is a common starting point for a 20g dose at 1:15 ratio. If your pour over finishes too quickly (under 2.5 minutes), go lower (finer). If it stalls or takes over 4 minutes, go higher (coarser). The Encore has 40 settings, and the pour over sweet spot for most coffees falls in the lower-middle range of the dial.",
  },
  {
    q: "How do I know if my grind is too coarse or too fine?",
    a: "For pour over: too coarse means a fast brew (under 2.5 minutes) that tastes sour and thin. Too fine means a slow brew (over 4 minutes) that tastes bitter and heavy. For espresso: too coarse means a fast shot that tastes sour. Too fine means a slow shot that tastes bitter. For French press: too fine means a muddy, gritty cup with sediment. Too coarse means a thin, watery cup even after 4 minutes. The taste is more reliable than the visual check because grind appearance varies widely between different coffee origins and roast levels.",
  },
]

export default function GrindSizeGuidePage() {
  const relatedTools = getRelatedTools("grind-size-guide")
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
            Coffee Grind Size Guide
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Find the right grind size for your brew method, or look up reference settings for your
            specific grinder. Use the method tab for grind descriptions and targets, or the grinder
            tab for model-specific settings.
          </p>
        </div>

        <GrindSizeGuide />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="Grinders worth considering" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">Why grind size matters more than anything else</h2>
          <p>
            Grind size is the variable that controls extraction speed in every brew method. A finer
            grind has more surface area exposed to the water, so it extracts faster. A coarser grind
            extracts more slowly. Getting the grind right means the water pulls the right balance of
            compounds out of the coffee in the time available.
          </p>
          <p>
            The difference between a 20-second espresso and a 35-second espresso is almost always
            grind size. The difference between a pour over that finishes in 2 minutes and one that
            stalls for 5 minutes is almost always grind size. Before adjusting dose, temperature, or
            technique, adjust the grind.
          </p>
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">Burr grinder versus blade grinder</h2>
          <p>
            Burr grinders crush coffee beans between two burrs (one stationary, one spinning), producing
            particles that are mostly uniform in size. Blade grinders chop beans randomly, producing a
            mix of fine powder and large chunks. This inconsistency matters because the fine particles
            over-extract in the same time the large chunks under-extract, producing a cup that is
            simultaneously bitter and sour.
          </p>
          <p>
            The settings in this guide apply to burr grinders only. If you are using a blade grinder,
            the main thing grind size does is change the ratio of fine to coarse â€” a shorter blend produces
            more large chunks, a longer blend produces more fine dust. Neither is as consistent as a burr grinder at any setting.
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
