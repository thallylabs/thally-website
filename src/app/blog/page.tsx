import type { Metadata } from "next";

import { BlogIndex } from "@/components/blog/blog-index";
import { blogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Documentation Guides and Comparisons",
  description:
    "Evidence-led guides and comparisons about AI-native documentation, agent-readable docs, MCP, llms.txt, migration, and docs automation.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": `${SITE_URL}/rss.xml`,
    },
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/blog#blog`,
  name: "The Thally blog",
  url: `${SITE_URL}/blog`,
  description:
    "Comparisons, guides, and product deep dives on documentation that serves AI agents and humans from one source.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    url: `${SITE_URL}/blog/${post.slug}`,
    author: { "@id": `${SITE_URL}/authors/thally-team#team` },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      <BlogIndex />
    </>
  );
}
