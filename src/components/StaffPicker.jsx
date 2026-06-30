'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

function initials(emp) {
  const a = (emp.firstName || '').charAt(0);
  const b = (emp.lastName || '').charAt(0);
  return (a + b).toUpperCase() || '?';
}

const colors = [
  'bg-dusty-rose text-charcoal',
  'bg-rose-gold/40 text-charcoal',
  'bg-charcoal text-cream',
  'bg-amber-200/80 text-amber-950',
];

function AvatarCircle({ emp, idx }) {
  const color = colors[idx % colors.length];
  if (emp.avatarUrl) {
    return (
      <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-cream">
        <Image
          src={emp.avatarUrl}
          alt={`${emp.firstName} ${emp.lastName}`}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
    );
  }
  return (
    <div className={`flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold ${color}`}>
      {initials(emp)}
    </div>
  );
}

export default function StaffPicker({ employees, valueId, onChange }) {
  const t = useTranslations('booking');
  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`w-full rounded-2xl border-2 p-4 text-left font-medium transition ${
          valueId == null
            ? 'border-rose-gold bg-rose-gold/10'
            : 'border-cream bg-surface hover:border-rose-gold/30'
        }`}
      >
        {t('noPreference')}
      </button>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(employees || []).map((emp, idx) => {
          const selected = valueId === emp.id;
          return (
            <button
              key={emp.id}
              type="button"
              onClick={() => onChange(emp.id)}
              className={`flex flex-col items-center rounded-2xl border-2 p-6 text-center transition ${
                selected
                  ? 'border-rose-gold bg-rose-gold/10 shadow-lg'
                  : 'border-cream bg-surface hover:border-rose-gold/30'
              }`}
            >
              <AvatarCircle emp={emp} idx={idx} />
              <p className="mt-3 font-display text-lg text-ink">
                {emp.firstName} {emp.lastName}
              </p>
              <p className="text-xs text-muted">{t('nailSpecialist')}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
