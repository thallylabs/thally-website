/**
 * Public Thally Migration & Hosting feature page.
 *
 * Static marketing page with a deterministic migration console demo.
 * No credentials or network calls; the demo runs entirely on mock data.
 */

import type { Metadata } from "next";
import { SiDocusaurus, SiGitbook, SiMarkdown, SiMintlify, SiNextra, SiVitepress } from "react-icons/si";

import {
  FeatureBanner,
  PartnerStrip,
  ProcessCards,
  QuotePanels,
} from "@/components/feature-template/feature-template";
import type { ThallyIcon } from "@/components/icons";
import {
  Check,
  Data,
  GitBranch,
  GitPullRequest,
  Globe,
  RefreshCw,
  Trust,
  Workspace,
} from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { SITE_URL } from "@/lib/site";

import { MigrationDemo } from "./migration-demo";

export const metadata: Metadata = {
  title: "Thally Migration & Hosting: Import Docs, Host Them at the Edge",
  description:
    "Import your documentation from GitBook, Mintlify, Docusaurus, or plain Markdown. Thally converts it into a connected graph and hosts it on a global edge with SSL, preview deploys, and instant rollback.",
  alternates: {
    canonical: "/features/migration-hosting",
  },
  openGraph: {
    title: "Bring your docs. We'll host them.",
    description:
      "Import from GitBook, Mintlify, Docusaurus, or plain Markdown. Thally builds the graph and deploys your docs to a global edge in a single step.",
    url: `${SITE_URL}/features/migration-hosting`,
  },
};

