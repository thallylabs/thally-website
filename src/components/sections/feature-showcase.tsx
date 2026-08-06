"use client";

import { Mcp, Overview, Readiness, Search } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { GrowingTree } from "@/components/scenes/growing-tree";
import { LeafTree } from "@/components/scenes/leaf-tree";

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
          {/* Two large showcase cards: the Thally Cloud tree scenes */}
          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <Reveal className="relative min-h-[520px] overflow-hidden rounded-[32px] border-[0.5px] border-black/10 bg-[#f4f4e7] sm:min-h-[640px]">
              <GrowingTree className="absolute inset-0 h-full w-full" />
              <p className="subtitle-display absolute inset-x-6 bottom-10 mx-auto max-w-[500px] text-center text-[#1c1a17]">
                Write once.
                <br />
                <span className="text-[#737938]">Thally creates every format.</span>
              </p>
            </Reveal>

            <Reveal
              delay={0.3}
              className="relative min-h-[520px] overflow-hidden rounded-[32px] border-[0.5px] border-black/10 bg-[#f4f4e7] sm:min-h-[640px]"
            >
              <LeafTree className="pointer-events-none absolute inset-0 h-full w-full border-0" />
              <p className="subtitle-display absolute inset-x-6 bottom-10 mx-auto max-w-[420px] text-center text-[#1c1a17]">
                Answers with receipts.
                <br />
                <span className="text-[#737938]">Grounded chat cites your docs.</span>
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


