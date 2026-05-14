# Add a Language to Coffee Brew Lab

You are about to add a new language variant to Coffee Brew Lab. The site serves localised pages at `/{lang}/{slug}` for 10 top tools. Every piece of translated content lives in a single TypeScript file (`lib/i18nVariants.ts`). A minimum functional language addition touches two source files: the variants file and the locale page template. Phase 4 adds optional but recommended fixes for hardcoded English strings in the ShareBar and the back-link. Several additional English-only components (RelatedTools, Breadcrumb) are acknowledged as known limitations and do not require changes for a working language addition.

---

## How to run this

Work through one phase at a time. After completing each milestone within a phase, output a status line:

```
✓ Milestone N.M done — [one sentence]
```

After the final milestone in a phase, output a phase summary and **stop completely**:

```
✓ Phase N done — [one sentence]
```

Wait for the user to say "continue" before starting the next phase. Do not attempt more than one phase per session. Target 10,000–20,000 tokens per session. If a phase is still too large, complete the first milestone, report, and stop — the user will say "continue" to resume.

> **Phase 2 exception:** Phase 2 has two sub-milestones (2.1 and 2.2), each with its own stop. After completing Milestone 2.1, stop and wait for "continue" before writing Milestone 2.2. This prevents hitting API token limits on the large variants block.

If interrupted, start a new conversation, paste this prompt, and add at the top: "Resume from Phase N, Milestone M." Then open `docs/build-plan-[LANG_CODE].md` to see exactly which items are done versus remaining.

---

## Phase 1 — Register the locale

Phase 1 touches configuration only: the supported-locale type definition, the language label display record, and the FAQ heading string. No translation content is written yet.

---

### Milestone 1.0 — Create the build plan

Before touching any source code, create `docs/build-plan-[LANG_CODE].md`. Replace `[LANG_CODE]`, `[LANGUAGE]`, and `[NATIVE_NAME]` with the values from the Config block at the very bottom of this document.

Create the file with exactly this content (replacing the placeholders):

```markdown
# Build Plan: [LANGUAGE] ([NATIVE_NAME]) — [LANG_CODE]

## Phase 1 — Register the locale
- [x] 1.0 Create this build plan file
- [ ] 1.1 Add `[LANG_CODE]` to `supportedLangs` in `lib/i18nVariants.ts`
- [ ] 1.2 Add `[LANG_CODE]` to `langLabels` in `app/[lang]/[slug]/page.tsx`
- [ ] 1.3 Extend FAQ heading ternary in `app/[lang]/[slug]/page.tsx`

## Phase 2 — Create i18n variant entries
- [ ] 2.1 Add [LANG_CODE] variants for tools 1–5 in `lib/i18nVariants.ts`
  - [ ] coffee-ratio-calculator
  - [ ] french-press-ratio-calculator
  - [ ] instant-coffee-calculator
  - [ ] coffee-beans-per-cup
  - [ ] coffee-measurement-converter
- [ ] 2.2 Add [LANG_CODE] variants for tools 6–10 in `lib/i18nVariants.ts`
  - [ ] pour-over-calculator
  - [ ] aeropress-recipe
  - [ ] cold-brew-ratio-calculator
  - [ ] caffeine-calculator
  - [ ] espresso-ratio-calculator

## Phase 3 — Content files scope audit
- [ ] 3.1 Confirm blog posts stay English-only (no action needed)
- [ ] 3.2 Confirm serving variants stay English-only (no action needed)

## Phase 4 — Wire up and fix hardcoded-English gaps
- [ ] 4.1 Verify `generateStaticParams` auto-includes new lang
- [ ] 4.2 Fix "English version" back-link label in `app/[lang]/[slug]/page.tsx`
- [ ] 4.3 Fix ShareBar label strings in `components/ShareBar.tsx`

## Phase 5 — Sitemap and hreflang
- [ ] 5.1 Confirm new lang pages appear in sitemap output
- [ ] 5.2 Review hreflang coverage in `generateMetadata`

## Phase 6 — TypeScript compile and manual verification
- [ ] 6.1 Run `npx tsc --noEmit` — verify no TypeScript errors
- [ ] 6.2 Manual verification checklist
```

Output: `✓ Milestone 1.0 done — docs/build-plan-[LANG_CODE].md created`

---

### Milestone 1.1 — Add `[LANG_CODE]` to `supportedLangs` in `lib/i18nVariants.ts`

**File:** `lib/i18nVariants.ts`, line 1.

Current:
```ts
export const supportedLangs = ["es", "pt", "fr"] as const
```

Change to:
```ts
export const supportedLangs = ["es", "pt", "fr", "[LANG_CODE]"] as const
```

This extends the `Lang` union type. Any code that performs type-narrowing on `Lang` will now accept `"[LANG_CODE]"` as valid.

Update `docs/build-plan-[LANG_CODE].md`: mark item `1.1` as `[x]`.

Output: `✓ Milestone 1.1 done — [LANG_CODE] added to supportedLangs`

---

### Milestone 1.2 — Add `[LANG_CODE]` to `langLabels` in `app/[lang]/[slug]/page.tsx`

**File:** `app/[lang]/[slug]/page.tsx`, lines 14–18.

The `langLabels` record maps each lang code to its native display name. This text appears as a pill badge at the top of every localised page. Use the language's own name for itself (e.g., "Deutsch", not "German").

Current:
```tsx
const langLabels: Record<string, string> = {
  es: "Español",
  pt: "Português",
  fr: "Français",
}
```

Change to (replace `[NATIVE_NAME]` with the value from the Config block):
```tsx
const langLabels: Record<string, string> = {
  es: "Español",
  pt: "Português",
  fr: "Français",
  "[LANG_CODE]": "[NATIVE_NAME]",
}
```

Update `docs/build-plan-[LANG_CODE].md`: mark item `1.2` as `[x]`.

Output: `✓ Milestone 1.2 done — langLabels extended with [LANG_CODE]`

---

### Milestone 1.3 — Extend the FAQ heading ternary in `app/[lang]/[slug]/page.tsx`

**File:** `app/[lang]/[slug]/page.tsx`, line 88.

**Hardcoded-English gap:** The FAQ section heading uses a hardcoded ternary chain. Every language needs its own entry here — the current chain only handles `es`, `pt`, and `fr`. If a new language is added without updating this chain, the heading falls through to `"Questions fréquentes"` (French), which is wrong.

Current:
```tsx
<h2 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
  {lang === "es" ? "Preguntas frecuentes" : lang === "pt" ? "Perguntas frequentes" : "Questions fréquentes"}
</h2>
```

Change to (add a new `lang === "[LANG_CODE]"` check, and give French its own explicit check so the final fallback becomes generic English):
```tsx
<h2 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
  {lang === "es"
    ? "Preguntas frecuentes"
    : lang === "pt"
    ? "Perguntas frequentes"
    : lang === "fr"
    ? "Questions fréquentes"
    : lang === "[LANG_CODE]"
    ? "[FAQ HEADING IN [LANGUAGE]]"
    : "Frequently asked questions"}
</h2>
```

