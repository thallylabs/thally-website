"use client";

import { useSyncExternalStore } from "react";

import { detectRenderTier, type RenderTier } from "@/lib/render-tier";

/** Cached so the snapshot is referentially stable across renders. */
let cached: RenderTier | null = null;

function getSnapshot(): RenderTier {
  if (cached === null) cached = detectRenderTier();
  return cached;
}

/** The server has no device to measure, so it always assumes the full experience. */
function getServerSnapshot(): RenderTier {
  return "full";
}

function subscribe(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  const update = () => {
    cached = null;
    onChange();
  };
  query.addEventListener("change", update);
  return () => query.removeEventListener("change", update);
}

/**
 * The device's render tier.
 *
 * Hydrates at "full" to match the server, then settles to the measured tier.
 * Ambient polish only, so a frame at the richer setting before the downgrade
 * is harmless.
 */
export function useRenderTier(): RenderTier {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
