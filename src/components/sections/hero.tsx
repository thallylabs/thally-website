"use client";

import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { HeroStrandField } from "@/components/sections/hero-strand-field";
import { DESTINATIONS } from "@/lib/site";

/**
 * The surfaces a product change has to reach. Named, not abstracted: "every
 * knowledge surface" is internal vocabulary, this row is what it means.
 */
const SURFACES = [
  "Docs",
  "API reference",
  "Quickstart",
  "Marketing site",
  "Help center",
  "Changelog",
  "Blog examples",
  "Integration guides",
];

function SurfaceRow() {
  return (
    <ul className="flex flex-wrap gap-2">
      {SURFACES.map((surface) => (
        <li
          key={surface}
          className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-sm tracking-[-0.02em] text-white/80"
        >
          {surface}
        </li>
      ))}
    </ul>
  );
}

/** Hero CTA pair: the live Track demo leads, the docs site signup follows. */
function HeroCtas() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link
        href="/features/track#demo"
        className="btn-sheen text-canvas inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-lg font-medium"
      >
        Run Thally on a repo
      </Link>
      <a
        href={DESTINATIONS.signup}
        className="btn-sheen inline-flex items-center justify-center rounded-lg border border-[#606060] px-7 py-3.5 text-lg font-medium text-white"
      >
        Create your docs site
      </a>
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

/** Film grain over the field, so the gradients never band on wide displays. */
function Grain() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-40 mix-blend-overlay">
      <filter id="hero-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.72 0 0 0 0 0.89 0 0 0 0 0.30 0 0 0 0.04 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#hero-grain)" />
    </svg>
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

        {/* The right ~38% stays empty on purpose: that is where the strand
            bundle converges and the field is at its densest. */}
        <div className="relative z-10 flex min-h-[inherit] min-w-0 flex-col justify-between p-6 sm:p-10 lg:p-[70px]">
          <div className="pt-6 lg:w-[62%] lg:pt-[30px]">
            <SplitReveal
              as="h1"
              mode="words"
              onMount
              className="heading-hero max-w-[15ch] text-pretty text-white"
              stagger={0.4}
            >
              Your product changed. Did your docs, website, and help center?
            </SplitReveal>

            <Reveal delay={0.5} distance={30} className="mt-7">
              <p className="max-w-[40ch] text-xl tracking-[-0.04em] text-pretty text-white">
                Thally is the product knowledge layer for software teams. It watches the repos you connect, finds every
                page a merge affects, and drafts the update with the diff as evidence. You approve.
              </p>
              <div className="mt-9">
                <HeroCtas />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.7} distance={20} className="mt-10 max-w-[640px]">
            <p className="mb-5 text-white">One change. Every place a customer learns about it.</p>
            <SurfaceRow />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
