"use client";

import type { ComponentProps, CSSProperties } from "react";

import { useEntrancePhase } from "@/components/motion/use-entrance-phase";
import { cn } from "@/lib/utils";

type RevealProps = ComponentProps<"div"> & {
  delay?: number;
  /** Slide distance in px, matching the template's 50px slide-in-bottom. */
  distance?: number;
  /**
   * Add the template's 5px blur-in. Off by default: an animated `filter`
   * forces a full re-rasterization of the element on every frame of the
   * reveal, which is what makes entrances stutter on software-rasterized
   * machines. Opacity and transform alone stay on the compositor.
   */
  blur?: boolean;
  /** true = play from first paint via pure CSS (above the fold); false = play on scroll into view. */
  mount?: boolean;
};

/**
 * Entrance reveal matching the template's IX2 "slideInBottom" preset:
 * opacity 0 -> 1, y 50 -> 0, optional blur(5px) -> 0.
 *
 * CSS-driven rather than motion/react: the server renders content visible,
 * `mount` reveals play as stylesheet keyframes from first paint, and scroll
 * reveals only re-hide below-viewport content after hydration. The LCP no
 * longer waits on the JS bundle.
 */
export function Reveal({ delay = 0.2, distance = 50, blur = false, mount = false, className, style, children, ...rest }: RevealProps) {
  const { ref, phase } = useEntrancePhase<HTMLDivElement>(!mount, "0px 0px -12% 0px");

  const vars = {
    "--rv-delay": `${delay}s`,
    "--rv-y": `${distance}px`,
    ...(blur ? { "--rv-blur-from": "blur(5px)", "--rv-blur-to": "blur(0px)" } : null),
  } as CSSProperties;

  return (
    <div
      ref={ref}
      data-reveal={mount ? "mount" : phase === "visible" ? undefined : phase}
      className={cn("motion-reveal", className)}
      style={{ ...vars, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
