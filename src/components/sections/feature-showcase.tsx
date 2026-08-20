"use client";

import type { ReactNode } from "react";

import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Copy,
  Leaf,
  Mcp,
  Overview,
  PanelLeft,
  Plus,
  Readiness,
  RefreshCw,
  Search,
} from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";

const SMALL_FEATURES = [
  {
    icon: Readiness,
    title: "A readiness score you can gate CI on",
    description: "Score how well each page serves human and AI readers, and fail builds that ship gaps.",
  },
  {
    icon: Search,
    title: "Search without leaving the docs",
    description: "Hybrid keyword and semantic search with grounded answers, all from one index.",
  },
  {
    icon: Overview,
    title: "Review every docs task in one queue",
    description: "Updates from merged changes, drift sweeps, and @thally mentions, approved before merge.",
  },
  {
    icon: Mcp,
    title: "Give AI tools a direct path",
    description: "llms.txt, Markdown projections, and a remote MCP server on every deployed site.",
  },
];

/**
 * The showcase below the hero: a bordered section header, two equal cards
 * carrying a real product surface each, then a hairline 2x2 grid of the
 * smaller claims.
 */
export function FeatureShowcase() {
  return (
    <section id="features" className="bg-canvas pt-[120px]">
      {/* Section header with full-width hairline divider, template .section-title-block */}
      <div className="mb-[60px] border-b border-white/18 pb-[60px]">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section text-canvas-foreground">
            Maintain one source. Serve every reader.
          </SplitReveal>
          <Reveal delay={0.15} distance={24}>
            <p className="text-canvas-muted mx-auto mt-6 max-w-xl text-lg">
              Your team maintains one set of pages. Everyone who reads them, person or agent, gets the version they can
              actually use.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1480px] px-5 pb-[120px]">
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <ShowcaseCard
              caption="Write once."
              accent="Thally creates every format."
              glow="radial-gradient(70% 55% at 18% 8%, color-mix(in oklab, var(--chart-2) 16%, transparent), transparent 70%)"
            >
              <FormatProjection />
            </ShowcaseCard>

            <ShowcaseCard
              delay={0.3}
              caption="Answers with receipts."
              accent="Grounded chat cites your docs."
              glow="radial-gradient(70% 55% at 82% 8%, color-mix(in oklab, var(--chart-3) 16%, transparent), transparent 70%)"
            >
              <AnswerPreview />
            </ShowcaseCard>
          </div>

          <Reveal delay={0.2} distance={40}>
            <div className="grid overflow-hidden rounded-[20px] border border-white/[0.09] sm:grid-cols-2">
              {SMALL_FEATURES.map((feature, i) => (
                <div
                  key={feature.title}
                  className={[
                    "flex flex-col gap-4 p-8 sm:p-10",
                    i % 2 === 0 ? "sm:border-r sm:border-white/[0.09]" : "",
                    i < 2 ? "border-b border-white/[0.09]" : "",
                  ].join(" ")}
                >
                  <feature.icon className="text-canvas-accent size-6" />
                  <div className="flex max-w-[38ch] flex-col gap-2">
                    <h3 className="text-[17px] font-medium tracking-[-0.02em] text-white">{feature.title}</h3>
                    <p className="text-[15px] leading-relaxed text-white/45">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * A showcase card: the product surface itself, then the claim it supports.
 *
 * The two cards used to stretch a bitmap to fill whatever aspect they landed
 * at, so the same artwork distorted differently in each one, and the caption
 * floated centre under a left-aligned mock with a dead gap between them. The
 * mock is the interesting part, so it now sits on the surface used across the
 * nav menu and the feature pages, over a glow built from design tokens, which
 * rescales at any aspect instead of skewing.
 */
function ShowcaseCard({
  caption,
  accent,
  glow,
  delay,
  children,
}: {
  caption: string;
  /** Second line, carrying the gradient. */
  accent: string;
  glow: string;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <Reveal
      delay={delay}
      className="relative isolate flex flex-col justify-between gap-12 overflow-hidden rounded-[20px] border border-white/[0.09] bg-[#0a0c10]/85 p-8 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:p-12"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: glow }} />
      {children}
      <p className="subtitle-display max-w-[19ch] text-white">
        {caption}
        <span className="linear-text block">{accent}</span>
      </p>
    </Reveal>
  );
}

/** Syntax-tinted line of the MDX source pane. */
const SOURCE_LINES: Array<Array<[string, string]>> = [
  [["---", "text-white/25"]],
  [
    ["title", "text-[#7d8a9c]"],
    [": ", "text-white/30"],
    ["Quickstart", "text-white/80"],
  ],
  [
    ["description", "text-[#7d8a9c]"],
    [": ", "text-white/30"],
    ["Install the SDK in two minutes", "text-white/80"],
  ],
  [["---", "text-white/25"]],
  [
    ["## ", "text-[#a9b578]"],
    ["Install the SDK", "text-white/85"],
  ],
  [
    ["<CodeGroup ", "text-[#a9b578]"],
    ["lang", "text-[#7d8a9c]"],
    ['="ts"', "text-white/70"],
    [">", "text-[#a9b578]"],
  ],
];

const ARTIFACTS: Array<{ format: string; path: string }> = [
  { format: "HTML", path: "/guides/quickstart" },
  { format: "Markdown", path: "/guides/quickstart.md" },
  { format: "JSON", path: "/guides/quickstart.json" },
  { format: "llms.txt", path: "/llms.txt" },
  { format: "RSS", path: "/rss.xml" },
  { format: "MCP", path: "/api/mcp" },
];

/** Card visual: one MDX source projecting into output formats. */
function FormatProjection() {
  return (
    <div className="mx-auto w-full max-w-lg">
      {/* Editor window. The bezel around true black is what separates a real
          window from a code block with a border drawn on it. */}
      <div className="rounded-[1.25rem] border border-white/[0.09] bg-white/[0.04] p-1.5">
        <div className="overflow-hidden rounded-[calc(1.25rem-6px)] border border-white/10 bg-black">
          <div className="flex items-center gap-1.5 border-b border-white/[0.07] bg-white/[0.03] px-4 py-3">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="ml-2 truncate font-mono text-[11px] text-white/50">guides/quickstart.mdx</span>
          </div>
          <div className="space-y-1.5 p-5 font-mono text-[12px] leading-relaxed sm:text-[13px]">
            {SOURCE_LINES.map((line, i) => (
              <p key={i} className="flex gap-4">
                <span className="w-3 shrink-0 text-right text-white/20 tabular-nums select-none">{i + 1}</span>
                <span className="truncate">
                  {line.map(([text, tone], j) => (
                    <span key={j} className={tone}>
                      {text}
                    </span>
                  ))}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div aria-hidden className="mx-auto h-8 w-px bg-gradient-to-b from-white/25 to-transparent" />

      {/* Two columns, three rows: six full-width rows stretched the card into a
          proportion the mock above it could not carry. */}
      <div className="px-1">
        <div className="flex items-center justify-between border-b border-white/[0.09] pb-2.5 text-[12px]">
          <span className="text-white/50">Generated</span>
          <span className="text-white/35 tabular-nums">6 formats · 240 ms</span>
        </div>
        <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
          {ARTIFACTS.map((artifact) => (
            <div
              key={artifact.format}
              className="flex items-baseline justify-between gap-3 border-b border-white/[0.06] py-2.5"
            >
              <span className="shrink-0 text-[13px] text-white/85">{artifact.format}</span>
              <span className="truncate font-mono text-[11px] text-white/35">{artifact.path}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Card visual: grounded answer with citations. */
function AnswerPreview() {
  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/12 bg-[#0b0d12]/92 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-3">
        <PanelLeft className="size-4 text-white/40" />
        <span className="flex items-center gap-1.5 text-[13px] font-medium text-white/80">
          Thally AI
          <ChevronDown className="size-3.5 text-white/40" />
        </span>
        <span className="text-white/40">
          <span className="block text-[15px] leading-none tracking-[0.15em]">&#183;&#183;&#183;</span>
        </span>
      </div>

      <div className="px-4 pb-4">
        {/* User turn */}
        <div className="flex justify-end">
          <p className="max-w-[80%] rounded-[20px] bg-white/[0.09] px-4 py-2.5 text-[13px] leading-relaxed text-white/90">
            How do I rotate an access token?
          </p>
        </div>
        <div className="mt-1.5 flex justify-end gap-3 pr-1 text-white/30">
          <Copy className="size-3.5" />
          <ArrowUpRight className="size-3.5" />
        </div>

        {/* Reasoning trace */}
        <button type="button" className="mt-2 flex min-h-10 items-center gap-1 text-[13px] text-white/40">
          Searched 3 pages for 2s
          <ChevronDown className="size-3.5 -rotate-90" />
        </button>

        {/* Assistant turn: plain text, no bubble */}
        <p className="mt-3 text-[13px] leading-[1.7] text-white/85">
          Send a POST request to <code className="font-mono text-xs text-[#a9b578]">/v1/tokens/rotate</code> with your
          current token. The previous token stays valid for{" "}
          <strong className="font-semibold text-white">60 seconds</strong> so in-flight requests keep working.
        </p>

        {/* Source chip with favicon */}
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] py-1 pr-2.5 pl-1.5 text-[11px] text-white/60">
          <span className="flex size-4 items-center justify-center rounded-full bg-white/10">
            <Leaf className="size-2.5 text-[#9aa35a]" />
          </span>
          api/auth.mdx
        </span>

        {/* Response actions */}
        <div className="mt-3 flex items-center gap-3.5 text-white/30">
          <Copy className="size-3.5" />
          <RefreshCw className="size-3.5" />
          <ArrowUpRight className="size-3.5" />
        </div>
      </div>

      {/* Composer */}
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pr-1.5 pl-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-white/[0.06]">
            <Plus className="size-3.5 text-white/50" />
          </span>
          <span className="flex-1 text-[13px] text-white/35">Ask about your docs</span>
          <span className="flex size-7 items-center justify-center rounded-full bg-white/85">
            <ArrowRight className="size-3.5 -rotate-90 text-[#0b0d12]" />
          </span>
        </div>
      </div>
    </div>
  );
}
