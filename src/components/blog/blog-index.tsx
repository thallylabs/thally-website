"use client";

import { BlogCard } from "@/components/blog/blog-card";
import { SectionGrid, SectionLines } from "@/components/section-decor";
import { blogPosts } from "@/lib/blog";

export function BlogIndex() {
  return (
    <section className="relative py-16 md:py-24 lg:py-28">
      <SectionGrid className="opacity-15" />
      <SectionLines />

      <div className="relative container">
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            The Thally blog
          </h1>
          <p className="text-muted-foreground mt-4 text-lg text-pretty">
            Comparisons, guides, and product deep dives on documentation that serves AI agents and humans from one
            source.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:mt-14 lg:grid-cols-2">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
