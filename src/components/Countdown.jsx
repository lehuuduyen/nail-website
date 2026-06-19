'use client';

import { useEffect, useState } from 'react';

/** Phoenix is UTC-7 year-round (no DST) → end of endDate day = 23:59:59 -07:00. */
function targetMs(endDate) {
  return new Date(`${String(endDate).slice(0, 10)}T23:59:59-07:00`).getTime();
}

function parts(diff) {
  const clamp = Math.max(0, diff);
  return {
    d: Math.floor(clamp / 86400000),
    h: Math.floor((clamp % 86400000) / 3600000),
    m: Math.floor((clamp % 3600000) / 60000),
    s: Math.floor((clamp % 60000) / 1000),
  };
}

const PLACEHOLDER = { d: '--', h: '--', m: '--', s: '--' };

function Cell({ value, label }) {
  const text = typeof value === 'number' ? String(value).padStart(2, '0') : value;
  return (
    <div className="flex flex-col items-center">
      <span className="min-w-[3.25rem] rounded-xl bg-charcoal px-3 py-2 text-center font-display text-2xl tabular-nums text-cream md:text-3xl">
        {text}
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
    </div>
  );
}

/**
 * Live countdown to the end of `endDate` (Phoenix time).
 * Renders stable placeholders during SSR / first paint to avoid hydration mismatch + CLS,
 * then ticks every second on the client.
 */
export default function Countdown({ endDate }) {
  const [t, setT] = useState(PLACEHOLDER);

  useEffect(() => {
    const target = targetMs(endDate);
    const tick = () => setT(parts(target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endDate]);

  return (
    <div role="timer" aria-label="Time left in this offer" className="flex items-start gap-3">
      <Cell value={t.d} label="Days" />
      <Cell value={t.h} label="Hrs" />
      <Cell value={t.m} label="Min" />
      <Cell value={t.s} label="Sec" />
    </div>
  );
}
