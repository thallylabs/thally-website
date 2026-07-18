import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Thally pricing";

export default function Image() {
  return renderOgImage({
    title: "Free to self-host, simple to scale.",
    pills: ["Free $0", "Cloud from $50/workspace", "Enterprise custom"],
  });
}
