"use client";

import { AtSign, Check } from "lucide-react";

import {
  GitBranch as GitMerge,
  GitPullRequest,
  type IconComponent,
  Track as Radar,
} from "@/components/icons";
import { motion, useReducedMotion } from "motion/react";
import { type ComponentType, useState } from "react";

import { Avatar } from "@/components/illustrations/thally-ui";
import { SectionGrid, SectionHeader, SectionLines } from "@/components/section-decor";
import { cn } from "@/lib/utils";

type Trigger = {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: IconComponent;
  accent: string;
};

const TRIGGERS: Trigger[] = [
  {
    id: "mention",
    label: "Tag it",
    title: "Mention @thally anywhere on GitHub.",
    description:
      "Comment on any issue or pull request and the agent drafts the docs PR. Add the docs-preview label and reviewers see the docs alongside the code, before the feature merges.",
    icon: AtSign,
    accent: "var(--chart-1)",
  },
  {
    id: "track",
    label: "Track it",
    title: "Thally Track watches your product repos.",
    description:
      "Connect a repo with the one-click GitHub App. When a product PR merges, Track distills what changed and the agent opens a reviewed docs PR. The feature ships, the docs follow.",
    icon: GitMerge,
    accent: "var(--chart-2)",
  },
  {
    id: "score",
    label: "Score it",
    title: "Ailing metrics become pull requests.",
    description:
      "The readiness report names the exact pages dragging your score down, and the drift sweep flags docs whose source code changed. The agent turns both into PRs that fix them.",
    icon: Radar,
    accent: "var(--chart-5)",
  },
];

