/**
 * Lighthouse gate for the static export.
 *
 * Builds (unless told to skip), serves `out/` locally, runs Lighthouse on both
 * the mobile and desktop presets across the routes that carry the most
 * distinct rendering work, prints a score table, and exits non-zero when any
 * category on any route falls below its threshold.
 *
 * Usage:
 *   pnpm audit:perf                    build, then audit
 *   pnpm audit:perf --skip-build       audit whatever is already in out/
 *   PERF_AUDIT_SKIP_BUILD=1 pnpm audit:perf
 *   pnpm audit:perf --skip-build --only=desktop --port=4180 --dir=out
 */

import { spawn, spawnSync } from "node:child_process";
import { accessSync, constants, existsSync } from "node:fs";
import { createServer } from "node:net";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Routes chosen for coverage, not volume: the canvas-heavy home page, a
 *  pricing page full of interactive controls, a feature page with its own CSS
 *  module, and a long MDX article. */
const ROUTES = ["/", "/pricing", "/features/track", "/blog/thally-vs-mintlify"];

const FORM_FACTORS = [
  { id: "mobile", args: [] },
  // Lighthouse's shipped desktop preset. Passing formFactor alone would leave
  // mobile throttling and screen emulation in place and score the wrong thing.
  { id: "desktop", args: ["--preset=desktop"] },
];

const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];

/** Accessibility, best practices, and SEO are deterministic and already pass
 *  everywhere, so they are gated at the top score. */
const STRICT_MIN = 100;

/** Performance is the ratchet, not a target. These are the levels the export
 *  passes today, with a few points of headroom because Lighthouse performance
 *  scores move several points run to run and with machine load. Re-baselined
 *  on a quiet machine against a clean build: desktop is 100 on the home page
 *  and mobile sits at 87 to 90 across the four routes below.
 *
 *  Mobile is held back by simulated LCP alone; every other metric already
 *  scores 1.0. That number is Lantern's estimate of the hero paint behind the
 *  JS payload, not a late paint: the trace emits one LCP candidate at ~163ms,
 *  the same moment as FCP. Raise this floor as the JS payload comes down. */
const PERFORMANCE_MIN = {
  mobile: 82,
  desktop: 95,
};

const CHROME_FLAGS = "--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage";

const argv = process.argv.slice(2);
const hasFlag = (name) => argv.includes(`--${name}`);
const optionOf = (name, fallback) => {
  const hit = argv.find((arg) => arg.startsWith(`--${name}=`));
  return hit === undefined ? fallback : hit.slice(name.length + 3);
};
const isTruthy = (value) => ["1", "true", "yes", "on"].includes(String(value ?? "").toLowerCase());

const skipBuild = hasFlag("skip-build") || isTruthy(process.env.PERF_AUDIT_SKIP_BUILD);
const port = Number(optionOf("port", process.env.PERF_AUDIT_PORT ?? "4178"));
const exportDir = path.resolve(root, optionOf("dir", process.env.PERF_AUDIT_DIR ?? "out"));
const onlyFormFactor = optionOf("only", process.env.PERF_AUDIT_ONLY ?? "");
const routes = optionOf("routes", "")
  .split(",")
  .map((route) => route.trim())
  .filter(Boolean);

const targetRoutes = routes.length > 0 ? routes : ROUTES;
const targetFormFactors = onlyFormFactor
  ? FORM_FACTORS.filter((formFactor) => formFactor.id === onlyFormFactor)
  : FORM_FACTORS;

function fail(message) {
  console.error(`\nFAIL: ${message}`);
  process.exit(1);
}

if (!Number.isInteger(port) || port < 1024 || port > 65535) fail(`Invalid port: ${optionOf("port", "")}`);
if (targetFormFactors.length === 0) fail(`Unknown form factor "${onlyFormFactor}". Use mobile or desktop.`);
// Building writes out/, so building and then auditing somewhere else audits
// stale content under the impression that it is fresh.
if (!skipBuild && exportDir !== path.resolve(root, "out")) {
  fail("--dir only makes sense alongside --skip-build. The build always writes to out/.");
}

