"use client";

import { useEffect, useRef, useState } from "react";

export type EntrancePhase = "visible" | "hidden" | "in";

/**
 * Phase driver for the CSS entrance reveals (Reveal / SplitReveal).
 *
 * The server always renders content visible, so first paint (and the LCP)
 * never waits on hydration. After hydration, an element still outside the
 * viewport is re-hidden and transitioned in when scrolled to. Anything
 * already on screen stays visible: hiding painted content would flash it
 * out and re-create the render delay this exists to remove.
 */
export function useEntrancePhase<T extends HTMLElement>(enabled: boolean, rootMargin: string) {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<EntrancePhase>("visible");

  useEffect(() => {
    if (!enabled) return;
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Only content still below the viewport re-hides. On-screen content must
    // not flash out, and content above the viewport (a hash landing, scroll
    // restoration) has conceptually been seen; re-hiding it would strand it
    // invisible unless the reader happens to scroll back up past it.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;

    // Threshold 0 plus a negative bottom rootMargin, not a ratio threshold:
    // IntersectionObserver measures the rect *after* ancestor clipping, so an
    // element cropped by an overflow-hidden section (the CTA's peek card) can
    // never reach a ratio like 0.2 and would stay hidden forever.
    setPhase("hidden");
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setPhase("in");
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, rootMargin]);

  return { ref, phase };
}
