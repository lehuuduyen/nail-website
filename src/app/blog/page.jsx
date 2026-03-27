import Link from 'next/link';
import { getApiOrigin } from '@/lib/api';
import { salonName } from '@/lib/salon';

export const metadata = {
  title: 'Nail care tips & blog',
  description:
    'Helpful articles on manicures, pedicures, gel and acrylic nails, hygiene, and booking — from Nice Nails & Spa in Phoenix, AZ.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Nail salon blog | Nice Nails & Spa Phoenix',
    description: 'Expert tips for healthy, beautiful nails in Phoenix, Arizona.',
  },
};

async function fetchPosts() {
  try {
    const res = await fetch(`${getApiOrigin()}/api/public/blog`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}

export default async function BlogPage() {
  const posts = await fetchPosts();
  const name = salonName();

  return (
    <div className="min-h-screen bg-cream">
      <section className="border-b border-rose-gold/15 bg-gradient-to-b from-cream-dark/90 via-cream to-cream px-4 py-12 text-center md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
          {name}
        </p>
        <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">Salon blog</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-charcoal md:text-base">
          Practical guides for nails, spa services, and getting the most from your visit — written
          for our Phoenix guests.
        </p>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        {posts.length === 0 ? (
          <p className="rounded-2xl border border-lavender/30 bg-surface/80 px-6 py-10 text-center text-charcoal">
            Articles are loading soon. Please check back, or{' '}
            <Link href="/booking" className="font-semibold text-rose-gold underline">
              book an appointment
            </Link>{' '}
            with us today.
          </p>
        ) : (
          <ul className="space-y-6">
            {posts.map((p) => (
              <li key={p.id}>
                <article className="rounded-2xl border border-rose-gold/15 bg-surface/85 p-6 shadow-sm transition hover:border-rose-gold/30 md:p-8">
                  <time
                    dateTime={p.publishedAt}
                    className="text-xs font-medium uppercase tracking-wide text-muted"
                  >
                    {formatDate(p.publishedAt)}
                    {p.readingMinutes ? ` · ${p.readingMinutes} min read` : ''}
                  </time>
                  <h2 className="mt-2 font-display text-2xl text-ink md:text-3xl">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="transition hover:text-rose-gold-deep"
                    >
                      {p.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal md:text-base">
                    {p.excerpt}
                  </p>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="mt-4 inline-block text-sm font-semibold text-rose-gold underline decoration-rose-gold/40 underline-offset-4 hover:text-rose-gold-deep"
                  >
                    Read article →
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
