/**
 * Public Thally Content Graph product page.
 *
 * One MDX source projected to every published surface: rendered HTML,
 * clean Markdown, structured JSON, and llms.txt, all kept in sync.
 */

import type { Metadata } from "next";
import { SiCloudflare, SiGithub, SiMarkdown, SiNetlify, SiVercel } from "react-icons/si";

import {
  BannerBoard,
  FeatureBanner,
  PartnerStrip,
  QuotePanels,
} from "@/components/feature-template/feature-template";
import type { ThallyIcon } from "@/components/icons";
import {
  Docs,
  GitBranch,
  Globe,
  Json,
  Mcp,
  Search,
  Structured,
} from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import KnowledgeFlowGraph from "@/components/sections/knowledge-flow-graph";
import { SITE_URL } from "@/lib/site";

import { FormatStudio, GraphExplorer } from "./content-graph-demo";

export const metadata: Metadata = {
  title: "Thally Content Graph: Write Once, Speak Every Format",
  description:
    "Author your documentation once in MDX. Thally builds it into a graph of pages, concepts, and code, and publishes every surface (site, Markdown, JSON, llms.txt) from that one source, so every reader sees the same truth.",
  alternates: {
    canonical: "/features/content-graph",
  },
  openGraph: {
    title: "Write once. Speak every format.",
    description: "One MDX source becomes rendered HTML, clean Markdown, structured JSON, and llms.txt, always in sync.",
    url: `${SITE_URL}/features/content-graph`,
  },
};

