"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./hero-flow.module.css";

const SURFACES = [
  "Docs guides",
  "API reference",
  "Code examples",
  "Changelog",
  "Help center",
  "Website",
  "llms.txt & MCP",
];
const COLORS = ["#7FD19A", "#79C0FF", "#D2A8FF", "#E3B341", "#56D4DD", "#F778BA", "#B1BAC4"];

type Change = {
  title: string;
  number: string;
  branch: string;
  files: number;
  additions: number;
  deletions: number;
  code: Array<["add" | "delete", string]>;
  hits: Partial<Record<number, string>>;
};

const CHANGES: Change[] = [
  {
    title: "Rename limit to page_size across list endpoints",
    number: "#418",
    branch: "api/page-size",
    files: 6,
    additions: 142,
    deletions: 38,
    code: [
      ["delete", "const limit = req.query.limit ?? 50"],
      ["add", "const pageSize = req.query.page_size ?? 50"],
    ],
    hits: {
      0: "3 pages",
      1: "2 endpoints",
      2: "4 snippets",
      3: "entry drafted",
      6: "regenerated",
    },
  },
  {
    title: "Rotate webhook signing secret on demand",
    number: "#421",
    branch: "fix/webhook-keys",
    files: 3,
    additions: 61,
    deletions: 19,
    code: [
      ["delete", "const secret = env.WEBHOOK_SECRET"],
      ["add", "const secret = await rotateSecret(env)"],
    ],
    hits: {
      0: "1 page",
      3: "entry drafted",
      4: "2 articles",
      6: "regenerated",
    },
  },
  {
    title: "Drop Node 16 support from the SDK",
    number: "#427",
    branch: "sdk/node-18",
    files: 9,
    additions: 210,
    deletions: 304,
    code: [
      ["delete", '"engines": { "node": ">=16" }'],
      ["add", '"engines": { "node": ">=18" }'],
    ],
    hits: {
      0: "migration notes",
      2: "6 snippets",
      3: "entry drafted",
      5: "pricing & install",
      6: "regenerated",
    },
  },
];

const CYCLE_DURATION = 9000;
const clamp = (value: number, start: number, end: number) => Math.max(0, Math.min(1, (value - start) / (end - start)));
const easeInOut = (value: number) => (value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2);
const easeOut = (value: number) => 1 - Math.pow(1 - value, 3);
const surfaceY = (index: number) => 90 + index * 70;

function GithubIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function MergeIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z" />
    </svg>
  );
}

