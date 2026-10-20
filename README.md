# Lahore Prime Estates

A production-ready real-estate website for Lahore, Pakistan. Built with the Next.js
App Router, TypeScript, Tailwind CSS v4 and Motion. Fully static — there is no
backend, no database and no API keys, so it deploys anywhere.

Nine sample listings, twelve area guides, six services, four agents, an EMI
calculator in PKR, an English/Urdu toggle, favourites that persist in
`localStorage`, and a floating WhatsApp button on every page.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build (22 pages, all prerendered) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint, including the React Compiler rules |
| `node scripts/fetch-images.mjs` | Re-download `public/photos/` and rebuild `src/lib/lqip.ts` |

## Stack

- **Next.js 16.4** (App Router) — routing, SSG, metadata, image optimiser
- **React 19.3** — server components by default; `"use client"` only where there is interaction
- **TypeScript 5** — strict
- **Tailwind CSS v4** — CSS-first config; design tokens live in the `@theme` block of `src/app/globals.css`, there is no `tailwind.config.js`
- **Motion 14.4** (`motion/react`) — scroll reveals, staggered cards, animated counters, accordion, mobile menu, hero parallax; every animation checks `useReducedMotion()`
- **lucide-react** — icons
- **next/font** — Playfair Display, Inter, Noto Nastaliq Urdu

Tailwind v4 runs as a Turbopack loader registered in `next.config.ts`
(`turbopack.rules`), because this project has no PostCSS config.

## Where to change things

Everything the brand owns is read from one file. A rename never needs a
project-wide search and replace.

| What | File |
| --- | --- |
| Name, tagline, email, WhatsApp, address, map centre, socials, stats, services | `src/data/site.ts` |
| Your real domain (metadata, canonical, sitemap, robots) | `siteUrl` in `src/data/site.ts` |
| Listings, prices, sizes, features | `src/data/properties.ts` |
| Areas, agents, testimonials, FAQs | `src/data/areas.ts`, `agents.ts`, `testimonials.ts`, `faqs.ts` |
| Photos | `src/lib/images.ts`, then run `node scripts/fetch-images.mjs` |
| Colours, fonts, spacing, component classes | `@theme` in `src/app/globals.css` |
| Urdu strings | `src/lib/i18n.ts` |

Prices are plain numbers in PKR. `formatPrice()` in `src/lib/format.ts` renders
them as `PKR 4.5 Crore`, `PKR 85 Lakh` or `PKR 150,000 / month`, and
`areaLabel()` converts between Marla and Sq Ft (20 Marla = 1 Kanal).

## Layout

```
src/
├── app/                    routes + layout.tsx, globals.css, robots.ts, sitemap.ts
│   ├── properties/[id]/    listing detail, prerendered with generateStaticParams
│   └── about|areas|calculator|contact|list-your-property|services/
├── components/
│   ├── layout/             navbar, footer, logo, whatsapp-fab, page-header
│   ├── sections/           one file per homepage section
│   ├── property/           property-card, gallery, inquiry-form
│   └── ui/                 reveal, count-up, form, section-heading, smart-image, locale-provider
├── data/                   all editable content
└── lib/                    format, images, lqip, i18n, browser-store, types
```

## Notes on two decisions

**Photos are self-hosted** in `public/photos/` rather than hotlinked. The Next
image optimiser fetches its source server-side, and an unscaled Unsplash
original is ~4 MB and ~24 s — longer than the optimiser's timeout, which shows
up as cards silently falling back to the placeholder. `scripts/fetch-images.mjs`
pulls each photo at 1600px and generates the 12px blur placeholders in
`src/lib/lqip.ts`.

**Colour tokens are set by measured contrast, not taste.** `gold-600` is
`#9a5d07` because it is the only gold that clears 4.5:1 on both the paper and
panel bands; the WhatsApp green is darkened to `#0f7d3f` for the same reason.
The site passes axe-core with zero violations on every route.

## Deploy

`npm run build && npm start` works anywhere Node runs. On Vercel, connect the
repository and the defaults are correct — set the framework preset to Next.js
and nothing else. Then update `siteUrl` in `src/data/site.ts` to the real
domain so canonical URLs, Open Graph and `sitemap.xml` point at it.

Listings are for demonstration. Replace the contact details in
`src/data/site.ts` before sending anyone real traffic.
