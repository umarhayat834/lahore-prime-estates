# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Lahore Prime Estates
**Generated:** 2026-10-19 22:00:47
**Category:** Real Estate/Property
**Design Dials:** Motion 6/10 (Standard) | Density 6/10 (Standard)

---

## Global Rules

> **Brand override (authorized by the site owner, 2026-10-19):** the generator suggested a
> trust-teal palette and Cinzel/Josefin Sans for this category. This project is locked to
> **deep navy + warm gold + off-white** with **Playfair Display / Inter**. Every value below
> has been measured against WCAG 2.2 (ratios in the audit table).

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary (navy 900) | `#0B1F3A` | `--color-primary` |
| Primary deep (navy 950) | `#071426` | `--color-primary-deep` |
| Primary raised (navy 800) | `#123156` | `--color-navy-800` |
| On Primary | `#FAF8F5` | `--color-on-primary` |
| Accent / gold (decorative on light, bright on dark) | `#C9A227` | `--color-gold` |
| Accent / gold bright (on navy only) | `#D4AF37` | `--color-gold-bright` |
| Accent / gold text-safe (on light) | `#A16207` | `--color-gold-text` |
| Accent soft wash | `#F7EFD8` | `--color-gold-soft` |
| On Accent (navy text on gold fill) | `#0B1F3A` | `--color-on-gold` |
| Background | `#FAF8F5` | `--color-background` |
| Surface (cards) | `#FFFFFF` | `--color-surface` |
| Panel (alternating band) | `#F1EDE6` | `--color-panel` |
| Foreground | `#0B1F3A` | `--color-foreground` |
| Body text | `#1A2433` | `--color-ink` |
| Muted text | `#4A5568` | `--color-muted-foreground` |
| Border (decorative) | `#D8D2C6` | `--color-border` |
| Input border (AA non-text) | `#6E675C` | `--color-border-strong` |
| Focus ring (on light) | `#0B1F3A` | `--color-ring` |
| Focus ring (on navy) | `#D4AF37` | `--color-ring-on-dark` |
| Destructive | `#B91C1C` | `--color-destructive` |
| WhatsApp | `#128C46` | `--color-whatsapp` |

**Contrast audit (measured, not assumed)**

| Pair | Ratio | Verdict |
|------|-------|---------|
| navy 900 on off-white | 15.58 | AAA |
| body ink `#1A2433` on off-white | 14.74 | AAA |
| muted `#4A5568` on off-white / on panel | 7.10 / 6.45 | AA |
| off-white on navy 900 | 15.58 | AAA |
| gold-bright `#D4AF37` on navy 900 | 7.86 | AA (text) |
| gold-text `#A16207` on off-white | 4.64 | AA (text) |
| navy 900 on gold `#C9A227` (filled button) | 6.83 | AA |
| gold-text `#A16207` on navy 900 | 3.36 | non-text/large only |
| input border `#6E675C` on off-white | 5.27 | AA non-text (3:1) |
| **gold `#C9A227` on off-white** | **2.28** | **FAIL — decorative use only, never text** |
| **white on gold `#C9A227`** | **2.42** | **FAIL — never pair; use navy text on gold** |
| **muted-light `#64748B` on off-white** | **4.49** | **FAIL by 0.01 — do not use** |

**Color Notes:** navy carries authority; gold is a thin accent (rules, numerals, icons on
navy), never a light-background text colour. Gold-filled buttons always take navy text.

### Typography

