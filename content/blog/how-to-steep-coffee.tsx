import Link from "next/link"

export default function Content() {
  return (
    <>
      <p>
        How to steep coffee depends on the method: French press steeps for 4 minutes at
        90-95°C, cold brew steeps for 12-24 hours in the fridge at room temperature or below,
        and AeroPress steeps for 1-2 minutes at 80-95°C. Every immersion brew method works
        by holding coffee grounds in contact with water for a fixed time — steeping is what
        makes immersion brewing different from percolation methods like pour over.
      </p>
      <p>
        The right steep time, water temperature, and grind size depend on your method and
        the flavour you are chasing. This guide covers all four major steeping methods with
        specific numbers.
      </p>

      <h2>How to steep coffee: by method</h2>
      <ul>
        <li>
          <strong>French press:</strong> 4 minutes at 90-96°C, coarse grind (1:15 ratio).
          Use the{" "}
          <Link href="/french-press-timer" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
            French Press Brew Timer
          </Link>{" "}
          for step-by-step prompts.
        </li>
        <li>
          <strong>AeroPress:</strong> 1:30 to 2:00 minutes at 80-92°C, medium-fine grind (1:13-1:15 ratio).
          Works inverted or standard.
        </li>
        <li>
          <strong>Cold brew (fridge):</strong> 12-24 hours at 2-8°C, coarse grind (1:8 for
          ready-to-drink, 1:5 for concentrate).
        </li>
        <li>
          <strong>Cold brew (room temperature):</strong> 8-12 hours, same coarse grind.
          Faster than fridge, more risk if left too long.
        </li>
        <li>
          <strong>Clever Dripper / Hario Switch:</strong> 3-4 minutes at 92-96°C,
          medium-coarse grind (1:15-1:16 ratio).
        </li>
      </ul>

      <h2>What temperature water for steeping coffee?</h2>
      <p>
        For hot immersion brewing, the standard water temperature range is 88-96°C (190-205°F).
        The ideal temperature depends on roast level:
      </p>
      <ul>
        <li><strong>Light roast:</strong> 94-96°C — lighter roasts need more heat to extract fully</li>
        <li><strong>Medium roast:</strong> 90-94°C — standard range for most filter brewing</li>
        <li><strong>Dark roast:</strong> 88-92°C — lower temp reduces harsh, bitter extraction from over-roasted beans</li>
        <li><strong>Cold brew:</strong> Room temperature or fridge — no heat needed</li>
      </ul>
      <p>
        If you do not have a temperature-controlled kettle: bring water to a boil and let it
        sit off the heat for 30-60 seconds. That drops it to approximately 94-96°C. A full
        minute off the boil brings it to around 90-92°C.
      </p>

      <h2>How long to steep coffee for the best flavour?</h2>
      <p>
        Steep time is one lever in a system that includes grind size, ratio, and temperature.
        All four interact — changing steep time without adjusting grind size gives inconsistent
        results. Here is the relationship:
      </p>
      <ul>
        <li><strong>Too short a steep</strong> = under-extraction: sour, sharp, thin, watery</li>
        <li><strong>Too long a steep</strong> = over-extraction: bitter, harsh, astringent, dry</li>
        <li><strong>Correct steep at wrong grind</strong> = still off — grind controls how fast extraction happens</li>
      </ul>
      <p>
        For most steeping methods, start with the standard time and adjust grind before
        adjusting time. A fine grind at 3 minutes extracts as much as a coarse grind at
        6 minutes.
      </p>

      <h2>Steep time vs grind size: which matters more?</h2>
      <p>
        Grind size has a larger effect on extraction rate than steep time. Halving the
        particle size roughly doubles extraction speed. This is why most troubleshooting
        for immersion brewing starts with grind adjustment rather than time adjustment —
        a coarser or finer grind reliably shifts extraction, while changing time by
        30-60 seconds has a more subtle effect.
      </p>
      <p>
        In practice: if your French press tastes sour at 4 minutes, grind finer rather
        than steeping longer. Steeping longer extracts more but also introduces bitterness
        earlier. Grinding finer pushes the extraction faster across the full flavour curve.
      </p>

      <h2>Bloom before steeping: does it matter?</h2>
      <p>
        A bloom (30 seconds of pre-wetting with 2x the coffee weight in water) matters
        most for fresh coffee — beans roasted within the past 2-3 weeks release CO2 that
        can create uneven extraction. The bloom lets that gas escape before the main steep.
        For older coffee (more than 3-4 weeks from roast), the bloom matters less.
      </p>
      <p>
        French press benefits from a bloom but does not require it — the immersion method
        compensates for CO2 release during the steep itself. AeroPress benefits more because
        the shorter steep time leaves less room for CO2 interference. Use the{" "}
        <Link href="/coffee-bloom-timer" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Coffee Bloom Timer
        </Link>{" "}
        to time the bloom precisely.
      </p>

      <h2>Immersion vs percolation: what is the difference?</h2>
      <p>
        Immersion brewing (French press, AeroPress, cold brew) steeps the grounds in a
        fixed volume of water for the full brew time. Percolation brewing (V60, Chemex,
        drip machine) continuously passes fresh water through the grounds. Immersion is
        more forgiving — the brew reaches extraction equilibrium and stops extracting on
        its own once the water is saturated. Percolation can over-extract if the flow rate
        is too slow.
      </p>
      <p>
        For cold brew and the exact water volumes for any steep method, the{" "}
        <Link href="/cold-brew-ratio-calculator" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Cold Brew Ratio Calculator
        </Link>{" "}
        and the{" "}
        <Link href="/aeropress-recipe" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          AeroPress Recipe Calculator
        </Link>{" "}
        both output exact gram weights for your cup size and strength.
      </p>
    </>
  )
}
