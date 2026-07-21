import type { Metadata } from "next";
import Link from "next/link";

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const title = "Thally Editorial Team";
const description =
  "Meet the team responsible for Thally product documentation, technical guides, comparisons, and AI-readiness research.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/authors/thally-team" },
  openGraph: { title, description, url: "/authors/thally-team", type: "profile" },
};

export default function ThallyTeamPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/authors/thally-team#profile`,
    url: `${SITE_URL}/authors/thally-team`,
    name: title,
    description,
    dateModified: "2026-07-19",
    mainEntity: {
      "@type": "Organization",
      "@id": `${SITE_URL}/authors/thally-team#team`,
      name: title,
      url: `${SITE_URL}/authors/thally-team`,
      description: `The team that maintains ${SITE_NAME} product documentation and editorial content.`,
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      email: "team@thally.io",
      knowsAbout: [
        "Developer documentation",
        "AI-native documentation",
        "Answer engine optimization",
        "Generative engine optimization",
        "Technical SEO",
      ],
    },
  };

  return (
    <main className="container py-20 md:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="prose prose-lg dark:prose-invert mx-auto max-w-3xl">
        <p className="text-primary text-sm font-semibold tracking-wide uppercase">Author profile</p>
        <h1>{title}</h1>
        <p className="lead">{description}</p>

        <h2>What we publish</h2>
        <p>
          The team publishes Thally product documentation, technical implementation guides, definitions, and product
          comparisons. Our goal is to make each claim useful to people, search engines, and AI systems without changing
          the underlying meaning between formats.
        </p>

        <h2>How we work</h2>
        <ul>
          <li>Product claims are checked against the current Thally implementation and public documentation.</li>
          <li>Third-party claims link to primary documentation whenever it is available.</li>
          <li>
            Articles show publication and update dates. Comparisons also show their latest source-verification date.
          </li>
          <li>Corrections are applied to the canonical article and recorded through Git history.</li>
        </ul>

        <h2>Editorial standards</h2>
        <p>
          Read our <Link href="/editorial-policy">editorial policy</Link> and our{" "}
          <Link href="/agent-readiness-methodology">agent-readiness methodology</Link> for the complete process. The
          platform overview is summarized as: {SITE_DESCRIPTION}
        </p>

        <h2>Contact</h2>
        <p>
          Send factual corrections, sourcing questions, or product-documentation feedback to{" "}
          <a href="mailto:team@thally.io">team@thally.io</a>.
        </p>
      </article>
    </main>
  );
}
