import Link from "next/link"

export default function Content() {
  return (
    <>
      <p>
        The V60 is one of the most studied and debated brew methods in specialty coffee.
        James Hoffmann's V60 technique, published in 2022, became the most referenced home
        brew guide in the English-speaking coffee community almost immediately. It produces
        a clean, bright, well-extracted cup with a straightforward four-pour method that
        works reliably across most grinders and coffees.
      </p>
      <p>
        This guide covers the Hoffmann method in detail, explains why each step exists,
        and links to the tools that let you calculate and time each pour precisely.
      </p>

      <h2>The ratio: 60g per litre</h2>
      <p>
        Hoffmann's standard ratio is 60g of coffee per litre of water, which works out to
        1:16.7. For a single 300ml serving, that is 18g of coffee to 300g of water.
        For a 500ml brew (two small cups), use 30g of coffee to 500g of water.
      </p>
      <p>
        This ratio sits in the middle of the pour over range (1:15 to 1:17) and is
        designed to produce a balanced, medium-strength cup. If you prefer a stronger
        result, move toward 1:15. For a lighter cup, try 1:18. The{" "}
        <Link href="/pour-over-calculator" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Pour Over and V60 Recipe Calculator
        </Link>{" "}
        gives you exact gram weights for any serving size with the Hoffmann preset built in.
      </p>

      <h2>Grind size</h2>
      <p>
        Use a medium-fine grind, similar to table salt or slightly coarser. The exact
        setting depends on your grinder – on a Baratza Encore, this is around 14-18.
        On a Comandante C40, around 25-30 clicks. On a 1Zpresso JX-Pro, around 2.2-2.5.
      </p>
      <p>
        The target total brew time for a 300ml V60 (18g dose) is around 3 to 3.5 minutes
        from first pour to final drip. If the coffee draws down faster than 2.5 minutes,
        grind finer. If it takes longer than 4 minutes, grind coarser. Grind size is the
        primary lever for controlling brew time and extraction.
      </p>

      <h2>Water temperature</h2>
      <p>
        Hoffmann recommends 92-94°C for medium roasts and 85-90°C for light roasts.
        If you do not have a temperature-controlled kettle, bring water to a boil and
        wait 30-45 seconds before pouring – this drops the temperature by roughly 3-5°C.
        Darker roasts tolerate a wider temperature range; lighter roasts benefit from
        slightly lower temperatures to reduce bitterness.
      </p>

      <h2>The four-pour method</h2>
      <p>
        Hoffmann's method divides the water into four pours. For an 18g dose with 300g
        total water:
      </p>
      <ul>
        <li>
          <strong>Pour 1 (bloom): 50g.</strong> Pour 50g of water in the first 45 seconds.
          Wet all the grounds evenly and let the coffee bloom. The bloom releases CO2 that
          would otherwise inhibit extraction. Fresh coffee produces the most dramatic bloom.
          Use the{" "}
          <Link href="/coffee-bloom-timer" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
            Coffee Bloom Timer
          </Link>{" "}
          to track this stage precisely.
        </li>
        <li>
          <strong>Pour 2: to 150g total.</strong> At 45 seconds, pour steadily to reach
          150g total weight. Pour in a slow, even spiral from the centre outward, keeping
          the water level stable. Aim to finish this pour by around 1:15.
        </li>
        <li>
          <strong>Pour 3: to 225g total.</strong> At around 1:30, pour to 225g total.
          Same technique: slow spiral, even flow.
        </li>
        <li>
          <strong>Pour 4: to 300g total.</strong> At around 2:00, pour the final water
          to 300g. The drawdown should finish between 3:00 and 3:30.
        </li>
      </ul>
      <p>
        The{" "}
        <Link href="/pour-over-timer" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Pour Over Brew Timer
        </Link>{" "}
        sequences these four pours with alerts at each stage so you do not need to watch
        a clock while pouring.
      </p>

      <h2>Why swirl at the end?</h2>
      <p>
        Hoffmann's technique includes a gentle swirl of the V60 at the end of each pour
        to settle the coffee bed flat. A flat, even bed drains uniformly, which means
        consistent extraction across all the grounds. Uneven beds drain unevenly and
        produce under-extracted sections that add sourness or bitterness to the final cup.
        This is a small step that makes a noticeable difference, especially with finer
        grind sizes.
      </p>

      <h2>Tetsu Kasuya's 4:6 method</h2>
      <p>
        Tetsu Kasuya's V60 method is an alternative to Hoffmann's four-pour approach.
        It divides the total water into 40% (first two pours, controlling acidity and
        sweetness) and 60% (last three pours, controlling strength). The ratio is typically
        1:15. The 4:6 method is particularly useful for adjusting flavour systematically:
        to increase sweetness, make the second pour larger than the first; to increase
        acidity, make the first pour larger. The{" "}
        <Link href="/pour-over-calculator" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Pour Over Calculator
        </Link>{" "}
        includes the Kasuya preset alongside Hoffmann's.
      </p>

      <h2>Common V60 problems and fixes</h2>
      <ul>
        <li>
          <strong>Sour / under-extracted:</strong> Grind finer, increase water temperature,
          or extend total brew time.
        </li>
        <li>
          <strong>Bitter / over-extracted:</strong> Grind coarser, reduce water temperature,
          or shorten brew time.
        </li>
        <li>
          <strong>Too slow (&gt;4 minutes):</strong> Grind coarser. A very slow drawdown
          means the water cannot flow through the grounds fast enough.
        </li>
        <li>
          <strong>Too fast (&lt;2.5 minutes):</strong> Grind finer. Fast drawdown means
          under-extraction – not enough contact time.
        </li>
        <li>
          <strong>Uneven extraction / muddy flavour:</strong> Use a spiral pour technique
          and swirl the dripper after each pour to flatten the coffee bed.
        </li>
      </ul>
      <p>
        For a full diagnosis of bitter, sour, weak, or muddy coffee, the{" "}
        <Link href="/coffee-troubleshooter" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Coffee Troubleshooter
        </Link>{" "}
        walks through each fault with a specific fix.
      </p>
    </>
  )
}
