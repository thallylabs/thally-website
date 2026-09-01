import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Thally Automation cross-surface product update pipeline";

export default function Image() {
  return renderOgImage({
    title: "Every product change. Every affected surface.",
    description: "One merge becomes evidence-backed pull requests across every connected surface it affects.",
    url: "thally.io/features/automation",
  });
}
