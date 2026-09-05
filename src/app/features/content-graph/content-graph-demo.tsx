"use client";

/**
 * Interactive demos for the Content Graph feature page.
 *
 * FormatStudio: one MDX source projected into HTML, Markdown, JSON, and
 * llms.txt. GraphExplorer: the same page as a node in the knowledge graph,
 * with edges revealed on scroll and highlighted on hover. All content is
 * deterministic mock data ported from the design handoff.
 */

import type { CSSProperties, ReactElement } from "react";
import { useEffect, useRef, useState } from "react";

import type { ThallyIcon } from "@/components/icons";
import { Check, Code, Docs, GitBranch, Globe, Json, Mcp, RefreshCw, Settings, Structured } from "@/components/icons";

import styles from "./content-graph-page.module.css";

/* ── MDX studio ─────────────────────────────────────────────────────────── */

type FormatId = "html" | "md" | "json" | "llms";

const FORMAT_TABS: { icon: ThallyIcon; id: FormatId; label: string }[] = [
  { icon: Globe, id: "html", label: "HTML" },
  { icon: Docs, id: "md", label: "Markdown" },
  { icon: Json, id: "json", label: "JSON" },
  { icon: Mcp, id: "llms", label: "llms.txt" },
];

function HtmlProjection() {
  return (
    <div className={styles.renderView}>
      <div className={styles.renderCrumbs}>Docs / SDK / Sending a job</div>
      <h2>Sending a job</h2>
      <p>
        The client sends a job and waits for the result. Every request is subject to a <strong>timeout</strong>:{" "}
        <strong>60{" "}seconds</strong> by default.
      </p>
      <pre>
        <code>{"const res = await client.send(job, {\n  timeout: 60_000,\n});"}</code>
      </pre>
      <p>
        Failed requests use <strong>exponential backoff</strong> by default. Override it with the{" "}
        <code>retry.backoff</code> option.
      </p>
    </div>
  );
}

function MarkdownProjection() {
  return (
    <div className={styles.formatPanel}>
      <span className={styles.panelDim}># Sending a job</span>
      {
        "\n\nThe client sends a job and waits for the result. Every request is subject to a **timeout**: **60 seconds** by default.\n\n```ts\nconst res = await client.send(job, {\n  timeout: 60_000,\n});\n```\n\nFailed requests use **exponential backoff** by default. Override it with the `retry.backoff` option."
      }
    </div>
  );
}

function JsonProjection() {
  return (
    <div className={styles.formatPanel}>
      {"{\n  "}
      <span className={styles.panelKey}>{'"title"'}</span>
      {": "}
      <span className={styles.panelString}>{'"Sending a job"'}</span>
      {",\n  "}
      <span className={styles.panelKey}>{'"surface"'}</span>
      {": "}
      <span className={styles.panelString}>{'"sdk"'}</span>
      {",\n  "}
      <span className={styles.panelKey}>{'"concepts"'}</span>
      {": ["}
      <span className={styles.panelString}>{'"client"'}</span>
      {", "}
      <span className={styles.panelString}>{'"timeout"'}</span>
      {", "}
      <span className={styles.panelString}>{'"retries"'}</span>
      {"],\n  "}
      <span className={styles.panelKey}>{'"blocks"'}</span>
      {": [\n    { "}
      <span className={styles.panelKey}>{'"type"'}</span>
      {": "}
      <span className={styles.panelString}>{'"heading"'}</span>
      {", "}
      <span className={styles.panelKey}>{'"text"'}</span>
      {": "}
      <span className={styles.panelString}>{'"Sending a job"'}</span>
      {" },\n    { "}
      <span className={styles.panelKey}>{'"type"'}</span>
      {": "}
      <span className={styles.panelString}>{'"paragraph"'}</span>
      {", "}
      <span className={styles.panelKey}>{'"refs"'}</span>
      {": ["}
      <span className={styles.panelString}>{'"timeout"'}</span>
      {"] },\n    { "}
      <span className={styles.panelKey}>{'"type"'}</span>
      {": "}
      <span className={styles.panelString}>{'"code"'}</span>
      {", "}
      <span className={styles.panelKey}>{'"lang"'}</span>
      {": "}
      <span className={styles.panelString}>{'"ts"'}</span>
      {", "}
      <span className={styles.panelKey}>{'"symbol"'}</span>
      {": "}
      <span className={styles.panelString}>{'"client.send"'}</span>
      {" },\n    { "}
      <span className={styles.panelKey}>{'"type"'}</span>
      {": "}
      <span className={styles.panelString}>{'"paragraph"'}</span>
      {", "}
      <span className={styles.panelKey}>{'"refs"'}</span>
      {": ["}
      <span className={styles.panelString}>{'"retries"'}</span>
      {"] }\n  ],\n  "}
      <span className={styles.panelKey}>{'"evidence"'}</span>
      {": "}
      <span className={styles.panelString}>{'"jahce/bono@a1f9c2"'}</span>
      {"\n}"}
    </div>
  );
}

