export default function BlogFaqJsonLd({ faqs }) {
  if (!Array.isArray(faqs) || !faqs.length) return null;
  const mainEntity = faqs
    .filter((f) => f && f.q && f.a)
    .map((f) => ({
      '@type': 'Question',
      name: String(f.q),
      acceptedAnswer: {
        '@type': 'Answer',
        text: String(f.a),
      },
    }));
  if (!mainEntity.length) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
