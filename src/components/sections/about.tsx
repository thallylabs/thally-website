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
            <Reveal className="border-canvas-card-stroke flex flex-1 flex-col justify-between rounded-[35px] border p-8 sm:p-12">
              <div>
                <p className="text-canvas-muted text-sm font-medium tracking-widest uppercase">From the founder</p>
                <p className="text-canvas-foreground mt-8 max-w-xl text-xl leading-8">
                  For most of my career I worked in developer experience: developer relations, documentation, and
                  integrations at Flutterwave, Netlify, and LI.FI.
                </p>
                <p className="text-canvas-muted mt-5 max-w-xl text-lg leading-8">
                  One thing stayed the same at every one of them: the amount of work it took to keep what we told
                  customers aligned with what the product actually did.
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
                  I collected one-pagers from product managers, went through Linear tickets, and read changelogs and
                  code diffs to work out what had changed. Then came the harder part: which public surfaces needed to
                  reflect it? The API reference, maybe. The quickstart. The website. A support article last updated six
                  months ago. Code examples in old blog posts. An integration guide that had quietly gone stale.
                </p>
                <p className="text-canvas-muted mt-5 text-lg leading-8">
                  Most of the time we updated the documentation, and rarely comprehensively enough to cover everything
                  else. Not for lack of care. There was always another release.
                </p>
              </Reveal>
            </div>

            <div className="ml-auto max-w-2xl">
              <SplitReveal as="h2" mode="chars" className="heading-card text-canvas-foreground">
                Now the problem compounds.
              </SplitReveal>
              <Reveal delay={0.2} distance={24}>
                <p className="text-canvas-muted mt-6 text-lg leading-8">
                  With AI helping teams ship faster, the gap opens faster. Outdated documentation no longer affects only
                  the people reading it. It also affects the AI tools that rely on your documentation to understand your
                  product. If an old API or workflow is still documented somewhere, a coding assistant can recommend it,
                  generate code with it, and repeat that mistake at scale.
                </p>
              </Reveal>
            </div>

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
                  You create your documentation site on Thally, connect your product repositories, and connect the
                  surfaces you want kept current when the product changes: your website, support platform, and other
                  customer-facing content repositories. When a pull request merges, Thally works out what the change
                  means for the people using your product, traces the impact across every connected surface, and opens
                  evidence-backed pull requests into each one.
                </p>
                <p className="text-canvas-muted mt-5 text-lg leading-8">
                  Each pull request carries the completed update and the evidence behind it, so your team can verify
                  what changed, where the information came from, and why the update was necessary. The goal is not to
                  replace the people who create great documentation. It is to remove the manual detective work that
                  takes up so much of their time.
                </p>
              </Reveal>
            </div>

            <div className="ml-auto max-w-2xl">
              <SplitReveal as="h2" mode="chars" className="heading-card text-canvas-foreground">
                Where this goes.
              </SplitReveal>
              <Reveal delay={0.2} distance={24}>
                <p className="text-canvas-muted mt-6 text-lg leading-8">
                  Teams should never have to remember every place a product change needs to be explained. Docs, the
                  website, and support content are the surfaces Thally connects today. SDK references, examples,
                  tutorials, and the AI context that agents read from are on the same pipeline, and every accepted
                  review makes Thally better at understanding your product specifically.
                </p>
              </Reveal>
            </div>

            <Reveal className="border-canvas-card-stroke rounded-[32px] border bg-white/[0.04] p-8 backdrop-blur-sm md:p-14">
              <div className="max-w-2xl">
                <h2 className="heading-card text-canvas-foreground mt-4">
                  If this is your job, I would love for you to try it.
                </h2>
                <p className="text-canvas-muted mt-5 text-lg leading-8">
                  If your team ships software and keeping product knowledge accurate still depends on chasing
                  information across tickets, pull requests, and conversations, Thally is built for you. Write to me
                  directly with questions about the product, or about the problem.
                </p>
                <p className="text-canvas-muted-2 mt-5 text-sm">
                  Ekene Eze, founder. Thally is built and operated by Fairspleet LLC.
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
