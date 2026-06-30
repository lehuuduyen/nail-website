import Link from 'next/link';

/**
 * Global 404 — render cho path NẰM NGOÀI segment [locale] (vd locale lạ không khớp
 * matcher). Không có i18n context ở đây nên dùng tiếng Anh + tự render <html>/<body>
 * (vì root layout nằm trong [locale]/layout.jsx, không bọc route này).
 */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: '#F7F3F2',
          color: '#3D3836',
          fontFamily: 'system-ui, sans-serif',
          padding: '2rem',
        }}
      >
        <p style={{ fontSize: '3.5rem', margin: 0, color: '#9E8B85' }}>404</p>
        <h1 style={{ fontSize: '1.75rem', marginTop: '0.5rem' }}>Page not found</h1>
        <p style={{ marginTop: '0.5rem' }}>
          The page you’re looking for doesn’t exist.
        </p>
        <Link
          href="/"
          style={{
            marginTop: '2rem',
            background: '#9E8B85',
            color: '#fff',
            padding: '0.75rem 1.75rem',
            borderRadius: '9999px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Back to home
        </Link>
      </body>
    </html>
  );
}
