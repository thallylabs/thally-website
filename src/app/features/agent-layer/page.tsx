/**
 * Public Thally Agent Layer product page.
 *
 * Distinct architecture on the shared marketing design language: glass banner
 * with an agent Q&A board, a machine-surfaces bento (two large template-art
 * cards plus a hairline 2x2 grid), a light grounded-vs-ungrounded band, the
 * interactive Q&A demo, and the partner strip.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { SiClaude, SiCursor, SiGithubcopilot, SiGooglegemini, SiPerplexity, SiWindsurf } from "react-icons/si";

import { BannerBoard, FeatureBanner, PartnerStrip } from "@/components/feature-template/feature-template";
import { ArrowRight, Check, Docs, GitBranch, Json, Lock, Mcp, RefreshCw } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { DESTINATIONS, SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

import { AgentLayerDemo } from "./agent-layer-demo";

export const metadata: Metadata = {
  title: "Thally Agent Layer: Grounded Answers for AI Agents",
  description:
    "Your customers ask AI tools before they open your docs. The Agent Layer publishes your documentation as llms.txt, MCP tools, and structured JSON, with the evidence to back every answer.",
  alternates: {
    canonical: "/features/agent-layer",
  },
  openGraph: {
    title: "Answers, with receipts.",
    description:
      "Publish your documentation in the formats AI agents read best, served with the evidence to back every answer.",
    url: `${SITE_URL}/features/agent-layer`,
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/features/agent-layer#software`,
  name: "Thally Agent Layer",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: `${SITE_URL}/features/agent-layer`,
  description:
    "Publishes documentation as llms.txt, Model Context Protocol tools, and structured JSON, with source evidence behind every answer an agent gives.",
  isPartOf: { "@id": `${SITE_URL}/#software` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const smallSurfaces = [
  {
    icon: Json,
    title: "Structured JSON",
    format: "application/json",
    description: "Concept references and blocks as data, so pipelines and custom agents parse meaning, not markup.",
  },
  {
    icon: GitBranch,
    title: "Evidence links",
    format: "source refs",
    description: "Every fact traces to a commit and symbol in your product: the receipts behind each answer.",
  },
  {
    icon: RefreshCw,
    title: "Freshness signals",
    format: "updated-at",
    description: "Each surface carries when it last synced with the product, so agents can prefer current facts.",
  },
  {
    icon: Lock,
    title: "Scoped access",
    format: "per-surface",
    description: "Decide which surfaces are public to agents and which stay internal: granular, revocable, read-only.",
  },
] as const;

const ungroundedPoints = [
  "Answers from training data months or years out of date.",
  "Invents parameters and defaults that never existed.",
  "No way to check where an answer came from.",
  "Sounds equally sure whether it's right or hallucinating.",
] as const;

const groundedPoints = [
  "Reads your live docs, regenerated on every product change.",
  "Cites the exact page and commit behind each claim.",
  "Says less when it knows less. No evidence, no assertion.",
  "You control what's exposed and can revoke it anytime.",
] as const;

/**
 * Dense agent Q&A board shown inside the banner's glass frame.
 *
 * BannerBoard renders only the first two columns when `dense`, so the
 * question, the retrieval, and the cited answer all live in those two.
 */
