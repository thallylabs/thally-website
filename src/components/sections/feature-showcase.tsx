"use client";

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
  Structured,
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
 * Template "feature-section": bordered section header, two large cards
 * (1.2fr / 1fr) on the template's bitmap art with gradient captions,
 * then a hairline 2x2 grid of small features.
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
              Write once in MDX. Thally projects HTML, JSON, Markdown, and machine formats from the same content
              source.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1480px] px-5 pb-[120px]">
        <div className="flex flex-col gap-2.5">
          {/* Two large showcase cards on the template bitmap art */}
          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <Reveal
              className="relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[32px] border-[0.5px] p-8 sm:min-h-[640px] sm:p-[60px]"
              style={{
                borderColor: "rgba(234,236,237,0.23)",
                backgroundImage: "url(/template/card-bg-1.webp)",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }}
            >
              <FormatProjection />
              <p className="subtitle-display mx-auto mt-10 max-w-[500px] text-center text-white">
                Write once.
                <br />
                <span className="linear-text">Thally creates every format.</span>
              </p>
            </Reveal>

            <Reveal
              delay={0.3}
              className="relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[32px] border-[0.5px] p-8 sm:min-h-[640px] sm:p-[60px]"
              style={{
                borderColor: "rgba(234,236,237,0.23)",
                backgroundImage: "url(/template/text-container-1.webp)",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }}
            >
              <AnswerPreview />
              <p className="subtitle-display mx-auto mt-10 max-w-[420px] text-center text-white">
                Answers with receipts.
                <br />
                <span className="linear-text">Grounded chat cites your docs.</span>
              </p>
            </Reveal>
          </div>

          {/* 2x2 hairline grid, template .feature-small-card-wrap */}
          <Reveal delay={0.2} distance={40}>
            <div className="border-canvas-card-stroke grid overflow-hidden rounded-[32px] border sm:grid-cols-2">
              {SMALL_FEATURES.map((feature, i) => (
                <div
                  key={feature.title}
                  className={[
                    "border-canvas-card-stroke flex flex-col items-center gap-5 px-8 py-11 text-center",
                    i % 2 === 0 ? "sm:border-r" : "",
                    i < 2 ? "border-b" : "",
                  ].join(" ")}
                >
                  <feature.icon className="text-canvas-foreground size-7" />
                  <div className="flex max-w-[305px] flex-col gap-1.5">
                    <h3 className="text-canvas-foreground text-xl tracking-[-0.04em]">{feature.title}</h3>
                    <p className="text-canvas-muted text-[15px] leading-relaxed tracking-[-0.03em]">
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



/** Card visual: one MDX source projecting into output formats. */
function FormatProjection() {
  const formats = ["HTML", "Markdown", "JSON", "llms.txt", "RSS", "MCP"];
  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="rounded-2xl border border-white/12 bg-black/45 p-5">
        <div className="flex items-center gap-2.5">
          <Structured className="size-5 text-white/55" />
          <span className="font-mono text-sm text-white/75">guides/quickstart.mdx</span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-2 w-3/4 rounded-full bg-white/15" />
          <div className="h-2 w-full rounded-full bg-white/10" />
          <div className="h-2 w-5/6 rounded-full bg-white/10" />
          <div className="h-2 w-2/3 rounded-full bg-white/10" />
        </div>
      </div>
      <div aria-hidden className="mx-auto h-8 w-px bg-gradient-to-b from-white/35 to-transparent" />
      <div className="flex flex-wrap justify-center gap-2">
        {formats.map((format) => (
          <span
            key={format}
            className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 font-mono text-xs text-white/75"
          >
            {format}
          </span>
        ))}
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
        <button type="button" className="mt-4 flex items-center gap-1 text-[13px] text-white/40">
          Searched 3 pages for 2s
          <ChevronDown className="size-3.5 -rotate-90" />
        </button>

        {/* Assistant turn: plain text, no bubble */}
        <p className="mt-3 text-[13px] leading-[1.7] text-white/85">
          Send a POST request to <code className="font-mono text-xs text-[#a9b578]">/v1/tokens/rotate</code> with
          your current token. The previous token stays valid for <strong className="font-semibold text-white">60
          seconds</strong> so in-flight requests keep working.
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
