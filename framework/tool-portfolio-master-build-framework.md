# Master Build Framework — Free Web Tool Portfolio

*Synthesised from: ChatGPT ideation transcript, Home Hub SEO strategy, Talent Atrium SEO strategy, and Free Web Tool Clusters research report. This document is the universal handoff for any agent building any site in the portfolio.*

---

## 0. Infrastructure Setup (Start Here Every Time)

**Assume nothing exists.** Before writing a single line of code, the agent must confirm each item below with the user. Do not skip this step even if the user says "it's fine" — walk through it methodically so nothing is missed.

Also collect the design brief (see Section 3.5 — Design Brief Collection) before writing any code. Design decisions affect file names, folder structure, and component choices — settling them upfront avoids rework later.

### 0.1 Account Checklist

Ask the user to confirm they have each of the following. If any are missing, pause and assist them in creating it before proceeding.

| # | Account | Purpose | Free? |
|---|---------|---------|-------|
| 1 | GitHub account | Code repository and version control | Yes |
| 2 | Vercel account | Hosting, deployment, analytics | Yes (Hobby tier) |
| 3 | Google account | Used for GA4, Search Console, AdSense | Yes |
| 4 | Google Analytics 4 property | Page view and event tracking | Yes |
| 5 | Google Search Console property | Index monitoring and sitemap submission | Yes |
| 6 | AdSense account | Display ad revenue | Yes (apply after launch) |
| 7 | Domain registrar account | Custom domain (Namecheap, GoDaddy, etc.) | Paid (~R200/year) |

Note: AdSense and the custom domain are NOT needed on day one. Get the site live on the Vercel subdomain first, earn some traffic, then add both.

### 0.2 Local Environment Checklist

Confirm the following are installed on the user's machine:

- **Node.js 20 LTS** — download from nodejs.org if not installed. Verify: `node -v`
- **npm** — comes bundled with Node.js. Verify: `npm -v`
- **GitHub Desktop** — for pushing commits to GitHub. User already has this.
- **Code editor** — VS Code recommended. Download from code.visualstudio.com if needed.
- **Git** — comes bundled with GitHub Desktop, so this is already present.

### 0.3 Create the Project Locally

Run the following command in the terminal, replacing `[site-folder-name]` with the site's numbered folder name (e.g. `01-qr-barcode-toolkit`):

```bash
npx create-next-app@latest [site-folder-name] --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

When prompted:
- Would you like to use ESLint? → **Yes**
- Would you like to use Turbopack? → **Yes**

Open the project in VS Code: `code [site-folder-name]`

### 0.4 Create the GitHub Repository

Use GitHub Desktop — do NOT create the repo manually on GitHub.com first.

1. Open GitHub Desktop
2. Go to **File → Add Local Repository**
3. Point it to the project folder you just created
4. Click **"create a repository"** when GitHub Desktop asks
5. Name: use the same folder name (e.g. `01-qr-barcode-toolkit`)
6. Visibility: **Public** (required for Vercel free tier — private repos need a paid Vercel plan)
7. Click **Create Repository**
8. Click **Publish Repository** to push it to GitHub

### 0.5 Connect to Vercel

Do this as early as possible in the project — ideally on day one, immediately after the GitHub repo is published. A live Vercel URL is far easier to work with than localhost: you can test on any device, share progress, and see real production builds with every push. Do not wait until the site is "ready" to connect Vercel.

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **Add New → Project**
3. Click **Import** next to the repo you just published
4. Framework Preset will auto-detect as **Next.js** — leave all defaults
5. Click **Deploy**
6. Vercel will build and deploy. The site will go live at a URL like `[project-name].vercel.app`
7. Every future push to the `main` branch on GitHub will auto-deploy to Vercel

### 0.6 Add the Environment Variable

In Vercel, once the project is created:
1. Go to **Project → Settings → Environment Variables**
2. Add: `NEXT_PUBLIC_APP_URL` = `https://[project-name].vercel.app`
3. Set it for **Production**, **Preview**, and **Development**
4. Redeploy once for the variable to take effect

In the local project, create a `.env.local` file:
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Add `.env.local` to `.gitignore` (it is already there by default in Next.js).

### 0.7 Push vs Pull — The Simple Rule

For solo development on one machine, the flow is always:
1. Build or change something locally
2. In GitHub Desktop: review changed files, write a short commit message, click **Commit to main**
3. Click **Push origin** to send it to GitHub
4. Vercel automatically deploys the push within ~1 minute

**Pull** is only needed if you've made changes on another machine or directly on GitHub.com (rare). Default assumption: **always Push, almost never Pull.**

### 0.8 Custom Domain (Do This Last)

Do not set up the custom domain until the site is fully built, live on the Vercel subdomain, and AdSense is approved.

When ready:
1. Buy the domain from your registrar
2. In Vercel: **Project → Settings → Domains → Add**
3. Enter the domain (e.g. `qrtoolkit.com`)
4. Vercel will show you DNS records to add — copy them into your registrar's DNS settings
5. Update `NEXT_PUBLIC_APP_URL` in Vercel environment variables to the new domain
6. Propagation takes 5 minutes to 24 hours

---

## 1. Portfolio Strategy

### The Model
- **Goal:** 20 focused tool sites × 25 tools each = 500 tools total
- **Traffic target:** 500,000 monthly page views across the portfolio
- **Per-tool average:** 1,000 monthly page views after maturation (3–6 months)
- **Per-site target:** 25,000 monthly page views after maturation
- **Revenue assumption:** $3 RPM (conservative) → ~R25,000/month at portfolio scale
- **Cost model:** Each tool site costs approximately R20/month to host; needs R40+/month to break even
- **Timeline:** Month 1 = ~200 views, Month 2 = ~500 views, Month 3+ = 1,000+

### The Gauntlet (Idea Qualification)
Every tool idea must pass as many of these as possible before building:
1. Free tool, no login required
2. One-dimensional — immediately obvious what it does
3. Browser-side or deterministic logic preferred
4. API calls allowed only if ad revenue per session exceeds API cost per session
5. Commercial search intent or commercial adjacency must exist
6. Proven search demand (real queries, real competitors)
7. Beatable competition (weak, slow, thin, outdated, or poorly localised competitors)
8. Natural cluster of 20–25 related tools on one domain
9. Low maintenance (no manual content updates after launch)
10. Easy to explain in under 10 seconds (e.g. via YouTube Shorts)
11. Does not require regulated advice (legal, medical, financial)
12. Can support multiple language versions
13. Can support programmatic SEO pages (variants, use-cases, languages)
14. Internal-link opportunity to at least 3–5 related tools on the same site

### What to Avoid
- Calculator-heavy clusters
- Generic AI writing tools
- Tools requiring user accounts
- Expensive API usage without clear revenue offset
- YMYL (Your Money Your Life) regulated advice
- Tools dominated by Adobe, Google, Microsoft incumbents with no long-tail angle
- Thin duplicate pages without genuinely distinct utility

---

## 2. Technology Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | Next.js 15 (App Router) | Static generation, `generateStaticParams`, `generateMetadata` |
| Language | TypeScript | Strict mode |
| Styling | Tailwind CSS | Utility-first, mobile-first |
| Hosting | Vercel | Zero config, edge CDN, Analytics built-in |
| Database | None (for most tools) | Browser-side only. If data needed: Vercel Postgres or KV |
| Analytics | Google Analytics 4 + Vercel Analytics + Vercel Speed Insights | All three from day one |
| Ads | Google AdSense (primary), Adsterra (fallback) | See Section 7 |

---

## 3. Site Architecture

