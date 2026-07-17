"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * ShaderField renders Thally's signature background: a domain-warped flow
 * field where a grid of dots (structure, for machines) dissolves into
 * flowing strands (prose, for humans). Colors are sampled at runtime from
 * the CSS custom properties passed in, so the canvas always matches the
 * active theme, including mid view-transition theme swaps.
 *
 * Behavior contract:
 * - WebGL2 only; when unavailable the canvas stays transparent and the
 *   section's CSS background shows through.
 * - Renders only while on screen and the tab is visible.
 * - prefers-reduced-motion: renders a single static frame, no loop.
 * - Device pixel ratio is capped and total pixels are budgeted.
 */

const VERT = `#version 300 es
void main() {
  vec2 pos = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(pos * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_pointer;
uniform float u_pointerStrength;
uniform vec3 u_bg;
uniform vec3 u_ink;
uniform vec3 u_glow;
uniform float u_intensity;

out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * vnoise(p);
    p = rot * p * 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 res = u_resolution;
  vec2 p = (gl_FragCoord.xy - 0.5 * res) / res.y;
  float t = u_time * 0.055;

  // Pointer: a slow local disturbance in the field, not a spotlight.
  vec2 pt = (u_pointer - 0.5) * vec2(res.x / res.y, -1.0);
  float pd = length(p - pt);
  float pinf = exp(-pd * pd * 5.0) * u_pointerStrength;

  // Two-level domain warp (the "prose" currents).
  vec2 q = vec2(
    fbm(p * 1.35 + vec2(0.0, t)),
    fbm(p * 1.35 + vec2(5.2, t * 1.31))
  );
  vec2 r = vec2(
    fbm(p * 1.35 + 2.4 * q + vec2(1.7, 9.2) + pinf * 0.8),
    fbm(p * 1.35 + 2.4 * q + vec2(8.3, 2.8) - pinf * 0.8)
  );
  float f = fbm(p * 1.35 + 2.1 * r + t * 0.4);

  // Base wash: ink density follows the warped field.
  float density = clamp(f * f * 1.7, 0.0, 1.0);
  vec3 col = mix(u_bg, u_ink, density * 0.55 * u_intensity);

  // Ridge highlights: thin bright strands where the field folds.
  float ridge = smoothstep(0.44, 0.52, f) * smoothstep(0.62, 0.52, f);
  col = mix(col, u_glow, ridge * clamp(length(q) * 1.1, 0.0, 1.0) * 0.85 * u_intensity);

  // Token grid: dots survive where the field is calm, dissolve in the currents.
  vec2 cell = fract(p * 44.0 + vec2(0.5)) - 0.5;
  float dot_d = length(cell);
  float tokens = smoothstep(0.17, 0.05, dot_d);
  float calm = smoothstep(0.56, 0.28, f);
  col = mix(col, mix(u_ink, u_glow, 0.45), tokens * calm * 0.16 * u_intensity);

  // Vignette back into the page background so the field has no hard edge.
  float vig = smoothstep(1.35, 0.3, length(p * vec2(0.8, 1.2)));
  col = mix(u_bg, col, vig);

  // Fine animated grain keeps gradients from banding.
  float grain = hash(gl_FragCoord.xy + fract(u_time) * 61.7) - 0.5;
  col += grain * 0.014;

  outColor = vec4(col, 1.0);
}`;

const DPR_CAP = 1.5;
const PIXEL_BUDGET = 2_400_000;

type ShaderColors = {
  /** CSS color for the resting background, e.g. "var(--accent)" */
  bg: string;
  /** CSS color for the flow-field ink */
  ink: string;
  /** CSS color for ridge highlights and token dots */
  glow: string;
};

