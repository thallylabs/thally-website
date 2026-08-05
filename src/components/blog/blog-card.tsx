"use client";

import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { type BlogPost, formatPostDate } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function CategoryChip({ post }: { post: BlogPost }) {
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
      style={{
        background: `color-mix(in oklab, ${post.accent} 18%, transparent)`,
        color: `color-mix(in oklab, ${post.accent} 60%, var(--canvas-foreground))`,
      }}
    >
      {post.category}
    </span>
  );
}

export function PostMeta({ post }: { post: BlogPost }) {
  return (
    <p className="text-canvas-muted-2 text-xs">
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
  return (
    <Reveal delay={0.1 + index * 0.06} distance={30} className={featured ? "lg:col-span-2" : undefined}>
      <article className="h-full">
        <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
          {/* Template card frame: hairline border, generous radius, inset visual */}
          <div className={cn("border-canvas-card-stroke rounded-[32px] border", featured ? "p-4 md:p-5" : "p-4")}>
            <div
              className={cn(
                "relative overflow-hidden rounded-[16px]",
                featured ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[16/10]",
              )}
            >
              <div
                className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                style={{
                  background: `linear-gradient(140deg, color-mix(in oklab, ${post.accent} 32%, #000104) 0%, color-mix(in oklab, ${post.accent} 10%, #000104) 45%, #000104 100%)`,
                }}
              >
                <span
                  aria-hidden
                  className={cn(
                    "font-display absolute -bottom-2 left-5 max-w-full leading-[1.05] tracking-[-0.04em] text-white/20 select-none",
                    featured ? "text-[clamp(2.5rem,6vw,4.5rem)]" : "text-[clamp(2rem,4vw,3rem)]",
                  )}
                >
                  {post.cardTitle}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3 px-1">
            <CategoryChip post={post} />
            <PostMeta post={post} />
          </div>
          <h2
            className={cn(
              "text-canvas-foreground mt-3 px-1 leading-snug font-medium tracking-[-0.02em] text-balance",
              featured ? "max-w-2xl text-xl md:text-2xl" : "text-lg sm:text-xl",
            )}
          >
            {post.cardTitle}
          </h2>
          <p className="text-canvas-muted mt-2 max-w-2xl px-1 text-sm leading-relaxed">{post.description}</p>
        </Link>
      </article>
    </Reveal>
  );
}
