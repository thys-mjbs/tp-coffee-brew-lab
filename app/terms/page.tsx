import type { Metadata } from "next"
import { Breadcrumb } from "@/components/layout/Breadcrumb"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Coffee Brew Lab. Free to use, no warranty, no account required.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL}/terms` },
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <Breadcrumb items={[{ label: "Terms of Service" }]} />

      <h1 className="font-display mt-6 text-3xl font-bold text-surface-800 dark:text-surface-50">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">Last updated: May 2026</p>

      <div className="mt-8 space-y-8 text-surface-700 dark:text-surface-300 leading-relaxed">

        <section>
          <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Free to use</h2>
          <p>
            Coffee Brew Lab is free to use. No account, subscription, or payment is required to
            access any tool or guide on this site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">No warranty</h2>
          <p>
            The tools on this site are provided as-is, without warranty of any kind. Calculator
            outputs are intended as starting points and reference values. Coffee ratios are affected
            by bean origin, roast level, grind consistency, water quality, and equipment. We make no
            guarantee that any specific ratio will produce a result you enjoy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">No liability</h2>
          <p>
            Coffee Brew Lab is not liable for any outcome arising from the use of information or
            tool outputs on this site. This includes but is not limited to damage to equipment,
            wasted ingredients, or dissatisfaction with a brew result.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">No account required</h2>
          <p>
            We do not offer user accounts and do not store any personal data. See our{" "}
            <a href="/privacy" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
              Privacy Policy
            </a>{" "}
            for full details.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Acceptable use</h2>
          <p>
            You may use Coffee Brew Lab for personal, non-commercial purposes. You may not scrape,
            copy, or reproduce the site's content or tools for redistribution without permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Changes</h2>
          <p>
            These terms may be updated from time to time. Continued use of the site after any
            change constitutes acceptance of the updated terms.
          </p>
        </section>

      </div>
    </div>
  )
}
