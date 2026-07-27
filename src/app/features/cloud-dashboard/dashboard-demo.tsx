"use client";

/**
 * Cloud Dashboard mock: a tabbed dashboard frame with deterministic data.
 * No network calls; every panel renders fixed mock content from the handoff.
 */

import { useId, useRef, useState } from "react";

import {
  Check,
  Data,
  GitPullRequest,
  Json,
  Leaf,
  Mcp,
  Overview,
  Plus,
  RefreshCw,
  Settings,
  Team,
} from "@/components/icons";

import styles from "./cloud-dashboard-page.module.css";

const TABS = [
  { icon: Overview, id: "overview", label: "Overview" },
  { badge: "5", icon: GitPullRequest, id: "drafts", label: "Drafts" },
  { icon: Data, id: "analytics", label: "Analytics" },
  { icon: Mcp, id: "agent", label: "Agent context" },
  { icon: Team, id: "team", label: "Team" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const OVERVIEW_STATS = [
  { dotClass: styles.statDotSuccess, label: "Live sites", meta: "all healthy", value: "3" },
  { dotClass: styles.statDotWarn, label: "Pending drafts", meta: "2 high confidence", value: "5" },
  { dotClass: styles.statDotForest, delta: "+6", label: "Agent-readiness", meta: "this week", value: "82" },
  { dotClass: styles.statDotFaint, label: "Pages", meta: "across all sites", value: "341" },
];

const OVERVIEW_ACTIVITY = [
  { dotClass: styles.rowDotRev, mono: "docs: default timeout is now 60s", prefix: "Drafted ", time: "2m" },
  { dotClass: styles.rowDotOk, mono: "docs: document TimeoutError", prefix: "Published ", time: "4m" },
  { dotClass: styles.rowDotOk, mono: "jahce.thally.site", prefix: "Deployed ", suffix: " to 6 regions", time: "1h" },
  { dotClass: styles.rowDotNeutral, mono: "llms.txt", prefix: "Refreshed ", suffix: " for 128 pages", time: "1h" },
];

const DRAFTS = [
  { meta: "from bono #482 · /sdk/configuration · high", time: "2m", title: "docs: default timeout is now 60s" },
  { meta: "from bono #482 · /sdk/errors · high", time: "2m", title: "docs: document TimeoutError class" },
  { meta: "from bono #482 · /guides/retries · medium", time: "2m", title: "docs: retry uses exponential backoff" },
  { meta: "from leaflet #77 · /cli/export · high", time: "1h", title: "docs: new --json flag on export" },
  { meta: "from homesend #310 · /api/webhooks · medium", time: "3h", title: "docs: webhook payload adds retry_count" },
];

const CHART_BARS = [
  { height: 40 },
  { height: 58 },
  { height: 47 },
  { height: 72, highlighted: true },
  { height: 63 },
  { height: 80 },
  { height: 95, highlighted: true },
  { height: 70 },
];

const CHART_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];

const TOP_PAGES = [
  { meta: "4,281 reads · 38% via agents", path: "/sdk/configuration" },
  { meta: "3,904 reads · 12% via agents", path: "/guides/quickstart" },
  { meta: "2,157 reads · 51% via agents", path: "/sdk/errors" },
];

const AGENT_CONTEXT = [
  { icon: Mcp, mono: "mcp.thally.dev/jahce/dabs", status: "live", statusLabel: "Live", title: "MCP endpoint" },
  { icon: Mcp, mono: "jahce.thally.site/llms.txt · 128 pages", status: "live", statusLabel: "Live", title: "llms.txt" },
  {
    icon: Json,
    mono: "exposed on every page · read-only",
    status: "live",
    statusLabel: "Live",
    title: "Structured JSON",
  },
  {
    icon: RefreshCw,
    mono: "re-generating after bono #482",
    status: "sync",
    statusLabel: "Syncing",
    title: "Freshness sync",
  },
] as const;

const TEAM_MEMBERS = [
  { dotClass: styles.rowDotOk, meta: "kenny@thally.dev", name: "Kenny Ihenacho", role: "Owner" },
  { dotClass: styles.rowDotOk, meta: "ada@thally.dev", name: "Ada Nwosu", role: "Maintainer · approves drafts" },
  { dotClass: styles.rowDotOk, meta: "diego@thally.dev", name: "Diego Martín", role: "Editor" },
  { dotClass: styles.rowDotNeutral, meta: "automation · opens drafts", name: "thally-bot", role: "Service account" },
];

export function DashboardDemo() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const tabRefs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({});
  const baseId = useId();

  const tabId = (id: TabId) => `${baseId}-tab-${id}`;
  const panelId = (id: TabId) => `${baseId}-panel-${id}`;

  const selectTab = (id: TabId) => {
    setActiveTab(id);
    tabRefs.current[id]?.focus();
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = TABS.findIndex((tab) => tab.id === activeTab);
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      selectTab(TABS[(currentIndex + 1) % TABS.length].id);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectTab(TABS[(currentIndex - 1 + TABS.length) % TABS.length].id);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectTab(TABS[0].id);
    } else if (event.key === "End") {
      event.preventDefault();
      selectTab(TABS[TABS.length - 1].id);
    }
  };

  const panelProps = (id: TabId) => ({
    "aria-labelledby": tabId(id),
    className: styles.panel,
    id: panelId(id),
    role: "tabpanel" as const,
  });

  return (
    <div className={styles.dashframe}>
      <div className={styles.frameBar}>
        <span aria-hidden="true" className={styles.frameDots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.frameUrl}>cloud.thally.dev/jahce</span>
      </div>
      <div className={styles.dash}>
        <div className={styles.sidebar}>
          <div className={styles.workspace}>
            <span aria-hidden="true" className={styles.workspaceLogo}>
              <Leaf />
            </span>
            <span className={styles.workspaceText}>
              <b>jahce</b>
              <span>Team plan</span>
            </span>
          </div>
          <div aria-label="Dashboard views" aria-orientation="vertical" role="tablist">
            {TABS.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = tab.id === activeTab;
              return (
                <button
                  aria-controls={panelId(tab.id)}
                  aria-selected={isActive}
                  className={`${styles.navTab} ${isActive ? styles.navTabActive : ""}`}
                  id={tabId(tab.id)}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={handleTabKeyDown}
                  ref={(element) => {
                    tabRefs.current[tab.id] = element;
                  }}
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                >
                  <TabIcon /> {tab.label}
                  {"badge" in tab ? <span className={styles.navBadge}>{tab.badge}</span> : null}
                </button>
              );
            })}
          </div>
        </div>
        <div className={styles.main}>
          {activeTab === "overview" ? (
            <div {...panelProps("overview")}>
              <div className={styles.panelHeader}>
                <div>
                  <h3>Overview</h3>
                  <div className={styles.panelSub}>Across 3 sites · last sync 2 minutes ago</div>
                </div>
                <span className={styles.spacer} />
                <span className={styles.mockButton}>
                  <Plus /> New site
                </span>
              </div>
              <div className={styles.stats}>
                {OVERVIEW_STATS.map((stat) => (
                  <div className={styles.stat} key={stat.label}>
                    <div className={styles.statLabel}>
                      <span aria-hidden="true" className={`${styles.statDot} ${stat.dotClass}`} />
                      {stat.label}
                    </div>
                    <div className={styles.statValue}>{stat.value}</div>
                    <div className={styles.statMeta}>
                      {stat.delta ? <span className={styles.statUp}>{stat.delta}</span> : null}
                      {stat.delta ? " " : null}
                      {stat.meta}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.mlist}>
                <div className={styles.mlistTitle}>Recent activity</div>
                {OVERVIEW_ACTIVITY.map((item) => (
                  <div className={styles.mrow} key={item.prefix + item.mono}>
                    <span aria-hidden="true" className={`${styles.rowDot} ${item.dotClass}`} />
                    <span className={styles.rowText}>
                      {item.prefix}
                      <span className={styles.rowMono}>{item.mono}</span>
                      {item.suffix ?? null}
                    </span>
                    <span className={styles.rowTime}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {activeTab === "drafts" ? (
            <div {...panelProps("drafts")}>
              <div className={styles.panelHeader}>
                <div>
                  <h3>Drafts</h3>
                  <div className={styles.panelSub}>5 pending review · opened by Thally</div>
                </div>
                <span className={styles.spacer} />
                <span className={styles.mockButton}>
                  <Check /> Review all
                </span>
              </div>
              <div className={styles.mlist}>
                <div className={styles.mlistTitle}>Awaiting your review</div>
                {DRAFTS.map((draft) => (
                  <div className={styles.mrow} key={draft.title}>
                    <span aria-hidden="true" className={`${styles.rowDot} ${styles.rowDotRev}`} />
                    <span className={styles.rowText}>
                      <span className={styles.rowMono}>{draft.title}</span>
                      <div className={styles.rowMeta}>{draft.meta}</div>
                    </span>
                    <span className={styles.rowTime}>{draft.time}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {activeTab === "analytics" ? (
            <div {...panelProps("analytics")}>
              <div className={styles.panelHeader}>
                <div>
                  <h3>Analytics</h3>
                  <div className={styles.panelSub}>Page + agent reads · last 8 days</div>
                </div>
                <span className={styles.spacer} />
                <span className={styles.mockButton}>Last 8 days</span>
              </div>
              <div className={styles.chart}>
                <div aria-hidden="true" className={styles.chartBars}>
                  {CHART_BARS.map((bar, index) => (
                    <div
                      className={`${styles.chartBar} ${"highlighted" in bar ? styles.chartBarHi : ""}`}
                      key={`bar-${CHART_LABELS[index]}-${bar.height}`}
                      style={{ height: `${bar.height}%` }}
                    />
                  ))}
                </div>
                <div className={styles.chartLabels}>
                  {CHART_LABELS.map((label, index) => (
                    <span key={`day-${index + 1}-${label}`}>{label}</span>
                  ))}
                </div>
              </div>
              <div className={styles.mlist}>
                <div className={styles.mlistTitle}>Top pages</div>
                {TOP_PAGES.map((page) => (
                  <div className={styles.mrow} key={page.path}>
                    <span className={styles.rowText}>
                      <span className={styles.rowMono}>{page.path}</span>
                    </span>
                    <span className={styles.rowMeta}>{page.meta}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {activeTab === "agent" ? (
            <div {...panelProps("agent")}>
              <div className={styles.panelHeader}>
                <div>
                  <h3>Agent context</h3>
                  <div className={styles.panelSub}>What AI tools can read from your docs</div>
                </div>
                <span className={styles.spacer} />
                <span className={styles.mockButton}>
                  <Settings /> Scopes
                </span>
              </div>
              <div className={styles.readiness}>
                <div className={styles.readinessTop}>
                  <span className={styles.readinessScore}>82</span>
                  <span className={styles.readinessLabel}>
                    Agent-readiness · <b>Good</b>: 3 pages missing evidence links
                  </span>
                </div>
                <div aria-hidden="true" className={styles.readinessBar}>
                  <i style={{ width: "82%" }} />
                </div>
              </div>
              <div className={styles.contextList}>
                {AGENT_CONTEXT.map((item) => {
                  const ContextIcon = item.icon;
                  return (
                    <div className={styles.contextRow} key={item.title}>
                      <span aria-hidden="true" className={styles.contextIcon}>
                        <ContextIcon />
                      </span>
                      <span className={styles.contextText}>
                        <b>{item.title}</b>
                        <span className={styles.contextMono}>{item.mono}</span>
                      </span>
                      <span
                        className={`${styles.contextStatus} ${
                          item.status === "sync" ? styles.contextStatusSync : styles.contextStatusLive
                        }`}
                      >
                        {item.statusLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          {activeTab === "team" ? (
            <div {...panelProps("team")}>
              <div className={styles.panelHeader}>
                <div>
                  <h3>Team</h3>
                  <div className={styles.panelSub}>4 members · role-based review</div>
                </div>
                <span className={styles.spacer} />
                <span className={styles.mockButton}>
                  <Plus /> Invite
                </span>
              </div>
              <div className={styles.mlist}>
                <div className={styles.mlistTitle}>Members</div>
                {TEAM_MEMBERS.map((member) => (
                  <div className={styles.mrow} key={member.name}>
                    <span aria-hidden="true" className={`${styles.rowDot} ${member.dotClass}`} />
                    <span className={styles.rowText}>
                      {member.name}
                      <div className={styles.rowMeta}>{member.meta}</div>
                    </span>
                    <span className={styles.rowMeta}>{member.role}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
