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
│   ├── sections/        Hero, About, Clients, Orion, AI (ORION Intelligence), Technology, Solutions (Use cases), Investigation, Contact
│   └── ui/              Button, Container, SectionTitle, Counter, Logo, Arrow
├── data/                all repeated content (about, metrics, solutions, AI use cases, ORION, investigation, technologies, clients)
├── hooks/               useGsap, useLenis, useMediaQuery
└── lib/                 assets (central asset registry), constants (site, nav, contact, motion), gsap (plugin registration), utils
```

Sections are Server Components. Client code is limited to animation wrappers,
interactive pieces (AI ecosystem, solution panels, navbar) and the canvas network.

## Content vs. placeholders

- **Real content** — messaging, About (positioning, values and offices), ORION, solutions, AI use cases, data sources,
  investigation capabilities, metrics (100 TB/h, 6.9% MAPE, 9+ deployments, 8+ use cases),
  contact details and the technology list from the existing Pyxis IT website.
- **Final brand assets** — logo (`public/images/brand/`), favicon and app icons (`src/app/favicon.ico`, `icon.png`, `apple-icon.png`).
- **Temporary** — every other image, listed in `src/lib/assets.ts` and flagged `temporary: true`.
- **Illustrative** — timestamps, cell IDs and fingerprints in the investigation map are
  visual examples only (`src/data/investigation.ts`).
- **Clients** — originals in `assets/references/`, listed in `src/data/clients.ts`. The `mono/` (grey at rest) and `on-dark/` (colour on hover) variants in `public/images/references/` are generated from them. Higher-resolution or SVG logos will render sharper.

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
  - **desktop / compact**: ORION, Investigation and Data ecosystem play their sequence once when they enter the viewport (no pinning); lighter reveals on small screens
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
composes an email to `contact@pyxisit.net` in the visitor's mail client. To use a real endpoint later, replace the `mailto` in `onSubmit`
with a POST to an API route or form service.

## SEO

- Metadata and viewport: `src/app/layout.tsx`
- Organization structured data (JSON-LD): `src/components/layout/StructuredData.tsx`
- Social share images: `src/app/opengraph-image.png`, `twitter-image.png` (+ `.alt.txt`)
- Icons: `src/app/favicon.ico`, `icon.png`, `apple-icon.png`
- Branded 404: `src/app/not-found.tsx`

## Global presence map

The dotted map in About (Global presence) is generated from `assets/map-pyxis.png` (dark red = offices,
light pink = project countries, grey = land). After replacing that image, run:

```bash
node scripts/generate-footprint.mjs
```

It rewrites `public/images/map/footprint.svg` (transparent dotted map) and
`src/data/footprint.ts` (office and country points used for the animated links).

## Pages

- `/` — home: Hero, About, References, ORION + ORION Intelligence, Data ecosystem, Use cases, Contact
- `/use-cases/[slug]` — one statically generated page per use case in `src/data/solutions.ts`
  (header, capabilities, data & ORION pipeline, next use case, contact). The Regulatory
  Compliance & Deep Investigation page carries the investigation sequence.

Navbar, footer and structured data live in `src/app/layout.tsx`, so every page shares them.
Links to home sections use `/#section`; `LenisProvider` scrolls smoothly on the same page
and restores the right position after client-side navigation.
