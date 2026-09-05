# Thally

The Thally marketing site. Thally is the product knowledge synchronization pipeline. It understands what changed, finds the customer-facing knowledge affected, and prepares reviewable updates, starting with documentation.

Built with Next.js 16 (App Router), Tailwind CSS v4, shadcn/ui, and Motion.

## Getting Started

Install dependencies (this project uses **pnpm**):

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Building for Production

The site is configured for static export (`output: "export"` in `next.config.ts`):

```bash
pnpm build
```

The static site is emitted to `out/`. Preview it locally with any static server, for example:

```bash
npx serve out
```

Note: `next start` does not work with static export.

## Browser Support

The site supports two tiers. The floor is set by Tailwind CSS v4, which compiles against `@property` and `color-mix()` and cannot go lower without dropping Tailwind v4.

**Tier 1, the full experience.** Chrome and Edge 111+, Firefox 128+, Safari and iOS Safari 16.4+. Everything is in play here: canvas art, entrance motion, gradient display type, backdrop blur, masked marquees, and the whole oklch color system.

**Tier 2, readable degradation.** Anything older. The promise is content that is readable, navigable, and correctly ordered, with working links and forms. Decorative layers may be missing: masks, blurs, gradients on text, and entrance animation. Nothing may become invisible, unreadable, or unclickable.

The contract lives in the `browserslist` field of `package.json`:

```
chrome >= 111, edge >= 111, firefox >= 128, safari >= 16.4, ios_saf >= 16.4
```

Next.js reads that field for its SWC compile target (`getSupportedBrowsers`). Every minimum in it is equal to or stricter than the Next.js 16 default (`chrome 111, edge 111, firefox 111, safari 16.4`), so declaring it cannot downlevel the JavaScript output or grow the bundle. Firefox is the one real change: 111 through 127 now gets JavaScript targeted above its support, but those versions have no `@property` and are already Tier 2, where the pre-rendered HTML and anchor navigation still work.

Tailwind does **not** read that field. Tailwind v4 hard-codes its Lightning CSS targets (Chrome 111, Safari 16.4, Firefox 128) inside `@tailwindcss/node`. Those targets are what emit the sRGB hex fallback ahead of every `oklch()` token, the `-webkit-mask-image` and `-webkit-backdrop-filter` prefixes, and Tailwind's own fallback layer for engines without `@property`. Keep the two in agreement whenever either moves.

Two guards are written by hand, at the end of `src/app/globals.css`. Both protect `.linear-text`, the only construct on the site whose failure mode is invisible text rather than plainer text: it paints display headings through a background gradient clipped to the glyphs while the glyph fill is transparent. One guard covers engines that do not honor `background-clip: text`, the other covers forced-colors modes. Everything else degrades on its own through the build pipeline described above.

Two known gaps worth remembering:

- `text-wrap: balance` needs Safari 17.5, above the Tier 1 floor. Headings wrap normally on Safari 16.4 through 17.4, which is cosmetic.
- React inline styles never pass through Lightning CSS, so anything modern written in a `style` prop needs its own fallback or prefix. Mask images in inline styles must set both `maskImage` and `WebkitMaskImage`.

## Project Structure

- `src/app/`: routes for home, pricing, about, FAQ, contact, login/signup, terms, and privacy
- `src/components/sections/`: landing page sections (hero, automation, features, migration, dashboard, testimonials, pricing, FAQ)
- `src/components/layout/`: navbar, footer, and logo
- `src/components/illustrations/thally-ui.tsx`: shared product UI illustration primitives
- `src/components/ui/`: shadcn/ui components
- `public/llms.txt`: agent-readable summary of the site and product

## Housekeeping

- `pnpm lint`: ESLint with auto-fix
- `pnpm format`: Prettier
- `pnpm audit:seo`: SEO and AEO conformance over the public files and rendered HTML
- `pnpm audit:perf`: the Lighthouse gate, described below
- `pnpm audit:release`: the full pre-deploy sweep (webpack build, then both audits)

Nothing here runs during `pnpm build`, and `audit:release` reuses the export it has just built rather than building a second time.

Before deploying, set the production domain in `metadataBase` (`src/app/layout.tsx`).

### The Lighthouse gate

`pnpm audit:perf` builds the static export, serves `out/` on a local port, and runs Lighthouse on both the mobile and desktop presets across `/`, `/pricing`, `/features/track`, and `/blog/thally-vs-mintlify`. It prints a score table and exits non-zero when any category on any route falls below its threshold.

```bash
pnpm audit:perf                                   # build, then audit
pnpm audit:perf --skip-build                      # audit whatever is already in out/
PERF_AUDIT_SKIP_BUILD=1 pnpm audit:perf           # same, for CI and audit:release
pnpm audit:perf --skip-build --only=desktop --routes=/pricing --port=4180 --dir=out
```

Thresholds live at the top of `scripts/perf-audit.mjs`:

| Category       | Threshold                                             | Why                                                                       |
| -------------- | ----------------------------------------------------- | ------------------------------------------------------------------------- |
| Accessibility  | 100                                                   | Deterministic. Anything below 100 is a real defect, so it is a hard gate. |
| Best practices | 100                                                   | Deterministic. Console errors and insecure requests both land here.       |
| SEO            | 100                                                   | Deterministic, and `audit:seo` already holds the same line.               |
| Performance    | `PERFORMANCE_MIN`, currently 55 mobile and 95 desktop | A ratchet, not a target.                                                  |

Performance is scored per form factor because a single floor at the mobile number would let desktop fall a long way without failing. The values sit a few points under what the export passes at today, since Lighthouse performance scores move run to run and with machine load. Raise them as each performance phase lands, rather than leaving them where they are.

The run needs a local Chrome or Chromium. Set `CHROME_PATH` if it lives somewhere unusual. Lighthouse is pinned to 12.8.2 because Lighthouse scoring changes between majors and the thresholds above were measured with it.

`/features/track` does not clear the accessibility and best-practices gates yet, so the sweep is red on that route until three things are fixed. The feature hero puts an `aria-label` on a plain `span` inside its `h1`, which axe rejects (the attribute is prohibited without a role), and that markup is shared by every feature page. Several muted text colors on the page fall below the WCAG AA contrast ratio. The Track demo probes the Thally Cloud API on mount, which CORS blocks from any non-production origin and logs a console error that the best-practices audit counts.
