'use client';

import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, CalendarCheck, Gift } from 'lucide-react';

const items = [
  {
    icon: Sparkles,
    title: 'Products & technique',
    desc: 'Trusted lines and careful application — manicures, pedicures, dip, gel, waxing, and lashes.',
  },
  {
    icon: ShieldCheck,
    title: 'Clean & hygienic',
    desc: 'Disposable liners and strict sanitation so every guest can relax with confidence.',
  },
  {
    icon: CalendarCheck,
    title: 'Walk-ins & booking',
    desc: 'Stop by when you’re nearby or reserve a slot online — we’ll do our best to fit you in.',
  },
  {
    icon: Gift,
    title: 'Gift certificates',
    desc: 'Treat someone to a little spa time — ask us about gift options in salon.',
  },
];

export default function WhyChooseSection() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center font-display text-3xl text-ink md:text-4xl">Why guests choose us</h2>
        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-rose-gold" />
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-charcoal/65">
          The same friendly, full-service experience you expect from a neighborhood Phoenix salon — with
          a calmer, more modern presentation online.
        </p>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="rounded-2xl border border-rose-gold/15 bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-gold/20 text-charcoal">
                <it.icon size={26} />
              </div>
              <h3 className="mt-4 font-display text-lg text-ink">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
