import type { Metadata } from "next";

import { FAQ } from "@/components/sections/faq";
import { NoLockIn } from "@/components/sections/no-lock-in";
import Pricing from "@/components/sections/pricing";
import Pricing2 from "@/components/sections/pricing2";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Thally pricing: free to self-host forever, Thally Cloud at $60 per workspace monthly or $600 annually with three team members included, and custom Enterprise plans.",
  alternates: {
    canonical: "/pricing",
  },
};

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${SITE_URL}/pricing#product`,
  name: "Thally",
  description:
    "AI-native documentation platform for AI agents and humans. MIT licensed and free to self-host, with Thally Cloud managed services and custom Enterprise plans.",
  brand: { "@id": `${SITE_URL}/#organization` },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
    highPrice: "600",
    offerCount: 4,
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
        name: "Thally Cloud monthly",
        price: "60",
        priceCurrency: "USD",
        description:
          "$60 per workspace each month with three team members included. Additional active members or pending invitations are $20 per month each. Includes managed services, Thally AI answers, Thally Track, readiness gates, and analytics. 14-day trial.",
      },
      {
        "@type": "Offer",
        name: "Thally Cloud annual",
        price: "600",
        priceCurrency: "USD",
        description:
          "$600 per workspace each year, equivalent to $50 per month, with three team members included. Additional active members or pending invitations are $200 per year each. Includes all Thally Cloud services and a 14-day trial.",
      },
      {
        "@type": "Offer",
        name: "Enterprise",
        description:
          "Custom annual pricing with SAML and SCIM SSO, audit-log access, custom terms, migration support, and priority support.",
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }} />
      <Pricing headerTag="h1" />
      <NoLockIn />
      <Pricing2 />
      <FAQ />
    </>
  );
}
