import { absoluteUrl } from '@/lib/siteUrl';

/**
 * BreadcrumbList JSON-LD for Google SERP breadcrumbs.
 * items: [{ name: string, path: string }]  — path is relative (e.g. '/services/manicure')
 */
export default function BreadcrumbJsonLd({ items }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