### URL Structure
```
/                           Homepage (tool hub index)
/tools                      All tools listing (optional, can be homepage)
/[tool-slug]                Individual tool page (core URL)
/[tool-slug]/[variant]      Tool variant pages (language, use-case, device, format)
/blog                       Blog index
/blog/[slug]                Blog post (targets informational queries around tool use cases)
/about                      About page (required for AdSense)
/privacy                    Privacy Policy (required for AdSense)
/terms                      Terms of Service
/contact                    Contact page (required for AdSense)
/sitemap.xml                Auto-generated
/robots.txt                 Auto-generated
```

### Page Types
1. **Tool page** — the core utility, fully functional in-browser
2. **Tool variant page** — same tool, different context (language, device, use-case)
3. **Category hub** — groups related tools with internal links
4. **Blog post** — targets informational queries, links to tool pages
5. **Static legal/about pages** — required for ad approval

---

## 3.5. Visual Design & Identity

### Design Brief Collection (Do This Before Writing Any Code)

Before building anything, the agent must ask the user to provide design direction. Do not guess or apply a default palette — ask explicitly. Collect the following before opening VS Code:

1. **Style references** — ask for URLs of sites the user likes the look of. Even one or two references narrow the design direction dramatically.
2. **Color preference** — ask if the user has a preferred color direction or any colors to avoid. If unsure, refer to the per-site mood table later in this section.
3. **Font preference** — ask if the user has a font in mind, or confirm which from the recommended list the user prefers.
4. **Existing assets** — ask if the user has a logo, icon, or any existing brand assets, and where they are saved.

Once the design direction is agreed, generate the required visual assets using the ChatGPT prompts in the AI Image Generation Prompts subsection below. Save each generated asset to the following paths inside the project — these paths are already referenced in the metadata and layout templates, so do not rename them or save them elsewhere:

| Asset | Filename | Save path |
|-------|----------|-----------|
| Favicon (ICO) | `favicon.ico` | `public/favicon.ico` |
| Favicon 16×16 | `favicon-16x16.png` | `public/favicon-16x16.png` |
| Favicon 32×32 | `favicon-32x32.png` | `public/favicon-32x32.png` |
| Apple touch icon | `apple-touch-icon.png` | `public/apple-touch-icon.png` |
| Site-wide OG image | `og-image.png` | `public/og-image.png` |
| Hero illustration (if used) | `hero.png` | `public/images/hero.png` |

---

### The Problem to Solve

The majority of utility tool sites launched between 2023–2025 look identical. They share the same default Tailwind blue, the same Inter font at base weight, the same `rounded-lg border border-gray-200 bg-white p-6 shadow-sm` card pattern, and the same purple-to-blue gradient hero with floating blurred blobs. Visitors recognize this pattern immediately — consciously or not — and it signals "cheap AI-built template." It erodes trust before the tool even loads.

**The goal:** each site in this portfolio must have a specific visual personality that feels intentional, distinctive, and matching its subject matter. A password security tool should feel serious and precise. A print paper generator should feel warm and tactile. A randomiser should feel playful and energetic.

---

### The Five Generic Tells to Avoid

Never allow any of these in any site build:

