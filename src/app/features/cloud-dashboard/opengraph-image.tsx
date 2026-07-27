import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Thally Cloud Dashboard knowledge ops overview";

export default function Image() {
  return renderOgImage({
    title: "Your knowledge ops, one place.",
    description: "Every site, draft, analytics view, and AI surface, managed from a single dashboard.",
    url: "thally.io/features/cloud-dashboard",
  });
}
