import { getSiteJsonLd } from '@/lib/localBusinessJsonLd';

/** Organization + WebSite structured data (brand/site signal for Google sitelinks). */
export default function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getSiteJsonLd()) }}
    />
  );
}