function LlmsProjection() {
  return (
    <div className={styles.formatPanel}>
      <span className={styles.panelDim}># Sending a job</span>
      {"\n"}
      <span className={styles.panelDim}>{"> surface: sdk · concepts: client, timeout, retries"}</span>
      {"\n"}
      <span className={styles.panelDim}>{"> source: jahce/bono@a1f9c2 · updated: 2026-07-18"}</span>
      {
        "\n\nSend a job with client.send(job, options). Requests\ntime out after 60 seconds by default (timeout option,\nmilliseconds). Failed requests retry with exponential\nbackoff by default; configure via retry.backoff.\n\nRelated: /sdk/configuration, /sdk/errors, /guides/retries"
      }
    </div>
  );
}

const PROJECTIONS: Record<FormatId, () => ReactElement> = {
  html: HtmlProjection,
  md: MarkdownProjection,
  json: JsonProjection,
  llms: LlmsProjection,
};

export function FormatStudio() {
  const [format, setFormat] = useState<FormatId>("html");
  const [isHovered, setIsHovered] = useState(false);
  /** Timestamp until which the rotation stays paused after a click. */
  const [pausedUntil, setPausedUntil] = useState(0);

  // The studio demonstrates itself by rotating through the projections.
  // Hovering pauses it, and picking a tab pauses it briefly before the
  // rotation resumes, so it never latches into a stopped state.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const order = FORMAT_TABS.map((tab) => tab.id);
    const timer = window.setInterval(() => {
      if (isHovered || Date.now() < pausedUntil) return;
      setFormat((current) => order[(order.indexOf(current) + 1) % order.length]);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [isHovered, pausedUntil]);

  const Projection = PROJECTIONS[format];

  return (
    <div className={styles.studio} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={styles.studioSource}>
        <div className={styles.studioBar}>
          <span aria-hidden="true" className={styles.barDots}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.barFile}>
            <Structured /> sending-jobs.mdx
          </span>
          <span className={styles.barTag}>Source</span>
        </div>
        <pre className={styles.sourceCode}>
          <span className={styles.tokenMeta}>
            {"---\ntitle: Sending a job\nsurface: sdk\nconcepts: [client, timeout, retries]\nupdated: 2026-07-18\n---"}
          </span>
          {"\n\n"}
          <span className={styles.tokenHeading}># Sending a job</span>
          {"\n\nThe client sends a job and waits for the\nresult. Every request is subject to a\n"}
          <span className={styles.tokenBold}>**timeout**</span>
          {": "}
          <span className={styles.tokenBold}>**60{" "}seconds**</span>
          {" by default.\n\n"}
          <span className={styles.tokenComment}>{"```ts"}</span>
          {"\n"}
          <span className={styles.tokenKeyword}>const</span>
          {" res = "}
          <span className={styles.tokenKeyword}>await</span>
          {" client.send(job, {\n  timeout: "}
          <span className={styles.tokenString}>60_000</span>
          {",\n});\n"}
          <span className={styles.tokenComment}>{"```"}</span>
          {"\n\nFailed requests use "}
          <span className={styles.tokenBold}>{"**exponential\nbackoff**"}</span>
          {" by default. Override it with\nthe "}
          <span className={styles.tokenKeyword}>`retry.backoff`</span>
          {" option."}
        </pre>
      </div>
      <div className={styles.studioOutput}>
        <div aria-label="Output format" className={styles.formatTabs} role="group">
          {FORMAT_TABS.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                aria-pressed={format === tab.id}
                className={`${styles.formatTab} ${format === tab.id ? styles.formatTabActive : ""}`}
                key={tab.id}
                onClick={() => {
                  setPausedUntil(Date.now() + 10000);
                  setFormat(tab.id);
                }}
                type="button"
              >
                <TabIcon /> {tab.label}
              </button>
            );
          })}
        </div>
        <div className={styles.studioView}>
          <Projection />
        </div>
      </div>
    </div>
  );
}

/* ── content graph explorer ─────────────────────────────────────────────── */

const GRAPH_SOURCE = { x: 500, y: 260 };

interface GraphNode {
  icon: ThallyIcon;
  id: string;
  kind: "concept" | "surface";
  label: string;
  left: string;
  mono?: boolean;
  tier: string;
  top: string;
  x: number;
  y: number;
}

