/**
 * Single source of truth for site-wide SEO values.
 * Set NEXT_PUBLIC_SITE_URL to the production domain before deploying.
 * canonicals, the sitemap, robots.txt, OG URLs, and JSON-LD all derive from it.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thally.io";

export const SITE_NAME = "Thally";

export const LEGAL_ENTITY_NAME = "Fairspleet LLC";

export const SITE_TAGLINE = "AI-Native Documentation for Agents and Humans";

export const SITE_TITLE = `${SITE_NAME} | ${SITE_TAGLINE}`;

export const SITE_DESCRIPTION =
  "Thally is the open-source, AI-native documentation platform. Publish HTML, Markdown, JSON, JSON-LD, and MCP tools from one MDX source.";

export const OG_DESCRIPTION =
  "One source for AI agents and humans. Agents get JSON, JSON-LD, and Markdown. People get HTML at the same URL. When your product ships, Thally drafts the docs PR.";

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
};

export const EDITORIAL_TEAM_NAME = "Thally Editorial Team";

export const EDITORIAL_TEAM_URL = `${SITE_URL}/authors/thally-team`;
