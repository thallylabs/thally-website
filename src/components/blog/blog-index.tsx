"use client";

import { BlogCard } from "@/components/blog/blog-card";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { blogPosts } from "@/lib/blog";

export function BlogIndex() {
  return (
    <section className="bg-canvas relative py-16 md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1296px] px-5">
        <div className="max-w-2xl">
          <SplitReveal as="h1" mode="words" onMount className="heading-section text-canvas-foreground">
            The Thally blog
          </SplitReveal>
          <Reveal mount delay={0.2} distance={20}>
            <p className="text-canvas-muted mt-5 text-lg text-pretty">
              Practical guides and honest comparisons for teams building documentation that works for people and AI
              agents from one source.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-14 md:mt-16 lg:grid-cols-2">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
