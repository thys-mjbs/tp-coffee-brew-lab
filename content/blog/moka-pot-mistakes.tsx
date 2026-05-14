import Link from "next/link"

export default function Content() {
  return (
    <>
      <p>
        The best grind size for moka pot is medium-fine — finer than drip coffee but
        noticeably coarser than espresso. On most hand grinders, that is around 20-25 clicks
        from zero. On a Baratza Encore, settings 10-14 work well. A fine espresso grind
        causes the moka pot to over-extract, build dangerous pressure, and produce bitter,
        metallic-tasting coffee. A drip-coarse grind under-extracts and produces a thin,
        watery result.
      </p>
      <p>
        Getting the grind right solves most moka pot problems. The other issues — bitterness,
        weak coffee, gurgling, and grounds in the cup — almost all trace back to grind size
        or one of the five mistakes below.
      </p>

      <h2>Best grind size for moka pot by grinder</h2>
      <ul>
        <li><strong>Baratza Encore:</strong> Settings 10-14</li>
        <li><strong>Comandante C40:</strong> 20-26 clicks from zero</li>
        <li><strong>1Zpresso JX-Pro:</strong> 2.5 to 3.5 (outer dial)</li>
        <li><strong>Timemore C2:</strong> 18-24 clicks from zero</li>
        <li><strong>Hario Skerton / Mini Mill:</strong> 3-5 clicks from finger-tight</li>
        <li><strong>Pre-ground filter coffee:</strong> Too coarse — buy specifically labelled "moka pot" grind or espresso grind if pre-ground is the only option</li>
      </ul>
      <p>
        The{" "}
        <Link href="/grind-size-guide" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Grind Size Guide
        </Link>{" "}
        covers all brew methods across the most common home grinders.
      </p>

      <h2>The five most common moka pot mistakes</h2>

      <ul>
        <li>
          <strong>Grinding too fine.</strong> The most common cause of bitter, harsh moka
          pot coffee and the main safety risk — a fine grind restricts flow and causes
          pressure to build beyond the safety valve's design. Medium-fine is the target.
          If the plunger on your moka pot ever spurts suddenly or the valve releases steam
          loudly, the grind is too fine.
        </li>
        <li>
          <strong>Packing the grounds.</strong> Never tamp or compress the grounds in the
          basket. Unlike espresso, the moka pot forces water through with steam pressure, not
          a pump. A compressed puck restricts flow severely. Fill the basket level and brush
          off the excess — that is all.
        </li>
        <li>
          <strong>Starting with cold water in the base.</strong> Cold water means the bottom
          of the pot sits on heat for longer before brewing starts, scorching the coffee
          basket before extraction begins. Start with pre-boiled or very hot water from the
          kettle in the base — this shortens heat time and reduces bitter, burnt notes.
        </li>
        <li>
          <strong>Using high heat.</strong> High heat causes the brew to rush through too
          fast, under-extracting early and scorching late. Medium-low heat gives the water
          time to extract evenly as it rises. The target is a slow, steady flow of coffee
          into the upper chamber over about 3-5 minutes.
        </li>
        <li>
          <strong>Letting it boil dry.</strong> Once the upper chamber is full and you hear
          the gurgling, bubbling sound, remove it from heat immediately. Leaving it on while
          empty scorches the residual coffee and produces a bitter, acrid finish. Move quickly
          — the transition from full to overcooked happens in under 30 seconds.
        </li>
      </ul>

      <h2>Moka pot coffee to water ratio</h2>
      <p>
        The moka pot basket determines your dose — fill it level, no more. Water fills the
        base up to the safety valve, not above it. The ratio is determined by your pot's
        design, not a variable you control directly. Most 3-cup moka pots use around 15-18g
        of coffee to 100ml of water; 6-cup pots use 28-32g to 200ml.
      </p>
      <p>
        The{" "}
        <Link href="/moka-pot-calculator" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Moka Pot Calculator
        </Link>{" "}
        gives exact dose and water amounts for your pot size.
      </p>

      <h2>Why does my moka pot coffee taste bitter?</h2>
      <p>
        Bitter moka pot coffee is almost always caused by one of four things: grind too fine,
        grounds packed, heat too high, or pot left on after brewing. Work through that list
        in order. The single highest-impact change is switching to medium-fine grind if you
        have been using espresso-fine or pre-ground espresso.
      </p>
      <p>
        If the coffee is still bitter after fixing grind and technique, the pot itself may
        have coffee oil buildup. Wash the basket, gasket, and filter plate with warm water
        and a soft brush. Avoid soap in the upper chamber — it strips the seasoning that
        reduces metallic taste over time.
      </p>

      <h2>How long does a moka pot take to brew?</h2>
      <p>
        A correctly set-up moka pot brewing on medium-low heat takes 4-6 minutes from cold
        or 3-4 minutes if you start with hot water in the base. The coffee should rise into
        the upper chamber in a slow, even stream — not a sudden spurt (too fine or too hot)
        and not a thin drip that takes over 8 minutes (too coarse or too low a heat).
      </p>
      <p>
        If troubleshooting a different flavour problem, the{" "}
        <Link href="/coffee-troubleshooter" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Coffee Troubleshooter
        </Link>{" "}
        diagnoses bitter, sour, weak, and muddy results across all brew methods.
      </p>
    </>
  )
}
