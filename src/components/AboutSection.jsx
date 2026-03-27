'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import {
  salonName,
  salonArea,
  salonMapsUrl,
  salonMapsEmbedUrl,
} from '@/lib/salon';
import { ABOUT_BANNER } from '@/lib/siteImages';

export default function AboutSection() {
  const name = salonName();
  const area = salonArea();
  const maps = salonMapsUrl();
  const embed = salonMapsEmbedUrl();

  return (
    <section id="about" className="border-y border-rose-gold/15 marble-bg py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-gold">
            About us
          </span>
          <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">
            Your neighborhood nail studio in {area.split(',')[0]}
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-rose-gold" />
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl"
          >
            <Image
              src={ABOUT_BANNER.src}
              alt={`${name} luxury nail salon interior and manicure stations North Phoenix AZ`}
              title="Best Nail Salon in North Phoenix AZ 85021"
              width={ABOUT_BANNER.width}
              height={ABOUT_BANNER.height}
              loading="lazy"
              quality={80}
              className="absolute inset-0 z-0 h-full w-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/20 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5 text-charcoal"
          >
            <p className="text-lg leading-relaxed text-ink">
              <span className="font-semibold text-charcoal">{name}</span> is a go-to spot for nails
              and spa care in Phoenix — especially for guests near{' '}
              <span className="whitespace-nowrap font-medium text-rose-gold">{area}</span>. We pair
              quality products with careful technique, at prices that stay fair.
            </p>
            <p className="leading-relaxed">
              Visit us for manicures and pedicures, dip powder, gel and enhancements, waxing, and
              lash services — all in a calm, welcoming space. Appointments and walk-ins are welcome;
              gift certificates available.
            </p>
            <p className="text-sm leading-relaxed text-charcoal">
              We prioritize hygiene: disposable liners and sanitary practices help keep every
              service comfortable and safe.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/services"
                className="inline-flex rounded-full bg-rose-gold px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-gold-deep"
              >
                View services
              </Link>
              <a
                href={maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal/15 px-6 py-2.5 text-sm font-semibold text-charcoal transition hover:border-rose-gold/40 hover:text-rose-gold"
              >
                <Navigation size={16} />
                Directions
              </a>
            </div>
          </motion.div>
        </div>

        {embed ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 overflow-hidden rounded-2xl border border-rose-gold/15 shadow-lg"
          >
            <iframe
              title="Salon location"
              src={embed}
              className="aspect-video min-h-[280px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        ) : (
          <motion.a
            href={maps}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 flex items-center justify-center gap-3 rounded-2xl border border-dashed border-rose-gold/30 bg-cream/80 px-6 py-10 text-center transition hover:border-rose-gold/50 hover:bg-cream"
          >
            <MapPin className="h-8 w-8 shrink-0 text-rose-gold" />
            <div className="text-left">
              <p className="text-sm font-semibold text-ink">Find us on Google Maps</p>
              <p className="text-xs text-muted">Tap to open directions</p>
            </div>
          </motion.a>
        )}
      </div>
    </section>
  );
}
