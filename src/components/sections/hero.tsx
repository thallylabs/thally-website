"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  SiClaude,
  SiCursor,
  SiGithubcopilot,
  SiGooglegemini,
  SiPerplexity,
  SiV0,
  SiWindsurf,
} from "react-icons/si";

import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { DESTINATIONS } from "@/lib/site";

const AGENTS: Array<{ name: string; icon: IconType }> = [
  { name: "Claude", icon: SiClaude },
  { name: "Cursor", icon: SiCursor },
  { name: "Copilot", icon: SiGithubcopilot },
  { name: "Perplexity", icon: SiPerplexity },
  { name: "Gemini", icon: SiGooglegemini },
  { name: "v0", icon: SiV0 },
  { name: "Windsurf", icon: SiWindsurf },
];

function AgentMarquee() {
  return (
    <div className="logos-marquee mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] flex overflow-hidden">
      {[false, true].map((hidden) => (
        <div
          key={String(hidden)}
          className="logos-marquee-track flex min-w-max shrink-0 items-center"
          aria-hidden={hidden || undefined}
        >
          {AGENTS.map((agent) => (
            <span key={agent.name} className="mr-10 flex shrink-0 items-center gap-2.5 text-white/80">
              <agent.icon className="size-6" aria-hidden />
              <span className="font-display text-xl font-semibold tracking-tight whitespace-nowrap">
                {agent.name}
              </span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Hero CTA pair: primary signup plus the live Track demo. */
function HeroCtas() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={DESTINATIONS.signup}
        className="btn-sheen text-canvas inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-lg font-medium"
      >
        Get Started
      </a>
      <Link
        href="/features/track#demo"
        className="btn-sheen inline-flex items-center justify-center rounded-lg border border-[#606060] px-7 py-3.5 text-lg font-medium text-white"
      >
        Try Thally
      </Link>
    </div>
  );
}

function HeroMockVisual() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      className="relative w-full"
    >
      <Image
        src="/images/hero-mock-flow.png"
        alt="Thally documentation change intelligence workflow showing impact analysis, drafted docs PR, and documentation review"
        width={1200}
        height={800}
        priority
        className="h-auto w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
        sizes="(max-width: 1024px) 100vw, 55vw"
      />
    </motion.div>
  );
}

const Hero = () => {
  return (
    <section className="bg-canvas px-2.5 pt-2 sm:px-5">
      {/* One continuous card: landscape background spanning both halves */}
      <div className="border-canvas-card-stroke relative mx-auto min-h-[480px] w-full max-w-[1860px] overflow-hidden rounded-[35px] border lg:min-h-[580px]">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-[position:50%_72%]"
          style={{ backgroundImage: "url(/template/background.webp)" }}
        />
        {/* Legibility washes */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/20" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

        {/* Side-by-side: expanded headline left (56fr), mock image right (44fr) */}
        <div className="relative grid min-h-[inherit] items-center lg:grid-cols-[minmax(0,56fr)_minmax(0,44fr)]">
          {/* Left: headline, CTAs, marquee grouped naturally without giant gaps */}
          <div className="flex min-w-0 flex-col justify-center gap-7 p-6 sm:p-8 lg:p-12 lg:py-10">
            <div>
              {/* Wide container so the headline comfortably spans across 2 clean lines */}
              <div className="lg:w-[120%] lg:max-w-[780px]">
                <SplitReveal
                  as="h1"
                  mode="words"
                  onMount
                  className="heading-hero text-white"
                  stagger={0.4}
                >
                  Every product change. Every doc, in sync.
                </SplitReveal>
              </div>

              <Reveal delay={0.5} distance={30} className="mt-4 max-w-[500px]">
                <p className="text-xl leading-relaxed tracking-[-0.02em] text-white/85">
                  Thally watches your repositories, identifies what each change affects, and prepares evidence-backed updates for review.
                </p>
                <div className="mt-5">
                  <HeroCtas />
                </div>
              </Reveal>
            </div>

            <div className="relative max-w-[500px] border-t border-white/10 pt-5">
              <Reveal delay={0.7} distance={20}>
                <p className="mb-3.5 text-sm text-white/70">Built for the AI tools your readers already use</p>
                <AgentMarquee />
              </Reveal>
            </div>
          </div>

          {/* Right: mock visual, aligned to bottom, overflowing the card */}
          <div className="relative hidden min-w-0 self-end lg:block">
            <div
              className="relative pl-4"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%)",
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%)",
              }}
            >
              <HeroMockVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
