/**
 * How much per-frame work this device can afford.
 *
 * "full" is the designed experience. "reduced" thins the ambient layers for
 * machines that cannot composite them at 60fps, which in practice means
 * Windows laptops on older integrated GPUs: Chromium blocklists those drivers
 * and falls back to software rasterization, so every blended pixel is paid for
 * on the CPU. "still" drops continuous motion entirely.
 *
 * Deliberately not UA sniffing. The signals below are about the machine, and
 * the canvas additionally measures its own frame cost and downgrades itself.
 */
export type RenderTier = "full" | "reduced" | "still";

/**
 * Whether the browser is compositing without a GPU.
 *
 * This is the signal that matters most. Chromium blocklists a long tail of
 * older Intel and AMD drivers, and Windows laptops running one fall back to
 * rasterizing every pixel on the CPU, where a full-bleed animated canvas costs
 * seconds of main-thread time rather than microseconds. WebGL reports it
 * honestly: a software backend names itself, and a machine where WebGL will
 * not initialize at all has no GPU path either.
 *
 * Headless and containerized Chrome land here too, which is correct: they are
 * software rasterizers, and it is the same measurement Lighthouse and
 * PageSpeed Insights take.
 */
function rendersInSoftware(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return true;

    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = String(
      (info && gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) || gl.getParameter(gl.RENDERER) || "",
    ).toLowerCase();

    const lost = gl.getExtension("WEBGL_lose_context");
    lost?.loseContext();

    if (!renderer) return false;
    return /swiftshader|llvmpipe|softpipe|software|microsoft basic render|mesa offscreen/.test(renderer);
  } catch {
    return false;
  }
}

export function detectRenderTier(): RenderTier {
  if (typeof window === "undefined") return "full";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "still";

  // No GPU means every animated frame is paid for on the main thread, so the
  // field holds a single painted frame instead of drifting.
  if (rendersInSoftware()) return "still";

  // Coarse machine signals. Both are absent on Safari, which is not the
  // cohort in question, so a missing value must not downgrade anyone.
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory > 0 && nav.deviceMemory <= 4) return "reduced";
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency > 0 && nav.hardwareConcurrency <= 4) {
    return "reduced";
  }

  return "full";
}

/**
 * Whether the compositor can be trusted with continuous blur.
 *
 * backdrop-filter over animating content is re-blurred every frame, which is
 * the single most expensive thing on the software raster path.
 */
export function prefersCheapCompositing(tier: RenderTier): boolean {
  return tier !== "full";
}
