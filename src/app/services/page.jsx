'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Clock } from 'lucide-react';
import { fetchServices } from '@/lib/api';
import {
  SERVICE_MENU_SECTIONS,
  SECTION_ORDER,
  sectionTitle,
  categoryBadgeClass,
} from '@/lib/categories';
import { formatCurrency } from '@/lib/format';

function buildSections(list, tab, q) {
  const qq = q.trim().toLowerCase();
  const filtered = (list || []).filter((s) => {
    if (tab !== 'all' && s.category !== tab) return false;
    if (!qq) return true;
    return (
      s.name.toLowerCase().includes(qq) ||
      (s.nameVi && s.nameVi.toLowerCase().includes(qq)) ||
      (s.description && s.description.toLowerCase().includes(qq))
    );
  });

  const byCat = {};
  filtered.forEach((s) => {
    if (!byCat[s.category]) byCat[s.category] = [];
    byCat[s.category].push(s);
  });

  const out = [];
  const seen = new Set();
  SECTION_ORDER.forEach((key) => {
    const items = byCat[key];
    if (items?.length) {
      out.push({ key, title: sectionTitle(key), items });
      seen.add(key);
    }
  });
  Object.keys(byCat).forEach((key) => {
    if (!seen.has(key)) {
      out.push({ key, title: sectionTitle(key), items: byCat[key] });
    }
  });
  return out;
}