export function HeroFlow() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const incomingEdgeRef = useRef<SVGPathElement>(null);
  const incomingPulseRef = useRef<SVGCircleElement>(null);
  const commitRef = useRef<HTMLDivElement>(null);
  const ringRefs = useRef<Array<HTMLDivElement | null>>([]);
  const analysisRefs = useRef<Array<HTMLDivElement | null>>([]);
  const outgoingEdgeRefs = useRef<Array<SVGPathElement | null>>([]);
  const outgoingPulseRefs = useRef<Array<SVGCircleElement | null>>([]);
  const surfaceDotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const statusRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeChange, setActiveChange] = useState(0);

  const change = CHANGES[activeChange];
  const additionBlocks = Math.round((5 * change.additions) / (change.additions + change.deletions));

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const incomingEdge = incomingEdgeRef.current;
    const incomingPulse = incomingPulseRef.current;
    const commit = commitRef.current;
    const outgoingEdges = outgoingEdgeRefs.current;
    const outgoingPulses = outgoingPulseRefs.current;

    if (!wrap || !stage || !incomingEdge || !incomingPulse || !commit || outgoingEdges.some((edge) => !edge)) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const incomingLength = incomingEdge.getTotalLength();
    const outgoingLengths = outgoingEdges.map((edge) => edge!.getTotalLength());
    let frameId = 0;
    let elapsed = 0;
    let lastTimestamp = 0;
    let renderedCycle = -1;
    let onScreen = true;

    const fit = () => {
      stage.style.transform = `scale(${wrap.clientWidth / 1120})`;
    };

    const render = (totalElapsed: number) => {
      const time = reducedMotion ? 6000 : totalElapsed % CYCLE_DURATION;
      const cycle = reducedMotion ? 0 : Math.floor(totalElapsed / CYCLE_DURATION) % CHANGES.length;

      if (cycle !== renderedCycle) {
        renderedCycle = cycle;
        setActiveChange(cycle);
      }

      const currentChange = CHANGES[cycle];
      const fade = 1 - clamp(time, 8300, 8900);
      const commitProgress = easeOut(clamp(time, 100, 600));

      commit.style.opacity = String(commitProgress * fade);
      commit.style.transform = `translateY(${(1 - commitProgress) * 10}px)`;

      const incomingProgress = clamp(time, 700, 1500);
      if (incomingProgress > 0 && incomingProgress < 1) {
        const point = incomingEdge.getPointAtLength(easeInOut(incomingProgress) * incomingLength);
        incomingPulse.setAttribute("cx", String(point.x));
        incomingPulse.setAttribute("cy", String(point.y));
        incomingPulse.setAttribute("opacity", "1");
      } else {
        incomingPulse.setAttribute("opacity", "0");
      }
      incomingEdge.classList.toggle(styles.edgeLit, incomingProgress > 0 && time < 8300);

      ringRefs.current.forEach((ring, index) => {
        if (!ring) return;
        if (time > 1450 && time < 3600) {
          const progress = ((time - 1450 + index * 450) % 900) / 900;
          ring.style.transform = `scale(${1 + progress * 0.55})`;
          ring.style.opacity = String((1 - progress) * 0.8);
        } else {
          ring.style.opacity = "0";
        }
      });

      analysisRefs.current.forEach((message, index) => {
        if (!message) return;
        const start = 1600 + index * 550;
        const enter = easeOut(clamp(time, start, start + 300));
        const exit = index < 2 ? easeOut(clamp(time, start + 450, start + 550)) : easeOut(clamp(time, 8000, 8300));
        message.style.opacity = String(enter * (1 - exit) * fade);
        message.style.transform = `translateY(${(1 - enter) * 6 - exit * 6}px)`;
      });

      let affectedIndex = 0;
      SURFACES.forEach((_, index) => {
        const edge = outgoingEdges[index]!;
        const pulse = outgoingPulses[index];
        const dot = surfaceDotRefs.current[index];
        const status = statusRefs.current[index];
        const affected = currentChange.hits[index] !== undefined;

        if (!pulse || !dot || !status) return;

        if (affected) {
          const start = 3300 + affectedIndex * 160;
          const progress = clamp(time, start, start + 700);
          const easedProgress = easeInOut(progress);
          const lit = progress > 0 && time < 8300;
          affectedIndex += 1;

          edge.style.strokeDasharray = String(outgoingLengths[index]);
          edge.style.strokeDashoffset = String(outgoingLengths[index] * (1 - easedProgress));
          edge.classList.toggle(styles.edgeLit, lit);
          edge.style.stroke = lit ? COLORS[index] : "";

          if (progress > 0 && progress < 1) {
            const point = edge.getPointAtLength(easedProgress * outgoingLengths[index]);
            pulse.setAttribute("cx", String(point.x));
            pulse.setAttribute("cy", String(point.y));
            pulse.setAttribute("opacity", "1");
          } else {
            pulse.setAttribute("opacity", "0");
          }

          const statusProgress = easeOut(clamp(time, start + 650, start + 950));
          dot.style.background = statusProgress > 0 && time < 8300 ? COLORS[index] : "";
          status.style.color = statusProgress > 0 ? COLORS[index] : "";
          status.style.opacity = String(statusProgress * fade);
          status.style.transform = `translateY(${(1 - statusProgress) * 3}px)`;
        } else {
          edge.style.strokeDasharray = "";
          edge.style.strokeDashoffset = "0";
          edge.classList.remove(styles.edgeLit);
          edge.style.stroke = "";
          pulse.setAttribute("opacity", "0");
          dot.style.background = "";
          status.style.color = "";

          const statusProgress = easeOut(clamp(time, 4200, 4500));
          status.style.opacity = String(statusProgress * fade * 0.85);
          status.style.transform = `translateY(${(1 - statusProgress) * 3}px)`;
        }
      });
    };

    const tick = (timestamp: number) => {
      if (lastTimestamp === 0) lastTimestamp = timestamp;
      elapsed += timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      render(elapsed);
      frameId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reducedMotion || frameId !== 0) return;
      lastTimestamp = 0;
      frameId = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (frameId === 0) return;
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const sync = () => {
      if (onScreen && !document.hidden) start();
      else stop();
    };

    fit();
    render(reducedMotion ? 6000 : 0);
    if (!reducedMotion) start();

    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(wrap);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((entry) => entry.isIntersecting);
        sync();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(wrap);
    document.addEventListener("visibilitychange", sync);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={styles.wrap}
      role="img"
      aria-label="A merged pull request flows through Thally, which traces its impact and opens updates only for affected product knowledge surfaces."
    >
      <div ref={stageRef} className={styles.stage} aria-hidden="true">
        <span className={`${styles.label} ${styles.repositoryLabel}`}>
          Tracked repository <small>· 1 connected</small>
        </span>
        <span className={`${styles.label} ${styles.surfacesLabel}`}>
          Connected surfaces <small>· 7</small>
        </span>

        <svg className={styles.graph} viewBox="0 0 1120 600">
          <path ref={incomingEdgeRef} className={styles.edge} d="M340 400 C 400 400, 420 300, 475 300" />
          <g>
            {SURFACES.map((surface, index) => (
              <path
                key={surface}
                ref={(element) => {
                  outgoingEdgeRefs.current[index] = element;
                }}
                className={styles.edge}
                d={`M645 300 C 740 300, 750 ${surfaceY(index)}, 849 ${surfaceY(index)}`}
              />
            ))}
          </g>
          <circle ref={incomingPulseRef} className={styles.dot} r="3.5" opacity="0" />
          <g>
            {SURFACES.map((surface, index) => (
              <circle
                key={surface}
                ref={(element) => {
                  outgoingPulseRefs.current[index] = element;
                }}
                className={styles.dot}
                r="3.5"
                opacity="0"
                style={{ fill: COLORS[index] }}
              />
            ))}
          </g>
        </svg>

        <div className={`${styles.node} ${styles.repository}`}>
          <div className={styles.repositoryHeading}>
            <GithubIcon />
            cinderlane-api
          </div>
          <div className={styles.repositoryMeta}>main · 14 files watched</div>
        </div>

        <div ref={commitRef} className={styles.commit}>
          <div className={styles.mergeMeta}>
            <MergeIcon />
            <b>Merged</b>
            <span className={styles.pullRequestNumber}>{change.number}</span>
          </div>
          <div className={styles.commitTitle}>{change.title}</div>
          <div className={styles.branches}>
            <code>main</code>←<code>{change.branch}</code>
          </div>
          <div className={styles.diffStats}>
            <span className={styles.additions}>+{change.additions}</span>
            <span className={styles.deletions}>−{change.deletions}</span>
            <span className={styles.statBar}>
              {Array.from({ length: 5 }, (_, index) => (
                <i key={index} data-kind={index < additionBlocks ? "add" : "delete"} />
              ))}
            </span>
            <span>{change.files} files</span>
          </div>
          <div className={styles.code}>
            {change.code.map(([kind, line]) => (
              <div key={line} data-kind={kind}>
                {kind === "add" ? "+" : "−"} {line}
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.node} ${styles.thally}`}>
          <div className={styles.mark}>
            <img src="/images/logo.svg" alt="" />
            {[0, 1].map((index) => (
              <div
                key={index}
                ref={(element) => {
                  ringRefs.current[index] = element;
                }}
                className={styles.ring}
              />
            ))}
          </div>
          <div className={styles.wordmark}>Thally</div>
        </div>

        <div className={styles.analysis}>
          <div
            ref={(element) => {
              analysisRefs.current[0] = element;
            }}
          >
            Reading what changed
          </div>
          <div
            ref={(element) => {
              analysisRefs.current[1] = element;
            }}
          >
            Tracing references across <b>7 surfaces</b>
          </div>
          <div
            ref={(element) => {
              analysisRefs.current[2] = element;
            }}
          >
            <b>{Object.keys(change.hits).length}</b> pull requests to open
          </div>
        </div>

        <div>
          {SURFACES.map((surface, index) => {
            const status = change.hits[index];
            return (
              <div key={surface} className={styles.surface} style={{ top: surfaceY(index) - 11 }}>
                <div className={styles.surfaceName}>
                  <span
                    ref={(element) => {
                      surfaceDotRefs.current[index] = element;
                    }}
                    className={styles.surfaceDot}
                  />
                  {surface}
                </div>
                <div
                  ref={(element) => {
                    statusRefs.current[index] = element;
                  }}
                  className={styles.surfaceStatus}
                >
                  {status ? `PR #${2040 + activeChange * 7 + index} · ${status}` : "No change needed"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
