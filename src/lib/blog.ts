export type BlogCategory = "Comparison" | "Product" | "Guide";

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Short display title for cards and OG images. */
  cardTitle: string;
  description: string;
  date: string;
  category: BlogCategory;
  readingTime: number;
  accent: string;
  faq?: BlogFAQ[];
}

/** Newest first. Used by the index page, sitemap, RSS feed, JSON-LD, and OG images. */
export const blogPosts: BlogPost[] = [
  {
    slug: "thally-vs-mintlify",
    title: "Thally vs Mintlify: which docs platform is built for AI agents?",
    cardTitle: "Thally vs Mintlify",
    description:
      "Both render beautiful MDX docs. The differences are ownership, self-hosting, and how deeply AI agents can read your docs. A fair, side-by-side comparison.",
    date: "2026-07-11",
    category: "Comparison",
    readingTime: 7,
    accent: "var(--chart-1)",
    faq: [
      {
        question: "Can I migrate from Mintlify to Thally?",
        answer:
          "Yes. Run npx create-thally migrate against your docs repo and the migrator converts pages to clean MDX, rebuilds navigation, carries redirects, and wires up your OpenAPI spec. Most migrations finish in minutes.",
      },
      {
        question: "Is Thally really free to self-host?",
        answer:
          "Yes. The whole engine is MIT licensed, including commercial use, with unlimited pages and readers. Paid plans add managed hosting, Thally AI, Track, and team features, never the core.",
      },
      {
        question: "Does Mintlify support MCP or llms.txt?",
        answer:
          "Mintlify has been adding AI features to its hosted platform, and support evolves quickly. Check their current documentation. Thally ships an MCP server, llms.txt, and per-page JSON on every deploy, self-hosted included, by default.",
      },
    ],
  },
  {
    slug: "thally-vs-gitbook",
    title: "Thally vs GitBook: docs-as-code or a hosted wiki?",
    cardTitle: "Thally vs GitBook",
    description:
      "GitBook is a polished hosted editor for teams that want a wiki. Thally is a docs-as-code platform your agents can read natively. Here is how to choose.",
    date: "2026-07-08",
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
          "Yes. The Thally migrator imports GitBook spaces, converts pages to MDX, and rebuilds your navigation. Your content lands in a Next.js repo you own.",
      },
    ],
  },
  {
    slug: "thally-vs-docusaurus",
    title: "Thally vs Docusaurus: two open-source paths to developer docs",
    cardTitle: "Thally vs Docusaurus",
    description:
      "Both are open source and self-hostable. Docusaurus gives you a React static-site framework; Thally adds the AI layer: structured output, MCP, search, and a docs agent.",
    date: "2026-07-01",
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
    cardTitle: "What is AI-native documentation?",
    description:
      "AI-native documentation serves structured data to machines and rendered pages to people from the same URL, so agents stop scraping and start reading. A definition, with examples.",
    date: "2026-06-25",
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
    cardTitle: "Making docs agent-readable",
    description:
      "A practical guide to the three layers of agent-ready documentation: discovery files, structured per-page output, and a live MCP server, with the checks to prove it works.",
    date: "2026-06-18",
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
