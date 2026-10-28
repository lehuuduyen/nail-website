'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X } from 'lucide-react';
import { fetchGallery, getPublicBaseUrl } from '@/lib/api';
import { galleryImageAlt } from '@/lib/galleryImageAlt';
import { unoptimizedRemote } from '@/lib/imageOptimize';
import Reveal from '@/components/Reveal';

function gallerySrc(url) {
  if (!url) return '';
  const base = getPublicBaseUrl();
  if (url.startsWith('http')) {
    // Rewrite localhost/127.0.0.1 URLs stored in DB to the real API origin
    if (/https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/.test(url)) {
      return url.replace(/https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, base);
    }
    return url;
  }
  return `${base}${url.startsWith('/') ? '' : '/'}${url}`;
}

export default function GallerySection() {
  const t = useTranslations('home.gallery');
  const [items, setItems] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetchGallery({ limit: 6 }).then((data) => setItems(Array.isArray(data) ? data : []));
  }, []);

  // The lightbox had no keyboard exit at all — click-outside only, which leaves
  // keyboard and screen-reader users stuck in it. Escape is the minimum.
  useEffect(() => {
    if (lightbox == null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const lightboxItem = lightbox != null ? items[lightbox] : null;
  const lightboxSrc = lightboxItem ? gallerySrc(lightboxItem.imageUrl) : '';

  return (
    <section className="marble-bg py-2xl md:py-3xl">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* S2 hanging head. The centred head plus the 80×4px accent bar under it
            was the ornament-divider pattern; negative space is the divider now. */}
        <header className="head-hang">
          <h2>{t('heading')}</h2>
        </header>
        <Reveal as="div" index={0} className="columns-1 gap-lg sm:columns-2 lg:columns-3">
          {items.map((g, i) => {
            const thumbSrc = gallerySrc(g.thumbnailUrl || g.imageUrl);
            const isFirstCell = i < 2;
            return (
            /* Was a per-item framer scale-in stagger; the grid now arrives with
               the shared `reveal` primitive, and focus uses the global
               :focus-visible ring instead of a focus-only ring. */
            <button
              key={g.id}
              type="button"
              className="mb-lg block w-full break-inside-avoid overflow-hidden rounded-card bg-paper-2"
              onClick={() => setLightbox(i)}
            >
              <div className="group relative aspect-[4/5] w-full">
                <Image
                  src={thumbSrc}
                  alt={galleryImageAlt(g)}
                  fill
                  loading={isFirstCell ? 'eager' : 'lazy'}
                  fetchPriority={isFirstCell ? 'high' : 'low'}
                  decoding="async"
                  quality={72}
                  unoptimized={unoptimizedRemote(thumbSrc)}
                  className="object-cover"
                  sizes="(max-width: 640px) 96vw, (max-width: 1024px) 45vw, 380px"
                />
                {/* One hover signal. It was a 1.05 image scale AND a scrim AND an
                    icon fade — three at once. The scrim stays because it is the
                    one that communicates "this opens"; focus-within covers
                    keyboard, since a hover-only affordance is unreachable by tap. */}
                <div className="absolute inset-0 flex items-center justify-center bg-paper-dark/0 transition-colors duration-short ease-out group-hover:bg-paper-dark/45 group-focus-within:bg-paper-dark/45">
                  <ZoomIn
                    className="h-10 w-10 text-on-dark opacity-0 transition-opacity duration-short ease-out group-hover:opacity-100 group-focus-within:opacity-100"
                    aria-hidden
                  />
                </div>
              </div>
            </button>
            );
          })}
        </Reveal>
        <div className="mt-2xl">
          <Link href="/gallery" className="btn-quiet">
            {t('viewFull')}
          </Link>
        </div>
      </div>

      {/* The modal keeps framer: open/close is an interaction recipe from
          microinteractions.md (backdrop crossfade + 0.96→1 content scale), not a
          fourth decorative primitive. Scale is pulled from 0.9 to 0.96 and the
          easings/durations now come from tokens. */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={lightboxItem.title || galleryImageAlt(lightboxItem)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-paper-dark/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-pill text-on-dark transition-colors duration-short ease-out hover:bg-on-dark/15"
              aria-label={t('close')}
              onClick={() => setLightbox(null)}
            >
              <X size={24} aria-hidden />
            </button>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[85vh] max-w-3xl overflow-hidden rounded-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/5] w-full max-w-lg sm:aspect-video sm:max-w-3xl">
                <Image
                  src={lightboxSrc}
                  alt={galleryImageAlt(lightboxItem)}
                  fill
                  quality={85}
                  unoptimized={unoptimizedRemote(lightboxSrc)}
                  /* bg-black was the one pure #000 left in the components. */
                  className="bg-paper-dark object-contain"
                />
              </div>
              {lightboxItem.title && (
                <p className="bg-paper-dark px-4 py-2 text-step-sm text-on-dark">
                  {lightboxItem.title}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
