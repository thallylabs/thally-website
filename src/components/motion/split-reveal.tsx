"use client";

import { motion, useReducedMotion } from "motion/react";
import { type JSX, useMemo } from "react";

type SplitMode = "chars" | "words";

type SplitRevealProps = {
  children: string;
  /** "chars" = template .section-title (scroll), "words" = .first-heading (load) */
  mode?: SplitMode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  /** Total stagger budget in seconds, spread across all units. */
  stagger?: number;
  delay?: number;
  /** true = animate on mount (hero); false = animate when scrolled into view. */
  onMount?: boolean;
};

/**
 * Masked text reveal replicating the template's GSAP SplitText timelines:
 * each char/word sits in an overflow-hidden mask and slides up from
 * translateY(100%) with a distributed stagger.
 */
export function SplitReveal({
  children,
  mode = "chars",
  as: Tag = "span",
  className,
  stagger = mode === "chars" ? 0.2 : 0.3,
  delay = 0,
  onMount = false,
}: SplitRevealProps) {
  const reduced = useReducedMotion();

  const units = useMemo(() => children.split(/(\s+)/).filter((w) => w.length > 0), [children]);

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  const visible = units.filter((u) => !/^\s+$/.test(u));
  const total = mode === "chars" ? children.replace(/\s/g, "").length : visible.length;
  let unitIndex = 0;

  const viewportProps = onMount
    ? {}
    : ({ whileInView: "visible", viewport: { once: true, amount: 0.5 } } as const);

  return (
    <Tag className={className} aria-label={children}>
      <motion.span
        aria-hidden
        style={{ display: "inline" }}
        initial="hidden"
        {...(onMount ? { animate: "visible" } : viewportProps)}
      >
        {units.map((unit, i) => {
          if (/^\s+$/.test(unit)) {
            return <span key={i}> </span>;
          }
          if (mode === "words") {
            const d = delay + (stagger * unitIndex++) / Math.max(total - 1, 1);
            return <MaskedUnit key={i} text={unit} delay={d} />;
          }
          return (
            <span key={i} style={{ display: "inline-block", whiteSpace: "pre" }}>
              {unit.split("").map((ch, j) => {
                const d = delay + (stagger * unitIndex++) / Math.max(total - 1, 1);
                return <MaskedUnit key={j} text={ch} delay={d} />;
              })}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}

function MaskedUnit({ text, delay }: { text: string; delay: number }) {
  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom",
      }}
    >
      <motion.span
        style={{ display: "inline-block" }}
        variants={{
          hidden: { y: "100%" },
          visible: {
            y: "0%",
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
          },
        }}
      >
        {text}
      </motion.span>
    </span>
  );
}
