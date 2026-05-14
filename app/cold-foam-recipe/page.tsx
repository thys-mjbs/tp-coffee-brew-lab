import type { Metadata } from "next"
import { ColdFoamRecipe } from "@/components/tools/ColdFoamRecipe"
import { AmazonLinks } from "@/components/affiliate/AmazonLinks"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { getToolBySlug, getRelatedTools } from "@/lib/tools"
import { webApplicationSchema, faqSchema } from "@/lib/schema"
import { ShareBar } from "@/components/ShareBar"

const tool = getToolBySlug("cold-foam-recipe")!

export const metadata: Metadata = {
  title: "Cold Foam Recipe â€” Homemade Vanilla, Sweet Cream and Plain Cold Foam",
  description:
    "Make cold foam at home in under 30 seconds. Select your milk type and serving size to get exact amounts and frothing instructions. Includes vanilla, sweet cream, brown sugar, and caramel variations.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/cold-foam-recipe` },
  openGraph: {
    title: "Cold Foam Recipe â€” Homemade Vanilla, Sweet Cream and Plain",
    description: "Milk volume calculator for homemade cold foam. Pick your milk type and serving size â€” get exact amounts, frothing method, and flavor additions instantly.",
    type: "website",
  },
}

const faqs = [
  {
    q: "What is cold foam?",
    a: "Cold foam is frothed cold milk added on top of iced coffee drinks. Unlike steamed milk foam that is served hot, cold foam is made at refrigerator temperature and sits on top of the drink rather than mixing into it. It gives iced coffee a creamy, layered texture without warming the drink. Starbucks popularised cold foam as a topping for cold brew, but it is easy to make at home with a handheld milk frother.",
  },
  {
    q: "What milk makes the best cold foam?",
    a: "Whole milk produces the best cold foam for most people. The fat content creates a thick, velvety texture that holds its shape on top of a drink. Two percent milk also works well and produces slightly lighter foam. For non-dairy cold foam, barista-edition oat milk is the best alternative. Heavy cream makes an exceptionally thick foam but is very rich and only a small amount is needed.",
  },
  {
    q: "How do you make cold foam without a frother?",
    a: "You can make cold foam without a handheld frother by using a sealed mason jar. Pour your cold milk into the jar, seal the lid tightly, and shake hard for 30-45 seconds until the milk thickens and doubles in volume. This works best with whole milk or heavy cream. Another option is to use a French press: pour cold milk into the press, then pump the plunger up and down rapidly for 20-30 seconds to aerate it.",
  },
  {
    q: "How do you make vanilla sweet cream cold foam?",
    a: "Vanilla sweet cream cold foam uses a mixture of heavy cream and milk (roughly half and half) with vanilla syrup. Combine cold milk, heavy cream, and vanilla syrup in the ratios shown in the calculator above. Froth until thick but still pourable. The result is richer than plain cold foam and is the base for Starbucks-style sweet cream cold foam. Use a handheld frother or shake in a sealed jar.",
  },
  {
    q: "Why does my cold foam melt too fast?",
    a: "Cold foam breaks down quickly for a few reasons. The most common cause is using warm milk â€” always froth milk straight from the fridge. Skim milk and low-fat plant milks produce lighter foam that dissipates faster. Using whole milk or adding a small amount of heavy cream will produce denser foam that lasts longer on top of the drink. Frothing for long enough also matters: under-frothed foam will be thin and watery.",
  },
  {
    q: "Can you make cold foam with oat milk?",
    a: "Yes, but use barista-edition oat milk rather than standard oat milk. Barista formulas contain more fat and added stabilisers that allow them to froth properly. Standard oat milk produces foam that is thin and separates quickly. Froth barista oat milk for 30-40 seconds with a handheld frother. The foam will be lighter than dairy cold foam but still adds a pleasant creamy layer to iced coffee.",
  },
  {
    q: "How much cold foam should go on a drink?",
    a: "For a 12oz drink, a 6oz cold foam serving is the standard. For an 8oz drink, 4oz of cold foam is usually enough. For larger 16 to 20oz drinks, 8oz of foam works well. The calculator on this page gives you the right milk amount for each serving size. You can adjust to taste â€” more foam gives a creamier sip, less foam lets the coffee flavour come through more directly.",
  },
  {
    q: "Can you make cold foam with coconut milk?",
    a: "Yes, but use full-fat canned coconut milk rather than the refrigerated carton version. The fat content in full-fat canned coconut milk is high enough to froth. Chill it thoroughly before frothing â€” cold temperature is especially important for coconut milk. Froth for 30-40 seconds. The resulting foam has a mild coconut flavour that pairs well with cold brew and works with most syrups.",
  },
]

export default function ColdFoamRecipePage() {
  const relatedTools = getRelatedTools("cold-foam-recipe")
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
            Cold Foam Recipe Guide
          </h1>
          <p className="mt-3 text-base text-surface-600 dark:text-surface-300 leading-relaxed">
            Select your milk type, serving size, and flavor to get exact amounts and frothing instructions
            for homemade cold foam. Includes vanilla, sweet cream, brown sugar cinnamon, and caramel variations.
          </p>
        </div>

        <ColdFoamRecipe />

        <ShareBar title="Cold Foam Recipe Guide — Coffee Brew Lab" url={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"}/cold-foam-recipe`} />

        <div className="mt-8">
          <AmazonLinks searchTerms={tool.amazonTerms} heading="Cold foam essentials" />
        </div>

        <article className="mt-12 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed text-[0.9375rem]">
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">What is cold foam and why does it work?</h2>
          <p>
            Cold foam is frothed cold milk that sits on top of iced coffee drinks rather than mixing
            into them. Because it is made cold, it stays in a semi-stable layer on the surface of the drink,
            giving each sip a creamy texture before the foam slowly dissolves into the coffee below.
          </p>
          <p>
            The physics that make cold foam work are the same as any foam: air is trapped in the liquid
            by proteins in the milk. In hot milk foam, heat helps denature the proteins quickly. In cold foam,
            the milk needs to be agitated more vigorously because the proteins are less active at lower
            temperatures. That is why cold foam requires 20-30 seconds of consistent frothing where hot
            foam might take 10.
          </p>
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100">Choosing the right milk</h2>
          <p>
            Whole milk is the best starting point for cold foam because the fat creates a dense, stable
            foam with a velvety texture. Two percent milk works almost as well and produces a slightly
            lighter result. If you prefer non-dairy, barista-edition oat milk is the most reliable
            alternative because it contains added stabilisers and fat that allow it to foam properly.
          </p>
          <p>
            Heavy cream is a special case. It produces extremely thick, rich foam but requires far less
            than dairy milk. A 6oz serving of heavy cream cold foam might use only 72ml of cream instead
            of 180ml of milk. Shake it or froth it briefly, and stop when it thickens. Heavy cream cold
            foam is the base for Starbucks sweet cream cold foam.
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
