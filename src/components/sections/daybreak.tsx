"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

import { Migrate } from "@/components/sections/migrate";

/**
 * Template "ready-made-section", faithful mechanics: a sticky viewport
 * holds a small scenic card with a caption below it. The card scrolls
 * into view first, then grows to full-bleed as it reaches its pinned
 * position (IX2 keyframes 21-30 with heavy smoothing). The migration
 * visual then scrolls up OVER the pinned image.
 */
export function Daybreak() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // Progress hits 1 exactly when the section pins, so the card holds
  // small while scrolling in, then finishes growing to full-bleed right
  // at the pin.
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
          {/* Subtle contrast wash */}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/70" />
        </motion.div>
      </div>

      {/* Migration section with the new high-res visual riding directly over the pinned scene */}
      <div className="relative z-10">
        <Migrate />
      </div>
    </section>
  );
}
