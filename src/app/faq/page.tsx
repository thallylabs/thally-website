import type { Metadata } from "next";

import { FAQPage } from "@/components/sections/faq-page";
import { faqItems } from "@/components/sections/faq-page-data";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thally FAQ: Product Knowledge Synchronization",
  description:
    "Find answers about Thally's product change intelligence, documentation synchronization, review process, migration, AI-readable output, self-hosting, security, and support.",
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
