import Link from "next/link"

export default function Content() {
  return (
    <>
      <p>
        The French press is the easiest full-immersion brew method and one of the most
        forgiving. Unlike pour over, it requires no paper filter, no precise pouring
        technique, and no gooseneck kettle. What it does require is the right ratio,
        a coarse enough grind, and patience during the steep. Get those three things right
        and a French press consistently produces a rich, full-bodied cup.
      </p>

      <h2>The ratio: 1:12 to 1:15</h2>
      <p>
        French press coffee is typically brewed at a slightly higher coffee-to-water ratio
        than pour over because immersion brewing extracts differently from percolation.
        A good starting point is 1:15 (1g coffee per 15g water). For a stronger, fuller
        cup, move toward 1:12. For a lighter cup closer to drip coffee strength, try 1:17.
      </p>
      <p>
        For common press sizes: a 350ml French press uses around 23g of coffee; a 600ml
        press uses around 40g; a 1-litre press uses around 65g. The{" "}
        <Link href="/french-press-ratio-calculator" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          French Press Ratio Calculator
        </Link>{" "}
        gives you exact grams and tablespoons for your press size and preferred strength.
      </p>

      <h2>Grind size: coarse is critical</h2>
      <p>
        Use a coarse grind — the texture of coarse sea salt or cracked peppercorn. This
        is the single most important variable in French press brewing. If you grind too
        fine, three things go wrong: the plunger becomes hard to press, grounds pass
        through the metal filter into the cup, and the coffee over-extracts and tastes
        bitter or muddy.
      </p>
      <p>
        On a Baratza Encore, coarse French press grind is around 28-35. On a Comandante
        C40, around 35-42 clicks. If your coffee tastes gritty or has visible sediment
        beyond a small amount at the bottom of the cup, grind coarser. The{" "}
        <Link href="/grind-size-guide" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Grind Size Guide
        </Link>{" "}
        includes reference settings for the most common home grinders.
      </p>

      <h2>Water temperature</h2>
      <p>
        Use water between 90 and 96°C. Boiling water (100°C) is too hot for most coffees
        and causes over-extraction of bitter compounds. If you do not have a
        temperature-controlled kettle, bring water to a full boil and wait 30 seconds
        before pouring — that is enough to drop the temperature into the right range.
      </p>

      <h2>The brew process</h2>
      <ul>
        <li>
          <strong>Preheat the press.</strong> Pour a small amount of hot water into the
          empty carafe, swirl, and discard. This stabilises the brew temperature and
          prevents the glass from cracking with thermal shock.
        </li>
        <li>
          <strong>Add coffee.</strong> Add your ground coffee to the preheated carafe.
          Level the grounds so they sit evenly.
        </li>
        <li>
          <strong>Bloom pour.</strong> Pour a small amount of water — about twice the
          weight of coffee — over the grounds. Wait 30 seconds. This bloom releases CO2
          from fresh coffee and improves extraction.
        </li>
        <li>
          <strong>Fill and stir.</strong> Pour the remaining water up to your target
          weight. Stir gently to ensure all grounds are wet. Place the lid on the press
          with the plunger pulled all the way up — do not press yet.
        </li>
        <li>
          <strong>Steep for 4 minutes.</strong> The classic steep time is 4 minutes.
          For a stronger cup, steep to 5 minutes. For lighter coffees or lighter
          roasts, 3.5 minutes can work well. Use the{" "}
          <Link href="/french-press-timer" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
            French Press Brew Timer
          </Link>{" "}
          to track the steep with a step-by-step countdown.
        </li>
        <li>
          <strong>Press slowly.</strong> Press the plunger down with steady, even pressure
          over about 20-30 seconds. If you feel strong resistance, your grind is too fine.
          Stop pressing when the plunger reaches the grounds — do not force it through them.
        </li>
        <li>
          <strong>Pour immediately.</strong> Do not let brewed coffee sit in the press.
          The grounds continue extracting even after pressing. Pour everything into a mug
          or carafe right away, or the coffee will over-extract and turn bitter.
        </li>
      </ul>

      <h2>The most common French press mistakes</h2>
      <ul>
        <li>
          <strong>Leaving coffee in the press after plunging.</strong> The grounds continue
          to steep against the coffee even after the plunger is down. Pour immediately,
          or brew into a separate carafe.
        </li>
        <li>
          <strong>Grinding too fine.</strong> The most frequent cause of muddy, bitter,
          gritty French press coffee. When in doubt, grind coarser.
        </li>
        <li>
          <strong>Using too little coffee.</strong> Under-dosing produces thin, watery
          coffee with a hollow finish. Start at 1:15 and adjust from there, not 1:18 or higher.
        </li>
        <li>
          <strong>Pressing too fast.</strong> A fast, hard press forces fines through
          the filter and into the cup. Slow, steady pressure gives you a cleaner result.
        </li>
        <li>
          <strong>Not preheating.</strong> A cold carafe drops the brew temperature by
          2-5°C from the first pour, causing uneven extraction across the steep.
        </li>
      </ul>

      <h2>Cold brew in a French press</h2>
      <p>
        A French press is one of the best vessels for making cold brew at home. Use a
        coarse grind (same as hot French press), a higher ratio around 1:5 for concentrate
        or 1:8 for ready-to-drink, and steep in the fridge for 12-16 hours. Press the
        plunger down and pour immediately.{" "}
        The{" "}
        <Link href="/cold-brew-ratio-calculator" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Cold Brew Ratio Calculator
        </Link>{" "}
        gives exact amounts for your preferred strength and batch size.
      </p>

      <p>
        If your French press coffee still tastes off after adjusting grind and ratio, the{" "}
        <Link href="/coffee-troubleshooter" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Coffee Troubleshooter
        </Link>{" "}
        walks through bitter, sour, weak, and muddy diagnoses with a specific fix for each.
      </p>
    </>
  )
}
