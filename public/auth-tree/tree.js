/* Thally auth-tree — an olive tree whose leaves are the Thally logo mark.
   Leaves sway, detach, flutter down, and settle on the ground; the canopy
   quietly regrows so the scene loops forever. Pure canvas, no dependencies. */
(function () {
  "use strict";
  const canvas = document.getElementById("scene");
  const ctx = canvas.getContext("2d");
  const LEAF = new Path2D(window.THALLY_LEAF.path);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let isPaused = reduce;
  let frameId = 0;

  // ---- Config -------------------------------------------------------------
  const CFG = {
    seed: 20260714,
    windStrength: 1, // overall breeze
    fallRate: 1, // how often leaves detach
    maxResting: 64, // leaves allowed on the ground before oldest fade
    palette: [
      "#9aa35a",
      "#aebb6a",
      "#8a9448",
      "#b7c46f",
      "#7c8a3f",
      "#c3d06e",
      "#a5b061",
    ],
    bark: ["#8a8f5a", "#6e7342"],
  };

  // ---- Utils --------------------------------------------------------------
  function mulberry32(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const lerp = (a, b, t) => a + (b - a) * t;

  // ---- State --------------------------------------------------------------
  let W = 0,
    H = 0,
    dpr = 1;
  let rootX = 0,
    groundY = 0,
    treeH = 0,
    leafPx = 20;
  let branches = []; // each: [{x,y,w,flex}, ...]
  let anchors = []; // attached-leaf slots
  let falling = [];
  let resting = [];
  let rng;

  // ---- Tree generation ----------------------------------------------------
  function flexOf(y) {
    return clamp((groundY - y) / treeH, 0, 1) ** 1.3;
  }

  function addAnchors(x, y, ang, count) {
    for (let i = 0; i < count; i++) {
      const jx = (rng() - 0.5) * leafPx * 1.5;
      const jy = (rng() - 0.5) * leafPx * 1.5;
      const px = x + jx,
        py = y + jy;
      anchors.push({
        x: px,
        y: py,
        flex: flexOf(py),
        ang: rng() * Math.PI * 2,
        idle: rng() * Math.PI * 2,
        size: leafPx * (0.72 + rng() * 0.6),
        ci: (rng() * CFG.palette.length) | 0,
        occupied: true,
        scale: 1, // grow-in animation
        regrowAt: 0,
      });
    }
  }

  function grow(x, y, ang, len, w, depth) {
    const steps = 4;
    let px = x,
      py = y,
      cang = ang;
    const pts = [{ x, y, w, flex: flexOf(y) }];
    for (let s = 1; s <= steps; s++) {
      cang += (rng() - 0.5) * 0.16;
      const sl = len / steps;
      px += Math.cos(cang) * sl;
      py += Math.sin(cang) * sl;
      const ww = Math.max(0.8, w * (1 - (s / steps) * 0.5));
      pts.push({ x: px, y: py, w: ww, flex: flexOf(py) });
    }
    branches.push(pts);
    const tipW = pts[pts.length - 1].w;

    if (depth <= 0 || len < treeH * 0.07) {
      addAnchors(px, py, cang, 3 + ((rng() * 3) | 0));
      return;
    }
    const n = depth > 3 ? 2 : rng() < 0.55 ? 2 : 3;
    for (let i = 0; i < n; i++) {
      const spread = i - (n - 1) / 2;
      const na = cang + spread * (0.34 + rng() * 0.28) + (rng() - 0.5) * 0.12;
      const nl = len * (0.6 + rng() * 0.22);
      grow(px, py, na, nl, tipW, depth - 1);
    }
    if (depth <= 2) addAnchors(px, py, cang, 2 + ((rng() * 2) | 0));
  }

  function buildTree() {
    branches = [];
    anchors = [];
    falling = [];
    resting = [];
    rng = mulberry32(CFG.seed);
    const lean = -Math.PI / 2 + (rng() - 0.5) * 0.12;
    grow(rootX, groundY, lean, treeH * 0.34, Math.max(11, H * 0.02), 5);
    if (reduce) seedGround();
  }

  function seedGround() {
    // a few leaves already resting, for the static / reduced-motion frame
    for (let i = 0; i < 22; i++) {
      const a = anchors[(rng() * anchors.length) | 0];
      resting.push({
        x: rootX + (rng() - 0.5) * W * 0.6,
        y: groundY + rng() * 14,
        ang: rng() * Math.PI * 2,
        size: a ? a.size : leafPx,
        ci: (rng() * CFG.palette.length) | 0,
        alpha: 1,
        fade: false,
      });
    }
  }

  // ---- Wind ---------------------------------------------------------------
  let gust = 0,
    gustAt = 3;
  function windAt(t) {
    const breeze = Math.sin(t * 0.6) * 0.6 + Math.sin(t * 0.23 + 1.3) * 0.4;
    return (breeze + gust) * CFG.windStrength;
  }

  // ---- Detach / regrow ----------------------------------------------------
  let dropTimer = 1.2;
  function detachOne(t, wind) {
    const live = [];
    for (let i = 0; i < anchors.length; i++)
      if (anchors[i].occupied) live.push(i);
    if (!live.length) return;
    const a = anchors[live[(rng() * live.length) | 0]];
    a.occupied = false;
    a.regrowAt = t + 3 + rng() * 5;
    const swayX = wind * a.flex * 26;
    falling.push({
      x: a.x + swayX,
      y: a.y,
      vx: wind * 8 + (rng() - 0.5) * 10,
      vy: 4 + rng() * 8,
      ang: a.ang,
      va: (rng() - 0.5) * 2.4,
      size: a.size,
      ci: a.ci,
      ph: rng() * Math.PI * 2,
      ff: 1.4 + rng() * 1.2,
      fa: 26 + rng() * 22,
      restY: groundY + 2 + rng() * 16,
      restX: 0,
      state: "fall",
      alpha: 1,
      fade: false,
      settle: 0,
    });
  }

  // ---- Update -------------------------------------------------------------
  function update(dt, t) {
    const wind = windAt(t);
    // gusts
    gustAt -= dt;
    if (gustAt <= 0) {
      gust = (rng() * 1.1 + 0.4) * (rng() < 0.5 ? -1 : 1);
      gustAt = 5 + rng() * 7;
    }
    gust *= Math.pow(0.4, dt); // decay

    // scheduled drops
    dropTimer -= dt * CFG.fallRate;
    if (dropTimer <= 0) {
      detachOne(t, wind);
      dropTimer = 0.35 + rng() * 0.9;
    }

    // regrow
    for (const a of anchors) {
      if (!a.occupied && t >= a.regrowAt) {
        a.occupied = true;
        a.scale = 0;
      }
      if (a.occupied && a.scale < 1) a.scale = clamp(a.scale + dt * 1.6, 0, 1);
    }

    // falling physics
    for (let i = falling.length - 1; i >= 0; i--) {
      const f = falling[i];
      if (f.state === "fall") {
        f.vy = Math.min(f.vy + 46 * dt, 74); // gravity + terminal
        const flutter = Math.sin(t * f.ff + f.ph) * f.fa;
        f.vx = lerp(f.vx, wind * 12 + flutter, 0.06);
        f.x += f.vx * dt;
        f.y += f.vy * dt;
        f.ang += (f.va + f.vx * 0.02) * dt;
        if (f.y >= f.restY) {
          f.y = f.restY;
          f.state = "rest";
          f.settle = 0;
          f.restAng = f.ang;
          resting.push(f);
          falling.splice(i, 1);
        }
      }
    }

    // resting settle + pile cap
    for (const r of resting) {
      if (r.state === "rest" && r.settle < 1) {
        r.settle = clamp(r.settle + dt * 3, 0, 1);
        r.ang = r.restAng + Math.sin(r.settle * Math.PI) * 0.12;
      }
    }
    const over = resting.length - CFG.maxResting;
    for (let i = 0; i < resting.length; i++) {
      if (i < over) resting[i].fade = true;
      if (resting[i].fade)
        resting[i].alpha = Math.max(0, resting[i].alpha - dt * 0.5);
    }
    resting = resting.filter((r) => r.alpha > 0.01);
  }

  // ---- Draw ---------------------------------------------------------------
  function drawLeaf(x, y, ang, size, ci, alpha, shadow) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(ang);
    ctx.scale(size, size);
    if (shadow) {
      ctx.save();
      ctx.translate(0.06, 0.09);
      ctx.globalAlpha = alpha * 0.18;
      ctx.fillStyle = "#2f3120";
      ctx.fill(LEAF);
      ctx.restore();
    }
    ctx.globalAlpha = alpha;
    ctx.fillStyle = CFG.palette[ci];
    ctx.fill(LEAF);
    // subtle inner highlight for depth
    ctx.globalAlpha = alpha * 0.16;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(-0.12, -0.12, 0.22, 0.16, -0.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawBranch(pts, wind) {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1],
        b = pts[i];
      const ax = a.x + wind * a.flex * 22,
        bx = b.x + wind * b.flex * 22;
      const grad = ctx.createLinearGradient(0, a.y, 0, groundY);
      ctx.strokeStyle = i < 2 ? CFG.bark[1] : CFG.bark[0];
      ctx.lineWidth = (a.w + b.w) / 2;
      ctx.beginPath();
      ctx.moveTo(ax, a.y);
      ctx.lineTo(bx, b.y);
      ctx.stroke();
    }
  }

  function draw(t) {
    const wind = windAt(t);
    // transparent background: the host card art shows through
    ctx.clearRect(0, 0, W, H);

    // soft ground shadow band
    const gg = ctx.createLinearGradient(0, groundY - 30, 0, groundY + 40);
    gg.addColorStop(0, "rgba(198,226,120,0)");
    gg.addColorStop(1, "rgba(198,226,120,0.10)");
    ctx.fillStyle = gg;
    ctx.fillRect(0, groundY - 30, W, 70);

    // resting leaves (behind trunk base)
    for (const r of resting)
      drawLeaf(r.x, r.y, r.ang, r.size, r.ci, r.alpha, true);

    // tree
    for (const b of branches) drawBranch(b, wind);

    // attached leaves
    for (const a of anchors) {
      if (!a.occupied) continue;
      const sway = wind * a.flex;
      const x = a.x + sway * 26;
      const y = a.y + Math.abs(sway) * 3;
      const idle = Math.sin(t * 0.9 + a.idle) * 0.09;
      drawLeaf(
        x,
        y,
        a.ang + sway * 0.5 + idle,
        a.size * a.scale,
        a.ci,
        1,
        false,
      );
    }

    // falling leaves (front)
    for (const f of falling)
      drawLeaf(f.x, f.y, f.ang, f.size, f.ci, f.alpha, false);
  }

  // ---- Loop / resize ------------------------------------------------------
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    rootX = W * (W < 720 ? 0.5 : 0.4);
    groundY = H * 0.9;
    treeH = H * 0.66;
    leafPx = clamp(Math.min(W, H) / 46, 15, 30);
    buildTree();
  }

  let last = 0;
  function frame(now) {
    if (isPaused) return;
    const t = now / 1000;
    let dt = last ? t - last : 0.016;
    last = t;
    dt = Math.min(dt, 0.05);
    update(dt, t);
    draw(t);
    frameId = requestAnimationFrame(frame);
  }

  let ro;
  function init() {
    resize();
    if (reduce) {
      draw(0);
      return;
    }
    frameId = requestAnimationFrame(frame);
  }

  // The React auth shell owns the accessible pause control. postMessage keeps
  // this raw design asset framework-agnostic while letting the parent suspend
  // the requestAnimationFrame loop without reaching into the iframe document.
  function setPaused(nextIsPaused) {
    if (reduce || nextIsPaused === isPaused) return;
    isPaused = nextIsPaused;
    if (isPaused) {
      cancelAnimationFrame(frameId);
      draw(performance.now() / 1000);
      return;
    }
    last = 0;
    frameId = requestAnimationFrame(frame);
  }

  window.addEventListener("message", (event) => {
    if (event.data?.type !== "thally-auth-tree:set-paused") return;
    setPaused(Boolean(event.data.isPaused));
  });
  window.addEventListener("resize", () => {
    clearTimeout(ro);
    ro = setTimeout(resize, 150);
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) last = 0;
  });
  init();
})();
