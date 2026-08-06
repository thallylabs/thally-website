/**
 * Public Thally Content Graph product page.
 *
 * One MDX source projected to every published surface: rendered HTML,
 * clean Markdown, structured JSON, and llms.txt, all kept in sync.
 */

import type { Metadata } from "next";
import { SiCloudflare, SiGithub, SiMarkdown, SiNetlify, SiVercel } from "react-icons/si";

import {
  FeatureBanner,
  PartnerStrip,
  ProcessCards,
  QuotePanels,
} from "@/components/feature-template/feature-template";
import type { ThallyIcon } from "@/components/icons";
import {
  Check,
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

/** Static source-to-surfaces board shown inside the banner's glass frame. */
function ProjectionBoard() {
  return (
    <div className="grid gap-3 bg-[#07090d] p-5 sm:grid-cols-3 sm:p-8">
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[11px] tracking-wider text-white/45 uppercase">Source · docs/sdk</p>
        <p className="mt-2 flex items-center gap-2 font-mono text-sm text-white/90">
          <Structured className="text-canvas-accent size-4 shrink-0" />
          sending-jobs.mdx
        </p>
        <div className="mt-3 rounded-lg bg-black/50 p-3 font-mono text-[11px] leading-5 text-white/60">
          <p>title: Sending a job</p>
          <p>surface: sdk</p>
          <p>concepts: [client, timeout, retries]</p>
        </div>
        <span className="text-canvas-accent bg-canvas-accent/10 mt-4 inline-block rounded-full px-2.5 py-1 text-[11px] font-medium">
          One MDX file per page
        </span>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[11px] tracking-wider text-white/45 uppercase">Content graph</p>
        <div className="mt-2 space-y-2">
          {[
            ["concepts defined", "3 linked"],
            ["code references", "2 linked"],
            ["product repos", "1 linked"],
          ].map(([edge, count]) => (
            <div key={edge} className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2.5">
              <span className="font-mono text-xs text-white/80">{edge}</span>
              <span className="text-canvas-accent text-[11px] font-medium">{count}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-white/50">Every page becomes a node in your product&apos;s graph</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[11px] tracking-wider text-white/45 uppercase">Published surfaces</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {["HTML", "Markdown", "JSON", "llms.txt", "Search index", "Evidence"].map((surface) => (
            <p
              key={surface}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-2 text-xs text-white/80"
            >
              <Check className="text-canvas-accent size-3.5 shrink-0" />
              {surface}
            </p>
          ))}
        </div>
        <p className="mt-3 text-xs text-white/50">Same source, never out of step</p>
      </div>
    </div>
  );
}

/** Small light mocks for the pastel process cards. */
function AuthorVisual() {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/60 p-4">
      <p className="text-xs font-semibold tracking-wider text-[#38332d]/70 uppercase">sending-jobs.mdx</p>
      <div className="mt-3 space-y-2">
        {["title: Sending a job", "surface: sdk", "concepts: [client, timeout]", "# Sending a job"].map((line) => (
          <p key={line} className="rounded-lg bg-white/80 px-3 py-2.5 font-mono text-xs text-[#38332d]">
            {line}
          </p>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-[#7c7b79]">Prose, code samples, and components in one file</p>
    </div>
  );
}

function GraphVisual() {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/60 p-4">
      <p className="text-xs font-semibold tracking-wider text-[#38332d]/70 uppercase">One node, many edges</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {["Concepts", "Code refs", "Product repos", "Surfaces"].map((item) => (
          <p key={item} className="rounded-lg bg-white/80 px-3 py-3 text-center text-xs font-medium text-[#38332d]">
            {item}
          </p>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-[#7c7b79]">Linked automatically on every build</p>
    </div>
  );
}

function PublishVisual() {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/60 p-4">
      <p className="text-xs font-semibold tracking-wider text-[#38332d]/70 uppercase">One URL</p>
      <div className="mt-3 rounded-lg bg-[#1c1a17] p-3 font-mono text-[11px] leading-5">
        <p className="text-white/70">GET /sdk/sending-jobs</p>
        <p className="text-[#c6f24e]">GET /sdk/sending-jobs.md</p>
        <p className="text-[#c6f24e]">GET /sdk/sending-jobs.json</p>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-[#38332d]">
        <span className="font-medium">llms.txt for agents</span>
        <span className="rounded-full bg-[#38332d] px-2 py-0.5 text-[11px] text-white">always in sync</span>
      </div>
    </div>
  );
}

export default function ContentGraphFeaturePage() {
  return (
    <div className="bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <FeatureBanner
        title="Write once."
        titleAccent="Speak every format."
        description="Author your documentation once in MDX. Thally builds it into a graph of pages, concepts, and code, and every published surface (the site, Markdown, JSON, llms.txt) is a projection of that one source. Change it once and every reader sees the same truth."
        primaryCta={{ label: "See it transform", href: "#studio" }}
        secondaryCta={{ label: "Explore the graph", href: "#graph" }}
      >
        <ProjectionBoard />
      </FeatureBanner>

      <div id="how">
        <ProcessCards
          title="One source. Many surfaces."
          steps={[
            {
              label: "Author",
              title: "Author in MDX",
              subtitle: "Prose, code samples, and components in one MDX file per page.",
              description:
                "Write prose, code samples, and components in one MDX file per page. Frontmatter names the concepts and product surfaces the page covers.",
              visual: <AuthorVisual />,
            },
            {
              label: "Build",
              title: "Thally builds the graph",
              subtitle: "Every page becomes a node linked to concepts, code, and repositories.",
              description:
                "Every page becomes a node, linked to the concepts it defines, the code it references, and the product repositories that back it.",
              visual: <GraphVisual />,
            },
            {
              label: "Publish",
              title: "Publish to every reader",
              subtitle: "One URL serves each reader the right format, never out of step.",
              description:
                "One URL serves each reader the right format: rich HTML for people, Markdown and JSON for tools, llms.txt for agents. Same source, never out of step.",
              visual: <PublishVisual />,
            },
          ]}
        />
      </div>

      <QuotePanels
        title="Author once. Let the graph do the rest."
        media={
          <div className="relative h-full min-h-[420px]">
            <img
              src="/images/admin-dashboard-1600.webp"
              alt="Thally Cloud dashboard with the Content Graph"
              className="absolute inset-0 h-full w-full object-cover object-left-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-8 text-lg font-medium text-white">
              The Content Graph inside Thally Cloud
            </p>
          </div>
        }
        quote="One MDX source is the truth; every format is derived, never duplicated. Fix a fact once and the graph propagates it to every connected surface"
        quoteAttribution="Write once, or maintain forever"
        wideQuote="The graph is not another place to store knowledge; it is the pipeline that keeps every surface synchronized as your product evolves, so machines and humans always read the same thing"
        wideAttribution="The product is the source of truth"
      />

      {/* Format studio demo */}
      <section id="studio" className="bg-canvas pb-[120px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <p className="text-canvas-accent text-sm font-medium tracking-widest uppercase">Live demo</p>
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
          <div className="rounded-[24px] border-[0.83px] border-white/16 bg-[#1c1b1d]/45 p-[13px] backdrop-blur-2xl">
            <div className="overflow-hidden rounded-[14px]">
              <FormatStudio />
            </div>
          </div>
        </div>
      </section>

      {/* Graph explorer demo */}
      <section id="graph" className="bg-canvas pb-[120px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <p className="text-canvas-accent text-sm font-medium tracking-widest uppercase">Graph explorer</p>
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
          <div className="rounded-[24px] border-[0.83px] border-white/16 bg-[#1c1b1d]/45 p-[13px] backdrop-blur-2xl">
            <div className="overflow-hidden rounded-[14px]">
              <GraphExplorer />
            </div>
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
          <p className="text-canvas-accent text-sm font-medium tracking-widest uppercase">Surfaces</p>
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
