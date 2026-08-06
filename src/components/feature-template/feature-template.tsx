"use client";

/**
 * Shared feature-page building blocks ported from the Sireny template's
 * feature.html: the banner with a glass-framed visual that tilts in on
 * scroll under a drifting comet, the sticky-stacking pastel process
 * cards with their numbered rail, the growth/quote panels, and the
 * partner logo grid.
 */

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { type ReactNode, useRef, useState } from "react";

import { ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Banner                                                              */
/* ------------------------------------------------------------------ */

type Cta = { label: string; href: string };

export function FeatureBanner({
  title,
  titleAccent,
  description,
  primaryCta,
  secondaryCta,
  finePrint,
  children,
}: {
  title: string;
  /** Muted second clause rendered after the title, template style. */
  titleAccent?: string;
  description: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  finePrint?: string;
  /** Visual placed inside the glass banner frame. */
  children?: ReactNode;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "center 0.6"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [26, 0]);

  return (
    <section className="bg-canvas relative overflow-hidden rounded-b-[60px] pt-[70px] pb-[120px]">
      {/* Night backdrop rising from the bottom, blurred like the template */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[70%]">
        <img
          src="/template/scene-bg.webp"
          alt=""
          className="h-full w-full object-cover object-top blur-[5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000104] via-[#000104]/35 to-transparent" />
      </div>

      {/* Drifting comet, template .bg-particle 30s loop */}
      {!reduced && (
        <motion.img
          src="/template/comet.webp"
          alt=""
          aria-hidden
          initial={{ y: "-110%", opacity: 0 }}
          animate={{ y: ["-110%", "160%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 2 }}
          className="pointer-events-none absolute top-0 right-[8%] -z-10 w-[38%] max-w-[560px]"
        />
      )}

      <div className="mx-auto w-full max-w-[1480px] px-5">
        <div className="mx-auto mb-[60px] flex max-w-[1240px] flex-col items-center gap-8 text-center">
          <h1 className="heading-hero max-w-4xl text-white">
            <SplitReveal as="span" mode="words" onMount>
              {title}
            </SplitReveal>
            {titleAccent && (
              <>
                <br />
                <span className="text-white/50">
                  <SplitReveal as="span" mode="words" onMount delay={0.25}>
                    {titleAccent}
                  </SplitReveal>
                </span>
              </>
            )}
          </h1>
          <Reveal delay={0.35} distance={24}>
            <p className="mx-auto max-w-2xl text-lg text-[#afafaf]">{description}</p>
          </Reveal>
          <Reveal delay={0.5} distance={20} className="flex flex-col items-center gap-4">
            <span className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={primaryCta.href}
                className="btn-sheen text-canvas inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-lg font-medium"
              >
                {primaryCta.label}
                <ArrowRight className="size-5" />
              </a>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 text-lg font-medium text-white/80 transition-colors hover:text-white"
                >
                  {secondaryCta.label}
                  <ArrowRight className="size-4" />
                </Link>
              )}
            </span>
            {finePrint && <p className="text-sm text-[#7c7b79]">{finePrint}</p>}
          </Reveal>
        </div>

        {/* Glass banner frame with the template's perspective tilt-in */}
        {children && (
          <div ref={frameRef} style={{ perspective: "100vw" }}>
            <motion.div
              style={{ rotateX, transformStyle: "preserve-3d" }}
              className="mx-auto w-full max-w-[1318px] rounded-[24px] border-[0.83px] border-white/16 bg-[#1c1b1d]/45 p-[13px] backdrop-blur-2xl"
            >
              <div className="overflow-hidden rounded-[14px]">{children}</div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Sticky pastel process cards                                         */
/* ------------------------------------------------------------------ */

export type ProcessStep = {
  label: string;
  title: string;
  subtitle: string;
  description: string;
  visual?: ReactNode;
};

const PROCESS_TINTS = ["#ffeec3", "#f5ffdc", "#f3efff"];

export function ProcessCards({ title, steps }: { title?: string; steps: ProcessStep[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 0.35", "end 0.9"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    if (idx !== active) setActive(idx);
  });

  return (
    <section
      className="relative overflow-hidden rounded-[60px] py-[120px]"
      style={{
        backgroundImage: "url(/template/feature-bg.webp)",
        backgroundSize: "cover",
        backgroundPosition: "50% 100%",
      }}
    >
      <div ref={railRef} className="mx-auto w-full max-w-[1480px] px-5">
        {title && (
          <SplitReveal as="h2" mode="chars" className="heading-section text-canvas-cream-foreground mb-14 text-center">
            {title}
          </SplitReveal>
        )}

        {/* Sticky number rail, template .process-number-block */}
        <div className="sticky top-[110px] z-20 mb-10 flex gap-10 max-sm:gap-4">
          {steps.map((step, i) => (
            <span key={step.label} className="flex items-center gap-3">
              <span
                className={cn(
                  "flex size-[33px] items-center justify-center rounded-full border text-sm transition-colors duration-500",
                  active === i
                    ? "border-[#38332d] text-[#0a0a0a]"
                    : "border-[#b4afaf] text-[#afafaf]",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "text-xl tracking-[-0.04em] transition-colors duration-500",
                  active === i ? "text-[#0a0a0a]" : "text-[#afafaf]",
                )}
              >
                {step.label}
              </span>
            </span>
          ))}
        </div>

        {/* Stacking cards */}
        <div className="flex flex-col gap-20">
          {steps.map((step, i) => (
            <div
              key={step.label}
              className="sticky top-[170px] flex justify-between gap-14 rounded-[35px] border border-white/45 p-10 max-lg:flex-col max-sm:p-6"
              style={{ backgroundColor: PROCESS_TINTS[i % PROCESS_TINTS.length], minHeight: 460 }}
            >
              <div className="flex max-w-[655px] flex-col justify-between gap-10">
                <div className="flex flex-col gap-6 text-[#38332d]">
                  <h3 className="font-display text-4xl tracking-[-0.04em] sm:text-5xl">{step.title}</h3>
                  <p className="font-display text-2xl font-light tracking-[-0.04em] sm:text-[28px]">
                    {step.subtitle}
                  </p>
                </div>
                <p className="border-t border-black/10 pt-6 text-[15px] leading-relaxed tracking-[-0.03em] text-[#7c7b79]">
                  {step.description}
                </p>
              </div>
              {step.visual && <div className="w-full max-w-[431px] shrink-0 max-lg:max-w-none">{step.visual}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Growth / quote panels                                               */
/* ------------------------------------------------------------------ */

export function QuotePanels({
  title,
  media,
  quote,
  quoteAttribution,
  wideQuote,
  wideAttribution,
}: {
  title: string;
  /** Large media/demo card occupying the left column. */
  media: ReactNode;
  quote: string;
  quoteAttribution?: string;
  wideQuote: string;
  wideAttribution?: string;
}) {
  return (
    <section className="bg-canvas py-[120px]">
      <div className="mb-[60px] border-b border-white/18 pb-[60px]">
        <SplitReveal as="h2" mode="chars" className="heading-section mx-auto max-w-3xl px-5 text-center text-white">
          {title}
        </SplitReveal>
      </div>

      <div className="mx-auto grid w-full max-w-[1440px] gap-2.5 px-5 lg:grid-cols-[1.5fr_1fr]">
        <Reveal className="border-canvas-card-stroke relative min-h-[420px] overflow-hidden rounded-[50px] border">
          {media}
        </Reveal>

        <Reveal
          delay={0.2}
          className="border-canvas-card-stroke flex min-h-[420px] flex-col justify-between gap-14 rounded-[32px] border p-8"
          style={{
            backgroundImage: "url(/template/text-container-2.webp)",
            backgroundSize: "cover",
            backgroundPosition: "50%",
          }}
        >
          <p className="subtitle-display linear-text">&ldquo;{quote}&rdquo;</p>
          {quoteAttribution && <p className="text-sm text-white/70">{quoteAttribution}</p>}
        </Reveal>

        <Reveal
          delay={0.3}
          className="border-canvas-card-stroke flex flex-col items-center gap-6 rounded-[50px] border p-12 text-center sm:p-[100px] lg:col-span-2"
          style={{
            backgroundImage: "url(/template/bg-2.webp)",
            backgroundSize: "cover",
            backgroundPosition: "50%",
          }}
        >
          <p className="subtitle-display max-w-3xl text-white">&ldquo;{wideQuote}&rdquo;</p>
          {wideAttribution && <p className="text-sm text-white/60">{wideAttribution}</p>}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Partner strip                                                       */
/* ------------------------------------------------------------------ */

export function PartnerStrip({
  title,
  items,
}: {
  title: string;
  items: Array<{ name: string; icon: ReactNode }>;
}) {
  return (
    <section className="bg-canvas pt-[120px] pb-[60px]">
      <SplitReveal as="h2" mode="chars" className="heading-section mx-auto mb-14 max-w-3xl px-5 text-center text-white">
        {title}
      </SplitReveal>
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-2 sm:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={item.name}
            className={cn(
              "border-canvas-card-stroke flex items-center justify-center gap-3 px-8 py-11 opacity-50 transition-opacity duration-300 hover:opacity-100",
              (i + 1) % 3 !== 0 && "sm:border-r",
              (i + 1) % 2 !== 0 && "max-sm:border-r",
            )}
          >
            <span aria-hidden className="[&>svg]:size-6 text-white">
              {item.icon}
            </span>
            <span className="font-display text-xl font-semibold tracking-tight text-white">{item.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
