import Link from 'next/link';
import { CATEGORY_ACCENT, getServiceDisplayName } from '@/data/services';

function formatMoney(n) {
  if (n == null || Number.isNaN(Number(n))) return '—';
  return `$${Number(n).toFixed(2)}`;
}

export default function ServiceCard({
  service,
  showBookButton = true,
  compact = false,
}) {
  const accent =
    CATEGORY_ACCENT[service.category] || 'border-l-rose-gold/50';
  const displayName = getServiceDisplayName(service);

  return (
    <article
      className={`group flex h-full flex-col rounded-xl border border-rose-gold/15 bg-surface shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-rose-gold/40 hover:shadow-md ${accent} border-l-[3px]`}
    >
      <div className={compact ? 'flex flex-1 flex-col p-4' : 'flex flex-1 flex-col p-5 md:p-6'}>
        <h3 className="font-display text-lg font-medium text-ink md:text-xl">
          {displayName}
        </h3>
        {service.nameVi ? (
          <p className="mt-1 text-sm text-muted">{service.nameVi}</p>
        ) : null}
        {service.description && !compact && (
          <p className="mt-2 text-sm leading-relaxed text-charcoal">
            {service.description}
          </p>
        )}
        {service.description && compact && (
          <p className="mt-1 line-clamp-2 text-xs text-muted">
            {service.description}
          </p>
        )}

        <div className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-800">
          <span aria-hidden>⏱</span>
          <span>{service.duration} min</span>
        </div>

        <div className="mt-4 border-t border-rose-gold/10 pt-4">
          <p className="text-sm font-semibold text-charcoal">
            Cash: <span className="text-2xl font-semibold text-charcoal">{formatMoney(service.price)}</span>
          </p>
          {service.priceCard != null ? (
            <p className="mt-1 text-sm text-muted">
              Card: {formatMoney(service.priceCard)}
            </p>
          ) : (
            <p className="mt-0.5 text-xs text-muted">Card price N/A — cash only for this item.</p>
          )}
        </div>

        {showBookButton && (
          <Link
            href={`/booking?service=${service.id}`}
            className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-rose-gold px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-gold-deep"
          >
            Book now
          </Link>
        )}
      </div>
    </article>
  );
}
