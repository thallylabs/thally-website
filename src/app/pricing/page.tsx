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
    "Self-host Thally for free, or choose Thally Cloud at $60 per workspace each month on a monthly subscription or $50 on an annual subscription.",
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
    "Product knowledge synchronization pipeline with a free MIT-licensed documentation engine, managed Thally Cloud services, and custom Enterprise plans.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  mainEntityOfPage: `${SITE_URL}/pricing`,
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
    highPrice: "60",
    offerCount: 3,
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "USD",
        description:
          "Host Thally yourself for free. Includes unlimited pages and readers, documentation search, structured content for AI assistants, quality checks, and review-gated docs agent runs using your own AI provider.",
      },
      {
        "@type": "Offer",
        name: "Thally Cloud monthly",
        price: "60",
        priceCurrency: "USD",
        description:
          "$60 per workspace each month. Includes 10,000 AI credits per month, managed hosting, cited AI answers, Thally-drafted updates for relevant merged changes, quality checks, and analytics. 14-day trial.",
      },
      {
        "@type": "Offer",
        name: "Thally Cloud annual",
        price: "50",
        priceCurrency: "USD",
        description:
          "$50 per workspace per month with an annual subscription, billed monthly. Includes 10,000 AI credits per month, managed hosting, cited AI answers, Thally-drafted updates for relevant merged changes, quality checks, analytics, and a 14-day trial.",
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
