import { existsSync } from "node:fs";
import { readdir,readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const failures = [];
const warnings = [];

async function walk(directory, predicate) {
  if (!existsSync(directory)) return [];
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const target = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(target, predicate) : predicate(target) ? [target] : [];
    }),
  );
  return nested.flat();
}

for (const relativePath of [
  "public/llms.txt",
  "public/llms-full.txt",
  "public/agent-readiness.json",
  "public/pricing.md",
]) {
  if (!existsSync(path.join(root, relativePath))) failures.push(`Missing ${relativePath}`);
}

const publicTextFiles = await walk(path.join(root, "public"), (file) => /\.(?:txt|md|json|html)$/.test(file));
const sourceTextFiles = await walk(path.join(root, "src"), (file) => /\.(?:ts|tsx|md|mdx|txt|json|html)$/.test(file));

for (const file of [...publicTextFiles, ...sourceTextFiles]) {
  const contents = await readFile(file, "utf8");
  if (/\u2014|&mdash;|&#8212;/.test(contents)) failures.push(`Prohibited em dash in ${path.relative(root, file)}`);
}

for (const file of publicTextFiles) {
  const contents = await readFile(file, "utf8");
  if (/https?:\/\/(?:localhost|127\.0\.0\.1)/i.test(contents)) {
    failures.push(`Unsafe local origin in ${path.relative(root, file)}`);
  }
}

const htmlRoot = path.join(root, ".next/server/app");
const htmlFiles = await walk(
  htmlRoot,
  (file) => file.endsWith(".html") && !path.basename(file).startsWith("_") && !file.includes("_not-found"),
);
if (htmlFiles.length === 0) {
  warnings.push("No built HTML found. Run npm run audit:release for rendered-page checks.");
} else {
  for (const file of htmlFiles) {
    const html = await readFile(file, "utf8");
    const label = path.relative(htmlRoot, file);
    const isNoindex = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
    if (/https?:\/\/(?:localhost|127\.0\.0\.1)/i.test(html)) failures.push(`Unsafe local origin in ${label}`);
    if (!isNoindex && !/<link[^>]+rel=["']canonical["']/i.test(html)) failures.push(`Missing canonical link in ${label}`);
    const h1Count = (html.match(/<h1\b/gi) ?? []).length;
    if (!isNoindex && h1Count !== 1) failures.push(`${label} contains ${h1Count} H1 elements`);
    if (!/<meta[^>]+name=["']description["'][^>]+content=/i.test(html))
      failures.push(`Missing description in ${label}`);
    for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        JSON.parse(match[1].replaceAll("&quot;", '"').replaceAll("&amp;", "&"));
      } catch {
        failures.push(`Invalid JSON-LD in ${label}`);
      }
    }
  }
}

if (warnings.length) console.warn(warnings.map((warning) => `WARN: ${warning}`).join("\n"));
if (failures.length) {
  console.error(failures.map((failure) => `FAIL: ${failure}`).join("\n"));
  process.exit(1);
}

console.log(
  `SEO/AEO conformance passed for ${htmlFiles.length} rendered pages and ${publicTextFiles.length} public files.`,
);
