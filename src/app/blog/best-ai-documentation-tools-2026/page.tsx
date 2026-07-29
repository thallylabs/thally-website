import type { Metadata } from "next";

import { getPost } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

import { PostBody } from "./body";

const post = getPost("best-ai-documentation-tools-2026");

export const metadata: Metadata = {
  title: post.seoTitle,
  description: post.description,
  alternates: {
    canonical: `/blog/${post.slug}`,
  },
  openGraph: {
    type: "article",
    title: post.title,
    description: post.description,
    publishedTime: post.date,
    modifiedTime: post.updated,
    authors: ["/authors/thally-team"],
    url: `${SITE_URL}/blog/${post.slug}`,
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `${SITE_URL}/blog/${post.slug}#article`,
  headline: post.title,
  description: post.description,
  datePublished: post.date,
  dateModified: post.updated,
  url: `${SITE_URL}/blog/${post.slug}`,
  image: `${SITE_URL}/blog/${post.slug}/opengraph-image`,
  author: { "@id": `${SITE_URL}/authors/thally-team#team` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  isPartOf: { "@id": `${SITE_URL}/blog#blog` },
  mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
    { "@type": "ListItem", position: 2, name: post.cardTitle, item: `${SITE_URL}/blog/${post.slug}` },
  ],
};

const listedTools = ["Thally", "Mintlify", "GitBook", "ReadMe", "Docusaurus", "Fern", "Document360"];

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/blog/${post.slug}#list`,
  name: "Best AI documentation tools in 2026",
  itemListElement: listedTools.map((name, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name,
  })),
};

const faqJsonLd = post.faq
  ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE_URL}/blog/${post.slug}#faq`,
      mainEntity: post.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    }
  : null;

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <PostBody />
    </>
  );
}