export default function ServicesPage() {
  const salonAddress =
    process.env.NEXT_PUBLIC_SALON_ADDRESS || '8048 N 19th Ave, Phoenix, AZ 85021';
  const [list, setList] = useState([]);
  const [tab, setTab] = useState('all');
  const [q, setQ] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchServices()
      .then(setList)
      .catch((e) => {
        const msg =
          e.response?.data?.error ||
          e.message ||
          'Unable to load services.';
        setErr(
          typeof msg === 'string' ? msg : 'Unable to load services. Is the API running?'
        );
      });
  }, []);

  const sections = useMemo(() => buildSections(list, tab, q), [list, tab, q]);

  return (
    <div className="min-h-screen bg-cream pb-24">
      <section className="border-b border-rose-gold/15 bg-gradient-to-b from-dusty-rose/35 to-cream px-4 py-14 text-center md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-charcoal/55">
          Service &amp; price
        </p>
        <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">Services</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-charcoal/70 md:text-base">
          Menu inspired by our Phoenix location at{' '}
          <span className="font-medium text-charcoal">{salonAddress}</span>.{' '}
          <span className="whitespace-nowrap">Cash</span> and{' '}
          <span className="whitespace-nowrap">card</span> prices are shown like in salon; booking uses
          the cash column as the default estimate.
        </p>
        <p className="mt-2 text-xs text-charcoal/50">
          Reference:{' '}
          <a
            href="https://nicenailsphoenix.com/ServiceAndPrice/ShowService"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-gold underline decoration-rose-gold/40 underline-offset-2 hover:text-charcoal"
          >
            nicenailsphoenix.com
          </a>
        </p>
      </section>

      <div className="mx-auto max-w-5xl px-4 md:px-6">
        {err && <p className="mt-8 text-center text-sm text-red-600">{err}</p>}

        <div className="sticky top-[72px] z-30 -mx-4 border-b border-rose-gold/10 bg-cream/95 px-4 py-3 backdrop-blur md:static md:mx-0 md:border-0 md:bg-transparent md:px-0 md:py-0">
          <div className="relative mt-4 md:mt-8">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
            <input
              type="search"
              placeholder="Search services…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-xl border border-rose-gold/25 bg-white py-3 pl-10 pr-4 text-sm shadow-sm outline-none ring-rose-gold/20 focus:ring-2"
            />
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
            {SERVICE_MENU_SECTIONS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition md:px-4 md:py-2 ${
                  tab === t.key
                    ? 'bg-charcoal text-cream'
                    : 'bg-white text-charcoal/70 ring-1 ring-rose-gold/20 hover:bg-dusty-rose/20'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-16">
          {sections.map((sec, si) => (
            <motion.section
              key={sec.key}
              id={sec.key}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: Math.min(si * 0.03, 0.15) }}
            >
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b-2 border-rose-gold/40 pb-3">
                <h2 className="font-display text-2xl uppercase tracking-wide text-ink md:text-3xl">
                  {sec.title}
                </h2>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    categoryBadgeClass[sec.key] || categoryBadgeClass.other
                  }`}
                >
                  {sec.items.length} item{sec.items.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="hidden overflow-hidden rounded-2xl border border-rose-gold/15 bg-white shadow-sm md:block">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-rose-gold/15 bg-cream/90 text-xs font-bold uppercase tracking-wider text-charcoal/70">
                      <th className="px-4 py-3 pr-6">Service</th>
                      <th className="w-28 px-3 py-3 text-right">Card</th>
                      <th className="w-28 px-3 py-3 text-right">Cash</th>
                      <th className="w-24 px-3 py-3 text-center">Time</th>
                      <th className="w-36 px-4 py-3 text-right"> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sec.items.map((s) => {
                      const card = s.priceCard != null ? Number(s.priceCard) : null;
                      const cash = Number(s.price);
                      const same = card != null && Math.abs(card - cash) < 0.005;
                      return (
                        <tr
                          key={s.id}
                          className="border-b border-rose-gold/10 last:border-0 transition hover:bg-cream/50"
                        >
                          <td className="px-4 py-4 align-top">
                            <p className="font-display text-base font-medium text-ink">{s.name}</p>
                            {s.nameVi && (
                              <p className="mt-0.5 text-xs text-charcoal/55">{s.nameVi}</p>
                            )}
                            {s.description && (
                              <p className="mt-2 max-w-xl text-xs leading-relaxed text-charcoal/60">
                                {s.description}
                              </p>
                            )}
                          </td>
                          <td className="px-3 py-4 text-right align-top font-medium text-charcoal/80">
                            {same || card == null ? '—' : formatCurrency(card)}
                          </td>
                          <td className="px-3 py-4 text-right align-top font-semibold text-rose-gold">
                            {formatCurrency(cash)}
                          </td>
                          <td className="px-3 py-4 text-center align-top text-charcoal/65">
                            <span className="inline-flex items-center justify-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-rose-gold/80" />
                              {s.duration}m
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right align-top">
                            <Link
                              href={`/booking?service=${s.id}`}
                              className="inline-flex rounded-full bg-charcoal px-4 py-2 text-xs font-semibold text-cream transition hover:bg-charcoal/90"
                            >
                              Book
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="space-y-4 md:hidden">
                {sec.items.map((s) => {
                  const card = s.priceCard != null ? Number(s.priceCard) : null;
                  const cash = Number(s.price);
                  const same = card != null && Math.abs(card - cash) < 0.005;
                  return (
                    <div
                      key={s.id}
                      className="rounded-2xl border border-rose-gold/15 bg-white p-4 shadow-sm"
                    >
                      <p className="font-display text-lg font-medium text-ink">{s.name}</p>
                      {s.nameVi && <p className="text-xs text-charcoal/55">{s.nameVi}</p>}
                      <div className="mt-3 flex flex-wrap gap-4 border-t border-rose-gold/10 pt-3 text-sm">
                        <div>
                          <p className="text-[10px] font-bold uppercase text-charcoal/45">Cash</p>
                          <p className="font-semibold text-rose-gold">{formatCurrency(cash)}</p>
                        </div>
                        {!same && card != null && (
                          <div>
                            <p className="text-[10px] font-bold uppercase text-charcoal/45">Card</p>
                            <p className="font-medium text-charcoal">{formatCurrency(card)}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-[10px] font-bold uppercase text-charcoal/45">Time</p>
                          <p className="text-charcoal/75">{s.duration} min</p>
                        </div>
                      </div>
                      {s.description && (
                        <p className="mt-3 text-xs leading-relaxed text-charcoal/60">{s.description}</p>
                      )}
                      <Link
                        href={`/booking?service=${s.id}`}
                        className="mt-4 flex w-full justify-center rounded-full bg-rose-gold py-2.5 text-sm font-semibold text-charcoal"
                      >
                        Book this service
                      </Link>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          ))}
        </div>

        {sections.length === 0 && !err && (
          <p className="mt-16 text-center text-charcoal/50">No services match your filters.</p>
        )}

        <section className="mt-20 rounded-2xl border border-rose-gold/20 bg-white p-8 text-center shadow-sm">
          <p className="font-display text-lg text-ink">Questions or custom requests?</p>
          <p className="mt-2 text-sm text-charcoal/65">
            Call the salon — we&apos;ll match you to the right service.
          </p>
          <a
            href={`tel:${(process.env.NEXT_PUBLIC_SALON_PHONE || '').replace(/\D/g, '')}`}
            className="mt-4 inline-block text-lg font-semibold text-rose-gold hover:underline"
          >
            {process.env.NEXT_PUBLIC_SALON_PHONE || 'Call us'}
          </a>
        </section>
      </div>
    </div>
  );
}