- **Heading Font:** Playfair Display (400/500/600/700)
- **Body Font:** Inter (300/400/500/600/700)
- **Mood:** real estate, luxury, elegant, sophisticated, property, premium
- **Google Fonts:** [Playfair Display + Inter](https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
```

**Scale (mobile-first, fluid):** display `clamp(2.25rem, 6vw, 4rem)` / h2 `clamp(1.75rem, 4vw, 2.5rem)` /
h3 `1.25rem` / body `1rem` (16px, never below) / caption `0.875rem`. Playfair for headings and
prices only; Inter for all running text and controls. Tabular numerals (`font-variant-numeric:
tabular-nums`) on prices and counters so figures align.

### Spacing Variables

*Density: 6/10 — Standard*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

Minimum hit area **44×44px** on every control, including icon-only buttons (pad the button,
not just the glyph). Transitions 200ms; hover may lift 1px but must not rescale layout.

```css
/* Primary — navy fill, off-white label (15.58:1) */
.btn-primary {
  background: #0B1F3A; color: #FAF8F5;
  min-height: 44px; padding: 12px 24px; border-radius: 10px;
  font-weight: 600; transition: background 200ms ease, transform 200ms ease;
  cursor: pointer;
}
.btn-primary:hover { background: #123156; transform: translateY(-1px); }

/* Gold — navy label; never white on gold (2.42:1) */
.btn-gold { background: #C9A227; color: #0B1F3A; }
.btn-gold:hover { background: #D4AF37; }

/* Ghost on light */
.btn-secondary {
  background: transparent; color: #0B1F3A; border: 2px solid #0B1F3A;
  min-height: 44px; padding: 12px 24px; border-radius: 10px; cursor: pointer;
}
/* On navy surfaces swap border/label to #D4AF37 (7.86:1) */
```

### Cards

```css
.card {
  background: #FFFFFF;
  border: 1px solid #D8D2C6;          /* decorative only — 1.67:1, not a UI-component boundary */
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  transition: box-shadow 200ms ease, transform 200ms ease;
  cursor: pointer;
}
.card:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }
```

### Inputs

```css
.input {
  min-height: 44px; padding: 12px 16px;
  border: 1px solid #6E675C;           /* 5.27:1 — meets the 3:1 non-text rule */
  border-radius: 10px; font-size: 16px; /* 16px prevents iOS focus-zoom */
  background: #FFFFFF; color: #1A2433;
  transition: border-color 200ms ease, box-shadow 200ms ease;
}
.input:focus-visible {
  outline: 2px solid #0B1F3A; outline-offset: 2px;   /* never remove outline with none */
  box-shadow: 0 0 0 4px rgba(201,162,39,.35);
}
.input[aria-invalid="true"] { border-color: #B91C1C; }
```

### Forms — error handling

Validate on **blur**, not only on submit. On a failed submit, render a focusable error summary
at the top of the form, move focus to it, and link every item to its field:

```html
<div role="alert" tabindex="-1" aria-labelledby="error-title">
  <h2 id="error-title">There is a problem</h2>
  <a href="#email">Enter an email address</a>
</div>
```

### Carousel (testimonials)

Auto-rotation requires **prev/next AND pause** controls; must stop rotating on hover, focus and
under `prefers-reduced-motion`; slide position must be announced (`aria-live` /
`aria-roledescription="carousel"`). Arrow-key handling is scoped to the carousel region — never
a window-level listener that hijacks the page.

### Floating elements

The sticky navbar and the bottom-right WhatsApp button are fixed overlays. Give the page a
bottom safe padding and sections `scroll-margin-top` so a focused control is never fully
obscured (WCAG 2.2 *Focus Not Obscured*; the strengthened AAA variant is not claimed here).

### Modals

```css
.modal-overlay {
  background: rgba(7, 20, 38, 0.6);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Glassmorphism

**Keywords:** Frosted glass, transparent, blurred background, layered, vibrant background, light source, depth, multi-layer

**Best For:** Modern SaaS, financial dashboards, high-end corporate, lifestyle apps, modal overlays, navigation

**Key Effects:** Backdrop blur (10-20px), subtle border (1px solid rgba white 0.2), light reflection, Z-depth

### Page Pattern

**Pattern Name:** Hero-Centric Design

- **Conversion Strategy:** One primary CTA. Let the hero dominate the initial viewport without hiding the next content cue. Use a static hero and non-pulsing CTA when reduced motion is requested; provide video controls. Pause hero media offscreen/hidden and keep the final hero message and CTA static under reduced motion.
- **CTA Placement:** Hero dominant (center/bottom) + Sticky nav CTA
- **Section Order:** Full-bleed Hero (headline + visual) > Single value prop strip > Key benefit or proof > Primary CTA

---

## Motion

**Stagger List** (Standard) — Trigger: load or scroll | Duration: 300-450ms | Easing: `back.out(1.4)`

```js
gsap.from('.grid-item', { opacity: 0, scale: 0.92, y: 16, duration: 0.4, stagger: { each: 0.06, from: 'start', grid: 'auto' }, ease: 'back.out(1.4)' });
```

**Framework notes:** grid: 'auto' lets GSAP infer rows/columns from a CSS grid layout for a natural wave stagger; Use matchMedia('(prefers-reduced-motion: reduce)') to skip non-essential motion and render the final state immediately

- ✅ Combine with from: 'center' for a bento-grid layout to draw the eye inward first
- ❌ Don't use back.out on dense data tables; the overshoot reads as sloppy on informational UI
- ⚡ Group DOM writes; avoid interleaving layout reads (getBoundingClientRect) between staggered tweens

---

## Anti-Patterns (Do NOT Use)

- ❌ Poor photos
- ❌ No virtual tours

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
