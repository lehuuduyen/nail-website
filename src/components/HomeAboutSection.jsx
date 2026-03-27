import { salonName, salonAddress } from '@/lib/salon';

export default function HomeAboutSection() {
  const name = salonName();
  const address = salonAddress();

  return (
    <section
      id="about"
      className="scroll-mt-24 border-b border-rose-gold/10 bg-cream px-4 py-14 md:py-20"
      aria-labelledby="home-about-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="home-about-heading"
          className="font-display text-3xl text-ink md:text-4xl"
        >
          About {name}
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal md:text-lg">
          <p>
            Welcome to {name}, a <strong>nail salon North Phoenix AZ</strong> neighbors choose for
            careful work, a relaxed pace, and a team that greets you like a regular from day one. Our
            studio sits at <strong>8048 N 19th Ave Phoenix AZ 85021</strong>, a convenient stop whether
            you are coming from deeper in <strong>North Phoenix</strong>, commuting from{' '}
            <strong>Glendale</strong>, or heading over from <strong>Peoria</strong> for an afternoon
            reset.
          </p>
          <p>
            From a polished <strong>manicure</strong> or spa-style <strong>pedicure</strong> to full{' '}
            <strong>acrylic nails</strong>, gel enhancements, and <strong>dip powder</strong>, we shape
            every service around your lifestyle. Love a little sparkle? Our <strong>nail art</strong>{' '}
            options make birthdays, weddings, and everyday confidence feel effortless. We keep stations
            tidy, explain aftercare in plain language, and never rush the details—because great nails
            should feel as good as they look.
          </p>
          <p>
            Step in when you need a refresh, a repair, or a full new set; we are here to help you leave
            feeling put-together, listened to, and ready for whatever is next on your calendar.
          </p>
        </div>
      </div>
    </section>
  );
}
