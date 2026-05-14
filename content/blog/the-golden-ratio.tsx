import Link from "next/link"

export default function Content() {
  return (
    <>
      <p>
        Every coffee recipe starts with a ratio. Before you worry about grind size, water
        temperature, or pour technique, you need to know how much coffee to use for the
        amount of water you are brewing with. The ratio is the foundation that every other
        variable builds on.
      </p>

      <p>
        The Specialty Coffee Association (SCA) defines the "Golden Ratio" as 55 grams of
        coffee per litre of water for brewed coffee. That works out to 1:18 by weight
        (roughly 1 gram of coffee per 18 grams of water). European coffee culture typically
        uses a slightly stronger ratio around 1:15 to 1:16. Most specialty coffee guides
        settle on 1:15 to 1:17 as the target range for filter brewing.
      </p>

      <h2>What the golden ratio means in practice</h2>
      <p>
        A 1:15 ratio means one gram of ground coffee for every 15 grams (or millilitres)
        of water. For a single 250ml cup, that is about 16-17g of coffee. For a standard
        6-cup drip machine (around 900ml of brewed coffee), you would use 55-60g of
        ground coffee. For a 12-cup machine, double that to 110-120g.
      </p>
      <p>
        Most people measure in tablespoons. One level tablespoon of ground coffee weighs
        approximately 5-7 grams depending on the grind size and how tightly it is packed.
        At 6g per tablespoon, a 17g dose is almost exactly 3 tablespoons. Most brew
        calculators and packaging instructions round to 2 tablespoons per 6oz of water
        (roughly 1:14), which produces a slightly stronger cup than the golden ratio standard.
      </p>
      <p>
        Grams are more accurate than tablespoons. A coffee scale removes guesswork and
        produces consistent results cup to cup. If you only change one piece of equipment
        for home brewing, make it a digital kitchen scale.
      </p>

      <h2>Why ratio matters more than absolute amounts</h2>
      <p>
        The ratio stays constant regardless of how much you are brewing. Whether you are
        making a single 200ml cup or a 2-litre batch for a group, the same 1:16 ratio
        produces the same flavour intensity. This is why recipes are expressed as ratios
        rather than fixed quantities: the ratio scales perfectly.
      </p>
      <p>
        Absolute amounts create confusion. "Use 3 tablespoons of coffee" is only correct
        for a specific cup size. A ratio adapts automatically. Once you know your preferred
        ratio, you can calculate any brew volume in seconds.
      </p>

      <h2>Method-specific ratio ranges</h2>
      <p>
        Not all brew methods use the same ratio. The golden ratio is a guideline for filter
        coffee, but espresso, cold brew, and immersion methods each have their own conventions.
      </p>
      <ul className="list-disc list-inside space-y-1 pl-1">
        <li><strong>Pour over (V60, Chemex, Kalita):</strong> 1:15 to 1:17</li>
        <li><strong>French press:</strong> 1:12 to 1:15 (slightly stronger due to immersion)</li>
        <li><strong>Drip machine:</strong> 1:15 to 1:18 (depends on machine)</li>
        <li><strong>AeroPress:</strong> 1:12 to 1:16 (varies by recipe)</li>
        <li><strong>Cold brew:</strong> 1:5 to 1:8 (concentrated or ready-to-drink)</li>
        <li><strong>Espresso:</strong> 1:1 to 1:3 (ristretto to lungo)</li>
        <li><strong>Moka pot:</strong> Fixed by basket size, roughly 1:7 to 1:10</li>
      </ul>
      <p>
        These ranges exist because different methods extract at different rates.
        Immersion methods (French press, AeroPress, cold brew) extract more efficiently
        at higher ratios. Pressure methods (espresso, moka pot) extract under controlled
        pressure, producing a much more concentrated result. Pour over sits in the middle:
        a moderate ratio with a clean, clear cup.
      </p>

      <h2>Adjusting for strength preference</h2>
      <p>
        The golden ratio is a starting point, not a rule. If you find the standard ratio
        too weak, move toward 1:14 or 1:13 (more coffee, same water). If it tastes too
        strong or bitter, move toward 1:18 or 1:20 (less coffee, same water). Change one
        variable at a time: adjust the ratio before adjusting grind size, so you know which
        change improved the cup.
      </p>
      <p>
        Light roasts often need a slightly higher dose (lower ratio number) than dark roasts
        to achieve the same perceived strength, because light roasts have a lower solubility.
        If you switch roast levels, expect to re-calibrate your ratio slightly.
      </p>

      <p>
        The{" "}
        <Link href="/coffee-ratio-calculator" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Coffee-to-Water Ratio Calculator
        </Link>{" "}
        will compute your exact coffee weight for any cup size and ratio instantly. For
        French press, there is a dedicated{" "}
        <Link href="/french-press-ratio-calculator" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          French Press Ratio Calculator
        </Link>{" "}
        with size presets, and for pour over brewing the{" "}
        <Link href="/pour-over-calculator" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Pour Over and V60 Recipe Calculator
        </Link>{" "}
        includes the Hoffmann and Kasuya presets with step-by-step pour guidance.
      </p>
    </>
  )
}
