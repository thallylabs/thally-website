import type { Metadata } from "next";

import { Finale } from "@/components/experience/finale";
import ExperienceHero from "@/components/experience/hero";
import { Polyglot } from "@/components/experience/polyglot";
import { Automation } from "@/components/sections/automation";
import { Dashboard } from "@/components/sections/dashboard";
import { FAQ } from "@/components/sections/faq";
import { Feature1 } from "@/components/sections/feature1";
import { Feature2 } from "@/components/sections/feature2";
import { Feature3 } from "@/components/sections/feature3";
import Logos from "@/components/sections/logos";
import { Migrate } from "@/components/sections/migrate";
import { NoLockIn } from "@/components/sections/no-lock-in";
import Pricing from "@/components/sections/pricing";
import { SITE_TITLE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: SITE_TITLE,
  },
  alternates: {
    canonical: "/",
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "Thally",
  url: SITE_URL,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  license: "https://opensource.org/license/mit",
  description:
    "Thally is the AI-native documentation platform for AI agents and humans. One MDX source serves structured JSON, JSON-LD, and Markdown to AI agents and polished HTML to readers, from the same URL. A docs agent turns product changes, GitHub mentions, and readiness findings into reviewed documentation pull requests. Migrate from Mintlify, Docusaurus, or GitBook in one command and deploy anywhere.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "USD",
      description: "MIT licensed and free to self-host forever, commercial use included.",
    },
    {
      "@type": "Offer",
      name: "Thally Cloud monthly",
      price: "60",
      priceCurrency: "USD",
      description:
        "Thally Cloud is $60 per workspace per month with three team members included. Additional active members or pending invitations are $20 per month each. Adds managed services, AI answers, Thally Track, readiness gates, documentation analytics, and team roles.",
    },
    {
      "@type": "Offer",
      name: "Thally Cloud annual",
      price: "50",
      priceCurrency: "USD",
      description:
        "$50 per workspace per month with an annual subscription, billed monthly. Three team members are included. Each additional active member or pending invitation adds $20 to the monthly bill.",
    },
    {
      "@type": "Offer",
      name: "Enterprise",
      description:
        "Custom annual pricing with SAML and SCIM SSO, audit-log access, custom terms, migration support, and priority support.",
    },
  ],
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
      <div className="scroll-progress" aria-hidden />
      <div className="grain-overlay" aria-hidden />
      <ExperienceHero />
      <Logos />
      <Polyglot />
      <Automation />
      <div className="mx-2.5 overflow-hidden rounded-4xl lg:mx-4">
        <Feature2 />
        <Feature3 />
      </div>
      <Migrate />
      <Dashboard />
      <Feature1 />
      <NoLockIn />
      <Pricing />
      <FAQ />
      <Finale />
    </>
  );
}
