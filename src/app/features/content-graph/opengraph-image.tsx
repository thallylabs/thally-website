import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Thally Content Graph: one MDX source published to every format";

export default function Image() {
  return renderOgImage({
    title: "Write once. Speak every format.",
    description: "One MDX source becomes rendered HTML, clean Markdown, structured JSON, and llms.txt, always in sync.",
    url: "thally.io/features/content-graph",
  });
}
