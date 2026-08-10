"use client";

import { useEffect, useRef } from "react";

/**
 * Play a demo once, the first time it is scrolled into view.
 *
 * The feature-page demos used to sit on an idle placeholder until someone
 * pressed a button, so most visitors only ever saw the empty state. Attach the
 * returned ref to the demo's root and it starts itself; any run button stays
 * available for a replay.
 */
export function usePlayOnView<T extends HTMLElement>(play: () => void, threshold = 0.35) {
  const ref = useRef<T>(null);
  const playRef = useRef(play);

  useEffect(() => {
    playRef.current = play;
  }, [play]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const timer = window.setTimeout(() => playRef.current(), 0);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        playRef.current();
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
