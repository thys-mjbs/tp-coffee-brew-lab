# Coffee Brew Lab — Build Plan

*Site: Coffee Brew Lab | Framework: 03-coffee-brew-lab-build-framework.md | Master: tool-portfolio-master-build-framework.md*

---

## Keyword Analysis & Tool Derivation

### Keyword Processing Summary

The CSV (`keywords_serp.csv`) is ordered most-winnable to least-winnable. Verdicts: **WINNABLE** (rows 2–96), **BORDERLINE** (rows 97–209), **SKIP** (rows 210–222).

Competition indexed value ranges observed:
- WINNABLE: 0–21 (mostly 0–9)
- BORDERLINE: 0–42
- SKIP: 0–3 (but dominated by Healthline, Sleep Foundation, Nike, Peloton, etc.)

---

### Intent Clusters (Winnable)

| # | Cluster | Representative Keywords | Volume Signal | Tool |
|---|---------|------------------------|---------------|------|
| A | General coffee-to-water ratio (grinds, grounds, scoops, tablespoons, grams per cup and per pot) | how many coffee grinds per cup (1300), how many spoons of coffee per cup of water (880), how much ground coffee for 6 cups (1000), how much coffee grounds for 12 cup pot (390) | Very high | Tool 1 |
| B | French press ratio & calculator | french press coffee ratio calculator (720), french press ratio calculator (390), french press brew ratio (140), french press bean to water ratio (140) | High | Tool 2 |
| C | Instant / powdered coffee per cup | how much instant coffee per cup (1300), tablespoons of instant coffee (390), teaspoons of instant coffee (390), grams of instant coffee (170), how much coffee powder for 1 cup (140) | High | Tool 3 |
| D | Whole coffee beans per cup | how many beans for a cup of coffee (720 ×3 variants), how many grams coffee beans per cup (1000 ×2), tablespoons of coffee beans per cup (210 ×4), scoops of coffee beans per cup (140 ×2) | High | Tool 4 |
| E | Coffee unit conversion (grams ↔ tablespoons ↔ teaspoons ↔ scoops) | how many grams in a tablespoon of ground coffee (260), how much is one scoop of coffee (140) | Medium | Tool 5 |
| F | Pour over & V60 recipe + ratio | v60 recipe (2400), james hoffmann v60 recipe (320), tetsu kasuya v60 recipe (260), iced v60 recipe (260), pour over coffee calculator (140), water to coffee ratio pour over (260), best v60 recipe (210) | Very high | Tool 6 |
| G | AeroPress recipe & method | inverted aeropress method (2400), hoffmann aeropress recipe (320) | Very high | Tool 7 |
| H | Cold brew ratio (French press cold brew) | french press cold brew ratio (720), cold brew coffee french press ratio (720), cold brew coffee ratio french press (720) | High | Tool 8 |
| I | Caffeine per cup | how many mg does a cup of coffee have (480) | Medium | Tool 9 |
| J | Espresso ratio (espresso, ristretto, lungo, grams per shot) | double ristretto ratio (110), how many grams of coffee per cup of espresso (210) | Medium | Tool 10 |
| K | Milk-based coffee ratios (cafe au lait, latte, flat white, cortado) | cafe au lait ratio (140) + method site framework intent | Medium | Tool 11 |
| L | Iced pour over / iced V60 (Japanese iced method — different ratio from hot) | iced pour over ratio (140), iced v60 recipe (260) | Medium | Tool 12 |

---

### Intent Clusters (Borderline — used to reach 25 tools)

