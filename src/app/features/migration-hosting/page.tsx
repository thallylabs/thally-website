/**
 * Public Thally Migration & Hosting feature page.
 *
 * Static marketing page with a deterministic migration console demo.
 * No credentials or network calls; the demo runs entirely on mock data.
 */

import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowRight,
  Check,
  Cloud,
  Data,
  GitBranch,
  GitPullRequest,
  Globe,
  Leaf,
  Lock,
  RefreshCw,
  Structured,
  Trust,
  Workspace,
} from "@/components/icons";
import { DESTINATIONS, SITE_URL } from "@/lib/site";

import { MigrationDemo } from "./migration-demo";
import styles from "./migration-page.module.css";

export const metadata: Metadata = {
  title: "Thally Migration & Hosting: Import Docs, Host Them at the Edge",
  description:
    "Import your documentation from GitBook, Mintlify, Docusaurus, or plain Markdown. Thally converts it into a connected graph and hosts it on a global edge with SSL, preview deploys, and instant rollback.",
  alternates: {
    canonical: "/features/migration-hosting",
  },
  openGraph: {
    title: "Bring your docs. We'll host them.",
    description:
      "Import from GitBook, Mintlify, Docusaurus, or plain Markdown. Thally builds the graph and deploys your docs to a global edge in a single step.",
    url: `${SITE_URL}/features/migration-hosting`,
  },
};

const migrationSteps = [
  {
    label: "Step 01",
    title: "Import your source",
    description:
      "Connect a repo or paste a URL. Thally reads GitBook, Mintlify, Docusaurus, and plain Markdown, preserving structure and links.",
    icon: GitBranch,
  },
  {
    label: "Step 02",
    title: "Build the graph",
    description:
      "Your pages become MDX in a Content Graph: cross-links resolved, code samples indexed, machine formats generated automatically.",
    icon: Structured,
  },
  {
    label: "Step 03",
    title: "Deploy to the edge",
    description:
      "Every push builds a preview; merges go live worldwide in seconds, with SSL, custom domains, and instant rollback included.",
    icon: Cloud,
  },
] as const;

const hostingFeatures = [
  {
    icon: Globe,
    title: "Global edge",
    meta: "6 regions",
    description: "Static pages and machine formats served from the edge, close to every reader and every agent.",
    tagIcon: Globe,
    tag: "Fast everywhere",
  },
  {
    icon: GitPullRequest,
    title: "Preview deploys",
    meta: "per branch",
    description: "Every pull request gets its own URL, so drafts are reviewed exactly as they'll ship.",
    tagIcon: Check,
    tag: "Review live",
  },
  {
    icon: Workspace,
    title: "Custom domains",
    meta: "docs.you.com",
    description: "Point your domain, get automatic SSL, and keep your brand. No subdomain required.",
    tagIcon: Lock,
    tag: "Your domain",
  },
  {
    icon: RefreshCw,
    title: "Instant rollback",
    meta: "one click",
    description: "Every deploy is immutable and versioned. Revert to any previous build in a click.",
    tagIcon: RefreshCw,
    tag: "Safe to ship",
  },
  {
    icon: Data,
    title: "Analytics",
    meta: "privacy-first",
    description: "See which pages readers and agents actually reach, without cookies or third-party trackers.",
    tagIcon: Data,
    tag: "Insight",
  },
  {
    icon: Trust,
    title: "SSL & protection",
    meta: "automatic",
    description: "Certificates, HTTPS, and DDoS protection are on by default on every site and domain.",
    tagIcon: Lock,
    tag: "Secure",
  },
] as const;

const usualMigration = [
  "Copy-paste hundreds of pages by hand and fix every broken link.",
  "Rebuild navigation and redirects from scratch.",
  "Re-create machine formats that were never there to begin with.",
  "Weeks of work before anything ships.",
] as const;

