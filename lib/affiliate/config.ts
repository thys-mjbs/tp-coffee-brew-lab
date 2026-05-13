export const affiliateConfig = {
  tag: "snapcalc-20",
  marketplace: "https://www.amazon.com",
} as const

export function buildAmazonSearchUrl(searchTerm: string): string {
  const encoded = encodeURIComponent(searchTerm)
  return `${affiliateConfig.marketplace}/s?k=${encoded}&tag=${affiliateConfig.tag}`
}
