/**
 * Public Thally Automation product page.
 *
 * Distinct architecture on the shared Sireny design language: glass
 * banner with a merge-to-draft board, click-driven setup tabs, the
 * interactive pipeline and trigger demos, a marquee activity log, a
 * without/with split on the template art, and the partner strip.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { SiCloudflare, SiDocker, SiGithub, SiMarkdown, SiNetlify, SiVercel } from "react-icons/si";

import { BannerBoard, FeatureBanner, PartnerStrip } from "@/components/feature-template/feature-template";
import { ArrowRight, Check, GitPullRequest } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { DESTINATIONS, SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

import { AutomationDemo, AutomationTriggers } from "./automation-demo";
import { SetupTabs } from "./setup-tabs";

export const metadata: Metadata = {
  title: "Thally Automation: Ship the Code. Docs Follow.",
  description:
    "Connect your repositories once. When a pull request merges, Thally analyzes the change, drafts the documentation updates it implies, and opens them as a pull request on your docs repo, ready for your review.",
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

const feedItems = [
  {
    label: "Drafted",
    title: "docs: default timeout is now 60s",
    detail: "from jahce/bono #482 · 2 pages · high confidence",
    time: "2m ago",
    status: "Awaiting review",
    statusTone: "review",
  },
  {
    label: "Merged",
    title: "docs: document TimeoutError",
    detail: "from jahce/bono #482 · approved by jahce",
    time: "4m ago",
    status: "Published",
    statusTone: "ok",
  },
  {
    label: "Merged",
    title: "docs: new --json flag on export",
    detail: "from jahce/leaflet #77 · approved by ada",
    time: "1h ago",
    status: "Published",
    statusTone: "ok",
  },
  {
    label: "Dismissed",
    title: "docs: internal refactor note",
    detail: "from jahce/homesend #310 · no public surface change",
    time: "3h ago",
    status: "Dismissed",
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

/** Dense merge-to-draft board shown inside the banner's glass frame. */
function MergeBoard() {
  return (
    <BannerBoard
      columns={[
        [
          { kind: "summary", progress: 68, avatars: 4, links: 10, comments: 2 },
          {
            kind: "task",
            chips: [
              { label: "Merged", tone: "low" },
              { label: "jahce/bono", tone: "kind" },
            ],
            id: "#517",
            title: "DEFAULT_TIMEOUT_MS 30000 to 60000",
            desc: "pull_request.closed · merged on the watched default branch",
            mono: true,
            avatars: 2,
            links: 2,
            comments: 13,
          },
          { kind: "filler", h: 120 },
        ],
        [
          {
            kind: "visual",
            chips: [
              { label: "High", tone: "high" },
              { label: "Analysis", tone: "purple" },
            ],
            id: "D-202",
            icon: <GitPullRequest className="text-canvas-accent size-9" />,
            title: "Thally analyzes the change",
            desc: "The Content Graph matches the diff to affected docs.",
          },
          {
            kind: "task",
            chips: [
              { label: "Affected", tone: "med" },
              { label: "SDK", tone: "kind" },
            ],
            title: "/sdk/configuration",
            desc: "Default timeout documented at 30 seconds.",
            mono: true,
            progress: 40,
            avatars: 3,
            links: 1,
            comments: 8,
          },
          { kind: "filler", h: 140 },
        ],
        [
          {
            kind: "checklist",
            chips: [
              { label: "High", tone: "high" },
              { label: "Docs PR", tone: "kind" },
            ],
            id: "#291",
            title: "docs: default timeout is now 60s",
            desc: "Opened by thally-bot · needs 1 review",
            items: [
              { label: "/sdk/configuration updated", done: true },
              { label: "/guides/long-running-jobs updated", done: true },
              { label: "Changelog entry drafted" },
            ],
          },
          { kind: "filler", h: 110 },
          {
            kind: "task",
            chips: [
              { label: "No change", tone: "kind" },
              { label: "Guides", tone: "kind" },
            ],
            title: "/guides/quickstart",
            desc: "Evidence says nothing to update here.",
            mono: true,
            avatars: 2,
          },
        ],
        [
          {
            kind: "task",
            chips: [
              { label: "Review", tone: "low" },
              { label: "Human", tone: "kind" },
            ],
            id: "A-203",
            title: "Approve and merge",
            desc: "Nothing publishes until a human approves it.",
            progress: 90,
            avatars: 4,
            links: 10,
            comments: 2,
          },
          {
            kind: "task",
            chips: [
              { label: "Medium", tone: "med" },
              { label: "Changelog", tone: "kind" },
            ],
            id: "A-205",
            title: "Draft release note",
            desc: "Timeout change, retries, and defaults.",
            progress: 100,
            avatars: 3,
            links: 10,
            comments: 2,
          },
          { kind: "filler", h: 130 },
        ],
      ]}
    />
  );
}

