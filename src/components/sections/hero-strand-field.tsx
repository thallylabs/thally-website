"use client";

import { useEffect, useRef } from "react";

import { detectRenderTier, type RenderTier } from "@/lib/render-tier";

/* Motion constants are final per the hero handoff: strands, speed 50%, glow 50%. */
const SPEED = 0.5;
const GAIN = 0.5;

/**
 * Per-tier budget. The field is a soft glow, so it survives being rendered
 * below CSS resolution and upscaled: capping the backing store is what keeps
 * the per-frame pixel count bounded on a 1860px-wide hero.
 */
const BUDGET: Record<Exclude<RenderTier, "still">, { maxWidth: number; dpr: number; samples: number; strands: [number, number] }> = {
  full: { maxWidth: 1600, dpr: 1.5, samples: 52, strands: [54, 26] },
  reduced: { maxWidth: 1100, dpr: 1, samples: 34, strands: [26, 12] },
};

/* 30fps: the field drifts at half speed, so it reads identically at half the frames. */
const FRAME_MS = 1000 / 30;

/*
 * Self-tiering. The probe watches how far apart frames actually land, not how
 * long the draw call takes: canvas 2D records commands and rasterizes them
 * later, so a draw call can return in under a millisecond while the frame it
 * queued takes 90ms to paint. The frame interval is the only honest signal.
 *
 * The first frames after load are busy with hydration, so they are skipped.
 * A machine that still cannot hold ~25fps after thinning stops animating
 * entirely and keeps its last painted frame, which is the designed still.
 */
const PROBE_SKIP = 20;
const PROBE_FRAMES = 40;
const PROBE_MAX_INTERVAL_MS = 40;

/* How long to wait for an idle main thread before drifting anyway. */
const START_TIMEOUT_MS = 2500;
const START_FALLBACK_MS = 1500;

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

/** Everything about a strand that does not change between frames. */
type Strand = {
  r1: number;
  r2: number;
  r3: number;
  offsetKey: number;
  haloStyle: string;
  coreStyle: string;
  haloWidth: number;
  coreWidth: number;
  driftAmp: number;
  driftRate: number;
  wobbleRate: number;
  wobblePhase: number;
  wobbleAmp: number;
  rippleRate: number;
  rippleAmp: number;
};

/** A curve sampled once per resize: the geometry is fixed until the box changes. */
type SampledCurve = { px: Float32Array; py: Float32Array; nx: Float32Array; ny: Float32Array; fan: Float32Array[] };

/**
 * The hero backdrop: two bundles of bezier-guided filaments that flow
 * diagonally and converge toward the empty right side of the hero.
 *
 * Purely decorative, so the canvas is hidden from assistive tech. The loop
 * pauses when the hero leaves the viewport or the tab is hidden, renders a
 * single still frame when the visitor prefers reduced motion, and thins itself
 * on machines that cannot hold the frame budget.
 */
