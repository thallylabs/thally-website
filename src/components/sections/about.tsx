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
              Built by someone who did the detective work for a living.
            </SplitReveal>
          </div>

          <div className="mt-14 flex flex-col gap-2.5 lg:flex-row">
            {/* Left card: premise pull-quote with two big stats */}
            <Reveal className="border-canvas-card-stroke flex flex-1 flex-col justify-between rounded-[35px] border p-8 sm:p-12">
              <div>
                <p className="text-canvas-muted text-sm font-medium tracking-widest uppercase">From the founder</p>
                <p className="heading-card text-canvas-foreground mt-8 max-w-lg text-balance">
                  I spent most of my career in developer experience at Flutterwave, Netlify, and LI.FI. At each one,
                  keeping customer-facing knowledge aligned with the product took the same manual work.
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
                When we shipped a feature, I went hunting.
              </SplitReveal>
              <Reveal delay={0.2} distance={24}>
                <p className="text-canvas-muted mt-6 text-lg leading-8">
                  I collected product notes, went through tickets, and read changelogs and code diffs to understand what
                  shipped. Then I had to find every public surface that needed to reflect it, from the API reference and
                  quickstart to the website, support articles, old code samples, and integration guides.
                </p>
              </Reveal>
            </div>

            <div className="ml-auto max-w-2xl">
              <SplitReveal as="h2" mode="chars" className="heading-card text-canvas-foreground">
                Now the problem compounds.
              </SplitReveal>
              <Reveal delay={0.2} distance={24}>
                <p className="text-canvas-muted mt-6 text-lg leading-8">
                  AI helps teams ship faster, so the gap opens faster. Outdated documentation also feeds the AI tools
                  developers use. An old API or workflow can be recommended, generated into code, and repeated at scale.
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
                Thally is the product knowledge layer for software teams.
              </SplitReveal>
              <Reveal delay={0.2} distance={24}>
                <p className="text-canvas-muted mt-6 text-lg leading-8">
                  Connect the repositories that define your product and the surfaces that explain it. When a pull
                  request merges, Thally works out what the change means, traces the impact across your docs, website,
                  help center, and changelog, then opens evidence-backed pull requests for your team to review.
                </p>
              </Reveal>
            </div>

            <div className="ml-auto max-w-2xl">
              <SplitReveal as="h2" mode="chars" className="heading-card text-canvas-foreground">
                The judgment stays with your team.
              </SplitReveal>
              <Reveal delay={0.2} distance={24}>
                <p className="text-canvas-muted mt-6 text-lg leading-8">
                  Each pull request shows what changed, where the information came from, and why the update is needed.
                  Your team verifies and merges it. When nothing needs to change, Thally says so instead of inventing
                  work.
                </p>
              </Reveal>
            </div>

            {/* Closing card */}
            <Reveal className="border-canvas-card-stroke rounded-[32px] border bg-white/[0.04] p-8 backdrop-blur-sm md:p-14">
              <div className="max-w-2xl">
                <h2 className="heading-card text-canvas-foreground mt-4">
                  If this is your job, I would love for you to try it.
                </h2>
                <p className="text-canvas-muted mt-5 text-lg leading-8">
                  If keeping product knowledge accurate still means chasing information across tickets, pull requests,
                  and conversations, Thally is built for you. I am Ekene Eze, the founder of Thally. Contact me directly
                  with questions about the product or the problem. Thally is built and operated by Fairspleet LLC.
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