Replace `[FAQ HEADING IN [LANGUAGE]]` with the natural [LANGUAGE] phrase for "Frequently asked questions" — for example: German → `"Häufig gestellte Fragen"`, Italian → `"Domande frequenti"`, Japanese → `"よくある質問"`.

Update `docs/build-plan-[LANG_CODE].md`: mark item `1.3` as `[x]`.

Output: `✓ Milestone 1.3 done — FAQ heading ternary extended for [LANG_CODE]`

---

After completing Milestones 1.0 through 1.3, output:
```
✓ Phase 1 done — [LANG_CODE] registered in supportedLangs, langLabels, and the FAQ heading ternary; no content written yet
```
**Stop. Wait for "continue" before starting Phase 2.**

---

## Phase 2 — Create the i18n variant entries

> **Linguistic localisation note — read before writing a single string:**
>
> All strings in this phase must be written the way a fluent native speaker of [LANGUAGE] would naturally phrase them in a conversational UI context — **not** verbatim word-for-word translations from English. Adapt idioms, sentence structure, verb forms, and UI conventions to what sounds natural in [LANGUAGE]. This applies to every string type in the variant objects: `metaTitle`, `metaDescription`, `h1`, `excerpt`, FAQ questions, and FAQ answers.
>
> Use the Spanish (`es`) variants shown below as structural and tonal templates, not as English-equivalent source text. Match their register (direct, practical, helpful, no marketing filler) and their FAQ format (a precise question followed by a specific numeric or factual answer). Adapt phrasing entirely to [LANGUAGE] conventions — do not produce a word-for-word rendering from Spanish either.

> **Important:** Do not run `npx tsc` between Milestone 2.1 and Milestone 2.2. The variants array will be incomplete until both sub-milestones are finished. A partial array will not cause a TypeScript error, but the new language will only show pages for the first 5 tools — which is expected mid-phase. Run `npx tsc` only in Phase 6.

---

### Milestone 2.1 — Add [LANG_CODE] variants for tools 1–5

**File:** `lib/i18nVariants.ts`.

Find the closing `]` of the `variants` array (after the last French `fr` block, around line 757). Insert a new language section immediately before that closing `]`.

Open the section with a banner comment:
```ts
  // ─── [LANG_UPPER] ([LANG_CODE]) ────────────────────────────────────────────
```

Then append one `I18nVariant` object per tool. The interface is:
```ts
{
  lang: "[LANG_CODE]",
  slug: "...",
  metaTitle: "...",        // page <title> — should include a keyword-rich tool name
  metaDescription: "...", // meta description — 120–160 chars, includes key facts
  h1: "...",              // visible page heading — may match or vary from metaTitle
  excerpt: "...",         // 1–2 sentence intro shown below the H1
  faqs: [
    { q: "...", a: "..." },
    { q: "...", a: "..." },
    { q: "...", a: "..." },
  ],
}
```

Write all five variant objects listed below.

---

**Tool 1 of 5 — `coffee-ratio-calculator`**

*What this tool does:* Calculates how much ground coffee to use per cup in grams and tablespoons. Users enter number of cups, cup size, and strength preference.

*Key numeric facts to preserve in the [LANGUAGE] text (do not translate the numbers):*
- 250 ml standard cup at medium strength (1:16 ratio) → 15 g of coffee
- 1 tablespoon = ~6 g medium grind
- 1 scoop = ~12 g (1.25 scoops per 250 ml cup at medium)
- SCA Golden Cup standard: 55 g per litre (~1:18)

Spanish (`es`) reference for structure and tone:
```ts
{
  lang: "es",
  slug: "coffee-ratio-calculator",
  metaTitle: "Calculadora de Café: Cuánto Café por Taza en Gramos y Cucharadas",
  metaDescription:
    "Calcula exactamente cuánto café molido usar por taza en gramos, cucharadas o scoops. Ajustable por tamaño de taza y fuerza. Gratis, sin registro.",
  h1: "Calculadora de Café: Cuánto Café por Taza en Gramos y Cucharadas",
  excerpt:
    "Introduce el número de tazas, selecciona el tamaño y la fuerza, y obtén al instante la cantidad exacta de café en gramos, cucharadas soperas o scoops. Sin registrarte, sin cuentas.",
  faqs: [
    {
      q: "¿Cuánto café se pone por taza?",
      a: "Para una taza estándar de 250 ml a fuerza media (relación 1:16), usa unos 15 g de café molido, equivalentes a 2,5 cucharadas rasas. Si prefieres un café más ligero, baja a 14 g; para más intensidad, sube a 17 g. La calculadora hace el cálculo automáticamente para cualquier tamaño de taza.",
    },
    {
      q: "¿Cuántas cucharadas de café por taza?",
      a: "Una taza de 250 ml a fuerza media requiere aproximadamente 2,5 cucharadas de café molido a grano medio. Una cucharada sopera rasa equivale a unos 6 g. Si mides con una cuchara de café (scoop), necesitarás alrededor de 1,25 scoops por taza.",
    },
    {
      q: "¿Qué relación café-agua recomienda la SCA?",
      a: "La Specialty Coffee Association (SCA) recomienda una relación de 55 g de café por litro de agua, o aproximadamente 1:18, para su estándar 'Golden Cup'. La mayoría de los aficionados en casa prefieren una relación de entre 1:15 y 1:16 para obtener un café más intenso y con más cuerpo.",
    },
  ],
},
```

Write the [LANG_CODE] version with `lang: "[LANG_CODE]"` and all strings in [LANGUAGE].

---

**Tool 2 of 5 — `french-press-ratio-calculator`**

*What this tool does:* Calculates how much coffee to use in a French press based on press size and strength preference. Output is in grams and tablespoons.

*Key numeric facts:*
- Standard ratio 1:15 (1 g coffee per 15 ml water)
- 350 ml press → 23 g / ~4 tablespoons coarse grind
- 8-cup press ≈ 1,000 ml → 67 g / ~11 tablespoons
- Steep time: 4 minutes; coarse grind required