| # | Cluster | Representative Keywords | Volume Signal | Tool |
|---|---------|------------------------|---------------|------|
| M | French press steep time (massive volume borderline cluster) | how long to let french press steep (2900), how long should coffee steep in a french press (1600), how long to steep coffee french press (1000) | Very high | Tool 13 |
| N | Coffee diagnosis — bitter, sour, weak, over/under-extracted | why is my coffee bitter (590+), why is my coffee sour (590+), espresso too bitter (720), coffee too sour (210) — 15+ keyword variants | High | Tool 14 |
| O | Grind size by method and grinder model | espresso grind size chart (390), breville barista express grind size chart (390), baratza encore grind size chart (320), comandante c40 grind size chart (320), 1zpresso grind size chart (140) | High | Tool 15 |
| P | Hario Switch recipe | hario switch recipe (1900), v60 switch recipe (140) | High | Tool 16 |
| Q | Cold foam recipe (homemade) | homemade cold foam (1600), homemade vanilla cold foam (110), homemade sweet cream cold foam (110) | High | Tool 17 |
| R | AeroPress steep/brew time + how-to | how long to brew aeropress (170), how long to let aeropress steep (140), how to use aeropress (3600 — high competition but large cluster) | High | Tool 18 |
| S | Cold brew process & recipe guide (distinct from ratio calculator — method, steep time, equipment) | cold brew concentrate recipe (1600), cold brew at home recipe (320), homemade cold brew recipe (170) | High | Tool 19 |
| T | Iced coffee at home (general guide) | iced coffee recipe at home (1900), cold coffee recipe at home (480) | High | Tool 20 |
| U | Moka pot brew calculator (site framework priority + method coverage) | best grind size for moka pot (140) + framework-specified programmatic page | Low-Medium | Tool 21 |
| V | Coffee bloom timer (pre-infusion pour-over stage) | site framework: "coffee bloom timer" + timing queries around pour over method | Framework-driven | Tool 22 |
| W | Espresso dial-in (dose, yield, ratio, shot time — adjustment tool) | espresso grind size chart (390), best grind size for espresso (320), how do i dial in my espresso | Medium | Tool 23 |
| X | Coffee cost per cup calculator | coffee enthusiast purchase-intent + comparison queries (specialty vs. budget beans) | Framework-driven | Tool 24 |
| Y | Pour over brew timer (step-by-step timed pour sequence: bloom + pours) | distinct from bloom timer (tool 22) and ratio calculator (tool 6) — covers full V60 timer workflow | Framework-driven | Tool 25 |

---

### Derived Tool List (25 Tools)

All 25 tools are genuinely distinct. No tool is a thin variation of another.

| # | Tool Name | URL Slug | Source Verdict | Primary Keyword Cluster |
|---|-----------|----------|----------------|------------------------|
| 1 | Coffee-to-Water Ratio Calculator | `/coffee-ratio-calculator` | WINNABLE | General grounds/grams/scoops/tablespoons per cup & pot |
| 2 | French Press Ratio Calculator | `/french-press-ratio-calculator` | WINNABLE | French press specific ratios |
| 3 | Instant Coffee Calculator | `/instant-coffee-calculator` | WINNABLE | Instant/powdered coffee per cup (incl. Bustelo, Nescafe presets) |
| 4 | Coffee Beans per Cup Calculator | `/coffee-beans-per-cup` | WINNABLE | Whole beans to cup conversions |
| 5 | Coffee Measurement Converter | `/coffee-measurement-converter` | WINNABLE | Grams ↔ tablespoons ↔ teaspoons ↔ scoops unit conversion |
| 6 | Pour Over & V60 Recipe Calculator | `/pour-over-calculator` | WINNABLE | V60 recipe, Hoffmann & Kasuya presets, pour over ratio |
| 7 | AeroPress Recipe Guide | `/aeropress-recipe` | WINNABLE | Inverted, standard, Hoffmann AeroPress methods |
| 8 | Cold Brew Ratio Calculator | `/cold-brew-ratio-calculator` | WINNABLE | Cold brew coffee ratio (French press & jar method) |
| 9 | Coffee Caffeine Calculator | `/caffeine-calculator` | WINNABLE | Caffeine mg per cup by method and roast |
| 10 | Espresso Ratio Calculator | `/espresso-ratio-calculator` | WINNABLE | Espresso, ristretto, lungo dose/yield ratios |
| 11 | Milk Coffee Ratio Calculator | `/milk-coffee-ratio-calculator` | WINNABLE | Cafe au lait, latte, flat white, cortado milk ratios |
| 12 | Iced Coffee Pour Over Calculator | `/iced-pour-over-calculator` | WINNABLE | Japanese iced V60 (60/40 ice-water split, different ratio) |
| 13 | French Press Brew Timer & Guide | `/french-press-timer` | BORDERLINE | French press steep time (2900–1600 search volume) |
| 14 | Coffee Troubleshooter | `/coffee-troubleshooter` | BORDERLINE | Bitter/sour/weak coffee diagnosis tool |
| 15 | Coffee Grind Size Guide | `/grind-size-guide` | BORDERLINE | Grind size by method and grinder model |
| 16 | Hario Switch Recipe Calculator | `/hario-switch-recipe` | BORDERLINE | Hario Switch immersion-switch pour over method |
| 17 | Cold Foam Recipe Guide | `/cold-foam-recipe` | BORDERLINE | Homemade cold foam (vanilla, sweet cream variants) |
| 18 | AeroPress Brew Timer | `/aeropress-timer` | BORDERLINE | Step-by-step AeroPress timer with steep countdown |
| 19 | Cold Brew Recipe Guide | `/cold-brew-recipe` | BORDERLINE | Cold brew process guide (distinct from ratio calculator) |
| 20 | Iced Coffee at Home Guide | `/iced-coffee-at-home` | BORDERLINE | Iced coffee recipes and methods for home brewing |
| 21 | Moka Pot Brew Calculator | `/moka-pot-calculator` | BORDERLINE | Moka pot water, coffee, and grind guide |
| 22 | Coffee Bloom Timer | `/coffee-bloom-timer` | BORDERLINE | Pre-infusion bloom countdown for pour over methods |
| 23 | Espresso Dial-In Calculator | `/espresso-dial-in` | BORDERLINE | Dose/yield/ratio/time adjustment tool for dialing in espresso |
| 24 | Coffee Cost Calculator | `/coffee-cost-calculator` | BORDERLINE | Cost per cup from bag price, weight, and brew ratio |
| 25 | Pour Over Brew Timer | `/pour-over-timer` | BORDERLINE | Step-by-step timed V60 pour sequence (bloom + pour stages) |

