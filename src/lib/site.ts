/**
 * Single source of truth for site-wide SEO values.
 * Set NEXT_PUBLIC_SITE_URL to the production domain before deploying.
 * canonicals, the sitemap, robots.txt, OG URLs, and JSON-LD all derive from it.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thally.io";

export const SITE_NAME = "Thally";

export const LEGAL_ENTITY_NAME = "Fairspleet LLC";

export const SITE_TAGLINE = "Every Product Change. Every Knowledge Surface. Automatically in Sync.";

export const SITE_TITLE = `${SITE_NAME} | Product Knowledge, Automatically in Sync`;

export const SITE_DESCRIPTION =
  "Thally traces product changes to the docs they affect and drafts evidence-backed updates for your team to review, so customer-facing knowledge stays in sync.";

export const OG_DESCRIPTION =
  "Every product change creates communication work. Thally finds the affected docs and drafts evidence-backed updates for your team to review.";

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
