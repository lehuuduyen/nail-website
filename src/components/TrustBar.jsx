'use client';

import Link from 'next/link';
import { Phone, Star, StarHalf } from 'lucide-react';

function GoogleLogo({ className = 'h-6 w-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function TrustBar() {
  const rawPhone = process.env.NEXT_PUBLIC_SALON_PHONE || '(602) 759-9184';
  const tel = `tel:${rawPhone.replace(/\D/g, '')}`;

  return (
    <div className="relative z-20 -mt-10 flex justify-center px-4 md:-mt-[40px]">
      <div
        className="flex w-full max-w-[680px] flex-col gap-4 rounded-[50px] border border-rose-gold/20 bg-surface/90 px-6 py-4 shadow-[0_8px_32px_rgba(42,38,34,0.08)] backdrop-blur-md md:flex-row md:items-center md:justify-between md:gap-0 md:px-8 md:py-4"
      >
        {/* Desktop / tablet: Google + stars */}
        <div className="hidden flex-1 flex-col items-center border-charcoal/10 md:flex md:items-start md:border-r md:pr-6">
          <div className="flex items-center gap-2">
            <GoogleLogo className="h-7 w-7 shrink-0" />
            <div className="flex items-center gap-0.5 text-rose-gold">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} aria-hidden />
              ))}
              <StarHalf className="h-4 w-4 fill-current" strokeWidth={0} aria-hidden />
            </div>
          </div>
          <p className="mt-1.5 text-center text-xs text-muted md:text-left">
            ★ 656+ happy clients
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-3 md:border-r md:border-charcoal/10 md:px-6">
          <Link
            href="/booking"
            className="inline-flex w-full max-w-[220px] items-center justify-center rounded-full bg-luxury-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-md no-underline transition hover:opacity-95 md:w-auto"
          >
            Book now
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center gap-2 md:justify-end md:pl-6">
          <Phone className="h-5 w-5 shrink-0 text-rose-gold" strokeWidth={1.75} aria-hidden />
          <a
            href={tel}
            className="text-sm font-medium text-ink transition hover:text-rose-gold"
          >
            {rawPhone}
          </a>
        </div>
      </div>
    </div>
  );
}
