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
    <section
      className="bg-cream px-4 py-14 md:py-20"
      aria-labelledby="home-faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <h2
          id="home-faq-heading"
          className="font-display text-3xl text-ink md:text-4xl"
        >
          {t('heading')}
        </h2>
        <ul className="mt-10 space-y-8">
          {items.map((item) => (
            <li key={item.q}>
              <h3 className="text-lg font-semibold text-charcoal">{item.q}</h3>
              <p className="mt-2 text-base leading-relaxed text-charcoal">{item.a}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
