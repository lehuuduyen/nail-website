'use client';

import { useEffect, useState } from 'react';
import { fetchAvailability } from '@/lib/api';

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
        if (!cancelled) setSlots(Array.isArray(data) ? data : []);
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
