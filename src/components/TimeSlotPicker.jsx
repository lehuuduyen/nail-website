'use client';

import { format } from 'date-fns';

function toLabel(time) {
  const [h, m] = time.split(':').map(Number);
  const d = new Date(2000, 0, 1, h, m);
  return format(d, 'h:mm a');
}

export default function TimeSlotPicker({ slots, value, onChange, loading }) {
  if (loading) {
    return <p className="text-sm text-muted">Loading available times…</p>;
  }
  if (!slots.length) {
    return <p className="text-sm text-muted">No slots for this date.</p>;
  }

  const available = slots.filter((s) => s.available);

  return (
    <div>
      <p className="mb-3 text-sm text-charcoal">
        <span className="font-semibold text-rose-gold">{available.length}</span> slots remaining
      </p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
        {slots.map((s) => {
          const disabled = !s.available;
          const sel = value === s.time;
          return (
            <button
              key={s.time}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onChange(s.time)}
              className={`rounded-xl border-2 py-2.5 text-xs font-medium transition sm:text-sm ${
                disabled
                  ? 'cursor-not-allowed border-transparent bg-charcoal/5 text-charcoal/25'
                  : sel
                    ? 'border-rose-gold bg-rose-gold/20 text-charcoal shadow'
                    : 'border-cream bg-surface text-charcoal hover:border-rose-gold/40'
              }`}
            >
              {toLabel(s.time)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