const hostingFeatures: {
  description: string;
  icon: ThallyIcon;
  meta: string;
  tag: string;
  title: string;
}[] = [
  {
    icon: Globe,
    title: "Global edge",
    meta: "6 regions",
    description: "Static pages and machine formats served from the edge, close to every reader and every agent.",
    tag: "Fast everywhere",
  },
  {
    icon: GitPullRequest,
    title: "Preview deploys",
    meta: "per branch",
    description: "Every pull request gets its own URL, so drafts are reviewed exactly as they'll ship.",
    tag: "Review live",
  },
  {
    icon: Workspace,
    title: "Custom domains",
    meta: "docs.you.com",
    description: "Point your domain, get automatic SSL, and keep your brand. No subdomain required.",
    tag: "Your domain",
  },
  {
    icon: RefreshCw,
    title: "Instant rollback",
    meta: "one click",
    description: "Every deploy is immutable and versioned. Revert to any previous build in a click.",
    tag: "Safe to ship",
  },
  {
    icon: Data,
    title: "Analytics",
    meta: "privacy-first",
    description: "See which pages readers and agents actually reach, without cookies or third-party trackers.",
    tag: "Insight",
  },
  {
    icon: Trust,
    title: "SSL & protection",
    meta: "automatic",
    description: "Certificates, HTTPS, and DDoS protection are on by default on every site and domain.",
    tag: "Secure",
  },
];

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/features/migration-hosting#software`,
  name: "Thally Migration & Hosting",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: `${SITE_URL}/features/migration-hosting`,
  description:
    "Documentation migration and hosting: import from GitBook, Mintlify, Docusaurus, or plain Markdown, build a connected Content Graph, and deploy to a global edge with SSL, preview deploys, and instant rollback.",
  isPartOf: { "@id": `${SITE_URL}/#software` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

/** Static migration board shown inside the banner's glass frame. */
function MigrationBoard() {
  return (
    <div className="grid gap-3 bg-[#07090d] p-5 sm:grid-cols-3 sm:p-8">
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[11px] tracking-wider text-white/45 uppercase">Import from · GitBook</p>
        <p className="mt-2 flex items-center gap-2 font-mono text-sm text-white/90">
          <GitBranch className="text-canvas-accent size-4 shrink-0" />
          jahce/legacy-docs
        </p>
        <p className="mt-3 text-xs leading-relaxed text-white/50">
          128 pages · structure, links, and redirects preserved
        </p>
        <span className="text-canvas-accent bg-canvas-accent/10 mt-4 inline-block rounded-full px-2.5 py-1 text-[11px] font-medium">
          Non-destructive import
        </span>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[11px] tracking-wider text-white/45 uppercase">Conversion</p>
        <div className="mt-2 rounded-lg bg-black/50 p-3 font-mono text-[11px] leading-5">
          <p className="text-white/50">· Converting to MDX and resolving cross-references</p>
          <p className="text-white/50">· Building Content Graph · indexing code samples</p>
          <p className="text-canvas-accent">✓ Machine formats · HTML, Markdown, JSON, llms.txt</p>
        </div>
        <p className="mt-3 text-xs text-white/50">One pass: fetch, convert, build, deploy</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[11px] tracking-wider text-white/45 uppercase">Live site</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="flex items-center gap-2 font-mono text-sm text-white/90">
            <Globe className="text-canvas-accent size-4 shrink-0" />
            jahce.thally.site
          </p>
          <span className="text-canvas-accent bg-canvas-accent/10 rounded-full px-2.5 py-1 text-[11px] font-medium">
            Live
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["iad", "sfo", "lhr", "fra", "sin", "syd"].map((region) => (
            <span key={region} className="rounded-md border border-white/10 px-2 py-1 font-mono text-[11px] text-white/60">
              {region}
            </span>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-white/50">
          <Check className="text-canvas-accent size-3.5" />
          SSL, previews, and rollback included
        </p>
      </div>
    </div>
  );
}

/** Small light mocks for the pastel process cards. */
function ImportVisual() {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/60 p-4">
      <p className="text-xs font-semibold tracking-wider text-[#38332d]/70 uppercase">Sources</p>
      <div className="mt-3 space-y-2">
        {["GitBook space", "Mintlify · mint.json", "Docusaurus · /docs", "Markdown repo"].map((item) => (
          <p
            key={item}
            className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2.5 font-mono text-xs text-[#38332d]"
          >
            <Check className="size-3.5 text-[#38332d]" />
            {item}
          </p>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-[#7c7b79]">Connect a repo or paste a URL</p>
    </div>
  );
}

function BuildVisual() {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/60 p-4">
      <p className="text-xs font-semibold tracking-wider text-[#38332d]/70 uppercase">Content graph</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {["MDX pages", "Resolved links", "Code samples", "Machine formats"].map((item) => (
          <p key={item} className="rounded-lg bg-white/80 px-3 py-3 text-center text-xs font-medium text-[#38332d]">
            {item}
          </p>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-[#7c7b79]">Generated automatically, never hand-maintained</p>
    </div>
  );
}

function DeployVisual() {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/60 p-4">
      <p className="text-xs font-semibold tracking-wider text-[#38332d]/70 uppercase">Deploy</p>
      <div className="mt-3 rounded-lg bg-[#1c1a17] p-3 font-mono text-[11px] leading-5">
        <p className="text-white/70">preview: pr-42.jahce.thally.site</p>
        <p className="text-[#c6f24e]">+ live: jahce.thally.site</p>
        <p className="text-[#c6f24e]">+ ssl issued · edge warm in 6 regions</p>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-[#38332d]">
        <span className="font-medium">Every deploy versioned</span>
        <span className="rounded-full bg-[#38332d] px-2 py-0.5 text-[11px] text-white">rollback in one click</span>
      </div>
    </div>
  );
}

export default function MigrationHostingFeaturePage() {
  return (
    <div className="bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <FeatureBanner
        title="Bring your docs."
        titleAccent="We'll host them."
        description="Import from wherever your documentation lives today: GitBook, Mintlify, Docusaurus, or a folder of Markdown. Thally converts it into a connected graph and puts it live on a global edge, all in one pass."
        primaryCta={{ label: "Run a migration", href: "#migrate" }}
        secondaryCta={{ label: "See what's included", href: "#hosting" }}
        finePrint="Your Markdown stays yours. Imports are non-destructive and reversible."
      >
        <MigrationBoard />
      </FeatureBanner>

      <div id="how">
        <ProcessCards
          title="From your current tool to live, fast."
          steps={[
            {
              label: "Import",
              title: "Import your source",
              subtitle: "GitBook, Mintlify, Docusaurus, or plain Markdown, structure preserved.",
              description:
                "Connect a repo or paste a URL. Thally reads GitBook, Mintlify, Docusaurus, and plain Markdown, preserving structure and links.",
              visual: <ImportVisual />,
            },
            {
              label: "Build",
              title: "Build the graph",
              subtitle: "Your pages become MDX in a Content Graph, machine formats included.",
              description:
                "Your pages become MDX in a Content Graph: cross-links resolved, code samples indexed, machine formats generated automatically.",
              visual: <BuildVisual />,
            },
            {
              label: "Deploy",
              title: "Deploy to the edge",
              subtitle: "Previews on every push; merges go live worldwide in seconds.",
              description:
                "Every push builds a preview; merges go live worldwide in seconds, with SSL, custom domains, and instant rollback included.",
              visual: <DeployVisual />,
            },
          ]}
        />
      </div>

      <QuotePanels
        title="An import, then live."
        media={
          <div className="relative h-full min-h-[420px]">
            <img
              src="/images/admin-dashboard-1600.webp"
              alt="Thally Cloud dashboard with migration and hosting"
              className="absolute inset-0 h-full w-full object-cover object-left-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-8 text-lg font-medium text-white">
              Migration and hosting inside Thally Cloud
            </p>
          </div>
        }
        quote="Structure, links, and redirects carried over automatically. A preview URL to check before you point your domain. Live on the edge in minutes, reversible if you change your mind"
        quoteAttribution="Not a dreaded rewrite: weeks of copy-paste become one import"
        wideQuote="No lock-in, in either direction. Your repository, your renderer, and your domain stay yours: the engine is MIT licensed and hosting is optional. If you ever stop paying, the site can keep running on the open-source engine, hosted wherever you choose"
        wideAttribution="Pay for the service. Keep the site"
      />

      {/* Migration console demo */}
      <section id="migrate" className="bg-canvas pb-[120px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <p className="text-canvas-accent text-sm font-medium tracking-widest uppercase">Live demo</p>
          <SplitReveal as="h2" mode="chars" className="heading-section mt-4 text-white">
            Pick a source. Watch it go live.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mt-5 text-lg text-[#afafaf]">
              Choose where your docs live today and run the migration. Thally fetches, converts, builds the graph, and
              deploys, all in one pass.
            </p>
          </Reveal>
        </div>
        <div className="mx-auto w-full max-w-[1100px] px-5">
          <div className="rounded-[24px] border-[0.83px] border-white/16 bg-[#1c1b1d]/45 p-[13px] backdrop-blur-2xl">
            <div className="overflow-hidden rounded-[14px]">
              <MigrationDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Hosting hairline grid */}
      <section id="hosting" className="bg-canvas pb-[60px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <p className="text-canvas-accent text-sm font-medium tracking-widest uppercase">Hosting</p>
          <SplitReveal as="h2" mode="chars" className="heading-section mt-4 text-white">
            Everything a docs site needs, built in.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mt-5 text-lg text-[#afafaf]">
              Migration hands off to hosting that&apos;s tuned for documentation: fast everywhere, safe to change, and
              yours to point a domain at.
            </p>
          </Reveal>
        </div>
        <div className="mx-auto w-full max-w-[1240px] px-5">
          <Reveal distance={40}>
            <div className="border-canvas-card-stroke grid overflow-hidden rounded-[32px] border sm:grid-cols-3">
              {hostingFeatures.map((feature, i) => (
                <div
                  key={feature.title}
                  className={[
                    "border-canvas-card-stroke flex flex-col items-center gap-4 px-8 py-11 text-center",
                    (i + 1) % 3 !== 0 ? "sm:border-r" : "",
                    i < 3 ? "sm:border-b" : "",
                    i < 5 ? "max-sm:border-b" : "",
                  ].join(" ")}
                >
                  <feature.icon className="text-canvas-foreground size-7" />
                  <div className="flex max-w-[305px] flex-col gap-1.5">
                    <h3 className="text-canvas-foreground text-xl tracking-[-0.04em]">{feature.title}</h3>
                    <p className="font-mono text-xs text-white/45">{feature.meta}</p>
                    <p className="text-canvas-muted text-[15px] leading-relaxed tracking-[-0.03em]">
                      {feature.description}
                    </p>
                  </div>
                  <span className="text-canvas-accent bg-canvas-accent/10 rounded-full px-2.5 py-1 text-[11px] font-medium">
                    {feature.tag}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <PartnerStrip
        title="Imports the tools teams actually use today"
        items={[
          { name: "Mintlify", icon: <SiMintlify /> },
          { name: "Docusaurus", icon: <SiDocusaurus /> },
          { name: "GitBook", icon: <SiGitbook /> },
          { name: "Nextra", icon: <SiNextra /> },
          { name: "VitePress", icon: <SiVitepress /> },
          { name: "Markdown", icon: <SiMarkdown /> },
        ]}
      />
    </div>
  );
}
