import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "About Thally and the product knowledge synchronization mission";

export default function Image() {
  return renderOgImage({
    title: "The product changes. The knowledge should follow.",
    pills: ["Product", "Evidence", "Knowledge", "Review"],
  });
}
