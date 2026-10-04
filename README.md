# Pyxis — Corporate Website

Landing site for Pyxis: telecom data, network intelligence, ORION, AI, customer
experience, regulatory compliance and deep investigation.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 ·
GSAP 3 + ScrollTrigger (`@gsap/react`) · Lenis · ESLint

## Scripts

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # static export → /out (see Deployment)
```

## Structure

```text
src/
├── app/                 layout (fonts, metadata, providers), page, globals.css (design tokens)
├── animations/          one file per cinematic scene + registry (index.ts) + shared helpers (global.ts)
├── components/
│   ├── animation/       Scene, FadeUp, Reveal, Parallax, Magnetic, SignalLine, NetworkField (canvas)
│   ├── layout/          Navbar, Footer, LenisProvider, PageTransition, ScrollRail
│   ├── sections/        Hero, About, Presence, Orion, AI (ORION Intelligence), Technology, Solutions, Investigation, Contact
│   └── ui/              Button, Container, SectionTitle, Counter, Logo, Arrow
├── data/                all repeated content (about, solutions, regulators, AI use cases, ORION, investigation, technologies, countries)
├── hooks/               useGsap, useLenis, useMediaQuery
└── lib/                 assets (central asset registry), constants (site, nav, contact, motion), gsap (plugin registration), utils
```

Sections are Server Components. Client code is limited to animation wrappers,
interactive pieces (AI ecosystem, solution panels, navbar) and the canvas network.

## Content vs. placeholders

- **Real content** — messaging, About (positioning, values and offices), ORION, solutions, AI use cases, data sources,
  investigation capabilities and contact details. Copy follows the website specification
  (cahier des charges v1.0): no client names, and "20+ countries" is the only published figure.
- **Final brand assets** — logo (`public/images/brand/`), favicon and app icons (`src/app/favicon.ico`, `icon.png`, `apple-icon.png`).
- **Temporary** — every other image, listed in `src/lib/assets.ts` and flagged `temporary: true`.
- **Illustrative** — timestamps, cell IDs and fingerprints in the investigation map are
  visual examples only (`src/data/investigation.ts`).

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

- `/` — home: Hero (with proof points), ORION overview, Solutions overview, Where we work, Contact
- `/platform` — ORION in full, ORION Intelligence, Data ecosystem
- `/solutions` — the six solutions grouped by audience
- `/company` — positioning, principles, global presence map
- `/legal`, `/privacy` — legal pages (noindex until Pyxis supplies the text)
- `/solutions/[audience]` — one statically generated page per audience in `src/data/solutions.ts`
  (`service-providers`, `governments-regulators`): header, its three solutions, data & ORION
  pipeline, link to the other audience, contact. The Governments & Regulators page also carries
  the deep-investigation sequence. Former `/use-cases/*` and `/solutions/<old-id>` URLs redirect
  (see `public/.htaccess`).

Navbar, footer and structured data live in `src/app/layout.tsx`, so every page shares them.
Links to home sections use `/#section`; `LenisProvider` scrolls smoothly on the same page
and restores the right position after client-side navigation.

## Deployment (OVH web hosting)

The site is a **static export** (`output: "export"` in `next.config.ts`): `npm run build`
writes plain HTML, CSS, JS and images to `/out`. No Node.js server is needed, so it runs on any
OVH web hosting plan (Apache).

`public/.htaccess` is copied into `/out` and does what a Next.js server would otherwise do:
HTTPS and `www` redirect, the former `/use-cases/*` redirects, clean URLs (`/platform` serves
`platform.html`), the in-site navigation data files (`__next.*.__PAGE__.txt`), the 404 page and
cache headers. Keep it in sync if routes change.

1. `npm ci && npm run build`
2. Back up the current content of the hosting's `www/` folder (SFTP, e.g. FileZilla).
3. Upload the **content** of `/out` into `www/`, including the hidden `.htaccess`
   (replace the whole `_next/` folder on every update).
4. OVH Manager → Web hosting → Multisite: add `pyxisit.net`, `www.pyxisit.net`, `pyxis.com.tn`
   and `www.pyxis.com.tn`, all → `www`, with the SSL option enabled (the Let's Encrypt certificate
   covers every name). The site is served on **both** domains, each staying on its own domain;
   `.htaccess` only adds `www` and HTTPS. Canonical tags, sitemap and structured data point to
   `www.pyxisit.net` (`site.url`), so search engines index one copy. For `pyxis.com.tn`, only
   change the web records (A/AAAA for the bare name and `www`) at its registrar: leave the MX
   records untouched so e-mail keeps working.
5. Check: every page over `https://www.pyxisit.net` and `https://www.pyxis.com.tn`, `/use-cases/customer-experience` redirects, an unknown
   URL shows the 404 page, `/sitemap.xml` and `/robots.txt` respond. Submit the sitemap in
   Google Search Console.

`npm run start` does not apply to a static export; to preview `/out` locally, serve the folder
with any static server that supports clean URLs.
