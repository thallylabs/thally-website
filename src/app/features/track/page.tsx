/**
 * Public Thally Track product page and live pre-signup experience.
 *
 * The statically exported client talks to Thally Cloud's installation-bound
 * API. GitHub App credentials and installation tokens never enter this build.
 */

import type { Metadata } from "next";

import { ArrowRight, Docs, GitBranch, GitPullRequest, Leaf } from "@/components/icons";
import { SITE_URL } from "@/lib/site";

import { TrackDemo } from "./track-demo";
import styles from "./track-page.module.css";

export const metadata: Metadata = {
  title: "Thally Track: Product Knowledge Impact Analysis",
  description:
    "See how Thally Track understands a bounded product change, finds affected customer-facing knowledge, and drafts evidence-backed documentation updates for human review.",
  alternates: {
    canonical: "/features/track",
  },
  openGraph: {
    title: "The product changed. The knowledge should follow.",
    description:
      "Experience how Thally Track maps specific product changes to evidence-backed documentation drafts for human review.",
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
    "Product knowledge impact analysis for explicit API, SDK, configuration, and CLI changes, starting with evidence-backed documentation drafts for human review.",
  isPartOf: { "@id": `${SITE_URL}/#software` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function TrackFeaturePage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <header className={styles.hero}>
        <div aria-hidden="true" className={styles.heroGrid} />
        <h1>
          Your product changed. <span>Did your docs?</span>
        </h1>
        <p className={styles.heroDescription}>
          Track connects your documentation to the repositories that change it. When a pull request merges, Thally
          analyzes the bounded change, finds the connected pages, and drafts evidence-backed updates for review.
        </p>
        <div className={styles.heroActions}>
          <a className={`${styles.button} ${styles.primaryButton}`} href="#demo">
            Try it on your repos <ArrowRight />
          </a>
          <a className={styles.textLink} href="#how-track-works">
            See how it works <ArrowRight />
          </a>
        </div>
        <p className={styles.heroFinePrint}>
          No Thally account needed. You choose exactly which GitHub repositories Thally can read.
        </p>
      </header>

      <section className={styles.howSection} id="how-track-works">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>How it works</p>
          <h2>Understand the change before drafting the update.</h2>
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
                <span className={styles.workflowIcon}>
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
            <strong>What Track won&apos;t do: claim certainty.</strong> A repository is evidence about implementation;
            documentation is evidence about communicated behaviour. Track surfaces candidates backed by specific diffs.
            Every draft is reviewed by a human before it ships.
          </p>
        </aside>
      </section>

      <section className={styles.demoSection} id="demo">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Live demo</p>
          <h2>Try Track right now.</h2>
          <p>
            Connect a documentation repository and at least one product repository, then let Thally analyze the most
            recent merged change.
          </p>
        </div>
        <TrackDemo />
      </section>
    </div>
  );
}
