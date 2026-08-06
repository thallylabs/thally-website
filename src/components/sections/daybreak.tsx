"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

import { Check } from "@/components/icons";
import { ThallyMark } from "@/components/layout/logo";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";

const SOURCES = ["Mintlify", "Docusaurus", "GitBook", "Nextra", "VitePress", "Starlight", "Markdown"];
const TARGETS = ["Vercel", "Netlify", "Cloudflare", "Docker", "Static export"];

const MIGRATION_LOG = [
  "$ npx create-thally-docs migrate github.com/acme/docs",
  "Detected Mintlify (mint.json)",
  "52 pages converted to clean MDX",
  "Navigation rebuilt, redirects carried over",
  "OpenAPI spec wired to the API Reference tab",
  "$ cd acme-docs && npm run dev",
];

/**
 * Template "ready-made-section", faithful mechanics: a sticky viewport
 * holds a small pastel card with a caption below it. The card scrolls
 * into view first, then grows to full-bleed as it reaches its pinned
 * position (IX2 keyframes 21-30 with heavy smoothing). The light
 * content then scrolls up OVER the pinned image.
 */
export function Daybreak() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // Progress hits 1 exactly when the section pins, so the card holds
  // small while scrolling in, then finishes growing to full-bleed right
  // at the pin. A spacer below keeps the full-screen image alone for a
  // stretch of scroll before content arrives over it.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });

  // Template smoothing: a damped spring trailing the scroll.
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });

  const width = useTransform(smooth, [0.4, 0.96], reduced ? ["100%", "100%"] : ["34%", "100%"]);
  const height = useTransform(smooth, [0.4, 0.96], reduced ? ["100vh", "100vh"] : ["44vh", "100vh"]);
  const captionOpacity = useTransform(smooth, [0.5, 0.85], reduced ? [1, 1] : [1, 0]);

  return (
    <section ref={ref} className="bg-canvas relative">
      {/* Pinned stage: card + caption. The card grows into the backdrop.
          The caption is absolutely positioned so the card can fill the
          full viewport without leaving a band behind. */}
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={{ width, height }}
          className="relative min-w-[280px] transform-gpu overflow-hidden rounded-[30px]"
        >
          <img
            src="/template/ready-made-bg.webp"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          style={{ opacity: captionOpacity }}
          className="absolute inset-x-0 top-[calc(50%+24vh)] px-6 text-center"
        >
          <ThallyMark inverted className="mx-auto mb-5 size-6 opacity-80" />
          <h2 className="heading-section text-white">
            Migrate in minutes.
            <br />
            Publish everywhere.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-xl text-white/70">
            Your existing docs become an editable Thally project you control.
          </p>
        </motion.div>
      </div>

      {/* Cushion: the full-bleed image holds the screen alone here */}
      <div aria-hidden className="h-[75vh]" />

      {/* Light content scrolling over the pinned full-bleed image */}
      <div className="relative z-10">
        <div className="mx-auto w-full max-w-[1480px] px-5 pt-[8vh] pb-[120px]">
          <div className="mx-auto max-w-[735px] text-center">
            <SplitReveal as="h2" mode="chars" className="heading-section text-canvas-cream-foreground">
              Bring your existing docs to Thally.
            </SplitReveal>
            <Reveal delay={0.15} distance={20}>
              <p className="text-canvas-cream-foreground/75 mt-5 text-lg">
                Use Thally Cloud to migrate a public docs site, or run the CLI against a GitHub repository. Either
                path creates editable MDX and a Thally project you control.
              </p>
            </Reveal>
          </div>

          {/* Frosted glass cards, template ready-made-image blocks */}
          <div className="mt-14 flex flex-col justify-center gap-2.5 lg:flex-row">
            <Reveal className="rounded-[35px] border border-white bg-white/60 p-6 backdrop-blur-lg lg:max-w-[467px]">
              <p className="text-canvas-cream-foreground text-sm font-semibold tracking-widest uppercase">
                Migrate from
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {SOURCES.map((source) => (
                  <span
                    key={source}
                    className="border-canvas-cream-foreground/15 text-canvas-cream-foreground rounded-full border bg-white/70 px-3.5 py-1.5 text-sm font-medium"
                  >
                    {source}
                  </span>
                ))}
              </div>
              <p className="text-canvas-cream-foreground mt-8 text-sm font-semibold tracking-widest uppercase">
                Deploy to
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {TARGETS.map((target) => (
                  <span
                    key={target}
                    className="border-canvas-cream-foreground/15 text-canvas-cream-muted rounded-full border px-3.5 py-1.5 text-sm font-medium"
                  >
                    {target}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal
              delay={0.3}
              className="w-full rounded-[35px] border border-white bg-white/60 p-6 backdrop-blur-lg lg:max-w-[763px]"
            >
              <div className="rounded-2xl bg-[#101410] p-5 font-mono text-[13px] leading-7">
                {MIGRATION_LOG.map((line) => (
                  <p key={line} className={line.startsWith("$") ? "text-white" : "text-canvas-accent"}>
                    {line.startsWith("$") ? (
                      line
                    ) : (
                      <>
                        <Check className="mr-2 inline size-3.5" />
                        {line}
                      </>
                    )}
                  </p>
                ))}
              </div>
              <p className="text-canvas-cream-muted mt-4 px-1 text-sm">
                Self-host the MIT-licensed engine, or let Thally Cloud build and publish it for you.
              </p>
            </Reveal>
          </div>

          {/* Large display line, template Smarter-Calmer treatment */}
          <div className="pt-24 pb-4 text-center">
            <Reveal distance={60}>
              <p className="heading-display text-canvas-cream-foreground/90">Smarter. Calmer. Current.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
