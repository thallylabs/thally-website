"use client";

/* eslint-disable react/no-unescaped-entities -- this file renders literal code samples full of quote characters */

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";

import { SectionGrid, SectionHeader, SectionLines } from "@/components/section-decor";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 6500;
const DEMO_URL = "docs.acme.dev/quickstart";

type Format = {
  id: string;
  accept: string;
  label: string;
  contentType: string;
  latency: string;
  note: string;
  lines: ReactNode[];
};

/** Minimal token painter so the demo needs no highlighter dependency. */
function T({ children, tone }: { children: ReactNode; tone?: "key" | "str" | "num" | "tag" | "dim" | "mark" }) {
  return (
    <span
      className={cn(
        tone === "key" && "text-chart-2 dark:text-chart-2",
        tone === "str" && "text-chart-5",
        tone === "num" && "text-chart-1",
        tone === "tag" && "text-chart-2",
        tone === "mark" && "text-foreground font-semibold",
        tone === "dim" && "text-muted-foreground/70",
        !tone && "text-foreground/85",
      )}
    >
      {children}
    </span>
  );
}

const FORMATS: Format[] = [
  {
    id: "html",
    accept: "text/html",
    label: "HTML",
    contentType: "text/html; charset=utf-8",
    latency: "38 ms",
    note: "Readers get fast, semantic pages with search and citations built in.",
    lines: [
      <T key="1" tone="dim">{"<!doctype html>"}</T>,
      <span key="2"><T tone="tag">{"<article"}</T> <T tone="key">itemscope itemtype</T><T tone="dim">=</T><T tone="str">"schema.org/TechArticle"</T><T tone="tag">{">"}</T></span>,
      <span key="3">{"  "}<T tone="tag">{"<h1>"}</T><T tone="mark">Quickstart</T><T tone="tag">{"</h1>"}</T></span>,
      <span key="4">{"  "}<T tone="tag">{"<p>"}</T><T>Install the CLI and ship your first request in five minutes.</T><T tone="tag">{"</p>"}</T></span>,
      <span key="5">{"  "}<T tone="tag">{"<pre><code>"}</T><T>npm install @acme/sdk</T><T tone="tag">{"</code></pre>"}</T></span>,
      <span key="6">{"  "}<T tone="tag">{"<section"}</T> <T tone="key">id</T><T tone="dim">=</T><T tone="str">"authentication"</T><T tone="tag">{">"}</T><T tone="dim"> …</T><T tone="tag">{"</section>"}</T></span>,
      <T key="7" tone="tag">{"</article>"}</T>,
    ],
  },
  {
    id: "json",
    accept: "application/json",
    label: "JSON",
    contentType: "application/json",
    latency: "22 ms",
    note: "Agents get the page as typed blocks. No scraping, no guessing at structure.",
    lines: [
      <T key="1" tone="dim">{"{"}</T>,
      <span key="2">{"  "}<T tone="key">"title"</T><T tone="dim">: </T><T tone="str">"Quickstart"</T><T tone="dim">,</T></span>,
      <span key="3">{"  "}<T tone="key">"description"</T><T tone="dim">: </T><T tone="str">"Install the CLI and ship your first request."</T><T tone="dim">,</T></span>,
      <span key="4">{"  "}<T tone="key">"blocks"</T><T tone="dim">: [</T></span>,
      <span key="5">{"    "}<T tone="dim">{"{ "}</T><T tone="key">"type"</T><T tone="dim">: </T><T tone="str">"code"</T><T tone="dim">, </T><T tone="key">"lang"</T><T tone="dim">: </T><T tone="str">"bash"</T><T tone="dim">, </T><T tone="key">"value"</T><T tone="dim">: </T><T tone="str">"npm install @acme/sdk"</T><T tone="dim">{" },"}</T></span>,
      <span key="6">{"    "}<T tone="dim">{"{ "}</T><T tone="key">"type"</T><T tone="dim">: </T><T tone="str">"heading"</T><T tone="dim">, </T><T tone="key">"id"</T><T tone="dim">: </T><T tone="str">"authentication"</T><T tone="dim">{" }"}</T></span>,
      <span key="7">{"  "}<T tone="dim">],</T></span>,
      <span key="8">{"  "}<T tone="key">"readiness"</T><T tone="dim">: </T><T tone="num">96</T></span>,
      <T key="9" tone="dim">{"}"}</T>,
    ],
  },
  {
    id: "markdown",
    accept: "text/markdown",
    label: "Markdown",
    contentType: "text/markdown; charset=utf-8",
    latency: "19 ms",
    note: "LLMs get clean Markdown, the format they read best. llms.txt maps the whole site.",
    lines: [
      <T key="1" tone="mark"># Quickstart</T>,
      <span key="2" />,
      <T key="3">Install the CLI and ship your first request in five minutes.</T>,
      <span key="4" />,
      <T key="5" tone="dim">```bash</T>,
      <T key="6">npm install @acme/sdk</T>,
      <T key="7" tone="dim">```</T>,
      <span key="8" />,
      <T key="9" tone="mark">## Authentication</T>,
      <span key="10"><T>Grab an API key from the </T><T tone="str">[dashboard](https://acme.dev/keys)</T><T>.</T></span>,
    ],
  },
  {
    id: "jsonld",
    accept: "application/ld+json",
    label: "JSON-LD",
    contentType: "application/ld+json",
    latency: "21 ms",
    note: "Search engines and answer engines get linked data they can cite verbatim.",
    lines: [
      <T key="1" tone="dim">{"{"}</T>,
      <span key="2">{"  "}<T tone="key">"@context"</T><T tone="dim">: </T><T tone="str">"https://schema.org"</T><T tone="dim">,</T></span>,
      <span key="3">{"  "}<T tone="key">"@type"</T><T tone="dim">: </T><T tone="str">"TechArticle"</T><T tone="dim">,</T></span>,
      <span key="4">{"  "}<T tone="key">"headline"</T><T tone="dim">: </T><T tone="str">"Quickstart"</T><T tone="dim">,</T></span>,
      <span key="5">{"  "}<T tone="key">"proficiencyLevel"</T><T tone="dim">: </T><T tone="str">"Beginner"</T><T tone="dim">,</T></span>,
      <span key="6">{"  "}<T tone="key">"dateModified"</T><T tone="dim">: </T><T tone="str">"2026-07-14"</T><T tone="dim">,</T></span>,
      <span key="7">{"  "}<T tone="key">"isPartOf"</T><T tone="dim">: {"{ "}</T><T tone="key">"@id"</T><T tone="dim">: </T><T tone="str">"https://docs.acme.dev/#docs"</T><T tone="dim">{" }"}</T></span>,
      <T key="8" tone="dim">{"}"}</T>,
    ],
  },
];

export function Polyglot() {
  const [activeId, setActiveId] = useState(FORMATS[1].id);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const active = FORMATS.find((f) => f.id === activeId) ?? FORMATS[0];

  useEffect(() => {
    if (paused || reduce) return;
    const interval = window.setInterval(() => {
      setActiveId((current) => {
        const index = FORMATS.findIndex((f) => f.id === current);
        return FORMATS[(index + 1) % FORMATS.length].id;
      });
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(interval);
  }, [paused, reduce]);

  return (
    <section className="section-padding relative overflow-hidden">
      <SectionLines />
      <SectionGrid />
      <div className="container relative">
        <SectionHeader
          eyebrow="One URL, every reader"
          title="The same URL answers in the reader's language."
          description="A person opens the page and gets typeset HTML. An agent sends an Accept header and gets structure. Nothing is generated twice and nothing drifts."
          layout="stack"
        />

        <div
          className="reveal-rise border-border bg-card mt-12 overflow-hidden rounded-2xl border shadow-sm"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="border-border bg-muted/50 flex flex-wrap items-center gap-3 border-b px-4 py-3">
            <div className="flex gap-1.5" aria-hidden>
              <span className="bg-border size-2.5 rounded-full" />
              <span className="bg-border size-2.5 rounded-full" />
              <span className="bg-border size-2.5 rounded-full" />
            </div>
            <div className="border-border bg-background text-muted-foreground flex min-w-0 items-center gap-2 rounded-md border px-3 py-1 font-mono text-xs">
              <span className="text-chart-2">GET</span>
              <span className="truncate">{DEMO_URL}</span>
            </div>
            <div className="ms-auto flex flex-wrap gap-1" role="tablist" aria-label="Response format">
              {FORMATS.map((format) => (
                <button
                  key={format.id}
                  role="tab"
                  aria-selected={format.id === activeId}
                  onClick={() => setActiveId(format.id)}
                  className={cn(
                    "rounded-md px-2.5 py-1 font-mono text-xs transition-colors",
                    format.id === activeId
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-background hover:text-foreground",
                  )}
                >
                  {format.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_2fr]">
            <div className="border-border bg-muted/25 flex flex-col gap-4 border-b p-5 lg:border-r lg:border-b-0">
              <p className="text-muted-foreground font-mono text-[11px] tracking-wide uppercase">Request</p>
              <div className="font-mono text-sm leading-7">
                <p>
                  <T tone="dim">$ </T>
                  <T>curl https://{DEMO_URL} \</T>
                </p>
                <p className="ps-4">
                  <T tone="dim">-H </T>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={active.id}
                      className="border-primary/40 bg-primary/10 inline-block rounded-md border px-1.5"
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.3, ease: CROSSFADE }}
                    >
                      <T tone="str">"Accept: {active.accept}"</T>
                    </motion.span>
                  </AnimatePresence>
                </p>
              </div>
              <p className="text-muted-foreground mt-auto max-w-xs text-sm text-pretty">{active.note}</p>
            </div>

            <div className="min-h-[19rem] p-5">
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="border-chart-1/50 bg-chart-1/15 text-foreground rounded-full border px-2 py-0.5">
                  200 OK
                </span>
                <span className="text-muted-foreground truncate">content-type: {active.contentType}</span>
                <span className="text-muted-foreground ms-auto shrink-0">{active.latency}</span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.pre
                  key={active.id}
                  className="mt-4 overflow-x-auto font-mono text-[13px] leading-6.5 whitespace-pre"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {active.lines.map((line, i) => (
                    <motion.span
                      key={i}
                      className="block"
                      initial={reduce ? false : { opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: reduce ? 0 : 0.05 + i * 0.035, ease: CROSSFADE }}
                    >
                      {line}
                      {"\n"}
                    </motion.span>
                  ))}
                </motion.pre>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="text-muted-foreground mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span className="inline-flex items-center gap-2">
            <span className="bg-chart-1 size-1.5 rounded-full" aria-hidden />
            llms.txt generated on every build
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="bg-chart-2 size-1.5 rounded-full" aria-hidden />
            Remote MCP server at /api/mcp
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="bg-chart-5 size-1.5 rounded-full" aria-hidden />
            Same source, zero drift between formats
          </span>
        </div>
      </div>
    </section>
  );
}

const CROSSFADE = [0.22, 1, 0.36, 1] as const;
