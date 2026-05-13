import type { Metadata } from "next"
import { Breadcrumb } from "@/components/layout/Breadcrumb"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Coffee Brew Lab. We collect no personal data. All tool processing is browser-side only.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_APP_URL}/privacy` },
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <Breadcrumb items={[{ label: "Privacy Policy" }]} />

      <h1 className="font-display mt-6 text-3xl font-bold text-surface-800 dark:text-surface-50">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">Last updated: May 2026</p>

      <div className="mt-8 space-y-8 text-surface-700 dark:text-surface-300 leading-relaxed">

        <section>
          <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">What data we collect</h2>
          <p>
            Coffee Brew Lab collects no personal data. The tools on this site run entirely in your
            browser. No inputs you enter into any calculator or tool are transmitted to our servers
            or stored anywhere.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Analytics</h2>
          <p>
            We use Google Analytics 4 to collect anonymous, aggregated data about site usage: which
            pages are visited, how long visitors stay, and which tools are used most. This data
            contains no personally identifiable information. Google Analytics sets cookies in your
            browser to track sessions. You can opt out using the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400"
            >
              Google Analytics opt-out browser add-on
            </a>
            .
          </p>
          <p className="mt-3">
            We also use Vercel Analytics to collect anonymised performance and traffic data. Vercel
            does not use cookies and does not collect personal data.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Advertising</h2>
          <p>
            This site displays advertisements served by Google AdSense. AdSense uses cookies to
            serve ads based on your prior visits to this site and other sites. You can opt out of
            personalised advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400"
            >
              Google Ads Settings
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Affiliate links</h2>
          <p>
            Some pages contain Amazon affiliate links. As an Amazon Associate we earn from
            qualifying purchases. Clicking these links takes you to Amazon. Amazon's privacy policy
            governs any data collected there.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Cookies</h2>
          <p>
            Cookies on this site are set by Google Analytics and Google AdSense only. We do not set
            any first-party cookies ourselves. Your browser's cookie settings control whether these
            cookies are accepted.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-surface-800 dark:text-surface-100 mb-3">Contact</h2>
          <p>
            Questions about this privacy policy can be sent via the{" "}
            <a href="/contact" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
              contact page
            </a>
            .
          </p>
        </section>

      </div>
    </div>
  )
}
