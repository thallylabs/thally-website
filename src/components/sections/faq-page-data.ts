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
      "Yes. Thally is open source under the MIT license and free to self-host forever. The free version includes unlimited pages and readers, all four output formats, and the MCP server. Cloud and Enterprise add managed services, AI answers, and team controls.",
  },
  {
    category: "Support",
    question: "How do I get help if I get stuck?",
    answer:
      "Everyone can search the docs or open an issue on GitHub. Cloud customers receive priority support, while Enterprise adds migration support and a dedicated account manager.",
  },
  {
    category: "Support",
    question: "What are your support hours?",
    answer:
      "Our team supports customers across US and EU business hours. Enterprise customers can arrange coverage and response commitments for production-critical issues.",
  },
  {
    category: "Support",
    question: "How quickly will I hear back?",
    answer:
      "We usually reply to sales and support messages within one business day. Enterprise response commitments depend on your support agreement.",
  },
  {
    category: "Account",
    question: "How do I invite teammates?",
    answer:
      "Owners and Editors can invite teammates by email from the admin dashboard. Thally Cloud includes three team members in any role, and each additional member is billed at the published seat price.",
  },
  {
    category: "Account",
    question: "What roles are available?",
    answer:
      "Owner, Editor, and Viewer. Owners manage billing and SSO, Editors write and publish, and Viewers get read access to private documentation.",
  },
  {
    category: "Account",
    question: "How does billing work?",
    answer:
      "Thally Cloud costs $60 per workspace when billed monthly or $600 when billed annually, which saves 17%. Three team members are included. Additional members cost $20 per month or $200 per year.",
  },
  {
    category: "Account",
    question: "Can I change my plan later?",
    answer:
      "Yes. You can change or cancel your plan. Your docs remain in a Git repository you own, so cancelling paid services does not take away your content or site source.",
  },
  {
    category: "Features",
    question: "What output formats does Thally produce?",
    answer:
      "Every page serves polished HTML for people plus JSON, JSON-LD, and Markdown for machines. All four formats come from one MDX source and the same URL.",
  },
  {
    category: "Features",
    question: "How does search work?",
    answer:
      "⌘K hybrid search blends keyword and semantic matching over your indexed docs, returning instant results with inline previews and jump-to-section links.",
  },
  {
    category: "Features",
    question: "How does the AI assistant avoid hallucinating?",
    answer:
      "Answers are retrieval-grounded: the engine only quotes your indexed docs and cites the exact pages inline. If the docs don't contain an answer, it says so rather than guessing.",
  },
  {
    category: "Features",
    question: "Is there an API reference?",
    answer:
      "Yes. Point Thally at an OpenAPI spec and it renders a fully typed reference with a live Try-It console, wired up automatically on every deploy.",
  },
  {
    category: "Security",
    question: "Can I self-host Thally?",
    answer:
      "Yes. Run the open-source engine wherever Next.js runs, including Vercel, Netlify, Cloudflare, Docker with the included Dockerfile, or a static export.",
  },
  {
    category: "Security",
    question: "Do you support SSO?",
    answer:
      "Enterprise includes SAML and SCIM single sign-on with automated user provisioning and de-provisioning tied to your identity provider.",
  },
  {
    category: "Security",
    question: "How is my data handled?",
    answer:
      "Your content stays in your Git repo. Cloud processes only what's needed to serve and index your docs, and never trains models on your content.",
  },
  {
    category: "Security",
    question: "Are you compliant?",
    answer:
      "Enterprise ships with a full audit log, a 99.9% uptime SLA, and SOC 2 documentation available on request under NDA.",
  },
  {
    category: "Other",
    question: "How do I migrate from another tool?",
    answer:
      "One command: npx create-thally migrate <your-repo-url>. It detects Mintlify, Docusaurus, or GitBook, converts every page to clean MDX, rebuilds navigation, and carries your redirects.",
  },
  {
    category: "Other",
    question: "What is your refund policy?",
    answer:
      "If Thally is not the right fit within your first 30 days on a paid plan, contact our team to request a refund of your most recent payment. Enterprise agreements, misuse, and repeat subscriptions are excluded. Cancellations take effect at the end of the current billing period.",
  },
  {
    category: "Other",
    question: "Do you offer discounts?",
    answer:
      "Thally's open-source engine is free for every project, including commercial use. Contact our team to discuss nonprofit or education pricing for managed services.",
  },
  {
    category: "Other",
    question: "Where can I request a feature?",
    answer:
      "Open a discussion on GitHub or send a note to our team. Roadmap items ship continuously, and the docs agent often turns requests into reviewed PRs.",
  },
];
