'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { HERO_BLUR_DATA_URL } from '@/lib/heroLcp';
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
  const address = process.env.NEXT_PUBLIC_SALON_ADDRESS || '8048 N 19th Ave, Phoenix, AZ 85021';
  const phoneDisplay = formatUsPhoneDisplay(rawPhone);
  const tel = `tel:${rawPhone.replace(/\D/g, '')}`;

  const headline = 'Luxury Nails That Turn Heads';
  const subline = 'Top-rated nail salon in Phoenix • Book in 60 seconds';

  return (
    <section className="relative w-full overflow-hidden" suppressHydrationWarning>
      <div
        className="relative w-full min-h-[clamp(340px,88vw,540px)] overflow-hidden rounded-none bg-[#100d0c] md:min-h-0 md:aspect-[2.15/1] lg:aspect-[2.5/1]"
        suppressHydrationWarning
      >
        <Image
          src={HERO_IMAGE.src}
          alt={`${name} — luxury nail salon Phoenix AZ`}
          title="Luxury manicure and nail art in Phoenix AZ"
          fill
          priority
          fetchPriority="high"
          loading="eager"
          quality={85}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={HERO_BLUR_DATA_URL}
          className="origin-center scale-[1.07] object-cover object-right"
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
              className="absolute text-[13px] text-[#D4AF37]/40 md:text-[19px]"
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
          <div className="grid w-full grid-cols-1 items-center gap-4 px-5 py-12 md:grid-cols-2 md:gap-6 md:px-10 md:py-16 lg:px-14">
            <div className="max-w-xl w-full text-left mx-auto px-2 sm:px-0">
              <h1
                className="hero-fade-up font-display text-balance text-2xl font-semibold leading-tight tracking-tight text-[#F5F5F5] drop-shadow-[0_1px_18px_rgba(0,0,0,0.40)] sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.06]"
              >
                {headline}
              </h1>
              <p className="hero-fade-up-d1 mt-2 max-w-full font-sans text-sm font-bold leading-snug text-[#EFEDEB] drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)] sm:mt-3 sm:text-[19px] md:text-[19px]">
                {subline}
              </p>
              <p className="hero-fade-up-d2 mt-2 max-w-full font-sans text-xs font-normal leading-relaxed text-[#EBE9E7] drop-shadow-[0_1px_3px_rgba(0,0,0,0.72)] sm:mt-3 sm:text-sm md:text-sm">
                {address}
              </p>

              <div className="hero-fade-up-d3 mt-5 w-full min-w-0 max-w-full sm:mt-8 sm:max-w-md">
                <div className="box-border flex w-full min-w-0 max-w-full flex-col gap-2 overflow-hidden rounded-2xl border border-white/20 bg-white/15 p-1.5 backdrop-blur-md sm:gap-2 sm:p-1.5 sm:flex-row sm:items-stretch">
                  <Link
                    href="/booking"
                    className="relative flex w-full min-w-0 max-w-full min-h-[44px] flex-1 shrink items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#C9932A] via-[#E8C547] to-[#B8821E] px-3 py-2 text-center font-sans text-[12px] font-bold uppercase tracking-[0.13em] text-white no-underline shadow-[0_0_10px_rgba(212,175,55,0.34),inset_0_1px_0_rgba(255,255,255,0.20)] transition hover:brightness-110 hover:shadow-[0_0_18px_rgba(212,175,55,0.38)] sm:min-h-0 sm:px-6 sm:py-3 sm:text-[11px] sm:tracking-[0.18em] sm:shadow-[0_0_18px_rgba(212,175,55,0.45),inset_0_1px_0_rgba(255,255,255,0.3)] sm:hover:shadow-[0_0_28px_rgba(212,175,55,0.65)]"
                  >
                    <span
                      className="pointer-events-none absolute inset-0 -skew-x-12 animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      aria-hidden
                    />
                    <span
                      className="absolute left-2 top-1 animate-twinkle text-[9px] text-white/80 sm:left-3 sm:top-2 sm:text-[11px]"
                      aria-hidden
                    >
                      ✦
                    </span>
                    <span
                      className="absolute bottom-1 right-2 animate-twinkle-delay text-[9px] text-white/60 sm:bottom-2 sm:right-4 sm:text-[10px]"
                      aria-hidden
                    >
                      ✦
                    </span>
                    <span
                      className="absolute right-2 top-1 animate-twinkle text-[8px] text-yellow-200/70 sm:right-3 sm:top-1.5 sm:text-[9px]"
                      aria-hidden
                    >
                      ★
                    </span>
                    <span className="relative z-10 px-1 text-xs sm:text-[11px]">BOOK NOW</span>
                  </Link>
                  <a
                    href={tel}
                    className="flex w-full min-w-0 max-w-full min-h-[40px] flex-1 shrink items-center justify-center gap-1.5 overflow-hidden rounded-full bg-white/45 px-2.5 py-2 font-sans text-[13px] font-semibold tabular-nums leading-none text-[#2D1F0F] no-underline backdrop-blur-sm transition hover:bg-white/65 sm:min-h-0 sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
                  >
                    <Phone
                      className="h-3 w-3 shrink-0 text-[#7A5C10] sm:h-4 sm:w-4"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1 truncate text-center">{phoneDisplay}</span>
                  </a>
                </div>
              </div>
              <p className="hero-fade-up-d4 mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-[11px] font-normal text-[#E8E6E4] drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)] sm:mt-4 sm:text-xs">
                <span className="text-[#D4AF37]" aria-hidden>
                  ✦
                </span>
                <span>5.0 rating</span>
                <span className="opacity-50" aria-hidden>
                  |
                </span>
                <span>656+ happy clients</span>
              </p>
            </div>
            <div className="hidden min-h-[1px] md:block" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
