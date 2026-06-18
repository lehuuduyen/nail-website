import Link from 'next/link';
import { getRelatedPosts } from '@/lib/relatedPosts';

/**
 * "Related articles" for a service detail page — lists published blog posts that
 * match the service category. Renders nothing when there are no matches.
 * Props: { category: string; limit?: number }
 */
export default async function RelatedArticles({ category, limit = 3 }) {
  const posts = await getRelatedPosts(category, limit);
  if (posts.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl text-ink">Related articles</h2>
      <p className="mt-1 text-sm text-muted">Nail care tips &amp; guides from our blog</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group flex h-full flex-col rounded-xl border border-rose-gold/15 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-rose-gold/40 hover:shadow-md"
          >
            <h3 className="font-display text-lg leading-snug text-ink group-hover:text-rose-gold">
              {p.title}
            </h3>
            {p.excerpt && (
              <p className="mt-2 line-clamp-3 flex-1 text-sm text-charcoal/80">{p.excerpt}</p>
            )}
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-rose-gold">
              Read more →{p.readingMinutes ? ` · ${p.readingMinutes} min` : ''}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
