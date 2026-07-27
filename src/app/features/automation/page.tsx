/**
 * Public Thally Automation product page.
 *
 * Ported from the automation design handoff: merge-to-draft pipeline demo,
 * trigger controls, activity feed, comparison, and closing CTA band.
 */

import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRight, Check, GitBranch, GitPullRequest, Leaf, RefreshCw, Settings, Track } from "@/components/icons";
import { DESTINATIONS, SITE_URL } from "@/lib/site";

import { AutomationDemo, AutomationTriggers } from "./automation-demo";
import styles from "./automation-page.module.css";

export const metadata: Metadata = {
  title: "Thally Automation: Ship the Code. Docs Follow.",
  description:
    "Connect your repositories once. When a pull request merges, Thally analyzes the change, drafts the documentation updates it implies, and opens them as a pull request on your docs for human review.",
  alternates: {
    canonical: "/features/automation",
  },
  openGraph: {
    title: "Ship the code. Docs follow.",
    description:
      "Every merged pull request drafts its own documentation updates, opened as a reviewable pull request on your docs.",
    url: `${SITE_URL}/features/automation`,
  },
};

const setupSteps = [
  {
    label: "Step 01",
    title: "Connect repositories",
    description:
      "Install the read-only GitHub App on your product and docs repositories. Thally watches merged pull requests on their default branches.",
    icon: GitBranch,
  },
  {
    label: "Step 02",
    title: "Choose your triggers",
    description:
      "Decide what should start a draft (a merged PR, a release tag, a schema change) and which docs repo receives the resulting pull request.",
    icon: Settings,
  },
  {
    label: "Step 03",
    title: "Review and merge",
    description:
      "Every change arrives as a draft pull request with evidence and a diff. Nothing publishes until a human approves it.",
    icon: Check,
  },
] as const;

const feedItems = [
  {
    label: "Drafted",
    title: "docs: default timeout is now 60s",
    detail: "from jahce/bono #482 · 2 pages · high confidence",
    time: "2m ago",
    status: "Awaiting review",
    dot: "review",
    statusTone: "review",
  },
  {
    label: "Merged",
    title: "docs: document TimeoutError",
    detail: "from jahce/bono #482 · approved by jahce",
    time: "4m ago",
    status: "Published",
    dot: "ok",
    statusTone: "ok",
  },
  {
    label: "Merged",
    title: "docs: new --json flag on export",
    detail: "from jahce/leaflet #77 · approved by ada",
    time: "1h ago",
    status: "Published",
    dot: "ok",
    statusTone: "ok",
  },
  {
    label: "Dismissed",
    title: "docs: internal refactor note",
    detail: "from jahce/homesend #310 · no public surface change",
    time: "3h ago",
    status: "Dismissed",
    dot: "ok",
    statusTone: "neutral",
  },
] as const;

const withoutAutomation = [
  "Someone has to remember a merge affected the docs; usually nobody does.",
  "Drift is discovered by a confused customer or a failing example.",
  "Catching up means a big, dreaded documentation audit.",
  "Machine surfaces and AI context fall furthest behind.",
] as const;