/** Status pill styling shared by the marquee feed cards. */
function statusPillClass(tone: (typeof feedItems)[number]["statusTone"]) {
  return cn(
    "rounded-full border px-2.5 py-1 text-[11px]",
    tone === "review"
      ? "border-canvas-accent/40 text-canvas-accent"
      : tone === "ok"
        ? "border-white/20 text-white/70"
        : "border-white/10 text-white/40",
  );
}

/** One dark bordered card in the activity marquee. */
function FeedCard({ item }: { item: (typeof feedItems)[number] }) {
  return (
    <div className="border-canvas-card-stroke w-[340px] shrink-0 rounded-2xl border bg-white/[0.03] p-5 sm:w-[420px]">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className={cn(
            "size-2 shrink-0 rounded-full",
            item.statusTone === "review" ? "bg-canvas-accent" : "bg-white/30",
          )}
        />
        <span className="text-[11px] tracking-wider text-white/45 uppercase">{item.label}</span>
        <span className="ml-auto text-xs text-white/40">{item.time}</span>
      </div>
      <p className="mt-3 truncate font-mono text-sm text-white/90">{item.title}</p>
      <p className="mt-1 truncate text-xs text-white/45">{item.detail}</p>
      <div className="mt-4 border-t border-white/10 pt-3.5">
        <span className={statusPillClass(item.statusTone)}>{item.status}</span>
      </div>
    </div>
  );
}

