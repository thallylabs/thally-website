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
          {/* Two large showcase cards on the template bitmap backgrounds */}
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
          <Structured className="text-canvas-accent size-5" />
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
    <div className="mx-auto w-full max-w-md rounded-2xl border border-white/12 bg-black/45 p-5">
      <div className="flex items-center gap-2.5">
        <DocsAgent className="text-canvas-accent size-5" />
        <span className="text-sm text-white/75">How do I rotate an access token?</span>
      </div>
      <div className="mt-4 rounded-xl bg-white/6 p-4">
        <p className="text-sm leading-relaxed text-white/85">
          Send a POST request to <code className="text-canvas-accent font-mono">/v1/tokens/rotate</code>. The previous
          token stays valid for 60 seconds.
        </p>
        <div className="mt-3 flex gap-2">
          <span className="rounded-md border border-white/12 px-2.5 py-1 text-[11px] text-white/55">
            api/auth.mdx §2
          </span>
          <span className="rounded-md border border-white/12 px-2.5 py-1 text-[11px] text-white/55">
            changelog 2.4
          </span>
        </div>
      </div>
    </div>
  );
}