const withAutomation = [
  "Every relevant merge opens a reviewable draft within minutes.",
  "Each draft carries the diff and evidence behind it.",
  "Reviews are small and frequent, never a quarterly cleanup.",
  "Every surface regenerates together: humans and agents stay in sync.",
] as const;

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/features/automation#software`,
  name: "Thally Automation",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: `${SITE_URL}/features/automation`,
  description:
    "Automated documentation drafting on every merge: Thally watches connected repositories, analyzes each merged pull request, and opens evidence-backed draft docs pull requests for human review.",
  isPartOf: { "@id": `${SITE_URL}/#software` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function AutomationFeaturePage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <header className={styles.hero}>
        <div aria-hidden="true" className={styles.heroGrid} />
        <h1>
          Ship the code. <span>Docs follow.</span>
        </h1>
        <p className={styles.heroDescription}>
          Connect your repositories once. When a pull request merges, Thally analyzes the change, drafts the
          documentation updates it implies, and opens them as a pull request on your docs, waiting for a human to
          approve.
        </p>
        <div className={styles.heroActions}>
          <a className={`${styles.button} ${styles.primaryButton}`} href="#loop">
            Watch a merge flow through <ArrowRight />
          </a>
          <a className={styles.textLink} href="#triggers">
            What triggers a draft <ArrowRight />
          </a>
        </div>
        <div className={styles.repoStrip}>
          <span className={styles.repoPill}>
            <GitBranch /> merge to main
          </span>
          <span aria-hidden="true" className={styles.repoArrow}>
            <ArrowRight />
          </span>
          <span className={styles.repoPill}>
            <Track /> Thally analyzes
          </span>
          <span aria-hidden="true" className={styles.repoArrow}>
            <ArrowRight />
          </span>
          <span className={styles.repoPill}>
            <GitPullRequest /> draft PR opened
          </span>
        </div>
      </header>

      <section className={`${styles.section} ${styles.sectionAlt}`} id="how">
        <div className={styles.sectionHeading}>
          <h2>Set it up once. It runs on every merge.</h2>
          <p>
            Automation is the hands-off half of Track. You decide what should trigger a draft and who reviews it; Thally
            does the watching, analyzing, and drafting.
          </p>
        </div>
        <div className={styles.stepsGrid}>
          {setupSteps.map((step) => {
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
            <strong>Humans approve important communication.</strong> Automation never publishes on its own. It removes
            the work of noticing and drafting; the judgment of what ships stays with your team.
          </p>
        </aside>
      </section>

      <section className={styles.section} id="loop">
        <div className={styles.sectionHeading}>
          <h2>From merge to draft PR, automatically.</h2>
          <p>
            This is what happens the moment a pull request merges on a connected repository. Run it to watch a real
            change flow from code to a reviewable docs pull request.
          </p>
        </div>
        <AutomationDemo />
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} id="triggers">
        <div className={styles.sectionHeading}>
          <h2>You decide what starts a draft.</h2>
          <p>
            Not every commit deserves a documentation review. Turn on the events that change your public surface; Thally
            ignores the rest.
          </p>
        </div>
        <AutomationTriggers />
      </section>

      <section className={styles.section} id="activity">
        <div className={styles.sectionHeading}>
          <h2>A running log of what Thally drafted.</h2>
          <p>
            Every automated draft is traceable to the merge that caused it. Approve, edit, or dismiss; the loop keeps
            running.
          </p>
        </div>
        <div className={styles.feed}>
          <div className={styles.feedHead}>Recent automation · jahce/dabs</div>
          {feedItems.map((item) => (
            <div className={styles.feedItem} key={item.title}>
              <span
                aria-hidden="true"
                className={`${styles.feedDot} ${item.dot === "ok" ? styles.feedDotOk : styles.feedDotReview}`}
              />
              <div className={styles.feedContent}>
                <div className={styles.feedTitle}>
                  {item.label} <span className={styles.feedMono}>{item.title}</span>
                </div>
                <div className={styles.feedMeta}>{item.detail}</div>
              </div>
              <span className={styles.feedTime}>{item.time}</span>
              <span
                className={`${styles.feedStatus} ${
                  item.statusTone === "ok"
                    ? styles.feedStatusOk
                    : item.statusTone === "review"
                      ? styles.feedStatusReview
                      : ""
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} id="why">
        <div className={styles.sectionHeading}>
          <h2>The work nobody owns, owned.</h2>
          <p>
            Product changes create communication work. Automation makes sure it&apos;s discovered the moment it happens,
            not weeks later, in a support ticket.
          </p>
        </div>
        <div className={styles.compareGrid}>
          <div className={styles.compareColumn}>
            <div className={styles.compareHead}>
              <div className={styles.compareLabel}>Without automation</div>
              <h3>Docs drift, quietly</h3>
            </div>
            <ul>
              {withoutAutomation.map((item) => (
                <li key={item}>
                  <RefreshCw />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.compareColumn} ${styles.compareColumnGood}`}>
            <div className={styles.compareHead}>
              <div className={styles.compareLabel}>With Automation</div>
              <h3>Drafts arrive on merge</h3>
            </div>
            <ul>
              {withAutomation.map((item) => (
                <li key={item}>
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section} id="start">
        <div className={styles.ctaCard}>
          <div aria-hidden="true" className={styles.ctaDots} />
          <h2>Connect a repo. Never chase docs again.</h2>
          <p>
            Install the read-only GitHub App, choose your triggers, and let every merge draft its own documentation,
            reviewed by you, shipped on your say-so.
          </p>
          <div className={styles.ctaActions}>
            <a className={`${styles.button} ${styles.primaryButton}`} href={DESTINATIONS.signup}>
              Connect your repos <ArrowRight />
            </a>
            <Link className={styles.textLink} href="/features/track">
              See what Track detects <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
