'use client';

import { useEffect, useState } from 'react';
import { fetchAvailability } from '@/lib/api';

const DAY_ABBR = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

function to24h(t) {
  const m = t.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  if (m[3].toUpperCase() === 'PM' && h !== 12) h += 12;
  if (m[3].toUpperCase() === 'AM' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${m[2]}`;
}

function parseHoursEnv() {
  const raw =
    process.env.NEXT_PUBLIC_SALON_HOURS ||
    'Mon–Sat 9:30 AM – 7:00 PM · Sun 10:00 AM – 4:00 PM';
  const rules = [];
  for (const seg of raw.split('·')) {
    // Normalise en/em dash to ASCII hyphen for easier regex
    const s = seg.trim().replace(/[–—]/g, '-');
    const m = s.match(
      /^([A-Za-z]+)(?:-([A-Za-z]+))?\s+(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*(\d{1,2}:\d{2}\s*[AP]M)$/i
    );
    if (!m) continue;
    const from = DAY_ABBR[m[1]];
    const to = m[2] != null ? DAY_ABBR[m[2]] : from;
    const open = to24h(m[3]);
    const close = to24h(m[4]);
    if (open != null && close != null && from != null && to != null)
      rules.push({ from, to, open, close });
  }
  return rules;
}

function toMinutes(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function getBusinessHours(dateStr) {
  const day = new Date(dateStr + 'T12:00:00').getDay();
  const rules = parseHoursEnv();
  for (const r of rules) {
    const inRange =
      r.from <= r.to
        ? day >= r.from && day <= r.to
        : day >= r.from || day <= r.to;
    if (inRange) return { open: r.open, close: r.close };
  }
  return { open: '09:00', close: '18:00' };
}

export function useAvailability(employeeId, dateStr, serviceDuration) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      setSlots([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError('');
    fetchAvailability({
      employeeId: employeeId ?? 'any',
      date: dateStr,
      serviceDuration: serviceDuration || 60,
    })
      .then((data) => {
        if (!cancelled) {
          const raw = Array.isArray(data) ? data : [];
          const { open, close } = getBusinessHours(dateStr);
          const openMins = toMinutes(open);
          const closeMins = toMinutes(close);
          const duration = serviceDuration || 60;
          const filtered = raw.filter((s) => {
            const mins = toMinutes(s.time);
            return mins >= openMins && mins + duration <= closeMins;
          });
          setSlots(filtered);
        }
      })
      .catch((e) => {
        if (!cancelled)
          setError(e.response?.data?.error || e.message || 'Failed to load slots');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [employeeId, dateStr, serviceDuration]);

  const availableCount = slots.filter((s) => s.available).length;
  return { slots, loading, error, availableCount };
}
