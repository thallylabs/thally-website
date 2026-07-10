"use client";

import { ArrowRight, Braces, Check, Command, FileText, Search, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, var(--chart-1), var(--chart-2))",
  "linear-gradient(135deg, var(--chart-4), var(--chart-1))",
  "linear-gradient(135deg, var(--chart-2), var(--chart-3))",
  "linear-gradient(135deg, var(--chart-5), var(--chart-2))",
  "linear-gradient(135deg, var(--chart-1), var(--chart-4))",
];

export function Avatar({ initials, i = 0, className }: { initials: string; i?: number; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-6 items-center justify-center rounded-full text-[10px] font-semibold text-white ring-2 ring-[var(--card)]",
        className,
      )}
      style={{ background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length] }}
    >
      {initials}
    </span>
  );
}

const LABEL_COLORS: Record<string, string> = {
  guide: "var(--chart-1)",
  api: "var(--chart-2)",
  changelog: "var(--chart-3)",
  "agent-ready": "var(--chart-5)",
};

export function Label({ name }: { name: keyof typeof LABEL_COLORS | string }) {
  const color = LABEL_COLORS[name] ?? "var(--muted-foreground)";
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium"
      style={{ borderColor: `color-mix(in oklab, ${color} 35%, transparent)`, color }}
    >
      <span className="size-1.5 rounded-full" style={{ background: color }} />
      {name}
    </span>
  );
}

const reveal = (i: number, reduce: boolean | null) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.4 },
        transition: { duration: 0.4, delay: 0.05 * i, ease: "easeOut" as const },
      };

/* ------------------------------------------------------------------ */
/* Content graph: one MDX source, every format projected from it       */
/* ------------------------------------------------------------------ */

const MDX_LINES = [
  { text: "---", color: "var(--muted-foreground)" },
  { text: 'title: "Authentication"', color: "var(--chart-2)" },
  { text: "---", color: "var(--muted-foreground)" },
  { text: "# Authentication", color: "var(--chart-1)" },
  { text: "Authenticate requests with a", color: "var(--foreground)" },
  { text: "bearer token in the header.", color: "var(--foreground)" },
  { text: "<Steps>…</Steps>", color: "var(--chart-4)" },
];

const PROJECTIONS = [
  { name: "JSON", route: "/guides/auth.json", color: "var(--chart-2)" },
  { name: "JSON-LD", route: "schema.org/TechArticle", color: "var(--chart-3)" },
  { name: "Markdown", route: "/guides/auth.md", color: "var(--chart-4)" },
  { name: "HTML", route: "/guides/auth", color: "var(--chart-1)" },
  { name: "Search index", route: "full-text + vector", color: "var(--chart-5)" },
  { name: "Embeddings", route: "recomputed per build", color: "var(--chart-1)" },
];