const withThally = [
  "Structure, links, and redirects carried over automatically.",
  "Content becomes a graph with machine formats generated for you.",
  "A preview URL to check before you point your domain.",
  "Live on the edge in minutes, reversible if you change your mind.",
] as const;

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/features/migration-hosting#software`,
  name: "Thally Migration & Hosting",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: `${SITE_URL}/features/migration-hosting`,
  description:
    "Documentation migration and hosting: import from GitBook, Mintlify, Docusaurus, or plain Markdown, build a connected Content Graph, and deploy to a global edge with SSL, preview deploys, and instant rollback.",
  isPartOf: { "@id": `${SITE_URL}/#software` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function MigrationHostingFeaturePage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <header className={styles.hero}>
        <div aria-hidden="true" className={styles.heroGrid} />
        <h1>
          Bring your docs. <span>We&apos;ll host them.</span>
        </h1>
        <p className={styles.heroDescription}>
          Import from wherever your documentation lives today: GitBook, Mintlify, Docusaurus, or a folder of Markdown.
          Thally converts it into a connected graph and deploys it to a global edge in a single step.
        </p>
        <div className={styles.heroActions}>
          <a className={`${styles.button} ${styles.primaryButton}`} href="#migrate">
            Run a migration <ArrowRight />
          </a>
          <a className={styles.textLink} href="#hosting">
            See what&apos;s included <ArrowRight />
          </a>
        </div>
        <p className={styles.heroFinePrint}>Your Markdown stays yours. Imports are non-destructive and reversible.</p>
      </header>

      <section className={`${styles.section} ${styles.alt}`} id="how">
        <div className={styles.sectionHeading}>
          <h2>From somewhere else to live, fast.</h2>
          <p>
            Migration isn&apos;t a lock-in trap or a weekend project. Point Thally at your existing docs and it does the
            conversion, the build, and the deploy.
          </p>
        </div>
        <div className={styles.stepsGrid}>
          {migrationSteps.map((step) => {
            const StepIcon = step.icon;
            return (
              <article className={styles.stepCard} key={step.label}>
                <div className={styles.stepLabel}>{step.label}</div>
                <span className={styles.stepIcon}>
                  <StepIcon />
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
            <strong>Reduce setup friction.</strong> The fastest way to adopt Thally is to bring what you already have.
            Migration is designed so your first site is live in minutes, not sprints, and you can leave with your
            Markdown intact.
          </p>
        </aside>
      </section>

      <section className={`${styles.section} ${styles.demoAnchor}`} id="migrate">
        <div className={styles.sectionHeading}>
          <h2>Pick a source. Watch it go live.</h2>
          <p>
            Choose where your docs live today and run the migration. Thally fetches, converts, builds the graph, and
            deploys, all in one pass.
          </p>
        </div>
        <MigrationDemo />
      </section>

      <section className={`${styles.section} ${styles.alt}`} id="hosting">
        <div className={styles.sectionHeading}>
          <h2>Everything a docs site needs, built in.</h2>
          <p>
            Migration hands off to hosting that&apos;s tuned for documentation: fast everywhere, safe to change, and
            yours to point a domain at.
          </p>
        </div>
        <div className={styles.featureGrid}>
          {hostingFeatures.map((feature) => {
            const FeatureIcon = feature.icon;
            const TagIcon = feature.tagIcon;
            return (
              <article className={styles.featureCell} key={feature.title}>
                <div className={styles.cellHeader}>
                  <FeatureIcon />
                  <b>{feature.title}</b>
                  <span className={styles.cellMeta}>{feature.meta}</span>
                </div>
                <p>{feature.description}</p>
                <span className={styles.cellTag}>
                  <TagIcon /> {feature.tag}
                </span>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.section} id="from">
        <div className={styles.sectionHeading}>
          <h2>You probably already have docs.</h2>
          <p>Thally imports the tools teams actually use today: structure, redirects, and links preserved.</p>
        </div>
        <div className={styles.comparison}>
          <div className={`${styles.comparisonColumn} ${styles.columnBad}`}>
            <div className={styles.columnHeader}>
              <div className={styles.columnLabel}>The usual migration</div>
              <h3>A dreaded rewrite</h3>
            </div>
            <ul>
              {usualMigration.map((item) => (
                <li key={item}>
                  <RefreshCw /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.comparisonColumn} ${styles.columnGood}`}>
            <div className={styles.columnHeader}>
              <div className={styles.columnLabel}>With Thally</div>
              <h3>An import, then live</h3>
            </div>
            <ul>
              {withThally.map((item) => (
                <li key={item}>
                  <Check /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.alt}`} id="start">
        <div className={styles.ctaCard}>
          <div aria-hidden="true" className={styles.ctaGrid} />
          <h2>Start a site, or bring the one you have.</h2>
          <p>
            Connect a repository, import your existing docs, and let Thally host them: graph, machine formats, and
            global edge included from the first deploy.
          </p>
          <div className={styles.ctaActions}>
            <a className={`${styles.button} ${styles.primaryButton}`} href={DESTINATIONS.signup}>
              Create your site <ArrowRight />
            </a>
            <Link className={styles.textLink} href="/features/content-graph">
              See how the graph is built <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
