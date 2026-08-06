"use client";

import { useEffect, useRef, useState } from "react";

const MOTION_MESSAGE = "thally-auth-tree:set-paused";

/**
 * The Thally Cloud leaf-fall tree (auth pages), hosted in an isolated
 * iframe so the canvas engine's global listeners tear down with it.
 * Reduced-motion preferences are forwarded into the scene.
 */
export function LeafTree({ className }: { className?: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  function syncScene(nextIsPaused: boolean) {
    frameRef.current?.contentWindow?.postMessage({ type: MOTION_MESSAGE, isPaused: nextIsPaused }, "*");
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function handleMotionPreference() {
      setIsReducedMotion(mediaQuery.matches);
      syncScene(mediaQuery.matches);
    }

    handleMotionPreference();
    mediaQuery.addEventListener("change", handleMotionPreference);
    return () => mediaQuery.removeEventListener("change", handleMotionPreference);
  }, []);

  return (
    // No sandbox: sandboxed frames composite on an opaque backdrop, and
    // the scene must stay transparent over the card art. First-party
    // static content, so isolation is not load-bearing here.
    <iframe
      ref={frameRef}
      aria-hidden
      className={className}
      onLoad={() => syncScene(isReducedMotion)}
      src="/auth-tree/background-only.html"
      tabIndex={-1}
      title="Decorative olive tree animation"
    />
  );
}
