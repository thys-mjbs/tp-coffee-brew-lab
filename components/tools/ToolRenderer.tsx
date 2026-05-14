"use client"

import { CoffeeRatioCalculator } from "./CoffeeRatioCalculator"
import { FrenchPressRatioCalculator } from "./FrenchPressRatioCalculator"
import { InstantCoffeeCalculator } from "./InstantCoffeeCalculator"
import { CoffeeBeansPerCupCalculator } from "./CoffeeBeansPerCupCalculator"
import { CoffeeMeasurementConverter } from "./CoffeeMeasurementConverter"
import { PourOverCalculator } from "./PourOverCalculator"
import { AeroPressRecipe } from "./AeroPressRecipe"
import { ColdBrewRatioCalculator } from "./ColdBrewRatioCalculator"
import { CaffeineCalculator } from "./CaffeineCalculator"
import { EspressoRatioCalculator } from "./EspressoRatioCalculator"
import { toolUiStrings } from "@/lib/toolUiStrings"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: Record<string, React.ComponentType<any>> = {
  "coffee-ratio-calculator": CoffeeRatioCalculator,
  "french-press-ratio-calculator": FrenchPressRatioCalculator,
  "instant-coffee-calculator": InstantCoffeeCalculator,
  "coffee-beans-per-cup": CoffeeBeansPerCupCalculator,
  "coffee-measurement-converter": CoffeeMeasurementConverter,
  "pour-over-calculator": PourOverCalculator,
  "aeropress-recipe": AeroPressRecipe,
  "cold-brew-ratio-calculator": ColdBrewRatioCalculator,
  "caffeine-calculator": CaffeineCalculator,
  "espresso-ratio-calculator": EspressoRatioCalculator,
}

export function ToolRenderer({ slug, lang }: { slug: string; lang?: string }) {
  const Component = components[slug]
  if (!Component) return null
  const langMap = lang && lang !== "en" ? toolUiStrings[lang] as Record<string, unknown> : undefined
  const strings = langMap?.[slug]
  return <Component strings={strings} />
}
