'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarHeart } from 'lucide-react';

export default function FloatingBookBtn() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.4 }}
    >
      <Link
        href="/booking"
        className="flex items-center gap-2 rounded-full bg-rose-gold px-5 py-3 text-sm font-semibold text-charcoal shadow-lg shadow-charcoal/20 ring-2 ring-cream/30 transition hover:bg-rose-gold/90"
      >
        <CalendarHeart size={20} />
        Book
      </Link>
    </motion.div>
  );
}