Spanish (`es`) reference:
```ts
{
  lang: "es",
  slug: "french-press-ratio-calculator",
  metaTitle: "Calculadora de Prensa Francesa: Relación Café-Agua Perfecta",
  metaDescription:
    "Calcula exactamente cuánto café poner en tu prensa francesa según el tamaño y la intensidad. Resultado en gramos y cucharadas al instante.",
  h1: "Calculadora de Prensa Francesa: Relación Café-Agua Perfecta",
  excerpt:
    "Introduce el tamaño de tu prensa y la fuerza que prefieres para obtener la cantidad exacta de café molido en gramos y cucharadas. Ideal para prensas de 350 ml, 500 ml o 1 litro.",
  faqs: [
    {
      q: "¿Cuál es la relación café-agua ideal para la prensa francesa?",
      a: "La relación más utilizada para prensa francesa es 1:15 (1 g de café por cada 15 ml de agua). Para una prensa de 350 ml, eso equivale a unos 23 g de café, o aproximadamente 4 cucharadas rasas de molido grueso.",
    },
    {
      q: "¿Cuántas cucharadas de café para una prensa de 8 tazas?",
      a: "Una prensa de 8 tazas suele tener una capacidad de unos 1.000 ml. A relación 1:15, necesitas 67 g de café, equivalentes a unas 11 cucharadas soperas. Usa café de molienda gruesa para evitar residuos en la taza.",
    },
    {
      q: "¿Afecta el tamaño de molienda al sabor en la prensa francesa?",
      a: "Sí. La prensa francesa requiere molienda gruesa porque el café está en contacto con el agua durante 4 minutos. Una molienda muy fina sobreextrae el café y produce sabores amargos, además de dejar posos en el fondo de la taza. Una molienda gruesa, similar a la sal gruesa, es el punto de partida recomendado.",
    },
  ],
},
```

Write the [LANG_CODE] version.

---

**Tool 3 of 5 — `instant-coffee-calculator`**

*What this tool does:* Calculates how much instant coffee powder to use per cup. Includes brand presets for Nescafé, Café Bustelo, and generic instant.

*Key numeric facts:*
- Standard: 1–2 level teaspoons (2–4 g) per 240 ml cup
- Nescafé: 1 level teaspoon (~2 g) per 240 ml
- Instant coffee: 60–90 mg caffeine per cup vs 90–120 mg filter

Spanish (`es`) reference:
```ts
{
  lang: "es",
  slug: "instant-coffee-calculator",
  metaTitle: "Calculadora de Café Instantáneo: Cuánto Usar por Taza",
  metaDescription:
    "¿Cuántas cucharaditas de café instantáneo por taza? Incluye preajustes para Nescafé, Café Bustelo y café soluble estándar. Resultado inmediato.",
  h1: "Calculadora de Café Instantáneo: Cuánto Usar por Taza",
  excerpt:
    "Selecciona la marca de café instantáneo y el tamaño de taza para obtener la cantidad exacta en gramos y cucharaditas. Incluye preajustes para Nescafé, Café Bustelo y café soluble genérico.",
  faqs: [
    {
      q: "¿Cuánto café instantáneo se pone por taza?",
      a: "La medida estándar es 1–2 cucharaditas rasas (2–4 g) por taza de 240 ml. Nescafé recomienda 1 cucharadita rasa, mientras que marcas más intensas como Café Bustelo pueden requerir solo ½–1 cucharadita. La calculadora ajusta automáticamente según la marca y el tamaño de taza.",
    },
    {
      q: "¿Cuántas cucharaditas de Nescafé por taza?",
      a: "Nescafé recomienda 1 cucharadita rasa (aproximadamente 2 g) por taza de 240 ml con agua caliente. Si prefieres un café más intenso, usa 2 cucharaditas. Para un café más suave, prueba con ¾ de cucharadita.",
    },
    {
      q: "¿El café instantáneo tiene la misma cafeína que el café normal?",
      a: "El café instantáneo contiene entre 60 y 90 mg de cafeína por taza, comparado con los 90–120 mg del café de filtro o prensa francesa. Tiene algo menos de cafeína porque el proceso de fabricación reduce parte del contenido original, aunque sigue siendo una cantidad significativa.",
    },
  ],
},
```

Write the [LANG_CODE] version.

---

**Tool 4 of 5 — `coffee-beans-per-cup`**

*What this tool does:* Calculates how many whole coffee beans are needed per cup, expressed in grams, tablespoons, and estimated bean count.

*Key numeric facts:*
- 1 tablespoon whole beans = 60–70 beans / 8–9 g (more than ground coffee per tbsp because of air gaps)
- 250 ml cup at 1:16 → 15 g beans (weight unchanged by grinding)
- Dark roast beans are lighter/more porous; light roast are denser

Spanish (`es`) reference:
```ts
{
  lang: "es",
  slug: "coffee-beans-per-cup",
  metaTitle: "Granos de Café por Taza: Cuántos Necesitas en Gramos y Cucharadas",
  metaDescription:
    "¿Cuántos granos de café necesitas por taza? Introduce el tamaño de taza y el ratio de extracción para obtener el resultado en gramos, cucharadas y número de granos.",
  h1: "Granos de Café por Taza: Cuántos Necesitas en Gramos y Cucharadas",
  excerpt:
    "Descubre cuántos granos de café enteros necesitas para tu taza. Introduce el tamaño y la fuerza para obtener el resultado en gramos, cucharadas y una estimación del número de granos.",
  faqs: [
    {
      q: "¿Cuántos granos de café hay en una cucharada?",
      a: "Una cucharada sopera de granos de café enteros contiene entre 60 y 70 granos, según el tamaño y el tostado. En gramos, una cucharada de granos equivale a unos 8–9 g, algo más que la cucharada de café molido (6 g) porque los granos dejan más espacio de aire.",
    },
    {
      q: "¿Cuántos gramos de granos de café necesito por taza?",
      a: "Para una taza de 250 ml a relación 1:16 (fuerza media), necesitas aproximadamente 15 g de granos antes de molerlos. El peso de los granos no cambia al molerlos, así que 15 g de granos enteros producen 15 g de café molido.",
    },
    {
      q: "¿Puedo medir los granos de café con una cuchara en lugar de una balanza?",
      a: "Sí, aunque es menos preciso. La densidad varía según el tostado: los granos de tostado oscuro son más ligeros y porosos, mientras que los de tostado claro son más densos. Para mayor precisión, usa una báscula de cocina. La calculadora muestra tanto el peso en gramos como la equivalencia en cucharadas para facilitar la medición sin balanza.",
    },
  ],
},
```

Write the [LANG_CODE] version.

---

**Tool 5 of 5 — `coffee-measurement-converter`**

*What this tool does:* Converts coffee measurements instantly between grams, tablespoons, teaspoons, and scoops.

*Key numeric facts:*
- 1 tablespoon = ~6 g medium grind; espresso fine = 7–8 g/tbsp; coarse = 4–5 g/tbsp
- 1 scoop = 2 tablespoons = ~12 g
- 1 tablespoon = 3 teaspoons

