/**
 * Single source of truth for site-wide SEO values.
 * Set NEXT_PUBLIC_SITE_URL to the production domain before deploying —
 * canonicals, the sitemap, robots.txt, OG URLs, and JSON-LD all derive from it.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thally.io";

export const SITE_NAME = "Thally";

export const LEGAL_ENTITY_NAME = "Fairspleet LLC";

export const SITE_TAGLINE = "AI-Native Documentation for Agents and Humans";

export const SITE_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const SITE_DESCRIPTION =
  "Thally is the AI-native documentation platform for AI agents and humans. One MDX source ships JSON, JSON-LD, Markdown, and HTML from the same URL, exposes a remote MCP server on every site, and drafts reviewed docs PRs when your product changes. Migrate from Mintlify, Docusaurus, or GitBook in one command. Open source, MIT.";

export const OG_DESCRIPTION =
  "One source, read natively by AI agents and humans. JSON, JSON-LD & Markdown for agents; HTML for people — same URL. When your product ships, Thally drafts the docs PR.";

export const DESTINATIONS = {
  app: "https://app.thally.io",
  docs: "https://docs.thally.io",
  docsQuickstart: "https://docs.thally.io/quickstart",
  email: "mailto:team@thally.io",
  login: "https://app.thally.io/login",
  sales: "mailto:team@thally.io?subject=Thally%20Enterprise",
  signup: "https://app.thally.io/register",
} as const;

export const SOCIAL = {
  github: "https://github.com/thallylabs/thally",
  x: "https://x.com/thallydocs",
  xHandle: "@thallydocs",
};