function AgentBoard() {
  return (
    <BannerBoard
      dense
      columns={[
        [
          { kind: "summary", progress: 64, avatars: 4, links: 7, comments: 3 },
          {
            kind: "task",
            chips: [
              { label: "Question", tone: "high" },
              { label: "MCP", tone: "kind" },
            ],
            id: "Q-114",
            title: "What's the default request timeout?",
            desc: "search_docs called from inside the editor · 2m ago",
            avatars: 2,
            links: 1,
            comments: 6,
          },
          {
            kind: "task",
            chips: [
              { label: "Retrieved", tone: "med" },
              { label: "SDK", tone: "kind" },
            ],
            title: "/sdk/configuration",
            desc: "evidence: bono@a1f9c2 · rank 1 of 3",
            mono: true,
            progress: 96,
            avatars: 3,
            links: 1,
            comments: 2,
          },
          { kind: "filler", h: 120 },
        ],
        [
          {
            kind: "visual",
            chips: [
              { label: "Live", tone: "low" },
              { label: "MCP", tone: "purple" },
            ],
            id: "S-201",
            icon: <Mcp className="text-canvas-accent size-9" />,
            title: "MCP endpoint connected",
            desc: "4 tools, read-only: no scraping, no stale copies.",
          },
          {
            kind: "checklist",
            chips: [
              { label: "Answer", tone: "high" },
              { label: "Cited", tone: "kind" },
            ],
            id: "A-117",
            title: "60 seconds before aborting",
            desc: "Grounded, never guessed · 2 sources",
            items: [
              { label: "[1] /sdk/configuration · a1f9c2", done: true },
              { label: "[2] /guides/long-running-jobs", done: true },
              { label: "Freshness checked · 4m ago" },
            ],
          },
          {
            kind: "task",
            chips: [
              { label: "Retrieved", tone: "med" },
              { label: "Guides", tone: "kind" },
            ],
            title: "/guides/long-running-jobs",
            desc: "evidence: bono@a1f9c2 · rank 2 of 3",
            mono: true,
            avatars: 2,
          },
          { kind: "filler", h: 140 },
        ],
      ]}
    />
  );
}

/** The four page entries listed in the llms.txt preview, with byte sizes. */
const LLMS_ENTRIES = [
  { path: "/sdk/configuration", size: "4.1 KB" },
  { path: "/sdk/errors", size: "2.7 KB" },
  { path: "/guides/long-running-jobs", size: "6.3 KB" },
  { path: "/api/tokens", size: "3.8 KB" },
] as const;

/** Large-card visual: a dark mono llms.txt index panel. */
function LlmsTxtPanel() {
  return (
    <div className="mx-auto w-full max-w-lg rounded-2xl border border-white/12 bg-black/45 p-5">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
        <span className="flex items-center gap-2">
          <Docs className="size-4 text-white/45" />
          <span className="font-mono text-sm text-white/75">/llms.txt</span>
        </span>
        <span className="text-canvas-accent font-mono text-[11px]">text/plain</span>
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-3 font-mono text-[10px] text-white/35">
        <span>128 pages indexed</span>
        <span>one entry per page</span>
      </div>

      <div className="mt-2 space-y-1.5 font-mono text-xs leading-5">
        <p className="flex gap-3 text-white/50">
          <span className="w-3 shrink-0 text-right text-white/20 tabular-nums">1</span>
          <span># Facts first, layout gone</span>
        </p>
        {LLMS_ENTRIES.map((entry, i) => (
          <div key={entry.path} className="flex items-center gap-3">
            <span className="w-3 shrink-0 text-right text-white/20 tabular-nums">{i + 2}</span>
            <span className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-lg border border-white/10 px-3 py-2">
              <span className="truncate text-white/80">{entry.path}</span>
              <span className="flex shrink-0 items-center gap-2.5 text-white/40">
                <span className="tabular-nums">{entry.size}</span>
                <span>.md</span>
              </span>
            </span>
          </div>
        ))}
        <p className="flex gap-3 text-white/25">
          <span className="w-3 shrink-0 text-right text-white/20 tabular-nums">6</span>
          <span>124 more pages</span>
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-3 text-[11px] text-white/45">
        <span className="flex items-center gap-1.5">
          <RefreshCw className="text-canvas-accent size-3 shrink-0" />
          Regenerated on every product change
        </span>
        <span className="shrink-0 font-mono text-white/35">4m ago</span>
      </div>

      <p className="mt-3 text-center text-xs text-white/45">A compact index that fits an agent&apos;s context budget</p>
    </div>
  );
}

/** The tools a client discovers on a deployed Thally site's MCP endpoint. */
const MCP_TOOLS = [
  { signature: "search_docs(query, limit)", hint: "query your docs live, ranked by relevance" },
  { signature: "read_page(pageId)", hint: "pull the current page, cited by commit" },
  { signature: "list_pages()", hint: "the whole site map, returned as data" },
  { signature: "agent_readiness()", hint: "score how well the docs serve agents" },
] as const;

