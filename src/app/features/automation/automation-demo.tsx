"use client";

/**
 * Interactive widgets for the Automation feature page.
 *
 * Deterministic mock data from the design handoff; no network calls.
 * The merge simulation runs a staged timeout chain that is cleared on
 * unmount and collapsed to near-instant when the visitor prefers
 * reduced motion.
 */

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Check, Docs, GitBranch, GitPullRequest, Json, Negotiation, RefreshCw, Track } from "@/components/icons";

import styles from "./automation-page.module.css";

const PIPELINE_STAGES = [
  {
    detail: "event: pull_request.closed · merged: true",
    icon: GitPullRequest,
    sub: "Webhook received from GitHub on the default branch.",
    title: "Merge detected",
  },
  {
    detail: "DEFAULT_TIMEOUT_MS 30000 → 60000",
    icon: Track,
    sub: "Track extracts the public-surface change from the diff.",
    title: "Bounded change analyzed",
  },
  {
    detail: "2 pages · /sdk/configuration, /guides/long-running-jobs",
    icon: Negotiation,
    sub: "The Content Graph matches the change to affected docs.",
    title: "Connected pages found",
  },
  {
    detail: "2 files changed · +6 −4",
    icon: Docs,
    sub: "An evidence-backed edit is written for each page.",
    title: "Update drafted",
  },
  {
    detail: "northstar-labs/docs #291 · awaiting review",
    icon: Check,
    sub: "A pull request lands on your docs repo, assigned to a human.",
    title: "Draft PR opened for review",
  },
] as const;

type PrCardState = "hidden" | "entering" | "shown";

export function AutomationDemo() {
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [doneCount, setDoneCount] = useState(0);
  const [cardState, setCardState] = useState<PrCardState>("hidden");
  const timersRef = useRef<number[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      for (const timer of timers) window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (cardState !== "entering") return;
    const timer = window.setTimeout(() => setCardState("shown"), 30);
    return () => window.clearTimeout(timer);
  }, [cardState]);

  const runSimulation = useCallback(() => {
    for (const timer of timersRef.current) window.clearTimeout(timer);
    timersRef.current.length = 0;
    setActiveStage(null);
    setDoneCount(0);
    setCardState("hidden");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stepMs = reducedMotion ? 40 : 900;
    const startMs = reducedMotion ? 40 : 250;

    PIPELINE_STAGES.forEach((_, index) => {
      timersRef.current.push(
        window.setTimeout(
          () => {
            setActiveStage(index);
            setDoneCount(index);
          },
          index * stepMs + startMs,
        ),
      );
    });
    timersRef.current.push(
      window.setTimeout(
        () => {
          setActiveStage(null);
          setDoneCount(PIPELINE_STAGES.length);
          setCardState("entering");
        },
        PIPELINE_STAGES.length * stepMs + startMs + (reducedMotion ? 0 : 150),
      ),
    );
  }, []);

  // The simulation plays itself the first time the card scrolls into view,
  // then the observer disconnects so it runs exactly once.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const timer = window.setTimeout(runSimulation, 0);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        runSimulation();
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [runSimulation]);

  return (
    <div className={styles.loop} ref={rootRef}>
      <div className={styles.loopBar}>
        <span className={styles.loopLabel}>
          <GitPullRequest /> Merged: <span className={styles.loopLabelMono}>northstar-labs/platform #482</span> · Raise
          default request timeout
        </span>
      </div>
      <div className={styles.loopBody}>
        <div className={styles.pipeline}>
          {PIPELINE_STAGES.map((stage, index) => {
            const StageIcon = stage.icon;
            const isDone = index < doneCount;
            const isActive = index === activeStage;
            return (
              <div
                className={`${styles.stage} ${isDone ? styles.stageDone : ""} ${isActive ? styles.stageActive : ""}`}
                key={stage.title}
              >
                <span aria-hidden="true" className={styles.stageDot}>
                  <StageIcon />
                </span>
                <div className={styles.stageText}>
                  <b>{stage.title}</b>
                  <span className={styles.stageSub}>{stage.sub}</span>
                  <span className={styles.stageDetail}>{stage.detail}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div aria-live="polite" className={styles.sidePanel}>
          <div className={styles.sideHead}>Result</div>
          {cardState === "hidden" ? (
            <p className={styles.idleNote}>
              <b>No draft yet.</b> Thally opens a pull request on your docs repository once the analysis finishes.
            </p>
          ) : (
            <div className={`${styles.prCard} ${cardState === "shown" ? styles.prCardShown : ""}`}>
              <div className={styles.prTop}>
                <GitPullRequest />
                <b>northstar-labs/docs #291</b>
                <span className={styles.prStatus}>Draft</span>
              </div>
              <div className={styles.prBody}>
                <div className={styles.prTitle}>docs: default timeout is now 60s</div>
                <div className={styles.prMeta}>
                  2 files changed
                  <br />
                  <span className={styles.metaAdd}>+6 additions</span> ·{" "}
                  <span className={styles.metaDel}>−4 deletions</span>
                  <br />
                  opened by thally-bot · needs 1 review
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface TriggerRow {
  defaultEnabled: boolean;
  description: ReactNode;
  icon: typeof GitPullRequest;
  label: string;
}

const TRIGGER_ROWS: TriggerRow[] = [
  {
    defaultEnabled: true,
    description: "A PR merges into a watched branch. The most common trigger.",
    icon: GitPullRequest,
    label: "Merged pull request",
  },
  {
    defaultEnabled: true,
    description: (
      <>
        A version tag is pushed, e.g. <span className={styles.monoTag}>v*.*.*</span>: draft the release-facing docs.
      </>
    ),
    icon: GitBranch,
    label: "Release tag",
  },
  {
    defaultEnabled: true,
    description: (
      <>
        Your <span className={styles.monoTag}>openapi.yaml</span> or schema files change on the default branch.
      </>
    ),
    icon: Json,
    label: "Schema or API change",
  },
  {
    defaultEnabled: false,
    description: "A weekly pass catches drift the event triggers missed.",
    icon: RefreshCw,
    label: "Scheduled sweep",
  },
];

export function AutomationTriggers() {
  const [enabled, setEnabled] = useState(() => TRIGGER_ROWS.map((row) => row.defaultEnabled));

  const toggleTrigger = (index: number) => {
    setEnabled((current) => current.map((value, position) => (position === index ? !value : value)));
  };

  return (
    <div className={styles.triggerList}>
      {TRIGGER_ROWS.map((row, index) => {
        const TriggerIcon = row.icon;
        return (
          <div className={styles.triggerRow} key={row.label}>
            <span aria-hidden="true" className={styles.triggerIcon}>
              <TriggerIcon />
            </span>
            <div className={styles.triggerText}>
              <b>{row.label}</b>
              <span>{row.description}</span>
            </div>
            <button
              aria-label={row.label}
              aria-pressed={enabled[index]}
              className={styles.toggle}
              onClick={() => toggleTrigger(index)}
              type="button"
            />
          </div>
        );
      })}
    </div>
  );
}
