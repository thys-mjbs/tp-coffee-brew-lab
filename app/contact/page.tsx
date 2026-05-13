import type { Metadata } from "next"
import { Breadcrumb } from "@/components/layout/Breadcrumb"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Coffee Brew Lab. We respond to questions about the tools and guides within a few days.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL}/contact` },
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <Breadcrumb items={[{ label: "Contact" }]} />

      <h1 className="font-display mt-6 text-3xl font-bold text-surface-800 dark:text-surface-50">
        Contact
      </h1>

      <div className="mt-8 space-y-6 text-surface-700 dark:text-surface-300 leading-relaxed">
        <p>
          Found a bug in one of the calculators? Have a suggestion for a new tool or brew method?
          Get in touch and we will get back to you within a few days.
        </p>

        <div className="rounded-xl border border-surface-200 bg-surface-100 p-6 dark:border-surface-700 dark:bg-surface-800">
          <p className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">Email</p>
          <a
            href="mailto:thys@mjbstrategic.com"
            className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 font-medium"
          >
            thys@mjbstrategic.com
          </a>
        </div>

        <p className="text-sm text-surface-500 dark:text-surface-400">
          We do not offer personalised coffee coaching or consultations. For general brew questions,
          the{" "}
          <a href="/coffee-troubleshooter" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
            Coffee Troubleshooter
          </a>{" "}
          tool is a good place to start.
        </p>
      </div>
    </div>
  )
}
