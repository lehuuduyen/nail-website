import { getLocalBusinessJsonLd } from '@/lib/localBusinessJsonLd';

export default function LocalBusinessJsonLd() {
  const data = getLocalBusinessJsonLd();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
