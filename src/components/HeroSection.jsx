'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { HERO_IMAGE } from '@/lib/siteImages';

const HERO_MOTION_TRANSITION = { duration: 0.4, ease: 'easeOut' };

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const name = process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';
  const rawPhone = process.env.NEXT_PUBLIC_SALON_PHONE || '(602)1234567';
  const phoneDisplay = formatUsPhoneDisplay(rawPhone);
  const tel = `tel:${rawPhone.replace(/\D/g, '')}`;

  const headline = 'Luxury Nails That Turn Heads';
  const subline = 'Top-rated nail salon in Phoenix • Book in 60 seconds';

  /** Skip entrance animations on small viewports — less main-thread work for Speed Index */
  const skipInitial = isMobile;

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
          priority={true}
          fetchPriority="high"
          loading="eager"
          quality={75}
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
            <motion.div
              className="max-w-xl text-left"
              initial={false}
            >
              <motion.h1
                className="font-display text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-[#F5F5F5] drop-shadow-[0_1px_24px_rgba(0,0,0,0.35)] sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.06]"
                initial={skipInitial ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={HERO_MOTION_TRANSITION}
              >
                {headline}
              </motion.h1>
              <motion.p
                className="mt-3 max-w-md font-sans text-xs font-light leading-relaxed text-[#D1D1D1] sm:text-sm md:text-sm"
                initial={skipInitial ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={HERO_MOTION_TRANSITION}
              >
                {subline}
              </motion.p>
              <motion.div
                className="mt-6 w-full min-w-0 max-w-full sm:mt-8 sm:max-w-md"
                initial={skipInitial ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={HERO_MOTION_TRANSITION}
              >
                <div className="flex w-full min-w-0 flex-col gap-1.5 rounded-full border border-white/20 bg-white/15 p-1 backdrop-blur-md sm:gap-2 sm:p-1.5 sm:flex-row sm:items-stretch">
                  <Link
                    href="/booking"
                    className="relative inline-flex min-h-[44px] min-w-0 flex-1 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#C9932A] via-[#E8C547] to-[#B8821E] px-[clamp(0.75rem,4vw,1.5rem)] py-2.5 text-center font-sans text-[clamp(9px,2.9vw,11px)] font-bold uppercase tracking-[0.12em] text-white no-underline shadow-[0_0_14px_rgba(212,175,55,0.4),inset_0_1px_0_rgba(255,255,255,0.28)] transition hover:brightness-110 hover:shadow-[0_0_24px_rgba(212,175,55,0.55)] sm:min-h-0 sm:px-6 sm:py-3 sm:text-[11px] sm:tracking-[0.18em] sm:shadow-[0_0_18px_rgba(212,175,55,0.45),inset_0_1px_0_rgba(255,255,255,0.3)] sm:hover:shadow-[0_0_28px_rgba(212,175,55,0.65)]"
                  >
                    <span
                      className="pointer-events-none absolute inset-0 -skew-x-12 animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      aria-hidden
                    />
                    <span
                      className="absolute left-2 top-1.5 animate-twinkle text-[6px] text-white/80 sm:left-3 sm:top-2 sm:text-[8px]"
                      aria-hidden
                    >
                      ✦
                    </span>
                    <span
                      className="absolute bottom-1.5 right-2 animate-twinkle-delay text-[6px] text-white/60 sm:bottom-2 sm:right-4 sm:text-[7px]"
                      aria-hidden
                    >
                      ✦
                    </span>
                    <span
                      className="absolute right-2 top-1 animate-twinkle text-[5px] text-yellow-200/70 sm:right-3 sm:top-1.5 sm:text-[6px]"
                      aria-hidden
                    >
                      ★
                    </span>
                    <span className="relative z-10 px-1">BOOK NOW</span>
                  </Link>
                  <a
                    href={tel}
                    className="flex min-h-[44px] min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full bg-white/35 px-[clamp(0.625rem,3.5vw,1.25rem)] py-2.5 font-sans text-[clamp(0.7rem,3.4vw,0.875rem)] font-semibold tabular-nums leading-none text-[#2D1F0F] no-underline backdrop-blur-sm transition hover:bg-white/45 sm:min-h-0 sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
                  >
                    <Phone
                      className="h-3.5 w-3.5 shrink-0 text-[#7A5C10] sm:h-4 sm:w-4"
                      strokeWidth={2}
                      aria-hidden
                    />
                    {phoneDisplay}
                  </a>
                </div>
              </motion.div>
              <motion.p
                className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-xs font-normal text-[#D1D1D1]/75"
                initial={skipInitial ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={HERO_MOTION_TRANSITION}
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
            </motion.div>
            <div className="hidden min-h-[1px] md:block" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
