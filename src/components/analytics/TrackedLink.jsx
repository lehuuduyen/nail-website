'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

/**
 * Drop-in replacement for <Link>/<a> that fires a conversion event on click
 * without changing the existing navigation behavior.
 *
 * - Internal paths ("/booking", "/specials") render next/link.
 * - tel: / mailto: / http(s) / external render a plain <a>.
 * - The event is fire-and-forget (trackEvent no-ops if scripts aren't ready),
 *   so it never delays the navigation.
 *
 * Props: event (string), eventParams (object), plus anything Link/<a> accepts.
 */
export default function TrackedLink({
  event,
  eventParams,
  href,
  onClick,
  external,
  children,
  ...rest
}) {
  const handleClick = (e) => {
    if (event) trackEvent(event, eventParams || {});
    if (onClick) onClick(e);
  };

  const isExternal =
    external ||
    (typeof href === 'string' &&
      /^(tel:|mailto:|https?:|#)/.test(href));

  if (isExternal) {
    return (
      <a href={href} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
