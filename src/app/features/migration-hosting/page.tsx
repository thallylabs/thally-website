/**
 * Public Thally Migration & Hosting feature page.
 *
 * Static marketing page with a deterministic migration console demo.
 * No credentials or network calls; the demo runs entirely on mock data.
 * Architecture: terminal-first banner, comparison table, live demo,
 * hosting hairline grid, partner strip, closing CTA.
 */

import type { Metadata } from "next";
import { SiDocusaurus, SiGitbook, SiMarkdown, SiMintlify, SiNextra, SiVitepress } from "react-icons/si";

import { FeatureBanner, PartnerStrip } from "@/components/feature-template/feature-template";
import type { ThallyIcon } from "@/components/icons";
import {
  Check,
  Data,
  GitPullRequest,
  Globe,
  RefreshCw,
  Trust,
  Workspace,
} from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { CTA } from "@/components/sections/cta";
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

/** Comparison rows derived from the page's migration and hosting copy. */
const comparisonRows: { label: string; thally: string; usual: string }[] = [
  { label: "Time to live site", usual: "Weeks of rewriting", thally: "One pass" },
  { label: "Your Markdown", usual: "Locked in", thally: "Stays yours, reversible" },
  { label: "Redirects", usual: "Manual", thally: "Carried over" },
  { label: "SSL and edge", usual: "You configure", thally: "Included" },
  { label: "Rollback", usual: "Risky", thally: "One click" },
  { label: "Previews", usual: "None", thally: "Per branch" },
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

/** Static terminal log shown inside the banner's glass frame. */
function MigrationTerminal() {
  return (
    <div className="bg-[#101410]">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5 sm:px-7">
        <span aria-hidden className="size-2.5 rounded-full bg-white/15" />
        <span aria-hidden className="size-2.5 rounded-full bg-white/15" />
        <span aria-hidden className="size-2.5 rounded-full bg-white/15" />
        <p className="ml-3 font-mono text-xs text-white/45">thally migrate · jahce/legacy-docs</p>
        <span className="text-canvas-accent bg-canvas-accent/10 ml-auto rounded-full px-2.5 py-1 text-[11px] font-medium">
          Non-destructive import
        </span>
      </div>
      <div className="px-5 py-6 font-mono text-[13px] leading-8 sm:px-7 sm:py-8 sm:text-[15px] sm:leading-9">
        <p className="text-white/85">
          <span className="text-canvas-accent">$</span> thally migrate --source gitbook jahce/legacy-docs
        </p>
        <p className="text-white/50">· Fetching GitBook space · 128 pages found</p>
        <p className="text-canvas-accent">✓ Imported 128 pages · structure, links, and redirects preserved</p>
        <p className="text-white/50">· Converting to MDX and resolving cross-references</p>
        <p className="text-white/50">· Building Content Graph · indexing code samples</p>
        <p className="text-canvas-accent">✓ Machine formats · HTML, Markdown, JSON, llms.txt</p>
        <p className="text-white/50">· Deploying to edge · iad sfo lhr fra sin syd</p>
        <p className="text-canvas-accent">✓ Live at jahce.thally.site · SSL, previews, and rollback included</p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-3.5 sm:px-7">
        <p className="font-mono text-xs text-white/50">One pass: fetch, convert, build, deploy</p>
        <p className="flex items-center gap-2 font-mono text-xs text-white/60">
          <Globe className="text-canvas-accent size-3.5 shrink-0" />
          jahce.thally.site
          <span className="text-canvas-accent bg-canvas-accent/10 rounded-full px-2.5 py-1 text-[11px] font-medium">
            Live
          </span>
        </p>
      </div>
    </div>
  );
}

export default function MigrationHostingFeaturePage() {
  return (
    <div className="bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <FeatureBanner
        layout="stage"
        title="Bring your docs."
        titleAccent="We'll host them."
        description="Import from wherever your documentation lives today: GitBook, Mintlify, Docusaurus, or a folder of Markdown. Thally converts it into a connected graph and puts it live on a global edge, all in one pass."
        primaryCta={{ label: "Run a migration", href: "#migrate" }}
        secondaryCta={{ label: "See what's included", href: "#hosting" }}
        finePrint="Your Markdown stays yours. Imports are non-destructive and reversible."
      >
        <MigrationTerminal />
      </FeatureBanner>

      {/* Comparison table */}
      <section id="compare" className="bg-canvas pt-[120px] pb-[120px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section mt-4 text-white">
            The usual migration, or an import.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mt-5 text-lg text-[#afafaf]">
              Not a dreaded rewrite: weeks of copy-paste become one import. Structure, links, and redirects carried
              over automatically. A preview URL to check before you point your domain. Live on the edge in minutes,
              reversible if you change your mind.
            </p>
          </Reveal>
        </div>
        <div className="mx-auto w-full max-w-[1100px] px-5">
          <div className="border-canvas-card-stroke overflow-hidden rounded-[32px] border">
            <Reveal distance={24}>
              <div className="border-canvas-hairline grid grid-cols-2 border-b px-6 py-5 sm:grid-cols-[2fr_1fr_1fr] sm:px-9">
                <p aria-hidden className="hidden sm:block" />
                <p className="text-canvas-muted-2 text-xs font-medium tracking-widest uppercase">
                  The usual migration
                </p>
                <p className="text-xs font-medium tracking-widest text-white uppercase">With Thally</p>
              </div>
            </Reveal>
            {comparisonRows.map((row, i) => (
              <Reveal key={row.label} delay={0.08 + i * 0.06} distance={20}>
                <div
                  className={[
                    "grid grid-cols-2 gap-y-2 px-6 py-5 sm:grid-cols-[2fr_1fr_1fr] sm:items-center sm:px-9 sm:py-6",
                    i < comparisonRows.length - 1 ? "border-canvas-hairline border-b" : "",
                  ].join(" ")}
                >
                  <p className="col-span-2 text-lg tracking-[-0.02em] text-white sm:col-span-1">{row.label}</p>
                  <p className="text-canvas-muted-2 text-[15px]">{row.usual}</p>
                  <p className="flex items-center gap-2 text-[15px] text-white">
                    <Check className="text-canvas-accent size-4 shrink-0" />
                    {row.thally}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} distance={16}>
            <p className="text-canvas-muted-2 mx-auto mt-8 max-w-[860px] text-center text-[15px] leading-relaxed">
              No lock-in, in either direction. Your repository, your renderer, and your domain stay yours: the engine
              is MIT licensed and hosting is optional. If you ever stop paying, the site can keep running on the
              open-source engine, hosted wherever you choose. Pay for the service. Keep the site.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Migration console demo */}
      <section id="migrate" className="bg-canvas pb-[120px]">
        <div className="mx-auto mb-14 max-w-[746px] px-5 text-center">
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

      <CTA />
    </div>
  );
}
