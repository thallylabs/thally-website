/**
 * Public Thally Content Graph product page.
 *
 * One MDX source projected to every published surface: rendered HTML,
 * clean Markdown, structured JSON, and llms.txt, all kept in sync.
 */

import type { Metadata } from "next";
import Link from "next/link";

import type { ThallyIcon } from "@/components/icons";
import {
  Account,
  ArrowRight,
  Check,
  Docs,
  DualReader,
  GitBranch,
  Globe,
  Json,
  Leaf,
  Mcp,
  Negotiation,
  RefreshCw,
  Search,
  Structured,
  Terminal,
  Trust,
} from "@/components/icons";
import { DESTINATIONS, SITE_URL } from "@/lib/site";

import { FormatStudio, GraphExplorer } from "./content-graph-demo";
import styles from "./content-graph-page.module.css";

export const metadata: Metadata = {
  title: "Thally Content Graph: Write Once, Speak Every Format",
  description:
    "Author documentation once in MDX. Thally builds a connected graph of pages, concepts, and code, then publishes polished HTML for people and clean, structured formats for machines.",
  alternates: {
    canonical: "/features/content-graph",
  },
  openGraph: {
    title: "Write once. Speak every format.",
    description: "One MDX source becomes rendered HTML, clean Markdown, structured JSON, and llms.txt, always in sync.",
    url: `${SITE_URL}/features/content-graph`,
  },
};

const contentSteps = [
  {
    label: "Step 01",
    title: "Author in MDX",
    description:
      "Write prose, code samples, and components in one MDX file per page. Frontmatter declares the concepts and product surfaces each page describes.",
    icon: Structured,
  },
  {
    label: "Step 02",
    title: "Thally builds the graph",
    description:
      "Every page becomes a node. Thally links pages to the concepts they define, the code they reference, and the product repositories that back them.",
    icon: Negotiation,
  },
  {
    label: "Step 03",
    title: "Publish to every reader",
    description:
      "One URL negotiates its format: rich HTML for people, Markdown and JSON for tools, llms.txt for agents. Same source, no divergence.",
    icon: DualReader,
  },
] as const;

const surfaceCards: {
  description: string;
  format: string;
  icon: ThallyIcon;
  title: string;
  who: string;
  whoIcon: ThallyIcon;
}[] = [
  {
    description: "Typeset pages with code highlighting, navigation, and search: the site your customers read.",
    format: "text/html",
    icon: Globe,
    title: "Rendered HTML",
    who: "For people",
    whoIcon: Account,
  },
  {
    description: "Portable Markdown for pull requests, changelogs, and anywhere plain text belongs.",
    format: "text/markdown",
    icon: Docs,
    title: "Clean Markdown",
    who: "For editors",
    whoIcon: Account,
  },
  {
    description: "Every block, concept reference, and piece of evidence as data, for pipelines and custom renderers.",
    format: "application/json",
    icon: Json,
    title: "Structured JSON",
    who: "For tools",
    whoIcon: Terminal,
  },
  {
    description: "A compact, machine-first projection that gives AI tools grounded, current context with sources.",
    format: "agent context",
    icon: Mcp,
    title: "llms.txt",
    who: "For agents",
    whoIcon: DualReader,
  },
  {
    description: "Concept-aware index built from the graph: results that understand what a page actually defines.",
    format: "index shard",
    icon: Search,
    title: "Search index",
    who: "For search",
    whoIcon: Terminal,
  },
  {
    description: "Each node carries the commit and symbol it describes, so every claim traces back to the product.",
    format: "source refs",
    icon: GitBranch,
    title: "Evidence links",
    who: "Receipts",
    whoIcon: Trust,
  },
];

const oldWayItems = [
  "The HTML docs, the README, and the AI context drift apart the moment one changes.",
  "Machine formats are hand-written afterthoughts, stale within a release.",
  "A single fact lives in five places; correcting it means five edits and four mistakes.",
  "No system knows which surfaces a product change should touch.",
];

