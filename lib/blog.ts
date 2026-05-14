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
    title: "The Golden Ratio: How Much Coffee Per Cup?",
    description:
      "The SCA Golden Ratio demystified. Learn what a 1:15 to 1:18 coffee-to-water ratio means in practice — in grams, tablespoons, and cups — and how to adjust it for any brew method.",
    excerpt:
      "The SCA Golden Ratio sets the standard for brewed coffee, but what does 1:15 or 1:18 actually mean at the kettle? Here is the practical guide.",
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
    title: "How to Make French Press Coffee: The Complete Guide",
    description:
      "The complete French press guide: ratio, grind size, water temperature, step-by-step brew process, and the five most common mistakes. Includes cold brew in a French press.",
    excerpt:
      "French press is the most forgiving brew method — but three common mistakes ruin most cups. Here is the complete guide to getting it right every time.",
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
