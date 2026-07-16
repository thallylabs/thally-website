import type { ComponentType, CSSProperties, SVGProps } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   Thally icon pack: a CUSTOM family, not stock Lucide.

   Grammar (Thally's own "handwriting"):
   • Duotone. A ~16% tint FILL sits under a keyline STROKE, echoing the tinted
     fills Thally uses everywhere (color-mix chart-N 15%). Bare glyphs use one
     color for both, so the wash reads automatically on any surface.
   • The LEAF. The brand mark, two lobes meeting at a tip, a tapering vein
     seam, and a curled stem, is a reusable primitive that recurs across the
     brand marks (agent, readiness, track, trust, structured).
   • Duality. "Documentation for machines and humans" is drawn literally.

   Icon values are either a stroke-only string, or { f, s } where f is the
   tinted fill markup and s is the stroke markup (f is painted first, under s).

   Ported from thally-cloud/public/thally-icons-pack. Wrapped so each glyph is
   a className-accepting component and a drop-in for the lucide icons this site
   used to import.
   ──────────────────────────────────────────────────────────────────────── */

// Reusable leaf geometry (24-grid): tip top-right, curled stem bottom-left.
const LEAF_BODY = "M6.5 20C4 13.5 10 5.5 20 4.5 19 14.5 12.5 20.5 6.5 20Z";
const LEAF_VEIN = "M6.5 20C10 15 14.5 9.5 18.5 6";
const LEAF_STEM = "M6.5 20C5.6 21.4 4.6 21.9 3.6 21.6";

type IconDef = string | { f: string; s: string };

export const ICONS: Record<string, IconDef> = {
  // ── Brand marks (custom, with no Lucide equivalent) ──────────────────────
  leaf: {
    f: `<path d="${LEAF_BODY}"/>`,
    s: `<path d="${LEAF_BODY}"/><path d="${LEAF_VEIN}"/><path d="${LEAF_STEM}"/>`,
  },
  // Docs agent: a leaf that grows, reviewed, from a rooted source node.
  "docs-agent": {
    f: `<path d="M6 11C6 7.5 9 5 13.7 4.5 12.6 8.6 9.6 11 6 11Z"/>`,
    s: `<circle cx="6" cy="18.7" r="2.4"/><path d="M6 16.3V11"/><path d="M6 11C6 7.5 9 5 13.7 4.5 12.6 8.6 9.6 11 6 11Z"/><path d="M6 11C8.4 9.6 10.8 7.7 12.5 6"/>`,
  },
  // Agent-readiness score: a gauge with a leaf for a needle.
  readiness: {
    f: `<path d="M11 17.5C10 14.5 12.5 11.5 16 11 15 14.5 13 17.2 11 17.5Z"/><circle cx="12" cy="16.5" r="1"/>`,
    s: `<path d="M4.4 16.6A9 9 0 1 1 19.6 16.6"/><path d="M11 17.5C10 14.5 12.5 11.5 16 11 15 14.5 13 17.2 11 17.5Z"/><path d="M11 17.5C12.7 15.8 14.4 13.9 15.5 12.2"/>`,
  },
  // Machines and humans, one source: a human + a machine on one baseline.
  "dual-reader": {
    f: `<circle cx="6.6" cy="6.6" r="2.7"/>`,
    s: `<circle cx="6.6" cy="6.6" r="2.7"/><path d="M3.3 13.6a3.3 3.3 0 0 1 6.6 0"/><rect x="13.6" y="4.2" width="6.8" height="6" rx="1.4"/><path d="M15.4 6.6h3.2"/><path d="M15.4 8.4h3.2"/><path d="M3.5 19.5h17"/><path d="M6.6 13.6v5.9"/><path d="M17 10.2v9.3"/>`,
  },
  // Content negotiation: one URL, three formats (JSON / MD / HTML).
  negotiation: {
    f: `<circle cx="4.8" cy="12" r="2.2"/><rect x="15.4" y="4.6" width="4.6" height="3" rx="1"/><rect x="15.4" y="10.5" width="4.6" height="3" rx="1"/><rect x="15.4" y="16.4" width="4.6" height="3" rx="1"/>`,
    s: `<circle cx="4.8" cy="12" r="2.2"/><path d="M7 12h3"/><path d="M10 12c3.6 0 2.4-6 5.4-6"/><path d="M10 12h5.4"/><path d="M10 12c3.6 0 2.4 6 5.4 6"/><rect x="15.4" y="4.6" width="4.6" height="3" rx="1"/><rect x="15.4" y="10.5" width="4.6" height="3" rx="1"/><rect x="15.4" y="16.4" width="4.6" height="3" rx="1"/>`,
  },
  // Answers with receipts: a leaf-pointed shield, verified.
  trust: {
    f: `<path d="M12 3C14.5 4.8 16.5 5.5 19 5.5V11c0 5-3.5 7.5-7 9.5-3.5-2-7-4.5-7-9.5V5.5C7.5 5.5 9.5 4.8 12 3Z"/>`,
    s: `<path d="M12 3C14.5 4.8 16.5 5.5 19 5.5V11c0 5-3.5 7.5-7 9.5-3.5-2-7-4.5-7-9.5V5.5C7.5 5.5 9.5 4.8 12 3Z"/><path d="M8.9 11.8l2.2 2.2 4.3-4.3"/>`,
  },
  // Thally Track: a leaf watched by signal waves.
  track: {
    f: `<path d="M10.5 14C9 11 11.5 8.2 15 7.8 13.8 11 12 13.8 10.5 14Z"/>`,
    s: `<path d="M10.5 14C9 11 11.5 8.2 15 7.8 13.8 11 12 13.8 10.5 14Z"/><path d="M10.5 14C12.2 12.3 13.8 10.3 14.7 8.7"/><path d="M15.6 6.4a5.6 5.6 0 0 1 2.3 4.3"/><path d="M17.9 4a9 9 0 0 1 3.1 6.7"/>`,
  },
  // Agent endpoint (MCP / llms.txt): a node bracketed for machines.
  mcp: {
    f: `<circle cx="12" cy="12" r="2.3"/>`,
    s: `<path d="M8.5 4.5H5.5a1 1 0 0 0-1 1V18.5a1 1 0 0 0 1 1H8.5"/><path d="M15.5 4.5H18.5a1 1 0 0 1 1 1V18.5a1 1 0 0 1-1 1H15.5"/><circle cx="12" cy="12" r="2.3"/><path d="M12 4.7v5"/><path d="M12 14.3v5"/>`,
  },
  // Structured source: one MDX source, machine-structured.
  structured: {
    f: `<path d="M10.3 14C9.2 11.5 11 9 13.7 8.7 12.6 11.2 11.4 13.7 10.3 14Z"/>`,
    s: `<path d="M9 4.5H8a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h1"/><path d="M15 4.5h1a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2h-1"/><path d="M10.3 14C9.2 11.5 11 9 13.7 8.7 12.6 11.2 11.4 13.7 10.3 14Z"/><path d="M10.3 14C11.6 12.4 12.9 10.6 13.6 9.2"/>`,
  },

  // ── Navigation: every glyph carries a leaf, seed, or vein cue ─────────────
  overview: {
    f: `<rect x="3" y="3" width="7.5" height="7.5" rx="1.8"/><path d="M14 10.4C13.2 8 15.2 5.1 20 4.6 19.4 9.2 16.9 10.9 14 10.4Z"/>`,
    s: `<rect x="3" y="3" width="7.5" height="7.5" rx="1.8"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.8"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.8"/><path d="M14 10.4C13.2 8 15.2 5.1 20 4.6 19.4 9.2 16.9 10.9 14 10.4Z"/><path d="M14 10.4C15.8 9.1 17.5 7.3 18.6 5.7"/>`,
  },
  sites: {
    f: `<path d="M6 12.6C3.8 12.6 2.6 11.3 2.6 9.2 4.8 9.2 6 10.4 6 12.6Z"/><path d="M12 9.2C14.2 9.2 15.4 7.9 15.4 5.8 13.2 5.8 12 7 12 9.2Z"/><path d="M18 6.6C15.8 6.6 14.6 5.3 14.6 3.2 16.8 3.2 18 4.4 18 6.6Z"/>`,
    s: `<path d="M3 20h18"/><path d="M6 20v-7.4"/><path d="M6 12.6C3.8 12.6 2.6 11.3 2.6 9.2 4.8 9.2 6 10.4 6 12.6Z"/><path d="M12 20V9.2"/><path d="M12 9.2C14.2 9.2 15.4 7.9 15.4 5.8 13.2 5.8 12 7 12 9.2Z"/><path d="M18 20V6.6"/><path d="M18 6.6C15.8 6.6 14.6 5.3 14.6 3.2 16.8 3.2 18 4.4 18 6.6Z"/>`,
  },
  team: {
    f: `<path d="M9 3.4c1.7 1.3 2.5 2.7 2.5 4.1S10.4 10 9 10 6.5 8.9 6.5 7.5 7.3 4.7 9 3.4Z"/>`,
    s: `<path d="M9 3.4c1.7 1.3 2.5 2.7 2.5 4.1S10.4 10 9 10 6.5 8.9 6.5 7.5 7.3 4.7 9 3.4Z"/><path d="M2.6 20v-1a4 4 0 0 1 4-4h4.8a4 4 0 0 1 4 4v1"/><path d="M16.5 5.1c1.3 1 1.9 2.1 1.9 3.1s-.8 1.9-1.9 2.2"/><path d="M17.5 15h.9a4 4 0 0 1 4 4v1"/>`,
  },
  billing: {
    f: `<rect x="2" y="5" width="20" height="14" rx="2.4"/>`,
    s: `<rect x="2" y="5" width="20" height="14" rx="2.4"/><path d="M2 9.5h20"/><path d="M5.6 15.6C5.5 13.7 6.7 12.3 9.2 12 9.1 13.9 7.8 15.3 5.6 15.6Z"/><path d="M14 15.5h4"/>`,
  },
  settings: {
    f: `<path d="M7 4.6c1.4.5 2 1.1 2 1.9s-.6 1.4-2 1.9c-1.4-.5-2-1.1-2-1.9s.6-1.4 2-1.9Z"/><path d="M16 13.7c1.4.5 2 1.1 2 1.9s-.6 1.4-2 1.9c-1.4-.5-2-1.1-2-1.9s.6-1.4 2-1.9Z"/>`,
    s: `<path d="M9.2 6.5H20"/><path d="M4 6.5h1"/><path d="M7 4.6c1.4.5 2 1.1 2 1.9s-.6 1.4-2 1.9c-1.4-.5-2-1.1-2-1.9s.6-1.4 2-1.9Z"/><path d="M4 15.6h9.8"/><path d="M18 15.6h2"/><path d="M16 13.7c1.4.5 2 1.1 2 1.9s-.6 1.4-2 1.9c-1.4-.5-2-1.1-2-1.9s.6-1.4 2-1.9Z"/>`,
  },
  search: {
    f: `<path d="M10.5 14.2C9.1 12.1 10.2 9.2 13.4 7.8 14.3 10.6 13.2 13.4 10.5 14.2Z"/>`,
    s: `<circle cx="10.5" cy="10.5" r="7.5"/><path d="m21 21-4.7-4.7"/><path d="M10.5 14.2C9.1 12.1 10.2 9.2 13.4 7.8 14.3 10.6 13.2 13.4 10.5 14.2Z"/><path d="M10.5 14.2C11.6 12.6 12.7 11 13.3 9.6"/>`,
  },
  bell: {
    f: `<path d="M3.9 15.3A1 1 0 0 0 4.7 17h14.6a1 1 0 0 0 .8-1.7C18.9 13.9 17.6 12.5 17.6 8.4A5.6 5.6 0 0 0 6.4 8.4c0 4.1-1.3 5.5-2.5 6.9"/>`,
    s: `<path d="M3.9 15.3A1 1 0 0 0 4.7 17h14.6a1 1 0 0 0 .8-1.7C18.9 13.9 17.6 12.5 17.6 8.4A5.6 5.6 0 0 0 6.4 8.4c0 4.1-1.3 5.5-2.5 6.9"/><path d="M12 20.5c-1.2 0-1.9-.8-1.9-2 1.2 0 1.9.8 1.9 2Z"/>`,
  },
  "panel-left": {
    f: `<path d="M3 5.4A2.4 2.4 0 0 1 5.4 3H9v18H5.4A2.4 2.4 0 0 1 3 18.6Z"/>`,
    s: `<rect x="3" y="3" width="18" height="18" rx="2.4"/><path d="M9 3v18"/><path d="M5.3 11.8C4.1 11.8 3.4 11 3.4 9.8 4.6 9.8 5.3 10.6 5.3 11.8Z"/>`,
  },
  sun: {
    f: `<circle cx="12" cy="12" r="4.2"/>`,
    s: `<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.2"/><path d="M12 19.8V22"/><path d="m4.6 4.6 1.5 1.5"/><path d="m17.9 17.9 1.5 1.5"/><path d="M2 12h2.2"/><path d="M19.8 12H22"/><path d="m6.1 17.9-1.5 1.5"/><path d="m19.4 4.6-1.5 1.5"/>`,
  },
  moon: {
    f: `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`,
    s: `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`,
  },

  // ── Actions: the primary stroke terminates in a leaf tip ──────────────────
  "arrow-right": {
    f: `<path d="M13.8 12C13.5 8.9 15.3 6.4 19.8 5.6 19.6 9.9 17.4 12.2 13.8 12Z"/>`,
    s: `<path d="M4 12h9.9"/><path d="M13.8 12C13.5 8.9 15.3 6.4 19.8 5.6 19.6 9.9 17.4 12.2 13.8 12Z"/><path d="M14.4 11.2C16.3 9.9 18 8.2 19 6.6"/>`,
  },
  "arrow-up-right": {
    f: `<path d="M14 10C11.2 9.2 9.9 6.2 11.1 2.4 15 3.6 16.4 6.6 14 10Z"/>`,
    s: `<path d="M5 19 12.2 11.5"/><path d="M14 10C11.2 9.2 9.9 6.2 11.1 2.4 15 3.6 16.4 6.6 14 10Z"/><path d="M13.3 8.9C12.9 6.7 11.7 4.9 10.1 3.6"/>`,
  },
  plus: {
    f: `<path d="M15 8.4C14.8 6.4 16 4.9 18.5 4.6 18.4 6.6 17.2 8 15 8.4Z"/>`,
    s: `<path d="M12 6v12"/><path d="M6 12h12"/><path d="M15 8.4C14.8 6.4 16 4.9 18.5 4.6 18.4 6.6 17.2 8 15 8.4Z"/>`,
  },
  check: {
    f: `<path d="M14 8.2C13.6 5.7 14.8 3.6 17.5 2.8 17.9 5.4 16.7 7.4 14 8.2Z"/>`,
    s: `<path d="M4 12.6 9 17.6l5-9.4"/><path d="M14 8.2C13.6 5.7 14.8 3.6 17.5 2.8 17.9 5.4 16.7 7.4 14 8.2Z"/>`,
  },
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  "chevrons-up-down": '<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>',
  "external-link": {
    f: `<path d="M14 10C13.7 6.8 15.5 4.3 20 3.5 19.8 7.9 17.6 10.2 14 10Z"/>`,
    s: `<path d="M12.5 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6.5"/><path d="M14 10C13.7 6.8 15.5 4.3 20 3.5 19.8 7.9 17.6 10.2 14 10Z"/><path d="M14.6 9.2C16.5 7.9 18.2 6.1 19.2 4.5"/>`,
  },
  copy: {
    f: `<path d="M11.8 18.4C11.6 16.5 12.8 15.1 15.3 14.8 15.2 16.7 13.9 18 11.8 18.4Z"/>`,
    s: `<rect x="8" y="8" width="13" height="13" rx="2.4"/><path d="M4 15.5A2 2 0 0 1 2 13.5V4a2 2 0 0 1 2-2h9.5a2 2 0 0 1 2 2"/><path d="M11.8 18.4C11.6 16.5 12.8 15.1 15.3 14.8 15.2 16.7 13.9 18 11.8 18.4Z"/>`,
  },
  "refresh-cw": {
    f: `<path d="M12 15.2C11 13.4 12.2 11.2 14.6 10.5 15.2 12.8 14.1 14.7 12 15.2Z"/>`,
    s: `<path d="M4.5 9A8 8 0 0 1 18.9 8.3"/><path d="M4 3.5v5h5"/><path d="M19.5 15A8 8 0 0 1 5.1 15.7"/><path d="M20 20.5v-5h-5"/><path d="M12 15.2C11 13.4 12.2 11.2 14.6 10.5 15.2 12.8 14.1 14.7 12 15.2Z"/>`,
  },

  // ── Product: leaf woven into each utility form ────────────────────────────
  cloud: {
    f: `<path d="M10.5 16C9.4 14.1 10.6 11.4 13.4 10.5 14.1 12.9 12.9 15.4 10.5 16Z"/>`,
    s: `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="M10.5 16C9.4 14.1 10.6 11.4 13.4 10.5 14.1 12.9 12.9 15.4 10.5 16Z"/><path d="M10.5 16C11.5 14.6 12.6 13.1 13.2 11.8"/>`,
  },
  globe: {
    f: `<circle cx="12" cy="12" r="9.5"/>`,
    s: `<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19"/><path d="M12 2.5a15 15 0 0 1 0 19"/><path d="M12 2.5C6.5 6 6.5 18 12 21.5"/><path d="M8.5 12C8.5 8.7 10 6 13.4 5.2"/>`,
  },
  "git-branch": {
    f: `<path d="M18 4.4C19.9 5 21 6.4 21 8.4 18.7 8.4 17.4 7 18 4.4Z"/><circle cx="6" cy="18" r="2.6"/>`,
    s: `<path d="M6 15.4V4"/><circle cx="6" cy="18" r="2.6"/><path d="M6 12C6 9 8 6.8 12 6"/><path d="M18 4.4C19.9 5 21 6.4 21 8.4 18.7 8.4 17.4 7 18 4.4Z"/><path d="M12.2 6C13.8 5.7 15.6 5.1 17 4.4"/>`,
  },
  "git-pull-request": {
    f: `<circle cx="6" cy="18" r="2.6"/><path d="M18 4.4C19.9 5 21 6.4 21 8.4 18.7 8.4 17.4 7 18 4.4Z"/>`,
    s: `<circle cx="6" cy="18" r="2.6"/><path d="M6 15.4V6"/><circle cx="6" cy="6" r="2.6"/><path d="M18 10.4V8.4"/><path d="M8.6 6h4.4a3 3 0 0 1 3 3v3"/><path d="M18 4.4C19.9 5 21 6.4 21 8.4 18.7 8.4 17.4 7 18 4.4Z"/>`,
  },
  docs: {
    f: `<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>`,
    s: `<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2C14 5 15.5 7.5 20 7 17.5 4.5 15.5 3 14 2Z"/><path d="M8 12.5h8"/><path d="M8 16.5h5"/>`,
  },
  guide: {
    f: `<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4V21a3 3 0 0 0-3-3z"/>`,
    s: `<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/><path d="M17.5 3v7.5c0-1.8 1-3 3-3.3"/>`,
  },
  terminal: {
    f: `<path d="M13.5 18.4C13.3 16.6 14.4 15.2 16.8 14.9 16.7 16.7 15.5 18 13.5 18.4Z"/>`,
    s: `<rect x="2.5" y="4" width="19" height="16" rx="2.4"/><path d="m6.5 9.5 3 2.5-3 2.5"/><path d="M13.5 18.4C13.3 16.6 14.4 15.2 16.8 14.9 16.7 16.7 15.5 18 13.5 18.4Z"/>`,
  },
  json: {
    f: `<path d="M11 14.5C10 12.7 11.2 10.5 13.6 9.8 14.2 12.1 13.1 14 11 14.5Z"/>`,
    s: `<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/><path d="M11 14.5C10 12.7 11.2 10.5 13.6 9.8 14.2 12.1 13.1 14 11 14.5Z"/>`,
  },
  code: {
    f: `<path d="M12 15C11 13.2 12.2 11 14.6 10.3 15.2 12.6 14.1 14.5 12 15Z"/>`,
    s: `<path d="m7 8-4 4 4 4"/><path d="m17 8 4 4-4 4"/><path d="M12 15C11 13.2 12.2 11 14.6 10.3 15.2 12.6 14.1 14.5 12 15Z"/>`,
  },
  workspace: {
    f: `<rect width="16" height="20" x="4" y="2" rx="2"/>`,
    s: `<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-3.5a3 3 0 0 1 6 0V22"/><path d="M9 6h.01"/><path d="M15 6h.01"/><path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 15.4C10.9 13.6 12.1 11.4 14.5 10.7 15.1 13 14 15 12 15.4Z"/>`,
  },
  account: {
    f: `<path d="M12 6c1.7 1.3 2.5 2.7 2.5 4.1S13.4 12.6 12 12.6 9.5 11.5 9.5 10.1 10.3 7.3 12 6Z"/>`,
    s: `<circle cx="12" cy="12" r="9.5"/><path d="M12 6c1.7 1.3 2.5 2.7 2.5 4.1S13.4 12.6 12 12.6 9.5 11.5 9.5 10.1 10.3 7.3 12 6Z"/><path d="M6.4 19.4a5.6 5.6 0 0 1 11.2 0"/>`,
  },
  data: {
    f: `<ellipse cx="12" cy="5" rx="9" ry="3"/>`,
    s: `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/><path d="M11.4 16.6C10.5 15 11.5 13 13.6 12.5 14.1 14.5 13.2 16.2 11.4 16.6Z"/>`,
  },
  key: {
    f: `<path d="M8 10C5.5 12 5 15.5 7 18.5 10.5 17 12 13.5 10.5 9.5 9.6 9.6 8.7 9.8 8 10Z"/>`,
    s: `<path d="M8 10C5.5 12 5 15.5 7 18.5 10.5 17 12 13.5 10.5 9.5 9.6 9.6 8.7 9.8 8 10Z"/><path d="m10.8 9.2 8-8"/><path d="m15.5 4.5 2.5 2.5"/><path d="m18.8 1.2 3 3"/>`,
  },
  lock: {
    f: `<rect width="18" height="11" x="3" y="11" rx="2"/>`,
    s: `<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><path d="M12 18.5C11 16.7 12.2 14.8 14.4 14.3 15 16.5 13.9 18.2 12 18.5Z"/>`,
  },
};

export type IconName = keyof typeof ICONS;

function markup(def: IconDef, fillOpacity: number): string {
  const stroke = typeof def === "string" ? def : def.s;
  const fill = typeof def === "string" ? "" : def.f;
  const fillLayer = fill ? `<g fill="currentColor" stroke="none" opacity="${fillOpacity}">${fill}</g>` : "";
  return fillLayer + `<g>${stroke}</g>`;
}

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName | string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  fillOpacity?: number;
  duotone?: boolean;
  title?: string;
}