export function ContentGraphView() {
  const reduce = useReducedMotion();
  return (
    <div className="grid items-center gap-4 p-4 sm:grid-cols-[1fr_auto_1.15fr]">
      <div className="border-border bg-background overflow-hidden rounded-lg border">
        <div className="border-border text-muted-foreground flex items-center gap-2 border-b px-3 py-2 text-[11px] font-medium">
          <FileText className="size-3.5" />
          guides/authentication.mdx
        </div>
        <div className="space-y-1 p-3 font-mono text-[10px] leading-relaxed">
          {MDX_LINES.map((line, i) => (
            <motion.p key={i} {...reveal(i, reduce)} style={{ color: line.color }} className="truncate">
              {line.text}
            </motion.p>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center max-sm:rotate-90">
        <span className="border-border bg-background text-muted-foreground flex size-8 items-center justify-center rounded-full border">
          <ArrowRight className="size-3.5" />
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {PROJECTIONS.map((p, i) => (
          <motion.div
            key={p.name}
            {...reveal(i + 2, reduce)}
            className="border-border bg-background rounded-lg border p-2.5"
          >
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full" style={{ background: p.color }} />
              <span className="text-[11px] font-semibold">{p.name}</span>
            </div>
            <p className="text-muted-foreground mt-1 truncate font-mono text-[9px]">{p.route}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Search console: hybrid search + grounded answers, one index         */
/* ------------------------------------------------------------------ */

const RESULTS = [
  { title: "Rotating bearer tokens", section: "Guides › Authentication", label: "guide" },
  { title: "POST /v1/tokens/rotate", section: "API reference › Tokens", label: "api" },
  { title: "Token scopes per project", section: "Guides › Access control", label: "guide" },
];

export function SearchConsoleView() {
  const reduce = useReducedMotion();
  return (
    <div className="mx-auto max-w-xl p-4">
      <div className="border-border bg-background overflow-hidden rounded-lg border">
        <div className="border-border flex items-center gap-2 border-b px-3 py-2.5">
          <Search className="text-muted-foreground size-3.5" />
          <span className="text-[11px] font-medium">rotate api tokens</span>
          <span className="border-border text-muted-foreground ml-auto flex items-center gap-0.5 rounded border px-1 py-0.5 text-[9px]">
            <Command className="size-2.5" />K
          </span>
        </div>
        <div className="divide-border divide-y">
          {RESULTS.map((r, i) => (
            <motion.div key={r.title} {...reveal(i, reduce)} className="flex items-center gap-3 px-3 py-2">
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] font-medium">{r.title}</span>
                <span className="text-muted-foreground block truncate text-[10px]">{r.section}</span>
              </span>
              <Label name={r.label} />
            </motion.div>
          ))}
        </div>
        <motion.div {...reveal(4, reduce)} className="border-border bg-muted/40 border-t p-3">
          <div className="flex items-start gap-2">
            <span
              className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full"
              style={{ background: "color-mix(in oklab, var(--chart-1) 18%, transparent)" }}
            >
              <Sparkles className="size-3" style={{ color: "var(--chart-1)" }} />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] leading-snug">
                Tokens are scoped per project and rotate without downtime. Call{" "}
                <span className="font-mono text-[10px]">POST /v1/tokens/rotate</span>.
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["Authentication § Rotating tokens", "API › Tokens"].map((cite) => (
                  <span
                    key={cite}
                    className="border-border bg-background text-muted-foreground rounded-full border px-2 py-0.5 text-[9px] font-medium"
                  >
                    {cite}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <p className="text-muted-foreground mt-2 text-center text-[10px]">Full-text + vector · resolved in 41ms</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* API reference: OpenAPI spec in, live reference + Try-it console out */
/* ------------------------------------------------------------------ */

const PARAMS = [
  { name: "token_id", type: "string", note: "required" },
  { name: "expires_in", type: "integer", note: "optional" },
  { name: "scope", type: "string[]", note: "optional" },
];

const RESPONSE_LINES = [
  { text: "{", color: "var(--muted-foreground)" },
  { text: '  "token": "thly_9f2c…",', color: "var(--chart-2)" },
  { text: '  "rotated_at": "2026-07-11",', color: "var(--chart-3)" },
  { text: '  "expires_in": 86400', color: "var(--chart-4)" },
  { text: "}", color: "var(--muted-foreground)" },
];

export function ApiReferenceView() {
  const reduce = useReducedMotion();
  return (
    <div className="grid gap-3 p-4 sm:grid-cols-2">
      <div className="border-border bg-background overflow-hidden rounded-lg border">
        <div className="border-border flex items-center gap-2 border-b px-3 py-2">
          <span
            className="rounded px-1.5 py-0.5 text-[9px] font-bold text-white"
            style={{ background: "var(--chart-1)" }}
          >
            POST
          </span>
          <span className="truncate font-mono text-[10px] font-medium">/v1/tokens/rotate</span>
          <Braces className="text-muted-foreground ml-auto size-3.5" />
        </div>
        <div className="p-3">
          <p className="text-muted-foreground mb-2 text-[10px] font-medium">Parameters · from your OpenAPI spec</p>
          <div className="divide-border divide-y">
            {PARAMS.map((p, i) => (
              <motion.div key={p.name} {...reveal(i, reduce)} className="flex items-center gap-2 py-1.5">
                <span className="font-mono text-[10px] font-medium">{p.name}</span>
                <span className="text-muted-foreground font-mono text-[9px]">{p.type}</span>
                <span
                  className="ml-auto rounded px-1.5 py-0.5 text-[9px] font-medium"
                  style={
                    p.note === "required"
                      ? {
                          background: "color-mix(in oklab, var(--chart-4) 16%, transparent)",
                          color: "var(--chart-4)",
                        }
                      : { background: "var(--muted)", color: "var(--muted-foreground)" }
                  }
                >
                  {p.note}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-border bg-background overflow-hidden rounded-lg border">
        <div className="border-border flex items-center justify-between border-b px-3 py-2">
          <span className="text-[11px] font-semibold">Try it</span>
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
        <div className="space-y-0.5 p-3 font-mono text-[10px] leading-relaxed">
          {RESPONSE_LINES.map((line, i) => (
            <motion.p key={i} {...reveal(i + 2, reduce)} style={{ color: line.color }} className="truncate">
              {line.text}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Readiness report: agent-readiness score, checks, default endpoints  */
/* ------------------------------------------------------------------ */

const READINESS_METRICS = [
  { label: "Pages indexed", value: "142", trend: "+6 this build", color: "var(--chart-1)" },
  { label: "Broken links", value: "0", trend: "−3 fixed", color: "var(--chart-5)" },
  { label: "Schema coverage", value: "100%", trend: "stable", color: "var(--chart-2)" },
];

const ENDPOINTS = ["llms.txt", "ai.txt", "/api/mcp", "per-page JSON"];

export function ReadinessView() {
  const reduce = useReducedMotion();
  const score = 98;
  const circumference = 2 * Math.PI * 36;

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-[auto_1fr]">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="relative size-28">
          <svg viewBox="0 0 80 80" className="size-full -rotate-90">
            <circle cx="40" cy="40" r="36" fill="none" stroke="var(--border)" strokeWidth="6" />
            <motion.circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="var(--chart-5)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={reduce ? undefined : { strokeDashoffset: circumference }}
              whileInView={reduce ? undefined : { strokeDashoffset: circumference * (1 - score / 100) }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold">{score}</span>
            <span className="text-muted-foreground text-[10px]">Agent-ready</span>
          </div>
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{
            background: "color-mix(in oklab, var(--chart-5) 18%, transparent)",
            color: "var(--chart-5)",
          }}
        >
          Passing · gates CI
        </span>
      </div>

      <div className="space-y-3">
        <div className="grid gap-2 sm:grid-cols-3">
          {READINESS_METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              className="border-border bg-background rounded-lg border p-2.5"
              initial={reduce ? undefined : { opacity: 0, y: 8 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
            >
              <p className="text-muted-foreground text-[10px]">{m.label}</p>
              <p className="text-sm font-semibold">{m.value}</p>
              <p className="text-[10px] font-medium" style={{ color: m.color }}>
                {m.trend}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="border-border bg-background rounded-lg border p-3">
          <p className="text-muted-foreground mb-2 text-[10px] font-medium">Shipped by default · every deploy</p>
          <div className="grid grid-cols-2 gap-1.5">
            {ENDPOINTS.map((endpoint, i) => (
              <motion.div key={endpoint} {...reveal(i, reduce)} className="flex items-center gap-2 text-[11px]">
                <span
                  className="flex size-4 items-center justify-center rounded-full"
                  style={{ background: "var(--chart-5)" }}
                >
                  <Check className="size-2.5 text-white" />
                </span>
                <span className="text-muted-foreground font-mono text-[10px]">{endpoint}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