const surfaceCards: {
  description: string;
  format: string;
  icon: ThallyIcon;
  title: string;
  who: string;
}[] = [
  {
    description: "Typeset pages with code highlighting, navigation, and search: the site your customers read.",
    format: "text/html",
    icon: Globe,
    title: "Rendered HTML",
    who: "For people",
  },
  {
    description: "Portable Markdown for pull requests, changelogs, and anywhere plain text belongs.",
    format: "text/markdown",
    icon: Docs,
    title: "Clean Markdown",
    who: "For editors",
  },
  {
    description: "Every block, concept reference, and piece of evidence as data, for pipelines and custom renderers.",
    format: "application/json",
    icon: Json,
    title: "Structured JSON",
    who: "For tools",
  },
  {
    description: "A compact, machine-first projection that gives AI tools grounded, current context with sources.",
    format: "agent context",
    icon: Mcp,
    title: "llms.txt",
    who: "For agents",
  },
  {
    description: "Concept-aware index built from the graph: results that understand what a page actually defines.",
    format: "index shard",
    icon: Search,
    title: "Search index",
    who: "For search",
  },
  {
    description: "Each node carries the commit and symbol it describes, so every claim traces back to the product.",
    format: "source refs",
    icon: GitBranch,
    title: "Evidence links",
    who: "Receipts",
  },
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

/** Dense source-to-surfaces board shown inside the banner's glass frame. */
function ProjectionBoard() {
  return (
    <BannerBoard
      columns={[
        [
          { kind: "summary", progress: 76, avatars: 4, links: 9, comments: 2 },
          {
            kind: "task",
            chips: [
              { label: "Source", tone: "purple" },
              { label: "docs/sdk", tone: "kind" },
            ],
            id: "MDX",
            title: "guides/quickstart.mdx",
            desc: "title: Quickstart · concepts: [client, timeout, retries]",
            mono: true,
            avatars: 2,
            links: 3,
            comments: 4,
          },
          { kind: "filler", h: 120 },
        ],
        [
          {
            kind: "visual",
            chips: [
              { label: "Build", tone: "high" },
              { label: "Graph", tone: "purple" },
            ],
            id: "G-114",
            icon: <Structured className="text-canvas-accent size-9" />,
            title: "Typed content graph",
            desc: "Pages, concepts, and code linked as one graph.",
          },
          {
            kind: "task",
            chips: [
              { label: "Linked", tone: "med" },
              { label: "Concepts", tone: "kind" },
            ],
            title: "3 concepts · 2 code refs",
            desc: "Every page becomes a node in your product's graph.",
            progress: 60,
            avatars: 3,
            links: 2,
            comments: 3,
          },
          { kind: "filler", h: 140 },
        ],
        [
          {
            kind: "checklist",
            chips: [
              { label: "Published", tone: "low" },
              { label: "Surfaces", tone: "kind" },
            ],
            id: "P-208",
            title: "Projected to every surface",
            desc: "Same source, never out of step",
            items: [
              { label: "Rendered HTML", done: true },
              { label: "Clean Markdown", done: true },
              { label: "Structured JSON", done: true },
              { label: "llms.txt", done: true },
            ],
          },
          { kind: "filler", h: 110 },
          {
            kind: "task",
            chips: [
              { label: "Index", tone: "med" },
              { label: "Search", tone: "kind" },
            ],
            title: "Search index rebuilt",
            desc: "Concept-aware results built from the graph.",
            avatars: 2,
            links: 1,
          },
        ],
        [
          {
            kind: "task",
            chips: [
              { label: "Receipts", tone: "high" },
              { label: "Evidence", tone: "kind" },
            ],
            id: "E-410",
            title: "evidence: bono@a1f9c2",
            desc: "Each node carries the commit and symbol it describes.",
            mono: true,
            progress: 100,
            avatars: 3,
            links: 5,
            comments: 1,
          },
          {
            kind: "task",
            chips: [
              { label: "Agents", tone: "purple" },
              { label: "llms.txt", tone: "kind" },
            ],
            title: "/llms.txt",
            desc: "Compact, machine-first projection with sources.",
            mono: true,
            avatars: 2,
            links: 2,
            comments: 2,
          },
          { kind: "filler", h: 130 },
        ],
      ]}
    />
  );
}

/** Author -> Build -> Publish steps for the numbered workflow strip. */
const workflowSteps: {
  description: string;
  icon: ThallyIcon;
  label: string;
  title: string;
}[] = [
  {
    label: "Author",
    title: "Author in MDX",
    description:
      "Write prose, code samples, and components in one MDX file per page. Frontmatter names the concepts and product surfaces the page covers.",
    icon: Structured,
  },
  {
    label: "Build",
    title: "Thally builds the graph",
    description:
      "Every page becomes a node, linked to the concepts it defines, the code it references, and the product repositories that back it.",
    icon: GitBranch,
  },
  {
    label: "Publish",
    title: "Publish to every reader",
    description:
      "One URL serves each reader the right format: rich HTML for people, Markdown and JSON for tools, llms.txt for agents. Same source, never out of step.",
    icon: Globe,
  },
];

export default function ContentGraphFeaturePage() {
  return (
    <div className="bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <FeatureBanner
        layout="offset"
        title="Write once."
        titleAccent="Speak every format."
        description="Author your documentation once in MDX. Thally builds it into a graph of pages, concepts, and code, and every published surface (the site, Markdown, JSON, llms.txt) is a projection of that one source. Change it once and every reader sees the same truth."
        primaryCta={{ label: "See it transform", href: "#studio" }}
        secondaryCta={{ label: "Explore the graph", href: "#graph" }}
      >
        <ProjectionBoard />
      </FeatureBanner>

      {/* Numbered workflow strip */}
      <section id="how" className="bg-canvas py-[120px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section text-white">
            One source. Many surfaces.
          </SplitReveal>
          <div className="bg-canvas-card-stroke mx-auto mt-8 h-px w-24" />
        </div>
        <div className="mx-auto w-full max-w-[1240px] px-5">
          <div className="border-canvas-card-stroke grid overflow-hidden rounded-[32px] border sm:grid-cols-3">
            {workflowSteps.map((step, i) => (
              <Reveal
                key={step.label}
                delay={0.1 + i * 0.12}
                distance={30}
                className={[
                  "border-canvas-card-stroke",
                  i < 2 ? "sm:border-r" : "",
                  i < 2 ? "max-sm:border-b" : "",
                ].join(" ")}
              >
                <div className="flex h-full flex-col gap-5 p-10">
                  <p className="text-canvas-muted-2 font-mono text-xs tracking-widest uppercase">
                    Step 0{i + 1} · {step.label}
                  </p>
                  <step.icon className="text-canvas-foreground size-7" />
                  <h3 className="text-xl tracking-[-0.04em] text-white">{step.title}</h3>
                  <p className="text-canvas-muted text-[15px] leading-relaxed tracking-[-0.03em]">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <QuotePanels
        title="Author once. Let the graph do the rest."
        media={<KnowledgeFlowGraph className="h-full w-full" />}
        quote="One MDX source is the truth; every format is derived, never duplicated. Fix a fact once and the graph propagates it to every connected surface."
        quoteAttribution="Write once, or maintain forever"
        wideQuote="The graph is not another place to store knowledge; it is the pipeline that keeps every surface synchronized as your product evolves, so machines and humans always read the same thing."
        wideAttribution="The product is the source of truth"
      />

      {/* Format studio demo */}
      <section id="studio" className="bg-canvas pb-[120px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section mt-4 text-white">
            One source, every format.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mt-5 text-lg text-[#afafaf]">
              The left pane is a real page authored in MDX. Switch formats on the right to see exactly what each reader
              receives: every projection generated from that one source, none of it hand-maintained.
            </p>
          </Reveal>
        </div>
        <div className="mx-auto w-full max-w-[1180px] px-5">
          <div className="overflow-hidden rounded-[14px]">
            <FormatStudio />
          </div>
        </div>
      </section>

      {/* Graph explorer demo */}
      <section id="graph" className="bg-canvas pb-[120px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section mt-4 text-white">
            Your knowledge, as a graph.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mt-5 text-lg text-[#afafaf]">
              Every page you write joins a graph unique to your product. Thally learns how one source connects to the
              concepts it defines, the surfaces it publishes to, and the code that proves it, so a single change
              ripples exactly where it should.
            </p>
          </Reveal>
        </div>
        <div className="mx-auto w-full max-w-[1180px] px-5">
          <div className="overflow-hidden rounded-[14px]">
            <GraphExplorer />
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-[#7c7b79]">
            The graph gets sharper the longer it runs. Every accepted review, correction, and release teaches it more
            about your product, so each change propagates more precisely than the last.
          </p>
        </div>
      </section>

      {/* Surfaces hairline grid */}
      <section id="surfaces" className="bg-canvas pb-[60px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section mt-4 text-white">
            Every reader gets their format.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mt-5 text-lg text-[#afafaf]">
              Every URL in the Content Graph answers in the format its reader asks for. People get a rendered page;
              tools and agents get clean structure from the same node, always in sync.
            </p>
          </Reveal>
        </div>
        <div className="mx-auto w-full max-w-[1240px] px-5">
          <Reveal distance={40}>
            <div className="border-canvas-card-stroke grid overflow-hidden rounded-[32px] border sm:grid-cols-3">
              {surfaceCards.map((card, i) => (
                <div
                  key={card.title}
                  className={[
                    "border-canvas-card-stroke flex flex-col items-center gap-4 px-8 py-11 text-center",
                    (i + 1) % 3 !== 0 ? "sm:border-r" : "",
                    i < 3 ? "sm:border-b" : "",
                    i < 5 ? "max-sm:border-b" : "",
                  ].join(" ")}
                >
                  <card.icon className="text-canvas-foreground size-7" />
                  <div className="flex max-w-[305px] flex-col gap-1.5">
                    <h3 className="text-canvas-foreground text-xl tracking-[-0.04em]">{card.title}</h3>
                    <p className="font-mono text-xs text-white/45">{card.format}</p>
                    <p className="text-canvas-muted text-[15px] leading-relaxed tracking-[-0.03em]">
                      {card.description}
                    </p>
                  </div>
                  <span className="text-canvas-accent bg-canvas-accent/10 rounded-full px-2.5 py-1 text-[11px] font-medium">
                    {card.who}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <PartnerStrip
        title="Ready for the readers you have today and the agents arriving tomorrow"
        items={[
          { name: "GitHub", icon: <SiGithub /> },
          { name: "Markdown", icon: <SiMarkdown /> },
          { name: "MCP", icon: <Mcp /> },
          { name: "Vercel", icon: <SiVercel /> },
          { name: "Netlify", icon: <SiNetlify /> },
          { name: "Cloudflare", icon: <SiCloudflare /> },
        ]}
      />
    </div>
  );
}
