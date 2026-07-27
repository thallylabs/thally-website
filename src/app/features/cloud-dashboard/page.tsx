/**
 * Public Thally Cloud Dashboard product page.
 *
 * Static marketing page with a deterministic tabbed dashboard mock; no
 * credentials or network calls are involved in the demo.
 */

import type { Metadata } from "next";
import Link from "next/link";

import {
  Account,
  ArrowRight,
  Billing,
  Check,
  Cloud,
  Data,
  GitPullRequest,
  Key,
  Lock,
  Mcp,
  RefreshCw,
  Sites,
  Team,
} from "@/components/icons";
import { DESTINATIONS, SITE_URL } from "@/lib/site";

import styles from "./cloud-dashboard-page.module.css";
import { DashboardDemo } from "./dashboard-demo";

export const metadata: Metadata = {
  title: "Thally Cloud Dashboard: Your Knowledge Ops, One Place",
  description:
    "Manage every site, pending draft, analytics view, team role, and the context you serve to AI from a single dashboard. See what changed, review what's queued, and control who reads what.",
  alternates: {
    canonical: "/features/cloud-dashboard",
  },
  openGraph: {
    title: "Your knowledge ops, one place.",
    description: "Every site, draft, analytics view, and AI surface, managed from a single Thally Cloud dashboard.",
    url: `${SITE_URL}/features/cloud-dashboard`,
  },
};

const manageCells = [
  {
    body: "Create, configure, and monitor every documentation site: builds, domains, and deploy status at a glance.",
    icon: Sites,
    title: "Sites",
    who: "Hosting",
    whoIcon: Cloud,
  },
  {
    body: "Every change Thally proposes, queued with evidence. Approve, edit, or dismiss. You decide what ships.",
    icon: GitPullRequest,
    title: "Drafts",
    who: "Review",
    whoIcon: Check,
  },
  {
    body: "See what readers and agents actually reach, including the share of traffic that comes from AI tools.",
    icon: Data,
    title: "Analytics",
    who: "Insight",
    whoIcon: Data,
  },
  {
    body: "Manage your MCP endpoint and llms.txt, track agent-readiness, and scope exactly what AI can read.",
    icon: Mcp,
    title: "Agent context",
    who: "Control",
    whoIcon: Lock,
  },
  {
    body: "Invite editors and maintainers, and decide who can approve the drafts that go live.",
    icon: Team,
    title: "Team & roles",
    who: "People",
    whoIcon: Account,
  },
  {
    body: "One plan across every site and surface. Usage, seats, and invoices in a single place.",
    icon: Billing,
    title: "Billing & plan",
    who: "Account",
    whoIcon: Key,
  },
] as const;

const scatteredPoints = [
  "Docs, analytics, and access controls live in separate products.",
  "No single place shows what changed or what's waiting.",
  "AI context is invisible; nobody knows what agents can read.",
  "Reviews slip because they're nobody's default view.",
];

const dashboardPoints = [
  "Sites, drafts, analytics, agent context, and team in one view.",
  "A live feed of everything Thally noticed and drafted.",
  "Agent-readiness and scopes are explicit and controllable.",
  "Pending reviews are front and center, assigned to real people.",
];

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/features/cloud-dashboard#software`,
  name: "Thally Cloud Dashboard",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: `${SITE_URL}/features/cloud-dashboard`,
  description:
    "One dashboard for every Thally site, pending draft, analytics view, team role, and the context served to AI tools.",
  isPartOf: { "@id": `${SITE_URL}/#software` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function CloudDashboardFeaturePage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <header className={styles.hero}>
        <div aria-hidden="true" className={styles.heroGrid} />
        <h1>
          Your knowledge ops, <span>one place.</span>
        </h1>
        <p className={styles.heroDescription}>
          Every site, every pending draft, your analytics, your team, and the context you serve to AI, managed from a
          single dashboard. See what changed, review what&apos;s queued, and control who reads what.
        </p>
        <div className={styles.heroActions}>
          <a className={`${styles.button} ${styles.primaryButton}`} href="#dash">
            Explore the dashboard <ArrowRight />
          </a>
          <a className={styles.textLink} href="#manage">
            What you can manage <ArrowRight />
          </a>
        </div>
      </header>

      <section className={`${styles.section} ${styles.sectionAlt}`} id="dash">
        <div className={styles.sectionHeading}>
          <h2>One view of everything Thally does.</h2>
          <p>
            This is the Cloud Dashboard. Switch between views to see how sites, drafts, analytics, and AI context all
            live under one roof.
          </p>
        </div>
        <DashboardDemo />
      </section>

      <section className={styles.section} id="manage">
        <div className={styles.sectionHeading}>
          <h2>The whole knowledge pipeline, controllable.</h2>
          <p>
            The dashboard is where product change becomes managed communication: nothing hidden, nothing automatic that
            you didn&apos;t choose.
          </p>
        </div>
        <div className={styles.fgrid}>
          {manageCells.map((cell) => {
            const CellIcon = cell.icon;
            const WhoIcon = cell.whoIcon;
            return (
              <div className={styles.fcell} key={cell.title}>
                <div className={styles.fcellHead}>
                  <CellIcon />
                  <b>{cell.title}</b>
                </div>
                <p>{cell.body}</p>
                <span className={styles.fcellWho}>
                  <WhoIcon /> {cell.who}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} id="why">
        <div className={styles.sectionHeading}>
          <h2>Scattered tools, or one control room.</h2>
          <p>
            Knowledge work fails when it&apos;s spread across a wiki, a repo, an analytics tab, and someone&apos;s
            memory. The dashboard puts it in one place.
          </p>
        </div>
        <div className={styles.cmp}>
          <div className={`${styles.cmpCol} ${styles.cmpColBad}`}>
            <div className={styles.cmpHead}>
              <div className={styles.cmpLabel}>Scattered</div>
              <h3>Five tabs, no owner</h3>
            </div>
            <ul>
              {scatteredPoints.map((point) => (
                <li key={point}>
                  <RefreshCw /> {point}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.cmpCol} ${styles.cmpColGood}`}>
            <div className={styles.cmpHead}>
              <div className={styles.cmpLabel}>Cloud Dashboard</div>
              <h3>One control room</h3>
            </div>
            <ul>
              {dashboardPoints.map((point) => (
                <li key={point}>
                  <Check /> {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section} id="start">
        <div className={styles.cta}>
          <div aria-hidden="true" className={styles.ctaGrid} />
          <h2>Run your docs like a product.</h2>
          <p>
            Create a workspace and manage every site, draft, and agent surface from one dashboard, with the analytics
            and controls to back every decision.
          </p>
          <div className={styles.ctaActions}>
            <a className={`${styles.button} ${styles.primaryButton}`} href={DESTINATIONS.signup}>
              Open the dashboard <ArrowRight />
            </a>
            <Link className={styles.textLink} href="/features/automation">
              See how drafts arrive <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
