/**
 * Routes that render their own header and footer instead of the marketing
 * chrome. The email preferences page is reached from an email link, often on
 * a phone, and the reader wants one thing: to change a setting and leave.
 */
export const CHROMELESS_PATHS = ["/unsubscribe"];

export function isChromelessPath(pathname: string): boolean {
  return CHROMELESS_PATHS.includes(pathname.replace(/\/$/, "") || "/");
}
