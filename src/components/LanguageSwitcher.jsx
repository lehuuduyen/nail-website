'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const LABELS = { en: 'EN', es: 'ES', vi: 'VI' };
const NAMES = { en: 'English', es: 'Español', vi: 'Tiếng Việt' };

/**
 * Đổi ngôn ngữ giữ NGUYÊN path + query + hash. next-intl tự ghi cookie NEXT_LOCALE
 * khi điều hướng với option {locale} → lần sau theo cookie, khách luôn thoát được auto-detect.
 *
 * Đọc query/hash từ window.location ngay lúc click (không dùng useSearchParams hook —
 * tránh ép cả layout bail-out khỏi static rendering / lỗi Suspense khi prerender).
 */
export default function LanguageSwitcher({ className = '' }) {
  const active = useLocale();
  const pathname = usePathname(); // đã bỏ prefix locale
  const router = useRouter();

  const switchTo = (next) => {
    if (next === active) return;
    const search = typeof window !== 'undefined' ? window.location.search : '';
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    router.replace(`${pathname}${search}${hash}`, { locale: next });
  };

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((loc, i) => {
        const isActive = loc === active;
        return (
          <span key={loc} className="flex items-center">
            {i > 0 && <span className="mx-0.5 text-cream/30" aria-hidden>·</span>}
            <button
              type="button"
              onClick={() => switchTo(loc)}
              aria-current={isActive ? 'true' : undefined}
              aria-label={NAMES[loc]}
              className={`rounded px-1.5 py-1 text-xs font-semibold uppercase tracking-wide transition ${
                isActive
                  ? 'text-rose-gold'
                  : 'text-cream/70 hover:text-rose-gold'
              }`}
            >
              {LABELS[loc]}
            </button>
          </span>
        );
      })}
    </div>
  );
}
