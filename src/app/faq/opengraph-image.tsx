import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Thally FAQ";

export default function Image() {
  return renderOgImage({
    title: "Answers for every part of Thally.",
    pills: ["Support", "Account", "Features", "Security", "Other"],
  });
}
