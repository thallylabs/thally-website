"use client";

import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";

const INPUTS = ["PM one-pager", "Linear tickets", "Changelog", "Git diff", "Slack threads"];

const SURFACES = [
  { name: "API reference", note: "probably" },
  { name: "Quickstart guide", note: "maybe" },
  { name: "Pricing page on the website", note: "who owns this?" },
  { name: "Help center article", note: "last updated 6 months ago", stale: true },
  { name: "Code samples in three blog posts", note: "nobody checked", stale: true },
  { name: "Partner integration guide", note: "already wrong", stale: true },
];

function DetectiveWorkPanel() {
  return (
    <div
      aria-hidden
      className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0a0d13] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
        <span className="truncate font-mono text-[13px] text-white/80">feat: per-project webhook secrets #517</span>
        <span className="bg-canvas-accent/15 text-canvas-accent shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium">
          merged
        </span>
      </div>

      <p className="mt-4 text-[11px] font-semibold tracking-widest text-white/35 uppercase">What changed, per</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {INPUTS.map((input) => (
          <span
            key={input}
            className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-white/70"
          >
            {input}
          </span>
        ))}
      </div>

      <p className="mt-4 text-[11px] font-semibold tracking-widest text-white/35 uppercase">Needs updating?</p>
      <div className="mt-2 space-y-1.5">
        {SURFACES.map((surface) => (
          <div
            key={surface.name}
            className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5"
          >
            <span className="size-3.5 shrink-0 rounded-[3px] border border-white/20" />
            <span className="min-w-0 flex-1 text-[12px] text-white/80">{surface.name}</span>
            <span className={surface.stale ? "text-[10px] text-[#d9a1aa]" : "text-[10px] text-white/40"}>
              {surface.note}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-3 border-t border-white/[0.06] pt-2.5 text-[11px] text-white/40">
        Six surfaces. Zero of them told you they were affected.
      </p>
    </div>
  );
}

export function Problem() {
  return (
    <section id="problem" className="bg-canvas pt-[120px]">
      <div className="mb-[60px] border-b border-white/18 pb-[60px]">
        <div className="mx-auto max-w-[746px] px-5 text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section text-canvas-foreground">
            You know the drill.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="text-canvas-muted mt-5 text-lg">
              A feature ships. Then someone has to work out what actually changed, and every public place that now says
              something wrong.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1480px] items-center gap-14 px-5 pb-[120px] lg:grid-cols-2 lg:gap-10">
        <Reveal distance={24} className="max-w-xl">
          <p className="text-canvas-muted text-lg leading-8">
            You collect one-pagers from product managers. You read through Linear tickets, the changelog, and the diff
            itself to understand what shipped.
          </p>
          <p className="text-canvas-muted mt-5 text-lg leading-8">
            Then comes the harder question: which of the API reference, the quickstart, the website, a support article
            nobody has touched in six months, the code samples in old blog posts, and the integration guide now needs to
            change?
          </p>
          <p className="text-canvas-muted mt-5 text-lg leading-8">
            Most teams update the docs and stop there. Not because they do not care, but because finding everything else
            is detective work, and there is always another release.
          </p>
          <p className="text-canvas-foreground mt-5 text-lg leading-8 font-semibold">Thally does the detective work.</p>
        </Reveal>

        <Reveal delay={0.2} distance={40} className="flex justify-center lg:justify-end">
          <DetectiveWorkPanel />
        </Reveal>
      </div>
    </section>
  );
}
