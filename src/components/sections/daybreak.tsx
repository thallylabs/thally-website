"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

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

  return (
    <section ref={ref} className="bg-canvas relative">
      {/* Pinned stage: the card grows to fill the viewport. */}
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
          {/* The scene's sky blows out almost to white, which reads as a hole
              in the page between two dark sections. Weight the scrim toward
              the top so the sky settles without muddying the meadow the light
              migration content sits on. */}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/42 via-black/24 to-black/15" />
        </motion.div>
      </div>

      {/* The original migration section on a light token island, kept
          transparent so it rides directly on the pinned pastel scene. */}
      <div className="light-island relative z-10">
        <Migrate />
      </div>
    </section>
  );
}
