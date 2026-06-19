'use client';

import Script from 'next/script';

/**
 * Microsoft Clarity (session recording + heatmaps).
 * - Loads via next/script strategy="afterInteractive" → never blocks render/LCP.
 * - Renders nothing when NEXT_PUBLIC_CLARITY_ID is unset (no error, no script).
 * - Default input masking is kept (we do NOT call clarity('set','mask',false)),
 *   so customer-typed data stays redacted in recordings.
 */
export default function ClarityScript() {
  const id = process.env.NEXT_PUBLIC_CLARITY_ID;
  if (!id) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${id}");`}
    </Script>
  );
}
