import Link from "next/link"

export default function Content() {
  return (
    <>
      <p>
        The inverted AeroPress method is a brewing technique where you flip the AeroPress
        upside down during steeping so the plunger cap sits at the bottom, sealing the
        chamber. This stops water draining through the filter before the steep is complete,
        giving you full control over contact time and producing a consistently stronger,
        more even extraction than the standard method.
      </p>
      <p>
        The inverted method has become the default approach for most specialty coffee
        brewers. Once you try it, the standard position feels like a workaround.
      </p>

      <h2>Why use the inverted AeroPress method?</h2>
      <p>
        In the standard AeroPress position, water begins draining through the filter the
        moment you add it. This means the first water in has a shorter contact time than
        the last water in – an uneven extraction by design. The inverted position solves
        this: nothing drains until you flip and press, so every gram of water steeps for
        exactly the same amount of time.
      </p>
      <p>
        The result is a more controlled brew with a fuller, cleaner body. You also get a
        proper bloom – the carbon dioxide trapped in fresh coffee grounds has time to escape
        before the main extraction begins.
      </p>

      <h2>Inverted AeroPress recipe (step-by-step)</h2>
      <p>
        This is a standard specialty coffee inverted AeroPress recipe that works well across
        medium and light roasts. Use the{" "}
        <Link href="/aeropress-recipe" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          AeroPress Recipe Calculator
        </Link>{" "}
        to scale doses for your cup size.
      </p>
      <ul>
        <li><strong>Coffee:</strong> 15g, medium-fine grind (finer than V60, coarser than espresso)</li>
        <li><strong>Water:</strong> 200g at 85-92°C (cooler for light roasts, hotter for dark)</li>
        <li><strong>Ratio:</strong> 1:13 to 1:15 depending on preferred strength</li>
        <li><strong>Steep time:</strong> 1:30 to 2:00 minutes</li>
      </ul>
      <ul>
        <li>
          <strong>Set up inverted:</strong> Place the plunger in the AeroPress about 1cm
          deep and flip it upside down so it stands on the plunger handle.
        </li>
        <li>
          <strong>Add coffee</strong> to the inverted chamber and level the grounds.
        </li>
        <li>
          <strong>Bloom:</strong> Add 30g of hot water, stir once to wet all grounds,
          and wait 30 seconds.
        </li>
        <li>
          <strong>Fill:</strong> Add the remaining water to reach your target weight.
          Stir once, then fit the filter cap with a pre-wetted paper filter.
        </li>
        <li>
          <strong>Steep</strong> for 1:00 to 1:30 minutes (total time from first pour).
        </li>
        <li>
          <strong>Flip and press:</strong> Place your mug on top of the filter cap, flip
          the whole assembly in one smooth motion, and press slowly over 20-30 seconds.
          Stop pressing when you hear a hiss – that is the air piston reaching the grounds.
        </li>
      </ul>
      <p>
        Use the{" "}
        <Link href="/aeropress-timer" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          AeroPress Brew Timer
        </Link>{" "}
        to track the bloom and steep stages with step-by-step prompts.
      </p>

      <h2>James Hoffmann's AeroPress recipe</h2>
      <p>
        James Hoffmann's AeroPress method uses a slightly different inverted approach:
        a longer steep, a stir before pressing, and a slower press for clarity.
      </p>
      <ul>
        <li><strong>Coffee:</strong> 11g (finer grind – nearly espresso-fine)</li>
        <li><strong>Water:</strong> 200g at 100°C (boiling water works well here)</li>
        <li><strong>Ratio:</strong> approximately 1:18</li>
        <li><strong>Steep time:</strong> 2:00 minutes</li>
      </ul>
      <p>
        The key differences: Hoffmann uses a much finer grind and a higher water temperature
        than most AeroPress recipes. The fine grind compensates for the shorter contact time
        per gram at a higher water-to-coffee ratio, producing a clean, tea-like cup rather
        than a concentrate. He also stirs briskly just before pressing to disturb the
        grounds bed and improve consistency.
      </p>

      <h2>Inverted vs standard AeroPress: what is the difference?</h2>
      <p>
        The standard method starts with the AeroPress in its normal orientation (plunger
        up, filter at the bottom). Water drains as it is added, limiting effective steep
        time and requiring you to press before the brew is complete. The inverted method
        gives you full immersion – every gram of water in contact with the grounds for
        the full steep duration.
      </p>
      <p>
        In practice: the inverted method extracts more evenly, gives you more control, and
        produces a consistently better result at the cost of a more involved setup. The
        standard method is faster and simpler, and works fine with a medium-coarse grind
        if you are comfortable pressing before full extraction time is up.
      </p>

      <h2>AeroPress ratio for the inverted method</h2>
      <p>
        For the inverted AeroPress, start with a 1:13 to 1:15 ratio (15g coffee to 195-225g
        water). This is stronger than pour over but produces a full serving rather than a
        concentrate. If you are making an AeroPress-style espresso (for use with milk or
        as a concentrate), use 1:6 to 1:8 with a fine grind.
      </p>
      <p>
        A common mistake is using the same ratio as pour over (1:16 to 1:17) without
        adjusting grind size. At a higher ratio, you need a finer grind or longer steep
        to hit the same extraction. The AeroPress recipe calculator adjusts dose and water
        for your cup size at any ratio.
      </p>

      <h2>How long to steep in the inverted AeroPress?</h2>
      <p>
        For most inverted AeroPress recipes: steep for 1:30 to 2:00 minutes total (including
        the 30-second bloom). Fine grinds extract faster – if your grind is closer to
        espresso-fine, 1:00 to 1:15 minutes is enough. Coarser grinds need longer contact
        time to reach the same extraction.
      </p>
      <p>
        If the result tastes sour or sharp, steep longer or grind finer. If it tastes
        bitter or over-extracted, steep shorter or grind coarser. The{" "}
        <Link href="/grind-size-guide" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Grind Size Guide
        </Link>{" "}
        has reference settings for AeroPress on the most common home grinders.
      </p>
    </>
  )
}
