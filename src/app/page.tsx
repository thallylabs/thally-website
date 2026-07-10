import type { Metadata } from "next";

import { Automation } from "@/components/sections/automation";
import { Dashboard } from "@/components/sections/dashboard";
import { FAQ } from "@/components/sections/faq";
import { Feature1 } from "@/components/sections/feature1";
import { Feature2 } from "@/components/sections/feature2";
import { Feature3 } from "@/components/sections/feature3";
import Hero from "@/components/sections/hero";
import Logos from "@/components/sections/logos";
import { Migrate } from "@/components/sections/migrate";
import Pricing from "@/components/sections/pricing";
import Testimonials from "@/components/sections/testimonials";

export const metadata: Metadata = {
  title: {
    absolute: "Thally — Documentation for machines and humans",
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Thally",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description:
    "Thally is the AI-native documentation platform for machines and humans. One MDX source serves structured JSON, JSON-LD, and Markdown to AI agents and polished HTML to readers, from the same URL. A docs agent turns product changes, GitHub mentions, and readiness findings into reviewed documentation pull requests. Migrate from Mintlify, Docusaurus, or GitBook in one command and deploy anywhere.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "MIT licensed and free to self-host. Paid plans add managed hosting, Thally AI, Track, and team features.",
  },
  featureList: [
    "AI-native output: JSON, JSON-LD, Markdown, and HTML from the same URL",
    "Remote MCP server at /api/mcp on every deployed site",
    "Agent-readiness score with CI gating and agent-drafted fix PRs",
    "Docs agent: @thally GitHub mentions become reviewed docs PRs",
    "Thally Track: merged product PRs become documentation PRs",
    "One-command migration from Mintlify, Docusaurus, GitBook, Nextra, VitePress, and Starlight",
    "OpenAPI API reference with interactive Try-It console",
    "Hybrid ⌘K search and retrieval-grounded AI chat with citations",
    "Admin dashboard: analytics, theming, team roles, docs-task queue",
    "Multi-language docs with one-command AI translation",
    "Deploy anywhere: Vercel, Netlify, Cloudflare, Docker, static export",
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <Hero />
      <Logos />
      <Automation />
      <div className="mx-2.5 overflow-hidden rounded-4xl lg:mx-4">
        <Feature2 />
        <Feature3 />
      </div>
      <Migrate />
      <Dashboard />
      <Feature1 />
      <Testimonials />
      <Pricing />
      <FAQ />
    </>
  );
}
