/**
 * Public Thally Agent Layer product page.
 *
 * Ported from the design handoff feature page. The interactive Q&A demo
 * lives in agent-layer-demo.tsx; everything here is static.
 */

import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowRight,
  Check,
  Code,
  DualReader,
  GitBranch,
  Json,
  Leaf,
  Lock,
  Mcp,
  RefreshCw,
  Terminal,
  Trust,
} from "@/components/icons";
import { DESTINATIONS, SITE_URL } from "@/lib/site";

import { AgentLayerDemo } from "./agent-layer-demo";
import styles from "./agent-layer-page.module.css";

export const metadata: Metadata = {
  title: "Thally Agent Layer: Grounded Answers for AI Agents",
  description:
    "The Agent Layer publishes your documentation as llms.txt, MCP tools, and structured JSON, and serves it with the evidence to back every answer, so nothing is guessed.",
  alternates: {
    canonical: "/features/agent-layer",
  },
  openGraph: {
    title: "Answers, with receipts.",
    description:
      "Publish your documentation in the formats AI agents read best, served with the evidence to back every answer.",
    url: `${SITE_URL}/features/agent-layer`,
  },
};

const steps = [
  {
    label: "Step 01",
    title: "Publish machine surfaces",
    icon: Mcp,
    description: (
      <>
        Every page emits an <code>llms.txt</code> projection: compact, prose-light, and stripped of layout noise so a
        model spends its context on facts.
      </>
    ),
  },
  {
    label: "Step 02",
    title: "Expose an MCP endpoint",
    icon: Terminal,
    description: (
      <>
        Thally serves your docs as Model Context Protocol tools. Agents can search, fetch, and cite pages directly. No
        scraping, no stale copy.
      </>
    ),
  },
  {
    label: "Step 03",
    title: "Answer with evidence",
    icon: Trust,
    description: (
      <>
        Each response carries the pages and commits it drew from. When your product changes, the answer changes:
        grounded, never guessed.
      </>
    ),
  },
] as const;

const surfaces = [
  {
    icon: Mcp,
    title: "llms.txt",
    format: "/llms.txt",
    description:
      "A compact index and per-page projection that fits an agent's context budget: facts first, layout gone.",
    whoIcon: DualReader,
    who: "Context",
  },
  {
    icon: Terminal,
    title: "MCP tools",
    format: "search · fetch",
    description:
      "Standard Model Context Protocol tools let agents query your docs live inside the editor or assistant.",
    whoIcon: Terminal,
    who: "Tools",
  },
  {
    icon: Json,
    title: "Structured JSON",
    format: "application/json",
    description: "Concept references and blocks as data, so pipelines and custom agents parse meaning, not markup.",
    whoIcon: Code,
    who: "Parsing",
  },
  {
    icon: GitBranch,
    title: "Evidence links",
    format: "source refs",
    description: "Every fact traces to a commit and symbol in your product: the receipts behind each answer.",
    whoIcon: Trust,
    who: "Receipts",
  },
  {
    icon: RefreshCw,
    title: "Freshness signals",
    format: "updated-at",
    description: "Each surface carries when it last synced with the product, so agents can prefer current facts.",
    whoIcon: RefreshCw,
    who: "Recency",
  },
  {
    icon: Lock,
    title: "Scoped access",
    format: "per-surface",
    description: "Decide which surfaces are public to agents and which stay internal: granular, revocable, read-only.",
    whoIcon: Lock,
    who: "Control",
  },
] as const;

const ungroundedPoints = [
  "Answers from training data months or years out of date.",
  "Invents parameters and defaults that never existed.",
  "No way to check where an answer came from.",
  "Sounds equally sure whether it's right or hallucinating.",
] as const;

