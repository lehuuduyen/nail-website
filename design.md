# Design — Nice Nails & Spa (nail-website)

A locked design system for this app, produced by `hallmark redesign ./src/app/` on
2026-10-05. Every page redesign reads this file before emitting code. Do not
regenerate per page — extend or amend this file when the system needs to grow.

Where this file and the Hallmark references disagree, **this file wins**.

## Genre

`editorial` — a luxury salon whose proof is photography and whose voice is a serif.
Not modern-minimal (this is not a SaaS product), not playful (the brand is
composed, not casual), not atmospheric (the paper is light).

## Macrostructure families

Pages within a family share the family's shape; they vary only in component
archetypes. Diversification is **inverted** here: consistency across pages is the
goal, not variety. A page that drifts from this file is the defect.

- **Marketing pages** (`/`, `/specials`) — **15 · Split Studio**.
  Every major block is a diptych: copy on one half, proof on the other, and the
  pairing *alternates direction* down the page. This is the specific cure for the
  pre-redesign defect, where fifteen consecutive sections were all
  centred-heading → divider → equal-card-grid.
  Varies by page: hero archetype, which blocks carry photography.
- **Service pages** (`/services`, `/services/*`) — **11 · Catalogue**.
  The page is an index of inventory. Brand mark + tagline, no big display head.
  Price lists render as **F3 Tabular spec sheet** (hairline rules between rows,
  `tabular-nums`), not as cards. Service listings render as **F6 Product card
  grid** — uniform cards, image · name · price · one micro-action.
  Varies by page: row count, whether a category band appears.
- **Content pages** (`/blog`, `/blog/*`, `/privacy`, `/terms`) — **02 · Long Document**.
  Single column, 65ch measure, line-height 1.65, section heads emerging from the
  prose. Negative space is the divider. No reveals.
- **Media pages** (`/gallery`, `/videos`) — **18 · Portfolio Grid**.
  Filter bar above a uniform card grid. The work is the pitch. No global CTA —
  each card carries its own.
- **Transactional pages** (`/booking`, `/booking/confirmation`) — exempt.
  These keep their current shape. They inherit theme, type, space, and CTA voice
  from this file and nothing else. Do not apply a macrostructure to a form; do
  not add enrichment or reveals to a checkout path.

## Theme

**Atelier**, anchored on the existing brand values rather than Atelier's stock
palette. Axes: light paper · high-contrast-serif · warm accent (hue ~38).

Values live in [`tokens.css`](tokens.css) and **nowhere else**. The brand's hues are
unchanged; three tokens were *added* because the originals failed WCAG as used:

| Token | Why it exists |
| --- | --- |
| `--color-accent-ink` `oklch(48% 0.055 38)` | The brand vein `#9E8B85` is 2.94:1 on cream. It was being used for body links in `.blog-content`. Text needs 4.5:1; this is 6.07:1. The vein token survives for rules and marks, never for text. |
| `--color-gold` `oklch(76% 0.085 82)` + ink label | The old hero CTA was cream text on a `#A67C3D` gradient — 3.42:1, a fail. Charcoal on this gold is 5.34:1. |
| `--color-focus` `oklch(62% 0.12 48)` | One ring that clears 3:1 on *both* the light and dark paper bands (3.43:1 / 3.05:1), so focus never disappears when a component moves between them. |

Accent discipline: the accent is a highlighter. It marks an active nav item, a
focus ring, a link underline, a hairline, a small square beside a heading. It
never fills a section. Budget: **≤3% of any viewport**.

**Gold — the urgency register.** Gold is not part of the accent budget and has
exactly two sanctioned roles, both of which carry an `--color-ink` label:

1. The **single** primary CTA per view.
2. The **N12 announcement banner** fill.

*Amended 2026-10-05 for role 2.* The banner needs to read as urgent and must
contrast hard against the dark nav bar beneath it, or N12 collapses into "two nav
bars". The pre-redesign banner was `#FFFFFF` on the brand vein — 3.08:1, a WCAG
fail. Ink on gold is 5.34:1. Gold appears nowhere else; a third role requires
another amendment.

