import type { Metadata } from "next";

import { FAQPage } from "@/components/sections/faq-page";
import { faqItems } from "@/components/sections/faq-page-data";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thally FAQ: Pricing, Features, and Support",
  description:
    "Find answers about Thally pricing, self-hosting, migration, AI tool access, MCP, SSO, security, and support.",
  alternates: {
    canonical: "/faq",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/faq#faq`,
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <FAQPage />
    </>
  );
}
