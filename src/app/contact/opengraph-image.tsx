import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Contact Thally";

export default function Image() {
  return renderOgImage({
    title: "Talk to the Thally team.",
  });
}