On the dark paper band gold is also the accent *text* colour (7.42:1 on
`--color-paper-dark`), because `--color-accent-ink` is built for light paper and
the vein itself is only 3.57:1 there.

## Typography

- **Display:** Playfair Display, weight 400–600, `font-style: normal` — always roman.
- **Body:** Lato, weight 400; 700 for emphasis only.
- **Wordmark:** Playfair Display 600. Editorial collapses wordmark into the
  display family deliberately; the body voice carries the brand.
- **Scale:** 1.25 major third from a 16px base. **Five sizes maximum per page** —
  reach for weight and colour before a sixth size.
- **Display tracking:** −0.02em. **Label tracking:** +0.12em, uppercase.
- **Measure:** 65ch body, 45ch minimum. Line-height 1.65 body / 1.15 display.
- **Numerals:** `tabular-nums` on every price, phone number, rating, and duration.
- **Punctuation:** real typographic marks — `“ ” — …` — never `"`, `--`, `...`.

**Known deviation, flagged not hidden.** Lato is on Hallmark's banned-defaults
list and Playfair Display is "display only, sparingly". Both are kept because the
pre-flight rule preserves an established font stack over the skill's preference,
and because they are already loaded via `next/font` with no CLS. If the brand ever
wants the upgrade, the editorial-luxury pairing is **Cormorant Garamond display +
EB Garamond body**, or a lighter-touch swap of Lato → **Switzer**. That is a brand
decision, not a Hallmark one.

## Spacing

4-point named scale, ten steps, in [`tokens.css`](tokens.css). Pages use named
tokens (`var(--space-xl)`) or their Tailwind aliases — never raw px.

**Vary the rhythm.** If every gap in a section is the same step, the section reads
as a template. Section padding is `--space-3xl` on marketing pages, `--space-2xl`
on catalogue pages, and deliberately *uneven* between adjacent sections.

## Motion

Motion on this project is **opt-in and granted** — the user asked for it on
2026-10-05. Atelier's duration scale is 1.3× (generous, gentle).

- **Easings:** `--ease-out` entering, `--ease-in` leaving, `--ease-in-out` toggles.
  Never the browser `ease`. Never an overshoot curve.
- **Durations:** `--dur-micro` 120ms, `--dur-short` 240ms, `--dur-long` 480ms.
  Exits run ~75% of their enter.
- **Exactly three primitives, project-wide.** A fourth is not permitted without
  amending this file:
  1. `reveal` — one-shot IntersectionObserver stagger, 60ms by DOM index, capped
     at 500ms total, `opacity` + `translateY(8px)`. Fires **once**; never re-fires.
  2. `lift` — primary CTA and catalogue cards: `translateY(-1.5px)` on hover and
     on `:focus-visible`, `translateY(0)` over 60ms on `:active`. One signal only
     — no simultaneous scale, shadow, and colour change.
  3. `nav-retract` — N12: the whole header translates by `--banner-h` on
     scroll-down, returns on scroll-up.

  **Scoped exception — `marquee`.** *Amended 2026-10-05.* The Google-review strip
  in `TestimonialsSection` keeps its horizontal marquee. It is content in motion,
  not decoration: it carries the reviews themselves, it ships a visible
  pause/resume control (WCAG 2.2.2), it pauses on hover, and it stops entirely
  under `prefers-reduced-motion`. `linear` is the correct timing function here —
  it is one of the two cases the easing ban exempts. This exception is scoped to
  that one component; it does not license a fourth primitive anywhere else.

  Modal open/close (the gallery lightbox) is **not** counted as a primitive — it
  is an interaction recipe from `microinteractions.md`, like a button press.
- **Animate `transform` and `opacity` only.** Never width, height, top, margin.
- **Reveal pattern:** fade + 8px rise. Content pages get **no** reveals.
- **Reduced-motion fallback:** all spatial motion collapses to a ≤150ms opacity
  crossfade. Focus rings never animate — they appear instantly, always.

## Microinteractions stance

