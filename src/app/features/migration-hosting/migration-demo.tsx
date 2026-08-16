"use client";

/**
 * Migration console demo.
 *
 * Deterministic mock migration: pick a source platform, run the migration,
 * watch a staged log, and see the live deploy card. No network calls.
 */

import { useEffect, useRef, useState } from "react";

import type { ThallyIcon } from "@/components/icons";
import { Cloud, Code, Docs, GitBranch, Globe, Guide } from "@/components/icons";
import { usePlayOnView } from "@/components/motion/use-play-on-view";

import styles from "./migration-page.module.css";

type SourceId = "gitbook" | "mintlify" | "docusaurus" | "markdown";

interface MigrationSource {
  fetchLine: string;
  icon: ThallyIcon;
  id: SourceId;
  monoLabel: boolean;
  name: string;
  pages: number;
  repo: string;
  time: string;
}

const SOURCES: readonly MigrationSource[] = [
  {
    fetchLine: "Fetching GitBook space via API",
    icon: Guide,
    id: "gitbook",
    monoLabel: false,
    name: "GitBook",
    pages: 128,
    repo: "northstar-labs/legacy-docs",
    time: "8.4s",
  },
  {
    fetchLine: "Reading mint.json and MDX pages",
    icon: Docs,
    id: "mintlify",
    monoLabel: false,
    name: "Mintlify",
    pages: 96,
    repo: "northstar-labs/mint-docs",
    time: "6.1s",
  },
  {
    fetchLine: "Parsing docusaurus.config.js and /docs",
    icon: Code,
    id: "docusaurus",
    monoLabel: false,
    name: "Docusaurus",
    pages: 143,
    repo: "northstar-labs/docs-site",
    time: "9.7s",
  },
  {
    fetchLine: "Walking Markdown tree from repository root",
    icon: GitBranch,
    id: "markdown",
    monoLabel: true,
    name: "Markdown repo",
    pages: 74,
    repo: "northstar-labs/handbook",
    time: "4.8s",
  },
] as const;

const REGIONS = ["iad", "sfo", "lhr", "fra", "sin", "syd"] as const;

interface LogLine {
  text: string;
  tone: "dim" | "ok";
}

function buildLogLines(source: MigrationSource): LogLine[] {
  return [
    { text: `${source.fetchLine} …`, tone: "dim" },
    { text: `Imported ${source.pages} pages · links and redirects preserved`, tone: "ok" },
    { text: "Converting to MDX and resolving cross-references …", tone: "dim" },
    { text: "Building Content Graph · indexing code samples", tone: "dim" },
    { text: "Generating machine formats · HTML, Markdown, JSON, llms.txt", tone: "ok" },
    { text: "Deploying to edge · iad sfo lhr fra sin syd", tone: "dim" },
    { text: `Live at docs.northstar.dev in ${source.time}`, tone: "ok" },
  ];
}

export function MigrationDemo() {
  const [selectedId, setSelectedId] = useState<SourceId>("gitbook");
  const [runSource, setRunSource] = useState<MigrationSource | null>(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  };

  useEffect(() => clearTimers, []);

  const selectedSource = SOURCES.find((source) => source.id === selectedId) ?? SOURCES[0];

  const runMigration = () => {
    clearTimers();
    const source = selectedSource;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lineCount = buildLogLines(source).length;
    setRunSource(source);
    setVisibleLines(0);
    setIsDeployed(false);
    setIsRunning(true);
    if (reducedMotion) {
      timersRef.current.push(
        window.setTimeout(() => {
          setVisibleLines(lineCount);
          setIsDeployed(true);
          setIsRunning(false);
        }, 30),
      );
      return;
    }
    for (let index = 0; index < lineCount; index += 1) {
      timersRef.current.push(window.setTimeout(() => setVisibleLines(index + 1), 360 * index + 150));
    }
    timersRef.current.push(
      window.setTimeout(
        () => {
          setIsDeployed(true);
          setIsRunning(false);
        },
        360 * lineCount + 700,
      ),
    );
  };

  // Most visitors never pressed the button, so the console only ever showed
  // its idle line. It now runs itself once; the button stays for a replay
  // after switching source.
  const playRef = usePlayOnView<HTMLDivElement>(runMigration);

  return (
    <div className={styles.console} ref={playRef}>
      <div className={styles.consoleTop}>
        <p className={styles.sourceLabel}>Import from</p>
        <div className={styles.sources}>
          {SOURCES.map((source) => {
            const SourceIcon = source.icon;
            const isSelected = source.id === selectedId;
            return (
              <button
                aria-pressed={isSelected}
                className={`${styles.sourceButton} ${isSelected ? styles.sourceButtonOn : ""}`}
                key={source.id}
                onClick={() => setSelectedId(source.id)}
                type="button"
              >
                <SourceIcon />
                {source.monoLabel ? <span className={styles.sourceMono}>{source.name}</span> : source.name}
              </button>
            );
          })}
        </div>
        <div className={styles.runRow}>
          <button
            className={`${styles.button} ${styles.primaryButton}`}
            disabled={isRunning}
            onClick={runMigration}
            type="button"
          >
            <Cloud /> Migrate &amp; deploy
          </button>
          <span className={styles.runHint}>
            Imports <b>{selectedSource.repo}</b> from {selectedSource.name}.
          </span>
        </div>
      </div>
      <div className={styles.consoleBody}>
        <div className={styles.logColumn}>
          <div aria-live="polite" className={styles.log} role="log">
            {runSource === null ? (
              <div className={styles.logIdle}>$ waiting: choose a source and run the migration.</div>
            ) : (
              buildLogLines(runSource)
                .slice(0, visibleLines)
                .map((line) => (
                  <div
                    className={`${styles.logLine} ${line.tone === "ok" ? styles.logOk : styles.logDim}`}
                    key={line.text}
                  >
                    <span aria-hidden="true" className={styles.logMarker}>
                      {line.tone === "ok" ? "✓" : "·"}
                    </span>
                    {line.text}
                  </div>
                ))
            )}
          </div>
        </div>
        <aside aria-live="polite" className={styles.sidebar}>
          <p className={styles.sidebarHeading}>Deployment</p>
          {isDeployed && runSource ? (
            <div className={styles.deployCard}>
              <div className={styles.deployTop}>
                <Globe aria-hidden="true" />
                <span className={styles.deployUrl}>docs.northstar.dev</span>
                <span className={styles.liveLabel}>Live</span>
              </div>
              <div className={styles.deployBody}>
                <div className={styles.deployRow}>
                  <span>Pages imported</span>
                  <b>{runSource.pages}</b>
                </div>
                <div className={styles.deployRow}>
                  <span>Build time</span>
                  <b>{runSource.time}</b>
                </div>
                <div className={styles.deployRow}>
                  <span>Machine formats</span>
                  <b>4</b>
                </div>
                <div className={styles.regions}>
                  {REGIONS.map((region) => (
                    <span className={styles.region} key={region}>
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className={styles.sidebarIdle}>
              <b>Nothing deployed yet.</b> Run a migration to publish your imported docs to the global edge.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