Spanish (`es`) reference:
```ts
{
  lang: "es",
  slug: "coffee-measurement-converter",
  metaTitle: "Conversor de Medidas de Café: Gramos, Cucharadas, Cucharaditas y Scoops",
  metaDescription:
    "Convierte medidas de café al instante: gramos a cucharadas, cucharadas a gramos, scoops a gramos y más. Esencial para seguir cualquier receta.",
  h1: "Conversor de Medidas de Café: Gramos, Cucharadas, Cucharaditas y Scoops",
  excerpt:
    "Convierte entre gramos, cucharadas soperas, cucharaditas y scoops de café molido al instante. Ideal para adaptar recetas que usan diferentes unidades de medida.",
  faqs: [
    {
      q: "¿Cuántos gramos tiene una cucharada de café molido?",
      a: "Una cucharada sopera rasa de café molido a tamaño medio equivale a aproximadamente 6 g. Sin embargo, esta cifra varía ligeramente según la molienda: el café espresso fino puede pesar hasta 7–8 g por cucharada, mientras que una molienda gruesa puede dar solo 4–5 g.",
    },
    {
      q: "¿Cuánto es un scoop de café?",
      a: "Un scoop estándar de café equivale a 2 cucharadas soperas o aproximadamente 12 g de café molido a grano medio. Es la medida que suele incluir la mayoría de las cafeteras eléctricas con su cucharilla dosificadora.",
    },
    {
      q: "¿Cuántas cucharaditas son una cucharada de café?",
      a: "Una cucharada sopera equivale a 3 cucharaditas. En peso, una cucharada de café molido (6 g) corresponde a 3 cucharaditas de 2 g cada una. Si tu receta indica cucharaditas y solo tienes cucharas soperas, divide la cantidad entre 3.",
    },
  ],
},
```

Write the [LANG_CODE] version.

---

After writing all 5 variant objects, update `docs/build-plan-[LANG_CODE].md`: mark `2.1` and all 5 tool items under it as `[x]`.

Output:
```
✓ Milestone 2.1 done — [LANG_CODE] variants added for coffee-ratio-calculator, french-press-ratio-calculator, instant-coffee-calculator, coffee-beans-per-cup, coffee-measurement-converter
```

**Stop. Wait for "continue" before starting Milestone 2.2.**

---

### Milestone 2.2 — Add [LANG_CODE] variants for tools 6–10

**File:** `lib/i18nVariants.ts` — continue appending inside the `[LANG_UPPER] ([LANG_CODE])` section, immediately after the Tool 5 object and before the closing `]` of the `variants` array.

---

**Tool 6 of 10 — `pour-over-calculator`**

*What this tool does:* Calculates pour over and V60 ratios and generates step-by-step recipes. Includes James Hoffmann and Tetsu Kasuya method presets.

*Key numeric facts:*
- Standard ratio: 1:15–1:17
- Hoffmann preset: 1:16.67 = 30 g coffee per 500 ml water
- Bloom: pour 2× the coffee weight in water (e.g., 60 ml for 30 g), wait 30–45 seconds
- Kasuya 4:6 method: 40% of water controls sweetness/acidity, 60% controls strength

Spanish (`es`) reference:
```ts
{
  lang: "es",
  slug: "pour-over-calculator",
  metaTitle: "Calculadora de Pour Over y V60: Ratio y Receta Exacta",
  metaDescription:
    "Calcula el ratio pour over y obtén recetas paso a paso para V60, Chemex y Kalita Wave. Incluye preajustes de James Hoffmann y Tetsu Kasuya.",
  h1: "Calculadora de Pour Over y V60: Receta con Ratio Exacto",
  excerpt:
    "Obtén el ratio exacto y las instrucciones paso a paso para tu V60, Chemex o Kalita Wave. Incluye los métodos de James Hoffmann y Tetsu Kasuya, con control total de la dosis.",
  faqs: [
    {
      q: "¿Cuál es el ratio de café para el método pour over?",
      a: "El ratio más habitual para pour over y V60 es 1:15 a 1:17 (1 g de café por cada 15–17 ml de agua). James Hoffmann recomienda 1:16,67, equivalente a 30 g de café para 500 ml de agua. La calculadora adapta las cantidades a cualquier dosis que introduzcas.",
    },
    {
      q: "¿Cómo se hace el bloom o pre-infusión en el V60?",
      a: "El bloom consiste en verter el doble del peso del café en agua (por ejemplo, 60 ml para 30 g de café) y esperar 30–45 segundos. Este paso permite que el CO₂ atrapado en los granos escape, lo que mejora la extracción posterior. Los cafés muy frescos producen un bloom más activo y burbujeante.",
    },
    {
      q: "¿Cuál es la diferencia entre la receta de Hoffmann y la de Kasuya?",
      a: "James Hoffmann propone un método de 4 vertidos iguales después del bloom, manteniendo siempre agua en el cono. Tetsu Kasuya usa el método 4:6, dividiendo el agua en dos fases: el 40 % inicial controla el dulzor/acidez y el 60 % restante regula la intensidad. Ambas están disponibles como preajustes en la calculadora.",
    },
  ],
},
```

Write the [LANG_CODE] version.

---

**Tool 7 of 10 — `aeropress-recipe`**

*What this tool does:* Provides step-by-step AeroPress recipes for the standard method, inverted method, and James Hoffmann's method. Adjustable dose with exact timing.

*Key numeric facts:*
- Typical ratio: 1:12–1:16 (17–18 g per 200–220 ml)
- Hoffmann's method: 11 g per 200 ml (1:18)
- Water temperature: 80–90°C (Hoffmann uses 100°C for light roast)
- Extraction time: 1–2 minutes
- Inverted method: AeroPress placed upside-down to prevent early drip-through

Spanish (`es`) reference:
```ts
{
  lang: "es",
  slug: "aeropress-recipe",
  metaTitle: "Receta AeroPress: Método Estándar, Invertido y James Hoffmann",
  metaDescription:
    "Las mejores recetas de AeroPress en un solo lugar: método estándar, invertido y la receta de James Hoffmann. Incluye ratio, molienda, temperatura y tiempos.",
  h1: "Receta AeroPress: Método Estándar, Invertido y James Hoffmann",
  excerpt:
    "Encuentra la receta perfecta para tu AeroPress: método estándar, método invertido o la técnica de James Hoffmann. Ajusta la dosis y obtén instrucciones paso a paso con tiempos exactos.",
  faqs: [
    {
      q: "¿Cuál es el ratio de café para AeroPress?",
      a: "El ratio habitual para AeroPress es 1:12 a 1:16 (17–18 g de café para 200–220 ml de agua). El método de Hoffmann usa 11 g de café para 200 ml de agua (1:18), un ratio más ligero que produce un café muy limpio. La calculadora ajusta todos los parámetros según la dosis que elijas.",
    },
    {
      q: "¿Cuál es la diferencia entre el método estándar y el invertido en AeroPress?",
      a: "En el método estándar, el AeroPress se coloca directamente sobre la taza y el café gotea durante la preparación. En el método invertido, se coloca al revés (con el émbolo abajo) para que el café no gotee antes de tiempo, permitiendo una infusión completa durante el tiempo de reposo. El invertido da más control sobre el tiempo de extracción.",
    },
    {
      q: "¿A qué temperatura debe estar el agua para el AeroPress?",
      a: "La temperatura recomendada para AeroPress es de 80–90 °C. Hoffmann sugiere agua a 100 °C con tueste ligero y unos 85 °C con tuestes más oscuros. A diferencia de otros métodos, el AeroPress tolera bien un rango amplio de temperaturas gracias a su tiempo de extracción corto (1–2 minutos).",
    },
  ],
},
```

