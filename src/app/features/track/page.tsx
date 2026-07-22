/**
 * Public Thally Track product page and pre-signup guided experience.
 *
 * The interactive tour intentionally uses representative repository data. The
 * marketing site is statically exported, so live GitHub App credentials and
 * installation tokens remain inside Thally Cloud's authenticated boundary.
 */

import type { Metadata } from "next";

import { Docs, GitBranch, GitPullRequest, Leaf } from "@/components/icons";
import { SITE_URL } from "@/lib/site";

import { TrackDemo } from "./track-demo";
import styles from "./track-page.module.css";

export const metadata: Metadata = {
  title: "Thally Track: Documentation Impact Analysis",
  description:
    "See how Thally Track analyzes a bounded product change, finds documentation that may be affected, and drafts evidence-backed updates for human review.",
  alternates: {
    canonical: "/features/track",
  },
  openGraph: {
    title: "Your product changed. Did your docs?",
    description:
      "Experience how Thally Track turns specific product changes into evidence-backed documentation drafts for human review.",
    url: `${SITE_URL}/features/track`,
  },
};

const workflowSteps = [
  {
    label: "Step 01",
    title: "Connect your documentation",
    description:
      "Thally indexes your docs repository once, including pages, code samples, OpenAPI descriptions, and llms.txt.",
    icon: Docs,
  },
  {
    label: "Step 02",
    title: "Connect product repositories",
    description:
      "Point Track at the code that defines your public surfaces: SDK exports, configuration schemas, CLI commands, and API operations.",
    icon: GitBranch,
  },
  {
    label: "Step 03",
    title: "Analyze a merged change",
    description:
      "For each merged pull request, Track extracts public-surface changes, searches the connected docs, and presents candidates with evidence, confidence, and a drafted diff.",
    icon: GitPullRequest,
  },
] as const;

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/features/track#software`,
  name: "Thally Track",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: `${SITE_URL}/features/track`,
  description:
    "Documentation impact analysis for explicit API, SDK, configuration, and CLI changes, with evidence-backed drafts for human review.",
  isPartOf: { "@id": `${SITE_URL}/#software` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function TrackFeaturePage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <header className={styles.hero}>
        <p className={styles.eyebrow}>Thally Track</p>
        <h1>
          Your product changed. <em>Did your docs?</em>
        </h1>
        <p className={styles.heroDescription}>
          Track connects your documentation to the repositories that change it. When a pull request merges, Thally
          analyzes the bounded change, finds the pages connected to it, and drafts evidence-backed updates for human
          review.
        </p>
        <div className={styles.heroActions}>
          <a className={`${styles.button} ${styles.primaryButton}`} href="#demo">
            Try the guided demo
          </a>
          <a className={`${styles.button} ${styles.outlineButton}`} href="#how-track-works">
            How it works
          </a>
        </div>
        <p className={styles.heroFinePrint}>
          No account or GitHub permissions needed. The guided demo uses representative repository data.
        </p>
      </header>

      <section className={styles.howSection} id="how-track-works">
        <div className={styles.sectionHeading}>
          <h2>Evidence in, drafts out</h2>
          <p>
            Track never audits your whole product. It analyzes one bounded change at a time, such as a merged pull
            request, release, or schema diff, and shows its reasoning.
          </p>
        </div>

        <div className={styles.workflowGrid}>
          {workflowSteps.map((step) => {
            const StepIcon = step.icon;
            return (
              <article className={styles.workflowCard} key={step.label}>
                <div className={styles.stepLabel}>{step.label}</div>
                <span className={styles.iconTile}>
                  <StepIcon className={styles.sectionIcon} />
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            );
          })}
        </div>

        <aside className={styles.honestyPanel}>
          <Leaf className={styles.honestyIcon} />
          <p>
            <strong>What Track will not do:</strong> claim certainty. A repository is evidence about implementation;
            documentation is evidence about communicated behaviour. Track surfaces <em>candidates</em> backed by
            specific diffs. Every draft is reviewed by a human before it ships.
          </p>
        </aside>
      </section>

      <section className={styles.demoSection} id="demo">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Interactive product tour</p>
          <h2>Try Track right now</h2>
          <p>
            Walk through the same GitHub connection and repository setup used in Thally Cloud, then see how Track
            explains one representative finding.
          </p>
        </div>
        <TrackDemo />
      </section>
    </div>
  );
}
