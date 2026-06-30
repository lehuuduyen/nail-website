import { defineRouting } from 'next-intl/routing';

/**
 * Cấu hình i18n trung tâm — dùng chung cho middleware, navigation, request config.
 * - en: mặc định, KHÔNG prefix (nicenailsaz.com/)
 * - es: nicenailsaz.com/es
 * - vi: nicenailsaz.com/vi
 * localePrefix 'as-needed' → chỉ es/vi có prefix; localeDetection bật để middleware
 * tự đọc Accept-Language + cookie NEXT_LOCALE và redirect mềm LẦN ĐẦU (302).
 */
export const routing = defineRouting({
  locales: ['en', 'es', 'vi'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: true,
});
