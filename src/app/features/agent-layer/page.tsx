/**
 * Public Thally Agent Layer product page.
 *
 * Rebuilt on the shared Sireny feature template: glass banner with an
 * agent Q&A board, sticky pastel process cards, quote panels, the
 * interactive Q&A demo, the machine-surface grid, and the partner strip.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { SiClaude, SiCursor, SiGithubcopilot, SiGooglegemini, SiPerplexity, SiWindsurf } from "react-icons/si";

import {
  FeatureBanner,
  PartnerStrip,
  ProcessCards,
  QuotePanels,
} from "@/components/feature-template/feature-template";
import { ArrowRight, Check, GitBranch, Json, Lock, Mcp, RefreshCw, Terminal } from "@/components/icons";
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

const surfaces = [
  {
    icon: Mcp,
    title: "llms.txt",
    format: "/llms.txt",
    description:
      "A compact index and per-page projection that fits an agent's context budget: facts first, layout gone.",
    who: "Context",
  },
  {
    icon: Terminal,
    title: "MCP tools",
    format: "search · fetch",
    description:
      "Standard Model Context Protocol tools let agents query your docs live inside the editor or assistant.",
    who: "Tools",
  },
  {
    icon: Json,
    title: "Structured JSON",
    format: "application/json",
    description: "Concept references and blocks as data, so pipelines and custom agents parse meaning, not markup.",
    who: "Parsing",
  },
  {
    icon: GitBranch,
    title: "Evidence links",
    format: "source refs",
    description: "Every fact traces to a commit and symbol in your product: the receipts behind each answer.",
    who: "Receipts",
  },
  {
    icon: RefreshCw,
    title: "Freshness signals",
    format: "updated-at",
    description: "Each surface carries when it last synced with the product, so agents can prefer current facts.",
    who: "Recency",
  },
  {
    icon: Lock,
    title: "Scoped access",
    format: "per-surface",
    description: "Decide which surfaces are public to agents and which stay internal: granular, revocable, read-only.",
    who: "Control",
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

/** Static agent Q&A board shown inside the banner's glass frame. */
function AgentBoard() {
  return (
    <div className="grid gap-3 bg-[#07090d] p-5 sm:grid-cols-3 sm:p-8">
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[11px] tracking-wider text-white/45 uppercase">Agent asks</p>
        <p className="mt-2 font-mono text-sm text-white/90">What&apos;s the default request timeout?</p>
        <p className="mt-3 text-xs leading-relaxed text-white/50">
          MCP tools: search · fetch, called from inside the editor or assistant
        </p>
        <span className="text-canvas-accent bg-canvas-accent/10 mt-4 inline-block rounded-full px-2.5 py-1 text-[11px] font-medium">
          No scraping, no stale copies
        </span>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[11px] tracking-wider text-white/45 uppercase">Retrieved from your docs</p>
        <div className="mt-2 space-y-2">
          {[
            ["/sdk/configuration", "bono@a1f9c2"],
            ["/guides/long-running-jobs", "bono@a1f9c2"],
          ].map(([page, evidence]) => (
            <div key={page} className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2.5">
              <span className="font-mono text-xs text-white/80">{page}</span>
              <span className="text-canvas-accent text-[11px] font-medium">{evidence}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-white/50">Regenerated on every product change</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[11px] tracking-wider text-white/45 uppercase">Answer, with receipts</p>
        <p className="mt-2 text-sm leading-relaxed text-white/90">
          The client waits 60 seconds before aborting a request by default.{" "}
          <span className="text-canvas-accent font-mono text-xs">[1]</span>
        </p>
        <div className="mt-3 rounded-lg bg-black/50 p-3 font-mono text-[11px] leading-5">
          <p className="text-white/70">[1] /sdk/configuration</p>
          <p className="text-canvas-accent">evidence: bono@a1f9c2</p>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-white/50">
          <Check className="text-canvas-accent size-3.5" />
          Grounded, never guessed
        </p>
      </div>
    </div>
  );
}

/** Small light mocks for the pastel process cards. */
function LlmsTxtVisual() {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/60 p-4">
      <p className="text-xs font-semibold tracking-wider text-[#38332d]/70 uppercase">Machine surface</p>
      <div className="mt-3 space-y-2">
        {["/llms.txt", "/sdk/configuration", "/sdk/errors", "/guides/long-running-jobs"].map((item) => (
          <p
            key={item}
            className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2.5 font-mono text-xs text-[#38332d]"
          >
            <Check className="size-3.5 text-[#38332d]" />
            {item}
          </p>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-[#7c7b79]">Facts first · layout gone</p>
    </div>
  );
}

function McpVisual() {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/60 p-4">
      <p className="text-xs font-semibold tracking-wider text-[#38332d]/70 uppercase">MCP endpoint</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {["search", "fetch", "cite pages", "live docs"].map((item) => (
          <p key={item} className="rounded-lg bg-white/80 px-3 py-3 text-center text-xs font-medium text-[#38332d]">
            {item}
          </p>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-[#7c7b79]">No scraping · no stale copies</p>
    </div>
  );
}

function EvidenceVisual() {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/60 p-4">
      <p className="text-xs font-semibold tracking-wider text-[#38332d]/70 uppercase">Sourced answer</p>
      <div className="mt-3 rounded-lg bg-[#1c1a17] p-3 font-mono text-[11px] leading-5">
        <p className="text-white/85">The client waits 60 seconds by default. [1]</p>
        <p className="text-[#c6f24e]">[1] /sdk/configuration · bono@a1f9c2</p>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-[#38332d]">
        <span className="font-medium">Pages and commits cited</span>
        <span className="rounded-full bg-[#38332d] px-2 py-0.5 text-[11px] text-white">Grounded</span>
      </div>
    </div>
  );
}

export default function AgentLayerFeaturePage() {
  return (
    <div className="bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <FeatureBanner
        title="Answers,"
        titleAccent="with receipts."
        description="Your customers now ask AI tools before they open your docs. The Agent Layer publishes your documentation in the formats those tools read best, with the evidence to back every answer, so nothing gets guessed."
        primaryCta={{ label: "Ask like an agent", href: "#ask" }}
        secondaryCta={{ label: "What agents receive", href: "#surfaces" }}
        finePrint="llms.txt · MCP endpoint · structured JSON · source evidence"
      >
        <AgentBoard />
      </FeatureBanner>

      <div id="how">
        <ProcessCards
          title="Docs an agent can actually reason about."
          steps={[
            {
              label: "Publish",
              title: "Publish machine surfaces",
              subtitle: "Every page emits a compact, prose-light llms.txt projection.",
              description:
                "Every page emits an llms.txt projection: compact, prose-light, and stripped of layout noise so a model spends its context on facts.",
              visual: <LlmsTxtVisual />,
            },
            {
              label: "Expose",
              title: "Expose an MCP endpoint",
              subtitle: "Agents search, fetch, and cite your pages. No scraping, no stale copies.",
              description:
                "Thally serves your docs as Model Context Protocol tools. Agents search, fetch, and cite your pages from inside the editor or assistant.",
              visual: <McpVisual />,
            },
            {
              label: "Answer",
              title: "Answer with evidence",
              subtitle: "Each response carries the pages and commits it drew from.",
              description:
                "Each response carries the pages and commits it drew from. When your product changes, the answer changes: grounded, never guessed.",
              visual: <EvidenceVisual />,
            },
          ]}
        />
      </div>

      <QuotePanels
        title="Grounded beats confident."
        media={
          <div className="relative h-full min-h-[420px]">
            <img
              src="/images/admin-dashboard-1600.webp"
              alt="Thally Cloud dashboard with Agent Layer surfaces"
              className="absolute inset-0 h-full w-full object-cover object-left-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-8 text-lg font-medium text-white">The Agent Layer in Thally Cloud</p>
          </div>
        }
        quote="Evidence before confidence. An agent that can't cite a source shouldn't sound certain"
        quoteAttribution="The Agent Layer ties every answer to a page and a commit, so trust is earned, not asserted."
        wideQuote="An agent guessing about your API is worse than no agent at all. The Agent Layer replaces plausible-sounding fiction with sourced fact"
        wideAttribution="Human documentation is written for eyes; agents need current facts, clearly scoped, with sources. The Agent Layer projects both from one graph."
      />

      {/* Live Q&A demo */}
      <section id="ask" className="bg-canvas pb-[120px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <p className="text-canvas-accent text-sm font-medium tracking-widest uppercase">Live demo</p>
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

      {/* Machine surfaces and comparison */}
      <section id="surfaces" className="bg-canvas pb-[120px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section text-white">
            Built for machines, without the guesswork.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mt-5 text-lg text-[#afafaf]">
              Everything an AI tool needs to answer accurately about your product, served from the same source your
              customers read.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto w-full max-w-[1240px] space-y-2.5 px-5">
          <Reveal>
            <div className="border-canvas-card-stroke grid overflow-hidden rounded-[32px] border sm:grid-cols-2 lg:grid-cols-3">
              {surfaces.map((surface, i) => (
                <div
                  key={surface.title}
                  className={cn(
                    "border-canvas-card-stroke flex flex-col gap-3 p-8",
                    (i + 1) % 3 !== 0 && "lg:border-r",
                    (i + 1) % 2 !== 0 && "max-lg:sm:border-r",
                    i < surfaces.length - 3 && "lg:border-b",
                    i < surfaces.length - 2 && "max-lg:sm:border-b",
                    i < surfaces.length - 1 && "max-sm:border-b",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <surface.icon className="text-canvas-accent size-5 shrink-0" />
                    <b className="text-white">{surface.title}</b>
                    <span className="ml-auto font-mono text-[11px] text-white/45">{surface.format}</span>
                  </div>
                  <p className="text-[15px] leading-relaxed tracking-[-0.03em] text-[#afafaf]">
                    {surface.description}
                  </p>
                  <span className="mt-auto text-[11px] tracking-wider text-white/45 uppercase">{surface.who}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} id="trust">
            <div className="border-canvas-card-stroke grid overflow-hidden rounded-[32px] border sm:grid-cols-2">
              <div className="border-canvas-card-stroke border-b p-8 sm:border-r sm:border-b-0">
                <p className="text-[11px] tracking-wider text-white/45 uppercase">Ungrounded model</p>
                <h3 className="mt-2 text-xl tracking-[-0.04em] text-white">Confidently wrong</h3>
                <ul className="mt-5 space-y-3">
                  {ungroundedPoints.map((point) => (
                    <li key={point} className="text-[15px] leading-relaxed tracking-[-0.03em] text-[#afafaf]">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8">
                <p className="text-canvas-accent text-[11px] tracking-wider uppercase">Through the Agent Layer</p>
                <h3 className="mt-2 text-xl tracking-[-0.04em] text-white">Sourced and current</h3>
                <ul className="mt-5 space-y-3">
                  {groundedPoints.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-[15px] leading-relaxed tracking-[-0.03em] text-white/85"
                    >
                      <Check className="text-canvas-accent mt-1 size-3.5 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
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