---

### Keyword Governance Note

No keyword phrase from `keywords_serp.csv` may appear in body content more than **four times** across the entire site. Headers, titles, meta descriptions, URLs, and anchor text are excluded from the counter. The tracking columns (`Used In`, `Usage Count`, `Status`, `Content Type`, `Tool Covered`) will be added to `keywords_serp.csv` in Phase 1 Milestone 1.1.

---

### Design Direction

Based on master framework Section 3.5 (Per-Site Visual Personality):

| Element | Decision |
|---------|----------|
| Mood | Warm artisanal precision — a "lab" feel with coffee warmth |
| Base color | Warm cream / off-white (light mode); deep espresso brown dark mode (`#1c0a00` direction) |
| Brand accent | Warm amber: `#d97706` (amber-600) — not Tailwind blue |
| Supporting tones | Warm stone, roast brown, cream |
| Font (body) | Outfit via `next/font/google` — warm, clean, readable |
| Font (display H1) | Fraunces via `next/font/google` — editorial, warm, literary |
| Font (mono/output) | JetBrains Mono — for calculator outputs and technical values |
| Dark mode | Deep espresso-brown base; text at `stone-100`; tool output surfaces at lighter warm-dark |
| Avoid | Default Tailwind blue, blob hero, identical card pattern |

---

## Build Plan

---

[X] Phase 1: Project Setup & Foundation
    [X] Milestone 1.1: Initialize project, design system, and data layer
    [X] Milestone 1.2: Build shared layout (header, footer, navigation, breadcrumb)
    [X] Milestone 1.3: Build static pages (About, Privacy, Terms, Contact, 404) — approved
    [X] Milestone 1.4: Build homepage with tool grid — approved
    [X] Milestone 1.5: Set up Vercel Analytics and Speed Insights (GA4 deferred — add when ready)

    NOTE: Two Phase 1 items deliberately deferred to Phase 8:
    - Favicon (generate via ChatGPT prompt in master framework Section 3.5)
    - OG image / og-image.png (generate via ChatGPT prompt in master framework Section 3.5)
    These are not blocking — placeholder files will be added in Phase 8.

[X] Phase 2: Core Ratio & Measurement Tools (Winnable — Tools 1–5)
    [X] Milestone 2.1: Coffee-to-Water Ratio Calculator (Tool 1) — full page with SEO content, schema, FAQs
    [X] Milestone 2.2: French Press Ratio Calculator (Tool 2) — full page with SEO content, schema, FAQs
    [X] Milestone 2.3: Instant Coffee Calculator (Tool 3) + Coffee Measurement Converter (Tool 5)
    [X] Milestone 2.4: Coffee Beans per Cup Calculator (Tool 4) — full page with SEO content, schema, FAQs

