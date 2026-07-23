"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

import { BlogCard, CategoryChip, PostMeta } from "@/components/blog/blog-card";
import { SectionGrid, SectionLines } from "@/components/section-decor";
import { Button } from "@/components/ui/button";
import { type BlogPost, formatPostDate, relatedPosts } from "@/lib/blog";
import { DESTINATIONS } from "@/lib/site";

export function PostShell({ post, children }: { post: BlogPost; children: ReactNode }) {
  const reduce = useReducedMotion();
  const related = relatedPosts(post.slug);

  return (
    <section className="relative py-16 md:py-24 lg:py-28">
      <SectionGrid className="opacity-15" />
      <SectionLines />

      <div className="relative container">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <header>
            <nav aria-label="Breadcrumb" className="text-muted-foreground mb-5 flex items-center gap-2 text-sm">
              <Link className="hover:text-foreground transition-colors" href="/blog">
                Blog
              </Link>
              <span aria-hidden>/</span>
              <span aria-current="page">{post.cardTitle}</span>
            </nav>
            <div className="flex items-center gap-3">
              <CategoryChip post={post} />
              <PostMeta post={post} />
            </div>
            <h1 className="font-display mt-5 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <p className="text-muted-foreground mt-5 text-lg leading-relaxed text-pretty md:text-xl">
              {post.description}
            </p>
            <div className="text-muted-foreground border-border mt-6 flex flex-wrap gap-x-3 gap-y-1 border-b pb-6 text-sm">
              <span>
                By{" "}
                <Link className="text-foreground underline underline-offset-4" href="/authors/thally-team" rel="author">
                  Thally Editorial Team
                </Link>
              </span>
              <span>
                Published <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              </span>
              <span>
                Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
              </span>
              {post.verified && (
                <span>
                  Sources verified <time dateTime={post.verified}>{formatPostDate(post.verified)}</time>
                </span>
              )}
            </div>
          </header>

          <div className="prose prose-lg dark:prose-invert mt-10 max-w-none">{children}</div>

          <p className="text-muted-foreground mt-8 text-sm">
            Published under the <Link href="/editorial-policy">Thally editorial policy</Link>. Technical conformance is
            defined in the <Link href="/agent-readiness-methodology">agent-readiness methodology</Link>.
          </p>

          {post.faq && post.faq.length > 0 && (
            <div className="mt-14">
              <h2 className="font-display text-2xl font-semibold tracking-tight">Frequently asked questions</h2>
              <dl className="mt-6 space-y-6">
                {post.faq.map((item) => (
                  <div key={item.question} className="border-border bg-card rounded-2xl border p-6">
                    <dt className="font-semibold">{item.question}</dt>
                    <dd className="text-muted-foreground mt-2 text-sm leading-relaxed">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="border-border bg-card relative mt-14 overflow-hidden rounded-2xl border p-8">
            <span
              aria-hidden
              className="absolute top-4 right-4 size-8 border-t border-r"
              style={{ borderColor: `color-mix(in oklab, ${post.accent} 40%, transparent)` }}
            />
            <h2 className="font-display max-w-md text-2xl leading-snug font-semibold text-balance">
              Build docs that stay close to your product.
            </h2>
            <p className="text-muted-foreground mt-2 max-w-md text-sm">
              Create a managed site, or use the open-source engine to run Thally yourself.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={DESTINATIONS.signup}>Create your docs site</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={DESTINATIONS.docs}>Read the docs</Link>
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="mx-auto mt-20 max-w-5xl">
          <h2 className="font-display text-xl font-semibold tracking-tight">Keep reading</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {related.map((relatedPost, i) => (
              <BlogCard key={relatedPost.slug} post={relatedPost} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
