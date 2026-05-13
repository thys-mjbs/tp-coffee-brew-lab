import type { Metadata } from "next"
import Script from "next/script"
import { AeroPressRecipe } from "@/components/tools/AeroPressRecipe"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"

const tool = getToolBySlug("aeropress-recipe")!

export const metadata: Metadata = {
  title: "AeroPress Recipe Guide — Standard, Inverted, Hoffmann, and Iced Methods",
  description:
    "The best AeroPress recipes in one place: standard, inverted, James Hoffmann, and iced AeroPress. Step-by-step instructions with ratio, grind, temperature, and timing.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/aeropress-recipe` },
  openGraph: {
    title: "AeroPress Recipe Guide",
    description: "Standard, inverted, James Hoffmann, and iced AeroPress recipes with step-by-step instructions and exact ratios.",
    type: "website",
  },
}

const faqs = [
  {
    q: "What is the best AeroPress recipe for beginners?",
    a: "The standard method is the easiest starting point: 17g of coffee, 240ml of water at 94C, a 30-second bloom, a brief stir, then press at 1 minute. Total time is under 2 minutes and the technique is forgiving — even if your grind is slightly off, the result is usually drinkable. Once you are comfortable with that, try the James Hoffmann method for a more refined and consistently excellent cup.",
  },
  {
    q: "What is the James Hoffmann AeroPress recipe?",
    a: "Hoffmann's AeroPress recipe uses 11g of coffee to 200ml of boiling water (100C) in the inverted position. Pour all the water in at once without stirring, cap immediately, and wait 2 minutes before flipping and pressing very slowly. The absence of stirring and the use of boiling water produces a more uniform extraction than the standard method. It is simpler than it sounds and produces a remarkably clean, balanced cup.",
  },
  {
    q: "What is the inverted AeroPress method?",
    a: "The inverted method places the AeroPress upside down with the plunger partially inserted at the bottom. This creates a sealed chamber that prevents water from dripping through during the steep, allowing for a longer, more controlled extraction. It produces a fuller-bodied cup than the standard method. The main challenge is the flip — practice the motion before you have a full cup of hot coffee in your hands.",
  },
  {
    q: "How fine should I grind for AeroPress?",
    a: "Medium-fine is the standard recommendation for AeroPress — between drip coffee and espresso, roughly the texture of table salt. For the Hoffmann method, a slightly coarser medium grind works well because the longer steep and no-stir technique compensates. For shorter steep times (standard method under 2 minutes), a finer grind extracts more efficiently. Adjust grind size based on taste: too sour means grind finer or steep longer; too bitter means grind coarser or steep shorter.",
  },
  {
    q: "Can you make espresso-style coffee with an AeroPress?",
    a: "AeroPress cannot produce true espresso — it does not generate the 9 bar of pressure required. However, using a small amount of water (around 50 to 60ml) and a fine grind, you can produce a concentrated shot that works well as a base for milk drinks like lattes and flat whites. This is sometimes called 'AeroPress espresso' or an 'AeroPress lungo.' The Iced AeroPress method on this page uses a similar concentrated brew principle.",
  },
  {
    q: "How do you make iced coffee with an AeroPress?",
    a: "Brew a hot concentrate (20g of coffee to 150ml of water) directly over a glass full of ice. The hot concentrate chills instantly as it hits the ice, which stops extraction immediately and prevents dilution bitterness. This Japanese flash-chill technique works particularly well with AeroPress because the full immersion brewing extracts more flavour at a higher concentration, producing a richer iced coffee than simply pouring drip coffee over ice.",
  },
  {
    q: "Do you need to rinse the AeroPress paper filter?",
    a: "Yes — rinsing the paper filter with hot water before brewing removes the papery taste that unrinsed filters can impart. It also pre-heats the AeroPress chamber and your cup, which helps maintain water temperature during the brew. This step takes 10 seconds and makes a noticeable difference in the final cup, especially at lighter roast levels where subtle flavours are easier to detect.",
  },
  {
    q: "Can you reuse AeroPress paper filters?",
    a: "AeroPress paper filters can be rinsed and reused a few times before they start to affect flow rate. Rinse the used filter immediately after brewing, let it dry, and store it flat. Most users get 2 to 4 uses from a single filter. Alternatively, a metal reusable filter produces a slightly oilier cup similar to French press — no paper taste, slightly more body, less clarity. Both work well; it depends on your cup preference.",
  },
]

export default function AeroPressRecipePage() {
  const relatedTools = getRelatedTools("aeropress-recipe")
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
            AeroPress Recipe Guide
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Four AeroPress methods — standard, inverted, James Hoffmann, and iced — with step-by-step
            instructions, exact ratios, and timing for each.
          </p>
        </div>

        <AeroPressRecipe />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="AeroPress essentials" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            Why AeroPress produces such good coffee
          </h2>
          <p>
            AeroPress is a full-immersion brewer with pressure-assisted filtration. The grounds
            steep in the water for the entire brew time — like French press — but instead of
            plunging a metal mesh through the liquid, you push the water through a paper or metal
            filter at the bottom. The paper filter removes oils and fine particles, producing a
            cup that is cleaner than French press but richer and more concentrated than drip.
          </p>
          <p>
            The short brew time (1 to 3 minutes) and relatively forgiving technique make it
            one of the most consistent home brewers available. Unlike espresso, there is no machine
            to dial in. Unlike French press, there is no sludge. Unlike pour over, the pour
            technique is not critical to the outcome. Most variables are controlled by grind size
            and steep time, both of which are straightforward to adjust.
          </p>

          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">
            Which method should you start with?
          </h2>
          <p>
            Start with standard. It is the method AeroPress was designed for, it takes under
            2 minutes, and it teaches you the core variables — grind size, water temperature, and
            steep time — without any technique risk. Once you are comfortable, try the Hoffmann
            method: it is nearly as simple but produces a noticeably more refined cup. The
            inverted method is worth learning eventually, but master the flip motion with cold
            water first.
          </p>

          <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
            Adjusting for taste
          </h3>
          <p>
            AeroPress responds quickly to grind adjustments. If the cup is sour or weak, grind
            finer or extend the steep by 15 to 30 seconds. If it is bitter or harsh, grind
            coarser or reduce the steep time. Water temperature is the secondary lever — lower
            temperatures extract less aggressively, which can help with dark roasts or pre-ground
            coffee that tends toward bitterness.
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
