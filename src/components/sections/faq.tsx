import { SectionGrid, SectionHeader } from "@/components/section-decor";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const leftQuestions = [
  {
    question: "What is Thally?",
    answer:
      "Thally is an AI-native documentation platform for machines and humans. You write MDX once, and every page ships as JSON, JSON-LD, and Markdown for AI agents and as polished HTML for readers, all from the same URL. It also automates the upkeep: a docs agent turns product changes into reviewed pull requests.",
  },
  {
    question: "How is Thally different from other docs tools?",
    answer:
      "Conventional docs tools render pages for people and stop there. Thally treats machines as first-class readers of the same source, ships a remote MCP server with every deploy, grades every build with an agent-readiness score, and keeps docs current automatically with agent-drafted PRs from your product repos.",
  },
  {
    question: "How do I migrate from Mintlify, Docusaurus, or GitBook?",
    answer:
      "One command: npx create-thally migrate <your-repo-url>. The migrator detects the platform (Mintlify, Docusaurus, GitBook, Nextra, VitePress, Starlight, or plain Markdown), converts every page to clean MDX, rebuilds navigation, carries your redirects, and wires OpenAPI specs into the API reference automatically.",
  },
  {
    question: "What is Thally Track?",
    answer:
      "Track watches the product repos you register. When a PR merges there, it distills what changed and the docs agent drafts a documentation PR for your review. Label a PR docs-preview and the docs are drafted before the feature even merges, so reviewers see docs alongside code.",
  },
  {
    question: "Can Thally write docs for me?",
    answer:
      "Yes, as reviewed pull requests. Give the agent an instruction, a diff, or a product PR, or just comment @thally on any GitHub issue or pull request. It drafts the smallest correct change in your house style and self-validates before opening the PR. It never merges; a human always does.",
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
      "Every build gets a deterministic 0 to 100 grade covering structured data, metadata, discovery files, machine readability, and OpenAPI coverage, with subscores that name the exact pages dragging the number down. You can gate CI on a threshold, and the agent can open PRs to fix what's ailing.",
  },
  {
    question: "What are agent endpoints?",
    answer:
      "Every deploy ships llms.txt, ai.txt, skill.md, AGENTS.md, per-page JSON, and a remote MCP server at /api/mcp, so crawlers and AI agents consume your docs correctly instead of scraping them. Attach the MCP endpoint to any agent and your docs become native tools, no key or account required.",
  },
  {
    question: "How does the AI chat avoid hallucinating?",
    answer:
      "Answers are retrieval-grounded: the engine only quotes your indexed docs and cites the exact pages inline. If the docs don't contain an answer, it says so.",
  },
  {
    question: "Where can I deploy Thally?",
    answer:
      "Anywhere Next.js runs: Vercel, Netlify, Cloudflare, Docker with the included Dockerfile, or a static export. Your docs are a repo you own, so there's no vendor lock-in in either direction.",
  },
  {
    question: "What's in the admin dashboard?",
    answer:
      "A live dashboard at /admin: first-party analytics with top pages and content gaps, branding and theming that apply without a rebuild, the agent-readiness report, and a queue of agent-drafted docs PRs. Cloud teams also get managed Owner, Editor, and Viewer roles with OIDC sign-in.",
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
