"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  SiDiscord,
  SiGithub,
  SiGoogledocs,
  SiIntercom,
  SiLinear,
  SiNotion,
  SiTelegram,
  SiZendesk,
} from "react-icons/si";

import { Leaf } from "@/components/icons";
import { cn } from "@/lib/utils";

import styles from "./knowledge-flow-graph.module.css";

const STAGE_WIDTH = 1500;
const STAGE_HEIGHT = 960;

const sources = [
  { name: "GitHub", color: "#181717", Icon: SiGithub },
  { name: "Linear", color: "#5E6AD2", Icon: SiLinear },
  { name: "Slack", color: "#36C5F0", Icon: SlackIcon },
  { name: "Notion", color: "#37352F", Icon: SiNotion },
  { name: "Zendesk", color: "#03363D", Icon: SiZendesk },
  { name: "Intercom", color: "#1F8DED", Icon: SiIntercom },
  { name: "Discord", color: "#5865F2", Icon: SiDiscord },
  { name: "Telegram", color: "#26A5E4", Icon: SiTelegram },
  { name: "Google Docs", color: "#4285F4", Icon: SiGoogledocs },
];

const surfaces = [
  { label: "Updates the affected docs pages", color: "#4A7C59" },
  { label: "Refreshes stale code examples", color: "#5E6AD2" },
  { label: "Corrects drifted SDK guides", color: "#D97706" },
  { label: "Drafts the changelog entry", color: "#0E7490" },
  { label: "Writes the migration notes", color: "#7C3AED" },
  { label: "Updates MCP skills", color: "#DB2777" },
  { label: "Regenerates AI knowledge bundles", color: "#2563EB" },
  { label: "Syncs the API reference", color: "#EA580C" },
];

type Point = {
  x: number;
  y: number;
};

type FlowEdge = {
  color: string;
  d: string;
  group: 0 | 1 | 2;
  id: string;
  position: number;
};

function SlackIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
    </svg>
  );
}

function horizontalPath(start: Point, end: Point) {
  const offset = (end.x - start.x) * 0.5;
  return `M${start.x} ${start.y} C ${start.x + offset} ${start.y}, ${end.x - offset} ${end.y}, ${end.x} ${end.y}`;
}

function verticalPath(start: Point, end: Point) {
  const offset = (end.y - start.y) * 0.5;
  return `M${start.x} ${start.y} C ${start.x} ${start.y + offset}, ${end.x} ${end.y - offset}, ${end.x} ${end.y}`;
}

