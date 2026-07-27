import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Thally Automation merge-to-draft documentation pipeline";

export default function Image() {
  return renderOgImage({
    title: "Ship the code. Docs follow.",
    description: "Connect repos once. Every merge drafts evidence-backed documentation updates for human review.",
    url: "thally.io/features/automation",
  });
}
