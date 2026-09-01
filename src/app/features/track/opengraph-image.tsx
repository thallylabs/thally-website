import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Thally Track product knowledge impact analysis";

export default function Image() {
  return renderOgImage({
    title: "One product change. Every affected surface.",
    description: "Map one merge to evidence-backed pull requests across the connected surfaces it affects.",
    url: "thally.io/features/track",
  });
}
