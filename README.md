# Thally

The Thally marketing site. Thally (formerly Dox) is the AI-native documentation platform for machines and humans: one MDX source serves structured JSON, JSON-LD, and Markdown to AI agents and polished HTML to readers, from the same URL, and a docs agent turns product changes into reviewed pull requests.

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
