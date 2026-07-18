import type { Metadata } from "next";

import { FAQ } from "@/components/sections/faq";
import { NoLockIn } from "@/components/sections/no-lock-in";
import Pricing from "@/components/sections/pricing";
import Pricing2 from "@/components/sections/pricing2";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Thally pricing: free to self-host forever, or choose Thally Cloud at $60 per month on a monthly subscription and $50 per month on an annual subscription.",
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
    "AI-native documentation platform for AI agents and humans. MIT licensed and free to self-host, with Thally Cloud managed services and custom Enterprise plans.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
    highPrice: "60",
    offerCount: 4,
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
      {
        "@type": "Offer",
        name: "Enterprise",
        description:
          "Custom annual pricing with company-wide sign-in, automatic account management, activity history, custom terms, hands-on migration, and priority support.",
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
