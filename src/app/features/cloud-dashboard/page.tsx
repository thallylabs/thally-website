/**
 * Public Thally Cloud Dashboard product page.
 *
 * Static marketing page with a deterministic tabbed dashboard mock; no
 * credentials or network calls are involved in the demo.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { SiClaude, SiCursor, SiGithub, SiGithubcopilot, SiGooglegemini, SiPerplexity } from "react-icons/si";

import {
  FeatureBanner,
  PartnerStrip,
  ProcessCards,
  QuotePanels,
} from "@/components/feature-template/feature-template";
import { ArrowRight, Billing, Check, Mcp, Overview, Sites, Team, Track } from "@/components/icons";
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

const manageCells = [
  {
    body: "Create, configure, and monitor every documentation site: builds, domains, and deploy status at a glance.",
    icon: Sites,
    title: "Sites",
  },
  {
    body: "Every change Thally proposes, queued with evidence. Approve, edit, or dismiss. You decide what ships.",
    icon: Track,
    title: "Drafts",
  },
  {
    body: "See what readers and agents actually reach, including the share of traffic that comes from AI tools.",
    icon: Overview,
    title: "Analytics",
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

/** Live activity feed mock for the first pastel process card. */
function ActivityVisual() {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/60 p-4">
      <p className="text-xs font-semibold tracking-wider text-[#38332d]/70 uppercase">Recent activity</p>
      <div className="mt-3 space-y-2">
        {[
          ["Drafted", "docs: default timeout is now 60s", "2m"],
          ["Published", "docs: document TimeoutError", "4m"],
          ["Deployed", "jahce.thally.site", "1h"],
          ["Refreshed", "llms.txt", "1h"],
        ].map(([verb, target, time]) => (
          <div
            key={target}
            className="flex items-center justify-between gap-3 rounded-lg bg-white/80 px-3 py-2.5 text-xs text-[#38332d]"
          >
            <span className="truncate">
              {verb} <span className="font-mono">{target}</span>
            </span>
            <span className="shrink-0 text-[#7c7b79]">{time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Drafts queue mock for the second pastel process card. */
function QueueVisual() {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/60 p-4">
      <p className="text-xs font-semibold tracking-wider text-[#38332d]/70 uppercase">Awaiting your review</p>
      <div className="mt-3 space-y-2">
        {[
          ["docs: default timeout is now 60s", "high"],
          ["docs: document TimeoutError class", "high"],
          ["docs: retry uses exponential backoff", "medium"],
        ].map(([title, confidence]) => (
          <div
            key={title}
            className="flex items-center justify-between gap-3 rounded-lg bg-white/80 px-3 py-2.5 text-xs text-[#38332d]"
          >
            <span className="truncate font-mono">{title}</span>
            <span className="shrink-0 rounded-full bg-[#38332d]/10 px-2 py-0.5 text-[11px] font-medium">
              {confidence}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[11px] font-medium">
        <span className="rounded-full bg-[#38332d] px-2.5 py-1 text-white">Approve</span>
        <span className="rounded-full border border-[#38332d]/25 px-2.5 py-1 text-[#38332d]">Edit</span>
        <span className="rounded-full border border-[#38332d]/25 px-2.5 py-1 text-[#38332d]">Dismiss</span>
      </div>
    </div>
  );
}

/** Agent-context scopes mock for the third pastel process card. */
function ScopesVisual() {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/60 p-4">
      <p className="text-xs font-semibold tracking-wider text-[#38332d]/70 uppercase">Agent context</p>
      <div className="mt-3 space-y-2">
        {[
          ["MCP endpoint", "Live"],
          ["llms.txt · 128 pages", "Live"],
          ["Maintainers approve drafts", "4 members"],
        ].map(([item, status]) => (
          <div
            key={item}
            className="flex items-center justify-between gap-3 rounded-lg bg-white/80 px-3 py-2.5 text-xs text-[#38332d]"
          >
            <span className="flex items-center gap-2 truncate">
              <Check className="size-3.5 shrink-0 text-[#38332d]" />
              {item}
            </span>
            <span className="shrink-0 text-[11px] font-medium text-[#7c7b79]">{status}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-[#38332d]">
        <span className="font-medium">Agent-readiness</span>
        <span className="rounded-full bg-[#38332d] px-2 py-0.5 text-[11px] text-white">82 · Good</span>
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

      <ProcessCards
        title="See what changed. Review what's queued. Control who reads what."
        steps={[
          {
            label: "See",
            title: "See what changed",
            subtitle: "A live feed of everything Thally noticed and drafted.",
            description:
              "Monitor every documentation site with builds, domains, and deploy status at a glance, and see what readers and agents actually reach, including the share of traffic that comes from AI tools.",
            visual: <ActivityVisual />,
          },
          {
            label: "Review",
            title: "Review what's queued",
            subtitle: "Every change Thally proposes, queued with evidence.",
            description:
              "Approve, edit, or dismiss. You decide what ships. Pending reviews are front and center, assigned to real people, so nothing slips because it was nobody's default view.",
            visual: <QueueVisual />,
          },
          {
            label: "Control",
            title: "Control who reads what",
            subtitle: "Agent-readiness and scopes are explicit and controllable.",
            description:
              "Manage your MCP endpoint and llms.txt, scope exactly what AI can read, then invite editors and maintainers and decide who can approve the drafts that go live.",
            visual: <ScopesVisual />,
          },
        ]}
      />

      {/* Six-panel manage grid */}
      <section id="manage" className="bg-canvas py-[120px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <p className="text-canvas-accent text-sm font-medium tracking-widest uppercase">What you can manage</p>
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
        <div className="mx-auto w-full max-w-[1240px] px-5">
          <Reveal distance={40}>
            <div className="border-canvas-card-stroke grid overflow-hidden rounded-[32px] border sm:grid-cols-2 lg:grid-cols-3">
              {manageCells.map((cell, i) => (
                <article
                  key={cell.title}
                  className={cn(
                    "border-canvas-card-stroke flex flex-col gap-4 p-10 max-sm:p-8",
                    i < manageCells.length - 1 && "max-sm:border-b",
                    i % 2 === 0 && "sm:max-lg:border-r",
                    i < 4 && "sm:max-lg:border-b",
                    i % 3 !== 2 && "lg:border-r",
                    i < 3 && "lg:border-b",
                  )}
                >
                  <cell.icon className="text-canvas-accent size-6" />
                  <h3 className="font-display text-xl font-semibold tracking-tight text-white">{cell.title}</h3>
                  <p className="text-sm leading-relaxed text-[#afafaf]">{cell.body}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <QuotePanels
        title="Scattered tools, or one control room."
        media={
          <div className="relative h-full min-h-[420px]">
            <img
              src="/images/admin-dashboard-1600.webp"
              alt="The Thally Cloud dashboard"
              className="absolute inset-0 h-full w-full object-cover object-left-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-8 text-lg font-medium text-white">One control room in Thally Cloud</p>
          </div>
        }
        quote="Approve, edit, or dismiss. You decide what ships"
        quoteAttribution="The Drafts queue, by design"
        wideQuote="Knowledge work fails when it's spread across a wiki, a repo, an analytics tab, and someone's memory. The dashboard puts it in one place"
        wideAttribution="Five tabs and no owner, or one control room"
      />

      {/* Interactive dashboard demo */}
      <section id="dash" className="bg-canvas pb-[120px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <p className="text-canvas-accent text-sm font-medium tracking-widest uppercase">Interactive demo</p>
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
