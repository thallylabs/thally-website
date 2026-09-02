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
    title: "Create your docs site. Connect what should follow it.",
    body: "Create your documentation site on Thally, install the read-only GitHub App on the product repos to watch, then connect the surfaces those repos should keep current: your website, help center, support platform, and other customer-facing content repos.",
    icon: GitBranch,
  },
  {
    number: "02.",
    label: "Understand the change",
    title: "Work out what the change means before touching a word.",
    body: "Did an authentication flow change? Was a configuration option renamed? Did an endpoint gain a field, or a method get deprecated? Thally reads the merged change and works out what it means for the people using your product.",
    icon: Track,
  },
  {
    number: "03.",
    label: "Trace the impact",
    title: "Find every surface the change contradicts.",
    body: "Thally traces the change across your docs, website, help center, and changelog, and lists each affected page with a confidence score and the evidence behind it. When nothing needs to change, it says so.",
    icon: Structured,
  },
  {
    number: "04.",
    label: "Review evidence-backed PRs",
    title: "You approve what ships. Every surface. Every time.",
    body: "Thally opens a pull request into your docs and every other affected surface, with the completed update and the evidence that justifies it. Your team verifies what changed, where it came from, and why, then merges. Nothing publishes without a human.",
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
            One product change. Every surface, updated.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mt-5 text-lg text-white/90">
              Thally watches the repos you choose, works out what each merge means, and drafts only the updates the
              evidence supports, wherever they need to land.
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
                    aria-hidden="true"
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
                    aria-expanded={active === i}
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
                      aria-hidden={active !== i}
                      initial={false}
                      animate={{
                        height: active === i || reduced ? "auto" : 0,
                        opacity: active === i || reduced ? 1 : 0,
                      }}
                      transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-md pt-3 text-[15px] leading-relaxed tracking-[-0.03em] text-[#afafaf]">
                        <span className="sr-only">{stage.title}. </span>
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
      <Panel title="acme · Thally workspace" icon={<SiGithub className="size-4 text-white/45" />} status="connected">
        <p className="px-1 text-[10px] font-semibold tracking-widest text-white/35 uppercase">Watching</p>
        {["acme/api", "acme/sdk-js"].map((repo) => (
          <div key={repo} className={rowBase}>
            <span className="bg-canvas-accent size-1.5 shrink-0 rounded-full" />
            <span className="truncate font-mono text-xs text-white/85">{repo}</span>
            <SurfaceTag kind="product repo" />
          </div>
        ))}
        <p className="px-1 pt-2 text-[10px] font-semibold tracking-widest text-white/35 uppercase">Keeps in sync</p>
        {(
          [
            ["acme/docs", "docs site", "Thally"],
            ["acme/website", "website", "Next.js repo"],
            ["Help center", "support", "Zendesk"],
            ["acme/docs/changelog", "changelog", "Thally"],
          ] as const
        ).map(([name, kind, destination]) => (
          <div key={name} className={rowBase}>
            <span className="bg-canvas-accent size-1.5 shrink-0 rounded-full" />
            <span className="truncate font-mono text-xs text-white/85">{name}</span>
            <SurfaceTag kind={kind} />
            <span className="shrink-0 text-[10px] text-white/40 sm:ml-auto">{destination}</span>
          </div>
        ))}
        <p className="border-t border-white/[0.06] px-1 pt-2.5 text-[11px] text-white/40">
          Runs on merge by default. Or on PR open, or on a schedule.
        </p>
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
        <p className="px-1 text-[10px] font-semibold tracking-widest text-white/35 uppercase">
          What this means for users
        </p>
        {(
          [
            ["Endpoint gained a field", "POST /v1/projects now accepts webhook_secret", "public API"],
            ["Behaviour changed", "Secrets are scoped per project, not per account", "breaking"],
            ["Method deprecated", "GET /v1/account/webhook-secret returns 410 after 1 Oct", "deprecation"],
            ["Config option renamed", "WEBHOOK_SECRET is now THALLY_WEBHOOK_SECRET in the SDK", "sdk"],
          ] as const
        ).map(([change, meaning, kind]) => (
          <div key={change} className={rowBase}>
            <Check className="text-canvas-accent size-3.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-white/80">{change}</p>
              <p className="truncate font-mono text-[10px] text-white/40">{meaning}</p>
            </div>
            <SurfaceTag kind={kind} />
          </div>
        ))}
        <p className="border-t border-white/[0.06] px-1 pt-2.5 text-[11px] leading-relaxed text-white/55">
          Evidence gathered from the diff, the tests, and the PR thread.
        </p>
      </Panel>
    );
  }

  if (index === 2) {
    return (
      <Panel
        title="acme/api#517 · impact"
        icon={<Structured className="text-canvas-accent size-4" />}
        status="4 surfaces"
      >
        {(
          [
            ["guides/webhooks.mdx", "docs", "0.94", "update needed"],
            ["api/projects.mdx", "docs", "0.87", "update needed"],
            ["website: /features/webhooks", "website", "0.81", "update needed"],
            ["Help center: Rotating webhook secrets", "support", "0.76", "update needed"],
            ["changelog", "changelog", "0.99", "new entry"],
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
                  verdict !== "no change" ? "bg-canvas-accent/15 text-canvas-accent" : "bg-white/[0.07] text-white/45",
                )}
              >
                {verdict}
              </span>
            </span>
          </div>
        ))}
        <p className="border-t border-white/[0.06] px-1 pt-2.5 text-[11px] text-white/40">
          Each verdict links to the lines in the diff that justify it.
        </p>
      </Panel>
    );
  }

  return (
    <Panel title="Pull requests opened" icon={<GitPullRequest className="text-canvas-accent size-4" />} status="review">
      {(
        [
          ["acme/docs #292", "docs", "2 files", "1 of 2 approvals"],
          ["acme/website #148", "website", "1 file", "awaiting review"],
          ["Help center draft", "support", "1 article", "awaiting review"],
        ] as const
      ).map(([pr, kind, files, review]) => (
        <div key={pr} className={rowBase}>
          <GitPullRequest className="text-canvas-accent size-3.5 shrink-0" />
          <span className="truncate font-mono text-[11px] text-white/85">{pr}</span>
          <SurfaceTag kind={kind} />
          <span className="ml-auto flex shrink-0 items-center gap-1.5 text-[10px] text-white/35">
            <span>{files}</span>
            <span>· {review}</span>
          </span>
        </div>
      ))}
      <div className="rounded-xl border border-white/[0.07] bg-black/45 p-3 font-mono text-[11px] leading-[1.7]">
        <p className="text-white/25">@@ guides/webhooks.mdx +18 -6 · evidence: api/projects.ts L41-58</p>
        <p className="text-[#c48b95]">- Webhook secrets are shared across projects.</p>
        <p className="text-canvas-accent">+ Each project now has its own webhook secret.</p>
        <p className="text-canvas-accent">+ Rotate secrets from Project Settings.</p>
      </div>
      {/* Static action bar, rendered as spans so the hidden layers stay untabbable */}
      <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-3">
        <span className="bg-canvas-accent text-canvas rounded-lg px-3.5 py-2 text-xs font-semibold">
          Approve and merge
        </span>
        <span className="rounded-lg border border-white/15 px-3.5 py-2 text-xs font-medium text-white/70">
          Request changes
        </span>
      </div>
      <p className="px-1 pt-1 text-[11px] text-white/40">Nothing publishes until a human approves it.</p>
    </Panel>
  );
}
