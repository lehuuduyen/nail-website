'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { salonTagline, salonArea } from '@/lib/salon';
import { HERO_IMAGE } from '@/lib/siteImages';

export default function HeroSection() {
  const name = process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';
  const tagline = salonTagline();
  const area = salonArea();

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden md:min-h-screen">
      <Image
        src={HERO_IMAGE.src}
        alt="Nice Nails & Spa luxury nail salon interior North Phoenix AZ"
        title="Best Nail Salon in North Phoenix AZ 85021"
        width={HERO_IMAGE.width}
        height={HERO_IMAGE.height}
        priority
        className="absolute inset-0 z-0 h-full w-full object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 z-[1] bg-hero-gradient" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.h1
          className="font-display text-4xl font-normal tracking-tight text-white md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {name}
        </motion.h1>
        <motion.p
          className="mt-4 max-w-2xl text-lg font-light text-[#c9a96e] drop-shadow-sm md:mx-auto md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          {tagline}
        </motion.p>
        <motion.p
          className="mt-2 text-sm font-normal tracking-wide text-white/80 md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {area}
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.6 }}
        >
          <Link href="/booking" className="btn-gold inline-flex items-center justify-center no-underline">
            Book appointment
          </Link>
          <Link
            href="/services"
            className="rounded-full border-2 border-white/90 px-8 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-white/10"
          >
            View services
          </Link>
        </motion.div>
      </div>
      <a
        href="#why-love"
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-white/85 md:bottom-8"
        aria-label="Scroll to Why Ladies Love section"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90">
          Discover
        </span>
        <motion.span
          className="inline-flex items-center justify-center"
          aria-hidden
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.75, ease: [0.45, 0, 0.55, 1] }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-current"
          >
            <path
              d="M6 10l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </motion.span>
      </a>
    </section>
  );
}
