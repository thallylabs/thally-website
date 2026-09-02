/**
 * The email categories a reader can opt out of, shared by the preferences
 * page and the `/api/unsubscribe` function so the two never drift.
 *
 * Keys are the column names in `email_preferences` (see
 * db/migrations/20260903_email_preferences.sql). Add or drop a row here and
 * in the migration together.
 */
export const EMAIL_CATEGORIES = [
  {
    key: "announcements",
    title: "Product announcements",
    description: "New capabilities, changelog highlights and occasional deep dives. About twice a month.",
  },
  {
    key: "digest",
    title: "Review digest",
    description: "A summary of drafts waiting for review across your tracked repositories.",
    tag: "weekly · Monday 09:00",
  },
  {
    key: "activity",
    title: "Draft activity",
    description: "One email when a merge produces a new draft, and when a draft is published.",
  },
  {
    key: "tips",
    title: "Tips and onboarding",
    description: "A short series in your first month, then nothing.",
  },
] as const;

export type EmailCategoryKey = (typeof EMAIL_CATEGORIES)[number]["key"];

export type EmailPreferences = Record<EmailCategoryKey, boolean>;

export const EMAIL_CATEGORY_KEYS = EMAIL_CATEGORIES.map((category) => category.key) as EmailCategoryKey[];

/** Everyone starts opted in to every optional category. */
export const DEFAULT_EMAIL_PREFERENCES: EmailPreferences = {
  announcements: true,
  digest: true,
  activity: true,
  tips: true,
};

export const ALL_OFF_EMAIL_PREFERENCES: EmailPreferences = {
  announcements: false,
  digest: false,
  activity: false,
  tips: false,
};

/** What the page sends to `/api/unsubscribe`. */
export type EmailPreferenceAction = "save" | "unsubscribe_all" | "restore";

/** What `/api/unsubscribe` answers with, for both GET and POST. */
export interface EmailPreferenceState {
  ok: true;
  email: string;
  preferences: EmailPreferences;
  unsubscribedAll: boolean;
  /** Present on writes: a sentence the page can show verbatim. */
  message?: string;
}

/** Same path in every environment: the function is deployed with the site. */
export const EMAIL_PREFERENCES_ENDPOINT = "/api/unsubscribe";

/** Deliberately permissive: the only reliable proof of an address is a reply. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+\.[^\s@]{2,}$/;

export const EMAIL_MAX_LENGTH = 254;

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (!email || email.length > EMAIL_MAX_LENGTH || !EMAIL_PATTERN.test(email)) return null;
  return email;
}

/** Coerce an untrusted object into a full preference set, or null if any key is missing. */
export function parseEmailPreferences(value: unknown): EmailPreferences | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const result = {} as EmailPreferences;
  for (const key of EMAIL_CATEGORY_KEYS) {
    if (typeof record[key] !== "boolean") return null;
    result[key] = record[key] as boolean;
  }
  return result;
}

export function isUnsubscribedFromAll(preferences: EmailPreferences): boolean {
  return EMAIL_CATEGORY_KEYS.every((key) => !preferences[key]);
}
