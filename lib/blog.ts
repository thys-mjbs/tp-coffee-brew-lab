import type { ComponentType } from "react"
import TheGoldenRatioContent from "@/content/blog/the-golden-ratio"
import PerfectV60Content from "@/content/blog/perfect-v60-recipe"
import FrenchPressGuideContent from "@/content/blog/french-press-guide"
import AeroPressInvertedContent from "@/content/blog/aeropress-inverted-method"
import EspressoGrindSizeContent from "@/content/blog/espresso-grind-size-guide"
import ColdBrewAtHomeContent from "@/content/blog/cold-brew-at-home"
import MokaPotMistakesContent from "@/content/blog/moka-pot-mistakes"
import HowToSteepCoffeeContent from "@/content/blog/how-to-steep-coffee"
import EspressoDialInGuideContent from "@/content/blog/espresso-dial-in-guide"
import HowToUseColdBrewContent from "@/content/blog/how-to-use-cold-brew"

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
      "How many coffee grounds per cup? The SCA Golden Ratio is 1g per 15-18g of water – roughly 15-17g of ground coffee per 250ml cup. Includes amounts by method, pot size, and roast level.",
    excerpt:
      "How many coffee grounds per cup? The answer is 15-17g per 250ml at the standard 1:15 ratio – here is what that looks like in tablespoons, scoops, and grams for every brew method.",
    publishedAt: "2026-04-25",
    readingTime: 5,
    category: "Ratios and Basics",
    relatedToolSlugs: ["coffee-ratio-calculator", "french-press-ratio-calculator", "pour-over-calculator"],
    Content: TheGoldenRatioContent,
  },
  {
    slug: "perfect-v60-recipe",
    title: "The Perfect V60 Recipe: James Hoffmann's Method Explained",
    description:
      "Step-by-step guide to James Hoffmann's V60 method – ratio, grind size, water temperature, and the four-pour sequence. Includes the Tetsu Kasuya 4:6 method and common fixes for bitter or sour V60.",
    excerpt:
      "James Hoffmann's four-pour V60 method is the most-referenced home brew guide in specialty coffee. Here is every step, and why each one matters.",
    publishedAt: "2026-04-28",
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
      "The standard French press steep time is 4 minutes – but steep time alone does not make a great cup. Here is what actually matters and how to dial it all in.",
    publishedAt: "2026-05-01",
    readingTime: 5,
    category: "Brew Guides",
    relatedToolSlugs: ["french-press-ratio-calculator", "french-press-timer", "grind-size-guide", "cold-brew-ratio-calculator"],
    Content: FrenchPressGuideContent,
  },
  {
    slug: "aeropress-inverted-method",
    title: "The Inverted AeroPress Method: Step-by-Step Recipe Guide",
    description:
      "The inverted AeroPress method flips the brewer upside down during steeping for full immersion and even extraction. Includes a standard inverted recipe, James Hoffmann's AeroPress method, ratio, steep time, and inverted vs standard comparison.",
    excerpt:
      "The inverted AeroPress method stops water draining before the steep is done – giving you full immersion, an even extraction, and consistent results every time. Here is the recipe.",
    publishedAt: "2026-05-04",
    readingTime: 6,
    category: "Brew Guides",
    relatedToolSlugs: ["aeropress-recipe", "aeropress-timer", "grind-size-guide", "coffee-bloom-timer"],
    Content: AeroPressInvertedContent,
  },
  {
    slug: "espresso-grind-size-guide",
    title: "Best Grind Size for Espresso: Chart, Dial-In Guide, and Fixes",
    description:
      "The best grind size for espresso produces a 25-30g yield in 25-35 seconds. Includes an espresso grind size chart by grinder model, how to fix sour or bitter espresso, and a step-by-step dial-in sequence.",
    excerpt:
      "The correct espresso grind is fine – but exactly how fine depends on your grinder, machine, and coffee. Here is how to find the right setting and dial it in from there.",
    publishedAt: "2026-05-07",
    readingTime: 6,
    category: "Grind and Technique",
    relatedToolSlugs: ["espresso-dial-in", "espresso-ratio-calculator", "grind-size-guide", "coffee-troubleshooter"],
    Content: EspressoGrindSizeContent,
  },
  {
    slug: "cold-brew-at-home",
    title: "Cold Brew at Home: French Press Ratio, Steep Time, and Recipe",
    description:
      "The French press cold brew ratio is 1:8 for ready-to-drink (75g coffee per 600ml) or 1:5 for concentrate. Includes a full cold brew at home recipe, steep time guide, AeroPress cold brew method, and common mistakes.",
    excerpt:
      "French press cold brew uses a 1:8 ratio for ready-to-drink or 1:5 for concentrate. Steep in the fridge for 12-24 hours. Here is the full recipe and everything that affects the result.",
    publishedAt: "2026-05-10",
    readingTime: 5,
    category: "Brew Guides",
    relatedToolSlugs: ["cold-brew-ratio-calculator", "cold-brew-recipe", "french-press-ratio-calculator", "french-press-timer"],
    Content: ColdBrewAtHomeContent,
  },
  {
    slug: "moka-pot-mistakes",
    title: "Best Grind Size for Moka Pot (and the 5 Most Common Mistakes)",
    description:
      "The best grind size for moka pot is medium-fine – finer than drip, coarser than espresso. Includes grind settings by grinder model, the 5 most common moka pot mistakes, ratio guide, and why moka pot coffee tastes bitter.",
    excerpt:
      "Medium-fine grind is the single most important setting for a good moka pot. Here are the reference settings by grinder and the five mistakes that ruin most home moka pot brews.",
    publishedAt: "2026-05-11",
    readingTime: 5,
    category: "Grind and Technique",
    relatedToolSlugs: ["moka-pot-calculator", "grind-size-guide", "coffee-troubleshooter"],
    Content: MokaPotMistakesContent,
  },
  {
    slug: "how-to-steep-coffee",
    title: "How to Steep Coffee: Brew Times, Water Temperature, and Method Guide",
    description:
      "How to steep coffee: French press steeps 4 minutes at 90-96°C, cold brew 12-24 hours in the fridge, AeroPress 1-2 minutes at 80-92°C. Covers all immersion methods with specific times, temperatures, and grind sizes.",
    excerpt:
      "Steeping time, water temperature, and grind size all interact – change one without the others and the result shifts. Here are the correct settings for every steeping method.",
    publishedAt: "2026-05-12",
    readingTime: 6,
    category: "Ratios and Basics",
    relatedToolSlugs: ["french-press-timer", "coffee-bloom-timer", "aeropress-recipe", "cold-brew-ratio-calculator"],
    Content: HowToSteepCoffeeContent,
  },
  {
    slug: "espresso-dial-in-guide",
    title: "Why Is My Espresso Sour or Bitter? How to Dial In Your Shot",
    description:
      "Sour espresso means under-extraction – grind finer or increase dose. Bitter espresso means over-extraction – grind coarser or reduce shot time. Step-by-step dial-in sequence with a quick reference chart.",
    excerpt:
      "Sour espresso is under-extracted. Bitter espresso is over-extracted. Here is the exact sequence to fix either problem without changing more than one variable at a time.",
    publishedAt: "2026-05-13",
    readingTime: 6,
    category: "Grind and Technique",
    relatedToolSlugs: ["espresso-dial-in", "espresso-ratio-calculator", "grind-size-guide", "coffee-troubleshooter"],
    Content: EspressoDialInGuideContent,
  },
  {
    slug: "how-to-use-cold-brew",
    title: "How to Use Cold Brew Coffee: Concentrate, Lattes, Hot and Iced",
    description:
      "How to use cold brew: serve straight over ice (1:8 brew), dilute 1:1 with water or milk (concentrate), or heat gently for a smooth hot coffee. Covers storage, shelf life, iced latte ratios, and cold brew vs iced coffee.",
    excerpt:
      "Cold brew concentrate is too strong to drink straight – dilute 1:1 before serving. Here is every practical way to use cold brew once you have brewed it.",
    publishedAt: "2026-05-14",
    readingTime: 5,
    category: "Brew Guides",
    relatedToolSlugs: ["cold-brew-ratio-calculator", "cold-brew-recipe", "iced-coffee-at-home"],
    Content: HowToUseColdBrewContent,
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
