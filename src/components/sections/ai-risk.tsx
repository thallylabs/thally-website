"use client";

import type { IconType } from "react-icons";
import { SiClaude, SiCursor, SiGithubcopilot, SiGooglegemini, SiPerplexity, SiV0, SiWindsurf } from "react-icons/si";

import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";

/**
 * The tools that now read your docs on a customer's behalf. They are listed as
 * readers, not endorsements: none of them have said anything about Thally.
 */
const READERS: Array<{ name: string; icon: IconType }> = [
  { name: "Claude", icon: SiClaude },
  { name: "Cursor", icon: SiCursor },
  { name: "Copilot", icon: SiGithubcopilot },
  { name: "Perplexity", icon: SiPerplexity },
  { name: "Gemini", icon: SiGooglegemini },
  { name: "v0", icon: SiV0 },
  { name: "Windsurf", icon: SiWindsurf },
];

const CONSEQUENCES = [
  {
    title: "What the assistant reads",
    body: "Whatever you published last. It has no way to know the pricing page is from two releases ago.",
  },
  {
    title: "What it does with a stale page",
    body: "Answers confidently anyway, inside someone else's editor, where you will never see the question.",
  },
  {
    title: "What Thally changes",
    body: "The page is current before the question is asked, because the update shipped with the code that caused it.",
  },
];

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

/**
 * Why drift compounds now: readers increasingly meet your docs through a
 * coding assistant, so a stale page becomes a wrong answer instead of a gap.
 */
export function AiRisk() {
  return (
    <section id="ai-risk" className="bg-canvas px-2.5 pb-[120px] sm:px-5">
      <div className="border-canvas-card-stroke relative mx-auto w-full max-w-[1480px] overflow-hidden rounded-[50px] border px-6 py-16 sm:px-14 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 85% 0%, color-mix(in oklab, var(--chart-3) 14%, transparent), transparent 70%)",
          }}
        />
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-canvas-muted text-sm font-medium tracking-widest uppercase">Why it compounds</p>
          </Reveal>
          <SplitReveal as="h2" mode="chars" className="heading-section text-canvas-foreground mt-5">
            A stale page used to cost you a support ticket. Now it costs you the answer.
          </SplitReveal>
          <Reveal delay={0.15} distance={24}>
            <p className="text-canvas-muted mt-6 max-w-2xl text-lg leading-8">
              Your readers increasingly ask an assistant instead of opening your docs. Those tools read what you
              published, stale or not, and repeat it with full confidence. Drift is no longer a small gap. It is the
              wrong answer, generated on your behalf.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.25} distance={20} className="mt-12">
          <p className="mb-5 text-sm text-white/60">Your docs are now read by</p>
          <ReaderMarquee />
        </Reveal>

        <Reveal delay={0.3} distance={30} className="mt-12">
          <div className="grid overflow-hidden rounded-[20px] border border-white/[0.09] md:grid-cols-3">
            {CONSEQUENCES.map((item, i) => (
              <div
                key={item.title}
                className={[
                  "flex flex-col gap-2 p-7",
                  i < CONSEQUENCES.length - 1 ? "border-b border-white/[0.09] md:border-r md:border-b-0" : "",
                ].join(" ")}
              >
                <h3 className="text-[17px] font-medium tracking-[-0.02em] text-white">{item.title}</h3>
                <p className="text-[15px] leading-relaxed text-white/50">{item.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
