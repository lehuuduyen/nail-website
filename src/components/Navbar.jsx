'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { salonPhone, salonMapsUrl } from '@/lib/salon';
import { trackEvent } from '@/lib/analytics';
import LanguageSwitcher from '@/components/LanguageSwitcher';

/**
 * The bar half of N12 (the banner half is AnnouncementBar; SiteHeader couples them
 * and owns the retract). design.md § Macrostructure families.
 *
 * Deliberate changes from the pre-redesign bar, all of them rule-driven:
 * - Opaque --color-paper-dark instead of charcoal/85 + backdrop-blur. Editorial
 *   bans glassmorphism outright: the medium is paper, not glass.
 * - Active link and hover are --color-gold (7.42:1 on the dark band). The brand
 *   vein was 3.57:1 there, which fails body text.
 * - Book is .btn-gold — solid gold, ink label, 5.34:1. It was white on vein at
 *   3.08:1, and a gradient-filled pill is banned under editorial anyway.
 * - Every link carries whitespace-nowrap (gate 49: clickable text never wraps).
 */

const links = [
  { href: '/', key: 'home' },
  { href: '/#about', key: 'about', hashScrollId: 'about' },
  { href: '/services', key: 'services' },
  { href: '/gallery', key: 'gallery' },
  { href: '/blog', key: 'blog' },
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const name = process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';
  const tel = salonPhone().replace(/\D/g, '');
  const mapsUrl = salonMapsUrl();

  // In-page anchors (/#about) are never "current": they point at a section of the
  // page you are already on. Treating them as active marked both Home and About
  // at once, which the new gold underline made obvious — and aria-current="page"
  // on two links at the same time is wrong for assistive tech either way.
  const isActive = (href, hashScrollId) => {
    if (href.startsWith('/#') || hashScrollId) return false;
    if (href === '/blog') return pathname === '/blog' || pathname.startsWith('/blog/');
    return pathname === href;
  };

  const handleHashClick = (e, hashScrollId) => {
    if (!hashScrollId) return;
    if (pathname === '/') {
      e.preventDefault();
      scrollToId(hashScrollId);
    } else {
      sessionStorage.setItem('homeScrollTarget', hashScrollId);
    }
  };

  const deskLink =
    'whitespace-nowrap text-step-sm font-medium transition-colors duration-short ease-out';

  return (
    <header className="border-b border-rule-dark bg-paper-dark" suppressHydrationWarning>
      <div
        className="mx-auto flex max-w-6xl items-center justify-between gap-md px-4 py-3 md:px-6"
        suppressHydrationWarning
      >
        {/* shrink-0 + nowrap: every nav item is nowrap, so the wordmark was the
            only flexible child and flex crushed it to 56px — "Nice Nails & Spa"
            wrapped onto four lines and the header grew to 253px tall. */}
        <Link
          href="/"
          className="shrink-0 whitespace-nowrap font-display text-step-lg tracking-tight text-on-dark md:text-step-xl"
        >
          {name}
        </Link>

        <nav className="hidden min-w-0 items-center gap-md md:flex lg:gap-lg">
          {links.map(({ href, key, hashScrollId }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href, hashScrollId) ? 'page' : undefined}
              className={`${deskLink} ${
                isActive(href, hashScrollId)
                  ? 'text-gold underline decoration-gold decoration-1 underline-offset-[6px]'
                  : 'text-on-dark hover:text-gold'
              }`}
              onClick={(e) => handleHashClick(e, hashScrollId)}
            >
              {t(key)}
            </Link>
          ))}
          <a
            href={`tel:${tel}`}
            onClick={() => trackEvent('call_click', { location: 'nav' })}
            className={`${deskLink} text-on-dark hover:text-gold`}
          >
            {t('call')}
          </a>
          {/* Directions is the one item that earns dropping between md and lg:
              the address links to Maps in the footer and the map section too. */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('directions_click', { location: 'nav' })}
            className={`${deskLink} hidden text-on-dark hover:text-gold lg:inline`}
          >
            {t('directions')}
          </a>
          <LanguageSwitcher />
          {/* Tighter horizontal padding than the page-level CTA — a nav button
              does not need --space-xl on each side. */}
          <Link
            href="/booking"
            onClick={() => trackEvent('book_click', { location: 'nav' })}
            className="btn-gold shrink-0 !px-lg"
          >
            {t('book')}
          </Link>
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-input text-on-dark md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
        </button>
      </div>

      {open && (
        <div className="animate-nav-dropdown border-t border-rule-dark bg-paper-dark px-4 py-md md:hidden">
          <div className="flex flex-col gap-sm">
            {links.map(({ href, key, hashScrollId }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href, hashScrollId) ? 'page' : undefined}
                onClick={(e) => {
                  handleHashClick(e, hashScrollId);
                  setOpen(false);
                }}
                className={`flex min-h-11 items-center whitespace-nowrap ${
                  isActive(href, hashScrollId) ? 'text-gold' : 'text-on-dark'
                }`}
              >
                {t(key)}
              </Link>
            ))}
            <a
              href={`tel:${tel}`}
              onClick={() => {
                trackEvent('call_click', { location: 'nav_mobile' });
                setOpen(false);
              }}
              className="flex min-h-11 items-center whitespace-nowrap text-on-dark"
            >
              {t('call')}
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('directions_click', { location: 'nav_mobile' });
                setOpen(false);
              }}
              className="flex min-h-11 items-center whitespace-nowrap text-on-dark"
            >
              {t('directions')}
            </a>
            <Link
              href="/booking"
              onClick={() => {
                trackEvent('book_click', { location: 'nav_mobile' });
                setOpen(false);
              }}
              className="btn-gold mt-xs self-start"
            >
              {t('book')}
            </Link>
            <div className="pt-xs">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
