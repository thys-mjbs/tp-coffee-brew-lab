import Link from "next/link"

export default function Content() {
  return (
    <>
      <p>
        The best grind size for espresso is fine — finer than drip or pour over, coarser
        than Turkish coffee. On most grinders, espresso sits near the finest end of the
        usable range. The exact setting depends on your grinder, your machine's pump
        pressure, and the specific coffee, but a correctly dialled espresso grind produces
        a 25-30g yield from an 18g dose in 25-35 seconds.
      </p>
      <p>
        The grind size matters more for espresso than for any other brew method. A single
        notch on a hand grinder changes the extraction completely. This guide explains what
        to look for, how to adjust, and gives reference settings for common home grinders.
      </p>

      <h2>Espresso grind size chart by grinder</h2>
      <p>
        These are starting points, not fixed settings. Dial in from here based on your
        shot time and taste:
      </p>
      <ul>
        <li><strong>Baratza Encore:</strong> Settings 1-5 (lowest end — Encore is not ideal for espresso, but usable at its finest settings)</li>
        <li><strong>Baratza Sette 270:</strong> Settings 1-5 on the outer ring with the inner ring at B-E</li>
        <li><strong>Niche Zero:</strong> Settings 1-5</li>
        <li><strong>Comandante C40:</strong> 10-16 clicks from zero</li>
        <li><strong>1Zpresso JX-Pro:</strong> 1.0 to 2.0 (inner clicks counted from zero)</li>
        <li><strong>Timemore C2:</strong> 10-15 clicks from zero</li>
        <li><strong>Breville Smart Grinder Pro:</strong> Settings 1-8 (filter/espresso mode)</li>
        <li><strong>Eureka Mignon:</strong> 3-6mm on the dial</li>
      </ul>
      <p>
        The{" "}
        <Link href="/grind-size-guide" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Grind Size Guide
        </Link>{" "}
        has full reference settings across all brew methods for each grinder model.
      </p>

      <h2>How to tell if your espresso grind is correct</h2>
      <p>
        The most reliable indicator is shot time. For a standard 18g dose:
      </p>
      <ul>
        <li><strong>Shot time 25-35 seconds:</strong> Grind is in range — taste and adjust from here</li>
        <li><strong>Shot time under 20 seconds:</strong> Grind is too coarse — go finer</li>
        <li><strong>Shot time over 45 seconds:</strong> Grind is too fine — go coarser</li>
        <li><strong>Channelling (uneven flow, spurting):</strong> Distribution or tamping issue — grind itself may be correct</li>
      </ul>
      <p>
        Use the{" "}
        <Link href="/espresso-dial-in" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Espresso Dial-In Calculator
        </Link>{" "}
        to enter your current dose, yield, and shot time and get a specific adjustment recommendation.
      </p>

      <h2>Why is my espresso sour?</h2>
      <p>
        A sour espresso is almost always under-extracted. Under-extraction happens when
        water passes through the puck too quickly — either because the grind is too coarse,
        the dose is too low, or both. The sour, sharp, acidic flavour comes from the early
        extraction compounds (acids and fruity notes) without the balancing sweetness and
        body that extracts later.
      </p>
      <p>
        To fix: grind finer by 1-2 notches and pull another shot. If the shot time increases
        significantly (above 30 seconds) and the sourness is gone, you have found the issue.
        If the shot is still sour at 30+ seconds, increase your dose by 0.5g and try again.
      </p>

      <h2>Why is my espresso bitter?</h2>
      <p>
        Espresso too bitter means over-extraction — water in contact with the grounds for
        too long, pulling the harsh, astringent compounds that extract last. The grind is
        likely too fine, causing the water to slow down and over-extract on the way through.
      </p>
      <p>
        To fix: go coarser by 1-2 notches. If the shot time was already over 35 seconds,
        a coarser grind is the correct move. If the shot time was in the 25-35 second range
        and it still tastes bitter, the issue may be water temperature (too hot) or coffee
        freshness rather than grind size.
      </p>

      <h2>Best grind size for espresso: dialling in step by step</h2>
      <p>
        Dial in one variable at a time. Follow this sequence:
      </p>
      <ul>
        <li>
          <strong>Set a fixed dose</strong> — 18g is a standard double. Do not change
          this during dial-in.
        </li>
        <li>
          <strong>Set a target yield</strong> — 36g out (1:2 ratio) is a good starting
          point for a balanced double espresso.
        </li>
        <li>
          <strong>Pull a shot at your starting grind</strong> and note the time.
        </li>
        <li>
          <strong>If under 25 seconds:</strong> grind 2 notches finer. Pull again.
        </li>
        <li>
          <strong>If over 35 seconds:</strong> grind 2 notches coarser. Pull again.
        </li>
        <li>
          <strong>When time is 25-35 seconds:</strong> taste the shot. Adjust ratio
          (more yield for lighter taste, less yield for stronger) before touching the grind again.
        </li>
      </ul>
      <p>
        The{" "}
        <Link href="/espresso-ratio-calculator" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Espresso Ratio Calculator
        </Link>{" "}
        calculates your exact dose-to-yield ratio and shows where you sit relative to
        ristretto, normale, and lungo ranges.
      </p>

      <h2>Does espresso grind size change with different coffees?</h2>
      <p>
        Yes, and this is one of the most frustrating parts of home espresso. Light roasts
        are denser and require a finer grind than dark roasts at the same shot time target.
        Freshly roasted coffee (under 2 weeks from roast date) needs a coarser grind than
        older coffee because fresh CO2 in the beans increases resistance. Every time you
        switch bags, expect to re-dial.
      </p>
      <p>
        If troubleshooting a specific shot problem, the{" "}
        <Link href="/coffee-troubleshooter" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Coffee Troubleshooter
        </Link>{" "}
        gives a specific fix based on your exact symptoms.
      </p>
    </>
  )
}
