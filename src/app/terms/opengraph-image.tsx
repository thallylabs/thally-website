import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Thally terms of service";

export default function Image() {
  return renderOgImage({
    title: "Terms of service",
    description: "The terms governing Thally Cloud and other hosted Thally services.",
    url: "thally.io/terms",
  });
}
