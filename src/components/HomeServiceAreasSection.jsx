import { salonName } from '@/lib/salon';

export default function HomeServiceAreasSection() {
  const name = salonName();

  return (
    <section
      className="border-b border-rose-gold/10 bg-cream-dark/25 px-4 py-14 md:py-20"
      aria-labelledby="service-areas-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="service-areas-heading"
          className="font-display text-3xl text-ink md:text-4xl"
        >
          Serving North Phoenix &amp; Surrounding Areas
        </h2>
        <p className="mt-3 text-sm text-charcoal/70 md:text-base">
          {name} welcomes guests from across the Valley—here are a few communities we see often.
        </p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-charcoal/85 md:text-lg">
          <p>
            <strong className="text-charcoal">North Phoenix.</strong> We are proud to call North Phoenix
            home and to serve neighbors who want dependable manicures, pedicures, and enhancements without
            driving across town. Many guests pair a nail visit with errands along 19th Avenue or a quick
            stop after work.
          </p>
          <p>
            <strong className="text-charcoal">Glendale AZ.</strong> Just west of our salon, Glendale
            clients book gel refreshes, acrylic fills, and relaxing pedicures at {name} when they want
            experienced technicians and straightforward scheduling.
          </p>
          <p>
            <strong className="text-charcoal">Peoria AZ.</strong> Peoria residents often choose us for
            nail art, dip powder, and full sets before events or vacations—the short trip to our North
            Phoenix location is worth it for a calm room and consistent results.
          </p>
          <p>
            <strong className="text-charcoal">Deer Valley AZ.</strong> If you live or work around the
            Deer Valley corridor, {name} is an easy option for lunch-break manicures and polish changes
            with room to unwind.
          </p>
          <p>
            <strong className="text-charcoal">Moon Valley AZ.</strong> Moon Valley guests regularly visit
            for pedicures, acrylic maintenance, and kid-friendly services when the whole family needs
            polish—book online or call ahead and we will do our best to fit you in.
          </p>
        </div>
      </div>
    </section>
  );
}
