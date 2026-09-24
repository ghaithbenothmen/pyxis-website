# Pyxis IT — Corporate Website

Landing site for Pyxis IT: telecom data, network intelligence, ORION, AI, customer
experience, regulatory compliance and deep investigation.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 ·
GSAP 3 + ScrollTrigger (`@gsap/react`) · Lenis · ESLint

## Scripts

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
npm run start
```

## Structure

```text
src/
├── app/                 layout (fonts, metadata, providers), page, globals.css (design tokens)
├── animations/          one file per cinematic scene + registry (index.ts) + shared helpers (global.ts)
├── components/
│   ├── animation/       Scene, FadeUp, Reveal, Parallax, Magnetic, SignalLine, NetworkField (canvas)
│   ├── layout/          Navbar, Footer, LenisProvider, PageTransition, ScrollRail
│   ├── sections/        Hero, About, Proof, Solutions, Orion, AI, Investigation, Technology, Clients, Contact
│   └── ui/              Button, Container, SectionTitle, Counter, Logo, Arrow
├── data/                all repeated content (about, metrics, solutions, AI use cases, ORION, investigation, technologies, clients)
├── hooks/               useGsap, useLenis, useMediaQuery
└── lib/                 assets (central asset registry), constants (site, nav, contact, motion), gsap (plugin registration), utils
```

Sections are Server Components. Client code is limited to animation wrappers,
interactive pieces (AI ecosystem, solution panels, navbar) and the canvas network.

## Content vs. placeholders

- **Real content** — messaging, About (approach, values and offices from the existing Pyxis IT website), ORION, solutions, AI use cases, data sources,
  investigation capabilities, metrics (100 TB/h, 6.9% MAPE, 9+ deployments, 8+ use cases),
  contact details and the technology list from the existing Pyxis IT website.
- **Final brand assets** — logo (`public/images/brand/`), favicon and app icons (`src/app/favicon.ico`, `icon.png`, `apple-icon.png`).
- **Temporary** — every other image, listed in `src/lib/assets.ts` and flagged `temporary: true`.
- **Illustrative** — timestamps, cell IDs and fingerprints in the investigation map are
  visual examples only (`src/data/investigation.ts`).
- **Clients** — logos in `public/images/references/`, listed in `src/data/clients.ts`. The `color/` and `mono/` variants are generated from the originals (trimmed; white monochrome keeps knocked-out text readable). Higher-resolution or SVG logos will render sharper.

## Replacing assets

All imagery is referenced through `src/lib/assets.ts`; components never contain URLs.

1. Put files in `public/images/<area>/` or `public/videos/<area>/`.
2. Change the matching `src` in `assets.ts` (e.g. `"/images/hero/hero.jpg"`).
3. Logo: `assets.brand.logo.onDark` / `onLight` (swap for an SVG later if one is supplied).
4. Hero video: set `assets.hero.video` to `{ src, poster }`; it is rendered muted,
   looped, `playsInline`, desktop only, with the canvas network as fallback.
5. Once no Unsplash URLs remain, remove the `remotePatterns` entry in `next.config.ts`.

Brand colours and fonts live in `src/app/globals.css` (`:root` tokens) and
`src/app/layout.tsx`.

## Animation architecture

- `lib/gsap.ts` registers ScrollTrigger and `useGSAP` once, on the client.
- `LenisProvider` drives Lenis from `gsap.ticker` and forwards scroll events to
  `ScrollTrigger.update`, so both share one frame loop. In-page anchors scroll via Lenis.
- `<Scene name="…">` is the client boundary for a section; it runs the matching timeline
  from `src/animations` inside a `gsap.context()` that is reverted on unmount.
- Every scene uses `gsap.matchMedia()` with three variants:
  - **desktop** (≥1024px): pinned, scroll-scrubbed sequences (ORION, Investigation)
  - **compact** (<1024px): the same sequences scrubbed without pinning; lighter reveals
  - **reduced motion**: no timelines, no Lenis, content fully visible

Elements animated on entry carry `data-intro`. They start hidden only when JavaScript
runs and the visitor allows motion (`.js` class set before first paint), so the page
stays readable without JS.

## Accessibility

Semantic landmarks and heading order, skip link, visible focus styles, keyboard-operable
AI ecosystem and solution panels, focus-managed mobile menu (Escape to close, focus
trap), descriptive `aria-label`s on diagrams, `prefers-reduced-motion` support.

## Contact form

`src/components/sections/Contact/ContactForm.tsx` has no backend yet: submitting
composes an email to `contact@pyxis.com.tn` in the visitor's mail client. Links with
`data-contact-topic="…"` (the "Talk to an expert" links on solutions) preselect the topic
(`src/data/contact.ts`). To use a real endpoint later, replace the `mailto` in `onSubmit`
with a POST to an API route or form service.

## SEO

- Metadata and viewport: `src/app/layout.tsx`
- Organization structured data (JSON-LD): `src/components/layout/StructuredData.tsx`
- Social share images: `src/app/opengraph-image.png`, `twitter-image.png` (+ `.alt.txt`)
- Icons: `src/app/favicon.ico`, `icon.png`, `apple-icon.png`
- Branded 404: `src/app/not-found.tsx`

## Global presence map

The dotted map in About is generated from `assets/map-pyxis.png` (dark red = offices,
light pink = project countries, grey = land). After replacing that image, run:

```bash
node scripts/generate-footprint.mjs
```

It rewrites `public/images/map/footprint.svg` (transparent dotted map) and
`src/data/footprint.ts` (office and country points used for the animated links).
