"use client";

import { Command, Languages, Rss, Search } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { SectionGrid, SectionHeader, SectionLines } from "@/components/section-decor";

const GUIDE_TABS = ["Guide", "API", "Changelog"];

const GUIDE_STEPS = [
  { n: "1", title: "Install the CLI", code: "npm i -g thally" },
  { n: "2", title: "Write in MDX", code: "<Steps>, <Tabs>, <Card>" },
  { n: "3", title: "Preview locally", code: "thally dev" },
];

const GUIDE_COMPONENTS = ["Steps", "Tabs", "Cards", "Mermaid", "Callouts", "Code groups"];

const ENDPOINTS = [
  { method: "GET", path: "/v1/pages", color: "var(--chart-2)" },
  { method: "POST", path: "/v1/tokens/rotate", color: "var(--chart-1)" },
];

const RESPONSE_LINES = [
  { text: "{", color: "var(--muted-foreground)" },
  { text: '  "token": "thly_9f2c…",', color: "var(--chart-2)" },
  { text: '  "expires_in": 86400', color: "var(--chart-4)" },
  { text: "}", color: "var(--muted-foreground)" },
];

const LOCALES = ["de", "ja", "fr", "pt"];

function GuidesVignette() {
  return (
    <div>
      <div className="border-border bg-background overflow-hidden rounded-xl border">
        <div className="border-border flex items-center gap-1 border-b px-3 py-2">
          {GUIDE_TABS.map((tab, i) => (
            <span
              key={tab}
              className={
                i === 0
                  ? "bg-muted rounded-md px-2 py-0.5 text-[10px] font-medium"
                  : "text-muted-foreground px-2 py-0.5 text-[10px]"
              }
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="p-4">
          {GUIDE_STEPS.map((step, i) => (
            <div key={step.n} className="relative flex gap-3 pb-4 last:pb-0">
              {i < GUIDE_STEPS.length - 1 && (
                <span aria-hidden className="bg-border absolute top-6 bottom-0 left-[10px] w-px" />
              )}
              <span className="border-border bg-background z-[1] flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold">
                {step.n}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] leading-5 font-medium">{step.title}</p>
                <code className="bg-muted text-muted-foreground mt-1 inline-block rounded px-1.5 py-0.5 font-mono text-[9px]">
                  {step.code}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {GUIDE_COMPONENTS.map((component) => (
          <span
            key={component}
            className="border-border bg-background text-muted-foreground rounded-full border px-2 py-0.5 text-[10px] font-medium"
          >
            {component}
          </span>
        ))}
        <span className="text-muted-foreground/70 px-1 py-0.5 text-[10px] font-medium">+ 19 more</span>
      </div>
    </div>
  );
}

function ApiVignette() {
  return (
    <div className="border-border bg-background overflow-hidden rounded-xl border">
      <div className="divide-border divide-y">
        {ENDPOINTS.map((endpoint) => (
          <div key={endpoint.path} className="flex items-center gap-2 px-3 py-2">
            <span
              className="w-11 rounded px-1.5 py-0.5 text-center text-[9px] font-bold text-white"
              style={{ background: endpoint.color }}
            >
              {endpoint.method}
            </span>
            <span className="truncate font-mono text-[10px] font-medium">{endpoint.path}</span>
          </div>
        ))}
      </div>
      <div className="border-border bg-muted/40 border-t p-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold">Try it</span>
          <span
            className="rounded px-2 py-0.5 text-[9px] font-semibold"
            style={{
              background: "color-mix(in oklab, var(--chart-5) 18%, transparent)",
              color: "var(--chart-5)",
            }}
          >
            200 OK · 84ms
          </span>
        </div>
        <div className="mt-2 space-y-0.5 font-mono text-[10px] leading-relaxed">
          {RESPONSE_LINES.map((line, i) => (
            <p key={i} className="truncate" style={{ color: line.color }}>
              {line.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChangelogVignette() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="border-border bg-background rounded-xl border p-3">
        <div className="flex items-center justify-between">
          <span
            className="rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold"
            style={{
              background: "color-mix(in oklab, var(--chart-1) 18%, transparent)",
              color: "color-mix(in oklab, var(--chart-1) 60%, var(--foreground))",
            }}
          >
            v2.4
          </span>
          <Rss className="text-muted-foreground size-3" />
        </div>
        <p className="mt-2 text-[11px] leading-snug font-medium">Webhook delivery retries</p>
        <p className="text-muted-foreground mt-1 text-[10px] leading-snug">
          Exponential backoff, dead-letter queue, and per-event logs.
        </p>
      </div>

      <div className="border-border bg-background rounded-xl border p-3">
        <div className="border-border flex items-center gap-1.5 rounded-md border px-2 py-1.5">
          <Search className="text-muted-foreground size-3 shrink-0" />
          <span className="truncate text-[10px] font-medium">rotate tokens</span>
          <span className="border-border text-muted-foreground ml-auto flex shrink-0 items-center gap-0.5 rounded border px-1 py-0.5 text-[8px]">
            <Command className="size-2" />K
          </span>
        </div>
        <p className="text-muted-foreground mt-2 text-[10px] leading-snug">
          12 results across guides, API, and changelog.
        </p>
      </div>

      <div className="border-border bg-background rounded-xl border p-3">
        <div className="flex items-center gap-1.5">
          <Languages className="text-muted-foreground size-3 shrink-0" />
          <span className="bg-muted rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold">en</span>
          <span className="text-muted-foreground text-[10px]">→</span>
          {LOCALES.map((locale) => (
            <span key={locale} className="border-border rounded border px-1.5 py-0.5 font-mono text-[9px] font-medium">
              {locale}
            </span>
          ))}
        </div>
        <code className="bg-muted text-muted-foreground mt-2 inline-block rounded px-1.5 py-0.5 font-mono text-[9px]">
          thally translate --locale de
        </code>
      </div>
    </div>
  );
}

const SOLUTIONS = [
  {
    industry: "Product guides",
    headline: "Write guides in MDX with 25+ built-in components: Steps, Tabs, Cards, Mermaid, and more.",
    stat: "4 formats from one source",
    accent: "var(--chart-5)",
    vignette: GuidesVignette,
    span: "lg:col-span-7",
    cols: "lg:grid-cols-2",
  },
  {
    industry: "API reference",
    headline: "Drop in an OpenAPI spec and get parameter tables, code samples, and a live Try-it console.",
    stat: "Zero drift from your spec",
    accent: "var(--chart-2)",
    vignette: ApiVignette,
    span: "lg:col-span-5",
    cols: null,
  },
  {
    industry: "Changelog, search & more",
    headline: "RSS-backed changelogs, hybrid ⌘K search, versioning, and one-command translation to any locale.",
    stat: "Search resolves in under 50ms",
    accent: "var(--chart-1)",
    vignette: ChangelogVignette,
    span: "lg:col-span-12",
    cols: "lg:grid-cols-[2fr_3fr]",
  },
];

export const Feature1 = () => {
  const reduce = useReducedMotion();

  return (
    <section id="solutions" className="section-padding relative">
      <SectionGrid className="opacity-25" />
      <SectionLines />

      <div className="relative container">
        <SectionHeader
          title="Every page your product needs, from one source"
          description="Product guides, API references, and changelogs are all projections of the same typed content graph, written once in MDX and never maintained by hand."
        />

        <div className="mt-10 grid gap-5 lg:mt-16 lg:grid-cols-12">
          {SOLUTIONS.map((item, i) => {
            const Vignette = item.vignette;
            const horizontal = item.cols !== null;
            return (
              <motion.article
                key={item.industry}
                className={`border-border bg-card relative flex flex-col overflow-hidden rounded-2xl border ${item.span}`}
                initial={reduce ? undefined : { opacity: 0, y: 20 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={horizontal ? `grid flex-1 ${item.cols}` : "flex flex-1 flex-col"}>
                  <div className="p-6 lg:p-7">
                    <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                      {item.industry}
                    </span>
                    <p className="mt-3 text-xl leading-snug font-semibold text-balance">{item.headline}</p>
                    <p className="text-muted-foreground mt-3 text-sm">{item.stat}</p>
                  </div>
                  <div
                    className={
                      horizontal
                        ? "border-border bg-muted/40 flex flex-col justify-center border-t p-4 lg:border-t-0 lg:border-l lg:p-5"
                        : "border-border bg-muted/40 mt-auto border-t p-4 lg:p-5"
                    }
                  >
                    <Vignette />
                  </div>
                </div>
                <div
                  aria-hidden
                  className="absolute top-4 right-4 size-8 border-t border-r"
                  style={{ borderColor: `color-mix(in oklab, ${item.accent} 40%, transparent)` }}
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
