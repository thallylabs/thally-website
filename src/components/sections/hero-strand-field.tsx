"use client";

import { useEffect, useRef } from "react";

/* Motion constants are final per the hero handoff: strands, speed 50%, glow 50%. */
const SPEED = 0.5;
const GAIN = 0.5;
const SAMPLES = 52;

type Point = { x: number; y: number };
type Curve = [Point, Point, Point, Point];
type RGB = [number, number, number];

/* Used only if the token probe comes back empty (no computed color yet). */
const LIME_FALLBACK: RGB = [183, 226, 77];
const TEAL_FALLBACK: RGB = [53, 168, 127];

/** Deterministic per-strand jitter. Without it the bundle reads as a printed grid and moirés. */
const hash = (i: number) => {
  const s = Math.sin(i * 12.9898) * 43758.5453;
  return s - Math.floor(s);
};

const mix = (a: RGB, b: RGB, k: number): RGB => [
  a[0] + (b[0] - a[0]) * k,
  a[1] + (b[1] - a[1]) * k,
  a[2] + (b[2] - a[2]) * k,
];

const rgba = (c: RGB, a: number) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function bezier(p: Curve, t: number): Point {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return {
    x: a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x,
    y: a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y,
  };
}

function tangent(p: Curve, t: number): Point {
  const u = 1 - t;
  const a = 3 * u * u;
  const b = 6 * u * t;
  const c = 3 * t * t;
  const x = a * (p[1].x - p[0].x) + b * (p[2].x - p[1].x) + c * (p[3].x - p[2].x);
  const y = a * (p[1].y - p[0].y) + b * (p[2].y - p[1].y) + c * (p[3].y - p[2].y);
  const len = Math.hypot(x, y) || 1;
  return { x: x / len, y: y / len };
}

/**
 * Read a design token as sRGB bytes.
 *
 * Chrome serializes `oklch()` verbatim from `getComputedStyle`, so the value is
 * rasterized through a 1x1 canvas instead of being string-parsed.
 */
function tokenRGB(host: HTMLElement, value: string, fallback: RGB): RGB {
  const probe = document.createElement("span");
  probe.style.cssText = "position:absolute;width:0;height:0;opacity:0;pointer-events:none";
  probe.style.color = value;
  host.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  probe.remove();

  const px = document.createElement("canvas");
  px.width = 1;
  px.height = 1;
  const pctx = px.getContext("2d", { willReadFrequently: true });
  if (!pctx) return fallback;
  pctx.fillStyle = computed;
  pctx.fillRect(0, 0, 1, 1);
  const d = pctx.getImageData(0, 0, 1, 1).data;
  return d[0] || d[1] || d[2] ? [d[0], d[1], d[2]] : fallback;
}

/* Densest at the right, near-absent behind the copy, so the field never fights the headline. */
const READABILITY_MASK =
  "radial-gradient(125% 105% at 76% 40%, #000 18%, rgba(0,0,0,.78) 45%, rgba(0,0,0,.42) 66%, rgba(0,0,0,.12) 88%, rgba(0,0,0,0) 100%)";

/**
 * The hero backdrop: two bundles of bezier-guided filaments that flow
 * diagonally and converge toward the empty right side of the hero.
 *
 * Purely decorative, so the canvas is hidden from assistive tech. The loop
 * pauses when the hero leaves the viewport or the tab is hidden, and renders a
 * single still frame when the visitor prefers reduced motion.
 */
