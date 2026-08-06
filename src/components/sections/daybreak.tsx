"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

import { ThallyMark } from "@/components/layout/logo";
import { Reveal } from "@/components/motion/reveal";
import { Migrate } from "@/components/sections/migrate";

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

      {/* The original migration section on a light token island, kept
          transparent so it rides directly on the pinned pastel scene. */}
      <div className="light-island relative z-10">
        <Migrate />
      </div>

      {/* Large display line, template Smarter-Calmer treatment */}
      <div className="relative z-10 pt-16 pb-4 text-center">
        <Reveal distance={60}>
          <p className="heading-display text-canvas-cream-foreground/90">Smarter. Calmer. Current.</p>
        </Reveal>
      </div>
    </section>
  );
}