/** Lighthouse launches Chrome itself, but it fails late and cryptically when
 *  there is nothing to launch. Look first and say so plainly. */
function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/opt/google/chrome/chrome",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      accessSync(candidate, process.platform === "win32" ? constants.F_OK : constants.X_OK);
      return candidate;
    } catch {
      /* try the next one */
    }
  }
  return null;
}

function describeDir() {
  const relative = path.relative(root, exportDir);
  if (relative === "") return ".";
  return relative.startsWith("..") ? exportDir : relative;
}

function binary(name) {
  const suffix = process.platform === "win32" ? ".cmd" : "";
  return path.join(root, "node_modules", ".bin", `${name}${suffix}`);
}

function runBuild() {
  console.log("Building the static export...");
  const packageManager = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
  const result = spawnSync(packageManager, ["run", "build"], { cwd: root, stdio: "inherit" });
  if (result.error) fail(`Could not run "pnpm run build": ${result.error.message}`);
  if (result.status !== 0) fail(`"pnpm run build" exited with code ${result.status}`);
}

/** If something already owns the port, `serve` would quietly move to the next
 *  one and the audit would score whatever is running there under our own route
 *  names. That is the only way this harness can produce plausible but wrong
 *  numbers, so refuse the port rather than share it. */
function assertPortIsFree() {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.once("error", (error) => {
      reject(
        error.code === "EADDRINUSE"
          ? new Error(`Port ${port} is already in use. Pass --port=<free port> or stop the other server.`)
          : error,
      );
    });
    probe.once("listening", () => probe.close(() => resolve()));
    probe.listen(port, "127.0.0.1");
  });
}

