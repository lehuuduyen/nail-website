'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { SERVICE_CARD_IMAGES } from '@/lib/siteImages';
import { WHY_LOVE_IMAGES } from '@/lib/siteImages';

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

const cardShell =
  'overflow-hidden rounded-2xl border border-white/55 shadow-lg shadow-charcoal/[0.06] md:rounded-[14px]';

const quotePanel =
  'flex flex-1 flex-col justify-center bg-[#f5e8ec]/95 px-5 py-6 text-center md:px-6 md:py-7';

const motionArticle = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45 },
};

export default function WhyLoveSection() {
  const manicureImg = SERVICE_CARD_IMAGES.manicure;

  return (
    <section
      id="why-love"
      className="relative z-[1] overflow-hidden scroll-mt-24 pb-16 pt-24 max-md:pt-28 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream/30 via-cream/10 to-cream/35"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center font-display text-3xl font-normal text-ink md:text-4xl">
          Why Ladies Love Nice Nails &amp; Spa
        </h2>
        <div className="section-divider" aria-hidden>
          <span className="section-divider-diamond" />
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-8">
          {/* Column 1 — stacked: Google card + image / Book link */}
          <div className="flex min-h-0 flex-col gap-4 lg:min-h-[min(100%,32rem)] lg:justify-between">
            <motion.article
              {...motionArticle}
              className={`marble-bg ${cardShell} px-5 pb-5 pt-6 text-center`}
            >
              <div className="flex items-center justify-center gap-2">
                <GoogleLogo className="h-6 w-6 shrink-0 md:h-7 md:w-7" />
              </div>
              <div className="mt-3 flex justify-center gap-0.5 text-[#c9a96e]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-current md:h-4 md:w-4" strokeWidth={0} aria-hidden />
                ))}
              </div>
              <p className="mt-3 font-display text-4xl font-normal leading-none text-ink md:text-[2.75rem]">
                5.0
              </p>
              <div className="mt-2 flex justify-center gap-0.5 text-[#c9a96e]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-current md:h-6 md:w-6" strokeWidth={0} aria-hidden />
                ))}
              </div>
              <p className="mt-3 font-sans text-sm text-muted">656+ happy clients</p>
            </motion.article>

            <motion.article
              {...motionArticle}
              transition={{ ...motionArticle.transition, delay: 0.04 }}
              className={`marble-bg ${cardShell} flex min-h-[220px] flex-1 flex-col lg:min-h-0`}
            >
              <div className="relative min-h-[200px] w-full flex-1 lg:min-h-[200px]">
                <Image
                  src={manicureImg.src}
                  alt={manicureImg.alt}
                  fill
                  loading="lazy"
                  quality={80}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="border-t border-white/40 bg-[#f0e4e8]/90 px-5 py-4 text-center">
                <Link
                  href="/booking"
                  className="font-sans text-sm font-semibold text-ink underline decoration-[#c9a96e]/50 decoration-1 underline-offset-[6px] transition hover:text-[#8B6914]"
                >
                  Book this service
                </Link>
              </div>
            </motion.article>
          </div>

          {/* Column 2 — tall testimonial + gold CTA */}
          <motion.article
            {...motionArticle}
            transition={{ ...motionArticle.transition, delay: 0.08 }}
            className={`marble-bg ${cardShell} flex min-h-[480px] flex-col lg:min-h-[32rem]`}
          >
            <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-[#e8ddd9]">
              <Image
                src={WHY_LOVE_IMAGES.manicure.src}
                alt="Professional manicure service at Nice Nails Spa Phoenix AZ"
                fill
                loading="lazy"
                quality={80}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className={quotePanel}>
              <p className="font-display text-lg italic leading-relaxed text-ink md:text-xl">
                &ldquo;Best nails I&apos;ve ever had!&rdquo;
              </p>
              <p className="mt-5 flex items-center justify-center gap-2 font-sans text-sm font-semibold text-ink">
                <span className="text-[#D4AF37]" aria-hidden>
                  ✦
                </span>
                Jessica T.
              </p>
              <Link
                href="/booking"
                className="mt-6 inline-flex items-center justify-center self-center rounded-full bg-gradient-to-r from-[#C9932A] via-[#E8C547] to-[#B8821E] px-10 py-3.5 font-sans text-sm font-semibold text-white no-underline shadow-[0_0_20px_rgba(212,175,55,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] transition hover:brightness-105"
              >
                Book this service
              </Link>
            </div>
          </motion.article>

          {/* Column 3 — tall testimonial only */}
          <motion.article
            {...motionArticle}
            transition={{ ...motionArticle.transition, delay: 0.12 }}
            className={`marble-bg ${cardShell} flex min-h-[480px] flex-col lg:min-h-[32rem]`}
          >
            <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-[#e8ddd9]">
              <Image
                src={WHY_LOVE_IMAGES.salonInterior.src}
                alt="Nice Nails & Spa luxury nail salon interior North Phoenix AZ"
                title="Best Nail Salon in North Phoenix AZ 85021"
                fill
                loading="lazy"
                quality={80}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className={`${quotePanel} justify-center`}>
              <p className="font-display text-base italic leading-relaxed text-ink md:text-lg">
                &ldquo;Absolutely beautiful salon and excellent service. I won&apos;t go anywhere
                else.&rdquo;
              </p>
              <p className="mt-6 flex items-center justify-center gap-2 font-sans text-sm font-semibold text-ink">
                <span className="text-[#D4AF37]" aria-hidden>
                  ✦
                </span>
                Emma M.
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
