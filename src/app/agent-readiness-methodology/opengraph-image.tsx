import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Thally agent-readiness methodology";

export default function Image() {
  return renderOgImage({
    title: "Agent-readiness methodology",
    description: "How Thally evaluates whether documentation can be discovered, understood, and cited by AI systems.",
    url: "thally.io/agent-readiness-methodology",
  });
}
