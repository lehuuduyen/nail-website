/* Hallmark · design-system: design.md · designed-as-app
 *
 * This file holds NO colour values. Every entry aliases a token from
 * ./tokens.css, so a utility and a raw CSS rule can never drift apart.
 *
 * Colours point at the --ch-* CHANNEL tokens, not the composed --color-* ones.
 * Tailwind v3 can only honour an opacity modifier (border-rose-gold/30, used 176
 * times in src/) when the colour string carries the <alpha-value> placeholder;
 * given a whole var(--color-x) it drops the alpha silently and the hairline turns
 * solid. Plain CSS keeps using the composed var(--color-x) form.
 *
 * Legacy aliases (rose-gold, cream, charcoal, …) are kept deliberately: they are
 * used ~1,800 times across src/. Renaming them would be a mechanical churn with
 * no design benefit. They now resolve to the same tokens the stylesheet uses.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ---- System names (prefer these in new code) ---- */
        paper: 'oklch(var(--ch-paper) / <alpha-value>)',
        'paper-2': 'oklch(var(--ch-paper-2) / <alpha-value>)',
        'paper-3': 'oklch(var(--ch-paper-3) / <alpha-value>)',
        'paper-dark': 'oklch(var(--ch-paper-dark) / <alpha-value>)',
        'paper-dark-2': 'oklch(var(--ch-paper-dark-2) / <alpha-value>)',
        rule: 'oklch(var(--ch-rule) / <alpha-value>)',
        'rule-soft': 'oklch(var(--ch-rule-soft) / <alpha-value>)',
        'rule-dark': 'oklch(var(--ch-rule-dark) / <alpha-value>)',
        'ink-2': 'oklch(var(--ch-ink-2) / <alpha-value>)',
        'on-dark': 'oklch(var(--ch-ink-on-dark) / <alpha-value>)',
        'on-dark-2': 'oklch(var(--ch-ink-on-dark-2) / <alpha-value>)',
        accent: 'oklch(var(--ch-accent) / <alpha-value>)',
        'accent-deep': 'oklch(var(--ch-accent-deep) / <alpha-value>)',
        /* The only accent that may carry text on light paper — 6.07:1 */
        'accent-ink': 'oklch(var(--ch-accent-ink) / <alpha-value>)',
        gold: 'oklch(var(--ch-gold) / <alpha-value>)',
        'gold-hover': 'oklch(var(--ch-gold-hover) / <alpha-value>)',
        'gold-pale': 'oklch(var(--ch-gold-pale) / <alpha-value>)',
        focus: 'oklch(var(--ch-focus) / <alpha-value>)',

        /* ---- Legacy aliases → same tokens ---- */
        'rose-gold': 'oklch(var(--ch-accent) / <alpha-value>)',
        'rose-gold-deep': 'oklch(var(--ch-accent-deep) / <alpha-value>)',
        cream: 'oklch(var(--ch-paper) / <alpha-value>)',
        'cream-dark': 'oklch(var(--ch-paper-2) / <alpha-value>)',
        surface: 'oklch(var(--ch-surface) / <alpha-value>)',
        'surface-soft': 'oklch(var(--ch-paper-2) / <alpha-value>)',
        'dusty-rose': 'oklch(var(--ch-paper-3) / <alpha-value>)',
        lavender: 'oklch(var(--ch-rule) / <alpha-value>)',
        'lavender-deep': 'oklch(var(--ch-rule) / <alpha-value>)',
        charcoal: 'oklch(var(--ch-ink) / <alpha-value>)',
        ink: 'oklch(var(--ch-ink) / <alpha-value>)',
        muted: 'oklch(var(--ch-ink-2) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-body)'],
      },
      fontSize: {
        /* 1.25 major third — see tokens.css */
        'step-xs': 'var(--text-xs)',
        'step-sm': 'var(--text-sm)',
        'step-base': 'var(--text-base)',
        'step-md': 'var(--text-md)',
        'step-lg': 'var(--text-lg)',
        'step-xl': 'var(--text-xl)',
        'step-2xl': 'var(--text-2xl)',
        'step-3xl': 'var(--text-3xl)',
        display: 'var(--text-display)',
        'display-s': 'var(--text-display-s)',
      },
      spacing: {
        '3xs': 'var(--space-3xs)',
        '2xs': 'var(--space-2xs)',
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
        xl: 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
        '4xl': 'var(--space-4xl)',
      },
      borderRadius: {
        card: 'var(--radius-card)',
        pill: 'var(--radius-pill)',
        input: 'var(--radius-input)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        in: 'var(--ease-in)',
        'in-out': 'var(--ease-in-out)',
      },
      transitionDuration: {
        micro: 'var(--dur-micro)',
        short: 'var(--dur-short)',
        long: 'var(--dur-long)',
      },
      /* No backgroundImage entries. All four pre-redesign gradients are gone:
         hero-gradient (4 stops) → .hero-scrim, two token stops via color-mix.
         cta-gold (4 stops)      → was already dead code, never referenced.
         marble-cta (4 stops)    → BookingCtaBanner is a solid .band-dark now.
         luxury-gold (4 stops)   → the gradient pill is banned under editorial;
                                   both users are .btn-gold (solid fill, ink label).
         Two-stop gradients are still allowed on bands — none are needed. */
    },
  },
  plugins: [],
};
