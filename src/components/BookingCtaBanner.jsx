import Link from 'next/link';
import { salonArea } from '@/lib/salon';

export default function BookingCtaBanner() {
  const area = salonArea();
  return (
    <section className="bg-cta-gold py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <h2 className="font-display text-3xl text-charcoal md:text-4xl">Ready for beautiful nails?</h2>
        <p className="mt-3 mx-auto max-w-xl text-charcoal/80">
          Same-day visits when we can — or book online before you visit us in {area}.
        </p>
        <Link
          href="/booking"
          className="mt-8 inline-flex rounded-full bg-charcoal px-10 py-3.5 text-sm font-semibold text-cream shadow-lg transition hover:bg-charcoal/90"
        >
          Book Your Appointment Today
        </Link>
      </div>
    </section>
  );
}
