import type { Metadata } from "next";
import Link from "next/link";

import { DESTINATIONS, SITE_URL } from "@/lib/site";

const title = "Agent-Readiness Methodology";
const description =
  "The deterministic checks Thally uses to evaluate whether documentation can be discovered, parsed, understood, and cited by AI systems.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/agent-readiness-methodology" },
  openGraph: { title, description, url: "/agent-readiness-methodology", type: "article" },
};

export default function AgentReadinessMethodologyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/agent-readiness-methodology#article`,
    url: `${SITE_URL}/agent-readiness-methodology`,
    headline: title,
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
        <p className="text-primary text-sm font-semibold tracking-wide uppercase">Open methodology</p>
        <h1>{title}</h1>
        <p className="lead">{description}</p>
        <p>Methodology version 1.0. Last reviewed July 19, 2026.</p>

        <h2>What the score measures</h2>
        <p>
          The score is a conformance result, not a prediction that an answer engine will cite a page. It evaluates the
          technical conditions that let a machine find the canonical source, retrieve useful content, understand its
          structure, and verify its freshness.
        </p>

        <h2>Evaluation categories</h2>
        <ol>
          <li>
            <strong>Discovery:</strong> sitemap, robots, llms.txt, feeds, and explicit alternate formats.
          </li>
          <li>
            <strong>Identity:</strong> canonical URLs, language declarations, titles, descriptions, authors, and dates.
          </li>
          <li>
            <strong>Structure:</strong> one descriptive H1, logical headings, semantic HTML, JSON-LD, and API schemas.
          </li>
          <li>
            <strong>Retrieval:</strong> useful Markdown or JSON, stable URLs, server-rendered content, and successful
            responses.
          </li>
          <li>
            <strong>Trust:</strong> cited primary sources, editorial ownership, correction paths, and claim freshness.
          </li>
          <li>
            <strong>Parity:</strong> consistent claims across HTML, metadata, schema, feeds, and machine-readable files.
          </li>
        </ol>

        <h2>Release checks</h2>
        <p>
          The website release audit fails for unsafe production origins, malformed discovery files, missing critical
          metadata, invalid JSON-LD, duplicate canonical URLs, or prohibited copy characters. Warnings identify title or
          description lengths and optional trust signals that need editorial judgment.
        </p>

        <h2>Limitations</h2>
        <p>
          No technical score guarantees ranking, inclusion, or citation. Answer engines use their own indexes and
          policies. Real visibility must be measured separately with stable prompts, cited-source capture, analytics,
          and search-platform data over time.
        </p>

        <h2>Verify the implementation</h2>
        <ul>
          <li>
            <Link href="/agent-readiness.json">Machine-readable methodology manifest</Link>
          </li>
          <li>
            <Link href="/llms.txt">Concise agent discovery file</Link>
          </li>
          <li>
            <Link href="/llms-full.txt">Expanded agent corpus</Link>
          </li>
          <li>
            <a href={DESTINATIONS.docs}>Thally product documentation</a>
          </li>
        </ul>
      </article>
    </main>
  );
}