function MentionFlow() {
  const reduce = useReducedMotion();
  return (
    <div className="space-y-3">
      <motion.div
        className="border-border bg-background rounded-lg border p-3"
        initial={reduce ? undefined : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex items-start gap-2.5">
          <Avatar initials="EO" i={1} />
          <div className="min-w-0 flex-1">
            <p className="text-[11px]">
              <span className="font-semibold">ekene</span>{" "}
              <span className="text-muted-foreground">commented on #482 · acme/swap-widget</span>
            </p>
            <p className="bg-muted mt-1.5 rounded-md px-2.5 py-1.5 text-[11px] leading-relaxed">
              <span className="font-semibold" style={{ color: "var(--chart-1)" }}>
                @thally
              </span>{" "}
              document this. The swap widget now supports TRON and SOL.
            </p>
          </div>
        </div>
      </motion.div>
      <PrCard
        title="docs: add TRON and SOL to supported networks"
        meta="thally/agent-482 → main · +38 −6"
        checks={["thally check passed", "Preview deployed"]}
        delay={0.25}
      />
    </div>
  );
}

function TrackFlow() {
  const reduce = useReducedMotion();
  return (
    <div className="space-y-3">
      <motion.div
        className="border-border bg-background flex items-center gap-2.5 rounded-lg border p-3"
        initial={reduce ? undefined : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <span
          className="flex size-6 shrink-0 items-center justify-center rounded-full"
          style={{ background: "color-mix(in oklab, var(--chart-2) 18%, transparent)" }}
        >
          <GitMerge className="size-3.5" style={{ color: "var(--chart-2)" }} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-semibold">feat: per-project webhook secrets #517</p>
          <p className="text-muted-foreground text-[10px]">Merged into acme/api-server · touches src/webhooks/**</p>
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[9px] font-semibold whitespace-nowrap"
          style={{
            background: "color-mix(in oklab, var(--chart-2) 15%, transparent)",
            color: "var(--chart-2)",
          }}
        >
          tracked
        </span>
      </motion.div>
      <PrCard
        title="docs: document per-project webhook secrets"
        meta="Drafted by the agent · labeled origin: track"
        checks={["Updated 2 pages, added 1", "Registered in navigation"]}
        delay={0.25}
      />
    </div>
  );
}

function ScoreFlow() {
  const reduce = useReducedMotion();
  const findings = [
    { page: "guides/authentication", note: "source changed since last verified" },
    { page: "api/tokens", note: "missing description metadata" },
  ];
  return (
    <div className="space-y-3">
      <motion.div
        className="border-border bg-background rounded-lg border p-3"
        initial={reduce ? undefined : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold">Readiness report · weekly sweep</span>
          <span className="font-mono text-[10px]" style={{ color: "var(--chart-4)" }}>
            score 91 → 2 findings
          </span>
        </div>
        <div className="space-y-1.5">
          {findings.map((f) => (
            <div key={f.page} className="flex items-center gap-2 text-[11px]">
              <span className="size-1.5 shrink-0 rounded-full" style={{ background: "var(--chart-4)" }} />
              <span className="truncate font-mono text-[10px]">{f.page}</span>
              <span className="text-muted-foreground truncate text-[10px]">{f.note}</span>
            </div>
          ))}
        </div>
      </motion.div>
      <PrCard
        title="docs: reverify auth guide, add missing metadata"
        meta="thally/agent-drift → main · +12 −4"
        checks={["Score restored to 98", "thally check passed"]}
        delay={0.25}
      />
    </div>
  );
}

function PrCard({
  title,
  meta,
  checks,
  delay = 0,
}: {
  title: string;
  meta: string;
  checks: string[];
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="border-border bg-background rounded-lg border"
      initial={reduce ? undefined : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      <div className="border-border flex items-start gap-2.5 border-b p-3">
        <span
          className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full"
          style={{ background: "color-mix(in oklab, var(--chart-5) 18%, transparent)" }}
        >
          <GitPullRequest className="size-3.5" style={{ color: "var(--chart-5)" }} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-semibold">{title}</p>
          <p className="text-muted-foreground truncate text-[10px]">{meta}</p>
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[9px] font-semibold whitespace-nowrap"
          style={{
            background: "color-mix(in oklab, var(--chart-5) 15%, transparent)",
            color: "var(--chart-5)",
          }}
        >
          Open · awaiting review
        </span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 p-3">
        {checks.map((check) => (
          <span key={check} className="text-muted-foreground flex items-center gap-1.5 text-[10px]">
            <span
              className="flex size-3.5 items-center justify-center rounded-full"
              style={{ background: "var(--chart-5)" }}
            >
              <Check className="size-2 text-white" />
            </span>
            {check}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

const FLOWS: Record<string, ComponentType> = {
  mention: MentionFlow,
  track: TrackFlow,
  score: ScoreFlow,
};

export const Automation = () => {
  const [active, setActive] = useState(TRIGGERS[0].id);
  const ActiveFlow = FLOWS[active];

  return (
    <section id="automation" className="section-padding relative">
      <SectionGrid className="opacity-20" />
      <SectionLines />

      <div className="relative container">
        <SectionHeader
          title="The feature shipped. The docs already know."
          description="Every trigger produces the same thing: a documentation pull request drafted by the Thally agent, in your house style, on your infrastructure. It never merges. A human always does."
        />

        <div className="mt-10 grid gap-5 lg:mt-16 lg:grid-cols-[5fr_6fr] lg:gap-10">
          <div className="flex flex-col gap-2" role="tablist" aria-label="Automation triggers">
            {TRIGGERS.map((trigger) => {
              const Icon = trigger.icon;
              const isActive = active === trigger.id;
              return (
                <button
                  key={trigger.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(trigger.id)}
                  onMouseEnter={() => setActive(trigger.id)}
                  onFocus={() => setActive(trigger.id)}
                  className={cn(
                    "border-border relative rounded-2xl border p-5 text-left transition-colors",
                    isActive ? "bg-card shadow-sm" : "hover:bg-card/60 border-transparent",
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-4" style={{ color: trigger.accent }} strokeWidth={2.25} />
                    <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                      {trigger.label}
                    </span>
                  </div>
                  <h3 className="mt-2 leading-snug font-semibold">{trigger.title}</h3>
                  <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{trigger.description}</p>
                </button>
              );
            })}
          </div>

          <div className="border-border bg-muted/40 flex flex-col justify-center rounded-2xl border p-4 sm:p-6">
            <ActiveFlow key={active} />
            <p className="text-muted-foreground mt-4 text-center text-[11px]">
              Reviewed pull requests only. The agent never pushes to main.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