Write the [LANG_CODE] version.

---

**Tool 8 of 10 — `cold-brew-ratio-calculator`**

*What this tool does:* Calculates the coffee-to-water ratio for cold brew — either concentrate or ready-to-drink. Works for French press, mason jar, and dedicated cold brew makers.

*Key numeric facts:*
- Concentrate: 1:4–1:5 (mixed with milk or water before serving)
- Ready-to-drink: 1:8
- Steep time: 12–24 hours in the refrigerator (24 h max before bitterness)
- Grind: coarse (similar to or coarser than French press)

Spanish (`es`) reference:
```ts
{
  lang: "es",
  slug: "cold-brew-ratio-calculator",
  metaTitle: "Calculadora de Cold Brew: Ratio Café-Agua para Concentrado o Listo para Beber",
  metaDescription:
    "Calcula el ratio exacto para tu cold brew, ya sea concentrado (1:4) o listo para beber (1:8). Compatible con prensa francesa, tarro mason y cafeteras específicas.",
  h1: "Calculadora de Cold Brew: Ratio Café-Agua para Concentrado o Listo para Beber",
  excerpt:
    "Introduce la cantidad de café o de agua que quieres usar y obtén el ratio exacto para un cold brew concentrado (1:4–1:5) o listo para beber (1:8). Funciona con prensa francesa, tarro de cristal o cafetera de cold brew.",
  faqs: [
    {
      q: "¿Cuál es el ratio de café para el cold brew?",
      a: "Para cold brew concentrado (el que luego se mezcla con leche o agua), el ratio habitual es 1:4 a 1:5 (1 g de café por cada 4–5 ml de agua). Para cold brew listo para beber directamente, usa 1:8. La calculadora muestra las cantidades para ambas opciones.",
    },
    {
      q: "¿Cuánto tiempo se deja en reposo el cold brew?",
      a: "El cold brew se deja reposar entre 12 y 24 horas en el frigorífico. 12 horas produce un sabor más suave y afrutado; 18–24 horas, un concentrado más intenso y con más cuerpo. No dejes el café en maceración más de 24 horas porque puede volverse amargo.",
    },
    {
      q: "¿Qué tipo de molienda es mejor para el cold brew?",
      a: "Se recomienda molienda gruesa, similar o algo más gruesa que la que se usa para prensa francesa. Una molienda más fina aumenta la extracción, pero también hace que el filtrado sea más difícil y puede añadir amargura al concentrado. Con una prensa francesa, la molienda gruesa es especialmente importante para evitar residuos.",
    },
  ],
},
```

Write the [LANG_CODE] version.

---

**Tool 9 of 10 — `caffeine-calculator`**

*What this tool does:* Estimates caffeine content of a cup based on brew method, coffee dose, and roast level. Compares methods and shows daily limit.

*Key numeric facts:*
- Drip/filter 240 ml: 80–120 mg caffeine
- Double espresso (30 ml): 120–160 mg
- Cold brew concentrate (per serving): up to 200 mg
- Safe daily limit: 400 mg (EFSA/FDA); pregnant women: <200 mg

Spanish (`es`) reference:
```ts
{
  lang: "es",
  slug: "caffeine-calculator",
  metaTitle: "Calculadora de Cafeína: Cuánto hay en tu Taza de Café",
  metaDescription:
    "Estima el contenido de cafeína de tu taza según el método de preparación, la cantidad de café y el nivel de tueste. Compara espresso, filtro, cold brew e instantáneo.",
  h1: "Calculadora de Cafeína: Cuánto hay en tu Taza de Café",
  excerpt:
    "Descubre cuánta cafeína contiene tu café según el método de preparación (espresso, filtro, prensa francesa, cold brew), la cantidad de café y el tueste. Incluye comparativa y límite diario recomendado.",
  faqs: [
    {
      q: "¿Cuánta cafeína tiene una taza de café?",
      a: "Una taza de café de filtro de 240 ml contiene entre 80 y 120 mg de cafeína. Un espresso doble tiene entre 120 y 160 mg. El cold brew concentrado puede llegar a los 200 mg por porción. La calculadora estima la cafeína según el método, la dosis y el tueste que introduzcas.",
    },
    {
      q: "¿Qué método de preparación tiene más cafeína?",
      a: "El cold brew concentrado y el espresso tienen la mayor concentración de cafeína por mililitro, pero como el espresso se sirve en porciones pequeñas (30 ml), el total es similar al del café de filtro. Por volumen de bebida, el café filtro de goteo suele aportar más cafeína total por taza.",
    },
    {
      q: "¿Cuánta cafeína se puede tomar al día?",
      a: "La EFSA y la FDA consideran seguro un consumo de hasta 400 mg de cafeína al día para adultos sanos, equivalente a unas 3–4 tazas de café de filtro. Mujeres embarazadas deben limitar el consumo a menos de 200 mg diarios. La calculadora indica si tu consumo supera estos umbrales.",
    },
  ],
},
```

Write the [LANG_CODE] version.

---

**Tool 10 of 10 — `espresso-ratio-calculator`**

*What this tool does:* Calculates espresso dose-to-yield ratios for espresso (1:2), ristretto (1:1), lungo (1:3), and custom ratios.

*Key numeric facts:*
- Espresso: 1:2 — 18 g dose → 36 g yield in 25–30 seconds
- Ristretto: 1:1 — more concentrated, sweeter, less bitter
- Lungo: 1:3 — longer, more bitter, more diluted
- If bitter → lower ratio or coarser grind; if sour/weak → increase extraction

Spanish (`es`) reference:
```ts
{
  lang: "es",
  slug: "espresso-ratio-calculator",
  metaTitle: "Calculadora de Ratio de Espresso: Dosis, Rendimiento y Recetas",
  metaDescription:
    "Calcula el ratio de espresso para espresso (1:2), ristretto (1:1), lungo (1:3) y ratios personalizados. Introduce la dosis y obtén el rendimiento objetivo en gramos.",
  h1: "Calculadora de Ratio de Espresso: Dosis, Rendimiento y Recetas",
  excerpt:
    "Introduce la dosis de café en el portafiltro y obtén el peso objetivo de extracción para espresso (1:2), ristretto (1:1), lungo (1:3) o cualquier ratio personalizado.",
  faqs: [
    {
      q: "¿Cuál es el ratio ideal para un espresso?",
      a: "El ratio estándar para un espresso es 1:2 (1 g de café por 2 g de agua extraída). Para una dosis de 18 g, el objetivo es extraer 36 g de espresso en 25–30 segundos. El ristretto usa 1:1 para un sabor más concentrado, y el lungo 1:3 para algo más largo y menos intenso.",
    },
    {
      q: "¿Qué diferencia hay entre ristretto y lungo?",
      a: "El ristretto (ratio 1:1) se extrae con menos agua, produciendo un sabor más concentrado, dulce y con menos amargor. El lungo (ratio 1:3) usa más agua y es más largo, con más amargor y un sabor más diluido. Para la misma dosis de 18 g, un ristretto daría 18 g de extracción y un lungo 54 g.",
    },
    {
      q: "¿Cómo afecta el ratio al sabor del espresso?",
      a: "Un ratio más bajo (más café, menos agua) produce un espresso más concentrado y viscoso. Un ratio más alto (menos café, más agua) produce un café más largo y con menos cuerpo. Si tu espresso sabe amargo, prueba a reducir el ratio; si sabe ácido o débil, aumenta la extracción.",
    },
  ],
},
```

