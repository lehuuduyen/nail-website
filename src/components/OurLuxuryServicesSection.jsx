import { useTranslations } from 'next-intl';
import { Gem, Clock, Instagram, ShieldCheck } from 'lucide-react';
import Reveal from '@/components/Reveal';

/**
 * Split Studio block 2 (design.md § Macrostructure families).
 *
 * Was the canonical AI feature grid: a centred head with three stacked Sparkles
 * glyphs beside it, a centred subtitle, then four equal tiles — each a rounded,
 * shadowed, backdrop-blurred card containing a circle containing an icon, with
 * the heading centred underneath. anti-patterns.md names that exact object the
 * "icon-tile feature card", and the four-up equal grid the "3-column feature
 * grid". It also carried `style={{ backgroundColor: '#F6E9EC' }}` inline, which
 * overrode the Tailwind background one line below it.
 *
 * Now: four claims as hairline-ruled rows, icon pulled inline with the heading
 * (the fix anti-patterns.md prescribes), left-aligned, in two uneven columns.
 * No tile, no circle, no shadow, no blur — one containment signal, the rule.
 */

const pillars = [
  { Icon: Gem, key: 'premium' },
  { Icon: Clock, key: 'fastBooking' },
  { Icon: Instagram, key: 'instagram' },
  { Icon: ShieldCheck, key: 'hygiene' },
];

export default function OurLuxuryServicesSection() {
  const t = useTranslations('home');

  return (
    <section id="luxury-services" className="marble-bg pb-2xl md:pb-3xl">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="head-hang">
          <h2>{t('luxury.heading')}</h2>
          <p>{t('luxury.subtitle')}</p>
        </header>

        <Reveal as="ul" index={0} className="grid gap-0 md:grid-cols-2 md:gap-x-3xl">
          {pillars.map(({ Icon, key }) => (
            <li key={key} className="border-t border-rule-soft py-lg">
              <h3 className="flex items-center gap-sm text-step-md font-semibold leading-snug text-ink">
                <Icon className="h-5 w-5 shrink-0 text-accent-ink" strokeWidth={1.5} aria-hidden />
                {t(`luxury.pillars.${key}`)}
              </h3>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
