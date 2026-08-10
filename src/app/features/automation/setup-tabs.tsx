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
import { SiGithub } from "react-icons/si";

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

const REPOS = [
  { name: "jahce/bono", role: "product", branch: "main", meta: "synced 2m ago" },
  { name: "jahce/leaflet", role: "product", branch: "main", meta: "synced 21m ago" },
  { name: "jahce/dabs", role: "docs target", branch: "main", meta: "synced 6m ago" },
] as const;

const TRIGGERS = [
  { label: "Merged pull request", detail: "Fires when a PR lands on a default branch", state: "on" },
  { label: "Release tag", detail: "Fires on tags matching v*", state: "on" },
  { label: "Schema or API change", detail: "Watches OpenAPI files and config schemas", state: "on" },
  { label: "Scheduled sweep", detail: "Weekly drift check across every page", state: "off" },
] as const;

function BotAvatar() {
  return (
    <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[#5a6340] text-[8px] font-semibold text-white/90 ring-[1.5px] ring-[#0a0d13]">
      TB
    </span>
  );
}

function StepVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <Panel
        title="jahce · Thally GitHub App"
        icon={<SiGithub className="size-4 text-white/45" />}
        status="read-only"
      >
        {REPOS.map((repo) => (
          <div
            key={repo.name}
            className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5"
          >
            <SiGithub className="size-3.5 shrink-0 text-white/35" />
            <span className="truncate font-mono text-xs text-white/85">{repo.name}</span>
            <span className="flex shrink-0 items-center gap-1 rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-white/45">
              <GitBranch className="size-2.5" />
              {repo.branch}
            </span>
            <span className="flex shrink-0 items-center gap-1.5 text-[10px] text-white/40 sm:ml-auto">
              <span className="bg-canvas-accent size-1.5 rounded-full" />
              {repo.role} · {repo.meta}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-2.5 text-[11px] text-white/40">
          <span className="flex items-center gap-1.5">
            <Check className="text-canvas-accent size-3.5" />
            Read-only GitHub App installed
          </span>
          <span className="shrink-0 tabular-nums">3 repos</span>
        </div>
      </Panel>
    );
  }

  if (index === 1) {
    return (
      <Panel
        title="Triggers"
        icon={<Settings className="text-canvas-accent size-4" />}
        status="3 of 4 on"
        statusTone="muted"
      >
        {TRIGGERS.map((trigger) => (
          <div
            key={trigger.label}
            className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5"
          >
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] text-white/85">{trigger.label}</span>
              <span className="block truncate text-[10px] text-white/40">{trigger.detail}</span>
            </span>
            <span
              className={cn(
                "flex h-[18px] w-8 shrink-0 items-center rounded-full px-[3px]",
                trigger.state === "on" ? "bg-canvas-accent/70 justify-end" : "justify-start bg-white/12",
              )}
            >
              <span className="size-3 rounded-full bg-white/90" />
            </span>
          </div>
        ))}
        <p className="px-1 pt-1 text-center text-[11px] text-white/45">
          You choose the events · Thally ignores the rest
        </p>
      </Panel>
    );
  }

  return (
    <Panel
      title="jahce/dabs #291"
      icon={<GitPullRequest className="text-canvas-accent size-4" />}
      status="awaiting review"
    >
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
        <p className="truncate text-[13px] font-medium text-white/85">docs: document the new request timeout</p>
        <div className="mt-2 flex items-center gap-2">
          <BotAvatar />
          <span className="text-[10px] text-white/40">
            thally-bot opened 6m ago · 1 file changed · label origin: track
          </span>
        </div>
      </div>
      <div className="rounded-xl border border-white/[0.07] bg-black/45 p-3 font-mono text-[11px] leading-[1.7]">
        <p className="text-white/25">@@ guides/requests.mdx +3 -1</p>
        <p className="text-[#c48b95]">- The client waits 30 seconds.</p>
        <p className="text-canvas-accent">+ The client waits 60 seconds.</p>
        <p className="text-canvas-accent">+ Override per request with timeout.</p>
      </div>
      <div className="flex items-center gap-1.5 border-t border-white/[0.06] pt-2.5">
        <span className="text-canvas-accent bg-canvas-accent/12 rounded px-1.5 py-0.5 font-mono text-[10px]">+18</span>
        <span className="rounded bg-[#c48b95]/12 px-1.5 py-0.5 font-mono text-[10px] text-[#c48b95]">-4</span>
        <span className="ml-auto text-[10px] text-white/40">1 review required</span>
      </div>
      <p className="px-1 pt-1 text-[11px] text-white/45">Nothing publishes until a human approves it.</p>
    </Panel>
  );
}

/** Section chrome: title or file path on the left, status pill on the right. */
function Panel({
  title,
  icon,
  status,
  statusTone = "accent",
  children,
}: {
  title: string;
  icon: React.ReactNode;
  status: string;
  statusTone?: "accent" | "muted";
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0a0d13] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <span className="flex min-w-0 items-center gap-2 font-mono text-[13px] text-white/80">
          {icon}
          <span className="truncate">{title}</span>
        </span>
        <span
          className={cn(
            "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
            statusTone === "accent" ? "bg-canvas-accent/15 text-canvas-accent" : "bg-white/[0.07] text-white/55",
          )}
        >
          {status}
        </span>
      </div>
      <div className="mt-3 space-y-1.5">{children}</div>
    </div>
  );
}
