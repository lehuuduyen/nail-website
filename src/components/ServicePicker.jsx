'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { formatCurrency } from '@/lib/format';

const ORDER = [
  'manicure',
  'pedicure',
  'nails',
  'addon',
  'kids',
  'lash',
  'waxing',
  'head_spa',
  'facial',
  'acrylic',
  'gel',
  'dip',
  'other',
];

export default function ServicePicker({ services, valueId, onChange, search, onSearchChange }) {
  const grouped = useMemo(() => {
    const g = {};
    ORDER.forEach((c) => {
      g[c] = [];
    });
    (services || []).forEach((s) => {
      if (!g[s.category]) g[s.category] = [];
      g[s.category].push(s);
    });
    return g;
  }, [services]);

  const q = (search || '').trim().toLowerCase();
  const matches = (s) =>
    !q ||
    s.name.toLowerCase().includes(q) ||
    (s.nameVi && s.nameVi.toLowerCase().includes(q));

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
        <input
          type="search"
          placeholder="Search services…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-rose-gold/25 bg-surface py-3 pl-10 pr-4 text-sm outline-none ring-rose-gold/30 focus:ring-2"
        />
      </div>
      {ORDER.map((cat) => {
        const list = (grouped[cat] || []).filter(matches);
        if (!list.length) return null;
        return (
          <div key={cat}>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-rose-gold">
              {cat.replace('_', ' ')}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {list.map((s) => {
                const selected = valueId === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onChange(s)}
                    className={`rounded-2xl border-2 p-4 text-left transition ${
                      selected
                        ? 'border-rose-gold bg-rose-gold/10 shadow-md'
                        : 'border-cream bg-surface hover:border-rose-gold/40'
                    }`}
                  >
                    <p className="font-display text-lg text-ink">{s.name}</p>
                    {s.nameVi && (
                      <p className="text-sm text-charcoal/60">{s.nameVi}</p>
                    )}
                    <p className="mt-2 text-sm text-charcoal/70">
                      {s.duration} min · {formatCurrency(s.price)}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
