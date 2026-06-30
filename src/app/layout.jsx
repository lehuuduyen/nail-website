/**
 * Root layout pass-through. <html>/<body> được render ở [locale]/layout.jsx và ở
 * not-found.jsx (global). Layout này chỉ tồn tại để Next có "root layout" hợp lệ
 * bọc cả segment [locale] lẫn trang 404 toàn cục (pattern chuẩn của next-intl).
 */
export default function RootLayout({ children }) {
  return children;
}
