/**
 * Public Thally Cloud Dashboard product page.
 *
 * Static marketing page with a deterministic tabbed dashboard mock; no
 * credentials or network calls are involved in the demo.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { SiClaude, SiCursor, SiGithub, SiGithubcopilot, SiGooglegemini, SiPerplexity } from "react-icons/si";

import { FeatureBanner, PartnerStrip } from "@/components/feature-template/feature-template";
import { ArrowRight, Billing, Mcp, Overview, Sites, Team, Track } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { DESTINATIONS, SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

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

/** The four small bento cells; Drafts and Analytics graduate to the large cards. */
const manageCells = [
  {
    body: "Create, configure, and monitor every documentation site: builds, domains, and deploy status at a glance.",
    icon: Sites,
    title: "Sites",
  },
  {
    body: "Manage your MCP endpoint and llms.txt, track agent-readiness, and scope exactly what AI can read.",
    icon: Mcp,
    title: "Agent context",
  },
  {
    body: "Invite editors and maintainers, and decide who can approve the drafts that go live.",
    icon: Team,
    title: "Team & roles",
  },
  {
    body: "One plan across every site and surface. Usage, seats, and invoices in a single place.",
    icon: Billing,
    title: "Billing & plan",
  },
] as const;

/** Large-card mock: the drafts queue with review actions. */
function DraftsQueueVisual() {
  return (
    <div className="mx-auto w-full max-w-lg rounded-2xl border border-white/12 bg-black/45 p-5">
      <div className="flex items-center gap-2.5">
        <Track className="text-canvas-accent size-5" />
        <span className="text-sm text-white/75">Awaiting your review</span>
      </div>
      <div className="mt-4 space-y-2">
        {[
          ["docs: default timeout is now 60s", "high"],
          ["docs: document TimeoutError class", "high"],
          ["docs: retry uses exponential backoff", "medium"],
        ].map(([title, confidence]) => (
          <div
            key={title}
            className="flex items-center justify-between gap-3 rounded-lg bg-white/6 px-3 py-2.5 text-xs text-white/85"
          >
            <span className="truncate font-mono">{title}</span>
            <span className="shrink-0 rounded-full border border-white/12 px-2 py-0.5 text-[11px] font-medium text-white/55">
              {confidence}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-[11px] font-medium">
        <span className="text-canvas rounded-full bg-white px-2.5 py-1">Approve</span>
        <span className="rounded-full border border-white/15 px-2.5 py-1 text-white/70">Edit</span>
        <span className="rounded-full border border-white/15 px-2.5 py-1 text-white/70">Dismiss</span>
      </div>
    </div>
  );
}

/** Large-card mock: reader and agent analytics stat tiles. */
function AnalyticsVisual() {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-white/12 bg-black/45 p-5">
      <div className="flex items-center gap-2.5">
        <Overview className="text-canvas-accent size-5" />
        <span className="text-sm text-white/75">Last 30 days</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          ["12.4k", "Pages read"],
          ["38%", "Traffic from AI tools"],
          ["1.8k", "Answers served"],
          ["96%", "Grounded citations"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-xl bg-white/6 px-3.5 py-3">
            <p className="font-display text-xl font-semibold tracking-tight text-white">{value}</p>
            <p className="mt-0.5 text-[11px] text-white/55">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg bg-white/6 px-3 py-2.5 text-xs">
        <span className="truncate font-mono text-white/85">/guides/quickstart</span>
        <span className="shrink-0 text-[11px] font-medium text-white/55">Top page</span>
      </div>
    </div>
  );
}

export default function CloudDashboardFeaturePage() {
  return (
    <div className="bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <FeatureBanner
        title="Your knowledge ops,"
        titleAccent="one place."
        description="Every site, every pending draft, your analytics, your team, and the context you serve to AI, managed from a single dashboard. See what changed, review what's queued, and control who reads what."
        primaryCta={{ label: "Explore the dashboard", href: "#dash" }}
        secondaryCta={{ label: "What you can manage", href: "#manage" }}
        finePrint="Nothing hidden, nothing published that you didn't approve."
      >
        <img
          src="/images/admin-dashboard-1600.webp"
          alt="Thally Cloud dashboard showing sites, pending drafts, analytics, and agent context in one view"
          className="w-full"
        />
      </FeatureBanner>

      {/* Manage bento: two large template-art cards over a 2x2 hairline grid */}
      <section id="manage" className="bg-canvas pt-[120px]">
        <div className="mb-[60px] border-b border-white/18 pb-[60px]">
          <div className="mx-auto max-w-[746px] px-5 text-center">
            <SplitReveal as="h2" mode="chars" className="heading-section mt-4 text-white">
              The whole pipeline, under your control.
            </SplitReveal>
            <Reveal delay={0.15} distance={20}>
              <p className="mt-5 text-lg text-[#afafaf]">
                Thally automates the noticing and drafting; the dashboard is where you stay in charge. Nothing hidden,
                nothing published that you didn&apos;t approve.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1480px] px-5">
          <div className="flex flex-col gap-2.5">
            <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
              <Reveal
                className="relative flex min-h-[520px] flex-col justify-between gap-8 overflow-hidden rounded-[32px] border-[0.5px] p-8 sm:p-[60px]"
                style={{
                  borderColor: "rgba(234,236,237,0.23)",
                  backgroundImage: "url(/template/card-bg-1.webp)",
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <p className="mx-auto max-w-md text-center text-[15px] leading-relaxed text-white/70">
                  Every change Thally proposes, queued with evidence. Approve, edit, or dismiss. You decide what ships.
                </p>
                <DraftsQueueVisual />
                <p className="subtitle-display mx-auto max-w-[500px] text-center text-white">
                  Review every draft.
                  <br />
                  <span className="linear-text">You decide what ships.</span>
                </p>
              </Reveal>

              <Reveal
                delay={0.3}
                className="relative flex min-h-[520px] flex-col justify-between gap-8 overflow-hidden rounded-[32px] border-[0.5px] p-8 sm:p-[60px]"
                style={{
                  borderColor: "rgba(234,236,237,0.23)",
                  backgroundImage: "url(/template/text-container-1.webp)",
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <p className="mx-auto max-w-sm text-center text-[15px] leading-relaxed text-white/70">
                  See what readers and agents actually reach, including the share of traffic that comes from AI tools.
                </p>
                <AnalyticsVisual />
                <p className="subtitle-display mx-auto max-w-[420px] text-center text-white">
                  See who reads.
                  <br />
                  <span className="linear-text">including the AI tools.</span>
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2} distance={40}>
              <div className="border-canvas-card-stroke grid overflow-hidden rounded-[32px] border sm:grid-cols-2">
                {manageCells.map((cell, i) => (
                  <div
                    key={cell.title}
                    className={cn(
                      "border-canvas-card-stroke flex flex-col items-center gap-5 px-8 py-11 text-center",
                      i % 2 === 0 && "sm:border-r",
                      i < 2 && "border-b",
                    )}
                  >
                    <cell.icon className="text-canvas-accent size-7" />
                    <div className="flex max-w-[340px] flex-col gap-1.5">
                      <h3 className="font-display text-xl font-semibold tracking-tight text-white">{cell.title}</h3>
                      <p className="text-[15px] leading-relaxed tracking-[-0.03em] text-[#afafaf]">{cell.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* One-place philosophy quote */}
      <section className="bg-canvas py-[120px]">
        <div className="mx-auto w-full max-w-[1240px] px-5">
          <Reveal distance={40}>
            <div
              className="border-canvas-card-stroke overflow-hidden rounded-[50px] border p-12 text-center sm:p-[100px]"
              style={{
                backgroundImage: "url(/template/bg-2.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <p className="subtitle-display mx-auto max-w-[820px] text-white">
                Knowledge work fails when it&apos;s spread across a wiki, a repo, an analytics tab, and someone&apos;s
                memory. The dashboard puts it in one place
              </p>
              <p className="mt-6 text-sm text-white/60">Five tabs and no owner, or one control room</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interactive dashboard demo */}
      <section id="dash" className="bg-canvas pb-[120px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section mt-4 text-white">
            One view of everything Thally does.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mt-5 text-lg text-[#afafaf]">
              This is the Cloud Dashboard. Switch between views to see how sites, drafts, analytics, and AI context all
              live under one roof.
            </p>
          </Reveal>
        </div>
        <div className="mx-auto w-full max-w-[1180px] px-5">
          <div className="rounded-[24px] border-[0.83px] border-white/16 bg-[#1c1b1d]/45 p-[13px] backdrop-blur-2xl">
            <div className={cn(styles.page, "overflow-hidden rounded-[14px] py-4")}>
              <DashboardDemo />
            </div>
          </div>
        </div>
      </section>

      <PartnerStrip
        title="Context served to the AI tools your readers already use"
        items={[
          { name: "Claude", icon: <SiClaude /> },
          { name: "Cursor", icon: <SiCursor /> },
          { name: "Copilot", icon: <SiGithubcopilot /> },
          { name: "Perplexity", icon: <SiPerplexity /> },
          { name: "Gemini", icon: <SiGooglegemini /> },
          { name: "GitHub", icon: <SiGithub /> },
        ]}
      />

      {/* Closing CTA */}
      <section id="start" className="bg-canvas py-[120px]">
        <div className="mx-auto max-w-[746px] px-5 text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section text-white">
            Run your docs like a product.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mt-5 text-lg text-[#afafaf]">
              Create a workspace and manage every site, draft, and agent surface from one dashboard, with the analytics
              and controls to back every decision.
            </p>
          </Reveal>
          <Reveal delay={0.3} distance={16} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={DESTINATIONS.signup}
              className="btn-sheen text-canvas inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-lg font-medium"
            >
              Create your workspace
              <ArrowRight className="size-5" />
            </a>
            <Link
              href="/features/automation"
              className="inline-flex items-center gap-2 text-lg font-medium text-white/80 transition-colors hover:text-white"
            >
              See how drafts arrive
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
