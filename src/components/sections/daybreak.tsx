"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

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

  // The card is laid out at its final full-bleed size and scaled down, rather
  // than having its width and height animated: animating box dimensions runs
  // layout, paint, and composite on every scroll frame, where a transform is
  // composited alone. The image counter-scales so it never stretches, and the
  // radius is pre-divided so it lands at 30px once the card reaches full size.
  //
  // The narrow start is floored on small screens, standing in for the 280px
  // min-width the laid-out card used to carry: 34% of a phone is a sliver.
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const update = () => setNarrow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const startX = narrow ? 0.76 : 0.34;
  const startY = narrow ? 0.5 : 0.44;
  const scaleX = useTransform(smooth, [0.4, 0.96], reduced ? [1, 1] : [startX, 1]);
  const scaleY = useTransform(smooth, [0.4, 0.96], reduced ? [1, 1] : [startY, 1]);
  const inverseX = useTransform(scaleX, (v) => 1 / v);
  const inverseY = useTransform(scaleY, (v) => 1 / v);
  const radius = useTransform(
    smooth,
    (v) => {
      const x = scaleX.get() || 1;
      const y = scaleY.get() || 1;
      return `${30 / x}px / ${30 / y}px`;
    },
  );

  return (
    <section ref={ref} className="bg-canvas relative">
      {/* Pinned stage: the card grows to fill the viewport. */}
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={{ scaleX, scaleY, borderRadius: radius }}
          className="relative h-screen w-full origin-center transform-gpu overflow-hidden"
        >
          <motion.img
            src="/template/ready-made-bg.webp"
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            style={{ scaleX: inverseX, scaleY: inverseY }}
            className="absolute inset-0 h-full w-full origin-center object-cover"
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
