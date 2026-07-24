import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Thally Editorial Team";

export default function Image() {
  return renderOgImage({
    title: "Thally Editorial Team",
    description: "The team behind Thally product documentation, technical guides, and AI-readiness research.",
    url: "thally.io/authors/thally-team",
  });
}