[X] Phase 3: Method-Specific Calculators (Winnable — Tools 6–12)
    [X] Milestone 3.1: Pour Over & V60 Recipe Calculator (Tool 6) — Hoffmann + Kasuya presets, full SEO
    [X] Milestone 3.2: AeroPress Recipe Guide (Tool 7) — standard, inverted, Hoffmann methods, full SEO
    [X] Milestone 3.3: Cold Brew Ratio Calculator (Tool 8) + Iced Coffee Pour Over Calculator (Tool 12)
    [X] Milestone 3.4: Caffeine Calculator (Tool 9) + Espresso Ratio Calculator (Tool 10) + Milk Coffee Ratio Calculator (Tool 11)

[X] Phase 4: Timer & Interactive Guide Tools (Borderline — Tools 13, 18, 22, 25)
    [X] Milestone 4.1: French Press Brew Timer & Guide (Tool 13) — countdown timer + steep guide, full SEO
        AI Friction: PASS (real-time device — AI cannot run a countdown timer in browser)
    [X] Milestone 4.2: AeroPress Brew Timer (Tool 18) — multi-stage step-by-step timer, full SEO
        AI Friction: PASS (real-time device — multi-stage countdown, AI cannot replicate)
    [X] Milestone 4.3: Coffee Bloom Timer (Tool 22) + Pour Over Brew Timer (Tool 25)
        AI Friction: PASS (real-time device — bloom and pour-stage countdown timers)

---

### AI Friction Standard

Every tool on this site must pass the AI Friction Test before its milestone is marked complete.

**The test:** "Would a typical user find it faster and easier to type a prompt into ChatGPT, Claude, or Gemini and get the same result?"

A tool **passes** if it offers at least one of these genuine advantages:
1. **Instant structured output** — results appear with zero prompting, no back-and-forth
2. **Zero prompting required** — the tool does the work without the user forming a query
3. **Speed** — result in under 3 seconds, no AI latency
4. **Repeatability** — same inputs, same exact output every time with no variation
5. **Precision** — standards-compliant values (FDA limits, SCA ratios, manufacturer settings)
6. **Browser-side privacy** — no data leaves the device
7. **Real-time / live input** — countdown timers, live sliders, instant recalculation

**Copy buttons are required on all calculators and recipe tools.** A copy button that outputs structured plain text (amounts, steps, timings) is itself a friction advantage — AI chat cannot produce this in one click.

**Build-time rule:** Recipe guides and method guides that do not include a calculator, configurator, or timer FAIL automatically. Build the calculator version, not the article version.

**Retrofits applied (Phases 2–4):**
- AeroPress Recipe Guide (Tool 7): rewritten as dose-adjustable ratio calculator with full step parameterisation and CopyButton
- Caffeine Calculator (Tool 9): added CopyButton with formatted caffeine + daily-limit output
- Coffee Troubleshooter (Tool 14): added CopyDiagnosis button for structured diagnosis + fix list
- Grind Size Guide (Tool 15): added CopyButton on both method tab and grinder tab
- Hario Switch Recipe (Tool 16): added CopyButton for full recipe as plain text
- Moka Pot Calculator (Tool 21): added CopyButton for brew summary line

---

[X] Phase 5: Diagnostic, Reference & Recipe Tools (Borderline — Tools 14–17, 19–21)
    [X] Milestone 5.1: Coffee Troubleshooter (Tool 14) — interactive bitter/sour/weak diagnosis flowchart
        AI Friction: PASS (retrofitted) — CopyDiagnosis button outputs structured diagnosis + numbered fix list
    [X] Milestone 5.2: Coffee Grind Size Guide (Tool 15) — method + grinder model reference tool
        AI Friction: PASS (retrofitted) — CopyButton on both tabs outputs all grind settings as structured text
    [X] Milestone 5.3: Hario Switch Recipe Calculator (Tool 16) + Moka Pot Brew Calculator (Tool 21)
        AI Friction: PASS (retrofitted) — CopyButton on both tools copies full recipe as structured plain text
    [X] Milestone 5.4: Cold Foam Recipe Guide (Tool 17) + Iced Coffee at Home Guide (Tool 20)
        AI Friction: PASS — both built as calculators, not static guides.
        - Tool 17 (Cold Foam): Milk type selector (whole / 2% / oat / coconut / heavy cream) + serving size (4/6/8/12oz) + flavor (plain / vanilla / sweet cream / brown sugar / caramel) + CopyButton. Badge system shows foam quality per milk type.
        - Tool 20 (Iced Coffee): Method selector (flash brew / cold brew dilution / shaken espresso / coffee ice cubes) + cup size (8/12/16/20oz). Each method computes exact coffee, water, and ice amounts + step-by-step instructions + CopyButton.
    [X] Milestone 5.5: Cold Brew Recipe Guide (Tool 19)
        AI Friction: PASS — built as a batch configurator, not a static guide.
        Batch size (1 cup / 1 quart / half-gallon / 1 gallon) + strength (regular 1:8 / concentrate 1:5 / strong 1:4) + equipment (mason jar / French press / Toddy). Outputs exact coffee grams, water grams, steep time, estimated yield, and 6-step instructions tailored to equipment. CopyButton included.