1. **The Default Blue** — Tailwind `blue-500` (#3B82F6) as the primary brand color. Thousands of AI-built sites use this exact shade. Choose something offset: a teal, an amber, a slate, a rose, or any deliberate non-default hue.
2. **The Blob Hero** — A gradient background from purple to blue with large blurred CSS `rounded-full` orbs. This pattern became so saturated by 2024 it now signals "AI template" instantly. Do not use it.
3. **The Identical Card** — `rounded-lg border border-gray-200 bg-white p-6 shadow-sm` on every tool card with a small blue icon and a heading. Acceptable as a base, but must be customised: different corner radius approach, a stronger border color, a background tint, or a hover state with visual personality.
4. **The Lifeless Footer** — Four gray text columns on a white background with no identity. The footer should carry the brand: a deeper background color, the logo, a tagline, real personality.
5. **Font Flatness** — Inter at base weight everywhere with no typographic contrast. Headings must have genuine visual weight: either a heavier weight, a different optical size, or a distinct font entirely.

---

### Design System Fundamentals

Every site must define and use a consistent design system. Build this into `tailwind.config.ts` before writing any components.

**Color System Structure:**
```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      brand: {
        50:  '[lightest tint]',
        100: '[light tint]',
        200: '[tint]',
        300: '[mid tint]',
        400: '[light]',
        500: '[base — primary brand color]',
        600: '[dark — hover states]',
        700: '[darker]',
        800: '[very dark]',
        900: '[darkest — backgrounds on dark sites]',
        950: '[near black with hue]',
      },
    },
    fontFamily: {
      sans: ['[Chosen Font]', ...defaultTheme.fontFamily.sans],
      mono: ['[Mono Font]', ...defaultTheme.fontFamily.mono],
    },
  }
}
```

**Typography Scale:** Use at least four distinct visual weights/sizes:
- Display heading (hero H1): very large, heavy weight, tight tracking (`tracking-tight font-extrabold`)
- Section heading (H2): large, bold
- Card heading (H3): medium, semibold
- Body: base, regular
- UI label/caption: small, medium weight
- Monospace: for tool outputs, code, and technical values (use `font-mono`)

**Spacing System:** Pick one of these base rhythms and use it consistently:
- 4px base (Tailwind default) — works well, stick to 4/8/12/16/24/32/48/64/96 steps
- Never mix arbitrary values like `mt-[17px]` — use the scale

---

### Per-Site Visual Personality

Each site in the portfolio has a distinct mood and color direction. Build the site to match its mood — do not apply a neutral "safe" palette. Use the site-specific `build-framework.md` for the confirmed direction; this table is the guiding principle:

| Site | Mood | Direction | Avoid |
|------|------|-----------|-------|
| QR & Barcode Toolkit | Precise, technical | Dark base, cyan/teal accent | Playful or colorful |
| Image Resize & Crop Lab | Creative, visual | Warm white, amber accent | Corporate blue |
| Text Format & Transform Lab | Editorial, typographic | Clean white, deep indigo, monospace touches | Generic card design |
| Password & Security Toolkit | Serious, trustworthy | Near-black base, green for pass / red for fail | Anything that looks playful |
| Unit & Measurement Converter Hub | Measured, utilitarian | Light gray base, steel blue accent | Decorative elements |
| Website Launch Check Lab | Diagnostic, professional | Dark base, green/red status indicators | Purple gradient |
| Ecommerce Image Prep Lab | Retail-forward, clean | White base, orange accent | Dark/moody |
| Creator Upload Prep Lab | Bold, energetic | Dark base, rose/coral accent | Muted or corporate |
| File Inspection & Metadata Lab | Analytical, technical | Off-white base, violet accent, monospace UI | Overly decorative |
| Social Share Preview Lab | Social, vibrant | White base, platform-inspired color hints | Monochrome |
| Print Layout & Paper Lab | Warm, tactile | Cream/warm base, brown accent | Cold or tech |
| Colour Accessibility Lab | Colour-positive, clear | White base, rich multi-color usage (appropriate here) | Black-and-white only |
| Responsive Viewport Preview Lab | Screen-centric, tech | Dark base, sky blue accent | Warm tones |
| Email Preview Lab | Clean, inbox-familiar | Light blue-white base, mid-blue accent | Heavy graphics |
| Marketplace Listing Helper Lab | Commerce, results-oriented | White base, emerald accent | Dark or moody |
| Meeting & Presentation Prep Lab | Professional, structured | Light gray base, deep blue accent | Playful or casual |
| Timers & Focus Lab | Focus, zen, minimal | Pure dark base, amber accent | Distracting decoration |
| Event Utility Lab | Celebratory, warm | Light purple-white base, vivid purple accent | Cold or corporate |
| Randomiser & Picker Lab | Playful, energetic | White base, bold multi-color usage (pick wheel aesthetic) | Muted or serious |
| Job Application Prep Lab | Professional, hopeful | Clean white base, charcoal + teal accent | Anything that looks cheap |

---

### Recommended Fonts

**Do not use Inter alone.** It is everywhere. Acceptable options that are free, well-optimised, and not overused:

| Font | Personality | Best for | Load via |
|------|-------------|----------|----------|
| **Geist** (Vercel) | Clean, technical, slightly distinctive | Technical/dev tools | `next/font/local` |
| **Plus Jakarta Sans** | Friendly, modern, approachable | General utility, ecommerce | `next/font/google` |
| **DM Sans** | Clean with subtle personality | Colour, social, creative tools | `next/font/google` |
| **Outfit** | Clean with more warmth than Inter | Timers, planners, event tools | `next/font/google` |
| **Sora** | Geometric, tech-adjacent | Security, file inspection, password | `next/font/google` |
| **Fraunces** (display only) | Elegant, literary (use for H1 display only) | Print, editorial, text tools | `next/font/google` |

For monospace UI elements (tool outputs, code, technical values): **Geist Mono** or **JetBrains Mono** (both free, both high quality).

Always load fonts via `next/font` — never import from Google Fonts CDN directly (causes FOUT and hurts LCP).

---

### Design Style References

Study these sites before designing. They are not to be copied — they are reference points for the *level of craft* and the *kinds of decisions* that separate distinctive from generic:

| Reference | Why it matters |
|-----------|----------------|
| [linear.app](https://linear.app) | Dark theme done with extreme discipline. Spacing, type, animation — all intentional. |
| [vercel.com](https://vercel.com) | Black and white used boldly. No color needed when the design is this considered. |
| [cal.com](https://cal.com) | Open source but looks expensive. Proof that Tailwind can be used with real craft. |
| [transform.tools](https://transform.tools) | Free utility site that looks designed, not generated. Great reference for this portfolio. |
| [squoosh.app](https://squoosh.app) | Tool-first design: the tool IS the hero. Everything else is secondary. |
| [tinypng.com](https://tinypng.com) | A humble panda mascot became the entire brand identity. Distinctive without trying hard. |
| [regex101.com](https://regex101.com) | Technical, dense, functional — but clearly designed with intent. |
| [excalidraw.com](https://excalidraw.com) | Strong visual personality from a deliberate style choice (hand-drawn look). |

---

### AI Image Generation Prompts

Use these prompts in **ChatGPT (GPT-4o image generation)** or **Midjourney** to generate visual assets. Replace bracketed values with site-specific details.

#### Favicon / App Icon

```
Create a minimal app icon for [SITE_NAME]. 
Requirements:
- Single recognisable symbol for [CORE CONCEPT — e.g. "a QR code", "a clock face", "a magnifying glass over a file"]
- Flat design only. No shadows, gradients, bevels, or 3D effects.
- Two colors maximum: [BACKGROUND_COLOR] background with [ICON_COLOR] symbol.
- Rounded square format (like iOS app icon — border radius approximately 22% of width).
- The symbol must read clearly at 32×32 pixels — use bold, simplified shapes only. No fine lines.
- SVG-style clean vector illustration.
- White padding of approximately 20% on all sides inside the rounded square.
Output: 512×512 PNG on transparent background.
```

Example for QR & Barcode Toolkit:
```
Create a minimal app icon. Single symbol: a simplified QR code using only the three corner finder squares (L-shape), bold and clean. Flat design, no shadows. Background: deep teal (#0d9488) rounded square. Symbol: white. Must read clearly at 32×32 pixels. SVG vector style. 512×512 PNG.
```

#### Site-Wide OG Image Background

This is the background template that the programmatic `opengraph-image.tsx` will composite text over. Generate one per site.

```
Design a 1200×630 pixel background image for social sharing cards for [SITE_NAME].
Style:
- Background base: [BASE_COLOR — e.g. #0f172a for dark sites, #ffffff for light]
- Subtle geometric pattern: [PATTERN — e.g. "faint diagonal grid lines at 15° angle, 4px spacing, 6% opacity in [ACCENT_COLOR]"]
- One design accent: [e.g. "a soft glow in the bottom-left corner in [ACCENT_COLOR] at 15% opacity" or "a thin horizontal rule in [ACCENT_COLOR] at the bottom third"]
- No text, no people, no stock photography, no logos
- The image must work as a background behind large white or dark text
- Overall mood: [MOOD — professional / technical / warm / playful]
Output: 1200×630 PNG.
```

#### Homepage Hero Illustration

For sites that warrant a hero illustration above the tool grid (use sparingly — tool-first is the priority):

```
Flat vector illustration for [SITE_NAME] homepage.
Shows: [CONCEPT — e.g. "a smartphone scanning a QR code, with a URL appearing as a floating tag. Clean and simple." / "three browser windows at different widths showing the same website adapting its layout"]
Style: 
- Flat illustration, clean vector shapes, no photorealism
- 2–3 colors only: [COLOR1], [COLOR2], and white
- Friendly but professional — utility tool audience, not children's app
- No faces or people (abstract enough to be timeless)
- No fine details — should read clearly at 600px wide
Output: 800×500 PNG, transparent background.
```

#### Tool Page Decorative Element (Optional)

A small icon or illustration at the top of each tool page, distinct from the standard Lucide/Heroicons set:

```
Create a minimal decorative icon for a [TOOL_NAME] tool page.
The icon shows [CONCEPT — e.g. "a contrast meter showing two color bars" / "a QR code with a cursor scanning it"].
Style: flat, 2 colors ([COLOR1] and [COLOR2]), bold and simple, no fine detail.
Output: 64×64 PNG, transparent background.
```

---

### Tool Interface Design Rules

The tool widget itself is the most important element on the page. These rules apply to every tool:

- **Tool must be the first interactive element a user sees** — above the fold on mobile (375px width, 667px height as the minimum viewport to test against). No hero image, no large intro paragraph before the tool.
- **Zero state is welcoming** — when the tool loads with no input, it should show a clear visual invitation: a prominent upload area with a dashed border, a labeled input field, or a button with descriptive text. The user should never wonder what to do.
- **Result state is satisfying** — when the tool produces output, the result should be visually distinct from the input state. Use a subtle animation (150–200ms ease-out), a color change, or a clearly differentiated output area. Make it feel like the tool *did something*.
- **Error state is human** — if input is invalid, show a gentle, specific message next to the relevant field. Never a generic "error." Never red text that looks like the page broke.
- **Download/copy CTA is prominent** — if the tool produces a file or text output, the "Copy" or "Download" button must be the most visually prominent element in the result state. This is the action that completes the user's task. Make it obvious.
- **Mobile interaction targets** — all buttons and interactive elements must be at minimum 44×44px touch targets on mobile.

---

### Dark Mode

Every site should support dark mode. In Next.js + Tailwind:

1. Add `darkMode: 'class'` to `tailwind.config.ts`
2. Apply `dark:` variants to all color classes
3. Use `next-themes` for theme persistence without flash:
   ```bash
   npm install next-themes
   ```
4. Wrap the root layout in `<ThemeProvider attribute="class" defaultTheme="system" enableSystem>`
5. Provide a toggle button in the site header

Design dark mode with intention — do not just invert colors. Dark backgrounds should use deep slate/navy tones (`#0f172a`, `#0c0a09`, `#09090b`) with text at `zinc-100` or `slate-100`, not pure white. Tool output areas can use a slightly lighter dark surface (`#1e293b`) to create visual separation.

---

### Launch Design Checklist

Before any site goes live:
- [ ] A specific color palette is defined in `tailwind.config.ts` (not default Tailwind colors)
- [ ] Typography scale is defined with at least two distinct weights used
- [ ] Font loaded via `next/font` (not CDN import)
- [ ] Dark mode implemented and tested
- [ ] Favicon generated (not a letter or default Next.js icon) — use the ChatGPT prompt above
- [ ] OG image background generated (not a plain color) — use the ChatGPT prompt above
- [ ] Per-tool dynamic OG images working (`opengraph-image.tsx`)
- [ ] Tool zero state is welcoming (clear visual invitation, no blank/confusing default)
- [ ] Tool result state is visually satisfying (animation or clear visual transition)
- [ ] All tool action buttons ≥ 44×44px on mobile
- [ ] No default Tailwind blue (#3B82F6) used as primary brand color
- [ ] No CSS blob/orb hero backgrounds
- [ ] Footer has brand identity (not just four gray columns)
- [ ] Breadcrumb nav rendered and styled consistently

---

## 4. SEO Implementation

### Root Metadata (`app/layout.tsx`)
```typescript
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://[SITE_DOMAIN]'),
  title: {
    default: '[Site Name] — [One-line value proposition]',
    template: '%s | [Site Name]',
  },
  description: '[130–160 char description of what the site does]',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://[SITE_DOMAIN]',
    siteName: '[Site Name]',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '[Site Name]' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.png'] },
  icons: {
    icon: [{ url: '/favicon-32x32.png', sizes: '32x32' }, { url: '/favicon-16x16.png', sizes: '16x16' }],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}
```

### Organization Schema (Root Layout)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[Site Name]",
  "url": "https://[SITE_DOMAIN]",
  "logo": "https://[SITE_DOMAIN]/og-image.png",
  "description": "[One-line description]",
  "contactPoint": { "@type": "ContactPoint", "contactType": "customer support", "url": "https://[SITE_DOMAIN]/contact" }
}
```

### Homepage Schema (in addition to Organization)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "[Site Name]",
  "url": "https://[SITE_DOMAIN]",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://[SITE_DOMAIN]/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### Tool Page Metadata Pattern (`app/[tool-slug]/page.tsx`)
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: tool.title,               // e.g. "Dead Pixel Test — Free Online Monitor Checker"
    description: tool.metaDesc,      // 130–160 chars, includes primary keyword
    alternates: { canonical: `${appUrl}/${slug}` },
    openGraph: {
      title: tool.title,
      description: tool.metaDesc,
      url: `${appUrl}/${slug}`,
      type: 'website',
    },
  }
}
```

### Tool Page Schema (inject in `<head>`)

**WebApplication schema** (correct type for browser-based tools — use `WebApplication`, not `SoftwareApplication`):
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "[Tool Name]",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "[Tool description]",
  "url": "https://[SITE_DOMAIN]/[tool-slug]",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "124"
  }
}
```
Note: `aggregateRating` is required to unlock the star-rating rich result in SERPs. Add a simple browser-side star rating widget to each tool page so users can rate it. Without this, no star rating will appear. Update `ratingValue` and `ratingCount` from your data.

**FAQPage schema** (include on every tool page, but do NOT expect a rich result in SERPs):
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "[Q]", "acceptedAnswer": { "@type": "Answer", "text": "[A]" } }
  ]
}
```
**Important — FAQPage rich results are dead for new utility sites.** Google restricted FAQ rich results to government and health authority sites in 2023–2024. You will not see accordion-style FAQ in SERPs for a tool portfolio. Still implement FAQPage schema because: (1) it helps AI Overviews parse your content for citations, and (2) the FAQ content itself answers long-tail queries. But do not build your SEO expectations around SERP visual enhancements from this schema.

**HowTo schema: do not implement.** HowTo rich results were fully deprecated in 2024–2025 and produce no SERP benefit. Use clear prose and step-by-step HTML instead.

**BreadcrumbList schema** (every page):
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://[SITE_DOMAIN]" },
    { "@type": "ListItem", "position": 2, "name": "[Tool Name]", "item": "https://[SITE_DOMAIN]/[tool-slug]" }
  ]
}
```

### Blog Post Schema (`app/blog/[slug]/page.tsx`)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Post title]",
  "description": "[Post meta desc]",
  "author": { "@type": "Organization", "name": "[Site Name]" },
  "publisher": { "@type": "Organization", "name": "[Site Name]", "logo": { "@type": "ImageObject", "url": "https://[SITE_DOMAIN]/og-image.png" } },
  "datePublished": "[ISO date]",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://[SITE_DOMAIN]/blog/[slug]" }
}
```

### Sitemap (`app/sitemap.ts`)
```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: appUrl, priority: 1.0, changeFrequency: 'weekly' },
    ...tools.map(t => ({ url: `${appUrl}/${t.slug}`, priority: 0.9, changeFrequency: 'monthly' })),
    ...blogPosts.map(p => ({ url: `${appUrl}/blog/${p.slug}`, priority: 0.7, changeFrequency: 'monthly' })),
    { url: `${appUrl}/about`, priority: 0.5 },
    { url: `${appUrl}/privacy`, priority: 0.3 },
    { url: `${appUrl}/terms`, priority: 0.3 },
    { url: `${appUrl}/contact`, priority: 0.4 },
  ]
}
```

### Robots (`app/robots.ts`)
```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/admin/'] }],
    sitemap: `${appUrl}/sitemap.xml`,
  }
}
```

### Canonical URLs
Every page must declare:
```typescript
alternates: { canonical: `${appUrl}/[path]` }
```

### Hreflang (Multi-Language Pages)

When language variant pages exist, every language version must reference every other, plus itself, plus an `x-default`. Use the `alternates.languages` property in `generateMetadata()`:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    alternates: {
      canonical: `https://[SITE_DOMAIN]/${params.locale}/[tool-slug]`,
      languages: {
        'en':        'https://[SITE_DOMAIN]/en/[tool-slug]',
        'es':        'https://[SITE_DOMAIN]/es/[tool-slug]',
        'fr':        'https://[SITE_DOMAIN]/fr/[tool-slug]',
        'de':        'https://[SITE_DOMAIN]/de/[tool-slug]',
        'x-default': 'https://[SITE_DOMAIN]/en/[tool-slug]',
      }
    }
  }
}
```

Next.js renders these as `<link rel="alternate" hreflang="...">` tags in `<head>`. Rules:
- Every language version must list all others (reciprocity — over 60% of multilingual sites fail this)
- Every page must include a self-referencing hreflang
- `x-default` points to the English/neutral fallback
- Use fully-qualified absolute URLs (include `https://`)
- Also add `<xhtml:link>` hreflang annotations inside your `sitemap.ts` for large sites
- Only launch language variants if the translation is human-reviewed quality — auto-translated pages with no review are a scaled content abuse risk

### Static Generation Pattern (`generateStaticParams`)

Every tool page and variant page must be pre-rendered at build time (SSG). Never use client-side rendering (CSR) for pages you want indexed — Google may delay CSR indexing by days.

```typescript
// app/[tool-slug]/page.tsx
export async function generateStaticParams() {
  return tools.map((tool) => ({ 'tool-slug': tool.slug }))
}

// This is automatically statically generated — no `export const dynamic`
// needed. Never use `export const dynamic = 'force-dynamic'` on tool pages.
```

### Dynamic OG Images Per Tool

Do not use a single site-wide `/og-image.png` for all pages. Generate a per-tool OG image using the `@vercel/og` (Next.js built-in) edge function so each tool has a unique social card:

```typescript
// app/[tool-slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '[Tool Name]'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }) {
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column',
                  background: '#0f172a', width: '100%', height: '100%',
                  padding: '80px', justifyContent: 'center' }}>
      <div style={{ color: '#fff', fontSize: 64, fontWeight: 700 }}>
        {params['tool-slug']} {/* replace with actual tool name */}
      </div>
      <div style={{ color: '#94a3b8', fontSize: 32, marginTop: 24 }}>
        [Site Name] — Free, No Sign-up
      </div>
    </div>
  )
}
```

Place this file at `app/[tool-slug]/opengraph-image.tsx` and Next.js automatically generates and serves the image. Unique OG images per tool significantly improve social share click-through rates.

### AI Overviews Optimisation

AI Overviews appear on approximately 50% of all Google queries. Being cited in an AI Overview drives 35% more organic clicks than not being cited. For tool sites, the informational content *around* your tools (the "how to", "what is", "when to use" content) is the AI Overview target — pure transactional tool queries have lower AI Overview appearance rates.

To optimise for AI Overview citations:
- Use **question-format H2 and H3 headings** with a concise (40–100 word) direct answer in the first paragraph below each heading. Example: `<h2>What is a QR code?</h2><p>A QR code is a two-dimensional barcode...` — Google extracts these as citation candidates.
- Ensure `dateModified` is kept current in your Article schema (freshness is weighted).
- **Tool pages must be above the fold and immediately functional** — satisfied users who complete their task without returning to Google are a strong positive engagement signal (NavBoost "long click").
- Cover the tool's topic comprehensively across the tool page + blog posts. Topical depth (not just a single page) drives authority for AI Overview citations.

---

## 5. Content Requirements per Tool Page

Every tool page must include all of the following:

| Element | Requirement |
|---------|------------|
| H1 | Keyword-targeted (e.g. "Free Dead Pixel Test — Check Your Monitor Online") |
| Tool functionality | Fully working in-browser. Zero-state is welcoming and obvious. |
| Tool description | 1–2 paragraphs explaining what it does, who uses it, why it matters |
| SEO body copy | 400–600 words. Covers use cases, how-to, when to use, what results mean |
| FAQs | 6–8 Q&A pairs rendered on page AND as FAQPage JSON-LD schema |
| Internal links | At least 3 links to related tools on the same site |
| "Related tools" section | Rendered as cards/list at bottom of page |
| Meta title | Tool name + benefit + site name via template |
| Meta description | 120–160 chars (mobile truncates at ~120; write the key message in the first 120) |
| Canonical | Explicitly set |
| OG tags | Title, description, image (og-image.png) |

### Content Structure for AI Overviews and Long-Tail

- **Tool must be visible and functional above the fold without scrolling.** Users who complete their task without returning to Google are a positive NavBoost signal. Users who can't find the tool and bounce back to search are a negative signal.
- Use **question-format H2 and H3 headings** in the SEO body copy: "How does [tool] work?", "When should I use [tool]?", "What does [result] mean?" — then answer each in 40–100 words directly below the heading.
- Render a **breadcrumb navigation component** on every page (not just the schema — a visible, clickable breadcrumb trail: Home → [Tool Name]). This reinforces site hierarchy for Google and improves usability.
- Cover the topic comprehensively: a tool page that also explains the concept, shows examples, and lists use cases gets cited in more AI Overviews than a bare tool.

### Copy Rules
- No em dashes anywhere. Use a colon, period, or rewrite.
- Explicitly you may NOT use any em dashes EVER!!!!
- No jargon that requires product knowledge.
- Write for someone who landed from a single Google search and has no context.
- FAQs should answer what the user is actually worried about, not marketing questions.
- Every FAQ answer must be ≥ 40 words (helps AI parsing; FAQPage schema no longer produces rich results for utility sites but still aids long-tail SEO).
- Title tags: 50–60 characters, primary keyword near the start (not the brand name). Google rewrites ~60% of title tags — write accurately, concisely, and user-facing.
- Meta descriptions: write the key message in the first 120 characters (mobile truncation). Google rewrites ~62% of meta descriptions — write them anyway as they influence CTR when Google does use them.

### E-E-A-T Signals (Experience, Expertise, Authoritativeness, Trustworthiness)

E-E-A-T is not a direct algorithmic score, but it correlates with what Google rewards. For a new utility site with no backlinks, focus on Trustworthiness first — it's the most actionable:

- **Trustworthiness:** HTTPS (Vercel handles this), Privacy Policy present and linked in footer, Contact page, clear About page with honest description of what the site does, no false claims about team size or history.
- **Experience:** Show that the tool actually works — include example outputs, screenshots of results, sample inputs. Demonstrate use.
- **Expertise:** Explain concepts accurately. If the tool checks WCAG contrast, explain what WCAG is and why it matters. If it generates QR codes, explain the different use cases and formats. Don't be shallow.
- **Transparency for data-handling tools:** Any tool that processes passwords, emails, or personal information must explicitly state on the tool page that all processing is browser-side and no data is sent to any server. This is both a trust signal and legally important.

---

## 6. Internal Linking Architecture

### Hub-and-Spoke Model
```
Homepage (tool hub)
  ├── Category group A (e.g. "Generate" tools)
  │     ├── Tool 1 → links to Tools 2, 3, 4 (related)
  │     ├── Tool 2 → links to Tools 1, 3, 5
  │     └── Tool 3 → links to Tools 1, 2, 6
  ├── Category group B (e.g. "Check" tools)
  └── Blog posts → each links to ≥ 2 tool pages
```

### Rules
- Every tool page links to ≥ 3 related tools ("Related Tools" section, rendered as cards)
- Every blog post links to ≥ 2 tool pages (contextual inline links + "Try these tools" section)
- Homepage links to all tools (or all tool categories)
- Category group pages link to all tools within that group
- Navigation links to main category groups
- Footer links to legal/about pages and category groups

---

## 7. Ad Setup

### AdSense Requirements (must be met before applying)
- Real, useful content on every page
- Privacy Policy page present and linked from footer
- Terms of Service page present
- Contact page present
- About page present
- No thin or near-duplicate pages (each tool must be meaningfully distinct)
- No deceptive ad placement (ads must not look like tool buttons)
- Site must be live for at least a few weeks before applying
- Clean navigation (user can always find their way around)
- Mobile-friendly (passes Google Mobile-Friendly Test)
- Core Web Vitals pass (no red metrics in PageSpeed Insights)

### Ad Placement Strategy

Use Auto Ads — do not add manual ad slot code to the codebase. AdSense (Auto Ads) and Adsterra handle placement automatically based on the page's layout and content. Build the site normally and let the ad platform decide where to inject ads.

Do not:
- Reserve HTML elements or containers specifically for ads
- Hard-code specific ad unit types or sizes into components
- Pre-guess placement before the ad platform has seen the live page

The only rules to enforce regardless of ad platform:
- No ad placement that obscures tool functionality (Auto Ads generally avoids this, but monitor after activation)
- No placement adjacent to tool action buttons that could cause accidental clicks (AdSense policy)

### CLS and Ads

With Auto Ads, the platform injects ads dynamically after page load, which can cause Cumulative Layout Shift (CLS) failures. You cannot pre-size containers you have not placed. To manage this risk:

- Monitor CLS actively in PageSpeed Insights and Chrome DevTools once Auto Ads activates — not before launch
- If CLS exceeds 0.1 after Auto Ads is running, use the AdSense Auto Ads configuration panel to disable the ad sub-types most likely to cause layout shift (anchor and overlay formats are the most common offenders)
- Do not add fixed-height placeholder containers for ads you have not placed — they create blank space and look broken when the platform does not inject an ad at that position

### Fallback: Adsterra
If AdSense approval fails:
- Use Adsterra clean banner formats only (no popunders)
- Model revenue at $0.50–$1.50 RPM (not $3)
- Required traffic doubles or triples at this RPM; adjust expectations accordingly

---

## 7.5 Amazon Affiliate Setup

### Store ID

All sites in this portfolio use Amazon affiliate Store ID: **`snapcalc-20`**

This is hardcoded into every site's affiliate config. Do not change it without explicit instruction from the user.

### How It Works

Amazon search URLs are used instead of direct product links. This approach:
- Requires no Amazon API access (API requires qualifying sales history — search URLs do not)
- Never produces 404 errors (search result pages always return results or say "no results")
- Always shows current, in-stock products — no broken links from discontinued items
- Requires no manual product selection or image embedding

URL format:
```
https://www.amazon.com/s?k=SEARCH+TERM&tag=snapcalc-20
```

All links use `amazon.com`. Amazon handles locale redirection automatically for international visitors. Do not build multi-locale affiliate URL logic — `.com` only.

### Setup (Run Once Per Site)

**Step 1 — Create the affiliate config:**

```typescript
// lib/affiliate/config.ts
export const affiliateConfig = {
  tag: 'snapcalc-20',
  marketplace: 'https://www.amazon.com',
} as const

export function buildAmazonSearchUrl(searchTerm: string): string {
  const encoded = encodeURIComponent(searchTerm)
  return `${affiliateConfig.marketplace}/s?k=${encoded}&tag=${affiliateConfig.tag}`
}
```

**Step 2 — Create the AmazonLinks component:**

```tsx
// components/affiliate/AmazonLinks.tsx
import { buildAmazonSearchUrl } from '@/lib/affiliate/config'

interface AmazonLinksProps {
  searchTerms: string[]
  heading?: string
}

export function AmazonLinks({ searchTerms, heading = 'Recommended on Amazon' }: AmazonLinksProps) {
  if (!searchTerms.length) return null
  return (
    <aside className="rounded-lg border border-brand-200 bg-brand-50 p-4 dark:border-brand-800 dark:bg-brand-950">
      <h3 className="mb-3 text-sm font-semibold text-brand-700 dark:text-brand-300">{heading}</h3>
      <ul className="space-y-2">
        {searchTerms.map((term) => (
          <li key={term}>
            <a
              href={buildAmazonSearchUrl(term)}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-sm text-brand-600 underline hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-200"
            >
              Shop: {term} →
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
        As an Amazon Associate we earn from qualifying purchases.
      </p>
    </aside>
  )
}
```

Style the component to match the site's brand colors. The template above uses `brand-*` tokens — substitute the site's actual Tailwind color tokens.

**Step 3 — Wire into page templates:**

- **Tool pages:** place `<AmazonLinks>` below the tool widget, above the SEO body copy section
- **Blog posts:** place `<AmazonLinks>` at the bottom of the post content, before the "Related Tools" section

### Automatic Keyword Generation Rule

**This rule applies to every tool page and blog post written for any site in this portfolio, without exception and without needing a separate instruction from the user.**

When writing any tool page:
1. Generate 3–5 Amazon search terms relevant to the tool's audience and what they would plausibly buy after using it
2. Pass them to `<AmazonLinks searchTerms={['term 1', 'term 2', 'term 3']} />`

When writing any blog post:
1. Generate 3–5 Amazon search terms relevant to the post's topic and implied purchase intent
2. Pass them to `<AmazonLinks searchTerms={['term 1', 'term 2', 'term 3']} />`

Search terms must reflect what the user who just used the tool or read the blog post would plausibly buy. Ask: "What physical or digital product does this person need next?" Examples:

| Page | Example search terms |
|------|---------------------|
| QR code generator | `qr code label sheets`, `label printer`, `qr code stickers for products` |
| WiFi QR code generator | `wifi router`, `mesh wifi system`, `ethernet cable` |
| Barcode generator (EAN/UPC) | `barcode scanner`, `thermal label printer`, `label paper rolls` |
| QR print size checker | `label printer`, `qr code print template`, `thermal printer paper` |
| Blog: how to print QR codes | `label printer`, `qr code sticker paper`, `thermal printer` |
| Blog: barcode for homemade products | `thermal label printer`, `barcode label paper`, `product label maker` |
| Blog: WiFi QR for restaurant | `restaurant table signs`, `menu holder stands`, `qr code table tent cards` |

Use specific, purchase-ready search terms (e.g. "thermal label printer" not "printer"). Avoid brand names.

### Triggering Command for New Sites

When starting a new site in the portfolio, after the foundation is built, trigger affiliate setup with:

> "Apply the Amazon affiliate framework to this site. Create `lib/affiliate/config.ts` and `components/affiliate/AmazonLinks.tsx` using Store ID `snapcalc-20`. Wire the component into all existing tool pages and blog posts with appropriate search terms for each. Style the component to match this site's brand tokens."

After this is done, affiliate links are included automatically in all future tool pages and blog posts — no further instruction needed.

### Affiliate Disclosure Requirement

Every site must display the standard Amazon affiliate disclosure. The `AmazonLinks` component includes it inline ("As an Amazon Associate we earn from qualifying purchases"). No additional footer disclosure is required, but do not remove the inline disclosure.

### Launch Checklist Additions (add to Section 12)

- [ ] `lib/affiliate/config.ts` created with Store ID `snapcalc-20`
- [ ] `components/affiliate/AmazonLinks.tsx` created and styled to match site brand
- [ ] All existing tool pages include `<AmazonLinks>` with 3–5 relevant search terms
- [ ] All existing blog posts include `<AmazonLinks>` with 3–5 relevant search terms
- [ ] Affiliate disclosure present in component ("As an Amazon Associate we earn from qualifying purchases")
- [ ] All affiliate links use `rel="noopener noreferrer nofollow"`

---

## 8. Programmatic SEO

### Language Pages
Every tool should eventually have static pages for major language markets:
- Priority 1: English (default), Spanish, French, Portuguese, German
- Priority 2: Italian, Dutch, Polish, Arabic, Japanese
- Priority 3: Mandarin Chinese, Hindi, Indonesian, Turkish, Russian, Korean, Vietnamese

Language pages use the pattern `/[lang]/[tool-slug]` or a subdomain. Each must be a genuinely translated page, not auto-translated without review. Auto-translated content without editorial oversight is treated as scaled content abuse under Google's 2025 spam policy.

### Tool Variant Pages
Where search demand exists, create variant pages:
- `/[tool-slug]/mobile` — mobile-specific version
- `/[tool-slug]/for-[use-case]` — e.g. `/dead-pixel-test/for-oled`
- `/[tool-slug]/[format]` — e.g. `/qr-generator/svg`

**Content differentiation threshold:** Each variant must have at least 40% genuinely unique content versus the base tool page, and at least 500 unique words. Below this threshold, Google may treat the pages as near-duplicates and only index one.

**Canonical for near-duplicate variants:** If a variant page is not yet differentiated enough (e.g. you've built the URL but not the full unique content), set its canonical to the base tool page until the content is ready. Do not leave under-differentiated pages with their own canonical — they risk diluting the base page's authority.

```typescript
// Temporarily canonical to base page if variant isn't fully differentiated yet
alternates: { canonical: `${appUrl}/[base-tool-slug]` }
```

### AI-Generated Content Policy

You may use AI to draft programmatic page content. You must not publish it without a human editorial pass. The edit should:
- Add original examples, screenshots, or use-case specifics not present in other pages
- Verify technical accuracy
- Ensure the content answers a real user need rather than just pattern-matching other content
- Rewrite any phrasing that is generic, repetitive across pages, or sounds like unedited AI output

Google's scaled content abuse detection has been algorithmically enforced since August 2025. Sites publishing large volumes of AI-generated pages without editorial oversight have reported 50–80% traffic drops. Sites with human oversight reported only ~6% impact.

### Keyword Research Process

Do not write any blog content or SEO-targeted programmatic pages until keyword research is complete. This process must happen before any blog writing begins.

**Step 1 — Prompt the user for keyword research**
Ask the user to run keyword research using their SERP tool. Do not proceed to blog writing until the CSV is delivered. Remind the user to name the file `keywords_serp.csv` and save it in the site's framework folder.

**Step 2 — Receive and extend the CSV**
The delivered file will have these columns:

| Column | Description |
|--------|-------------|
| `Keyword` | The search term |
| `Avg. monthly searches` | Search volume |
| `Competition (indexed value)` | Difficulty score |
| `Verdict` | User's go/no-go assessment |
| `SERP Notes` | Notes on SERP landscape |

Add the following tracking columns before processing:

| Column | Purpose |
|--------|---------|
| `Used In` | Comma-separated slugs of pages/blogs where this keyword appears |
| `Usage Count` | Running total of placements across the site |
| `Status` | `todo`, `in-progress`, `done`, or `skip` |
| `Content Type` | `tool`, `blog`, `landing`, or `skip` |
| `Tool Covered` | Name of the existing tool that addresses this keyword, if applicable |

These columns prevent keyword spam: log each placement as you make it. There is no hard per-keyword cap, but if a keyword already appears across many pages, deprioritise further use.

**Step 3 — Cross-reference keywords against built tools**
For each keyword, check whether any of the 25 built tool pages already address that search intent. If a tool covers it, set `Content Type` to `tool` and `Status` to `done`. If the keyword is unwinnable (very low volume or dominated by incumbents), set `Status` to `skip`.

**Step 4 — Write content in priority order**
Keywords are ranked from most winnable to least. Write all blogs and on-page SEO content starting from the top of the list. Do not write content for a lower-priority keyword while higher-priority ones remain uncovered.

**Step 5 — Identify keyword-driven additional tools**
After the cross-reference pass, review all keywords not marked `done` or `skip`. Group related terms that together suggest a new tool. For each group:
- If several keywords point to a single distinct tool, define that tool and add it to the build plan
- If a single keyword alone represents an entire distinct tool, add it as its own build item

Document these additional tools in the site-specific build framework. They are built as Phase 4 of the build sequence (see Section 15).

---

### Programmatic Blog Support
For each tool cluster, generate blog posts targeting informational queries:
- "How to [task related to tool]"
- "What is [concept related to tool]"
- "Why does [problem the tool solves]"
- "[Tool use case] guide for [audience]"

Minimum 10 blog posts per site at launch. Target 20–30 over time.

---

## 9. Standard Pages (Required for Every Site)

### Privacy Policy
Must include:
- What data is collected (none beyond analytics cookies)
- Cookie usage (Google Analytics, AdSense)
- Third-party advertising (AdSense / Adsterra)
- No user account data collected
- Contact email for privacy queries
- Last updated date

### Terms of Service
Must include:
- Free to use, no warranty
- No liability for tool output
- No account required
- Acceptable use
- Link to privacy policy

### About Page
Must include:
- What the site does (1–2 paragraphs)
- Who it is for
- Why it was built
- No false claims about team size or history

### Contact Page
Must include:
- Contact email (can be a simple form or mailto link)
- Response time expectation

---

## 10. Analytics Setup

From day one, every site must have all of the following:

1. **Google Analytics 4** — track page views, events, tool interactions
2. **Google Search Console** — submit sitemap on launch day, monitor impressions/clicks
3. **Vercel Analytics** — real-time page view tracking, no setup required on Vercel
4. **Bing Webmaster Tools** — verify site and submit sitemap. Bing + Yahoo combined represent 5–15% of search traffic. Required for IndexNow.
5. **IndexNow (Bing)** — ping Bing/Yandex/others instantly when pages are published or updated

### IndexNow Setup

IndexNow is a push-indexing protocol supported by Bing, Yandex, Naver, Seznam, and others. Google does NOT participate. Pages submitted via IndexNow can appear in Bing within minutes to hours (versus days for Google crawl).

**Setup:**
1. In Bing Webmaster Tools, generate your IndexNow API key
2. Save the key as a static file at your domain root: `public/[your-key].txt` (contents = just the key string)
3. When new pages publish or existing pages update significantly, POST to IndexNow:

```typescript
// lib/indexnow.ts
export async function pingIndexNow(urls: string[]) {
  await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: '[SITE_DOMAIN]',
      key: process.env.INDEXNOW_KEY,
      keyLocation: `https://[SITE_DOMAIN]/${process.env.INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  })
}
```

One submission propagates to all IndexNow participants. Automate this in your deployment pipeline for new pages.

### Key GA4 Events to Track
- `tool_used` — fired when a user interacts with a tool (button click, input submission)
- `page_view` — automatic
- `scroll_depth` — set up 50% and 90% thresholds
- `tool_completed` — fired when a user gets a result (e.g. QR code generated, file processed) — this is a "task completion" signal and helps you understand which tools actually satisfy user intent

---

## 11. Performance Standards

Every page must pass:
- **Core Web Vitals:** LCP < 2.5s, CLS < 0.1, INP < 200ms
- **PageSpeed Insights mobile score:** ≥ 85
- **Mobile-Friendly Test:** Pass

### INP (Interaction to Next Paint) — Special Attention for Tool Sites

INP replaced FID as the third Core Web Vital in March 2024. INP measures the latency of all user interactions across the full session (at the 75th percentile). It is significantly harder to satisfy than FID for interactive pages.

Tool sites are the most INP-vulnerable site type because users actively click buttons, submit inputs, and trigger processing. A tool that runs heavy JavaScript synchronously after a button click will fail INP even if it loads fast.

To pass INP on tool pages:
- Break heavy processing into smaller chunks using `setTimeout` or `scheduler.postTask()`
- Defer non-critical JavaScript with `async`/`defer`
- Move heavy computation to Web Workers so the main thread stays responsive
- Test INP specifically using Chrome DevTools Performance panel → Interactions track
- Avoid large libraries for simple tasks — write lean tool logic

### To Achieve All Core Web Vitals
- Use `next/image` for all images with `width`, `height`, and `priority` on above-fold images
- Monitor CLS after Auto Ads activates — use PageSpeed Insights on the live URL, not before ads are running
- Use `loading="lazy"` on below-fold images
- Static generation (`generateStaticParams`) for all pages — no SSR for tool pages
- Font: load via `next/font` (not Google Fonts CDN) to avoid FOUT and layout shift
- Minimal JavaScript — keep tool logic lean; avoid heavy dependencies
- Test with real devices in Chrome DevTools, not just Lighthouse (Lighthouse doesn't capture real INP well)

---

## 12. Launch Checklist

Before going live:

**Infrastructure**
- [ ] GitHub repo created and connected to Vercel
- [ ] Site live on Vercel subdomain (e.g. `[site].vercel.app`)
- [ ] `NEXT_PUBLIC_APP_URL` environment variable set in Vercel
- [ ] `.env.local` created locally and in `.gitignore`

**Pages and Content**
- [ ] All 25 tool pages live and functional
- [ ] All tools mobile-tested
- [ ] Tool interface visible and usable above the fold on mobile (no scrolling required)
- [ ] Rendered breadcrumb navigation component present on every tool page
- [ ] Homepage with tool grid/index
- [ ] About, Privacy, Terms, Contact pages complete
- [ ] Custom 404 page (`app/not-found.tsx`) created — not the Next.js default
- [ ] All tool pages have: H1, SEO body copy (400–600w), 6–8 FAQs, FAQPage schema, BreadcrumbList schema, WebApplication schema
- [ ] Question-format H2/H3 headings with 40–100 word direct answers in SEO body copy

**Technical SEO**
- [ ] Sitemap.xml accessible at /sitemap.xml
- [ ] Robots.txt accessible at /robots.txt
- [ ] Canonical tags set on every page
- [ ] OG image: site-wide `/og-image.png` created (1200×630) AND per-tool dynamic OG images via `opengraph-image.tsx`
- [ ] Favicon set (16×16, 32×32, apple-touch-icon)
- [ ] All pages statically generated (`generateStaticParams` in place)
- [ ] No CSR-only pages
- [ ] Internal links: every tool links to ≥ 3 related tools
- [ ] CLS monitored in PageSpeed Insights after Auto Ads activates (target < 0.1) — disable anchor/overlay ad types if CLS exceeds threshold

**Analytics and Indexing**
- [ ] Google Analytics 4 installed and firing
- [ ] Google Search Console property verified
- [ ] Sitemap submitted to Google Search Console
- [ ] Top 5–10 priority tool pages submitted via GSC URL Inspection ("Request Indexing")
- [ ] Bing Webmaster Tools property verified
- [ ] Sitemap submitted to Bing Webmaster Tools
- [ ] IndexNow API key generated, key file hosted at domain root, ping function wired up
- [ ] `tool_used` and `tool_completed` GA4 events firing correctly

**Performance**
- [ ] Core Web Vitals passing — test in PageSpeed Insights (mobile score ≥ 85)
- [ ] INP < 200ms tested in Chrome DevTools → Performance → Interactions track
- [ ] CLS < 0.1 confirmed via PageSpeed Insights once Auto Ads is active on the live site
- [ ] No broken links
- [ ] No console errors in browser

**Pre-AdSense**
- [ ] AdSense application ready (submit after site has been live 2–3 weeks with some traffic)
- [ ] All required pages present: Privacy Policy (with AdSense/cookie disclosure), Terms, About, Contact

---

## 13. Maintenance Philosophy

**Goal: Zero ongoing maintenance.**

After launch, the only actions required are:
- Monthly: Check Search Console for crawl errors
- Quarterly: Review top-performing tools, consider adding variants
- As needed: Add new tools to the cluster

The site should never require:
- Manual content updates
- Manual price updates
- API key rotation (avoid paid APIs)
- Database maintenance (browser-side only)

If a tool starts to fail (e.g. a browser API is deprecated), fix it. Otherwise, leave it running.

---

## 14. Revenue Targets and Scaling

### Per-Site Targets
| Maturity Stage | Monthly Page Views | Revenue at $3 RPM | Net Profit |
|---|---|---|---|
| Month 1 | ~200 | ~R10 | −R10 (below hosting cost) |
| Month 2 | ~500 | ~R25 | R5 |
| Month 3+ | 1,000/tool avg | ~R1,235 (25 tools) | ~R1,215 |
| Mature | 2,500/tool avg | ~R3,090 | ~R3,070 |

### Portfolio Targets
| Tools Built | Monthly Page Views | Revenue at $3 RPM |
|---|---|---|
| 100 tools (4 sites) | 100,000 | ~R4,950 |
| 250 tools (10 sites) | 250,000 | ~R12,375 |
| 500 tools (20 sites) | 500,000 | ~R24,750 |

### RPM Improvement Levers
- Higher-intent niches (B2B tools, ecommerce tools) → $5–$8 RPM
- US/UK traffic proportion increase → higher RPM
- Non-ad revenue (affiliate links to relevant tools, courses, products) → supplement display ads
- Premium tool version (no ads, extra features) → optional SaaS layer

---

## 15. Build Sequence

### Phase 1: Foundation (Sites 1–3)
Build the top-confidence clusters first:
1. QR & Barcode Toolkit
2. Screen & Monitor Test Lab
3. Audio Check Lab

These three have the highest confidence scores (9/10), clearest commercial adjacency, and simplest tool logic. Use them to establish the shared component library, SEO template, and ad setup.

### Phase 2: Expansion (Sites 4–10)
Build the next tier after AdSense approval:
4. Webcam & Lighting Check Lab
5. Input Device Test Lab
6. Website Launch Check Lab
7. Ecommerce Image Prep Lab
8. Creator Upload Prep Lab
9. File Inspection & Metadata Lab
10. Social Share Preview Lab

### Phase 3: Scale (Sites 11–20)
Build remaining clusters once the model is proving out:
11. Print Layout & Paper Lab
12. Colour & Accessibility Lab
13. Responsive Viewport Preview Lab
14. Email Preview Lab
15. Marketplace Listing Helper Lab
16. Meeting & Presentation Prep Lab
17. Timers & Focus Lab
18. Event Utility Lab
19. Randomiser & Picker Lab
20. Job Application Prep Lab

### Phase 4: Keyword-Driven Tool Expansion (Per Site, Post-Foundation)

After a site's foundation is complete — all 25 base tools live, all target language versions deployed, the site indexed and receiving traffic — return to `keywords_serp.csv` and build the additional tools identified in Step 5 of the Keyword Research Process (Section 8).

Rules for this phase:
- Build one additional tool at a time
- For each tool, implement all language variants (following the language priority order in Section 8) before moving to the next tool
- Each additional tool follows the same build process as the core 25: tool page, SEO body copy, schema, FAQ, blog support, and internal links

When the main build plan is complete and all language variants are live, the only remaining items on the plan will be these keyword-researched tools. Work through them in the order identified from the keyword priority ranking in `keywords_serp.csv`.

---

## 16. The Site-Specific Build Handoff Template

When handing a site to a build agent, provide these three files inside a `framework` folder in the project root:

1. **This master framework** (`tool-portfolio-master-build-framework.md`) — the universal build rules, technical standards, SEO implementation, and content requirements
2. **The site-specific build framework** (`[site-name]-build-framework.md`) — covers site name, domain, audience, SEO keyword strategy, commercial adjacency, and design direction
3. **The keyword research CSV** (`keywords_serp.csv`) — the keyword data from which all tools are derived

There is no pre-defined tools list. The agent derives the tool list from the keyword CSV using the following priority order:

1. Build tools that address **winnable** keywords first (highest rows in the CSV).
2. If winnable keywords alone do not yield 25 tools, extend to **borderline** keywords.
3. Only draw from **skip** keywords if winnable and borderline combined still fall short of 25 tools.

The minimum target is 25 tools. There is no upper limit — build as many distinct, quality tools as the keyword data supports. Do not manufacture thin tools to hit the minimum. Each tool must have genuine keyword support and a function that does not substantially overlap with another tool in the build.

The agent should build the complete site without returning until it is done, including:
- All tool pages (functional + SEO content + schema)
- Homepage
- About, Privacy, Terms, Contact
- Blog (minimum 10 posts targeting informational queries around the tools)
- Sitemap, robots.txt
- Analytics setup
- OG image placeholder
- Favicon placeholder
- Internal linking complete

The site is not done until every item on the Launch Checklist (Section 12) is ticked.

