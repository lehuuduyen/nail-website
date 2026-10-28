import { useTranslations } from 'next-intl';
import { salonName, salonAddress, salonHours } from '@/lib/salon';

function faqPageJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export default function HomeFaqSection() {
  const t = useTranslations('home.faq');
  const name = salonName();
  const address = salonAddress();
  const hours = salonHours();

  const items = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3', { name, address }) },
    { q: t('q4'), a: t('a4') },
    { q: t('q5'), a: t('a5', { hours }) },
  ];
  const jsonLd = faqPageJsonLd(items);

  return (
    /* Conversational-FAQ voice on hairlines: each Q/A is a ruled row rather than a
       gap in a list. Hairlines over cards is the editorial rule, and the FAQPage
       JSON-LD below is untouched — it is a ranking asset. */
    <section
      className="bg-paper px-4 py-2xl md:py-3xl"
      aria-labelledby="home-faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <header className="head-hang !pt-0">
          <h2 id="home-faq-heading">{t('heading')}</h2>
        </header>
        <ul>
          {items.map((item) => (
            <li key={item.q} className="border-t border-rule-soft py-lg">
              <h3 className="text-step-md font-semibold text-ink">{item.q}</h3>
              <p className="measure mt-sm text-step-base leading-[1.65] text-ink-2">{item.a}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