- **Silent success.** A visible result needs no toast. Toasts are for failures.
- **Hover delay 800ms · focus delay 0ms** on tooltips. They are different intents.
- **Focus rings** 2px `--color-focus`, `outline-offset: 3px`, on `:focus-visible`,
  never animated in.
- **Hit targets** ≥44×44 CSS px on touch.
- **No state carried by colour alone** — pair with an icon, text, or weight.
- **Every hover affordance has a focus and a coarse-pointer equivalent.**

## CTA voice

- **Primary** — `--radius-pill`, **solid** `--color-gold` fill, `--color-ink`
  label, uppercase, `+0.12em` tracking, 1px `--color-gold-pale` hairline.
  Gradient fills on a pill are banned under editorial. One primary per view.
- **Secondary** — `--radius-pill`, transparent, 1px `--color-rule` border,
  `--color-ink` label. Used for Call and Directions.
- **Tertiary** — C3 typographic link: the word, an arrow, a 1px underline at
  `--color-accent`. No box. This is the default for in-card actions.
- **Copy pattern** — imperative verb, ≤3 words: *Book now · Call us · View prices*.
  Never *Learn more*, never *Get started today*.

## Per-page allowances

- Marketing pages MAY use enrichment — but on this project enrichment is
  **real salon photography only**. No generated imagery, no CSS blobs, no stock.
- Service and media pages: photography + typography.
- Content pages: typography only.
- Transactional pages: no enrichment, no reveals.

## What pages MUST share

- The wordmark (Playfair 600) and its placement.
- The accent colour and its ≤3% budget; gold reserved for one CTA per view.
- The display + body fonts.
- The CTA voice — pill radius, solid gold, ink label, uppercase tracking.
- The section-head pattern: **S2 Hanging**, left-aligned, no rule, no ornament.
- The focus ring token and offset.
- `tabular-nums` on all numerals.

## What pages MAY differ on

- Macrostructure, within the family this file assigns to the page's type.
- Hero archetype on marketing pages.
- Which blocks carry photography and which carry copy.
- Grid density on catalogue and media pages (3-up / 4-up).

## Banned on this project

These are the patterns the pre-redesign site shipped. They do not come back.

- **Centred-heading → ornament-divider → equal-card-grid** as a section default.
  The `.section-divider` diamond is retired.
- **N1a nav** (wordmark + inline link row + button-right) and **Ft3 footer**
  (link columns + social row + tiny copyright).
- **Eyebrows / section tags.** Zero per page. Numbering only where content is
  genuinely ordinal. The tag-left / heading-right two-column head is banned outright.
- **Italic headings**, including one italicised word inside a roman head.
- **Gradient fills on pill buttons.** Gradient text fills. Three-stop gradients.
- **Glassmorphism** — `backdrop-blur` panels as decoration. The medium is paper.
- **Overshoot easings** — `cubic-bezier(0.34, 1.56, 0.64, 1)` and relatives.
- **Stacked animations on one element.** The hero CTA previously ran a shimmer
  sweep, two twinkle loops, and three glyphs at once.
- **Pure `#000` / `#fff`.** Every neutral carries the anchor's tint.
- **Raw colour or font values outside `tokens.css`.**
- **Invented numbers.** The rating and review count are fetched from Google
  Places. If the fetch fails, the fallback is the last known real value, never a
  rounder, nicer one.

## SEO contract

The redesign must not regress any of this. Verify after every page change.

- One `<h1>` per route, carrying the route's primary keyword.
- `h1 → h2 → h3` with no skipped level; section heads are real `<h2>`s.
- Self-canonical on every route; hreflang `en`/`es`/`vi` + `x-default` on
  translated routes only; `noindex, follow` on untranslated locale variants.
  The helpers in `src/lib/i18nMeta.js` own this — do not hand-roll alternates.
- JSON-LD preserved: `NailSalon` (+ `AggregateRating` from Google Places),
  `Organization`, `WebSite`, `Service`, `FAQPage`, `VideoObject`, `Offer`,
  `BreadcrumbList`. Breadcrumbs on every route below the root.
