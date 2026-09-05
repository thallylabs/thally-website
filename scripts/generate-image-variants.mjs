import { readdirSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");

/**
 * Raster sources that ship as oversized PNGs, with the widths they are
 * actually painted at. Each entry produces `<name>-<width>.<ext>` next to the
 * source; the outputs are committed so a build never has to run sharp.
 */
const SOURCES = [
  { file: "template/workflow-diagram.png", widths: [520, 1040] },
  { file: "template/impact-analysis-diagram.png", widths: [520, 1040] },
];

const FORMATS = [
  { ext: "avif", encode: (image) => image.avif({ quality: 55, effort: 6 }) },
  { ext: "webp", encode: (image) => image.webp({ quality: 82 }) },
];

/**
 * sharp is a transitive dependency of Next, so it is not resolvable from the
 * project root on every install. Fall back to the pnpm store, and treat a
 * total miss as a skip: the generated files are committed, so a build that
 * cannot load sharp still has everything it needs.
 */
async function loadSharp() {
  try {
    return (await import("sharp")).default;
  } catch {
    // fall through to the store lookup
  }

  const storeDir = path.join(ROOT, "node_modules", ".pnpm");
  let entries = [];
  try {
    entries = readdirSync(storeDir).filter((entry) => entry.startsWith("sharp@"));
  } catch {
    return null;
  }

  const require = createRequire(import.meta.url);
  for (const entry of entries) {
    try {
      return require(path.join(storeDir, entry, "node_modules", "sharp"));
    } catch {
      // try the next matching version
    }
  }

  return null;
}

function isFresh(outputPath, sourcePath) {
  try {
    return statSync(outputPath).mtimeMs >= statSync(sourcePath).mtimeMs;
  } catch {
    return false;
  }
}

async function main() {
  const sharp = await loadSharp();
  if (!sharp) {
    console.log("generate-image-variants: sharp unavailable, using the committed variants.");
    return;
  }

  let written = 0;

  for (const { file, widths } of SOURCES) {
    const sourcePath = path.join(PUBLIC_DIR, file);
    const dir = path.dirname(sourcePath);
    const base = path.basename(file, path.extname(file));

    for (const width of widths) {
      for (const { ext, encode } of FORMATS) {
        const outputPath = path.join(dir, `${base}-${width}.${ext}`);
        if (isFresh(outputPath, sourcePath)) continue;

        await encode(sharp(sourcePath).resize({ width, withoutEnlargement: true })).toFile(outputPath);
        written += 1;
        console.log(`generate-image-variants: wrote ${path.relative(PUBLIC_DIR, outputPath)}`);
      }
    }
  }

  if (written === 0) console.log("generate-image-variants: all variants up to date.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
