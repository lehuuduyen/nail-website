'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

/**
 * Nút "lên đầu trang" nhỏ xinh ở góc phải dưới — hiện ra sau khi cuộn xuống
 * một đoạn, bấm vào sẽ cuộn mượt về top.
 *
 * Vị trí được xếp chồng phía trên các thành phần cố định sẵn có để không che nhau:
 * - Mobile: nằm trên BottomTabBar (h-14 + safe-area).
 * - Desktop (md+): bottom-24 right-8 — FloatingBookBtn không còn được render
 *   (xem [locale]/layout.jsx), nên khoảng này giờ trống.
 */
export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    trackEvent('scroll_to_top_click', {});
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
      /* transition-all is banned (it animates properties that should be instant);
         the fill was white-on-vein at 3.08:1 and carried shadow + ring + colour
         swap on hover — three signals where one will do. */
      className={`fixed right-4 z-40 flex h-11 w-11 items-center justify-center rounded-pill border border-rule-dark bg-paper-dark text-on-dark transition-[opacity,transform] duration-short ease-out hover:-translate-y-0.5 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] md:bottom-24 md:right-8 ${
        visible ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ChevronUp size={22} strokeWidth={2.4} aria-hidden="true" />
    </button>
  );
}