export function Icon({
  name,
  size = 20,
  color = "currentColor",
  strokeWidth = 1.9,
  fillOpacity = 0.16,
  duotone = true,
  style,
  title,
  ...rest
}: IconProps) {
  const def = ICONS[name];
  if (!def) {
    if (typeof console !== "undefined") console.warn(`Icon: unknown name "${name}"`);
    return null;
  }
  const inner = markup(def, duotone ? fillOpacity : 0);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      color={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ flexShrink: 0, display: "block", ...style }}
      dangerouslySetInnerHTML={{ __html: (title ? `<title>${title}</title>` : "") + inner }}
      {...rest}
    />
  );
}

/* Tinted container: Thally's standard icon frame (rounded square or circle,
   ~15% chart-color wash, icon stroked in the full chart color). */
export interface IconTileProps {
  name: IconName | string;
  tint?: string;
  shape?: "square" | "circle";
  size?: number;
  iconSize?: number;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
}

export function IconTile({
  name,
  tint = "var(--chart-2)",
  shape = "square",
  size = 36,
  iconSize,
  strokeWidth = 1.9,
  style,
  ...rest
}: IconTileProps) {
  const radius = shape === "circle" ? "9999px" : "var(--radius-md, 0.5rem)";
  const glyph = iconSize ?? Math.round(size * 0.52);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: radius,
        background: `color-mix(in oklab, ${tint} 15%, transparent)`,
        color: tint,
        flexShrink: 0,
        ...style,
      }}
      {...rest}
    >
      <Icon name={name} size={glyph} color={tint} strokeWidth={strokeWidth} duotone={false} />
    </span>
  );
}

