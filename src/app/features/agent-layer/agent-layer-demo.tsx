"use client";

/**
 * Canned Agent Layer Q&A demo.
 *
 * Deterministic mock data: picking a question stages a retrieval row, the
 * answer paragraphs, then the sources cards. All timers are cleaned up on
 * unmount, and prefers-reduced-motion collapses the staging to an instant
 * full answer.
 */

import { type ReactNode, useEffect, useRef, useState } from "react";

import { Mcp, Search } from "@/components/icons";

import styles from "./agent-layer-page.module.css";

interface SourceCard {
  evidence: string;
  path: string;
  title: string;
}

interface QaItem {
  cards: SourceCard[];
  paragraphs: ReactNode[];
  question: string;
  sources: string[];
}

const QA: QaItem[] = [
  {
    question: "What's the default request timeout?",
    sources: ["/sdk/configuration", "/guides/long-running-jobs"],
    paragraphs: [
      <>
        The client waits <strong>60{" "}seconds</strong> before aborting a request by default.
        <span className={styles.cite}>[1]</span>
      </>,
      <>
        Override it per request with the <code>timeout</code> option, in milliseconds, for example{" "}
        <code>client.send(job, {"{ timeout: 120_000 }"})</code>.<span className={styles.cite}>[1]</span>
      </>,
    ],
    cards: [
      { path: "/sdk/configuration", title: "Default timeout & overrides", evidence: "bono@a1f9c2" },
      { path: "/guides/long-running-jobs", title: "Tuning timeouts for slow jobs", evidence: "bono@a1f9c2" },
    ],
  },
  {
    question: "How do I catch a timeout error?",
    sources: ["/sdk/errors"],
    paragraphs: [
      <>
        When a request exceeds its timeout the client throws a typed <code>TimeoutError</code>.
        <span className={styles.cite}>[1]</span>
      </>,
      <>
        Catch it by class: <code>{"catch (e) { if (e instanceof TimeoutError) retry(job) }"}</code>. It extends the base{" "}
        <code>Error</code>, so a generic handler still works.<span className={styles.cite}>[1]</span>
      </>,
    ],
    cards: [{ path: "/sdk/errors", title: "TimeoutError reference", evidence: "bono@a1f9c2" }],
  },
  {
    question: "Does the client retry failed requests?",
    sources: ["/guides/retries", "/sdk/configuration"],
    paragraphs: [
      <>
        Yes: failed requests retry automatically using <strong>exponential backoff</strong> by default.
        <span className={styles.cite}>[1]</span>
      </>,
      <>
        Change the strategy with the <code>retry.backoff</code> option, or disable retries entirely by setting{" "}
        <code>retry.attempts</code> to <code>0</code>.<span className={styles.cite}>[2]</span>
      </>,
    ],
    cards: [
      { path: "/guides/retries", title: "Retry & backoff behaviour", evidence: "bono@a1f9c2" },
      { path: "/sdk/configuration", title: "retry options", evidence: "bono@a1f9c2" },
    ],
  },
];

interface ExchangeState {
  chipsShown: number;
  paragraphsShown: number;
  questionIndex: number;
  sourcesShown: boolean;
}

function ChatExchange({ exchange }: { exchange: ExchangeState }) {
  const item = QA[exchange.questionIndex];
  return (
    <>
      <div className={styles.userBubble}>{item.question}</div>
      <div className={styles.assistantBubble}>
        <div className={styles.retrieval}>
          <span className={styles.retrievalLabel}>
            <Search aria-hidden="true" /> Retrieving from graph
          </span>
          {item.sources.map((source, sourceIndex) => (
            <span
              className={`${styles.sourceChip} ${sourceIndex < exchange.chipsShown ? styles.shown : ""}`}
              key={source}
            >
              {source}
            </span>
          ))}
        </div>
        <div className={styles.answer}>
          {item.paragraphs.map((paragraph, paragraphIndex) => (
            <p
              className={paragraphIndex < exchange.paragraphsShown ? styles.shown : ""}
              key={`${item.question}:${paragraphIndex}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className={`${styles.sources} ${exchange.sourcesShown ? styles.shown : ""}`}>
          <div className={styles.sourcesHead}>Sources</div>
          {item.cards.map((card) => (
            <div className={styles.sourceCard} key={`${card.path}:${card.title}`}>
              <span aria-hidden="true" className={styles.sourceDot} />
              <span className={styles.sourceText}>
                <b>{card.path}</b>
                <span>{card.title}</span>
              </span>
              <span className={styles.sourceEvidence}>{card.evidence}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function AgentLayerDemo() {
  const [exchange, setExchange] = useState<ExchangeState | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => {
      for (const id of timeouts) window.clearTimeout(id);
    };
  }, []);

  const schedule = (delay: number, run: () => void) => {
    timeoutsRef.current.push(window.setTimeout(run, delay));
  };

  const advance = (questionIndex: number, patch: Partial<ExchangeState>) => {
    setExchange((current) => (current && current.questionIndex === questionIndex ? { ...current, ...patch } : current));
  };

  const ask = (questionIndex: number) => {
    if (isRunning) return;
    for (const id of timeoutsRef.current) window.clearTimeout(id);
    timeoutsRef.current = [];

    const item = QA[questionIndex];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setExchange({
        chipsShown: item.sources.length,
        paragraphsShown: item.paragraphs.length,
        questionIndex,
        sourcesShown: true,
      });
      return;
    }

    setIsRunning(true);
    setExchange({ chipsShown: 0, paragraphsShown: 0, questionIndex, sourcesShown: false });
    item.sources.forEach((_, chipIndex) => {
      schedule(300 + chipIndex * 260, () => advance(questionIndex, { chipsShown: chipIndex + 1 }));
    });
    const afterRetrieval = 400 + item.sources.length * 260;
    item.paragraphs.forEach((_, paragraphIndex) => {
      schedule(afterRetrieval + paragraphIndex * 520, () =>
        advance(questionIndex, { paragraphsShown: paragraphIndex + 1 }),
      );
    });
    schedule(afterRetrieval + item.paragraphs.length * 520 + 180, () => {
      advance(questionIndex, { sourcesShown: true });
      setIsRunning(false);
    });
  };

  return (
    <div className={styles.agentChat}>
      <div className={styles.chatBar}>
        <Mcp aria-hidden="true" />
        <span className={styles.chatEndpoint}>mcp.thally.dev/jahce/dabs</span>
        <span className={styles.chatStatus}>Connected</span>
      </div>
      <div aria-live="polite" className={styles.thread}>
        {exchange === null ? (
          <div className={styles.emptyState}>
            <Mcp aria-hidden="true" className={styles.emptyIcon} />
            Pick a question below. The Agent Layer will retrieve from your live docs and answer with sources.
          </div>
        ) : (
          <ChatExchange exchange={exchange} />
        )}
      </div>
      <div className={styles.askRow}>
        <span className={styles.askLabel}>Try asking:</span>
        {QA.map((item, questionIndex) => (
          <button
            aria-pressed={exchange?.questionIndex === questionIndex}
            className={`${styles.questionChip} ${
              exchange?.questionIndex === questionIndex ? styles.questionChipActive : ""
            }`}
            key={item.question}
            onClick={() => ask(questionIndex)}
            type="button"
          >
            {item.question}
          </button>
        ))}
      </div>
    </div>
  );
}
