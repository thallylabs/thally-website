import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Thally pricing";

export default function Image() {
  return renderOgImage({
    title: "Free to self-host, simple to scale",
    description: "Run Thally yourself for free, or choose managed Cloud and Enterprise plans.",
    url: "thally.io/pricing",
  });
}
