"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { BlogCard, CategoryChip, PostMeta } from "@/components/blog/blog-card";
import { ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { type BlogPost, formatPostDate, relatedPosts } from "@/lib/blog";
import { DESTINATIONS } from "@/lib/site";

export function PostShell({ post, children }: { post: BlogPost; children: ReactNode }) {
  const related = relatedPosts(post.slug);

  return (
    <section className="bg-canvas relative py-16 md:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1296px] px-5">
        <div className="mx-auto max-w-3xl">
          <header>
            <nav aria-label="Breadcrumb" className="text-canvas-muted-2 mb-5 flex items-center gap-2 text-sm">
              <Link className="hover:text-canvas-foreground transition-colors" href="/blog">
                Blog
              </Link>
              <span aria-hidden>/</span>
              <span aria-current="page" className="text-canvas-muted">
                {post.cardTitle}
              </span>
            </nav>
            <div className="flex items-center gap-3">
              <CategoryChip post={post} />
              <PostMeta post={post} />
            </div>
            <SplitReveal
              as="h1"
              mode="words"
              onMount
              className="heading-hero text-canvas-foreground mt-5 text-balance"
            >
              {post.title}
            </SplitReveal>
            <Reveal delay={0.2} distance={20}>
              <p className="text-canvas-muted mt-5 text-lg leading-relaxed text-pretty md:text-xl">
                {post.description}
              </p>
            </Reveal>
            <div className="text-canvas-muted-2 border-canvas-hairline mt-6 flex flex-wrap gap-x-3 gap-y-1 border-b pb-6 text-sm">
              <span>
                By{" "}
                <Link
                  className="text-canvas-foreground underline underline-offset-4"
                  href="/authors/thally-team"
                  rel="author"
                >
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

          <p className="text-canvas-muted-2 mt-8 text-sm">
            Published under the{" "}
            <Link className="text-canvas-muted hover:text-canvas-foreground underline underline-offset-4" href="/editorial-policy">
              Thally editorial policy
            </Link>
            . Technical conformance is defined in the{" "}
            <Link
              className="text-canvas-muted hover:text-canvas-foreground underline underline-offset-4"
              href="/agent-readiness-methodology"
            >
              agent-readiness methodology
            </Link>
            .
          </p>

          {post.faq && post.faq.length > 0 && (
            <div className="mt-14">
              <h2 className="heading-card text-canvas-foreground">Frequently asked questions</h2>
              <dl className="mt-6 space-y-4">
                {post.faq.map((item) => (
                  <div key={item.question} className="border-canvas-card-stroke rounded-[24px] border p-6 md:p-7">
                    <dt className="text-canvas-foreground font-medium tracking-[-0.02em]">{item.question}</dt>
                    <dd className="text-canvas-muted mt-2 text-sm leading-relaxed">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="border-canvas-card-stroke relative mt-14 overflow-hidden rounded-[32px] border p-8 md:p-10">
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background: `linear-gradient(140deg, color-mix(in oklab, ${post.accent} 14%, transparent) 0%, transparent 55%)`,
              }}
            />
            <h2 className="heading-card text-canvas-foreground max-w-md text-balance">
              Build docs that stay close to your product.
            </h2>
            <p className="text-canvas-muted mt-3 max-w-md text-sm leading-relaxed">
              Create a managed site, or use the open-source engine to run Thally yourself.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={DESTINATIONS.signup}
                className="text-canvas inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-medium transition-colors hover:bg-white/90"
              >
                Create your docs site
                <ArrowRight className="size-4" />
              </a>
              <a
                href={DESTINATIONS.docs}
                className="border-canvas-card-stroke text-canvas-foreground inline-flex items-center gap-2 rounded-lg border px-5 py-3 font-medium transition-colors hover:bg-white/10"
              >
                Read the docs
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-5xl">
          <h2 className="heading-card text-canvas-foreground">Keep reading</h2>
          <div className="mt-8 grid gap-x-6 gap-y-14 md:grid-cols-2">
            {related.map((relatedPost, i) => (
              <BlogCard key={relatedPost.slug} post={relatedPost} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
