import type { Metadata } from "next"
import { Outfit, Fraunces, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
})

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
})

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Coffee Brew Lab — Ratio Calculators and Guides for Every Method",
    template: "%s | Coffee Brew Lab",
  },
  description:
    "Free coffee brewing calculators, ratio guides, and method-specific brew tools for home baristas. Perfect ratios for French press, V60, AeroPress, espresso, and more.",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: appUrl,
    siteName: "Coffee Brew Lab",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Coffee Brew Lab" }],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${fraunces.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
