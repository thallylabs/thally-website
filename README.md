# Thally

The Thally marketing site. Thally helps software teams publish one documentation source for people and AI tools, then keep it current through review-gated updates with Thally Track.

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

Before deploying, set the production domain in `metadataBase` (`src/app/layout.tsx`).