interface ShaderFieldProps {
  className?: string;
  colors?: ShaderColors;
  /** 0..1 multiplier; light themes usually want less */
  intensity?: number;
  /** Playback speed multiplier */
  speed?: number;
}

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function ShaderField({
  className,
  colors = { bg: "var(--accent)", ink: "var(--chart-3)", glow: "var(--chart-1)" },
  intensity = 1,
  speed = 1,
}: ShaderFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vert = compile(gl, gl.VERTEX_SHADER, VERT);
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vert || !frag) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const u = {
      resolution: gl.getUniformLocation(program, "u_resolution"),
      time: gl.getUniformLocation(program, "u_time"),
      pointer: gl.getUniformLocation(program, "u_pointer"),
      pointerStrength: gl.getUniformLocation(program, "u_pointerStrength"),
      bg: gl.getUniformLocation(program, "u_bg"),
      ink: gl.getUniformLocation(program, "u_ink"),
      glow: gl.getUniformLocation(program, "u_glow"),
      intensity: gl.getUniformLocation(program, "u_intensity"),
    };

    // Resolve CSS colors (including var() and oklch()) to linear-ish sRGB
    // floats by letting the browser paint them onto a 2D canvas.
    const probe = document.createElement("span");
    probe.style.display = "none";
    canvas.parentElement?.appendChild(probe);
    const swatch = document.createElement("canvas");
    swatch.width = 1;
    swatch.height = 1;
    const swatchCtx = swatch.getContext("2d", { willReadFrequently: true });

    function resolveColor(cssColor: string): [number, number, number] {
      if (!swatchCtx) return [0, 0, 0];
      probe.style.color = cssColor;
      const computed = getComputedStyle(probe).color;
      swatchCtx.fillStyle = "#000";
      swatchCtx.fillStyle = computed;
      swatchCtx.fillRect(0, 0, 1, 1);
      const [r, g, b] = swatchCtx.getImageData(0, 0, 1, 1).data;
      return [r / 255, g / 255, b / 255];
    }

    function uploadColors() {
      gl!.uniform3fv(u.bg, resolveColor(colors.bg));
      gl!.uniform3fv(u.ink, resolveColor(colors.ink));
      gl!.uniform3fv(u.glow, resolveColor(colors.glow));
      gl!.uniform1f(u.intensity, intensity);
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let running = false;
    let inView = false;
    let disposed = false;
    let lastTs = 0;
    let elapsed = 0;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, strength: 0, tstrength: 0 };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      let dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      if (rect.width * rect.height * dpr * dpr > PIXEL_BUDGET) {
        dpr = Math.sqrt(PIXEL_BUDGET / (rect.width * rect.height));
      }
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        gl!.viewport(0, 0, w, h);
      }
    }

    function draw(time: number) {
      gl!.uniform2f(u.resolution, canvas!.width, canvas!.height);
      gl!.uniform1f(u.time, time);
      gl!.uniform2f(u.pointer, pointer.x, pointer.y);
      gl!.uniform1f(u.pointerStrength, pointer.strength);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    function renderStatic() {
      resize();
      uploadColors();
      draw(40);
    }

    function frame(ts: number) {
      if (!running) return;
      if (lastTs) elapsed += Math.min(ts - lastTs, 64) * 0.001 * speed;
      lastTs = ts;
      pointer.x += (pointer.tx - pointer.x) * 0.055;
      pointer.y += (pointer.ty - pointer.y) * 0.055;
      pointer.strength += (pointer.tstrength - pointer.strength) * 0.04;
      draw(elapsed);
      raf = requestAnimationFrame(frame);
    }

    function syncPlayback() {
      const shouldRun = inView && !document.hidden && !reduceMotion.matches && !disposed;
      if (shouldRun && !running) {
        running = true;
        lastTs = 0;
        raf = requestAnimationFrame(frame);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
      if (reduceMotion.matches) renderStatic();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncPlayback();
      },
      { rootMargin: "80px" },
    );
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) renderStatic();
    });
    ro.observe(canvas);

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      pointer.tstrength = inside ? 1 : 0;
      if (inside) {
        pointer.tx = (e.clientX - rect.left) / rect.width;
        pointer.ty = (e.clientY - rect.top) / rect.height;
      }
    }

    function onVisibility() {
      syncPlayback();
    }

    // Theme swaps change the resolved value of every CSS variable we sample.
    const themeObserver = new MutationObserver(() => {
      uploadColors();
      if (!running) renderStatic();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    function onContextLost(e: Event) {
      e.preventDefault();
      running = false;
      cancelAnimationFrame(raf);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduceMotion.addEventListener("change", syncPlayback);
    canvas.addEventListener("webglcontextlost", onContextLost);

    resize();
    uploadColors();
    draw(40);
    syncPlayback();

    return () => {
      disposed = true;
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMotion.removeEventListener("change", syncPlayback);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      probe.remove();
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
    };
  }, [colors.bg, colors.ink, colors.glow, intensity, speed]);

  return <canvas ref={canvasRef} aria-hidden className={cn("pointer-events-none absolute inset-0 size-full", className)} />;
}
