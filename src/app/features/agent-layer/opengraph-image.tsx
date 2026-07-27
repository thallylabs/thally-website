import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Thally Agent Layer grounded answers for AI agents";

export default function Image() {
  return renderOgImage({
    title: "Answers, with receipts.",
    description:
      "Publish your documentation in the formats AI agents read best, with the evidence to back every answer.",
    url: "thally.io/features/agent-layer",
  });
}
