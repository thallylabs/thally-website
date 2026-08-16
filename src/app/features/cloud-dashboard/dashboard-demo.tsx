"use client";

/**
 * Cloud Dashboard mock.
 *
 * A visual stand-in for Thally Cloud, mirroring the real app's shell: the
 * site switcher and Site nav from app-sidebar, and the Home layout of
 * greeting, metric row, "Site at a glance", and "Recent activity". Every
 * value is representative and no request is made; the sidebar is clickable so a
 * visitor can feel their way around the product.
 */

import { useState } from "react";

import {
  ArrowUpRight,
  Bell,
  Check,
  Cloud,
  Data,
  DocsAgent,
  ExternalLink,
  Leaf,
  Moon,
  Overview,
  Plus,
  Readiness,
  Search,
  Settings,
  type ThallyIcon,
  Track,
  Trust,
} from "@/components/icons";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Shell                                                               */
/* ------------------------------------------------------------------ */

const NAV: { icon: ThallyIcon; id: ViewId; label: string }[] = [
  { icon: Overview, id: "home", label: "Home" },
  { icon: Readiness, id: "readiness", label: "Readiness" },
  { icon: Data, id: "analytics", label: "Analytics" },
  { icon: DocsAgent, id: "questions", label: "Reader questions" },
  { icon: Track, id: "track", label: "Track" },
  { icon: Trust, id: "knowledge", label: "Knowledge" },
  { icon: Cloud, id: "deployments", label: "Deployments" },
  { icon: Settings, id: "settings", label: "Settings" },
];

type ViewId = "home" | "readiness" | "analytics" | "questions" | "track" | "knowledge" | "deployments" | "settings";

const CARD = "rounded-2xl border border-white/10 bg-white/[0.03]";
const MUTED = "text-white/55";

export function DashboardDemo() {
  const [view, setView] = useState<ViewId>("home");
  const active = NAV.find((item) => item.id === view) ?? NAV[0];

  return (
    <div className="overflow-hidden rounded-[26px] border border-white/12 bg-[#0a0c0a]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
        <span aria-hidden className="size-2.5 rounded-full bg-white/15" />
        <span aria-hidden className="size-2.5 rounded-full bg-white/15" />
        <span aria-hidden className="size-2.5 rounded-full bg-white/15" />
        <span className="mx-auto rounded-md bg-white/[0.06] px-3 py-1 font-mono text-[11px] text-white/55">
          app.thally.io/northstar
        </span>
      </div>

      <div className="md:grid md:grid-cols-[minmax(0,13.5rem)_minmax(0,1fr)]">
        {/* Sidebar: a left rail on desktop, a scrolling tab strip on phones */}
        <div className="border-white/10 max-md:border-b md:border-r">
          <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-3.5">
            <Leaf className="text-canvas-accent size-4 shrink-0" />
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-semibold text-white">Northstar</span>
              <span className={cn("block truncate font-mono text-[11px]", MUTED)}>Team plan</span>
            </span>
          </div>

          <nav
            aria-label="Dashboard sections"
            className="flex [scrollbar-width:none] gap-1 overflow-x-auto p-2 [-ms-overflow-style:none] md:flex-col [&::-webkit-scrollbar]:hidden"
          >
            {NAV.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === view;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setView(item.id)}
                  className={cn(
                    "flex min-h-10 shrink-0 items-center gap-2.5 rounded-lg px-3 text-[13px] whitespace-nowrap transition-colors md:w-full",
                    isActive
                      ? "bg-white/[0.07] font-medium text-white"
                      : "text-white/60 hover:bg-white/[0.04] hover:text-white",
                  )}
                >
                  <Icon className={cn("size-4 shrink-0", isActive && "text-canvas-accent")} />
                  {item.label}
                  {item.id === "track" && (
                    <span className="text-canvas-accent ml-auto hidden font-mono text-[11px] md:inline">3</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main */}
        <div className="min-w-0">
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
            <p className={cn("truncate text-[13px]", MUTED)}>
              Thally Cloud <span className="text-white/30">/</span> <span className="text-white">{active.label}</span>
            </p>
            <span className="ml-auto flex items-center gap-2 text-white/45">
              <span className="hidden items-center gap-1.5 rounded-md border border-white/10 px-2 py-1 font-mono text-[11px] sm:flex">
                <Search className="size-3" /> ⌘K
              </span>
              <Bell className="size-4" />
              <Moon className="size-4" />
            </span>
          </div>

          <div className="min-h-[26rem] p-4 sm:p-6">
            <View id={view} />
          </div>
        </div>
      </div>
    </div>
  );
}

function View({ id }: { id: ViewId }) {
  if (id === "home") return <HomeView />;
  if (id === "readiness") return <ReadinessView />;
  if (id === "analytics") return <AnalyticsView />;
  if (id === "questions") return <QuestionsView />;
  if (id === "track") return <TrackView />;
  if (id === "knowledge") return <KnowledgeView />;
  if (id === "deployments") return <DeploymentsView />;
  return <SettingsView />;
}

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

function PageHead({ action, sub, title }: { action?: string; sub: string; title: string }) {
  return (
    <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-white sm:text-2xl">{title}</h3>
        <p className={cn("mt-1 text-[13px]", MUTED)}>{sub}</p>
      </div>
      {action && (
        <span className="text-canvas inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg bg-white px-3.5 text-[13px] font-semibold">
          <Plus className="size-3.5" />
          {action}
        </span>
      )}
    </header>
  );
}

function Panel({ children, link, title }: { children: React.ReactNode; link?: string; title: string }) {
  return (
    <section className={cn(CARD, "overflow-hidden")}>
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <h4 className="font-display text-[13px] font-bold text-white">{title}</h4>
        {link && <span className="text-canvas-accent text-[12px] font-semibold">{link}</span>}
      </div>
      {children}
    </section>
  );
}

/** One label/value line, the shape the real Site-at-a-glance list uses. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-white/[0.07] py-2.5 last:border-b-0">
      {/* the label column is fixed only once there is room for it */}
      <dt className={cn("w-full text-[12px] sm:w-[8.5rem] sm:shrink-0", MUTED)}>{label}</dt>
      <dd className="min-w-0 flex-1 text-[13px] font-medium break-words text-white">{children}</dd>
    </div>
  );
}

