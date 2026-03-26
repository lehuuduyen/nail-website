'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About', hashScrollId: 'about' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/booking', label: 'Book' },
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const name = process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-charcoal/85 backdrop-blur-md"
      suppressHydrationWarning
    >
      <div
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6"
        suppressHydrationWarning
      >
        <Link href="/" className="font-display text-xl tracking-tight text-cream md:text-2xl">
          {name}
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(({ href, label, hashScrollId }) => {
            const active = href.startsWith('/#')
              ? pathname === '/'
              : href === '/blog'
                ? pathname === '/blog' || pathname.startsWith('/blog/')
                : pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition ${
                  active ? 'text-rose-gold' : 'text-cream/80 hover:text-rose-gold'
                }`}
                onClick={(e) => {
                  if (!hashScrollId) return;
                  if (pathname === '/') {
                    e.preventDefault();
                    scrollToId(hashScrollId);
                  } else {
                    sessionStorage.setItem('homeScrollTarget', hashScrollId);
                  }
                }}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/booking"
            className="rounded-full bg-rose-gold px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-rose-gold-deep"
          >
            Book now
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
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/10 bg-charcoal px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-3">
            {links.map(({ href, label, hashScrollId }) => (
              <Link
                key={href}
                href={href}
                onClick={(e) => {
                  if (hashScrollId) {
                    if (pathname === '/') {
                      e.preventDefault();
                      scrollToId(hashScrollId);
                    } else {
                      sessionStorage.setItem('homeScrollTarget', hashScrollId);
                    }
                  }
                  setOpen(false);
                }}
                className="text-cream/90"
              >
                {label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