export function HeroStrandField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lime = tokenRGB(host, "var(--primary)", LIME_FALLBACK);
    const teal = tokenRGB(host, "var(--chart-2)", TEAL_FALLBACK);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let elapsed = 0;
    let last = 0;
    let frame = 0;
    let onScreen = true;

    function resize() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    /**
     * One bundle of filaments along `curve`. `spread` is the fan width at the
     * source, tapering to nothing where the strands converge; `fade` scales the
     * whole bundle's alpha; `hueShift` biases it along the lime-to-teal ramp.
     */
    function bundle(
      time: number,
      curve: Curve,
      count: number,
      spread: number,
      fade: number,
      hueShift: number,
      seed: number,
    ) {
      for (let i = 0; i < count; i++) {
        const r1 = hash(i + seed);
        const r2 = hash(i * 1.7 + seed + 9);
        const r3 = hash(i * 2.3 + seed + 31);

        const u = clamp01((i + (r1 - 0.5) * 1.15) / (count - 1));
        // Bunches strands toward the bundle core rather than spacing them evenly.
        const offsetKey = (u < 0.5 ? -1 : 1) * Math.pow(Math.abs((u - 0.5) * 2), 1.22);
        const drift = 1 + (0.12 + 0.06 * r2) * Math.sin(time * (0.17 + 0.14 * r2) + i * 0.55);
        const color = mix(lime, teal, clamp01(0.5 + 0.5 * offsetKey * 1.1 + hueShift + (r3 - 0.5) * 0.28));

        ctx!.beginPath();
        for (let k = 0; k <= SAMPLES; k++) {
          const t = k / SAMPLES;
          const point = bezier(curve, t);
          const normal = tangent(curve, t);
          const fan = Math.pow(1 - t, 1.5 + r1 * 0.5) * spread + 14;
          const wobble =
            Math.sin(t * (2.8 + r2 * 1.6) + time * (0.34 + 0.2 * r3) + i * 0.23) * (20 + 18 * r2) * (0.28 + t) +
            Math.sin(t * (6.2 + r3 * 3) - time * 0.24 + i * 0.11) * (6 + 6 * r1);
          const off = offsetKey * fan * drift + wobble;
          const x = point.x - normal.y * off;
          const y = point.y + normal.x * off;
          if (k) ctx!.lineTo(x, y);
          else ctx!.moveTo(x, y);
        }

        const alpha = (0.035 + 0.11 * (1 - Math.abs(offsetKey) * 0.55)) * (0.6 + 0.7 * r2) * fade * GAIN;
        // A soft halo pass under a bright hairline, so the filament glows rather than just draws.
        ctx!.strokeStyle = rgba(color, alpha * 0.42);
        ctx!.lineWidth = 3 + 2.4 * r1;
        ctx!.stroke();
        ctx!.strokeStyle = rgba(color, alpha);
        ctx!.lineWidth = 0.7 + 0.7 * r3;
        ctx!.stroke();
      }
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, width, height);
      ctx!.globalCompositeOperation = "lighter";
      ctx!.lineCap = "round";
      // Primary bundle, flowing bottom-left to top-right.
      bundle(
        time,
        [
          { x: -0.12 * width, y: 1.06 * height },
          { x: 0.3 * width, y: 0.86 * height },
          { x: 0.66 * width, y: 0.3 * height },
          { x: 1.16 * width, y: -0.14 * height },
        ],
        54,
        height * 0.5,
        1,
        0,
        3,
      );
      // Counter-flow bundle, quieter and cooler.
      bundle(
        time * 0.8 + 40,
        [
          { x: 1.14 * width, y: 1.12 * height },
          { x: 0.72 * width, y: 0.98 * height },
          { x: 0.42 * width, y: 0.52 * height },
          { x: -0.1 * width, y: 0.06 * height },
        ],
        26,
        height * 0.32,
        0.5,
        0.25,
        71,
      );
      ctx!.globalCompositeOperation = "source-over";
    }

    function tick(now: number) {
      elapsed += ((now - last) / 1000) * SPEED;
      last = now;
      draw(elapsed);
      frame = requestAnimationFrame(tick);
    }

    function start() {
      if (still || frame) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }

    function stop() {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    }

    function sync() {
      if (onScreen && !document.hidden) start();
      else stop();
    }

    resize();
    // Paint synchronously rather than waiting on the first frame: a tab that
    // loads in the background gets no rAF at all until it is shown, and the
    // hero must not sit blank until then. Reduced motion stops here, on one
    // still frame mid-flow.
    elapsed = still ? 12 : 0;
    draw(elapsed);
    if (!still) start();

    // Re-measuring clears the backing store, so always repaint: a scheduled
    // frame is not a rendered one, and a throttled or paused loop would leave
    // the field blank until it resumes.
    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(elapsed);
    });
    resizeObserver.observe(canvas);

    const viewObserver = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((entry) => entry.isIntersecting);
        sync();
      },
      { threshold: 0 },
    );
    viewObserver.observe(canvas);

    document.addEventListener("visibilitychange", sync);

    return () => {
      stop();
      resizeObserver.disconnect();
      viewObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 z-0 h-full w-full"
      style={{ maskImage: READABILITY_MASK, WebkitMaskImage: READABILITY_MASK }}
    />
  );
}
