'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { salonPhone, salonMapsUrl } from '@/lib/salon';
import { trackEvent } from '@/lib/analytics';
import LanguageSwitcher from '@/components/LanguageSwitcher';

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

  const isActive = (href, hashScrollId) =>
    href.startsWith('/#') || hashScrollId
      ? pathname === '/'
      : href === '/blog'
        ? pathname === '/blog' || pathname.startsWith('/blog/')
        : pathname === href;

  const handleHashClick = (e, hashScrollId) => {
    if (!hashScrollId) return;
    if (pathname === '/') {
      e.preventDefault();
      scrollToId(hashScrollId);
    } else {
      sessionStorage.setItem('homeScrollTarget', hashScrollId);
    }
  };

  return (
    <header
      className="border-b border-white/10 bg-charcoal/85 backdrop-blur-md"
      suppressHydrationWarning
    >
      <div
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6"
        suppressHydrationWarning
      >
        <Link href="/" className="font-display text-xl tracking-tight text-cream md:text-2xl">
          {name}
        </Link>
        <nav className="hidden items-center gap-4 md:flex lg:gap-7">
          {links.map(({ href, key, hashScrollId }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition ${
                isActive(href, hashScrollId) ? 'text-rose-gold' : 'text-cream hover:text-rose-gold'
              }`}
              onClick={(e) => handleHashClick(e, hashScrollId)}
            >
              {t(key)}
            </Link>
          ))}
          <a
            href={`tel:${tel}`}
            onClick={() => trackEvent('call_click', { location: 'nav' })}
            className="text-sm font-medium text-cream transition hover:text-rose-gold"
          >
            {t('call')}
          </a>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('directions_click', { location: 'nav' })}
            className="text-sm font-medium text-cream transition hover:text-rose-gold"
          >
            {t('directions')}
          </a>
          <LanguageSwitcher />
          <Link
            href="/booking"
            onClick={() => trackEvent('book_click', { location: 'nav' })}
            className="rounded-full bg-rose-gold px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-rose-gold-deep"
          >
            {t('book')}
          </Link>
        </nav>
        <button
          type="button"
          className="rounded-lg p-2 text-cream md:hidden"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="animate-nav-dropdown border-t border-white/10 bg-charcoal px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map(({ href, key, hashScrollId }) => (
              <Link
                key={href}
                href={href}
                onClick={(e) => {
                  handleHashClick(e, hashScrollId);
                  setOpen(false);
                }}
                className="text-cream"
              >
                {t(key)}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => {
                trackEvent('book_click', { location: 'nav_mobile' });
                setOpen(false);
              }}
              className="font-semibold text-rose-gold"
            >
              {t('book')}
            </Link>
            <a
              href={`tel:${tel}`}
              onClick={() => {
                trackEvent('call_click', { location: 'nav_mobile' });
                setOpen(false);
              }}
              className="text-cream"
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
              className="text-cream"
            >
              {t('directions')}
            </a>
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
