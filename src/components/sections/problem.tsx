"use client";

import { Check } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cn } from "@/lib/utils";

/** Where the facts about a change live before anyone has written them down. */
const INPUTS = ["PM one-pagers", "Linear tickets", "The changelog", "The diff itself"];

/** The places that might need to say something new, and how sure anyone is. */
const SURFACES: Array<{ name: string; note: string; tone: "warn" | "muted" | "stale" }> = [
  { name: "API reference", note: "probably", tone: "warn" },
  { name: "Quickstart guide", note: "unclear", tone: "muted" },
  { name: "Website", note: "owned by marketing", tone: "muted" },
  { name: "Support article", note: "updated 6 months ago", tone: "stale" },
  { name: "Blog code examples", note: "3 posts", tone: "warn" },
  { name: "Integration guide", note: "already stale", tone: "stale" },
];

const TONES = {
  warn: "bg-[#c2a068]/15 text-[#dcc08e]",
  muted: "bg-white/[0.07] text-white/50",
  stale: "bg-[#c48b95]/15 text-[#d9a1aa]",
} as const;

/** The manual hunt, as a card: what you read, then the list you end up with. */
function HuntMock() {
  return (
    <div
      aria-hidden
      className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0a0d13] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
    >
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <span className="truncate font-mono text-[13px] text-white/80">What changed in acme/api#517?</span>
        <span className="shrink-0 rounded-full bg-white/[0.07] px-2 py-0.5 text-[10px] font-medium text-white/55">
          by hand
        </span>
      </div>

      <p className="mt-4 text-[11px] font-semibold tracking-widest text-white/35 uppercase">Read first</p>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {INPUTS.map((input) => (
          <div
            key={input}
            className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-[12px] text-white/75"
          >
            <Check className="text-canvas-accent size-3.5 shrink-0" />
            {input}
          </div>
        ))}
      </div>

      <p className="mt-4 text-[11px] font-semibold tracking-widest text-white/35 uppercase">
        Then work out who needs to know
      </p>
      <div className="mt-2 space-y-1.5">
        {SURFACES.map((surface) => (
          <div
            key={surface.name}
            className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2"
          >
            <span className="size-1.5 shrink-0 rounded-full bg-white/25" />
            <span className="truncate text-[12px] text-white/80">{surface.name}</span>
            <span
              className={cn("ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium", TONES[surface.tone])}
            >
              {surface.note}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2.5 text-[11px] text-white/40">
        <span>Half a day of detective work.</span>
        <span className="shrink-0">Every release.</span>
      </div>
    </div>
  );
}

/**
 * The enemy, named exactly. The section sits right under the hero so the
 * visitor meets the problem before the product.
 */
export function Problem() {
  return (
    <section id="problem" className="bg-canvas marketing-section-pad">
      <div className="mx-auto grid w-full max-w-[1480px] items-center gap-14 px-5 lg:grid-cols-2 lg:gap-10">
        <div className="max-w-xl">
          <Reveal>
            <p className="text-canvas-muted text-sm font-medium tracking-widest uppercase">The problem</p>
          </Reveal>
          <SplitReveal as="h2" mode="chars" className="heading-section text-canvas-foreground mt-5">
            You know the drill.
          </SplitReveal>
          <Reveal delay={0.15} distance={24}>
            <p className="text-canvas-muted mt-6 text-lg leading-8">
              A feature ships. Someone collects the one-pagers from product managers, reads through the Linear tickets,
              inspects the changelog and the diff, and works out what actually changed.
            </p>
            <p className="text-canvas-muted mt-5 text-lg leading-8">
              Then the harder question. Does the API reference need an update? The quickstart? The website? That support
              article last touched six months ago, the code examples in old blog posts, the integration guide that
              quietly went stale?
            </p>
            <p className="text-canvas-foreground mt-5 text-lg leading-8">
              Most teams update the docs and hope the rest catches up. It rarely does. The pricing page says one thing,
              the docs say another, and the support bot confidently repeats a third.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} distance={40} className="flex justify-center lg:justify-end">
          <HuntMock />
        </Reveal>
      </div>
    </section>
  );
}
