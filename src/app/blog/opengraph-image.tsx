import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "The Thally blog";

export default function Image() {
  return renderOgImage({
    title: "The Thally blog",
    description: "Evidence-led guides on product knowledge, documentation automation, and agent-ready docs.",
    url: "thally.io/blog",
  });
}
