import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Thally pricing";

export default function Image() {
  return renderOgImage({
    title: "Start managed for free, scale when ready",
    description: "Launch one managed site for free, or self-host the MIT-licensed engine.",
    url: "thally.io/pricing",
  });
}
