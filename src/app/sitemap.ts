import { execFileSync } from "node:child_process";

import type { MetadataRoute } from "next";

import { blogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

type ChangeFrequency = "weekly" | "monthly" | "yearly";

interface SitemapRoute {
  changeFrequency: ChangeFrequency;
  path: string;
  priority: number;
  sources: string[];
}

const SHARED_SOURCES = ["src/app/layout.tsx", "src/lib/site.ts"];

const routes: SitemapRoute[] = [
  {
    path: "/",
    priority: 1,
    changeFrequency: "weekly",
    sources: ["src/app/page.tsx", "src/components/sections", "src/components/layout"],
  },
  {
    path: "/pricing",
    priority: 0.9,
    changeFrequency: "monthly",
    sources: [
      "src/app/pricing",
      "src/components/sections/pricing.tsx",
      "src/components/sections/pricing2.tsx",
      "src/components/sections/no-lock-in.tsx",
      "public/pricing.md",
    ],
  },
  {
    path: "/blog",
    priority: 0.8,
    changeFrequency: "weekly",
    sources: ["src/app/blog/page.tsx", "src/lib/blog.ts", "src/components/blog"],
  },
  {
    path: "/faq",
    priority: 0.8,
    changeFrequency: "monthly",
    sources: ["src/app/faq", "src/components/sections/faq-page.tsx", "src/components/sections/faq-page-data.ts"],
  },
  {
    path: "/about",
    priority: 0.6,
    changeFrequency: "monthly",
    sources: ["src/app/about", "src/components/sections/about.tsx"],
  },
  {
    path: "/contact",
    priority: 0.6,
    changeFrequency: "yearly",
    sources: ["src/app/contact", "src/components/sections/contact.tsx"],
  },
  {
    path: "/privacy",
    priority: 0.2,
    changeFrequency: "yearly",
    sources: ["src/app/privacy"],
  },
  {
    path: "/terms",
    priority: 0.2,
    changeFrequency: "yearly",
    sources: ["src/app/terms"],
  },
];

function getLastModified(sources: string[]) {
  const trackedSources = [...SHARED_SOURCES, ...sources];

  try {
    const dirtySources = execFileSync("git", ["status", "--porcelain", "--", ...trackedSources], {
      encoding: "utf8",
    }).trim();

    if (dirtySources) return new Date();

    const latestCommit = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...trackedSources], {
      encoding: "utf8",
    }).trim();

    if (latestCommit) return new Date(latestCommit);
  } catch {
    // Some deployment environments omit Git history. The build time is the safest available fallback.
  }

  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pageEntries = routes.map((route) => ({
    url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
    lastModified: getLastModified(route.sources),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const postEntries = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: getLastModified([`src/app/blog/${post.slug}`]),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pageEntries, ...postEntries];
}