[X] Phase 6: Specialty Calculators & Monetization Setup (Borderline — Tools 23–24 + Affiliate)
    [X] Milestone 6.1: Espresso Dial-In Calculator (Tool 23) + Coffee Cost Calculator (Tool 24)
        AI Friction: Both PASS definitively without retrofits needed.
        - Tool 23 (Espresso Dial-In): Precision recommendation engine. Inputs: current dose + yield + shot time + taste verdict (bitter/sour/balanced) → specific adjustment ("grind 1 notch finer", "reduce dose by 0.5g"). Deterministic, standards-based output — AI chat gives vague advice, this gives a specific number.
        - Tool 24 (Coffee Cost): Precision cost math. Inputs: bag price + bag weight + dose per brew + brew ratio → cost per cup + cups per bag + comparison tier (budget / mid / specialty). Include CopyButton. AI cannot compute this without the user typing all inputs anyway, but this does it instantly in one click.
    [X] Milestone 6.2: Amazon affiliate setup — lib/affiliate/config.ts + AmazonLinks component (done in 2.1)
    [X] Milestone 6.3: Wire AmazonLinks into all 25 tool pages with method-relevant search terms

[X] Phase 7: Blog Content (Minimum 10 Posts at Launch)

    KEYWORD RULE: Every blog post MUST target a specific keyword phrase from
    framework/keywords_serp.csv. Open the CSV, find all WINNABLE and BORDERLINE rows
    for the topic, pick the highest-volume phrase as the primary target. That phrase
    MUST appear in the H1 and within the first 100 words. See "Blog Post Checklist"
    section below before writing any post.

    [X] Milestone 7.1: Blog infrastructure (layout, post template, schema, index page)
    [X] Milestone 7.2: Blog posts 1-3
        Post 1 — Primary: "how many coffee grounds per cup" (1300/mo, WINNABLE)
          H1: How Much Ground Coffee Per Cup? The Golden Ratio Explained
          Slug: /blog/the-golden-ratio
          Secondary: "how much ground coffee per cup of water" (1000), "how many grams coffee beans per cup" (1000)
        Post 2 — Primary: "v60 recipe" (2400/mo, WINNABLE)
          H1: The Perfect V60 Recipe: James Hoffmann's Method Explained
          Slug: /blog/perfect-v60-recipe
          Secondary: "v60 pour over recipe" (260), "hoffmann v60 recipe" (320)
        Post 3 — Primary: "how long to let french press steep" (2900/mo, BORDERLINE)
          H1: How Long to Steep French Press Coffee (Complete Brew Guide)
          Slug: /blog/french-press-guide
          Secondary: "french press steep time" cluster, "how long should french press steep"
    [X] Milestone 7.3: Blog posts 4-6
        Post 4 — Primary: "inverted aeropress method" (2400/mo, WINNABLE)
          H1: The Inverted AeroPress Method: Step-by-Step Recipe Guide
          Slug: /blog/aeropress-inverted-method
          Secondary: "hoffmann aeropress recipe" (320), "aeropress coffee recipe" (590)
        Post 5 — Primary: "best grind size for espresso" (320/mo, BORDERLINE)
          H1: Espresso Grind Size: The Beginner's Guide to Dialling In
          Slug: /blog/espresso-grind-size-guide
          Secondary: "espresso grind size chart" (390), "why is my espresso sour" (590)
        Post 6 — Primary: "french press cold brew ratio" (720/mo, WINNABLE)
          H1: Cold Brew at Home: Ratios, Steep Time, and the French Press Method
          Slug: /blog/cold-brew-at-home
          Secondary: "cold brew at home recipe" (320), "aeropress cold brew recipe" (140)
    [X] Milestone 7.4: Blog posts 7-10
        Post 7 — Primary: "best grind size for moka pot" (140/mo, BORDERLINE) [limited CSV coverage]
          H1: Moka Pot Grind Size and the 5 Most Common Brew Mistakes
          Slug: /blog/moka-pot-mistakes
          Note: No cluster in CSV — use to support /moka-pot-calculator internal linking
        Post 8 — Primary: "how to steep coffee" (210/mo, WINNABLE) [Water Temp topic retargeted]
          H1: How to Steep Coffee: Brew Times, Water Temperature, and Method Guide
          Slug: /blog/how-to-steep-coffee
          Secondary: Water temp guidance woven in as supporting content (no direct CSV keyword found)
        Post 9 — Primary: "why is my espresso sour" (590/mo, BORDERLINE) or "espresso too bitter" (720/mo, BORDERLINE)
          H1: Why Is My Espresso Sour or Bitter? How to Dial In Your Shot
          Slug: /blog/espresso-dial-in-guide
          Secondary: "why is my espresso bitter" (720), "espresso too bitter" (720)
        Post 10 — No direct CSV keyword for "Coffee Glossary" — low SEO value as standalone
          ACTION: Retarget to "how to use cold brew" (170/mo, WINNABLE) or leave as reference-only
          Slug TBD: /blog/coffee-glossary (reference post, no primary keyword target)

