import type { Metadata } from "next";

import { FAQ } from "@/components/sections/faq";
import Pricing from "@/components/sections/pricing";
import Pricing2 from "@/components/sections/pricing2";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Thally pricing: free to self-host forever (MIT licensed), Cloud at $8 per editor/month with Thally AI and Track, Enterprise at $15 per editor/month with SSO and a 99.9% SLA.",
  alternates: {
    canonical: "/pricing",
  },
};

// SoftwareApplication (same @id as the homepage node, so the statements merge
// into one entity) rather than Product: Google's Product snippets report
// expects review/aggregateRating on Product markup, and Thally has no
// first-party on-page ratings to reference yet.
const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "Thally",
  url: SITE_URL,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  license: "https://opensource.org/license/mit",
  description:
    "AI-native documentation platform for AI agents and humans. MIT licensed and free to self-host; Cloud and Enterprise plans are priced per editor.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
    highPrice: "15",
    offerCount: 3,
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "USD",
        description:
          "Self-host everything, forever. MIT licensed, commercial use OK. Unlimited pages and readers, all four output formats, MCP server, hybrid search, docs agent with your own API key.",
      },
      {
        "@type": "Offer",
        name: "Cloud",
        price: "8",
        priceCurrency: "USD",
        description:
          "$8 per editor/month, or $60 per editor/year billed annually. Thally AI answers and chat, Thally Track with one-click GitHub App, agent-readiness CI checks, admin dashboard and analytics, team roles. 14-day trial.",
      },
      {
        "@type": "Offer",
        name: "Enterprise",
        price: "15",
        priceCurrency: "USD",
        description:
          "$15 per editor/month, or $120 per editor/year billed annually. SAML and SCIM SSO, audit log, 99.9% uptime SLA, self-hosted with support, dedicated account manager.",
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }} />
      <Pricing headerTag="h1" />
      <Pricing2 />
      <FAQ />
    </>
  );
}
