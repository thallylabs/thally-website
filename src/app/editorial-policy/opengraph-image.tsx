import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Thally editorial policy";

export default function Image() {
  return renderOgImage({
    title: "Thally editorial policy",
    description: "How Thally researches, sources, reviews, updates, and corrects its published content.",
    url: "thally.io/editorial-policy",
  });
}
