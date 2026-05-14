import Link from "next/link"

export default function Content() {
  return (
    <>
      <p>
        The most common question in home coffee brewing is also the most practical:
        how many coffee grounds per cup? The answer depends on your brew method,
        but there is a standard starting point that works across almost every filter
        method – the Golden Ratio.
      </p>
      <p>
        The Specialty Coffee Association (SCA) defines the Golden Ratio as <strong>55 grams
        of ground coffee per litre of water</strong>, or roughly 1 gram of coffee per
        18 grams of water (a 1:18 ratio). Most specialty coffee guides use a slightly
        stronger 1:15 to 1:16 ratio. In practical terms, that is about 15-18 grams of
        ground coffee per 250ml cup of water.
      </p>

      <h2>How many coffee grounds per cup?</h2>
      <p>
        At the standard 1:15 ratio, you need <strong>approximately 15-17 grams of ground
        coffee per 250ml cup</strong>. At the weaker SCA standard of 1:18, that drops to
        about 14g per cup. For a stronger result at 1:13, use around 19g per cup.
      </p>
      <p>
        In tablespoons: one level tablespoon of ground coffee weighs approximately 5-7 grams
        depending on grind size and how loosely the spoon is filled. At 6g per tablespoon,
        a 16g dose is just under 3 tablespoons. Most packaging instructions recommend
        2 tablespoons per 6oz of water (roughly 1:14), which lands on the stronger end
        of the golden ratio range.
      </p>
      <p>
        Grams are more accurate than tablespoons. A tablespoon of espresso-fine coffee
        weighs noticeably more than a tablespoon of coarse French press grind. If you want
        consistent results, a digital kitchen scale removes that variable entirely.
      </p>

      <h2>How much ground coffee for a full pot?</h2>
      <p>
        For a standard 12-cup drip machine (which produces roughly 1.8 litres of brewed
        coffee), use <strong>100-120 grams of ground coffee</strong> at a 1:15 to 1:18
        ratio. For a 6-cup pot (around 900ml), use 50-60 grams. For a 4-cup pot (600ml),
        use 35-40 grams.
      </p>
      <p>
        Most drip machines measure in "cups" of 6 fluid ounces (180ml), not the standard
        250ml cup – so a "12-cup" machine produces about 2.1 litres, not 3 litres. Always
        check your machine's actual brew volume before calculating. The{" "}
        <Link href="/coffee-ratio-calculator" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Coffee-to-Water Ratio Calculator
        </Link>{" "}
        handles any volume in grams, tablespoons, or scoops.
      </p>

      <h2>Why ratio matters more than absolute amounts</h2>
      <p>
        A ratio scales to any brew volume. Whether you are making a single 200ml cup or a
        2-litre batch, the same 1:15 ratio produces the same flavour intensity. Absolute
        amounts like "use 3 tablespoons" only work for one specific cup size. The ratio
        adapts automatically – once you know your preferred ratio, you can calculate any
        brew volume instantly.
      </p>

      <h2>How many grams of coffee per cup by method</h2>
      <p>
        Different brew methods use different ratios because they extract at different rates.
        These are standard starting ranges – adjust toward your preference from there:
      </p>
      <ul>
        <li><strong>Pour over (V60, Chemex, Kalita):</strong> 14-17g per 250ml cup (1:15 to 1:17)</li>
        <li><strong>French press:</strong> 17-21g per 250ml cup (1:12 to 1:15)</li>
        <li><strong>Drip machine:</strong> 14-17g per 250ml cup (1:15 to 1:18)</li>
        <li><strong>AeroPress:</strong> 16-21g per serving (1:12 to 1:16)</li>
        <li><strong>Cold brew (ready to drink):</strong> 30g per 250ml (1:8)</li>
        <li><strong>Cold brew concentrate:</strong> 50g per 250ml (1:5)</li>
        <li><strong>Espresso:</strong> 18g dose for 36g yield (1:2 ratio, separate scale)</li>
      </ul>

      <h2>Adjusting for strength and roast level</h2>
      <p>
        The golden ratio is a starting point, not a rule. If the result tastes too weak,
        use more coffee (lower ratio number: 1:14, 1:13). If it tastes too strong or bitter,
        use less coffee (higher ratio number: 1:17, 1:18). Change the ratio before adjusting
        grind size, so you know which change improved the cup.
      </p>
      <p>
        Light roasts often need a slightly higher dose than dark roasts to achieve the same
        perceived strength. Light roasts have a lower solubility and extract less per gram
        at the same contact time. If you switch from a dark roast to a light roast, expect
        to increase your dose by 1-2g per cup to maintain the same strength.
      </p>

      <p>
        For method-specific calculators:{" "}
        <Link href="/french-press-ratio-calculator" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          French Press Ratio Calculator
        </Link>
        {" "}and{" "}
        <Link href="/pour-over-calculator" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Pour Over and V60 Recipe Calculator
        </Link>
        {" "}both include Hoffmann and Kasuya presets with step-by-step guidance.
      </p>
    </>
  )
}
