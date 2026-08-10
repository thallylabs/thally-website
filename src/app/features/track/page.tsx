/**
 * Public Thally Track product page and live pre-signup experience.
 *
 * The statically exported client talks to Thally Cloud's installation-bound
 * API. GitHub App credentials and installation tokens never enter this build.
 */

import type { Metadata } from "next";
import { SiCloudflare, SiDocker, SiGithub, SiMarkdown, SiNetlify, SiVercel } from "react-icons/si";

import {
  BannerBoard,
  FeatureBanner,
  PartnerStrip,
  ProcessCards,
  QuotePanels,
} from "@/components/feature-template/feature-template";
import { Check, GitPullRequest } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { SITE_URL } from "@/lib/site";

import { TrackDemo } from "./track-demo";

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

/** Dense impact-analysis board shown inside the banner's glass frame. */
function ImpactBoard() {
  return (
    <BannerBoard
      columns={[
        [
          { kind: "summary", progress: 72, avatars: 4, links: 8, comments: 3 },
          {
            kind: "task",
            chips: [
              { label: "Merged", tone: "low" },
              { label: "acme/api", tone: "kind" },
            ],
            id: "#517",
            title: "feat: per-project webhook secrets",
            desc: "12 files changed · public surface: 2 endpoints, 1 config schema",
            mono: true,
            avatars: 2,
            links: 2,
            comments: 5,
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
            id: "T-101",
            icon: <GitPullRequest className="text-canvas-accent size-9" />,
            title: "Impact analysis",
            desc: "Track maps the bounded change to affected knowledge.",
          },
          {
            kind: "task",
            chips: [
              { label: "Affected", tone: "med" },
              { label: "Guides", tone: "kind" },
            ],
            title: "guides/webhooks.mdx",
            desc: "Confidence 0.94, backed by specific diffs.",
            mono: true,
            progress: 94,
            avatars: 3,
            links: 1,
            comments: 4,
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
            id: "#292",
            title: "docs: per-project webhook secrets",
            desc: "Opened by thally-bot · needs 1 review",
            items: [
              { label: "guides/webhooks.mdx updated", done: true },
              { label: "api/projects.mdx updated", done: true },
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
            title: "guides/quickstart.mdx",
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
            id: "T-204",
            title: "Approve and merge",
            desc: "Human review before anything ships.",
            progress: 90,
            avatars: 4,
            links: 6,
            comments: 2,
          },
          {
            kind: "task",
            chips: [
              { label: "Medium", tone: "med" },
              { label: "API", tone: "kind" },
            ],
            title: "api/projects.mdx",
            desc: "Confidence 0.87, endpoint params changed.",
            mono: true,
            progress: 87,
            avatars: 3,
            links: 2,
            comments: 3,
          },
          { kind: "filler", h: 130 },
        ],
      ]}
    />
  );
}

/** Light UI mocks for the pastel process cards. */
function DocsIndexVisual() {
  const files = [
    { path: "guides/", meta: "42 pages", done: true },
    { path: "api/openapi.yaml", meta: "118 ops", done: true },
    { path: "llms.txt", meta: "1 file", done: true },
    { path: "snippets/", meta: "36 samples", done: false },
  ];
  return (
    <div className="w-full rounded-2xl border border-black/[0.06] bg-white/85 p-4 shadow-[0_10px_30px_rgba(56,51,45,0.08)]">
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
        <span className="flex items-center gap-2 font-mono text-xs text-[#2b3124]">
          <SiGithub className="size-3.5" />
          acme/docs
        </span>
        <span className="rounded-full bg-[#2b3124]/[0.06] px-2 py-0.5 text-[10px] font-medium text-[#4a5040]">
          indexing
        </span>
      </div>
      <div className="mt-3 space-y-1.5">
        {files.map((file) => (
          <div key={file.path} className="flex items-center justify-between rounded-lg px-1.5 py-2">
            <span className="flex items-center gap-2 font-mono text-xs text-[#2b3124]">
              {file.done ? (
                <Check className="size-3.5 text-[#5f6b3f]" />
              ) : (
                <span className="size-3.5 animate-pulse rounded-full border-2 border-[#5f6b3f]/40 border-t-[#5f6b3f]" />
              )}
              {file.path}
            </span>
            <span className="text-[11px] text-[#6d7360]">{file.meta}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 border-t border-black/[0.06] pt-3">
        <div className="flex items-center justify-between text-[11px] text-[#6d7360]">
          <span>Index progress</span>
          <span className="tabular-nums">78%</span>
        </div>
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#2b3124]/10">
          <div className="h-full w-[78%] rounded-full bg-[#5f6b3f]" />
        </div>
      </div>
    </div>
  );
}

function SurfacesVisual() {
  const surfaces = [
    { name: "SDK exports", count: "24 symbols" },
    { name: "Config schemas", count: "6 schemas" },
    { name: "CLI commands", count: "11 commands" },
    { name: "API operations", count: "118 routes" },
  ];
  return (
    <div className="w-full rounded-2xl border border-black/[0.06] bg-white/85 p-4 shadow-[0_10px_30px_rgba(56,51,45,0.08)]">
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
        <span className="flex items-center gap-2 font-mono text-xs text-[#2b3124]">
          <SiGithub className="size-3.5" />
          acme/api
        </span>
        <span className="rounded-full bg-[#5f6b3f]/12 px-2 py-0.5 text-[10px] font-medium text-[#4a5528]">
          read-only
        </span>
      </div>
      <div className="mt-3 space-y-1.5">
        {surfaces.map((surface) => (
          <div
            key={surface.name}
            className="flex items-center justify-between rounded-lg border border-black/[0.05] bg-[#2b3124]/[0.02] px-3 py-2.5"
          >
            <span className="flex items-center gap-2 text-xs font-medium text-[#2b3124]">
              <Check className="size-3.5 text-[#5f6b3f]" />
              {surface.name}
            </span>
            <span className="font-mono text-[11px] text-[#6d7360]">{surface.count}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[11px] text-[#6d7360]">You choose exactly which repos Thally can read</p>
    </div>
  );
}

function CandidateVisual() {
  return (
    <div className="w-full rounded-2xl border border-black/[0.06] bg-white/85 p-4 shadow-[0_10px_30px_rgba(56,51,45,0.08)]">
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
        <span className="flex items-center gap-2 font-mono text-xs text-[#2b3124]">
          <GitPullRequest className="size-3.5 text-[#5f6b3f]" />
          guides/webhooks.mdx
        </span>
        <span className="rounded-full bg-[#5f6b3f] px-2 py-0.5 text-[10px] font-semibold text-white">0.94</span>
      </div>
      <div className="mt-3 overflow-hidden rounded-lg border border-black/[0.06]">
        <div className="bg-[#c4788a]/10 px-3 py-2 font-mono text-[11px] leading-5 text-[#7d3a48]">
          <span className="mr-2 opacity-50">-</span>Webhook secrets are shared.
        </div>
        <div className="bg-[#5f6b3f]/10 px-3 py-2 font-mono text-[11px] leading-5 text-[#3f4a24]">
          <span className="mr-2 opacity-50">+</span>Each project has its own secret.
        </div>
        <div className="bg-[#5f6b3f]/10 px-3 py-2 font-mono text-[11px] leading-5 text-[#3f4a24]">
          <span className="mr-2 opacity-50">+</span>Rotate secrets from Project Settings.
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-black/[0.06] pt-3">
        <span className="font-mono text-[11px] text-[#6d7360]">evidence: acme/api#517</span>
        <span className="text-[11px] font-medium text-[#2b3124]">Awaiting review</span>
      </div>
    </div>
  );
}

export default function TrackFeaturePage() {
  return (
    <div className="bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <FeatureBanner
        title="Your product changed."
        titleAccent="Did your docs?"
        description="Track connects your documentation to the repositories that change it. When a pull request merges, Thally analyzes the bounded change, finds the connected pages, and drafts evidence-backed updates for review."
        primaryCta={{ label: "Try it on your repos", href: "#demo" }}
        secondaryCta={{ label: "See how it works", href: "#how-track-works" }}
        finePrint="No Thally account needed. You choose exactly which GitHub repositories Thally can read."
      >
        <ImpactBoard />
      </FeatureBanner>

      <div id="how-track-works">
        <ProcessCards
          title="Understand the change before drafting the update."
          steps={[
            {
              label: "Connect",
              title: "Connect your documentation",
              subtitle: "Pages, code samples, OpenAPI, and llms.txt, indexed once.",
              description:
                "Thally indexes your docs repository once, including pages, code samples, OpenAPI descriptions, and llms.txt.",
              visual: <DocsIndexVisual />,
            },
            {
              label: "Point",
              title: "Connect product repositories",
              subtitle: "Point Track at the code that defines your public surfaces.",
              description:
                "Point Track at the code that defines your public surfaces: SDK exports, configuration schemas, CLI commands, and API operations.",
              visual: <SurfacesVisual />,
            },
            {
              label: "Analyze",
              title: "Analyze a merged change",
              subtitle: "Candidates with evidence, confidence, and a drafted diff.",
              description:
                "For each merged pull request, Track extracts public-surface changes, searches the connected docs, and presents candidates with evidence, confidence, and a drafted diff.",
              visual: <CandidateVisual />,
            },
          ]}
        />
      </div>

      <QuotePanels
        title="Proof before prose."
        media={
          <div className="relative h-full min-h-[420px]">
            <img
              src="/images/track-cloud-2000.webp"
              alt="The Track page in Thally Cloud showing setup progress and watched product repositories"
              className="absolute inset-0 h-full w-full object-cover object-left-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-8 text-lg font-medium text-white">Track inside Thally Cloud</p>
          </div>
        }
        quote="A no-change result is valid. Thally never pushes to main"
        quoteAttribution="How Track behaves, by design"
        wideQuote="A repository is evidence about implementation; documentation is evidence about communicated behaviour. Track surfaces candidates backed by specific diffs, and every draft is reviewed by a human before it ships"
        wideAttribution="What Track won't do: claim certainty"
      />

      {/* Live demo */}
      <section id="demo" className="bg-canvas pb-[120px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section mt-4 text-white">
            Try Track right now.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mt-5 text-lg text-[#afafaf]">
              Connect a documentation repository and at least one product repository, then let Thally analyze the most
              recent merged change.
            </p>
          </Reveal>
        </div>
        <div className="mx-auto w-full max-w-[1100px] px-5">
          <TrackDemo />
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
    </div>
  );
}
