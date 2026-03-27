import Link from 'next/link';
import { salonArea } from '@/lib/salon';

export default function BookingCtaBanner() {
  const area = salonArea();
  return (
    <section className="bg-marble-cta py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <h2 className="font-display text-3xl text-white md:text-4xl">Ready for beautiful nails?</h2>
        <p className="mx-auto mt-3 max-w-xl text-white">
          Same-day visits when we can — or book online before you visit us in {area}.
        </p>
        <Link
          href="/booking"
          className="mt-8 inline-flex rounded-full border border-white/25 bg-cream px-10 py-3.5 text-sm font-semibold text-ink shadow-lg transition hover:bg-white"
        >
          Book Your Appointment Today
        </Link>
      </div>
    </section>
  );
}
