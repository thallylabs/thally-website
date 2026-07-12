import type { Metadata } from "next";

import { BlogIndex } from "@/components/blog/blog-index";
import { blogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Comparisons, guides, and product deep dives from Thally: AI-native documentation, agent-ready docs, and how Thally stacks up against Mintlify, GitBook, and Docusaurus.",
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
    url: `${SITE_URL}/blog/${post.slug}`,
    author: { "@id": `${SITE_URL}/#organization` },
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
