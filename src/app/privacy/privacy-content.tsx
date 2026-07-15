"use client";

import { LegalPage } from "@/components/legal/legal-page";

import Privacy from "./privacy.mdx";

const outline = [
  {
    label: "Overview",
    items: [{ href: "#scope" as const, label: "Scope" }],
  },
  {
    label: "Data in Thally",
    items: [
      { href: "#personal-data-we-collect" as const, label: "Personal data we collect" },
      { href: "#how-we-use-personal-data" as const, label: "How we use personal data" },
      { href: "#ai-features" as const, label: "AI features" },
    ],
  },
  {
    label: "Sharing and control",
    items: [
      { href: "#how-we-share-personal-data" as const, label: "How we share personal data" },
      { href: "#customer-controlled-content" as const, label: "Customer-controlled content" },
      { href: "#cookies" as const, label: "Cookies and similar technologies" },
    ],
  },
  {
    label: "Protection and retention",
    items: [
      { href: "#data-retention" as const, label: "Data retention" },
      { href: "#international-transfers" as const, label: "International transfers" },
      { href: "#security" as const, label: "Security" },
    ],
  },
  {
    label: "Your choices",
    items: [
      { href: "#your-privacy-rights" as const, label: "Your privacy rights" },
      { href: "#children" as const, label: "Children" },
      { href: "#third-party-services" as const, label: "Third-party services" },
    ],
  },
  {
    label: "Policy information",
    items: [
      { href: "#changes" as const, label: "Changes to this policy" },
      { href: "#contact" as const, label: "Contact us" },
    ],
  },
];

export function PrivacyContent() {
  return (
    <LegalPage
      documentLabel="Privacy"
      title="Privacy policy"
      description="How Fairspleet handles personal data when you visit thally.io, use Thally Cloud, connect your tools, or contact our team."
      updated="July 15, 2026"
      summary={[
        {
          title: "The data Thally handles",
          description:
            "Account, workspace, billing status, customer content, connected-repository details, communications, and product usage data needed to run the Services.",
        },
        {
          title: "How we use it",
          description:
            "To operate and secure Thally Cloud, provide search, analytics and AI features, process payments, support customers, and meet legal obligations.",
        },
        {
          title: "How AI content is treated",
          description:
            "Customer content, prompts, repository content, documentation, and AI output are not used to train general-purpose AI models.",
        },
        {
          title: "Your choices",
          description:
            "We do not sell personal data or use it for cross-context behavioral ads. Privacy requests can be sent to legal@thally.io.",
        },
      ]}
      outline={outline}
    >
      <Privacy />
    </LegalPage>
  );
}
