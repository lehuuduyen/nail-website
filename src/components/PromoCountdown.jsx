'use client';

import { useEffect, useState } from 'react';

/**
 * FOMO countdown for the new-customer promo. Counts down to the end of the
 * current week (Sunday 23:59:59 salon time) and rolls over automatically each
 * Monday — the admin only toggles it on/off, no dates to maintain.
 *
 * Arizona (America/Phoenix) never observes DST, so a fixed UTC-7 offset is
 * safe and avoids Intl timezone parsing on every tick.
 */
const PHX_OFFSET_MS = 7 * 60 * 60 * 1000;

/** ms from `nowMs` until next Monday 00:00 Phoenix time (= end of Sunday). */
function msUntilWeekEnd(nowMs) {
  const phx = new Date(nowMs - PHX_OFFSET_MS); // read UTC fields as Phoenix local
  const daysToMonday = ((7 - phx.getUTCDay()) % 7) + 1;
  const target =
    Date.UTC(phx.getUTCFullYear(), phx.getUTCMonth(), phx.getUTCDate() + daysToMonday) +
    PHX_OFFSET_MS;
  return Math.max(0, target - nowMs);
}

function splitParts(ms) {
  const totalSecs = Math.floor(ms / 1000);
  return {
    days: Math.floor(totalSecs / 86400),
    hours: Math.floor((totalSecs % 86400) / 3600),
    mins: Math.floor((totalSecs % 3600) / 60),
    secs: totalSecs % 60,
  };
}

const pad = (n) => String(n).padStart(2, '0');

/** Theme per surface: `dark` = charcoal promo card, `light` = cream booking callout. */
const VARIANTS = {
  dark: {
    endsIn: 'text-rose-gold',
    colon: 'text-rose-gold/70',
    box: 'border-rose-gold/40 bg-cream/10 backdrop-blur-sm',
    digit: 'text-cream',
    unit: 'text-cream/60',
  },
  light: {
    endsIn: 'text-rose-gold-deep',
    colon: 'text-rose-gold-deep/70',
    box: 'border-rose-gold/40 bg-white',
    digit: 'text-ink',
    unit: 'text-muted',
  },
};

/**
 * @param {{
 *   labels: { endsIn: string, days: string, hours: string, mins: string, secs: string },
 *   variant?: 'dark' | 'light',
 *   compact?: boolean,
 * }} props
 * Labels come from the server parent so this stays a tiny client island
 * without pulling next-intl into the bundle.
 */
export default function PromoCountdown({ labels, variant = 'dark', compact = false }) {
  const v = VARIANTS[variant] || VARIANTS.dark;
  // null until mounted so SSR/hydration markup match; boxes render "--" first paint.
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    const tick = () => setRemaining(msUntilWeekEnd(Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const parts = remaining == null ? null : splitParts(remaining);
  const cells = [
    { value: parts ? String(parts.days) : '--', label: labels.days },
    { value: parts ? pad(parts.hours) : '--', label: labels.hours },
    { value: parts ? pad(parts.mins) : '--', label: labels.mins },
    { value: parts ? pad(parts.secs) : '--', label: labels.secs },
  ];

  return (
    <div className={compact ? 'mt-3' : 'mt-5'} role="timer" aria-live="off">
      <p
        className={`flex items-center gap-2 font-bold uppercase ${v.endsIn} ${
          compact ? 'text-[10px] tracking-[0.14em]' : 'text-[11px] tracking-[0.18em]'
        }`}
      >
        <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-gold opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-gold" />
        </span>
        {labels.endsIn}
      </p>
      <div className={`mt-2.5 flex items-center ${compact ? 'gap-1' : 'gap-1.5 sm:gap-2'}`}>
        {cells.map((cell, i) => (
          <div key={cell.label} className={`flex items-center ${compact ? 'gap-1' : 'gap-1.5 sm:gap-2'}`}>
            {i > 0 && (
              <span
                aria-hidden="true"
                className={`pb-4 font-bold ${v.colon} ${compact ? 'text-base' : 'text-lg'}`}
              >
                :
              </span>
            )}
            <div
              className={`flex flex-col items-center rounded-xl border px-1 ${v.box} ${
                compact ? 'w-11 py-1.5' : 'w-14 py-2 sm:w-16'
              }`}
            >
              <span
                className={`font-display font-bold tabular-nums ${v.digit} ${
                  compact ? 'text-base' : 'text-xl sm:text-2xl'
                }`}
              >
                {cell.value}
              </span>
              <span
                className={`mt-0.5 font-semibold uppercase tracking-wider ${v.unit} ${
                  compact ? 'text-[8px]' : 'text-[9px] sm:text-[10px]'
                }`}
              >
                {cell.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
