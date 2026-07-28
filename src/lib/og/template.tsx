import { ImageResponse } from "next/og";

import { LEAF_PATH } from "@/lib/og/leaf";

const THALLY_INK = "#1a2018";

export const OG_SIZE = { width: 1200, height: 630 };

type OgImageOptions = {
  title: string;
  description: string;
  url: string;
  theme?: "light" | "dark";
};

export function renderOgImage(_options: OgImageOptions) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <svg width="128" height="128" viewBox="0 0 32 32" aria-label="Thally">
        <path fill={THALLY_INK} d={LEAF_PATH} />
      </svg>
    </div>,
    OG_SIZE,
  );
}
