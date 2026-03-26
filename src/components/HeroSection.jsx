'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { HERO_IMAGE } from '@/lib/siteImages';

const SPARKLE_POS = [
  { top: '18%', left: '32%' },
  { top: '12%', left: '48%' },
  { top: '35%', left: '28%' },
  { top: '28%', left: '55%' },
];

function formatUsPhoneDisplay(raw) {
  const d = String(raw).replace(/\D/g, '');
  if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  return raw.trim() || '(602) 123-4567';
}

export default function HeroSection() {
  const name = process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';
  const rawPhone = process.env.NEXT_PUBLIC_SALON_PHONE || '(602)1234567';
  const phoneDisplay = formatUsPhoneDisplay(rawPhone);
  const tel = `tel:${rawPhone.replace(/\D/g, '')}`;

  const headline = 'Luxury Nails That Turn Heads';
  const subline = 'Top-rated nail salon in Phoenix • Book in 60 seconds';

  return (
    <section className="relative w-full overflow-hidden" suppressHydrationWarning>
      <div
        className="relative w-full min-h-[clamp(260px,72vw,440px)] overflow-hidden rounded-none bg-[#100d0c] sm:min-h-0 sm:aspect-[1024/420]"
        suppressHydrationWarning
      >
        <Image
          src={HERO_IMAGE.src}
          alt={`${name} — luxury nail salon Phoenix AZ`}
          title="Luxury manicure and nail art in Phoenix AZ"
          fill
          priority
          className="origin-center scale-[1.07] object-cover object-right"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 z-[1] bg-hero-gradient"
          suppressHydrationWarning
        />
        <div
          className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
          aria-hidden
        >
          {SPARKLE_POS.map((pos, i) => (
            <span
              key={i}
              className="absolute text-[10px] text-[#D4AF37]/40 md:text-xs"
              style={{ top: pos.top, left: pos.left }}
            >
              ✦
            </span>
          ))}
        </div>
        <div
          className="absolute inset-0 z-10 flex items-center"
          suppressHydrationWarning
        >
          <div className="grid w-full grid-cols-1 items-center gap-4 px-5 py-10 md:grid-cols-2 md:gap-6 md:px-10 md:py-8 lg:px-12">
            <div className="max-w-xl text-left">
              <motion.h1
                className="font-display text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-[#F5F5F5] drop-shadow-[0_1px_24px_rgba(0,0,0,0.35)] sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.06]"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                {headline}
              </motion.h1>
              <motion.p
                className="mt-3 max-w-md font-sans text-xs font-light leading-relaxed text-[#D1D1D1] sm:text-sm md:text-sm"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.65 }}
              >
                {subline}
              </motion.p>
              <motion.div
                className="mt-8 w-full max-w-md"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.6 }}
              >
                <div className="flex flex-col gap-2 rounded-full border border-white/20 bg-white/15 p-1.5 backdrop-blur-md sm:flex-row sm:items-stretch">
                  <Link
                    href="/booking"
                    className="relative inline-flex flex-1 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#C9932A] via-[#E8C547] to-[#B8821E] px-6 py-3.5 text-center font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-white no-underline shadow-[0_0_18px_rgba(212,175,55,0.45),inset_0_1px_0_rgba(255,255,255,0.3)] transition hover:brightness-110 hover:shadow-[0_0_28px_rgba(212,175,55,0.65)] sm:py-3"
                  >
                    <span
                      className="pointer-events-none absolute inset-0 -skew-x-12 animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      aria-hidden
                    />
                    <span
                      className="absolute left-3 top-2 animate-twinkle text-[8px] text-white/80"
                      aria-hidden
                    >
                      ✦
                    </span>
                    <span
                      className="absolute bottom-2 right-4 animate-twinkle-delay text-[7px] text-white/60"
                      aria-hidden
                    >
                      ✦
                    </span>
                    <span
                      className="absolute right-3 top-1.5 animate-twinkle text-[6px] text-yellow-200/70"
                      aria-hidden
                    >
                      ★
                    </span>
                    <span className="relative z-10">BOOK NOW</span>
                  </Link>
                  <a
                    href={tel}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white/35 px-5 py-3 font-sans text-sm font-semibold tabular-nums text-[#2D1F0F] no-underline backdrop-blur-sm transition hover:bg-white/45"
                  >
                    <Phone
                      className="h-4 w-4 shrink-0 text-[#7A5C10]"
                      strokeWidth={2}
                      aria-hidden
                    />
                    {phoneDisplay}
                  </a>
                </div>
              </motion.div>
              <motion.p
                className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-xs font-normal text-[#D1D1D1]/75"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.22, duration: 0.55 }}
              >
                <span className="text-[#D4AF37]" aria-hidden>
                  ✦
                </span>
                <span>5.0 rating</span>
                <span className="opacity-50" aria-hidden>
                  |
                </span>
                <span>656+ happy clients</span>
              </motion.p>
            </div>
            <div className="hidden min-h-[1px] md:block" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