Write the [LANG_CODE] version. This is the final variant object in the [LANG_UPPER] section. Make sure there is no trailing comma after it if it is the last item before `]`.

---

After writing all 5 variant objects, update `docs/build-plan-[LANG_CODE].md`: mark `2.2` and all 5 tool items under it as `[x]`.

Output:
```
✓ Milestone 2.2 done — [LANG_CODE] variants added for pour-over-calculator, aeropress-recipe, cold-brew-ratio-calculator, caffeine-calculator, espresso-ratio-calculator
```

Then output:
```
✓ Phase 2 done — all 10 [LANG_CODE] i18n variant entries written to lib/i18nVariants.ts
```
**Stop. Wait for "continue" before starting Phase 3.**

---

## Phase 3 — Content files scope audit

This phase confirms what does and does not need translating. No files are created or modified.

---

### Milestone 3.1 — Blog posts: English-only by design

The 10 blog posts in `content/blog/` are English-only `.tsx` components. They are referenced by `lib/blog.ts` which exports `allPosts`. There is no locale-routing layer for blog posts — `app/blog/[slug]/page.tsx` has no `lang` parameter and no hreflang alternates for translated versions.

**No action needed for a standard language addition.** Blog posts stay in English.

If translated blog posts are desired in the future, the work required would be:
1. Create `content/blog/[LANG_CODE]/` with translated `.tsx` files
2. Create `app/[LANG_CODE]/blog/[slug]/page.tsx` as a new route segment
3. Add a translated `allPosts` array for the new language in a separate blog data file

This is a significant architectural addition and is out of scope for a language variant addition.

Update `docs/build-plan-[LANG_CODE].md`: mark `3.1` as `[x]`.

Output: `✓ Milestone 3.1 done — blog posts confirmed English-only, no action needed`

---

### Milestone 3.2 — Serving variants: English-only by design

The serving variant pages (`/coffee-ratio/for-1-cup`, `/coffee-ratio/for-4-cups`, etc.) are driven by `lib/servingVariants.ts`. They have no locale-routing and no `lang` parameter. These pages and their content stay in English.

**No action needed for a standard language addition.**

Update `docs/build-plan-[LANG_CODE].md`: mark `3.2` as `[x]`.

Output: `✓ Milestone 3.2 done — serving variants confirmed English-only, no action needed`

---

After completing Milestones 3.1 and 3.2, output:
```
✓ Phase 3 done — blog posts and serving variants are intentionally English-only; no content files need translating for this language addition
```
**Stop. Wait for "continue" before starting Phase 4.**

---

## Phase 4 — Wire up and fix hardcoded-English gaps

Phase 4 verifies that the route auto-discovery works correctly and fixes two hardcoded English strings that are visible to users on the localised pages.

---

### Milestone 4.1 — Verify `generateStaticParams` auto-includes the new lang

**File:** `app/[lang]/[slug]/page.tsx`, line 20.

No code change is needed here. The `generateStaticParams` function calls `getAllI18nParams()`, which reads directly from the `variants` array in `lib/i18nVariants.ts`. Now that you have added 10 new variant objects with `lang: "[LANG_CODE]"`, the new language's pages are automatically included in the static build.

Confirm this is correct by reading `lib/i18nVariants.ts` and checking:
- The `variants` array contains exactly 10 objects with `lang: "[LANG_CODE]"`
- Each of the 10 `topToolSlugs` is represented

The slugs that must have a `[LANG_CODE]` variant (all 10, in order):
1. `coffee-ratio-calculator`
2. `french-press-ratio-calculator`
3. `instant-coffee-calculator`
4. `coffee-beans-per-cup`
5. `coffee-measurement-converter`
6. `pour-over-calculator`
7. `aeropress-recipe`
8. `cold-brew-ratio-calculator`
9. `caffeine-calculator`
10. `espresso-ratio-calculator`

If any are missing, add them now before proceeding.

Update `docs/build-plan-[LANG_CODE].md`: mark `4.1` as `[x]`.

Output: `✓ Milestone 4.1 done — verified all 10 [LANG_CODE] variant slugs present in lib/i18nVariants.ts`

---

### Milestone 4.2 — Fix "English version" back-link label

**File:** `app/[lang]/[slug]/page.tsx`, line 113 (the back-link at the bottom of the page).

**Hardcoded-English gap:** The back-link label "English version" is hardcoded in English regardless of the page locale. Users reading the page in [LANGUAGE] will see an English label on this UI element.

Current:
```tsx
<Link
  href={`/${slug}`}
  className="inline-flex items-center gap-1.5 ..."
>
  <svg ...>
    <path d="m15 18-6-6 6-6" />
  </svg>
  English version
</Link>
```

Add a `backLinkLabels` record near the top of the file (alongside `langLabels`):
```tsx
const backLinkLabels: Record<string, string> = {
  es: "Versión en inglés",
  pt: "Versão em inglês",
  fr: "Version anglaise",
  "[LANG_CODE]": "[BACK LINK LABEL IN [LANGUAGE]]",
}
```

Replace `[BACK LINK LABEL IN [LANGUAGE]]` with the natural [LANGUAGE] phrase for "English version" — for example: German → `"Englische Version"`, Italian → `"Versione in inglese"`, Japanese → `"英語版"`.

Then update the link to use it:
```tsx
  {backLinkLabels[lang] ?? "English version"}
```

Update `docs/build-plan-[LANG_CODE].md`: mark `4.2` as `[x]`.

Output: `✓ Milestone 4.2 done — "English version" back-link now locale-aware`

---

### Milestone 4.3 — Fix ShareBar label strings

**File:** `components/ShareBar.tsx`.

**Hardcoded-English gap:** The ShareBar component has four hardcoded English UI strings visible to users on every locale page: the "Share" button label, the "Share via" modal heading, the "Copy link" button, and the "Copied!" confirmation. The component currently takes no locale-related prop.

Add a `labels` prop to the `ShareBarProps` interface:

```tsx
interface ShareBarProps {
  title: string
  url: string
  labels?: {
    share?: string
    shareVia?: string
    copyLink?: string
    copied?: string
  }
}
```