export default function AutomationFeaturePage() {
  return (
    <div className="bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <FeatureBanner
        title="Ship the code."
        titleAccent="Docs follow."
        description="Connect your repositories once. When a pull request merges, Thally analyzes the change, drafts the documentation updates it implies, and opens them as a pull request on your docs repo, ready for your review."
        primaryCta={{ label: "Watch a merge flow through", href: "#loop" }}
        secondaryCta={{ label: "What triggers a draft", href: "#triggers" }}
        finePrint="Read-only GitHub App. Nothing publishes until a human approves it."
      >
        <MergeBoard />
      </FeatureBanner>

      <SetupTabs />

      {/* Live merge simulation */}
      <section id="loop" className="bg-canvas pb-[120px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section mt-4 text-white">
            From merge to draft PR, automatically.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mt-5 text-lg text-[#afafaf]">
              This is what happens the moment a pull request merges on a connected repository. Run the simulation to
              watch one change go from merged code to a review-ready docs pull request.
            </p>
          </Reveal>
        </div>
        <div className="mx-auto w-full max-w-[1100px] px-5">
          <div className="rounded-[24px] border-[0.83px] border-white/16 bg-[#1c1b1d]/45 p-[13px] backdrop-blur-2xl">
            <AutomationDemo />
          </div>
        </div>
      </section>

      {/* Trigger controls */}
      <section id="triggers" className="bg-canvas pb-[120px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section text-white">
            You decide what starts a draft.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mt-5 text-lg text-[#afafaf]">
              Not every commit deserves a documentation review. Turn on the events that change your public surface;
              Thally ignores the rest.
            </p>
          </Reveal>
        </div>
        <div className="mx-auto w-full max-w-[860px] px-5">
          <div className="rounded-[24px] border-[0.83px] border-white/16 bg-[#1c1b1d]/45 p-[13px] backdrop-blur-2xl">
            <AutomationTriggers />
          </div>
        </div>
      </section>

      {/* Activity marquee band */}
      <section id="activity" className="border-y border-white/10 bg-[#0a0d13]/60 py-[100px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <p className="text-sm font-medium tracking-widest text-white/45 uppercase">
            Recent automation · jahce/dabs
          </p>
          <SplitReveal as="h2" mode="chars" className="heading-section mt-4 text-white">
            A running log of what Thally drafted.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mt-5 text-lg text-[#afafaf]">
              Every automated draft is traceable to the merge that caused it. Approve, edit, or dismiss; the loop keeps
              running.
            </p>
          </Reveal>
        </div>

        <div className="guarantee-marquee flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          {[false, true].map((hidden) => (
            <div
              key={String(hidden)}
              aria-hidden={hidden || undefined}
              className="guarantee-marquee-track flex min-w-max shrink-0 gap-2.5 pr-2.5"
            >
              {feedItems.map((item) => (
                <FeedCard key={item.title} item={item} />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Without / with split on the template art */}
      <section className="bg-canvas px-5 py-[120px]">
        <div className="mx-auto grid w-full max-w-[1480px] gap-4 lg:grid-cols-2">
          <Reveal
            className="relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[32px] border-[0.5px] p-8 sm:p-[60px]"
            style={{
              borderColor: "rgba(234,236,237,0.23)",
              backgroundImage: "url(/template/card-bg-1.webp)",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div>
              <p className="text-[11px] tracking-wider text-white/45 uppercase">Without automation</p>
              <ul className="mt-5 space-y-3">
                {withoutAutomation.map((item) => (
                  <li key={item} className="text-[15px] leading-relaxed tracking-[-0.03em] text-[#afafaf]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="subtitle-display mx-auto mt-10 max-w-[420px] text-center text-white">
              Docs drift,
              <br />
              <span className="linear-text">quietly.</span>
            </p>
          </Reveal>

          <Reveal
            delay={0.3}
            className="relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[32px] border-[0.5px] p-8 sm:p-[60px]"
            style={{
              borderColor: "rgba(234,236,237,0.23)",
              backgroundImage: "url(/template/text-container-1.webp)",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div>
              <p className="text-[11px] tracking-wider text-white/60 uppercase">With Automation</p>
              <ul className="mt-5 space-y-3">
                {withAutomation.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[15px] leading-relaxed tracking-[-0.03em] text-white/85">
                    <Check className="text-canvas-accent mt-1 size-3.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="subtitle-display mx-auto mt-10 max-w-[420px] text-center text-white">
              Drafts arrive
              <br />
              <span className="linear-text">on merge.</span>
            </p>
          </Reveal>
        </div>
      </section>

      <PartnerStrip
        title="Works with the stack you already ship"
        items={[
          { name: "GitHub", icon: <SiGithub /> },
          { name: "Vercel", icon: <SiVercel /> },
          { name: "Netlify", icon: <SiNetlify /> },
          { name: "Cloudflare", icon: <SiCloudflare /> },
          { name: "Docker", icon: <SiDocker /> },
          { name: "Markdown", icon: <SiMarkdown /> },
        ]}
      />

      {/* Closing CTA */}
      <section id="start" className="bg-canvas px-5 py-[120px]">
        <div className="mx-auto max-w-[746px] text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section text-white">
            Ship without wondering what the docs forgot.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mt-5 text-lg text-[#afafaf]">
              Install the read-only GitHub App, choose your triggers, and every merge drafts its own documentation:
              reviewed by you, shipped on your say-so.
            </p>
          </Reveal>
          <Reveal delay={0.3} distance={16} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={DESTINATIONS.signup}
              className="btn-sheen text-canvas inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-lg font-medium"
            >
              Connect your repos
              <ArrowRight className="size-5" />
            </a>
            <Link
              href="/features/track"
              className="inline-flex items-center gap-2 text-lg font-medium text-white/80 transition-colors hover:text-white"
            >
              See what Track detects
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
