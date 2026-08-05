"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

import { ArrowRight, GitPullRequest, Track } from "@/components/icons";
import { ThallyMark } from "@/components/layout/logo";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Button } from "@/components/ui/button";
import { DESTINATIONS } from "@/lib/site";

const AGENTS = ["Claude", "Cursor", "ChatGPT", "Copilot", "Perplexity", "Gemini", "v0", "Windsurf"];

function AgentMarquee() {
  return (
    <div className="logos-marquee mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] flex overflow-hidden">
      {[false, true].map((hidden) => (
        <div
          key={String(hidden)}
          className="logos-marquee-track flex min-w-max shrink-0 items-center"
          aria-hidden={hidden || undefined}
        >
          {AGENTS.map((agent) => (
            <span
              key={agent}
              className="font-display px-6 text-xl font-semibold tracking-tight whitespace-nowrap text-white/45"
            >
              {agent}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Floating product cards over the night illustration, like the template's task cards. */
function FloatingCards() {
  const reduced = useReducedMotion();
  const float = (delay: number) =>
    reduced
      ? {}
      : {
          animate: { y: [0, -10, 0] },
          transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const, delay },
        };

  return (
    <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <motion.div
          {...float(0)}
          className="rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-xl max-sm:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium tracking-wide text-white/60 uppercase">Merged</span>
            <span className="text-[11px] text-white/40">PR #214</span>
          </div>
          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-white">
            <GitPullRequest className="text-canvas-accent size-4 shrink-0" />
            api/auth: add refresh tokens
          </p>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
            <div className="bg-canvas-accent h-full w-2/3 rounded-full" />
          </div>
          <p className="mt-2 text-xs text-white/50">3 pages affected</p>
        </motion.div>

        <motion.div
          {...float(0.8)}
          className="flex items-center justify-center rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-xl max-sm:hidden"
        >
          <ThallyMark inverted className="size-12 opacity-90" />
        </motion.div>

        <motion.div {...float(1.6)} className="rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium tracking-wide text-white/60 uppercase">Docs PR drafted</span>
            <span className="bg-canvas-accent/15 text-canvas-accent rounded-full px-2 py-0.5 text-[11px] font-medium">
              Review
            </span>
          </div>
          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-white">
            <Track className="text-canvas-accent size-4 shrink-0" />
            Update authentication guide
          </p>
          <p className="mt-2 text-xs text-white/50">Evidence-backed · waiting on your approval</p>
        </motion.div>
      </div>
    </div>
  );
}

const Hero = () => {
  return (
    <section className="bg-canvas px-2.5 pt-2 sm:px-5">
      <div className="mx-auto grid w-full max-w-[1480px] gap-2.5 lg:grid-cols-[48fr_52fr]">
        {/* Left card: headline over the night illustration */}
        <div className="relative flex min-h-[560px] flex-col justify-between overflow-hidden rounded-[28px] p-6 sm:p-10 lg:min-h-[820px]">
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-[position:18%_100%]"
            style={{ backgroundImage: "url(/template/background.webp)" }}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black/10" />

          <div className="relative">
            <SplitReveal as="h1" mode="words" onMount className="heading-hero text-white" stagger={0.4}>
              Every product change. Every knowledge surface. Automatically in sync.
            </SplitReveal>
          </div>

          <div className="relative mt-10">
            <Reveal delay={0.5} distance={30}>
              <p className="text-lg font-medium text-white/90">Docs that keep up with the product</p>
              <div className="mt-4 flex flex-col gap-2.5 rounded-2xl border border-white/15 bg-white/10 p-2.5 backdrop-blur-lg sm:flex-row sm:items-center">
                <p className="flex-1 px-3 text-sm text-white/70 max-sm:pt-1.5">
                  Connect your repo. Thally drafts the doc updates.
                </p>
                <Button asChild size="lg" className="btn-sheen text-canvas rounded-xl bg-white font-semibold">
                  <a href={DESTINATIONS.signup}>
                    Create your docs site
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </div>
              <div className="mt-3">
                <Link
                  href="/features/track"
                  className="text-sm font-medium text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  See how Thally works
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.7} distance={20} className="mt-10">
              <p className="mb-3 text-sm text-white/55">Built for the AI tools your readers already use</p>
              <AgentMarquee />
            </Reveal>
          </div>
        </div>

        {/* Right card: illustration with floating product cards */}
        <div className="relative hidden min-h-[820px] overflow-hidden rounded-[28px] lg:block">
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-[position:82%_38%]"
            style={{ backgroundImage: "url(/template/background.webp)" }}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/35" />
          <FloatingCards />
        </div>
      </div>
    </section>
  );
};

export default Hero;
