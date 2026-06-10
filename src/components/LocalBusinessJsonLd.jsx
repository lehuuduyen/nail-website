import { getLocalBusinessJsonLd } from '@/lib/localBusinessJsonLd';
import { fetchPlaceStats } from '@/lib/googleReviews';

export default async function LocalBusinessJsonLd() {
  const data = getLocalBusinessJsonLd();
  const stats = await fetchPlaceStats();
  if (stats) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: stats.rating,
      reviewCount: stats.reviewCount,
      bestRating: '5',
      worstRating: '1',
    };
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
