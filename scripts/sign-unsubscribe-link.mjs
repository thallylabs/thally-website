#!/usr/bin/env node
/**
 * Mint a signed email-preferences link for one address.
 *
 *   EMAIL_PREFERENCES_SIGNING_SECRET=... node scripts/sign-unsubscribe-link.mjs someone@example.com
 *
 * Prints the page URL and the one-click POST URL for List-Unsubscribe headers.
 * The token is HMAC-SHA256 over the lowercased address, base64url encoded,
 * exactly what netlify/functions/unsubscribe.ts checks. Keep the sending
 * system's implementation identical to this.
 */
import { createHmac } from "node:crypto";

const secret = process.env.EMAIL_PREFERENCES_SIGNING_SECRET;
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://thally.io").replace(/\/$/, "");
const email = process.argv[2]?.trim().toLowerCase();

if (!secret) {
  console.error("Set EMAIL_PREFERENCES_SIGNING_SECRET first.");
  process.exit(1);
}
if (!email) {
  console.error("Usage: node scripts/sign-unsubscribe-link.mjs <email>");
  process.exit(1);
}

const token = createHmac("sha256", secret).update(email).digest("base64url");
const query = new URLSearchParams({ email, token }).toString();

console.log(`Email preferences page:  ${siteUrl}/unsubscribe?${query}`);
console.log(`List-Unsubscribe (POST): ${siteUrl}/api/unsubscribe?${query}`);
console.log("Header:                  List-Unsubscribe-Post: List-Unsubscribe=One-Click");
