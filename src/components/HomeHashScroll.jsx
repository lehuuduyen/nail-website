'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Cuộn tới section khi vào home có #hash hoặc khi Navbar set sessionStorage
 * (Next.js Link /#about đôi khi không giữ hash sau client navigation).
 */
export default function HomeHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;

    const fromStorage = sessionStorage.getItem('homeScrollTarget');
    if (fromStorage) {
      sessionStorage.removeItem('homeScrollTarget');
      window.setTimeout(() => scrollToId(fromStorage), 0);
      return;
    }

    const hash = window.location.hash;
    if (hash.length > 1) {
      const id = decodeURIComponent(hash.slice(1));
      window.setTimeout(() => scrollToId(id), 0);
    }
  }, [pathname]);

  return null;
}
