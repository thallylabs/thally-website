/**
 * Single source of truth for site-wide SEO values.
 * Set NEXT_PUBLIC_SITE_URL to the production domain before deploying.
 * canonicals, the sitemap, robots.txt, OG URLs, and JSON-LD all derive from it.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thally.io";

export const SITE_NAME = "Thally";

export const LEGAL_ENTITY_NAME = "Fairspleet LLC";

export const SITE_TAGLINE = "Every Product Change. Every Affected Surface. Automatically in Sync.";

export const SOCIAL_PREVIEW_TITLE = `${SITE_NAME} - Every Product Change, Every Affected Surface`;

export const SOCIAL_PREVIEW_DESCRIPTION =
  "Turn every product update into evidence-backed pull requests across your connected docs, website content, agent skills, and other Git repositories.";

export const SITE_TITLE = SOCIAL_PREVIEW_TITLE;

export const SITE_DESCRIPTION = SOCIAL_PREVIEW_DESCRIPTION;

export const OG_DESCRIPTION = SOCIAL_PREVIEW_DESCRIPTION;

export const DESTINATIONS = {
  app: "https://app.thally.io",
  docs: "https://docs.thally.io",
  docsQuickstart: "https://docs.thally.io/quickstart",
  docsChangelog: "https://docs.thally.io/changelog",
  // The docs site has no /guides or /components index, so these point at the
  // first page of each section.
  docsGuides: "https://docs.thally.io/guides/getting-started",
  docsComponents: "https://docs.thally.io/components/badge",
  email: "mailto:team@thally.io",
  login: "https://app.thally.io/login",
  /* Enterprise enquiries go through the contact form, which stores them, rather
     than a mailto that depends on the reader having a mail client wired up. The
     topic arrives preselected. */
  sales: "/contact?topic=Enterprise+%26+SSO",
  signup: "https://app.thally.io/register",
} as const;

export const SOCIAL = {
  github: "https://github.com/thallylabs/thally",
};

export const EDITORIAL_TEAM_NAME = "Thally Editorial Team";

export const EDITORIAL_TEAM_URL = `${SITE_URL}/authors/thally-team`;
