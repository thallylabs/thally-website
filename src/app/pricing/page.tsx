import type { Metadata } from "next";
import Link from "next/link";

import { FAQ } from "@/components/sections/faq";
import { NoLockIn } from "@/components/sections/no-lock-in";
import Pricing from "@/components/sections/pricing";
import Pricing2 from "@/components/sections/pricing2";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thally Pricing: Open Source and Cloud Plans",
  description:
    "Thally pricing: free to self-host forever, or choose Thally Cloud at $60 per month on a monthly subscription and $50 per month on an annual subscription.",
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
    "AI-native documentation platform for AI agents and humans. MIT licensed and free to self-host, with Thally Cloud managed services and custom Enterprise plans.",
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
          "Host Thally yourself for free. Includes unlimited pages and readers, fast documentation search, structured content for AI assistants, and automatic draft updates using your own AI provider.",
      },
      {
        "@type": "Offer",
        name: "Thally Cloud monthly",
        price: "60",
        priceCurrency: "USD",
        description:
          "$60 per workspace each month. Includes managed hosting, cited AI answers, automatic draft updates when product changes affect the documentation, quality checks, and analytics. 14-day trial.",
      },
      {
        "@type": "Offer",
        name: "Thally Cloud annual",
        price: "50",
        priceCurrency: "USD",
        description:
          "$50 per workspace per month with an annual subscription, billed monthly. Includes managed hosting, cited AI answers, automatic draft updates when product changes affect the documentation, quality checks, analytics, and a 14-day trial.",
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }} />
      <Pricing headerTag="h1" />
      <section className="container pb-12 text-center">
        <p className="text-muted-foreground text-sm">
          AI agents and procurement tools can read the same current plan details in{" "}
          <Link className="text-foreground underline underline-offset-4" href="/pricing.md">
            machine-readable pricing
          </Link>
          .
        </p>
      </section>
      <NoLockIn />
      <Pricing2 />
      <FAQ context="pricing" />
    </>
  );
}
