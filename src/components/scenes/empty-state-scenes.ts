/**
 * Ambient canvas scenes for quiet dashboard states.
 *
 * The design handoff supplied the visual vocabulary; this implementation keeps
 * it inside Thally's typed React lifecycle, reads live design tokens for theme
 * changes, pauses while offscreen, and renders a composed still for people who
 * prefer reduced motion. Scenes never communicate status, so disabling motion
 * cannot remove product information.
 */

/** The Thally leaf outline, normalized to a unit box (from the brand mark). */
const THALLY_LEAF_PATH =
  "M0.497 -0.464L0.5 -0.442L0.496 -0.417L0.495 -0.392L0.492 -0.367L0.487 -0.341L0.482 -0.316L0.477 -0.291L0.472 -0.265L0.467 -0.24L0.462 -0.214L0.457 -0.189L0.449 -0.164L0.44 -0.138L0.434 -0.113L0.426 -0.087L0.416 -0.062L0.405 -0.036L0.395 -0.011L0.385 0.014L0.372 0.04L0.357 0.065L0.342 0.09L0.327 0.116L0.311 0.141L0.301 0.158L0.289 0.175L0.275 0.192L0.259 0.209L0.242 0.226L0.225 0.243L0.208 0.259L0.191 0.271L0.166 0.286L0.141 0.302L0.115 0.317L0.09 0.33L0.064 0.339L0.039 0.344L0.014 0.349L-0.012 0.352L-0.037 0.352L-0.062 0.352L-0.088 0.352L-0.114 0.349L-0.139 0.344L-0.164 0.339L-0.19 0.334L-0.215 0.326L-0.24 0.316L-0.266 0.306L-0.291 0.292L-0.317 0.284L-0.342 0.291L-0.359 0.305L-0.373 0.322L-0.384 0.339L-0.397 0.365L-0.408 0.39L-0.422 0.415L-0.43 0.441L-0.445 0.461L-0.47 0.47L-0.494 0.46L-0.5 0.439L-0.495 0.414L-0.483 0.388L-0.469 0.363L-0.453 0.337L-0.438 0.312L-0.422 0.286L-0.409 0.27L-0.394 0.253L-0.377 0.236L-0.36 0.22L-0.344 0.206L-0.327 0.194L-0.301 0.178L-0.276 0.163L-0.25 0.15L-0.225 0.142L-0.2 0.136L-0.174 0.131L-0.149 0.126L-0.124 0.122L-0.098 0.121L-0.073 0.117L-0.047 0.11L-0.022 0.101L0.003 0.095L0.029 0.086L0.054 0.073L0.079 0.057L0.096 0.044L0.114 0.03L0.13 0.017L0.147 0.003L0.164 -0.01L0.18 -0.025L0.194 -0.042L0.207 -0.058L0.221 -0.076L0.234 -0.093L0.248 -0.109L0.26 -0.126L0.273 -0.15L0.248 -0.143L0.234 -0.127L0.218 -0.112L0.201 -0.098L0.184 -0.085L0.168 -0.071L0.151 -0.058L0.134 -0.045L0.117 -0.033L0.091 -0.019L0.066 -0.008L0.041 0.006L0.015 0.018L-0.01 0.027L-0.035 0.033L-0.061 0.038L-0.086 0.043L-0.112 0.048L-0.137 0.053L-0.162 0.058L-0.188 0.063L-0.213 0.068L-0.239 0.074L-0.264 0.087L-0.289 0.1L-0.315 0.112L-0.332 0.125L-0.349 0.139L-0.366 0.152L-0.386 0.158L-0.396 0.134L-0.398 0.109L-0.397 0.083L-0.393 0.058L-0.392 0.033L-0.389 0.007L-0.383 -0.018L-0.374 -0.043L-0.367 -0.069L-0.357 -0.094L-0.343 -0.12L-0.332 -0.145L-0.321 -0.162L-0.307 -0.179L-0.291 -0.196L-0.274 -0.212L-0.257 -0.227L-0.24 -0.24L-0.223 -0.251L-0.198 -0.267L-0.173 -0.281L-0.147 -0.293L-0.122 -0.301L-0.096 -0.307L-0.071 -0.316L-0.046 -0.318L-0.02 -0.321L0.005 -0.326L0.03 -0.331L0.056 -0.336L0.081 -0.339L0.107 -0.339L0.132 -0.339L0.157 -0.343L0.183 -0.348L0.208 -0.353L0.233 -0.358L0.259 -0.363L0.284 -0.368L0.31 -0.375L0.335 -0.384L0.36 -0.395L0.386 -0.405L0.411 -0.416L0.436 -0.431L0.453 -0.444L0.47 -0.456L0.487 -0.469Z";

