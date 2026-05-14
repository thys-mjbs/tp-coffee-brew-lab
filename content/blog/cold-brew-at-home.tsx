import Link from "next/link"

export default function Content() {
  return (
    <>
      <p>
        The French press cold brew ratio is <strong>1:8 for ready-to-drink cold brew</strong>{" "}
        (1 gram of coffee per 8 grams of water) or <strong>1:5 for concentrate</strong>{" "}
        (dilute with equal parts water or milk before serving). For a standard 600ml French
        press, that is 75g of coffee to 600g of water at 1:8, or 100g of coffee to 500g
        of water for concentrate. Steep in the fridge for 12-24 hours, then press and serve.
      </p>
      <p>
        Cold brew at home is one of the most forgiving brew methods — no temperature control,
        no bloom timing, no pour sequence. You do it the night before and it is ready in
        the morning.
      </p>

      <h2>French press cold brew ratio: ready-to-drink vs concentrate</h2>
      <p>
        The ratio you choose determines whether your cold brew is ready to drink straight
        or needs diluting:
      </p>
      <ul>
        <li>
          <strong>1:8 (ready-to-drink):</strong> 75g coffee to 600ml water in a 600ml press,
          or 130g to 1 litre. Drink it straight over ice — no dilution needed.
        </li>
        <li>
          <strong>1:5 (concentrate):</strong> 100g coffee to 500ml water in a 600ml press,
          or 200g to 1 litre. Dilute 1:1 with cold water or milk before serving.
          Concentrate keeps longer and takes up less fridge space.
        </li>
      </ul>
      <p>
        The{" "}
        <Link href="/cold-brew-ratio-calculator" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Cold Brew Ratio Calculator
        </Link>{" "}
        gives exact gram weights for any batch size at any ratio.
      </p>

      <h2>Cold brew at home recipe (step-by-step)</h2>
      <p>
        This recipe uses a French press — the most practical vessel for home cold brew.
        A mason jar or any lidded container works just as well.
      </p>
      <ul>
        <li>
          <strong>Grind coarse</strong> — same coarseness as hot French press or slightly
          coarser. Fine grinds slow filtration and produce a bitter, murky result even with
          cold water.
        </li>
        <li>
          <strong>Combine coffee and cold water</strong> in the French press. Use cold tap
          water or filtered water at room temperature — not hot.
        </li>
        <li>
          <strong>Stir to ensure all grounds are fully wet.</strong> Dry pockets on the
          surface lead to uneven extraction.
        </li>
        <li>
          <strong>Place the lid on with the plunger up.</strong> Do not press yet.
        </li>
        <li>
          <strong>Refrigerate for 12-24 hours.</strong> Twelve hours gives a lighter,
          smoother result. Twenty-four hours gives a stronger, richer cup. Over 24 hours
          often produces bitterness.
        </li>
        <li>
          <strong>Press slowly</strong> and pour immediately. Cold brew filters slowly —
          allow 60-90 seconds for the full press. Pour through a second fine-mesh strainer
          or paper filter if you want a cleaner cup.
        </li>
      </ul>

      <h2>How long to steep cold brew at home?</h2>
      <p>
        Steep cold brew for 12-24 hours in the fridge. The cold temperature slows
        extraction compared to hot brewing, which is why cold brew needs hours instead
        of minutes. The sweet spot for most coffees is 16-18 hours — long enough to extract
        full sweetness and body without pulling bitterness.
      </p>
      <p>
        At room temperature, extraction is faster: 8-12 hours works for room-temperature
        cold brew. However, room-temperature brewing increases the risk of bacterial growth
        if the coffee sits out for too long — the fridge method is safer and more consistent.
      </p>

      <h2>Cold brew with an AeroPress</h2>
      <p>
        An AeroPress makes a small-batch cold brew quickly. Use a 1:5 ratio with a medium-fine
        grind and steep inverted at room temperature for 2-3 minutes, or in the fridge for
        8-12 hours. The paper filter produces a clean, grit-free concentrate. Dilute 1:1
        before serving.
      </p>
      <p>
        The AeroPress cold brew method is faster and produces a cleaner cup than French press
        cold brew, but the yield is limited to about 150-200ml of concentrate per batch. For
        larger batches, French press or a mason jar is more practical.
      </p>

      <h2>Cold brew coffee ratio by strength</h2>
      <p>
        Adjust the ratio based on how you plan to drink it:
      </p>
      <ul>
        <li><strong>1:4 (super concentrate):</strong> For espresso-style shots or high-dilution drinks. Very strong, almost syrupy.</li>
        <li><strong>1:5 to 1:6 (concentrate):</strong> Standard concentrate range. Dilute 1:1 with water or milk.</li>
        <li><strong>1:7 to 1:8 (ready-to-drink):</strong> Drink straight over ice with no dilution.</li>
        <li><strong>1:10 to 1:12 (light):</strong> Weaker than typical cold brew — suitable for those who find regular cold brew too strong.</li>
      </ul>

      <h2>Common cold brew mistakes</h2>
      <ul>
        <li>
          <strong>Grinding too fine.</strong> Fine grinds clog the French press filter and
          produce murky, over-extracted cold brew. Use a coarse grind — same as or slightly
          coarser than hot French press.
        </li>
        <li>
          <strong>Steeping at room temperature for too long.</strong> Over 12 hours at
          room temperature risks food safety issues. If steeping at room temperature,
          keep it to 8-12 hours and use it immediately.
        </li>
        <li>
          <strong>Not stirring before steeping.</strong> Dry grounds on the surface extract
          unevenly. Make sure all grounds are saturated from the start.
        </li>
        <li>
          <strong>Leaving cold brew in the press after pressing.</strong> The grounds
          continue extracting even cold. Pour into a separate container immediately after pressing.
        </li>
      </ul>

      <p>
        For hot French press cold brew pairings or to dial in your ratio, the{" "}
        <Link href="/french-press-ratio-calculator" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          French Press Ratio Calculator
        </Link>{" "}
        and the step-by-step{" "}
        <Link href="/cold-brew-recipe" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Cold Brew Recipe Guide
        </Link>{" "}
        both include exact amounts for standard batch sizes.
      </p>
    </>
  )
}
