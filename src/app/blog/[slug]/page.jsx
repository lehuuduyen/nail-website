import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getApiOrigin } from '@/lib/api';
import { absoluteUrl } from '@/lib/siteUrl';
import { salonName } from '@/lib/salon';
import BlogArticleJsonLd from '@/components/BlogArticleJsonLd';

export const revalidate = 3600;

async function fetchPost(slug) {
  try {
    const res = await fetch(`${getApiOrigin()}/api/public/blog/${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug);
  if (!post) {
    return { title: 'Article' };
  }
  const kw = post.keywords
    ? String(post.keywords)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : undefined;
  return {
    title: post.title,
    description: post.metaDescription || post.excerpt,
    keywords: kw,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      url: absoluteUrl(`/blog/${post.slug}`),
    },
  };
}

function ArticleBody({ content }) {
  const parts = String(content || '')
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  return (
    <div className="mt-8">
      {parts.map((para, i) => (
        <p key={i} className="mb-4 text-base leading-relaxed text-charcoal/85 last:mb-0 md:text-lg">
          {para}
        </p>
      ))}
    </div>
  );
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

export default async function BlogArticlePage({ params }) {
  const post = await fetchPost(params.slug);
  if (!post) notFound();

  const name = salonName();

  return (
    <>
      <BlogArticleJsonLd post={post} />
      <article className="min-h-screen bg-cream pb-20">
        <div className="border-b border-rose-gold/15 bg-surface/80 px-4 py-8 backdrop-blur-sm md:py-10">
          <div className="mx-auto max-w-3xl">
            <nav className="text-xs text-charcoal/55" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1">
                <li>
                  <Link href="/" className="hover:text-rose-gold">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/blog" className="hover:text-rose-gold">
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="line-clamp-1 text-charcoal/70">{post.title}</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {name}
            </p>
            <h1 className="mt-2 font-display text-3xl leading-tight text-ink md:text-4xl lg:text-[2.5rem]">
              {post.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              {post.readingMinutes ? (
                <>
                  <span aria-hidden>·</span>
                  <span>{post.readingMinutes} min read</span>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
          <p className="font-display text-lg italic leading-relaxed text-charcoal/80 md:text-xl">
            {post.excerpt}
          </p>
          <ArticleBody content={post.content} />

          <div className="mt-12 rounded-2xl border border-rose-gold/20 bg-surface/90 p-6 text-center md:p-8">
            <p className="font-display text-xl text-ink">Ready to visit us?</p>
            <p className="mt-2 text-sm text-charcoal/70">
              Book online or call — walk-ins welcome when we have space.
            </p>
            <Link
              href="/booking"
              className="mt-5 inline-flex rounded-full bg-luxury-gold px-8 py-3 text-sm font-semibold text-white shadow-md no-underline transition hover:opacity-95"
            >
              Book appointment
            </Link>
          </div>

          <p className="mt-10 text-center">
            <Link
              href="/blog"
              className="text-sm font-semibold text-rose-gold underline decoration-rose-gold/40 underline-offset-4"
            >
              ← All articles
            </Link>
          </p>
        </div>
      </article>
    </>
  );
}
