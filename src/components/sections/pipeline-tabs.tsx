"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { SiGithub } from "react-icons/si";

import { Check, GitBranch, GitPullRequest, Structured, Track } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    number: "01.",
    label: "Connect repos and surfaces",
    title: "Create your docs site. Connect the rest.",
    body: "Create or migrate your docs on Thally, then connect the product repositories and the surfaces that explain them: website, help center, changelog. Read-only access, chosen by you.",
    icon: GitBranch,
  },
  {
    number: "02.",
    label: "Understand the change",
    title: "Read the merge the way a good tech writer would.",
    body: "On every merge, on pull request, or on a schedule you set, Thally reads the diff, the PR discussion, and the linked tickets to work out what changed for customers.",
    icon: Track,
  },
  {
    number: "03.",
    label: "Trace the impact",
    title: "Find every page the change touches.",
    body: "Thally maps the change across docs, website, help center, and changelog, with a confidence score per page and the evidence behind it. No change is a valid answer.",
    icon: Structured,
  },
  {
    number: "04.",
    label: "Evidence-backed PRs",
    title: "Draft the update. You approve what ships.",
    body: "Each affected surface gets a pull request with the diff as evidence. Your team reviews, edits, and merges. Nothing publishes without a human.",
    icon: GitPullRequest,
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
            One change ships. Every surface follows.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mt-5 text-lg text-white/90">
              Detection tells you which pages the evidence says are affected. Propagation lands the fix on each one.
              Both, in one pipeline.
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
                    className={cn(
                      "absolute inset-0 flex max-w-[513px] flex-col gap-6",
                      active !== i && "pointer-events-none",
                    )}
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

/* --- Stage panels: static product-surface mocks ------------------------ */

const PANEL_BG = "#0a0d13";

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
  statusTone?: "accent" | "muted" | "warn";
  children: React.ReactNode;
}) {
  const tones = {
    accent: "bg-canvas-accent/15 text-canvas-accent",
    muted: "bg-white/[0.07] text-white/55",
    warn: "bg-[#c2a068]/15 text-[#dcc08e]",
  } as const;
  return (
    <div
      aria-hidden
      className="w-full max-w-lg rounded-2xl border border-white/10 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
      style={{ background: PANEL_BG }}
    >
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <span className="flex min-w-0 items-center gap-2 font-mono text-[13px] text-white/80">
          {icon}
          <span className="truncate">{title}</span>
        </span>
        <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium", tones[statusTone])}>
          {status}
        </span>
      </div>
      <div className="mt-3 space-y-1.5">{children}</div>
    </div>
  );
}

const rowBase =
  "flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5";

/** Small surface-kind tag used on cross-surface rows. */
function SurfaceTag({ kind }: { kind: string }) {
  return (
    <span className="shrink-0 rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-white/45">{kind}</span>
  );
}

function StageVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <Panel title="acme · Thally connections" icon={<SiGithub className="size-4 text-white/45" />} status="read-only">
        {(
          [
            ["acme/api", "repo", "watching", "synced 2m ago"],
            ["acme/docs", "docs", "Thally site", "synced 4m ago"],
            ["acme.com", "website", "connected", "synced 18m ago"],
            ["help.acme.com", "help center", "connected", "synced 21m ago"],
          ] as const
        ).map(([name, kind, role, synced]) => (
          <div key={name} className={rowBase}>
            <span className="bg-canvas-accent size-1.5 shrink-0 rounded-full" />
            <span className="truncate font-mono text-xs text-white/85">{name}</span>
            <SurfaceTag kind={kind} />
            <span className="flex shrink-0 items-center gap-1.5 text-[10px] text-white/40 sm:ml-auto">
              {role} · {synced}
            </span>
          </div>
        ))}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-2.5 text-[11px] text-white/40">
          <span>Runs on merge · on PR open · nightly</span>
          <span className="shrink-0 tabular-nums">4 connections</span>
        </div>
      </Panel>
    );
  }

  if (index === 1) {
    return (
      <Panel
        title="acme/api#517"
        icon={<Track className="text-canvas-accent size-4" />}
        status="understanding"
        statusTone="warn"
      >
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
          <p className="truncate font-mono text-xs text-white/85">feat: per-project webhook secrets</p>
          <div className="mt-2 flex items-center justify-end">
            <span className="font-mono text-[10px] text-white/40">
              12 files · <span className="text-canvas-accent">+318</span> <span className="text-[#c48b95]">-74</span> ·
              merged 14m ago
            </span>
          </div>
        </div>
        <div aria-hidden className="mx-auto h-4 w-px bg-gradient-to-b from-white/25 to-transparent" />
        {(
          [
            ["Diff", "2 endpoints, 1 config schema changed", true],
            ["PR discussion", "rotation moves to Project Settings", true],
            ["Linked ticket", "LIN-482 · per-project secrets", true],
            ["Release notes draft", "", false],
          ] as const
        ).map(([source, finding, done]) => (
          <div key={source} className={rowBase}>
            {done ? (
              <Check className="text-canvas-accent size-3.5 shrink-0" />
            ) : (
              <span className="border-canvas-accent/40 border-t-canvas-accent size-3 shrink-0 animate-spin rounded-full border-2" />
            )}
            <span className="shrink-0 text-[11px] text-white/80">{source}</span>
            <span className="truncate text-[11px] text-white/40 sm:ml-auto">{finding || "reading"}</span>
          </div>
        ))}
        <p className="border-t border-white/[0.06] px-1 pt-2.5 text-[11px] leading-relaxed text-white/55">
          Customer-facing: webhook secrets are now per project, rotated from Project Settings.
        </p>
      </Panel>
    );
  }

  if (index === 2) {
    return (
      <Panel
        title="Impact of acme/api#517"
        icon={<Structured className="text-canvas-accent size-4" />}
        status="4 pages affected"
      >
        {(
          [
            ["guides/webhooks.mdx", "docs", "0.94", "update needed"],
            ["/pricing#security", "website", "0.81", "update needed"],
            ["Rotating webhook secrets", "help center", "0.88", "update needed"],
            ["September release notes", "changelog", "0.97", "update needed"],
            ["guides/quickstart.mdx", "docs", "0.12", "no change"],
          ] as const
        ).map(([page, kind, confidence, verdict]) => (
          <div key={page} className={rowBase}>
            <span
              className={cn(
                "size-1.5 shrink-0 rounded-full",
                verdict === "no change" ? "bg-white/25" : "bg-canvas-accent",
              )}
            />
            <span className="truncate font-mono text-[11px] text-white/75">{page}</span>
            <SurfaceTag kind={kind} />
            <span className="ml-auto flex shrink-0 items-center gap-2">
              <span className="font-mono text-[10px] text-white/35 tabular-nums">conf {confidence}</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-medium",
                  verdict === "update needed"
                    ? "bg-canvas-accent/15 text-canvas-accent"
                    : "bg-white/[0.07] text-white/45",
                )}
              >
                {verdict}
              </span>
            </span>
          </div>
        ))}
        <p className="border-t border-white/[0.06] px-1 pt-2.5 text-[11px] text-white/40">
          Every score links to the diff lines that earned it.
        </p>
      </Panel>
    );
  }

  return (
    <Panel
      title="4 pull requests · 1 change"
      icon={<GitPullRequest className="text-canvas-accent size-4" />}
      status="awaiting review"
      statusTone="warn"
    >
      {(
        [
          ["acme/docs#292", "docs", "+42", "-11"],
          ["acme/website#88", "website", "+9", "-4"],
          ["acme/help-center#41", "help center", "+17", "-6"],
          ["acme/changelog#12", "changelog", "+6", "-0"],
        ] as const
      ).map(([pr, kind, add, del]) => (
        <div key={pr} className={rowBase}>
          <GitPullRequest className="text-canvas-accent size-3.5 shrink-0" />
          <span className="truncate font-mono text-[11px] text-white/85">{pr}</span>
          <SurfaceTag kind={kind} />
          <span className="ml-auto flex shrink-0 items-center gap-1.5 font-mono text-[10px]">
            <span className="text-canvas-accent">{add}</span>
            <span className="text-[#c48b95]">{del}</span>
            <span className="text-white/35">· evidence attached</span>
          </span>
        </div>
      ))}
      {/* Static action bar, rendered as spans so the hidden layers stay untabbable */}
      <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-3">
        <span className="bg-canvas-accent text-canvas rounded-lg px-3.5 py-2 text-xs font-semibold">
          Approve and merge
        </span>
        <span className="rounded-lg border border-white/15 px-3.5 py-2 text-xs font-medium text-white/70">
          Request changes
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-white/35 sm:ml-auto">0 of 4 approved</span>
      </div>
      <p className="px-1 pt-1 text-[11px] text-white/40">Nothing publishes until a human approves it.</p>
    </Panel>
  );
}
