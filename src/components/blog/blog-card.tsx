"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

import { ArrowUpRight } from "@/components/icons";
import { type BlogPost, formatPostDate } from "@/lib/blog";

export function CategoryChip({ post }: { post: BlogPost }) {
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
      style={{
        background: `color-mix(in oklab, ${post.accent} 16%, transparent)`,
        color: `color-mix(in oklab, ${post.accent} 55%, var(--foreground))`,
      }}
    >
      {post.category}
    </span>
  );
}

export function PostMeta({ post }: { post: BlogPost }) {
  return (
    <p className="text-muted-foreground text-xs">
      Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time> · {post.readingTime} min read
    </p>
  );
}

export function BlogCard({
  post,
  index = 0,
  featured = false,
}: {
  post: BlogPost;
  index?: number;
  featured?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      className={featured ? "lg:col-span-2" : undefined}
      initial={reduce ? undefined : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group border-border bg-card hover:bg-secondary/50 relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-colors lg:p-7"
      >
        <span
          aria-hidden
          className="absolute top-4 right-4 size-8 border-t border-r"
          style={{ borderColor: `color-mix(in oklab, ${post.accent} 40%, transparent)` }}
        />
        <div className="flex items-center gap-3">
          <CategoryChip post={post} />
          <PostMeta post={post} />
        </div>
        <h2
          className={
            featured
              ? "font-display mt-4 max-w-2xl text-2xl leading-snug font-semibold text-balance md:text-3xl"
              : "font-display mt-4 text-xl leading-snug font-semibold text-balance"
          }
        >
          {post.cardTitle}
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed">{post.description}</p>
        <span className="text-foreground mt-auto flex items-center gap-1.5 pt-5 text-sm font-medium">
          Read the post
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </motion.article>
  );
}