function List({ items }: { items: { meta: string; right?: string; title: string }[] }) {
  return (
    <ul className="divide-y divide-white/[0.07]">
      {items.map((item) => (
        <li key={item.title} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3">
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-medium text-white">{item.title}</span>
            <span className={cn("mt-0.5 block truncate text-[12px]", MUTED)}>{item.meta}</span>
          </span>
          {item.right && <span className={cn("shrink-0 font-mono text-[11px]", MUTED)}>{item.right}</span>}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Views                                                               */
/* ------------------------------------------------------------------ */

const METRICS = [
  { hint: "Grade A · live report", label: "Agent readiness", suffix: "/ 100", value: "93" },
  { hint: "17 product changes checked this week", label: "Changes checked · 7 days", value: "17" },
  { hint: "5 successful · 1 awaiting review", label: "Publish activity · 7 days", value: "6" },
  { hint: "Reader questions completed by Ask AI", label: "Reader questions · month", value: "263" },
];

function HomeView() {
  return (
    <>
      <PageHead
        action="Create a site"
        sub="See what's live, what changed, and what needs attention across Northstar."
        title="Morning, Lina."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((metric) => (
          <article key={metric.label} className={cn(CARD, "flex min-h-[6.5rem] flex-col p-3.5")}>
            <div className="flex items-start justify-between gap-2">
              <p className={cn("text-[12px] font-medium", MUTED)}>{metric.label}</p>
              <ArrowUpRight className="size-3.5 shrink-0 text-white/25" />
            </div>
            <p className="font-display mt-2.5 text-[1.5rem] leading-none font-extrabold tracking-[-0.03em] text-white tabular-nums">
              {metric.value}
              {metric.suffix && <span className={cn("ml-1 text-sm font-semibold", MUTED)}>{metric.suffix}</span>}
            </p>
            <p className={cn("mt-auto pt-2 text-[11px] leading-4", MUTED)}>{metric.hint}</p>
          </article>
        ))}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Panel title="Site at a glance" link="Site settings">
          <div className="px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="bg-canvas-accent/15 flex size-10 shrink-0 items-center justify-center rounded-xl">
                <Leaf className="text-canvas-accent size-5" />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-2">
                  <span className="font-display truncate text-[15px] font-bold text-white">Northstar Docs</span>
                  <span className="text-canvas-accent flex items-center gap-1.5 text-[11px] font-semibold">
                    <span className="bg-canvas-accent size-1.5 rounded-full" />
                    Live
                  </span>
                </span>
                <span className={cn("mt-0.5 flex items-center gap-1.5 font-mono text-[11px]", MUTED)}>
                  docs.northstar.dev
                  <ExternalLink className="size-3 shrink-0" />
                </span>
              </span>
            </div>

            <dl className="mt-3">
              <Row label="Last deployment">
                8m ago <span className={cn("ml-1 font-mono text-[11px]", MUTED)}>main@6f3a91c</span>
              </Row>
              <Row label="Primary domain">
                <span className="font-mono text-[12px]">docs.northstar.dev</span>
              </Row>
              <Row label="Repository">
                <span className="font-mono text-[12px]">northstar-labs/docs</span>
              </Row>
              <Row label="Endpoints">
                <span className="font-mono text-[12px]">JSON · MD · JSON-LD</span>
              </Row>
            </dl>
          </div>
        </Panel>

        <Panel title="Recent activity" link="View deployments">
          <List
            items={[
              {
                meta: "Readiness check analyzed 128 published pages · just now",
                title: "Agent readiness scored 93 / 100",
              },
              { meta: "Successful · 6f3a91c · 8m ago", title: "docs: document token rotation" },
              { meta: "Successful · 14c82ad · yesterday", title: "docs: add webhook signature guide" },
            ]}
          />
        </Panel>
      </div>
    </>
  );
}

const READINESS_CHECKS = [
  { meta: "Every page resolves without JavaScript", right: "pass", title: "Crawlable HTML" },
  { meta: "128 entries, refreshed on publish", right: "pass", title: "llms.txt published" },
  { meta: "Served at /api/mcp, read-only", right: "pass", title: "MCP endpoint" },
  { meta: "JSON and Markdown on every route", right: "pass", title: "Content negotiation" },
  { meta: "6 pages missing a canonical source ref", right: "warn", title: "Provenance coverage" },
];

function ReadinessView() {
  return (
    <>
      <PageHead sub="How well your docs serve human and machine readers." title="Readiness" />
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <article className={cn(CARD, "flex flex-col justify-center p-5")}>
          <p className={cn("text-[12px] font-medium", MUTED)}>Overall score</p>
          <p className="font-display mt-2 text-[2.75rem] leading-none font-extrabold tracking-[-0.03em] text-white tabular-nums">
            93<span className={cn("ml-1 text-lg font-semibold", MUTED)}>/ 100</span>
          </p>
          <p className="text-canvas-accent mt-2 text-[13px] font-semibold">Grade A</p>
          <p className={cn("mt-1 text-[12px]", MUTED)}>Gate your CI on this score.</p>
        </article>
        <Panel title="Checks" link="Full report">
          <List items={READINESS_CHECKS} />
        </Panel>
      </div>
    </>
  );
}

const ANALYTICS_TILES = [
  { label: "Total page views", note: "across the selected range", value: "12.7k" },
  { label: "People", note: "63.4% of views", value: "8.1k" },
  { label: "AI tools", note: "36.6% of views", value: "4.6k" },
  { label: "AI discovery requests", note: "llms.txt · ai.txt · mcp", value: "1.3k" },
];

function AnalyticsView() {
  return (
    <>
      <PageHead sub="Traffic and engagement across people and AI tools." title="Audience" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ANALYTICS_TILES.map((tile) => (
          <article key={tile.label} className={cn(CARD, "p-3.5")}>
            <p className={cn("text-[12px] font-medium", MUTED)}>{tile.label}</p>
            <p className="font-display mt-2 text-[1.5rem] leading-none font-extrabold tracking-[-0.03em] text-white tabular-nums">
              {tile.value}
            </p>
            <p className={cn("mt-2 text-[11px]", MUTED)}>{tile.note}</p>
          </article>
        ))}
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <Panel title="Top pages · people">
          <List
            items={[
              { meta: "/customization", right: "1,204", title: "Customization" },
              { meta: "/quickstart", right: "1,109", title: "Quickstart" },
              { meta: "/components", right: "947", title: "Components" },
            ]}
          />
        </Panel>
        <Panel title="Top pages · AI tools">
          <List
            items={[
              { meta: "/llms.txt", right: "2,318", title: "Agent index" },
              { meta: "/quickstart.md", right: "1,880", title: "Quickstart (Markdown)" },
              { meta: "/api/mcp", right: "1,412", title: "MCP endpoint" },
            ]}
          />
        </Panel>
      </div>
    </>
  );
}

function QuestionsView() {
  return (
    <>
      <PageHead sub="What readers asked Ask AI, and what it answered from." title="Reader questions" />
      <Panel title="This month" link="Export">
        <List
          items={[
            {
              meta: "Answered from /sdk/configuration · 2 sources",
              right: "48",
              title: "What's the default request timeout?",
            },
            { meta: "Answered from /sdk/errors · 1 source", right: "31", title: "How do I catch a timeout error?" },
            {
              meta: "Answered from /guides/retries · 3 sources",
              right: "27",
              title: "Does the client retry failed requests?",
            },
            { meta: "No grounded answer · gap flagged", right: "12", title: "Can I self-host the search index?" },
          ]}
        />
      </Panel>
    </>
  );
}

function TrackView() {
  return (
    <>
      <PageHead sub="Product changes Thally checked, and the drafts they produced." title="Track" />
      <Panel title="Awaiting your review" link="Review all">
        <List
          items={[
            {
              meta: "from platform #482 · /sdk/configuration · high",
              right: "2m",
              title: "docs: default timeout is now 60s",
            },
            {
              meta: "from platform #482 · /sdk/errors · high",
              right: "2m",
              title: "docs: document TimeoutError class",
            },
            { meta: "from cli #77 · /cli/export · medium", right: "1h", title: "docs: new --json flag on export" },
          ]}
        />
      </Panel>
      <p className={cn("mt-3 text-[12px]", MUTED)}>Nothing publishes until a human approves it.</p>
    </>
  );
}

function KnowledgeView() {
  return (
    <>
      <PageHead sub="The internal sources Thally reads when it drafts." title="Knowledge" />
      <Panel title="Connected sources" link="Connect">
        <List
          items={[
            { meta: "northstar-labs/docs · default branch", right: "synced", title: "GitHub" },
            { meta: "Product spec space", right: "synced", title: "Notion" },
            { meta: "#product-releases", right: "synced", title: "Slack" },
            { meta: "Support macros", right: "paused", title: "Zendesk" },
          ]}
        />
      </Panel>
    </>
  );
}

function DeploymentsView() {
  return (
    <>
      <PageHead sub="Every publish, with the commit behind it." title="Deployments" />
      <Panel title="Recent" link="View all">
        <List
          items={[
            { meta: "Successful · main@6f3a91c · 8m ago", right: "18s", title: "docs: document token rotation" },
            { meta: "Successful · main@14c82ad · yesterday", right: "22s", title: "docs: add webhook signature guide" },
            { meta: "Successful · main@90b6e32 · 3d ago", right: "17s", title: "docs: add API reference tab" },
          ]}
        />
      </Panel>
    </>
  );
}

const SETTINGS_ROWS = [
  { label: "Site name", value: "Northstar Docs" },
  { label: "Primary domain", value: "docs.northstar.dev" },
  { label: "Plan", value: "Team · 3 members included" },
  { label: "Agent access", value: "Public · llms.txt, MCP, JSON" },
];

function SettingsView() {
  return (
    <>
      <PageHead sub="Workspace, domain, plan, and what agents may read." title="Settings" />
      <Panel title="Workspace">
        <div className="px-4 py-2">
          <dl>
            {SETTINGS_ROWS.map((row) => (
              <Row key={row.label} label={row.label}>
                {row.value}
              </Row>
            ))}
          </dl>
        </div>
      </Panel>
      <p className={cn("mt-3 flex items-center gap-2 text-[12px]", MUTED)}>
        <Check className="text-canvas-accent size-3.5 shrink-0" />
        Your content stays in your repository.
      </p>
    </>
  );
}