[X] Phase 8: SEO Infrastructure & Launch Polish
    [X] Milestone 8.1: Sitemap.xml, robots.txt, dynamic per-tool OG images (opengraph-image.tsx)
    [X] Milestone 8.2: Site-wide OG image (og-image.png placeholder), favicon placeholder, apple-touch-icon placeholder
    [X] Milestone 8.3: Full internal link audit — every tool links to at least 3 related tools
    [X] Milestone 8.4: Schema validation — WebApplication, FAQPage, BreadcrumbList on every tool page
    [X] Milestone 8.5: Core Web Vitals audit — PageSpeed Insights mobile score target 85+, INP, CLS

[X] Phase 9: Programmatic SEO Expansion
    [X] Milestone 9.1: Add tracking columns to keywords_serp.csv; cross-reference all 25 tools against keyword list
    [X] Milestone 9.2: Serving-size variant pages — /coffee-ratio/for-1-cup, /for-4-cups, /for-12-cups
    [ ] Milestone 9.3: Spanish language variants for top 10 tools
    [ ] Milestone 9.4: Portuguese + French language variants for top 10 tools

---

## DOMAIN CHECKPOINT — Resume Here After Custom Domain Is Live

When the custom domain is purchased and set in Vercel, return to this section before starting Phase 10.

Tasks to complete at domain handoff:
- Set NEXT_PUBLIC_APP_URL in Vercel environment variables (Production + Preview)
- Set up Paystack account and verify the domain against Paystack's requirements
- Register Google Search Console for the new domain
- Resubmit sitemap.xml to Search Console
- Confirm canonical URLs in all 25 tool pages are resolving correctly
- Then proceed with Phase 10 below

---

[ ] Phase 10: Downloadable Assets + Paystack Monetization (BLOCKED — requires custom domain)

    CONTEXT: One price per downloadable asset (set via admin panel). Free version of each asset
    is watermarked/branded with the site URL. Paid version is clean and print-ready. Paystack
    is the payment processor — it requires a verified domain to go live. Do not begin any
    milestone in this phase until the domain checkpoint above is complete.

    [ ] Milestone 10.1: Asset planning — audit all 25 tools and decide which get a downloadable
        asset. Likely candidates: French Press brew card, V60 brew card, AeroPress brew card,
        Espresso dial-in reference card, Grind Size reference card, Cold Brew recipe card.
        Output: a confirmed asset list with one free (branded) and one paid (clean) version each.

    [ ] Milestone 10.2: Design and generate downloadable brew cards
        - Build PDF templates using @react-pdf/renderer (one component per card style)
        - Free version: includes brewlab.coffee URL watermark in footer
        - Paid version: clean, no branding, high-resolution print-ready
        - Cards to cover: French Press, V60/Pour Over, AeroPress, Espresso, Grind Size reference

    [ ] Milestone 10.3: Admin panel — price management
        - Route: /admin (protected, not indexed)
        - Auth: username + password (credentials set via environment variables — no DB needed at first)
        - UI: single price field per asset, save to a config file or environment variable
        - No Stripe — Paystack only
        - Username/password implementation deferred until domain is live and Paystack is verified

    [ ] Milestone 10.4: Paystack integration
        - One-time payment per asset (no subscription)
        - Payment Link or Paystack Popup — evaluate which requires less backend
        - On successful payment: deliver download URL (time-limited signed URL or redirect)
        - Add PAYSTACK_PUBLIC_KEY and PAYSTACK_SECRET_KEY to Vercel environment variables

    [ ] Milestone 10.5: Retrofit tool pages with download CTAs
        - Add "Download brew card" section to each relevant tool page
        - Show free (branded) download immediately — no gate
        - Show paid (clean) download behind Paystack payment flow
        - CTA placement: below the calculator widget, above AmazonLinks

