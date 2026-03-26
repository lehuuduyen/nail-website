import { salonName, salonAddress, salonHours } from '@/lib/salon';

function homeFaqItems() {
  const name = salonName();
  const address = salonAddress();
  const hours = salonHours();

  return [
    {
      q: 'Do you accept walk-ins at your Phoenix nail salon?',
      a: 'Yes. We welcome walk-ins at Nice Nails & Spa whenever we have an open chair, especially on quieter weekdays. Evenings and Saturdays can fill up quickly, so booking online secures your time and helps us prepare for nail art or longer services.',
    },
    {
      q: 'How much does a manicure cost at Nice Nails & Spa?',
      a: 'Classic manicures start at $30; deluxe and deep options are priced higher and gel polish is available at an upgraded rate. Final price depends on the exact service and add-ons you choose—see our manicure menu online or ask at check-in.',
    },
    {
      q: 'Where is Nice Nails & Spa located in Phoenix AZ?',
      a: `${name} is located at ${address}, in North Phoenix ZIP 85021. Tap Directions on our site or search the salon on Google Maps for turn-by-turn routing and parking tips.`,
    },
    {
      q: 'What nail services do you offer?',
      a: 'We offer manicures and pedicures, acrylic and gel nails, dipping powder, nail art and add-ons, plus lash, waxing, facial, head spa, and kids services. Browse full menus by category on our Services page.',
    },
    {
      q: 'What are your hours?',
      a: `Our regular hours are ${hours}. Holiday hours may vary—call ahead or check Google before you visit on a major holiday.`,
    },
  ];
}

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
  const items = homeFaqItems();
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
          Frequently Asked Questions
        </h2>
        <ul className="mt-10 space-y-8">
          {items.map((item) => (
            <li key={item.q}>
              <h3 className="text-lg font-semibold text-charcoal">{item.q}</h3>
              <p className="mt-2 text-base leading-relaxed text-charcoal/75">{item.a}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
