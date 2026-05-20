'use client';

import Link from 'next/link';
import { CalendarHeart } from 'lucide-react';

export default function FloatingBookBtn() {
  return (
    <div className="fixed bottom-6 right-6 z-40 animate-float-in md:bottom-8 md:right-8">
      <Link
        href="/booking"
        className="flex items-center gap-2 rounded-full bg-rose-gold px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-charcoal/15 ring-2 ring-cream/40 transition hover:bg-rose-gold-deep"
      >
        <CalendarHeart size={20} />
        Book
      </Link>
    </div>
  );
}
