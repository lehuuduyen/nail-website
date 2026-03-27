'use client';

import { motion } from 'framer-motion';
import { Gem, Clock, Instagram, ShieldCheck, Sparkles } from 'lucide-react';

const pillars = [
  {
    icon: Gem,
    title: 'Premium Products Only',
  },
  {
    icon: Clock,
    title: 'No Waiting – Fast Booking',
  },
  {
    icon: Instagram,
    title: 'Instagram-Worthy Nails',
  },
  {
    icon: ShieldCheck,
    title: '100% Hygiene Guaranteed',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function OurLuxuryServicesSection() {
  return (
    <section id="luxury-services"  className="marble-bg pb-16 pt-4 md:pb-24 md:pt-2">
      <div className="mx-auto max-w-6xl px-4 md:px-6" >
        <h2 className="flex flex-wrap items-center justify-center gap-2 text-center font-display text-3xl font-normal text-ink md:text-4xl">
          Our Luxury Services
          <span className="inline-flex items-center gap-0.5 text-[#c9a96e]" aria-hidden>
            <Sparkles className="h-6 w-6" strokeWidth={1.25} />
            <Sparkles className="h-5 w-5 opacity-90" strokeWidth={1.25} />
            <Sparkles className="h-4 w-4 opacity-80" strokeWidth={1.25} />
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-charcoal md:text-base">
          Get inspired by our beautiful nail designs
        </p>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-32px' }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.map((p) => (
            <motion.li
              key={p.title}
              variants={item}
                              style={{ backgroundColor: '#F6E9EC' }}

              className="flex flex-col items-center rounded-2xl border border-white/45 bg-surface/55 px-4 py-6 text-center shadow-md shadow-charcoal/[0.04] backdrop-blur-sm md:py-8"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full border border-[#c9a96e]/35 bg-white/40"
                aria-hidden
              >
                <p.icon className="h-7 w-7 text-[#b8954a]" strokeWidth={1.25} />
              </div>
              <h3 className="mt-4 text-sm font-semibold leading-snug text-ink md:text-[15px]">
                {p.title}
              </h3>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
