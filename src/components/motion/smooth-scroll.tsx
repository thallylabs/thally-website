"use client";

import "lenis/dist/lenis.css";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { detectRenderTier } from "@/lib/render-tier";

/** How long to keep a hash landing pinned while the page finishes laying out. */
const SETTLE_MS = 1500;

/** Reader input that ends the correction: a real gesture outranks the hash. */
const INPUT_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

/**
 * The element a URL hash points at, or null.
 *
 * Read by id rather than as a selector: a hash can carry a text fragment
 * (`#demo:~:text=...`) or characters that are not valid CSS, and both would
 * throw in querySelector.
 */
function hashTarget(): HTMLElement | null {
  const id = window.location.hash.slice(1).split(":~:")[0];
  if (!id) return null;
  try {
    return document.getElementById(decodeURIComponent(id));
  } catch {
    return document.getElementById(id);
  }
}

/**
 * Site-wide smooth scrolling, matching the template's Lenis setup
 * (lerp 0.1). Disabled for users who prefer reduced motion.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Lenis drives a permanent rAF loop and repositions the page itself every
    // frame. On a machine already struggling to composite the hero, that loop
    // competes with the canvas for the same main thread and turns smooth
    // scrolling into the opposite. Native scroll is the better experience there.
    if (detectRenderTier() !== "full") return;

    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    lenisRef.current = lenis;

    let frame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // A hash is a scroll target, not something to override. Landing on a
    // route with one and forcing the top strands the reader above whatever
    // they were sent to, which is what happens when the Track demo's GitHub
    // sign-in redirects back to /features/track#demo.
    const target = hashTarget();
    if (!target) {
      lenis.scrollTo(0, { immediate: true });
      return;
    }

    // These pages keep growing after first paint as fonts and images land, so
    // a single jump lands wherever the target happened to be mid-layout. Hold
    // it in place until the page stops moving, and let any real input from the
    // reader end that immediately so they are never yanked back.
    let settling = true;
    const settle = () => {
      if (settling) lenis.scrollTo(target, { immediate: true });
    };

    const release = () => {
      if (!settling) return;
      settling = false;
      observer.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      for (const event of INPUT_EVENTS) window.removeEventListener(event, release);
    };

    const observer = new ResizeObserver(settle);
    const frame = requestAnimationFrame(settle);
    const timer = window.setTimeout(release, SETTLE_MS);

    observer.observe(document.body);
    void document.fonts?.ready.then(settle);
    for (const event of INPUT_EVENTS) window.addEventListener(event, release, { passive: true });

    return release;
  }, [pathname]);

  return null;
}
