"use client";

import { BarChart3, GitPullRequest, Palette, Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import { SectionGrid, SectionHeader } from "@/components/section-decor";

const POINTS = [
  {
    icon: Palette,
    title: "Rebrand without a rebuild.",
    description:
      "Themes, accent colors, and per-mode logos apply to the live site the moment an Owner saves them. No merge, no redeploy.",
    accent: "var(--chart-1)",
  },
  {
    icon: BarChart3,
    title: "Analytics that point at gaps.",
    description:
      "First-party traffic, top pages, and the search terms that returned nothing, so you know exactly which page to write next.",
    accent: "var(--chart-2)",
  },
  {
    icon: GitPullRequest,
    title: "A queue for agent-drafted PRs.",
    description:
      "Every docs task the agent produces, from Track, drift sweeps, or @thally mentions, waits here for human review.",
    accent: "var(--chart-5)",
  },
  {
    icon: Users,
    title: "Roles from a git-committed roster.",
    description:
      "Owner, Editor, and Viewer access lives in your repo and goes through code review. OIDC sign-in, no database, no per-seat fees.",
    accent: "var(--chart-4)",
  },
];

export const Dashboard = () => {
  const reduce = useReducedMotion();

  return (
    <section id="dashboard" className="bg-accent relative py-16 md:py-24 lg:py-32">
      <SectionGrid className="opacity-20" mask="radial-gradient(ellipse_at_top,black,transparent_75%)" />

      <div className="relative container">
        <SectionHeader
          title="Mission control, built in"
          description="Every deploy ships an admin dashboard at /admin. Branding, analytics, team access, and the agent's PR queue all live in one place and change the live site instantly."
        />

        <div className="relative mt-10 lg:mt-16" style={{ perspective: 1400 }}>
          <motion.div
            className="border-border bg-secondary/50 rounded-[1.25rem] border p-1.5 shadow-sm"
            initial={reduce ? undefined : { opacity: 0, y: 40, rotateX: 7, scale: 0.97 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="overflow-hidden rounded-[calc(1.25rem-6px)] border border-white/10 bg-[oklch(0.16_0.015_260)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
              <div className="relative flex items-center gap-1.5 border-b border-white/[0.07] px-4 py-3">
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="absolute left-1/2 -translate-x-1/2 rounded-md bg-white/5 px-3 py-1 font-mono text-[10px] text-white/50">
                  yourdocs.com/admin
                </span>
              </div>
              <Image
                src="/images/admin-dashboard.png"
                alt="Thally admin dashboard, Analytics view: human and agent traffic, engagement, and top pages"
                width={2000}
                height={1054}
                className="w-full"
                sizes="(max-width: 1400px) 100vw, 1400px"
              />
            </div>
          </motion.div>

          <motion.div
            aria-hidden
            className="border-border bg-card absolute -bottom-8 -left-4 z-10 w-60 rounded-xl border p-3.5 shadow-lg shadow-black/10 max-lg:hidden xl:-left-8"
            initial={reduce ? undefined : { opacity: 0, y: 16, scale: 0.92 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1, rotate: -2 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: "spring", stiffness: 240, damping: 24, delay: 0.45 }}
          >
            <div className="text-muted-foreground flex items-center gap-1.5 text-[10px] font-medium tracking-wide uppercase">
              <GitPullRequest className="size-3" style={{ color: "var(--chart-5)" }} />
              Docs task
            </div>
            <p className="mt-2 text-[11px] leading-snug font-medium">docs: reverify auth guide after drift sweep</p>
            <div className="mt-2 flex items-center justify-between">
              <span
                className="rounded-full px-1.5 py-0.5 font-mono text-[9px]"
                style={{
                  background: "color-mix(in oklab, var(--chart-5) 14%, transparent)",
                  color: "var(--chart-5)",
                }}
              >
                origin: drift
              </span>
              <span className="text-muted-foreground text-[9px]">awaiting review</span>
            </div>
          </motion.div>

          <motion.div
            aria-hidden
            className="border-border bg-card absolute -top-6 -right-4 z-10 w-52 rounded-xl border p-3.5 shadow-lg shadow-black/10 max-lg:hidden xl:-right-8"
            initial={reduce ? undefined : { opacity: 0, y: -12, scale: 0.92 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1, rotate: 2 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: "spring", stiffness: 240, damping: 24, delay: 0.65 }}
          >
            <div className="text-muted-foreground flex items-center gap-1.5 text-[10px] font-medium tracking-wide uppercase">
              <Palette className="size-3" style={{ color: "var(--chart-1)" }} />
              Branding saved
            </div>
            <div className="mt-2.5 flex items-center gap-1.5">
              {["var(--chart-1)", "var(--chart-2)", "var(--chart-5)"].map((swatch) => (
                <span
                  key={swatch}
                  className="border-border size-4 rounded-full border"
                  style={{ background: swatch }}
                />
              ))}
            </div>
            <p className="text-muted-foreground mt-2 text-[10px] leading-snug">
              Applied to the live site. No redeploy.
            </p>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:mt-20">
          {POINTS.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                className="flex items-start gap-3.5"
                initial={reduce ? undefined : { opacity: 0, y: 14 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: `color-mix(in oklab, ${point.accent} 15%, transparent)` }}
                >
                  <Icon className="size-4" style={{ color: point.accent }} strokeWidth={2.25} />
                </span>
                <p className="leading-snug font-semibold text-balance">
                  {point.title} <span className="text-muted-foreground text-sm font-medium">{point.description}</span>
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
