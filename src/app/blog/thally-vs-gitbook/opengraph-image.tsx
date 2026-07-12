import { getPost } from "@/lib/blog";
import { OG_SIZE, renderOgImage } from "@/lib/og/template";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";

const post = getPost("thally-vs-gitbook");

export const alt = post.title;

export default function Image() {
  return renderOgImage({
    title: post.cardTitle + ".",
    pills: [post.category, "Thally Blog"],
  });
}
