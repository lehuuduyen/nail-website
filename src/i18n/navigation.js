import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Bản Link/router locale-aware — tự thêm prefix /es /vi cho path nội bộ.
 * Dùng THAY cho next/link & usePathname/useRouter của next/navigation ở mọi
 * điều hướng nội bộ. (useSearchParams & notFound vẫn lấy từ next/navigation.)
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
