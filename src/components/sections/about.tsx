"use client";

import Link from "next/link";

import { ArrowRight, Search, Structured, Team, Trust } from "@/components/icons";
import { ThallyMark } from "@/components/layout/logo";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";

const principles = [
  {
    icon: Structured,
    title: "The product is the source of truth",
    description: "Customer-facing knowledge should follow what the product does, not drift into a separate reality.",
  },
  {
    icon: Search,
    title: "Understand before generating",
    description: "Find what changed, gather evidence, and map the affected knowledge before drafting new words.",
  },
  {
    icon: Trust,
    title: "Evidence before confidence",
    description:
      "Show why an update is needed, which sources support it, and when no communication change is required.",
  },
  {
    icon: Team,
    title: "Humans approve important communication",
    description: "Thally prepares reviewable work. Your team keeps judgment and publishing authority.",
  },
];

const statGlow = { textShadow: "0 0 12px rgba(255,255,255,0.35)" };

const About = () => {
  return (
    <div className="bg-canvas">
      {/* Banner: centered headline over the two-card intro row */}
      <section className="px-2.5 pt-20 sm:px-5 md:pt-28">
        <div className="mx-auto w-full max-w-[1480px]">
          <div className="mx-auto max-w-4xl text-center">
            <SplitReveal
              as="h1"
              mode="words"
              onMount
              stagger={0.4}
              className="heading-hero text-canvas-foreground mt-5"
            >
              Software ships faster than customer-facing knowledge can follow.
            </SplitReveal>
          </div>

          <div className="mt-14 flex flex-col gap-2.5 lg:flex-row">
            {/* Left card: premise pull-quote with two big stats */}
            <Reveal className="border-canvas-card-stroke flex flex-1 flex-col justify-between rounded-[35px] border p-8 sm:p-12">
              <div>
                <p className="text-canvas-muted text-sm font-medium tracking-widest uppercase">The premise</p>
                <p className="heading-card text-canvas-foreground mt-8 max-w-lg text-balance">
                  Every product change. Every knowledge surface. Automatically in sync.
                </p>
              </div>
              <div className="border-canvas-hairline mt-14 grid grid-cols-2 gap-8 border-t pt-8">
                <div>
                  <p className="heading-section text-canvas-foreground">MIT</p>
                  <p className="text-canvas-muted mt-2 text-sm" style={statGlow}>
                    Publishing engine license
                  </p>
                </div>
                <div>
                  <p className="heading-section text-canvas-foreground">Git</p>
                  <p className="text-canvas-muted mt-2 text-sm" style={statGlow}>
                    Where your content stays
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Right card: visual block over the night illustration */}
            <Reveal
              delay={0.3}
              className="border-canvas-hairline relative flex-1 overflow-hidden rounded-[35px] border"
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-cover bg-[position:50%_70%]"
                style={{ backgroundImage: "url(/template/background.webp)" }}
              />
              <div aria-hidden className="absolute inset-0 bg-black/55" />
              <div className="relative flex min-h-[320px] items-center justify-center lg:h-full lg:min-h-[480px]">
                <ThallyMark inverted className="size-28 opacity-90 md:size-36" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="marketing-section-pad px-2.5 sm:px-5">
        <div className="mx-auto w-full max-w-[1480px]">
          <div className="mx-auto max-w-[1060px] space-y-20 md:space-y-28">
            <div className="max-w-2xl">
              <SplitReveal as="h2" mode="chars" className="heading-card text-canvas-foreground">
                Every product change creates communication work.
              </SplitReveal>
              <Reveal delay={0.2} distance={24}>
                <p className="text-canvas-muted mt-6 text-lg leading-8">
                  Documentation, SDK references, release notes, examples, tutorials, and AI context are usually
                  maintained separately. Teams have to rediscover what changed, decide which surfaces are affected, and
                  repeat the same update across each one. No system owns that understanding.
                </p>
              </Reveal>
            </div>

            <div className="ml-auto max-w-2xl">
              <SplitReveal as="h2" mode="chars" className="heading-card text-canvas-foreground">
                Thally is the pipeline, not another destination.
              </SplitReveal>
              <Reveal delay={0.2} distance={24}>
                <p className="text-canvas-muted mt-6 text-lg leading-8">
                  Documentation platforms, wikis, content management systems, and knowledge bases store what a team
                  already knows. Thally connects product evolution to customer-facing knowledge. It discovers the
                  communication work a change creates, prioritizes it, and prepares the right updates for review.
                </p>
              </Reveal>
            </div>

            {/* Principles: hairline 2x2 value grid */}
            <Reveal delay={0.2} distance={40}>
              <div className="border-canvas-hairline grid overflow-hidden rounded-[32px] border sm:grid-cols-2">
                {principles.map((principle, i) => (
                  <article
                    key={principle.title}
                    className={[
                      "border-canvas-hairline flex flex-col items-center px-8 py-12 text-center",
                      i % 2 === 0 ? "sm:border-r" : "",
                      i < principles.length - 1 ? "max-sm:border-b" : "",
                      i < 2 ? "sm:border-b" : "",
                    ].join(" ")}
                  >
                    <principle.icon className="text-canvas-foreground size-6" />
                    <h3 className="text-canvas-foreground mt-4 text-lg font-semibold tracking-tight">
                      {principle.title}
                    </h3>
                    <p className="text-canvas-muted-2 mt-2 max-w-xs text-sm leading-relaxed">{principle.description}</p>
                  </article>
                ))}
              </div>
            </Reveal>

            <div className="max-w-2xl">
              <SplitReveal as="h2" mode="chars" className="heading-card text-canvas-foreground">
                Documentation is the first surface.
              </SplitReveal>
              <Reveal delay={0.2} distance={24}>
                <p className="text-canvas-muted mt-6 text-lg leading-8">
                  Thally&apos;s first job is narrow: understand how a product change affects documentation and help
                  teams keep those pages synchronized. The publishing engine is available under the MIT license, content
                  stays in Git, and humans review the updates. Each accepted review and correction improves the
                  product-specific understanding behind future changes.
                </p>
              </Reveal>
            </div>

            <div className="ml-auto max-w-2xl">
              <SplitReveal as="h2" mode="chars" className="heading-card text-canvas-foreground">
                The long-term goal is a synchronized knowledge ecosystem.
              </SplitReveal>
              <Reveal delay={0.2} distance={24}>
                <p className="text-canvas-muted mt-6 text-lg leading-8">
                  Teams should not have to remember every place a product change needs to be explained. As Thally
                  expands, shipping the product should surface the work across documentation, SDK references, examples,
                  tutorials, release notes, AI context, and the knowledge surfaces still to come.
                </p>
              </Reveal>
            </div>

            {/* Closing card */}
            <Reveal className="border-canvas-card-stroke rounded-[32px] border bg-white/[0.04] p-8 backdrop-blur-sm md:p-14">
              <div className="max-w-2xl">
                <h2 className="heading-card text-canvas-foreground mt-4">
                  Thally is built and operated by Fairspleet LLC.
                </h2>
                <p className="text-canvas-muted mt-5 text-lg leading-8">
                  We build Thally so product evolution is continuously reflected everywhere customers learn about it.
                  Contact us directly with questions about the product, support, or company.
                </p>
                <Link
                  href="/contact"
                  className="text-canvas mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-lg font-medium transition-colors hover:bg-white/90"
                >
                  Contact Thally
                  <ArrowRight className="size-5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
