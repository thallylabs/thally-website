"use client";

import { useEffect } from "react";

const INTERACTION_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;

/** How long to wait before loading anyway, for readers who never interact. */
const IDLE_FALLBACK_MS = 4000;

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * gtag.js reads dataLayer entries by checking for an Arguments object, so the
 * shim has to push `arguments` itself. A rest array is ignored as a command.
 */
function installGtagShim() {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer!.push(arguments);
  };
}

let requested = false;

function loadTag(measurementId: string) {
  if (requested) return;
  requested = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

/**
 * Google Analytics, held back until the reader does something or four seconds
 * pass. The tag is ~166KB and costs ~100ms of blocking time, none of which
 * belongs in the first paint of a marketing page.
 *
 * The gtag shim and the js/config commands are installed immediately, so
 * anything calling gtag() before the tag lands is queued rather than dropped.
 *
 * No preconnect: warming a connection at load for a request deliberately
 * deferred past it would spend the very budget this is protecting.
 */
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  useEffect(() => {
    installGtagShim();
    window.gtag!("js", new Date());
    window.gtag!("config", measurementId);

    if (requested) return;

    let timer: ReturnType<typeof setTimeout>;

    const start = () => {
      clearTimeout(timer);
      for (const event of INTERACTION_EVENTS) {
        window.removeEventListener(event, start);
      }
      loadTag(measurementId);
    };

    for (const event of INTERACTION_EVENTS) {
      window.addEventListener(event, start, { once: true, passive: true });
    }
    timer = setTimeout(start, IDLE_FALLBACK_MS);

    return () => {
      clearTimeout(timer);
      for (const event of INTERACTION_EVENTS) {
        window.removeEventListener(event, start);
      }
    };
  }, [measurementId]);

  return null;
}