function KnowledgeFlowGraph({ className }: { className?: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLSpanElement>(null);
  const thallyRef = useRef<HTMLDivElement>(null);
  const sourceRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const surfaceRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const scaleRef = useRef(1);
  const animationFrameRef = useRef<number | null>(null);
  const [edges, setEdges] = useState<FlowEdge[]>([]);

  const buildEdges = useCallback(() => {
    const stage = stageRef.current;
    const product = productRef.current;
    const thally = thallyRef.current;

    if (!stage || !product || !thally) return;

    const stageBounds = stage.getBoundingClientRect();
    const scale = scaleRef.current;

    const bounds = (element: Element) => {
      const rect = element.getBoundingClientRect();
      return {
        x: (rect.left - stageBounds.left) / scale,
        y: (rect.top - stageBounds.top) / scale,
        width: rect.width / scale,
        height: rect.height / scale,
      };
    };
    const rightCenter = (element: Element) => {
      const rect = bounds(element);
      return { x: rect.x + rect.width, y: rect.y + rect.height / 2 };
    };
    const leftCenter = (element: Element) => {
      const rect = bounds(element);
      return { x: rect.x, y: rect.y + rect.height / 2 };
    };
    const topCenter = (element: Element) => {
      const rect = bounds(element);
      return { x: rect.x + rect.width / 2, y: rect.y };
    };
    const bottomCenter = (element: Element) => {
      const rect = bounds(element);
      return { x: rect.x + rect.width / 2, y: rect.y + rect.height };
    };

    const nextEdges: FlowEdge[] = [];

    sourceRefs.current.forEach((source, index) => {
      if (!source) return;
      nextEdges.push({
        color: sources[index].color,
        d: horizontalPath(rightCenter(source), leftCenter(product)),
        group: 0,
        id: `knowledge-source-${index}`,
        position: index,
      });
    });

    nextEdges.push({
      color: "#4A7C59",
      d: verticalPath(topCenter(product), bottomCenter(thally)),
      group: 1,
      id: "knowledge-product-thally",
      position: 0,
    });

    surfaceRefs.current.forEach((surface, index) => {
      if (!surface) return;
      nextEdges.push({
        color: surfaces[index].color,
        d: horizontalPath(rightCenter(thally), leftCenter(surface)),
        group: 2,
        id: `knowledge-surface-${index}`,
        position: index,
      });
    });

    setEdges(nextEdges);
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    const stage = stageRef.current;
    if (!frame || !stage) return;

    let active = true;

    const resize = () => {
      const scale = Math.min(1, frame.clientWidth / STAGE_WIDTH);
      scaleRef.current = scale;
      stage.style.transform = `scale(${scale})`;
      frame.style.height = `${STAGE_HEIGHT * scale}px`;

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = window.requestAnimationFrame(buildEdges);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(frame);
    resize();

    const fontReady = document.fonts?.ready;
    fontReady?.then(() => {
      if (active) resize();
    });

    const settleTimer = window.setTimeout(resize, 300);

    return () => {
      active = false;
      observer.disconnect();
      window.clearTimeout(settleTimer);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [buildEdges]);

  return (
    <figure
      ref={frameRef}
      className={cn(styles.frame, className)}
      aria-label="Product knowledge flows from internal tools through Thally to public knowledge surfaces."
    >
      <figcaption className={styles.visuallyHidden}>
        Thally watches product changes across internal knowledge tools and keeps documentation, code examples, SDK
        guides, changelogs, migration notes, MCP skills, AI knowledge bundles, and API references in sync.
      </figcaption>

      <div ref={stageRef} className={styles.stage}>
        <svg
          className={styles.edges}
          viewBox={`0 0 ${STAGE_WIDTH} ${STAGE_HEIGHT}`}
          width={STAGE_WIDTH}
          height={STAGE_HEIGHT}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {edges.map((edge) => (
            <path key={edge.id} id={edge.id} className={styles.edge} d={edge.d} />
          ))}
          {edges.map((edge) => {
            const duration = [1.5, 0.8, 1.6][edge.group];
            const phase = [0, 1.3, 2][edge.group];
            const stagger = edge.group === 0 ? edge.position * 0.13 : edge.group === 2 ? edge.position * 0.11 : 0;

            return (
              <circle key={`${edge.id}-pulse`} className={styles.pulse} r="2.6" fill={edge.color}>
                <animateMotion
                  dur={`${duration}s`}
                  repeatCount="indefinite"
                  begin={`${phase + stagger}s`}
                  calcMode="linear"
                >
                  <mpath href={`#${edge.id}`} />
                </animateMotion>
              </circle>
            );
          })}
        </svg>

        <div className={styles.heading}>Product knowledge flow</div>
        <div className={cn(styles.caption, styles.sourceCaption)}>Internal knowledge</div>
        <div className={cn(styles.caption, styles.surfaceCaption)}>Public knowledge surfaces</div>

        <div className={cn(styles.column, styles.sources)}>
          {sources.map(({ name, color, Icon }, index) => (
            <span
              key={name}
              ref={(node) => {
                sourceRefs.current[index] = node;
              }}
              className={styles.source}
              title={name}
              aria-label={name}
            >
              <Icon className={styles.sourceIcon} style={{ color }} aria-hidden="true" />
              <i className={styles.anchor} aria-hidden="true" />
            </span>
          ))}
        </div>

        <div className={styles.product}>
          <span ref={productRef} className={styles.productPill}>
            <SiGithub className={styles.productIcon} aria-hidden="true" />
            Your product
          </span>
        </div>

        <div ref={thallyRef} className={styles.thally}>
          <div className={styles.thallyWordmark}>
            <Leaf className={styles.thallyIcon} aria-hidden="true" />
            <b className={styles.thallyName}>Thally</b>
          </div>
          <div className={styles.watch}>Watches every change to your product.</div>
        </div>

        <div className={cn(styles.column, styles.surfaces)}>
          {surfaces.map(({ label }, index) => (
            <span
              key={label}
              ref={(node) => {
                surfaceRefs.current[index] = node;
              }}
              className={styles.surface}
            >
              <i className={styles.anchor} aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}

export default KnowledgeFlowGraph;
