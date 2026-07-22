import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Sign up for Thally";

export default function Image() {
  return renderOgImage({
    title: "Create your docs site.",
  });
}
