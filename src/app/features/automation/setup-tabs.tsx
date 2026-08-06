"use client";

/**
 * Click-driven setup tabs for the Automation page, styled after the
 * homepage pipeline tabs: a centered bordered section header, then two
 * large hairline cards. The left card lists the three setup steps as
 * hover/click tabs; the right card crossfades a dark visual panel per
 * step (repo checklist, trigger pills, draft PR diff).
 */

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { Check, GitBranch, GitPullRequest, Settings } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    number: "01.",
    label: "Connect repositories",
    description:
      "Install the read-only GitHub App on your product and docs repositories. Thally watches merged pull requests on their default branches.",
  },
  {
    number: "02.",
    label: "Choose your triggers",
    description:
      "Decide what should start a draft (a merged PR, a release tag, a schema change) and which docs repo receives the resulting pull request.",
  },
  {
    number: "03.",
    label: "Review and merge",
    description:
      "Every change arrives as a draft pull request with evidence and a diff. Nothing publishes until a human approves it.",
  },
] as const;

export function SetupTabs() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  return (
    <section id="how" className="bg-canvas pt-[120px] pb-[120px]">
      {/* Centered section header with hairline divider */}
      <div className="mb-[60px] border-b border-white/18 pb-[60px]">
        <div className="mx-auto max-w-[746px] px-5 text-center">
          <p className="text-canvas-accent text-sm font-medium tracking-widest uppercase">How it works</p>
          <SplitReveal as="h2" mode="chars" className="heading-section mt-4 text-white">
            Set it up once. It runs on every merge.
          </SplitReveal>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-2.5 px-5 lg:flex-row">
        {/* Left card: hover/click step tabs */}
        <div className="border-canvas-card-stroke flex w-full flex-col justify-center rounded-[35px] border p-7 sm:p-10">
          <div className="flex flex-col gap-8">
            {STEPS.map((step, i) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
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
                    {step.number}
                  </span>
                  <span
                    className={cn(
                      "text-xl tracking-[-0.04em] transition-colors duration-500",
                      active === i ? "text-white" : "text-[#afafaf]",
                    )}
                  >
                    {step.label}
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
                    {step.description}
                  </p>
                </motion.div>
              </button>
            ))}
          </div>
        </div>

        {/* Right card: crossfading visual per step */}
        <div className="border-canvas-card-stroke flex w-full flex-col items-center overflow-hidden rounded-[35px] border p-7 sm:p-10">
          <div className="relative my-auto min-h-[420px] w-full">
            {STEPS.map((_, i) => (
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
                <StepVisual index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <Panel title="Connected once" icon={<GitBranch className="text-canvas-accent size-4" />}>
        {["jahce/bono · product", "jahce/leaflet · product", "jahce/dabs · docs", "read-only GitHub App"].map(
          (item) => (
            <p
              key={item}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-xs text-white/85"
            >
              <Check className="text-canvas-accent size-3.5 shrink-0" />
              {item}
            </p>
          ),
        )}
      </Panel>
    );
  }

  if (index === 1) {
    return (
      <Panel title="Triggers" icon={<Settings className="text-canvas-accent size-4" />}>
        {(
          [
            ["Merged pull request", "on"],
            ["Release tag", "on"],
            ["Schema or API change", "on"],
            ["Scheduled sweep", "off"],
          ] as const
        ).map(([label, state]) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
          >
            <span className="text-sm text-white/85">{label}</span>
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                state === "on" ? "bg-canvas-accent/15 text-canvas-accent" : "bg-white/8 text-white/50",
              )}
            >
              {state}
            </span>
          </div>
        ))}
        <p className="px-1 text-center text-xs text-white/45">You choose the events · Thally ignores the rest</p>
      </Panel>
    );
  }

  return (
    <Panel title="Draft PR" icon={<GitPullRequest className="text-canvas-accent size-4" />}>
      <div className="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs leading-6">
        <p className="text-red-300/70">- The client waits 30 seconds.</p>
        <p className="text-canvas-accent">+ The client waits 60 seconds.</p>
        <p className="text-canvas-accent">+ Override per request with timeout.</p>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="font-mono text-sm text-white/85">jahce/dabs #291</span>
        <span className="bg-canvas-accent/15 text-canvas-accent rounded-full px-2.5 py-0.5 text-[11px] font-medium">
          Awaiting review
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
