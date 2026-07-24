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
    "Thally is a product knowledge synchronization pipeline. It understands product changes, identifies the customer-facing documentation affected, and prepares evidence-backed updates for human review.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  mainEntityOfPage: SITE_URL,
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
        "Thally Cloud is $60 per workspace per month with three team members included. Additional active members or pending invitations are $20 per month each. Adds managed hosting, AI answers, Thally-drafted updates, documentation analytics, and workspace roles.",
    },
    {
      "@type": "Offer",
      name: "Thally Cloud annual",
      price: "50",
      priceCurrency: "USD",
      description:
        "$50 per workspace per month with an annual subscription, billed monthly. Three team members are included. Each additional active member or pending invitation adds $20 to the monthly bill.",
    },
  ],
  featureList: [
    "Product change intelligence that maps merged changes to affected documentation",
    "Evidence-backed impact analysis with no-change as a valid result",
    "Product-specific knowledge that improves through accepted reviews and corrections",
    "Human approval for important customer-facing communication",
    "MIT-licensed publishing engine",
    "HTML, JSON, JSON-LD, and Markdown from the same content source",
    "Remote MCP server at /api/mcp on every deployed site",
    "Agent-readiness score with CI gating and Thally-drafted fix PRs",
    "@thally GitHub mentions can become reviewable docs PRs",
    "Thally Track can turn relevant merged product PRs into reviewable documentation PRs",
    "Migration from Mintlify, Docusaurus, GitBook, Nextra, VitePress, and Starlight",
    "OpenAPI API reference with interactive Try-It console",
    "Hybrid ⌘K search and retrieval-grounded AI chat with citations",
    "Cloud dashboard: analytics, theming, workspace roles, docs-task queue",
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
      <NoLockIn />
      <Pricing />
      <FAQ context="home" />
    </>
  );
}