export function HeroStrandField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const lime = tokenRGB(host, "var(--primary)", LIME_FALLBACK);
    const teal = tokenRGB(host, "var(--chart-2)", TEAL_FALLBACK);

    let tier = detectRenderTier();
    const still = tier === "still";
    let budget = BUDGET[tier === "still" ? "full" : tier];

    let width = 0;
    let height = 0;
    let elapsed = 0;
    let last = 0;
    let accumulator = 0;
    let frame = 0;
    let onScreen = true;

    /* Frame-cost probe: the machine signals are coarse, so the field also
       measures itself and steps down if it cannot hold the budget. */
    let probing = tier !== "still";
    let probeSeen = 0;
    let probeTotal = 0;
    let frozen = false;

    /** Per-strand constants for both bundles, rebuilt only when the tier changes. */
    let bundles: Array<{ strands: Strand[]; fade: number }> = [];
    /** Curve geometry, rebuilt only on resize. */
    let curves: SampledCurve[] = [];

    function buildStrands(count: number, hueShift: number, seed: number): Strand[] {
      const strands: Strand[] = [];
      for (let i = 0; i < count; i++) {
        const r1 = hash(i + seed);
        const r2 = hash(i * 1.7 + seed + 9);
        const r3 = hash(i * 2.3 + seed + 31);

        const u = clamp01((i + (r1 - 0.5) * 1.15) / (count - 1));
        // Bunches strands toward the bundle core rather than spacing them evenly.
        const offsetKey = (u < 0.5 ? -1 : 1) * Math.pow(Math.abs((u - 0.5) * 2), 1.22);
        const color = mix(lime, teal, clamp01(0.5 + 0.5 * offsetKey * 1.1 + hueShift + (r3 - 0.5) * 0.28));
        const alpha = (0.035 + 0.11 * (1 - Math.abs(offsetKey) * 0.55)) * (0.6 + 0.7 * r2) * GAIN;

        strands.push({
          r1,
          r2,
          r3,
          offsetKey,
          // A soft halo pass under a bright hairline, so the filament glows rather than just draws.
          haloStyle: rgba(color, alpha * 0.42),
          coreStyle: rgba(color, alpha),
          haloWidth: 3 + 2.4 * r1,
          coreWidth: 0.7 + 0.7 * r3,
          driftAmp: 0.12 + 0.06 * r2,
          driftRate: 0.17 + 0.14 * r2,
          wobbleRate: 2.8 + r2 * 1.6,
          wobblePhase: 0.34 + 0.2 * r3,
          wobbleAmp: 20 + 18 * r2,
          rippleRate: 6.2 + r3 * 3,
          rippleAmp: 6 + 6 * r1,
        });
      }
      return strands;
    }

    function buildBundles() {
      bundles = [
        { strands: buildStrands(budget.strands[0], 0, 3), fade: 1 },
        { strands: buildStrands(budget.strands[1], 0.25, 71), fade: 0.5 },
      ];
    }

    /** Sample a curve's points, normals, and per-strand fan width once per resize. */
    function sampleCurve(curve: Curve, spread: number, strands: Strand[]): SampledCurve {
      const n = budget.samples;
      const px = new Float32Array(n + 1);
      const py = new Float32Array(n + 1);
      const nx = new Float32Array(n + 1);
      const ny = new Float32Array(n + 1);
      for (let k = 0; k <= n; k++) {
        const t = k / n;
        const point = bezier(curve, t);
        const normal = tangent(curve, t);
        px[k] = point.x;
        py[k] = point.y;
        nx[k] = normal.x;
        ny[k] = normal.y;
      }
      // The fan taper depends on the strand's own r1, so it is per strand.
      const fan = strands.map((s) => {
        const f = new Float32Array(n + 1);
        for (let k = 0; k <= n; k++) f[k] = Math.pow(1 - k / n, 1.5 + s.r1 * 0.5) * spread + 14;
        return f;
      });
      return { px, py, nx, ny, fan };
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (!width || !height) return;

      // Cap the backing store: a soft glow upscales cleanly, and this is what
      // bounds the per-frame pixel cost on wide displays.
      const scale = Math.min(budget.dpr, window.devicePixelRatio || 1, budget.maxWidth / width);
      canvas!.width = Math.max(1, Math.round(width * scale));
      canvas!.height = Math.max(1, Math.round(height * scale));
      ctx!.setTransform(scale, 0, 0, scale, 0, 0);

      curves = [
        // Primary bundle, flowing bottom-left to top-right.
        sampleCurve(
          [
            { x: -0.12 * width, y: 1.06 * height },
            { x: 0.3 * width, y: 0.86 * height },
            { x: 0.66 * width, y: 0.3 * height },
            { x: 1.16 * width, y: -0.14 * height },
          ],
          height * 0.5,
          bundles[0].strands,
        ),
        // Counter-flow bundle, quieter and cooler.
        sampleCurve(
          [
            { x: 1.14 * width, y: 1.12 * height },
            { x: 0.72 * width, y: 0.98 * height },
            { x: 0.42 * width, y: 0.52 * height },
            { x: -0.1 * width, y: 0.06 * height },
          ],
          height * 0.32,
          bundles[1].strands,
        ),
      ];
    }

    function drawBundle(time: number, curve: SampledCurve, strands: Strand[], fade: number) {
      const n = budget.samples;
      for (let i = 0; i < strands.length; i++) {
        const s = strands[i];
        const fan = curve.fan[i];
        const drift = 1 + s.driftAmp * Math.sin(time * s.driftRate + i * 0.55);

        ctx!.beginPath();
        for (let k = 0; k <= n; k++) {
          const t = k / n;
          const wobble =
            Math.sin(t * s.wobbleRate + time * s.wobblePhase + i * 0.23) * s.wobbleAmp * (0.28 + t) +
            Math.sin(t * s.rippleRate - time * 0.24 + i * 0.11) * s.rippleAmp;
          const off = s.offsetKey * fan[k] * drift + wobble;
          const x = curve.px[k] - curve.ny[k] * off;
          const y = curve.py[k] + curve.nx[k] * off;
          if (k) ctx!.lineTo(x, y);
          else ctx!.moveTo(x, y);
        }

        if (fade === 1) {
          ctx!.strokeStyle = s.haloStyle;
          ctx!.lineWidth = s.haloWidth;
          ctx!.stroke();
          ctx!.strokeStyle = s.coreStyle;
          ctx!.lineWidth = s.coreWidth;
          ctx!.stroke();
        } else {
          ctx!.globalAlpha = fade;
          ctx!.strokeStyle = s.haloStyle;
          ctx!.lineWidth = s.haloWidth;
          ctx!.stroke();
          ctx!.strokeStyle = s.coreStyle;
          ctx!.lineWidth = s.coreWidth;
          ctx!.stroke();
          ctx!.globalAlpha = 1;
        }
      }
    }

    function draw(time: number) {
      if (!curves.length) return;
      ctx!.clearRect(0, 0, width, height);
      ctx!.globalCompositeOperation = "lighter";
      ctx!.lineCap = "round";
      drawBundle(time, curves[0], bundles[0].strands, bundles[0].fade);
      drawBundle(time * 0.8 + 40, curves[1], bundles[1].strands, bundles[1].fade);
      ctx!.globalCompositeOperation = "source-over";
    }

    /** Restart the probe so the thinner field is judged on its own numbers. */
    function resetProbe() {
      probeSeen = 0;
      probeTotal = 0;
    }

    /** Step down when the probe says the machine cannot hold the frame rate. */
    function downgrade() {
      if (tier === "full") {
        tier = "reduced";
        budget = BUDGET.reduced;
        buildBundles();
        resize();
        draw(elapsed);
        resetProbe();
        return;
      }
      // Already thin and still behind: stop animating and keep the last frame.
      // A still field is the design's own reduced-motion state, and it beats a
      // field that stutters.
      probing = false;
      frozen = true;
      stop();
    }

    function tick(now: number) {
      frame = requestAnimationFrame(tick);
      const delta = now - last;
      last = now;

      if (probing) {
        // Skip the frames right after load, which are busy with hydration.
        if (probeSeen < PROBE_SKIP) {
          probeSeen++;
        } else {
          probeTotal += delta;
          if (++probeSeen >= PROBE_SKIP + PROBE_FRAMES) {
            const average = probeTotal / PROBE_FRAMES;
            if (average > PROBE_MAX_INTERVAL_MS) downgrade();
            else probing = false;
          }
        }
      }

      // Throttle to the target frame rate. Cap the step so a backgrounded tab
      // returning does not jump the field forward by the whole gap.
      accumulator += Math.min(delta, 250);
      if (accumulator < FRAME_MS) return;
      elapsed += (accumulator / 1000) * SPEED;
      accumulator = 0;
      draw(elapsed);
    }

    function start() {
      if (still || frozen || frame) return;
      last = performance.now();
      accumulator = 0;
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

    buildBundles();
    resize();
    // Paint synchronously rather than waiting on the first frame: a tab that
    // loads in the background gets no rAF at all until it is shown, and the
    // hero must not sit blank until then. Reduced motion stops here, on one
    // still frame mid-flow.
    elapsed = still ? 12 : 0;
    draw(elapsed);

    /*
     * Hold that still frame until the page is done loading and the main thread
     * has gone quiet, then start drifting.
     *
     * Without the GPU (blocklisted drivers, and the containers Lighthouse and
     * PageSpeed Insights run in) every frame is rasterized on the CPU. Starting
     * the loop during load put seconds of that work directly in the way of
     * hydration. The field is ambient: nobody misses a second of drift, and
     * everybody notices a page that will not respond.
     */
    let idleHandle = 0;
    const beginDrifting = () => {
      idleHandle = 0;
      sync();
    };
    const queueStart = () => {
      const idle = window.requestIdleCallback;
      if (idle) idleHandle = idle(beginDrifting, { timeout: START_TIMEOUT_MS });
      else idleHandle = window.setTimeout(beginDrifting, START_FALLBACK_MS);
    };
    if (!still) {
      if (document.readyState === "complete") queueStart();
      else window.addEventListener("load", queueStart, { once: true });
    }

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
      window.removeEventListener("load", queueStart);
      if (idleHandle) {
        if (window.cancelIdleCallback) window.cancelIdleCallback(idleHandle);
        else window.clearTimeout(idleHandle);
      }
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
