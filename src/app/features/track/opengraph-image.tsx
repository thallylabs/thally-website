import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Thally Track product knowledge impact analysis";

export default function Image() {
  return renderOgImage({
    title: "The product changed. The knowledge should follow.",
    description: "Map specific product changes to evidence-backed documentation drafts for human review.",
    url: "thally.io/features/track",
  });
}
