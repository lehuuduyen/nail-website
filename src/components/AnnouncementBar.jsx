'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { X } from 'lucide-react';
import { isPromoLive } from '@/lib/promos';
import { trackEvent } from '@/lib/analytics';

/**
 * Sticky promo bar shown above the header on every page.
 * - Server passes the featured promo so it renders in the initial HTML (no flash-in).
 * - On mount we re-check the date guard (auto-expire even if HTML is cached) and the
 *   per-promo dismiss flag in localStorage (key promo_dismissed_<id>).
 * Renders nothing when there is no live promo — the bar takes no space.
 *
 * N12 banner (design.md § CTA voice): gold fill, ink label. It was white-on-vein
 * at 3.08:1 — a WCAG fail on a strip that sits on every page. onHidden lets
 * SiteHeader zero --banner-h so the retracting shell leaves no gap behind.
 */
export default function AnnouncementBar({ promo, onHidden }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!promo) return;
    // Safety guards in case the cached HTML is stale.
    if (!isPromoLive(promo)) {
      setHidden(true);
      onHidden?.();
      return;
    }
    try {
      if (localStorage.getItem(`promo_dismissed_${promo.id}`) === '1') {
        setHidden(true);
        onHidden?.();
      }
    } catch {
      /* localStorage unavailable — keep bar visible */
    }
  }, [promo, onHidden]);

  if (!promo || hidden) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(`promo_dismissed_${promo.id}`, '1');
    } catch {
      /* ignore */
    }
    setHidden(true);
    onHidden?.();
  };

  return (
    <div role="region" aria-label="Promotion" className="bg-gold text-ink">
      <div className="mx-auto flex max-w-6xl items-center gap-sm px-4 py-2 md:px-6">
        <p className="flex min-w-0 flex-1 items-center justify-center gap-xs text-center text-step-sm">
          {promo.badge && (
            <span className="hidden shrink-0 rounded-pill border border-ink/20 px-2 py-0.5 text-step-xs font-bold uppercase tracking-[0.12em] sm:inline">
              {promo.badge}
            </span>
          )}
          <span className="truncate font-medium">{promo.title}</span>
          {/* Bar is a teaser → always link to the event detail page, not the action link */}
          <Link
            href="/specials"
            onClick={() => trackEvent('promo_bar_click', { promo: promo.title })}
            className="shrink-0 whitespace-nowrap font-bold underline decoration-ink/40 underline-offset-2 transition-colors duration-short ease-out hover:decoration-ink"
          >
            {promo.ctaLabel}
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close announcement"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-pill text-ink transition-colors duration-short ease-out hover:bg-ink/10"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
