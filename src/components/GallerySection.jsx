'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X } from 'lucide-react';
import { fetchGallery, getPublicBaseUrl } from '@/lib/api';

function gallerySrc(url) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${getPublicBaseUrl()}${url.startsWith('/') ? '' : '/'}${url}`;
}

export default function GallerySection() {
  const [items, setItems] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetchGallery().then((all) => setItems((all || []).slice(0, 9)));
  }, []);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl text-ink md:text-4xl">Our Work</h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-rose-gold" />
        </div>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((g, i) => (
            <motion.button
              key={g.id}
              type="button"
              className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-cream focus:outline-none focus:ring-2 focus:ring-rose-gold"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.45 }}
              onClick={() => setLightbox(i)}
            >
              <div className="group relative aspect-[4/5] w-full">
                <Image
                  src={gallerySrc(g.thumbnailUrl || g.imageUrl)}
                  alt={g.title || 'Salon work'}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition group-hover:bg-charcoal/40">
                  <ZoomIn className="h-10 w-10 text-white opacity-0 transition group-hover:opacity-100" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-cream transition hover:bg-charcoal/90"
          >
            View Full Gallery
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {lightbox != null && items[lightbox] && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white"
              aria-label="Close"
              onClick={() => setLightbox(null)}
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-h-[85vh] max-w-3xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/5] w-full max-w-lg sm:aspect-video sm:max-w-3xl">
                <Image
                  src={gallerySrc(items[lightbox].imageUrl)}
                  alt={items[lightbox].title || ''}
                  fill
                  className="object-contain bg-black"
                />
              </div>
              {items[lightbox].title && (
                <p className="bg-charcoal px-4 py-2 text-center text-sm text-cream">
                  {items[lightbox].title}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