const graphWayItems = [
  "One MDX source is the truth; every format is derived, never duplicated.",
  "HTML, Markdown, JSON, and llms.txt regenerate together on every change.",
  "Fix a fact once; the graph propagates it to every connected surface.",
  "The graph knows exactly which pages a product change affects.",
];

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/features/content-graph#software`,
  name: "Thally Content Graph",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: `${SITE_URL}/features/content-graph`,
  description:
    "A content graph that turns one MDX source into rendered HTML, clean Markdown, structured JSON, and llms.txt, keeping every published surface in sync.",
  isPartOf: { "@id": `${SITE_URL}/#software` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function ContentGraphFeaturePage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <header className={styles.hero}>
        <div aria-hidden="true" className={styles.heroGrid} />
        <h1>
          Write once. <span>Speak every format.</span>
        </h1>
        <p className={styles.heroDescription}>
          Author your documentation once in MDX. Thally turns it into a connected graph of pages, concepts, and code,
          then publishes each node as polished HTML for people and clean, structured formats for machines.
        </p>
        <div className={styles.heroActions}>
          <a className={`${styles.button} ${styles.primaryButton}`} href="#studio">
            See it transform <ArrowRight />
          </a>
          <a className={styles.textLink} href="#graph">
            Explore the graph <ArrowRight />
          </a>
        </div>
        <div className={styles.surfaceStrip}>
          <span className={styles.surfaceChip}>
            <Structured /> page.mdx
          </span>
          <span aria-hidden="true" className={`${styles.surfaceChip} ${styles.surfaceChipArrow}`}>
            <ArrowRight />
          </span>
          <span className={styles.surfaceChip}>
            <Globe /> HTML
          </span>
          <span className={styles.surfaceChip}>
            <Docs /> Markdown
          </span>
          <span className={styles.surfaceChip}>
            <Json /> JSON
          </span>
          <span className={styles.surfaceChip}>
            <Mcp /> llms.txt
          </span>
          <span className={styles.surfaceChip}>
            <Terminal /> Search index
          </span>
        </div>
      </header>

      <section className={`${styles.section} ${styles.sectionAlt}`} id="how">
        <div className={styles.sectionHeading}>
          <h2>One source. Many surfaces.</h2>
          <p>
            Documentation, SDK references, examples, and AI context are usually maintained separately. The Content Graph
            keeps them as one thing: authored once, projected everywhere.
          </p>
        </div>
        <div className={styles.stepsGrid}>
          {contentSteps.map((step) => {
            const StepIcon = step.icon;
            return (
              <article className={styles.stepCard} key={step.label}>
                <div className={styles.stepNumber}>{step.label}</div>
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
            <strong>The product is the source of truth.</strong> The graph is not another place to store knowledge; it
            is the pipeline that keeps every surface synchronized as your product evolves, so machines and humans always
            read the same thing.
          </p>
        </aside>
      </section>

      <section className={styles.section} id="studio">
        <div className={styles.sectionHeading}>
          <h2>One source, every format.</h2>
          <p>
            Here&apos;s a real page authored in MDX on the left. Switch the format on the right to see exactly what each
            reader receives, all projected from the single source, never hand-maintained.
          </p>
        </div>
        <FormatStudio />
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} id="graph">
        <div className={styles.sectionHeading}>
          <h2>Your knowledge, as a graph.</h2>
          <p>
            Every page you write joins a graph unique to your product. Thally learns how one source connects to the
            concepts it defines, the surfaces it publishes to, and the code that proves it, so a single change ripples
            exactly where it should.
          </p>
        </div>
        <GraphExplorer />
        <aside className={styles.honestyPanel}>
          <Leaf className={styles.honestyIcon} />
          <p>
            <strong>Competitors can copy features; they can&apos;t copy this.</strong> The graph strengthens with every
            accepted review, correction, and release: years of product-specific understanding that make each change
            propagate more precisely than the last.
          </p>
        </aside>
      </section>

      <section className={styles.section} id="surfaces">
        <div className={styles.sectionHeading}>
          <h2>Every reader gets their format.</h2>
          <p>
            A URL in the Content Graph negotiates its representation. People get a rendered page; tools and agents get
            clean structure from the same node, always in sync.
          </p>
        </div>
        <div className={styles.surfacesGrid}>
          {surfaceCards.map((card) => {
            const CardIcon = card.icon;
            const WhoIcon = card.whoIcon;
            return (
              <article className={styles.surfaceCard} key={card.title}>
                <div className={styles.surfaceHead}>
                  <CardIcon />
                  <b>{card.title}</b>
                  <span className={styles.surfaceFormat}>{card.format}</span>
                </div>
                <p>{card.description}</p>
                <span className={styles.surfaceWho}>
                  <WhoIcon /> {card.who}
                </span>
              </article>
            );
          })}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} id="why">
        <div className={styles.sectionHeading}>
          <h2>Write once, or maintain forever.</h2>
          <p>
            Keeping separate documents, references, and AI context in sync is work nobody owns. The graph makes that
            work disappear.
          </p>
        </div>
        <div className={styles.compare}>
          <div className={`${styles.compareCol} ${styles.compareColBad}`}>
            <div className={styles.compareHead}>
              <div className={styles.compareLabel}>The old way</div>
              <h3>Maintain many copies</h3>
            </div>
            <ul>
              {oldWayItems.map((item) => (
                <li key={item}>
                  <RefreshCw /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.compareCol} ${styles.compareColGood}`}>
            <div className={styles.compareHead}>
              <div className={styles.compareLabel}>With Content Graph</div>
              <h3>Write once, project everywhere</h3>
            </div>
            <ul>
              {graphWayItems.map((item) => (
                <li key={item}>
                  <Check /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section} id="start">
        <div className={styles.ctaCard}>
          <div aria-hidden="true" className={styles.ctaGrid} />
          <h2>Author once. Let the graph do the rest.</h2>
          <p>
            Point Thally at your MDX and watch it become a living graph: published, in sync, for every reader you have
            and the agents you don&apos;t yet.
          </p>
          <div className={styles.ctaActions}>
            <a className={`${styles.button} ${styles.primaryButton}`} href={DESTINATIONS.signup}>
              Create your site <ArrowRight />
            </a>
            <Link className={styles.textLink} href="/features/track">
              See how Track uses the graph <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
