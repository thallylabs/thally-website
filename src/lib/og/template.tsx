import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { LEAF_PATH } from "@/lib/og/leaf";

const PALETTES = {
  light: {
    background: "#fbfbf3",
    foreground: "#252b22",
    muted: "#6c7268",
    faint: "#8b9188",
    leaf: "#41794f",
  },
  dark: {
    background: "#131a14",
    foreground: "#f5f6ec",
    muted: "#abb2a2",
    faint: "#7c8375",
    leaf: "#ffffff",
  },
};

export const OG_SIZE = { width: 1200, height: 630 };

export type OgTheme = keyof typeof PALETTES;

function loadFont(file: string) {
  return readFile(join(process.cwd(), "src/lib/og/fonts", file));
}

function truncateAtWord(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;

  const slice = value.slice(0, maxLength - 1);
  const lastSpace = slice.lastIndexOf(" ");
  const cutoff = lastSpace > maxLength * 0.6 ? lastSpace : slice.length;
  return `${slice.slice(0, cutoff).trim()}…`;
}

function balancedTitleLines(value: string) {
  const title = truncateAtWord(value, 56);
  if (title.length < 32) return [title];

  const words = title.split(" ");
  let bestIndex = 1;
  let smallestDifference = title.length;

  for (let index = 1; index < words.length; index += 1) {
    const first = words.slice(0, index).join(" ");
    const second = words.slice(index).join(" ");
    const difference = Math.abs(first.length - second.length);
    if (difference < smallestDifference) {
      bestIndex = index;
      smallestDifference = difference;
    }
  }

  return [words.slice(0, bestIndex).join(" "), words.slice(bestIndex).join(" ")];
}

export async function renderOgImage({
  title,
  description,
  url,
  theme = "light",
}: {
  title: string;
  description: string;
  url: string;
  theme?: OgTheme;
}) {
  const [jakartaBold, inter, mono] = await Promise.all([
    loadFont("PlusJakartaSans-700.ttf"),
    loadFont("Inter-400.woff"),
    loadFont("JetBrainsMono-400.woff"),
  ]);
  const palette = PALETTES[theme];
  const titleLines = balancedTitleLines(title);
  const shortDescription = truncateAtWord(description, 94);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundColor: palette.background,
        color: palette.foreground,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 880,
          padding: "0 60px",
          textAlign: "center",
        }}
      >
        <svg width="46" height="46" viewBox="0 0 32 32" style={{ marginBottom: 34 }}>
          <path fill={palette.leaf} d={LEAF_PATH} />
        </svg>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Jakarta",
            fontSize: 58,
            fontWeight: 700,
            color: palette.foreground,
            letterSpacing: "-0.03em",
            lineHeight: 1.12,
          }}
        >
          {titleLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>

        <div
          style={{
            marginTop: 22,
            maxWidth: 630,
            fontFamily: "Inter",
            fontSize: 23,
            fontWeight: 400,
            color: palette.muted,
            lineHeight: 1.55,
          }}
        >
          {shortDescription}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 52,
          left: 0,
          display: "flex",
          justifyContent: "center",
          fontFamily: "Mono",
          fontSize: 15,
          fontWeight: 400,
          color: palette.faint,
        }}
      >
        {url}
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: "Jakarta", data: jakartaBold, weight: 700, style: "normal" },
        { name: "Inter", data: inter, weight: 400, style: "normal" },
        { name: "Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
