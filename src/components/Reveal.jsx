'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * `reveal` — primitive 1 of the three the project is allowed (design.md § Motion).
 *
 * One orchestrated entrance per section: fade + an 8px rise, staggered 60ms by
 * DOM index and capped at 500ms total, fired ONCE by an IntersectionObserver and
 * never re-fired on scroll. "Every section fades in on intersection, the page
 * never settles" is the named tell this is shaped to avoid — so the observer
 * disconnects on first hit and the index is capped.
 *
 * Fails open twice over: the hidden start state lives behind
 * `@media (scripting: enabled)`, and if the observer is missing the element is
 * marked visible immediately. An invisible section would cost real visitors and
 * real crawl signal, which is never an acceptable trade for an animation.
 *
 * @param {number} index  stagger position; clamped to 0–8 so the last card in a
 *                        long grid still lands inside the 500ms budget.
 */
export default function Reveal({ children, index = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      // A little early, so the motion reads as the section arriving rather than
      // as something that happened after the reader got there.
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  const i = Math.max(0, Math.min(8, Number(index) || 0));

  return (
    <Tag
      ref={ref}
      className={`reveal${shown ? ' is-in' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--i': i }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