- LCP element keeps `priority` / `fetchPriority="high"`. Never `loading="lazy"`
  on a hero image.
- Decorative imagery carries `alt=""` + `aria-hidden`; content imagery carries a
  descriptive, non-keyword-stuffed `alt`.

## Two sanctioned exceptions to the token rule

`tokens.css` is the only place a colour value may be written, with exactly two
exceptions. Both are verified in the build audit; a third is a defect.

1. **Google's brand mark** (`WhyLoveSection`, `TestimonialsSection`) keeps its own
   `#4285F4 / #34A853 / #FBBC05 / #EA4335`. Recolouring it to the palette would
   misrepresent where the rating comes from.
2. **`themeColor` in `[locale]/layout.jsx`** must be a literal hex — a `<meta>`
   tag cannot read a CSS custom property. It is `#27201D`, the sRGB value of
   `--color-paper-dark`. **If that token changes, change this too**, or the
   mobile status bar will seam against the nav.

## State of the redesign

**Done** — the system (`tokens.css`, this file, the Tailwind bridge), the N12
header, the Ft1 footer, every one of the home page's fifteen sections, the global
chrome (bottom tab bar, scroll-to-top, announcement bar), and the SEO work
(breadcrumbs on the five routes that lacked them, six keyword-bearing H2s in all
three locales).

**Not yet done** — the Services (Catalogue), Content (Long Document) and Media
(Portfolio Grid) families still carry the pre-redesign component voice. Known
specifics to fix when those are converted:

- `text-rose-gold` as *text* survives at ~146 call sites across ~38 files. On
  light paper that is 2.94:1, a WCAG failure. It cannot be fixed with a global
  find-and-replace, because 22 of those files also contain dark surfaces where
  the correct replacement is `text-gold`, not `text-accent-ink`. Each file needs
  reading.
- `backdrop-blur` (glassmorphism) remains on the services, booking, privacy,
  terms, gallery and blog page shells.
- Those pages still use centred heads and card grids rather than S2 + Catalogue.

## Exports

Drop-in formats for re-using this system.

### tokens.css

The canonical source: [`tokens.css`](tokens.css) at the project root, imported at
the top of `src/app/globals.css`.

### Tailwind v3 bridge

This project is Tailwind **v3.4**, so there is no `@theme` block. `tailwind.config.js`
aliases the tokens instead, which keeps utilities and tokens from drifting apart:

```js
theme: {
  extend: {
    colors: {
      paper: 'var(--color-paper)',
      ink: 'var(--color-ink)',
      accent: 'var(--color-accent)',
      gold: 'var(--color-gold)',
      /* ...one alias per --color-* token */
    },
    fontFamily: {
      display: ['var(--font-display)'],
      sans: ['var(--font-body)'],
    },
    spacing: { /* --space-* steps */ },
    transitionTimingFunction: { out: 'var(--ease-out)' },
  },
}
```

### DTCG `tokens.json`

```json
{
  "color": {
    "paper":      { "$value": "oklch(96.7% 0.005 34)", "$type": "color" },
    "ink":        { "$value": "oklch(34.5% 0.008 43)", "$type": "color" },
    "accent":     { "$value": "oklch(65.2% 0.025 38)", "$type": "color" },
    "accent-ink": { "$value": "oklch(48% 0.055 38)",   "$type": "color" },
    "gold":       { "$value": "oklch(76% 0.085 82)",   "$type": "color" },
    "focus":      { "$value": "oklch(62% 0.12 48)",    "$type": "color" }
  },
  "font": {
    "display": { "$value": "Playfair Display", "$type": "fontFamily" },
    "body":    { "$value": "Lato",             "$type": "fontFamily" }
  },
  "space": {
    "md": { "$value": "1rem",   "$type": "dimension" },
    "xl": { "$value": "2.5rem", "$type": "dimension" }
  }
}
```

## Amending this file

If a page genuinely needs something this file disallows, **amend this file
first** — add a per-page allowance or a `## Variants` section. Never override
locally. Local overrides are how a design system becomes a suggestion.
