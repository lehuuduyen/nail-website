'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { isPromoLive } from '@/lib/promos';

/**
 * Sticky promo bar shown above the header on every page.
 * - Server passes the featured promo so it renders in the initial HTML (no flash-in).
 * - On mount we re-check the date guard (auto-expire even if HTML is cached) and the
 *   per-promo dismiss flag in localStorage (key promo_dismissed_<id>).
 * Renders nothing when there is no live promo — the bar takes no space.
 */
export default function AnnouncementBar({ promo }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!promo) return;
    // Safety guards in case the cached HTML is stale.
    if (!isPromoLive(promo)) {
      setHidden(true);
      return;
    }
    try {
      if (localStorage.getItem(`promo_dismissed_${promo.id}`) === '1') {
        setHidden(true);
      }
    } catch {
      /* localStorage unavailable — keep bar visible */
    }
  }, [promo]);

  if (!promo || hidden) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(`promo_dismissed_${promo.id}`, '1');
    } catch {
      /* ignore */
    }
    setHidden(true);
  };

  return (
    <div
      role="region"
      aria-label="Promotion"
      className="bg-rose-gold text-white"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 md:px-6">
        <p className="flex min-w-0 flex-1 items-center justify-center gap-2 text-center text-sm">
          {promo.badge && (
            <span className="hidden shrink-0 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide sm:inline">
              {promo.badge}
            </span>
          )}
          <span className="truncate font-medium">{promo.title}</span>
          <Link
            href={promo.ctaHref}
            className="shrink-0 font-semibold underline underline-offset-2 hover:text-white/80"
          >
            {promo.ctaLabel}
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close announcement"
          className="shrink-0 rounded-full p-1 text-white/90 transition hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
