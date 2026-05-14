import Link from "next/link"

export default function Content() {
  return (
    <>
      <p>
        How to use cold brew coffee: serve it straight over ice (if you brewed at 1:8
        ready-to-drink ratio), dilute it 1:1 with cold water or milk (if you brewed at
        1:5 concentrate), or heat it gently for a smooth hot coffee without bitterness.
        Cold brew is more versatile than most people use it — it works as an iced latte
        base, a cocktail ingredient, a baking flavouring, and a surprisingly good hot drink.
      </p>
      <p>
        This guide covers every practical way to use cold brew once you have brewed it,
        plus storage, shelf life, and the difference between concentrate and ready-to-drink.
      </p>

      <h2>How to use cold brew coffee concentrate</h2>
      <p>
        Cold brew concentrate (brewed at a 1:4 to 1:6 ratio) is too strong to drink
        undiluted. Dilute it before serving:
      </p>
      <ul>
        <li><strong>Iced cold brew:</strong> 1 part concentrate + 1 part cold water over ice</li>
        <li><strong>Iced latte:</strong> 1 part concentrate + 1-2 parts milk or oat milk over ice</li>
        <li><strong>Hot cold brew:</strong> 1 part concentrate + 1 part hot water (not boiling)</li>
        <li><strong>Cold brew tonic:</strong> 1 part concentrate + 2 parts sparkling tonic water over ice</li>
        <li><strong>Strong black:</strong> 1 part concentrate + 0.75 parts cold water for a stronger ready-to-drink</li>
      </ul>
      <p>
        The{" "}
        <Link href="/cold-brew-ratio-calculator" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Cold Brew Ratio Calculator
        </Link>{" "}
        gives exact amounts for brewing at any ratio and batch size, so you know whether
        what you brewed is concentrate or ready-to-drink strength.
      </p>

      <h2>Cold brew vs iced coffee: what is the difference?</h2>
      <p>
        Cold brew is brewed cold and slow (12-24 hours at low temperature). Iced coffee is
        hot-brewed and then cooled or poured over ice. The difference in taste is significant:
        cold brew is smoother, lower acidity, and naturally sweeter because the cold water
        does not extract the acidic and bitter compounds that hot water does. Iced coffee
        is brighter, more acidic, and quicker to make.
      </p>
      <p>
        Cold brew concentrate is about twice the strength of regular coffee — a common
        mistake is drinking it undiluted and wondering why it tastes harsh and overwhelmingly
        strong. Dilute first, then adjust to taste.
      </p>

      <h2>How to serve cold brew at home</h2>
      <p>
        The simplest way: pour over a glass full of ice. If you brewed ready-to-drink
        (1:8 ratio), no dilution needed — ice melts slowly and thins it slightly over time,
        which most people find pleasant. Add milk, cream, or sweetener to taste.
      </p>
      <p>
        For an iced latte: fill a glass with ice, add 100-150ml of cold brew concentrate,
        then pour milk to fill. Oat milk and cold brew is a particularly good pairing —
        the natural sweetness of oat milk balances cold brew's chocolatey bitterness without
        added sugar. The{" "}
        <Link href="/iced-coffee-at-home" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Iced Coffee at Home Guide
        </Link>{" "}
        covers the full range of iced coffee formats.
      </p>

      <h2>Can you heat cold brew?</h2>
      <p>
        Yes. Cold brew heats well — because it was brewed cold, it lacks the acidity and
        bitter compounds that develop in hot-brewed coffee. Heated cold brew tastes smooth
        and sweet rather than flat or dull. Heat it gently: microwave for 60-90 seconds or
        warm in a small saucepan over low heat. Do not boil it — prolonged high heat
        introduces bitterness.
      </p>
      <p>
        If using concentrate: dilute to your preferred strength with hot water rather than
        heating the concentrate directly. One part concentrate to one part near-boiling water
        gives a full mug at standard coffee strength.
      </p>

      <h2>How long does cold brew last?</h2>
      <p>
        Cold brew keeps in the fridge for 7-14 days once brewed and filtered. Concentrate
        lasts slightly longer than ready-to-drink because the lower water content slows
        oxidation. Store in a sealed glass container — cold brew picks up fridge odours
        quickly in an unsealed vessel.
      </p>
      <p>
        Signs it has gone off: sour or vinegary smell (not normal coffee sour — a fermenting
        note), off taste, or visible cloudiness beyond the normal sediment at the bottom.
        Sediment in cold brew is normal and harmless; just decant carefully or strain before
        serving.
      </p>

      <h2>Cold brew to milk ratio for lattes</h2>
      <p>
        For an iced cold brew latte, a 1:1.5 to 1:2 cold brew to milk ratio works well.
        For a 300ml glass: 100-120ml of concentrate topped with 180-200ml of milk over ice.
        Adjust to taste — the correct ratio is whichever makes the coffee flavour as
        prominent as you want it.
      </p>
      <p>
        For the full cold brew recipe and step-by-step brewing instructions, the{" "}
        <Link href="/cold-brew-recipe" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Cold Brew Recipe Guide
        </Link>{" "}
        covers French press, mason jar, and AeroPress methods with exact gram amounts.
      </p>
    </>
  )
}
