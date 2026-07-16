import { SectionGrid, SectionHeader } from "@/components/section-decor";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const leftQuestions = [
  {
    question: "What is Thally?",
    answer:
      "Thally is an AI-native documentation platform for machines and humans. Write MDX once, then serve JSON, JSON-LD, and Markdown to AI agents and polished HTML to people from the same URL. A docs agent also turns product changes into pull requests for your team to review.",
  },
  {
    question: "How is Thally different from other docs tools?",
    answer:
      "Most docs tools publish pages for people. Thally also gives machine readers structured formats and a remote MCP server from the same source. Each build receives an agent-readiness score, and product changes can become agent-drafted docs PRs.",
  },
  {
    question: "How do I migrate from Mintlify, Docusaurus, or GitBook?",
    answer:
      "Run npx create-thally migrate <your-repo-url>. The migrator detects Mintlify, Docusaurus, GitBook, Nextra, VitePress, Starlight, or plain Markdown. It converts pages to MDX, rebuilds navigation, carries redirects, and connects OpenAPI specs to the API reference.",
  },
  {
    question: "What is Thally Track?",
    answer:
      "Track watches the product repositories you register. When a PR merges, it identifies the relevant changes and drafts a documentation PR for review. Add the docs-preview label to draft docs before merge, so reviewers can read them beside the code.",
  },
  {
    question: "Can Thally write docs for me?",
    answer:
      "Yes, through pull requests your team reviews. Give the agent an instruction, diff, or product PR, or comment @thally on a GitHub issue or pull request. It drafts a focused change in your house style and validates it before opening the PR. Thally never merges it.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Thally is MIT-licensed and free to self-host forever, commercial use included. Paid plans add managed hosting, Thally AI answers, Track with the one-click GitHub App, and team features.",
  },
];

const rightQuestions = [
  {
    question: "What does the readiness score measure?",
    answer:
      "Every build gets a deterministic 0 to 100 grade for structured data, metadata, discovery files, machine readability, and OpenAPI coverage. Subscores identify the pages lowering the result. You can gate CI on a threshold and ask the agent to draft fixes.",
  },
  {
    question: "What are agent endpoints?",
    answer:
      "Every deploy includes llms.txt, ai.txt, skill.md, AGENTS.md, per-page JSON, and a remote MCP server at /api/mcp. These endpoints give crawlers and AI agents structured access to your docs. Connect the MCP endpoint to expose search, page reading, and navigation as tools.",
  },
  {
    question: "How does the AI chat avoid hallucinating?",
    answer:
      "Answers are retrieval-grounded: the engine only quotes your indexed docs and cites the exact pages inline. If the docs don't contain an answer, it says so.",
  },
  {
    question: "Where can I deploy Thally?",
    answer:
      "Deploy anywhere Next.js runs, including Vercel, Netlify, Cloudflare, Docker with the included Dockerfile, or a static export. Your docs remain in a repository you own.",
  },
  {
    question: "What's in the admin dashboard?",
    answer:
      "The dashboard at /admin includes first-party analytics, branding and theming, the agent-readiness report, and a queue of agent-drafted docs PRs. Cloud teams also get managed Owner, Editor, and Viewer roles with OIDC sign-in.",
  },
  {
    question: "Does Thally support multiple languages?",
    answer:
      "Yes. One command translates your entire site while preserving code blocks, components, and URLs. Every locale gets its own indexable URL with automatic hreflang tags, a built-in language switcher, and graceful fallbacks; a missing translation never returns a 404.",
  },
];

const allQuestions = [...leftQuestions, ...rightQuestions];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allQuestions.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export const FAQ = () => {
  return (
    <section className="relative pb-16 md:pb-28 lg:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SectionGrid className="opacity-10" mask="radial-gradient(ellipse_at_bottom,black,transparent_70%)" />
      <div className="relative container mx-auto lg:max-w-5xl">
        <SectionHeader
          title="Frequently asked questions"
          description="Quick answers about migration, automation, agents, self-hosting, and how Thally fits your stack."
          align="center"
          layout="stack"
          className="mx-auto"
        />

        <div className="mt-8 grid gap-x-12 md:mt-12 md:grid-cols-2 lg:mt-16">
          <Accordion type="single" collapsible className="text-muted-foreground border-border border-t">
            {leftQuestions.map((item, i) => (
              <AccordionItem key={i} value={`left-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent className="text-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion collapsible type="single" className="text-muted-foreground border-border md:border-t">
            {rightQuestions.map((item, i) => (
              <AccordionItem key={i} value={`right-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent className="text-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
