import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Thally privacy policy";

export default function Image() {
  return renderOgImage({
    title: "Privacy policy",
    description: "How Thally handles personal data across thally.io and Thally Cloud.",
    url: "thally.io/privacy",
  });
}
