import Link from 'next/link';
import { salonName, salonAddress } from '@/lib/salon';
import { absoluteUrl } from '@/lib/siteUrl';

const PAGE_TITLE = 'Terms and Conditions';
const LAST_UPDATED = 'May 8, 2026';

export const metadata = {
  title: PAGE_TITLE,
  description:
    'Terms and Conditions governing your use of the Nice Nails & Spa website, online booking, and related services.',
  openGraph: {
    title: `${PAGE_TITLE} | ${salonName()}`,
    description:
      'Terms governing your use of our website and online booking. Contact us with questions.',
    url: absoluteUrl('/terms'),
  },
};

export default function TermsPage() {
  const name = salonName();
  const address = salonAddress();
  const phone = process.env.NEXT_PUBLIC_SALON_PHONE || '';
  const privacyEmail = process.env.NEXT_PUBLIC_SALON_PRIVACY_EMAIL || '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-cream to-cream-dark/30">
      <section className="border-b border-rose-gold/15 bg-surface/85 px-4 py-10 text-center backdrop-blur-md">
        <h1 className="font-display text-3xl text-ink md:text-4xl">{PAGE_TITLE}</h1>
        <p className="mt-2 text-sm text-muted">{name}</p>
        <p className="mt-1 text-xs text-muted">Last updated: {LAST_UPDATED}</p>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12 pb-20 text-ink md:px-6">
        <div className="space-y-8 text-sm leading-relaxed text-charcoal md:text-[15px]">
          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Agreement to Terms</h2>
            <p className="mt-3">
              By accessing our website, using our online booking system, or visiting {name} , you agree to be bound by these Terms and Conditions. If you do not agree, please do
              not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Use of the Website</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                You may use this website for personal, non-commercial purposes only. You may not reproduce,
                distribute, or create derivative works without our written consent.
              </li>
              <li>
                You agree not to use the site in any way that violates applicable laws or regulations, or
                that harms, disables, or impairs the site or interferes with other users.
              </li>
              <li>
                We reserve the right to modify, suspend, or discontinue any part of the website at any
                time without notice or liability.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Online Booking</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-ink">Appointment requests.</strong> Submitting a booking form is a
                request for an appointment, not a guaranteed confirmation. Your appointment is confirmed
                only when you receive a confirmation message from us.
              </li>
              <li>
                <strong className="text-ink">Accurate information.</strong> You agree to provide accurate,
                complete, and current information when booking. We are not responsible for errors resulting
                from inaccurate information.
              </li>
              <li>
                <strong className="text-ink">Cancellations & no-shows.</strong> Please cancel or reschedule
                at least 24 hours in advance. Repeated no-shows or late cancellations may result in a
                deposit requirement or refusal of future bookings.
              </li>
              <li>
                <strong className="text-ink">Late arrivals.</strong> If you arrive more than 15 minutes
                late, we may need to shorten or reschedule your service to avoid inconveniencing other
                clients.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Services & Pricing</h2>
            <p className="mt-3">
              Prices and service descriptions on this website are subject to change without notice. Final
              pricing is confirmed at the time of your appointment. We reserve the right to refuse service
              to anyone for any lawful reason.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Payments & Refunds</h2>
            <p className="mt-3">
              Payment is due at the time of service. We accept major credit/debit cards and cash. Due to
              the nature of beauty services, all sales are final unless we determine a service error
              occurred on our part. Please let us know of any concerns before leaving the salon.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Health & Safety</h2>
            <p className="mt-3">
              For the safety of our staff and other clients, please inform us of any allergies, skin
              conditions, or health concerns before your service. We reserve the right to decline services
              that may pose a health or safety risk. We are not liable for adverse reactions resulting from
              failure to disclose relevant health information.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Intellectual Property</h2>
            <p className="mt-3">
              All content on this website — including text, images, logos, graphics, and design — is the
              property of {name} or its licensors and is protected by applicable copyright and trademark
              laws. You may not use our content without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">
              Disclaimer of Warranties
            </h2>
            <p className="mt-3">
              This website and its content are provided , without warranties of any kind, either
              express or implied, including but not limited to implied warranties of merchantability,
              fitness for a particular purpose, or non-infringement. We do not warrant that the website
              will be uninterrupted, error-free, or free of viruses.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Limitation of Liability</h2>
            <p className="mt-3">
              To the fullest extent permitted by law, {name} and its staff shall not be liable for any
              indirect, incidental, special, or consequential damages arising from your use of the website
              or our services. Our total liability for any claim arising out of or relating to these Terms
              shall not exceed the amount you paid for the specific service in question.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Third-Party Links</h2>
            <p className="mt-3">
              Our website may contain links to third-party websites (e.g., maps, social networks, review
              platforms). These links are provided for convenience only. We have no control over and assume
              no responsibility for the content or practices of any third-party sites.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">SMS Messaging Terms</h2>
            <p className="mt-3">
              By providing your phone number and opting in to receive SMS messages from {name}, you agree
              to the following:
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>
                <strong className="text-ink">SMS Services.</strong> You will receive appointment
                confirmations, reminders, and occasional service updates via text message.
              </li>
              <li>
                <strong className="text-ink">Opt-Out.</strong> You can cancel the SMS service at any time.
                Just text <strong className="text-ink">STOP</strong> to our business number. After we
                receive your STOP message, we will send a confirmation and you will no longer receive SMS
                messages from us.
              </li>
              <li>
                <strong className="text-ink">Help.</strong> If you are experiencing issues with the
                messaging program, reply with the keyword <strong className="text-ink">HELP</strong> for
                assistance, or contact us directly at{' '}
                <a href="tel:16026234921" className="text-rose-gold-deep underline">
                  (602) 623-4921
                </a>
                .
              </li>
              <li>
                <strong className="text-ink">Carriers.</strong> Carriers are not liable for delayed or
                undelivered messages.
              </li>
              <li>
                <strong className="text-ink">Rates.</strong> Message and data rates may apply for messages
                sent to or from us. Contact your wireless provider for questions about your text or data
                plan.
              </li>
              <li>
                <strong className="text-ink">Privacy.</strong> For all questions about the data we
                collect, please refer to our{' '}
                <Link href="/privacy" className="text-rose-gold-deep underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Privacy</h2>
            <p className="mt-3">
              Your use of our website and services is also governed by our{' '}
              <Link href="/privacy" className="text-rose-gold-deep underline underline-offset-2">
                Privacy Policy
              </Link>
              , which is incorporated into these Terms by reference.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Governing Law</h2>
            <p className="mt-3">
              These Terms are governed by the laws of the State of Arizona, without regard to its conflict
              of law provisions. Any disputes shall be resolved in the courts located in Maricopa County,
              Arizona.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Changes to These Terms</h2>
            <p className="mt-3">
              We may update these Terms at any time. Changes take effect when posted on this page. Your
              continued use of the website or services after changes are posted constitutes your acceptance
              of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Contact Us</h2>
            <p className="mt-3">
              Questions about these Terms? Contact {name}:
            </p>
            <ul className="mt-3 list-none space-y-1.5 pl-0">
              {address ? (
                <li>
                  <strong className="text-ink">Address:</strong> {address}
                </li>
              ) : null}
              {phone ? (
                <li>
                  <strong className="text-ink">Phone:</strong>{' '}
                  <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-rose-gold-deep underline">
                    {phone}
                  </a>
                </li>
              ) : null}
              {privacyEmail ? (
                <li>
                  <strong className="text-ink">Email:</strong>{' '}
                  <a href={`mailto:${privacyEmail}`} className="text-rose-gold-deep underline">
                    {privacyEmail}
                  </a>
                </li>
              ) : (
                <li className="text-muted">
                  For written inquiries, please call or visit us at the address above.
                </li>
              )}
            </ul>
          </section>
        </div>

        <p className="mt-12 text-center">
          <Link
            href="/"
            className="text-sm font-semibold text-rose-gold-deep underline decoration-rose-gold/40 underline-offset-4 hover:text-ink"
          >
            ← Back to home
          </Link>
        </p>
      </article>
    </div>
  );
}