const groundedPoints = [
  "Reads your live docs, regenerated on every product change.",
  "Cites the exact page and commit behind each claim.",
  "Says less when it knows less. No evidence, no assertion.",
  "You control what's exposed and can revoke it anytime.",
] as const;

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/features/agent-layer#software`,
  name: "Thally Agent Layer",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: `${SITE_URL}/features/agent-layer`,
  description:
    "Publishes documentation as llms.txt, Model Context Protocol tools, and structured JSON, with source evidence behind every answer an agent gives.",
  isPartOf: { "@id": `${SITE_URL}/#software` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function AgentLayerFeaturePage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <header className={styles.hero}>
        <div aria-hidden="true" className={styles.heroGrid} />
        <h1>
          Answers, <span>with receipts.</span>
        </h1>
        <p className={styles.heroDescription}>
          The tools your customers use to code are AI agents. The Agent Layer publishes your documentation in the
          formats those agents read best, and serves it with the evidence to back every answer, so nothing is guessed.
        </p>
        <div className={styles.heroActions}>
          <a className={`${styles.button} ${styles.primaryButton}`} href="#ask">
            Ask like an agent <ArrowRight />
          </a>
          <a className={styles.textLink} href="#surfaces">
            What agents receive <ArrowRight />
          </a>
        </div>
        <div className={styles.toolstrip}>
          <span className={styles.toolPill}>
            <Mcp aria-hidden="true" /> llms.txt
          </span>
          <span className={styles.toolPill}>
            <Mcp aria-hidden="true" /> MCP endpoint
          </span>
          <span className={styles.toolPill}>
            <Json aria-hidden="true" /> structured JSON
          </span>
          <span className={styles.toolPill}>
            <Trust aria-hidden="true" /> source evidence
          </span>
        </div>
      </header>

      <section className={`${styles.section} ${styles.sectionAlt}`} id="how">
        <div className={styles.sectionHeading}>
          <h2>Docs an agent can actually reason about.</h2>
          <p>
            Human documentation is written for eyes (navigation, layout, prose). Agents need something cleaner: current
            facts, clearly scoped, with sources. The Agent Layer projects both from one graph.
          </p>
        </div>
        <div className={styles.stepsGrid}>
          {steps.map((step) => {
            const StepIcon = step.icon;
            return (
              <article className={styles.stepCard} key={step.label}>
                <div className={styles.stepLabel}>{step.label}</div>
                <span className={styles.stepIcon}>
                  <StepIcon />
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            );
          })}
        </div>
        <aside className={styles.honestyPanel}>
          <Leaf className={styles.honestyIcon} />
          <p>
            <strong>Evidence before confidence.</strong>&#32;An agent that can&apos;t cite a source shouldn&apos;t sound
            certain. The Agent Layer ties every answer to a page and a commit, so trust is earned, not asserted.
          </p>
        </aside>
      </section>

      <section className={styles.section} id="ask">
        <div className={styles.sectionHeading}>
          <h2>Ask like an agent would.</h2>
          <p>
            This is your documentation answering through the Agent Layer. Pick a question, then watch it retrieve from
            the graph, answer in plain terms, and show exactly where each fact came from.
          </p>
        </div>
        <AgentLayerDemo />
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} id="surfaces">
        <div className={styles.sectionHeading}>
          <h2>Built for machines, without the guesswork.</h2>
          <p>
            Everything an AI tool needs to answer accurately about your product, served from the same source your
            customers read.
          </p>
        </div>
        <div className={styles.featureGrid}>
          {surfaces.map((surface) => {
            const SurfaceIcon = surface.icon;
            const WhoIcon = surface.whoIcon;
            return (
              <article className={styles.featureCell} key={surface.title}>
                <div className={styles.cellHead}>
                  <SurfaceIcon aria-hidden="true" />
                  <b>{surface.title}</b>
                  <span className={styles.cellFormat}>{surface.format}</span>
                </div>
                <p>{surface.description}</p>
                <span className={styles.cellWho}>
                  <WhoIcon aria-hidden="true" /> {surface.who}
                </span>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.section} id="trust">
        <div className={styles.sectionHeading}>
          <h2>Grounded beats confident.</h2>
          <p>
            An agent guessing about your API is worse than no agent at all. The Agent Layer replaces plausible-sounding
            fiction with sourced fact.
          </p>
        </div>
        <div className={styles.comparison}>
          <div className={`${styles.comparisonColumn} ${styles.comparisonBad}`}>
            <div className={styles.columnHead}>
              <div className={styles.columnLabel}>Ungrounded model</div>
              <h3>Confidently wrong</h3>
            </div>
            <ul>
              {ungroundedPoints.map((point) => (
                <li key={point}>
                  <RefreshCw aria-hidden="true" /> {point}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.comparisonColumn} ${styles.comparisonGood}`}>
            <div className={styles.columnHead}>
              <div className={styles.columnLabel}>Through the Agent Layer</div>
              <h3>Sourced and current</h3>
            </div>
            <ul>
              {groundedPoints.map((point) => (
                <li key={point}>
                  <Check aria-hidden="true" /> {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} id="start">
        <div className={styles.ctaCard}>
          <div aria-hidden="true" className={styles.ctaGrid} />
          <h2>Give every agent grounded answers.</h2>
          <p>
            Turn on the Agent Layer and your documentation becomes an MCP endpoint and llms.txt feed: current, cited,
            and scoped exactly how you want.
          </p>
          <div className={styles.ctaActions}>
            <a className={`${styles.button} ${styles.primaryButton}`} href={DESTINATIONS.signup}>
              Enable the Agent Layer <ArrowRight />
            </a>
            <Link className={styles.textLink} href="/features/content-graph">
              See where the formats come from <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