async function waitForServer(origin, attempts = 80) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(origin, { redirect: "manual" });
      if (response.status < 500) return;
    } catch {
      /* not listening yet */
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Static server never became reachable on ${origin}`);
}

/** A missing route still scores as a perfectly good 404 page, which produces a
 *  baffling number instead of an error. Check every route up front. */
async function assertRoutesResolve(origin) {
  const missing = [];
  for (const route of targetRoutes) {
    try {
      const response = await fetch(`${origin}${route}`, { redirect: "follow" });
      if (!response.ok) missing.push(`${route} (HTTP ${response.status})`);
      else await response.arrayBuffer();
    } catch (error) {
      missing.push(`${route} (${error.message})`);
    }
  }
  if (missing.length > 0) {
    throw new Error(
      `These routes are not present in ${describeDir()}: ${missing.join(", ")}.` +
        " Rebuild the export, or drop --skip-build.",
    );
  }
}

function runLighthouse(url, formFactor) {
  const result = spawnSync(
    binary("lighthouse"),
    [
      url,
      "--quiet",
      "--output=json",
      "--output-path=stdout",
      `--only-categories=${CATEGORIES.join(",")}`,
      `--chrome-flags=${CHROME_FLAGS}`,
      ...formFactor.args,
    ],
    { cwd: root, encoding: "utf8", maxBuffer: 128 * 1024 * 1024 },
  );

  if (result.error) throw new Error(`Could not run Lighthouse: ${result.error.message}`);
  if (result.status !== 0) {
    throw new Error(`Lighthouse exited with code ${result.status} for ${url}\n${result.stderr ?? ""}`);
  }

  let report;
  try {
    report = JSON.parse(result.stdout);
  } catch {
    throw new Error(`Lighthouse produced unreadable output for ${url}\n${result.stderr ?? ""}`);
  }
  if (report.runtimeError) {
    throw new Error(`Lighthouse could not load ${url}: ${report.runtimeError.message}`);
  }

  const scores = {};
  for (const category of CATEGORIES) {
    const score = report.categories?.[category]?.score;
    if (typeof score !== "number") throw new Error(`Lighthouse returned no ${category} score for ${url}`);
    scores[category] = Math.round(score * 100);
  }
  return scores;
}

function thresholdFor(category, formFactorId) {
  return category === "performance" ? PERFORMANCE_MIN[formFactorId] : STRICT_MIN;
}

function printTable(rows) {
  const headers = ["route", "form factor", "perf", "a11y", "best-pr", "seo"];
  const body = rows.map((row) => [
    row.route,
    row.formFactor,
    String(row.scores.performance),
    String(row.scores.accessibility),
    String(row.scores["best-practices"]),
    String(row.scores.seo),
  ]);
  const widths = headers.map((header, column) => Math.max(header.length, ...body.map((cells) => cells[column].length)));
  const line = (cells) => cells.map((cell, column) => cell.padEnd(widths[column])).join("  ");

  console.log(`\n${line(headers)}`);
  console.log(widths.map((width) => "-".repeat(width)).join("  "));
  for (const cells of body) console.log(line(cells));
}

async function main() {
  const chrome = findChrome();
  if (!chrome) {
    fail(
      "No Chrome or Chromium installation found, so Lighthouse cannot run.\n" +
        "      Install Google Chrome, or point CHROME_PATH at an existing binary.",
    );
  }
  process.env.CHROME_PATH = chrome;

  await assertPortIsFree();

  if (!skipBuild) runBuild();

  if (!existsSync(path.join(exportDir, "index.html"))) {
    fail(
      `No static export at ${exportDir}. Run this without --skip-build, or pass --dir=<path> ` +
        "to point at an existing export.",
    );
  }
  if (!existsSync(binary("serve"))) fail('The "serve" devDependency is missing. Run pnpm install.');
  if (!existsSync(binary("lighthouse"))) fail('The "lighthouse" devDependency is missing. Run pnpm install.');

  const origin = `http://127.0.0.1:${port}`;
  const serveArgs = [exportDir, "-l", `tcp://127.0.0.1:${port}`, "-n", "-L", "--no-port-switching"];
  const server = spawn(binary("serve"), serveArgs, {
    cwd: root,
    stdio: ["ignore", "ignore", "pipe"],
  });

  let serverStderr = "";
  server.stderr.on("data", (chunk) => {
    serverStderr += chunk.toString();
  });
  server.on("error", (error) => {
    serverStderr += error.message;
  });

  const stopServer = () => {
    if (!server.killed) server.kill("SIGTERM");
  };
  process.on("exit", stopServer);
  process.on("SIGINT", () => {
    stopServer();
    process.exit(130);
  });

  const rows = [];
  const failures = [];

  try {
    try {
      await waitForServer(origin);
    } catch (error) {
      throw new Error(`${error.message}\n${serverStderr.trim()}`);
    }
    await assertRoutesResolve(origin);

    console.log(
      `Auditing ${targetRoutes.length} routes on ${targetFormFactors.map((f) => f.id).join(" and ")} ` +
        `from ${describeDir()} at ${origin}`,
    );

    for (const formFactor of targetFormFactors) {
      for (const route of targetRoutes) {
        process.stdout.write(`  ${formFactor.id} ${route} ... `);
        const scores = runLighthouse(`${origin}${route}`, formFactor);
        console.log(CATEGORIES.map((category) => `${category} ${scores[category]}`).join(", "));
        rows.push({ route, formFactor: formFactor.id, scores });

        for (const category of CATEGORIES) {
          const minimum = thresholdFor(category, formFactor.id);
          if (scores[category] < minimum) {
            failures.push(`${formFactor.id} ${route}: ${category} ${scores[category]} is below ${minimum}`);
          }
        }
      }
    }
  } finally {
    stopServer();
  }

  printTable(rows);

  const thresholdSummary =
    `thresholds: performance ${PERFORMANCE_MIN.mobile} mobile / ${PERFORMANCE_MIN.desktop} desktop, ` +
    `accessibility, best practices, and SEO ${STRICT_MIN}`;

  if (failures.length > 0) {
    console.error(`\n${failures.map((failure) => `FAIL: ${failure}`).join("\n")}`);
    console.error(`\n${thresholdSummary}`);
    process.exit(1);
  }

  console.log(`\nLighthouse gate passed for ${rows.length} audits (${thresholdSummary}).`);
}

main().catch((error) => {
  fail(error.message);
});
