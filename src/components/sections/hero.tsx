"use client";

import Link from "next/link";
import type { IconType } from "react-icons";
import { SiClaude, SiCursor, SiGithubcopilot, SiGooglegemini, SiPerplexity, SiV0, SiWindsurf } from "react-icons/si";

import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { HeroFlow } from "@/components/sections/hero-flow";
import { HeroStrandField } from "@/components/sections/hero-strand-field";
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
    <div className="logos-marquee flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      {[false, true].map((hidden) => (
        <div
          key={String(hidden)}
          className="logos-marquee-track flex min-w-max shrink-0 items-center"
          aria-hidden={hidden || undefined}
        >
          {AGENTS.map((agent) => (
            <span key={agent.name} className="mr-10 flex shrink-0 items-center gap-2.5 text-white/80">
              <agent.icon className="size-6" aria-hidden />
              <span className="font-display text-xl font-semibold tracking-tight whitespace-nowrap">{agent.name}</span>
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
        Get started free
      </a>
      <Link
        href="/features/track#demo"
        className="btn-sheen inline-flex items-center justify-center rounded-lg border border-[#606060] px-7 py-3.5 text-lg font-medium text-white"
      >
        Run Thally on a repo
      </Link>
    </div>
  );
}

/**
 * Ambient wash under the strand field: lime at the top right where the
 * filaments converge, teal at the bottom left where they enter.
 */
function AmbientGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(58% 46% at 78% 10%, color-mix(in oklab, var(--primary) 9%, transparent), transparent 70%), radial-gradient(70% 55% at 10% 100%, color-mix(in oklab, var(--chart-2) 10%, transparent), transparent 72%)",
      }}
    />
  );
}

/**
 * Film grain over the field, so the gradients never band on wide displays.
 *
 * The noise is a tiled background image rather than a live SVG filter element:
 * as an image it is rasterized once at 160px and repeated, where an in-DOM
 * `feTurbulence` is re-evaluated over the full hero every time the canvas
 * beneath it repaints. Same grain, paid for once.
 */
const GRAIN_TILE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.72 0 0 0 0 0.89 0 0 0 0 0.30 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")";

function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-overlay"
      style={{ backgroundImage: GRAIN_TILE, backgroundRepeat: "repeat" }}
    />
  );
}

const Hero = () => {
  return (
    <section className="bg-canvas px-2.5 pt-2 sm:px-5">
      {/* isolate: the grain blends with mix-blend-mode, which would otherwise
          reach past the card and pick up the page behind it. */}
      <div className="border-canvas-card-stroke bg-background relative isolate mx-auto min-h-[560px] w-full max-w-[1860px] overflow-hidden rounded-[35px] border lg:min-h-[900px]">
        <HeroStrandField />
        <AmbientGlow />
        <Grain />

        <div className="relative z-10 flex min-h-[inherit] min-w-0 flex-col justify-between p-6 sm:p-10 lg:p-[70px]">
          <div className="grid min-w-0 flex-1 items-center gap-6 min-[1100px]:grid-cols-[44fr_56fr]">
            <div className="min-w-0 pt-6 min-[1100px]:pt-0">
              <SplitReveal
                as="h1"
                mode="words"
                onMount
                className="heading-hero max-w-[13ch] text-pretty text-white"
                stagger={0.4}
              >
                Your product changed. Did your docs, website, and help center?
              </SplitReveal>

              <Reveal mount delay={0.5} distance={30} className="mt-7">
                <p className="max-w-[36ch] text-xl tracking-[-0.04em] text-pretty text-white">
                  Thally is the product knowledge layer for software teams. It keeps your docs, website, and support
                  platform in sync as your product changes.
                </p>
                <div className="mt-9">
                  <HeroCtas />
                </div>
              </Reveal>
            </div>

            <div className="min-w-0">
              <HeroFlow />
            </div>
          </div>

          <Reveal mount delay={0.7} distance={20} className="mt-10 max-w-[560px]">
            <p className="mb-6 text-white">Built for the people and AI tools reading your product knowledge</p>
            <AgentMarquee />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
