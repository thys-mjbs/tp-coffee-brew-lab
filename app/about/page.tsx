import type { Metadata } from "next"
import { Breadcrumb } from "@/components/layout/Breadcrumb"

export const metadata: Metadata = {
  title: "About",
  description: "Coffee Brew Lab is a free collection of brewing calculators and ratio guides for home coffee enthusiasts. No sign-up, no ads obscuring the tools.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL}/about` },
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <Breadcrumb items={[{ label: "About" }]} />

      <h1 className="font-display mt-6 text-3xl font-bold text-surface-800 dark:text-surface-50">
        About Coffee Brew Lab
      </h1>

      <div className="mt-8 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed">
        <p>
          Coffee Brew Lab is a free set of brewing calculators and method guides built for home
          coffee enthusiasts. Whether you are dialling in your espresso, calculating your French
          press ratio, or figuring out how much cold brew to make for the week, the tools here give
          you a precise starting point without requiring a spreadsheet or a search through forum
          threads.
        </p>

        <p>
          Every tool runs entirely in your browser. Nothing is sent to a server. There are no
          accounts, no email sign-ups, and no data stored anywhere. You get a result, and that is
          the end of it.
        </p>

        <p>
          The site was built because the most useful coffee ratio information online is scattered
          across brand websites, Reddit threads, and YouTube comments — none of which give you an
          interactive calculator that adjusts to your actual equipment and serving size. Coffee Brew
          Lab puts all of that in one place, organised by brew method, and usable in seconds.
        </p>

        <p>
          The calculators cover ratios and measurements for drip coffee, French press, V60 and
          other pour over methods, AeroPress, espresso, moka pot, cold brew, and instant coffee.
          Alongside the calculators there are brew guides, grind size references, and a
          troubleshooter for when a brew goes wrong.
        </p>

        <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-100 mt-10">
          A note on ratios
        </h2>

        <p>
          The outputs from these calculators are starting points, not rules. Coffee preferences are
          personal, beans vary, and grinders differ. Use the numbers as a baseline, then adjust to
          taste. The troubleshooter is there for when you need to work out which variable to change.
        </p>
      </div>
    </div>
  )
}
