'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { salonTagline, salonArea } from '@/lib/salon';

const HERO_IMG =
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1920&q=85';

export default function HeroSection() {
  const name = process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';
  const tagline = salonTagline();
  const area = salonArea();

  return (
    <section className="relative flex min-h-screen items-center justify-center">
      <Image
        src={HERO_IMG}
        alt="Elegant nail salon"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.h1
          className="font-display text-4xl font-medium tracking-tight text-white md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {name}
        </motion.h1>
        <motion.p
          className="mt-4 max-w-2xl text-lg text-white/90 md:mx-auto md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          {tagline}
        </motion.p>
        <motion.p
          className="mt-2 text-sm font-medium tracking-wide text-rose-gold/95 md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          {area}
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link
            href="/booking"
            className="rounded-full bg-rose-gold px-8 py-3 text-sm font-semibold text-charcoal shadow-lg transition hover:bg-rose-gold/90"
          >
            Book Appointment
          </Link>
          <Link
            href="/services"
            className="rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View Services
          </Link>
        </motion.div>
      </div>
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-white/75"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        aria-label="Scroll to about"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">About</span>
        <ChevronDown size={32} strokeWidth={1.5} />
      </motion.a>
    </section>
  );
}
