"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { Check } from "@/components/icons";
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
 * Template "ready-made-section": a sticky pastel panel grows from a small
 * rounded card into the full viewport as you scroll, pivoting the page
 * from night to daylight. The light content below carries the migration
 * story.
 */
export function Daybreak() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });

  const width = useTransform(scrollYProgress, [0.2, 0.9], reduced ? ["100%", "100%"] : ["34%", "100%"]);
  const height = useTransform(scrollYProgress, [0.2, 0.9], reduced ? ["100vh", "100vh"] : ["44vh", "100vh"]);
  const textOpacity = useTransform(scrollYProgress, [0.75, 0.95], reduced ? [1, 1] : [0, 1]);

  return (
    <section ref={ref} className="bg-canvas relative">
      {/* Sticky growing panel */}
      <div className="flex h-[160vh] flex-col">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <motion.div
            style={{ width, height }}
            className="relative flex items-center justify-center overflow-hidden rounded-[30px]"
          >
            <img
              src="/template/ready-made-bg.webp"
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
            />
            <motion.div style={{ opacity: textOpacity }} className="relative px-6 text-center">
              <h2 className="heading-section text-canvas-cream-foreground">
                Migrate in minutes.
                <br />
                Publish everywhere.
              </h2>
              <p className="text-canvas-cream-muted mx-auto mt-4 max-w-md text-xl">
                Your existing docs become an editable Thally project you control.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Light content continuing the pastel panel */}
      <div className="relative">
        <div className="relative overflow-hidden">
          <img
            src="/template/ready-made-bg.webp"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/70" />

          <div className="relative mx-auto w-full max-w-[1480px] px-5 pb-[120px]">
            <div className="mx-auto max-w-[735px] pt-4 text-center">
              <SplitReveal as="h2" mode="chars" className="heading-section text-canvas-cream-foreground">
                Bring your existing docs to Thally.
              </SplitReveal>
              <Reveal delay={0.15} distance={20}>
                <p className="text-canvas-cream-muted mt-5 text-lg">
                  Use Thally Cloud to migrate a public docs site, or run the CLI against a GitHub repository. Either
                  path creates editable MDX and a Thally project you control.
                </p>
              </Reveal>
            </div>

            {/* Frosted glass cards, template ready-made-image blocks */}
            <div className="mt-14 flex flex-col justify-center gap-2.5 lg:flex-row">
              <Reveal className="rounded-[35px] border border-white bg-white/60 p-6 backdrop-blur-2xl lg:max-w-[467px]">
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
                <p className="text-canvas-cream-foreground text-sm font-semibold tracking-widest uppercase mt-8">
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

              <Reveal delay={0.3} className="w-full rounded-[35px] border border-white bg-white/60 p-6 backdrop-blur-2xl lg:max-w-[763px]">
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
      </div>
    </section>
  );
}
