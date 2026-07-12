export type Category = "Support" | "Account" | "Features" | "Security" | "Other";

export interface FAQItem {
  question: string;
  answer: string;
  category: Category;
}

export const faqItems: FAQItem[] = [
  {
    category: "Support",
    question: "Is there a free version?",
    answer:
      "Yes. Thally is MIT-licensed and free to self-host forever — unlimited pages, readers, and commercial use, no credit card required. Paid plans add managed hosting and team features.",
  },
  {
    category: "Support",
    question: "How do I get help if I get stuck?",
    answer:
      "Every plan includes community support on Discord and GitHub, plus searchable documentation. Cloud plans add priority support from a real person, and Enterprise customers get a dedicated account manager.",
  },
  {
    category: "Support",
    question: "What are your support hours?",
    answer:
      "Support is staffed Monday to Friday across US and EU time zones, with a typical first response under four hours on paid plans.",
  },
  {
    category: "Account",
    question: "How do I invite my team?",
    answer:
      "Open Settings → Members, paste in a list of email addresses, and pick a role — Owner, Editor, or Viewer. Invited teammates land straight in the right project.",
  },
  {
    category: "Account",
    question: "Can I change plans later?",
    answer:
      "Any time. Upgrades take effect immediately and downgrades apply at the end of your billing period — no emails required. You can also export everything and move to self-hosting whenever you like.",
  },
  {
    category: "Account",
    question: "What happens if I forget my password?",
    answer:
      "Use the “Forgot password” link on the login screen and we’ll email you a secure reset link. SSO users sign in through their identity provider.",
  },
  {
    category: "Features",
    question: "Which formats does every page ship in?",
    answer:
      "Each page is served as JSON, JSON-LD, and Markdown for machines, and as semantic HTML for readers, from the same URL, chosen by a content-negotiation header. Search indexes and embeddings are generated from the same graph.",
  },
  {
    category: "Features",
    question: "What can Thally AI do?",
    answer:
      "Thally AI answers questions with retrieval-grounded chat that cites the exact pages it quotes, and it can draft docs PRs from changes in your product repo — all opt-in and reviewable.",
  },
  {
    category: "Features",
    question: "How does the API reference work?",
    answer:
      "Drop an OpenAPI spec into your project and Thally generates endpoint pages with parameter tables, schemas, code samples, and an interactive Try-it console — regenerated on every build.",
  },
  {
    category: "Security",
    question: "Can I self-host Thally?",
    answer:
      "Yes — the whole engine is MIT-licensed and deploys anywhere with one command. There's no database; configuration is committed to git, so your docs stay entirely on infrastructure you control.",
  },
  {
    category: "Security",
    question: "Do you support SSO?",
    answer:
      "SAML and SCIM single sign-on are available on the Enterprise plan, alongside audit logs and role-based access with Owner, Editor, and Viewer roles.",
  },
  {
    category: "Security",
    question: "How is my data protected on Cloud?",
    answer:
      "All data is encrypted in transit (TLS 1.2+) and at rest (AES-256). We run regular backups and undergo independent penetration testing.",
  },
  {
    category: "Other",
    question: "Can I migrate from another docs tool?",
    answer:
      "Yes. The CLI migrates existing Markdown and MDX content, and the built-in link and anchor checks validate everything before you switch DNS.",
  },
  {
    category: "Other",
    question: "Do you offer refunds?",
    answer:
      "If Thally isn’t the right fit within your first 30 days on a paid plan, contact us and we’ll refund your most recent payment.",
  },
  {
    category: "Other",
    question: "Where can I see what you’re shipping?",
    answer:
      "Our public changelog is RSS-backed and updated with every release, so you — and your feed reader — can always see what just shipped.",
  },
];
