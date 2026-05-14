import type { MetadataRoute } from "next"
import { tools } from "@/lib/tools"
import { allPosts } from "@/lib/blog"
import { servingVariants } from "@/lib/servingVariants"
import { getAllI18nParams } from "@/lib/i18nVariants"

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://brewlab.coffee"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: appUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${appUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${appUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${appUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${appUrl}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const blogPages: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${appUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const servingPages: MetadataRoute.Sitemap = servingVariants.map((v) => ({
    url: `${appUrl}/coffee-ratio/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const langPages: MetadataRoute.Sitemap = getAllI18nParams().map(({ lang, slug }) => ({
    url: `${appUrl}/${lang}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...toolPages, ...blogPages, ...servingPages, ...langPages]
}
