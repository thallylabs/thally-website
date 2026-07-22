"use client";

import { Check, Command, Zap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";

import { Avatar, Label } from "@/components/illustrations/thally-ui";
import { SectionGrid, SectionHeader } from "@/components/section-decor";
import { cn } from "@/lib/utils";

type ItemType = {
  title: string;
  description: string;
  illustration: ReactNode;
  className?: string;
};

function ReadinessScoreCard() {
  const reduce = useReducedMotion();
  return (
    <div className="-mx-6 mt-auto -mb-6 h-56 w-[calc(100%+3rem)]">
      <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="score-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-5)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--chart-5)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[30, 60, 90].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="400"
            y2={y}
            stroke="var(--border)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path
          d="M0 30 L400 30"
          stroke="var(--muted-foreground)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M0 100 C 100 94, 152 84, 208 66 S 312 32, 400 22 L400 120 L0 120 Z"
          fill="url(#score-fill)"
          initial={reduce ? undefined : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
        <motion.path
          d="M0 100 C 100 94, 152 84, 208 66 S 312 32, 400 22"
          stroke="var(--chart-5)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? undefined : { pathLength: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

function AutomationCard() {
  const rules = [
    { when: "Push to main", then: "Rebuild graph" },
    { when: "Spec changes", then: "Regen API docs" },
    { when: "Broken link", then: "Fail CI" },
    { when: "@thally comment", then: "Draft docs PR" },
    { when: "Product PR merged", then: "Docs PR via Thally" },
  ];
  const reduce = useReducedMotion();
  return (
    <div className="space-y-2">
      {rules.map((r, i) => (
        <motion.div
          key={r.when}
          className="border-border bg-background flex items-center gap-2 rounded-lg border p-2 text-[11px]"
          initial={reduce ? undefined : { opacity: 0, x: -8 }}
          whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.35, delay: i * 0.1 }}
        >
          <Zap className="text-chart-4 size-3.5 shrink-0" />
          <span className="text-muted-foreground">When</span>
          <span className="font-medium">{r.when}</span>
          <span className="text-muted-foreground">→</span>
          <span
            className="rounded px-1.5 py-0.5 font-medium"
            style={{
              background: "color-mix(in oklab, var(--chart-2) 18%, transparent)",
              color: "var(--chart-2)",
            }}
          >
            {r.then}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function PaletteCard() {
  const cmds = ["Search the docs", "Ask Thally AI", "Copy page as Markdown"];
  return (
    <div className="border-border bg-background overflow-hidden rounded-lg border">
      <div className="border-border flex items-center gap-2 border-b px-3 py-2">
        <Command className="text-muted-foreground size-3.5" />
        <span className="text-muted-foreground text-[11px]">Type a command…</span>
        <span className="border-border text-muted-foreground ml-auto rounded border px-1 text-[9px]">⌘K</span>
      </div>
      <div className="p-1.5">
        {cmds.map((c, i) => (
          <div
            key={c}
            className={cn(
              "flex items-center justify-between rounded-md px-2 py-1.5 text-[11px]",
              i === 0 && "font-medium",
            )}
            style={
              i === 0
                ? {
                    background: "color-mix(in oklab, var(--chart-3) 15%, transparent)",
                    color: "var(--chart-3)",
                  }
                : undefined
            }
          >
            {c}
            {i === 0 && <span className="text-[9px]">↵</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatCard() {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <Avatar initials="MR" i={2} />
        <div className="bg-muted rounded-lg rounded-tl-none px-2.5 py-1.5 text-[11px]">How do I rotate API tokens?</div>
      </div>
      <div className="flex items-start justify-end gap-2">
        <div
          className="rounded-lg rounded-tr-none px-2.5 py-1.5 text-[11px] font-medium"
          style={{
            background: "color-mix(in oklab, var(--chart-1) 15%, transparent)",
            color: "var(--chart-1)",
          }}
        >
          Per project, zero downtime. See Authentication §2.
        </div>
        <Avatar initials="T" i={0} />
      </div>
    </div>
  );
}

function BuildReportCard() {
  const items = ["142 links validated", "llms.txt regenerated", "Embeddings refreshed"];
  return (
    <div className="border-border bg-background rounded-lg border p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-semibold">Build #214</span>
        <Label name="agent-ready" />
      </div>
      <div className="space-y-1.5">
        {items.map((it) => (
          <div key={it} className="flex items-center gap-2 text-[11px]">
            <span
              className="flex size-4 items-center justify-center rounded-full"
              style={{ background: "var(--chart-5)" }}
            >
              <Check className="size-2.5 text-white" />
            </span>
            <span className="text-muted-foreground">{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const ITEMS: ItemType[] = [
  {
    title: "A readiness score you can gate CI on.",
    description:
      "Get a deterministic 0 to 100 grade on every build, with the exact pages lowering it. The agent turns failed checks into fix PRs.",
    illustration: <ReadinessScoreCard />,
    className: "md:col-span-3 md:row-span-3",
  },
  {
    title: "Docs maintenance, drafted for review.",
    description:
      "Builds validate links and resync your spec. After setup, relevant product changes and mentions can become docs PRs your team reviews.",
    illustration: <AutomationCard />,
    className: "md:col-span-3 md:row-span-3 md:col-start-4",
  },
  {
    title: "Search without leaving the docs.",
    description:
      "⌘K combines full-text and vector recall on one index, with no third-party search service to configure.",
    illustration: <PaletteCard />,
    className: "md:col-span-2 md:row-span-2 md:row-start-4",
  },
  {
    title: "Answers with receipts.",
    description: "Grounded chat quotes your docs with inline citations, and refuses to guess.",
    illustration: <ChatCard />,
    className: "md:col-span-2 md:row-span-2 md:col-start-3 md:row-start-4",
  },
  {
    title: "Every build gets a report card.",
    description: "Checks run on every deploy and flag stale or incomplete pages before they reach machine readers.",
    illustration: <BuildReportCard />,
    className: "md:col-span-2 md:row-span-2 md:col-start-5 md:row-start-4",
  },
];

export const Feature2 = () => {
  return (
    <section id="features" className="bg-accent relative py-16 md:py-24 lg:py-32">
      <SectionGrid className="opacity-20" mask="radial-gradient(ellipse_at_center,black,transparent_80%)" />

      <div className="relative container">
        <SectionHeader
          title="Docs that hold up for both audiences"
          description="Write once in MDX. Thally structures it for agents, typesets it for readers, and keeps both honest with checks on every build."
        />

        <div className="mt-8 grid grid-cols-1 gap-4 md:mt-12 md:auto-rows-fr md:grid-cols-6 md:grid-rows-5 lg:mt-20">
          {ITEMS.map((item, i) => (
            <Item key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Item = ({ title, description, illustration, className }: ItemType) => {
  return (
    <div
      className={cn(
        "border-border bg-card relative flex flex-col gap-4 overflow-hidden rounded-2xl border p-6 max-md:min-h-[320px]",
        className,
      )}
    >
      <div
        aria-hidden
        className="border-border/50 pointer-events-none absolute top-0 right-0 size-12 border-t border-r"
      />
      <h3 className="leading-tight font-semibold text-balance">
        {title} <span className="text-muted-foreground font-medium">{description}</span>
      </h3>
      <div className="mt-auto">{illustration}</div>
    </div>
  );
};
