"use client";

import { type CSSProperties, type JSX, useMemo } from "react";

import { useEntrancePhase } from "@/components/motion/use-entrance-phase";

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
  /** true = animate from first paint (hero); false = animate when scrolled into view. */
  onMount?: boolean;
};

/**
 * Masked text reveal replicating the template's GSAP SplitText timelines:
 * each char/word sits in an overflow-hidden mask and slides up from
 * translateY(100%) with a distributed stagger.
 *
 * CSS-driven rather than motion/react: on-mount reveals are stylesheet
 * keyframes running from first paint, so hero headlines (the LCP on most
 * routes) paint before hydration. Scroll reveals re-hide after hydration
 * and play when the heading enters the viewport.
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
  const { ref, phase } = useEntrancePhase<HTMLSpanElement>(!onMount, "0px 0px -18% 0px");

  const units = useMemo(() => children.split(/(\s+)/).filter((w) => w.length > 0), [children]);

  const visible = units.filter((u) => !/^\s+$/.test(u));
  const total = mode === "chars" ? children.replace(/\s/g, "").length : visible.length;
  let unitIndex = 0;

  const nextDelay = () => delay + (stagger * unitIndex++) / Math.max(total - 1, 1);

  return (
    // The text is carried for assistive tech by a visually hidden copy rather
    // than an aria-label: this renders as a span as often as a heading, and
    // aria-label is prohibited on a span, which has no role to name. The
    // hidden copy also gives headings their accessible name from content.
    <Tag className={className}>
      <span className="sr-only">{children}</span>
      <span
        ref={ref}
        aria-hidden
        data-split={onMount ? "mount" : phase === "visible" ? undefined : phase}
        // Mount mode leaves display to the stylesheet (the block settle needs
        // inline-block); an inline style here would beat that rule.
        style={onMount ? ({ "--sd-delay": `${delay}s` } as CSSProperties) : { display: "inline" }}
      >
        {units.map((unit, i) => {
          if (/^\s+$/.test(unit)) {
            return <span key={i}> </span>;
          }
          if (mode === "words") {
            return <MaskedUnit key={i} text={unit} delay={nextDelay()} />;
          }
          return (
            <span key={i} style={{ display: "inline-block", whiteSpace: "pre" }}>
              {unit.split("").map((ch, j) => (
                <MaskedUnit key={j} text={ch} delay={nextDelay()} />
              ))}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}

function MaskedUnit({ text, delay }: { text: string; delay: number }) {
  return (
    // The two class hooks let globals.css drive the phases and un-hide the
    // text under reduced motion. The mask's overflow lives in the stylesheet:
    // only the scroll phases clip, a mount reveal stays visible for the LCP.
    <span
      className="split-reveal-mask"
      style={{
        display: "inline-block",
        verticalAlign: "bottom",
      }}
    >
      <span
        className="split-reveal-unit"
        style={{ display: "inline-block", "--su-delay": `${delay}s` } as CSSProperties}
      >
        {text}
      </span>
    </span>
  );
}
