"use client";

import type { IconType } from "react-icons";
import { SiClaude, SiCursor, SiGithubcopilot, SiGooglegemini, SiPerplexity, SiV0, SiWindsurf } from "react-icons/si";

import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";

const READERS: Array<{ name: string; icon: IconType }> = [
  { name: "Claude", icon: SiClaude },
  { name: "Cursor", icon: SiCursor },
  { name: "Copilot", icon: SiGithubcopilot },
  { name: "Perplexity", icon: SiPerplexity },
  { name: "Gemini", icon: SiGooglegemini },
  { name: "v0", icon: SiV0 },
  { name: "Windsurf", icon: SiWindsurf },
];

const FORMATS = [
  ["A developer in a browser", "HTML", "/guides/webhooks"],
  ["A coding assistant", "Markdown", "/guides/webhooks.md"],
  ["An agent with tools", "MCP", "/api/mcp"],
  ["Anything that fetches", "JSON", "/guides/webhooks.json"],
] as const;

function ReaderMarquee() {
  return (
    <div className="logos-marquee flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      {[false, true].map((hidden) => (
        <div
          key={String(hidden)}
          className="logos-marquee-track flex min-w-max shrink-0 items-center"
          aria-hidden={hidden || undefined}
        >
          {READERS.map((reader) => (
            <span key={reader.name} className="mr-10 flex shrink-0 items-center gap-2.5 text-white/80">
              <reader.icon className="size-6" aria-hidden />
              <span className="font-display text-xl font-semibold tracking-tight whitespace-nowrap">{reader.name}</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function OneSourcePanel() {
  return (
    <div
      aria-hidden
      className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0a0d13] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
        <span className="truncate font-mono text-[13px] text-white/80">guides/webhooks.mdx</span>
        <span className="bg-canvas-accent/15 text-canvas-accent shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium">
          one source
        </span>
      </div>
      <div className="mt-3 space-y-1.5">
        {FORMATS.map(([reader, format, path]) => (
          <div
            key={reader}
            className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5"
          >
            <span className="min-w-0 flex-1 text-[12px] text-white/80">{reader}</span>
            <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-white/45">{format}</span>
            <span className="font-mono text-[10px] text-white/35">{path}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 border-t border-white/[0.06] pt-2.5 text-[11px] leading-relaxed text-white/40">
        Same URL, same content, same commit. Updated together when the product changes.
      </p>
    </div>
  );
}

export function AiRisk() {
  return (
    <section id="ai-risk" className="bg-canvas px-2.5 pb-[120px] sm:px-5">
      <div className="border-canvas-card-stroke mx-auto grid w-full max-w-[1480px] items-center gap-14 overflow-hidden rounded-[35px] border px-6 py-16 sm:px-14 sm:py-20 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-2xl min-w-0">
          <SplitReveal as="h2" mode="chars" className="heading-section text-canvas-foreground">
            Stale docs no longer mislead one reader at a time.
          </SplitReveal>
          <Reveal delay={0.15} distance={24}>
            <p className="text-canvas-muted mt-6 text-lg leading-8">
              With AI helping teams ship faster, the gap between the product and its docs opens faster too. And the
              readers have changed. If an old endpoint or a deprecated workflow is still documented somewhere, a coding
              assistant will recommend it, generate code with it, and repeat that mistake for every developer who asks.
            </p>
            <p className="text-canvas-muted mt-5 text-lg leading-8">
              Thally serves every format from one source, so agents and people read the same source version. When the
              product changes, both get the update.
            </p>
          </Reveal>
          <Reveal delay={0.25} distance={20} className="mt-10">
            <p className="mb-5 text-sm text-white/60">The AI tools reading your docs today</p>
            <ReaderMarquee />
          </Reveal>
        </div>

        <Reveal delay={0.2} distance={40} className="flex justify-center lg:justify-end">
          <OneSourcePanel />
        </Reveal>
      </div>
    </section>
  );
}
