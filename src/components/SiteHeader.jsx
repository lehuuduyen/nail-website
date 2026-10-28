'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import { isPromoLive } from '@/lib/promos';

/**
 * N12 · announcement banner + retracting nav (design.md § Macrostructure families).
 *
 * One coupled unit: a gold promo banner stacked above one real nav bar. Scrolling
 * down past the threshold translates the whole shell up by the banner's height, so
 * the bar docks to the top and the banner slides out of view; scrolling back up
 * returns it. Dismissing the banner zeroes --banner-h on this element, so the
 * calc() reflows with no leftover gap.
 *
 * The banner is a banner, not a second nav — one line, one link, one dismiss. The
 * gold-on-dark contrast is what stops the pair reading as two stacked navs.
 */
export default function SiteHeader({ promo }) {
  // Computed the same way AnnouncementBar decides to render, so the shell and the
  // banner never disagree about whether a banner exists on the first paint.
  const [hasBanner, setHasBanner] = useState(() => Boolean(promo) && isPromoLive(promo));
  const [compact, setCompact] = useState(false);
  const bannerRef = useRef(null);
  const [bannerH, setBannerH] = useState(null);

  // Stable identity: AnnouncementBar lists it in a dependency array, and an inline
  // arrow would re-run that effect on every render of this shell.
  const handleBannerHidden = useCallback(() => setHasBanner(false), []);

  // Measure the real rendered height instead of trusting the 40px token: the promo
  // title wraps at 320px, and a hard-coded height would leave a visible gap there.
  useLayoutEffect(() => {
    const el = bannerRef.current;
    if (!el || !hasBanner) {
      setBannerH(null);
      return;
    }
    const measure = () => setBannerH(el.offsetHeight || null);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [hasBanner]);

  useEffect(() => {
    if (!hasBanner) {
      setCompact(false);
      return;
    }
    let last = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        // Near the top the banner is always shown, whatever the direction.
        if (y < 48) setCompact(false);
        else if (y > last + 4) setCompact(true);
        else if (y < last - 4) setCompact(false);
        last = y;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [hasBanner]);

  const style = {};
  if (!hasBanner) style['--banner-h'] = '0px';
  else if (bannerH) style['--banner-h'] = `${bannerH}px`;

  return (
    <div
      id="site-header"
      className={`nav-shell${compact ? ' is-compact' : ''}${hasBanner ? '' : ' is-dismissed'}`}
      style={style}
    >
      <div ref={bannerRef} className="nav-banner">
        <AnnouncementBar promo={promo} onHidden={handleBannerHidden} />
      </div>
      <Navbar />
    </div>
  );
}
