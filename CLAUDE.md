# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A static marketing/info site (in Polish) for a kitesurfing community around Łódź, Poland, covering two
spots — "Jeziorsko" and "Przykona". Built with Astro (static output), React islands for interactive nav,
Tailwind for styling, and vanilla JS modules for page behavior (maps, weather, menus, modals). Deployed to
Cloudflare Pages.

## Commands

- `npm run dev` / `npm start` — Astro dev server
- `npm run build` — build static site to `dist/`
- `npm run preview` — preview the production build
- `npm run lint` / `npm run lint:fix` — ESLint over `.js,.jsx,.ts,.tsx`
- `npx tsc --noEmit` — typecheck
- `npm run optimize` — batch-convert/compress images in `public/assets/original` to WebP via `scripts/optimize-images.js` (uses `sharp`)

There is no test suite (`npm test` is a stub) — verification is typecheck + lint + manual/browser checks.

## Architecture

### Astro + React split

Pages are `.astro` files under `src/pages/`; each page's frontmatter builds its own `navLinks` /
`desktopSubNav` / `mobileSubNav` arrays inline and passes them into the React `Layout` component
(`src/components/Layout.tsx`), which renders `DesktopNav` (desktop) and `MobileNav` (mobile, hidden via
Tailwind `md:` breakpoints — both render, CSS picks one). `Head.tsx` is used per-page for `<title>`, font
preload, and the `--vh` custom property polyfill for mobile viewport height.

`src/components/navigation.ts` defines the canonical nav tree (`siteNavigation`) plus a
`flattenNavigationTree` helper. `MobileNav` consumes `siteNavigation` directly for its full tree menu, but
individual pages do **not** use `flattenNavigationTree` to build `navLinks`/`desktopSubNav` — those are
hand-duplicated per page. When adding/renaming/reordering a page, update both `navigation.ts` and the
frontmatter arrays in every affected `.astro` file (nav links + active-state flags), or `DesktopNav` and
`MobileNav` will disagree.

### Page structure per spot

Each spot (`jeziorsko`, `przykona`) follows the same page shape under `src/pages/spots/<spot>/`:
- `index.astro` — spot landing page
- `spoty.astro` — Leaflet map of sub-spots (loads Leaflet from a CDN `<script>`/`<link>` tag directly in
  the page, not an npm dependency — see `map.js` / `przykona-map.js`)
- individual spot pages (e.g. `popow.astro`, `milkowice.astro`) — description, pros/cons, image gallery,
  wind-direction card
- `pogoda.astro` — weather widget page

Every page ends with an inline `<script>import "../../../main.js"</script>` (path depth varies by nesting)
to wire up the vanilla-JS behavior for that page.

### Vanilla JS module wiring (`src/js/*.js` + `src/main.js`)

`main.js` is the single entry point every page imports; on `DOMContentLoaded` it unconditionally calls
`initMobileMenu`/`initCollapsibleMenu`/`initFullscreenModal`/`initMap`/`initPrzykonaMap`, and conditionally
calls `loadWeatherWidget`/`initWeatherData` based on which DOM elements/attributes are present on the page
(e.g. `[data-weather-widget]`, `#wind-dir`, `#meteo-forecast`). Each `init*` function is expected to check
for its own required DOM element(s) and no-op if absent — this is how one shared entry point serves
structurally different pages. `map.js` gates on `#map[data-spot="jeziorsko"]`; `przykona-map.js` presumably
gates similarly for Przykona.

### Weather data flow

Live wind/temperature data comes from `meteor.iung.pulawy.pl`, which doesn't send CORS headers, so
`src/js/weather-data.js` fetches through a Cloudflare Worker CORS proxy deployed separately from
`scripts/meteor-proxy/` (`npx wrangler deploy` from that directory — see `scripts/meteor-proxy/deploy.md`).
The proxy is a distinct Cloudflare Workers project from the main site (which deploys via Cloudflare Pages,
see below); redeploying the site does not redeploy the proxy. Forecast images are fetched directly from
`old.meteo.pl` with a fallback chain trying progressively older forecast slots (6h/12h/18h/24h back) since
the freshest slot is often not yet published.

### Deployment

`.github/workflows/deploy.yml` builds on push to `master`/`main` and deploys `dist/` to Cloudflare Pages
(project `kite-lodz`) via `wrangler-action`. `wrangler.toml` at the repo root configures the Pages project;
`scripts/meteor-proxy/wrangler.jsonc` configures the separate Worker and is unrelated to the root config.

### Images

Source images live in `public/assets/`, already optimized to WebP. `scripts/optimize-images.js` is the
tool for converting/compressing new images before adding them (defaults: `./public/assets/original` →
`./public/assets`); it's excluded from ESLint (`eslint.config.js` ignores it) since it's a Node CLI script,
not app code.

### Styling

Tailwind config (`tailwind.config.js`) defines two custom theme colors used throughout: `textColor`
(`#39563e`) and `hoverColor` (`#c7a370`). Global styles are in `src/styles/global.css`, imported by both
`Layout.tsx` and `Head.tsx`.
