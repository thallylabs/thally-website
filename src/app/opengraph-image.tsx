import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Thally — AI-Native Documentation for Agents and Humans";

export default function Image() {
  return renderOgImage({
    title: "AI-Native Documentation for Agents and Humans.",
  });
}
