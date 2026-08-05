"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";

import { Check, GitBranch, GitPullRequest, Structured, Track } from "@/components/icons";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    number: "01",
    title: "Connect your repositories",
    description:
      "Install the read-only GitHub App and choose the product repos Thally should watch. Setup happens once.",
  },
  {
    number: "02",
    title: "Understand every merge",
    description:
      "Track evaluates merged changes, gathers evidence, and finds the documentation each change affects.",
  },
  {
    number: "03",
    title: "Draft the update",
    description:
      "Thally opens an evidence-backed pull request on your docs repo, only when the evidence says one is needed.",
  },
  {
    number: "04",
    title: "You approve what ships",
    description: "Your team reviews, edits, and merges. A no-change result is valid. Thally never pushes to main.",
  },
];

/**
 * Template "automation-section": a tall scroll-driven section with a
 * sticky viewport. Left tab titles highlight and right visuals swap as
 * scrolling progresses through four stages.
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
    <section id="automation" ref={sectionRef} className="bg-canvas relative lg:h-[320vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto w-full max-w-[1480px] px-5 py-20 lg:py-0">
          <div className="max-w-2xl">
            <p className="text-canvas-accent text-sm font-medium tracking-widest uppercase">
              Product change intelligence
            </p>
            <SplitReveal as="h2" mode="chars" className="heading-section mt-3 text-white">
              One product change. The right knowledge updates.
            </SplitReveal>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
            {/* Stage list */}
            <div className="flex flex-col justify-center gap-2">
              {STAGES.map((stage, i) => (
                <button
                  key={stage.number}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={active === i}
                  className={cn(
                    "group rounded-2xl border border-transparent p-5 text-left transition-all duration-300",
                    active === i ? "border-canvas-hairline bg-white/[0.04]" : "hover:bg-white/[0.02]",
                  )}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={cn(
                        "font-mono text-sm transition-colors",
                        active === i ? "text-canvas-accent" : "text-canvas-muted-2",
                      )}
                    >
                      {stage.number}
                    </span>
                    <div>
                      <h3
                        className={cn(
                          "text-lg font-semibold tracking-tight transition-colors",
                          active === i ? "text-white" : "text-canvas-muted",
                        )}
                      >
                        {stage.title}
                      </h3>
                      <motion.div
                        initial={false}
                        animate={{
                          height: active === i || reduced ? "auto" : 0,
                          opacity: active === i || reduced ? 1 : 0,
                        }}
                        transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-canvas-muted mt-1.5 text-sm leading-relaxed">{stage.description}</p>
                      </motion.div>
                    </div>
                  </div>
                </button>
              ))}
              <p className="text-canvas-muted-2 mt-4 pl-5 text-sm">
                A no-change result is valid. Thally never pushes to main.
              </p>
            </div>

            {/* Stage visual */}
            <div className="border-canvas-hairline relative min-h-[420px] overflow-hidden rounded-[28px] border">
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-br from-[#0a1410] via-[#02050c] to-[#0b0916]"
              />
              {STAGES.map((_, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0, y: active === i ? 0 : 24 }}
                  transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "absolute inset-0 flex transform-gpu items-center justify-center p-6 will-change-transform sm:p-10",
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
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
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
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5"
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
      <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="font-mono text-sm text-white/85">docs#84 · webhook secrets</p>
          <span className="bg-canvas-accent/15 text-canvas-accent rounded-full px-2 py-0.5 text-[11px] font-medium">
            Open, awaiting review
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <span className="bg-canvas-accent text-canvas flex-1 rounded-xl px-4 py-2.5 text-center text-sm font-semibold">
          Approve &amp; merge
        </span>
        <span className="flex-1 rounded-xl border border-white/15 px-4 py-2.5 text-center text-sm font-medium text-white/70">
          Request changes
        </span>
      </div>
      <p className="px-1 text-xs text-white/45">Nothing publishes until a human approves it.</p>
    </Panel>
  );
}

function Panel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0d13] p-5">
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium text-white/80">{title}</span>
      </div>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}