---

## Infrastructure Notes (Confirm Before Phase 1 Implementation Begins)

Per master framework Section 0 — before any code is written, confirm:

| Item | Status |
|------|--------|
| GitHub repo | Exists: `tp-coffee-brew-lab-build-framework` |
| Vercel account | Confirm with user |
| GA4 property | Confirm with user |
| Google Search Console | Confirm with user |
| Node.js 20 LTS installed | Confirm with user |
| `.env.local` strategy | Set `NEXT_PUBLIC_APP_URL=http://localhost:3000` locally |

The existing GitHub repo will be used. The Next.js app will be initialized inside the repo root (not a subdirectory), since the repo is already named for this project.

---

## Tool Page Checklist (Apply to Every Tool Before Marking Its Milestone Complete)

- [ ] Tool widget visible and functional above the fold on mobile (375px width)
- [ ] Zero state is welcoming — clear visual invitation
- [ ] Result state has a distinct visual transition
- [ ] Error state shows a gentle, specific message
- [ ] All interactive elements are at least 44x44px touch targets on mobile
- [ ] H1 includes primary keyword
- [ ] SEO body copy 400–600 words with question-format H2/H3 headings
- [ ] 6–8 FAQ pairs on page + FAQPage JSON-LD schema
- [ ] WebApplication schema injected
- [ ] BreadcrumbList schema injected
- [ ] Rendered breadcrumb navigation component on page
- [ ] Canonical tag set
- [ ] OG tags set (title, description, image)
- [ ] Per-tool opengraph-image.tsx in place
- [ ] At least 3 internal links to related tools (Related Tools section)
- [ ] AmazonLinks component with 3–5 relevant search terms
- [ ] No keyword used more than 4 times in body content
- [ ] No em dashes anywhere in copy
- [ ] Data-handling tools (if any) explicitly state browser-side processing

---

## Blog Post Checklist (Apply to Every Blog Post Before Marking Its Milestone Complete)

### Keyword targeting (must do FIRST — before writing a word)
- [ ] Opened framework/keywords_serp.csv and found all WINNABLE and BORDERLINE rows relevant to the topic
- [ ] Identified the single highest-volume phrase as the primary keyword target
- [ ] Primary keyword noted alongside the milestone entry in this BUILD_PLAN.md
- [ ] Primary keyword appears verbatim in the H1 title
- [ ] Primary keyword appears within the first 100 words of the post body
- [ ] Secondary keywords (same SERP cluster) used in at least 2 H2 headings

### Content structure
- [ ] Post opens by answering the primary query directly (no preamble)
- [ ] H2s are question-format (mirrors how the keyword would be searched)
- [ ] Step-by-step section or method table included where relevant
- [ ] No keyword used more than 4 times across the entire post
- [ ] No em dashes anywhere in copy
- [ ] Reading time 5-8 minutes (approx 1200-2000 words)

### Internal linking
- [ ] At least 2 links to related tools (use relatedToolSlugs in lib/blog.ts)
- [ ] At least 1 link to another blog post where one exists

### SEO metadata
- [ ] Slug reflects the primary keyword phrase (not just the topic label)
- [ ] Meta description (lib/blog.ts description field) includes primary keyword and a specific number or fact
- [ ] BlogPosting JSON-LD schema injected via blogPostingSchema() in app/blog/[slug]/page.tsx
- [ ] BreadcrumbList schema present on post page

### Registry
- [ ] Post added to lib/blog.ts allPosts array with correct slug, title, description, excerpt, relatedToolSlugs
- [ ] Content component created at content/blog/[slug].tsx

---

*Build plan created: 2026-05-13. All phases and milestones begin unchecked. No milestone may be marked [X] without explicit user approval.*
