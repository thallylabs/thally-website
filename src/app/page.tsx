import type { Metadata } from "next";

import { AiRisk } from "@/components/sections/ai-risk";
import { CTA } from "@/components/sections/cta";
import { Daybreak } from "@/components/sections/daybreak";
import { FAQ } from "@/components/sections/faq";
import { FeatureShowcase } from "@/components/sections/feature-showcase";
import { Guarantees } from "@/components/sections/guarantees";
import Hero from "@/components/sections/hero";
import { PipelineTabs } from "@/components/sections/pipeline-tabs";
import { PricingCards } from "@/components/sections/pricing-cards";
import { Problem } from "@/components/sections/problem";
import { QuoteCard } from "@/components/sections/quote-card";
import { SITE_NAME, SITE_TITLE, SITE_URL, SOCIAL_PREVIEW_DESCRIPTION, SOCIAL_PREVIEW_TITLE } from "@/lib/site";
import { socialPreviewImage } from "@/lib/social-preview";

export const metadata: Metadata = {
  title: {
    absolute: SITE_TITLE,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SOCIAL_PREVIEW_TITLE,
    description: SOCIAL_PREVIEW_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    images: [socialPreviewImage],
  },
  twitter: {
    card: "summary_large_image",
    title: SOCIAL_PREVIEW_TITLE,
    description: SOCIAL_PREVIEW_DESCRIPTION,
    images: [socialPreviewImage],
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
    "Thally is the product knowledge layer for software teams. When a product change merges, it works out what the change means, traces the impact across connected knowledge surfaces (documentation, website, help center, changelog), and opens evidence-backed pull requests for human review. It is also a complete AI-native documentation platform.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  mainEntityOfPage: SITE_URL,
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "USD",
      description:
        "Includes one managed documentation site per workspace, pull-request previews, documentation analytics, and unlimited pages and readers. The MIT-licensed engine can also be self-hosted for free, including commercial use.",
    },
    {
      "@type": "Offer",
      name: "Thally Cloud monthly",
      price: "199",
      priceCurrency: "USD",
      description:
        "Thally Cloud is $199 per workspace per month with three managed sites, unlimited connected product repositories, 10,000 shared monthly AI credits with rollover, and five team members included. Additional members are $20 per month and additional managed sites are $39 per month. Adds AI answers, Thally Track, custom domains, and team roles.",
    },
    {
      "@type": "Offer",
      name: "Thally Cloud annual",
      price: "1990",
      priceCurrency: "USD",
      description:
        "$1,990 per workspace billed annually. Includes three managed sites, unlimited connected product repositories, 10,000 shared monthly AI credits with rollover, and five team members. Additional members are $200 per year and additional managed sites are $390 per year.",
    },
  ],
  featureList: [
    "Product change intelligence that maps merged changes to affected documentation, website pages, and support content",
    "Evidence-backed impact analysis with confidence per surface and no-change as a valid result",
    "Runs on PR merge by default, on PR open, or on a custom schedule",
    "Product-specific knowledge that improves through accepted reviews and corrections",
    "Human approval for important customer-facing communication",
    "MIT-licensed publishing engine",
    "HTML, JSON, JSON-LD, and Markdown from the same content source",
    "Remote MCP server at /api/mcp on every deployed site",
    "Agent-readiness score with CI gating and Thally-drafted fix PRs",
    "@thally GitHub mentions can become reviewable docs PRs",
    "Thally Track turns relevant merged product PRs into reviewable PRs on every connected knowledge surface",
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
      <Problem />
      <AiRisk />
      <PipelineTabs />
      <Guarantees />
      <FeatureShowcase />
      <QuoteCard />
      <Daybreak />
      <PricingCards />
      <FAQ context="home" />
      <CTA />
    </>
  );
}
