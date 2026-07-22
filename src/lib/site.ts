/**
 * Single source of truth for site-wide SEO values.
 * Set NEXT_PUBLIC_SITE_URL to the production domain before deploying.
 * canonicals, the sitemap, robots.txt, OG URLs, and JSON-LD all derive from it.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thally.io";

export const SITE_NAME = "Thally";

export const LEGAL_ENTITY_NAME = "Fairspleet LLC";

export const SITE_TAGLINE = "Docs That Keep Up With the Product";

export const SITE_TITLE = `${SITE_NAME} | ${SITE_TAGLINE}`;

export const SITE_DESCRIPTION =
  "Thally helps software teams publish one documentation source for people and AI tools, then keep it current through review-gated updates drafted by Thally.";

export const OG_DESCRIPTION =
  "Start a new docs site or bring your existing docs to Thally. Then connect product repos so Thally can draft reviewable updates when the docs need to change.";

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
