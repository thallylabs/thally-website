import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Thally Migration & Hosting for documentation";

export default function Image() {
  return renderOgImage({
    title: "Bring your docs. We'll host them.",
    description:
      "Import from GitBook, Mintlify, Docusaurus, or plain Markdown and deploy to a global edge in one step.",
    url: "thally.io/features/migration-hosting",
  });
}
