"use client";

import { useState } from "react";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Data,
  Docs,
  Globe,
  Json,
  Leaf,
  Mcp,
  Overview,
  PanelLeft,
  Plus,
  Readiness,
  RefreshCw,
  Search,
  Structured,
} from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";

const PRODUCT_VIEWS = [
  {
    id: "docs",
    label: "Published docs",
    src: "/images/hero1-1600.webp",
    alt: "A deployed Thally documentation site with navigation, search, guides, and API reference",
    note: "The rendered documentation site your readers browse.",
  },
  {
    id: "json",
    label: "Structured JSON",
    src: "/images/hero2-1600.webp",
    alt: "The same Thally quickstart page returned as structured JSON",
    note: "The same page negotiated as JSON for tools and agents.",
  },
  {
    id: "agents",
    label: "Agent surface",
    src: "/images/hero3-1600.webp",
    alt: "A deployed Thally documentation page describing agent readiness and MCP tools",
    note: "The live documentation and MCP surface agents retrieve from.",
  },
] as const;

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
 * Template "feature-section": bordered section header, two large cards
 * (1.2fr / 1fr) on the template's bitmap art with gradient captions,
 * then a hairline 2x2 grid of small features.
 */
export function FeatureShowcase() {
  const [activeView, setActiveView] = useState<(typeof PRODUCT_VIEWS)[number]["id"]>("docs");
  const productView = PRODUCT_VIEWS.find((view) => view.id === activeView) ?? PRODUCT_VIEWS[0];

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
              Write once in MDX. Thally projects HTML, JSON, Markdown, and machine formats from the same content source.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1480px] px-5 pb-[120px]">
        <div className="flex flex-col gap-2.5">
          <Reveal distance={32}>
            <div className="mb-5 flex flex-wrap justify-center gap-2" role="group" aria-label="Product output">
              {PRODUCT_VIEWS.map((view) => (
                <button
                  key={view.id}
                  type="button"
                  aria-pressed={activeView === view.id}
                  onClick={() => setActiveView(view.id)}
                  className={[
                    "min-h-11 rounded-full border px-4 text-sm transition-colors",
                    activeView === view.id
                      ? "border-white bg-white text-black"
                      : "border-white/15 text-white/55 hover:border-white/30 hover:text-white",
                  ].join(" ")}
                >
                  {view.label}
                </button>
              ))}
            </div>
            <div className="overflow-hidden rounded-[20px] border border-white/[0.12] bg-[#07090d] shadow-[0_36px_100px_rgba(0,0,0,0.32)]">
              <div className="aspect-[16/8.8] overflow-hidden">
                <img
                  key={productView.id}
                  src={productView.src}
                  alt={productView.alt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/[0.08] px-5 py-3 text-[11px] text-white/40">
                <span className="text-white/70">{productView.label}</span>
                <span>{productView.note}</span>
                <span className="ml-auto hidden font-mono sm:inline">One MDX source</span>
              </div>
            </div>
          </Reveal>

          <Reveal distance={32} className="hidden">
            <div className="overflow-hidden rounded-[20px] border border-white/[0.12] bg-[#07090d] shadow-[0_36px_100px_rgba(0,0,0,0.32)]">
              <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] bg-[#0b0e13] px-5 py-3.5">
                <span className="flex size-6 items-center justify-center rounded-md bg-white text-[10px] font-bold text-black">
                  T
                </span>
                <span className="text-xs text-white/75">Northstar Docs</span>
                <span className="font-mono text-[11px] text-white/35">guides/quickstart.mdx</span>
                <span className="text-canvas-accent ml-auto flex items-center gap-1.5 text-[11px]">
                  <span className="bg-canvas-accent size-1.5 rounded-full" />6 outputs current
                </span>
              </div>

              <div className="grid lg:grid-cols-[1.12fr_0.88fr]">
                <div className="border-white/[0.08] p-6 sm:p-10 lg:border-r">
                  <div className="mb-6">
                    <p className="text-sm font-medium text-white">One source, every format</p>
                    <p className="mt-1 text-xs text-white/45">Generated from main@6f3a91c in 240 ms.</p>
                  </div>
                  <FormatProjection />
                </div>
                <div className="border-t border-white/[0.08] p-6 sm:p-10 lg:border-t-0">
                  <div className="mb-6">
                    <p className="text-sm font-medium text-white">Grounded reader answer</p>
                    <p className="mt-1 text-xs text-white/45">
                      The same source, retrieved with page and commit evidence.
                    </p>
                  </div>
                  <AnswerPreview />
                </div>
              </div>

              <div className="grid border-t border-white/[0.08] px-5 py-3 text-[10px] text-white/35 sm:grid-cols-3 sm:gap-4">
                <span>Source: northstar-labs/docs</span>
                <span className="sm:text-center">128 pages · 412 concepts</span>
                <span className="sm:text-right">Last indexed 4m ago</span>
              </div>
            </div>
          </Reveal>

          {/* 2x2 hairline grid, template .feature-small-card-wrap */}
          <Reveal delay={0.2} distance={40}>
            <div className="border-canvas-card-stroke grid overflow-hidden rounded-[20px] border sm:grid-cols-2 lg:grid-cols-4">
              {SMALL_FEATURES.map((feature, i) => (
                <div
                  key={feature.title}
                  className={[
                    "border-canvas-card-stroke flex flex-col items-start gap-4 px-6 py-7 text-left",
                    i > 0 ? "max-sm:border-t" : "",
                    i % 2 === 1 ? "sm:border-l" : "",
                    i > 1 ? "max-lg:border-t" : "",
                    i > 0 ? "lg:border-l" : "",
                  ].join(" ")}
                >
                  <feature.icon className="text-canvas-accent size-5" />
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-canvas-foreground text-base tracking-[-0.03em]">{feature.title}</h3>
                    <p className="text-canvas-muted text-[13px] leading-relaxed tracking-[-0.02em]">
                      {feature.description}
                    </p>
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

const ARTIFACTS: Array<{ icon: typeof Globe; format: string; path: string; meta: string }> = [
  { icon: Globe, format: "HTML", path: "/guides/quickstart", meta: "18.4 KB" },
  { icon: Docs, format: "Markdown", path: "/guides/quickstart.md", meta: "6.2 KB" },
  { icon: Json, format: "JSON", path: "/guides/quickstart.json", meta: "9.1 KB" },
  { icon: Structured, format: "llms.txt", path: "/llms.txt", meta: "3.4 KB" },
  { icon: Data, format: "RSS", path: "/rss.xml", meta: "2.1 KB" },
  { icon: Mcp, format: "MCP", path: "/api/mcp", meta: "live" },
];

/** Card visual: one MDX source projecting into output formats. */
function FormatProjection() {
  return (
    <div className="mx-auto w-full max-w-lg">
      {/* Editor pane */}
      <div className="overflow-hidden rounded-2xl border border-white/12 bg-black/45">
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 border-b border-white/[0.08] px-4 py-2.5">
          <span className="flex min-w-0 items-center gap-2 font-mono text-[13px] text-white/75">
            <Structured className="size-4 shrink-0 text-white/45" />
            <span className="truncate">guides/quickstart.mdx</span>
            <span className="size-1.5 shrink-0 rounded-full bg-[#c2a068]" />
          </span>
          <span className="shrink-0 rounded-full bg-[#c2a068]/15 px-2 py-0.5 text-[10px] font-medium text-[#dcc08e]">
            modified
          </span>
        </div>
        <div className="px-4 py-3 font-mono text-[11px] leading-[1.9]">
          {SOURCE_LINES.map((line, i) => (
            <p key={i} className="flex gap-3">
              <span className="w-4 shrink-0 text-right text-white/20 tabular-nums">{i + 1}</span>
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

      <div aria-hidden className="mx-auto h-7 w-px bg-gradient-to-b from-white/35 to-transparent" />

      {/* Generated artifacts */}
      <div className="rounded-2xl border border-white/12 bg-black/45 p-3">
        <div className="flex items-center justify-between px-1 pb-2.5 text-[11px]">
          <span className="text-white/50">Generated artifacts</span>
          <span className="flex items-center gap-1.5 text-white/35 tabular-nums">
            <Check className="size-3 text-[#a9b578]" />6 of 6 · 240 ms
          </span>
        </div>
        <div className="grid gap-1.5 sm:grid-cols-2">
          {ARTIFACTS.map((artifact) => (
            <div
              key={artifact.format}
              className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-2"
            >
              <artifact.icon className="size-3.5 shrink-0 text-white/40" />
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-medium text-white/80">{artifact.format}</span>
                <span className="block truncate font-mono text-[10px] text-white/40">{artifact.path}</span>
              </span>
              <span className="shrink-0 font-mono text-[10px] text-white/45 tabular-nums">{artifact.meta}</span>
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
          Thally Ask AI
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

      <p className="px-4 pb-2.5 text-center text-[11px] text-white/30">
        Every answer cites your docs. Thally never guesses.
      </p>

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
