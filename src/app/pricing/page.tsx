import type { Metadata } from "next";
import Link from "next/link";

import { CTA } from "@/components/sections/cta";
import { FAQ } from "@/components/sections/faq";
import { Guarantees } from "@/components/sections/guarantees";
import { PricingCards } from "@/components/sections/pricing-cards";
import Pricing2 from "@/components/sections/pricing2";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thally Pricing: Open Source and Cloud Plans",
  description:
    "Create one managed documentation site with previews and analytics for free, self-host the MIT-licensed engine, or upgrade for automation, scale, and team controls.",
  alternates: {
    canonical: "/pricing",
  },
};

// This node describes the application for entity understanding. Google requires
// a genuine visible review or aggregate rating for a SoftwareApplication rich
// result, so this markup intentionally makes no rich-result eligibility claim.
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
    "The product knowledge layer for software teams, with one managed documentation site, pull-request previews, and analytics for free, plus paid automation, scale, and team controls.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  mainEntityOfPage: `${SITE_URL}/pricing`,
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
    highPrice: "1990",
    offerCount: 3,
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "USD",
        description:
          "Includes one managed documentation site per workspace, pull-request previews, documentation analytics, unlimited pages and readers, documentation search, and HTML, Markdown, JSON, and JSON-LD output. The MIT-licensed engine can also be self-hosted for free.",
      },
      {
        "@type": "Offer",
        name: "Thally Cloud monthly",
        price: "199",
        priceCurrency: "USD",
        description:
          "$199 per workspace each month. Includes three managed sites, unlimited connected product repositories, five team members, 10,000 shared monthly AI credits with rollover, cited AI answers, Thally Track, quality checks, custom domains, and team roles. 14-day trial.",
      },
      {
        "@type": "Offer",
        name: "Thally Cloud annual",
        price: "1990",
        priceCurrency: "USD",
        description:
          "$1,990 per workspace billed annually. Includes three managed sites, unlimited connected product repositories, five team members, 10,000 shared monthly AI credits with rollover, cited AI answers, Thally Track, quality checks, custom domains, team roles, and a 14-day trial.",
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }} />
      <PricingCards headerTag="h1" />
      <section className="bg-canvas pb-16">
        <p className="text-canvas-muted-2 mx-auto max-w-[1480px] px-5 text-center text-sm">
          AI agents and procurement tools can read the same current plan details in{" "}
          <Link className="text-canvas-foreground underline underline-offset-4" href="/pricing.md">
            machine-readable pricing
          </Link>
          .
        </p>
      </section>
      <Pricing2 />
      <Guarantees />
      <FAQ context="pricing" />
      <CTA />
    </>
  );
}