const GRAPH_NODES: GraphNode[] = [
  {
    icon: Code,
    id: "client-send",
    kind: "concept",
    label: "client.send()",
    left: "16%",
    mono: true,
    tier: "Concept",
    top: "20%",
    x: 160,
    y: 104,
  },
  {
    icon: Settings,
    id: "timeout",
    kind: "concept",
    label: "timeout",
    left: "12%",
    mono: true,
    tier: "Concept",
    top: "50%",
    x: 120,
    y: 260,
  },
  {
    icon: RefreshCw,
    id: "retries",
    kind: "concept",
    label: "retries",
    left: "16%",
    mono: true,
    tier: "Concept",
    top: "80%",
    x: 160,
    y: 416,
  },
  {
    icon: Globe,
    id: "html-page",
    kind: "surface",
    label: "HTML page",
    left: "84%",
    tier: "Surface",
    top: "16%",
    x: 840,
    y: 83,
  },
  { icon: Json, id: "json", kind: "surface", label: "JSON", left: "88%", tier: "Surface", top: "40%", x: 880, y: 208 },
  {
    icon: Mcp,
    id: "llms-txt",
    kind: "surface",
    label: "llms.txt",
    left: "88%",
    tier: "Surface",
    top: "62%",
    x: 880,
    y: 322,
  },
  {
    icon: GitBranch,
    id: "evidence",
    kind: "surface",
    label: "jahce/bono",
    left: "84%",
    mono: true,
    tier: "Evidence",
    top: "85%",
    x: 840,
    y: 442,
  },
];

function edgePath(x: number, y: number): string {
  const bend = (x - GRAPH_SOURCE.x) * 0.5;
  return `M${GRAPH_SOURCE.x} ${GRAPH_SOURCE.y} C ${GRAPH_SOURCE.x + bend} ${GRAPH_SOURCE.y}, ${x - bend} ${y}, ${x} ${y}`;
}

export function GraphExplorer() {
  const [isInView, setIsInView] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = graphRef.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") {
      const fallback = window.setTimeout(() => setIsInView(true), 0);
      return () => window.clearTimeout(fallback);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    observer.observe(element);

    // The graph is taller than some viewports, so a strict threshold can
    // never be met. Reveal it anyway once it has had a chance to scroll in.
    const safety = window.setTimeout(() => setIsInView(true), 1200);
    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <div className={styles.graphWrap}>
      <div className={styles.graphBar}>
        <span>Product Knowledge Graph · sending-jobs.mdx</span>
        <span className={styles.graphLegend}>
          <span>
            <i className={styles.legendSource} /> Source
          </span>
          <span>
            <i className={styles.legendConcept} /> Concept
          </span>
          <span>
            <i className={styles.legendSurface} /> Surface
          </span>
        </span>
      </div>
      <div className={`${styles.graph} ${isInView ? styles.graphIn : ""}`} ref={graphRef}>
        <svg aria-hidden="true" className={styles.edges} preserveAspectRatio="none" viewBox="0 0 1000 520">
          {GRAPH_NODES.map((node, index) => (
            <g key={node.id}>
              <path
                className={`${styles.edgePath} ${activeNodeId === node.id ? styles.edgeActive : ""}`}
                d={edgePath(node.x, node.y)}
                pathLength={1}
                style={{ "--edge-delay": `${80 + index * 70}ms` } as CSSProperties}
              />
              {/* Pulse travelling from the source out to this node, so the
                  graph reads as continuous projection rather than a still. */}
              <path
                className={styles.edgePulse}
                d={edgePath(node.x, node.y)}
                pathLength={1}
                style={{ "--pulse-delay": `${index * 420}ms` } as CSSProperties}
              />
            </g>
          ))}
        </svg>
        <div className={`${styles.gnode} ${styles.gnodeSrc}`} style={{ left: "50%", top: "50%" }}>
          <div className={styles.chip}>
            <Structured /> sending-jobs.mdx
          </div>
        </div>
        {GRAPH_NODES.map((node, index) => {
          const NodeIcon = node.icon;
          return (
            <div
              className={`${styles.gnode} ${node.kind === "concept" ? styles.gnodeConcept : styles.gnodeSurface}`}
              key={node.id}
              onMouseEnter={() => setActiveNodeId(node.id)}
              onMouseLeave={() => setActiveNodeId((current) => (current === node.id ? null : current))}
              style={{ left: node.left, top: node.top, "--node-delay": `${120 + index * 90}ms` } as CSSProperties}
            >
              <span className={styles.tier}>{node.tier}</span>
              <div className={styles.chip}>
                <NodeIcon /> {node.mono ? <span className={styles.chipMono}>{node.label}</span> : node.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