Update the component to use these labels with English fallbacks:
```tsx
export function ShareBar({ title, url, labels }: ShareBarProps) {
  // ... existing state/logic ...
  const shareLabel   = labels?.share    ?? "Share"
  const shareViaLabel = labels?.shareVia ?? "Share via"
  const copyLabel    = labels?.copyLink ?? "Copy link"
  const copiedLabel  = labels?.copied  ?? "Copied!"

  return (
    <div className="relative my-4">
      <button onClick={handleShare} className="...">
        <Share2 className="h-4 w-4" />
        {shareLabel}
      </button>

      {open && (
        <div className="...">
          <div className="mb-2 flex items-center justify-between">
            <span className="...">{shareViaLabel}</span>
            ...
          </div>
          ...
          <button onClick={copyLink} className="...">
            {copied ? <Check .../> : <Copy .../>}
            {copied ? copiedLabel : copyLabel}
          </button>
        </div>
      )}
    </div>
  )
}
```

Then update the `<ShareBar>` call in `app/[lang]/[slug]/page.tsx` to pass translated labels. Add a `shareLabels` lookup near `langLabels`:

```tsx
const shareLabels: Record<string, { share: string; shareVia: string; copyLink: string; copied: string }> = {
  es: { share: "Compartir", shareVia: "Compartir vía", copyLink: "Copiar enlace", copied: "¡Copiado!" },
  pt: { share: "Compartilhar", shareVia: "Compartilhar via", copyLink: "Copiar link", copied: "Copiado!" },
  fr: { share: "Partager", shareVia: "Partager via", copyLink: "Copier le lien", copied: "Copié !" },
  "[LANG_CODE]": {
    share: "[SHARE LABEL]",
    shareVia: "[SHARE VIA LABEL]",
    copyLink: "[COPY LINK LABEL]",
    copied: "[COPIED LABEL]",
  },
}
```

Replace the four `[...]` placeholders with natural [LANGUAGE] equivalents. Then update the JSX:

```tsx
<ShareBar
  title={`${variant.h1} – Coffee Brew Lab`}
  url={`${appUrl}/${lang}/${slug}`}
  labels={shareLabels[lang]}
/>
```

Update `docs/build-plan-[LANG_CODE].md`: mark `4.3` as `[x]`.

Output: `✓ Milestone 4.3 done — ShareBar label prop added and [LANG_CODE] labels written`

---

After completing Milestones 4.1 through 4.3, output:
```
✓ Phase 4 done — route auto-discovery verified; "English version" link and ShareBar labels are now locale-aware for [LANG_CODE]
```
**Stop. Wait for "continue" before starting Phase 5.**

---

## Phase 5 — Sitemap and hreflang

Phase 5 confirms the site's SEO infrastructure handles the new language correctly. No code changes are required unless a gap is found.

---

### Milestone 5.1 — Confirm new lang pages appear in sitemap

**File:** `app/sitemap.ts`.

No changes needed. The sitemap builds `langPages` using `getAllI18nParams()`, which now includes all 10 `[LANG_CODE]` variants. Each will appear as a URL in the form `https://brewlab.coffee/[LANG_CODE]/{slug}` with priority `0.6`.

Confirm by reading `app/sitemap.ts` and tracing the `langPages` block. Verify that:
- `getAllI18nParams()` is imported from `lib/i18nVariants`
- The `langPages` block maps each param to a URL `${appUrl}/${lang}/${slug}`
- No hardcoded locale list exists in `sitemap.ts` that would need updating

Update `docs/build-plan-[LANG_CODE].md`: mark `5.1` as `[x]`.

Output: `✓ Milestone 5.1 done — sitemap auto-includes [LANG_CODE] pages via getAllI18nParams()`

---

### Milestone 5.2 — Review hreflang coverage in `generateMetadata`

**File:** `app/[lang]/[slug]/page.tsx`, lines 31–46.

**Known gap (pre-existing, not introduced by this language addition):** The `generateMetadata` function sets hreflang alternates only for `en` and the current locale:

```tsx
alternates: {
  canonical: thisUrl,
  languages: { en: enUrl, [lang]: thisUrl },
},
```

This means a Spanish page (`/es/coffee-ratio-calculator`) does not declare an hreflang link to the Portuguese page (`/pt/coffee-ratio-calculator`) or the French page (`/fr/coffee-ratio-calculator`). Adding [LANG_CODE] does not make this worse, but it also does not get a cross-reference to other locales.

**Optional improvement:** To fully declare all locale alternates, update `generateMetadata` to build the `languages` object from all existing lang variants for the given slug:

```tsx
import { supportedLangs, getI18nVariant } from "@/lib/i18nVariants"

// Inside generateMetadata:
const allLanguages: Record<string, string> = { en: enUrl }
for (const l of supportedLangs) {
  if (getI18nVariant(l, slug)) {
    allLanguages[l] = `${appUrl}/${l}/${slug}`
  }
}

return {
  ...
  alternates: {
    canonical: thisUrl,
    languages: allLanguages,
  },
}
```

This is recommended but optional. If you apply it, all locale pages for the same slug will cross-reference each other in hreflang, which is the correct SEO pattern.

Update `docs/build-plan-[LANG_CODE].md`: mark `5.2` as `[x]`.

Output: `✓ Milestone 5.2 done — hreflang reviewed; [note whether optional improvement was applied]`

---

After completing Milestones 5.1 and 5.2, output:
```
✓ Phase 5 done — sitemap auto-includes [LANG_CODE]; hreflang reviewed and [applied / noted as optional]
```
**Stop. Wait for "continue" before starting Phase 6.**

---

## Phase 6 — TypeScript compile and manual verification

Phase 6 confirms the implementation is type-safe and visually correct in the browser.

---

### Milestone 6.1 — Run TypeScript compile

Run:
```bash
npx tsc --noEmit
```

Expected result: zero errors. If errors appear, address them before continuing.

The most likely error is a missing or malformed `I18nVariant` object — check that all 10 [LANG_CODE] variants in `lib/i18nVariants.ts` have the correct shape:
- `lang` is a string literal matching a value in `supportedLangs`
- `slug` is a string literal matching a value in `topToolSlugs`
- `faqs` is an array of exactly 3 `{ q: string, a: string }` objects

Update `docs/build-plan-[LANG_CODE].md`: mark `6.1` as `[x]`.

Output: `✓ Milestone 6.1 done — npx tsc --noEmit passed with zero errors`

---

### Milestone 6.2 — Manual verification checklist

Run `npm run dev` and open the browser. Check each item in the list below. Tick each one as you confirm it.

**Page existence and routing**
- [ ] `http://localhost:3000/[LANG_CODE]/coffee-ratio-calculator` loads (200, not 404)
- [ ] `http://localhost:3000/[LANG_CODE]/espresso-ratio-calculator` loads (confirm first and last)
- [ ] Navigating to a non-existent slug (e.g., `/[LANG_CODE]/french-press-timer`) returns 404

**Content correctness**
- [ ] The language pill badge at the top of the page shows `[NATIVE_NAME]` (not the lang code)
- [ ] The H1 is in [LANGUAGE], not in English or Spanish
- [ ] The excerpt below the H1 is in [LANGUAGE]
- [ ] The FAQ section heading is in [LANGUAGE] (the value you set in Milestone 1.3)
- [ ] All three FAQ questions and answers are in [LANGUAGE]
- [ ] The strings read naturally — not like a word-for-word translation

