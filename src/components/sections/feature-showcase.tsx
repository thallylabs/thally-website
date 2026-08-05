"use client";

import { DocsAgent, Mcp, Overview, Readiness, Search, Structured } from "@/components/icons";
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
 * Template "feature-section": big section title, two large showcase
 * cards with product imagery, then a hairline 2x2 grid of small features.
 */
export function FeatureShowcase() {
  return (
    <section id="features" className="bg-canvas marketing-section-pad px-2.5 sm:px-5">
      <div className="mx-auto w-full max-w-[1480px]">
        <div className="mx-auto max-w-3xl text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section text-canvas-foreground">
            Maintain one source. Serve every reader.
          </SplitReveal>
          <Reveal delay={0.15} distance={24}>
            <p className="text-canvas-muted mx-auto mt-5 max-w-xl text-lg">
              Write once in MDX. Thally projects HTML, JSON, Markdown, and machine formats from the same content
              source.
            </p>
          </Reveal>
        </div>

        {/* Two large showcase cards */}
        <div className="mt-14 grid gap-2.5 lg:grid-cols-2">
          <Reveal className="group border-canvas-hairline relative overflow-hidden rounded-[28px] border">
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-[#0c1a12] via-[#02050c] to-[#02050c]"
            />
            <div
              aria-hidden
              className="bg-canvas-accent/20 absolute -top-24 -left-24 size-72 rounded-full blur-[120px]"
            />
            <div className="relative flex min-h-[420px] flex-col justify-between p-8 sm:p-10">
              <FormatProjection />
              <h3 className="heading-card mt-10 text-center text-white">
                Write once.
                <br />
                <span className="text-canvas-muted">Thally creates every format.</span>
              </h3>
            </div>
          </Reveal>

          <Reveal delay={0.3} className="group border-canvas-hairline relative overflow-hidden rounded-[28px] border">
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-bl from-[#140f1e] via-[#02050c] to-[#02050c]"
            />
            <div
              aria-hidden
              className="bg-accent-2/25 absolute -top-24 -right-24 size-72 rounded-full blur-[120px]"
            />
            <div className="relative flex min-h-[420px] flex-col justify-between p-8 sm:p-10">
              <AnswerPreview />
              <h3 className="heading-card mt-10 text-center text-white">
                Answers with receipts.
                <br />
                <span className="text-canvas-muted">Grounded chat cites your docs.</span>
              </h3>
            </div>
          </Reveal>
        </div>

        {/* 2x2 hairline grid */}
        <Reveal delay={0.2} distance={40}>
          <div className="border-canvas-hairline mt-2.5 grid overflow-hidden rounded-[28px] border sm:grid-cols-2">
            {SMALL_FEATURES.map((feature, i) => (
              <div
                key={feature.title}
                className={[
                  "border-canvas-hairline flex flex-col items-center px-8 py-12 text-center",
                  i % 2 === 0 ? "sm:border-r" : "",
                  i < 2 ? "border-b" : "",
                ].join(" ")}
              >
                <feature.icon className="text-canvas-foreground size-6" />
                <h3 className="text-canvas-foreground mt-4 text-lg font-semibold tracking-tight">{feature.title}</h3>
                <p className="text-canvas-muted-2 mt-2 max-w-xs text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Mini visual: one MDX source projecting into output formats. */
function FormatProjection() {
  const formats = ["HTML", "Markdown", "JSON", "llms.txt", "RSS", "MCP"];
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <Structured className="text-canvas-accent size-4" />
          <span className="font-mono text-xs text-white/70">guides/quickstart.mdx</span>
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 w-3/4 rounded-full bg-white/15" />
          <div className="h-1.5 w-full rounded-full bg-white/10" />
          <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
        </div>
      </div>
      <div aria-hidden className="mx-auto h-6 w-px bg-gradient-to-b from-white/30 to-transparent" />
      <div className="flex flex-wrap justify-center gap-1.5">
        {formats.map((format) => (
          <span
            key={format}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-white/70"
          >
            {format}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Mini visual: grounded answer with citations. */
function AnswerPreview() {
  return (
    <div className="mx-auto w-full max-w-sm rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <DocsAgent className="text-canvas-accent size-4" />
        <span className="text-xs text-white/70">How do I rotate an access token?</span>
      </div>
      <div className="mt-3 rounded-xl bg-white/5 p-3">
        <p className="text-xs leading-relaxed text-white/80">
          Send a POST request to <code className="font-mono text-canvas-accent">/v1/tokens/rotate</code>. The previous
          token stays valid for 60 seconds.
        </p>
        <div className="mt-2.5 flex gap-1.5">
          <span className="rounded-md border border-white/10 px-2 py-0.5 text-[10px] text-white/50">
            api/auth.mdx §2
          </span>
          <span className="rounded-md border border-white/10 px-2 py-0.5 text-[10px] text-white/50">
            changelog 2.4
          </span>
        </div>
      </div>
    </div>
  );
}
