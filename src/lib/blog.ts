export type BlogCategory = "Comparison" | "Product" | "Guide";

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Search-result title. The root layout appends the Thally brand. */
  seoTitle: string;
  /** Short display title for cards and OG images. */
  cardTitle: string;
  description: string;
  date: string;
  updated: string;
  verified?: string;
  category: BlogCategory;
  readingTime: number;
  accent: string;
  faq?: BlogFAQ[];
}

/** Newest first. Used by the index page, sitemap, RSS feed, JSON-LD, and OG images. */
export const blogPosts: BlogPost[] = [
  {
    slug: "best-ai-documentation-tools-2026",
    title: "The best AI documentation tools in 2026, compared honestly",
    seoTitle: "Best AI Documentation Tools in 2026",
    cardTitle: "Best AI documentation tools in 2026",
    description:
      "An honest comparison of the best AI documentation tools and platforms in 2026: Thally, Mintlify, GitBook, ReadMe, Docusaurus, Fern, and Document360, evaluated on agent readability, drift, and ownership.",
    date: "2026-07-30",
    updated: "2026-08-31",
    verified: "2026-07-30",
    category: "Guide",
    readingTime: 8,
    accent: "var(--chart-1)",
    faq: [
      {
        question: "What is an AI documentation tool?",
        answer:
          "An AI documentation tool is a platform that uses AI in one or more of three places: helping authors write, serving content in machine-readable formats that agents can consume, or detecting when product changes make existing docs stale. Most tools in 2026 cover the first; far fewer cover all three.",
      },
      {
        question: "Do my docs really need llms.txt and MCP support?",
        answer:
          "If developers reach your docs through coding assistants and answer engines, yes. llms.txt gives AI systems a map of your content, and an MCP server lets agents query pages directly instead of scraping. Sites without them still get read, but agents work harder and misquote more often.",
      },
      {
        question: "Which AI documentation tool is best for self-hosting?",
        answer:
          "Thally and Docusaurus are both MIT licensed and free to self-host. Docusaurus gives you a mature static-site framework you assemble yourself. Thally ships machine-readable output, llms.txt, and an MCP server as part of the engine, so the AI layer works behind your firewall too.",
      },
    ],
  },
  {
    slug: "thally-vs-mintlify",
    title: "Thally vs Mintlify: which docs platform is built for AI agents?",
    seoTitle: "Thally vs Mintlify for AI Documentation",
    cardTitle: "Thally vs Mintlify",
    description:
      "Compare Thally and Mintlify across ownership, machine-readable output, code-to-docs automation, deployment, migration, and pricing.",
    date: "2026-07-11",
    updated: "2026-08-31",
    verified: "2026-08-18",
    category: "Comparison",
    readingTime: 8,
    accent: "var(--chart-1)",
    faq: [
      {
        question: "Can I migrate from Mintlify to Thally?",
        answer:
          "Yes. Run npx create-thally-docs migrate against a supported GitHub docs repository. The migrator converts pages to MDX, rebuilds navigation, carries supported redirects, and detects an OpenAPI spec when available.",
      },
      {
        question: "Is Thally free to self-host?",
        answer:
          "Yes. The whole engine is MIT licensed, including commercial use, with unlimited pages and readers. Free also includes one managed site with previews and analytics. Cloud adds three managed sites, AI answers, Track, custom domains, and team features.",
      },
      {
        question: "Does Mintlify support MCP or llms.txt?",
        answer:
          "Yes. Mintlify automatically generates llms.txt and llms-full.txt, serves Markdown versions of pages, and provides hosted search and admin MCP servers. Thally also ships llms.txt and an MCP server, plus per-page JSON and JSON-LD, as part of its open-source engine on every deploy.",
      },
      {
        question: "Can Mintlify generate documentation from a code repository?",
        answer:
          "Yes. Mintlify can read a GitHub repository and generate a first documentation site with API references, getting-started guides, and configuration pages. Teams can review and publish that draft, then configure Automations to maintain it as the code changes.",
      },
    ],
  },
  {
    slug: "thally-vs-gitbook",
    title: "Thally vs GitBook: docs-as-code or a hosted wiki?",
    seoTitle: "Thally vs GitBook for Developer Documentation",
    cardTitle: "Thally vs GitBook",
    description:
      "Compare Thally's product-linked docs workflow with GitBook's hosted knowledge base across authoring, Git, AI-readable output, migration, and collaboration.",
    date: "2026-07-08",
    updated: "2026-08-31",
    verified: "2026-07-24",
    category: "Comparison",
    readingTime: 6,
    accent: "var(--chart-2)",
    faq: [
      {
        question: "Can non-developers write docs in Thally?",
        answer:
          "Yes, though the workflow is git-based. Editors write MDX in the browser through the admin dashboard and every change becomes a reviewed pull request. Teams that want a fully WYSIWYG wiki with no git at all may prefer GitBook.",
      },
      {
        question: "Can I export my content out of GitBook into Thally?",
        answer:
          "Yes. The Thally migrator imports GitBook spaces, converts pages to MDX, and rebuilds your navigation as a Thally project.",
      },
    ],
  },
  {
    slug: "thally-vs-docusaurus",
    title: "Thally vs Docusaurus: two open-source paths to developer docs",
    seoTitle: "Thally vs Docusaurus for AI-Ready Docs",
    cardTitle: "Thally vs Docusaurus",
    description:
      "Compare Docusaurus's framework approach with Thally's documentation engine and product-change synchronization pipeline across setup, ownership, automation, and maintenance.",
    date: "2026-07-01",
    updated: "2026-08-31",
    verified: "2026-07-24",
    category: "Comparison",
    readingTime: 6,
    accent: "var(--chart-5)",
    faq: [
      {
        question: "Is Thally open source like Docusaurus?",
        answer:
          "Yes. Both are MIT licensed and free to self-host, commercial use included. Docusaurus is maintained by Meta; Thally is founder-owned and adds managed hosting as a paid option.",
      },
      {
        question: "Can I keep my Docusaurus content?",
        answer:
          "Yes. The migrator converts Docusaurus pages, sidebars, and redirects into a Thally project automatically. MDX components are mapped to their Thally equivalents where one exists.",
      },
    ],
  },
  {
    slug: "what-is-ai-native-documentation",
    title: "What is AI-native documentation?",
    seoTitle: "AI-Native Documentation: Definition and Checklist",
    cardTitle: "What is AI-native documentation?",
    description:
      "Learn what AI-native documentation means, how it differs from AI-assisted writing, and how to test discovery, structure, freshness, and agent access.",
    date: "2026-06-25",
    updated: "2026-07-19",
    category: "Product",
    readingTime: 5,
    accent: "var(--chart-4)",
    faq: [
      {
        question: "How is AI-native different from AI-assisted documentation?",
        answer:
          "AI-assisted means a model helps you write. AI-native means the published docs themselves are structured for machine readers: JSON, JSON-LD, and Markdown served next to the HTML, plus discovery files like llms.txt and an MCP endpoint.",
      },
      {
        question: "Do I need AI-native docs if my readers are human?",
        answer:
          "Increasingly, yes. A growing share of documentation traffic is agents answering questions on a developer's behalf. If an agent cannot parse your docs, its answer cites someone else's.",
      },
    ],
  },
  {
    slug: "agent-ready-docs-llms-txt-mcp",
    title: "How to make your docs readable by AI agents: llms.txt, MCP, and content negotiation",
    seoTitle: "Make Documentation Readable by AI Agents",
    cardTitle: "Making docs agent-readable",
    description:
      "Build agent-readable documentation with crawlable HTML, llms.txt, structured page formats, content negotiation, MCP, provenance, and repeatable tests.",
    date: "2026-06-18",
    updated: "2026-07-19",
    category: "Guide",
    readingTime: 8,
    accent: "var(--chart-3)",
    faq: [
      {
        question: "What is llms.txt?",
        answer:
          "llms.txt is a plain-markdown file at your site root that gives AI systems a concise overview of what your product does and links to key pages. It is the AI equivalent of robots.txt: cheap to add, widely read.",
      },
      {
        question: "What does an MCP server add over good HTML?",
        answer:
          "MCP (Model Context Protocol) turns your docs into callable tools: search_docs, read_page, list_pages. An agent attached to your MCP endpoint queries your content directly instead of scraping and guessing.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) throw new Error(`Unknown blog post: ${slug}`);
  return post;
}

export function relatedPosts(slug: string, count = 2): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== slug).slice(0, count);
}

export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