**UI chrome**
- [ ] The "English version" / back-link at the bottom is in [LANGUAGE] (Milestone 4.2)
- [ ] The ShareBar "Share" button label is in [LANGUAGE] (Milestone 4.3)
- [ ] Clicking "Share" opens the modal with [LANGUAGE] labels ("Share via", "Copy link")

**Tool functionality**
- [ ] The embedded tool (e.g., CoffeeRatioCalculator) renders and works correctly
- [ ] Note: tool UI is intentionally in English — this is by design; only the page wrapper (H1, excerpt, FAQs) is localised

**Known English-only components (no action required — documented limitations)**
- "Related Tools" heading in `components/tools/RelatedTools.tsx` (line 13) is hardcoded English; the tool short-titles and descriptions it renders are also English-only (`lib/tools.ts` is not localised). These appear at the bottom of every locale page. To fix in the future: add a `heading` prop to `RelatedTools` and pass a localised string from the locale page.
- "Home" breadcrumb label in `components/layout/Breadcrumb.tsx` (line 13) is hardcoded as `{ label: "Home", href: "/" }` for every page. To fix in the future: pass the translated label as a prop from the page layer.

**SEO**
- [ ] View page source: `<title>` contains the [LANGUAGE] `metaTitle` string
- [ ] View page source: `<meta name="description">` contains the [LANGUAGE] `metaDescription` string
- [ ] View page source: `<link rel="alternate" hreflang="[LANG_CODE]">` is present
- [ ] View page source: `<link rel="alternate" hreflang="en">` is present

**Sitemap**
- [ ] `http://localhost:3000/sitemap.xml` includes URLs for `[LANG_CODE]/coffee-ratio-calculator` (and the other 9 tools)

Update `docs/build-plan-[LANG_CODE].md`: mark all passing items as `[x]` under `6.2`.

Output: `✓ Milestone 6.2 done — manual verification complete; [LANG_CODE] language addition is live`

---

After completing all Phase 6 milestones, mark the build plan fully complete and output:
```
✓ Phase 6 done — TypeScript clean, manual checks passed; [LANGUAGE] ([LANG_CODE]) is fully integrated
```

The language addition is complete. Commit and push.

---

## Complete translation key list

Every string that must exist in a [LANG_CODE] variant object. 10 tools × 10 fields = 100 translation keys.

| # | Tool slug | Field |
|---|-----------|-------|
| 1 | coffee-ratio-calculator | metaTitle |
| 2 | coffee-ratio-calculator | metaDescription |
| 3 | coffee-ratio-calculator | h1 |
| 4 | coffee-ratio-calculator | excerpt |
| 5 | coffee-ratio-calculator | faqs[0].q |
| 6 | coffee-ratio-calculator | faqs[0].a |
| 7 | coffee-ratio-calculator | faqs[1].q |
| 8 | coffee-ratio-calculator | faqs[1].a |
| 9 | coffee-ratio-calculator | faqs[2].q |
| 10 | coffee-ratio-calculator | faqs[2].a |
| 11 | french-press-ratio-calculator | metaTitle |
| 12 | french-press-ratio-calculator | metaDescription |
| 13 | french-press-ratio-calculator | h1 |
| 14 | french-press-ratio-calculator | excerpt |
| 15–20 | french-press-ratio-calculator | faqs[0–2].q and .a |
| 21 | instant-coffee-calculator | metaTitle |
| 22 | instant-coffee-calculator | metaDescription |
| 23 | instant-coffee-calculator | h1 |
| 24 | instant-coffee-calculator | excerpt |
| 25–30 | instant-coffee-calculator | faqs[0–2].q and .a |
| 31 | coffee-beans-per-cup | metaTitle |
| 32 | coffee-beans-per-cup | metaDescription |
| 33 | coffee-beans-per-cup | h1 |
| 34 | coffee-beans-per-cup | excerpt |
| 35–40 | coffee-beans-per-cup | faqs[0–2].q and .a |
| 41 | coffee-measurement-converter | metaTitle |
| 42 | coffee-measurement-converter | metaDescription |
| 43 | coffee-measurement-converter | h1 |
| 44 | coffee-measurement-converter | excerpt |
| 45–50 | coffee-measurement-converter | faqs[0–2].q and .a |
| 51 | pour-over-calculator | metaTitle |
| 52 | pour-over-calculator | metaDescription |
| 53 | pour-over-calculator | h1 |
| 54 | pour-over-calculator | excerpt |
| 55–60 | pour-over-calculator | faqs[0–2].q and .a |
| 61 | aeropress-recipe | metaTitle |
| 62 | aeropress-recipe | metaDescription |
| 63 | aeropress-recipe | h1 |
| 64 | aeropress-recipe | excerpt |
| 65–70 | aeropress-recipe | faqs[0–2].q and .a |
| 71 | cold-brew-ratio-calculator | metaTitle |
| 72 | cold-brew-ratio-calculator | metaDescription |
| 73 | cold-brew-ratio-calculator | h1 |
| 74 | cold-brew-ratio-calculator | excerpt |
| 75–80 | cold-brew-ratio-calculator | faqs[0–2].q and .a |
| 81 | caffeine-calculator | metaTitle |
| 82 | caffeine-calculator | metaDescription |
| 83 | caffeine-calculator | h1 |
| 84 | caffeine-calculator | excerpt |
| 85–90 | caffeine-calculator | faqs[0–2].q and .a |
| 91 | espresso-ratio-calculator | metaTitle |
| 92 | espresso-ratio-calculator | metaDescription |
| 93 | espresso-ratio-calculator | h1 |
| 94 | espresso-ratio-calculator | excerpt |
| 95–100 | espresso-ratio-calculator | faqs[0–2].q and .a |

Plus 7 additional strings outside the variants file:
- `langLabels["[LANG_CODE]"]` — native language name displayed as pill badge
- FAQ section heading — "Frequently asked questions" in [LANGUAGE]
- `backLinkLabels["[LANG_CODE]"]` — "English version" back-link label
- `shareLabels["[LANG_CODE]"].share` — "Share" button label
- `shareLabels["[LANG_CODE]"].shareVia` — "Share via" modal heading
- `shareLabels["[LANG_CODE]"].copyLink` — "Copy link" button label
- `shareLabels["[LANG_CODE]"].copied` — "Copied!" confirmation label

**Total: 107 string values to provide for a complete language addition.**

---

## Config — fill in here, nowhere else

Use these values throughout the guide wherever you see a symbolic placeholder. Do not fill in values anywhere else in the document.

```
LANG_CODE    = xx
LANGUAGE     = Language Name In English
NATIVE_NAME  = Name as native speakers write it (e.g. Português, Français, Deutsch)
LANG_UPPER   = XX
```
