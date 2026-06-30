import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { CATEGORY_ACCENT, getServiceDisplayName } from '@/data/services';
import { SERVICE_IMAGE_BY_CATEGORY, SERVICE_IMAGE_FALLBACK } from '@/lib/siteImages';
import { getPublicBaseUrl } from '@/lib/api';
import { unoptimizedRemote } from '@/lib/imageOptimize';

/** Resolve a stored service image URL to an absolute, host-correct URL. */
function resolveImageSrc(url) {
  if (!url) return null;
  const b = getPublicBaseUrl();
  if (url.startsWith('http')) {
    // Rewrite localhost-baked URLs to the current API origin (dev/prod parity).
    if (/https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/.test(url)) {
      return url.replace(/https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, b);
    }
    return url;
  }
  return `${b}${url.startsWith('/') ? '' : '/'}${url}`;
}

function priceFmt(n) {
  if (n == null || isNaN(Number(n))) return '—';
  const v = Number(n);
  return v % 1 === 0 ? `$${v}` : `$${v.toFixed(2)}`;
}

/** Card price = cash + 3% processing fee, exact (no rounding). */
function cardPriceFmt(price) {
  if (price == null || isNaN(Number(price))) return null;
  return (Number(price) * 1.03).toFixed(2);
}

function parseFeatures(desc) {
  if (!desc) return [];
  const items = desc
    .replace(/\s+and\s+/gi, ', ')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 1 && s.length <= 60);
  return items.length >= 2 ? items : [];
}

function getPriceLabel(name) {
  if (!name) return 'Cash';
  return /gel/i.test(name) ? 'Gel' : 'Cash';
}

const TIER_MAP = {
  'Manicure 1':      { label: 'Classic',           cls: 'bg-amber-50 text-amber-700' },
  'Manicure 2':      { label: 'Deluxe',            cls: 'bg-purple-50 text-purple-700' },
  'Manicure 3':      { label: 'Deep',              cls: 'bg-indigo-50 text-indigo-700' },
  'Pedicure 1':      { label: 'Classic',           cls: 'bg-amber-50 text-amber-700' },
  'Pedicure 2':      { label: 'Signature ✦',       cls: 'bg-rose-50 text-rose-700' },
  'Pedicure 3':      { label: 'Deluxe ✦✦',        cls: 'bg-purple-50 text-purple-700' },
  'Pedicure 4':      { label: 'Royal ✦✦✦',        cls: 'bg-yellow-50 text-yellow-700' },
  'Pedicure 5':      { label: 'Luxurious ✦✦✦✦',   cls: 'bg-pink-50 text-pink-700' },
  'Pedicure 6':      { label: 'Jelly Spa ✦✦✦✦✦',  cls: 'bg-teal-50 text-teal-700' },
  'Pedicure 7':      { label: 'Golden ✦✦✦✦✦✦',    cls: 'bg-yellow-50 text-yellow-900' },
  'Head Spa Combo 1':{ label: 'Basic',             cls: 'bg-sky-50 text-sky-700' },
  'Head Spa Combo 2':{ label: 'Deluxe',            cls: 'bg-purple-50 text-purple-700' },
  'Head Spa Combo 3':{ label: 'Royal',             cls: 'bg-yellow-50 text-yellow-700' },
  'Facial Combo 1':  { label: 'Hydrating',         cls: 'bg-green-50 text-green-700' },
  'Facial Combo 2':  { label: 'Deep Clean',        cls: 'bg-blue-50 text-blue-700' },
  'Facial Combo 3':  { label: 'Detox',             cls: 'bg-emerald-50 text-emerald-700' },
};

function getTier(name) {
  if (!name) return null;
  for (const [prefix, val] of Object.entries(TIER_MAP)) {
    if (name.startsWith(prefix)) return val;
  }
  return null;
}

