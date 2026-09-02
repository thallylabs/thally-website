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
    description:
      "Docs, website, and help center should follow what the product does, not drift into separate realities.",
  },
  {
    icon: Search,
    title: "Understand before generating",
    description: "Read the diff, the discussion, and the tickets. Map the affected pages. Only then draft new words.",
  },
  {
    icon: Trust,
    title: "Evidence before confidence",
    description: "Show why an update is needed, which sources support it, and when no change is the right answer.",
  },
  {
    icon: Team,
    title: "Humans approve what ships",
    description: "Thally prepares reviewable work. Your team keeps judgment and publishing authority on every surface.",
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
            {/* Left card: founder pull-quote with two big stats */}
            <Reveal className="border-canvas-card-stroke flex flex-1 flex-col justify-between rounded-[35px] border p-8 sm:p-12">
              <div>
                <p className="text-canvas-muted text-sm font-medium tracking-widest uppercase">From the founder</p>
                <p className="heading-card text-canvas-foreground mt-8 max-w-lg text-balance">
                  Your product changed. Did your docs, website, and help center?
                </p>
              </div>
              <div className="border-canvas-hairline mt-14 grid grid-cols-2 gap-8 border-t pt-8">
                <div>
                  <p className="heading-section text-canvas-foreground">3</p>
                  <p className="text-canvas-muted mt-2 text-sm" style={statGlow}>
                    Companies where I kept docs current by hand
                  </p>
                </div>
                <div>
                  <p className="heading-section text-canvas-foreground">MIT</p>
                  <p className="text-canvas-muted mt-2 text-sm" style={statGlow}>
                    Publishing engine license
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
                For most of my career, I worked in developer experience.
              </SplitReveal>
              <Reveal delay={0.2} distance={24}>
                <p className="text-canvas-muted mt-6 text-lg leading-8">
                  I managed developer relations, documentation, and integrations at Flutterwave, Netlify, and LI.FI. The
                  products were different. One thing was the same everywhere: the amount of work it took to keep the
                  documentation aligned as the product evolved.
                </p>
              </Reveal>
            </div>

            <div className="ml-auto max-w-2xl">
              <SplitReveal as="h2" mode="chars" className="heading-card text-canvas-foreground">
                Every release started with detective work.
              </SplitReveal>
              <Reveal delay={0.2} distance={24}>
                <p className="text-canvas-muted mt-6 text-lg leading-8">
                  When we shipped a feature, I would collect one-pagers from product managers, go through Linear
                  tickets, and inspect changelogs and code diffs to figure out what had changed. Then the harder part:
                  which public surfaces needed to reflect it? The API reference? The quickstart? The website? A support
                  article last updated six months ago, the code examples in blog posts, an integration guide that had
                  quietly gone stale?
                </p>
              </Reveal>
            </div>

            <div className="max-w-2xl">
              <SplitReveal as="h2" mode="chars" className="heading-card text-canvas-foreground">
                Most of the time, we updated the docs and missed the rest.
              </SplitReveal>
              <Reveal delay={0.2} distance={24}>
                <p className="text-canvas-muted mt-6 text-lg leading-8">
                  Not because anyone was careless. Because nobody could hold the whole map in their head, and no system
                  owned it. Customers found the gaps for us: a pricing page that contradicted the docs, a support
                  article describing a flow that no longer existed, an assistant confidently repeating both.
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
                So I built Thally: the product knowledge layer for software teams.
              </SplitReveal>
              <Reveal delay={0.2} distance={24}>
                <p className="text-canvas-muted mt-6 text-lg leading-8">
                  You create your documentation site on Thally, connect the product repositories, and connect the other
                  surfaces that explain the product: website, help center, changelog. When the product changes, Thally
                  reads the change, finds every page it affects, and opens a pull request on each one with the diff as
                  evidence. Your team approves what ships.
                </p>
              </Reveal>
            </div>

            <div className="ml-auto max-w-2xl">
              <SplitReveal as="h2" mode="chars" className="heading-card text-canvas-foreground">
                Detection and propagation are two halves of one mechanism.
              </SplitReveal>
              <Reveal delay={0.2} distance={24}>
                <p className="text-canvas-muted mt-6 text-lg leading-8">
                  Detection answers which pages the evidence says are affected. Propagation lands the fix on each of
                  them. Detection alone is a to-do list. Propagation alone is an AI rewriting your content on a hunch,
                  which is exactly what nobody wants. Thally only ever does both, and the publishing engine underneath
                  is MIT licensed, so your content stays in Git and under your control.
                </p>
              </Reveal>
            </div>

            {/* Closing card */}
            <Reveal className="border-canvas-card-stroke rounded-[32px] border bg-white/[0.04] p-8 backdrop-blur-sm md:p-14">
              <div className="max-w-2xl">
                <h2 className="heading-card text-canvas-foreground mt-4">
                  Thally is built by Ekene Eze and operated by Fairspleet LLC.
                </h2>
                <p className="text-canvas-muted mt-5 text-lg leading-8">
                  If your team ships software and keeping your product knowledge current is a job nobody wants, I would
                  like to hear from you. Questions about the product, support, or the company are welcome.
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