export type EmptyStateSceneName =
  | "bars"
  | "drift"
  | "graph"
  | "sprout"
  | "tree";

export interface EmptyStateSceneController {
  /** Release frames, observers, media listeners, and resize work. */
  destroy: () => void;
}

interface Point {
  x: number;
  y: number;
}

interface ScenePalette {
  bark: string;
  edge: string;
  leaf: ReadonlyArray<string>;
  shadow: string;
}

interface SceneEnvironment {
  height: number;
  leafPath: Path2D;
  palette: ScenePalette;
  random: () => number;
  width: number;
}

type SceneRenderer = (
  elapsedSeconds: number,
  shouldReduceMotion: boolean,
) => void;

const SCENE_SEEDS: Record<EmptyStateSceneName, number> = {
  bars: 271,
  drift: 389,
  graph: 149,
  sprout: 83,
  tree: 419,
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

function seededRandom(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function token(
  styles: CSSStyleDeclaration,
  name: string,
  fallback: string,
): string {
  return styles.getPropertyValue(name).trim() || fallback;
}

function readPalette(canvas: HTMLCanvasElement): ScenePalette {
  const styles = window.getComputedStyle(canvas);
  return {
    bark: token(styles, "--muted-foreground", "#5a5f38"),
    edge: token(styles, "--border", "rgba(90, 95, 56, 0.2)"),
    leaf: [
      token(styles, "--chart-5", "#4a8a5c"),
      token(styles, "--chart-2", "#737938"),
      token(styles, "--chart-4", "#868c46"),
      token(styles, "--chart-1", "#9aa35a"),
    ],
    shadow: token(styles, "--foreground", "#2f3120"),
  };
}

function drawLeaf(
  context: CanvasRenderingContext2D,
  leafPath: Path2D,
  palette: ScenePalette,
  point: Point,
  angle: number,
  size: number,
  color: string,
  alpha: number,
) {
  context.save();
  context.translate(point.x, point.y);
  context.rotate(angle);
  context.scale(size, size);
  context.globalAlpha = alpha * 0.1;
  context.fillStyle = palette.shadow;
  context.save();
  context.translate(0.05, 0.07);
  context.fill(leafPath);
  context.restore();
  context.globalAlpha = alpha;
  context.fillStyle = color;
  context.fill(leafPath);
  context.restore();
}

function createSproutScene(
  context: CanvasRenderingContext2D,
  environment: SceneEnvironment,
): SceneRenderer {
  const { height, leafPath, palette, width } = environment;
  const base = { x: width * 0.5, y: height * 0.8 };
  const stemHeight = Math.min(height * 0.55, width * 0.48);
  const leafSize = clamp(stemHeight * 0.28, 15, 34);
  const leafPairs = [
    { level: 0.34, scale: 1, spread: 0.94 },
    { level: 0.58, scale: 0.82, spread: 0.84 },
    { level: 0.78, scale: 0.66, spread: 0.75 },
  ];

  const stemPoint = (progress: number, sway: number): Point => ({
    x: base.x + Math.sin(progress * Math.PI * 0.9) * stemHeight * 0.07 * sway,
    y: base.y - stemHeight * progress,
  });

  return (elapsedSeconds, shouldReduceMotion) => {
    const growth = shouldReduceMotion
      ? 1
      : easeOutCubic(clamp((elapsedSeconds - 0.1) / 1.8, 0, 1));
    const sway = shouldReduceMotion
      ? 1
      : 1 + Math.sin(elapsedSeconds * 0.72) * 0.02;

    context.strokeStyle = palette.edge;
    context.lineWidth = 1.5;
    context.globalAlpha = 0.7;
    context.beginPath();
    context.moveTo(base.x - stemHeight * 0.47, base.y + 2);
    context.quadraticCurveTo(
      base.x,
      base.y + 9,
      base.x + stemHeight * 0.47,
      base.y + 2,
    );
    context.stroke();

    context.strokeStyle = palette.bark;
    context.lineCap = "round";
    context.lineWidth = clamp(leafSize * 0.09, 2, 4);
    context.globalAlpha = 0.82;
    context.beginPath();
    for (let index = 0; index <= 24; index += 1) {
      const progress = (index / 24) * growth;
      const point = stemPoint(progress, sway);
      if (index === 0) context.moveTo(point.x, point.y);
      else context.lineTo(point.x, point.y);
    }
    context.stroke();

    leafPairs.forEach((pair, index) => {
      if (growth < pair.level) return;
      const bloom = easeOutCubic(
        clamp((growth - pair.level) / (1 - pair.level), 0, 1),
      );
      const point = stemPoint(pair.level, sway);
      const size = leafSize * pair.scale * bloom;
      const leafSway = shouldReduceMotion
        ? 0
        : Math.sin(elapsedSeconds * 0.68 + index) * 0.035;
      drawLeaf(
        context,
        leafPath,
        palette,
        { x: point.x - size * 0.28, y: point.y },
        -Math.PI / 2 - pair.spread + leafSway,
        size,
        palette.leaf[index % palette.leaf.length],
        0.9,
      );
      drawLeaf(
        context,
        leafPath,
        palette,
        { x: point.x + size * 0.28, y: point.y },
        -Math.PI / 2 + pair.spread - leafSway,
        size * 0.94,
        palette.leaf[(index + 1) % palette.leaf.length],
        0.86,
      );
    });

    if (growth > 0.97) {
      const crown = stemPoint(1, sway);
      drawLeaf(
        context,
        leafPath,
        palette,
        { x: crown.x, y: crown.y - leafSize * 0.28 },
        -Math.PI / 2 +
          (shouldReduceMotion ? 0 : Math.sin(elapsedSeconds * 0.64) * 0.035),
        leafSize * 0.55,
        palette.leaf[0],
        0.95,
      );
    }
    context.globalAlpha = 1;
  };
}

function createBarsScene(
  context: CanvasRenderingContext2D,
  environment: SceneEnvironment,
): SceneRenderer {
  const { height, leafPath, palette, random, width } = environment;
  const count = clamp(Math.round(width / 68), 4, 7);
  const horizontalPadding = width * 0.13;
  const gap = (width - horizontalPadding * 2) / (count - 1);
  const baseline = height * 0.82;
  const maximumHeight = height * 0.58;
  const bars = Array.from({ length: count }, (_, index) => ({
    born: 0.15 + index * 0.14,
    color: palette.leaf[index % palette.leaf.length],
    height: maximumHeight * (0.34 + random() * 0.58),
    phase: random() * Math.PI * 2,
    size: clamp(gap * 0.33, 11, 25),
    x: horizontalPadding + index * gap,
  }));

  return (elapsedSeconds, shouldReduceMotion) => {
    context.strokeStyle = palette.edge;
    context.lineWidth = 1;
    context.globalAlpha = 0.7;
    context.beginPath();
    context.moveTo(horizontalPadding - gap * 0.45, baseline);
    context.lineTo(width - horizontalPadding + gap * 0.45, baseline);
    context.stroke();

    bars.forEach((bar) => {
      const growth = shouldReduceMotion
        ? 1
        : easeOutCubic(clamp((elapsedSeconds - bar.born) / 0.85, 0, 1));
      const breathing = shouldReduceMotion
        ? 0
        : Math.sin(elapsedSeconds * 0.52 + bar.phase) * maximumHeight * 0.012;
      const barHeight = (bar.height + breathing) * growth;
      const top = baseline - barHeight;

      context.strokeStyle = palette.bark;
      context.lineCap = "round";
      context.lineWidth = clamp(bar.size * 0.15, 2.25, 4);
      context.globalAlpha = 0.78;
      context.beginPath();
      context.moveTo(bar.x, baseline);
      context.lineTo(bar.x, top + bar.size * 0.28);
      context.stroke();
      drawLeaf(
        context,
        leafPath,
        palette,
        { x: bar.x, y: top },
        -Math.PI / 2 +
          (shouldReduceMotion
            ? 0
            : Math.sin(elapsedSeconds * 0.7 + bar.phase) * 0.045),
        bar.size * growth,
        bar.color,
        0.88,
      );
    });
    context.globalAlpha = 1;
  };
}

function createGraphScene(
  context: CanvasRenderingContext2D,
  environment: SceneEnvironment,
): SceneRenderer {
  interface GraphNode extends Point {
    amplitude: number;
    born: number;
    color: string;
    isHub: boolean;
    phase: number;
    size: number;
  }

  const { height, leafPath, palette, random, width } = environment;
  const center = { x: width * 0.5, y: height * 0.5 };
  const radius = Math.min(width, height) * 0.39;
  const nodeCount = width < 280 ? 7 : 10;
  const leafSize = clamp(Math.min(width, height) / 24, 11, 21);
  const nodes: Array<GraphNode> = [
    {
      ...center,
      amplitude: 0,
      born: 0,
      color: palette.leaf[0],
      isHub: true,
      phase: 0,
      size: leafSize * 1.35,
    },
  ];

  for (let index = 0; index < nodeCount; index += 1) {
    const angle = (index / nodeCount) * Math.PI * 2 + (random() - 0.5) * 0.24;
    const distance = radius * (0.58 + random() * 0.44);
    nodes.push({
      amplitude: 2 + random() * 3,
      born: 0.16 + index * 0.1,
      color: palette.leaf[(index + 1) % palette.leaf.length],
      isHub: false,
      phase: random() * Math.PI * 2,
      size: leafSize * (0.68 + random() * 0.38),
      x: center.x + Math.cos(angle) * distance,
      y: center.y + Math.sin(angle) * distance * 0.88,
    });
  }

  const edges = nodes.slice(1).map((_, index) => ({
    born: nodes[index + 1].born + 0.12,
    from: 0,
    to: index + 1,
  }));

  return (elapsedSeconds, shouldReduceMotion) => {
    const positions = nodes.map((node) => {
      if (node.isHub || shouldReduceMotion) return { x: node.x, y: node.y };
      const offset =
        Math.sin(elapsedSeconds * 0.36 + node.phase) * node.amplitude;
      return {
        x: node.x + Math.cos(node.phase) * offset,
        y: node.y + Math.sin(node.phase) * offset,
      };
    });

    edges.forEach((edge) => {
      const growth = shouldReduceMotion
        ? 1
        : easeOutCubic(clamp((elapsedSeconds - edge.born) / 0.7, 0, 1));
      if (growth <= 0) return;
      const start = positions[edge.from];
      const end = positions[edge.to];
      context.strokeStyle = palette.edge;
      context.lineWidth = 1.1;
      context.globalAlpha = 0.78;
      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(
        start.x + (end.x - start.x) * growth,
        start.y + (end.y - start.y) * growth,
      );
      context.stroke();
    });

    nodes.forEach((node, index) => {
      const growth = shouldReduceMotion
        ? 1
        : easeOutCubic(clamp((elapsedSeconds - node.born) / 0.55, 0, 1));
      if (growth <= 0) return;
      drawLeaf(
        context,
        leafPath,
        palette,
        positions[index],
        node.phase +
          (shouldReduceMotion
            ? 0
            : Math.sin(elapsedSeconds * 0.42 + node.phase) * 0.055),
        node.size * growth,
        node.color,
        node.isHub ? 0.98 : 0.82,
      );
    });

    context.globalAlpha = 1;
  };
}

function createTreeScene(
  context: CanvasRenderingContext2D,
  environment: SceneEnvironment,
): SceneRenderer {
  interface Branch {
    born: number;
    end: Point;
    start: Point;
    width: number;
  }

  interface TreeLeaf extends Point {
    angle: number;
    born: number;
    color: string;
    phase: number;
    size: number;
  }

  const { height, leafPath, palette, random, width } = environment;
  const branches: Array<Branch> = [];
  const tips: Array<{ point: Point; depth: number }> = [];
  const leaves: Array<TreeLeaf> = [];
  const base = { x: width * 0.5, y: height * 0.98 };
  const trunkHeight = height * 0.48;
  const branchLength = Math.min(width, height) * 0.15;
  const leafSize = clamp(Math.min(width, height) / 24, 11, 21);

  function grow(
    start: Point,
    angle: number,
    length: number,
    branchWidth: number,
    depth: number,
  ) {
    const end = {
      x: start.x + Math.cos(angle) * length,
      y: start.y + Math.sin(angle) * length,
    };
    branches.push({
      born: depth * 0.15,
      end,
      start,
      width: branchWidth,
    });
    if (depth >= 4 || length < 9) {
      tips.push({ depth, point: end });
      return;
    }
    const childCount = depth === 0 ? 3 : 2;
    for (let index = 0; index < childCount; index += 1) {
      const spread =
        (index - (childCount - 1) / 2) * (0.42 + random() * 0.12) +
        (random() - 0.5) * 0.14;
      grow(
        end,
        angle + spread,
        depth === 0 ? branchLength : length * (0.68 + random() * 0.08),
        branchWidth * 0.62,
        depth + 1,
      );
    }
  }

  grow(
    base,
    -Math.PI / 2 + (random() - 0.5) * 0.08,
    trunkHeight,
    Math.max(3.5, leafSize * 0.5),
    0,
  );

  tips.forEach(({ point, depth }, tipIndex) => {
    const count = 2 + Math.floor(random() * 2);
    for (let index = 0; index < count; index += 1) {
      leaves.push({
        angle: random() * Math.PI * 2,
        born: 0.65 + depth * 0.12 + tipIndex * 0.018,
        color: palette.leaf[(tipIndex + index) % palette.leaf.length],
        phase: random() * Math.PI * 2,
        size: leafSize * (0.66 + random() * 0.42),
        x: point.x + (random() - 0.5) * leafSize * 1.7,
        y: point.y + (random() - 0.5) * leafSize * 1.5,
      });
    }
  });

  return (elapsedSeconds, shouldReduceMotion) => {
    context.lineCap = "round";
    branches.forEach((branch) => {
      const growth = shouldReduceMotion
        ? 1
        : easeOutCubic(clamp((elapsedSeconds - branch.born) / 1.1, 0, 1));
      if (growth <= 0) return;
      context.strokeStyle = palette.bark;
      context.lineWidth = branch.width;
      context.globalAlpha = 0.78;
      context.beginPath();
      context.moveTo(branch.start.x, branch.start.y);
      context.lineTo(
        branch.start.x + (branch.end.x - branch.start.x) * growth,
        branch.start.y + (branch.end.y - branch.start.y) * growth,
      );
      context.stroke();
    });

    leaves.forEach((leaf) => {
      const growth = shouldReduceMotion
        ? 1
        : easeOutCubic(clamp((elapsedSeconds - leaf.born) / 0.65, 0, 1));
      if (growth <= 0) return;
      drawLeaf(
        context,
        leafPath,
        palette,
        leaf,
        leaf.angle +
          (shouldReduceMotion
            ? 0
            : Math.sin(elapsedSeconds * 0.48 + leaf.phase) * 0.045),
        leaf.size * growth,
        leaf.color,
        0.84,
      );
    });
    context.globalAlpha = 1;
  };
}

function createDriftScene(
  context: CanvasRenderingContext2D,
  environment: SceneEnvironment,
): SceneRenderer {
  const { height, leafPath, palette, random, width } = environment;
  const leaves = Array.from(
    { length: clamp(Math.round((width * height) / 27_000), 5, 12) },
    (_, index) => ({
      alpha: 0.32 + random() * 0.28,
      angle: random() * Math.PI * 2,
      amplitude: 5 + random() * 12,
      color: palette.leaf[index % palette.leaf.length],
      phase: random() * Math.PI * 2,
      rotationSpeed: (random() - 0.5) * 0.24,
      size:
        clamp(Math.min(width, height) / 20, 10, 18) * (0.68 + random() * 0.42),
      speed: width / (38 + random() * 24),
      startX: random() * width,
      startY: height * (0.12 + random() * 0.76),
    }),
  );

  return (elapsedSeconds, shouldReduceMotion) => {
    leaves.forEach((leaf) => {
      const x = shouldReduceMotion
        ? leaf.startX
        : ((leaf.startX + leaf.speed * elapsedSeconds) %
            (width + leaf.size * 4)) -
          leaf.size * 2;
      const y =
        leaf.startY +
        (shouldReduceMotion
          ? 0
          : Math.sin(elapsedSeconds * 0.34 + leaf.phase) * leaf.amplitude);
      drawLeaf(
        context,
        leafPath,
        palette,
        { x, y },
        leaf.angle +
          (shouldReduceMotion ? 0 : elapsedSeconds * leaf.rotationSpeed),
        leaf.size,
        leaf.color,
        leaf.alpha,
      );
    });
  };
}

const SCENE_BUILDERS: Record<
  EmptyStateSceneName,
  (
    context: CanvasRenderingContext2D,
    environment: SceneEnvironment,
  ) => SceneRenderer
> = {
  bars: createBarsScene,
  drift: createDriftScene,
  graph: createGraphScene,
  sprout: createSproutScene,
  tree: createTreeScene,
};

/**
 * Mount one deterministic scene on a dashboard canvas.
 *
 * Resize and theme changes rebuild from the same seed, so the composition stays
 * stable instead of jumping whenever the shell changes size or appearance.
 */
export function createEmptyStateSceneController(
  canvas: HTMLCanvasElement,
  sceneName: EmptyStateSceneName,
  seed = SCENE_SEEDS[sceneName],
): EmptyStateSceneController {
  const context = canvas.getContext("2d")!;
  if (!context) throw new Error("The empty-state canvas is unavailable.");

  const leafPath = new Path2D(THALLY_LEAF_PATH);
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let shouldReduceMotion = motionQuery.matches;
  let renderer: SceneRenderer | null = null;
  let width = 1;
  let height = 1;
  let startedAt = performance.now();
  let pausedAt: number | null = null;
  let frameId: number | null = null;
  let resizeFrameId: number | null = null;
  let isVisible = true;
  let isDestroyed = false;

  function render(now: number) {
    if (!renderer) return;
    context.clearRect(0, 0, width, height);
    const elapsedSeconds = shouldReduceMotion ? 12 : (now - startedAt) / 1000;
    renderer(elapsedSeconds, shouldReduceMotion);
  }

  function drawFrame(now: number) {
    if (isDestroyed || shouldReduceMotion || !isVisible) return;
    render(now);
    frameId = window.requestAnimationFrame(drawFrame);
  }

  function startFrames() {
    if (frameId !== null || shouldReduceMotion || !isVisible || isDestroyed) {
      return;
    }
    frameId = window.requestAnimationFrame(drawFrame);
  }

  function stopFrames() {
    if (frameId === null) return;
    window.cancelAnimationFrame(frameId);
    frameId = null;
  }

  function build() {
    const now = performance.now();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    renderer = SCENE_BUILDERS[sceneName](context, {
      height,
      leafPath,
      palette: readPalette(canvas),
      random: seededRandom(seed),
      width,
    });
    startedAt = now;
    if (pausedAt !== null) pausedAt = now;
    render(startedAt);
  }

  function scheduleBuild() {
    if (resizeFrameId !== null) window.cancelAnimationFrame(resizeFrameId);
    resizeFrameId = window.requestAnimationFrame(() => {
      resizeFrameId = null;
      build();
    });
  }

  function handleMotionPreference(event: MediaQueryListEvent) {
    shouldReduceMotion = event.matches;
    stopFrames();
    build();
    if (shouldReduceMotion) render(performance.now());
    else startFrames();
  }

  const resizeObserver =
    "ResizeObserver" in window ? new ResizeObserver(scheduleBuild) : null;
  resizeObserver?.observe(canvas);

  const intersectionObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          const wasVisible = isVisible;
          isVisible = entry?.isIntersecting ?? true;
          if (!isVisible) {
            if (wasVisible) pausedAt = performance.now();
            stopFrames();
          } else {
            if (!wasVisible && pausedAt !== null) {
              startedAt += performance.now() - pausedAt;
              pausedAt = null;
            }
            startFrames();
          }
        })
      : null;
  intersectionObserver?.observe(canvas);

  // next-themes toggles a class on <html>; rebuilding is cheaper and more
  // reliable than trying to translate token colors after every draw.
  const themeObserver =
    "MutationObserver" in window ? new MutationObserver(scheduleBuild) : null;
  themeObserver?.observe(document.documentElement, {
    attributeFilter: ["class", "style"],
    attributes: true,
  });

  motionQuery.addEventListener("change", handleMotionPreference);
  build();
  if (shouldReduceMotion) render(performance.now());
  else startFrames();

  return {
    destroy() {
      isDestroyed = true;
      stopFrames();
      if (resizeFrameId !== null) window.cancelAnimationFrame(resizeFrameId);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      themeObserver?.disconnect();
      motionQuery.removeEventListener("change", handleMotionPreference);
    },
  };
}
