import type { Metadata } from "next";

import { getPost } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

import { PostBody } from "./body";

const post = getPost("introducing-thally");
const authorUrl = `${SITE_URL}${post.authorPath}`;
const thumbnailUrl = `${SITE_URL}${post.thumbnailImage}`;

export const metadata: Metadata = {
  title: post.seoTitle,
  description: post.description,
  authors: [{ name: post.authorName, url: post.authorPath }],
  alternates: {
    canonical: `/blog/${post.slug}`,
  },
  openGraph: {
    type: "article",
    title: post.title,
    description: post.description,
    publishedTime: post.date,
    modifiedTime: post.updated,
    authors: [authorUrl],
    url: `${SITE_URL}/blog/${post.slug}`,
    images: [
      {
        url: thumbnailUrl,
        width: 1200,
        height: 630,
        alt: post.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.description,
    images: [thumbnailUrl],
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
  image: thumbnailUrl,
  author: {
    "@type": "Person",
    name: post.authorName,
    url: authorUrl,
  },
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

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <PostBody />
    </>
  );
}
