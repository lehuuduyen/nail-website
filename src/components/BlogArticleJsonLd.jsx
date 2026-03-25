import { absoluteUrl } from '@/lib/siteUrl';
import { salonName } from '@/lib/salon';

export default function BlogArticleJsonLd({ post }) {
  if (!post?.slug || !post?.title) return null;
  const site = absoluteUrl('/');
  const url = absoluteUrl(`/blog/${post.slug}`);
  const org = salonName();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: {
      '@type': 'Organization',
      name: org,
      url: site,
    },
    publisher: {
      '@type': 'Organization',
      name: org,
      url: site,
    },
    url,
    keywords: post.keywords,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
