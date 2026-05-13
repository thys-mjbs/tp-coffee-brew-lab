export type ToolCategory = "ratio" | "recipe" | "timer" | "guide" | "calculator"

export interface Tool {
  slug: string
  title: string
  shortTitle: string
  description: string
  category: ToolCategory
  amazonTerms: string[]
  relatedSlugs: string[]
}

export const tools: Tool[] = [
  {
    slug: "coffee-ratio-calculator",
    title: "Coffee-to-Water Ratio Calculator",
    shortTitle: "Ratio Calculator",
    description:
      "Calculate exactly how much ground coffee to use per cup, per pot, or per litre — in grams, tablespoons, or scoops. Works for any drip or filter method.",
    category: "ratio",
    amazonTerms: ["coffee scale", "coffee measuring scoop", "drip coffee maker"],
    relatedSlugs: ["french-press-ratio-calculator", "coffee-measurement-converter", "coffee-beans-per-cup", "pour-over-calculator"],
  },
  {
    slug: "french-press-ratio-calculator",
    title: "French Press Ratio Calculator",
    shortTitle: "French Press Ratio",
    description:
      "Get the right coffee-to-water ratio for your French press. Enter your press size and strength preference to get grams and tablespoons instantly.",
    category: "ratio",
    amazonTerms: ["french press coffee maker", "coffee scale", "burr coffee grinder"],
    relatedSlugs: ["coffee-ratio-calculator", "french-press-timer", "cold-brew-ratio-calculator", "coffee-measurement-converter"],
  },
  {
    slug: "instant-coffee-calculator",
    title: "Instant Coffee Calculator",
    shortTitle: "Instant Coffee",
    description:
      "Find out how many teaspoons, tablespoons, or grams of instant coffee to use per cup. Includes presets for Nescafe, Cafe Bustelo, and standard instant coffee.",
    category: "calculator",
    amazonTerms: ["instant coffee", "electric kettle", "coffee mug set"],
    relatedSlugs: ["coffee-ratio-calculator", "coffee-measurement-converter", "caffeine-calculator", "coffee-cost-calculator"],
  },
  {
    slug: "coffee-beans-per-cup",
    title: "Coffee Beans per Cup Calculator",
    shortTitle: "Beans per Cup",
    description:
      "How many whole coffee beans do you need per cup? Enter your cup size and brew ratio to get the answer in grams, tablespoons, ounces, or bean count.",
    category: "calculator",
    amazonTerms: ["burr coffee grinder", "coffee scale", "coffee storage container"],
    relatedSlugs: ["coffee-ratio-calculator", "coffee-measurement-converter", "grind-size-guide", "coffee-cost-calculator"],
  },
  {
    slug: "coffee-measurement-converter",
    title: "Coffee Measurement Converter",
    shortTitle: "Measurement Converter",
    description:
      "Convert coffee measurements instantly: grams to tablespoons, tablespoons to teaspoons, scoops to grams, and more. Essential for following any recipe.",
    category: "calculator",
    amazonTerms: ["coffee measuring spoon", "coffee scale", "kitchen scale"],
    relatedSlugs: ["coffee-ratio-calculator", "coffee-beans-per-cup", "instant-coffee-calculator", "french-press-ratio-calculator"],
  },
  {
    slug: "pour-over-calculator",
    title: "Pour Over and V60 Recipe Calculator",
    shortTitle: "Pour Over Calculator",
    description:
      "Calculate your pour over ratio and get step-by-step recipes for V60, Chemex, and Kalita Wave. Includes James Hoffmann and Tetsu Kasuya V60 presets.",
    category: "recipe",
    amazonTerms: ["v60 dripper", "gooseneck kettle", "v60 filter papers"],
    relatedSlugs: ["pour-over-timer", "coffee-bloom-timer", "iced-pour-over-calculator", "coffee-ratio-calculator"],
  },
  {
    slug: "aeropress-recipe",
    title: "AeroPress Recipe Guide",
    shortTitle: "AeroPress Recipe",
    description:
      "The best AeroPress recipes in one place: standard method, inverted method, James Hoffmann recipe, and iced AeroPress. Includes ratio, grind, temperature, and timing.",
    category: "recipe",
    amazonTerms: ["aeropress coffee maker", "aeropress filter papers", "coffee scale"],
    relatedSlugs: ["aeropress-timer", "aeropress-espresso", "coffee-ratio-calculator", "pour-over-calculator"],
  },
  {
    slug: "cold-brew-ratio-calculator",
    title: "Cold Brew Ratio Calculator",
    shortTitle: "Cold Brew Ratio",
    description:
      "Calculate the right coffee-to-water ratio for cold brew — whether you want a concentrate (1:4) or ready-to-drink (1:8). Works for French press, mason jar, and dedicated brewers.",
    category: "ratio",
    amazonTerms: ["cold brew coffee maker", "cold brew pitcher", "wide mouth mason jar"],
    relatedSlugs: ["cold-brew-recipe", "french-press-ratio-calculator", "coffee-ratio-calculator", "iced-coffee-at-home"],
  },
  {
    slug: "caffeine-calculator",
    title: "Coffee Caffeine Calculator",
    shortTitle: "Caffeine Calculator",
    description:
      "Estimate the caffeine content in your cup based on brew method, coffee amount, and roast level. Compare espresso, drip, cold brew, and instant coffee.",
    category: "calculator",
    amazonTerms: ["coffee mug", "coffee subscription box", "insulated travel mug"],
    relatedSlugs: ["coffee-ratio-calculator", "espresso-ratio-calculator", "instant-coffee-calculator", "coffee-troubleshooter"],
  },
  {
    slug: "espresso-ratio-calculator",
    title: "Espresso Ratio Calculator",
    shortTitle: "Espresso Ratio",
    description:
      "Calculate espresso dose and yield ratios for espresso (1:2), ristretto (1:1), lungo (1:3), and custom ratios. Enter your dose to get your target yield in grams.",
    category: "ratio",
    amazonTerms: ["espresso machine", "portafilter scale", "espresso tamper"],
    relatedSlugs: ["espresso-dial-in", "milk-coffee-ratio-calculator", "coffee-troubleshooter", "grind-size-guide"],
  },
  {
    slug: "milk-coffee-ratio-calculator",
    title: "Milk Coffee Ratio Calculator",
    shortTitle: "Milk Ratio Calculator",
    description:
      "Find the right coffee-to-milk ratio for cafe au lait, latte, flat white, cortado, and macchiato. Get exact amounts for any cup size.",
    category: "ratio",
    amazonTerms: ["milk frother", "espresso machine", "oat milk barista edition"],
    relatedSlugs: ["espresso-ratio-calculator", "cold-foam-recipe", "coffee-ratio-calculator", "caffeine-calculator"],
  },
  {
    slug: "iced-pour-over-calculator",
    title: "Iced Coffee Pour Over Calculator",
    shortTitle: "Iced Pour Over",
    description:
      "Calculate the ratio for Japanese-style iced pour over and iced V60. Brew hot directly over ice using the correct adjusted ratio so your coffee stays full-flavoured, not watery.",
    category: "ratio",
    amazonTerms: ["v60 dripper", "ice cube tray", "cold brew carafe"],
    relatedSlugs: ["pour-over-calculator", "iced-coffee-at-home", "coffee-ratio-calculator", "coffee-bloom-timer"],
  },
  {
    slug: "french-press-timer",
    title: "French Press Brew Timer and Guide",
    shortTitle: "French Press Timer",
    description:
      "A step-by-step French press guide with a built-in countdown timer. Covers grind, water temperature, steep time, and plunge technique for a perfect brew every time.",
    category: "timer",
    amazonTerms: ["french press coffee maker", "coffee timer", "gooseneck kettle"],
    relatedSlugs: ["french-press-ratio-calculator", "coffee-bloom-timer", "grind-size-guide", "coffee-troubleshooter"],
  },
  {
    slug: "coffee-troubleshooter",
    title: "Coffee Troubleshooter",
    shortTitle: "Troubleshooter",
    description:
      "Is your coffee too bitter, too sour, too weak, or too strong? Answer a few questions about your brew and get a specific fix — grind, ratio, temperature, or technique.",
    category: "guide",
    amazonTerms: ["burr coffee grinder", "coffee scale", "water filter for coffee"],
    relatedSlugs: ["grind-size-guide", "espresso-dial-in", "coffee-ratio-calculator", "french-press-timer"],
  },
  {
    slug: "grind-size-guide",
    title: "Coffee Grind Size Guide",
    shortTitle: "Grind Size Guide",
    description:
      "Find the right grind size for every brew method and grinder model. Covers espresso, V60, French press, AeroPress, cold brew, and moka pot with reference settings for Baratza, Breville, Comandante, 1Zpresso, and Timemore grinders.",
    category: "guide",
    amazonTerms: ["burr coffee grinder", "baratza encore grinder", "comandante hand grinder"],
    relatedSlugs: ["coffee-troubleshooter", "espresso-dial-in", "french-press-ratio-calculator", "pour-over-calculator"],
  },
  {
    slug: "hario-switch-recipe",
    title: "Hario Switch Recipe Calculator",
    shortTitle: "Hario Switch Recipe",
    description:
      "Recipes and ratio calculator for the Hario Immersion Switch. Get the ideal dose, water amount, and timing for both the immersion and drip modes of this hybrid brewer.",
    category: "recipe",
    amazonTerms: ["hario switch immersion dripper", "v60 filter papers", "gooseneck kettle"],
    relatedSlugs: ["pour-over-calculator", "pour-over-timer", "coffee-bloom-timer", "grind-size-guide"],
  },
  {
    slug: "cold-foam-recipe",
    title: "Cold Foam Recipe Guide",
    shortTitle: "Cold Foam Recipe",
    description:
      "How to make cold foam at home: vanilla sweet cream cold foam, plain cold foam, and flavoured variations. Includes milk type, ratios, frother technique, and Starbucks-style recipes.",
    category: "recipe",
    amazonTerms: ["handheld milk frother", "vanilla syrup for coffee", "cold foam pitcher"],
    relatedSlugs: ["milk-coffee-ratio-calculator", "iced-coffee-at-home", "cold-brew-recipe", "caffeine-calculator"],
  },
  {
    slug: "aeropress-timer",
    title: "AeroPress Brew Timer",
    shortTitle: "AeroPress Timer",
    description:
      "A step-by-step AeroPress brew timer with countdown for each stage: bloom, steep, and press. Covers the standard method and the inverted method with adjustable steep times.",
    category: "timer",
    amazonTerms: ["aeropress coffee maker", "aeropress filter papers", "coffee scale"],
    relatedSlugs: ["aeropress-recipe", "coffee-bloom-timer", "grind-size-guide", "coffee-ratio-calculator"],
  },
  {
    slug: "cold-brew-recipe",
    title: "Cold Brew Recipe Guide",
    shortTitle: "Cold Brew Recipe",
    description:
      "How to make cold brew coffee at home: equipment, grind size, ratio, steep time, and storage. Covers both concentrate (for drinks) and ready-to-drink cold brew, plus a French press method.",
    category: "recipe",
    amazonTerms: ["cold brew coffee maker", "cold brew pitcher", "coffee grinder for cold brew"],
    relatedSlugs: ["cold-brew-ratio-calculator", "iced-coffee-at-home", "french-press-ratio-calculator", "coffee-ratio-calculator"],
  },
  {
    slug: "iced-coffee-at-home",
    title: "Iced Coffee at Home Guide",
    shortTitle: "Iced Coffee at Home",
    description:
      "Every way to make iced coffee at home: cold brew, Japanese iced pour over, flash brew, and simple iced drip. Includes ratios, brew times, and equipment for each method.",
    category: "recipe",
    amazonTerms: ["cold brew pitcher", "iced coffee maker", "ice cube tray"],
    relatedSlugs: ["cold-brew-recipe", "cold-brew-ratio-calculator", "iced-pour-over-calculator", "cold-foam-recipe"],
  },
  {
    slug: "moka-pot-calculator",
    title: "Moka Pot Brew Calculator",
    shortTitle: "Moka Pot Calculator",
    description:
      "Calculate the right amount of coffee and water for your moka pot. Covers 1-cup, 3-cup, 6-cup, and 9-cup sizes with grind size and technique tips to avoid bitter results.",
    category: "calculator",
    amazonTerms: ["moka pot stovetop espresso", "coffee grinder fine grind", "coffee scale"],
    relatedSlugs: ["espresso-ratio-calculator", "grind-size-guide", "coffee-ratio-calculator", "coffee-troubleshooter"],
  },
  {
    slug: "coffee-bloom-timer",
    title: "Coffee Bloom Timer",
    shortTitle: "Bloom Timer",
    description:
      "A dedicated timer for the coffee bloom (pre-infusion). Set your bloom time — typically 30 to 45 seconds — get an alert, then continue your pour. Works for V60, Chemex, Kalita, and AeroPress.",
    category: "timer",
    amazonTerms: ["gooseneck kettle", "v60 pour over set", "coffee scale with timer"],
    relatedSlugs: ["pour-over-timer", "pour-over-calculator", "aeropress-timer", "french-press-timer"],
  },
  {
    slug: "espresso-dial-in",
    title: "Espresso Dial-In Calculator",
    shortTitle: "Espresso Dial-In",
    description:
      "Dial in your espresso using dose, yield, and shot time. Enter your current result and get a specific adjustment: grind finer, grind coarser, adjust dose, or change yield. Covers flat whites, lattes, and straight shots.",
    category: "calculator",
    amazonTerms: ["espresso scale", "espresso machine home", "coffee grinder espresso"],
    relatedSlugs: ["espresso-ratio-calculator", "grind-size-guide", "coffee-troubleshooter", "milk-coffee-ratio-calculator"],
  },
  {
    slug: "coffee-cost-calculator",
    title: "Coffee Cost Calculator",
    shortTitle: "Cost Calculator",
    description:
      "Calculate the cost per cup of your coffee based on bag price, bag weight, and your brew ratio. Compare specialty coffee vs. supermarket coffee and see how much your daily habit really costs.",
    category: "calculator",
    amazonTerms: ["specialty coffee beans", "coffee storage container airtight", "coffee subscription"],
    relatedSlugs: ["coffee-ratio-calculator", "instant-coffee-calculator", "coffee-beans-per-cup", "caffeine-calculator"],
  },
  {
    slug: "pour-over-timer",
    title: "Pour Over Brew Timer",
    shortTitle: "Pour Over Timer",
    description:
      "A step-by-step pour over timer with alerts for bloom, each pour, and drawdown. Follows the standard V60 four-pour method with adjustable bloom time and pour intervals.",
    category: "timer",
    amazonTerms: ["gooseneck kettle", "v60 dripper", "coffee scale with timer"],
    relatedSlugs: ["coffee-bloom-timer", "pour-over-calculator", "hario-switch-recipe", "aeropress-timer"],
  },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}

export function getRelatedTools(slug: string): Tool[] {
  const tool = getToolBySlug(slug)
  if (!tool) return []
  return tool.relatedSlugs
    .map((s) => getToolBySlug(s))
    .filter((t): t is Tool => t !== undefined)
    .slice(0, 4)
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter((t) => t.category === category)
}
