/**
 * `/api/unsubscribe`: reads and writes a reader's email preferences.
 *
 * Deployed with the static site as a Netlify Function, so the page posts to
 * the same origin and no CORS is involved. Rows land in the Thally Cloud
 * Neon database (`email_preferences` and `email_preference_events`, see
 * db/migrations/20260903_email_preferences.sql).
 *
 * Links from emails arrive as `?email=<address>&token=<hmac>`. When
 * EMAIL_PREFERENCES_SIGNING_SECRET is set, every request must carry a token
 * minted for that address (scripts/sign-unsubscribe-link.mjs does that), so
 * nobody can change preferences for an address they do not hold a link for.
 * Without the secret the endpoint accepts bare addresses, which is fine for
 * local work and must not be how production runs.
 *
 *   GET  ?email&token           Accept: application/json -> current state
 *                               otherwise -> 303 to /unsubscribe?email&token
 *   POST application/json       { email, token?, action, preferences? }
 *        action: "save" | "unsubscribe_all" | "restore"
 *   POST form-encoded           unsubscribe from all. One-click requests
 *        (List-Unsubscribe=One-Click) get a 200; a browser form gets a 303
 *        to the page in its confirmed state.
 */

import { neon } from "@neondatabase/serverless";
import type { Config, Context } from "@netlify/functions";

import {
  ALL_OFF_EMAIL_PREFERENCES,
  DEFAULT_EMAIL_PREFERENCES,
  EMAIL_CATEGORY_KEYS,
  type EmailPreferenceAction,
  type EmailPreferences,
  type EmailPreferenceState,
  isUnsubscribedFromAll,
  normalizeEmail,
  parseEmailPreferences,
} from "../../src/lib/email-preferences";

type Source = EmailPreferenceAction | "one_click" | "form";

const PAGE_PATH = "/unsubscribe";

const NO_STORE = { "Cache-Control": "private, no-store" };

const encoder = new TextEncoder();

function json(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...NO_STORE, ...headers },
  });
}

function databaseUrl(): string {
  const url =
    process.env.EMAIL_PREFERENCES_DATABASE_URL ||
    process.env.DATABASE_URL ||
    process.env.NETLIFY_DATABASE_URL ||
    process.env.THALLY_CLOUD_DATABASE_URL;
  if (!url) throw new Error("No database URL configured for /api/unsubscribe.");
  return url;
}

function base64url(bytes: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");
}