/** Large-card visual: the MCP endpoint with the tools a client discovers. */
function McpToolsPanel() {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-white/12 bg-black/45 p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <Mcp className="size-4 text-white/45" />
          <span className="text-sm text-white/75">MCP endpoint</span>
        </span>
        <span className="text-canvas-accent flex shrink-0 items-center gap-1.5 font-mono text-[11px]">
          <span className="bg-canvas-accent size-1.5 rounded-full" />
          connected
        </span>
      </div>
      <p className="mt-1.5 truncate border-b border-white/[0.08] pb-3 font-mono text-[11px] text-white/40">
        https://docs.yourproduct.com/api/mcp
      </p>

      <div className="mt-3 space-y-2">
        {MCP_TOOLS.map((tool) => (
          <div key={tool.signature} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5">
            <p className="text-canvas-accent truncate font-mono text-xs">{tool.signature}</p>
            <p className="mt-1 text-xs text-white/55">{tool.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-3 text-[11px] text-white/45">
        <span className="flex items-center gap-1.5">
          <Check className="text-canvas-accent size-3 shrink-0" />
          4 tools discovered
        </span>
        <span className="shrink-0 font-mono text-white/35">read-only</span>
      </div>

      <p className="mt-3 text-center text-xs text-white/45">Standard Model Context Protocol, inside the editor</p>
    </div>
  );
}

export default function AgentLayerFeaturePage() {
  return (
    <div className="bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <FeatureBanner
        layout="reverse"
        title="Answers,"
        titleAccent="with receipts."
        description="Your customers now ask AI tools before they open your docs. The Agent Layer publishes your documentation in the formats those tools read best, with the evidence to back every answer, so nothing gets guessed."
        primaryCta={{ label: "Ask like an agent", href: "#ask" }}
        secondaryCta={{ label: "What agents receive", href: "#surfaces" }}
        finePrint="llms.txt · MCP endpoint · structured JSON · source evidence"
      >
        <AgentBoard />
      </FeatureBanner>

      {/* Machine surfaces bento */}
      <section id="surfaces" className="bg-canvas pt-[120px]">
        <div className="mb-[60px] border-b border-white/18 pb-[60px]">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <SplitReveal as="h2" mode="chars" className="heading-section text-canvas-foreground">
              Built for machines, without the guesswork.
            </SplitReveal>
            <Reveal delay={0.15} distance={24}>
              <p className="text-canvas-muted mx-auto mt-6 max-w-xl text-lg">
                Everything an AI tool needs to answer accurately about your product, served from the same source your
                customers read.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1480px] px-5 pb-[120px]">
          <div className="flex flex-col gap-2.5">
            <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
              <Reveal
                className="relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[32px] border-[0.5px] p-8 sm:p-[60px]"
                style={{
                  borderColor: "rgba(234,236,237,0.23)",
                  backgroundImage: "url(/template/card-bg-1.webp)",
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <LlmsTxtPanel />
                <p className="subtitle-display mx-auto mt-10 max-w-[500px] text-center text-white">
                  Docs an agent can
                  <br />
                  <span className="linear-text">actually read.</span>
                </p>
              </Reveal>

              <Reveal
                delay={0.3}
                className="relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[32px] border-[0.5px] p-8 sm:p-[60px]"
                style={{
                  borderColor: "rgba(234,236,237,0.23)",
                  backgroundImage: "url(/template/text-container-1.webp)",
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <McpToolsPanel />
                <p className="subtitle-display mx-auto mt-10 max-w-[420px] text-center text-white">
                  Tools, not scraping.
                  <br />
                  <span className="linear-text">search and read built in.</span>
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2} distance={40}>
              <div className="border-canvas-card-stroke grid overflow-hidden rounded-[32px] border sm:grid-cols-2">
                {smallSurfaces.map((surface, i) => (
                  <div
                    key={surface.title}
                    className={cn(
                      "border-canvas-card-stroke flex flex-col items-center gap-5 px-8 py-11 text-center",
                      i % 2 === 0 && "sm:border-r",
                      i < 2 && "border-b",
                    )}
                  >
                    <surface.icon className="text-canvas-foreground size-7" />
                    <div className="flex max-w-[305px] flex-col gap-1.5">
                      <h3 className="text-canvas-foreground text-xl tracking-[-0.04em]">{surface.title}</h3>
                      <p className="text-canvas-muted text-[15px] leading-relaxed tracking-[-0.03em]">
                        {surface.description}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] text-white/45">{surface.format}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Grounded vs ungrounded light band */}
      <section id="trust" className="bg-canvas px-2.5 pb-[120px] sm:px-5">
        <div className="relative mx-auto max-w-[1480px] overflow-hidden rounded-[52px]">
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/template/ready-made-bg.webp)" }}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-white/60 to-white/10" />

          <div className="marketing-section-pad relative">
            <div className="mx-auto max-w-3xl px-5 text-center">
              <SplitReveal as="h2" mode="chars" className="heading-section text-canvas-cream-foreground">
                Grounded beats confident.
              </SplitReveal>
              <Reveal delay={0.15} distance={24}>
                <p className="text-canvas-cream-foreground/75 mx-auto mt-5 max-w-xl text-lg">
                  An agent guessing about your API is worse than no agent at all. The Agent Layer replaces
                  plausible-sounding fiction with sourced fact.
                </p>
              </Reveal>
            </div>

            <div className="mx-auto mt-14 grid max-w-4xl gap-4 px-5 sm:grid-cols-2">
              <Reveal className="flex flex-col rounded-[25px] border border-white bg-[#f6f2ea]/90 p-8">
                <h3 className="text-canvas-cream-foreground text-xl tracking-[-0.04em]">Confidently wrong</h3>
                <ul className="mt-5 space-y-3">
                  {ungroundedPoints.map((point) => (
                    <li key={point} className="text-canvas-cream-muted text-[15px] leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto border-t border-[#bdbdbd] pt-4">
                  <span className="text-canvas-cream-foreground/70 text-[11px] font-semibold tracking-widest uppercase">
                    Ungrounded model
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.15} className="flex flex-col rounded-[25px] border border-white bg-[#f6f2ea]/90 p-8">
                <h3 className="text-canvas-cream-foreground text-xl tracking-[-0.04em]">Sourced and current</h3>
                <ul className="mt-5 space-y-3">
                  {groundedPoints.map((point) => (
                    <li
                      key={point}
                      className="text-canvas-cream-foreground flex gap-2.5 text-[15px] leading-relaxed"
                    >
                      <Check className="text-canvas-cream-foreground mt-1 size-3.5 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto border-t border-[#bdbdbd] pt-4">
                  <span className="text-canvas-cream-foreground/70 text-[11px] font-semibold tracking-widest uppercase">
                    Through the Agent Layer
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Live Q&A demo */}
      <section id="ask" className="bg-canvas pb-[120px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section mt-4 text-white">
            Ask like an agent would.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mt-5 text-lg text-[#afafaf]">
              This is your documentation answering through the Agent Layer. Pick a question, then watch it retrieve
              from the graph, answer in plain terms, and show exactly where each fact came from.
            </p>
          </Reveal>
        </div>
        <div className="mx-auto w-full max-w-[1100px] px-5">
          <div className="rounded-[24px] border-[0.83px] border-white/16 bg-[#1c1b1d]/45 p-[13px] backdrop-blur-2xl">
            <AgentLayerDemo />
          </div>
        </div>
      </section>

      <PartnerStrip
        title="Works inside the tools your customers already ask"
        items={[
          { name: "Claude", icon: <SiClaude /> },
          { name: "Cursor", icon: <SiCursor /> },
          { name: "Copilot", icon: <SiGithubcopilot /> },
          { name: "Perplexity", icon: <SiPerplexity /> },
          { name: "Gemini", icon: <SiGooglegemini /> },
          { name: "Windsurf", icon: <SiWindsurf /> },
        ]}
      />

      {/* Closing CTA */}
      <section id="start" className="bg-canvas px-5 py-[120px]">
        <div className="mx-auto max-w-[746px] text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section text-white">
            Give every agent grounded answers.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mt-5 text-lg text-[#afafaf]">
              Turn on the Agent Layer and your documentation becomes an MCP endpoint and llms.txt feed: current,
              cited, and scoped exactly how you want.
            </p>
          </Reveal>
          <Reveal delay={0.3} distance={16} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={DESTINATIONS.signup}
              className="btn-sheen text-canvas inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-lg font-medium"
            >
              Create your docs site
              <ArrowRight className="size-5" />
            </a>
            <Link
              href="/features/content-graph"
              className="inline-flex items-center gap-2 text-lg font-medium text-white/80 transition-colors hover:text-white"
            >
              See where the formats come from
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
