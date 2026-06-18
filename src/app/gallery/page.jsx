'use client';

import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { fetchGallery, getPublicBaseUrl } from '@/lib/api';
import { galleryImageAlt } from '@/lib/galleryImageAlt';
import { unoptimizedRemote } from '@/lib/imageOptimize';

const PAGE = 12;

function srcUrl(url) {
  if (!url) return '';
  const b = getPublicBaseUrl();
  if (url.startsWith('http')) {
    if (/https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/.test(url)) {
      return url.replace(/https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, b);
    }
    return url;
  }
  return `${b}${url.startsWith('/') ? '' : '/'}${url}`;
}

export default function GalleryPage() {
  const [all, setAll] = useState([]);
  const [visible, setVisible] = useState(PAGE);
  const [lb, setLb] = useState(null);
  const [loading, setLoading] = useState(true);
  const sentinelRef = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchGallery({});
      setAll(data || []);
      setVisible(PAGE);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Infinite scroll — reveal the next page as the sentinel nears the viewport
  useEffect(() => {
    if (visible >= all.length) return undefined;
    const el = sentinelRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible((v) => Math.min(v + PAGE, all.length));
        }
      },
      { rootMargin: '400px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [all, visible]);

  const shown = useMemo(() => all.slice(0, visible), [all, visible]);
  const hasMore = visible < all.length;

  const openAt = (index) => setLb(index);
  const closeLb = () => setLb(null);
  const prev = () => setLb((i) => (i == null ? i : (i - 1 + all.length) % all.length));
  const next = () => setLb((i) => (i == null ? i : (i + 1) % all.length));

  const current = lb != null ? all[lb] : null;

  return (
    <div className="min-h-screen bg-cream pb-24">
      <section className="border-b border-rose-gold/15 bg-surface/80 px-4 py-14 text-center backdrop-blur-sm">
        <h1 className="font-display text-4xl text-ink md:text-5xl">Nail Art Gallery — Phoenix AZ</h1>
        <p className="mt-2 text-charcoal">Real client photos from Nice Nails &amp; Spa in North Phoenix AZ 85021.</p>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-8 md:px-6">
        {loading ? (
          <p className="mt-12 text-center text-muted">Loading gallery…</p>
        ) : (
          <>
            <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
              {shown.map((g, idx) => (
                <motion.button
                  key={g.id}
                  type="button"
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 6) * 0.04 }}
                  onClick={() => openAt(all.findIndex((x) => x.id === g.id))}
                  className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-rose-gold/10 bg-surface shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-gold"
                >
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={srcUrl(g.thumbnailUrl || g.imageUrl)}
                      alt={galleryImageAlt(g)}
                      fill
                      priority={idx === 0}
                      loading={idx < 3 ? 'eager' : 'lazy'}
                      fetchPriority={idx < 3 ? 'high' : 'low'}
                      decoding="async"
                      quality={72}
                      unoptimized={unoptimizedRemote(
                        srcUrl(g.thumbnailUrl || g.imageUrl)
                      )}
                      className="object-cover transition duration-500 hover:scale-105"
                      sizes="(max-width: 640px) 96vw, (max-width: 1024px) 45vw, 380px"
                    />
                  </div>
                </motion.button>
              ))}
            </div>
            {/* Infinite-scroll sentinel — auto-loads the next page as it nears the viewport */}
            <div ref={sentinelRef} aria-hidden className="h-px w-full" />
            {hasMore && (
              <p className="mt-8 text-center text-sm text-muted">Loading more…</p>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/92 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLb}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white"
              aria-label="Close"
              onClick={closeLb}
            >
              <X size={24} />
            </button>
            <button
              type="button"
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white md:left-6"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              <ChevronLeft size={28} />
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white md:right-6"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              <ChevronRight size={28} />
            </button>
            <motion.div
              key={current.id}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full md:aspect-video">
                <Image
                  src={srcUrl(current.imageUrl)}
                  alt={galleryImageAlt(current)}
                  fill
                  priority
                  loading="eager"
                  fetchPriority="high"
                  quality={82}
                  sizes="(max-width: 768px) 100vw, min(896px, 90vw)"
                  unoptimized={unoptimizedRemote(srcUrl(current.imageUrl))}
                  className="object-contain"
                />
              </div>
              <div className="space-y-3 bg-charcoal px-4 py-4 text-cream">
                {current.title && <p className="font-display text-lg">{current.title}</p>}
                {current.description && (
                  <p className="text-sm text-cream">{current.description}</p>
                )}
                <Link
                  href="/booking"
                  className="inline-flex rounded-full bg-rose-gold px-6 py-2 text-sm font-semibold text-white"
                >
                  Book this look
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