/** HMAC-SHA256 over the lowercased address. Mirrors scripts/sign-unsubscribe-link.mjs. */
export async function signEmail(email: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  return base64url(await crypto.subtle.sign("HMAC", key, encoder.encode(email)));
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function isAuthorized(email: string, token: unknown): Promise<boolean> {
  const secret = process.env.EMAIL_PREFERENCES_SIGNING_SECRET?.trim();
  if (!secret) {
    console.warn("[unsubscribe] EMAIL_PREFERENCES_SIGNING_SECRET is not set; accepting an unsigned link");
    return true;
  }
  if (typeof token !== "string" || !token) return false;
  return timingSafeEqual(await signEmail(email, secret), token);
}

/** Salted digest of the caller's address, for throttling and abuse review only. */
async function hashCallerIp(request: Request, context: Context): Promise<string | null> {
  const ip = context.ip || request.headers.get("x-nf-client-connection-ip") || request.headers.get("x-forwarded-for");
  const address = ip?.split(",")[0]?.trim();
  if (!address) return null;
  const salt = process.env.EMAIL_PREFERENCES_IP_SALT || process.env.EMAIL_PREFERENCES_SIGNING_SECRET || "";
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(`${salt}:${address}`));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

interface PreferenceRow {
  announcements: boolean;
  digest: boolean;
  activity: boolean;
  tips: boolean;
  unsubscribed_all: boolean;
}

function rowToState(email: string, row: PreferenceRow | undefined): EmailPreferenceState {
  const preferences = row
    ? { announcements: row.announcements, digest: row.digest, activity: row.activity, tips: row.tips }
    : DEFAULT_EMAIL_PREFERENCES;
  return { ok: true, email, preferences, unsubscribedAll: row?.unsubscribed_all ?? false };
}

async function readState(email: string): Promise<EmailPreferenceState> {
  const sql = neon(databaseUrl());
  const rows = (await sql`
    SELECT announcements, digest, activity, tips, unsubscribed_all
    FROM email_preferences
    WHERE email = ${email}
  `) as PreferenceRow[];
  return rowToState(email, rows[0]);
}

async function writeState(
  email: string,
  preferences: EmailPreferences,
  source: Source,
  meta: { ipHash: string | null; userAgent: string | null },
): Promise<EmailPreferenceState> {
  const sql = neon(databaseUrl());
  const unsubscribedAll = isUnsubscribedFromAll(preferences);
  const { announcements, digest, activity, tips } = preferences;

  // One HTTP round trip, applied atomically: the current row and the trail
  // never disagree about what happened.
  const [rows] = await sql.transaction([
    sql`
      INSERT INTO email_preferences
        (email, announcements, digest, activity, tips, unsubscribed_all, unsubscribed_at, source, ip_hash, user_agent)
      VALUES
        (${email}, ${announcements}, ${digest}, ${activity}, ${tips}, ${unsubscribedAll},
         ${unsubscribedAll ? new Date().toISOString() : null}, ${source}, ${meta.ipHash}, ${meta.userAgent})
      ON CONFLICT (email) DO UPDATE SET
        announcements = EXCLUDED.announcements,
        digest = EXCLUDED.digest,
        activity = EXCLUDED.activity,
        tips = EXCLUDED.tips,
        unsubscribed_all = EXCLUDED.unsubscribed_all,
        unsubscribed_at = CASE
          WHEN EXCLUDED.unsubscribed_all AND NOT email_preferences.unsubscribed_all THEN now()
          WHEN EXCLUDED.unsubscribed_all THEN email_preferences.unsubscribed_at
          ELSE NULL
        END,
        source = EXCLUDED.source,
        ip_hash = EXCLUDED.ip_hash,
        user_agent = EXCLUDED.user_agent,
        updated_at = now()
      RETURNING announcements, digest, activity, tips, unsubscribed_all
    `,
    sql`
      INSERT INTO email_preference_events
        (email, action, announcements, digest, activity, tips, unsubscribed_all, ip_hash, user_agent)
      VALUES
        (${email}, ${source}, ${announcements}, ${digest}, ${activity}, ${tips}, ${unsubscribedAll},
         ${meta.ipHash}, ${meta.userAgent})
    `,
  ]);

  const state = rowToState(email, (rows as PreferenceRow[])[0]);
  state.message = unsubscribedAll
    ? "You have been unsubscribed from all optional email."
    : source === "restore"
      ? "Your previous preferences are back."
      : "Your email preferences are saved.";
  return state;
}

function pageUrl(request: Request, email: string, token: string | null, confirmed: boolean): string {
  const url = new URL(PAGE_PATH, request.url);
  url.searchParams.set("email", email);
  if (token) url.searchParams.set("token", token);
  if (confirmed) url.searchParams.set("state", "unsubscribed");
  return url.toString();
}

function wantsJson(request: Request): boolean {
  return request.headers.get("accept")?.includes("application/json") ?? false;
}

async function handleGet(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const email = normalizeEmail(url.searchParams.get("email"));
  const token = url.searchParams.get("token");

  if (!wantsJson(request)) {
    // A List-Unsubscribe URL opened in a browser lands on the page itself.
    const target = email ? pageUrl(request, email, token, false) : new URL(PAGE_PATH, request.url).toString();
    return Response.redirect(target, 303);
  }

  if (!email) return json({ error: "Enter a valid email address." }, 400);
  if (!(await isAuthorized(email, token))) return json({ error: "This link is not valid for that address." }, 403);

  try {
    return json(await readState(email));
  } catch (error) {
    console.error("[unsubscribe] failed to read preferences", error);
    return json({ error: "We could not load your preferences just now. Please try again." }, 502);
  }
}

async function handlePost(request: Request, context: Context): Promise<Response> {
  const contentType = request.headers.get("content-type") ?? "";
  const meta = {
    ipHash: await hashCallerIp(request, context),
    userAgent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
  };

  if (contentType.includes("application/json")) {
    let body: Record<string, unknown>;
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      return json({ error: "Request could not be read." }, 400);
    }

    const email = normalizeEmail(body.email);
    if (!email) return json({ error: "Enter a valid email address." }, 400);
    if (!(await isAuthorized(email, body.token))) {
      return json({ error: "This link is not valid for that address." }, 403);
    }

    const action = body.action as EmailPreferenceAction;
    let preferences: EmailPreferences | null;
    if (action === "unsubscribe_all") {
      preferences = ALL_OFF_EMAIL_PREFERENCES;
    } else if (action === "save" || action === "restore") {
      preferences = parseEmailPreferences(body.preferences);
      if (!preferences) {
        return json({ error: `Send a boolean for each of: ${EMAIL_CATEGORY_KEYS.join(", ")}.` }, 400);
      }
    } else {
      return json({ error: "Unknown action." }, 400);
    }

    try {
      return json(await writeState(email, preferences, action, meta));
    } catch (error) {
      console.error("[unsubscribe] failed to write preferences", error);
      return json({ error: "We could not save that just now. Please try again." }, 502);
    }
  }

  // Form posts: RFC 8058 one-click from a mail client, or a plain HTML form.
  const url = new URL(request.url);
  let form: URLSearchParams;
  try {
    form = new URLSearchParams(await request.text());
  } catch {
    return new Response("Request could not be read.", { status: 400, headers: NO_STORE });
  }
  const email = normalizeEmail(form.get("email") ?? url.searchParams.get("email"));
  const token = form.get("token") ?? url.searchParams.get("token");
  const oneClick = form.get("List-Unsubscribe") === "One-Click";

  if (!email) return new Response("Enter a valid email address.", { status: 400, headers: NO_STORE });
  if (!(await isAuthorized(email, token))) {
    return new Response("This link is not valid for that address.", { status: 403, headers: NO_STORE });
  }

  try {
    await writeState(email, ALL_OFF_EMAIL_PREFERENCES, oneClick ? "one_click" : "form", meta);
  } catch (error) {
    console.error("[unsubscribe] failed to write preferences", error);
    return new Response("We could not save that just now. Please try again.", { status: 502, headers: NO_STORE });
  }

  if (oneClick) {
    return new Response(`${email} has been unsubscribed.`, { status: 200, headers: NO_STORE });
  }
  return Response.redirect(pageUrl(request, email, token, true), 303);
}

export default async function handler(request: Request, context: Context): Promise<Response> {
  switch (request.method) {
    case "GET":
      return handleGet(request);
    case "POST":
      return handlePost(request, context);
    default:
      return new Response(null, { status: 405, headers: { Allow: "GET, POST", ...NO_STORE } });
  }
}

export const config: Config = {
  path: "/api/unsubscribe",
};