/* ── className-accepting wrappers ──────────────────────────────────────────
   Drop-in replacements for the lucide icons the site used to import. Each
   accepts className/style/strokeWidth and inherits color via currentColor, so
   existing Tailwind `size-*` / `text-*` classes keep working. */
export type ThallyIconProps = Omit<IconProps, "name">;
export type ThallyIcon = ComponentType<ThallyIconProps>;

/* Structural type satisfied by both lucide and Thally glyph components. Use
   it for `icon:` fields in arrays that still mix the two families. */
export type IconComponent = ComponentType<{
  className?: string;
  strokeWidth?: number;
  style?: CSSProperties;
}>;

const make = (name: IconName): ThallyIcon => {
  const C = (props: ThallyIconProps) => <Icon name={name} {...props} />;
  C.displayName = `Thally(${name})`;
  return C;
};

// Brand marks
export const Leaf = make("leaf");
export const DocsAgent = make("docs-agent");
export const Readiness = make("readiness");
export const DualReader = make("dual-reader");
export const Negotiation = make("negotiation");
export const Trust = make("trust");
export const Track = make("track");
export const Mcp = make("mcp");
export const Structured = make("structured");

// Navigation
export const Overview = make("overview");
export const Sites = make("sites");
export const Team = make("team");
export const Billing = make("billing");
export const Settings = make("settings");
export const Search = make("search");
export const Bell = make("bell");
export const PanelLeft = make("panel-left");
export const Sun = make("sun");
export const Moon = make("moon");

// Actions
export const ArrowRight = make("arrow-right");
export const ArrowUpRight = make("arrow-up-right");
export const Plus = make("plus");
export const Check = make("check");
export const ChevronDown = make("chevron-down");
export const ChevronsUpDown = make("chevrons-up-down");
export const ExternalLink = make("external-link");
export const Copy = make("copy");
export const RefreshCw = make("refresh-cw");

// Product
export const Cloud = make("cloud");
export const Globe = make("globe");
export const GitBranch = make("git-branch");
export const GitPullRequest = make("git-pull-request");
export const Docs = make("docs");
export const Guide = make("guide");
export const Terminal = make("terminal");
export const Json = make("json");
export const Code = make("code");
export const Workspace = make("workspace");
export const Account = make("account");
export const Data = make("data");
export const Key = make("key");
export const Lock = make("lock");

/* ArrowLeft is the site's one back arrow; reuse arrow-right, mirrored. */
export const ArrowLeft: ThallyIcon = (props) => (
  <Icon name="arrow-right" {...props} style={{ transform: "scaleX(-1)", ...props.style }} />
);
ArrowLeft.displayName = "Thally(arrow-left)";
