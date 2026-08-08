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

/* --- Stage panels: static product-surface mocks ------------------------ */

const PANEL_BG = "#0a0d13";

type Person = { initials: string; tint: string };

const PEOPLE: Record<string, Person> = {
  ada: { initials: "AO", tint: "#8a6f52" },
  jah: { initials: "JC", tint: "#4d5f80" },
  bot: { initials: "TB", tint: "#5a6340" },
};

function Avatars({ people }: { people: Person[] }) {
  return (
    <span className="flex -space-x-1.5">
      {people.map((person) => (
        <span
          key={person.initials}
          className="flex size-[18px] items-center justify-center rounded-full text-[8px] font-semibold text-white/90 ring-[1.5px] ring-[#0a0d13]"
          style={{ background: person.tint }}
        >
          {person.initials}
        </span>
      ))}
    </span>
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

const rowBase = "flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5";

/** The first two stages use the Thally-labeled diagrams. */
const STAGE_DIAGRAMS: Record<number, string> = {
  0: "/template/workflow-diagram.png",
  1: "/template/impact-analysis-diagram.png",
};

function StageVisual({ index }: { index: number }) {
  const diagram = STAGE_DIAGRAMS[index];
  if (diagram) {
    return (
      <img
        src={diagram}
        alt=""
        aria-hidden
        className="w-full max-w-[520px]"
        loading={index === 0 ? "eager" : "lazy"}
      />
    );
  }

  if (index === 0) {
    return (
      <Panel title="acme · Thally GitHub App" icon={<SiGithub className="size-4 text-white/45" />} status="read-only">
        {(
          [
            ["acme/api", "main", "watching", "synced 2m ago"],
            ["acme/web-app", "main", "watching", "synced 18m ago"],
            ["acme/docs", "main", "docs target", "synced 4m ago"],
          ] as const
        ).map(([repo, branch, role, synced]) => (
          <div key={repo} className={rowBase}>
            <SiGithub className="size-3.5 shrink-0 text-white/35" />
            <span className="truncate font-mono text-xs text-white/85">{repo}</span>
            <span className="flex shrink-0 items-center gap-1 rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-white/45">
              <GitBranch className="size-2.5" />
              {branch}
            </span>
            <span className="ml-auto flex shrink-0 items-center gap-1.5 text-[10px] text-white/40">
              <span className="bg-canvas-accent size-1.5 rounded-full" />
              {role} · {synced}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-2.5 text-[11px] text-white/40">
          <span>Read-only access. You choose exactly what Thally can see.</span>
          <span className="shrink-0 tabular-nums">3 repos</span>
        </div>
      </Panel>
    );
  }

  if (index === 1) {
    return (
      <Panel
        title="acme/api#517"
        icon={<Track className="text-canvas-accent size-4" />}
        status="analyzing"
        statusTone="warn"
      >
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
          <p className="truncate font-mono text-xs text-white/85">feat: per-project webhook secrets</p>
          <div className="mt-2 flex items-center justify-between">
            <Avatars people={[PEOPLE.jah, PEOPLE.ada]} />
            <span className="font-mono text-[10px] text-white/40">
              12 files · <span className="text-canvas-accent">+318</span> <span className="text-[#c48b95]">-74</span> ·
              merged 14m ago
            </span>
          </div>
        </div>
        <div aria-hidden className="mx-auto h-4 w-px bg-gradient-to-b from-white/25 to-transparent" />
        {(
          [
            ["guides/webhooks.mdx", "0.94", "update needed"],
            ["api/projects.mdx", "0.87", "update needed"],
            ["guides/quickstart.mdx", "0.12", "no change"],
            ["api/webhooks.mdx", "", "scanning"],
          ] as const
        ).map(([page, confidence, verdict]) => (
          <div key={page} className={rowBase}>
            {verdict === "scanning" ? (
              <span className="border-canvas-accent/40 border-t-canvas-accent size-3 shrink-0 animate-spin rounded-full border-2" />
            ) : (
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  verdict === "no change" ? "bg-white/25" : "bg-canvas-accent",
                )}
              />
            )}
            <span className="truncate font-mono text-[11px] text-white/75">{page}</span>
            <span className="ml-auto flex shrink-0 items-center gap-2">
              {confidence && (
                <span className="font-mono text-[10px] text-white/35 tabular-nums">conf {confidence}</span>
              )}
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-medium",
                  verdict === "update needed" ? "bg-canvas-accent/15 text-canvas-accent" : "bg-white/[0.07] text-white/45",
                )}
              >
                {verdict}
              </span>
            </span>
          </div>
        ))}
      </Panel>
    );
  }

  if (index === 2) {
    return (
      <Panel
        title="acme/docs #292"
        icon={<GitPullRequest className="text-canvas-accent size-4" />}
        status="draft"
        statusTone="warn"
      >
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
          <p className="truncate text-xs font-medium text-white/85">docs: document per-project webhook secrets</p>
          <div className="mt-2 flex items-center gap-2">
            <Avatars people={[PEOPLE.bot]} />
            <span className="text-[10px] text-white/40">
              thally-bot opened 3m ago · 2 files changed · label origin: track
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-black/45 p-3 font-mono text-[11px] leading-[1.7]">
          <p className="text-white/25">@@ guides/webhooks.mdx +18 -6</p>
          <p className="text-[#c48b95]">- Webhook secrets are shared across projects.</p>
          <p className="text-canvas-accent">+ Each project now has its own webhook secret.</p>
          <p className="text-canvas-accent">+ Rotate secrets from Project Settings.</p>
        </div>
        <div className="flex items-center gap-1.5 border-t border-white/[0.06] pt-2.5">
          <span className="text-canvas-accent bg-canvas-accent/12 rounded px-1.5 py-0.5 font-mono text-[10px]">
            +42
          </span>
          <span className="rounded bg-[#c48b95]/12 px-1.5 py-0.5 font-mono text-[10px] text-[#c48b95]">-11</span>
          <span className="ml-auto text-[10px] text-white/40">every line backed by the diff</span>
        </div>
      </Panel>
    );
  }

  return (
    <Panel
      title="acme/docs #292"
      icon={<Structured className="text-canvas-accent size-4" />}
      status="awaiting review"
    >
      <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
        <Avatars people={[PEOPLE.ada, PEOPLE.jah]} />
        <span className="truncate text-[11px] text-white/60">Review requested from Ada O. and Jahce C.</span>
        <span className="ml-auto shrink-0 text-[10px] text-white/35">2m ago</span>
      </div>
      {(
        [
          ["Evidence attached", "4 diffs", true],
          ["Preview build passed", "38s", true],
          ["Approvals", "1 of 2", false],
        ] as const
      ).map(([label, meta, done]) => (
        <div key={label} className="flex items-center gap-2 px-1 py-1.5 text-[11px]">
          {done ? (
            <Check className="text-canvas-accent size-3.5 shrink-0" />
          ) : (
            <span className="size-3.5 shrink-0 rounded-full border border-white/25" />
          )}
          <span className={done ? "text-white/55" : "text-white/75"}>{label}</span>
          <span className="ml-auto font-mono text-[10px] text-white/35 tabular-nums">{meta}</span>
        </div>
      ))}
      {/* Static action bar, rendered as spans so the hidden layers stay untabbable */}
      <div className="flex items-center gap-2 border-t border-white/[0.06] pt-3">
        <span className="bg-canvas-accent text-canvas rounded-lg px-3.5 py-2 text-xs font-semibold">
          Approve and merge
        </span>
        <span className="rounded-lg border border-white/15 px-3.5 py-2 text-xs font-medium text-white/70">
          Request changes
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] text-white/35">
          <Avatars people={[PEOPLE.ada]} />
          reviewing
        </span>
      </div>
      <p className="px-1 pt-1 text-[11px] text-white/40">Nothing publishes until a human approves it.</p>
    </Panel>
  );
}
