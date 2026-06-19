'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Images, Phone, CalendarHeart } from 'lucide-react';
import { salonPhone } from '@/lib/salon';
import { trackEvent } from '@/lib/analytics';

const TABS = [
  { href: '/', label: 'Home', icon: Home, match: (p) => p === '/' },
  { href: '/gallery', label: 'Gallery', icon: Images, match: (p) => p === '/gallery' },
  { type: 'tel', label: 'Call', icon: Phone },
  { href: '/booking', label: 'Book', icon: CalendarHeart, match: (p) => p === '/booking' },
];

/**
 * App-style fixed bottom navigation — mobile only (hidden on md+).
 * Sits above the safe-area inset so it clears the iPhone home indicator.
 */
export default function BottomTabBar() {
  const pathname = usePathname();
  const tel = salonPhone().replace(/\D/g, '');

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-charcoal/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around">
        {TABS.map(({ href, label, icon: Icon, match, type }) => {
          const tabClass =
            'flex h-14 flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition';

          if (type === 'tel') {
            return (
              <li key="call" className="flex-1">
                <a
                  href={`tel:${tel}`}
                  onClick={() => trackEvent('call_click', { location: 'bottom_bar' })}
                  className={`${tabClass} text-cream/70 hover:text-cream`}
                >
                  <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                  {label}
                </a>
              </li>
            );
          }

          const active = match(pathname);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                onClick={
                  href === '/booking'
                    ? () => trackEvent('book_click', { location: 'bottom_bar' })
                    : undefined
                }
                className={`${tabClass} ${active ? 'text-rose-gold' : 'text-cream/70 hover:text-cream'}`}
              >
                <Icon size={22} strokeWidth={active ? 2.4 : 1.8} aria-hidden="true" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
