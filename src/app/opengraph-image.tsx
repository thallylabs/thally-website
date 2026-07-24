import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Thally: every product change, every knowledge surface, automatically in sync";

export default function Image() {
  return renderOgImage({
    title: "Every product change. Every knowledge surface.",
    description: "Thally finds the docs each change affects and drafts evidence-backed updates for your review.",
    url: "thally.io",
  });
}
