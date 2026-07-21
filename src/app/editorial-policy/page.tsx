import type { Metadata } from "next";
import Link from "next/link";

import { SITE_URL } from "@/lib/site";

const title = "Thally Editorial Policy";
const description =
  "How Thally researches, sources, reviews, updates, and corrects product documentation and editorial content.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/editorial-policy" },
  openGraph: { title, description, url: "/editorial-policy", type: "article" },
};

export default function EditorialPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/editorial-policy#page`,
    url: `${SITE_URL}/editorial-policy`,
    name: title,
    description,
    datePublished: "2026-07-19",
    dateModified: "2026-07-19",
    author: { "@id": `${SITE_URL}/authors/thally-team#team` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <main className="container py-20 md:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="prose prose-lg dark:prose-invert mx-auto max-w-3xl">
        <p className="text-primary text-sm font-semibold tracking-wide uppercase">Trust and transparency</p>
        <h1>{title}</h1>
        <p className="lead">{description}</p>
        <p>Published and last reviewed: July 19, 2026.</p>

        <h2>Scope and ownership</h2>
        <p>
          Content is maintained by the <Link href="/authors/thally-team">Thally Editorial Team</Link>. Product pages
          explain Thally, while guides and comparisons help readers evaluate documentation practices and platforms.
          Commercial intent is disclosed through clear product calls to action.
        </p>

        <h2>Research and sourcing</h2>
        <ul>
          <li>
            Thally capabilities are verified against the current code, public documentation, or deployed behavior.
          </li>
          <li>
            Competitor and standards claims use first-party documentation or an official specification where possible.
          </li>
          <li>Comparisons separate verifiable facts from our analysis and include a source-verification date.</li>
          <li>We do not publish invented customer quotes, review scores, usage numbers, or benchmark results.</li>
        </ul>

        <h2>Review and freshness</h2>
        <p>
          Every article displays its publication and update dates. Comparison sources are rechecked when a material
          product change is identified. Site maps and feeds expose the current update date to crawlers and readers.
        </p>

        <h2>AI assistance</h2>
        <p>
          AI tools may assist with research organization, drafting, editing, or conformance checks. A human remains
          responsible for the published claim, its source, and the final wording. AI assistance does not replace source
          verification.
        </p>

        <h2>Corrections</h2>
        <p>
          Send a correction with the page URL and supporting evidence to{" "}
          <a href="mailto:team@thally.io?subject=Editorial%20correction">team@thally.io</a>. Confirmed errors are
          corrected on the canonical page and receive a new update date when the change is material.
        </p>

        <h2>Machine-readable parity</h2>
        <p>
          Human and machine representations should make the same substantive claims. Our automated audit checks
          metadata, structured data, discovery files, origin safety, and content consistency before release. The checks
          are documented in the <Link href="/agent-readiness-methodology">agent-readiness methodology</Link>.
        </p>
      </article>
    </main>
  );
}