export default function ServiceCard({
  service,
  gel = null,
  showBookButton = true,
  compact = false,
  showImage = true,
  // Optional suffix appended after the cash/gel prices — e.g. '& Up' for "starting at" pricing.
  // When set, hides the card-fee sub-line (range pricing has no exact card total).
  priceSuffix = null,
}) {
  const accent = CATEGORY_ACCENT[service.category] || 'border-l-rose-gold/50';
  const displayName = getServiceDisplayName(service);
  // Per-service image from DB (admin-managed) → falls back to the category image.
  const fallbackImg = SERVICE_IMAGE_BY_CATEGORY[service.category] || SERVICE_IMAGE_FALLBACK;
  const remoteSrc = resolveImageSrc(service.imageUrl);
  const imgSrc = remoteSrc || fallbackImg.src;
  const imgAlt = remoteSrc ? displayName : fallbackImg.alt;
  const tier = getTier(service.name);
  const priceLabel = getPriceLabel(service.name);
  const features = compact ? [] : parseFeatures(service.description);
  const gelUpcharge =
    gel && service.price != null && gel.price != null
      ? Number(gel.price) - Number(service.price)
      : null;

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-rose-gold/15 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-rose-gold/40 hover:shadow-md ${accent} border-l-4`}
    >
      {showImage && imgSrc && (
        <div className={`relative w-full overflow-hidden ${compact ? 'aspect-[16/7]' : 'aspect-[16/10]'}`}>
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            loading="lazy"
            quality={80}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized={unoptimizedRemote(imgSrc)}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
          {/* Soft gradient → luxe depth + keeps the tier badge legible */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
          {tier && (
            <span
              className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow-sm ${tier.cls}`}
            >
              {tier.label}
            </span>
          )}
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/85 px-2 py-0.5 text-[11px] font-medium text-charcoal backdrop-blur-sm">
            <span aria-hidden className="text-rose-gold">⏱</span>
            {service.duration} min
          </span>
        </div>
      )}
      <div className={`flex flex-1 flex-col ${compact ? 'p-4' : 'p-5 md:p-6'}`}>

        {/* Tier badge + duration — only when there's no image (image shows them as overlays) */}
        {!showImage && (
          <div className="mb-3 flex min-h-[22px] items-center justify-between gap-2">
            {tier ? (
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${tier.cls}`}>
                {tier.label}
              </span>
            ) : <span />}
            <span className="flex items-center gap-1 text-xs text-muted">
              <span aria-hidden className="text-rose-gold/70">⏱</span>
              {service.duration} min
            </span>
          </div>
        )}

        {/* Service name */}
        <h3 className={`font-display font-medium leading-snug text-ink ${compact ? 'text-base' : 'text-lg md:text-xl'}`}>
          {displayName}
        </h3>

        {/* Price — shown right under the name */}
        <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xl font-bold text-charcoal">
          <span>
            <span className="text-sm font-semibold text-muted">{priceLabel} </span>
            {priceFmt(service.price)}
            {priceSuffix && <span className="text-sm font-semibold text-muted"> {priceSuffix}</span>}
          </span>
          {gel && (
            <span className="rounded-full bg-lavender/15 px-2 py-0.5 text-xs font-semibold text-lavender-deep">
              Gel {priceFmt(gel.price)}
              {priceSuffix ? (
                <span className="font-normal"> {priceSuffix}</span>
              ) : (
                gelUpcharge > 0 && (
                  <span className="font-normal text-muted"> </span>
                )
              )}
            </span>
          )}
        </p>

        {/* Features */}
        <div className="mt-3 flex-1">
          {features.length >= 2 ? (
            <ul className="space-y-1" aria-label="Includes">
              {features.slice(0, 8).map((f, i) => (
                <li key={i} className="text-sm text-charcoal">
                  {f}
                </li>
              ))}
              {features.length > 8 && (
                <li className="text-xs text-muted">+{features.length - 8} more</li>
              )}
            </ul>
          ) : compact && service.description ? (
            <p className="line-clamp-2 text-xs text-muted">{service.description}</p>
          ) : null}
        </div>

        {/* Card price + book button */}
        <div className="mt-4 border-t border-rose-gold/10 pt-4">
          {service.price != null && (
            <p className="mb-3 text-xs text-muted">
              Card ${cardPriceFmt(service.price)}
              {priceSuffix && <span> {priceSuffix}</span>}
              {gel && gel.price != null && (
                <span> · Gel ${cardPriceFmt(gel.price)}{priceSuffix && ` ${priceSuffix}`}</span>
              )}
            </p>
          )}
          {showBookButton && (
            <Link
              href={`/booking?service=${service.id}&svc=${encodeURIComponent(service.name)}`}
              className="inline-flex w-full items-center justify-center rounded-lg bg-rose-gold px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-gold-deep"
            >
              Book now
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
