"use client";

import Image from "next/image";

import { Mcp, Overview, Readiness, Search } from "@/components/icons";
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

export function FeatureShowcase() {
  return (
    <section id="features" className="bg-canvas pt-20 sm:pt-28 lg:pt-36 pb-20 sm:pb-32">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6">
        {/* Section header with generous top breathing room from Hero */}
        <div className="mx-auto max-w-4xl text-center">
          <SplitReveal as="h2" mode="words" className="heading-section text-white">
            Maintain one source. Serve every reader.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80 sm:text-xl">
              Write once in MDX. Thally projects HTML, JSON, Markdown, and machine formats from the same content source.
            </p>
          </Reveal>
        </div>

        {/* Expansive showcase visual nestled tightly beneath the header */}
        <div className="mt-8 sm:mt-12">
          <Reveal className="relative mx-auto w-full max-w-[1500px]">
            <div
              className="relative overflow-hidden"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)",
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)",
              }}
            >
              <Image
                src="/images/maintain-one-source-mock.png"
                alt="Maintain one source workflow: MDX code editor projecting to HTML, Markdown, JSON, llms.txt, RSS, MCP and Thally Docs with grounded Ask AI chat"
                width={1800}
                height={1000}
                priority
                className="h-auto w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                sizes="(max-width: 1600px) 100vw, 1500px"
              />
            </div>

            {/* Dual captions sitting closely and neatly beneath the diagram columns */}
            <div className="relative z-10 -mt-2 sm:-mt-6 grid gap-6 sm:grid-cols-2 lg:gap-12 pt-4 sm:pt-6">
              <div className="text-left sm:pl-4">
                <p className="text-xl font-semibold text-white sm:text-2xl">
                  Write once.
                  <br />
                  <span className="linear-text font-normal">Thally creates every format.</span>
                </p>
              </div>
              <div className="text-left sm:pl-4">
                <p className="text-xl font-semibold text-white sm:text-2xl">
                  Answers with receipts.
                  <br />
                  <span className="linear-text font-normal">Grounded chat cites your docs.</span>
                </p>
              </div>
            </div>
          </Reveal>

          {/* 4-column hairline grid */}
          <Reveal delay={0.2} distance={30} className="mt-12 sm:mt-16">
            <div className="border-canvas-card-stroke grid overflow-hidden rounded-[32px] border bg-[#0a0d14]/60 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {SMALL_FEATURES.map((feature, i) => (
                <div
                  key={feature.title}
                  className={[
                    "border-canvas-card-stroke flex flex-col items-center gap-4 p-8 text-center transition-colors duration-300 hover:bg-white/[0.02]",
                    i < 3 ? "lg:border-r" : "",
                    i % 2 === 0 ? "sm:max-lg:border-r" : "",
                    i < 2 ? "max-lg:border-b" : "",
                    i === 2 ? "max-sm:border-b" : "",
                  ].join(" ")}
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-white/[0.05] border border-white/10 text-[#a4e844]">
                    <feature.icon className="size-6" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold tracking-tight text-white">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-white/60">
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
