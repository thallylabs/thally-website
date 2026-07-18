"use client";

import { LegalPage } from "@/components/legal/legal-page";

import Terms from "./terms.mdx";

const outline = [
  {
    label: "Using Thally",
    items: [
      { href: "#thally-services" as const, label: "Thally Services" },
      { href: "#eligibility-and-accounts" as const, label: "Eligibility and accounts" },
    ],
  },
  {
    label: "Plans and content",
    items: [
      { href: "#plans-and-billing" as const, label: "Plans, billing, and refunds" },
      { href: "#customer-content" as const, label: "Customer content and integrations" },
      { href: "#ai-features" as const, label: "AI features" },
      { href: "#acceptable-use" as const, label: "Acceptable use" },
    ],
  },
  {
    label: "Rights and responsibilities",
    items: [
      { href: "#confidentiality" as const, label: "Confidentiality" },
      { href: "#intellectual-property" as const, label: "Intellectual property" },
      { href: "#third-party-services" as const, label: "Third-party services" },
      { href: "#security-and-data" as const, label: "Security and data protection" },
    ],
  },
  {
    label: "Service lifecycle",
    items: [
      { href: "#service-changes" as const, label: "Service changes and availability" },
      { href: "#suspension-and-termination" as const, label: "Suspension and termination" },
    ],
  },
  {
    label: "Legal terms",
    items: [
      { href: "#disclaimers" as const, label: "Disclaimers" },
      { href: "#limitation-of-liability" as const, label: "Limitation of liability" },
      { href: "#indemnification" as const, label: "Indemnification" },
      { href: "#governing-law" as const, label: "Governing law and disputes" },
      { href: "#changes" as const, label: "Changes to these terms" },
      { href: "#general-terms" as const, label: "General terms" },
      { href: "#contact" as const, label: "Contact us" },
    ],
  },
];

export function TermsContent() {
  return (
    <LegalPage
      documentLabel="Terms"
      title="Terms of service"
      description="The agreement that governs Thally Cloud and the other hosted services operated by Fairspleet LLC."
      updated="July 15, 2026"
      summary={[
        {
          title: "Hosted and self-hosted are separate",
          description:
            "These terms cover Fairspleet-operated Services. The open-source, self-hosted Thally software remains governed by its MIT License.",
        },
        {
          title: "Your content stays yours",
          description:
            "You keep ownership of Customer Content and grant only the limited rights needed to provide, secure, support, and improve the Services.",
        },
        {
          title: "AI changes remain reviewable",
          description:
            "Thally can draft answers and documentation changes, but you are responsible for reviewing output and the documentation agent does not merge changes itself.",
        },
        {
          title: "Plans remain flexible",
          description:
            "Thally Cloud may include a 14-day trial, paid subscriptions can be canceled, and qualifying customers can request a refund within the first 30 days.",
        },
      ]}
      outline={outline}
    >
      <Terms />
    </LegalPage>
  );
}
