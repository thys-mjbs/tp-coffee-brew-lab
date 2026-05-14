export interface StrengthRow {
  label: string
  ratio: string
  grams: number
  tablespoons: string
  scoops: string
}

export interface ServingVariant {
  slug: string
  h1: string
  metaTitle: string
  metaDescription: string
  excerpt: string
  cupLabel: string
  sizeNote: string
  rows: StrengthRow[]
  faqs: { q: string; a: string }[]
}

export const servingVariants: ServingVariant[] = [
  {
    slug: "for-1-cup",
    h1: "How Much Coffee for 1 Cup? Grams, Tablespoons, and Scoops",
    metaTitle: "How Much Coffee for 1 Cup — Grams, Tablespoons, Scoops",
    metaDescription:
      "Exact coffee measurements for 1 cup: use 15g (2½ tablespoons) for a medium-strength 8 oz mug. See amounts for light, medium, and strong at a glance.",
    excerpt:
      "For a standard 8 oz mug at medium strength, use 15g of ground coffee — about 2½ tablespoons or 1¼ scoops. The table below covers light, medium, and strong.",
    cupLabel: "1 mug",
    sizeNote: "(8 oz / 237 ml)",
    rows: [
      { label: "Light", ratio: "1:18", grams: 13, tablespoons: "2¼", scoops: "1⅛" },
      { label: "Medium", ratio: "1:16", grams: 15, tablespoons: "2½", scoops: "1¼" },
      { label: "Strong", ratio: "1:15", grams: 16, tablespoons: "2¾", scoops: "1⅓" },
    ],
    faqs: [
      {
        q: "How many tablespoons of coffee for 1 cup?",
        a: "For a standard 8 oz mug at medium strength (1:16 ratio), use 2½ level tablespoons of ground coffee. Prefer a lighter cup? Drop to 2¼ tablespoons. Want something stronger? Use 2¾. These amounts assume medium-grind coffee at approximately 6g per tablespoon.",
      },
      {
        q: "How many grams of coffee for 1 cup?",
        a: "For an 8 oz mug: 13g for a light cup, 15g for medium, and 16g for strong. Weighing is more accurate than measuring by volume because grind size affects how densely coffee packs into a spoon — a kitchen scale removes that variable entirely.",
      },
      {
        q: "How many scoops of coffee for 1 cup?",
        a: "A standard coffee scoop equals 2 tablespoons, or roughly 12g at medium grind. For 1 mug (8 oz), use about 1¼ scoops at medium strength. One slightly heaped scoop is a reliable practical starting point.",
      },
      {
        q: "Does cup size affect how much coffee I need?",
        a: "Yes. A standard mug holds 8 oz (237 ml), but coffee maker 'cups' are typically 6 oz (177 ml). If you are filling a smaller coffee maker cup rather than a full mug, you need slightly less coffee. The Coffee-to-Water Ratio Calculator lets you enter any cup size and get the exact amount instantly.",
      },
    ],
  },
  {
    slug: "for-4-cups",
    h1: "How Much Coffee for 4 Cups? Grams, Tablespoons, and Scoops",
    metaTitle: "How Much Coffee for 4 Cups — Grams, Tablespoons, Scoops",
    metaDescription:
      "Exact coffee measurements for 4 cups: use 44g (7⅓ tablespoons / 3¾ scoops) for a medium-strength 4-cup drip pot. Amounts for light, medium, and strong.",
    excerpt:
      "For a 4-cup drip coffee maker (4 × 6 oz = 710 ml total), use 44g of ground coffee at medium strength — about 7⅓ tablespoons or 3¾ scoops.",
    cupLabel: "4-cup pot",
    sizeNote: "(4 × 6 oz / 710 ml total)",
    rows: [
      { label: "Light", ratio: "1:18", grams: 39, tablespoons: "6½", scoops: "3¼" },
      { label: "Medium", ratio: "1:16", grams: 44, tablespoons: "7⅓", scoops: "3¾" },
      { label: "Strong", ratio: "1:15", grams: 47, tablespoons: "8", scoops: "4" },
    ],
    faqs: [
      {
        q: "How many tablespoons of coffee for 4 cups?",
        a: "For a 4-cup drip coffee maker (which uses 6 oz cups, totalling 710 ml of water), use about 6½ to 8 tablespoons depending on preferred strength. Medium strength (1:16) calls for 7⅓ tablespoons. A simple rule: 2 level tablespoons per 6 oz cup — so 8 tablespoons total is a good starting point for a full-flavoured 4-cup pot.",
      },
      {
        q: "How many scoops of coffee for 4 cups?",
        a: "For 4 cups (4 × 6 oz drip maker), use 3¼ scoops for a lighter brew or 4 scoops for a stronger one. Medium is about 3¾ scoops. A scoop is equivalent to 2 tablespoons or approximately 12g.",
      },
      {
        q: "How much coffee in grams for 4 cups?",
        a: "For a standard 4-cup drip coffee maker (4 × 6 oz = 710 ml): 39g for a light cup, 44g for medium, and 47g for strong. If you use 8 oz mugs instead of 6 oz cups, scale up — four 8 oz mugs need about 59g at medium strength.",
      },
      {
        q: "Why do coffee makers use 6 oz cups instead of 8 oz?",
        a: "Most drip coffee makers use 6 oz as their cup measurement — a standard set by the early US coffee industry. An everyday mug is typically 8 oz. This is why a 4-cup coffee maker may not fill four standard mugs. The Coffee-to-Water Ratio Calculator lets you switch between coffee maker cups (6 oz) and mugs (8 oz) to get the right amount for your actual vessel.",
      },
    ],
  },
  {
    slug: "for-6-cups",
    h1: "How Much Ground Coffee for 6 Cups? Grams, Tablespoons, and Scoops",
    metaTitle: "How Much Ground Coffee for 6 Cups — Grams, Tablespoons, Scoops",
    metaDescription:
      "Exact coffee for a 6-cup pot: 67g (11 tablespoons / 5½ scoops) for medium strength. Full table for light, medium, and strong — plus tips for consistent results.",
    excerpt:
      "For a 6-cup drip coffee maker (6 × 6 oz = 1,065 ml), use 67g of ground coffee at medium strength — that's 11 tablespoons or 5½ scoops.",
    cupLabel: "6-cup pot",
    sizeNote: "(6 × 6 oz / 1,065 ml total)",
    rows: [
      { label: "Light", ratio: "1:18", grams: 59, tablespoons: "10", scoops: "5" },
      { label: "Medium", ratio: "1:16", grams: 67, tablespoons: "11", scoops: "5½" },
      { label: "Strong", ratio: "1:15", grams: 71, tablespoons: "12", scoops: "6" },
    ],
    faqs: [
      {
        q: "How many tablespoons of coffee for 6 cups?",
        a: "For a standard 6-cup drip coffee maker (6 × 6 oz = 1,065 ml of water), use 10 tablespoons for a lighter cup, 11 for medium strength, and 12 for strong. The easy rule to remember: 2 level tablespoons per 6 oz cup gives you a medium brew at any volume.",
      },
      {
        q: "How much ground coffee for 6 cups in grams?",
        a: "For a 6-cup drip coffee maker: 59g for light (1:18 ratio), 67g for medium (1:16), and 71g for strong (1:15). Most kitchen scales measure to the nearest gram, so anywhere between 60–70g is the practical range for a 6-cup pot.",
      },
      {
        q: "How many scoops for 6 cups of coffee?",
        a: "For a 6-cup drip maker, use 5 scoops for a lighter brew, 5½ scoops for medium, or 6 scoops for a stronger cup. Six scoops is the easiest number to remember at this size — one scoop per cup of the maker's capacity.",
      },
      {
        q: "How much water goes in a 6-cup coffee maker?",
        a: "A standard 6-cup drip coffee maker holds 6 × 6 oz = 36 oz, or about 1,065 ml (just over a litre). Always fill to the machine's 6-cup line. If your machine uses 5 oz cups instead, the total water is 887 ml — reduce coffee proportionally to about 55g for medium strength.",
      },
    ],
  },
  {
    slug: "for-12-cups",
    h1: "How Much Coffee Grounds for 12 Cups? Grams, Tablespoons, and Scoops",
    metaTitle: "How Much Coffee Grounds for 12 Cups — Grams, Tablespoons, Scoops",
    metaDescription:
      "Exact coffee for a 12-cup pot: 133g (22 tablespoons / 11 scoops) for medium strength. Full table for light, medium, and strong — plus the quick tablespoon rule.",
    excerpt:
      "For a 12-cup drip coffee maker (12 × 6 oz = 2,130 ml), use 133g of ground coffee at medium strength — that's 22 tablespoons or 11 scoops.",
    cupLabel: "12-cup pot",
    sizeNote: "(12 × 6 oz / 2,130 ml total)",
    rows: [
      { label: "Light", ratio: "1:18", grams: 118, tablespoons: "20", scoops: "10" },
      { label: "Medium", ratio: "1:16", grams: 133, tablespoons: "22", scoops: "11" },
      { label: "Strong", ratio: "1:15", grams: 142, tablespoons: "24", scoops: "12" },
    ],
    faqs: [
      {
        q: "How many tablespoons of coffee for a 12-cup pot?",
        a: "For a full 12-cup drip coffee maker (12 × 6 oz = 2,130 ml), use 20 tablespoons for a lighter brew, 22 for medium strength, and 24 for strong. The quick rule: 2 tablespoons per 6 oz cup — so 24 tablespoons total for a full pot. Most people find 20 to 22 the sweet spot.",
      },
      {
        q: "How much coffee grounds for 12 cups in grams?",
        a: "For a 12-cup drip coffee maker: 118g for light, 133g for medium, and 142g for strong. A 250g bag of specialty coffee makes approximately two full 12-cup pots at medium strength.",
      },
      {
        q: "How many scoops of coffee for 12 cups?",
        a: "For a 12-cup drip maker: 10 scoops for light, 11 for medium, and 12 for strong. One scoop per cup of the maker's capacity (12 scoops for 12 cups) gives a full, medium-strength pot. A standard coffee scoop equals 2 tablespoons or about 12g.",
      },
      {
        q: "My 12-cup pot tastes weak even with the right amount — what is wrong?",
        a: "Three common causes: the grind is too coarse (water passes through too quickly without full extraction), the coffee is stale (beans lose flavour after 2–3 weeks open), or the water is not hot enough (below 88°C / 190°F). Try a slightly finer grind before adding more coffee — that usually solves under-extraction without changing the ratio.",
      },
    ],
  },
]

export function getServingVariant(slug: string): ServingVariant | undefined {
  return servingVariants.find((v) => v.slug === slug)
}
