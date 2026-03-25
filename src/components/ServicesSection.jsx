'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Footprints, Palette, Scissors } from 'lucide-react';
import { fetchServices } from '@/lib/api';
import { formatCurrency } from '@/lib/format';

const iconFor = (cat) => {
  switch (cat) {
    case 'pedicure':
      return Footprints;
    case 'acrylic':
    case 'gel':
    case 'dip':
      return Palette;
    case 'waxing':
      return Scissors;
    default:
      return Sparkles;
  }
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchServices()
      .then((all) => setServices((all || []).slice(0, 6)))
      .catch((e) => {
        const msg = e.response?.data?.error || e.message;
        setErr(
          typeof msg === 'string'
            ? msg
            : 'Could not load services. Check API and run nail-backend npm run db:alter.'
        );
      });
  }, []);

  return (
    <section id="services-preview" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl text-ink md:text-4xl">Our Services</h2>
          <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-rose-gold" />
        </div>
        {err && <p className="text-center text-sm text-red-600">{err}</p>}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => {
            const Icon = iconFor(s.category);
            return (
              <motion.article
                key={s.id}
                variants={item}
                className="group rounded-2xl border border-transparent bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-rose-gold hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-dusty-rose/30 text-charcoal">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 font-display text-xl text-ink">{s.name}</h3>
                <p className="mt-2 text-sm text-charcoal/70">
                  {s.duration} min · {formatCurrency(s.price)}
                </p>
                {s.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-charcoal/60">{s.description}</p>
                )}
                <Link
                  href={`/booking?service=${s.id}`}
                  className="mt-4 inline-block text-sm font-semibold text-rose-gold hover:underline"
                >
                  Book now →
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center rounded-full border-2 border-rose-gold px-8 py-3 text-sm font-semibold text-charcoal transition hover:bg-rose-gold/15"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
