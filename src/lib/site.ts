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
  "Thally is the product knowledge synchronization pipeline. It understands what changed, finds the customer-facing knowledge affected, and prepares reviewable updates, starting with documentation.";

export const OG_DESCRIPTION =
  "The product is the source of truth. Thally turns product changes into evidence-backed, reviewable knowledge updates, starting with documentation.";

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
