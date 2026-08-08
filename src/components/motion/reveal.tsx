"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type RevealProps = ComponentProps<typeof motion.div> & {
  delay?: number;
  /** Slide distance in px, matching the template's 50px slide-in-bottom. */
  distance?: number;
  /** Add the template's 5px blur-in. */
  blur?: boolean;
};

/**
 * Scroll-into-view reveal matching the template's IX2 "slideInBottom"
 * preset: opacity 0 -> 1, y 50 -> 0, optional blur(5px) -> 0.
 */
export function Reveal({
  delay = 0.2,
  distance = 50,
  blur = true,
  children,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={rest.className as string | undefined}>{children as React.ReactNode}</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: distance,
        filter: blur ? "blur(5px)" : undefined,
      }}
      whileInView={{ opacity: 1, y: 0, filter: blur ? "blur(0px)" : undefined }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
      // motion-reveal is the hook for the reduced-motion safety net in
      // globals.css: if the reveal never runs, the content must not stay
      // stuck at its hidden initial state.
      className={cn("motion-reveal", rest.className as string | undefined)}
    >
      {children}
    </motion.div>
  );
}
