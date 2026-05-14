import type { ComponentType } from "react"
import TheGoldenRatioContent from "@/content/blog/the-golden-ratio"

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
