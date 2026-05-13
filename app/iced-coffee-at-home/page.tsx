import type { Metadata } from "next"
import Script from "next/script"
import { IcedCoffeeAtHome } from "@/components/tools/IcedCoffeeAtHome"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"

const tool = getToolBySlug("iced-coffee-at-home")!

export const metadata: Metadata = {
  title: "Iced Coffee at Home — Flash Brew, Cold Brew, Shaken Espresso and Coffee Ice Cubes",
  description:
    "Make iced coffee at home four different ways. Select your method and cup size to get exact amounts and step-by-step instructions — flash brew, cold brew dilution, shaken espresso, or coffee ice cubes.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/iced-coffee-at-home` },
  openGraph: {
    title: "Iced Coffee at Home Guide",
    description: "Four methods for iced coffee at home with calculated amounts for any cup size. Flash brew, cold brew dilution, shaken espresso, and coffee ice cubes.",
    type: "website",
  },
}

const faqs = [
  {
    q: "What is the best way to make iced coffee at home?",
    a: "Flash brew is the fastest method and produces the most flavourful result: brew hot coffee directly over ice using a pour-over dripper or drip machine. The ice chills the coffee instantly and melts at exactly the right ratio to give you a balanced cup. Cold brew dilution takes more preparation (12-18 hours of steeping) but is the smoothest, least acidic option. Shaken espresso requires an espresso machine but produces a frothy, cafe-quality drink. Coffee ice cubes work well if you want to brew coffee ahead of time.",
  },
  {
    q: "What is flash brew iced coffee?",
    a: "Flash brew (also called Japanese iced coffee) is a method where hot coffee is brewed directly over ice. The ice immediately chills and dilutes the coffee, but because the brew ratio accounts for the dilution in advance, the final cup is balanced rather than watered down. For a 12oz glass, you brew with about 213ml of hot water over 142g of ice. This is different from simply pouring hot coffee over ice, which results in over-diluted, flat coffee.",
  },
  {
    q: "Does iced coffee taste watery?",
    a: "Iced coffee only tastes watery if you brew it at the same ratio as hot coffee and then add ice on top. The ice melts and dilutes the drink. The fix is to brew at a stronger concentration that accounts for the ice. Flash brew uses a 60/40 split: 60% of the cup volume is brewed coffee (at 1:15) and 40% is ice. As the ice melts, it brings the final drink to the right strength. The calculator above gives you the correct ratio for any cup size.",
  },
  {
    q: "How do you make iced coffee without an espresso machine?",
    a: "Flash brew is the best non-espresso option. Use any pour-over dripper (V60, Chemex, Kalita) or a drip machine, and brew directly over ice at the ratio the calculator shows. Cold brew dilution is another excellent option: steep coarse coffee in cold water for 12-18 hours, strain, then dilute 1:1 with cold water or milk over ice. Coffee ice cubes also work well with a standard drip brewer. None of these methods require an espresso machine.",
  },
  {
    q: "What is the difference between cold brew and iced coffee?",
    a: "Cold brew is made by steeping coarse-ground coffee in cold water for 12-18 hours with no heat. It produces a smooth, low-acid concentrate with a naturally sweet flavour. Iced coffee is brewed hot (using a pour-over, drip machine, or espresso machine) and then chilled. Hot-brewed methods are faster and highlight more bright, acidic flavours. Cold brew is smoother and more forgiving. Neither is better overall — they produce genuinely different tasting results.",
  },
  {
    q: "How do you make a shaken espresso at home?",
    a: "Pull a double or triple shot of espresso (18-27g of coffee). Fill a cocktail shaker or sealed mason jar with ice and pour the espresso over it. Seal the lid and shake hard for 15-20 seconds until the shaker is very cold. The shaking aerates the espresso, lightening the texture and rounding the flavour. Strain into a glass over fresh ice and top with cold oat milk. The calculator above gives you the exact ratio for any cup size.",
  },
  {
    q: "What are coffee ice cubes and how do you use them?",
    a: "Coffee ice cubes are cubes made from brewed coffee rather than water. Because they release coffee as they melt rather than plain water, they do not dilute the drink. To make them, brew coffee at a 1:10 ratio (stronger than drinking strength) and freeze it in an ice cube tray. When you pour milk over the frozen cubes, the coffee that melts out balances the milk to approximately drinking strength. They work particularly well with cream or milk poured directly over the cubes.",
  },
  {
    q: "What grind size should I use for iced coffee?",
    a: "Grind size depends on the method. Flash brew uses the same grind as pour over: medium-fine. Cold brew concentrate uses a coarse grind, similar to French press, because the long steep compensates for the coarser particle size. Shaken espresso uses a fine grind, as you would for any espresso. Coffee ice cubes can be brewed with a medium grind in a standard drip brewer.",
  },
]

export default function IcedCoffeeAtHomePage() {
  const relatedTools = getRelatedTools("iced-coffee-at-home")
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
            Iced Coffee at Home
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Choose your method and cup size to get exact coffee, water, and ice amounts with step-by-step
            instructions. Covers flash brew, cold brew dilution, shaken espresso, and coffee ice cubes.
          </p>
        </div>

        <IcedCoffeeAtHome />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="Iced coffee equipment" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">Why most homemade iced coffee tastes watery</h2>
          <p>
            The most common mistake when making iced coffee at home is brewing at normal hot-coffee strength
            and then adding ice. The ice melts and dilutes the drink significantly, leaving a weak, flat result.
            The solution is to account for dilution in the brew ratio upfront.
          </p>
          <p>
            For flash brew, the water and ice amounts are calculated so that the melting ice brings the brew
            exactly to drinking strength. For cold brew dilution, the concentrate is strong by design and
            diluted 1:1 at serving. Coffee ice cubes solve the problem differently: they release coffee flavour
            as they melt, so the drink gets stronger rather than weaker over time.
          </p>
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">Comparing the four methods</h2>
          <p>
            Flash brew is the best all-around method if you have a pour-over dripper. It takes about the same
            time as making hot pour-over coffee and produces a brighter, more complex flavour than cold brew.
            Cold brew dilution is the right choice if you prefer low-acid, smooth coffee and do not mind
            preparing a batch the night before.
          </p>
          <p>
            Shaken espresso is the right method if you have an espresso machine and want a cafe-quality frothy
            drink. The shaking step is not optional: it aerates the espresso and changes both the texture and
            the perceived sweetness of the drink. Coffee ice cubes are ideal if you enjoy brewing in batches
            and want a format that works well with milk and cream rather than water.
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
