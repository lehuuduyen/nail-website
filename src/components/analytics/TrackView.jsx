'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

/**
 * Fires a single analytics event once when mounted — for tracking views of a
 * page/section that is otherwise a server component (e.g. specials_view).
 * Renders nothing.
 */
export default function TrackView({ event, eventParams }) {
  useEffect(() => {
    if (event) trackEvent(event, eventParams || {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
