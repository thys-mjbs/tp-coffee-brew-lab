import Link from "next/link"

export default function Content() {
  return (
    <>
      <p>
        Why is your espresso sour? Because it is under-extracted – water moved through the
        puck too fast, pulling acidic early-extraction compounds without the sweetness and
        body that follows. Why is your espresso bitter? Because it is over-extracted –
        water spent too long in contact with the grounds, pulling harsh late-stage compounds.
        Both problems have the same fix: adjust grind size, dose, or yield to shift where
        extraction lands.
      </p>
      <p>
        This guide covers the specific cause of each problem and gives a step-by-step
        dial-in sequence so you stop guessing.
      </p>

      <h2>Why is my espresso sour?</h2>
      <p>
        Sour espresso is under-extracted. The most common causes, in order:
      </p>
      <ul>
        <li><strong>Grind too coarse</strong> – water flows through too fast, not enough contact time</li>
        <li><strong>Dose too low</strong> – not enough coffee to slow the water down</li>
        <li><strong>Water temperature too low</strong> – insufficient heat to drive extraction</li>
        <li><strong>Channelling</strong> – water finds a path of least resistance and bypasses most of the puck</li>
      </ul>
      <p>
        Fix sour espresso in this order: first grind finer by 1-2 notches and pull again.
        If the shot time increases to 25+ seconds and the sourness is gone, that was the
        problem. If it is still sour at a good shot time, increase dose by 0.5-1g. Check
        water temperature last.
      </p>

      <h2>Why is my espresso bitter?</h2>
      <p>
        Espresso too bitter means over-extraction. Most common causes:
      </p>
      <ul>
        <li><strong>Grind too fine</strong> – water slows down, extracts too long</li>
        <li><strong>Shot time too long</strong> – over 40 seconds almost always produces bitterness</li>
        <li><strong>Dose too high</strong> – too much coffee relative to yield causes puck resistance and over-extraction</li>
        <li><strong>Water temperature too high</strong> – above 96°C for most roasts accelerates extraction of bitter compounds</li>
        <li><strong>Stale coffee</strong> – old beans have already oxidised; their remaining extractable compounds skew bitter</li>
      </ul>
      <p>
        Fix: go coarser by 1-2 notches. If the shot was already running over 35 seconds,
        this is almost certainly the cause. If time was in range (25-35s) and it still
        tastes bitter, check water temperature and coffee freshness before touching grind again.
      </p>

      <h2>How to fix sour espresso: step by step</h2>
      <ul>
        <li>Note your current dose, yield, and shot time before changing anything</li>
        <li>Grind 2 notches finer</li>
        <li>Pull a shot at the same dose and target yield</li>
        <li>If shot time is now 25-35 seconds: taste. If balanced, stop here</li>
        <li>If still sour at 25-35 seconds: increase dose by 0.5g</li>
        <li>If shot time is now over 40 seconds: you went too fine – back off 1 notch</li>
      </ul>

      <h2>How to fix bitter espresso: step by step</h2>
      <ul>
        <li>Note your current dose, yield, and shot time</li>
        <li>Grind 2 notches coarser</li>
        <li>Pull a shot at the same dose and target yield</li>
        <li>If shot time drops to 25-35 seconds: taste. If still bitter, increase yield by 5g (use more water relative to dose)</li>
        <li>If shot time is now under 20 seconds: too coarse – add 1 notch back</li>
        <li>If bitterness persists at good shot time and yield: check water temperature and coffee age</li>
      </ul>

      <h2>Espresso dial-in: the variables in order</h2>
      <p>
        Change one variable at a time. This is the correct order:
      </p>
      <ul>
        <li><strong>1. Grind size</strong> – the primary lever for shot time and extraction rate</li>
        <li><strong>2. Dose</strong> – affects puck resistance and how much is extracted</li>
        <li><strong>3. Yield (output weight)</strong> – changes the ratio and perceived strength without touching extraction rate much</li>
        <li><strong>4. Water temperature</strong> – fine-tune after the above are dialled</li>
        <li><strong>5. Brew time</strong> – a result, not a setting. If time is wrong, it is telling you to adjust grind</li>
      </ul>
      <p>
        Use the{" "}
        <Link href="/espresso-dial-in" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Espresso Dial-In Calculator
        </Link>{" "}
        to enter your dose, yield, shot time, and taste and get a specific adjustment
        recommendation – one change at a time.
      </p>

      <h2>Espresso ratio: what does 1:2 actually mean?</h2>
      <p>
        A 1:2 espresso ratio means 1g of coffee in for every 2g of liquid out. An 18g dose
        produces 36g of espresso. This is the standard double espresso ratio. Ristretto
        is 1:1 to 1:1.5 (denser, sweeter, smaller). Lungo is 1:3 to 1:4 (longer, thinner,
        more bitter risk).
      </p>
      <p>
        The{" "}
        <Link href="/espresso-ratio-calculator" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Espresso Ratio Calculator
        </Link>{" "}
        shows exactly where your current dose and yield sits across the ristretto, normale,
        and lungo spectrum.
      </p>

      <h2>Quick dial-in reference</h2>
      <ul>
        <li><strong>Sour + fast shot (under 20s):</strong> Grind finer</li>
        <li><strong>Sour + good shot time (25-30s):</strong> Increase dose slightly</li>
        <li><strong>Bitter + slow shot (over 40s):</strong> Grind coarser</li>
        <li><strong>Bitter + good shot time:</strong> Increase yield (more water out), check temp and freshness</li>
        <li><strong>Weak + balanced flavour:</strong> Reduce yield (less water out) or increase dose</li>
        <li><strong>Channelling (spurting, uneven flow):</strong> Distribution and tamping issue, not grind</li>
      </ul>
      <p>
        For a specific fix based on your symptoms, the{" "}
        <Link href="/coffee-troubleshooter" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2">
          Coffee Troubleshooter
        </Link>{" "}
        walks through every common espresso and filter coffee problem with a targeted recommendation.
      </p>
    </>
  )
}
