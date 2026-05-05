import { salonAddress, salonHours, salonMapsUrl, salonMapsEmbedUrl, salonPhone } from '@/lib/salon';

export default function LocationSection() {
  const address = salonAddress();
  const hours = salonHours();
  const mapsUrl = salonMapsUrl();
  const phone = salonPhone();
  const embedUrl =
    salonMapsEmbedUrl() ||
    `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed&z=15`;

  const hourLines = hours.split('·').map((h) => h.trim()).filter(Boolean);

  return (
    <section
      id="location"
      className="scroll-mt-24 bg-white px-4 py-14 md:py-20"
      aria-labelledby="location-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="location-heading"
          className="font-display text-3xl text-ink md:text-4xl text-center mb-10"
        >
          Find Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Map embed */}
          <div className="rounded-2xl overflow-hidden shadow-md min-h-[320px] md:min-h-[420px]">
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', minHeight: '320px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nice Nails & Spa location map"
            />
          </div>

          {/* Contact info */}
          <div className="flex flex-col justify-center space-y-8 py-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-1">
                Address
              </p>
              <p className="text-charcoal text-base leading-snug">{address}</p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-rose-500 hover:text-rose-600 transition-colors"
              >
                Get directions
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M4.75 2a.75.75 0 0 0 0 1.5h6.19L2.22 12.22a.75.75 0 1 0 1.06 1.06L12 4.561v6.189a.75.75 0 0 0 1.5 0V2.75A.75.75 0 0 0 12.75 2H4.75Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-1">
                Hours
              </p>
              {hourLines.map((line) => (
                <p key={line} className="text-charcoal text-base">{line}</p>
              ))}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-1">
                Phone
              </p>
              <a
                href={`tel:${phone.replace(/\D/g, '')}`}
                className="text-charcoal text-base hover:text-rose-500 transition-colors"
              >
                {phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
