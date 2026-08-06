"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";

import { Check, GitBranch, GitPullRequest, Structured, Track } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    number: "01.",
    label: "Connect repositories",
    title: "Set it up once. It runs on every merge.",
    body: "Install the read-only GitHub App and choose the product repos Thally should watch. You choose exactly what Thally can see.",
    icon: GitBranch,
  },
  {
    number: "02.",
    label: "Impact analysis",
    title: "Understand the change before the update.",
    body: "Track evaluates merged changes, gathers evidence, and finds the documentation each change affects.",
    icon: Track,
  },
  {
    number: "03.",
    label: "Drafted docs PRs",
    title: "Evidence-backed drafts, ready to review.",
    body: "Thally opens a pull request on your docs repo only when the evidence says an update is needed.",
    icon: GitPullRequest,
  },
  {
    number: "04.",
    label: "Human review",
    title: "You approve what ships. Every time.",
    body: "Your team reviews, edits, and merges. A no-change result is valid. Thally never pushes to main.",
    icon: Structured,
  },
];

/**
 * Template "automation-section": centered bordered section header, then
 * a 400vh sticky runway pinning two large hairline cards. The left card
 * crossfades a per-stage headline above a divider tab list; the right
 * card has the icon tab pill row and a large visual area.
 */
export function PipelineTabs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(STAGES.length - 1, Math.floor(v * STAGES.length));
    if (idx !== active) setActive(idx);
  });

  return (
    <section id="automation" className="bg-canvas pt-[120px]">
      {/* Centered section header with hairline divider */}
      <div className="mb-[60px] border-b border-white/18 pb-[60px]">
        <div className="mx-auto max-w-[746px] px-5 text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section mt-4 text-white">
            One product change. The right knowledge updates.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mt-5 text-lg text-white/90">
              Thally watches the repos you choose and drafts only the updates the evidence supports.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Sticky runway */}
      <div ref={sectionRef} className="relative lg:h-[400vh]">
        <div className="lg:sticky lg:top-[60px] lg:h-[90vh]">
          <div className="mx-auto flex h-full w-full max-w-[1480px] flex-col gap-2.5 px-5 pb-10 lg:flex-row">
            {/* Left card */}
            <div className="border-canvas-card-stroke flex w-full flex-col justify-between gap-10 rounded-[35px] border p-7 sm:p-10">
              {/* Crossfading per-stage headline, template .automation-left-title stack */}
              <div className="relative min-h-[220px] sm:min-h-[240px]">
                {STAGES.map((stage, i) => (
                  <motion.div
                    key={stage.number}
                    initial={false}
                    animate={{ opacity: active === i ? 1 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.5 }}
                    className={cn("absolute inset-0 flex max-w-[513px] flex-col gap-6", active !== i && "pointer-events-none")}
                  >
                    <h3 className="heading-card text-left text-white">{stage.title}</h3>
                    <p className="text-lg tracking-[-0.04em] text-[#afafaf]">{stage.body}</p>
                  </motion.div>
                ))}
              </div>

              {/* Divider tab list, template .automation-tab-block */}
              <div className="flex flex-col gap-8">
                {STAGES.map((stage, i) => (
                  <button
                    key={stage.number}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={active === i}
                    className="border-b border-[#383838] pb-5 text-left"
                  >
                    <span className="flex items-end gap-3">
                      <span
                        className={cn(
                          "font-mono text-lg transition-colors duration-500",
                          active === i ? "text-canvas-accent" : "text-[#7c7b79]",
                        )}
                      >
                        {stage.number}
                      </span>
                      <span
                        className={cn(
                          "text-xl tracking-[-0.04em] transition-colors duration-500",
                          active === i ? "text-white" : "text-[#afafaf]",
                        )}
                      >
                        {stage.label}
                      </span>
                    </span>
                    <motion.div
                      initial={false}
                      animate={{
                        height: active === i || reduced ? "auto" : 0,
                        opacity: active === i || reduced ? 1 : 0,
                      }}
                      transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-md pt-3 text-[15px] leading-relaxed tracking-[-0.03em] text-[#afafaf]">
                        {stage.body}
                      </p>
                    </motion.div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right card */}
            <div className="border-canvas-card-stroke flex w-full flex-col items-center overflow-hidden rounded-[35px] border p-7 sm:p-10">
              {/* Icon tab pill row, template .automated-right-tab */}
              <div className="border-canvas-card-stroke flex items-center gap-1 rounded-full border p-1.5">
                {STAGES.map((stage, i) => (
                  <button
                    key={stage.number}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={stage.label}
                    aria-current={active === i}
                    className={cn(
                      "flex size-[52px] items-center justify-center rounded-full transition-colors duration-500",
                      active === i ? "bg-[#222222] text-white" : "text-[#7c7b79] hover:text-white",
                    )}
                  >
                    <stage.icon className="size-5" />
                  </button>
                ))}
              </div>

              {/* Visual area */}
              <div className="relative my-auto min-h-[420px] w-full sm:min-h-[460px]">
                {STAGES.map((_, i) => (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{ opacity: active === i ? 1 : 0, y: active === i ? 0 : 24 }}
                    transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "absolute inset-0 flex transform-gpu items-center justify-center will-change-transform",
                      active !== i && "pointer-events-none",
                    )}
                  >
                    <StageVisual index={i} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StageVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <Panel title="Connected repositories" icon={<GitBranch className="text-canvas-accent size-4" />}>
        {["acme/api", "acme/web-app", "acme/docs"].map((repo, i) => (
          <div
            key={repo}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5"
          >
            <span className="font-mono text-sm text-white/85">{repo}</span>
            <span className="flex items-center gap-1.5 text-xs text-white/50">
              <Check className="text-canvas-accent size-3.5" />
              {i === 2 ? "docs target" : "watching"}
            </span>
          </div>
        ))}
        <p className="px-1 text-xs text-white/45">Read-only access. You choose exactly what Thally can see.</p>
      </Panel>
    );
  }

  if (index === 1) {
    return (
      <Panel title="Impact analysis" icon={<Track className="text-canvas-accent size-4" />}>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <p className="text-xs text-white/50">Merged · acme/api</p>
          <p className="mt-1 font-mono text-sm text-white/85">feat: per-project webhook secrets #517</p>
        </div>
        <div aria-hidden className="mx-auto h-5 w-px bg-gradient-to-b from-white/30 to-transparent" />
        <div className="space-y-2">
          {[
            ["guides/webhooks.mdx", "update needed"],
            ["api/projects.mdx", "update needed"],
            ["guides/quickstart.mdx", "no change"],
          ].map(([page, verdict]) => (
            <div
              key={page}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <span className="font-mono text-xs text-white/75">{page}</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-medium",
                  verdict === "no change" ? "bg-white/8 text-white/50" : "bg-canvas-accent/15 text-canvas-accent",
                )}
              >
                {verdict}
              </span>
            </div>
          ))}
        </div>
      </Panel>
    );
  }

  if (index === 2) {
    return (
      <Panel title="Drafted docs PR" icon={<GitPullRequest className="text-canvas-accent size-4" />}>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <p className="font-mono text-sm text-white/85">docs: document per-project webhook secrets</p>
          <p className="mt-1 text-xs text-white/50">Drafted by Thally · labeled origin: track</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs leading-6">
          <p className="text-red-300/70">- Webhook secrets are shared across projects.</p>
          <p className="text-canvas-accent">+ Each project now has its own webhook secret.</p>
          <p className="text-canvas-accent">+ Rotate secrets from Project Settings.</p>
        </div>
        <p className="px-1 text-xs text-white/45">Updated 2 pages, added 1 · every line backed by the diff</p>
      </Panel>
    );
  }

  return (
    <Panel title="Awaiting your review" icon={<Structured className="text-canvas-accent size-4" />}>
      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5">
        <div className="flex items-center justify-between">
          <p className="font-mono text-sm text-white/85">docs#84 · webhook secrets</p>
          <span className="bg-canvas-accent/15 text-canvas-accent rounded-full px-2 py-0.5 text-[11px] font-medium">
            Open, awaiting review
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <span className="bg-canvas-accent text-canvas flex-1 rounded-xl px-4 py-3 text-center text-sm font-semibold">
          Approve &amp; merge
        </span>
        <span className="flex-1 rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-medium text-white/70">
          Request changes
        </span>
      </div>
      <p className="px-1 text-xs text-white/45">Nothing publishes until a human approves it.</p>
    </Panel>
  );
}

function Panel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0a0d13] p-6">
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium text-white/80">{title}</span>
      </div>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}
