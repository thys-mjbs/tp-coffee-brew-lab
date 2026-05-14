import type { ComponentType } from "react"
import TheGoldenRatioContent from "@/content/blog/the-golden-ratio"
import PerfectV60Content from "@/content/blog/perfect-v60-recipe"
import FrenchPressGuideContent from "@/content/blog/french-press-guide"

export interface BlogPost {
  slug: string
  title: string
  description: string
  excerpt: string
  publishedAt: string
  readingTime: number
  category: string
  relatedToolSlugs: string[]
  Content: ComponentType
}

export const allPosts: BlogPost[] = [
  {
    slug: "the-golden-ratio",
    title: "How Much Ground Coffee Per Cup? The Golden Ratio Explained",
    description:
      "How many coffee grounds per cup? The SCA Golden Ratio is 1g per 15-18g of water — roughly 15-17g of ground coffee per 250ml cup. Includes amounts by method, pot size, and roast level.",
    excerpt:
      "How many coffee grounds per cup? The answer is 15-17g per 250ml at the standard 1:15 ratio — here is what that looks like in tablespoons, scoops, and grams for every brew method.",
    publishedAt: "2026-05-14",
    readingTime: 5,
    category: "Ratios and Basics",
    relatedToolSlugs: ["coffee-ratio-calculator", "french-press-ratio-calculator", "pour-over-calculator"],
    Content: TheGoldenRatioContent,
  },
  {
    slug: "perfect-v60-recipe",
    title: "The Perfect V60 Recipe: James Hoffmann's Method Explained",
    description:
      "Step-by-step guide to James Hoffmann's V60 method — ratio, grind size, water temperature, and the four-pour sequence. Includes the Tetsu Kasuya 4:6 method and common fixes for bitter or sour V60.",
    excerpt:
      "James Hoffmann's four-pour V60 method is the most-referenced home brew guide in specialty coffee. Here is every step, and why each one matters.",
    publishedAt: "2026-05-14",
    readingTime: 6,
    category: "Brew Guides",
    relatedToolSlugs: ["pour-over-calculator", "coffee-bloom-timer", "pour-over-timer", "grind-size-guide"],
    Content: PerfectV60Content,
  },
  {
    slug: "french-press-guide",
    title: "How Long to Steep French Press Coffee (Complete Brew Guide)",
    description:
      "How long should French press coffee steep? The standard is 4 minutes at a 1:15 ratio with a coarse grind. This guide covers steep time, what happens if you go too long, ratio, grind size, and the five most common mistakes.",
    excerpt:
      "The standard French press steep time is 4 minutes — but steep time alone does not make a great cup. Here is what actually matters and how to dial it all in.",
    publishedAt: "2026-05-14",
    readingTime: 5,
    category: "Brew Guides",
    relatedToolSlugs: ["french-press-ratio-calculator", "french-press-timer", "grind-size-guide", "cold-brew-ratio-calculator"],
    Content: FrenchPressGuideContent,
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
