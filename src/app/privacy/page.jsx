import Link from 'next/link';
import { salonName, salonAddress } from '@/lib/salon';
import { absoluteUrl } from '@/lib/siteUrl';

const PAGE_TITLE = 'Privacy Policy';
const LAST_UPDATED = 'March 29, 2026';

export const metadata = {
  title: PAGE_TITLE,
  description:
    'How Nice Nails & Spa collects, uses, and protects your information when you use our website, book appointments, and related services.',
  openGraph: {
    title: `${PAGE_TITLE} | ${salonName()}`,
    description:
      'Privacy practices for our website and online booking. Contact us with questions.',
    url: absoluteUrl('/privacy'),
  },
};

export default function PrivacyPage() {
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
            <h2 className="font-display text-xl text-ink md:text-2xl">Introduction</h2>
            <p className="mt-3">
              {name} (“we,” “us,” or “our”) respects your privacy. This Privacy Policy describes how we
              collect, use, disclose, and safeguard information when you visit our website, use our online
              booking, or interact with related services operated on our behalf (including our salon
              management tools). By using our services, you agree to this policy. If you do not agree,
              please do not use the website or booking features.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Information we collect</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-ink">Website usage.</strong> We may collect technical data such as
                browser type, device type, approximate region (from IP), pages viewed, and referring URLs.
                We do not use third-party advertising cookies on this site unless we add them later and update
                this policy.
              </li>
              <li>
                <strong className="text-ink">Online booking.</strong> When you book an appointment, we
                collect the information you provide: name, phone number, email (if provided), selected
                service, preferred staff or time, appointment notes, and similar details needed to schedule
                and confirm your visit.
              </li>
              <li>
                <strong className="text-ink">Communications.</strong> If you contact us by phone, email, or
                social media, we retain the content and metadata needed to respond and provide service.
              </li>
              <li>
                <strong className="text-ink">Salon visit & POS.</strong> In the salon, we may process
                payment and appointment data through our business systems. Card processing is handled by
                payment partners subject to their privacy policies; we do not store full card numbers on our
                website.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">How we use information</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>To schedule, confirm, reschedule, or cancel appointments.</li>
              <li>To communicate with you about your visit (reminders, changes, follow-up).</li>
              <li>To operate, secure, and improve our website and booking experience.</li>
              <li>To comply with law, respond to lawful requests, and protect our rights and customers.</li>
              <li>For internal analytics and salon operations (e.g., staffing, service demand).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Legal bases (where applicable)</h2>
            <p className="mt-3">
              Where required by law, we rely on appropriate bases such as performing a contract (providing
              the appointment you requested), legitimate interests (operating and securing our business), and
              consent when we ask for it (e.g., marketing, if offered).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Sharing of information</h2>
            <p className="mt-3">
              We may share information with service providers who assist us (for example: website hosting,
              appointment software, payment processors, email/SMS providers). They may only use data as
              instructed. We may disclose information if required by law or to protect safety and security.
              We do not sell your personal information for money.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Retention</h2>
            <p className="mt-3">
              We keep information for as long as needed to provide services, meet legal and accounting
              obligations, and resolve disputes. Retention periods vary by data type and legal requirements.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Security</h2>
            <p className="mt-3">
              We use reasonable administrative, technical, and organizational measures to protect
              information. No method of transmission over the Internet is 100% secure; we cannot guarantee
              absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Your choices and rights</h2>
            <p className="mt-3">
              Depending on where you live, you may have rights to access, correct, delete, or restrict
              certain processing of your personal information, or to opt out of certain uses (e.g., sale or
              sharing under U.S. state laws, where “sale” has a legal definition). California residents may
              have additional rights under the CPRA. To exercise rights, contact us using the information
              below. We may verify your request as permitted by law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Children</h2>
            <p className="mt-3">
              Our services are not directed to children under 13. We do not knowingly collect personal
              information from children under 13. If you believe we have, please contact us and we will
              delete it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Third-party links</h2>
            <p className="mt-3">
              Our site may link to third parties (e.g., maps, social networks). Their privacy practices are
              governed by their own policies. We are not responsible for third-party sites.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Changes</h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. We will post the revised version on this
              page and update the “Last updated” date. Continued use after changes means you accept the
              updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink md:text-2xl">Contact us</h2>
            <p className="mt-3">
              Questions about this policy or your data? Contact {name}:
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
                  For written privacy requests, please call or visit us at the address above.
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
