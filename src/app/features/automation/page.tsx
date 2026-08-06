/**
 * Public Thally Automation product page.
 *
 * Rebuilt on the shared Sireny feature template: glass banner with a
 * merge-to-draft board, sticky pastel process cards, quote panels, the
 * interactive pipeline and trigger demos, and the partner strip.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { SiCloudflare, SiDocker, SiGithub, SiMarkdown, SiNetlify, SiVercel } from "react-icons/si";

import {
  FeatureBanner,
  PartnerStrip,
  ProcessCards,
  QuotePanels,
} from "@/components/feature-template/feature-template";
import { ArrowRight, Check, GitPullRequest } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { DESTINATIONS, SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

import { AutomationDemo, AutomationTriggers } from "./automation-demo";

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

/** Static merge-to-draft board shown inside the banner's glass frame. */
function MergeBoard() {
  return (
    <div className="grid gap-3 bg-[#07090d] p-5 sm:grid-cols-3 sm:p-8">
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[11px] tracking-wider text-white/45 uppercase">Merge detected · jahce/bono</p>
        <p className="mt-2 font-mono text-sm text-white/90">DEFAULT_TIMEOUT_MS 30000 → 60000</p>
        <p className="mt-3 text-xs leading-relaxed text-white/50">
          event: pull_request.closed · merged: true, on the watched default branch
        </p>
        <span className="text-canvas-accent bg-canvas-accent/10 mt-4 inline-block rounded-full px-2.5 py-1 text-[11px] font-medium">
          merge to main
        </span>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[11px] tracking-wider text-white/45 uppercase">Thally analyzes</p>
        <div className="mt-2 space-y-2">
          {[
            ["/sdk/configuration", "affected"],
            ["/guides/long-running-jobs", "affected"],
            ["/guides/quickstart", "no change"],
          ].map(([page, verdict]) => (
            <div key={page} className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2.5">
              <span className="font-mono text-xs text-white/80">{page}</span>
              <span
                className={
                  verdict === "no change" ? "text-[11px] text-white/40" : "text-canvas-accent text-[11px] font-medium"
                }
              >
                {verdict}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-white/50">The Content Graph matches the change to affected docs</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[11px] tracking-wider text-white/45 uppercase">Draft PR opened</p>
        <p className="mt-2 flex items-center gap-2 font-mono text-sm text-white/90">
          <GitPullRequest className="text-canvas-accent size-4 shrink-0" />
          docs: default timeout is now 60s
        </p>
        <div className="mt-3 rounded-lg bg-black/50 p-3 font-mono text-[11px] leading-5">
          <p className="text-red-300/70">- The client waits 30 seconds.</p>
          <p className="text-canvas-accent">+ The client waits 60 seconds.</p>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-white/50">
          <Check className="text-canvas-accent size-3.5" />
          jahce/dabs #291 · opened by thally-bot · needs 1 review
        </p>
      </div>
    </div>
  );
}

/** Small light mocks for the pastel process cards. */
function ReposVisual() {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/60 p-4">
      <p className="text-xs font-semibold tracking-wider text-[#38332d]/70 uppercase">Connected once</p>
      <div className="mt-3 space-y-2">
        {["jahce/bono · product", "jahce/leaflet · product", "jahce/dabs · docs", "read-only GitHub App"].map(
          (item) => (
            <p
              key={item}
              className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2.5 font-mono text-xs text-[#38332d]"
            >
              <Check className="size-3.5 text-[#38332d]" />
              {item}
            </p>
          ),
        )}
      </div>
    </div>
  );
}

function TriggersVisual() {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/60 p-4">
      <p className="text-xs font-semibold tracking-wider text-[#38332d]/70 uppercase">Triggers</p>
      <div className="mt-3 space-y-2">
        {[
          ["Merged pull request", "on"],
          ["Release tag", "on"],
          ["Schema or API change", "on"],
          ["Scheduled sweep", "off"],
        ].map(([label, state]) => (
          <div key={label} className="flex items-center justify-between rounded-lg bg-white/80 px-3 py-2.5">
            <span className="text-xs font-medium text-[#38332d]">{label}</span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[11px]",
                state === "on" ? "bg-[#38332d] text-white" : "bg-black/10 text-[#7c7b79]",
              )}
            >
              {state}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-[#7c7b79]">You choose the events · Thally ignores the rest</p>
    </div>
  );
}

function DraftReviewVisual() {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/60 p-4">
      <p className="text-xs font-semibold tracking-wider text-[#38332d]/70 uppercase">Draft PR</p>
      <div className="mt-3 rounded-lg bg-[#1c1a17] p-3 font-mono text-[11px] leading-5">
        <p className="text-red-300/80">- The client waits 30 seconds.</p>
        <p className="text-[#c6f24e]">+ The client waits 60 seconds.</p>
        <p className="text-[#c6f24e]">+ Override per request with timeout.</p>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-[#38332d]">
        <span className="font-medium">jahce/dabs #291</span>
        <span className="rounded-full bg-[#38332d] px-2 py-0.5 text-[11px] text-white">Awaiting review</span>
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

      <div id="how">
        <ProcessCards
          title="Set it up once. It runs on every merge."
          steps={[
            {
              label: "Connect",
              title: "Connect repositories",
              subtitle: "Install the read-only GitHub App on your product and docs repositories.",
              description:
                "Install the read-only GitHub App on your product and docs repositories. Thally watches merged pull requests on their default branches.",
              visual: <ReposVisual />,
            },
            {
              label: "Choose",
              title: "Choose your triggers",
              subtitle: "Decide what starts a draft and which docs repo receives it.",
              description:
                "Decide what should start a draft (a merged PR, a release tag, a schema change) and which docs repo receives the resulting pull request.",
              visual: <TriggersVisual />,
            },
            {
              label: "Review",
              title: "Review and merge",
              subtitle: "Every change arrives as a draft pull request with evidence and a diff.",
              description:
                "Every change arrives as a draft pull request with evidence and a diff. Nothing publishes until a human approves it.",
              visual: <DraftReviewVisual />,
            },
          ]}
        />
      </div>

      <QuotePanels
        title="The work nobody owns, owned."
        media={
          <div className="relative h-full min-h-[420px]">
            <img
              src="/images/admin-dashboard-1600.webp"
              alt="Thally Cloud dashboard with the automation activity feed"
              className="absolute inset-0 h-full w-full object-cover object-left-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-8 text-lg font-medium text-white">Automation inside Thally Cloud</p>
          </div>
        }
        quote="Humans approve important communication. Automation never publishes on its own"
        quoteAttribution="It removes the work of noticing and drafting; the judgment of what ships stays with your team."
        wideQuote="Stale docs show up as support tickets, broken onboarding, and wrong AI answers. Automation finds the documentation work the moment it exists, not weeks later in a support thread"
        wideAttribution="Automation is the hands-off half of Track: Thally does the watching, analyzing, and drafting."
      />

      {/* Live merge simulation */}
      <section id="loop" className="bg-canvas pb-[120px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <p className="text-canvas-accent text-sm font-medium tracking-widest uppercase">Live simulation</p>
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

      {/* Activity feed and comparison */}
      <section id="activity" className="bg-canvas pb-[120px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section text-white">
            A running log of what Thally drafted.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mt-5 text-lg text-[#afafaf]">
              Every automated draft is traceable to the merge that caused it. Approve, edit, or dismiss; the loop keeps
              running.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto w-full max-w-[1240px] space-y-2.5 px-5">
          <Reveal className="border-canvas-card-stroke overflow-hidden rounded-[32px] border">
            <p className="border-canvas-card-stroke border-b px-6 py-4 text-[11px] tracking-wider text-white/45 uppercase">
              Recent automation · jahce/dabs
            </p>
            {feedItems.map((item, i) => (
              <div
                key={item.title}
                className={cn(
                  "flex flex-wrap items-center gap-x-4 gap-y-1 px-6 py-4",
                  i < feedItems.length - 1 && "border-canvas-card-stroke border-b",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "size-2 shrink-0 rounded-full",
                    item.statusTone === "review" ? "bg-canvas-accent" : "bg-white/30",
                  )}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-white/90">
                    {item.label} <span className="font-mono text-white/80">{item.title}</span>
                  </p>
                  <p className="text-xs text-white/45">{item.detail}</p>
                </div>
                <span className="text-xs text-white/40">{item.time}</span>
                <span
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[11px]",
                    item.statusTone === "review"
                      ? "border-canvas-accent/40 text-canvas-accent"
                      : item.statusTone === "ok"
                        ? "border-white/20 text-white/70"
                        : "border-white/10 text-white/40",
                  )}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.15}>
            <div className="border-canvas-card-stroke grid overflow-hidden rounded-[32px] border sm:grid-cols-2">
              <div className="border-canvas-card-stroke border-b p-8 sm:border-r sm:border-b-0">
                <p className="text-[11px] tracking-wider text-white/45 uppercase">Without automation</p>
                <h3 className="mt-2 text-xl tracking-[-0.04em] text-white">Docs drift, quietly</h3>
                <ul className="mt-5 space-y-3">
                  {withoutAutomation.map((item) => (
                    <li key={item} className="text-[15px] leading-relaxed tracking-[-0.03em] text-[#afafaf]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8">
                <p className="text-canvas-accent text-[11px] tracking-wider uppercase">With Automation</p>
                <h3 className="mt-2 text-xl tracking-[-0.04em] text-white">Drafts arrive on merge</h3>
                <ul className="mt-5 space-y-3">
                  {withAutomation.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[15px] leading-relaxed tracking-[-0.03em] text-white/85">
                      <Check className="text-canvas-accent mt-1 size-3.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
