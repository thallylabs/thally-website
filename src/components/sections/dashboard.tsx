"use client";

import { BarChart3, GitPullRequest, Palette, Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { SectionGrid, SectionHeader } from "@/components/section-decor";

const NAV_ITEMS = ["Home", "Analytics", "Agent readiness", "Docs tasks", "Team", "Branding", "Settings"];

const TOP_PAGES = [
  { page: "guides/getting-started", views: "4,218", width: "92%" },
  { page: "api/tokens", views: "2,871", width: "64%" },
  { page: "guides/webhooks", views: "1,940", width: "44%" },
];

const TASKS = [
  { title: "docs: document per-project webhook secrets", origin: "track" },
  { title: "docs: reverify auth guide after drift sweep", origin: "drift" },
];

const TEAM = [
  { name: "Amara", role: "Owner" },
  { name: "Daniel", role: "Editor" },
  { name: "Priya", role: "Viewer" },
];

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

        <motion.div
          className="border-border bg-card mt-10 overflow-hidden rounded-2xl border shadow-sm lg:mt-16"
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid sm:grid-cols-[160px_1fr]">
            <div className="border-border bg-muted/40 hidden border-r p-3 sm:block">
              <p className="text-muted-foreground px-2 pt-1 pb-2 font-mono text-[10px]">yourdocs.com/admin</p>
              <ul className="space-y-0.5">
                {NAV_ITEMS.map((item, i) => (
                  <li
                    key={item}
                    className={
                      i === 1
                        ? "bg-background rounded-md px-2 py-1.5 text-[11px] font-semibold shadow-sm"
                        : "text-muted-foreground px-2 py-1.5 text-[11px]"
                    }
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-3 p-4 lg:grid-cols-3 lg:p-5">
              <div className="border-border bg-background rounded-lg border p-3">
                <p className="text-[11px] font-semibold">Top pages · 7 days</p>
                <div className="mt-2.5 space-y-2">
                  {TOP_PAGES.map((row) => (
                    <div key={row.page}>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="truncate font-mono text-[10px]">{row.page}</span>
                        <span className="text-muted-foreground text-[10px]">{row.views}</span>
                      </div>
                      <div className="bg-muted mt-1 h-1 overflow-hidden rounded-full">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: "var(--chart-2)" }}
                          initial={reduce ? undefined : { width: 0 }}
                          whileInView={reduce ? undefined : { width: row.width }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground mt-3 text-[10px]">
                  3 search terms with no results ·{" "}
                  <span className="font-medium" style={{ color: "var(--chart-4)" }}>
                    content gaps
                  </span>
                </p>
              </div>

              <div className="border-border bg-background rounded-lg border p-3">
                <p className="text-[11px] font-semibold">Docs tasks</p>
                <div className="mt-2.5 space-y-2">
                  {TASKS.map((task) => (
                    <div key={task.title} className="border-border rounded-md border p-2">
                      <p className="truncate text-[10px] font-medium">{task.title}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <span
                          className="rounded-full px-1.5 py-0.5 font-mono text-[9px]"
                          style={{
                            background: "color-mix(in oklab, var(--chart-5) 14%, transparent)",
                            color: "var(--chart-5)",
                          }}
                        >
                          origin: {task.origin}
                        </span>
                        <span className="text-muted-foreground text-[9px]">awaiting review</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-border bg-background rounded-lg border p-3">
                <p className="text-[11px] font-semibold">Team</p>
                <div className="mt-2.5 space-y-2">
                  {TEAM.map((member) => (
                    <div key={member.name} className="flex items-center justify-between">
                      <span className="text-[11px] font-medium">{member.name}</span>
                      <span className="border-border text-muted-foreground rounded-full border px-2 py-0.5 text-[9px] font-medium">
                        {member.role}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground mt-3 text-[10px]">Roster committed to git · OIDC sign-in</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:mt-12">
          {POINTS.map((point) => {
            const Icon = point.icon;
            return (
              <div key={point.title} className="flex items-start gap-3.5">
                <span
                  className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: `color-mix(in oklab, ${point.accent} 15%, transparent)` }}
                >
                  <Icon className="size-4" style={{ color: point.accent }} strokeWidth={2.25} />
                </span>
                <p className="leading-snug font-semibold text-balance">
                  {point.title}{" "}
                  <span className="text-muted-foreground text-sm font-medium">{point.description}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
