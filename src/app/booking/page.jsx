import { Suspense } from 'react';
import BookingForm from '@/components/BookingForm';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-dusty-rose/15">
      <section className="border-b border-rose-gold/10 bg-white/80 px-4 py-10 text-center backdrop-blur">
        <h1 className="font-display text-3xl text-ink md:text-4xl">Book your visit</h1>
        <p className="mt-2 text-sm text-charcoal/65">A few steps to your moment of calm.</p>
      </section>
      <Suspense
        fallback={<p className="py-20 text-center text-charcoal/50">Loading…</p>}
      >
        <BookingForm />
      </Suspense>
    </div>
  );
}
