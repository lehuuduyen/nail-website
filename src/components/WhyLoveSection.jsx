'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Star, StarHalf } from 'lucide-react';
import { salonArea } from '@/lib/salon';
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

const nailNeutral =
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=640&q=85';

export default function WhyLoveSection() {
  const area = salonArea();

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

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {/* Card 1 — Google Reviews */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/50 bg-surface/85 shadow-lg shadow-charcoal/5 backdrop-blur-md"
          >
            <div className="border-b border-lavender/25 px-5 pb-4 pt-5 text-center">
              <div className="flex items-center justify-center gap-2">
                <GoogleLogo className="h-5 w-5 shrink-0" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Google Reviews
                </p>
              </div>
              <p className="mt-2 font-display text-4xl text-ink">4.9</p>
              <div className="mt-2 flex justify-center gap-0.5 text-[#c9a96e]">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" strokeWidth={0} aria-hidden />
                ))}
                <StarHalf className="h-4 w-4 fill-current" strokeWidth={0} aria-hidden />

              </div>
              <p className="mt-2 text-sm text-muted">656+ happy clients</p>
            </div>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={nailNeutral}
                alt="Professional manicure style inspiration at Nice Nails & Spa Phoenix AZ"
                width={640}
                height={960}
                className="absolute inset-0 h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="px-5 py-4 text-center">
              <Link
                href="/booking"
                className="text-sm font-semibold text-ink underline decoration-[#c9a96e]/60 underline-offset-4 transition hover:text-[#a67c3d]"
              >
                Book this service
              </Link>
            </div>
          </motion.article>

          {/* Card 2 — Testimonial + CTA */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/50 bg-surface/85 shadow-lg shadow-charcoal/5 backdrop-blur-md"
          >
            <div className="relative aspect-[4/3] w-full shrink-0">
              <Image
                src={WHY_LOVE_IMAGES.manicure.src}
                alt="Professional manicure service at Nice Nails Spa Phoenix AZ"
                width={WHY_LOVE_IMAGES.manicure.width}
                height={WHY_LOVE_IMAGES.manicure.height}
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex flex-1 flex-col px-5 py-5 text-center">
              <p className="font-display text-lg italic leading-relaxed text-ink md:text-xl">
                &ldquo;Best nails I&apos;ve ever had!&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-ink">Jessica T.</p>
              <p className="mt-1 flex items-center justify-center gap-1 text-xs text-muted">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-rose-gold" aria-hidden />
                {area}
              </p>
              <Link
                href="/booking"
                className="mt-6 inline-flex items-center justify-center self-center rounded-full bg-luxury-gold px-8 py-3 text-sm font-semibold text-white no-underline shadow-md transition hover:opacity-95"
              >
                Book this service
              </Link>
            </div>
          </motion.article>

          {/* Card 3 — Long testimonial */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/50 bg-surface/85 shadow-lg shadow-charcoal/5 backdrop-blur-md"
          >
            <div className="relative aspect-[4/3] w-full shrink-0">
              <Image
                src={WHY_LOVE_IMAGES.salonInterior.src}
                alt="Nice Nails & Spa luxury nail salon interior North Phoenix AZ"
                title="Best Nail Salon in North Phoenix AZ 85021"
                width={WHY_LOVE_IMAGES.salonInterior.width}
                height={WHY_LOVE_IMAGES.salonInterior.height}
                className="absolute inset-0 h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex flex-1 flex-col px-5 py-5 text-center">
              <p className="font-display text-base italic leading-relaxed text-ink md:text-lg">
                &ldquo;Absolutely beautiful salon and excellent service. I won&apos;t go anywhere
                else.&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-ink">Emma M.</p>
              <p className="mt-1 flex items-center justify-center gap-1 text-xs text-muted">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-rose-gold" aria-hidden />
                {area}
              </p>
              <Link
                href="/booking"
                className="mt-auto pt-6 text-sm font-semibold text-ink underline decoration-[#c9a96e]/60 underline-offset-4 transition hover:text-[#a67c3d]"
              >
                Book this service
              </Link>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
