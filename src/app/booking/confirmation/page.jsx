'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { format, parse } from 'date-fns';
import { formatCurrency } from '@/lib/format';

function buildICS({ title, start, endMinutes, location, description }) {
  const pad = (d) => {
    const s = d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    return s;
  };
  const end = new Date(start.getTime() + endMinutes * 60 * 1000);
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Nice Nails//Booking//EN',
    'BEGIN:VEVENT',
    `DTSTAMP:${pad(new Date())}`,
    `DTSTART:${pad(start)}`,
    `DTEND:${pad(end)}`,
    `SUMMARY:${title.replace(/,/g, '\\,')}`,
    location ? `LOCATION:${location.replace(/,/g, '\\,')}` : '',
    description ? `DESCRIPTION:${description.replace(/\n/g, '\\n').replace(/,/g, '\\,')}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean);
  return lines.join('\r\n');
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        i,
        x: Math.random() * 100,
        delay: Math.random() * 0.4,
        dur: 1.8 + Math.random(),
        rot: Math.random() * 360,
        color: ['#9E8B85', '#DBCDC9', '#C5B9B5', '#F7F3F2'][i % 4],
      })),
    []
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.i}
          className="absolute top-0 h-2 w-2 rounded-sm"
          style={{ left: `${p.x}%`, backgroundColor: p.color }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ y: '100vh', opacity: 0, rotate: p.rot }}
          transition={{ duration: p.dur, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  );
}

export default function ConfirmationPage() {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('lastBooking');
      if (!raw) {
        router.replace('/booking');
        return;
      }
      setData(JSON.parse(raw));
    } catch {
      router.replace('/booking');
    }
  }, [router]);

  if (!data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted">
        Loading…
      </div>
    );
  }

  const start = new Date(data.scheduledAt);
  const timePretty = format(start, 'h:mm a');
  const datePretty = format(parse(data.dateYmd, 'yyyy-MM-dd', new Date()), 'EEEE, MMM d, yyyy');
  const salon = process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';
  const phone = process.env.NEXT_PUBLIC_SALON_PHONE || '';
  const address = process.env.NEXT_PUBLIC_SALON_ADDRESS || '';

  const downloadCal = () => {
    const ics = buildICS({
      title: `${salon} — ${data.service?.name}`,
      start,
      endMinutes: data.service?.duration || 60,
      location: address,
      description: `Ref ${data.confirmationNumber}. Staff: ${data.staffName}`,
    });
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'appointment.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-cream px-4 py-12 md:py-16">
      <Confetti />
      <div className="mx-auto max-w-lg">
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-gold text-sm font-bold text-white"
            >
              ✓
            </div>
          ))}
        </div>

        <motion.div
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-4 ring-emerald-200/50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14 }}
        >
          <motion.svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <motion.path
              d="M12 24 L20 32 L36 14"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </motion.svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-2xl border border-rose-gold/25 bg-surface p-8 shadow-xl shadow-rose-gold/10"
        >
          <h1 className="text-center font-display text-2xl text-ink">You&apos;re all set</h1>
          <p className="mt-2 text-center text-sm text-muted">
            Reference{' '}
            <span className="font-mono font-semibold text-rose-gold">{data.confirmationNumber}</span>
          </p>
          <ul className="mt-8 space-y-3 text-sm text-charcoal">
            <li>
              <span className="text-muted">Service</span>
              <div className="font-medium text-ink">
                {data.service?.name} · {formatCurrency(data.service?.price)}
              </div>
            </li>
            <li>
              <span className="text-muted">With</span>
              <div className="font-medium text-ink">{data.staffName}</div>
            </li>
            <li>
              <span className="text-muted">When</span>
              <div className="font-medium text-ink">
                {datePretty} · {timePretty}
              </div>
            </li>
          </ul>
          <div className="mt-8 border-t border-rose-gold/15 pt-6 text-sm text-charcoal">
            <p className="font-semibold text-ink">{salon}</p>
            <p className="mt-1">{address}</p>
            <a href={`tel:${phone.replace(/\D/g, '')}`} className="mt-1 inline-block text-rose-gold">
              {phone}
            </a>
          </div>
        </motion.div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={downloadCal}
            className="rounded-full border-2 border-charcoal px-6 py-3 text-sm font-semibold text-charcoal hover:bg-charcoal/5"
          >
            Add to calendar
          </button>
          <Link
            href="/booking"
            onClick={() => sessionStorage.removeItem('lastBooking')}
            className="rounded-full bg-rose-gold px-6 py-3 text-center text-sm font-semibold text-white"
          >
            Book another appointment
          </Link>
          <Link
            href="/"
            className="rounded-full border border-rose-gold/40 px-6 py-3 text-center text-sm font-semibold text-charcoal"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
