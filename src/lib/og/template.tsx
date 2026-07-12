import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { LEAF_PATH } from "@/lib/og/leaf";

/** Brand values from the design system tokens (oklch converted to hex for satori). */
const COLORS = {
  background: "#edf2ec",
  foreground: "#1a2018",
  leaf: "#737938",
  pillBorder: "rgba(26, 32, 24, 0.28)",
};

export const OG_SIZE = { width: 1200, height: 630 };

export const DEFAULT_PILLS = ["HTML", "JSON", "JSON-LD", "Markdown", "one URL"];

function loadFont(file: string) {
  return readFile(join(process.cwd(), "src/lib/og/fonts", file));
}

export async function renderOgImage({ title, pills = DEFAULT_PILLS }: { title: string; pills?: string[] }) {
  const [jakartaBold, jakartaExtraBold, mono] = await Promise.all([
    loadFont("PlusJakartaSans-700.ttf"),
    loadFont("PlusJakartaSans-800.ttf"),
    loadFont("JetBrainsMono-600.ttf"),
  ]);

  const titleSize = title.length > 44 ? 76 : title.length > 30 ? 84 : 92;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        backgroundColor: COLORS.background,
        backgroundImage: `linear-gradient(rgba(26, 32, 24, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 32, 24, 0.035) 1px, transparent 1px)`,
        backgroundSize: "72px 72px",
        fontFamily: "Jakarta",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width="56" height="56" viewBox="0 0 32 32">
          <path fill={COLORS.leaf} d={LEAF_PATH} />
        </svg>
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: COLORS.foreground,
            letterSpacing: "-0.02em",
          }}
        >
          Thally
        </div>
      </div>

      <div
        style={{
          fontSize: titleSize,
          fontWeight: 800,
          color: COLORS.foreground,
          letterSpacing: "-0.03em",
          lineHeight: 1.08,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "Mono" }}>
        {pills.map((pill, i) => {
          const solid = i === 0;
          const dashed = i === pills.length - 1 && pills.length > 2;
          return (
            <div
              key={pill}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 28px",
                borderRadius: 999,
                fontSize: 27,
                fontWeight: 600,
                backgroundColor: solid ? COLORS.foreground : "transparent",
                color: solid ? COLORS.background : COLORS.foreground,
                border: solid ? "2px solid transparent" : `2px ${dashed ? "dashed" : "solid"} ${COLORS.pillBorder}`,
              }}
            >
              {pill}
            </div>
          );
        })}
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: "Jakarta", data: jakartaBold, weight: 700, style: "normal" },
        { name: "Jakarta", data: jakartaExtraBold, weight: 800, style: "normal" },
        { name: "Mono", data: mono, weight: 600, style: "normal" },
      ],
    },
  );
}
